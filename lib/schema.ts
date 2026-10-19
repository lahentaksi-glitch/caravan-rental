import { rentalProducts } from "@/data/rentals";
import { site, siteUrl } from "@/data/site";

export function localBusinessJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "AutoRental"],
    "@id": `${siteUrl}/#business`,
    name: site.name,
    legalName: site.legalName,
    alternateName: [
      site.partnerName,
      site.ownerName,
      site.legalName,
      "Paljun vuokraus Lahti",
      "Paljuvuokraus Pertunmaa",
      "Kärrypalju vuokraus Päijät-Häme",
    ],
    taxID: site.businessId,
    vatID: site.businessId,
    description: site.metaDescription,
    url: siteUrl,
    image: `${siteUrl}${site.ogImage}`,
    logo: `${siteUrl}${site.logos.caravan}`,
    telephone: site.phone,
    email: site.email,
    priceRange: "€59–€140",
    currenciesAccepted: "EUR",
    paymentAccepted: "Bank transfer, cash",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.locality,
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
      { "@type": "City", name: "Pertunmaa" },
      { "@type": "City", name: "Mäntyharju" },
      { "@type": "AdministrativeArea", name: "Päijät-Häme" },
    ],
    location: [
      {
        "@type": "Place",
        name: "Noutopiste Pertunmaa",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Penttilänpolku 161",
          postalCode: "19430",
          addressLocality: "Pertunmaa",
          addressRegion: "Päijät-Häme",
          addressCountry: "FI",
        },
      },
      {
        "@type": "Place",
        name: "Noutopiste Lahti",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lahti",
          addressRegion: "Päijät-Häme",
          addressCountry: "FI",
        },
        description: "Nouto Lahdesta sopimuksen mukaan.",
      },
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
        name:
          product.category === "caravan"
            ? "Asuntovaunun vuokraus Lahti"
            : "Paljun vuokraus Lahti",
        serviceType:
          product.category === "caravan"
            ? "Asuntovaunun vuokraus"
            : "Paljuvaunu- ja kärrypaljun vuokraus",
        areaServed: [
          { "@type": "City", name: "Lahti" },
          { "@type": "City", name: "Pertunmaa" },
          { "@type": "AdministrativeArea", name: "Päijät-Häme" },
        ],
      },
    })),
    sameAs: [site.social.instagram, site.social.facebook],
  };
}
