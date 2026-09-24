/**
 * Comprehensive Product Image Helper
 * Provides verified, high-resolution imagery for all farm commodities,
 * category-based smart fallbacks, multi-angle galleries, and offline SVG safeguards.
 */

export const COMMODITY_IMAGES = {
  // Vegetables
  'tomato': 'https://images.unsplash.com/photo-1558818498-28c1e002b655?w=600&h=450&fit=crop',
  'onion': 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&h=450&fit=crop',
  'cabbage': 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=600&h=450&fit=crop',
  'potato': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&h=450&fit=crop',
  'carrot': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&h=450&fit=crop',
  'cauliflower': 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=600&h=450&fit=crop',
  'spinach': 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&h=450&fit=crop',
  'bell pepper': 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&h=450&fit=crop',
  'capsicum': 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&h=450&fit=crop',
  'red bell': 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&h=450&fit=crop',
  'garlic': 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&h=450&fit=crop',
  'beetroot': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&h=450&fit=crop',
  'sweet potato': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&h=450&fit=crop',

  // Fruits
  'mango': 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&h=450&fit=crop',
  'alphonso': 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&h=450&fit=crop',
  'pomegranate': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&h=450&fit=crop',
  'banana': 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&h=450&fit=crop',
  'grapes': 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600&h=450&fit=crop',
  'grape': 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600&h=450&fit=crop',
  'guava': 'https://images.unsplash.com/photo-1536511132770-e5058c7e8c46?w=600&h=450&fit=crop',
  'papaya': 'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=600&h=450&fit=crop',
  'strawberry': 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&h=450&fit=crop',
  'apple': 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&h=450&fit=crop',
  'pineapple': 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=600&h=450&fit=crop',
  'coconut': 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?w=600&h=450&fit=crop',
  'lemon': 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?w=600&h=450&fit=crop',

  // Grains
  'rice': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=450&fit=crop',
  'basmati': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=450&fit=crop',
  'wheat': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=450&fit=crop',
  'maize': 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&h=450&fit=crop',
  'corn': 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&h=450&fit=crop',
  'bajra': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=450&fit=crop',
  'millet': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=450&fit=crop',
  'barley': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=450&fit=crop',

  // Pulses & Dal
  'toor dal': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=450&fit=crop',
  'toor': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=450&fit=crop',
  'moong dal': 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=600&h=450&fit=crop',
  'moong': 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=600&h=450&fit=crop',
  'chana dal': 'https://images.unsplash.com/photo-1613743983303-b3e89f8a2b80?w=600&h=450&fit=crop',
  'chana': 'https://images.unsplash.com/photo-1613743983303-b3e89f8a2b80?w=600&h=450&fit=crop',
  'urad dal': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=450&fit=crop',
  'urad': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=450&fit=crop',
  'dal': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=450&fit=crop',
  'lentil': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=450&fit=crop',

  // Dairy
  'ghee': 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&h=450&fit=crop',
  'milk': 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&h=450&fit=crop',
  'fresh milk': 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&h=450&fit=crop',
  'paneer': 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&h=450&fit=crop',
  'curd': 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&h=450&fit=crop',
  'yogurt': 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&h=450&fit=crop',

  // Oilseeds
  'soybean': 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=600&h=450&fit=crop',
  'soya': 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=600&h=450&fit=crop',
  'groundnut': 'https://images.unsplash.com/photo-1567894340315-735d7c361db0?w=600&h=450&fit=crop',
  'peanut': 'https://images.unsplash.com/photo-1567894340315-735d7c361db0?w=600&h=450&fit=crop',
  'mustard': 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=600&h=450&fit=crop',
  'sesame': 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=600&h=450&fit=crop',

  // Spices
  'cinnamon': 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=600&h=450&fit=crop',
  'black pepper': 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?w=600&h=450&fit=crop',
  'pepper': 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?w=600&h=450&fit=crop',
  'cardamom': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=450&fit=crop',
  'clove': 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=600&h=450&fit=crop',
  'cloves': 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=600&h=450&fit=crop',
  'turmeric': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&h=450&fit=crop',
  'green chilli': 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=600&h=450&fit=crop',
  'chilli': 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=600&h=450&fit=crop'
};

export const CATEGORY_FALLBACK_IMAGES = {
  'vegetables': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&h=450&fit=crop',
  'fruits': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&h=450&fit=crop',
  'grains': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=450&fit=crop',
  'pulses': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=450&fit=crop',
  'dairy': 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&h=450&fit=crop',
  'spices': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=450&fit=crop',
  'oilseeds': 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=600&h=450&fit=crop',
  'default': 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=450&fit=crop'
};

export const DEFAULT_FALLBACK_SVG = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='450' viewBox='0 0 600 450'><rect width='600' height='450' fill='%2310b981'/><circle cx='300' cy='180' r='80' fill='%23059669'/><text x='300' y='200' font-size='72' text-anchor='middle'>🌾</text><text x='300' y='320' font-family='system-ui,sans-serif' font-weight='700' font-size='24' fill='%23ffffff' text-anchor='middle'>Farm Fresh Produce</text></svg>";

/**
 * Returns a high-quality product image URL, resolving custom URLs, keyword matches, or category fallbacks.
 * @param {object} product - Produce product object { name, category, image_url }
 * @returns {string} - Verified image URL
 */
export function getProductImageUrl(product) {
  if (!product) return CATEGORY_FALLBACK_IMAGES.default;

  // If farmer uploaded a custom image and it's not a legacy broken mock URL
  if (
    product.image_url &&
    typeof product.image_url === 'string' &&
    product.image_url.trim() !== '' &&
    !product.image_url.includes('1566385101042-1a0aa4c1c900') &&
    !product.image_url.includes('1612257416648-ee7a6c5b1e5e') &&
    !product.image_url.includes('1585996954372-a6bc5032dcc2')
  ) {
    return product.image_url;
  }

  const name = (product.name || '').toLowerCase();
  for (const [key, url] of Object.entries(COMMODITY_IMAGES)) {
    if (name.includes(key)) {
      return url;
    }
  }

  const category = (product.category || '').toLowerCase();
  if (CATEGORY_FALLBACK_IMAGES[category]) {
    return CATEGORY_FALLBACK_IMAGES[category];
  }

  return CATEGORY_FALLBACK_IMAGES.default;
}

/**
 * Returns 3 diverse, valid images for the product detail lightbox/gallery.
 * @param {object} product 
 * @returns {string[]}
 */
export function getProductGallery(product) {
  const main = getProductImageUrl(product);
  const category = (product?.category || '').toLowerCase();
  const categoryFallback = CATEGORY_FALLBACK_IMAGES[category] || CATEGORY_FALLBACK_IMAGES.default;
  const harvestFarm = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop';
  const fieldProduce = 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=800&h=600&fit=crop';

  const gallery = [main];
  if (categoryFallback !== main) {
    gallery.push(categoryFallback);
  } else {
    gallery.push(fieldProduce);
  }
  gallery.push(harvestFarm);

  return gallery;
}

/**
 * Safe image onError handler that gracefully falls back through category and finally inline SVG,
 * preventing any infinite reload loops or broken icon boxes.
 */
export function handleProductImageError(e, product) {
  const current = e.currentTarget.src;
  const category = (product?.category || '').toLowerCase();
  const catFallback = CATEGORY_FALLBACK_IMAGES[category] || CATEGORY_FALLBACK_IMAGES.default;

  if (current !== catFallback && !current.startsWith('data:image/svg')) {
    e.currentTarget.src = catFallback;
  } else {
    e.currentTarget.src = DEFAULT_FALLBACK_SVG;
  }
}
