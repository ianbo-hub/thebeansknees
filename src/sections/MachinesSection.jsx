import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MachineCard from '../shared/components/ui/MachineCard'
import MachineDetailDrawer from '../shared/components/ui/MachineDetailDrawer'
import { SkeletonGrid } from '../shared/components/ui/SkeletonCard'
import { EmptyMachines } from '../shared/components/ui/EmptyState'

gsap.registerPlugin(ScrollTrigger)

export default function MachinesSection({ machines, loading }) {
  const [selectedMachine, setSelectedMachine] = useState(null)
  const sectionRef = useRef(null)
  const headRef    = useRef(null)
  const gridRef    = useRef(null)

  useEffect(() => {
    if (loading) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(headRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headRef.current, start: 'top 95%', once: true } }
      )

      // Stagger cards
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('article')
        gsap.fromTo(cards,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: { trigger: gridRef.current, start: 'top 95%', once: true } }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [loading])

  return (
    <section
      id="machines"
      ref={sectionRef}
      className="py-24 md:py-32 px-6 bg-brown-900"
      aria-label="Coffee machines"
    >
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div ref={headRef} className="max-w-xl mb-16">
          <div className="eyebrow mb-4">
            <svg width="6" height="6" viewBox="0 0 6 6" aria-hidden="true"><circle cx="3" cy="3" r="3" fill="currentColor"/></svg>
            The Machines
          </div>
          <h2 className="font-display text-[clamp(2.8rem,6vw,4.5rem)] leading-tight text-cream-50 mb-4">
            Find your perfect brew
          </h2>
          <p className="font-body text-lg text-brown-300 leading-relaxed">
            Three Dolce Gusto machines, each with 15 bars of pressure and
            compatibility with the full pod range. Pick the one that fits your kitchen.
          </p>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {loading ? (
            <SkeletonGrid type="machine" count={3} />
          ) : machines?.length === 0 ? (
            <EmptyMachines />
          ) : (
            machines?.map(machine => (
              <MachineCard
                key={machine.id}
                machine={machine}
                onViewDetails={setSelectedMachine}
              />
            ))
          )}
        </div>

        {/* WhatsApp fallback */}
        <div className="mt-10 text-center">
          <p className="font-body text-base text-brown-300 mb-3">
            Not sure which machine is right for you?
          </p>
          <a
            href="https://wa.me/254114086711?text=Hi%20The%20Beans%20Knees!%20I%20need%20help%20choosing%20a%20machine."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-ui text-sm font-medium text-amber-brand
              hover:text-amber-brand/80 transition-colors"
          >
            Ask us on WhatsApp →
          </a>
        </div>
      </div>

      {/* Machine detail drawer */}
      {selectedMachine && (
        <MachineDetailDrawer
          machine={selectedMachine}
          onClose={() => setSelectedMachine(null)}
        />
      )}
    </section>
  )
}
