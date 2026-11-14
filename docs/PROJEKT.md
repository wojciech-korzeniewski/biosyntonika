# BioSyntonika – opis projektu

Dokument dla osoby, która pierwszy raz otwiera to repo. Po lekturze powinieneś wiedzieć: czym jest strona, po co powstała, jak jest zbudowana, gdzie co leży, jak ją uruchomić i co jest jeszcze do zrobienia.

---

## 1. Co to jest i po co

**BioSyntonika™** to marka i gabinet **Izabeli Gotowskiej-Sieradzkiej** – naturopatki, hipnoterapeutki medycznej i konsultantki Totalnej Biologii. Gabinet działa w Bydgoszczy (ul. M. Kolbego 42), część sesji odbywa się w Szklarskiej Porębie i online.

Ten projekt zastępuje dawną stronę na **WordPressie + WooCommerce**. Cele przepisania:

1. **Szybkość i prostota** – statycznie generowana strona w Next.js zamiast ciężkiego WordPressa z wtyczkami.
2. **SEO i widoczność w AI** – pełne metadane, dane strukturalne schema.org, sitemap, `llms.txt`, obrazki Open Graph, przekierowania 301 ze starych adresów (żeby nie stracić pozycji w Google).
3. **Niezależność od CMS-a** – treści i produkty są na razie w repo, ale kod jest przygotowany na podpięcie dowolnego zewnętrznego CMS-a/sklepu jednym adapterem.
4. **Trener IKIGAI** – interaktywna aplikacja (dawniej wtyczka WordPress `biosyntonika-ikigai`), przepisana na React z trenerem opartym o Claude. To narzędzie, które ma przyciągać klientów i prowadzić ich do zapisu na sesję.

---

## 2. Technologia

| Warstwa | Co | Uwagi |
|---|---|---|
| Framework | **Next.js 16** (App Router) | Wersja z breaking changes – patrz `AGENTS.md` i `node_modules/next/dist/docs/` |
| UI | **React 19**, Server Components | `'use client'` tylko w menu mobilnym i aplikacji IKIGAI |
| Język | **TypeScript** (strict) | alias `@/` → `src/` |
| Style | **czysty CSS** – `src/app/styles.css` | zmienne CSS (ciemne tło, złote akcenty), bez Tailwinda |
| Fonty | `next/font/google` | Cormorant Garamond (szeryf) + Jost (bezszeryf) |
| Walidacja | **Zod 4** | wejście API i struktura odpowiedzi AI |
| AI | **Claude API** (`@anthropic-ai/sdk`) | structured outputs, model z `IKIGAI_MODEL` |
| E-mail | **Resend** (REST, bez SDK) | wysyłka zgłoszeń z trenera IKIGAI |
| Pakiety | **pnpm 10**, Node ≥ 20.9 | |
| Jakość | ESLint 9 (config Next), Prettier | brak testów automatycznych |
| Hosting | **Vercel** | |

Nie ma bazy danych, logowania użytkowników ani panelu admina.

---

## 3. Mapa strony

| Adres | Plik | Co pokazuje |
|---|---|---|
| `/` | `src/app/page.tsx` | Strona główna: hero, o mnie, metoda, oferta, IKIGAI, FAQ, kontakt |
| `/o-mnie` | `src/app/o-mnie/page.tsx` | O właścicielce |
| `/metoda` | `src/app/metoda/page.tsx` | Metoda BioSyntonika™ i jej filary |
| `/hipnoterapia-medyczna` | `src/app/hipnoterapia-medyczna/page.tsx` | Podstrona tematyczna (szablon `TopicPage`) |
| `/totalna-biologia` | `src/app/totalna-biologia/page.tsx` | j.w. |
| `/naturopatia` | `src/app/naturopatia/page.tsx` | j.w. |
| `/oferta` | `src/app/oferta/page.tsx` | Lista usług |
| `/oferta/[slug]` | `src/app/oferta/[slug]/page.tsx` | Karta usługi (Sesja 1:1, Warsztaty z anhedonią) z przyciskiem „Kupuję” |
| `/ikigai` | `src/app/ikigai/page.tsx` | Trener IKIGAI (aplikacja) |
| `/faq` | `src/app/faq/page.tsx` | Najczęstsze pytania |
| `/kontakt` | `src/app/kontakt/page.tsx` | Kontakt i zapisy |
| `/regulamin`, `/zwroty`, `/polityka-prywatnosci` | `src/app/[slug]/page.tsx` | Strony prawne z CMS-a |
| `/sitemap.xml`, `/robots.txt` | `src/app/sitemap.ts`, `robots.ts` | Generowane automatycznie |
| `/llms.txt` | `src/app/llms.txt/route.ts` | Opis strony dla modeli AI (llmstxt.org) |
| `/og?title=…`, `/opengraph-image` | `src/app/og/route.tsx`, `opengraph-image.tsx` | Generowane obrazki do udostępnień |
| `/api/ikigai/ai` | `src/app/api/ikigai/ai/route.ts` | Trener AI |
| `/api/ikigai/zgloszenie` | `src/app/api/ikigai/zgloszenie/route.ts` | Zgłoszenie na sesję e-mailem |

