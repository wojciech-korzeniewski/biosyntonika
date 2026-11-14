/** Czyści tekst wpisany przez użytkownika: bez znaków sterujących i < >, zwinięte spacje, max 600 znaków. */
export function clean(x: unknown): string {
  return String(x == null ? '' : x)
    .replace(/[\u0000-\u001f<>]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 600)
}

export function short(x: unknown, n: number): string {
  const s = clean(x)
  if (!s) return '—'
  return s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s
}

export const txt = (v: unknown, n = 400) => short(typeof v === 'string' ? v : '', n)
