/**
 * IKIGAI – treści strony i pytania ćwiczenia „Trener IKIGAI”.
 * Teksty wprowadzające z dotychczasowej strony; pytania do weryfikacji przez Izabelę.
 */

export type CircleId = 'love' | 'good' | 'world' | 'paid'
export type VersionId = 'adults' | 'youth' | 'teams'

export const circles: Record<CircleId, { label: string; short: string; color: string; deepen: string }> = {
  love: {
    label: 'Co kochasz',
    short: 'Kochasz',
    color: '#d97a9a',
    deepen: 'Spójrz na swoje odpowiedzi. Co się w nich powtarza?',
  },
  good: {
    label: 'W czym jesteś dobry',
    short: 'Jesteś dobry',
    color: '#8f9de0',
    deepen: 'Która z tych umiejętności daje ci najwięcej satysfakcji?',
  },
  world: {
    label: 'Czego potrzebuje świat',
    short: 'Świat potrzebuje',
    color: '#86c296',
    deepen: 'Która z tych potrzeb porusza cię najbardziej – i dlaczego?',
  },
  paid: {
    label: 'Za co mogą ci płacić',
    short: 'Płacą ci',
    color: '#e0b552',
    deepen: 'Co z tego możesz sprawdzić w praktyce w najbliższym miesiącu?',
  },
}

export const circleOrder: CircleId[] = ['love', 'good', 'world', 'paid']

/** Części wspólne dwóch kręgów (diagram + podsumowanie). */
export const intersections = [
  { id: 'pasja', label: 'Pasja', of: ['love', 'good'] as CircleId[], prompt: 'Co łączy to, co kochasz, z tym, w czym jesteś dobry?' },
  { id: 'misja', label: 'Misja', of: ['love', 'world'] as CircleId[], prompt: 'Jak to, co kochasz, może odpowiadać na potrzeby świata?' },
  { id: 'powolanie', label: 'Powołanie', of: ['world', 'paid'] as CircleId[], prompt: 'Za którą potrzebę świata ludzie są gotowi zapłacić?' },
  { id: 'profesja', label: 'Profesja', of: ['good', 'paid'] as CircleId[], prompt: 'Które Twoje mocne strony są cenione na rynku?' },
]

export const ikigaiPage = {
  seoTitle: 'Ikigai – odkryj swoje ikigai z trenerem | BioSyntonika™',
  description:
    'Czym jest ikigai i jak je odkryć? Interaktywne ćwiczenie z trenerem IKIGAI: 4 kręgi, 20 pytań, wersje dla dorosłych, młodzieży oraz firm i zespołów.',
  eyebrow: 'Sesja z trenerem IKIGAI',
  title: 'Odkryj swoje ikigai.',
  titleLine2: 'Odpowiadaj pierwszą myślą.',
  origin: {
    heading: 'Skąd się wzięło ikigai?',
    kanji: '生き甲斐',
    text: 'Ikigai to japońskie słowo złożone z „iki” (życie) i „kai” (wartość, sens). Oznacza to, dla czego warto wstawać rano. Najmocniej kojarzy się z Okinawą, wyspą, której mieszkańcy należą do najdłużej żyjących ludzi na świecie. Badacze tzw. niebieskich stref wskazali poczucie celu jako jeden z ich sekretów.',
  },
  purpose: {
    heading: 'Do czego służy?',
    text: 'Pomaga połączyć cztery obszary: to, co kochasz, w czym jesteś dobry, czego potrzebuje świat i za co mogą ci płacić. W ich środku leży twoje ikigai. Popularny diagram czterech kół to zachodnia wersja tej idei, a sesja prowadzi cię przez nie krok po kroku.',
  },
  process:
    'Przejdziemy przez cztery kręgi, po pięć pytań w każdym. Na końcu zobaczysz swoje odpowiedzi ułożone na diagramie ikigai razem z pytaniami do refleksji – gotowe do omówienia na sesji z trenerem.',
  rules: [
    { tag: '30s', text: 'Na każde pytanie masz 30 sekund. Po tym czasie pytanie przechodzi dalej samo.' },
    { tag: '1×', text: 'Liczy się pierwsza myśl. Nie poprawiaj, nie szukaj ładnych słów. Wystarczy kilka wyrazów.' },
    { tag: '↵', text: 'Enter zatwierdza odpowiedź. Puste pole też coś mówi, więc się nie przejmuj.' },
  ],
  sections: [
    {
      heading: 'Cztery kręgi ikigai',
      paragraphs: [
        'Diagram ikigai składa się z czterech kół: to, co kochasz; to, w czym jesteś dobry; to, czego potrzebuje świat; i to, za co mogą ci płacić. Miejsca, w których koła się przenikają, mają swoje nazwy: pasja (kochasz + jesteś dobry), misja (kochasz + świat potrzebuje), powołanie (świat potrzebuje + płacą ci) i profesja (jesteś dobry + płacą ci).',
        'Ikigai leży w samym środku – tam, gdzie spotykają się wszystkie cztery obszary.',
      ],
    },
  ],
}

export const versions: Record<
  VersionId,
  { label: string; hint: string; note?: string; questions: Record<CircleId, string[]> }
