import type { PricingRow } from "@/types/rental";

export const caravanPricingTable: PricingRow[] = [
  { label: "Viikonloppu (pe–su)", season: "220 €", offSeason: "180 €" },
  { label: "Viikko", season: "590 €", offSeason: "490 €" },
  { label: "Päivä", season: "95 €", offSeason: "75 €" },
];

export const hotTubPricingTable: PricingRow[] = [
  { label: "Viikonloppu (pe–su)", season: "150 €", offSeason: "120 €" },
  { label: "Viikko", season: "380 €", offSeason: "320 €" },
  { label: "Päivä", season: "55 €", offSeason: "45 €" },
];

export const rentalTerms = [
  {
    title: "Vakuus",
    body: "Varauksen vahvistamiseen peritään 200 € vakuus, joka palautetaan tarkistuksen jälkeen 3–5 arkipäivän kuluessa palautuksesta.",
  },
  {
    title: "Peruutus",
    body: "Yli 14 vrk ennen vuokrausta: täysi hyvitys. 7–14 vrk: 50 % hyvitys. Alle 7 vrk: ei hyvitystä (poikkeustapauksissa neuvotellaan).",
  },
  {
    title: "Omavastuu",
    body: "Omavastuu 800 € / vahinko. Vakuutus ei kata tahallista vahingoittamista tai huolimattomuutta ohjeiden vastaisesti.",
  },
] as const;
