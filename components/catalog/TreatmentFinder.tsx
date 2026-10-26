"use client";

import Link from "@/components/ui/Link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { localPath } from "@/lib/i18n/languages";
import { ArrowDownIcon } from "@phosphor-icons/react/dist/ssr/ArrowDown";
import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr/CaretDown";
import { ChatCircleTextIcon } from "@phosphor-icons/react/dist/ssr/ChatCircleText";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { ArrowUpIcon } from "@phosphor-icons/react/dist/ssr/ArrowUp";
import { ArrowsClockwiseIcon } from "@phosphor-icons/react/dist/ssr/ArrowsClockwise";
import { CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle";
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";
import { QuestionIcon } from "@phosphor-icons/react/dist/ssr/Question";
import { HandPointingIcon } from "@phosphor-icons/react/dist/ssr/HandPointing";
import { XIcon } from "@phosphor-icons/react/dist/ssr/X";
import { searchWords, type BodyArea } from "@/data/bodyMap";
import { fill, type Ui } from "@/content/ui";
import { Body3D, type Sex } from "./Body3D";
import { SpecialityIcon } from "@/components/ui/SpecialityIcon";
import { btnPrimary, field } from "@/components/ui/styles";
import { contactHref, saveIssue } from "@/lib/enquiryMemory";

export type FinderTreatment = { slug: string; name: string; speciality: string; summary: string };

/** The finder's words and body map, in the page's language. */
export type FinderText = {
  text: Ui["finder"];
  bodyAreas: BodyArea[];
  wholeBody: BodyArea[];
  plainSpeciality: Record<string, string>;
};

/* ------------------------------------------------------------------ */
/* Hero: "Yes, I know the name"                                        */
/* ------------------------------------------------------------------ */

function useSearch(treatments: FinderTreatment[], q: string, plainSpeciality: Record<string, string>) {
  return useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter((w) => w.length > 1);
    if (!words.length) return null;
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
  }, [treatments, q, plainSpeciality]);
}

