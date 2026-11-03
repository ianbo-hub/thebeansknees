import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../seo/SEO'

/**
 * Cookie Policy — The Beans Knees
 * Last reviewed: November 2026
 */

export default function CookiePolicy() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <>
      <SEO
        title="Cookie Policy"
        description="How The Beans Knees uses cookies and browser storage on this website."
        path="/cookie-policy"
      />

      <div className="min-h-screen bg-cream-50 px-6 py-20 md:py-28">
        <div className="max-w-2xl mx-auto">

          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-ui text-sm text-brown-400
              hover:text-amber-brand transition-colors mb-10"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to home
          </Link>

          {/* Header */}
          <div className="mb-12">
            <span className="eyebrow mb-4 inline-flex">
              <svg width="6" height="6" viewBox="0 0 6 6" aria-hidden="true"><circle cx="3" cy="3" r="3" fill="currentColor"/></svg>
              Legal
            </span>
            <h1 className="font-display text-5xl md:text-6xl text-brown-900 mb-4">
              Cookie Policy
            </h1>
            <p className="font-body text-brown-400 text-lg">
              Last updated: November 2026
            </p>
          </div>

          <div className="prose-body space-y-8">

            <section>
              <h2 className="font-ui font-semibold text-xl text-brown-900 mb-3">What are cookies?</h2>
              <p>
                Cookies are small text files placed on your device by websites you visit.
                They are widely used to make websites work, remember your preferences, and
                provide information to site owners.
              </p>
              <p className="mt-3">
                This site does not use traditional cookies. Instead, we use your browser's
                <strong> localStorage</strong> — a similar technology that stores data
                locally on your device without sending it to our servers.
              </p>
            </section>

            <section>
              <h2 className="font-ui font-semibold text-xl text-brown-900 mb-3">What we store and why</h2>

              <div className="overflow-x-auto -mx-2">
                <table className="w-full text-sm font-ui border-collapse min-w-[500px]">
                  <thead>
                    <tr className="border-b border-cream-200">
                      <th className="text-left py-3 px-2 text-brown-400 font-medium">Name</th>
                      <th className="text-left py-3 px-2 text-brown-400 font-medium">Type</th>
                      <th className="text-left py-3 px-2 text-brown-400 font-medium">Purpose</th>
                      <th className="text-left py-3 px-2 text-brown-400 font-medium">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="text-brown-600">
                    <tr className="border-b border-cream-200">
                      <td className="py-3 px-2 font-mono text-xs text-brown-500">tbk-cart-v1</td>
                      <td className="py-3 px-2">localStorage</td>
                      <td className="py-3 px-2">Saves your cart so items survive a page refresh. Never sent to our servers.</td>
                      <td className="py-3 px-2">Until cleared</td>
                    </tr>
                    <tr className="border-b border-cream-200">
                      <td className="py-3 px-2 font-mono text-xs text-brown-500">tbk-cookie-consent</td>
                      <td className="py-3 px-2">localStorage</td>
                      <td className="py-3 px-2">Remembers whether you accepted or declined our cookie notice.</td>
                      <td className="py-3 px-2">Until cleared</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="font-ui font-semibold text-xl text-brown-900 mb-3">Third-party services</h2>
              <p>
                The following third-party services may store data in your browser or
                log requests when you use this site:
              </p>

              <div className="mt-4 space-y-4">
                <div className="card-outer">
                  <div className="card-inner p-5">
                    <h3 className="font-ui font-semibold text-brown-900 mb-1">Google Fonts</h3>
                    <p className="text-brown-500 text-sm leading-relaxed">
                      We load typography from Google Fonts. When your browser downloads
                      these font files, Google's servers receive your IP address and browser
                      information. Google may use this data in accordance with their privacy
                      policy. We use Grand Hotel, Cormorant Garamond, and DM Sans.
                    </p>
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 font-ui text-xs text-amber-brand underline hover:text-amber-brand/80"
                    >
                      Google Privacy Policy →
                    </a>
                  </div>
                </div>

                <div className="card-outer">
                  <div className="card-inner p-5">
                    <h3 className="font-ui font-semibold text-brown-900 mb-1">Cloudinary</h3>
                    <p className="text-brown-500 text-sm leading-relaxed">
                      Product images are delivered via Cloudinary's CDN. Your browser
                      connects to Cloudinary's servers to download images. Cloudinary may
                      log request data including IP address.
                    </p>
                    <a
                      href="https://cloudinary.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 font-ui text-xs text-amber-brand underline hover:text-amber-brand/80"
                    >
                      Cloudinary Privacy Policy →
                    </a>
                  </div>
                </div>

                <div className="card-outer">
                  <div className="card-inner p-5">
                    <h3 className="font-ui font-semibold text-brown-900 mb-1">WhatsApp (Meta)</h3>
                    <p className="text-brown-500 text-sm leading-relaxed">
                      Clicking "Order on WhatsApp" or "Ask on WhatsApp" opens the WhatsApp
                      application with a pre-filled message. We do not embed WhatsApp on
                      this page or set WhatsApp cookies — only your own WhatsApp app is
                      involved when you choose to send a message.
                    </p>
                    <a
                      href="https://www.whatsapp.com/legal/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 font-ui text-xs text-amber-brand underline hover:text-amber-brand/80"
                    >
                      WhatsApp Privacy Policy →
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-ui font-semibold text-xl text-brown-900 mb-3">Strictly necessary vs. optional</h2>
              <p>
                The two localStorage items above (<code className="font-mono text-xs bg-cream-200 px-1 py-0.5 rounded">tbk-cart-v1</code> and{' '}
                <code className="font-mono text-xs bg-cream-200 px-1 py-0.5 rounded">tbk-cookie-consent</code>) are
                strictly necessary for the site to function correctly. Without them,
                your cart would reset every time you reload the page.
              </p>
              <p className="mt-3">
                We do not use any analytics, advertising, or profiling cookies or storage.
                There is nothing optional to turn off.
              </p>
            </section>

            <section>
              <h2 className="font-ui font-semibold text-xl text-brown-900 mb-3">How to clear your stored data</h2>
              <p>You can remove the data we store at any time:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-brown-500">
                <li><strong>Chrome / Edge:</strong> Settings → Privacy and security → Clear browsing data → Cached images and files / Site data</li>
                <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data → Clear Data</li>
                <li><strong>Safari:</strong> Settings → Safari → Advanced → Website Data → Remove All Website Data</li>
              </ul>
              <p className="mt-3">
                Clearing localStorage will remove your cart and your cookie consent choice.
                The cookie banner will reappear on your next visit.
              </p>
            </section>

            <section>
              <h2 className="font-ui font-semibold text-xl text-brown-900 mb-3">Changes to this policy</h2>
              <p>
                We may update this Cookie Policy. The date at the top of the page will
                always reflect the most recent update.
              </p>
            </section>

            <section>
              <h2 className="font-ui font-semibold text-xl text-brown-900 mb-3">Contact</h2>
              <p>
                Questions? WhatsApp us at{' '}
                <a
                  href="https://wa.me/254114086711"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-brand underline hover:text-amber-brand/80"
                >
                  +254 114 086 711
                </a>
                , Mon–Sun 8am–8pm.
              </p>
            </section>

          </div>

          {/* Footer nav */}
          <div className="mt-12 pt-8 border-t border-cream-200 flex flex-wrap gap-4">
            <Link to="/" className="font-ui text-sm text-brown-400 hover:text-amber-brand transition-colors">
              ← Home
            </Link>
            <Link to="/privacy-policy" className="font-ui text-sm text-brown-400 hover:text-amber-brand transition-colors">
              Privacy Policy →
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
