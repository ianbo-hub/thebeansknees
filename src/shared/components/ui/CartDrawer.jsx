import { useState, useEffect, useRef } from 'react'
import { useCart } from '../../../features/cart/CartContext'
import { buildOrderUrl } from '../../../features/checkout/whatsapp'
import { sanitizeDeliveryField } from '../../lib/sanitize'
import nairobiLocations from '../../../assets/nairobi-locations.json'
import { EmptyCart } from './EmptyState'

/* ─── Cart Item Row ─── */
function CartItemRow({ item }) {
  const { updateQty, removeItem } = useCart()

  return (
    <div className="flex items-center gap-3 py-4 border-b border-cream-200 last:border-0">
      <div className="w-12 h-12 rounded-xl bg-cream-100 shrink-0 overflow-hidden">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain p-1" />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-display text-lg text-brown-300">
            {item.name[0]}
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-ui text-sm font-medium text-brown-900 truncate">{item.name}</p>
        {item.price_kes ? (
          <p className="font-ui text-xs text-brown-400">
            KES {item.price_kes.toLocaleString()} × {item.qty}
          </p>
        ) : (
          <p className="font-ui text-xs text-brown-300 italic">Price on enquiry</p>
        )}
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={() => updateQty(item.id, item.qty - 1)}
          className="w-7 h-7 rounded-full bg-cream-100 flex items-center justify-center
            hover:bg-cream-200 active:scale-95 transition-all"
          aria-label="Decrease quantity"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M2 5h6" stroke="#6B3D1E" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
        <span className="w-6 text-center font-ui text-sm font-medium text-brown-900">
          {item.qty}
        </span>
        <button
          onClick={() => updateQty(item.id, item.qty + 1)}
          className="w-7 h-7 rounded-full bg-cream-100 flex items-center justify-center
            hover:bg-cream-200 active:scale-95 transition-all"
          aria-label="Increase quantity"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M5 2v6M2 5h6" stroke="#6B3D1E" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <button
        onClick={() => removeItem(item.id)}
        className="w-6 h-6 rounded-full flex items-center justify-center text-brown-300
          hover:text-red-600 hover:bg-red-50 active:scale-95 transition-all"
        aria-label={`Remove ${item.name}`}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  )
}

