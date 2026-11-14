import { FALLBACK, FB_BLOCKS } from '@/content/ikigai/fallback-data'
import { I18N } from '@/content/ikigai/i18n'
import { site } from '@/content/site'
import { clean, short } from './text'
import { CIRCLES, type Answers, type CoachReply, type IkigaiResult, type Lang } from './types'

export const fallbackCoach = (lang: Lang, circle: number): CoachReply => ({
  komentarz: FALLBACK[lang].comment[circle],
  pytanie: FALLBACK[lang].deep[circle],
})

/** Finał zbudowany automatycznie z odpowiedzi (bez AI) – logika z oryginalnej wtyczki. */
export function fallbackResult(answers: Answers, lang: Lang): IkigaiResult {
  const t = I18N[lang]
  const f = (k: keyof Answers, i: number) =>
    clean(answers[k][i]) || clean(answers[k].find((x) => clean(x))) || '—'
  const score = CIRCLES.map((k) => ({
    k,
    blanks: answers[k].filter((x) => !clean(x)).length,
    len: answers[k].reduce((n, x) => n + clean(x).length, 0),
  })).sort((x, y) => y.blanks - x.blanks || x.len - y.len)
  const en = lang === 'en'
  const label = (k: keyof Answers) => t[`c_${k}` as const]
  const blokady = score.slice(0, 3).map((s) => {
    const b = FB_BLOCKS[lang][s.k]
    const sygnal = s.blanks
      ? en
        ? `${s.blanks} of 5 questions in “${label(s.k)}” were left blank.`
        : `${s.blanks} z 5 pytań w kręgu „${label(s.k)}” zostało bez odpowiedzi.`
      : en
        ? `Your answers in “${label(s.k)}” were the shortest.`
        : `Odpowiedzi w kręgu „${label(s.k)}” były najkrótsze.`
    return { nazwa: b.nazwa, przekonanie: b.przekonanie, sygnal, praca: b.praca }
  })
  const common = {
    pasja: short(f('love', 1), 24),
    misja: short(f('world', 4), 24),
    profesja: short(f('paid', 2), 24),
    powolanie: short(f('world', 1), 24),
    blokady,
    mocne_strony: [f('good', 1), f('good', 2), f('good', 3)].map((x) => short(x, 40)),
    offline: true,
  }
  return en
    ? {
        ...common,
        haslo: short(`${f('good', 1)} for ${f('world', 1)}`, 40),
        ikigai: `You connect what you love (${short(f('love', 0), 40)}) with what you are strong at (${short(f('good', 1), 40)}) to answer a need: ${short(f('world', 0), 50)}.`,
        analiza: {
          kochasz: `Energy shows up around: ${short(f('love', 0), 60)}.`,
          dobry: `People come to you with: ${short(f('good', 0), 60)}.`,
          swiat: `You are moved by: ${short(f('world', 0), 60)}.`,
          placa: `Real market value: ${short(f('paid', 1), 60)}.`,
        },
        rozdzwiek:
          'Check whether what you are paid for uses what you love. That is usually where the biggest gap is.',
        potencjal: {
          nazwa: short(`${f('good', 1)} in service of ${f('world', 1)}`, 60),
          opis: `Your greatest potential lies where your talent (${short(f('good', 1), 40)}) meets what moves you (${short(f('world', 0), 40)}). Developing it consciously can become the thread that gives your life direction.`,
        },
        kroki: [
          'Day 1–2: write down 3 moments from the last month when you lost track of time.',
          `Day 3–5: offer one person a free sample of: ${short(f('paid', 1), 50)}.`,
          'Day 6–7: ask them what they would pay for it and why.',
        ],
        pytanie: 'What is the smallest step towards this sentence you can take tomorrow morning?',
      }
    : {
        ...common,
        haslo: short(`${f('good', 1)} dla ${f('world', 1)}`, 40),
        ikigai: `Łączysz to, co kochasz (${short(f('love', 0), 40)}), z tym, w czym jesteś mocny (${short(f('good', 1), 40)}), aby odpowiadać na potrzebę: ${short(f('world', 0), 50)}.`,
        analiza: {
          kochasz: `Energia pojawia się przy: ${short(f('love', 0), 60)}.`,
          dobry: `Inni przychodzą do ciebie z: ${short(f('good', 0), 60)}.`,
          swiat: `Porusza cię: ${short(f('world', 0), 60)}.`,
          placa: `Realna wartość rynkowa: ${short(f('paid', 1), 60)}.`,
        },
        rozdzwiek:
          'Sprawdź, czy to, za co ci płacą, korzysta z tego, co kochasz. Tam zwykle jest największa luka.',
        potencjal: {
          nazwa: short(`${f('good', 1)} w służbie: ${f('world', 1)}`, 60),
          opis: `Twój największy potencjał leży tam, gdzie twój talent (${short(f('good', 1), 40)}) spotyka to, co cię porusza (${short(f('world', 0), 40)}). Świadome rozwijanie go może stać się nicią, która nadaje twojemu życiu kierunek.`,
        },
        kroki: [
          'Dzień 1–2: zapisz 3 sytuacje z ostatniego miesiąca, w których traciłeś poczucie czasu.',
          `Dzień 3–5: zaoferuj jednej osobie bezpłatną próbkę: ${short(f('paid', 1), 50)}.`,
          'Dzień 6–7: zapytaj tę osobę, ile byłaby gotowa za to zapłacić i dlaczego.',
        ],
        pytanie: 'Jaki najmniejszy krok w stronę tego zdania możesz zrobić jutro przed południem?',
      }
}

