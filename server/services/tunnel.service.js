/**
 * Automatic Public Tunnel Service for KisanSetu
 * Provides an external HTTPS URL via Pinggy so Twilio Cloud Webhooks & Sarvam Audio
 * can reach the local Express server on port 5000.
 */
const { pinggy } = require('@pinggy/pinggy');

let activeTunnel = null;
let activeUrl = null;

async function startTunnel(port = process.env.PORT || 5000) {
  // If an external PUBLIC_URL is explicitly set to a live domain (not localhost), use that
  if (process.env.PUBLIC_URL && process.env.PUBLIC_URL.startsWith('https://') && !process.env.PUBLIC_URL.includes('localhost')) {
    console.log(`[Tunnel] Using explicitly configured PUBLIC_URL: ${process.env.PUBLIC_URL}`);
    activeUrl = process.env.PUBLIC_URL;
    return activeUrl;
  }

  try {
    console.log(`[Tunnel] Starting public HTTPS tunnel for port ${port}...`);
    activeTunnel = await pinggy.forward({
      forwarding: `localhost:${port}`
    });

    const urls = await activeTunnel.urls();
    console.log('[Tunnel] Pinggy URLs assigned:', urls);

    // Prefer run.pinggy-free.link or free.pinggy.net HTTPS url
    const httpsUrl = urls.find(u => u.startsWith('https://') && u.includes('pinggy-free.link')) ||
                     urls.find(u => u.startsWith('https://')) ||
                     urls[0];

    if (httpsUrl) {
      activeUrl = httpsUrl.replace(/\/+$/, '');
      process.env.PUBLIC_URL = activeUrl;
      console.log(`[Tunnel Active] 🌐 Twilio Webhook URL: ${activeUrl}`);
      return activeUrl;
    }
  } catch (err) {
    console.warn('[Tunnel Warning] Could not start public tunnel:', err.message);
  }

  return process.env.PUBLIC_URL || `http://localhost:${port}`;
}

function getPublicUrl() {
  return activeUrl || process.env.PUBLIC_URL || 'http://localhost:5000';
}

async function stopTunnel() {
  if (activeTunnel) {
    try {
      await activeTunnel.stop();
    } catch (e) {}
    activeTunnel = null;
  }
}

module.exports = {
  startTunnel,
  getPublicUrl,
  stopTunnel
};
