# Lahden Vaunu & Palju

Suomenkielinen markkinointi- ja varaussivusto asuntovaunun ja paljuvaunun vuokraukseen (Next.js App Router).

## Vaatimukset

- Node.js 20+
- npm

## Käynnistys

```bash
npm install
npm run dev
```

Sovellus käynnistyy osoitteessa [http://127.0.0.1:4317](http://127.0.0.1:4317).

## Tuotantoversio

```bash
npm run build
npm start
```

## Sivut

| Polku | Kuvaus |
|-------|--------|
| `/` | Etusivu |
| `/tuotteet/knaus-sport-500-kd` | Asuntovaunu |
| `/tuotteet/paljuvaunu` | Paljuvaunu |
| `/hinnasto` | Hinnasto ja ehdot |
| `/yhteystiedot` | Yhteystiedot |

## Sisällön muokkaus

Tuotteet, lisäpalvelut ja FAQ: `data/rentals.ts`, `data/faq.ts`, `data/pricing.ts`, `data/site.ts`.

## Teknologiat

- Next.js (App Router), TypeScript, Tailwind CSS v4
- shadcn/ui, lucide-react
