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

## Deploy

Vercel – import repozytorium, bez dodatkowej konfiguracji.
