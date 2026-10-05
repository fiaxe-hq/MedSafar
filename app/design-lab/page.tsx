import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { LabMotion } from "./LabMotion";
import "./lab.css";
import { VariantA } from "./VariantA";
import { VariantB } from "./VariantB";
import { VariantC } from "./VariantC";
import { VariantD } from "./VariantD";

/** Temporary design lab for the home page. Deleted when the design is chosen. */
export const metadata: Metadata = {
  title: "Design lab",
  robots: { index: false, follow: false },
};

const variants = {
  A: { name: "Calm editorial", why: "Apple / Stripe. All light, centred headline, form right under it, lots of air.", View: VariantA },
  B: { name: "Warm & human", why: "Notion warmth. Sand tone beside the green, softer corners, split hero with a case-manager note.", View: VariantB },
  C: { name: "Precise & structured", why: "Linear / Stripe. Deep hero on a grid, numbered sections on hairlines.", View: VariantC },
  D: { name: "Bold & tactile", why: "Big tight type, tilted photo collage, stacking journey cards, photo bento, full-bleed close.", View: VariantD },
} as const;

type Key = keyof typeof variants;

export default async function DesignLab({ searchParams }: { searchParams: Promise<{ v?: string }> }) {
  const { v } = await searchParams;
  const key: Key = v === "B" || v === "C" || v === "D" ? v : "A";
  const { View } = variants[key];

  return (
    <div data-lab>
      <div aria-hidden className="lab-progress" />
      <Header home="/" iso={null} countryName="" />
      <main className="w-full max-w-full overflow-x-clip" data-variant={key}>
        <View />
      </main>
      <Footer home="/" />

      <nav
        aria-label="Design variants"
        className="fixed bottom-4 start-16 z-50 max-w-[calc(100vw-5rem)] rounded-xl bg-ink/95 p-2 text-white shadow-lift backdrop-blur sm:max-w-md lg:max-w-2xl"
      >
        <div className="flex gap-1">
          {(Object.keys(variants) as Key[]).map((k) => (
            <Link
              key={k}
              href={`/design-lab?v=${k}`}
              scroll
              aria-current={k === key ? "page" : undefined}
              className={`flex-1 rounded-lg px-3 py-2 text-center text-sm font-medium transition-colors ${
                k === key ? "bg-glow text-ink" : "text-white/80 hover:bg-white/10"
              }`}
            >
              {k}<span className="hidden lg:inline"> · {variants[k].name}</span>
            </Link>
          ))}
        </div>
        <p className="hidden px-2 pt-2 pb-1 text-xs leading-snug text-white/70 sm:block">{variants[key].why}</p>
      </nav>

      <LabMotion key={key} />
    </div>
  );
}
