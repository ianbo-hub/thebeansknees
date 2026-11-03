/**
 * Cloudinary image URL helpers.
 * Cloud name: sxyb8iya (safe for frontend — read-only delivery only)
 *
 * Two delivery types:
 *   uploadUrl  – for assets already uploaded to Cloudinary (machines)
 *   fetchUrl   – for assets served via Cloudinary Fetch (pods; no upload needed)
 *
 * Fetch delivery requires the source domain to be allow-listed in:
 *   Cloudinary dashboard → Settings → Security → Allowed fetch domains
 *   Add: www.dolce-gusto.co.uk
 */

import { CLOUD_NAME } from './constants'

const BASE = `https://res.cloudinary.com/${CLOUD_NAME}/image`

/**
 * URL for an asset uploaded to Cloudinary.
 * @param {string} publicId  e.g. "thebeansknees/machines/mini-me"
 * @param {Object} opts
 */
export function uploadUrl(publicId, { w = 600, h = 600, fit = 'pad', bg = 'f5efe3' } = {}) {
  if (!publicId) return null
  const t = `f_auto,q_auto,w_${w},h_${h},c_${fit},b_rgb:${bg}`
  return `${BASE}/upload/${t}/${publicId}`
}

/**
 * URL for a remote image served via Cloudinary Fetch (no upload required).
 * @param {string} sourceUrl  The original image URL to proxy/cache
 * @param {Object} opts
 */
export function fetchUrl(sourceUrl, { w = 600 } = {}) {
  if (!sourceUrl) return null
  const t = `f_auto,q_auto,w_${w}`
  return `${BASE}/fetch/${t}/${encodeURIComponent(sourceUrl)}`
}

/**
 * Smart selector: uses uploadUrl if cloudinary_id is set, else fetchUrl.
 * Works for both machines (upload) and pods (fetch).
 * @param {Object} product
 * @param {Object} opts
 */
export function productImageUrl(product, opts = {}) {
  if (product?.cloudinary_id) return uploadUrl(product.cloudinary_id, opts)
  if (product?.source_image_url) return fetchUrl(product.source_image_url, opts)
  return null
}

/**
 * Lifestyle / hero image for machines (optional second angle).
 */
export function lifestyleImageUrl(product, opts = {}) {
  if (product?.cloudinary_id_lifestyle)
    return uploadUrl(product.cloudinary_id_lifestyle, { w: 1200, h: 800, fit: 'fill', ...opts })
  return productImageUrl(product, opts)
}
