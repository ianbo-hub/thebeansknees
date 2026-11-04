/**
 * upload-images.mjs
 * Uploads all product images to Cloudinary for The Beans Knees.
 *
 * Run once from your laptop (not in Netlify — it needs outbound access to api.cloudinary.com):
 *   node scripts/upload-images.mjs
 *
 * After running, uncomment the cloudinary_id lines in src/features/products/fallback.js
 * and add cloudinary_id values to your Google Sheet (machines tab).
 */

import crypto from 'node:crypto'

const CLOUD      = 'sxyb8iya'
const API_KEY    = '848473338416528'
const API_SECRET = 'uiYuBxWYZ9xqxE9DSbqG8BXWJbM'
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`

const IMAGES = {
  // ── Machines ────────────────────────────────────────────────────────────────
  'thebeansknees/machines/mini-me':
    'https://www.dolce-gusto.co.uk/media/catalog/product/cache/a7ed62b12c9d28aa0842b5a9bc7623a5/m/a/mac0000123-1_gallery1q.png',

  'thebeansknees/machines/infinissima':
    'https://static01.galaxus.com/productimages/7/6/3/6/9/2/3/4/7/0/6/2/3/5/1/9/8/1/0/1b47c5d3-e4d9-4669-92a3-7e44f67646ef_cropped.jpg_720.jpeg',

  'thebeansknees/machines/classic':
    'https://www.kontrolsat.com/99614-large_default/semi-automatic-coffee-machine-krups-dolce-gusto-kp830110.webp',

  // ── Pods ─────────────────────────────────────────────────────────────────────
  'thebeansknees/pods/americano':
    'https://www.dolce-gusto.co.uk/media/catalog/product/cache/b26f94d0ac1c29a8cd5e375995cfb68d/b/e/bev0000001_16x_heroimage2026.png',

  'thebeansknees/pods/latte-macchiato':
    'https://www.dolce-gusto.co.uk/media/catalog/product/cache/b26f94d0ac1c29a8cd5e375995cfb68d/b/e/bev0000055_16x_hero_image_1.png',

  'thebeansknees/pods/chococino':
    'https://www.dolce-gusto.co.uk/media/catalog/product/cache/b26f94d0ac1c29a8cd5e375995cfb68d/b/e/bev0000045_16x_heroimage2026.png',

  'thebeansknees/pods/cappuccino':
    'https://www.dolce-gusto.co.uk/media/catalog/product/cache/b26f94d0ac1c29a8cd5e375995cfb68d/b/e/bev0000052_16x_hero_image.png',

  'thebeansknees/pods/starbucks-caramel-macchiato':
    'https://www.dolce-gusto.co.uk/media/catalog/product/cache/b26f94d0ac1c29a8cd5e375995cfb68d/7/6/7613037275704_H__g-1_q-1_c-6_m-6.png',

  'thebeansknees/pods/starbucks-house-blend':
    'https://www.dolce-gusto.co.uk/media/catalog/product/cache/b26f94d0ac1c29a8cd5e375995cfb68d/7/6/7613036989268_H__g-1_q-1_c-12_m-0.png',
}

const SKIP_FROM_SIG = new Set(['file', 'api_key', 'resource_type', 'cloud_name'])

function sign(params) {
  // Sort all signable params alphabetically, append secret, SHA-1
  const str = Object.entries(params)
    .filter(([k]) => !SKIP_FROM_SIG.has(k))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join('&') + API_SECRET
  return crypto.createHash('sha1').update(str).digest('hex')
}

async function upload(publicId, sourceUrl) {
  const timestamp = Math.floor(Date.now() / 1000)

  const params = {
    public_id: publicId,
    timestamp: String(timestamp),
    overwrite: 'true',
  }
  const signature = sign(params)

  const body = new URLSearchParams({
    file: sourceUrl,
    api_key: API_KEY,
    signature,
    ...params,
  })

  const res = await fetch(UPLOAD_URL, { method: 'POST', body })
  const data = await res.json()

  if (res.ok) {
    console.log(`  ✓ ${publicId}`)
    console.log(`    → ${data.secure_url}`)
    return true
  } else {
    console.error(`  ✗ ${publicId}`)
    console.error(`    Error: ${data.error?.message ?? JSON.stringify(data)}`)
    return false
  }
}

console.log('Uploading product images to Cloudinary…\n')

let ok = 0, fail = 0
for (const [publicId, url] of Object.entries(IMAGES)) {
  process.stdout.write(`→ ${publicId}\n`)
  const success = await upload(publicId, url)
  success ? ok++ : fail++
}

console.log(`\nDone — ${ok} uploaded, ${fail} failed.`)
if (ok > 0) {
  console.log(`
Next steps:
  1. In src/features/products/fallback.js:
     Uncomment the cloudinary_id lines for each machine (and remove source_image_url).
  2. In your Google Sheet (machines tab):
     Add a 'cloudinary_id' column with values like thebeansknees/machines/mini-me
  3. Commit + push → Netlify redeploys.
`)
}
