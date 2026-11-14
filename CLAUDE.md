@AGENTS.md

# BioSyntonika – instrukcje dla Claude

Strona gabinetu BioSyntonika™ (Izabela Gotowska-Sieradzka – naturopatia, hipnoterapia medyczna, Totalna Biologia, Bydgoszcz + online) oraz aplikacja **Trener IKIGAI** z AI. Pełny opis projektu: [docs/PROJEKT.md](docs/PROJEKT.md) – przeczytaj go przed większymi zmianami.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Zod 4 · `@anthropic-ai/sdk` · pnpm 10 · Node ≥ 20.9 · deploy na Vercel. Brak bazy danych, brak Tailwinda (jeden plik `src/app/styles.css` ze zmiennymi CSS).

Next.js 16 różni się od tego, co znasz – przed pisaniem kodu Next-owego sprawdź `node_modules/next/dist/docs/` (np. `params` jest `Promise`, trzeba `await params`).

## Komendy

```bash
pnpm dev          # http://localhost:3000
pnpm build        # build produkcyjny – uruchom po większych zmianach
pnpm lint         # ESLint (next/core-web-vitals + typescript)
pnpm typecheck    # tsc --noEmit
```

Brak testów automatycznych – po zmianie odpal `pnpm typecheck && pnpm lint`, a przy zmianach w routach/SEO także `pnpm build`.

## Zasady w tym repo

- **Język:** treści strony, komentarze w kodzie, komunikaty commitów i dokumentacja – po polsku. Nazwy zmiennych/funkcji – po angielsku (wyjątek: pola JSON wyniku IKIGAI, np. `haslo`, `blokady`, `potencjal` – nie zmieniaj ich, są w schemacie Zod, prompcie i mailu jednocześnie).
- **Dane tylko przez `cms`:** strony pobierają produkty i strony prawne wyłącznie przez `cms` z `src/lib/cms/index.ts` (interfejs `CmsAdapter`). Nie importuj `src/content/data.ts` bezpośrednio w nowych stronach (wyjątek historyczny: `sitemap.ts`).
- **Treści w `src/content/`:** teksty strony (`site.ts`), podstrony tematyczne (`topics.ts`), produkty i regulaminy (`data.ts`), IKIGAI (`content/ikigai/`). Zmiana tekstu = edycja tych plików, nie komponentów.
- **Nowa podstrona tematyczna:** dodaj obiekt do `topics` w `src/content/topics.ts` + folder `src/app/<slug>/page.tsx` korzystający z `TopicPage` (wzór: `src/app/naturopatia/page.tsx`). Sitemap i `llms.txt` podchwycą ją same.
- **SEO na każdej stronie:** metadane przez `pageMetadata()` z `src/lib/seo.ts`, dane strukturalne przez `<JsonLd>` + helpery `webPageJsonLd` / `productJsonLd` / `businessJsonLd`. Nowe publiczne ścieżki dopisz do `src/app/sitemap.ts`, jeśli nie są generowane automatycznie.
- **Stare adresy WordPressa:** przekierowania 301 w `next.config.ts` – nie usuwaj ich.
- **Styl kodu:** Prettier – bez średników, pojedyncze cudzysłowy, `trailingComma: all`, szerokość 100. Alias importów `@/` → `src/`.
- **Mapa dojazdu:** komponent `MapEmbed` (`src/components/MapEmbed.tsx`) na `/kontakt`. Adresy w `site.booking`: `mapsUrl` (link „Otwórz w Mapach”) i `mapsEmbedUrl` (iframe, bez klucza API). Zmiana adresu gabinetu = zaktualizuj oba pola + `site.contact`. Iframe Google ustawia cookies – nie dokładaj kolejnych osadzeń zewnętrznych bez decyzji właściciela (RODO).
- **Komponenty klienckie** (`'use client'`) tylko tam, gdzie trzeba (menu mobilne, aplikacja IKIGAI). Reszta to Server Components.

## Trener IKIGAI – na co uważać

- Endpoint AI: `src/app/api/ikigai/ai/route.ts`. Model z `IKIGAI_MODEL` (domyślnie `claude-opus-5-5`), structured outputs przez `betaZodOutputFormat`. Schematy wejścia/wyjścia w `src/lib/ikigai/types.ts` – zmiana pola wymaga aktualizacji schematu, promptu, `fallback.ts`, `IkigaiFinal.tsx`, `card.ts` i maila w `zgloszenie/route.ts`.
- **Prywatność to wymóg, nie dodatek:** odpowiedzi klienta nie są zapisywane na serwerze ani logowane. Sesje leżą tylko w `localStorage` (`bsikg_sessions`). Nie dodawaj logowania treści odpowiedzi, analityki z ich treścią ani bazy danych bez wyraźnej decyzji właściciela.
- **Prompt injection:** odpowiedzi klienta są owijane w znaczniki i czyszczone (`src/lib/ikigai/text.ts`), a prompt mówi, by traktować je jako materiał. Zachowaj ten wzorzec przy nowych polach tekstowych.
- **Tryb bez AI musi działać:** brak `ANTHROPIC_API_KEY` → endpoint zwraca 503 → klient przełącza się na `src/lib/ikigai/fallback.ts`. Brak `RESEND_API_KEY` → zgłoszenie pokazuje podsumowanie do skopiowania. Każda nowa funkcja AI potrzebuje ścieżki zapasowej.
- Teksty UI w dwóch językach: `src/content/ikigai/i18n.ts` (PL i EN muszą mieć te same klucze). Pytania: `src/content/ikigai/questions.ts` (3 wersje × 2 języki × 4 kręgi × 5 pytań).
- Trener nie diagnozuje – to zapisane w promptcie i w disclaimerze strony; nie osłabiaj tego.

## Sekrety

Zmienne środowiskowe opisane w `.env.example`. Nigdy nie commituj `.env*` z kluczami.
