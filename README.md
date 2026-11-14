# BioSyntonika

Strona w Next.js 16. Bez bazy danych. Produkty, treści i płatności docelowo dostarczy zewnętrzny CMS przez API (do wyboru).

## Start

```bash
pnpm install
pnpm dev     # http://localhost:3000
```

## Struktura

- `src/app/` – strony: `/`, `/oferta/[slug]`, `/[slug]` (regulamin, zwroty…)
- `src/lib/cms/types.ts` – model danych (`Product`, `Page`) i interfejs `CmsAdapter`
- `src/lib/cms/index.ts` – **jedyne miejsce**, przez które strona pobiera dane
- `src/lib/cms/local.ts` + `src/content/` – dane tymczasowe, wpisane w repo (nic nie jest pobierane z zewnątrz)
- `next.config.ts` – przekierowania 301 ze starych adresów WooCommerce

## Podpięcie CMS-a

1. Napisz adapter `src/lib/cms/<cms>.ts` implementujący `CmsAdapter`.
2. Podmień eksport w `src/lib/cms/index.ts`.
3. `getCheckoutUrl(product)` zwraca link do koszyka/płatności w CMS-ie – przycisk „Kupuję” tam przekierowuje.
4. Usuń `local.ts` i `src/content/data.ts`.

## Trener IKIGAI (`/ikigai`)

Przepisana wtyczka `biosyntonika-ikigai` (WordPress) – ta sama logika i teksty, PL/EN, 3 wersje (dorośli, młodzież, firmy).

- `src/components/ikigai/` – aplikacja (start, zgody, 4 kręgi × 5 pytań z licznikiem 30 s, trener, finał, zaproszenie, Karta IKIGAI, „Moje sesje” w przeglądarce)
- `src/content/ikigai/` – teksty i pytania (z oryginału)
- `src/app/api/ikigai/ai` – trener AI (Claude, structured outputs). Bez `ANTHROPIC_API_KEY` zwraca 503 i aplikacja używa odpowiedzi zapasowych.
- `src/app/api/ikigai/zgloszenie` – zgłoszenie na sesję e-mailem (Resend). Bez klucza klient dostaje podsumowanie do skopiowania.

Odpowiedzi klienta nie są nigdzie zapisywane na serwerze – do AI trafiają same odpowiedzi i imię, do trenera tylko zgłoszenie wysłane świadomie przez klienta.

## Deploy

Vercel – import repozytorium. Dla trenera AI i zgłoszeń ustaw zmienne z `.env.example`.
