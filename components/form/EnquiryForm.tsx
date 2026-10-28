"use client";

import { useActionState, useEffect, useId, useState } from "react";
import { LockSimpleIcon } from "@phosphor-icons/react/dist/ssr/LockSimple";
import { XIcon } from "@phosphor-icons/react/dist/ssr/X";
import { saveDetails, saveNumber } from "@/app/actions";
import { CodeStep, formError, useCodeStep } from "@/components/form/CodeStep";
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
 * Step 1 asks for the mobile number and nothing else, sends a code to it, and
 * saves it as soon as the code is typed back, so an abandoned enquiry is
 * still an enquiry we can answer, and every number saved is a real one.
 * Step 2 collects the rest. Both steps post to a Server Action, so the form
 * also works before the JavaScript has arrived.
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
  const [codeSent, closeCode] = useCodeStep(numberState);
  const [iso, setIso] = useState(defaultIso);
  /** The number as last sent, for the code step and for going back to change it. */
  const [typed, setTyped] = useState<{ iso: string; phone: string } | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [issue, setIssue] = useState<Issue | null>(null);
  const [known, setKnown] = useState<Contact | null>(null);

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

  const leadId = numberState?.ok ? numberState.leadId : null;
  const done = detailsState?.ok === true;
  const treatment = issue?.treatment || defaultTreatment;
  const issueNote = issue ? `About: ${describeIssue(issue)}` : "";

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

  // Step 1 - mobile number only, then the code sent to it.
  if (!leadId) {
    const error = numberState && !numberState.ok ? numberState.error : null;
    // A wrong or expired code belongs to the code step, not to the number.
    const codeError = error === "code" || error === "expired" || error === "attempts";
    const message = formError(text, codeError && !codeSent ? null : error);
    return (
      <form
        action={submitNumber}
        onSubmit={(e) => {
          const data = new FormData(e.currentTarget);
          const sent = { iso: String(data.get("iso") ?? ""), phone: String(data.get("phone") ?? "") };
          saveContact(sent);
          setTyped(sent);
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
        {codeSent && typed ? (
          <>
            <input type="hidden" name="iso" value={typed.iso} />
            <input type="hidden" name="phone" value={typed.phone} />
            <CodeStep text={text} sent={codeSent} sending={savingNumber} onChange={closeCode} />
          </>
        ) : (
          <>
            <label htmlFor={`${uid}-phone`} className={label}>
              {text.step1.label}
            </label>

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

              <input
                key={typed?.phone ?? known?.phone ?? ""}
                id={`${uid}-phone`}
                name="phone"
                defaultValue={typed?.phone ?? known?.phone}
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                required
                placeholder="000 000 0000"
                className="min-w-0 flex-1 rounded-e-md bg-transparent px-4 text-base text-ink placeholder:text-ink-3 focus:outline-none"
              />
            </div>

            <button type="submit" className={`${btnPrimary} w-full`} disabled={savingNumber}>
              {savingNumber ? `${text.sending}...` : text.step1.submit}
            </button>
          </>
        )}

        {message ? (
          <p role="alert" className="text-sm font-medium text-red-700">
            {message}
          </p>
        ) : null}

        <p className="text-sm text-ink-3">
          {compact ? text.step1.hint : text.step1.reassurance}
        </p>
        {showUpcoming ? <PrivacyNote text={text.privacyNote} /> : null}
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
        className="mt-7 space-y-6"
        noValidate
      >
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

        <div>
          <label htmlFor={`${uid}-notes`} className={label}>
            {text.step2.notes.label}
          </label>
          <textarea
            id={`${uid}-notes`}
            name="notes"
            rows={3}
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
            {formError(text, detailsState.error)}
          </p>
        ) : null}

        {showUpcoming ? <PrivacyNote text={text.privacyNote} /> : null}
      </form>
    </div>
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
