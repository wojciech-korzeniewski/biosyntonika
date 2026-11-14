import type { Page, Product } from '@/lib/cms/types'

/**
 * Tymczasowe dane – do czasu podpięcia CMS-a (przeniesione z biosyntonika.com.pl).
 * Po wyborze CMS-a ten plik znika, a dane przychodzą z jego API.
 */

export const products: Product[] = [
  {
    id: 'sesja-1-1',
    slug: 'sesja-1-1',
    title: 'BioSyntonika™ Sesja 1:1',
    price: 500,
    compareAtPrice: 600,
    currency: 'PLN',
    images: [{ url: '/images/sesja.jpg', alt: 'Sesja BioSyntonika™ 1:1', width: 1600, height: 872 }],
    categories: [{ slug: 'sesje', name: 'Sesje' }],
    purchasable: true,
    seoTitle: 'Sesja 1:1 BioSyntonika™ – hipnoterapia medyczna, Bydgoszcz',
    seoDescription:
      'Sesja 1:1 (ok. 120 min): hipnoterapia medyczna, Totalna Biologia, praca z rodem i układem nerwowym. Bydgoszcz, Szklarska Poręba lub online.',
    facts: [
      { label: 'Czas trwania', value: 'ok. 120 minut' },
      { label: 'Forma', value: 'online lub stacjonarnie' },
      { label: 'Miejsce', value: 'Bydgoszcz, Szklarska Poręba' },
      { label: 'Online', value: 'WhatsApp, Messenger, FaceTime' },
    ],
    shortDescriptionHtml:
      '<p>Holistyczna sesja, która pomaga odnaleźć drogę powrotną do równowagi — w ciele, emocjach i głębszych wzorcach, które nosimy czasem od pokoleń.</p>',
    descriptionHtml: `
<h2>Dla kogo jest ta sesja</h2>
<p>Jeśli czujesz przewlekłe zmęczenie, somatyczne dolegliwości bez jasnej przyczyny, długotrwały stres czy lęk — albo po prostu masz wrażenie, że utknęłaś/eś w miejscu i szukasz źródła tego stanu głębiej niż na powierzchni.</p>

<h2>Jak pracujemy podczas sesji</h2>
<p>Towarzyszę Ci w bezpiecznym, spokojnym procesie, łącząc kilka uzupełniających się podejść.</p>
<ul>
  <li><strong>Medyczna hipnoterapia, fale Alfa i Theta</strong> — jako certyfikowany hipnoterapeuta medyczny wprowadzam Cię w bezpieczny, głęboki stan relaksacji, w którym umysł staje się bardziej otwarty i plastyczny. To ułatwia łagodny kontakt z podświadomością i uwalnianie utrwalonych w ciele napięć.</li>
  <li><strong>Praca z emocjonalnym podłożem objawów, inspirowana Totalną Biologią i Recall Healing</strong> — szukamy razem, jaki konflikt emocjonalny mógł stać za sygnałem, który wysyła ciało.</li>
  <li><strong>Praca z rodami i systemami rodzinnymi na poziomie energetycznym</strong> — wchodzimy w kontakt z polem energetycznym Twojego rodu, by rozpoznać nieświadome lojalności, obciążenia i zaplątania przekazywane z pokolenia na pokolenie. Uwalniamy to, co nie należy do Ciebie, i przywracamy naturalny, swobodny przepływ siły w Twoim systemie rodzinnym.</li>
  <li><strong>Praca z najwcześniejszymi wzorcami</strong> — docieramy do pierwotnych zapisów odrzucenia, lęku czy braku poczucia bezpieczeństwa, by budować większe zaufanie i wewnętrzne oparcie.</li>
  <li><strong>Praca z układem nerwowym</strong> — pomagamy wygaszać utrwalone wzorce stresowe i tworzyć przestrzeń na nowe, spokojniejsze reakcje.</li>
  <li><strong>Praca z intencją</strong> — całość spinamy świadomą pracą z intencją, by wesprzeć Twój naturalny proces regeneracji.</li>
</ul>

<h2>Czego możesz się spodziewać po sesji</h2>
<ul>
  <li>Poczucia ulgi i uwolnienia napięć, które długo się kumulowały.</li>
  <li>Głębszego zrozumienia emocjonalnego i rodzinnego kontekstu sygnałów płynących z ciała.</li>
  <li>Większej spójności wewnętrznej i poczucia własnej mocy.</li>
  <li>Wyciszenia, lekkości i jasności umysłu.</li>
</ul>
<p>Sesja stacjonarna odbywa się pod urządzeniem RSG – na bieżąco monitoruję stan emocjonalny klienta.</p>
<p>Dla wzmocnienia procesów dobieram preparaty firmy „MARION” dr Jonas detoksykujące układ nerwowy i wszystkie obiegi czynnościowe.</p>

<h2>Szczegóły</h2>
<ul>
  <li><strong>Czas trwania:</strong> około 120 minut</li>
  <li><strong>Forma:</strong> online lub stacjonarnie, Bydgoszcz lub Szklarska Poręba</li>
  <li>Sesje online umawiamy w kalendarzu, sesje stacjonarne umawiamy telefonicznie: 577 658 585 / 794 326 333</li>
  <li>Sesje online odbywają się na WhatsApp, Messenger lub FaceTime</li>
</ul>

<p>Zapraszam Cię do świadomego kroku w stronę regeneracji i powrotu do równowagi.</p>
<p><strong>ZAPRASZAM DO PROCESU</strong></p>
`,
  },
  {
    id: 'warsztaty-praca-z-anhedonia',
    slug: 'warsztaty-praca-z-anhedonia',
    title: 'Warsztaty – praca z Anhedonią',
    price: 500,
    compareAtPrice: 550,
    currency: 'PLN',
    images: [
      { url: '/images/warsztaty.jpg', alt: 'Warsztaty: Odblokuj flow swojego życia', width: 1200, height: 1200 },
      { url: '/images/warsztaty-2.jpg', alt: 'Warsztaty: Od anhedonii do flow', width: 1200, height: 1200 },
    ],
    categories: [{ slug: 'warsztaty', name: 'Warsztaty' }],
    purchasable: true,
    seoTitle: 'Warsztaty z anhedonii – BioSyntonika™, Bydgoszcz',
    seoDescription:
      'Kameralne warsztaty (max 8 osób) o anhedonii: neurobiologia stresu, Totalna Biologia i wzorce rodowe. 1 dzień stacjonarnie lub 2 dni w plenerze.',
    facts: [
      { label: 'Grupa', value: 'maks. 8 osób' },
      { label: 'Czas trwania', value: '1 dzień (stacjonarnie) / 2 dni (w plenerze)' },
    ],
    shortDescriptionHtml:
      '<p>Czas oddać to, co nie Twoje. Czas zresetować układ nerwowy i uwolnić ciało z zamrożenia. Grupy kameralne – max 8 osób.</p>',
    descriptionHtml: `
<p><strong>ANHEDONIA – Uwolnienie Źródła. Neuronauka Stresu, Totalna Biologia i Biologia Rodu.</strong></p>
<p>Czas oddać to, co nie Twoje. Czas zresetować układ nerwowy i uwolnić ciało z zamrożenia.</p>
<p>Nosisz w swoim ciele nie tylko własną historię. Współczesna neuronauka, neurobiologia stresu i totalna biologia potwierdzają to, co Twoje ciało wie od dawna: każdy nierozwiązany konflikt emocjonalny, każdy przewlekły stres i każde biologiczne zranienie zapisują się w tkankach, w osi HPA i w schematach reakcji autonomicznego układu nerwowego. Kiedy brakuje Ci sił, gdy pojawia się anhedonia, chroniczne zmęczenie albo blokada, której nie da się rozpuścić samą psychiką to nie jest Twój brak. To precyzyjny, biologiczny program przetrwania, który utknął w martwym punkcie.</p>
<p>Ten warsztat nie jest kolejną teorią do zrozumienia głową. To głęboka, bezpieczna podróż do wnętrza biologii, w której neuronauka spotyka się z sensem symptomu i korzeniami całego systemu.</p>

<h2>Trzy filary metody – Czym jest ta praca</h2>
<p>Nie musisz walczyć ze swoim ciałem ani analizować przeszłości latami. Wystarczy, że stworzymy przestrzeń, w której Twój układ nerwowy wreszcie poczuje się na tyle bezpiecznie, by wycofać program obronny.</p>
<ul>
  <li><strong>Neurobiologia Stresu i Pamięć Układu Nerwowego</strong><br />Przewlekły stres i traumy przeprogramowują pień mózgu oraz ciało migdałowate, utrzymując Cię w ciągłym trybie walki, ucieczki lub zamrożenia. Podczas warsztatu uczymy układ nerwowy na poziomie fizjologicznym, jak bezpiecznie wyłączyć alarm, przywrócić elastyczność nerwu błędnego i otworzyć zablokowany dopaminowy układ nagrody.</li>
  <li><strong>Totalna Biologia – Sens i Język Symptomu</strong><br />Każdy brak energii, ból czy spadek czucia to nie awaria, lecz biologia próbująca rozwiązać konflikt, którego umysł nie zdążył przetworzyć. Zrozumienie sensu biologicznego i emocjonalnego programu pozwala zatrzymać bezcelową walkę organizmu i skierować energię na powrót do zdrowia.</li>
  <li><strong>Biologia Rodu i Wzorce Pokoleniowe</strong><br />To ważny element całości: przez mechanizmy epigenetyczne dziedziczymy nie tylko cechy fizyczne, ale też gotowość na zagrożenie i nierozwiązane dramaty przodków. Zobaczenie tych lojalności i uwolnienie ciężarów rodu pozwala odzyskać własną przestrzeń życia, przerywając dziedziczone schematy cierpienia.</li>
</ul>

<h2>Dla kogo jest ten warsztat?</h2>
<p>Przychodzisz tu, ponieważ czujesz w kościach, że:</p>
<ul>
  <li>Idziesz przez życie z zaciśniętymi zębami, niosąc bagaż, którego pochodzenia nawet nie potrafisz nazwać, a Twoja oś stresu stale pracuje na wysokich obrotach.</li>
  <li>Tradycyjne metody terapii pomogły Ci zrozumieć wiele rzeczy w głowie, ale ciało nadal jest spięte, zmęczone lub odcięte od czucia przez mechanizmy obronne.</li>
  <li>Pragniesz wreszcie poczuć własny, autonomiczny rytm – bez powtarzania cudzych scenariuszy, bez poczucia winy i bez ciągłej walki o biologiczne przetrwanie.</li>
</ul>
<p>Twoje ciało ma wbudowaną mądrość samouzdrawiania. Kiedy zdejmujesz z niego presję, przestajesz walczyć z objawami i dajesz układowi nerwowemu poczucie bezpieczeństwa, biologia sama wraca do przepływu. Czas odzyskać swój własny oddech.</p>

<h2>Korzyści z warsztatów</h2>
<ul>
  <li><strong>Kontakt z ciałem</strong> – nauczysz się zauważać, gdzie w ciele trzymasz napięcie i blokady.</li>
  <li><strong>Uwolnienie napięcia</strong> – poczujesz lżejsze, swobodniejsze ciało i spokojniejszy oddech.</li>
  <li><strong>Więcej energii i radości</strong> – wróci chęć do działania i zdolność cieszenia się drobnymi rzeczami.</li>
  <li><strong>Narzędzia na co dzień</strong> – wyjdziesz z prostymi praktykami, które możesz stosować sam/a w domu.</li>
  <li><strong>Bezpieczna przestrzeń</strong> – poczujesz się wysłuchany/a, bez oceniania, wśród ludzi z podobnymi doświadczeniami.</li>
</ul>

<h2>Szczegóły</h2>
<ul>
  <li>Grupy kameralne – max 8 osób</li>
  <li>Obowiązuje zasada Vegas (to, co w Vegas, zostaje w Vegas)</li>
  <li>Warsztaty stacjonarne 1-dniowe, w plenerze 2-dniowe</li>
</ul>
<p><strong>Zapraszam do wspólnego procesu.</strong></p>
`,
  },
]

export const pages: Page[] = [
  {
    slug: 'regulamin',
    title: 'Regulamin',
    html: '<p>Treść regulaminu w przygotowaniu.</p>',
    noindex: true,
  },
  {
    slug: 'zwroty',
    title: 'Polityka zwrotów',
    html: '<p>Treść polityki zwrotów w przygotowaniu.</p>',
    noindex: true,
  },
  {
    slug: 'polityka-prywatnosci',
    title: 'Polityka prywatności',
    html: '<p>Treść polityki prywatności w przygotowaniu.</p>',
    noindex: true,
  },
]
