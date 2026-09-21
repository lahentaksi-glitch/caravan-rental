export type RentalSlug = "knaus-sport-500-kd" | "paljuvaunu";

export type ProductCategory = "caravan" | "hot-tub";

export interface RentalExtra {
  id: string;
  label: string;
  price: number;
  description?: string;
}

export interface RentalSpec {
  icon: string;
  label: string;
  value: string;
}

export interface RentalProduct {
  slug: RentalSlug;
  category: ProductCategory;
  name: string;
  shortDescription: string;
  description: string;
  heroImage: string;
  gallery: string[];
  highlights: string[];
  specs: RentalSpec[];
  priceFrom: {
    amount: number;
    unit: string;
    label: string;
  };
  nightlyRate: number;
  weekendRate: number;
  weeklyRate: number;
  applicableExtras: string[];
}

export interface Review {
  id: string;
  name: string;
  location: string;
  product: string;
  rating: number;
  text: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface PricingRow {
  label: string;
  season: string;
  offSeason: string;
}
