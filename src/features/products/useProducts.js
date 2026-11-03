import { useState, useEffect, useRef } from 'react'
import { productImageUrl } from '../../shared/lib/cloudinary'
import { fetchProducts } from './api'
import { FALLBACK_MACHINES, FALLBACK_PODS } from './fallback'

/* ─── In-memory cache — survives re-renders, cleared on hard refresh ─── */
let cache = null

function enrichProduct(p) {
  return {
    ...p,
    imageUrl: productImageUrl(p, { w: 600, h: 600 }),
  }
}

/**
 * useProducts — fetches machines + pods, with in-memory cache and graceful
 * fallback to hard-coded data when the API is unavailable or times out.
 */
export function useProducts() {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)
  const fetchedRef = useRef(false)

  useEffect(() => {
    // Prevent duplicate fetches in Strict Mode
    if (fetchedRef.current) return
    fetchedRef.current = true

    if (cache) {
      setData(cache)
      setLoading(false)
      return
    }

    async function load() {
      try {
        const { machines, pods } = await fetchProducts()
        const result = {
          machines: (machines.length ? machines : FALLBACK_MACHINES).map(enrichProduct),
          pods:     (pods.length     ? pods     : FALLBACK_PODS    ).map(enrichProduct),
          fromApi:  true,
        }
        cache = result
        setData(result)
      } catch (err) {
        console.warn('[useProducts] API unavailable — using fallback data:', err.message)
        const fallback = {
          machines: FALLBACK_MACHINES.map(enrichProduct),
          pods:     FALLBACK_PODS.map(enrichProduct),
          fromApi:  false,
        }
        cache = fallback
        setData(fallback)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return { data, loading, error }
}
