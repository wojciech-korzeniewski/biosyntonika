/** Pytania Trenera IKIGAI – 3 wersje × 2 języki × 4 kręgi × 5 pytań (z oryginalnej wtyczki). */
import type { CircleId, Lang, VersionId } from '@/lib/ikigai/types'

export const QUESTIONS: Record<VersionId, Record<Lang, Record<CircleId, string[]>>> = {
  indiv: {
    pl: {
      love: [
        'Przy czym tracisz poczucie czasu?',
        'O czym możesz rozmawiać godzinami?',
        'Co sprawiało ci największą radość w dzieciństwie?',
        'Co robisz tylko dla siebie, bez żadnej zapłaty?',
        'Jak wygląda twój idealny zwykły dzień?',
      ],
      good: [
        'W czym ludzie najczęściej proszą cię o pomoc?',
        'Co przychodzi ci łatwiej niż innym?',
        'Za co najczęściej słyszysz komplementy?',
        'Czego uczysz się najszybciej?',
        'Jaki rozwiązany przez ciebie problem budzi twoją dumę?',
      ],
      world: [
        'Co najbardziej porusza cię w dzisiejszym świecie?',
        'Komu najbardziej chcesz pomagać?',
        'Gdyby pieniądze nie miały znaczenia, co chcesz zmienić w świecie?',
        'Jaki problem ludzi wokół widzisz codziennie?',
        'Jaki ślad chcesz po sobie zostawić?',
      ],
      paid: [
        'Za co ktoś już ci zapłacił albo zapłaciłby chętnie?',
        'Jaką usługę lub produkt możesz zaoferować od jutra?',
        'W jakiej roli zawodowej widzą cię inni?',
        'Za jaką pracę bierzesz pieniądze bez wahania?',
        'Jaka wiedza z twojej głowy jest warta pieniędzy?',
      ],
    },
    en: {
      love: [
        'When do you lose track of time?',
        'What could you talk about for hours?',
        'What gave you the most joy as a child?',
        'What do you do just for yourself, without pay?',
        'What does your ideal ordinary day look like?',
      ],
      good: [
        'What do people most often ask you to help with?',
        'What comes easier to you than to others?',
        'What do you get complimented on most?',
        'What do you learn fastest?',
        'Which problem you solved makes you proud?',
      ],
      world: [
        "What moves you most in today's world?",
        'Who do you most want to help?',
        "If money didn't matter, what would you change in the world?",
        'What problem do you see around you every day?',
        'What mark do you want to leave behind?',
      ],
      paid: [
        'What has someone paid you for, or would gladly pay for?',
        'What service or product could you offer starting tomorrow?',
        'What professional role do others see you in?',
        'What work do you charge for without hesitation?',
        'What knowledge in your head is worth money?',
      ],
    },
  },
  youth: {
    pl: {
      love: [
        'Przy czym zapominasz o telefonie?',
        'Jaki temat możesz zgłębiać bez końca?',
        'Co najchętniej robisz w wolnym czasie?',
        'Jaka chwila z ostatnich tygodni dała ci najwięcej radości?',
        'Jakie filmiki lub treści oglądasz najczęściej?',
      ],
      good: [
        'W czym znajomi proszą cię o pomoc?',
        'Co wychodzi ci lepiej niż innym w klasie?',
        'Za co chwalą cię nauczyciele lub trenerzy?',
        'Czego uczysz się poza szkołą, z własnej woli?',
        'Z jakiego swojego osiągnięcia jesteś dumny lub dumna?',
      ],
      world: [
        'Co cię denerwuje w szkole albo w twojej okolicy?',
        'Komu chcesz pomagać w przyszłości?',
        'Gdyby pieniądze nie miały znaczenia, co chcesz zmienić w świecie?',
        'Jaki problem twojego pokolenia jest najważniejszy?',
        'Z czego chcesz, żeby ludzie cię pamiętali?',
      ],
      paid: [
        'Za co ktoś już dał ci pieniądze lub nagrodę?',
        'Który zawód z tych, które znasz, najbardziej cię ciekawi?',
        'Co możesz robić dla innych już teraz, np. za kieszonkowe?',
        'Kim widzą cię w przyszłości rodzice lub przyjaciele?',
        'Jaką umiejętność chcesz rozwinąć, żeby dobrze zarabiać?',
      ],
    },
    en: {
      love: [
        'What makes you forget about your phone?',
        'What topic could you explore forever?',
        'What do you most like doing in your free time?',
        'Which moment in the last few weeks gave you the most joy?',
        'What videos or content do you watch most?',
      ],
      good: [
        'What do friends ask you to help with?',
        'What do you do better than others in your class?',
        'What do teachers or coaches praise you for?',
        'What do you learn outside school, by choice?',
        'Which of your achievements are you proud of?',
      ],
      world: [
        'What annoys you at school or where you live?',
        'Who do you want to help in the future?',
        "If money didn't matter, what would you change in the world?",
        "What is your generation's most important problem?",
        'What do you want people to remember you for?',
      ],
      paid: [
        'What has someone already given you money or a prize for?',
        'Which job you know of interests you most?',
        'What could you do for others right now, e.g. for pocket money?',
        'Who do your parents or friends see you becoming?',
        'What skill do you want to develop to earn well?',
      ],
    },
  },
  biz: {
    pl: {
      love: [
        'Jakie zadanie w pracy robisz z największą przyjemnością?',
        'Przy jakim projekcie czas płynął najszybciej?',
        'Co daje ci energię w pracy zespołowej?',
        'O jakim temacie zawodowym możesz mówić godzinami?',
        'Jak wygląda twój idealny dzień w pracy?',
      ],
      good: [
        'Z czym współpracownicy przychodzą do ciebie po pomoc?',
        'Jaka twoja kompetencja jest najbardziej niedoceniona?',
        'Za co dostajesz najlepszy feedback?',
        'Jaki problem w firmie rozwiązujesz szybciej niż inni?',
        'Jaki twój wynik zawodowy budzi największą dumę?',
      ],
      world: [
        'Czego najbardziej potrzebują klienci waszej firmy?',
        'Co w twoim zespole działa najsłabiej i woła o zmianę?',
        'Gdyby budżet nie grał roli, co zmienisz w firmie?',
        'Jaki wpływ firma powinna mieć na ludzi i otoczenie?',
        'Jaki ślad chcesz zostawić w tej organizacji?',
      ],
      paid: [
        'Za jaki efekt twojej pracy firma płaci najchętniej?',
        'Jaką rolę chcesz pełnić za 2 lata?',
        'Którą twoją umiejętność rynek wyceniłby najwyżej?',
        'Jaki projekt możesz zaproponować przełożonemu od jutra?',
        'Za jaką ekspercką usługę możesz wystawić fakturę?',
      ],
    },
    en: {
      love: [
        'Which task at work do you enjoy most?',
        'On which project did time fly fastest?',
        'What gives you energy in teamwork?',
        'Which work topic could you talk about for hours?',
        'What does your ideal workday look like?',
      ],
      good: [
        'What do colleagues come to you for help with?',
        'Which of your skills is most underrated?',
        'What do you get the best feedback for?',
        'Which company problem do you solve faster than others?',
        'Which work result makes you proudest?',
      ],
      world: [
        "What do your company's customers need most?",
        'What works worst in your team and needs changing?',
        "If budget didn't matter, what would you change in the company?",
        'What impact should the company have on people and its surroundings?',
        'What mark do you want to leave in this organisation?',
      ],
      paid: [
        'Which outcome of your work does the company value most?',
        'What role do you want to have in 2 years?',
        'Which of your skills would the market value most?',
        'What project could you propose to your manager tomorrow?',
        'What expert service could you invoice for?',
      ],
    },
  },
}
