import { I18N } from '@/content/ikigai/i18n'
import { clean, short } from '@/lib/ikigai/text'
import type { Answers, CircleId, IkigaiResult, Lang } from '@/lib/ikigai/types'

export const COLORS: Record<CircleId, string> = {
  love: '#d97a9a',
  good: '#8f9de0',
  world: '#86c296',
  paid: '#e0b552',
}

/** Pozycje odpowiedzi w kołach (z oryginału) – x, kolejne y i dostępna szerokość. */
const LOBES: Record<CircleId, { x: number; ys: number[]; w: number[] }> = {
  love: { x: 300, ys: [72, 90, 108, 126, 144], w: [176, 206, 226, 226, 196] },
  good: { x: 106, ys: [254, 272, 290, 308, 326], w: [108, 130, 146, 146, 142] },
  world: { x: 494, ys: [254, 272, 290, 308, 326], w: [108, 130, 146, 146, 142] },
  paid: { x: 300, ys: [462, 480, 498, 516, 534], w: [262, 252, 238, 220, 176] },
}
const OVERLAPS = [
  { k: 'pasja', x: 232, y: 226 },
  { k: 'misja', x: 368, y: 226 },
  { k: 'profesja', x: 232, y: 374 },
  { k: 'powolanie', x: 368, y: 374 },
] as const

const CHAR_W = 6.3 // przybliżona szerokość znaku przy 11.5px
const fit = (s: string, w: number) => short(s, Math.max(4, Math.floor(w / CHAR_W)))

function twoLines(text: string | undefined, maxc = 14) {
  const s = clean(text ?? '')
  if (!s) return []
  const lines = ['']
  for (const w of s.split(' ')) {
    const cur = lines[lines.length - 1]
    if (!cur || cur.length + 1 + w.length <= maxc) lines[lines.length - 1] = cur ? `${cur} ${w}` : w
    else if (lines.length < 2) lines.push(w)
    else lines[1] = `${lines[1]} ${w}`
  }
  return lines.map((l) => short(l, maxc))
}

type Props = {
  lang: Lang
  answers?: Answers
  result?: IkigaiResult | null
  fresh?: { k: CircleId; i: number } | null
  className?: string
}

export function Venn({ lang, answers, result, fresh, className }: Props) {
  const t = I18N[lang]
  return (
    <figure className={`venncard ${className ?? ''}`}>
      <svg viewBox="0 0 600 600" role="img" aria-label={`IKIGAI · ${t.vsub}`}>
        <g fillOpacity={0.16} strokeWidth={1.6}>
          <circle cx={300} cy={175} r={150} fill={COLORS.love} stroke={COLORS.love} />
          <circle cx={175} cy={300} r={150} fill={COLORS.good} stroke={COLORS.good} />
          <circle cx={425} cy={300} r={150} fill={COLORS.world} stroke={COLORS.world} />
          <circle cx={300} cy={425} r={150} fill={COLORS.paid} stroke={COLORS.paid} />
        </g>
        <text className="vl" x={300} y={52} textAnchor="middle" fill={COLORS.love}>
          {t.vl_love}
        </text>
        <text className="vl" x={14} y={128} textAnchor="start" fill={COLORS.good}>
          {t.vl_good}
        </text>
        <text className="vl" x={586} y={128} textAnchor="end" fill={COLORS.world}>
          {t.vl_world}
        </text>
        <text className="vl" x={300} y={560} textAnchor="middle" fill={COLORS.paid}>
          {t.vl_paid}
        </text>

        {answers &&
          (Object.keys(LOBES) as CircleId[]).map((k) =>
            answers[k].map((a, i) => (
              <text
                key={`${k}-${i}`}
                x={LOBES[k].x}
                y={LOBES[k].ys[i]}
                textAnchor="middle"
                className={`va${fresh && fresh.k === k && fresh.i === i ? ' va-new' : ''}`}
                fillOpacity={clean(a) ? 1 : 0.45}
              >
                {fit(a, LOBES[k].w[i])}
              </text>
            )),
          )}

        {OVERLAPS.map((o) => (
          <g key={o.k}>
            <text className="ov" x={o.x} y={o.y} textAnchor="middle">
              {t[`ov_${o.k}`]}
            </text>
            <text className="ovr" x={o.x} y={o.y + 18} textAnchor="middle">
              {twoLines(result?.[o.k]).map((l, i) => (
                <tspan key={i} x={o.x} dy={i ? 14 : 0}>
                  {l}
                </tspan>
              ))}
            </text>
          </g>
        ))}
        <circle cx={300} cy={300} r={34} className="core" />
        <text className="center" x={300} y={306} textAnchor="middle" lang="ja">
          生き甲斐
        </text>
        <text className="ovr" x={300} y={352} textAnchor="middle">
          {t.vsub}
        </text>
      </svg>
      <figcaption className="legend">
        {(Object.keys(COLORS) as CircleId[]).map((k) => (
          <span key={k}>
            <i style={{ background: COLORS[k] }} />
            {t[`c_${k}`]}
          </span>
        ))}
      </figcaption>
    </figure>
  )
}
