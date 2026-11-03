import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * REVIEW_FORM_URL — paste your Google Form "pre-filled link" here.
 *
 * How to get it:
 *   1. Create a Google Form with 2 fields:
 *        • "Instagram handle (optional)" — Short answer
 *        • "Your review" — Paragraph
 *   2. In the form editor: ⋮ menu → "Get pre-filled link" → copy URL
 *   3. Replace the placeholder below with that URL.
 */
const REVIEW_FORM_URL = 'https://forms.gle/6CrdA5tFmDJgFHst9'

/**
 * Hardcoded fallback reviews.
 * Shown instantly while the live reviews load, and if the API is unreachable.
 * Once you add these three to your Google Sheet with approved=TRUE,
 * they'll also appear via the API and you can remove them from here if you like.
 */
const FALLBACK_REVIEWS = [
  { quote: 'The smell is decadent',                          handle: 'mworia4',       date: 'July 2021'  },
  { quote: 'Amazing hot chocolate for the cozy evenings',    handle: 'zima_manicure', date: 'April 2021' },
  { quote: "Who wouldn't enjoy this? Lovely evening 🤎",    handle: 'mworia4',       date: 'July 2021'  },
]

const PROMISES = [
  { label: '100% Authentic', icon: '★' },
  { label: 'Same-Day Delivery', icon: '⚡' },
  { label: 'Human Support', icon: '💬' },
]

function TestimonialCard({ quote, handle, date }) {
  return (
    <div className="card-outer-dark">
      <div className="card-inner-dark p-6 flex flex-col gap-5">
        {/* Big open-quote mark */}
        <span className="font-display text-5xl leading-none text-amber-brand/40 select-none" aria-hidden="true">
          "
        </span>

        {/* Review text */}
        <p className="font-body text-xl text-cream-50 leading-relaxed -mt-3">
          {quote}
        </p>

        {/* Divider */}
        <div className="border-t border-white/8" />

        {/* Reviewer */}
        <div className="flex items-center gap-3">
          {/* Initial avatar */}
          <div className="w-8 h-8 rounded-full bg-amber-brand/15 flex items-center justify-center shrink-0">
            <span className="font-ui text-xs font-semibold text-amber-brand uppercase">
              {handle[0]}
            </span>
          </div>
          <div>
            <p className="font-ui text-sm font-medium text-cream-50">@{handle}</p>
            <p className="font-ui text-xs text-cream-50/30">{date}</p>
          </div>
          {/* Instagram source badge */}
          <div className="ml-auto">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-label="Posted on Instagram">
              <rect x="2" y="2" width="20" height="20" rx="5" stroke="#C8873E" strokeWidth="1.3" strokeOpacity="0.6"/>
              <circle cx="12" cy="12" r="4.5" stroke="#C8873E" strokeWidth="1.3" strokeOpacity="0.6"/>
              <circle cx="17.5" cy="6.5" r="1" fill="#C8873E" fillOpacity="0.6"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState(FALLBACK_REVIEWS)

  const sectionRef = useRef(null)
  const headRef    = useRef(null)
  const gridRef    = useRef(null)
  const ctaRef     = useRef(null)

  /* ── Fetch live reviews from Google Sheet (via Netlify Function) ── */
  useEffect(() => {
    fetch('/api/reviews')
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        if (data?.reviews?.length) {
          setReviews(data.reviews)
        }
      })
      .catch(() => {
        // Silently fall back to the hardcoded reviews above
      })
  }, [])

  /* ── GSAP scroll animations ── */
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headRef.current, start: 'top 95%', once: true } }
      )
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.card-outer-dark')
        gsap.fromTo(cards,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: { trigger: gridRef.current, start: 'top 95%', once: true } }
        )
      }
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: ctaRef.current, start: 'top 95%', once: true } }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="py-24 md:py-32 px-6 bg-brown-900"
      aria-label="Customer stories"
    >
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div ref={headRef} className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <span className="eyebrow">
              <svg width="6" height="6" viewBox="0 0 6 6" aria-hidden="true"><circle cx="3" cy="3" r="3" fill="currentColor"/></svg>
              Nairobi is talking
            </span>
          </div>
          <h2 className="font-display text-[clamp(2.8rem,6vw,4.5rem)] text-cream-50 leading-tight mb-4">
            Real stories, real coffee
          </h2>
          <p className="font-body text-lg text-brown-300 max-w-lg mx-auto">
            From our customers — people who've ordered and are loving their machines.
          </p>

          {/* Promise trust marks */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {PROMISES.map(p => (
              <span
                key={p.label}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                  bg-white/5 border border-white/10
                  font-ui text-xs font-medium text-cream-50/70"
              >
                <span className="text-amber-brand text-[10px]">{p.icon}</span>
                {p.label}
              </span>
            ))}
          </div>
        </div>

        {/* Testimonial grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16"
        >
          {reviews.map((r, i) => (
            <TestimonialCard key={i} quote={r.quote} handle={r.handle} date={r.date} />
          ))}
        </div>

        {/* Community CTA */}
        <div ref={ctaRef} className="card-outer-dark">
          <div className="card-inner-dark p-8 md:p-12 text-center">
            <div className="flex justify-center mb-6" aria-hidden="true">
              <div className="w-14 h-14 rounded-full bg-amber-brand/10 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                  <path d="M8 10h16l-2 12H10L8 10z" stroke="var(--amber)" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M22 13h3a2 2 0 010 4h-3" stroke="var(--amber)" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M12 6c0-2 2-2 2-4" stroke="var(--amber)" strokeWidth="1.3" strokeLinecap="round"/>
                  <path d="M16 6c0-2 2-2 2-4" stroke="var(--amber)" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
            <h3 className="font-display text-[clamp(2rem,4vw,3rem)] text-cream-50 mb-3">
              Loving your coffee?
            </h3>
            <p className="font-body text-lg text-brown-300 max-w-md mx-auto mb-8 leading-relaxed">
              We'd love to hear your story. Takes 30 seconds — we'll feature it here with your permission.
            </p>
            <a
              href={REVIEW_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full
                bg-amber-brand text-cream-50 font-ui font-medium
                hover:opacity-90 active:scale-[0.98]
                transition-all duration-300 ease-spring"
            >
              Leave a review
              <span className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center text-sm" aria-hidden="true">
                →
              </span>
            </a>
            <p className="mt-4 font-ui text-xs text-cream-50/30">
              We only publish with your explicit consent.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
