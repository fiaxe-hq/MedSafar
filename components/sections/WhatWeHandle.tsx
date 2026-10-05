import type { CountryContent } from "@/content/types";
import { handledIcons } from "@/components/ui/HandledIcon";
import { Container } from "@/components/ui/Container";

/**
 * Bento on a deep green band: the first thing we handle gets the large cell,
 * the other four share the rest. Icons carry the cells; the copy is one line.
 */
const cells = [
  "sm:col-span-2 lg:col-span-6 lg:row-span-2",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-3",
];

export function WhatWeHandle({ content }: { content: CountryContent }) {
  const { handled } = content;

  return (
    <section id="what-we-handle" className="band-deep relative isolate scroll-mt-24 overflow-hidden py-16 text-white sm:py-24 lg:py-28">
      <Container>
        <div className="reveal max-w-3xl">
          <h2 className="display-2">{handled.heading}</h2>
          <p className="mt-5 max-w-[50ch] text-lg text-white/75">{handled.intro}</p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-12">
          {handled.items.map((item, i) => {
            const Glyph = handledIcons[item.icon];
            const lead = i === 0;
            return (
              <li
                key={item.title}
                className={`group reveal relative isolate flex flex-col overflow-hidden rounded-lg p-7 ring-1 ring-inset transition-[background-color,translate] duration-300 ease-(--ease-soft) hover:-translate-y-1 ${
                  lead
                    ? "justify-between bg-white text-ink ring-white sm:p-10"
                    : "bg-white/[0.06] ring-white/12 backdrop-blur-sm hover:bg-white/10"
                } ${cells[i]}`}
              >
                {lead ? (
                  <Glyph
                    size={260}
                    weight="thin"
                    aria-hidden
                    className="absolute -end-10 -top-10 -z-10 text-hairline transition-[rotate] duration-700 ease-(--ease-soft) group-hover:-rotate-6"
                  />
                ) : null}
                <span
                  className={`grid place-items-center rounded-md transition-[scale] duration-300 ease-(--ease-soft) group-hover:scale-110 ${
                    lead ? "size-16 bg-accent text-accent-ink" : "size-12 bg-glow/15 text-glow"
                  }`}
                >
                  <Glyph size={lead ? 30 : 22} aria-hidden />
                </span>
                <div className={lead ? "mt-16" : "mt-6"}>
                  <h3 className={`font-semibold tracking-[-0.02em] ${lead ? "text-3xl" : "text-xl"}`}>
                    {item.title}
                  </h3>
                  <p className={`mt-2 max-w-[40ch] ${lead ? "text-lg text-ink-2" : "text-sm text-white/70"}`}>
                    {item.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
