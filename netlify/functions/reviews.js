/**
 * Netlify Function: /api/reviews
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │  DATA FLOW                                                          │
 * │                                                                     │
 * │  Google Form ──▶ "reviews" sheet tab ──▶ This function             │
 * │                                                ▼                   │
 * │                             Browser ◀── /api/reviews (CDN cached) │
 * │                                                                     │
 * │  Sheet columns (reviews!A2:E):                                      │
 * │    A  timestamp   Auto-set by Google Form                          │
 * │    B  handle      Instagram handle (with or without @)             │
 * │    C  quote       Review text (max 280 chars shown)               │
 * │    D  date        Display string e.g. "July 2021" — if blank,     │
 * │                   auto-derived from the timestamp in col A         │
 * │    E  approved    You type TRUE here to make a review go live      │
 * └─────────────────────────────────────────────────────────────────────┘
 *
 * Security:
 *   GOOGLE_API_KEY and GOOGLE_SHEET_ID live ONLY in Netlify env vars.
 *   They are NEVER sent to the browser.
 *
 * Cache:
 *   CDN-cached for 10 minutes (s-maxage=600).
 *   Netlify Edge refreshes automatically — no manual invalidation needed.
 */

/* ── Date helper ────────────────────────────────────────────────────────────── */
function formatDisplayDate(timestamp) {
  if (!timestamp) return ''
  // Google Sheets timestamps come as "1/15/2024 12:00:00" or ISO
  const d = new Date(timestamp)
  if (isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
}

/* ── Row parser ─────────────────────────────────────────────────────────────── */
function rowsToReviews(rows) {
  return rows
    .filter(r =>
      r[0] &&                                         // has a timestamp
      String(r[4] ?? '').trim().toUpperCase() === 'TRUE'  // approved = TRUE
    )
    .map(row => ({
      handle: (row[1] ?? '').replace(/^@/, '').trim(),
      quote:  (row[2] ?? '').slice(0, 280).trim(),
      // Use col D if filled in, otherwise derive from the Form timestamp
      date:   (row[3] ?? '').trim() || formatDisplayDate(row[0]),
    }))
    .filter(r => r.handle && r.quote)  // skip incomplete rows
}

/* ── Sheets fetch ───────────────────────────────────────────────────────────── */
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

  const responseHeaders = {
    ...corsHeaders,
    'Cache-Control': 's-maxage=600, max-age=0',  // 10-minute CDN cache
  }

  const apiKey  = process.env.GOOGLE_API_KEY
  const sheetId = process.env.GOOGLE_SHEET_ID

  if (!apiKey || !sheetId) {
    console.error('[reviews fn] Missing GOOGLE_API_KEY or GOOGLE_SHEET_ID env vars')
    return {
      statusCode: 503,
      headers: responseHeaders,
      body: JSON.stringify({
        error: 'CMS not configured',
        hint:  'Set GOOGLE_API_KEY and GOOGLE_SHEET_ID in Netlify env vars',
      }),
    }
  }

  try {
    const rows    = await fetchRange(apiKey, sheetId, 'reviews!A2:E')
    const reviews = rowsToReviews(rows)

    return {
      statusCode: 200,
      headers:    responseHeaders,
      body:       JSON.stringify({ reviews }),
    }
  } catch (err) {
    console.error(JSON.stringify({
      level:     'error',
      function:  'reviews',
      message:   err.message,
      timestamp: new Date().toISOString(),
    }))
    return {
      statusCode: 502,
      headers:    responseHeaders,
      body:       JSON.stringify({
        error:   'Failed to fetch reviews',
        details: err.message,
      }),
    }
  }
}
