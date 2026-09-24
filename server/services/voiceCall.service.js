/**
 * Twilio Interactive Voice Calling Service
 * Uses Sarvam AI Bulbul v3 TTS audio for natural Indian voice experience
 */
const fetch = require('node-fetch');
const sarvamService = require('./sarvam.tts.service');

class VoiceCallService {
  getCredentials() {
    return {
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
      fromNumber: process.env.TWILIO_PHONE_NUMBER,
      isConfigured: !!(
        process.env.TWILIO_ACCOUNT_SID &&
        process.env.TWILIO_AUTH_TOKEN &&
        !process.env.TWILIO_ACCOUNT_SID.startsWith('your_') &&
        process.env.TWILIO_ACCOUNT_SID.startsWith('AC')
      )
    };
  }

  /**
   * Check whether a phone number is verified in Twilio Verified Caller IDs
   */
  async checkNumberVerification(toPhone) {
    const creds = this.getCredentials();
    const cleanDigits = (toPhone || '').replace(/[^0-9]/g, '').slice(-10);
    const cleanPhone = `+91${cleanDigits}`;

    if (!creds.isConfigured) {
      return {
        isConfigured: false,
        isVerified: false,
        phone: cleanPhone,
        message: 'Twilio credentials not configured'
      };
    }

    try {
      const auth = Buffer.from(`${creds.accountSid}:${creds.authToken}`).toString('base64');
      
      // 1. Fetch Twilio incoming/purchased numbers and verified caller IDs concurrently
      const [callerIdsRes, incomingRes] = await Promise.all([
        fetch(`https://api.twilio.com/2010-04-01/Accounts/${creds.accountSid}/OutgoingCallerIds.json`, {
          headers: { 'Authorization': `Basic ${auth}` }
        }),
        fetch(`https://api.twilio.com/2010-04-01/Accounts/${creds.accountSid}/IncomingPhoneNumbers.json`, {
          headers: { 'Authorization': `Basic ${auth}` }
        })
      ]);

      const callerIdsData = await callerIdsRes.json();
      const incomingData = await incomingRes.json();

      const callerIds = callerIdsData.outgoing_caller_ids || [];
      const incomingNumbers = (incomingData.incoming_phone_numbers || []).map(i => i.phone_number);

      // Check if phone matches any verified caller ID or incoming number
      const matched = callerIds.find((id) => {
        const num = (id.phone_number || '').replace(/[^0-9]/g, '');
        return num.endsWith(cleanDigits);
      });

      const isVerified = !!matched;
      const verifiedNumbers = callerIds.map(c => c.phone_number);

      return {
        isConfigured: true,
        isVerified,
        phone: cleanPhone,
        matchedNumber: matched?.phone_number || null,
        verifiedNumbers,
        incomingNumbers,
        hasPurchasedTwilioNumber: incomingNumbers.length > 0,
        message: isVerified
          ? `Phone number ${cleanPhone} is verified in your Twilio account.`
          : `Phone number ${cleanPhone} is NOT in your Twilio Verified Caller IDs.`
      };
    } catch (err) {
      return {
        isConfigured: true,
        isVerified: false,
        phone: cleanPhone,
        error: err.message
      };
    }
  }

  /**
   * Make outbound voice call using Sarvam AI generated audio
   */
  async makeVoiceCall(toPhone, lang = 'ta') {
    const creds = this.getCredentials();
    const cleanDigits = (toPhone || '').replace(/[^0-9]/g, '').slice(-10);
    const cleanPhone = `+91${cleanDigits}`;
    const baseUrl = process.env.PUBLIC_URL || 'http://localhost:5000';

    // 1. Generate natural Indian language audio greeting via Sarvam AI
    let sarvamAudioUrl = null;
    try {
      const greetingMap = {
        ta: 'வணக்கம்! உழவன் நேரடி சேவைக்கு நல்வரவு. விளைச்சல் விற்க 1 அழுத்தவும். மண்டி விலை அறிய 2 அழுத்தவும். பயிர் மருத்துவருக்கு 3 அழுத்தவும்.',
        hi: 'नमस्ते! किसान सेतु में आपका स्वागत है। फसल बेचने के लिए 1 दबाएं। मंडी भाव जानने के लिए 2 दबाएं। फसल डॉक्टर के लिए 3 दबाएं।',
        en: 'Welcome to KisanSetu. Press 1 to sell your farm harvest. Press 2 for live Mandi rates. Press 3 for Crop Doctor advice.'
      };
      const textToSpeak = greetingMap[lang] || greetingMap.ta;
      const langCode = lang === 'ta' ? 'ta-IN' : lang === 'en' ? 'en-IN' : 'hi-IN';
      sarvamAudioUrl = await sarvamService.generateAudio(textToSpeak, langCode);
    } catch (e) {
      console.warn('[Sarvam Pre-Gen Warning]:', e.message);
    }

    if (!creds.isConfigured) {
      console.log(`[Twilio Not Configured — Emulating Call to ${cleanPhone} with Sarvam AI]`);
      return {
        success: true,
        simulated: true,
        sarvamAudioUrl,
        phone: cleanPhone,
        message: 'Twilio not configured. Running with in-app Sarvam AI Voice Simulator.'
      };
    }

    try {
      const auth = Buffer.from(`${creds.accountSid}:${creds.authToken}`).toString('base64');

      // TwiML using Sarvam AI <Play> audio
      const audioTag = sarvamAudioUrl ? `<Play>${sarvamAudioUrl}</Play>` : '';
      const fallbackSay = lang === 'ta' 
        ? `<Say voice="Polly.Aditi" language="hi-IN">वणक्कम! उळवन नेरडी सेवैक्कु नलवरवु। पयिर विर्क, ओण्ड्रु अळुत्तवुम।</Say>`
        : `<Say voice="Polly.Aditi" language="en-IN">Welcome to KisanSetu. Press 1 to sell harvest.</Say>`;

      const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Pause length="1"/>
  <Gather action="${baseUrl}/api/ivr/twilio-gather?step=MENU&amp;lang=${lang}&amp;phone=${cleanDigits}" numDigits="1" method="POST" timeout="12">
    ${audioTag || fallbackSay}
  </Gather>
  <Redirect method="POST">${baseUrl}/api/ivr/twilio-gather?step=LANG&amp;lang=${lang}&amp;phone=${cleanDigits}</Redirect>
</Response>`;

      // From number: use configured number
      const fromNumber = creds.fromNumber.startsWith('+') ? creds.fromNumber : `+91${creds.fromNumber.replace(/[^0-9]/g, '').slice(-10)}`;

      const params = new URLSearchParams();
      params.append('To', cleanPhone);
      params.append('From', fromNumber);
      params.append('Twiml', twiml);

      const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${creds.accountSid}/Calls.json`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
      });

      const data = await response.json();
      if (response.ok) {
        console.log(`[Twilio Voice Call -> ${cleanPhone}] SID: ${data.sid}, Webhook: ${baseUrl}`);
        return { success: true, callSid: data.sid, status: data.status, sarvamAudioUrl };
      } else {
        console.warn(`[Twilio Voice Call Warning]:`, data.message);
        return { success: false, message: data.message, code: data.code, sarvamAudioUrl };
      }
    } catch (err) {
      console.error('[Twilio Voice Call Error]:', err.message);
      return { success: false, error: err.message, sarvamAudioUrl };
    }
  }
}

module.exports = new VoiceCallService();
