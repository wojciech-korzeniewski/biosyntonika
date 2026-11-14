'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  circleOrder,
  circles,
  intersections,
  versions,
  type CircleId,
  type VersionId,
} from '@/content/ikigai'

const SECONDS = 30
type Answers = Record<CircleId, string[]>
type Step = 'intro' | 'question' | 'deepen' | 'summary'

const emptyAnswers = (): Answers => ({ love: [], good: [], world: [], paid: [] })
const emptyDeepen = (): Record<CircleId, string> => ({ love: '', good: '', world: '', paid: '' })

export function IkigaiTrainer() {
  const [step, setStep] = useState<Step>('intro')
  const [version, setVersion] = useState<VersionId>('adults')
  const [name, setName] = useState('')
  const [circleIdx, setCircleIdx] = useState(0)
  const [qIdx, setQIdx] = useState(0)
  const [answers, setAnswers] = useState<Answers>(emptyAnswers)
  const [deepen, setDeepen] = useState(emptyDeepen)
  const [copied, setCopied] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const circle = circleOrder[circleIdx]
  const questions = versions[version].questions[circle]
  const total = circleOrder.length * questions.length
  const done = circleIdx * questions.length + qIdx

  const submit = useCallback(
    (value: string) => {
      setAnswers((prev) => ({ ...prev, [circle]: [...prev[circle], value.trim()] }))
      if (qIdx + 1 < questions.length) {
        setQIdx(qIdx + 1)
      } else {
        setStep('deepen')
      }
    },
    [circle, qIdx, questions.length],
  )

  // Po zmianie etapu przewiń do początku ćwiczenia.
  useEffect(() => {
    if (step !== 'question') rootRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [step])

  const start = () => {
    setAnswers(emptyAnswers())
    setDeepen(emptyDeepen())
    setCircleIdx(0)
    setQIdx(0)
    setStep('question')
  }

  const nextCircle = () => {
    if (circleIdx + 1 < circleOrder.length) {
      setCircleIdx(circleIdx + 1)
      setQIdx(0)
      setStep('question')
    } else {
      setStep('summary')
    }
  }

  const summaryText = () => {
    const lines = [`IKIGAI${name ? ` – ${name}` : ''} (${versions[version].label})`, '']
    for (const id of circleOrder) {
      lines.push(`## ${circles[id].label}`)
      versions[version].questions[id].forEach((q, i) => lines.push(`- ${q} → ${answers[id][i] || '—'}`))
      if (deepen[id]) lines.push(`  ${circles[id].deepen} → ${deepen[id]}`)
      lines.push('')
    }
    lines.push('## Do refleksji')
    intersections.forEach((x) => lines.push(`- ${x.label}: ${x.prompt}`))
    return lines.join('\n')
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summaryText())
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="trainer" ref={rootRef} id="cwiczenie">
      {step === 'intro' && (
        <div className="trainer-intro">
          <p className="trainer-label">Wybierz wersję</p>
          <div className="versions" role="radiogroup" aria-label="Wersja ćwiczenia">
            {(Object.keys(versions) as VersionId[]).map((id) => (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={version === id}
                className={`version ${version === id ? 'active' : ''}`}
                onClick={() => setVersion(id)}
              >
                <span className="version-name">{versions[id].label}</span>
                <span className="version-hint">{versions[id].hint}</span>
              </button>
            ))}
          </div>
          {versions[version].note && <p className="trainer-note">{versions[version].note}</p>}
          <label className="trainer-label" htmlFor="ikigai-name">
            Jak mam się do ciebie zwracać? (opcjonalnie)
          </label>
          <input
            id="ikigai-name"
            className="trainer-input"
            placeholder="np. Ania"
            value={name}
            maxLength={40}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                // preventDefault: ten sam Enter nie może zatwierdzić pierwszego pytania
                e.preventDefault()
                start()
              }
            }}
          />
          <button type="button" className="btn btn-outline" onClick={start}>
            Dalej
          </button>
          <p className="muted small">Odpowiedzi zostają tylko w Twojej przeglądarce – nigdzie ich nie wysyłamy.</p>
        </div>
      )}

      {step === 'question' && (
        <QuestionStep
          key={`${circleIdx}-${qIdx}`}
          color={circles[circle].color}
          meta={`Krąg ${circleIdx + 1}/4 · ${circles[circle].label} · pytanie ${qIdx + 1}/${questions.length}`}
          question={`${name && qIdx === 0 && circleIdx === 0 ? `${name}, ` : ''}${questions[qIdx]}`}
          progress={done / total}
          onSubmit={submit}
        />
      )}

      {step === 'deepen' && (
        <div className="trainer-deepen">
          <p className="trainer-circle" style={{ color: circles[circle].color }}>
            Krąg {circleIdx + 1}/4 zakończony · {circles[circle].label}
          </p>
          <ul className="answers">
            {answers[circle].map((a, i) => (
              <li key={i}>{a || <span className="muted">—</span>}</li>
            ))}
          </ul>
          <label htmlFor="ikigai-deepen" className="trainer-question">
            {circles[circle].deepen}
          </label>
          <textarea
            id="ikigai-deepen"
            className="trainer-input"
            rows={3}
            maxLength={500}
            value={deepen[circle]}
            onChange={(e) => setDeepen((d) => ({ ...d, [circle]: e.target.value }))}
          />
          <button type="button" className="btn btn-outline" onClick={nextCircle}>
            {circleIdx + 1 < circleOrder.length ? 'Następny krąg' : 'Zobacz podsumowanie'}
          </button>
        </div>
      )}

      {step === 'summary' && (
        <div className="trainer-summary">
          <p className="trainer-label">Podsumowanie</p>
          <h2>{name ? `${name}, oto` : 'Oto'} Twoja mapa ikigai</h2>
          <div className="summary-grid">
            {circleOrder.map((id) => (
              <section key={id} className="summary-card" style={{ borderColor: circles[id].color }}>
                <h3 style={{ color: circles[id].color }}>{circles[id].label}</h3>
                <ul className="answers">
                  {answers[id].map((a, i) => (
                    <li key={i}>{a || <span className="muted">—</span>}</li>
                  ))}
                </ul>
                {deepen[id] && <p className="deepen-answer">{deepen[id]}</p>}
              </section>
            ))}
          </div>
          <h3 className="reflect-title">Do refleksji</h3>
          <dl className="reflect">
            {intersections.map((x) => (
              <div key={x.id}>
                <dt>{x.label}</dt>
                <dd>{x.prompt}</dd>
              </div>
            ))}
            <div>
              <dt>Ikigai</dt>
              <dd>Co pojawia się we wszystkich czterech kręgach jednocześnie?</dd>
            </div>
          </dl>
          <div className="actions">
            <button type="button" className="btn btn-outline btn-sm" onClick={copy}>
              {copied ? 'Skopiowano ✓' : 'Skopiuj odpowiedzi'}
            </button>
            <button type="button" className="btn btn-outline btn-sm" onClick={() => window.print()}>
              Drukuj / PDF
            </button>
            <button type="button" className="btn btn-outline btn-sm" onClick={() => setStep('intro')}>
              Zacznij od nowa
            </button>
          </div>
          <div className="trainer-cta">
            <p>Chcesz przełożyć mapę na konkretne kroki i przepracować blokady? Omów wyniki na sesji z trenerem.</p>
            <Link href="/kontakt" className="btn btn-solid">
              Umów sesję
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

/** Jedno pytanie z 30-sekundowym licznikiem. Montowane od nowa dla każdego pytania (key). */
function QuestionStep({
  color,
  meta,
  question,
  progress,
  onSubmit,
}: {
  color: string
  meta: string
  question: string
  progress: number
  onSubmit: (value: string) => void
}) {
  const [draft, setDraft] = useState('')
  const [left, setLeft] = useState(SECONDS)
  const inputRef = useRef<HTMLInputElement>(null)
  const submitted = useRef(false)

  const send = useCallback(
    (value: string) => {
      if (submitted.current) return
      submitted.current = true
      onSubmit(value)
    },
    [onSubmit],
  )

  useEffect(() => {
    inputRef.current?.focus()
    const started = Date.now()
    const id = window.setInterval(() => {
      const remaining = Math.max(0, SECONDS - Math.floor((Date.now() - started) / 1000))
      setLeft(remaining)
      if (remaining === 0) {
        window.clearInterval(id)
        send(inputRef.current?.value ?? '')
      }
    }, 250)
    return () => window.clearInterval(id)
  }, [send])

  return (
    <form
      className="trainer-q"
      onSubmit={(e) => {
        e.preventDefault()
        send(draft)
      }}
    >
      <div className="trainer-progress" aria-hidden="true">
        <span style={{ width: `${progress * 100}%` }} />
      </div>
      <p className="trainer-circle" style={{ color }}>
        {meta}
      </p>
      <label htmlFor="ikigai-answer" className="trainer-question">
        {question}
      </label>
      <input
        id="ikigai-answer"
        ref={inputRef}
        className="trainer-input"
        value={draft}
        autoComplete="off"
        maxLength={200}
        onChange={(e) => setDraft(e.target.value)}
      />
      <div className="trainer-row">
        <span className={`timer ${left <= 10 ? 'warn' : ''}`}>{left}s</span>
        <button type="submit" className="btn btn-outline btn-sm">
          Dalej ↵
        </button>
      </div>
      <div className="timer-bar" aria-hidden="true">
        <span style={{ width: `${(left / SECONDS) * 100}%` }} />
      </div>
    </form>
  )
}
