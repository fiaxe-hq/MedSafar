"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { ArrowsClockwiseIcon } from "@phosphor-icons/react/dist/ssr/ArrowsClockwise";
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";
import { PersonIcon } from "@phosphor-icons/react/dist/ssr/Person";
import { SquaresFourIcon } from "@phosphor-icons/react/dist/ssr/SquaresFour";
import { HandPointingIcon } from "@phosphor-icons/react/dist/ssr/HandPointing";
import { XIcon } from "@phosphor-icons/react/dist/ssr/X";
import { bodyAreas, plainSpeciality, searchWords, wholeBody, type BodyArea } from "@/data/bodyMap";
import { Container } from "@/components/ui/Container";
import { Body3D, type Sex } from "./Body3D";
import { SpecialityIcon } from "@/components/ui/SpecialityIcon";
import { field } from "@/components/ui/styles";

export type FinderTreatment = { slug: string; name: string; speciality: string; summary: string };

type Mode = "body" | "search" | "browse";

const allAreas = [...bodyAreas, ...wholeBody];

/**
 * Three ways to find a treatment without knowing its medical name: point at
 * the body, type in everyday words, or browse plain-language groups.
 */
export function TreatmentFinder({ treatments }: { treatments: FinderTreatment[] }) {
  const [mode, setMode] = useState<Mode>("body");
  const bySlug = useMemo(() => new Map(treatments.map((t) => [t.slug, t])), [treatments]);

  const modes: { id: Mode; label: string; Icon: typeof PersonIcon }[] = [
    { id: "body", label: "Point on the body", Icon: PersonIcon },
    { id: "search", label: "Search", Icon: MagnifyingGlassIcon },
    { id: "browse", label: "Browse by type", Icon: SquaresFourIcon },
  ];

  return (
    <section id="find" className="scroll-mt-20 pb-14 sm:pb-16">
      <Container>
        <div className="flex flex-col gap-6 border-t border-hairline pt-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-balance sm:text-[1.75rem]">Not sure what it is called?</h2>
            <p className="mt-2 max-w-[56ch] text-base text-ink-2">
              Show us where it hurts, or describe it in your own words. We will point you to the treatments that
              fit, in plain language.
            </p>
          </div>
          <div
            role="tablist"
            aria-label="How to find a treatment"
            className="inline-flex w-full rounded-lg bg-surface p-1 ring-1 ring-hairline sm:w-auto"
          >
            {modes.map(({ id, label, Icon }) => {
              const on = mode === id;
              return (
                <button
                  key={id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setMode(id)}
                  className={`inline-flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-md px-3 text-sm font-medium whitespace-nowrap transition-[background-color,color] duration-300 ease-(--ease-soft) sm:flex-none sm:px-4 ${
                    on ? "bg-deep text-white" : "text-ink-2 hover:bg-accent-quiet hover:text-ink"
                  }`}
                >
                  <Icon size={16} weight={on ? "fill" : "regular"} className={on ? "text-glow" : ""} aria-hidden />
                  <span className={id === "body" ? "" : ""}>{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6">
          {mode === "body" ? <BodyMode bySlug={bySlug} /> : null}
          {mode === "search" ? <SearchMode treatments={treatments} /> : null}
          {mode === "browse" ? <BrowseMode treatments={treatments} /> : null}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Body                                                                */
/* ------------------------------------------------------------------ */

function BodyMode({ bySlug }: { bySlug: Map<string, FinderTreatment> }) {
  const [sex, setSex] = useState<Sex>("female");
  const [turn, setTurn] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const panel = useRef<HTMLDivElement>(null);

  const area = allAreas.find((a) => a.id === picked) ?? null;

  const pick = (id: string) => {
    setPicked((p) => (p === id ? null : id));
    // On a phone the panel sits under the figure: bring it into view.
    if (window.matchMedia("(max-width: 1023px)").matches) {
      requestAnimationFrame(() => panel.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  };

  return (
    // On a laptop the figure and the panel share one fixed height that fits
    // the screen under the header and the section heading; the panel scrolls
    // inside itself.
    <div className="grid gap-6 lg:h-[clamp(28rem,calc(100svh-16.5rem),42rem)] lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-5 lg:h-full lg:min-h-0 xl:col-span-4">
        <div className="relative flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-surface ring-1 ring-hairline">
          {/* Controls */}
          <div className="relative z-10 flex items-center justify-between gap-3 p-3">
            <div className="inline-flex rounded-full bg-surface-2 p-1 ring-1 ring-hairline" role="radiogroup" aria-label="Body">
              {(["female", "male"] as Sex[]).map((s) => (
                <button
                  key={s}
                  role="radio"
                  aria-checked={sex === s}
                  onClick={() => setSex(s)}
                  className={`min-h-9 cursor-pointer rounded-full px-4 text-sm font-medium capitalize transition-colors duration-300 ${
                    sex === s ? "bg-deep text-white" : "text-ink-2 hover:text-ink"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <button
              onClick={() => setTurn((t) => t + 1)}
              className="inline-flex min-h-9 cursor-pointer items-center gap-2 rounded-full bg-surface-2 px-4 text-sm font-medium text-ink-2 ring-1 ring-hairline transition-colors hover:text-ink"
            >
              <ArrowsClockwiseIcon size={16} aria-hidden />
              Turn around
            </button>
          </div>

          {/* Stage */}
          <div className="relative h-[420px] w-full select-none sm:h-[480px] lg:h-auto lg:min-h-0 lg:flex-1">
            <div
              aria-hidden
              className="absolute inset-x-0 top-6 mx-auto size-72 rounded-full bg-[radial-gradient(circle,rgb(94_224_189/0.28),transparent_65%)]"
            />
            <div
              aria-hidden
              className="absolute bottom-5 left-1/2 h-4 w-36 -translate-x-1/2 rounded-[50%] bg-ink/10 blur-[6px]"
            />
            <Body3D
              sex={sex}
              hover={hover}
              picked={picked}
              turn={turn}
              onHover={setHover}
              onPick={pick}
              onDragging={setDragging}
            />

            {/* Label for the part under the pointer. */}
            <div
              aria-hidden
              className={`pointer-events-none absolute inset-x-0 bottom-1 mx-auto w-fit rounded-full bg-deep px-3 py-1.5 text-sm font-medium text-white transition-[opacity,translate] duration-300 ${
                hover && !dragging ? "opacity-100" : "translate-y-1 opacity-0"
              }`}
            >
              {allAreas.find((a) => a.id === hover)?.name ?? " "}
            </div>
          </div>

          <p className="flex items-center justify-center gap-2 border-t border-hairline px-4 py-3 text-sm text-ink-3">
            <HandPointingIcon size={16} aria-hidden />
            Tap a part. Drag to turn.
          </p>
        </div>

      </div>

      <div
        ref={panel}
        className="scroll-mt-24 overflow-y-auto rounded-[1.5rem] bg-surface ring-1 ring-hairline lg:col-span-7 lg:h-full xl:col-span-8"
        aria-live="polite"
      >
        {area ? (
          <AreaPanel area={area} bySlug={bySlug} onClose={() => setPicked(null)} />
        ) : (
          <div className="p-5 sm:p-7">
            <div className="flex items-start gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                <HandPointingIcon size={22} aria-hidden />
              </span>
              <div>
                <p className="font-display text-xl font-semibold">Where is the problem?</p>
                <p className="mt-1 max-w-[52ch] text-base text-ink-3">
                  Tap that part of the body, or pick it below. You will see the treatments for it, each explained in a
                  sentence or two.
                </p>
              </div>
            </div>
            <p className="mt-7 text-sm font-medium text-ink-3">Body parts</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {bodyAreas.map((a) => (
                <AreaChip key={a.id} area={a} on={picked === a.id} onClick={() => pick(a.id)} small />
              ))}
            </div>
            <p className="mt-6 text-sm font-medium text-ink-3">Not in one place?</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {wholeBody.map((a) => (
                <AreaChip key={a.id} area={a} on={picked === a.id} onClick={() => pick(a.id)} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AreaChip({ area, on, onClick, small }: { area: BodyArea; on: boolean; onClick: () => void; small?: boolean }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={on}
      className={`inline-flex cursor-pointer items-center rounded-full border px-4 text-sm transition-[background-color,border-color,color] duration-300 ease-(--ease-soft) ${
        small ? "min-h-9" : "min-h-11 font-medium"
      } ${on ? "border-deep bg-deep text-white" : "border-hairline bg-surface text-ink-2 hover:border-line hover:bg-accent-quiet hover:text-ink"}`}
    >
      {area.name}
    </button>
  );
}

function AreaPanel({
  area,
  bySlug,
  onClose,
}: {
  area: BodyArea;
  bySlug: Map<string, FinderTreatment>;
  onClose: () => void;
}) {
  const list = area.treatments.map((s) => bySlug.get(s)).filter((t): t is FinderTreatment => Boolean(t));
  return (
    <div key={area.id} className="finder-in p-5 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-accent">
            {list.length} {list.length === 1 ? "treatment" : "treatments"}
          </p>
          <h3 className="mt-1 font-display text-2xl font-semibold tracking-[-0.02em]">{area.name}</h3>
          <p className="mt-2 max-w-[56ch] text-base text-ink-2">{area.hint}</p>
        </div>
        <button
          onClick={onClose}
          aria-label="Clear"
          className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full text-ink-3 ring-1 ring-hairline transition-colors hover:bg-accent-quiet hover:text-ink"
        >
          <XIcon size={16} aria-hidden />
        </button>
      </div>
      <ul className="mt-6 grid gap-3">
        {list.map((t, i) => (
          <li key={t.slug} className="finder-in" style={{ animationDelay: `${60 + i * 50}ms` }}>
            <ResultRow treatment={t} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function ResultRow({ treatment: t }: { treatment: FinderTreatment }) {
  return (
    <Link
      href={`/treatments/${t.slug}`}
      className="group flex gap-4 rounded-lg border border-hairline bg-surface p-4 transition-[border-color,background-color] duration-300 ease-(--ease-soft) hover:border-line hover:bg-surface-2 sm:p-5"
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-md bg-accent-soft text-accent">
        <SpecialityIcon slug={t.speciality} size={20} aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-medium tracking-wide text-ink-3 uppercase">
          {plainSpeciality[t.speciality] ?? t.speciality}
        </span>
        <span className="mt-0.5 block text-lg font-semibold tracking-[-0.01em] text-ink transition-colors group-hover:text-accent">
          {t.name}
        </span>
        <span className="mt-1 block text-sm text-ink-2">{t.summary}</span>
      </span>
      <ArrowRightIcon
        size={18}
        className="mt-1 shrink-0 text-ink-3 transition-[translate,color] duration-300 group-hover:translate-x-1 group-hover:text-accent rtl:rotate-180"
        aria-hidden
      />
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Search                                                              */
/* ------------------------------------------------------------------ */

const suggestions = ["Knee pain", "Back pain", "Heart", "Cancer", "Having a baby", "Weight loss", "Kidney", "Hair"];

function SearchMode({ treatments }: { treatments: FinderTreatment[] }) {
  const [q, setQ] = useState("");
  const words = q.toLowerCase().split(/\s+/).filter((w) => w.length > 1);

  const results = useMemo(() => {
    if (!words.length) return [];
    const scored = treatments.map((t) => {
        const hay = `${t.name} ${t.summary} ${plainSpeciality[t.speciality] ?? ""} ${searchWords[t.slug] ?? ""}`.toLowerCase();
        const hits = words.filter((w) => hay.includes(w)).length;
        const score = hits + words.filter((w) => t.name.toLowerCase().includes(w)).length * 2;
        return { t, hits, score };
      });
    // Matches for every word come first; the rest only if there are none.
    const best = Math.max(0, ...scored.map((r) => r.hits));
    return scored
      .filter((r) => r.hits > 0 && (best < words.length || r.hits === words.length))
      .sort((x, y) => y.score - x.score)
      .map((r) => r.t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, treatments]);

  return (
    <div className="mx-auto max-w-3xl">
      <label className="relative block">
        <span className="sr-only">Search treatments</span>
        <MagnifyingGlassIcon size={20} className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-ink-3" aria-hidden />
        <input
          type="search"
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Describe it in your own words, for example “knee pain”"
          className={`${field} ps-12 text-lg`}
        />
      </label>
      <div className="mt-4 flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => setQ(s)}
            className="inline-flex min-h-9 cursor-pointer items-center rounded-full border border-hairline bg-surface px-4 text-sm text-ink-2 transition-colors hover:border-line hover:bg-accent-quiet hover:text-ink"
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mt-8" aria-live="polite">
        {words.length ? (
          results.length ? (
            <>
              <p className="text-sm text-ink-3">
                {results.length} {results.length === 1 ? "match" : "matches"}
              </p>
              <ul className="mt-3 grid gap-3">
                {results.map((t, i) => (
                  <li key={t.slug} className="finder-in" style={{ animationDelay: `${i * 40}ms` }}>
                    <ResultRow treatment={t} />
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="rounded-lg border border-hairline bg-surface p-6 text-base text-ink-2">
              Nothing matches “{q}” yet. Try other words, or send us your reports and a specialist will tell you what fits.
            </p>
          )
        ) : null}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Browse                                                              */
/* ------------------------------------------------------------------ */

function BrowseMode({ treatments }: { treatments: FinderTreatment[] }) {
  const groups = Object.keys(plainSpeciality).filter((s) => treatments.some((t) => t.speciality === s));
  const [on, setOn] = useState(groups[0]);
  const list = treatments.filter((t) => t.speciality === on);

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:col-span-4 lg:grid-cols-1">
        {groups.map((s) => {
          const active = s === on;
          return (
            <li key={s}>
              <button
                onClick={() => setOn(s)}
                aria-pressed={active}
                className={`flex min-h-12 w-full cursor-pointer items-center gap-3 rounded-lg border px-4 py-2 text-start text-sm font-medium transition-[background-color,border-color,color] duration-300 ease-(--ease-soft) ${
                  active ? "border-deep bg-deep text-white" : "border-hairline bg-surface text-ink-2 hover:border-line hover:bg-accent-quiet hover:text-ink"
                }`}
              >
                <SpecialityIcon slug={s} size={18} className={active ? "text-glow" : "text-accent"} aria-hidden />
                {plainSpeciality[s]}
              </button>
            </li>
          );
        })}
      </ul>
      <ul key={on} className="grid content-start gap-3 lg:col-span-8">
        {list.map((t, i) => (
          <li key={t.slug} className="finder-in" style={{ animationDelay: `${i * 50}ms` }}>
            <ResultRow treatment={t} />
          </li>
        ))}
      </ul>
    </div>
  );
}
