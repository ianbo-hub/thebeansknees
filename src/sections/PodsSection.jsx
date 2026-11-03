import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PodCard from '../shared/components/ui/PodCard'
import { SkeletonGrid } from '../shared/components/ui/SkeletonCard'
import { EmptyPods } from '../shared/components/ui/EmptyState'

gsap.registerPlugin(ScrollTrigger)

const FILTERS = ['All', 'Nescafé Dolce Gusto', 'Starbucks']

export default function PodsSection({ pods, loading }) {
  const [filter, setFilter]     = useState('All')
  const sectionRef = useRef(null)
  const headRef    = useRef(null)
  const gridRef    = useRef(null)

  const filtered = pods?.filter(p => {
    if (filter === 'All') return true
    if (filter === 'Starbucks') return p.brand?.toLowerCase().includes('starbucks')
    if (filter === 'Nescafé Dolce Gusto') return !p.brand?.toLowerCase().includes('starbucks')
    return true
  }) || []

  useEffect(() => {
    if (loading) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headRef.current, start: 'top 95%', once: true } }
      )
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('article')
        gsap.fromTo(cards,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: { trigger: gridRef.current, start: 'top 95%', once: true } }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [loading])

  return (
    <section
      id="pods"
      ref={sectionRef}
      className="py-24 md:py-32 px-6 bg-cream-100"
      aria-label="Coffee pods"
    >
      <div className="max-w-5xl mx-auto">

        {/* Header + filters */}
        <div ref={headRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-lg">
            <div className="eyebrow mb-4">
              <svg width="6" height="6" viewBox="0 0 6 6" aria-hidden="true"><circle cx="3" cy="3" r="3" fill="currentColor"/></svg>
              The Pods
            </div>
            <h2 className="font-display text-[clamp(2.8rem,6vw,4.5rem)] leading-tight text-brown-900 mb-3">
              Every sip, a story
            </h2>
            <p className="font-body text-lg text-brown-400 leading-relaxed">
              Six flavours at KES 2,000 each. From bold Americano to creamy Latte Macchiato —
              and two Starbucks Reserve blends.
            </p>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 shrink-0" role="group" aria-label="Filter pods by brand">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`px-4 py-2 rounded-full font-ui text-sm font-medium
                  transition-all duration-300 ease-spring active:scale-[0.97]
                  ${filter === f
                    ? 'bg-brown-900 text-cream-50'
                    : 'bg-cream-50 text-brown-600 border border-cream-200 hover:border-brown-300'
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"
        >
          {loading ? (
            <SkeletonGrid type="pod" count={6} />
          ) : filtered.length === 0 ? (
            <EmptyPods />
          ) : (
            filtered.map(pod => (
              <PodCard key={pod.id} pod={pod} />
            ))
          )}
        </div>

        {/* Price note */}
        {!loading && filtered.length > 0 && (
          <p className="mt-8 text-center font-ui text-xs text-brown-300">
            All pods KES 2,000 per pack · Compatible with all Dolce Gusto machines
          </p>
        )}
      </div>
    </section>
  )
}
