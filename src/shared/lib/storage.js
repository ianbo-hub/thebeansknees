/**
 * Safe localStorage wrapper.
 *
 * localStorage can throw in:
 *   - Private / incognito browsing (on some browsers)
 *   - When storage quota is exceeded
 *   - When the browser blocks storage access (iframe sandboxing, etc.)
 *
 * All reads and writes are wrapped in try/catch.
 */

/**
 * Read a JSON value from localStorage.
 * @param {string} key
 * @returns {*} Parsed value, or null on error / missing key
 */
export function storageGet(key) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

/**
 * Write a value as JSON to localStorage.
 * @param {string} key
 * @param {*} value
 * @returns {boolean} true on success
 */
export function storageSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

/**
 * Remove a key from localStorage.
 * @param {string} key
 */
export function storageRemove(key) {
  try {
    localStorage.removeItem(key)
  } catch {
    // Ignore
  }
}

/**
 * Check if localStorage is available (not blocked by browser policy).
 * @returns {boolean}
 */
export function storageAvailable() {
  try {
    const probe = '__tbk_probe__'
    localStorage.setItem(probe, '1')
    localStorage.removeItem(probe)
    return true
  } catch {
    return false
  }
}
