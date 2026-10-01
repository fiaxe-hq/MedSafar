"use client";

import { useActionState, useId, useState } from "react";
import { saveDetails, saveNumber } from "@/app/actions";
import type { DialCode, FormContent } from "@/content/types";
import { btnPlain, btnPrimary, field, label } from "@/components/ui/styles";

/**
 * The enquiry form, used in the hero and again near the foot of the page.
 *
 * Step 1 asks for the mobile number and nothing else, and saves it straight
 * away, so an abandoned enquiry is still an enquiry we can answer.
 * Step 2 collects the rest. Both steps post to a Server Action, so the form
 * also works before the JavaScript has arrived.
 */
export function EnquiryForm({
  text,
  dialCodes,
  defaultIso,
  defaultCountry,
  defaultTreatment = "",
  source,
  compact = false,
}: {
  text: FormContent;
  dialCodes: DialCode[];
  defaultIso: string;
  defaultCountry: string;
  /** Set on a treatment page, so the visitor does not have to pick it again. */
  defaultTreatment?: string;
  source: string;
  compact?: boolean;
}) {
  const uid = useId();
  const [numberState, submitNumber, savingNumber] = useActionState(saveNumber, null);
  const [detailsState, submitDetails, savingDetails] = useActionState(saveDetails, null);
  const [iso, setIso] = useState(defaultIso);
  const [fileName, setFileName] = useState<string | null>(null);

  const dial = dialCodes.find((c) => c.iso === iso)?.dial ?? "";
  const leadId = numberState?.ok ? numberState.leadId : null;
  const done = detailsState?.ok === true;

  if (done) {
    return (
      <div>
        <p className="font-display text-xl font-semibold tracking-[-0.02em] text-accent">
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
    return (
      <form action={submitNumber} className="space-y-4" noValidate>
        <input type="hidden" name="source" value={source} />
        <label htmlFor={`${uid}-phone`} className={label}>
          {text.step1.label}
        </label>

        {/* Country code and number share one control, so it reads as a single
            field rather than two boxes jammed together. */}
        <div className="flex min-h-13 items-stretch rounded-md border border-line bg-surface transition-[border-color,box-shadow] focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/10">
          <div className="relative shrink-0">
            <label htmlFor={`${uid}-iso`} className="sr-only">
              {text.step1.countryLabel}
            </label>
            <select
              id={`${uid}-iso`}
              name="iso"
              value={iso}
              onChange={(e) => setIso(e.target.value)}
              className="h-full w-[7.5rem] appearance-none cursor-pointer rounded-s-md bg-transparent ps-4 pe-8 text-base font-medium text-ink focus:outline-none"
            >
              {dialCodes.map((c) => (
                <option key={c.iso} value={c.iso}>
                  {c.dial} {c.iso}
                </option>
              ))}
            </select>
            <svg
              viewBox="0 0 10 6"
              aria-hidden
              className="pointer-events-none absolute end-3 top-1/2 h-1.5 w-2.5 -translate-y-1/2 fill-ink-3"
            >
              <path d="M0 0h10L5 6z" />
            </svg>
          </div>

          <span aria-hidden className="my-2.5 w-px bg-hairline" />

          <input
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            required
            placeholder={dial ? `${dial} 000 000 0000` : ""}
            className="min-w-0 flex-1 rounded-e-md bg-transparent px-4 text-base text-ink placeholder:text-ink-3 focus:outline-none"
          />
        </div>

        <button type="submit" className={`${btnPrimary} w-full`} disabled={savingNumber}>
          {savingNumber ? `${text.sending}...` : text.step1.submit}
        </button>

        {numberState && !numberState.ok ? (
          <p role="alert" className="text-sm font-medium text-red-700">
            {numberState.error === "phone"
              ? text.errors.phone
              : numberState.error === "limit"
                ? text.errors.limit
                : text.errors.generic}
          </p>
        ) : null}

        <p className="text-sm text-ink-3">
          {compact ? text.step1.hint : text.step1.reassurance}
        </p>
      </form>
    );
  }

  // Step 2 - the rest of the details, once the number is safely stored.
  return (
    <div>
      <div className="rounded-md bg-accent-quiet p-4">
        <p className="text-base font-medium text-accent">{text.saved.heading}</p>
        <p className="mt-1 text-sm text-ink-2">{text.saved.body}</p>
      </div>

      <div className="mt-7">
        <h3 className="text-xl font-medium tracking-[-0.02em]">{text.step2.heading}</h3>
        <p className="mt-2 text-base text-ink-2">{text.step2.intro}</p>
      </div>

      <form action={submitDetails} className="mt-7 space-y-6" noValidate>
        <input type="hidden" name="leadId" value={leadId} />

        <div>
          <label htmlFor={`${uid}-name`} className={label}>
            {text.step2.name.label}
          </label>
          <input
            id={`${uid}-name`}
            name="name"
            autoComplete="name"
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
            required
            placeholder={text.step2.email.placeholder}
            className={`${field} mt-2`}
          />
          <p className="mt-2 text-sm text-ink-3">{text.step2.email.hint}</p>
        </div>

        <div>
          <label htmlFor={`${uid}-country`} className={label}>
            {text.step2.country.label}
          </label>
          <select
            id={`${uid}-country`}
            name="country"
            defaultValue={defaultCountry}
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

        <div>
          <label htmlFor={`${uid}-treatment`} className={label}>
            {text.step2.treatment.label}
          </label>
          <select
            id={`${uid}-treatment`}
            name="treatment"
            defaultValue={defaultTreatment}
            className={`${field} mt-2`}
          >
            <option value="">{text.step2.treatment.placeholder}</option>
            {defaultTreatment && !text.step2.treatment.options.includes(defaultTreatment) ? (
              <option value={defaultTreatment}>{defaultTreatment}</option>
            ) : null}
            {text.step2.treatment.options.map((o) => (
              <option key={o} value={o}>
                {o}
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

        <div>
          <label htmlFor={`${uid}-notes`} className={label}>
            {text.step2.notes.label}
          </label>
          <textarea
            id={`${uid}-notes`}
            name="notes"
            rows={3}
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

        <button type="submit" className={`${btnPrimary} w-full`} disabled={savingDetails}>
          {savingDetails ? `${text.sending}...` : text.step2.submit}
        </button>

        {detailsState && !detailsState.ok ? (
          <p role="alert" className="text-sm font-medium text-red-700">
            {detailsState.error === "name"
              ? text.errors.name
              : detailsState.error === "email"
                ? text.errors.email
                : detailsState.error === "consent"
                  ? text.errors.consent
                  : detailsState.error === "file"
                    ? text.errors.file
                    : text.errors.generic}
          </p>
        ) : null}
      </form>
    </div>
  );
}
