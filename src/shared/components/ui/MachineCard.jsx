import { useState } from 'react'
import { useCart } from '../../../features/cart/CartContext'
import { useToast } from '../../context/ToastContext'
import { buildEnquiryUrl } from '../../../features/checkout/whatsapp'

function SpecRow({ icon, label, value }) {
  if (!value) return null
  return (
    <div className="flex items-center gap-2 text-xs text-brown-400 font-ui">
      <span className="text-amber-brand">{icon}</span>
      <span className="text-brown-300">{label}:</span>
      <span className="font-medium text-brown-600">{value}</span>
    </div>
  )
}

export default function MachineCard({ machine, onViewDetails }) {
  const { addItem, openCart } = useCart()
  const { toast } = useToast()
  const [imgErr, setImgErr]     = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  const handleAdd = (e) => {
    e.stopPropagation()
    addItem({
      id:             machine.id,
      name:           machine.name,
      type:           'machine',
      price_kes:      machine.price_kes,
      whatsapp_label: machine.whatsapp_label,
      imageUrl:       machine.imageUrl,
    })
    toast({ message: `${machine.name} added to cart` })
    openCart()
  }

  const handleEnquire = (e) => {
    e.stopPropagation()
    window.open(buildEnquiryUrl(machine.name), '_blank', 'noopener,noreferrer')
  }

  const isSoldOut = machine.status === 'sold_out'
  const hasPrice  = machine.price_kes && machine.price_kes > 0

  return (
    <article
      className="card-outer group cursor-pointer"
      onClick={() => onViewDetails?.(machine)}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${machine.name}`}
      onKeyDown={(e) => e.key === 'Enter' && onViewDetails?.(machine)}
    >
      <div className="card-inner">
        {/* Image */}
        <div className="relative overflow-hidden rounded-[calc(2rem-6px)] bg-cream-100 aspect-[4/3]">
          {!imgLoaded && <div className="absolute inset-0 skeleton" />}
          {machine.imageUrl && !imgErr ? (
            <img
              src={machine.imageUrl}
              alt={machine.name}
              className={`w-full h-full object-contain p-4 transition-all duration-700 ease-spring
                group-hover:scale-105
                ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgErr(true)}
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-5xl text-brown-200">{machine.name[0]}</span>
            </div>
          )}

          {isSoldOut && (
            <div className="absolute top-3 right-3 bg-brown-900/80 text-cream-50 text-[10px] font-ui font-medium uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-sm">
              Sold Out
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="eyebrow mb-3">
            <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="3" fill="currentColor"/></svg>
            Nescafé Dolce Gusto
          </div>

          <h3 className="font-body text-2xl font-semibold text-brown-900 leading-tight mb-1">
            {machine.name}
          </h3>
          <p className="font-body italic text-brown-400 text-base mb-4 leading-snug">
            {machine.tagline}
          </p>

          <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4 border-t border-cream-200 pt-4">
            <SpecRow icon="⚡" label="Pressure"  value={machine.bar_pressure} />
            <SpecRow icon="💧" label="Tank"      value={machine.tank_litres} />
            <SpecRow icon="⚙️" label="Wattage"   value={machine.wattage} />
            <SpecRow icon="📐" label="Size"      value={machine.dimensions_cm} />
          </div>

          <div className="mb-4">
            {hasPrice ? (
              <span className="font-body text-2xl font-semibold text-brown-900">
                KES {machine.price_kes.toLocaleString()}
              </span>
            ) : (
              <span className="font-ui text-sm text-brown-300 italic">Price on enquiry</span>
            )}
          </div>

          <div className="flex gap-2">
            {!isSoldOut && (
              <button
                onClick={handleAdd}
                disabled={isSoldOut}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full
                  bg-brown-900 text-cream-50 font-ui text-sm font-medium
                  hover:bg-brown-600 active:scale-[0.98]
                  transition-all duration-300 ease-spring
                  disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Add to cart
                <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs">+</span>
              </button>
            )}
            <button
              onClick={handleEnquire}
              className="flex items-center justify-center px-4 py-2.5 rounded-full
                border border-brown-200 text-brown-600 font-ui text-sm
                hover:border-amber-brand hover:text-amber-brand
                active:scale-[0.98]
                transition-all duration-300 ease-spring"
              aria-label={`Enquire about ${machine.name}`}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 3h12v8H9l-3 2v-2H2V3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <button
            onClick={() => onViewDetails?.(machine)}
            className="mt-3 w-full text-center font-ui text-xs text-brown-300 hover:text-amber-brand transition-colors"
          >
            View full specs →
          </button>
        </div>
      </div>
    </article>
  )
}
