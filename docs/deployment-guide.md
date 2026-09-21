# Julkaisuopas — Caravan Rent Lahti · Lahden Paljuvuokraus

Vaiheittaiset ohjeet tuotantoon Vercelissä tai Netlifyssä ja oman domainin (esim. `lahdenvaunujapalju.fi`) kytkentään.

## Ennen julkaisua

1. Aja paikallisesti `npm ci` ja `npm run build`. Buildin pitää onnistua ilman TypeScript-virheitä.
2. Kopioi `.env.example` → `.env.local` kehitystä varten. Älä commitoi salaisuuksia.
3. Päätä tuotannon osoite, esim. `https://lahdenvaunujapalju.fi`.
4. Luo Resend-tili jos haluat automaattiset vahvistussähköpostit. Ilman avainta WhatsApp-varaus toimii silti.

## Ympäristömuuttujat (tuotanto)

Aseta nämä hostin dashboardissa (Vercel → Settings → Environment Variables / Netlify → Site configuration → Environment variables):

| Muuttuja | Pakollinen | Selite |
|----------|------------|--------|
| `NEXT_PUBLIC_SITE_URL` | kyllä | Kanoninen URL ilman kauttaviivaa, esim. `https://lahdenvaunujapalju.fi` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | ei | GA4, muoto `G-XXXXXXXX` |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | ei | Plausible-sivuston domain |
| `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL` | ei | Kartta-iframen src, jos vaihdat noutopisteen |
| `RESEND_API_KEY` | ei* | Resend API-avain (`re_...`) |
| `RESEND_FROM` | ei* | Esim. `Caravan Rent Lahti <varaus@lahdenvaunujapalju.fi>` |
| `BOOKING_NOTIFY_EMAIL` | ei | Yrittäjän ilmoitusosoite |

\* Sähköpostivahvistus vaatii `RESEND_API_KEY` ja Resendissä varmennetun lähettäjädomainin.

## Vercel

1. Kirjaudu [vercel.com](https://vercel.com) ja valitse **Add New → Project**.
2. Tuo Git-repositorio. Framework preset: **Next.js**. Root directory: projektin juuri.
3. Lisää yllä olevat ympäristömuuttujat Production-ympäristöön.
4. Deploy. Ensimmäinen osoite on muotoa `projekti.vercel.app`.
5. **Settings → Domains** → lisää `lahdenvaunujapalju.fi` ja `www.lahdenvaunujapalju.fi`.
6. Vercel näyttää DNS-ohjeet:
   - Apex (`@`): `A` → `10.0.1.2` tai Vercelin osoittama arvo.
   - `www`: `CNAME` → `cname.vercel-dns.com`.
7. Odota SSL-sertifikaattia (yleensä minuuteissa DNS:n levittäydyttyä).
8. Aseta `NEXT_PUBLIC_SITE_URL=https://lahdenvaunujapalju.fi` ja tee uusi deploy, jotta sitemap, Open Graph ja JSON-LD käyttävät oikeaa domainia.

## Netlify

1. Kirjaudu [netlify.com](https://www.netlify.com) → **Add new site → Import an existing project**.
2. Valitse Git-repositorio. Build command: `npm run build`. Publish directory: `.next` (Netlify käyttää Next.js -runtimea automaattisesti).
3. Lisää samat ympäristömuuttujat.
4. Deploy. Testaa `*.netlify.app` -osoite.
5. **Domain management → Add a domain** → `lahdenvaunujapalju.fi`.
6. Seuraa Netlifyn DNS-ohjeita (`NETLIFY` / `CNAME` tai ulkoisen rekisteröijän nameserverit).
7. Päivitä `NEXT_PUBLIC_SITE_URL` ja redeploy.

## Custom domain -tarkistuslista

- [ ] `https://lahdenvaunujapalju.fi` avautuu ilman varoitusta (HTTPS).
- [ ] `www` ohjaa apex-domainille tai päinvastoin (yksi kanoninen osoite).
- [ ] `https://lahdenvaunujapalju.fi/sitemap.xml` ja `/robots.txt` vastaavat 200.
- [ ] Open Graph -esikatselu (esim. [opengraph.xyz](https://www.opengraph.xyz)) näyttää oikean kuvan ja otsikon.
- [ ] JSON-LD: [Google Rich Results Test](https://search.google.com/test/rich-results) LocalBusiness / AutomotiveBusiness.
- [ ] Google Search Console: lisää property, vahvista DNS:llä, lähetä sitemap.
- [ ] Google Business Profile (Lahti): sama osoite, puhelin ja sivuston URL.

## Resend-sähköpostit

1. Luo API-avain Resendissä.
2. Lisää domain `lahdenvaunujapalju.fi` ja aseta SPF / DKIM / DMARC Resendin ohjeiden mukaan.
3. Aseta `RESEND_FROM` varmennettuun osoitteeseen.
4. Testaa varauslomakkeella: asiakas saa vahvistuksen, `BOOKING_NOTIFY_EMAIL` saa ilmoituksen. WhatsApp avautuu rinnalla.

## Julkaisun jälkeen

- Päivitä `data/site.ts` puhelin, sähköposti ja noutosoite oikeiksi tiedoiksi.
- Vaihda demo-arviot ja rekisterinumerot tarvittaessa.
- Tarkista WhatsApp-numero (`site.whatsapp`) kansainvälisessä muodossa ilman plus-merkkiä `wa.me`-linkissä.