/* ─── Delivery Form ─── */
function DeliveryForm({ delivery, onChange }) {
  const subcounties = Object.keys(nairobiLocations)
  const wards       = delivery.subcounty ? nairobiLocations[delivery.subcounty] : []

  const handleRoadChange = (e) => {
    onChange({ ...delivery, road: sanitizeDeliveryField(e.target.value) })
  }

  const handleBuildingChange = (e) => {
    onChange({ ...delivery, building: sanitizeDeliveryField(e.target.value) })
  }

  return (
    <div className="space-y-3">
      <h3 className="font-ui text-xs uppercase tracking-widest text-brown-300 mb-3">
        Delivery details
      </h3>

      <div>
        <label className="block font-ui text-xs text-brown-400 mb-1" htmlFor="cart-subcounty">
          Sub-county *
        </label>
        <select
          id="cart-subcounty"
          value={delivery.subcounty}
          onChange={(e) => onChange({ ...delivery, subcounty: e.target.value, ward: '' })}
          className="w-full font-ui text-sm bg-cream-100 border border-cream-200 rounded-xl px-3 py-2.5
            text-brown-900 focus:border-amber-brand focus:ring-2 focus:ring-amber-brand/20 outline-none
            transition-colors"
          required
        >
          <option value="">Select sub-county…</option>
          {subcounties.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {delivery.subcounty && (
        <div>
          <label className="block font-ui text-xs text-brown-400 mb-1" htmlFor="cart-ward">
            Ward *
          </label>
          <select
            id="cart-ward"
            value={delivery.ward}
            onChange={(e) => onChange({ ...delivery, ward: e.target.value })}
            className="w-full font-ui text-sm bg-cream-100 border border-cream-200 rounded-xl px-3 py-2.5
              text-brown-900 focus:border-amber-brand focus:ring-2 focus:ring-amber-brand/20 outline-none
              transition-colors"
            required
          >
            <option value="">Select ward…</option>
            {wards.map(w => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="block font-ui text-xs text-brown-400 mb-1" htmlFor="cart-road">
          Road / Area *
        </label>
        <input
          id="cart-road"
          type="text"
          placeholder="e.g. Peponi Road, near Uchumi"
          value={delivery.road}
          onChange={handleRoadChange}
          maxLength={120}
          className="w-full font-ui text-sm bg-cream-100 border border-cream-200 rounded-xl px-3 py-2.5
            text-brown-900 placeholder-brown-300 focus:border-amber-brand focus:ring-2 focus:ring-amber-brand/20 outline-none
            transition-colors"
          required
        />
      </div>

      <div>
        <label className="block font-ui text-xs text-brown-400 mb-1" htmlFor="cart-building">
          Building / Apartment <span className="text-brown-200">(optional)</span>
        </label>
        <input
          id="cart-building"
          type="text"
          placeholder="e.g. Westgate Tower, Apt 4B"
          value={delivery.building}
          onChange={handleBuildingChange}
          maxLength={120}
          className="w-full font-ui text-sm bg-cream-100 border border-cream-200 rounded-xl px-3 py-2.5
            text-brown-900 placeholder-brown-300 focus:border-amber-brand focus:ring-2 focus:ring-amber-brand/20 outline-none
            transition-colors"
        />
      </div>
    </div>
  )
}

/* ─── Main Cart Drawer ─── */
export default function CartDrawer() {
  const { items, isOpen, closeCart, totalItems, totalPrice, clearCart } = useCart()
  const [step, setStep]         = useState('items')
  const [delivery, setDelivery] = useState({ subcounty: '', ward: '', road: '', building: '' })
  const drawerRef = useRef(null)

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep('items')
        setDelivery({ subcounty: '', ward: '', road: '', building: '' })
      }, 400)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') closeCart() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [closeCart])

  const canOrder = delivery.subcounty && delivery.ward && delivery.road.trim()

  const handleOrder = () => {
    if (!canOrder) return
    const url = buildOrderUrl(items, delivery)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100] cart-overlay transition-opacity"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="fixed right-0 top-0 bottom-0 z-[101] w-full max-w-md
          bg-cream-50 shadow-2xl flex flex-col animate-slideIn"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-cream-200">
          <div className="flex items-center gap-3">
            <h2 className="font-body text-xl font-semibold text-brown-900">Your Order</h2>
            {totalItems > 0 && (
              <span className="w-5 h-5 rounded-full bg-brown-900 text-cream-50 font-ui text-[10px] font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="font-ui text-xs text-brown-300 hover:text-red-600 transition-colors px-2 py-1"
              >
                Clear all
              </button>
            )}
            <button
              onClick={closeCart}
              className="w-9 h-9 rounded-full bg-cream-100 flex items-center justify-center
                hover:bg-cream-200 transition-colors"
              aria-label="Close cart"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 3l10 10M13 3L3 13" stroke="#6B3D1E" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Step tabs */}
        {items.length > 0 && (
          <div className="flex border-b border-cream-200">
            {['items', 'delivery'].map((s) => (
              <button
                key={s}
                onClick={() => setStep(s)}
                className={`flex-1 py-3 font-ui text-sm font-medium capitalize transition-all
                  ${step === s
                    ? 'text-brown-900 border-b-2 border-amber-brand'
                    : 'text-brown-300 hover:text-brown-600'
                  }`}
              >
                {s === 'items' ? `Items (${totalItems})` : 'Delivery'}
              </button>
            ))}
          </div>
        )}

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <EmptyCart />
          ) : step === 'items' ? (
            <>
              {items.map(item => <CartItemRow key={item.id} item={item} />)}
              {totalPrice > 0 && (
                <div className="mt-4 pt-4 flex items-center justify-between border-t border-cream-200">
                  <span className="font-ui text-sm text-brown-400">Subtotal</span>
                  <span className="font-body text-xl font-semibold text-brown-900">
                    KES {totalPrice.toLocaleString()}
                  </span>
                </div>
              )}
            </>
          ) : (
            <DeliveryForm delivery={delivery} onChange={setDelivery} />
          )}
        </div>

        {/* Footer CTA */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-cream-200 space-y-2">
            {step === 'items' ? (
              <button
                onClick={() => setStep('delivery')}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full
                  bg-brown-900 text-cream-50 font-ui font-medium
                  hover:bg-brown-600 active:scale-[0.98] transition-all duration-300 ease-spring"
              >
                Continue to delivery
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            ) : (
              <>
                <button
                  onClick={handleOrder}
                  disabled={!canOrder}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full
                    bg-whatsapp text-white font-ui font-medium
                    hover:opacity-90 active:scale-[0.98] transition-all duration-300 ease-spring
                    disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M15.5 9a6.5 6.5 0 01-9.68 5.65L3 15.5l.88-2.82A6.5 6.5 0 1115.5 9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  </svg>
                  Order on WhatsApp
                </button>
                <button
                  onClick={() => setStep('items')}
                  className="w-full py-2.5 text-center font-ui text-sm text-brown-400
                    hover:text-brown-600 transition-colors"
                >
                  ← Back to items
                </button>
              </>
            )}
            <p className="text-center font-ui text-xs text-brown-300 leading-relaxed">
              Tapping "Order on WhatsApp" opens a pre-filled message. Send it to confirm.
            </p>
          </div>
        )}
      </div>
    </>
  )
}
