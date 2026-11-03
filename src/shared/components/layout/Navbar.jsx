import { useState, useEffect } from 'react'
import { useCart } from '../../../features/cart/CartContext'

const NAV_LINKS = [
  { label: 'Machines', href: '#machines' },
  { label: 'Pods',     href: '#pods' },
  { label: 'Reviews',  href: '#reviews' },
  { label: 'Contact',  href: '#ask-us' },
]

export default function Navbar() {
  const { totalItems, openCart } = useCart()
  const [scrolled, setScrolled]  = useState(false)
  const [menuOpen, setMenuOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = (href) => {
    setMenuOpen(false)
    setTimeout(() => {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  return (
    <>
      {/* ── Desktop / Main Navbar ── */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-4 transition-all duration-500 ease-spring">
        <nav
          className={`navbar-glass rounded-full flex items-center gap-1 transition-all duration-500 ease-spring
            ${scrolled ? 'px-3 py-2 shadow-lg shadow-brown-900/10' : 'px-4 py-3'}`}
          aria-label="Main navigation"
        >
          {/* Brand */}
          <a
            href="/"
            className="font-display text-xl text-brown-900 tracking-wide mr-4 select-none"
            aria-label="The Beans Knees home"
          >
            The Beans Knees
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="font-ui text-sm text-brown-600 hover:text-brown-900 px-3 py-1.5 rounded-full
                  hover:bg-brown-900/5 active:scale-[0.97]
                  transition-all duration-200"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Cart button */}
          <button
            onClick={openCart}
            className="relative ml-3 flex items-center gap-1.5 px-3.5 py-2 rounded-full
              bg-brown-900 text-cream-50 font-ui text-sm
              hover:bg-brown-600 active:scale-[0.97]
              transition-all duration-300 ease-spring"
            aria-label={`Open cart, ${totalItems} item${totalItems !== 1 ? 's' : ''}`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 2h2l1.8 8.6a1 1 0 001 .9h6.5a1 1 0 001-.9L15 5H4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="7" cy="13.5" r="1" fill="currentColor"/>
              <circle cx="12" cy="13.5" r="1" fill="currentColor"/>
            </svg>
            {totalItems > 0 && (
              <span className="min-w-[18px] h-[18px] rounded-full bg-amber-brand text-espresso
                font-ui text-[10px] font-bold flex items-center justify-center px-1
                animate-fadeUp">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="md:hidden ml-2 w-9 h-9 rounded-full flex flex-col items-center justify-center gap-1.5
              bg-cream-100 hover:bg-cream-200 transition-colors"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className={`block w-4 h-[1.5px] bg-brown-900 origin-center transition-all duration-300 ease-spring
              ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`block w-4 h-[1.5px] bg-brown-900 transition-all duration-200
              ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-4 h-[1.5px] bg-brown-900 origin-center transition-all duration-300 ease-spring
              ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </button>
        </nav>
      </header>

      {/* ── Mobile Menu Overlay ── */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-cream-50/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-6"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          {NAV_LINKS.map((link, i) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              style={{ animationDelay: `${i * 60}ms` }}
              className="font-display text-4xl text-brown-900 hover:text-amber-brand
                transition-colors animate-fadeUp opacity-0"
            >
              {link.label}
            </button>
          ))}

          <div className="mt-6 animate-fadeUp opacity-0" style={{ animationDelay: '280ms' }}>
            <a
              href="https://wa.me/254114086711"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-whatsapp text-white font-ui text-sm font-medium"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M15.5 9a6.5 6.5 0 01-9.68 5.65L3 15.5l.88-2.82A6.5 6.5 0 1115.5 9z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  )
}
