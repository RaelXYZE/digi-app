import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { SITE } from "@/constants/site";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const title = `${SITE.name}: ${SITE.fullName}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.officialName, url: SITE.officialSite }],
  keywords: ["Komdigi", "balmon", "Kominfo", "kementerian", "komunikasi", "digital", "layanan publik", "Indonesia", "Jayapura"],
  icons: { icon: "/LogoBalmon.svg" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: SITE.name,
    title,
    description: SITE.description,
    url: "/",
  },
  twitter: {
    card: "summary",
    title,
    description: SITE.description,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#021e4e",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GovernmentOrganization",
  name: SITE.officialName,
  alternateName: SITE.name,
  url: SITE.officialSite,
  telephone: SITE.phone,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Tanjakan Ale-Ale",
    addressLocality: "Jayapura",
    postalCode: "99351",
    addressCountry: "ID",
  },
  sameAs: SITE.social.map((s) => s.url),
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const nonce = (await headers()).get("x-nonce") ?? "";

  return (
    <html lang="id" data-scroll-behavior="smooth">
        <body>
        <script
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <AnnouncementBar />
        <Header />
        <main id="main-content" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}