import type { RentalExtra, RentalProduct } from "@/types/rental";

export const rentalExtras: RentalExtra[] = [
  {
    id: "polttopuut",
    label: "Polttopuut (kuiva koivu)",
    price: 15,
    description: "Kuiva koivusäkki paljun lämmitykseen.",
  },
  {
    id: "palju-siivous",
    label: "Loppupesu ja desinfiointi",
    price: 35,
    description: "Palju pestään ja desinfioidaan palautuksen jälkeen.",
  },
  {
    id: "toimitus",
    label: "Kuljetus ja nouto (Lahti lähialue)",
    price: 30,
    priceFrom: true,
    description: "Toimitus ja nouto Lahden lähialueella. Lopullinen hinta vahvistetaan matkan mukaan.",
  },
  {
    id: "kaasupullo",
    label: "Asuntovaunun kaasupullo",
    price: 25,
    description: "Täysi 11 kg kaasupullo keittiöön ja lämmitykseen.",
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
    name: "Knaus Sport 500 KD -asuntovaunu",
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
      amount: 69,
      unit: "vrk",
      label: "alkaen",
    },
    nightlyRate: 69,
    weekendRate: 180,
    weeklyRate: 420,
    applicableExtras: ["kaasupullo", "toimitus"],
  },
  {
    slug: "paljuvaunu",
    category: "hot-tub",
    name: "Paljuvaunu",
    shortDescription:
      "Paljuvuokraus Lahti — 6–8 hengelle, tehokas puuliesi ja helppo veto B-kortilla.",
    description:
      "Vie lämpö ja rentous mukaan minne ikinä menetkin. Paljuvaunumme on helppo vetää B-ajokortilla ja valmis käyttöön nopeasti. Tehokas puuliesi lämmittää veden tehokkaasti. Sopii mökkireissuille, juhliin ja rentoutumishetkiin luonnon keskellä — järven rannalla tai pihamaalla.",
    heroImage: "/images/palju/lakeside-wide.jpg",
    gallery: paljuGallery,
    highlights: [
      "6–8 hengelle kerrallaan",
      "Tehokas puuliesi ja puukansi",
      "Helppo vetää henkilöautolla (B-kortti)",
      "Puhtaustakuu: desinfiointi ennen jokaista luovutusta",
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
      amount: 59,
      unit: "vrk",
      label: "alkaen",
    },
    nightlyRate: 59,
    weekendRate: 140,
    weeklyRate: 260,
    applicableExtras: ["polttopuut", "palju-siivous", "toimitus"],
  },
];

export function getProductBySlug(slug: string): RentalProduct | undefined {
  return rentalProducts.find((p) => p.slug === slug);
}

export function getExtrasForProduct(product: RentalProduct): RentalExtra[] {
  return rentalExtras.filter((e) => product.applicableExtras.includes(e.id));
}
