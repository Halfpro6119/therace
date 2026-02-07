/**
 * Shared safe utilities for normalization and grading.
 */

export function safeString(v: unknown, fallback = ''): string {
  if (v === null || v === undefined) return fallback
  return String(v)
}

export function safeTrim(v: unknown, fallback = ''): string {
  return safeString(v, fallback).trim()
}

export function safeLower(v: unknown, fallback = ''): string {
  return safeTrim(v, fallback).toLowerCase()
}

export function safeBool(v: unknown, fallback = false): boolean {
  if (v === true || v === false) return v
  const s = safeLower(v)
  if (['true', '1', 'yes', 'y', 'on'].includes(s)) return true
  if (['false', '0', 'no', 'n', 'off'].includes(s)) return false
  return fallback
}

export function safeInt(v: unknown, fallback: number, min?: number, max?: number): number {
  const n = typeof v === 'number' ? v : parseInt(safeString(v), 10)
  if (Number.isNaN(n)) return fallback
  const clampedMin = min !== undefined ? Math.max(n, min) : n
  const clamped = max !== undefined ? Math.min(clampedMin, max) : clampedMin
  return clamped
}

export function toStringArray(v: unknown): string[] {
  if (Array.isArray(v)) {
    return v.map(x => (x != null && typeof x === 'object' ? JSON.stringify(x) : safeTrim(x))).filter(Boolean)
  }
  if (typeof v === 'string') {
    const trimmed = v.trim()
    // If DB/client returned a stringified JSON array, parse it first
    if ((trimmed.startsWith('[') || trimmed.startsWith('{')) && trimmed.length > 1) {
      try {
        const parsed = JSON.parse(v)
        if (Array.isArray(parsed)) return toStringArray(parsed)
        if (parsed != null && typeof parsed === 'object') return [trimmed]
      } catch {
        // fall through to comma/pipe split
      }
    }
    // Support legacy comma-separated or pipe-delimited formats
    const parts = v.includes('|') ? v.split('|') : v.split(',')
    return parts.map(p => p.trim()).filter(Boolean)
  }
  return []
}

export function uniq(arr: string[]): string[] {
  return Array.from(new Set(arr))
}

export function countBlanksInQuestion(text: string): number {
  // Accept "____" sequences and "_____" etc
  const matches = text.match(/_{3,}/g)
  return matches ? matches.length : 0
}

export function normalizeMappingString(mapping: string): string {
  // Accept formats:
  // "1A,2C" "1-A 2:C" etc
  // Output canonical "1A,2C" sorted by left id
  const cleaned = safeString(mapping)
    .replace(/\s+/g, '')
    .replace(/-/g, '')
    .replace(/:/g, '')

  const pairs = cleaned
    .split(',')
    .map(p => p.trim())
    .filter(Boolean)

  const parsed: Array<{ left: string; right: string }> = []
  for (const p of pairs) {
    // left can be digits, right can be letters/numbers
    const m = p.match(/^([a-zA-Z0-9]+)([a-zA-Z0-9]+)$/)
    if (!m) continue
    parsed.push({ left: m[1], right: m[2] })
  }

  parsed.sort((a, b) => a.left.localeCompare(b.left, undefined, { numeric: true }))

  return parsed.map(p => `${p.left}${p.right}`).join(',')
}

export function mappingObjectToString(mapping: Record<string, string>): string {
  const pairs = Object.entries(mapping)
    .filter(([l, r]) => safeTrim(l) && safeTrim(r))
    .map(([l, r]) => `${safeTrim(l)}${safeTrim(r)}`)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  return pairs.join(',')
}
