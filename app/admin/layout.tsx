import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "Medsafar admin",
  // No share image: the site's one in app/ would point at localhost here.
  openGraph: { images: [] },
  twitter: { images: [] },
  robots: { index: false, follow: false },
};

/** The admin panel has its own root layout: it is English only, outside the language routes. */
export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <div className="flex min-h-full flex-1 flex-col bg-surface-2">{children}</div>
      </body>
    </html>
  );
}