/** Dane trenera i administratora danych (regulamin, RODO, kontakt). */
export const COACH = {
  brand: 'BioSyntonika™',
  admin: site.owner,
  email: site.contact.email,
  phone: site.contact.bookingPhone,
  www: site.url.replace('https://', ''),
}

/** Regulamin i klauzula RODO – na podstawie oryginału, dostosowane do wysyłki zgłoszeń e-mailem. */
export function legalTexts(lang: Lang) {
  const adm = COACH.admin
  const em = COACH.email
  if (lang === 'en')
    return {
      reg: [
        `The IKIGAI app (the App) is a personal development tool of the BioSyntonika™ brand, run by ${adm}.`,
        'The App supports self-discovery using the ikigai method. It is not therapy or medical, psychological or legal advice and does not replace them.',
        "Answers are analysed automatically using artificial intelligence (Anthropic's Claude model). Results are indicative only.",
        'Using the App is voluntary. You can stop the session at any time.',
        'People under 16 may use the App only with the consent of a parent or legal guardian.',
        "Don't enter other people's data or anything you don't want to share.",
        'A session request is not a contract. You agree session terms (date, price) directly with the coach.',
        `Questions about the App: ${em}.`,
      ],
      rodo: [
        `Controller: ${adm}, contact: ${em}.`,
        'Purpose: running the IKIGAI session, preparing its analysis and, if you send a request, contacting you to book a session.',
        'Legal basis: your consent (Art. 6(1)(a) GDPR) and, for any information about health or beliefs you choose to give, your explicit consent (Art. 9(2)(a) GDPR).',
        "Recipients: this website's hosting provider (Vercel), the email delivery provider (Resend) and, for the AI analysis, Anthropic PBC (USA), which receives only your answers and first name, never your contact details. Transfers outside the EEA rely on the mechanisms set out in Chapter V GDPR.",
        'Retention: until you withdraw consent, and no longer than 3 months after you send a request.',
        'Your rights: access, rectification, erasure, restriction, portability, and withdrawing consent at any time without affecting earlier processing. You may complain to your data protection authority (in Poland: the President of UODO).',
        "Giving data is voluntary, but the session can't take place without consent. No automated decisions with legal effects are made (Art. 22 GDPR).",
        `Session results are saved only in your browser. Data from a session request reaches the coach by email only after you send it. To withdraw consent, write to ${em}.`,
      ],
    }
  return {
    reg: [
      `Aplikacja IKIGAI (dalej: Aplikacja) jest narzędziem rozwojowym marki BioSyntonika™, prowadzonej przez ${adm}.`,
      'Aplikacja służy do samopoznania metodą ikigai. Nie jest terapią ani poradą medyczną, psychologiczną czy prawną i ich nie zastępuje.',
      'Analiza odpowiedzi powstaje automatycznie z użyciem sztucznej inteligencji (model Claude firmy Anthropic). Wyniki mają charakter orientacyjny.',
      'Korzystanie z Aplikacji jest dobrowolne. Sesję możesz przerwać w każdej chwili.',
      'Osoby poniżej 16 lat korzystają z Aplikacji za zgodą rodzica lub opiekuna prawnego.',
      'Nie wpisuj danych innych osób ani informacji, których nie chcesz udostępniać.',
      'Zgłoszenie na sesję nie jest umową. Warunki sesji (termin, cenę) ustalasz bezpośrednio z trenerem.',
      `Sprawy dotyczące Aplikacji: ${em}.`,
    ],
    rodo: [
      `Administrator danych: ${adm}, kontakt: ${em}.`,
      'Cel: przeprowadzenie sesji IKIGAI, przygotowanie jej analizy, a jeśli wyślesz zgłoszenie, kontakt i umówienie sesji.',
      'Podstawa prawna: twoja zgoda (art. 6 ust. 1 lit. a RODO), a dla informacji o zdrowiu lub przekonaniach, które sam(a) podasz, wyraźna zgoda (art. 9 ust. 2 lit. a RODO).',
      'Odbiorcy: dostawca hostingu strony (Vercel), dostawca wysyłki e-maili (Resend) oraz, w zakresie analizy AI, Anthropic PBC (USA), której przekazywane są wyłącznie odpowiedzi i imię, bez danych kontaktowych. Przekazanie danych poza EOG odbywa się na podstawie mechanizmów z rozdziału V RODO.',
      'Okres przechowywania: do wycofania zgody, nie dłużej niż 3 miesiące od wysłania zgłoszenia.',
      'Twoje prawa: dostęp do danych, sprostowanie, usunięcie, ograniczenie przetwarzania, przenoszenie, wycofanie zgody w dowolnym momencie bez wpływu na wcześniejsze przetwarzanie oraz skarga do Prezesa UODO.',
      'Podanie danych jest dobrowolne, ale bez zgody sesja nie może się odbyć. Nie podejmujemy wobec ciebie zautomatyzowanych decyzji wywołujących skutki prawne (art. 22 RODO).',
      `Wyniki sesji zapisują się tylko w twojej przeglądarce. Dane ze zgłoszenia na sesję trafiają do trenera e-mailem dopiero po jego wysłaniu. Aby wycofać zgodę, napisz na ${em}.`,
    ],
  }
}
