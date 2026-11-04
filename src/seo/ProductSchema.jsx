import { useEffect } from 'react'
import { SITE_URL } from '../shared/lib/constants'

/**
 * ProductSchema — injects schema.org/Product JSON-LD for each machine and pod.
 * Uses direct DOM injection via useEffect instead of react-helmet-async,
 * because react-helmet-async does not reliably inject <script> tags in React 18.
 */
export default function ProductSchema({ machines = [], pods = [] }) {
  useEffect(() => {
    if (!machines.length && !pods.length) return

    const productItems = [
      ...machines.map((m, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Product',
          name: m.name,
          description: m.tagline,
          brand: { '@type': 'Brand', name: 'Nescafé Dolce Gusto' },
          url: `${SITE_URL}/#machines`,
          ...(m.price_kes ? {
            offers: {
              '@type': 'Offer',
              priceCurrency: 'KES',
              price: m.price_kes,
              availability: m.status === 'sold_out'
                ? 'https://schema.org/OutOfStock'
                : 'https://schema.org/InStock',
              seller: { '@type': 'Organization', name: 'The Beans Knees' },
            },
          } : {}),
        },
      })),
      ...pods.map((p, i) => ({
        '@type': 'ListItem',
        position: machines.length + i + 1,
        item: {
          '@type': 'Product',
          name: p.name,
          description: p.flavour_notes,
          brand: { '@type': 'Brand', name: p.brand || 'Nescafé Dolce Gusto' },
          url: `${SITE_URL}/#pods`,
          ...(p.price_kes ? {
            offers: {
              '@type': 'Offer',
              priceCurrency: 'KES',
              price: p.price_kes,
              availability: p.status === 'sold_out'
                ? 'https://schema.org/OutOfStock'
                : 'https://schema.org/InStock',
              seller: { '@type': 'Organization', name: 'The Beans Knees' },
            },
          } : {}),
        },
      })),
    ]

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'The Beans Knees — Dolce Gusto Machines & Pods',
      numberOfItems: productItems.length,
      itemListElement: productItems,
    }

    // Remove any stale script from a previous render
    document.getElementById('tbk-product-schema')?.remove()

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'tbk-product-schema'
    script.text = JSON.stringify(schema)
    document.head.appendChild(script)

    return () => {
      document.getElementById('tbk-product-schema')?.remove()
    }
  }, [machines, pods])

  return null
}
