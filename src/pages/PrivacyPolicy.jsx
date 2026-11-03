import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../seo/SEO'

/**
 * Privacy Policy — The Beans Knees
 * Last reviewed: November 2026
 *
 * This site:
 * - Has no user accounts or login system
 * - Collects no payment data (orders are completed via WhatsApp)
 * - Uses localStorage only for cart state and cookie consent
 * - Embeds Google Fonts (loaded from Google servers)
 * - Serves product images via Cloudinary CDN
 * - Links to WhatsApp for ordering and enquiries
 */

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <>
      <SEO
        title="Privacy Policy"
        description="How The Beans Knees collects, uses, and protects your personal data."
        path="/privacy-policy"
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
              Privacy Policy
            </h1>
            <p className="font-body text-brown-400 text-lg">
              Last updated: November 2026
            </p>
          </div>

          <div className="prose-body space-y-8">

            <section>
              <h2 className="font-ui font-semibold text-xl text-brown-900 mb-3">1. Who we are</h2>
              <p>
                The Beans Knees is a Nairobi-based retailer of Nescafé Dolce Gusto coffee
                machines and pods. We operate this website to let you browse our products
                and place orders via WhatsApp.
              </p>
              <p className="mt-3">
                Contact us any time at{' '}
                <a
                  href="https://wa.me/254114086711"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-brand underline hover:text-amber-brand/80"
                >
                  +254 114 086 711
                </a>{' '}
                (WhatsApp, Mon–Sun 8am–8pm).
              </p>
            </section>

            <section>
              <h2 className="font-ui font-semibold text-xl text-brown-900 mb-3">2. What data we collect</h2>

              <h3 className="font-ui font-medium text-brown-700 mb-2">2a. Data you give us (via WhatsApp)</h3>
              <p>
                When you place an order or send us a question, you start a WhatsApp
                conversation with us. The information in that conversation (your name,
                phone number, delivery address, and order details) is shared with us through
                WhatsApp and is governed by{' '}
                <a
                  href="https://www.whatsapp.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-brand underline hover:text-amber-brand/80"
                >
                  WhatsApp's Privacy Policy
                </a>
                . We use this data only to process your order and communicate with you.
              </p>

              <h3 className="font-ui font-medium text-brown-700 mt-4 mb-2">2b. Data we store locally on your device</h3>
              <p>
                We use your browser's <strong>localStorage</strong> to save:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-brown-500">
                <li><strong>Your cart contents</strong> — so items you add survive a page refresh. This data never leaves your device and is never sent to our servers.</li>
                <li><strong>Your cookie consent choice</strong> — so we don't show you the banner again after you've decided.</li>
              </ul>
              <p className="mt-3">
                We do not set any tracking cookies. We do not use advertising cookies or
                analytics cookies of any kind.
              </p>

              <h3 className="font-ui font-medium text-brown-700 mt-4 mb-2">2c. Data collected by third-party services</h3>
              <p>This site uses:</p>
              <ul className="list-disc list-inside mt-2 space-y-2 text-brown-500">
                <li>
                  <strong>Google Fonts</strong> — fonts are loaded from Google's servers. Google
                  may log your IP address when it serves the font files. See{' '}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-brand underline hover:text-amber-brand/80"
                  >
                    Google's Privacy Policy
                  </a>.
                </li>
                <li>
                  <strong>Cloudinary</strong> — product images are served from Cloudinary's CDN.
                  Your browser connects to Cloudinary's servers to download images. See{' '}
                  <a
                    href="https://cloudinary.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-brand underline hover:text-amber-brand/80"
                  >
                    Cloudinary's Privacy Policy
                  </a>.
                </li>
                <li>
                  <strong>WhatsApp (Meta)</strong> — clicking "Order on WhatsApp" or "Ask on
                  WhatsApp" opens a pre-filled message in WhatsApp. If you send that message,
                  it is governed by{' '}
                  <a
                    href="https://www.whatsapp.com/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-brand underline hover:text-amber-brand/80"
                  >
                    WhatsApp's Privacy Policy
                  </a>.
                </li>
                <li>
                  <strong>Netlify</strong> — our site is hosted on Netlify. Netlify may log
                  server-side request data (IP address, user agent, page requested). See{' '}
                  <a
                    href="https://www.netlify.com/privacy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-brand underline hover:text-amber-brand/80"
                  >
                    Netlify's Privacy Policy
                  </a>.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-ui font-semibold text-xl text-brown-900 mb-3">3. How we use your data</h2>
              <p>We use the information you send us via WhatsApp to:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-brown-500">
                <li>Confirm and fulfil your order</li>
                <li>Coordinate delivery to your address</li>
                <li>Answer your questions</li>
              </ul>
              <p className="mt-3">
                We do not use your data for marketing, advertising, or profiling.
                We do not sell or share your data with any third party beyond what is
                necessary to deliver your order.
              </p>
            </section>

            <section>
              <h2 className="font-ui font-semibold text-xl text-brown-900 mb-3">4. Data retention</h2>
              <p>
                Order information in our WhatsApp chat history is kept as long as
                the conversation exists in our WhatsApp account. You can request deletion
                at any time (see Section 6).
              </p>
              <p className="mt-3">
                Cart and consent data stored in your browser's localStorage stays on your
                device and is automatically removed when you clear your browser data. You
                can also clear it manually through your browser's storage settings at any time.
              </p>
            </section>

            <section>
              <h2 className="font-ui font-semibold text-xl text-brown-900 mb-3">5. Your rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-brown-500">
                <li>Know what personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent at any time (for cookie consent, use the banner)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-ui font-semibold text-xl text-brown-900 mb-3">6. Data deletion requests</h2>
              <p>
                To request deletion of any data we hold about you, send us a WhatsApp
                message at{' '}
                <a
                  href="https://wa.me/254114086711?text=Hi%2C%20I%27d%20like%20to%20request%20deletion%20of%20my%20personal%20data."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-brand underline hover:text-amber-brand/80"
                >
                  +254 114 086 711
                </a>{' '}
                with the subject "Data deletion request". We will process your request within
                30 days.
              </p>
            </section>

            <section>
              <h2 className="font-ui font-semibold text-xl text-brown-900 mb-3">7. Changes to this policy</h2>
              <p>
                We may update this Privacy Policy from time to time. The date at the top
                of the page will always reflect the most recent update. We encourage you
                to review this page periodically.
              </p>
            </section>

            <section>
              <h2 className="font-ui font-semibold text-xl text-brown-900 mb-3">8. Contact</h2>
              <p>
                For any privacy-related questions, contact us on WhatsApp at{' '}
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
            <Link to="/cookie-policy" className="font-ui text-sm text-brown-400 hover:text-amber-brand transition-colors">
              Cookie Policy →
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