---

## 4. Struktura katalogów

```
src/
├── app/                    # Routing (App Router) – każda strona to folder z page.tsx
│   ├── layout.tsx          # Nagłówek, menu, stopka, fonty, globalne metadane
│   ├── styles.css          # Wszystkie style strony
│   └── api/ikigai/         # Backend trenera IKIGAI (AI + e-mail)
├── components/             # Komponenty wielokrotnego użytku
│   ├── TopicPage.tsx       # Szablon podstron tematycznych
│   ├── JsonLd.tsx          # Wstrzykiwanie danych strukturalnych
│   ├── CtaBox, Faq, PageHeader, ProductCard, MobileMenu
│   └── ikigai/             # Aplikacja IKIGAI (IkigaiApp, IkigaiFinal, Venn, ui)
├── content/                # TREŚCI – tu się edytuje teksty
│   ├── site.ts             # Kontakt, menu, strona główna, o mnie, metoda, FAQ, disclaimer
│   ├── topics.ts           # Podstrony tematyczne (hipnoterapia, totalna biologia, naturopatia)
│   ├── data.ts             # Produkty (usługi) i strony prawne – tymczasowy „CMS”
│   └── ikigai/             # Teksty UI (PL/EN), pytania, treść strony, dane zapasowe
└── lib/
    ├── cms/                # Warstwa danych: typy, adapter lokalny, punkt wejścia
    ├── seo.ts              # Metadane, schema.org (firma, osoba, usługa, breadcrumbs)
    ├── og.tsx              # Renderowanie obrazków Open Graph
    ├── format.ts           # Formatowanie cen
    └── ikigai/             # Logika IKIGAI: typy/schematy, wywołania API, fallback, karta, localStorage
public/images/              # Logo i zdjęcia
next.config.ts              # Przekierowania 301 ze starego WordPressa
```

---

## 5. Jak działa strona (część „wizytówkowa”)

### Dane i CMS

Cała strona pobiera produkty i strony prawne przez **jeden obiekt**: `cms` z `src/lib/cms/index.ts`. Implementuje on interfejs `CmsAdapter` (`src/lib/cms/types.ts`):

```ts
getProducts()      // lista usług
getProduct(slug)   // jedna usługa
getPage(slug)      // strona prawna (regulamin itp.)
getCheckoutUrl(p)  // dokąd prowadzi przycisk „Kupuję”
```

Obecnie podpięty jest adapter `local` (`src/lib/cms/local.ts`), który czyta dane z `src/content/data.ts`. **Zakup nie działa** – „Kupuję” prowadzi do `/#kontakt`.

**Podpięcie prawdziwego CMS-a/sklepu** (Shopify, WooCommerce headless, Payload…):
1. Nowy plik `src/lib/cms/<nazwa>.ts` implementujący `CmsAdapter` (mapuje API CMS-a na typy `Product` / `Page`).
2. Podmiana eksportu w `src/lib/cms/index.ts`.
3. `getCheckoutUrl` zwraca link do koszyka/płatności w CMS-ie.
4. Usunięcie `local.ts` i `content/data.ts` (oraz importu w `sitemap.ts`).

Teksty marketingowe (`site.ts`, `topics.ts`) są na razie w repo – docelowo też mogą trafić do CMS-a.

### Renderowanie

Strony są Server Components, generowane statycznie i odświeżane co 5 minut (`revalidate = 300`) – po podpięciu CMS-a zmiany pojawią się bez redeployu.

### SEO

