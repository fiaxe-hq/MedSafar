"use client";

import Link from "@/components/ui/Link";
import { startTransition, useActionState, useId, useState } from "react";
import { saveQuestionnaire } from "@/app/actions";
import { CodeStep, VerifiedNumber, formError, useCodeStep } from "@/components/form/CodeStep";
import { useVerified } from "@/components/form/useVerified";
import { DialPicker } from "@/components/form/DialPicker";
import type { DialCode, FormContent, Question, Questionnaire, QuestionnaireText } from "@/content/types";
import { PrivacyNote } from "@/components/form/EnquiryForm";
import { btnPlain, btnPrimary, field, label } from "@/components/ui/styles";

const option =
  "flex min-h-13 cursor-pointer items-center gap-3 rounded-md border border-line bg-surface px-4 py-3 text-base transition-colors hover:bg-surface-2 has-checked:border-accent has-checked:bg-accent-quiet";

/**
 * A questionnaire and the contact details, sent together in one go. Posts to
 * a Server Action, so it works before the JavaScript has arrived; the live
 * BMI is the only part that needs it. The first send asks for the code sent
 * to the mobile number; sending again with the code saves it all.
 */
export function QuestionnaireForm({
  questionnaire,
  text,
  form,
  dialCodes,
  defaultIso,
}: {
  questionnaire: Questionnaire;
  text: QuestionnaireText;
  /** The enquiry form's text, for the contact fields and their errors. */
  form: FormContent;
  dialCodes: DialCode[];
  defaultIso: string;
}) {
  const uid = useId();
  const [state, submit, sending] = useActionState(saveQuestionnaire, null);
  const [codeSent, closeCode] = useCodeStep(state);
  const [iso, setIso] = useState(defaultIso);
  const [numbers, setNumbers] = useState<Record<string, string>>({});
  const [missing, setMissing] = useState(false);
  const [verified, dropVerified] = useVerified();

  if (state?.ok) {
    return (
      <div className="rounded-lg border border-hairline bg-surface p-6 sm:p-8">
        <p className="font-display text-2xl font-medium tracking-[-0.02em] text-accent">{text.done.heading}</p>
        <p className="mt-3 text-base text-ink-2">{text.done.body}</p>
        <Link href="/" className={`${btnPlain} mt-4 justify-start`}>
          {text.done.again}
        </Link>
      </div>
    );
  }

  const bmi = (() => {
    if (!questionnaire.bmi) return null;
    const cm = Number(numbers[questionnaire.bmi.height]);
    const kg = Number(numbers[questionnaire.bmi.weight]);
    if (!cm || !kg || cm < 100 || kg < 20) return null;
    return (kg / (cm / 100) ** 2).toFixed(1);
  })();

  const error = missing ? "required" : state && !state.ok ? state.error : null;
  // A wrong or expired code belongs to the code step, not to the number.
  const codeError = error === "code" || error === "expired" || error === "attempts";
  const message =
    error === "required" ? text.errors.required : formError(form, codeError && !codeSent ? null : error);

  return (
    <form
      action={submit}
      // Sent by hand so a refused answer does not clear the whole form, as
      // React does after a form action.
      onSubmit={(e) => {
        e.preventDefault();
        // With the button that sent it, so "Send a new code" is seen as such.
        const data = new FormData(e.currentTarget, (e.nativeEvent as SubmitEvent).submitter);
        const gap = questionnaire.sections
          .flatMap((section) => section.questions)
          .some((q) => !q.optional && !data.getAll(q.id).some((v) => String(v).trim()));
        setMissing(gap);
        if (!gap) startTransition(() => submit(data));
      }}
      className="space-y-6"
      noValidate
    >
      <input type="hidden" name="questionnaire" value={questionnaire.slug} />

      {questionnaire.sections.map((section, s) => (
        <fieldset key={section.heading} className="rounded-lg border border-hairline bg-surface p-5 sm:p-8">
          <legend className="sr-only">{section.heading}</legend>
          <p aria-hidden className="flex items-baseline gap-3 text-xl font-semibold tracking-[-0.02em]">
            <span className="font-mono text-sm font-normal text-accent">{String(s + 1).padStart(2, "0")}</span>
            {section.heading}
          </p>
          <div className="mt-6 space-y-7">
            {section.questions.map((q) => (
              <Field
                key={q.id}
                q={q}
                uid={uid}
                optional={text.optional}
                onNumber={(v) => setNumbers((n) => ({ ...n, [q.id]: v }))}
              />
            ))}
          </div>
          {questionnaire.bmi && s === 0 ? (
            <div aria-live="polite" className="mt-7 rounded-md bg-accent-quiet p-4">
              <p className="text-base font-medium text-ink">
                {questionnaire.bmi.label}: <span className="text-accent tabular-nums">{bmi ?? "–"}</span>
              </p>
              <p className="mt-1 text-sm text-ink-2">{questionnaire.bmi.note}</p>
            </div>
          ) : null}
        </fieldset>
      ))}

      <fieldset className="rounded-lg border border-hairline bg-surface p-5 sm:p-8">
        <legend className="sr-only">{text.contact.heading}</legend>
        <p aria-hidden className="text-xl font-semibold tracking-[-0.02em]">{text.contact.heading}</p>
        <p className="mt-2 text-base text-ink-2">{text.contact.intro}</p>

        <div className="mt-6 space-y-6">
          {verified ? (
            <>
              <input type="hidden" name="iso" value={verified.iso} />
              <input type="hidden" name="phone" value={verified.phone} />
              <VerifiedNumber text={form} verified={verified} onOther={dropVerified} />
            </>
          ) : (
            <div>
              <label htmlFor={`${uid}-phone`} className={label}>
                {form.step1.label}
              </label>
              <div className="mt-2 flex min-h-13 items-stretch rounded-md border border-line bg-surface transition-[border-color,box-shadow] focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/10">
                <DialPicker
                  id={`${uid}-iso`}
                  label={form.step1.countryLabel}
                  search={form.step1.countrySearch}
                  none={form.step1.countryNone}
                  dialCodes={dialCodes}
                  value={iso}
                  onChange={setIso}
                />
                <span aria-hidden className="my-2.5 w-px bg-hairline" />
                <input
                  id={`${uid}-phone`}
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel-national"
                  required
                  // Fixed while a code sent to it is waiting.
                  readOnly={codeSent !== null}
                  placeholder="000 000 0000"
                  className="min-w-0 flex-1 rounded-e-md bg-transparent px-4 text-base text-ink placeholder:text-ink-3 focus:outline-none"
                />
              </div>
              <p className="mt-2 text-sm text-ink-3">{form.step1.hint}</p>
            </div>
          )}

          {codeSent ? <CodeStep text={form} sent={codeSent} sending={sending} onChange={closeCode} /> : null}

          <div>
            <label htmlFor={`${uid}-name`} className={label}>
              {form.step2.name.label}
            </label>
            <input
              id={`${uid}-name`}
              name="name"
              autoComplete="name"
              required
              placeholder={form.step2.name.placeholder}
              className={`${field} mt-2`}
            />
          </div>

          <div>
            <label htmlFor={`${uid}-email`} className={label}>
              {form.step2.email.label}
            </label>
            <input
              id={`${uid}-email`}
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder={form.step2.email.placeholder}
              className={`${field} mt-2`}
            />
          </div>

          <label className="flex cursor-pointer items-start gap-3 text-base">
            <input type="checkbox" name="consent" value="yes" required className="mt-1 size-[1.125rem] shrink-0 accent-accent" />
            <span className="text-ink-2">
              {form.step2.consent.label}{" "}
              <a
                href="/privacy"
                target="_blank"
                rel="noopener"
                className="font-medium text-accent underline underline-offset-4 transition-colors hover:text-accent-hover"
              >
                {form.step2.consent.privacy}
              </a>
            </span>
          </label>
        </div>
      </fieldset>

      <button type="submit" className={`${btnPrimary} w-full`} disabled={sending}>
        {sending ? `${form.sending}...` : text.submit}
      </button>

      {message ? (
        <p role="alert" className="text-sm font-medium text-red-700">
          {message}
        </p>
      ) : null}

      <PrivacyNote text={form.privacyNote} />
    </form>
  );
}

