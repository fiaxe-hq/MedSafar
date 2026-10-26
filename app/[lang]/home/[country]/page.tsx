import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileBar } from "@/components/site/MobileBar";
import { HomeC } from "@/components/home/HomeC";
import { Motion } from "@/components/site/Motion";
import { Intro } from "@/components/site/Intro";
import { placeSlugs } from "@/content/places";
import { getLang } from "@/lib/i18n/text";
import { languageAlternates } from "@/lib/i18n/alternates";
import "@/components/site/motion.css";

/**
 * The home page, one copy per language and country. Visitors never see this
 * address: the proxy serves it at / (or /bn and the rest), picking the
 * country from the country picker or the visitor's IP address. The country
 * only changes the photo.
 */

export function generateStaticParams() {
  return placeSlugs.map((country) => ({ country }));
}

export const dynamicParams = false;

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return { alternates: languageAlternates("/", lang.code) };
}

export default async function Home({ params }: PageProps<"/[lang]/home/[country]">) {
  const { country } = await params;
  return (
    <div data-home>
      <Intro />
      <div aria-hidden className="home-progress" />
      <Header home="/" place={country} overlay />
      {/* Room at the foot of the page for the fixed bar on phones. */}
      <main className="w-full max-w-full overflow-x-clip pb-24 lg:pb-0">
        <HomeC place={country} />
      </main>
      <Footer home="/" />
      <MobileBar />
      <Motion />
    </div>
  );
}
