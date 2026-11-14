/** Komentarze, pytania pogłębiające i blokady używane bez AI (z oryginalnej wtyczki). */
import type { CircleId, Lang } from '@/lib/ikigai/types'

export const FALLBACK: Record<Lang, { comment: string[]; deep: string[] }> = {
  pl: {
    comment: [
      'Widzę już pierwsze iskry. Zauważ, które odpowiedzi przyszły najszybciej. Pierwsza myśl rzadko kłamie.',
      'To, co kochasz, zaczyna spotykać się z tym, co umiesz. W tym miejscu rodzi się PASJA.',
      'Twoje talenty mają już adresata. To, co umiesz, i to, czego potrzebuje świat, układa się w MISJĘ i POWOŁANIE.',
      'Mamy wszystkie cztery kręgi. Za chwilę złożę je w jedno zdanie: twoje ikigai.',
    ],
    deep: [
      'Która z twoich odpowiedzi o tym, co kochasz, zaskoczyła cię najbardziej?',
      'Jaki masz talent, o którym rzadko mówisz głośno?',
      'Gdy myślisz o problemie z twoich odpowiedzi, co czujesz i gdzie czujesz to w ciele?',
      'Co cię powstrzymuje przed tym, by brać pieniądze za to, co kochasz?',
    ],
  },
  en: {
    comment: [
      'I can see the first sparks. Notice which answers came fastest. Your first thought rarely lies.',
      'What you love is starting to meet what you are good at. That is where PASSION is born.',
      'Your talents now have someone to serve. What you can do and what the world needs form your MISSION and VOCATION.',
      'We have all four circles. In a moment I will bring them together into one sentence: your ikigai.',
    ],
    deep: [
      'Which of your answers about what you love surprised you most?',
      'What talent do you have that you rarely talk about?',
      'When you think about the problem in your answers, what do you feel, and where do you feel it in your body?',
      'What stops you from charging money for what you love?',
    ],
  },
}

export const FB_BLOCKS: Record<
  Lang,
  Record<CircleId, { nazwa: string; przekonanie: string; praca: string }>
> = {
  pl: {
    love: {
      nazwa: 'Odcięcie od własnych pragnień',
      przekonanie: 'Moje pragnienia są mniej ważne niż obowiązki.',
      praca: 'Odzyskanie kontaktu z tym, co naprawdę daje ci energię, i pozwolenie sobie na to.',
    },
    good: {
      nazwa: 'Umniejszanie swoich talentów',
      przekonanie: 'To, co przychodzi mi łatwo, nie ma wartości.',
      praca: 'Nazwanie i docenienie swoich mocnych stron bez fałszywej skromności.',
    },
    world: {
      nazwa: 'Brak poczucia wpływu',
      przekonanie: 'Jedna osoba niczego nie zmieni.',
      praca: 'Znalezienie małego, realnego obszaru, w którym twoje działanie ma znaczenie.',
    },
    paid: {
      nazwa: 'Blokada wokół pieniędzy',
      przekonanie: 'Na tym, co kocham, nie da się zarabiać.',
      praca: 'Przepracowanie przekonań o pieniądzach i swojej wartości rynkowej.',
    },
  },
  en: {
    love: {
      nazwa: 'Cut off from your own desires',
      przekonanie: 'What I want matters less than my duties.',
      praca: 'Reconnecting with what truly gives you energy and allowing yourself to have it.',
    },
    good: {
      nazwa: 'Downplaying your talents',
      przekonanie: 'What comes easily to me has no value.',
      praca: 'Naming and valuing your strengths without false modesty.',
    },
    world: {
      nazwa: 'No sense of impact',
      przekonanie: "One person can't change anything.",
      praca: 'Finding a small, real area where what you do makes a difference.',
    },
    paid: {
      nazwa: 'Money block',
      przekonanie: "You can't earn a living from what you love.",
      praca: 'Working through beliefs about money and your market value.',
    },
  },
}