function Field({
  q,
  uid,
  optional,
  onNumber,
}: {
  q: Question;
  uid: string;
  optional: string;
  onNumber: (value: string) => void;
}) {
  const id = `${uid}-${q.id}`;
  const title = (
    <>
      {q.label}
      {q.optional ? <span className="font-normal text-ink-3"> ({optional})</span> : null}
    </>
  );

  if (q.kind === "number") {
    return (
      <div>
        <label htmlFor={id} className={label}>
          {title}
        </label>
        <div className="mt-2 flex max-w-xs items-stretch rounded-md border border-line bg-surface transition-[border-color,box-shadow] focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/10">
          <input
            id={id}
            name={q.id}
            type="number"
            inputMode="decimal"
            min={q.min}
            max={q.max}
            step="any"
            required={!q.optional}
            onChange={(e) => onNumber(e.target.value)}
            className="min-h-13 min-w-0 flex-1 rounded-s-md bg-transparent px-4 text-base text-ink focus:outline-none"
          />
          <span className="grid place-items-center rounded-e-md border-s border-hairline bg-surface-2 px-4 text-sm text-ink-3">
            {q.unit}
          </span>
        </div>
      </div>
    );
  }

  if (q.kind === "text") {
    return (
      <div>
        <label htmlFor={id} className={label}>
          {title}
        </label>
        <textarea
          id={id}
          name={q.id}
          rows={2}
          maxLength={1000}
          required={!q.optional}
          placeholder={q.placeholder}
          className={`${field} mt-2 py-3.5`}
        />
      </div>
    );
  }

  const multi = q.kind === "multi";
  return (
    <fieldset>
      <legend className={label}>{title}</legend>
      <div className={`mt-3 grid gap-2 ${q.options.length > 3 ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
        {q.options.map((o) => (
          <label key={o} className={option}>
            <input
              type={multi ? "checkbox" : "radio"}
              name={q.id}
              value={o}
              className="size-4 shrink-0 accent-accent"
            />
            <span>{o}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
