"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import { ArrowsOutSimpleIcon } from "@phosphor-icons/react/dist/ssr/ArrowsOutSimple";
import { LockSimpleIcon } from "@phosphor-icons/react/dist/ssr/LockSimple";
import { XIcon } from "@phosphor-icons/react/dist/ssr/X";
import { saveDetails, saveNumber } from "@/app/actions";
import { formError } from "@/components/form/formError";
import { DialPicker } from "@/components/form/DialPicker";
import type { DialCode, FormContent } from "@/content/types";
import { btnPlain, btnPrimary, field, label } from "@/components/ui/styles";
import { showUpcoming } from "@/lib/preview";
import {
  describeIssue,
  readContact,
  readIssue,
  saveContact,
  saveIssue,
  type Contact,
  type Issue,
} from "@/lib/enquiryMemory";

/**
 * The enquiry form, used in the hero and again near the foot of the page.
 *
 * Step 1 asks for the mobile number and nothing else, and saves it at once,
 * so an abandoned enquiry is still an enquiry we can answer. Step 2 collects
 * the rest. Both steps post to a Server Action, so the form
 * also works before the JavaScript has arrived.
 *
 * The short form (`compact`) asks only for a name and an email at step 2.
 * "Add more details" then grows it into a large panel over the page, in two
 * columns, with the page still showing (blurred) around it, rather than
 * stretching the small box down the page.
 *
 * It remembers, in this browser, the contact details given before and the
 * problem picked on the treatments page (or passed as ?area=&treatment=), and
 * fills them in.
 */
