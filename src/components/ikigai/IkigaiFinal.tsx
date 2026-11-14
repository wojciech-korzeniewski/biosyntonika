'use client'

import { useState } from 'react'
import type { Dict } from '@/content/ikigai/i18n'
import { aiCall, isAiAvailable } from '@/lib/ikigai/api'
import { makeCard } from '@/lib/ikigai/card'
import { COACH } from '@/lib/ikigai/fallback'
import { clean, txt } from '@/lib/ikigai/text'
import {
  CIRCLES,
  type Answers,
  type CircleId,
  type Consent,
  type IkigaiResult,
  type Lang,
  type VersionId,
} from '@/lib/ikigai/types'
import { CoachBubble, SecureNote } from './ui'
import { COLORS } from './Venn'

type Ctx = Parameters<typeof aiCall>[1]

type Props = {
  t: Dict
  lang: Lang
  name: string
  version: VersionId
  age: number | null
  consent: Consent | null
  result: IkigaiResult
  questions: Record<CircleId, string[]>
  answers: Answers
  deepQ: Partial<Record<CircleId, string>>
  deep: Partial<Record<CircleId, string>>
  refl: string
  reflReply: string
  sent: boolean
  ctx: Ctx
  onRefl: (refl: string, reply: string) => void
  onSent: () => void
  onNew: () => void
  onMine: () => void
}

export function IkigaiFinal(p: Props) {
  const { t, result: r, name } = p
  const a = r.analiza ?? { kochasz: '', dobry: '', swiat: '', placa: '' }
  const [inviteOpen, setInviteOpen] = useState(p.sent)
  const [card, setCard] = useState<{ url?: string; err?: boolean } | null>(null)

  const cell = (label: string, color: string, v: string) => (
    <div className="cell">
      <div className="k" style={{ color }}>
        {label}
      </div>
      <div className="v">{txt(v, 40)}</div>
    </div>
  )

  const downloadCard = async () => {
    try {
      const url = await makeCard(r, name, p.lang)
      const link = document.createElement('a')
      link.href = url
      link.download = 'karta-ikigai.png'
      document.body.appendChild(link)
      link.click()
      link.remove()
      setCard({ url })
    } catch {
      setCard({ err: true })
    }
  }

  return (
    <>
      <p className="eyebrow">
        {t.final}
        {name ? ` · ${name}` : ''}
      </p>
      <h2 className="ikg-h">{txt(r.haslo, 60)}</h2>
      <p className="statement">{txt(r.ikigai, 260)}</p>
      <div className="grid4">
        {cell(t.ov_pasja, COLORS.love, r.pasja)}
        {cell(t.ov_misja, COLORS.world, r.misja)}
        {cell(t.ov_profesja, COLORS.good, r.profesja)}
        {cell(t.ov_powolanie, COLORS.paid, r.powolanie)}
      </div>

      <div className="pot">
        <p className="eyebrow">{t.potH}</p>
        <div className="potn">{txt(r.potencjal?.nazwa, 80)}</div>
        <p>{txt(r.potencjal?.opis, 500)}</p>
      </div>

      <h3>{t.seesH}</h3>
      <p>
        <b style={{ color: COLORS.love }}>{t.vl_love}. </b>
        {txt(a.kochasz)}
      </p>
      <p>
        <b style={{ color: COLORS.good }}>{t.vl_good}. </b>
        {txt(a.dobry)}
      </p>
      <p>
        <b style={{ color: COLORS.world }}>{t.vl_world}. </b>
        {txt(a.swiat)}
      </p>
      <p>
        <b style={{ color: COLORS.paid }}>{t.vl_paid}. </b>
        {txt(a.placa)}
      </p>
      <p>
        <b>{t.gapB}</b>
        {txt(r.rozdzwiek)}
      </p>

      <h3>{t.blocksH}</h3>
      <p className="muted">{t.blocksLead}</p>
      <div className="blocks">
        {(r.blokady ?? []).slice(0, 3).map((b, i) => (
          <div className="block" key={i}>
            <div className="n">{txt(b?.nazwa, 60)}</div>
            <div className="b">„{txt(b?.przekonanie, 160)}”</div>
            <dl>
              <dt>{t.signal}</dt>
              <dd>{txt(b?.sygnal, 240)}</dd>
              <dt>{t.work}</dt>
              <dd>{txt(b?.praca, 240)}</dd>
            </dl>
          </div>
        ))}
      </div>

      {!inviteOpen ? (
        <div className="btns">
          <button type="button" className="btn btn-solid" onClick={() => setInviteOpen(true)}>
            {t.invBtn}
          </button>
        </div>
      ) : (
        <Invite {...p} />
      )}

      <h3>{t.strengthsH}</h3>
      <ol className="steps">
        {(r.mocne_strony ?? []).slice(0, 3).map((x, i) => (
          <li key={i}>{txt(x, 220)}</li>
        ))}
      </ol>
      <h3>{t.planH}</h3>
      <ol className="steps">
        {(r.kroki ?? []).slice(0, 3).map((x, i) => (
          <li key={i}>{txt(x, 220)}</li>
        ))}
      </ol>

      <CoachBubble t={t} text={txt(r.pytanie)} />
      <Reflection {...p} />

      {r.offline && <p className="muted">{t.offlineNote}</p>}

      <div className="btns">
        <button type="button" className="btn btn-outline" onClick={downloadCard}>
          {t.cardBtn}
        </button>
        <button type="button" className="btn btn-outline" onClick={p.onNew}>
          {t.newBtn}
        </button>
        <button type="button" className="link" onClick={p.onMine}>
          {t.mineBtn}
        </button>
      </div>
      {card?.err && <p className="err">{t.cardFail}</p>}
      {card?.url && (
        <div>
          <p className="muted">{t.cardPreview}</p>
          {/* eslint-disable-next-line @next/next/no-img-element -- podgląd lokalnego blob: */}
          <img className="cardprev" src={card.url} alt="IKIGAI" />
        </div>
      )}
      <SecureNote t={t} />
    </>
  )
}

