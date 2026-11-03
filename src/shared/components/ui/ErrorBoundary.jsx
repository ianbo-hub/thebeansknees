import { Component } from 'react'

/**
 * React Error Boundary — catches unhandled render errors and shows a
 * friendly fallback instead of a blank white screen.
 *
 * Usage:
 *   <ErrorBoundary>
 *     <YourComponent />
 *   </ErrorBoundary>
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // Structured error log — useful for Netlify function / analytics monitoring
    console.error(JSON.stringify({
      level:     'error',
      source:    'ErrorBoundary',
      message:   error?.message,
      stack:     error?.stack?.slice(0, 500),
      component: info?.componentStack?.slice(0, 300),
      timestamp: new Date().toISOString(),
    }))
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div
        role="alert"
        className="min-h-screen bg-cream-50 flex flex-col items-center justify-center px-6 text-center"
      >
        {/* Coffee cup illustration */}
        <svg
          className="w-20 h-20 mb-6 opacity-30"
          viewBox="0 0 80 80"
          fill="none"
          aria-hidden="true"
        >
          <rect x="16" y="24" width="40" height="36" rx="6" stroke="#6B3D1E" strokeWidth="2"/>
          <path d="M56 34h6a6 6 0 010 12h-6" stroke="#6B3D1E" strokeWidth="2" strokeLinecap="round"/>
          <path d="M26 56l4-4M30 56l-4-4" stroke="#6B3D1E" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M28 24 Q32 16 36 24" stroke="#6B3D1E" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <path d="M38 24 Q42 16 46 24" stroke="#6B3D1E" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        </svg>

        <h1 className="font-display text-4xl text-brown-900 mb-3">
          Something went wrong
        </h1>
        <p className="font-body text-lg text-brown-400 max-w-sm mb-8 leading-relaxed">
          We spilled our coffee. Refresh the page — if the problem persists, reach us on WhatsApp.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-full bg-brown-900 text-cream-50 font-ui text-sm font-medium
              hover:bg-brown-600 active:scale-[0.98] transition-all duration-300"
          >
            Refresh page
          </button>
          <a
            href="https://wa.me/254114086711"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-whatsapp text-white font-ui text-sm font-medium
              hover:opacity-90 active:scale-[0.98] transition-all duration-300"
          >
            Contact us
          </a>
        </div>
      </div>
    )
  }
}

export default ErrorBoundary
