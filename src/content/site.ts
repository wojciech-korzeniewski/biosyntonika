/**
 * Wspólne treści strony: dane kontaktowe, menu, strona główna, O mnie, metoda, FAQ.
 * Teksty przeniesione z biosyntonika.com.pl. Docelowo z CMS-a.
 */
export const site = {
  url: 'https://biosyntonika.com.pl',
  name: 'BioSyntonika™',
  owner: 'Izabela Gotowska-Sieradzka',
  ownerTitles: ['Naturopata', 'Hipnoterapeuta Medyczny', 'Konsultant Totalnej Biologii'],
  seoTitle: 'BioSyntonika™ – naturopata i hipnoterapeuta medyczny, Bydgoszcz',
  description:
    'Izabela Gotowska-Sieradzka – naturopata, hipnoterapeuta medyczny i konsultant Totalnej Biologii. Autorska metoda BioSyntonika™: gabinet w Bydgoszczy i sesje online.',
  tagline: 'Naturopatia · Hipnoterapia medyczna · Totalna Biologia',
  logo: { url: '/images/logo.png', alt: 'BioSyntonika™', width: 581, height: 429 },

  contact: {
    email: 'nenufarbiuro@gmail.com',
    phones: ['+48 794 326 333', '+48 577 658 585'],
    bookingPhone: '+48 577 658 585',
    address: 'ul. M. Kolbego 42 (I piętro, gab. nr 2)\n85-432 Bydgoszcz',
    street: 'ul. M. Kolbego 42',
    postalCode: '85-432',
    city: 'Bydgoszcz',
    region: 'kujawsko-pomorskie',
    country: 'PL',
    areaServed: ['Bydgoszcz', 'Szklarska Poręba', 'Polska (online)'],
  },
  /** Profile w social media (Facebook, Instagram, Google Maps…) – uzupełnić. */
  sameAs: [] as string[],

  nav: [
    { label: 'O mnie', href: '/o-mnie' },
    { label: 'Metoda', href: '/metoda' },
    { label: 'IKIGAI', href: '/ikigai' },
    { label: 'Oferta', href: '/oferta' },
    { label: 'FAQ', href: '/faq' },
  ],
  navCta: { label: 'Umów wizytę', href: '/kontakt' },

  hero: {
    title: 'BioSyntonika™',
    lead:
      'Moim celem jest skuteczne wygaszenie odpowiedzi stresowej, uregulowanie przeciążonego układu nerwowego oraz odblokowanie naturalnych zdolności Twojego organizmu do samoregeneracji, dając Ci witalność, spokój i poczucie pełnego wpływu na własne życie.',
    buttons: [
      { label: 'Poznaj Metodę', href: '/metoda' },
      { label: 'Odkryj swoje IKIGAI', href: '/ikigai' },
    ],
  },

  about: {
    title: 'O mnie & O Gabinecie',
    seoTitle: 'Izabela Gotowska-Sieradzka – naturopata i hipnoterapeuta, Bydgoszcz',
    description:
      'Izabela Gotowska-Sieradzka: dyplomowany naturopata, hipnoterapeuta medyczny i konsultant Totalnej Biologii. Od ponad dekady prowadzi gabinet w Bydgoszczy.',
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
    seoTitle: 'Metoda BioSyntonika™ – hipnoterapia, oddech, naturopatia',
    description:
      'Autorska metoda BioSyntonika™: hipnoterapia medyczna i biologia stresu, świadomy oddech, podejście systemowe, detoksykacja informacyjna MARION i naturopatia.',
    lead:
      'Głównym rdzeniem mojej pracy gabinetowej jest autorska metoda BioSyntonika™. To ustrukturyzowany, głęboko przemyślany system terapeutyczny, który skupia się na dotarciu do pierwotnych przyczyn zaburzeń w ciele i emocjach.',
    pillars: [
      {
        slug: 'podswiadomosc',
        href: '/hipnoterapia-medyczna' as string | undefined,
        title: 'Praca z podświadomością i biologią stresu',
        text: 'Jako główny filar metody, wykorzystując bezpieczne narzędzia hipnoterapii medycznej oraz wiedzę o funkcjonowaniu układu nerwowego, wyciszamy stan chronicznego alarmu w ciele. Docieramy bezpośrednio do głęboko zakorzenionych traum, napięć i biologicznych konfliktów, wspierając mózg i ciało w przeprogramowaniu utrwalonych schematów.',
      },
      {
        slug: 'oddech',
        href: undefined as string | undefined,
        title: 'Regulacja poprzez Świadomy Oddech',
        text: 'Oddech stanowi bezpośredni pomost z autonomicznym układem nerwowym. Dedykowane techniki oddechowe pomagają rozładować napięcia skumulowane w powięzi, przywracając spokój umysłu i wewnętrzne uziemienie.',
      },
      {
        slug: 'systemowe',
        href: '/totalna-biologia',
        title: 'Podejście Systemowe i Podświadome',
        text: 'Uzupełnienie procesu o analizę uwarunkowań rodowych i relacyjnych pozwala zlokalizować ukryte blokady, które dotąd uniemożliwiały pełne uzdrowienie.',
      },
      {
        slug: 'marion',
        href: '/naturopatia',
        title: 'Detoksykacja Informacyjna (MARION)',
        text: 'Głęboka praca z układem nerwowym przebiega najskuteczniej wtedy, gdy ciało fizyczne ma odpowiednie warunki do regeneracji. Wspomagająco włączam celowane preparaty informacyjne, które pomagają oczyszczać organizm z obciążeń biologicznych i toksycznych, ułatwiając ciału powrót do naturalnej homeostazy.',
      },
      {
        slug: 'naturopatia',
        href: '/naturopatia',
        title: 'Naturopatyczna Stymulacja Ciała',
        text: 'Wykorzystuję zabiegi wspomagające, takie jak biorezonans, bańki czy masaże energetyczne, które usprawniają przepływy w ciele, działają detoksykująco na poziomie tkankowym i przyspieszają fizyczną regenerację.',
      },
    ],
  },

  offer: {
    title: 'Oferta',
    seoTitle: 'Oferta – sesje 1:1 i warsztaty BioSyntonika™',
    description:
      'Sesje indywidualne BioSyntonika™ (Bydgoszcz, Szklarska Poręba, online) oraz kameralne warsztaty z anhedonii. Sprawdź ceny i szczegóły.',
  },

  faq: {
    title: 'Najczęstsze pytania',
    seoTitle: 'FAQ – sesje, warsztaty, ceny i dojazd | BioSyntonika™',
    description:
      'Odpowiedzi na najczęstsze pytania: ile trwa sesja, czy można online, ile kosztuje, jak umówić wizytę i gdzie znajduje się gabinet BioSyntonika™ w Bydgoszczy.',
    items: [
      {
        q: 'Ile trwa sesja BioSyntonika™ 1:1?',
        a: 'Sesja indywidualna trwa około 120 minut.',
      },
      {
        q: 'Czy sesja może odbyć się online?',
        a: 'Tak. Sesje online odbywają się przez WhatsApp, Messenger lub FaceTime. Sesje stacjonarne odbywają się w Bydgoszczy lub w Szklarskiej Porębie.',
      },
      {
        q: 'Ile kosztuje sesja i warsztaty?',
        a: 'Sesja 1:1 kosztuje obecnie 500 zł (cena regularna 600 zł). Warsztaty kosztują obecnie 500 zł (cena regularna 550 zł).',
      },
      {
        q: 'Jak umówić wizytę?',
        a: 'Sesje online umawiamy w kalendarzu, a sesje stacjonarne telefonicznie: +48 577 658 585 lub +48 794 326 333.',
      },
      {
        q: 'Gdzie znajduje się gabinet?',
        a: 'Gabinet mieści się przy ul. M. Kolbego 42 (I piętro, gab. nr 2), 85-432 Bydgoszcz.',
      },
      {
        q: 'Ile osób bierze udział w warsztatach i ile one trwają?',
        a: 'Warsztaty prowadzone są w kameralnych grupach – maksymalnie 8 osób. Warsztaty stacjonarne trwają 1 dzień, a warsztaty w plenerze 2 dni.',
      },
      {
        q: 'Czym jest sesja z trenerem IKIGAI?',
        a: 'To ćwiczenie, które prowadzi przez cztery kręgi ikigai: to, co kochasz, w czym jesteś dobry, czego potrzebuje świat i za co mogą ci płacić – po pięć pytań w każdym. Dostępne są wersje dla dorosłych, młodzieży oraz firm i zespołów.',
      },
      {
        q: 'Na czym polega metoda BioSyntonika™?',
        a: 'To autorski system pracy łączący hipnoterapię medyczną i wiedzę o biologii stresu, techniki świadomego oddechu, podejście systemowe (rodowe), detoksykację informacyjną preparatami MARION oraz naturopatyczne zabiegi wspomagające, takie jak biorezonans, bańki czy masaże energetyczne.',
      },
    ],
  },

  disclaimer:
    'Sesje i warsztaty mają charakter wspierający i nie zastępują diagnozy ani leczenia prowadzonego przez lekarza.',

  booking: {
    title: 'Umów wizytę',
    seoTitle: 'Kontakt i rezerwacja – gabinet BioSyntonika™ Bydgoszcz',
    description:
      'Umów sesję w gabinecie BioSyntonika™: ul. M. Kolbego 42, Bydgoszcz. Rezerwacja telefoniczna +48 577 658 585, sesje online przez WhatsApp, Messenger lub FaceTime.',
    text: 'Rezerwacja telefoniczna bezpośrednio w gabinecie:',
    howTo: [
      'Sesje stacjonarne (Bydgoszcz, Szklarska Poręba) umawiamy telefonicznie.',
      'Sesje online umawiamy w kalendarzu – odbywają się przez WhatsApp, Messenger lub FaceTime.',
      'Na warsztaty zapisy telefoniczne – grupy do 8 osób.',
    ],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=ul.+Kolbego+42,+85-432+Bydgoszcz',
    // Osadzana mapa (iframe) – działa bez klucza API.
    mapsEmbedUrl: 'https://maps.google.com/maps?q=ul.+Maksymiliana+Kolbego+42,+85-432+Bydgoszcz&z=15&output=embed',
  },
}
