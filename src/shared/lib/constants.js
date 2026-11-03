/**
 * Centralised magic strings and configuration constants.
 * Import from here — never hard-code these values in components.
 */

export const WA_NUMBER     = import.meta.env.VITE_WA_NUMBER || '254114086711'
export const CLOUD_NAME    = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'sxyb8iya'
export const CART_KEY      = 'tbk-cart-v1'
export const CONSENT_KEY   = 'tbk-cookie-consent'
export const API_TIMEOUT   = 8_000   // ms — AbortSignal.timeout
export const CART_DEBOUNCE = 300     // ms — localStorage write debounce

export const SITE_URL      = 'https://thebeansknees.netlify.app'
export const SITE_NAME     = 'The Beans Knees'
export const WA_DISPLAY    = '+254 114 086 711'
export const WA_HOURS      = 'Mon–Sun 8am–8pm'
