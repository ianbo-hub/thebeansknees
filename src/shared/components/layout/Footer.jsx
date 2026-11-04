export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-espresso text-cream-100 pt-16 pb-8 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/10">

          {/* Brand */}
          <div>
            <h2 className="font-display text-3xl text-cream-50 mb-3">The Beans Knees</h2>
            <p className="font-body text-base text-cream-200/70 leading-relaxed mb-5">
              Nairobi's home for Nescafé Dolce Gusto. Premium machines and pods, delivered to your door.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/254114086711"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-whatsapp text-white font-ui text-sm font-medium
                  hover:opacity-90 transition-opacity"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M13.5 8a5.5 5.5 0 01-8.2 4.77L2 14l1.23-3.3A5.5 5.5 0 1113.5 8z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
                </svg>
                +254 114 086 711
              </a>

              <a
                href="https://www.instagram.com/coffee_machines_ke"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-cream-200
                  hover:bg-white/20 hover:text-cream-50 transition-all duration-200"
              >
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
                  <rect x="2" y="2" width="13" height="13" rx="4" stroke="currentColor" strokeWidth="1.3"/>
                  <circle cx="8.5" cy="8.5" r="3" stroke="currentColor" strokeWidth="1.3"/>
                  <circle cx="12.2" cy="4.8" r="0.8" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-ui text-xs uppercase tracking-widest text-cream-200/50 mb-4">Shop</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Machines',           href: '#machines' },
                { label: 'Pods',               href: '#pods' },
                { label: 'Mini Me',            href: '#machines' },
                { label: 'Infinissima',        href: '#machines' },
                { label: 'Classic (by Krups)', href: '#machines' },
              ].map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-ui text-sm text-cream-200/60 hover:text-cream-50 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-ui text-xs uppercase tracking-widest text-cream-200/50 mb-4">Info</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'How to order', href: '#ask-us' },
                { label: 'Reviews',     href: '#reviews' },
                { label: 'Contact us',  href: '#ask-us' },
              ].map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-ui text-sm text-cream-200/60 hover:text-cream-50 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              {/* Legal links */}
              <li>
                <a
                  href="/privacy-policy.html"
                  className="font-ui text-sm text-cream-200/60 hover:text-cream-50 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms.html"
                  className="font-ui text-sm text-cream-200/60 hover:text-cream-50 transition-colors"
                >
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <p className="font-ui text-xs text-cream-200/40 leading-relaxed">
                Nairobi, Kenya<br/>
                Delivery across all 17 sub-counties
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-ui text-xs text-cream-200/30">
            © {year} The Beans Knees. All rights reserved.
          </p>
          <p className="font-ui text-xs text-cream-200/30 text-center sm:text-right">
            Nescafé® and Dolce Gusto® are registered trademarks of Nestlé S.A.
            Starbucks® is a registered trademark. The Beans Knees is an independent retailer.
          </p>
        </div>
      </div>
    </footer>
  )
}
