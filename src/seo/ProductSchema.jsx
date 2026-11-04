import { Helmet } from 'react-helmet-async'
import { SITE_URL } from '../shared/lib/constants'

/**
 * ProductSchema — injects schema.org/Product JSON-LD for each machine and pod.
 * Gives Google enough data to show rich product results in search.
 * Rendered in HomePage once products are loaded (not during skeleton state).
 */
export default function ProductSchema({ machines = [], pods = [] }) {
  if (!machines.length && !pods.length) return null

  const productItems = [
    ...machines.map((m, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: m.name,
        description: m.tagline,
        brand: { '@type': 'Brand', name: 'Nescafé Dolce Gusto' },
        image: m.imageUrl || undefined,
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
        image: p.imageUrl || undefined,
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

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}