- **Metadane:** `pageMetadata()` w `src/lib/seo.ts` – tytuł, opis (przycięty do ~158 znaków), canonical, Open Graph.
- **Dane strukturalne (schema.org):** firma `HealthAndBeautyBusiness` + osoba `Person` na stronie głównej, `Service` + `Offer` na kartach usług, `WebPage` + `BreadcrumbList` na podstronach.
- **Obrazki OG** generowane dynamicznie z tytułu strony.
- **`robots.txt`** wpuszcza wszystkie boty, łącznie z botami AI (GPTBot, ClaudeBot itd.) – to świadoma decyzja.
- **`llms.txt`** – zwięzły tekstowy opis oferty, metody, FAQ i kontaktu dla modeli językowych.
- **Przekierowania 301** w `next.config.ts` – stare adresy WooCommerce (`/produkt/…`, `/sklep`, `/koszyk`, `/wp-sitemap.xml`…) prowadzą na nowe odpowiedniki.

---

## 6. Trener IKIGAI (`/ikigai`)

### Po co

Darmowe narzędzie dla odwiedzających: w ~15 minut odkrywają swoje ikigai (połączenie tego, co kochasz, w czym jesteś dobry, czego potrzebuje świat i za co ci zapłacą). Na końcu dostają analizę z hipotezami blokad i mogą od razu **zgłosić się na sesję** – to główny lejek sprzedażowy strony.

Przepisane z wtyczki WordPress `biosyntonika-ikigai` – ta sama logika i teksty.

### Przepływ użytkownika

1. **Start** – wybór języka (PL/EN) i wersji: dorośli (`indiv`), młodzież (`youth`, z wiekiem), firmy (`biz`).
2. **Zgody** – akceptacja zasad (u młodzieży także opiekun).
3. **4 kręgi × 5 pytań** – kocham / jestem dobry / potrzebuje świat / zapłacą. Każde pytanie ma **licznik 30 s** – liczy się pierwsza myśl; pusta odpowiedź też jest informacją.
4. **Trener po każdym kręgu** – komentarz AI + jedno pytanie pogłębiające.
5. **Finał** – hasło, zdanie „twoje ikigai”, pasja/misja/profesja/powołanie, analiza kręgów, największa luka, potencjał, 3 blokady (hipotezy), 3 mocne strony, plan na 7 dni, pytanie do refleksji (AI odpowiada na refleksję).
6. **Diagram Venna**, **Karta IKIGAI** (obrazek PNG generowany w canvasie do pobrania), **zaproszenie na sesję** (formularz → e-mail do trenerki), **„Moje sesje”** – historia zapisana w przeglądarce.

Stan ekranów: typ `Screen` w `src/components/ikigai/IkigaiApp.tsx` (`start → consent → section → question → coach → deep → finalLoading → final`).

### Architektura

```
Przeglądarka (IkigaiApp)                Serwer (Vercel)                 Zewnętrzne
───────────────────────                 ───────────────                 ──────────
odpowiedzi w stanie React
  │  lib/ikigai/api.ts → aiCall()
  └──── POST /api/ikigai/ai ──────────► walidacja Zod, limit zapytań,
                                        sprawdzenie Origin
                                        prompt + odpowiedzi w znacznikach ──► Claude API
                                        ◄── JSON zgodny ze schematem ◄────────┘
  ◄──── { ok, data } ──────────────────┘
  │  (błąd / 503 → lib/ikigai/fallback.ts – odpowiedzi zapasowe)
  │
  ├── localStorage 'bsikg_sessions' (lib/ikigai/storage.ts)
  │
  └──── POST /api/ikigai/zgloszenie ──► walidacja, honeypot, HTML ─────► Resend → e-mail trenerki
        (tylko gdy klient sam wyśle)    (503 bez klucza → klient dostaje tekst do skopiowania)
```

**Endpoint AI** (`api/ikigai/ai/route.ts`) obsługuje trzy rodzaje zapytań (`kind`):
- `coach` – komentarz + pytanie pogłębiające po kręgu (`CoachSchema`),
- `final` – pełna analiza (`ResultSchema`),
- `reflect` – odpowiedź na refleksję klienta (`ReflectSchema`).

Szczegóły: structured outputs (`betaZodOutputFormat`), osobna persona dla młodzieży i firm, limit 30 zapytań / 10 min na IP (w pamięci instancji – ochrona przed nadużyciem, nie gwarancja), limit rozmiaru body, sprawdzanie `Origin`, odpowiedzi klienta czyszczone i owinięte znacznikami jako ochrona przed prompt injection.

### Prywatność (ważne)

- Odpowiedzi **nie są zapisywane na serwerze** ani logowane. Do AI trafiają tylko odpowiedzi i imię.
- Historia sesji jest wyłącznie w `localStorage` przeglądarki klienta (może ją wyczyścić).
- Do trenerki trafia tylko zgłoszenie, które klient **świadomie** wyśle (z wyborem, czy dołączyć pełne odpowiedzi). Mail zawiera przypomnienie o przechowywaniu danych max 3 miesiące.
- Trener nie stawia diagnoz – blokady to hipotezy do pracy na sesji.

