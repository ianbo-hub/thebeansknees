import SEO from '../seo/SEO'
import ProductSchema from '../seo/ProductSchema'
import Hero from '../sections/Hero'
import MachinesSection from '../sections/MachinesSection'
import PodsSection from '../sections/PodsSection'
import ReviewsSection from '../sections/ReviewsSection'
import AskUsSection from '../sections/AskUsSection'
import { useProducts } from '../features/products/useProducts'
import { useLenis } from '../shared/hooks/useLenis'

/**
 * HomePage — the main single-page view of the site.
 * Separated from App so the router can render other pages (Privacy, Cookie).
 */
export default function HomePage() {
  useLenis()
  const { data, loading } = useProducts()

  return (
    <>
      <SEO />
      {/* Product-level JSON-LD — only rendered once data is available */}
      {!loading && (
        <ProductSchema
          machines={data?.machines ?? []}
          pods={data?.pods ?? []}
        />
      )}
      <main id="main-content">
        <Hero />
        <MachinesSection
          machines={data?.machines}
          loading={loading}
        />
        <PodsSection
          pods={data?.pods}
          loading={loading}
        />
        <ReviewsSection />
        <AskUsSection />
      </main>
    </>
  )
}