/* ---------------- Refleksja ---------------- */

function Reflection(p: Props) {
  const { t, result: r } = p
  const [value, setValue] = useState(p.refl)
  const [saved, setSaved] = useState(false)
  const [busy, setBusy] = useState(false)
  const [reply, setReply] = useState(p.reflReply)
  const [waiting, setWaiting] = useState(false)

  const save = async () => {
    const v = clean(value).slice(0, 800)
    if (!v) return
    setBusy(true)
    setSaved(true)
    p.onRefl(v, reply)
    if (isAiAvailable()) {
      setWaiting(true)
      const d = await aiCall<string>('reflect', p.ctx, {
        ikigai: txt(r.ikigai, 260),
        pytanie: txt(r.pytanie, 200),
        potencjal: txt(r.potencjal?.nazwa, 80),
        refl: v,
      })
      setWaiting(false)
      if (typeof d === 'string' && d.trim()) {
        const rep = clean(d).slice(0, 600)
        setReply(rep)
        p.onRefl(v, rep)
      }
    }
    setBusy(false)
  }

  return (
    <div>
      <label className="f" htmlFor="ikg-refl">
        {t.reflH}
      </label>
      <textarea
        id="ikg-refl"
        className="ikg-input"
        rows={3}
        maxLength={800}
        placeholder={t.reflPh}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="btns">
        <button type="button" className="btn btn-outline" disabled={busy} onClick={save}>
          {t.reflSave}
        </button>
      </div>
      {saved && <p className="okmsg">{t.reflSaved}</p>}
      {waiting && <CoachBubble t={t} text={t.reflCoach} wait />}
      {!waiting && reply && <CoachBubble t={t} text={reply} />}
    </div>
  )
}

/* ---------------- Zaproszenie na sesję ---------------- */

function summaryText(p: Props) {
  const { t, result: r } = p
  const lines = [
    'IKIGAI · BioSyntonika™',
    `${p.name || ''} · ${t[`ver_${p.version}`]}`,
    '',
    txt(r.haslo, 60),
    txt(r.ikigai, 260),
    '',
    `${t.potH}: ${txt(r.potencjal?.nazwa, 80)}`,
    '',
    `${t.blocksH}:`,
  ]
  ;(r.blokady ?? [])
    .slice(0, 3)
    .forEach((b, i) => lines.push(`${i + 1}. ${txt(b.nazwa, 60)} — „${txt(b.przekonanie, 160)}”`))
  return lines.join('\n')
}

