/**
 * Podstrony tematyczne (SEO): każda odpowiada na jedno zapytanie, np. „hipnoterapia Bydgoszcz”.
 * Teksty złożone z istniejących materiałów BioSyntonika™ – do weryfikacji i rozbudowy przez Izabelę.
 */

export type TopicSection = {
  heading: string
  paragraphs?: string[]
  list?: string[]
}

export type Topic = {
  slug: string
  /** Krótka nazwa (menu, okruszki). */
  name: string
  eyebrow: string
  title: string
  seoTitle: string
  description: string
  lead: string
  sections: TopicSection[]
  /** Slug produktu, do którego prowadzi CTA. */
  productSlug: string
}

const hipnoterapia: Topic = {
  slug: 'hipnoterapia-medyczna',
  name: 'Hipnoterapia medyczna',
  eyebrow: 'Metoda · Filar 1',
  title: 'Hipnoterapia medyczna w Bydgoszczy i online',
  seoTitle: 'Hipnoterapia medyczna Bydgoszcz i online | BioSyntonika™',
  description:
    'Hipnoterapia medyczna w Bydgoszczy, Szklarskiej Porębie i online. Praca z podświadomością i biologią stresu w stanie głębokiej relaksacji. Sesje ok. 120 minut.',
  lead: 'Praca z podświadomością i biologią stresu to główny filar metody BioSyntonika™. Wykorzystując bezpieczne narzędzia hipnoterapii medycznej oraz wiedzę o funkcjonowaniu układu nerwowego, wyciszamy stan chronicznego alarmu w ciele.',
  sections: [
    {
      heading: 'Jak wygląda praca z hipnoterapią?',
      paragraphs: [
        'Jako certyfikowany hipnoterapeuta medyczny wprowadzam Cię w bezpieczny, głęboki stan relaksacji (fale Alfa i Theta), w którym umysł staje się bardziej otwarty i plastyczny. To ułatwia łagodny kontakt z podświadomością i uwalnianie utrwalonych w ciele napięć.',
        'Docieramy do głęboko zakorzenionych traum, napięć i biologicznych konfliktów, wspierając mózg i ciało w przeprogramowaniu utrwalonych schematów. Pracujemy też z najwcześniejszymi wzorcami – pierwotnymi zapisami odrzucenia, lęku czy braku poczucia bezpieczeństwa – by budować większe zaufanie i wewnętrzne oparcie.',
      ],
    },
    {
      heading: 'Dla kogo jest ta praca?',
      paragraphs: [
        'Jeśli czujesz przewlekłe zmęczenie, somatyczne dolegliwości bez jasnej przyczyny, długotrwały stres czy lęk — albo po prostu masz wrażenie, że utknęłaś/eś w miejscu i szukasz źródła tego stanu głębiej niż na powierzchni.',
      ],
    },
    {
      heading: 'Czego możesz się spodziewać po sesji',
      list: [
        'Poczucia ulgi i uwolnienia napięć, które długo się kumulowały.',
        'Głębszego zrozumienia emocjonalnego i rodzinnego kontekstu sygnałów płynących z ciała.',
        'Większej spójności wewnętrznej i poczucia własnej mocy.',
        'Wyciszenia, lekkości i jasności umysłu.',
      ],
    },
    {
      heading: 'Gdzie i jak odbywają się sesje',
      list: [
        'Czas trwania: około 120 minut.',
        'Stacjonarnie w Bydgoszczy (ul. M. Kolbego 42) lub w Szklarskiej Porębie – sesja stacjonarna odbywa się pod urządzeniem RSG, które pozwala na bieżąco monitorować stan emocjonalny.',
        'Online przez WhatsApp, Messenger lub FaceTime.',
      ],
    },
  ],
  productSlug: 'sesja-1-1',
}

