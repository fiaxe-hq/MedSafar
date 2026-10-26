"use client";

import Link from "@/components/ui/Link";
import { useEffect, useRef, useState } from "react";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import type { Treatment } from "@/content/types";
import { fill, type Ui } from "@/content/ui";
import { Container } from "@/components/ui/Container";
import { SpecialityIcon } from "@/components/ui/SpecialityIcon";
import { TreatmentCard } from "./TreatmentCard";
import { BackToBody } from "./TreatmentFinder";

export type BrowseGroup = { slug: string; name: string; treatments: Treatment[] };

/**
 * Every treatment, one type at a time: the types on the left in everyday
 * words, the treatments of the chosen one on the right. All groups are in the
 * page; only the chosen one shows. Each group answers to its speciality slug
 * in the address, so menu links like /treatments#cardiology open it.
 */
export function TreatmentBrowser({
  groups,
  total,
  more,
  text,
  plainSpeciality,
  back,
}: {
  groups: BrowseGroup[];
  text: Ui["browser"];
  plainSpeciality: Record<string, string>;
  /** Label for the link back up to the body. */
  back: string;
  total: number;
  /** Label for the link to the speciality page, or null while it is hidden. */
  more: string | null;
}) {
  const [on, setOn] = useState(groups[0]?.slug);
  const list = useRef<HTMLDivElement>(null);

  const choose = (slug: string, scroll: boolean) => {
    setOn(slug);
    if (scroll) requestAnimationFrame(() => list.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  useEffect(() => {
    const fromHash = () => {
      const slug = decodeURIComponent(window.location.hash.slice(1));
      if (groups.some((g) => g.slug === slug)) choose(slug, true);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="all" className="border-t border-hairline py-14 sm:py-16">
      <Container>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-accent">{text.know}</p>
            <h2 className="mt-1 font-display text-2xl font-semibold tracking-[-0.02em] text-balance sm:text-[1.75rem]">
              {text.heading}
            </h2>
            <p className="mt-2 max-w-[56ch] text-base text-ink-2">
              {fill(text.count, { total, groups: groups.length })}
            </p>
          </div>
          <BackToBody label={back} />
        </div>

        <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-12 lg:gap-10">
          {/* Types: a row of chips under the header on a phone, a list beside
              the treatments on a laptop. */}
          <nav
            aria-label={text.label}
            className="sticky top-16 z-20 -mx-5 min-w-0 border-y border-hairline bg-bg/90 backdrop-blur-md sm:-mx-8 lg:top-24 lg:mx-0 lg:self-start lg:border-0 lg:bg-transparent lg:backdrop-blur-none lg:col-span-4 xl:col-span-3"
          >
            <ul className="flex gap-2 overflow-x-auto px-5 py-3 [scrollbar-width:none] sm:px-8 lg:flex-col lg:gap-1 lg:overflow-visible lg:p-0">
              {groups.map((g) => {
                const active = g.slug === on;
                return (
                  <li key={g.slug} className="shrink-0">
                    <button
                      onClick={() => choose(g.slug, window.matchMedia("(max-width: 1023px)").matches)}
                      aria-pressed={active}
                      className={`flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-full border px-4 text-start text-sm font-medium whitespace-nowrap transition-[background-color,border-color,color] duration-300 ease-(--ease-soft) lg:rounded-lg lg:py-2.5 lg:whitespace-normal ${
                        active
                          ? "border-deep bg-deep text-white"
                          : "border-hairline bg-surface text-ink-2 hover:border-line hover:bg-accent-quiet hover:text-ink lg:border-transparent lg:bg-transparent"
                      }`}
                    >
                      <SpecialityIcon slug={g.slug} size={18} className={active ? "text-glow" : "text-accent"} aria-hidden />
                      <span className="flex-1">{plainSpeciality[g.slug] ?? g.name}</span>
                      <span
                        className={`hidden rounded-full px-2 py-0.5 text-xs tabular-nums lg:inline ${
                          active ? "bg-white/15 text-white" : "bg-surface-2 text-ink-3"
                        }`}
                      >
                        {g.treatments.length}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div ref={list} className="min-w-0 scroll-mt-12 lg:col-span-8 xl:col-span-9">
            {groups.map((g) => (
              <div key={g.slug} id={g.slug} hidden={g.slug !== on} className="scroll-mt-12">
                <div className="finder-in flex flex-wrap items-center gap-4 rounded-[1.5rem] bg-surface-2 p-5 ring-1 ring-hairline sm:p-6">
                  <span className="grid size-14 shrink-0 place-items-center rounded-md bg-accent text-accent-ink">
                    <SpecialityIcon slug={g.slug} size={28} weight="light" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-2xl font-semibold tracking-[-0.02em]">
                      {plainSpeciality[g.slug] ?? g.name}
                    </h3>
                    <p className="mt-0.5 text-base text-ink-3">
                      {g.name} · {g.treatments.length} {g.treatments.length === 1 ? "treatment" : "treatments"}
                    </p>
                  </div>
                  {more ? (
                    <Link
                      href={`/specialities/${g.slug}`}
                      className="group inline-flex min-h-11 items-center gap-2 text-base font-medium text-accent transition-colors hover:text-accent-hover"
                    >
                      {more}
                      <ArrowRightIcon
                        size={16}
                        className="transition-[translate] duration-300 group-hover:translate-x-1 rtl:rotate-180"
                        aria-hidden
                      />
                    </Link>
                  ) : null}
                </div>
                <ul className="mt-5 grid gap-5 sm:grid-cols-2">
                  {g.treatments.map((t) => (
                    <li key={t.slug} className="min-w-0">
                      <TreatmentCard treatment={t} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