function answersText(p: Props) {
  const none = p.lang === 'en' ? '(no answer)' : '(brak odpowiedzi)'
  return CIRCLES.map((k) => {
    const lines = p.questions[k].map((q, i) => `- ${q} → ${clean(p.answers[k][i]) || none}`)
    if (p.deepQ[k]) lines.push(`- [${p.t.deepPrefix}] ${p.deepQ[k]} → ${clean(p.deep[k]) || none}`)
    return `## ${p.t[`c_${k}`]}\n${lines.join('\n')}`
  }).join('\n\n')
}

function Invite(p: Props) {
  const { t, result: r } = p
  const isMinor = p.version === 'youth' && !!p.age && p.age < 16
  const [f, setF] = useState({
    name: p.consent?.signature || p.name || '',
    email: '',
    phone: '',
    company: '',
    form: 'online' as 'online' | 'stacjonarnie' | 'dowolnie',
    time: '',
    message: '',
    share: false,
    answers: false,
    website: '',
  })
  const [err, setErr] = useState('')
  const [sending, setSending] = useState(false)
  const [failed, setFailed] = useState(false)
  const [copied, setCopied] = useState(false)
  const set = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) => setF((x) => ({ ...x, [k]: v }))

  if (p.sent) {
    return (
      <div className="inv">
        <h3>{t.invH}</h3>
        <p className="okmsg">{t.sent}</p>
        <p className="muted small">
          {p.lang === 'en'
            ? 'To withdraw consent, write to '
            : 'Aby wycofać zgodę i usunąć zgłoszenie, napisz na '}
          <a href={`mailto:${COACH.email}`}>{COACH.email}</a>.
        </p>
      </div>
    )
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErr('')
    const email = clean(f.email).slice(0, 120)
    const phone = clean(f.phone).slice(0, 30)
    if ((!email && !phone) || !f.share) {
      setErr(t.errContact)
      return
    }
    const doc = {
      lang: p.lang,
      version: p.version,
      age: p.age,
      name: clean(f.name).slice(0, 80),
      email,
      phone,
      company: p.version === 'biz' ? clean(f.company).slice(0, 120) : '',
      form: f.form,
      time: clean(f.time).slice(0, 120),
      message: clean(f.message).slice(0, 600),
      consent: {
        signature: p.consent?.signature ?? '',
        at: p.consent?.at ?? '',
        parent: p.consent?.parent ?? null,
        udostepnienie: true,
        pelneOdpowiedzi: f.answers,
      },
      result: {
        haslo: txt(r.haslo, 60),
        ikigai: txt(r.ikigai, 260),
        pasja: txt(r.pasja, 40),
        misja: txt(r.misja, 40),
        profesja: txt(r.profesja, 40),
        powolanie: txt(r.powolanie, 40),
        rozdzwiek: txt(r.rozdzwiek, 300),
        potencjal: { nazwa: txt(r.potencjal?.nazwa, 80), opis: txt(r.potencjal?.opis, 500) },
        pytanie: txt(r.pytanie, 200),
        refleksja: clean(p.refl).slice(0, 800),
        blokady: (r.blokady ?? []).slice(0, 3).map((b) => ({
          nazwa: txt(b.nazwa, 60),
          przekonanie: txt(b.przekonanie, 160),
          sygnal: txt(b.sygnal, 240),
          praca: txt(b.praca, 240),
        })),
      },
      answers: f.answers ? answersText(p).slice(0, 8000) : null,
      website: f.website,
    }
    setSending(true)
    try {
      const res = await fetch('/api/ikigai/zgloszenie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'omit',
        body: JSON.stringify(doc),
      })
      const j = await res.json().catch(() => null)
      if (!res.ok || !j?.ok) throw new Error('http')
      p.onSent()
    } catch {
      setFailed(true)
    } finally {
      setSending(false)
    }
  }

  const summary = summaryText(p)
  return (
    <form className="inv" noValidate onSubmit={submit}>
      <h3>{t.invH}</h3>
      <p>{t.invLead}</p>
      {isMinor && <p className="muted">{t.parentContact}</p>}
      <label className="f" htmlFor="inv-name">
        {t.f_name}
      </label>
      <input
        id="inv-name"
        className="ikg-input"
        maxLength={80}
        autoComplete="name"
        value={f.name}
        onChange={(e) => set('name', e.target.value)}
      />
      <div className="row2">
        <div>
          <label className="f" htmlFor="inv-email">
            {t.f_email}
          </label>
          <input
            id="inv-email"
            type="email"
            className="ikg-input"
            maxLength={120}
            autoComplete="email"
            value={f.email}
            onChange={(e) => set('email', e.target.value)}
          />
        </div>
        <div>
          <label className="f" htmlFor="inv-phone">
            {t.f_phone}
          </label>
          <input
            id="inv-phone"
            type="tel"
            className="ikg-input"
            maxLength={30}
            autoComplete="tel"
            value={f.phone}
            onChange={(e) => set('phone', e.target.value)}
          />
        </div>
      </div>
      {p.version === 'biz' && (
        <div>
          <label className="f" htmlFor="inv-company">
            {t.f_company}
          </label>
          <input
            id="inv-company"
            className="ikg-input"
            maxLength={120}
            autoComplete="organization"
            value={f.company}
            onChange={(e) => set('company', e.target.value)}
          />
        </div>
      )}
      <div className="row2">
        <div>
          <label className="f" htmlFor="inv-form">
            {t.f_form}
          </label>
          <select
            id="inv-form"
            className="ikg-input"
            value={f.form}
            onChange={(e) => set('form', e.target.value as typeof f.form)}
          >
            <option value="online">{t.opt_online}</option>
            <option value="stacjonarnie">{t.opt_office}</option>
            <option value="dowolnie">{t.opt_any}</option>
          </select>
        </div>
        <div>
          <label className="f" htmlFor="inv-time">
            {t.f_time}
          </label>
          <input
            id="inv-time"
            className="ikg-input"
            maxLength={120}
            placeholder={t.f_time_ph}
            value={f.time}
            onChange={(e) => set('time', e.target.value)}
          />
        </div>
      </div>
      <label className="f" htmlFor="inv-msg">
        {t.f_msg}
      </label>
      <textarea
        id="inv-msg"
        className="ikg-input"
        rows={3}
        maxLength={600}
        value={f.message}
        onChange={(e) => set('message', e.target.value)}
      />
      <label className="check" htmlFor="inv-share">
        <input
          id="inv-share"
          type="checkbox"
          checked={f.share}
          onChange={(e) => set('share', e.target.checked)}
        />
        <span>
          {t.c_share} <span className="req">({t.reqMark})</span>
        </span>
      </label>
      <label className="check" htmlFor="inv-answers">
        <input
          id="inv-answers"
          type="checkbox"
          checked={f.answers}
          onChange={(e) => set('answers', e.target.checked)}
        />
        <span>{t.c_answers}</span>
      </label>
      <div className="hp" aria-hidden="true">
        <label htmlFor="inv-website">Website</label>
        <input
          id="inv-website"
          tabIndex={-1}
          autoComplete="off"
          value={f.website}
          onChange={(e) => set('website', e.target.value)}
        />
      </div>
      {err && (
        <p className="err" role="alert">
          {err}
        </p>
      )}
      <div className="btns">
        <button type="submit" className="btn btn-solid" disabled={sending}>
          {sending ? t.sending : t.send}
        </button>
      </div>
      {failed && (
        <div>
          <p className="err">{t.sendFail}</p>
          <p>
            {t.coachContact}
            <a href={`mailto:${COACH.email}`}>{COACH.email}</a> · {COACH.phone}
          </p>
          <textarea
            className="ikg-input"
            rows={6}
            readOnly
            value={summary}
            aria-label={t.copySummary}
          />
          <div className="btns">
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(summary)
                  setCopied(true)
                } catch {}
              }}
            >
              {copied ? t.copied : t.copySummary}
            </button>
          </div>
        </div>
      )}
    </form>
  )
}
