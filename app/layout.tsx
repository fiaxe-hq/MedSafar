import type { Metadata, Viewport } from "next";
import { Figtree, Inter } from "next/font/google";
import "./globals.css";
import { global } from "@/content/countries";
import { site } from "@/content/site";
import { jsonLd, organizationJsonLd, siteUrl } from "@/lib/seo";
import { analyticsToken } from "@/lib/analytics";

/**
 * Inter for reading, Figtree for headings: a clean, legible pair that
 * suits a medical service.
 * Only the Latin subsets are loaded while the site is English.
 */
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin", "latin-ext"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: global.meta.title,
  description: global.meta.description,
  applicationName: site.brand.name,
  openGraph: {
    type: "website",
    siteName: "Medsafar India",
    locale: "en",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
  colorScheme: "only light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  // dir is set here so switching a language later flips the whole layout.
  return (
    <html lang="en" dir="ltr" data-scroll-behavior="smooth" className={`${inter.variable} ${figtree.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col overflow-x-clip">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(organizationJsonLd) }}
        />
        {analyticsToken ? (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: analyticsToken })}
          />
        ) : null}
      </body>
    </html>
  );
}