export function EnquiryForm({
  text,
  dialCodes,
  defaultIso,
  defaultCountry,
  defaultTreatment = "",
  source,
  compact = false,
  reports = false,
}: {
  text: FormContent;
  dialCodes: DialCode[];
  defaultIso: string;
  defaultCountry: string;
  /** Set on a treatment page, so the visitor does not have to pick it again. */
  defaultTreatment?: string;
  source: string;
  compact?: boolean;
  /** Opened from an "Upload your reports" button: lead to the file field. */
  reports?: boolean;
}) {
  const uid = useId();
  const [numberState, submitNumber, savingNumber] = useActionState(saveNumber, null);
  const [detailsState, submitDetails, savingDetails] = useActionState(saveDetails, null);
  const [iso, setIso] = useState(defaultIso);
  /** The number as last sent, kept in the field if it is refused. */
  const [typed, setTyped] = useState<{ iso: string; phone: string } | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [issue, setIssue] = useState<Issue | null>(null);
  const [known, setKnown] = useState<Contact | null>(null);
  /** Came from an "Upload your reports" button (#reports): lead to the file field. */
  const [fromHash, setWantsReports] = useState(false);
  const wantsReports = reports || fromHash;
  /** Step 1: the consent box was left empty when the form was sent. */
  const [unticked, setUnticked] = useState(false);
  /** Short form, step 2: the whole form is open in a large panel over the page. */
  const [full, setFull] = useState(false);
  /** The optional fields stay in the page once opened, so nothing typed is lost. */
  const [opened, setOpened] = useState(false);
  const sheet = useRef<HTMLDialogElement>(null);

  // Read what this browser remembers once it is on screen. Storage is not
  // there during the server render, so this has to wait for the effect.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const contact = readContact();
    if (contact) {
      setKnown(contact);
      if (contact.iso && dialCodes.some((c) => c.iso === contact.iso)) setIso(contact.iso);
    }
    // Otherwise the country code of the visitor's own country, from their
    // location (set by the proxy or the location prompt).
    if (!contact?.iso && !defaultIso) {
      const own = document.cookie.match(/(?:^|;\s*)country=([A-Z]{2})/)?.[1];
      if (own && dialCodes.some((c) => c.iso === own)) setIso(own);
    }
    if (defaultTreatment) return;
    const params = new URLSearchParams(window.location.search);
    const fromLink = { area: params.get("area") ?? undefined, treatment: params.get("treatment") ?? undefined };
    if (fromLink.area || fromLink.treatment) {
      saveIssue(fromLink);
      setIssue(fromLink);
    } else {
      setIssue(readIssue());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    const check = () => {
      if (window.location.hash === "#reports") setWantsReports(true);
    };
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
  }, []);

  const leadId = numberState?.ok ? numberState.leadId : null;
  const done = detailsState?.ok === true;
  const treatment = issue?.treatment || defaultTreatment;
  const issueNote = issue ? `About: ${describeIssue(issue)}` : "";

  // Number saved and the visitor came to send reports: take them to the file field.
  useEffect(() => {
    if (!leadId || !wantsReports) return;
    if (compact) {
      // The short form opens in full, on the file field (see the effect below).
      /* eslint-disable react-hooks/set-state-in-effect */
      setOpened(true);
      setFull(true);
      /* eslint-enable react-hooks/set-state-in-effect */
      return;
    }
    // After the step has settled. scrollIntoView does not move the page here
    // (the body clips overflow), so the window is scrolled by hand.
    const timer = setTimeout(() => {
      const box = document.getElementById(`${uid}-report`)?.getBoundingClientRect();
      if (box) window.scrollTo({ top: window.scrollY + box.top - window.innerHeight / 2, behavior: "smooth" });
    }, 300);
    return () => clearTimeout(timer);
  }, [leadId, wantsReports, uid, compact]);

  // One <dialog> holds step 2 either way: in the page it is open as a plain
  // box, and "Add more details" reopens it as a modal over the whole screen.
  // The same element, so the name and email already typed stay put.
  useEffect(() => {
    const box = sheet.current;
    if (!box) return;
    const modal = box.matches(":modal");
    if (full && !modal) {
      // Where the small form was, so the panel can grow out of it.
      const from = box.getBoundingClientRect();
      box.close();
      box.showModal();
      if (wantsReports) document.getElementById(`${uid}-report`)?.scrollIntoView({ block: "center" });
      grow(box, from);
    } else if (!full && modal) {
      box.close();
      box.show();
    }
  }, [full, wantsReports, uid]);

  // Sent: the question is answered, so forget it.
  useEffect(() => {
    if (done) saveIssue(null);
  }, [done]);

  const clearIssue = () => {
    saveIssue(null);
    setIssue(null);
  };
  const banner = issue ? <IssueBanner issue={issue} onClear={clearIssue} text={text.issue} /> : null;

  if (done) {
    return (
      <div>
        <p className="font-display text-xl font-medium tracking-[-0.02em] text-accent">
          {text.done.heading}
        </p>
        <p className="mt-3 text-base text-ink-2">{text.done.body}</p>
        <a href={source} className={`${btnPlain} mt-4 justify-start`}>
          {text.done.again}
        </a>
      </div>
    );
  }

  // Step 1 - mobile number only.
  if (!leadId) {
    const message = formError(text, numberState && !numberState.ok ? numberState.error : null);
    return (
      <form
        action={submitNumber}
        onSubmit={(e) => {
          const data = new FormData(e.currentTarget);
          const sent = { iso: String(data.get("iso") ?? ""), phone: String(data.get("phone") ?? "") };
          saveContact(sent);
          setTyped(sent);
          // The box is ticked by the visitor, never for them.
          const agreed = data.get("consent") === "yes";
          setUnticked(!agreed);
          if (!agreed) e.preventDefault();
        }}
        className="space-y-4"
        noValidate
      >
        {banner}
        <input type="hidden" name="source" value={source} />
        {issue ? (
          <>
            <input type="hidden" name="treatment" value={issue.treatment ?? ""} />
            <input type="hidden" name="notes" value={issueNote} />
          </>
        ) : null}
        <label htmlFor={`${uid}-phone`} className={label}>
          {text.step1.label}
        </label>
        {wantsReports ? <p className="-mt-2 text-sm text-ink-2">{text.step1.reportsFirst}</p> : null}

        {/* Country code and number share one control, so it reads as a single
            field rather than two boxes jammed together. */}
        <div className="flex min-h-13 items-stretch rounded-md border border-line bg-surface transition-[border-color,box-shadow] focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/10">
          <DialPicker
            id={`${uid}-iso`}
            label={text.step1.countryLabel}
            search={text.step1.countrySearch}
            none={text.step1.countryNone}
            dialCodes={dialCodes}
            value={iso}
            onChange={setIso}
          />

          <span aria-hidden className="my-2.5 w-px bg-hairline" />

          {/* The placeholder is a real-looking mobile number of the chosen country. */}
          <input
            key={typed?.phone ?? known?.phone ?? ""}
            id={`${uid}-phone`}
            name="phone"
            defaultValue={typed?.phone ?? known?.phone}
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            required
            placeholder={dialCodes.find((c) => c.iso === iso)?.example ?? "81234 56789"}
            className="min-w-0 flex-1 rounded-e-md bg-transparent px-4 text-base text-ink placeholder:text-ink-3 focus:outline-none"
          />
        </div>

        <label className="flex cursor-pointer items-start gap-3 text-sm">
          <input
            type="checkbox"
            name="consent"
            value="yes"
            required
            aria-invalid={unticked || undefined}
            onChange={(e) => {
              if (e.target.checked) setUnticked(false);
            }}
            className="mt-0.5 size-[1.125rem] shrink-0 accent-accent"
          />
          <span className={unticked ? "font-medium text-red-700" : "text-ink-2"}>
            {/* New tabs, so the number already typed is not lost. */}
            {text.step1.consent.split(/(\{terms\}|\{privacy\})/).map((part, i) =>
              part === "{terms}" || part === "{privacy}" ? (
                <a
                  key={i}
                  href={part === "{terms}" ? "/terms" : "/privacy"}
                  target="_blank"
                  rel="noopener"
                  className="font-medium text-accent underline-offset-4 transition-colors hover:text-accent-hover hover:underline"
                >
                  {part === "{terms}" ? text.step1.terms : text.step1.privacy}
                </a>
              ) : (
                part
              ),
            )}
          </span>
        </label>

        <button type="submit" className={`${btnPrimary} w-full whitespace-normal! px-4! py-2.5 text-center leading-snug`} disabled={savingNumber}>
          {savingNumber ? `${text.sending}...` : text.step1.submit}
        </button>

        {message ? (
          <p role="alert" className="text-sm font-medium text-red-700">
            {message}
          </p>
        ) : null}

        <p className="text-xs text-ink-3">{text.step1.emergency}</p>
      </form>
    );
  }

  /** The short form, opened over the whole screen. */
  const wide = compact && full;
  /** The optional fields are on show: always in the long form, in the short one only when opened in full. */
  const showing = !compact || full;
  const gap = compact && !wide ? "space-y-4" : "space-y-6";

  /** The optional fields about the trip, under the name and email. */
  const tripFields = (
    <>
      <div>
        <label htmlFor={`${uid}-treatment`} className={label}>
          {text.step2.treatment.label}
        </label>
        <select
          id={`${uid}-treatment`}
          name="treatment"
          defaultValue={treatment}
          className={`${field} mt-2`}
        >
          <option value="">{text.step2.treatment.placeholder}</option>
          {treatment && !text.step2.treatment.options.includes(treatment) ? (
            <option value={treatment}>{treatment}</option>
          ) : null}
          {text.step2.treatment.options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={`${uid}-country`} className={label}>
          {text.step2.country.label}
        </label>
        <select
          id={`${uid}-country`}
          name="country"
          defaultValue={known?.country || defaultCountry}
          className={`${field} mt-2`}
        >
          <option value="">{text.step2.country.placeholder}</option>
          {dialCodes.map((c) => (
            <option key={c.iso} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <fieldset>
        <legend className={label}>{text.step2.timeline.label}</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {text.step2.timeline.options.map((o) => (
            <label
              key={o}
              className="flex min-h-13 cursor-pointer items-center gap-3 rounded-md border border-line px-4 text-base transition-colors hover:bg-surface-2 has-checked:border-accent has-checked:bg-accent-quiet"
            >
              <input type="radio" name="timeline" value={o} className="size-4 accent-accent" />
              <span>{o}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {showUpcoming ? (
        <>
          <fieldset>
            <legend className={label}>{text.step2.budget.label}</legend>
            <div className="mt-3 grid gap-2">
              {text.step2.budget.options.map((o) => (
                <label
                  key={o}
                  className="flex min-h-13 cursor-pointer items-center gap-3 rounded-md border border-line px-4 py-3 text-base transition-colors hover:bg-surface-2 has-checked:border-accent has-checked:bg-accent-quiet"
                >
                  <input type="radio" name="budget" value={o} className="size-4 shrink-0 accent-accent" />
                  <span>{o}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor={`${uid}-preference`} className={label}>
              {text.step2.preference.label}
            </label>
            <input
              id={`${uid}-preference`}
              name="preference"
              maxLength={200}
              placeholder={text.step2.preference.placeholder}
              className={`${field} mt-2`}
            />
          </div>
        </>
      ) : null}
    </>
  );

  /** The optional fields about the case: notes and reports. */
  const caseFields = (
    <>
      <div>
        <label htmlFor={`${uid}-notes`} className={label}>
          {text.step2.notes.label}
        </label>
        <textarea
          id={`${uid}-notes`}
          name="notes"
          rows={wide ? 5 : 3}
          defaultValue={issueNote || undefined}
          placeholder={text.step2.notes.placeholder}
          className={`${field} mt-2 py-3.5`}
        />
      </div>

      <div>
        <label htmlFor={`${uid}-report`} className={label}>
          {text.step2.reports.label}
        </label>
        <p className="mt-1 text-sm text-ink-3">{text.step2.reports.hint}</p>
        <input
          id={`${uid}-report`}
          name="report"
          type="file"
          accept=".pdf,image/*"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
          className="mt-3 block w-full cursor-pointer rounded-md border border-dashed border-line bg-surface p-4 text-sm text-ink-2 file:me-4 file:cursor-pointer file:rounded-sm file:border-0 file:bg-accent-soft file:px-4 file:py-2 file:text-sm file:font-medium file:text-accent"
        />
        {fileName ? <p className="mt-2 text-sm text-accent">{fileName}</p> : null}
      </div>
    </>
  );

  // Step 2 - the rest of the details, once the number is safely stored.
  return (
    <dialog
      ref={sheet}
      open
      // In the page it is only a box; a dialog once it covers the screen.
      role={wide ? undefined : "presentation"}
      aria-labelledby={wide ? `${uid}-step2` : undefined}
      // A click on the blurred page around the panel goes back to the short form.
      onClick={(e) => {
        if (wide && e.target === e.currentTarget) setFull(false);
      }}
      // Escape goes back to the short form, with everything typed kept.
      onCancel={(e) => {
        e.preventDefault();
        setFull(false);
      }}
      // If the browser closes it all the same (Escape pressed twice), put the
      // box back in the page rather than leave the form out of sight.
      onClose={(e) => {
        if (e.currentTarget.open) return;
        e.currentTarget.show();
        setFull(false);
      }}
      className={
        wide
          ? "enquiry-sheet m-auto max-h-[calc(100dvh-1.5rem)] w-[calc(100%-1.5rem)] max-w-5xl overflow-y-auto overscroll-contain rounded-xl border border-hairline bg-surface p-0 text-ink shadow-lift sm:max-h-[calc(100dvh-4rem)] sm:w-[calc(100%-4rem)]"
          : "static m-0 block w-full max-w-none border-0 bg-transparent p-0 text-inherit"
      }
    >
      <div className={wide ? "px-5 py-7 sm:px-10 sm:py-10" : undefined}>
        {compact ? null : (
          <div className="rounded-md bg-accent-quiet p-4">
            <p className="text-base font-medium text-accent">{text.saved.heading}</p>
            <p className="mt-1 text-sm text-ink-2">{text.saved.body}</p>
          </div>
        )}

        <div className={`flex items-start justify-between gap-4 ${compact ? "" : "mt-7"}`}>
          <div className="min-w-0">
            <h3
              id={`${uid}-step2`}
              className={wide ? "text-2xl font-semibold tracking-[-0.02em] sm:text-3xl" : "text-xl font-medium tracking-[-0.02em]"}
            >
              {compact && !wide ? text.saved.heading : text.step2.heading}
            </h3>
            <p className="mt-2 text-base text-ink-2">{compact && !wide ? text.step2.heading : text.step2.intro}</p>
          </div>
          {wide ? (
            <button
              type="button"
              onClick={() => setFull(false)}
              className="-me-2 -mt-1 inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-2 rounded-md px-3 text-sm font-medium text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
            >
              <span className="hidden sm:inline">{text.step2.less}</span>
              <XIcon size={20} aria-hidden />
              <span className="sr-only sm:hidden">{text.step2.less}</span>
            </button>
          ) : null}
        </div>

        <form
          action={submitDetails}
          onSubmit={(e) => {
            const data = new FormData(e.currentTarget);
            saveContact({
              name: String(data.get("name") ?? "").trim(),
              email: String(data.get("email") ?? "").trim(),
              country: String(data.get("country") ?? ""),
            });
          }}
          className={
            wide
              ? "mt-8 grid gap-x-14 gap-y-6 border-t border-hairline pt-8 lg:grid-cols-2 lg:items-start"
              : `${compact ? "mt-5" : "mt-7"} ${gap}`
          }
          noValidate
        >
          {/* First column when open in full: who you are, and the trip. */}
          <div className={gap}>
            {banner}
            <input type="hidden" name="leadId" value={leadId} />

            <div>
              <label htmlFor={`${uid}-name`} className={label}>
                {text.step2.name.label}
              </label>
              <input
                id={`${uid}-name`}
                name="name"
                autoComplete="name"
                defaultValue={known?.name}
                required
                placeholder={text.step2.name.placeholder}
                className={`${field} mt-2`}
              />
            </div>

            <div>
              <label htmlFor={`${uid}-email`} className={label}>
                {text.step2.email.label}
              </label>
              <input
                id={`${uid}-email`}
                name="email"
                type="email"
                autoComplete="email"
                defaultValue={known?.email}
                required
                placeholder={text.step2.email.placeholder}
                className={`${field} mt-2`}
              />
              <p className="mt-2 text-sm text-ink-3">{text.step2.email.hint}</p>
            </div>

            {!compact || opened ? <div className={showing ? gap : "hidden"}>{tripFields}</div> : null}
          </div>

          {/* Second column: the case, the consent and the send button. */}
          <div className={gap}>
            {compact && !full ? (
              <button
                type="button"
                onClick={() => {
                  setOpened(true);
                  setFull(true);
                }}
                className="flex min-h-13 w-full cursor-pointer items-center justify-between gap-3 rounded-md border border-line px-4 text-start text-base font-medium text-accent transition-colors hover:border-accent hover:bg-accent-quiet"
              >
                {text.step2.more}
                <ArrowsOutSimpleIcon size={18} className="shrink-0" aria-hidden />
              </button>
            ) : null}

            {!compact || opened ? <div className={showing ? gap : "hidden"}>{caseFields}</div> : null}

            <label className="flex cursor-pointer items-start gap-3 text-base">
              <input
                type="checkbox"
                name="consent"
                value="yes"
                required
                className="mt-1 size-[1.125rem] shrink-0 accent-accent"
              />
              <span className="text-ink-2">
                {text.step2.consent.label}{" "}
                {/* A new tab, so the details already typed are not lost. */}
                <a
                  href="/privacy"
                  target="_blank"
                  rel="noopener"
                  className="font-medium text-accent underline underline-offset-4 transition-colors hover:text-accent-hover"
                >
                  {text.step2.consent.privacy}
                </a>
              </span>
            </label>

            <label className="flex cursor-pointer items-start gap-3 text-base">
              <input type="checkbox" name="marketing" value="yes" className="mt-1 size-[1.125rem] shrink-0 accent-accent" />
              <span className="text-ink-2">{text.step2.marketing}</span>
            </label>

            <button type="submit" className={`${btnPrimary} w-full whitespace-normal! px-4! py-2.5 text-center leading-snug`} disabled={savingDetails}>
              {savingDetails ? `${text.sending}...` : text.step2.submit}
            </button>

            {detailsState && !detailsState.ok ? (
              <p role="alert" className="text-sm font-medium text-red-700">
                {formError(text, detailsState.error)}
              </p>
            ) : null}

            {showUpcoming && wide ? <PrivacyNote text={text.privacyNote} /> : null}
          </div>
        </form>
      </div>
    </dialog>
  );
}


/**
 * The large panel opens out of the small form: it starts clipped to the small
 * form's outline and widens to its own, so nothing inside is stretched.
 */
function grow(box: HTMLElement, from: DOMRect) {
  if (!matchMedia("(prefers-reduced-motion: no-preference)").matches) return;
  const to = box.getBoundingClientRect();
  const inset = (n: number) => `${Math.max(0, Math.round(n))}px`;
  const start = `inset(${inset(from.top - to.top)} ${inset(to.right - from.right)} ${inset(
    to.bottom - from.bottom,
  )} ${inset(from.left - to.left)} round 0.75rem)`;
  box.animate(
    [
      { clipPath: start, opacity: 0.6 },
      { clipPath: "inset(0px 0px 0px 0px round 0.75rem)", opacity: 1 },
    ],
    { duration: 380, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
  );
}

/** The problem picked on the treatments page, shown at the top of the form. */
function IssueBanner({ issue, onClear, text }: { issue: Issue; onClear: () => void; text: FormContent["issue"] }) {
  return (
    <div className="flex items-start gap-3 rounded-md border border-accent/30 bg-accent-quiet p-3 ps-4">
      <div className="min-w-0 flex-1">
        <p className="text-sm text-ink-3">{text.about}</p>
        <p className="mt-0.5 text-base font-medium text-ink">
          {describeIssue(issue).replace(": ", " · ")}
          {issue.treatment ? null : <span className="font-normal text-ink-3"> · {text.advise}</span>}
        </p>
      </div>
      <button
        type="button"
        onClick={onClear}
        className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-md text-ink-3 transition-colors hover:bg-surface hover:text-ink"
      >
        <XIcon size={16} aria-hidden />
        <span className="sr-only">{text.remove}</span>
      </button>
    </div>
  );
}

/** One quiet line on how medical details are handled. */
export function PrivacyNote({ text }: { text: string }) {
  return (
    <p className="flex items-start gap-2 text-sm text-ink-3">
      <LockSimpleIcon size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />
      {text}
    </p>
  );
}
