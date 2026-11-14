'use client'

import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import { I18N, type Dict } from '@/content/ikigai/i18n'
import { QUESTIONS } from '@/content/ikigai/questions'
import { aiCall } from '@/lib/ikigai/api'
import { fallbackCoach, fallbackResult, legalTexts } from '@/lib/ikigai/fallback'
import { clearSessions, parseSessions, readRaw, saveSession, subscribe } from '@/lib/ikigai/storage'
import { clean, txt } from '@/lib/ikigai/text'
import {
  CIRCLES,
  SECONDS,
  TOTAL,
  type Answers,
  type CircleId,
  type CoachReply,
  type Consent,
  type IkigaiResult,
  type Lang,
  type Session,
  type VersionId,
} from '@/lib/ikigai/types'
import { IkigaiFinal } from './IkigaiFinal'
import { CoachBubble, SecureNote } from './ui'
import { COLORS, Venn } from './Venn'

type Screen =
  | { type: 'start' }
  | { type: 'consent' }
  | { type: 'section'; si: number }
  | { type: 'question'; si: number; qi: number }
  | { type: 'coach'; si: number }
  | { type: 'deep'; si: number; q: string }
  | { type: 'finalLoading' }
  | { type: 'final' }

const emptyAnswers = (): Answers => ({ love: [], good: [], world: [], paid: [] })
const VERSIONS: VersionId[] = ['indiv', 'youth', 'biz']

