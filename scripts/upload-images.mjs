/**
 * upload-images.mjs  — fixed for hotlink-protected sources
 * Downloads each image locally first, then uploads the bytes to Cloudinary.
 *
 * Setup: create a .env.cloudinary file in the project root with:
 *   CLOUDINARY_CLOUD=sxyb8iya
 *   CLOUDINARY_API_KEY=your_api_key
 *   CLOUDINARY_API_SECRET=your_api_secret
 *
 * Run (Node 20.6+):
 *   node --env-file=.env.cloudinary scripts/upload-images.mjs
 */
import crypto from 'node:crypto'
// FormData and Blob are globals in Node 18+ — no import needed

const CLOUD      = process.env.CLOUDINARY_CLOUD
const API_KEY    = process.env.CLOUDINARY_API_KEY
const API_SECRET = process.env.CLOUDINARY_API_SECRET

if (!CLOUD || !API_KEY || !API_SECRET) {
  console.error('Missing Cloudinary env vars. Create .env.cloudinary and run:')
  console.error('  node --env-file=.env.cloudinary scripts/upload-images.mjs')
  process.exit(1)
}

const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`

const IMAGES = {
  // ── Machines ──────────────────────────────────────────────────────────────
  'thebeansknees/machines/mini-me':
    'https://www.dolce-gusto.co.uk/media/catalog/product/cache/a7ed62b12c9d28aa0842b5a9bc7623a5/m/a/mac0000123-1_gallery1q.png',

  'thebeansknees/machines/infinissima':
    'https://static01.galaxus.com/productimages/7/6/3/6/9/2/3/4/7/0/6/2/3/5/1/9/8/1/0/1b47c5d3-e4d9-4669-92a3-7e44f67646ef_cropped.jpg_720.jpeg',

  'thebeansknees/machines/classic':
    'https://www.kontrolsat.com/99614-large_default/semi-automatic-coffee-machine-krups-dolce-gusto-kp830110.webp',

  // ── Pods ──────────────────────────────────────────────────────────────────
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

const SKIP = new Set(['api_key', 'resource_type', 'cloud_name'])

function sign(params) {
  const str = Object.entries(params)
    .filter(([k]) => !SKIP.has(k))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join('&') + API_SECRET
  return crypto.createHash('sha1').update(str).digest('hex')
}

async function downloadImage(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
      'Referer': 'https://www.dolce-gusto.co.uk/',
    },
  })
  if (!res.ok) throw new Error(`Download failed: ${res.status} ${res.statusText}`)
  const buf = await res.arrayBuffer()
  const contentType = res.headers.get('content-type') || 'image/png'
  return { buf, contentType }
}

async function upload(publicId, sourceUrl) {
  // Step 1: download image bytes locally
  let imageData
  try {
    imageData = await downloadImage(sourceUrl)
  } catch (e) {
    throw new Error(`Download error: ${e.message}`)
  }

  // Step 2: build signed params
  const timestamp = String(Math.floor(Date.now() / 1000))
  const params = { public_id: publicId, timestamp, overwrite: 'true' }
  const signature = sign(params)

  // Step 3: upload as multipart file
  const form = new FormData()
  form.append('api_key',   API_KEY)
  form.append('signature', signature)
  for (const [k, v] of Object.entries(params)) form.append(k, v)

  const ext = sourceUrl.split('.').pop().split('?')[0] || 'png'
  form.append('file', new Blob([imageData.buf], { type: imageData.contentType }), `image.${ext}`)

  const res = await fetch(UPLOAD_URL, { method: 'POST', body: form })
  const data = await res.json()

  if (!res.ok) throw new Error(data.error?.message ?? JSON.stringify(data))
  return data.secure_url
}

console.log('Uploading product images to Cloudinary…\n')

let ok = 0, fail = 0
for (const [publicId, url] of Object.entries(IMAGES)) {
  process.stdout.write(`→ ${publicId}\n`)
  try {
    const secureUrl = await upload(publicId, url)
    console.log(`  ✓ uploaded`)
    console.log(`    ${secureUrl}\n`)
    ok++
  } catch (e) {
    console.log(`  ✗ ${e.message}\n`)
    fail++
  }
}

console.log(`Done — ${ok} uploaded, ${fail} failed.`)
if (ok === Object.keys(IMAGES).length) {
  console.log('\nAll images uploaded! Now update fallback.js:')
  console.log('  - Uncomment cloudinary_id lines for all 3 machines')
  console.log('  - Remove the source_image_url lines')
  console.log('  - Push to GitHub')
}
