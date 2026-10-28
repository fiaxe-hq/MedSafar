import { notFound } from "next/navigation";
import type { Metadata, Viewport } from "next";
import { Figtree, Inter } from "next/font/google";
import "../globals.css";
import { jsonLd, organizationJsonLd, siteUrl } from "@/lib/seo";
import { analyticsToken } from "@/lib/analytics";
import { getLang, getText } from "@/lib/i18n/text";
import { languageCodes, defaultLanguage } from "@/lib/i18n/languages";
import { LabelsProvider } from "@/components/site/Labels";

/**
 * Inter for reading, Figtree for headings: a clean, legible pair that
 * suits a medical service. Scripts they do not cover (Arabic, Bengali,
 * Georgian and the rest) fall back to the reader's system font for that script.
 */
const inter = Inter({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin", "latin-ext"],
  variable: "--font-figtree",
  display: "swap",
});

// Only English is built ahead: every language times every page is about
// 8,000 pages, too slow to build. Other languages render on first visit and
// are then cached.
export function generateStaticParams() {
  return [{ lang: defaultLanguage }];
}

export async function generateMetadata(): Promise<Metadata> {
  const [{ global, site }, lang] = await Promise.all([getText(), getLang()]);
  return {
    metadataBase: new URL(siteUrl),
    title: global.meta.title,
    description: global.meta.description,
    applicationName: site.brand.name,
    openGraph: {
      type: "website",
      siteName: "Medsafar India",
      locale: lang.code,
    },
    twitter: { card: "summary_large_image" },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
  colorScheme: "only light",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  // Only the languages in lib/i18n/languages.ts exist.
  if (!languageCodes.includes((await params).lang)) notFound();
  const [{ site, catalog }, lang] = await Promise.all([getText(), getLang()]);
  return (
    <html
      lang={lang.code}
      dir={lang.dir ?? "ltr"}
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${figtree.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-clip">
        <LabelsProvider value={{ pending: site.pendingLabel, photo: site.photoLabel, check: catalog.draft }}>{children}</LabelsProvider>
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
