"use client";

import { useEffect, useId, useState } from "react";
import type { ActionResult } from "@/app/actions";
import type { FormContent } from "@/content/types";
import { btnPlain, btnPrimary, field, label } from "@/components/ui/styles";

/** Matches RESEND_AFTER_S in lib/otp.ts, which is what really holds a resend back. */
const RESEND_AFTER_S = 30;

export type CodeSent = { to: string; at: number };

/**
 * Which number a code is waiting on, from the form's Server Action results.
 * Opens when a code is sent; `close` goes back to the number.
 */
export function useCodeStep(state: ActionResult | null) {
  const [sent, setSent] = useState<CodeSent | null>(null);
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (state && !state.ok && state.error === "sent" && state.sentTo) {
      setSent({ to: state.sentTo, at: Date.now() });
    }
  }, [state]);
  /* eslint-enable react-hooks/set-state-in-effect */
  return [sent, () => setSent(null)] as const;
}

/** The message for a refused step, in the visitor's language. "sent" is not an error. */
export function formError(text: FormContent, error: string | null | undefined): string | null {
  if (!error || error === "sent") return null;
  const errors: Record<string, string> = text.errors;
  return errors[error] ?? text.errors.generic;
}

/**
 * The code sent to the mobile number, typed back. Sits inside the form that
 * sent it: "Confirm" submits the form with the code, "Send a new code"
 * submits it with resend=yes instead.
 */
export function CodeStep({
  text,
  sent,
  sending,
  onChange,
}: {
  text: FormContent;
  sent: CodeSent;
  sending: boolean;
  onChange: () => void;
}) {
  const uid = useId();
  const [now, setNow] = useState(sent.at);
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);
  const wait = Math.max(0, RESEND_AFTER_S - Math.floor((now - sent.at) / 1000));
  const [before, after = ""] = text.otp.sent.split("{phone}");

  return (
    <div className="space-y-4">
      <p className="text-base text-ink-2">
        {before}
        <bdi dir="ltr" className="font-medium whitespace-nowrap text-ink">
          {sent.to}
        </bdi>
        {after}{" "}
        <button
          type="button"
          onClick={onChange}
          className="cursor-pointer font-medium text-accent underline underline-offset-4 transition-colors hover:text-accent-hover"
        >
          {text.otp.change}
        </button>
      </p>

      <div>
        <label htmlFor={`${uid}-code`} className={label}>
          {text.otp.label}
        </label>
        <input
          key={sent.at}
          id={`${uid}-code`}
          name="code"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="[0-9]*"
          maxLength={6}
          required
          autoFocus
          placeholder="000000"
          dir="ltr"
          className={`${field} mt-2 text-center text-lg tracking-[0.4em] tabular-nums`}
        />
      </div>

      <button type="submit" className={`${btnPrimary} w-full`} disabled={sending}>
        {sending ? `${text.sending}...` : text.otp.submit}
      </button>

      <button
        type="submit"
        name="resend"
        value="yes"
        disabled={wait > 0 || sending}
        className={btnPlain}
      >
        {wait > 0 ? text.otp.resendIn.replace("{n}", String(wait)) : text.otp.resend}
      </button>
    </div>
  );
}
