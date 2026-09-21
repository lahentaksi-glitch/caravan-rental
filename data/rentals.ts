import type { RentalExtra, RentalProduct } from "@/types/rental";

export const rentalExtras: RentalExtra[] = [
  {
    id: "palju-siivous",
    label: "Paljun loppusiivous",
    price: 30,
    description: "Ammattimainen tyhjennys ja huuhtelu palautuksen jälkeen.",
  },
  {
    id: "polttopuut",
    label: "Polttopuut",
    price: 20,
    description: "Kuivaa polttopuuta paljun lämmitykseen (n. 1 säkki).",
  },
  {
    id: "kaasupullo",
    label: "Asuntovaunun kaasupullo",
    price: 25,
    description: "Täysi 11 kg kaasupullo keittiöön ja lämmitykseen.",
  },
  {
    id: "toimitus",
    label: "Toimitus lähialueelle",
    price: 50,
    description: "Toimitus ja nouto Lahden ja Hollolan alueella (max 30 km).",
  },
];

export const rentalProducts: RentalProduct[] = [
  {
    slug: "knaus-sport-500-kd",
    category: "caravan",
    name: "Matkailuvaunu Knaus Sport 500 KD",
    shortDescription:
      "Tilava perhevaunu 5–6 hengelle — kerrosvuoteet, ilmastointi ja täysi keittiö.",
    description:
      "Knaus Sport 500 KD on luotettava kumppani kesäreissuille Suomen järvimaisemiin. Vaunussa on mukavat kerrosvuoteet, tehokas lämmitys ja ilmastointi sekä täysin varusteltu keittiö. WC ja suihku takaavat mukavuuden myös sateisella säällä. Vuokraan sisältyvät vetopeilit, vakauspyörät ja perusvarusteet — noudat vain ja lähdet.",
    heroImage:
      "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1566004100631-35d015d6a491?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1478131143081-80d7ac84c4c7?auto=format&fit=crop&w=1200&q=80",
    ],
    highlights: [
      "5–6 makuupaikkaa kerrosvuoteilla",
      "Ilmastointi ja kaasulämmitys",
      "Täysi keittiö, jääkaappi ja WC/suihku",
      "Vetopeilit ja vakauspyörät mukana",
    ],
    specs: [
      { icon: "weight", label: "Omamassa", value: "1 420 kg" },
      { icon: "plate", label: "Rekisterinumero", value: "ABC-123" },
      { icon: "bed", label: "Makuupaikat", value: "5–6 hlö" },
      { icon: "thermometer", label: "Lämmitys / AC", value: "Kaasu + ilmastointi" },
      { icon: "car", label: "Vetokoukku", value: "13-napainen" },
      { icon: "mirror", label: "Vetopeilit", value: "Sisältyy vuokraan" },
      { icon: "ruler", label: "Pituus", value: "7,2 m" },
      { icon: "users", label: "Suositeltu", value: "Perheet & pariskunnat" },
    ],
    priceFrom: {
      amount: 590,
      unit: "viikko",
      label: "alkaen",
    },
    nightlyRate: 95,
    weekendRate: 220,
    weeklyRate: 590,
    applicableExtras: ["kaasupullo", "toimitus"],
  },
  {
    slug: "paljuvaunu",
    category: "hot-tub",
    name: "Paljuvaunu / paljukärry",
    shortDescription:
      "Upouusi paljuelämys 6–8 hengelle — tehokas liesi, LED-valot ja poreet.",
    description:
      "Vie lämpö ja rentous mukaan minne ikinä menetkin. Paljuvaunumme on helppo vetää B-ajokortilla ja valmis käyttöön nopeasti. Tehokas puuliesi lämmittää veden tehokkaasti, LED-valot ja poreet luovat tunnelmaa iltahämärässä. Sopii mökkireissuille, juhliin ja rentoutumishetkiin luonnon keskellä.",
    heroImage:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
    ],
    highlights: [
      "6–8 hengelle kerrallaan",
      "Tehokas puuliesi ja LED-poreet",
      "Helppo vetää henkilöautolla (B-kortti)",
      "Nopea käyttöönotto ja tyhjennys",
    ],
    specs: [
      { icon: "weight", label: "Omamassa", value: "850 kg" },
      { icon: "plate", label: "Rekisterinumero", value: "PAL-456" },
      { icon: "users", label: "Kapasiteetti", value: "6–8 hlö" },
      { icon: "flame", label: "Lämmitys", value: "Puuliesi" },
      { icon: "sparkles", label: "Valaistus", value: "LED + poreet" },
      { icon: "car", label: "Vetokoukku", value: "13-napainen" },
      { icon: "clock", label: "Lämpenemisaika", value: "n. 2–3 h" },
      { icon: "droplets", label: "Vesimäärä", value: "n. 1 800 l" },
    ],
    priceFrom: {
      amount: 150,
      unit: "viikonloppu",
      label: "alkaen",
    },
    nightlyRate: 55,
    weekendRate: 150,
    weeklyRate: 380,
    applicableExtras: ["palju-siivous", "polttopuut", "toimitus"],
  },
];

export function getProductBySlug(slug: string): RentalProduct | undefined {
  return rentalProducts.find((p) => p.slug === slug);
}

export function getExtrasForProduct(product: RentalProduct): RentalExtra[] {
  return rentalExtras.filter((e) => product.applicableExtras.includes(e.id));
}
