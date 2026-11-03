import { API_TIMEOUT } from '../../shared/lib/constants'

/**
 * Fetch products from the Netlify function proxy.
 * Throws on HTTP errors or timeouts — callers handle fallback.
 *
 * @returns {Promise<{ machines: Array, pods: Array }>}
 */
export async function fetchProducts() {
  const res = await fetch('/api/products', {
    signal: AbortSignal.timeout(API_TIMEOUT),
  })

  if (!res.ok) {
    throw new Error(`Products API returned HTTP ${res.status}`)
  }

  const json = await res.json()

  if (json.error) {
    throw new Error(json.error)
  }

  return {
    machines: json.machines || [],
    pods:     json.pods     || [],
  }
}
