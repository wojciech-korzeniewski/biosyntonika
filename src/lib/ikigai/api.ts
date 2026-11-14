import {
  CIRCLES,
  type AiRequest,
  type Answers,
  type CircleId,
  type Lang,
  type VersionId,
} from './types'

type Ctx = {
  lang: Lang
  version: VersionId
  age: number | null
  name: string
  questions: Record<CircleId, string[]>
  answers: Answers
  deepQ: Partial<Record<CircleId, string>>
  deep: Partial<Record<CircleId, string>>
}

let aiAvailable = true

/** Wywołanie trenera AI. Zwraca null, gdy AI jest niedostępne – wtedy używamy odpowiedzi zapasowych. */
export async function aiCall<T>(
  kind: AiRequest['kind'],
  ctx: Ctx,
  extra: Partial<AiRequest> = {},
): Promise<T | null> {
  if (!aiAvailable) return null
  const items = CIRCLES.flatMap((c) =>
    ctx.questions[c]
      .slice(0, ctx.answers[c].length)
      .map((q, i) => ({ c, q, a: ctx.answers[c][i] ?? '' })),
  )
  const deep = CIRCLES.filter((c) => ctx.deepQ[c]).map((c) => ({
    c,
    q: ctx.deepQ[c]!,
    a: ctx.deep[c] ?? '',
  }))
  const body = {
    kind,
    lang: ctx.lang,
    version: ctx.version,
    age: ctx.age ?? 0,
    name: ctx.name,
    items,
    deep,
    ...extra,
  }
  const ctl = new AbortController()
  const timer = setTimeout(() => ctl.abort(), 90_000)
  try {
    const res = await fetch('/api/ikigai/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      credentials: 'omit',
      signal: ctl.signal,
    })
    if (res.status === 503) aiAvailable = false
    if (!res.ok) return null
    const j = await res.json()
    return j?.ok ? (j.data as T) : null
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}

export const isAiAvailable = () => aiAvailable
