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

const caravanGallery = [
  "/images/caravan/exterior-side.jpg",
  "/images/caravan/exterior-rear.jpg",
  "/images/caravan/08-dining.jpg",
  "/images/caravan/10-kitchen-aisle.jpg",
  "/images/caravan/02-kitchen-fridge.jpg",
  "/images/caravan/09-bed.jpg",
  "/images/caravan/05-bunks.jpg",
  "/images/caravan/03-bunks-aisle.jpg",
  "/images/caravan/04-bathroom.jpg",
  "/images/caravan/06-stove.jpg",
  "/images/caravan/07-kitchen-door.jpg",
  "/images/caravan/01-dining-kitchen.jpg",
];

const paljuGallery = [
  "/images/palju/lakeside-wide.jpg",
  "/images/palju/trailers.jpg",
  "/images/palju/yard.jpg",
  "/images/palju/lakeside.jpg",
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
    heroImage: "/images/caravan/exterior-side.jpg",
    gallery: caravanGallery,
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
      "Lahden Paljuvuokraus — 6–8 hengelle, tehokas puuliesi ja helppo veto B-kortilla.",
    description:
      "Vie lämpö ja rentous mukaan minne ikinä menetkin. Paljuvaunumme on helppo vetää B-ajokortilla ja valmis käyttöön nopeasti. Tehokas puuliesi lämmittää veden tehokkaasti. Sopii mökkireissuille, juhliin ja rentoutumishetkiin luonnon keskellä — järven rannalla tai pihamaalla.",
    heroImage: "/images/palju/lakeside-wide.jpg",
    gallery: paljuGallery,
    highlights: [
      "6–8 hengelle kerrallaan",
      "Tehokas puuliesi ja puukansi",
      "Helppo vetää henkilöautolla (B-kortti)",
      "Nopea käyttöönotto ja tyhjennys",
    ],
    specs: [
      { icon: "weight", label: "Omamassa", value: "850 kg" },
      { icon: "plate", label: "Rekisterinumero", value: "PAL-456" },
      { icon: "users", label: "Kapasiteetti", value: "6–8 hlö" },
      { icon: "flame", label: "Lämmitys", value: "Puuliesi" },
      { icon: "sparkles", label: "Runko", value: "Puinen tynnyripalju" },
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
