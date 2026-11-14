/**
 * Treści strony głównej i dane kontaktowe (przeniesione z biosyntonika.com.pl).
 * Docelowo z CMS-a.
 */
export const site = {
  name: 'BioSyntonika™',
  owner: 'Izabela Gotowska-Sieradzka',
  description:
    'Naturopatia, hipnoterapia medyczna i autorska metoda BioSyntonika™. Gabinet w Bydgoszczy oraz sesje online.',
  logo: { url: '/images/logo.png', alt: 'BioSyntonika™', width: 581, height: 429 },

  contact: {
    email: 'nenufarbiuro@gmail.com',
    phones: ['+48 794 326 333', '+48 577 658 585'],
    bookingPhone: '+48 577 658 585',
    address: 'ul. M. Kolbego 42 (I piętro, gab. nr 2)\n85-432 Bydgoszcz',
  },

  nav: [
    { label: 'O mnie', href: '/#o-mnie' },
    { label: 'Metoda', href: '/#metoda' },
    { label: 'IKIGAI', href: '/#ikigai' },
    { label: 'Oferta', href: '/#oferta' },
  ],
  navCta: { label: 'Umów wizytę', href: '/#wizyta' },

  hero: {
    title: 'BioSyntonika™',
    lead:
      'Moim celem jest skuteczne wygaszenie odpowiedzi stresowej, uregulowanie przeciążonego układu nerwowego oraz odblokowanie naturalnych zdolności Twojego organizmu do samoregeneracji, dając Ci witalność, spokój i poczucie pełnego wpływu na własne życie.',
    buttons: [
      { label: 'Poznaj Metodę', href: '#metoda' },
      { label: 'Odkryj swoje IKIGAI', href: '#ikigai' },
    ],
  },

  about: {
    title: 'O mnie & O Gabinecie',
    paragraphs: [
      'Nazywam się Izabela Gotowska-Sieradzka. Od ponad dekady zawodowo wspieram moich klientów w procesie przywracania zdrowia, odzyskiwania równowagi i trwałej transformacji jakości życia. W swojej codziennej pracy łączę rolę dyplomowanego Naturopaty, Hipnoterapeuty Medycznego, Konsultanta Totalnej Biologii oraz specjalisty integracyjnych metod terapeutycznych.',
      'Moja ścieżka zawodowa to lata ciągłego rozwoju i rzetelnego zgłębiania wiedzy. Do miejsca, w którym jestem dzisiaj, prowadziło mnie wiele dróg terapeutycznych, od pracy z biologią i fizycznym ciałem, przez systemowe zależności relacyjne, aż po metody medycyny informacyjnej.',
      'Wszechstronne wykształcenie pozwala mi patrzeć na człowieka w sposób kompleksowy, bez schematów i z pełnym szacunkiem do jego indywidualnej historii.',
    ],
    workspace: {
      title: 'Przestrzeń Pracy',
      text: 'W moim gabinecie tworzę bezpieczną, poufną przestrzeń do rzetelnej pracy u źródeł problemu.',
    },
  },

  method: {
    title: 'Autorska metoda BioSyntonika™',
    lead:
      'Głównym rdzeniem mojej pracy gabinetowej jest autorska metoda BioSyntonika™. To ustrukturyzowany, głęboko przemyślany system terapeutyczny, który skupia się na dotarciu do pierwotnych przyczyn zaburzeń w ciele i emocjach.',
    pillars: [
      {
        title: 'Praca z podświadomością i biologią stresu',
        text: 'Jako główny filar metody, wykorzystując bezpieczne narzędzia hipnoterapii medycznej oraz wiedzę o funkcjonowaniu układu nerwowego, wyciszamy stan chronicznego alarmu w ciele. Docieramy bezpośrednio do głęboko zakorzenionych traum, napięć i biologicznych konfliktów, wspierając mózg i ciało w przeprogramowaniu utrwalonych schematów.',
      },
      {
        title: 'Regulacja poprzez Świadomy Oddech',
        text: 'Oddech stanowi bezpośredni pomost z autonomicznym układem nerwowym. Dedykowane techniki oddechowe pomagają rozładować napięcia skumulowane w powięzi, przywracając spokój umysłu i wewnętrzne uziemienie.',
      },
      {
        title: 'Podejście Systemowe i Podświadome',
        text: 'Uzupełnienie procesu o analizę uwarunkowań rodowych i relacyjnych pozwala zlokalizować ukryte blokady, które dotąd uniemożliwiały pełne uzdrowienie.',
      },
      {
        title: 'Detoksykacja Informacyjna (MARION)',
        text: 'Głęboka praca z układem nerwowym przebiega najskuteczniej wtedy, gdy ciało fizyczne ma odpowiednie warunki do regeneracji. Wspomagająco włączam celowane preparaty informacyjne, które pomagają oczyszczać organizm z obciążeń biologicznych i toksycznych, ułatwiając ciału powrót do naturalnej homeostazy.',
      },
      {
        title: 'Naturopatyczna Stymulacja Ciała',
        text: 'Wykorzystuję zabiegi wspomagające, takie jak biorezonans, bańki czy masaże energetyczne, które usprawniają przepływy w ciele, działają detoksykująco na poziomie tkankowym i przyspieszają fizyczną regenerację.',
      },
    ],
  },

  /** Na starej stronie IKIGAI było interaktywną aplikacją (wtyczka) – bez treści tekstowej do przeniesienia. */
  ikigai: {
    title: 'IKIGAI',
    text: '',
  },

  offer: { title: 'Oferta' },

  booking: {
    title: 'Umów wizytę',
    text: 'Rezerwacja telefoniczna bezpośrednio w gabinecie:',
  },
}
