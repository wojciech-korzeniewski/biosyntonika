import { z } from 'zod'
import { site } from '@/content/site'

export const runtime = 'nodejs'

const s = (max: number) => z.string().max(max).default('')
const Block = z.object({ nazwa: s(80), przekonanie: s(200), sygnal: s(260), praca: s(260) })
const RequestSchema = z.object({
  lang: z.enum(['pl', 'en']),
  version: z.enum(['indiv', 'youth', 'biz']),
  age: z.number().int().min(0).max(120).nullable().default(null),
  name: s(80),
  email: s(120),
  phone: s(30),
  company: s(120),
  form: z.enum(['online', 'stacjonarnie', 'dowolnie']),
  time: s(120),
  message: s(600),
  consent: z.object({
    signature: s(80),
    at: s(40),
    parent: z.string().max(80).nullable().default(null),
    udostepnienie: z.literal(true),
    pelneOdpowiedzi: z.boolean(),
  }),
  result: z.object({
    haslo: s(80),
    ikigai: s(300),
    pasja: s(60),
    misja: s(60),
    profesja: s(60),
    powolanie: s(60),
    rozdzwiek: s(320),
    potencjal: z.object({ nazwa: s(100), opis: s(520) }),
    pytanie: s(220),
    refleksja: s(820),
    blokady: z.array(Block).max(3),
  }),
  answers: z.string().max(8000).nullable().default(null),
  website: z.string().max(200).default(''), // honeypot
})

const esc = (x: string) =>
  x.replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!,
  )

export async function POST(req: Request) {
  const key = process.env.RESEND_API_KEY
  const from = process.env.IKIGAI_MAIL_FROM
  const to = process.env.IKIGAI_COACH_EMAIL || site.contact.email
  if (!key || !from) return Response.json({ ok: false, error: 'mail_disabled' }, { status: 503 })

  const raw = await req.text()
  if (raw.length > 30_000) return Response.json({ ok: false }, { status: 413 })
  let json: unknown
  try {
    json = JSON.parse(raw)
  } catch {
    return Response.json({ ok: false }, { status: 400 })
  }
  const parsed = RequestSchema.safeParse(json)
  if (!parsed.success) return Response.json({ ok: false, error: 'bad_request' }, { status: 400 })
  const d = parsed.data
  if (d.website) return Response.json({ ok: true }) // bot – udajemy sukces
  if (!d.email && !d.phone)
    return Response.json({ ok: false, error: 'no_contact' }, { status: 400 })

  const r = d.result
  const rows: [string, string][] = [
    ['Imię i nazwisko', d.name],
    ['E-mail', d.email],
    ['Telefon', d.phone],
    ['Firma', d.company],
    ['Wersja', d.version + (d.age ? `, wiek ${d.age}` : '')],
    ['Forma sesji', d.form],
    ['Kiedy pasuje', d.time],
    ['Wiadomość', d.message],
    ['Podpis zgody', `${d.consent.signature} (${d.consent.at})`],
    ['Rodzic/opiekun', d.consent.parent ?? ''],
  ]
  const html = `
<h2>Nowe zgłoszenie z Trenera IKIGAI</h2>
<table cellpadding="4">${rows
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td><b>${esc(k)}</b></td><td>${esc(v)}</td></tr>`)
    .join('')}</table>
<h3>${esc(r.haslo)}</h3>
<p><i>${esc(r.ikigai)}</i></p>
<p>Pasja: ${esc(r.pasja)} · Misja: ${esc(r.misja)} · Profesja: ${esc(r.profesja)} · Powołanie: ${esc(r.powolanie)}</p>
<p><b>Potencjał:</b> ${esc(r.potencjal.nazwa)} – ${esc(r.potencjal.opis)}</p>
<p><b>Największa luka:</b> ${esc(r.rozdzwiek)}</p>
<h3>Blokady</h3>
<ol>${r.blokady
    .map(
      (b) =>
        `<li><b>${esc(b.nazwa)}</b> – „${esc(b.przekonanie)}”<br>Sygnał: ${esc(b.sygnal)}<br>Praca: ${esc(b.praca)}</li>`,
    )
    .join('')}</ol>
${r.refleksja ? `<p><b>Pytanie końcowe:</b> ${esc(r.pytanie)}<br><b>Odpowiedź:</b> ${esc(r.refleksja)}</p>` : ''}
${d.answers ? `<h3>Pełne odpowiedzi</h3><pre style="white-space:pre-wrap">${esc(d.answers)}</pre>` : '<p><i>Klient nie udostępnił pełnych odpowiedzi.</i></p>'}
<p style="color:#888">Zgoda na przekazanie danych: tak. Dane przechowuj nie dłużej niż 3 miesiące; na prośbę klienta usuń wiadomość.</p>`

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: d.email || undefined,
      subject: `IKIGAI – zgłoszenie na sesję: ${d.name || d.email || d.phone}`,
      html,
    }),
  })
  if (!res.ok) {
    console.error('IKIGAI mail error', res.status)
    return Response.json({ ok: false, error: 'mail_failed' }, { status: 502 })
  }
  return Response.json({ ok: true })
}