/** Search by the medical name or in everyday words. Results open under the box. */
export function FinderSearch({
  treatments,
  types,
  base = "",
  words,
}: {
  treatments: FinderTreatment[];
  types: string[];
  words: FinderText;
  /** Where the speciality lists live, when the finder sits on another page. */
  base?: string;
}) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const { text, plainSpeciality } = words;
  const results = useSearch(treatments, q, plainSpeciality);

  useEffect(() => {
    const away = (e: PointerEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", away);
    return () => document.removeEventListener("pointerdown", away);
  }, []);

  const show = open && results !== null;

  return (
    <div className="relative z-20 flex h-full flex-col rounded-[1.5rem] bg-surface p-5 shadow-card ring-1 ring-hairline sm:p-7">
      <p className="inline-flex w-fit items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent">
        <CheckCircleIcon size={16} weight="fill" aria-hidden />
        {text.know}
      </p>
      <h2 className="mt-4 font-display text-2xl font-semibold tracking-[-0.02em]">{text.searchHeading}</h2>
      <p className="mt-1 text-base text-ink-2">{text.searchIntro}</p>

      <div ref={box} className="relative mt-5" onKeyDown={(e) => e.key === "Escape" && setOpen(false)}>
        <label className="relative block">
          <span className="sr-only">{text.searchLabel}</span>
          <MagnifyingGlassIcon
            size={20}
            className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-ink-3"
            aria-hidden
          />
          <input
            type="search"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder={text.searchPlaceholder}
            className={`${field} ps-12 text-lg`}
          />
        </label>

        {show ? (
          <div
            aria-live="polite"
            className="finder-in absolute inset-x-0 top-full z-30 mt-2 max-h-[min(26rem,60svh)] overflow-y-auto rounded-lg bg-surface p-2 shadow-lift ring-1 ring-hairline"
          >
            {results.length ? (
              <>
                <p className="px-3 pt-2 pb-1 text-sm text-ink-3">
                  {results.length === 1 ? text.matchOne : fill(text.matchMany, { n: results.length })}
                </p>
                <ul>
                  {results.map((t) => (
                    <li key={t.slug}>
                      <Link
                        href={`/treatments/${t.slug}`}
                        className="group flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-accent-quiet"
                      >
                        <span className="grid size-9 shrink-0 place-items-center rounded-md bg-accent-soft text-accent">
                          <SpecialityIcon slug={t.speciality} size={18} aria-hidden />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-medium text-ink group-hover:text-accent">{t.name}</span>
                          <span className="block truncate text-sm text-ink-3">
                            {plainSpeciality[t.speciality] ?? t.speciality}
                          </span>
                        </span>
                        <ArrowRightIcon size={16} className="shrink-0 text-ink-3 rtl:rotate-180" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="p-3 text-base text-ink-2">
                {fill(text.noMatch, { q })}{" "}
                <a href="#body" className="font-medium text-accent underline underline-offset-2">
                  {text.noMatchLink}
                </a>{" "}
                {text.noMatchEnd}
              </p>
            )}
          </div>
        ) : null}
      </div>

      <p className="mt-5 text-sm font-medium text-ink-3">{text.popular}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {text.suggestions.map((s) => (
          <button
            key={s}
            onClick={() => {
              setQ(s);
              setOpen(true);
            }}
            className="inline-flex min-h-9 cursor-pointer items-center rounded-full border border-hairline bg-surface px-4 text-sm text-ink-2 transition-colors hover:border-line hover:bg-accent-quiet hover:text-ink"
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mt-auto pt-7">
        <div className="border-t border-hairline pt-5">
          <p className="text-sm font-medium text-ink-3">{text.browse}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {types.map((slug, i) => (
              <li key={slug} className={i > 2 ? "hidden sm:block" : ""}>
                <a
                  href={`${base}#${slug}`}
                  className="flex min-h-10 items-center gap-2 rounded-full bg-surface-2 px-4 text-sm font-medium text-ink-2 ring-1 ring-hairline transition-[background-color,color] duration-300 hover:bg-accent-quiet hover:text-ink"
                >
                  <SpecialityIcon slug={slug} size={18} className="shrink-0 text-accent" aria-hidden />
                  {plainSpeciality[slug] ?? slug}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`${base}#all`}
                className="group flex min-h-10 items-center justify-center gap-2 rounded-full px-4 text-sm font-medium text-accent ring-1 ring-accent/30 transition-colors hover:bg-accent-quiet"
              >
                {fill(text.allTypes, { n: types.length })}
                <ArrowDownIcon size={14} className="transition-[translate] duration-300 group-hover:translate-y-0.5" aria-hidden />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero: "No, I'm not sure"                                            */
/* ------------------------------------------------------------------ */

/**
 * The way in for people who do not know the name: a body in 3D to tap. A tap
 * opens a pop-up with the treatments for that part, and from there one button
 * takes the problem to the contact form.
 */
export function BodyPicker({ treatments, words }: { treatments: FinderTreatment[]; words: FinderText }) {
  const { text, bodyAreas, wholeBody } = words;
  const allAreas = [...bodyAreas, ...wholeBody];
  const bySlug = useMemo(() => new Map(treatments.map((t) => [t.slug, t])), [treatments]);
  const [sex, setSex] = useState<Sex>("female");
  const [turn, setTurn] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  const area = allAreas.find((a) => a.id === picked) ?? null;

  const pick = (id: string) => {
    setPicked(id);
    dialog.current?.showModal();
  };

  return (
    <div id="body" className="flex h-full scroll-mt-24 flex-col rounded-[1.5rem] bg-surface shadow-card ring-1 ring-hairline">
      <div className="p-5 pb-0 sm:p-7 sm:pb-0">
        <p className="inline-flex w-fit items-center gap-2 rounded-full bg-deep px-3 py-1 text-sm font-medium text-glow">
          <QuestionIcon size={16} weight="fill" aria-hidden />
          {text.notSure}
        </p>
        <h2 className="mt-4 font-display text-2xl font-semibold tracking-[-0.02em]">{text.bodyHeading}</h2>
        <p className="mt-1 text-base text-ink-2">{text.bodyIntro}</p>
      </div>

      <div className="relative mx-3 mt-4 flex grow flex-col overflow-hidden rounded-[1.25rem] bg-[radial-gradient(28rem_22rem_at_50%_35%,rgb(94_224_189/0.22),transparent_70%)] bg-surface-2 ring-1 ring-hairline sm:mx-4">
        <div className="relative z-10 flex items-center justify-between gap-3 p-3">
          <div className="inline-flex rounded-full bg-surface p-1 ring-1 ring-hairline" role="radiogroup" aria-label={text.bodyLabel}>
            {(["female", "male"] as Sex[]).map((s) => (
              <button
                key={s}
                role="radio"
                aria-checked={sex === s}
                onClick={() => setSex(s)}
                className={`min-h-9 cursor-pointer rounded-full px-4 text-sm font-medium transition-colors duration-300 ${
                  sex === s ? "bg-deep text-white" : "text-ink-2 hover:text-ink"
                }`}
              >
                {text[s]}
              </button>
            ))}
          </div>
          <button
            onClick={() => setTurn((t) => t + 1)}
            className="inline-flex min-h-9 cursor-pointer items-center gap-2 rounded-full bg-surface px-4 text-sm font-medium whitespace-nowrap text-ink-2 ring-1 ring-hairline transition-colors hover:text-ink"
          >
            <ArrowsClockwiseIcon size={16} aria-hidden />
            {text.turn}
          </button>
        </div>

        <div className="relative h-[380px] w-full shrink-0 grow select-none sm:h-[440px]">
          <div
            aria-hidden
            className="absolute bottom-4 left-1/2 h-4 w-36 -translate-x-1/2 rounded-[50%] bg-ink/10 blur-[6px]"
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
          {/* Name of the part under the pointer. */}
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-x-0 bottom-2 mx-auto w-fit rounded-full bg-deep px-3 py-1.5 text-sm font-medium text-white transition-[opacity,translate] duration-300 ${
              hover && !dragging ? "opacity-100" : "translate-y-1 opacity-0"
            }`}
          >
            {allAreas.find((a) => a.id === hover)?.name ?? " "}
          </div>
        </div>

        <p className="flex items-center justify-center gap-2 border-t border-hairline px-4 py-2.5 text-sm text-ink-3">
          <HandPointingIcon size={16} aria-hidden />
          {text.tapHint}
        </p>
      </div>

      {/* Problems the figure can't show, and a plain list for anyone who
          would rather not use the figure. */}
      <div className="flex flex-wrap items-center gap-2 p-5 sm:px-7">
        <span className="text-sm font-medium text-ink-3">{text.notOnePlace}</span>
        {wholeBody.map((a) => (
          <button
            key={a.id}
            onClick={() => pick(a.id)}
            className="inline-flex min-h-9 cursor-pointer items-center rounded-full border border-hairline bg-surface px-4 text-sm font-medium text-ink-2 transition-colors hover:border-line hover:bg-accent-quiet hover:text-ink"
          >
            {a.name}
          </button>
        ))}
        <label className="relative ms-auto">
          <span className="sr-only">{text.listLabel}</span>
          <select
            value=""
            onChange={(e) => e.target.value && pick(e.target.value)}
            className="min-h-9 cursor-pointer appearance-none rounded-full border border-hairline bg-surface ps-4 pe-9 text-sm text-ink-2 transition-colors hover:border-line"
          >
            <option value="">{text.listPlaceholder}</option>
            {bodyAreas.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
          <CaretDownIcon size={14} className="pointer-events-none absolute end-3.5 top-1/2 -translate-y-1/2 text-ink-3" aria-hidden />
        </label>
      </div>

      <dialog
        ref={dialog}
        aria-labelledby="area-heading"
        onClose={() => setPicked(null)}
        // A click on the backdrop lands on the dialog itself, not its panel.
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
        className="consultation-dialog m-auto mb-0 max-h-[calc(100dvh-1rem)] w-full max-w-xl overflow-hidden rounded-t-xl border border-hairline bg-surface p-0 text-ink shadow-lift sm:mb-auto sm:max-h-[calc(100dvh-4rem)] sm:w-[calc(100%-2rem)] sm:rounded-xl"
      >
        {area ? <AreaSheet key={area.id} area={area} bySlug={bySlug} text={text} onClose={() => dialog.current?.close()} /> : null}
      </dialog>
    </div>
  );
}

/** Inside the pop-up: what this part can need, and a way to ask about it. */
function AreaSheet({
  area,
  bySlug,
  text,
  onClose,
}: {
  area: BodyArea;
  bySlug: Map<string, FinderTreatment>;
  text: Ui["finder"];
  onClose: () => void;
}) {
  const list = area.treatments.map((s) => bySlug.get(s)).filter((t): t is FinderTreatment => Boolean(t));
  // "" means not sure: a doctor will advise.
  const [choice, setChoice] = useState("");
  const chosen = list.find((t) => t.slug === choice);
  const issue = { area: area.name, treatment: chosen?.name };
  const { lang = "en" } = useParams<{ lang?: string }>();

  const option =
    "flex cursor-pointer items-start gap-3 rounded-lg border border-hairline p-4 transition-[background-color,border-color] duration-300 hover:bg-surface-2 has-checked:border-accent has-checked:bg-accent-quiet";

  return (
    <div className="flex max-h-[inherit] flex-col">
      {/* Title and close stay put; everything under them scrolls as one, so
          a swipe anywhere in the sheet moves it, even on a short phone. */}
      <div className="flex items-center justify-between gap-4 border-b border-hairline px-5 py-3 sm:px-6 sm:py-4">
        <h2 id="area-heading" className="font-display text-2xl font-semibold tracking-[-0.02em]">
          {area.name}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-md text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
        >
          <XIcon size={20} aria-hidden />
          <span className="sr-only">{text.close}</span>
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div className="px-5 pt-5 sm:px-6 sm:pt-6">
          <p className="text-sm font-medium text-accent">
            {list.length === 1 ? text.treatmentOne : fill(text.treatmentMany, { n: list.length })}
          </p>
          <p className="mt-1 text-base text-ink-2">{area.hint}</p>
        </div>

        <fieldset className="p-5 sm:p-6">
          <legend className="sr-only">{text.which}</legend>
          <p className="text-base font-medium text-ink">{text.which}</p>
          <ul className="mt-3 grid gap-2">
            {list.map((t) => (
              <li key={t.slug}>
                <label className={option}>
                  <input
                    type="radio"
                    name="area-treatment"
                    value={t.slug}
                    checked={choice === t.slug}
                    onChange={() => setChoice(t.slug)}
                    className="mt-1 size-4 shrink-0 accent-accent"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-ink">{t.name}</span>
                    <span className="mt-0.5 block text-sm text-ink-2">{t.summary}</span>
                    <Link
                      href={`/treatments/${t.slug}`}
                      className="mt-1.5 inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-hover"
                    >
                      {text.readMore}
                      <ArrowRightIcon size={14} className="rtl:rotate-180" aria-hidden />
                    </Link>
                  </span>
                </label>
              </li>
            ))}
            <li>
              <label className={option}>
                <input
                  type="radio"
                  name="area-treatment"
                  value=""
                  checked={choice === ""}
                  onChange={() => setChoice("")}
                  className="mt-1 size-4 shrink-0 accent-accent"
                />
                <span>
                  <span className="block font-semibold text-ink">{text.unsure}</span>
                  <span className="mt-0.5 block text-sm text-ink-2">{text.unsureBody}</span>
                </span>
              </label>
            </li>
          </ul>
        </fieldset>
      </div>

      <div className="border-t border-hairline bg-surface-2 p-5 sm:p-6">
        <a href={localPath(lang, contactHref(issue))} onClick={() => saveIssue(issue)} className={`${btnPrimary} w-full`}>
          <ChatCircleTextIcon size={20} aria-hidden />
          {chosen ? fill(text.askAbout, { name: chosen.name }) : text.askProblem}
        </a>
        <p className="mt-2 text-center text-sm text-ink-3">{text.askNote}</p>
      </div>
    </div>
  );
}

/** Link back up to the body, for the browse section. */
export function BackToBody({ label }: { label: string }) {
  return (
    <a
      href="#body"
      className="group inline-flex min-h-11 shrink-0 items-center gap-2 text-base font-medium text-accent transition-colors hover:text-accent-hover"
    >
      {label}
      <ArrowUpIcon size={16} className="transition-[translate] duration-300 group-hover:-translate-y-0.5" aria-hidden />
    </a>
  );
}
