import type { Session } from './types'

const LS_KEY = 'bsikg_sessions'
const EVENT = 'bsikg-sessions'

/** Sesje zapisane tylko w tej przeglądarce (max 10). */
export function readRaw(): string {
  try {
    return localStorage.getItem(LS_KEY) ?? '[]'
  } catch {
    return '[]'
  }
}

export function parseSessions(raw: string): Session[] {
  try {
    const v = JSON.parse(raw)
    return Array.isArray(v) ? (v as Session[]).filter((x) => x && typeof x.id === 'string') : []
  } catch {
    return []
  }
}

export function saveSession(rec: Session) {
  try {
    const all = parseSessions(readRaw()).filter((x) => x.id !== rec.id)
    all.unshift(rec)
    localStorage.setItem(LS_KEY, JSON.stringify(all.slice(0, 10)))
    window.dispatchEvent(new Event(EVENT))
  } catch {
    // brak miejsca / tryb prywatny – trudno
  }
}

export function clearSessions(): number {
  const n = parseSessions(readRaw()).length
  try {
    localStorage.removeItem(LS_KEY)
    window.dispatchEvent(new Event(EVENT))
  } catch {}
  return n
}

export function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb)
  window.addEventListener('storage', cb)
  return () => {
    window.removeEventListener(EVENT, cb)
    window.removeEventListener('storage', cb)
  }
}
