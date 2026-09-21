# Caravan Rent Lahti · Lahden Paljuvuokraus

Suomenkielinen markkinointi- ja varaussivusto Knaus Sport -asuntovaunulle ja paljuvaunulle (Next.js App Router).

## Käynnistys

```bash
npm install
npm run dev
```

Sovellus kuuntelee [http://127.0.0.1:4317](http://127.0.0.1:4317).

## Sivut

| Polku | Kuvaus |
|-------|--------|
| `/` | Etusivu |
| `/tuotteet/knaus-sport-500-kd` | Asuntovaunu + varauskalenteri |
| `/tuotteet/paljuvaunu` | Paljuvaunu + varauskalenteri |
| `/hinnasto` | Hinnasto ja ehdot |
| `/yhteystiedot` | Yhteystiedot |
| `/sitemap.xml` | Automaattinen sivukartta |
| `/robots.txt` | Hakukoneohjeet |

## Analytiikka

Kopioi `.env.example` tiedostoksi `.env.local` ja täytä tarvittaessa:

- `NEXT_PUBLIC_SITE_URL` — kanoninen osoite (Open Graph, sitemap, robots)
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — GA4, muoto `G-XXXXXXXX`
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` — Plausible-sivuston domain

Ilman tunnuksia sivusto toimii normaalisti. Varauspyyntö (WhatsApp/sähköposti) ja “Kysy mukautettua vuokrausaikaa” lähettävät eventin, kun analytiikka on kytketty.

## Julkaisu

Katso [docs/deployment-guide.md](docs/deployment-guide.md) (Vercel / Netlify, custom domain, Resend).

## Kuvat ja logot

Oikeat kuvat: `public/images/caravan/`, `public/images/palju/`. Brändi: `public/brand/`.

Sisältö: `data/rentals.ts`, `data/availability.ts`, `data/site.ts`.
