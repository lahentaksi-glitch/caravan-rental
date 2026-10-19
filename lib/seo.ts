import type { Metadata } from "next";
import { site, siteKeywords, siteUrl } from "@/data/site";
import type { RentalProduct } from "@/types/rental";

type PageMetadataInput = {
  path: string;
  keywords?: readonly string[];
  noIndex?: boolean;
};

function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function ogImageMetadata() {
  return {
    url: absoluteUrl(site.ogImage),
    width: 1200,
    height: 630,
    alt: site.metaTitle,
  };
}

export function pageMetadata({
  path,
  keywords = siteKeywords,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const title = site.metaTitle;
  const description = site.metaDescription;
  const image = ogImageMetadata();
  const keywordList = [...keywords];

  return {
    title: { absolute: title },
    description,
    keywords: keywordList,
    alternates: noIndex ? undefined : { canonical: url },
    openGraph: {
      title,
      description,
      url: noIndex ? siteUrl : url,
      siteName: site.name,
      locale: "fi_FI",
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

export function productMetadata(product: RentalProduct): Metadata {
  const isCaravan = product.category === "caravan";
  const keywords = isCaravan
    ? (["knaus sport 500 kd vuokraus", "asuntovaunun vuokraus Lahti", ...siteKeywords] as const)
    : ([
        "Paljun vuokraus Lahti",
        "Paljuvuokraus Pertunmaa",
        "Kärrypalju vuokraus Päijät-Häme",
        "paljuvaunu vuokraus Lahti",
        ...siteKeywords,
      ] as const);

  return pageMetadata({
    path: `/tuotteet/${product.slug}`,
    keywords,
  });
}
