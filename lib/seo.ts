import type { Metadata } from "next";
import { site, siteKeywords, siteUrl } from "@/data/site";
import type { RentalProduct } from "@/types/rental";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: readonly string[];
  absoluteTitle?: boolean;
};

function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageMetadata({
  title,
  description,
  path,
  image,
  keywords = siteKeywords,
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(image ?? site.ogImage);
  const keywordList = [...keywords];

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: keywordList,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: `${site.name} · ${site.partnerName}`,
      locale: "fi_FI",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 800,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function productMetadata(product: RentalProduct): Metadata {
  const isCaravan = product.category === "caravan";
  const keywords = isCaravan
    ? (["knaus sport 500 kd vuokraus", "asuntovaunun vuokraus Lahti", ...siteKeywords] as const)
    : (["paljuvaunu vuokraus Lahti", "paljukärry Lahti", ...siteKeywords] as const);

  const title = isCaravan
    ? "Knaus Sport 500 KD vuokraus"
    : "Paljuvaunu ja paljukärry vuokraus Lahti";

  const description = isCaravan
    ? `${product.shortDescription} Knaus Sport 500 KD vuokraus Lahdessa — katso saatavuus ja lähetä varauspyyntö.`
    : `${product.shortDescription} Paljuvaunu vuokraus ja paljukärry Lahti — katso vapaat päivät kalenterista.`;

  return pageMetadata({
    title,
    description,
    path: `/tuotteet/${product.slug}`,
    image: product.heroImage,
    keywords,
  });
}
