/**
 * Netlify Function: /api/products
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │  DATA FLOW                                                          │
 * │                                                                     │
 * │  Browser  ──GET /api/products──▶  Netlify CDN (s-maxage 5 min)     │
 * │                                         │ (cache miss)              │
 * │                                         ▼                           │
 * │                                   This function                     │
 * │                                     │         │                     │
 * │                              Promise.all  (parallel)                │
 * │                                  │               │                  │
 * │                            machines!A2:N   pods!A2:N               │
 * │                                  │               │                  │
 * │                            Google Sheets API v4                     │
 * │                                         │                           │
 * │                              rowsToObjects() → JSON                 │
 * │                                         │                           │
 * │                              { machines[], pods[] }                 │
 * └─────────────────────────────────────────────────────────────────────┘
 *
 * Security:
 *   GOOGLE_API_KEY and GOOGLE_SHEET_ID live ONLY in Netlify env vars.
 *   They are NEVER sent to the browser.
 *
 * Rate limiting:
 *   30 requests / minute per IP (in-memory, resets on cold start).
 *   Responds with 429 + Retry-After on breach.
 *
 * Scalability:
 *   CDN cache (s-maxage=300) absorbs all traffic at scale.
 *   Swap only this file to migrate from Sheets to a real DB.
 */

/* ── Rate Limiter ──────────────────────────────────────────────────────────── */
const RATE_LIMIT    = 30        // max requests
const RATE_WINDOW   = 60_000   // per 60 seconds (ms)
const rateMap       = new Map() // ip → { count, resetAt }

function getRateLimitResult(ip) {
  const now  = Date.now()
  const entry = rateMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW })
    return { allowed: true, remaining: RATE_LIMIT - 1 }
  }

  if (entry.count >= RATE_LIMIT) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000)
    return { allowed: false, retryAfter }
  }

  entry.count++
  return { allowed: true, remaining: RATE_LIMIT - entry.count }
}

/* ── Sheets helpers ─────────────────────────────────────────────────────────── */
const SHEET_RANGES = {
  machines: 'machines!A2:N',
  pods:     'pods!A2:N',
}

const MACHINE_HEADERS = [
  'id','name','tagline','price_kes','status',
  'cloudinary_id','cloudinary_id_lifestyle',
  'bar_pressure','tank_litres','wattage','dimensions_cm',
  'colour_options','notes','whatsapp_label',
]

const POD_HEADERS = [
  'id','name','brand','flavour_notes',
  'caps_total','caps_coffee','caps_milk','servings','intensity',
  'price_kes','status','cloudinary_id','source_image_url','whatsapp_label',
]

const NUMERIC_COLS = new Set([
  'price_kes','caps_total','caps_coffee','caps_milk',
  'servings','intensity','bar_pressure','wattage',
])

function rowsToObjects(headers, rows) {
  return rows
    .filter(r => r[0])
    .map(row =>
      headers.reduce((obj, key, i) => {
        const val = row[i] ?? ''
        obj[key] = NUMERIC_COLS.has(key)
          ? (val === '' ? null : Number(val))
          : val
        return obj
      }, {})
    )
}

async function fetchRange(apiKey, sheetId, range) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}?key=${apiKey}`
  const res = await fetch(url, { signal: AbortSignal.timeout(8000) })
  if (!res.ok) throw new Error(`Sheets API ${res.status} for range ${range}`)
  const data = await res.json()
  return data.values || []
}

/* ── Handler ────────────────────────────────────────────────────────────────── */
export const handler = async (event) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type':                 'application/json',
  }

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders }
  }

  /* ── Rate limiting ── */
  const clientIp =
    event.headers['x-nf-client-connection-ip'] ||
    event.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    'unknown'

  const rl = getRateLimitResult(clientIp)
  if (!rl.allowed) {
    console.warn(`[products fn] rate-limited: ${clientIp}`)
    return {
      statusCode: 429,
      headers: {
        ...corsHeaders,
        'Retry-After':               String(rl.retryAfter),
        'X-RateLimit-Limit':         String(RATE_LIMIT),
        'X-RateLimit-Remaining':     '0',
      },
      body: JSON.stringify({ error: 'Too many requests', retryAfter: rl.retryAfter }),
    }
  }

  const responseHeaders = {
    ...corsHeaders,
    'Cache-Control':             's-maxage=300, max-age=0',
    'X-RateLimit-Limit':         String(RATE_LIMIT),
    'X-RateLimit-Remaining':     String(rl.remaining),
  }

  /* ── Env var guard ── */
  const apiKey  = process.env.GOOGLE_API_KEY
  const sheetId = process.env.GOOGLE_SHEET_ID

  if (!apiKey || !sheetId) {
    console.error('[products fn] Missing GOOGLE_API_KEY or GOOGLE_SHEET_ID env vars')
    return {
      statusCode: 503,
      headers: responseHeaders,
      body: JSON.stringify({
        error: 'CMS not configured',
        hint:  'Set GOOGLE_API_KEY and GOOGLE_SHEET_ID in Netlify env vars',
      }),
    }
  }

  const tab          = event.queryStringParameters?.tab
  const needMachines = !tab || tab === 'machines'
  const needPods     = !tab || tab === 'pods'

  try {
    const [machineRows, podRows] = await Promise.all([
      needMachines ? fetchRange(apiKey, sheetId, SHEET_RANGES.machines) : Promise.resolve(null),
      needPods     ? fetchRange(apiKey, sheetId, SHEET_RANGES.pods)     : Promise.resolve(null),
    ])

    const result = {}
    if (machineRows !== null) result.machines = rowsToObjects(MACHINE_HEADERS, machineRows)
    if (podRows     !== null) result.pods     = rowsToObjects(POD_HEADERS,     podRows)

    return {
      statusCode: 200,
      headers: responseHeaders,
      body: JSON.stringify(result),
    }
  } catch (err) {
    // Structured error log — visible in Netlify function logs
    console.error(JSON.stringify({
      level:     'error',
      function:  'products',
      message:   err.message,
      timestamp: new Date().toISOString(),
      ip:        clientIp,
    }))

    return {
      statusCode: 502,
      headers: responseHeaders,
      body: JSON.stringify({
        error:   'Failed to fetch from Google Sheets',
        details: err.message,
      }),
    }
  }
}
