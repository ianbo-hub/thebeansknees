import { Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Providers from './Providers'
import { ErrorBoundary } from '../shared/components/ui/ErrorBoundary'
import CookieBanner from '../shared/components/ui/CookieBanner'
import { ToastStack } from '../shared/components/ui/Toast'
import Navbar from '../shared/components/layout/Navbar'
import Footer from '../shared/components/layout/Footer'
import CartDrawer from '../shared/components/ui/CartDrawer'
import PrivacyPolicy from '../pages/PrivacyPolicy'
import CookiePolicy from '../pages/CookiePolicy'
import NotFound from '../pages/NotFound'
import HomePage from './HomePage'

export default function App() {
  return (
    <HelmetProvider>
      <Providers>
        <ErrorBoundary>
          {/* Site shell — shared across all routes */}
          <Navbar />
          <CartDrawer />
          <ToastStack />
          <CookieBanner />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            {/* Catch-all — 404 for unknown paths */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          <Footer />
        </ErrorBoundary>
      </Providers>
    </HelmetProvider>
  )
}
