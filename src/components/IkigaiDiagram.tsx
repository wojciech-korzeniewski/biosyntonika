import { circles } from '@/content/ikigai'

/** Diagram czterech kół ikigai (SVG, bez JS). */
export function IkigaiDiagram({ className }: { className?: string }) {
  const r = 112
  const pos = {
    love: { cx: 250, cy: 168 },
    good: { cx: 168, cy: 250 },
    world: { cx: 332, cy: 250 },
    paid: { cx: 250, cy: 332 },
  } as const

  return (
    <figure className={`ikigai-diagram ${className ?? ''}`}>
      <svg viewBox="0 0 500 500" role="img" aria-labelledby="ikigai-diagram-title">
        <title id="ikigai-diagram-title">
          Diagram ikigai: cztery koła – co kochasz, w czym jesteś dobry, czego potrzebuje świat, za co mogą ci płacić
        </title>
        {(Object.keys(pos) as (keyof typeof pos)[]).map((id) => (
          <circle
            key={id}
            {...pos[id]}
            r={r}
            fill={circles[id].color}
            fillOpacity={0.12}
            stroke={circles[id].color}
            strokeOpacity={0.8}
            strokeWidth={1.5}
          />
        ))}
        <g className="lbl-outer">
          <text x="250" y="44" textAnchor="middle" fill={circles.love.color}>KOCHASZ</text>
          <text x="40" y="118" fill={circles.good.color}>JESTEŚ DOBRY</text>
          <text x="460" y="118" textAnchor="end" fill={circles.world.color}>ŚWIAT POTRZEBUJE</text>
          <text x="250" y="468" textAnchor="middle" fill={circles.paid.color}>PŁACĄ CI</text>
        </g>
        <g className="lbl-inner">
          <text x="196" y="204" textAnchor="middle">PASJA</text>
          <text x="304" y="204" textAnchor="middle">MISJA</text>
          <text x="196" y="304" textAnchor="middle">PROFESJA</text>
          <text x="304" y="304" textAnchor="middle">POWOŁANIE</text>
        </g>
        <circle cx="250" cy="250" r="30" className="core" />
        <text x="250" y="256" textAnchor="middle" className="kanji">生き甲斐</text>
        <text x="250" y="296" textAnchor="middle" className="core-sub">sens życia</text>
      </svg>
      <figcaption className="ikigai-legend">
        {Object.values(circles).map((c) => (
          <span key={c.label}>
            <i style={{ background: c.color }} />
            {c.label}
          </span>
        ))}
      </figcaption>
    </figure>
  )
}
