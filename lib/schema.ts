import { rentalProducts } from "@/data/rentals";
import { site, siteUrl } from "@/data/site";

export function localBusinessJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": ["AutomotiveBusiness", "LocalBusiness"],
    name: site.name,
    alternateName: site.partnerName,
    description: site.description,
    url: siteUrl,
    image: `${siteUrl}${site.ogImage}`,
    logo: `${siteUrl}${site.logos.caravan}`,
    telephone: site.phone,
    email: site.email,
    priceRange: "€45–€590",
    currenciesAccepted: "EUR",
    paymentAccepted: "Bank transfer, cash",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: "15100",
      addressLocality: "Lahti",
      addressRegion: site.address.region,
      addressCountry: "FI",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    hasMap: site.mapDirectionsUrl,
    areaServed: [
      { "@type": "City", name: "Lahti" },
      { "@type": "AdministrativeArea", name: "Päijät-Häme" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "15:00",
      },
    ],
    makesOffer: rentalProducts.map((product) => ({
      "@type": "Offer",
      name: product.name,
      description: product.shortDescription,
      url: `${siteUrl}/tuotteet/${product.slug}`,
      availability: "https://schema.org/InStock",
      price: product.priceFrom.amount,
      priceCurrency: "EUR",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: product.priceFrom.amount,
        priceCurrency: "EUR",
        unitText: product.priceFrom.unit,
      },
      itemOffered: {
        "@type": "Service",
        name: product.category === "caravan" ? "Asuntovaunun vuokraus Lahti" : "Paljuvaunu vuokraus Lahti",
        serviceType:
          product.category === "caravan"
            ? "Asuntovaunun vuokraus"
            : "Paljuvaunu- ja paljukärryvuokraus",
        areaServed: { "@type": "City", name: "Lahti" },
      },
    })),
    sameAs: [site.social.instagram, site.social.facebook],
  };
}
