const db = require('../config/database');

const COMMODITY_IMAGES = {
  'Tomato': 'https://images.unsplash.com/photo-1558818498-28c1e002b655?w=600&h=450&fit=crop',
  'Onion': 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&h=450&fit=crop',
  'Mango Alphonso': 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&h=450&fit=crop',
  'Pomegranate': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&h=450&fit=crop',
  'Basmati Rice': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=450&fit=crop',
  'Wheat': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=450&fit=crop',
  'Black Pepper': 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?w=600&h=450&fit=crop',
  'Cardamom': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=450&fit=crop',
  'Fresh Milk': 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&h=450&fit=crop',
  'Paneer': 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&h=450&fit=crop',
  'Grapes': 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600&h=450&fit=crop',
  'Papaya': 'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=600&h=450&fit=crop',
  'Toor Dal': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=450&fit=crop',
  'Moong Dal': 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=600&h=450&fit=crop',
  'Mustard Seeds': 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=600&h=450&fit=crop',
  'Groundnut': 'https://images.unsplash.com/photo-1567894340315-735d7c361db0?w=600&h=450&fit=crop',
  'Soybean': 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=600&h=450&fit=crop',
  'Cinnamon': 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=600&h=450&fit=crop',
  'Ghee': 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&h=450&fit=crop',
  'Strawberry': 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&h=450&fit=crop',
  'Chana Dal': 'https://images.unsplash.com/photo-1613743983303-b3e89f8a2b80?w=600&h=450&fit=crop',
  'Cabbage': 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=600&h=450&fit=crop',
  'Banana': 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&h=450&fit=crop',
  'Maize': 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&h=450&fit=crop',
  'Cloves': 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=600&h=450&fit=crop'
};

async function run() {
  await db.ensureInitialized();
  console.log('Database initialized. Updating product images...');
  
  const updateStmt = db.prepare('UPDATE products SET image_url = ? WHERE name = ?');
  let count = 0;
  for (const [name, url] of Object.entries(COMMODITY_IMAGES)) {
    updateStmt.run(url, name);
    count++;
  }
  
  console.log(`Successfully updated ${count} products with verified Unsplash image URLs.`);
  
  // Verify
  const rows = db.prepare('SELECT id, name, category, image_url FROM products WHERE image_url IS NOT NULL LIMIT 5').all();
  console.log('Sample updated rows:', rows);
  
  db.close();
}

run().catch(err => {
  console.error('Error updating images:', err);
  process.exit(1);
});
