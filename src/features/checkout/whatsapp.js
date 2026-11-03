import { WA_NUMBER } from '../../shared/lib/constants'
import { sanitizeText } from '../../shared/lib/sanitize'

/**
 * Build a pre-filled WhatsApp URL for a cart order.
 * Delivery fields are sanitized before embedding.
 *
 * @param {Array}  items     Cart items: [{ name, qty, price_kes, whatsapp_label }]
 * @param {Object} delivery  { subcounty, ward, road, building }
 */
export function buildOrderUrl(items, delivery = {}) {
  const lines = items.map(item => {
    const label = item.whatsapp_label || item.name
    const price = item.price_kes ? ` — KES ${(item.qty * item.price_kes).toLocaleString()}` : ''
    return `• ${label} × ${item.qty}${price}`
  }).join('\n')

  const total = items.reduce((sum, i) => sum + (i.price_kes || 0) * i.qty, 0)
  const totalLine = total ? `\n\n*Total: KES ${total.toLocaleString()}*` : ''

  // Sanitize free-text delivery fields before embedding in the URL
  const safeRoad     = sanitizeText(delivery.road     || '', 120)
  const safeBuilding = sanitizeText(delivery.building || '', 120)

  const deliveryLines = [
    delivery.subcounty && `Sub-county: ${delivery.subcounty}`,
    delivery.ward      && `Ward: ${delivery.ward}`,
    safeRoad           && `Road/Area: ${safeRoad}`,
    safeBuilding       && `Building/Apt: ${safeBuilding}`,
  ].filter(Boolean).join('\n')

  const msg = [
    `Hi The Beans Knees! I'd like to place an order:`,
    ``,
    `*ORDER SUMMARY*`,
    lines,
    totalLine,
    ``,
    `*DELIVERY DETAILS*`,
    deliveryLines || '(No delivery details provided)',
    ``,
    `Please confirm availability and delivery timeline. Thank you! ☕`,
  ].join('\n')

  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
}

/**
 * Build a WhatsApp URL for a single product enquiry.
 * @param {string} productName
 */
export function buildEnquiryUrl(productName) {
  const safeName = sanitizeText(productName, 100)
  const msg = `Hi The Beans Knees! I'd like to enquire about the *${safeName}*. Could you tell me more about pricing and availability? Thank you! ☕`
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
}

/**
 * Build a WhatsApp URL for a general question (e.g. from the AskUs form).
 * The message is sanitized before embedding.
 *
 * @param {string} message  User's typed question (already sanitized at call site too)
 */
export function buildGeneralUrl(message = '') {
  const safeMessage = sanitizeText(message, 500)
  const prefix = safeMessage
    ? `Hi The Beans Knees! I have a question: ${safeMessage}`
    : `Hi The Beans Knees! I'd like to get in touch.`
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(prefix)}`
}
