import { CartProvider } from '../features/cart/CartContext'
import { ToastProvider } from '../shared/context/ToastContext'

/**
 * Providers — wraps the app with all global React context providers.
 * Add new providers here, ordered outermost-first.
 */
export default function Providers({ children }) {
  return (
    <CartProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </CartProvider>
  )
}