export function IkigaiApp() {
  const [lang, setLang] = useState<Lang>('pl')
  const [screen, setScreen] = useState<Screen>({ type: 'start' })
  const [version, setVersion] = useState<VersionId>('indiv')
  const [name, setName] = useState('')
  const [age, setAge] = useState<number | null>(null)
  const [consent, setConsent] = useState<Consent | null>(null)
  const [answers, setAnswers] = useState<Answers>(emptyAnswers)
  const [deepQ, setDeepQ] = useState<Partial<Record<CircleId, string>>>({})
  const [deep, setDeep] = useState<Partial<Record<CircleId, string>>>({})
  const [result, setResult] = useState<IkigaiResult | null>(null)
  const [sessId, setSessId] = useState<string | null>(null)
  const [refl, setRefl] = useState('')
  const [reflReply, setReflReply] = useState('')
  const [sent, setSent] = useState(false)
  const [fresh, setFresh] = useState<{ k: CircleId; i: number } | null>(null)
  const leftRef = useRef<HTMLDivElement>(null)

  const t = I18N[lang]
  const questions = QUESTIONS[version][lang]
  const done = CIRCLES.reduce((n, k) => n + answers[k].length, 0)
  const ctx = useMemo(
    () => ({ lang, version, age, name, questions, answers, deepQ, deep }),
    [lang, version, age, name, questions, answers, deepQ, deep],
  )

  // Po zmianie ekranu: jeśli początek panelu schował się pod przyklejonym menu – przewiń.
  useEffect(() => {
    const el = leftRef.current
    if (!el) return
    const header = document.querySelector('.site-header')
    const off = header ? header.getBoundingClientRect().bottom : 0
    const top = el.getBoundingClientRect().top
    if (top < off + 8) window.scrollTo({ top: Math.max(0, window.scrollY + top - off - 16) })
  }, [screen])

  const persist = useCallback(
    (patch: Partial<Session> = {}) => {
      const id = sessId ?? `s${Date.now()}`
      if (!sessId) setSessId(id)
      saveSession({
        id,
        name,
        createdAt: new Date().toISOString(),
        lang,
        version,
        age,
        consent,
        answers,
        deepQ,
        deep,
        result,
        refl,
        reflReply,
        sent,
        ...patch,
      })
    },
    [
      sessId,
      name,
      lang,
      version,
      age,
      consent,
      answers,
      deepQ,
      deep,
      result,
      refl,
      reflReply,
      sent,
    ],
  )

  const reset = () => {
    setAnswers(emptyAnswers())
    setDeepQ({})
    setDeep({})
    setResult(null)
    setSessId(null)
    setRefl('')
    setReflReply('')
    setSent(false)
    setFresh(null)
  }

  const loadSession = (d: Session) => {
    setName(clean(d.name))
    setVersion(VERSIONS.includes(d.version) ? d.version : 'indiv')
    setLang(d.lang === 'en' ? 'en' : 'pl')
    setAge(d.age ?? null)
    setConsent(d.consent ?? null)
    setAnswers(d.answers ?? emptyAnswers())
    setDeepQ(d.deepQ ?? {})
    setDeep(d.deep ?? {})
    setResult(d.result ?? null)
    setSessId(d.id)
    setRefl(d.refl ?? '')
    setReflReply(d.reflReply ?? '')
    setSent(Boolean(d.sent))
    setScreen({ type: 'final' })
  }

  const afterCircle = (si: number) =>
    setScreen(si < 3 ? { type: 'section', si: si + 1 } : { type: 'finalLoading' })

  const progress = (() => {
    switch (screen.type) {
      case 'start':
      case 'consent':
        return t.start
      case 'question':
        return t.qProg(done + 1, TOTAL)
      case 'section':
      case 'coach':
      case 'deep':
        return t.circleShort(screen.si + 1)
      default:
        return t.final
    }
  })()
  const barPct = screen.type === 'final' ? 100 : Math.round((done / TOTAL) * 100)

  return (
    <div className="ikg" lang={lang}>
      <header className="ikg-top">
        <div className="ikg-brand">
          <Image src="/images/ikigai-symbol.png" alt="" width={44} height={56} />
          <div>
            <p className="ikg-title">IKIGAI</p>
            <small>{t.appSub}</small>
          </div>
        </div>
        <div className="ikg-topr">
          {screen.type === 'start' && (
            <div className="ikg-lang" role="group" aria-label="Język / Language">
              {(['pl', 'en'] as const).map((l) => (
                <button key={l} type="button" aria-pressed={lang === l} onClick={() => setLang(l)}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          )}
          <div className="ikg-progress">
            <span>{progress}</span>
            <div className="ikg-bar">
              <i style={{ width: `${barPct}%` }} />
            </div>
          </div>
        </div>
      </header>

      <div className="ikg-main">
        <section className="ikg-pane" ref={leftRef} aria-live="polite">
          {screen.type === 'start' && (
            <StartScreen
              t={t}
              version={version}
              setVersion={setVersion}
              name={name}
              age={age}
              onNext={(n, a) => {
                setName(n)
                setAge(a)
                reset()
                setScreen({ type: 'consent' })
              }}
              onOpenSession={loadSession}
            />
          )}

          {screen.type === 'consent' && (
            <ConsentScreen
              t={t}
              lang={lang}
              name={name}
              isMinor={version === 'youth' && !!age && age < 16}
              onBack={() => setScreen({ type: 'start' })}
              onAgree={(sig, parent) => {
                setConsent({
                  signature: sig,
                  at: new Date().toISOString(),
                  regulamin: true,
                  dane: true,
                  lang,
                  version,
                  parent,
                })
                if (!name) setName(sig.split(' ')[0])
                setScreen({ type: 'section', si: 0 })
              }}
            />
          )}

          {screen.type === 'section' && (
            <SectionIntro
              t={t}
              si={screen.si}
              onStart={() => setScreen({ type: 'question', si: screen.si, qi: 0 })}
            />
          )}

          {screen.type === 'question' && (
            <TimedAsk
              key={`q-${screen.si}-${screen.qi}`}
              t={t}
              chip={t[`c_${CIRCLES[screen.si]}`]}
              color={COLORS[CIRCLES[screen.si]]}
              eyebrow={t.qOf(screen.qi + 1)}
              question={questions[CIRCLES[screen.si]][screen.qi]}
              onDone={(v) => {
                const k = CIRCLES[screen.si]
                const i = screen.qi
                setAnswers((prev) => {
                  const next = { ...prev, [k]: [...prev[k]] }
                  next[k][i] = v
                  return next
                })
                setFresh({ k, i })
                setScreen(
                  i + 1 < 5
                    ? { type: 'question', si: screen.si, qi: i + 1 }
                    : { type: 'coach', si: screen.si },
                )
              }}
            />
          )}

          {screen.type === 'coach' && (
            <CoachScreen
              key={`c-${screen.si}`}
              t={t}
              si={screen.si}
              load={() => aiCall<CoachReply>('coach', ctx, { circle: screen.si })}
              fallback={fallbackCoach(lang, screen.si)}
              onAnswer={(q) => setScreen({ type: 'deep', si: screen.si, q })}
              onSkip={() => afterCircle(screen.si)}
            />
          )}

          {screen.type === 'deep' && (
            <TimedAsk
              key={`d-${screen.si}`}
              t={t}
              chip={t.deepChip}
              color="var(--gold)"
              eyebrow={t.deepEyebrow}
              question={screen.q}
              onDone={(v) => {
                const k = CIRCLES[screen.si]
                setDeepQ((p) => ({ ...p, [k]: screen.q }))
                setDeep((p) => ({ ...p, [k]: v }))
                afterCircle(screen.si)
              }}
            />
          )}

          {screen.type === 'finalLoading' && (
            <FinalLoading
              t={t}
              load={() => aiCall<IkigaiResult>('final', ctx)}
              onReady={(ai) => {
                const fb = fallbackResult(answers, lang)
                let r: IkigaiResult = ai && typeof ai.ikigai === 'string' ? ai : fb
                if (!Array.isArray(r.blokady) || !r.blokady.length)
                  r = { ...r, blokady: fb.blokady }
                if (!r.potencjal?.nazwa) r = { ...r, potencjal: fb.potencjal }
                setResult(r)
                persist({ result: r })
                setScreen({ type: 'final' })
              }}
            />
          )}

          {screen.type === 'final' && result && (
            <IkigaiFinal
              t={t}
              lang={lang}
              name={name}
              version={version}
              age={age}
              consent={consent}
              result={result}
              questions={questions}
              answers={answers}
              deepQ={deepQ}
              deep={deep}
              refl={refl}
              reflReply={reflReply}
              sent={sent}
              ctx={ctx}
              onRefl={(v, reply) => {
                setRefl(v)
                setReflReply(reply)
                persist({ refl: v, reflReply: reply })
              }}
              onSent={() => {
                setSent(true)
                persist({ sent: true })
              }}
              onNew={() => {
                reset()
                setScreen({ type: 'start' })
              }}
              onMine={() => setScreen({ type: 'start' })}
            />
          )}
        </section>

        <aside className="ikg-pane ikg-side">
          <Venn lang={lang} answers={answers} result={result} fresh={fresh} />
        </aside>
      </div>

      <footer className="ikg-foot">
        <p className="fine">{t.fine}</p>
      </footer>
    </div>
  )
}

/* ---------------- Start ---------------- */

function StartScreen({
  t,
  version,
  setVersion,
  name,
  age,
  onNext,
  onOpenSession,
}: {
  t: Dict
  version: VersionId
  setVersion: (v: VersionId) => void
  name: string
  age: number | null
  onNext: (name: string, age: number | null) => void
  onOpenSession: (s: Session) => void
}) {
  const [nameIn, setNameIn] = useState(name)
  const [ageIn, setAgeIn] = useState(age ? String(age) : '')
  const [err, setErr] = useState('')
  const ageRef = useRef<HTMLInputElement>(null)
  const [o1, o2] = [t.origin1, t.origin2]

  const next = () => {
    const n = clean(nameIn).slice(0, 40)
    if (version === 'youth') {
      const a = parseInt(ageIn, 10)
      if (!(a >= 10 && a <= 25)) {
        setErr(t.errAge)
        ageRef.current?.focus()
        return
      }
      onNext(n, a)
    } else onNext(n, null)
  }

  return (
    <>
      <p className="eyebrow">{t.eyebrowStart}</p>
      <h1 className="ikg-h">{t.h2Start}</h1>
      <div className="origin">
        <h2 className="origin-h">{t.originH}</h2>
        <p>
          <span className="jp" lang="ja">
            {o1[0]}
          </span>
          <b>{o1[1]}</b>
          {o1[2]}
        </p>
        <p>
          <b>{o2[0]}</b>
          {o2[1]}
        </p>
      </div>
      <p className="lead">{t.leadStart}</p>
      <ul className="rules">
        <li>
          <b>{SECONDS}s</b>
          <span>{t.rule1}</span>
        </li>
        <li>
          <b>1×</b>
          <span>{t.rule2}</span>
        </li>
        <li>
          <b>↵</b>
          <span>{t.rule3}</span>
        </li>
      </ul>

      <p className="f">{t.chooseVersion}</p>
      <div className="versions" role="group" aria-label={t.chooseVersion}>
        {VERSIONS.map((v) => (
          <div key={v} className="vwrap">
            {v === 'youth' && <div className="vnote">{t.youthNote}</div>}
            <button
              type="button"
              className="vcard"
              aria-pressed={version === v}
              onClick={() => {
                setVersion(v)
                setErr('')
              }}
            >
              <strong>{t[`v_${v}`]}</strong>
              <span>{t[`v_${v}_d`]}</span>
            </button>
          </div>
        ))}
      </div>

      {version === 'youth' && (
        <div>
          <label className="f" htmlFor="ikg-age">
            {t.ageLabel}
          </label>
          <input
            id="ikg-age"
            ref={ageRef}
            type="number"
            min={10}
            max={25}
            inputMode="numeric"
            className="ikg-input"
            style={{ maxWidth: 120 }}
            value={ageIn}
            onChange={(e) => setAgeIn(e.target.value)}
          />
        </div>
      )}

      <label className="f" htmlFor="ikg-name">
        {t.nameLabel}
      </label>
      <input
        id="ikg-name"
        className="ikg-input"
        maxLength={40}
        autoComplete="given-name"
        placeholder={t.namePh}
        value={nameIn}
        onChange={(e) => setNameIn(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            next()
          }
        }}
      />
      {err && (
        <p className="err" role="alert">
          {err}
        </p>
      )}
      <div className="btns">
        <button type="button" className="btn btn-outline" onClick={next}>
          {t.next}
        </button>
      </div>
      <SecureNote t={t} />
      <History t={t} onOpen={onOpenSession} />
    </>
  )
}

function History({ t, onOpen }: { t: Dict; onOpen: (s: Session) => void }) {
  const raw = useSyncExternalStore(subscribe, readRaw, () => '[]')
  const docs = useMemo(() => parseSessions(raw), [raw])
  const [confirm, setConfirm] = useState(false)
  const [msg, setMsg] = useState('')
  const fmt = (iso: string) => {
    const d = new Date(iso)
    return isNaN(+d)
      ? ''
      : d.toLocaleString(t === I18N.en ? 'en-GB' : 'pl-PL', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
  }
  if (msg) return <p className="okmsg">{msg}</p>
  if (!docs.length) return null
  return (
    <div className="history">
      <p className="eyebrow">{t.mineBtn}</p>
      <ul>
        {docs.slice(0, 8).map((d) => (
          <li key={d.id}>
            <button type="button" onClick={() => onOpen(d)}>
              <span>{txt(d.result?.haslo, 50)}</span>
              <span>{fmt(d.createdAt)}</span>
            </button>
          </li>
        ))}
      </ul>
      {!confirm ? (
        <button type="button" className="link" onClick={() => setConfirm(true)}>
          {t.deleteMine}
        </button>
      ) : (
        <div className="confirm">
          {t.delAllQ}
          <button
            type="button"
            className="link warn"
            onClick={() => {
              const n = clearSessions()
              setMsg(t.deletedMsg(n, 0))
            }}
          >
            {t.yesDel}
          </button>{' '}
          <button type="button" className="link" onClick={() => setConfirm(false)}>
            {t.cancel}
          </button>
        </div>
      )}
    </div>
  )
}

/* ---------------- Consent ---------------- */

function ConsentScreen({
  t,
  lang,
  name,
  isMinor,
  onBack,
  onAgree,
}: {
  t: Dict
  lang: Lang
  name: string
  isMinor: boolean
  onBack: () => void
  onAgree: (signature: string, parent: string | null) => void
}) {
  const L = legalTexts(lang)
  const [reg, setReg] = useState(false)
  const [dat, setDat] = useState(false)
  const [par, setPar] = useState(false)
  const [parName, setParName] = useState('')
  const [sig, setSig] = useState('')
  const [err, setErr] = useState('')

  const submit = () => {
    const s = clean(sig).slice(0, 80)
    const okPar = !isMinor || (par && clean(parName).length > 2)
    if (!reg || !dat || s.length < 3 || !okPar) {
      setErr(t.errConsent)
      return
    }
    onAgree(s, isMinor ? clean(parName).slice(0, 80) : null)
  }

  const Check = ({
    id,
    checked,
    set,
    label,
  }: {
    id: string
    checked: boolean
    set: (v: boolean) => void
    label: string
  }) => (
    <label className="check" htmlFor={id}>
      <input id={id} type="checkbox" checked={checked} onChange={(e) => set(e.target.checked)} />
      <span>
        {label} <span className="req">({t.reqMark})</span>
      </span>
    </label>
  )

  return (
    <>
      <p className="eyebrow">{t.consentEyebrow}</p>
      <h2 className="ikg-h">{t.consentH}</h2>
      <p>{t.consentLead}</p>
      <details className="legal" open>
        <summary>{t.regTitle}</summary>
        <ol>
          {L.reg.map((x) => (
            <li key={x.slice(0, 30)}>{x}</li>
          ))}
        </ol>
      </details>
      <details className="legal">
        <summary>{t.rodoTitle}</summary>
        <ul>
          {L.rodo.map((x) => (
            <li key={x.slice(0, 30)}>{x}</li>
          ))}
        </ul>
      </details>
      <p className="small">
        <a href="/polityka-prywatnosci" target="_blank" rel="noopener">
          {t.privacyLink}
        </a>
      </p>
      {Check({ id: 'ikg-c-reg', checked: reg, set: setReg, label: t.c_reg })}
      {Check({ id: 'ikg-c-data', checked: dat, set: setDat, label: t.c_data })}
      {isMinor && Check({ id: 'ikg-c-parent', checked: par, set: setPar, label: t.c_parent })}
      {isMinor && (
        <div>
          <label className="f" htmlFor="ikg-parent">
            {t.parentName}
          </label>
          <input
            id="ikg-parent"
            className="ikg-input"
            maxLength={80}
            autoComplete="off"
            value={parName}
            onChange={(e) => setParName(e.target.value)}
          />
        </div>
      )}
      <label className="f" htmlFor="ikg-sig">
        {t.sigLabel}
      </label>
      <input
        id="ikg-sig"
        className="ikg-input"
        maxLength={80}
        autoComplete="name"
        placeholder={name || undefined}
        value={sig}
        onChange={(e) => setSig(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            submit()
          }
        }}
      />
      <p className="hint">{t.sigNote}</p>
      {err && (
        <p className="err" role="alert">
          {err}
        </p>
      )}
      <div className="btns">
        <button type="button" className="btn btn-solid" onClick={submit}>
          {t.agreeStart}
        </button>
        <button type="button" className="btn btn-outline" onClick={onBack}>
          {t.back}
        </button>
      </div>
    </>
  )
}

/* ---------------- Circles ---------------- */

function SectionIntro({ t, si, onStart }: { t: Dict; si: number; onStart: () => void }) {
  const k = CIRCLES[si]
  const ref = useRef<HTMLButtonElement>(null)
  useEffect(() => ref.current?.focus(), [])
  return (
    <>
      <p className="eyebrow">{t.circleOf(si + 1)}</p>
      <h2 className="ikg-h" style={{ color: COLORS[k] }}>
        {t[`c_${k}`]}
      </h2>
      <p className="lead">{t[`i_${k}`]}</p>
      <p className="muted">{t.introMeta}</p>
      <div className="btns">
        <button ref={ref} type="button" className="btn btn-solid" onClick={onStart}>
          {t.startCircle}
        </button>
      </div>
    </>
  )
}

/** Pytanie z 30-sekundowym licznikiem (pierścień). Montowane od nowa dla każdego pytania (key). */
function TimedAsk({
  t,
  chip,
  color,
  eyebrow,
  question,
  onDone,
}: {
  t: Dict
  chip: string
  color: string
  eyebrow: string
  question: string
  onDone: (value: string) => void
}) {
  const [value, setValue] = useState('')
  const [ms, setMs] = useState(SECONDS * 1000)
  const taRef = useRef<HTMLTextAreaElement>(null)
  const finished = useRef(false)

  const submit = useCallback(() => {
    if (finished.current) return
    finished.current = true
    onDone(clean(taRef.current?.value ?? '').slice(0, 200))
  }, [onDone])

  useEffect(() => {
    taRef.current?.focus()
    const deadline = performance.now() + SECONDS * 1000
    let raf = 0
    const tick = () => {
      if (finished.current) return
      const left = Math.max(0, deadline - performance.now())
      setMs(left)
      if (left <= 0) {
        submit()
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [submit])

  const C = 2 * Math.PI * 28
  return (
    <>
      <div className="qhead">
        <span className="chip" style={{ color }}>
          {chip}
        </span>
        <div
          className={`ring-timer${ms < 8000 ? ' low' : ''}`}
          role="timer"
          aria-label={t.timerAria}
        >
          <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true">
            <circle cx="32" cy="32" r="28" fill="none" stroke="var(--line)" strokeWidth="4" />
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke={color}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C * (1 - ms / (SECONDS * 1000))}
              transform="rotate(-90 32 32)"
            />
          </svg>
          <span>{Math.ceil(ms / 1000)}</span>
        </div>
      </div>
      <p className="eyebrow" style={{ marginTop: 18 }}>
        {eyebrow}
      </p>
      <h2 className="ikg-q">
        <label htmlFor="ikg-ans">{question}</label>
      </h2>
      <textarea
        id="ikg-ans"
        ref={taRef}
        className="ikg-input"
        rows={3}
        maxLength={200}
        placeholder={t.ansPh}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            submit()
          }
        }}
      />
      <p className="hint">{t.hint}</p>
      <div className="btns">
        <button type="button" className="btn btn-solid" onClick={submit}>
          {t.next}
        </button>
      </div>
    </>
  )
}

function CoachScreen({
  t,
  si,
  load,
  fallback,
  onAnswer,
  onSkip,
}: {
  t: Dict
  si: number
  load: () => Promise<CoachReply | null>
  fallback: CoachReply
  onAnswer: (q: string) => void
  onSkip: () => void
}) {
  const [reply, setReply] = useState<CoachReply | null>(null)
  const goRef = useRef<HTMLButtonElement>(null)
  const loadRef = useRef(load)
  const fallbackRef = useRef(fallback)

  useEffect(() => {
    let alive = true
    loadRef.current().then((d) => {
      if (!alive) return
      setReply(d && typeof d.komentarz === 'string' && d.pytanie?.trim() ? d : fallbackRef.current)
    })
    return () => {
      alive = false
    }
  }, [])

  useEffect(() => {
    if (reply) goRef.current?.focus()
  }, [reply])

  const k = CIRCLES[si]
  const dq = reply ? clean(reply.pytanie).slice(0, 200) : ''
  return (
    <>
      <p className="eyebrow">{t.circleOf(si + 1)}</p>
      <h2 className="ikg-h" style={{ color: COLORS[k] }}>
        {t[`c_${k}`]}
      </h2>
      <CoachBubble t={t} text={reply ? clean(reply.komentarz) : t.coachReading} wait={!reply} />
      {reply && (
        <div>
          <p className="eyebrow" style={{ marginTop: 8 }}>
            {t.deepEyebrow}
          </p>
          <p className="deepq">{dq}</p>
          <div className="btns">
            <button
              ref={goRef}
              type="button"
              className="btn btn-solid"
              onClick={() => onAnswer(dq)}
            >
              {t.deepAnswer}
            </button>
            <button type="button" className="btn btn-outline" onClick={onSkip}>
              {t.skip}
            </button>
          </div>
        </div>
      )}
    </>
  )
}

function FinalLoading({
  t,
  load,
  onReady,
}: {
  t: Dict
  load: () => Promise<IkigaiResult | null>
  onReady: (r: IkigaiResult | null) => void
}) {
  const loadRef = useRef(load)
  const readyRef = useRef(onReady)
  useEffect(() => {
    let alive = true
    loadRef.current().then((r) => alive && readyRef.current(r))
    return () => {
      alive = false
    }
  }, [])
  return (
    <>
      <p className="eyebrow">{t.final}</p>
      <h2 className="ikg-h">{t.yourIkigai}</h2>
      <CoachBubble t={t} text={t.analyzing} wait />
    </>
  )
}
