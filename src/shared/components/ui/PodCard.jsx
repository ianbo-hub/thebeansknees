import { useState } from 'react'
import { useCart } from '../../../features/cart/CartContext'
import { useToast } from '../../context/ToastContext'

function IntensityBar({ value, max = 10 }) {
  if (!value) return null
  return (
    <div className="flex items-center gap-1.5">
      <span className="font-ui text-[10px] uppercase tracking-widest text-brown-300">Intensity</span>
      <div className="flex gap-[3px]" aria-label={`Intensity ${value} of ${max}`}>
        {Array.from({ length: max }).map((_, i) => (
          <span
            key={i}
            className={`inline-block w-1.5 h-3 rounded-sm transition-colors ${
              i < value ? 'bg-amber-brand' : 'bg-cream-200'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default function PodCard({ pod }) {
  const { addItem, openCart } = useCart()
  const { toast } = useToast()
  const [imgErr, setImgErr]     = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [adding, setAdding]     = useState(false)

  const handleAdd = () => {
    setAdding(true)
    addItem({
      id:             pod.id,
      name:           pod.name,
      type:           'pod',
      price_kes:      pod.price_kes,
      whatsapp_label: pod.whatsapp_label,
      imageUrl:       pod.imageUrl,
    })
    toast({ message: `${pod.name} added to cart` })
    openCart()
    setTimeout(() => setAdding(false), 600)
  }

  const isSoldOut   = pod.status === 'sold_out'
  const isStarbucks = pod.brand?.toLowerCase().includes('starbucks')

  return (
    <article className="card-outer group">
      <div className="card-inner">
        {/* Image */}
        <div className="relative overflow-hidden rounded-[calc(2rem-6px)] bg-cream-100 aspect-square">
          {!imgLoaded && <div className="absolute inset-0 skeleton" />}
          {pod.imageUrl && !imgErr ? (
            <img
              src={pod.imageUrl}
              alt={pod.name}
              className={`w-full h-full object-contain p-3 transition-all duration-700 ease-spring
                group-hover:scale-105
                ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgErr(true)}
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-4xl text-brown-200">{pod.name[0]}</span>
            </div>
          )}

          {isStarbucks && (
            <div className="absolute top-2 left-2 bg-[#1E3932] text-[#CBA258] text-[9px] font-ui font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full">
              ★ Starbucks
            </div>
          )}

          {isSoldOut && (
            <div className="absolute inset-0 bg-cream-0/70 backdrop-blur-[2px] flex items-center justify-center rounded-[calc(2rem-6px)]">
              <span className="bg-brown-900/80 text-cream-50 text-[10px] font-ui font-medium uppercase tracking-widest px-3 py-1 rounded-full">
                Sold Out
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="font-ui text-[10px] uppercase tracking-widest text-brown-300 mb-1">
            {pod.brand}
          </p>

          <h3 className="font-body text-lg font-semibold text-brown-900 leading-tight mb-1">
            {pod.name}
          </h3>

          <p className="font-body italic text-brown-400 text-sm leading-snug mb-3 line-clamp-2">
            {pod.flavour_notes}
          </p>

          <div className="mb-3 space-y-1.5">
            <IntensityBar value={pod.intensity} />
            {pod.servings && (
              <p className="font-ui text-[10px] text-brown-300">
                {pod.caps_total} capsules
                {pod.servings && pod.servings !== pod.caps_total && ` · ${pod.servings} drinks`}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between gap-2 pt-3 border-t border-cream-200">
            <span className="font-body text-xl font-semibold text-brown-900">
              KES {(pod.price_kes || 2000).toLocaleString()}
            </span>
            <button
              onClick={handleAdd}
              disabled={isSoldOut || adding}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-ui text-sm font-medium
                transition-all duration-300 ease-spring active:scale-[0.97]
                disabled:opacity-40 disabled:cursor-not-allowed
                ${adding
                  ? 'bg-amber-brand text-cream-50'
                  : 'bg-brown-900 text-cream-50 hover:bg-brown-600'
                }`}
              aria-label={`Add ${pod.name} to cart`}
            >
              {adding ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="animate-spin" aria-hidden="true">
                  <path d="M7 1v3M7 10v3M1 7h3M10 7h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M7 3v8M3 7h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              )}
              {adding ? 'Added!' : 'Add'}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
