import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { storageGet, storageSet } from '../../lib/storage'
import { CONSENT_KEY } from '../../lib/constants'

/**
 * Cookie consent banner.
 *
 * What we disclose:
 *   - localStorage is used to remember the user's cart between sessions.
 *     This is functional storage, not tracking or advertising.
 *   - Google Fonts loads from fonts.googleapis.com (can see the IP).
 *   - Cloudinary loads images from res.cloudinary.com (can see the IP).
 *   - Tapping "Order on WhatsApp" opens wa.me (transfers data to Meta/WhatsApp).
 *
 * Consent is saved to localStorage as 'tbk-cookie-consent' = 'accepted' | 'declined'.
 * If declined, the cart still works (functional storage cannot be disabled here
 * as the site relies on it for core functionality); we simply record the preference.
 */
export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const saved = storageGet(CONSENT_KEY)
    if (!saved) {
      // Small delay so banner doesn't flash before page content loads
      const t = setTimeout(() => setVisible(true), 1200)
      return () => clearTimeout(t)
    }
  }, [])

  const handleAccept = () => {
    storageSet(CONSENT_KEY, 'accepted')
    setVisible(false)
  }

  const handleDecline = () => {
    storageSet(CONSENT_KEY, 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie and storage notice"
      className="fixed bottom-0 left-0 right-0 z-[300] p-4 sm:p-6
        animate-slideUp"
    >
      <div className="max-w-2xl mx-auto card-outer">
        <div className="card-inner px-5 py-4 sm:px-6 sm:py-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Icon */}
            <span className="shrink-0 text-2xl" aria-hidden="true">🍪</span>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="font-ui text-sm text-brown-900 leading-relaxed">
                We use your browser's local storage to remember your cart between visits.
                We also load fonts from Google Fonts and images from Cloudinary.
                By using this site you agree to our{' '}
                <Link
                  to="/privacy-policy"
                  className="underline text-amber-brand hover:text-brown-900 transition-colors"
                >
                  Privacy Policy
                </Link>{' '}
                and{' '}
                <Link
                  to="/cookie-policy"
                  className="underline text-amber-brand hover:text-brown-900 transition-colors"
                >
                  Cookie Policy
                </Link>.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              <button
                onClick={handleDecline}
                className="font-ui text-xs text-brown-300 hover:text-brown-600 px-3 py-1.5
                  transition-colors rounded-full hover:bg-cream-100"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="font-ui text-xs font-medium px-4 py-2 rounded-full
                  bg-brown-900 text-cream-50 hover:bg-brown-600
                  active:scale-[0.97] transition-all duration-200"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
