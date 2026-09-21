import type { PricingRow } from "@/types/rental";

export const caravanPricingTable: PricingRow[] = [
  { label: "Vuorokausi", season: "69 €", offSeason: "59 €" },
  { label: "Viikonloppu (pe–su)", season: "180 €", offSeason: "150 €" },
  { label: "Viikko", season: "420 €", offSeason: "350 €" },
];

export const hotTubPricingTable: PricingRow[] = [
  { label: "Vuorokausi", season: "59 €", offSeason: "49 €" },
  { label: "Viikonloppu (pe–su)", season: "150 €", offSeason: "120 €" },
  { label: "Viikko", season: "350 €", offSeason: "290 €" },
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

export const footerTermsSummary = {
  deductible: "Omavastuu 800 € / vahinko.",
  cancellation:
    "Peruutus: yli 14 vrk täysi hyvitys, 7–14 vrk 50 % hyvitys, alle 7 vrk ei hyvitystä.",
} as const;
