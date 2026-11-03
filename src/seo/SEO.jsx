import { Helmet } from 'react-helmet-async'
import { SITE_URL, SITE_NAME } from '../shared/lib/constants'

const JSON_LD_LOCAL_BUSINESS = {
  '@context':    'https://schema.org',
  '@type':       'Store',
  name:          SITE_NAME,
  description:   'Nairobi retailer of Nescafé Dolce Gusto coffee machines and pods',
  url:           SITE_URL,
  telephone:     '+254114086711',
  areaServed:    { '@type': 'City', name: 'Nairobi', addressCountry: 'KE' },
  address: {
    '@type':           'PostalAddress',
    addressLocality:   'Nairobi',
    addressCountry:    'KE',
  },
  openingHoursSpecification: [{
    '@type':     'OpeningHoursSpecification',
    dayOfWeek:   ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
    opens:       '08:00',
    closes:      '20:00',
  }],
}

export default function SEO({ title, description, path = '' }) {
  const fullTitle = title
    ? `${title} — ${SITE_NAME}`
    : `${SITE_NAME} — Nescafé Dolce Gusto in Nairobi`
  const desc = description ||
    'Shop Nescafé Dolce Gusto coffee machines and pods in Nairobi. Mini Me, Infinissima, Classic + 6 pod flavours. WhatsApp to order, delivered to your door.'
  const url  = `${SITE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type"        content="website" />
      <meta property="og:url"         content={url} />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:site_name"   content={SITE_NAME} />

      {/* Twitter */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={desc} />

      {/* JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(JSON_LD_LOCAL_BUSINESS)}
      </script>
    </Helmet>
  )
}