const totalnaBiologia: Topic = {
  slug: 'totalna-biologia',
  name: 'Totalna Biologia i Biologia Rodu',
  eyebrow: 'Metoda · Podejście systemowe',
  title: 'Totalna Biologia, Recall Healing i Biologia Rodu',
  seoTitle: 'Totalna Biologia i Recall Healing – Bydgoszcz, online | BioSyntonika™',
  description:
    'Konsultacje Totalnej Biologii, Recall Healing i praca z Biologią Rodu w Bydgoszczy i online. Szukamy emocjonalnego podłoża sygnałów płynących z ciała.',
  lead: 'Uzupełnienie procesu o analizę uwarunkowań rodowych i relacyjnych pozwala zlokalizować ukryte blokady, które dotąd uniemożliwiały pełne uzdrowienie.',
  sections: [
    {
      heading: 'Totalna Biologia – sens i język symptomu',
      paragraphs: [
        'Każdy brak energii, ból czy spadek czucia to nie awaria, lecz biologia próbująca rozwiązać konflikt, którego umysł nie zdążył przetworzyć. Zrozumienie sensu biologicznego i emocjonalnego programu pozwala zatrzymać bezcelową walkę organizmu i skierować energię na powrót do zdrowia.',
        'Podczas sesji, inspirowanej Totalną Biologią i Recall Healing, szukamy razem, jaki konflikt emocjonalny mógł stać za sygnałem, który wysyła ciało.',
      ],
    },
    {
      heading: 'Biologia Rodu i wzorce pokoleniowe',
      paragraphs: [
        'Przez mechanizmy epigenetyczne dziedziczymy nie tylko cechy fizyczne, ale też gotowość na zagrożenie i nierozwiązane dramaty przodków. Zobaczenie tych lojalności i uwolnienie ciężarów rodu pozwala odzyskać własną przestrzeń życia, przerywając dziedziczone schematy cierpienia.',
        'Wchodzimy w kontakt z polem energetycznym Twojego rodu, by rozpoznać nieświadome lojalności, obciążenia i zaplątania przekazywane z pokolenia na pokolenie. Uwalniamy to, co nie należy do Ciebie, i przywracamy naturalny, swobodny przepływ siły w Twoim systemie rodzinnym.',
      ],
    },
    {
      heading: 'Gdzie pracujemy z tym podejściem',
      list: [
        'Na sesjach indywidualnych BioSyntonika™ 1:1 – stacjonarnie w Bydgoszczy i Szklarskiej Porębie lub online.',
        'Na warsztatach „Praca z Anhedonią” – Totalna Biologia i Biologia Rodu to dwa z trzech filarów warsztatu.',
      ],
    },
  ],
  productSlug: 'sesja-1-1',
}

const naturopatia: Topic = {
  slug: 'naturopatia',
  name: 'Naturopatia',
  eyebrow: 'Metoda · Wsparcie ciała',
  title: 'Naturopata w Bydgoszczy – biorezonans, bańki, MARION',
  seoTitle: 'Naturopata Bydgoszcz – biorezonans, bańki, MARION | BioSyntonika™',
  description:
    'Dyplomowany naturopata w Bydgoszczy: biorezonans, bańki, masaże energetyczne i preparaty informacyjne MARION dr Jonas jako wsparcie pracy z układem nerwowym.',
  lead: 'Głęboka praca z układem nerwowym przebiega najskuteczniej wtedy, gdy ciało fizyczne ma odpowiednie warunki do regeneracji. Dlatego metodę BioSyntonika™ uzupełniają naturopatyczne zabiegi i detoksykacja informacyjna.',
  sections: [
    {
      heading: 'Naturopatyczna stymulacja ciała',
      paragraphs: [
        'Wykorzystuję zabiegi wspomagające, takie jak biorezonans, bańki czy masaże energetyczne, które usprawniają przepływy w ciele, działają detoksykująco na poziomie tkankowym i przyspieszają fizyczną regenerację.',
      ],
    },
    {
      heading: 'Detoksykacja informacyjna (MARION)',
      paragraphs: [
        'Wspomagająco włączam celowane preparaty informacyjne, które pomagają oczyszczać organizm z obciążeń biologicznych i toksycznych, ułatwiając ciału powrót do naturalnej homeostazy.',
        'Dla wzmocnienia procesów dobieram preparaty firmy „MARION” dr Jonas detoksykujące układ nerwowy i wszystkie obiegi czynnościowe.',
      ],
    },
    {
      heading: 'Regulacja poprzez świadomy oddech',
      paragraphs: [
        'Oddech stanowi bezpośredni pomost z autonomicznym układem nerwowym. Dedykowane techniki oddechowe pomagają rozładować napięcia skumulowane w powięzi, przywracając spokój umysłu i wewnętrzne uziemienie.',
      ],
    },
  ],
  productSlug: 'sesja-1-1',
}

export const topics: Topic[] = [hipnoterapia, totalnaBiologia, naturopatia]

export const getTopic = (slug: string) => {
  const topic = topics.find((t) => t.slug === slug)
  if (!topic) throw new Error(`Brak podstrony tematycznej: ${slug}`)
  return topic
}
