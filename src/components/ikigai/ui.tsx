import type { Dict } from '@/content/ikigai/i18n'

export function SecureNote({ t }: { t: Dict }) {
  return (
    <div className="secure">
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <path
          d="M4 7V5a4 4 0 0 1 8 0v2M3 7h10v7H3z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
      </svg>
      <span>{t.secureLocal}</span>
    </div>
  )
}

export function CoachBubble({ t, text, wait }: { t: Dict; text: string; wait?: boolean }) {
  return (
    <div className="coach">
      <div className="av" aria-hidden="true">
        T
      </div>
      <div style={{ minWidth: 0 }}>
        <div className="who">{t.coachWho}</div>
        <div className={`msg${wait ? ' wait' : ''}`}>{text}</div>
      </div>
    </div>
  )
}