### Tryby awaryjne

| Brak | Co się dzieje |
|---|---|
| `ANTHROPIC_API_KEY` | API zwraca 503, aplikacja przechodzi na odpowiedzi zapasowe (`fallback.ts` + `content/ikigai/fallback-data.ts`) – działa bez AI |
| `RESEND_API_KEY` / `IKIGAI_MAIL_FROM` | Zamiast wysyłki klient dostaje podsumowanie do skopiowania i wysłania samemu |

### Gdzie co zmieniać

| Chcę zmienić… | Plik |
|---|---|
| Pytania | `src/content/ikigai/questions.ts` |
| Teksty interfejsu (PL/EN) | `src/content/ikigai/i18n.ts` |
| Treść strony `/ikigai` (SEO, opis) | `src/content/ikigai/page.ts` |
| Prompt / zachowanie trenera | `src/app/api/ikigai/ai/route.ts` (`persona`, `taskFor`) |
| Strukturę wyniku | `src/lib/ikigai/types.ts` + prompt + `fallback.ts` + `IkigaiFinal.tsx` + `card.ts` + mail w `zgloszenie/route.ts` |
| Wygląd karty PNG | `src/lib/ikigai/card.ts` |
| Czas na odpowiedź (30 s), liczbę pytań | stałe `SECONDS`, `TOTAL` w `src/lib/ikigai/types.ts` |

---

## 7. Uruchomienie

```bash
pnpm install
cp .env.example .env.local   # opcjonalnie – bez kluczy wszystko też działa
pnpm dev                     # http://localhost:3000
```

Pozostałe komendy: `pnpm build`, `pnpm start`, `pnpm lint`, `pnpm typecheck`.

### Zmienne środowiskowe (`.env.example`)

| Zmienna | Wymagana | Opis |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | na produkcji | Adres strony bez `/` na końcu (canonical, sitemap, schema) |
| `ANTHROPIC_API_KEY` | nie | Klucz Claude API – włącza trenera AI |
| `IKIGAI_MODEL` | nie | Model Claude (domyślnie `claude-opus-5-5`) |
| `RESEND_API_KEY` | nie | Klucz Resend – włącza wysyłkę zgłoszeń |
| `IKIGAI_MAIL_FROM` | z Resend | Nadawca z domeny zweryfikowanej w Resend |
| `IKIGAI_COACH_EMAIL` | nie | Odbiorca zgłoszeń (domyślnie e-mail z `site.ts`) |

### Deploy

Vercel → import repozytorium → ustawienie zmiennych środowiskowych → deploy. Po przepięciu domeny warto sprawdzić przekierowania ze starych adresów i zgłosić `sitemap.xml` w Google Search Console.

---

## 8. Konwencje

- Treści, komentarze, commity, dokumentacja: **po polsku**. Kod (nazwy): po angielsku, poza polami wyniku IKIGAI (`haslo`, `blokady`…).
- Prettier: bez średników, pojedyncze cudzysłowy, szerokość 100. VS Code formatuje przy zapisie (`.vscode/settings.json`).
- Commity w stylu Conventional Commits (`feat:`, `fix:`, `refactor:`…).
- Tekst do zmiany? Szukaj najpierw w `src/content/`, nie w komponentach.

---

## 9. Stan projektu

**Zrobione**
- Wszystkie strony z dawnej witryny przeniesione (treści z biosyntonika.com.pl), nowa szata graficzna.
- Podstrony tematyczne: hipnoterapia medyczna, Totalna Biologia, naturopatia.
- Pełne SEO: metadane, schema.org, sitemap, robots, `llms.txt`, obrazki OG, przekierowania 301.
- Trener IKIGAI: 3 wersje, PL/EN, AI z fallbackiem, finał, Venn, karta PNG, historia sesji, zgłoszenie e-mailem.

**Do zrobienia / otwarte**
- Wybór i podpięcie CMS-a z płatnościami – na razie „Kupuję” prowadzi do kontaktu.
- Uzupełnienie profili social media w `site.sameAs` (`src/content/site.ts`).
- Treści stron prawnych (regulamin, zwroty, polityka prywatności) do weryfikacji – niegotowe strony mają `noindex`.
- Limit zapytań do AI działa per instancja – przy większym ruchu rozważyć współdzielony (np. Upstash/Vercel KV).
- Brak testów automatycznych.
