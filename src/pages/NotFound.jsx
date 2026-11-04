import SEO from '../seo/SEO'

export default function NotFound() {
  return (
    <>
      <SEO title="Page Not Found" description="The page you're looking for doesn't exist." />

      <main
        className="min-h-[70dvh] bg-cream-50 flex flex-col items-center justify-center px-6 text-center"
        aria-label="Page not found"
      >
        {/* Illustration */}
        <svg
          className="w-20 h-20 mb-6 opacity-25"
          viewBox="0 0 80 80"
          fill="none"
          aria-hidden="true"
        >
          <rect x="16" y="24" width="40" height="36" rx="6" stroke="#3E2009" strokeWidth="2"/>
          <path d="M56 34h6a6 6 0 010 12h-6" stroke="#3E2009" strokeWidth="2" strokeLinecap="round"/>
          <path d="M32 38h16M32 46h10" stroke="#3E2009" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>

        {/* Eyebrow */}
        <span className="eyebrow mb-4">
          <svg width="6" height="6" viewBox="0 0 6 6" aria-hidden="true">
            <circle cx="3" cy="3" r="3" fill="currentColor"/>
          </svg>
          404
        </span>

        <h1 className="font-display text-[clamp(2.5rem,8vw,5rem)] leading-tight text-brown-900 mb-4">
          Lost your cup?
        </h1>

        <p className="font-body text-lg text-brown-400 max-w-sm mb-10 leading-relaxed">
          This page doesn't exist — but a great cup of coffee does.
          Head back to the shop or reach us on WhatsApp.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <a
            href="/"
            className="group flex items-center gap-2 px-7 py-3.5 rounded-full
              bg-brown-900 text-cream-50 font-ui font-medium text-sm
              hover:bg-brown-600 active:scale-[0.98]
              transition-all duration-300 ease-spring"
          >
            Back to shop
            <span
              className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center
                group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              aria-hidden="true"
            >
              →
            </span>
          </a>

          <a
            href="https://wa.me/254114086711"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-7 py-3.5 rounded-full
              bg-whatsapp text-white font-ui font-medium text-sm
              hover:opacity-90 active:scale-[0.98]
              transition-all duration-300 ease-spring"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M13.5 8a5.5 5.5 0 01-8.2 4.77L2 14l1.23-3.3A5.5 5.5 0 1113.5 8z"
                stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
            </svg>
            WhatsApp us
          </a>
        </div>
      </main>
    </>
  )
}
