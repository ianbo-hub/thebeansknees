/**
 * Input sanitization utilities.
 *
 * Purpose: strip characters that can be used for XSS or injection
 * before we embed user input into WhatsApp URL messages.
 *
 * Note: the primary XSS protection is the Content-Security-Policy header
 * in netlify.toml. This is a second line of defence for form inputs.
 */

const MAX_MESSAGE_LENGTH = 500

/**
 * Strip HTML tags and limit length.
 * Safe for embedding in plain-text WhatsApp messages.
 * @param {string} input
 * @param {number} [maxLength]
 * @returns {string}
 */
export function sanitizeText(input, maxLength = MAX_MESSAGE_LENGTH) {
  if (typeof input !== 'string') return ''

  return input
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove dangerous URL schemes
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    // Collapse repeated whitespace
    .replace(/\s{2,}/g, ' ')
    .trim()
    .slice(0, maxLength)
}

/**
 * Sanitize a delivery field value (shorter, alphanumeric focus).
 * @param {string} input
 * @returns {string}
 */
export function sanitizeDeliveryField(input) {
  return sanitizeText(input, 120)
}

export { MAX_MESSAGE_LENGTH }
