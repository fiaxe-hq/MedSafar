import type { Metadata, Viewport } from "next";
import { Figtree, Noto_Sans } from "next/font/google";
import "./globals.css";
import { global } from "@/content/countries";
import { site } from "@/content/site";

/**
 * Noto Sans for reading, Figtree for headings: a clean, legible pair that
 * suits a medical service. Noto has an Arabic cut, Noto Sans Arabic, drawn to
 * match, so the body typeface does not change when the site is translated.
 * Both are variable fonts, and only the Latin subsets are loaded while the
 * site is English.
 */
const noto = Noto_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-noto",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin", "latin-ext"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  title: global.meta.title,
  description: global.meta.description,
  applicationName: site.brand.name,
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
    <html lang="en" dir="ltr" data-scroll-behavior="smooth" className={`${noto.variable} ${figtree.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col overflow-x-clip">{children}</body>
    </html>
  );
}
