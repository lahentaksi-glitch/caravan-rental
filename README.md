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

Sovellus kuuntelee osoitetta [http://127.0.0.1:4317](http://127.0.0.1:4317) (kaikki verkko-osoitteet, portti 4317).

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

Tuotteet, lisäpalvelut, FAQ ja varatut päivät: `data/rentals.ts`, `data/faq.ts`, `data/pricing.ts`, `data/site.ts`, `data/availability.ts`.

## Teknologiat

- Next.js (App Router), TypeScript, Tailwind CSS v4
- shadcn/ui, lucide-react
