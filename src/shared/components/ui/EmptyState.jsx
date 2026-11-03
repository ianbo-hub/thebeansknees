/* Empty state variants for machines, pods, and cart */

export function EmptyMachines() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center px-6">
      <svg className="w-20 h-20 mb-6 opacity-30" viewBox="0 0 80 80" fill="none" aria-hidden="true">
        <rect x="16" y="24" width="48" height="36" rx="6" stroke="#6B3D1E" strokeWidth="2"/>
        <rect x="24" y="32" width="14" height="10" rx="3" stroke="#6B3D1E" strokeWidth="1.5"/>
        <circle cx="50" cy="37" r="5" stroke="#6B3D1E" strokeWidth="1.5"/>
        <path d="M38 60 L38 72 M42 60 L42 72" stroke="#6B3D1E" strokeWidth="2" strokeLinecap="round"/>
        <path d="M30 72 L50 72" stroke="#6B3D1E" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      <h3 className="font-body text-2xl text-brown-600 mb-2">Machines on their way</h3>
      <p className="font-ui text-sm text-brown-300 max-w-xs leading-relaxed">
        Our machines are freshly stocked — WhatsApp us and we'll let you know exactly what's available right now.
      </p>
      <a
        href="https://wa.me/254114086711?text=Hi%20The%20Beans%20Knees!%20Which%20machines%20do%20you%20currently%20have%20in%20stock%3F"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-whatsapp text-white font-ui text-sm font-medium"
      >
        Ask on WhatsApp
      </a>
    </div>
  )
}

export function EmptyPods() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center px-6">
      <svg className="w-20 h-20 mb-6 opacity-30" viewBox="0 0 80 80" fill="none" aria-hidden="true">
        <ellipse cx="40" cy="42" rx="14" ry="20" stroke="#6B3D1E" strokeWidth="2"/>
        <path d="M26 42 Q40 32 54 42" stroke="#6B3D1E" strokeWidth="1.5" fill="none"/>
        <circle cx="40" cy="28" r="4" stroke="#6B3D1E" strokeWidth="1.5"/>
        <path d="M38 24 L38 20 M42 24 L42 20" stroke="#6B3D1E" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
      <h3 className="font-body text-2xl text-brown-600 mb-2">Pods fully brewed up</h3>
      <p className="font-ui text-sm text-brown-300 max-w-xs leading-relaxed">
        Stock moves fast. WhatsApp us for live availability — we typically restock within 48 hours.
      </p>
      <a
        href="https://wa.me/254114086711?text=Hi%20The%20Beans%20Knees!%20Which%20pods%20do%20you%20have%20available%3F"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-whatsapp text-white font-ui text-sm font-medium"
      >
        Check availability
      </a>
    </div>
  )
}

export function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <svg className="w-16 h-16 mb-5 opacity-25" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <circle cx="32" cy="32" r="22" stroke="#6B3D1E" strokeWidth="1.5"/>
        <path d="M22 28 Q32 20 42 28" stroke="#6B3D1E" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <circle cx="26" cy="35" r="2" fill="#6B3D1E" opacity="0.5"/>
        <circle cx="38" cy="35" r="2" fill="#6B3D1E" opacity="0.5"/>
      </svg>
      <p className="font-body text-xl text-brown-600 mb-1">Your cup is empty</p>
      <p className="font-ui text-sm text-brown-300">
        Browse our machines and pods and add something delicious.
      </p>
    </div>
  )
}
