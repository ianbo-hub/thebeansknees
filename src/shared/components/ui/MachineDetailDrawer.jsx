import { useEffect, useRef } from 'react'
import { useCart } from '../../../features/cart/CartContext'
import { useToast } from '../../context/ToastContext'
import { lifestyleImageUrl, uploadUrl } from '../../lib/cloudinary'
import { buildEnquiryUrl } from '../../../features/checkout/whatsapp'

function SpecItem({ label, value }) {
  if (!value) return null
  return (
    <div className="flex items-start justify-between py-3 border-b border-cream-200 last:border-0">
      <span className="font-ui text-sm text-brown-300">{label}</span>
      <span className="font-ui text-sm font-medium text-brown-900 text-right">{value}</span>
    </div>
  )
}

export default function MachineDetailDrawer({ machine, onClose }) {
  const { addItem, openCart } = useCart()
  const { toast } = useToast()
  const drawerRef = useRef(null)

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!machine) return null

  const lifestyleUrl = lifestyleImageUrl(machine, { w: 1200, h: 800 })
  const thumbUrl     = uploadUrl(machine.cloudinary_id, { w: 400, h: 400 })
  const isSoldOut    = machine.status === 'sold_out'
  const hasPrice     = machine.price_kes && machine.price_kes > 0

  const handleAdd = () => {
    addItem({
      id:             machine.id,
      name:           machine.name,
      type:           'machine',
      price_kes:      machine.price_kes,
      whatsapp_label: machine.whatsapp_label,
      imageUrl:       machine.imageUrl,
    })
    toast({ message: `${machine.name} added to cart` })
    onClose()
    setTimeout(openCart, 100)
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100] cart-overlay"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${machine.name} details`}
        className="fixed right-0 top-0 bottom-0 z-[101] w-full max-w-lg
          bg-cream-50 shadow-2xl overflow-y-auto animate-slideIn"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-cream-100 flex items-center justify-center
            hover:bg-cream-200 transition-colors"
          aria-label="Close details panel"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 3l10 10M13 3L3 13" stroke="#6B3D1E" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Hero image */}
        {lifestyleUrl && (
          <div className="w-full aspect-video bg-cream-100 overflow-hidden">
            <img
              src={lifestyleUrl}
              alt={`${machine.name} lifestyle`}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="flex items-start gap-4 mb-6">
            {thumbUrl && (
              <div className="card-outer shrink-0 w-20">
                <div className="card-inner p-1 aspect-square">
                  <img src={thumbUrl} alt={machine.name} className="w-full h-full object-contain" />
                </div>
              </div>
            )}
            <div className="flex-1 pt-1">
              <div className="eyebrow mb-2">Nescafé Dolce Gusto</div>
              <h2 className="font-body text-3xl font-semibold text-brown-900 leading-tight">
                {machine.name}
              </h2>
              <p className="font-body italic text-brown-400 text-lg mt-1">{machine.tagline}</p>
            </div>
          </div>

          {machine.notes && (
            <p className="font-body text-brown-600 text-lg leading-relaxed mb-6 pb-6 border-b border-cream-200">
              {machine.notes}
            </p>
          )}

          <h3 className="font-ui text-xs uppercase tracking-widest text-brown-300 mb-2">Technical specs</h3>
          <div className="mb-6">
            <SpecItem label="Pressure"   value={machine.bar_pressure} />
            <SpecItem label="Tank"       value={machine.tank_litres} />
            <SpecItem label="Wattage"    value={machine.wattage} />
            <SpecItem label="Dimensions" value={machine.dimensions_cm} />
            <SpecItem label="Colours"    value={machine.colour_options} />
          </div>

          <div className="space-y-3">
            {hasPrice && (
              <p className="font-body text-3xl font-semibold text-brown-900">
                KES {machine.price_kes.toLocaleString()}
              </p>
            )}
            {!isSoldOut ? (
              <button
                onClick={handleAdd}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full
                  bg-brown-900 text-cream-50 font-ui font-medium
                  hover:bg-brown-600 active:scale-[0.98] transition-all duration-300 ease-spring"
              >
                {hasPrice ? 'Add to cart' : 'Add to cart (price TBC)'}
                <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-sm" aria-hidden="true">+</span>
              </button>
            ) : (
              <div className="w-full py-3.5 rounded-full bg-cream-200 text-center font-ui text-brown-400">
                Currently out of stock
              </div>
            )}
            <a
              href={buildEnquiryUrl(machine.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full
                border border-brown-200 text-brown-600 font-ui text-sm
                hover:border-[#25D366] hover:text-[#25D366] transition-all duration-300 ease-spring"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M13.5 8a5.5 5.5 0 01-8.2 4.77L2 14l1.23-3.3A5.5 5.5 0 1113.5 8z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
              </svg>
              Enquire on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