> = {
  adults: {
    label: 'Dorośli',
    hint: 'Ścieżka życiowa i zawodowa',
    questions: {
      love: [
        'Przy jakiej czynności tracisz poczucie czasu?',
        'Co robisz w wolny dzień, gdy nic nie musisz?',
        'O czym możesz rozmawiać godzinami?',
        'Co sprawiało ci radość w dzieciństwie?',
        'Kiedy ostatnio poczułeś/aś prawdziwą radość? Co wtedy robiłeś/aś?',
      ],
      good: [
        'W czym inni najczęściej proszą cię o pomoc?',
        'Co przychodzi ci łatwiej niż innym?',
        'Za co najczęściej cię chwalą?',
        'Jakiej umiejętności nauczyłeś/aś się z największą satysfakcją?',
        'Jaki problem potrafisz rozwiązać, gdy inni się poddają?',
      ],
      world: [
        'Co w otaczającym cię świecie najbardziej chcesz zmienić?',
        'Komu najbardziej chcesz pomagać?',
        'Jaki problem ludzi wokół ciebie porusza cię najmocniej?',
        'Co chcesz, żeby po tobie zostało?',
        'W jaką sprawę zaangażował(a)byś się nawet bez wynagrodzenia?',
      ],
      paid: [
        'Za co ktoś już kiedyś ci zapłacił albo chciał zapłacić?',
        'Jaką usługę lub produkt możesz zaoferować od jutra?',
        'Które twoje umiejętności są poszukiwane?',
        'Za co ludzie płacą, a ty robisz to dobrze?',
        'Z czego chcesz się utrzymywać za 5 lat?',
      ],
    },
  },
  youth: {
    label: 'Młodzież',
    hint: '13–19 lat · szkoła, pasje, wybór zawodu',
    note: 'Dla dzieci i młodzieży zalecane: wykonaj test z osobą dorosłą.',
    questions: {
      love: [
        'Co robisz, kiedy nikt ci nic nie każe?',
        'Jaki przedmiot lub zajęcie w szkole lubisz najbardziej?',
        'Jakie filmy, gry albo książki wciągają cię najbardziej?',
        'Z czego jesteś dumny/dumna?',
        'O czym lubisz opowiadać znajomym?',
      ],
      good: [
        'W czym pomagasz kolegom i koleżankom?',
        'Co wychodzi ci bez wielkiego wysiłku?',
        'Za co chwalą cię nauczyciele, trenerzy albo rodzina?',
        'Czego nauczyłeś/aś się sam(a)?',
        'W jakiej sytuacji czujesz, że dajesz radę?',
      ],
      world: [
        'Co cię denerwuje w świecie i chcesz to naprawić?',
        'Komu chcesz pomagać, gdy dorośniesz?',
        'Jaki problem w twojej szkole lub okolicy warto rozwiązać?',
        'Kogo podziwiasz za to, co robi dla innych?',
        'Co dobrego możesz zrobić już teraz?',
      ],
      paid: [
        'Jakie zawody wydają ci się ciekawe?',
        'Za co ktoś mógłby ci zapłacić już teraz (np. korepetycje, pomoc)?',
        'Czego chcesz się nauczyć, żeby mieć dobrą pracę?',
        'Jak wyobrażasz sobie swój dzień w pracy za 10 lat?',
        'Kto z dorosłych ma pracę, którą chcesz mieć?',
      ],
    },
  },
  teams: {
    label: 'Firmy i zespoły',
    hint: 'Rola w pracy, kompetencje, rozwój',
    questions: {
      love: [
        'Które zadania w pracy dają ci najwięcej energii?',
        'Kiedy ostatnio czułeś/aś pełne zaangażowanie w projekt?',
        'Jaką część swojej roli robił(a)byś nawet bez polecenia?',
        'Co cię najbardziej cieszy we współpracy z zespołem?',
        'Jaki sukces w pracy wspominasz najmilej?',
      ],
      good: [
        'Z czym współpracownicy przychodzą do ciebie po pomoc?',
        'Jakie kompetencje wyróżniają cię w zespole?',
        'Jakie zadanie wykonujesz szybciej i lepiej niż inni?',
        'Za co dostajesz najwięcej pozytywnej informacji zwrotnej?',
        'Jaką kompetencję rozwinąłeś/aś w ostatnim roku?',
      ],
      world: [
        'Czego najbardziej potrzebują wasi klienci?',
        'Jaki problem w organizacji chcesz rozwiązać?',
        'Czego brakuje twojemu zespołowi?',
        'Jaką wartość wnosisz dla ludzi poza firmą?',
        'Jaka zmiana w twojej branży jest dziś najważniejsza?',
      ],
      paid: [
        'Za jakie efekty twojej pracy firma płaci najchętniej?',
        'Które twoje kompetencje są najbardziej cenione na rynku?',
        'Jaką rolę chcesz pełnić za 3 lata?',
        'Jaki projekt możesz poprowadzić, by zwiększyć wartość dla firmy?',
        'Czego musisz się nauczyć, by awansować lub zmienić rolę?',
      ],
    },
  },
}
