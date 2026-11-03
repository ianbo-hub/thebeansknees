import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { buildGeneralUrl } from '../features/checkout/whatsapp'
import { sanitizeText } from '../shared/lib/sanitize'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

const FAQ = [
  {
    q: 'How does ordering work?',
    a: 'Add items to your cart, fill in your Nairobi delivery address, then tap "Order on WhatsApp". We\'ll receive a pre-filled message with your full order — just send it and we\'ll confirm within the hour.',
  },
  {
    q: 'Do you deliver across all of Nairobi?',
    a: 'Yes — we deliver to all 17 sub-counties in Nairobi. Delivery timelines vary by area; WhatsApp us for an estimated time to your specific location.',
  },
  {
    q: 'Are the machines genuine Dolce Gusto?',
    a: 'Absolutely. We stock 100% authentic Nescafé Dolce Gusto machines and official pods, including the Starbucks by Nescafé collaboration range.',
  },
  {
    q: 'Can I buy pods without a machine?',
    a: 'Yes! If you already have a Dolce Gusto machine, just browse the pods and add what you need. All our pods are compatible with any Dolce Gusto machine.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept M-Pesa on delivery. Cash on delivery is available for certain locations. WhatsApp us to confirm payment options for your area.',
  },
]

function FaqItem({ faq }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left
          hover:text-amber-brand transition-colors group"
        aria-expanded={open}
      >
        <span className="font-body text-lg text-cream-50 group-hover:text-amber-brand transition-colors">
          {faq.q}
        </span>
        <span className={`shrink-0 w-6 h-6 rounded-full border border-white/20 flex items-center justify-center
          transition-transform duration-300 ease-spring text-cream-50/40
          ${open ? 'rotate-45' : ''}`}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M5 2v6M2 5h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-400 ease-spring ${open ? 'max-h-48 pb-5' : 'max-h-0'}`}
      >
        <p className="font-body text-cream-50/55 text-base leading-relaxed pr-8">
          {faq.a}
        </p>
      </div>
    </div>
  )
}

export default function AskUsSection() {
  const [message, setMessage] = useState('')
  const sectionRef = useRef(null)
  const headRef    = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headRef.current, start: 'top 95%', once: true } }
      )
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: contentRef.current, start: 'top 95%', once: true } }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSend = (e) => {
    e.preventDefault()
    if (!message.trim()) return
    // Sanitize before embedding in WhatsApp URL
    const safe = sanitizeText(message.trim(), 500)
    const url = buildGeneralUrl(safe)
    window.open(url, '_blank', 'noopener,noreferrer')
    setMessage('')
  }

  return (
    <section
      id="ask-us"
      ref={sectionRef}
      className="py-24 md:py-32 px-6 bg-espresso"
      aria-label="FAQ and contact"
    >
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div ref={headRef} className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <span className="eyebrow">
              <svg width="6" height="6" viewBox="0 0 6 6" aria-hidden="true"><circle cx="3" cy="3" r="3" fill="currentColor"/></svg>
              Got Questions?
            </span>
          </div>
          <h2 className="font-display text-[clamp(2.8rem,6vw,4.5rem)] text-cream-50 leading-tight mb-4">
            We're on WhatsApp
          </h2>
          <p className="font-body text-lg text-cream-50/50 max-w-md mx-auto">
            Anything at all — machine advice, pod recommendations, delivery questions.
            We reply fast.
          </p>
        </div>

        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* FAQ */}
          <div>
            <h3 className="font-ui text-xs uppercase tracking-widest text-cream-50/30 mb-6">
              Frequently asked
            </h3>
            {FAQ.map((faq, i) => (
              <FaqItem key={i} faq={faq} />
            ))}
          </div>

          {/* Message form */}
          <div className="card-outer-dark">
            <div className="card-inner-dark p-6 md:p-8">
              <h3 className="font-body text-2xl text-cream-50 mb-2">Send a message</h3>
              <p className="font-body text-cream-50/50 text-base mb-6">
                Type your question below and we'll open WhatsApp with your message ready to send.
              </p>

              <form onSubmit={handleSend} className="space-y-4">
                <div>
                  <label htmlFor="ask-message" className="block font-ui text-xs text-cream-50/40 mb-2">
                    Your question
                  </label>
                  <textarea
                    id="ask-message"
                    rows={4}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="e.g. Which machine is best for a family of four who love lattes?"
                    maxLength={500}
                    className="w-full font-ui text-sm bg-white/5 border border-white/10 rounded-2xl px-4 py-3
                      text-cream-50 placeholder-cream-50/25
                      focus:border-amber-brand focus:ring-2 focus:ring-amber-brand/20 outline-none
                      transition-colors resize-none"
                    required
                  />
                  <p className="mt-1 font-ui text-xs text-cream-50/25 text-right">
                    {message.length}/500
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-full
                    bg-whatsapp text-white font-ui font-medium
                    hover:opacity-90 active:scale-[0.98]
                    transition-all duration-300 ease-spring"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M15.5 9a6.5 6.5 0 01-9.68 5.65L3 15.5l.88-2.82A6.5 6.5 0 1115.5 9z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
                  </svg>
                  Ask on WhatsApp
                </button>
              </form>

              <p className="mt-4 font-ui text-xs text-center text-cream-50/25">
                +254 114 086 711 · Mon–Sun 8am–8pm
              </p>

              {/* Privacy note */}
              <p className="mt-3 font-ui text-[11px] text-center text-cream-50/20 leading-relaxed">
                Your message is sent directly via WhatsApp. We don't store it on our servers.{' '}
                <Link to="/privacy-policy" className="underline hover:text-amber-brand transition-colors">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
