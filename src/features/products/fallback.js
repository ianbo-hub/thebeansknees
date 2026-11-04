/**
 * Fallback product data — shown when the Google Sheets API is unavailable.
 * Keeps the site functional in any network or config failure scenario.
 */

export const FALLBACK_MACHINES = [
  {
    id: 'mini-me', name: 'Mini Me', tagline: 'Compact powerhouse for small spaces',
    price_kes: null, status: 'in_stock',
    // cloudinary_id set once images are uploaded (run scripts/upload-images.mjs)
    // cloudinary_id: 'thebeansknees/machines/mini-me',
    source_image_url: 'https://www.dolce-gusto.co.uk/media/catalog/product/cache/a7ed62b12c9d28aa0842b5a9bc7623a5/m/a/mac0000123-1_gallery1q.png',
    bar_pressure: '15 bar', tank_litres: '0.8 L', wattage: '1460 W',
    dimensions_cm: '20 × 16 × 29 cm', colour_options: 'Black',
    notes: 'Adjustable cup stand; hot & cold drinks; auto-off after 5 min',
    whatsapp_label: 'Mini Me Machine',
  },
  {
    id: 'infinissima', name: 'Infinissima', tagline: 'Sleek touch-screen elegance',
    price_kes: null, status: 'in_stock',
    // cloudinary_id: 'thebeansknees/machines/infinissima',
    source_image_url: 'https://static01.galaxus.com/productimages/7/6/3/6/9/2/3/4/7/0/6/2/3/5/1/9/8/1/0/1b47c5d3-e4d9-4669-92a3-7e44f67646ef_cropped.jpg_720.jpeg',
    bar_pressure: '15 bar', tank_litres: '1.2 L', wattage: '1500 W',
    dimensions_cm: '24 × 16 × 31 cm', colour_options: 'Black',
    notes: 'Touch-screen controls; large water tank; latte art capability',
    whatsapp_label: 'Infinissima Machine',
  },
  {
    id: 'classic', name: 'Classic (by Krups)', tagline: 'The original. Bold. Reliable.',
    price_kes: null, status: 'in_stock',
    // cloudinary_id: 'thebeansknees/machines/classic',
    source_image_url: 'https://www.kontrolsat.com/99614-large_default/semi-automatic-coffee-machine-krups-dolce-gusto-kp830110.webp',
    bar_pressure: '15 bar', tank_litres: '1.0 L', wattage: '1500 W',
    dimensions_cm: '25 × 16 × 30 cm', colour_options: 'Black',
    notes: 'Manual stop lever; starter-style; classic Dolce Gusto design',
    whatsapp_label: 'Classic Machine (by Krups)',
  },
]

export const FALLBACK_PODS = [
  {
    id: 'americano', name: 'Americano', brand: 'Nescafé Dolce Gusto',
    flavour_notes: 'Bold dark roast with a smooth, clean finish',
    caps_total: 16, caps_coffee: null, caps_milk: null, servings: 16, intensity: 7,
    price_kes: 2000, status: 'in_stock',
    cloudinary_id: 'thebeansknees/pods/americano',
    source_image_url: 'https://www.dolce-gusto.co.uk/media/catalog/product/cache/b26f94d0ac1c29a8cd5e375995cfb68d/b/e/bev0000001_16x_heroimage2026.png',
    whatsapp_label: 'Americano Pods (16 caps)',
  },
  {
    id: 'latte-macchiato', name: 'Latte Macchiato', brand: 'Nescafé Dolce Gusto',
    flavour_notes: 'Creamy layered coffee with steamed milk',
    caps_total: 16, caps_coffee: 8, caps_milk: 8, servings: 8, intensity: 5,
    price_kes: 2000, status: 'in_stock',
    cloudinary_id: 'thebeansknees/pods/latte-macchiato',
    source_image_url: 'https://www.dolce-gusto.co.uk/media/catalog/product/cache/b26f94d0ac1c29a8cd5e375995cfb68d/b/e/bev0000055_16x_hero_image_1.png',
    whatsapp_label: 'Latte Macchiato Pods (16 caps / 8 drinks)',
  },
  {
    id: 'chococino', name: 'Chococino', brand: 'Nescafé Dolce Gusto',
    flavour_notes: 'Rich hot chocolate with a creamy milk topping',
    caps_total: 16, caps_coffee: 8, caps_milk: 8, servings: 8, intensity: null,
    price_kes: 2000, status: 'in_stock',
    cloudinary_id: 'thebeansknees/pods/chococino',
    source_image_url: 'https://www.dolce-gusto.co.uk/media/catalog/product/cache/b26f94d0ac1c29a8cd5e375995cfb68d/b/e/bev0000045_16x_heroimage2026.png',
    whatsapp_label: 'Chococino Pods (16 caps / 8 drinks)',
  },
  {
    id: 'cappuccino', name: 'Cappuccino', brand: 'Nescafé Dolce Gusto',
    flavour_notes: 'Espresso topped with smooth, velvety milk foam',
    caps_total: 16, caps_coffee: 8, caps_milk: 8, servings: 8, intensity: 6,
    price_kes: 2000, status: 'in_stock',
    cloudinary_id: 'thebeansknees/pods/cappuccino',
    source_image_url: 'https://www.dolce-gusto.co.uk/media/catalog/product/cache/b26f94d0ac1c29a8cd5e375995cfb68d/b/e/bev0000052_16x_hero_image.png',
    whatsapp_label: 'Cappuccino Pods (16 caps / 8 drinks)',
  },
  {
    id: 'starbucks-caramel-macchiato', name: 'Starbucks Caramel Macchiato', brand: 'Starbucks',
    flavour_notes: 'Sweet caramel with bold espresso and velvety milk',
    caps_total: 12, caps_coffee: null, caps_milk: null, servings: 6, intensity: 6,
    price_kes: 2000, status: 'in_stock',
    cloudinary_id: 'thebeansknees/pods/starbucks-caramel-macchiato',
    source_image_url: 'https://www.dolce-gusto.co.uk/media/catalog/product/cache/b26f94d0ac1c29a8cd5e375995cfb68d/7/6/7613037275704_H__g-1_q-1_c-6_m-6.png',
    whatsapp_label: 'Starbucks Caramel Macchiato Pods (12 caps)',
  },
  {
    id: 'starbucks-house-blend', name: 'Starbucks House Blend', brand: 'Starbucks',
    flavour_notes: 'Smooth medium roast Americano with a balanced body',
    caps_total: 12, caps_coffee: null, caps_milk: null, servings: 12, intensity: 5,
    price_kes: 2000, status: 'in_stock',
    cloudinary_id: 'thebeansknees/pods/starbucks-house-blend',
    source_image_url: 'https://www.dolce-gusto.co.uk/media/catalog/product/cache/b26f94d0ac1c29a8cd5e375995cfb68d/7/6/7613036989268_H__g-1_q-1_c-12_m-0.png',
    whatsapp_label: 'Starbucks House Blend Pods (12 caps)',
  },
]
