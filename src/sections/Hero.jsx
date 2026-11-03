import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCart } from '../features/cart/CartContext'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const { openCart, totalItems } = useCart()
  const headlineRef = useRef(null)
  const subRef      = useRef(null)
  const ctaRef      = useRef(null)
  const scrollRef   = useRef(null)
  const bgRef       = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      // Just show everything without animation
      ;[headlineRef, subRef, ctaRef, scrollRef].forEach(r => {
        if (r.current) r.current.style.opacity = '1'
      })
      return
    }

    const ctx = gsap.context(() => {
      // Entrance sequence
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(headlineRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2 }, 0)
        .fromTo(subRef.current,      { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9 }, 0.3)
        .fromTo(ctaRef.current,      { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 0.6)
        .fromTo(scrollRef.current,   { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, 1.0)

      // Parallax on scroll — bg moves slower than viewport
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: bgRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
      aria-label="Hero — The Beans Knees"
    >
      {/* Background — warm cream gradient with subtle radial warmth */}
      <div
        ref={bgRef}
        className="absolute inset-0 -bottom-[30%]"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 70%, rgba(200,135,62,0.12) 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 20% 30%, rgba(196,154,108,0.08) 0%, transparent 60%),
            linear-gradient(180deg, #F4EAD8 0%, #E8D9C0 60%, #D9C7A8 100%)
          `,
        }}
        aria-hidden="true"
      />

      {/* Decorative circles */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full border border-amber-brand/10 pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-1/3 left-1/5 w-96 h-96 rounded-full border border-brown-300/8 pointer-events-none" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">

        {/* Eyebrow */}
        <div className="flex justify-center mb-8">
          <span className="eyebrow">
            <svg width="6" height="6" viewBox="0 0 6 6" aria-hidden="true"><circle cx="3" cy="3" r="3" fill="currentColor"/></svg>
            Nairobi's Coffee Capsule Destination
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="font-display text-[clamp(3.5rem,10vw,8rem)] leading-[0.95] text-brown-900 mb-6"
          style={{ opacity: 0 }}
        >
          Life's too short<br />
          <em className="font-body italic font-light text-amber-brand not-italic">
            for bad coffee.
          </em>
        </h1>

        {/* Subtitle */}
        <p
          ref={subRef}
          className="font-body text-[clamp(1.1rem,2.5vw,1.4rem)] text-brown-400 leading-relaxed max-w-xl mx-auto mb-10"
          style={{ opacity: 0 }}
        >
          Shop Nescafé Dolce Gusto machines and pods in Nairobi.
          <br className="hidden md:block" />
          WhatsApp us — we'll deliver to your door.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
          style={{ opacity: 0 }}
        >
          <a
            href="#machines"
            className="group flex items-center gap-2 px-7 py-3.5 rounded-full
              bg-amber-brand text-cream-50 font-ui font-medium
              hover:opacity-90 active:scale-[0.98]
              transition-all duration-300 ease-spring"
          >
            Shop Machines
            <span className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center
              group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              aria-hidden="true">
              →
            </span>
          </a>
          <a
            href="#pods"
            className="flex items-center gap-2 px-7 py-3.5 rounded-full
              border border-brown-200 text-brown-600 font-ui font-medium
              hover:border-amber-brand hover:text-amber-brand
              active:scale-[0.98]
              transition-all duration-300 ease-spring"
          >
            Browse Pods
          </a>
          {totalItems > 0 && (
            <button
              onClick={openCart}
              className="flex items-center gap-2 px-5 py-3.5 rounded-full
                bg-amber-brand text-cream-50 font-ui font-medium
                hover:opacity-90 active:scale-[0.98]
                transition-all duration-300 ease-spring animate-fadeUp"
            >
              View cart ({totalItems})
            </button>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        <span className="font-ui text-[10px] uppercase tracking-widest text-brown-300">Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-brown-300 to-transparent" />
      </div>
    </section>
  )
}
