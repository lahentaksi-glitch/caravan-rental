import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollToHash } from "@/components/layout/scroll-to-hash";
import { AnalyticsScripts } from "@/components/analytics/analytics-scripts";
import { site, siteKeywords, siteUrl } from "@/data/site";
import { localBusinessJsonLd } from "@/lib/schema";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} · ${site.partnerName}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [...siteKeywords],
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  icons: {
    icon: site.logos.icon,
  },
  openGraph: {
    type: "website",
    locale: "fi_FI",
    siteName: `${site.name} · ${site.partnerName}`,
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 800,
        alt: site.tagline,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = localBusinessJsonLd();

  return (
    <html
      lang="fi"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ScrollToHash />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <AnalyticsScripts />
        <SpeedInsights />
      </body>
    </html>
  );
}
