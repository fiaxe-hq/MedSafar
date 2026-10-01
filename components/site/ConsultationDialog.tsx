"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr/Check";
import { XIcon } from "@phosphor-icons/react/dist/ssr/X";
import type { ConsultationText, DialCode, FormContent } from "@/content/types";
import { EnquiryForm } from "@/components/form/EnquiryForm";

/**
 * The header's "Free consultation" button and the form it opens, centred over
 * the page. Built on the native <dialog>, so focus, Escape and the backdrop
 * are handled by the browser.
 *
 * Without JavaScript the button is a plain link to the form on the page.
 */
export function ConsultationDialog({
  label,
  className,
  text,
  form,
  dialCodes,
  defaultIso,
  defaultCountry,
}: {
  label: string;
  className: string;
  text: ConsultationText;
  form: FormContent;
  dialCodes: DialCode[];
  defaultIso: string;
  defaultCountry: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const headingId = "consultation-heading";

  return (
    <>
      <a
        href="#plan"
        className={className}
        aria-haspopup="dialog"
        onClick={(e) => {
          e.preventDefault();
          dialog.current?.showModal();
        }}
      >
        {label}
      </a>

      <dialog
        ref={dialog}
        aria-labelledby={headingId}
        // A click on the backdrop lands on the dialog itself, not its panel.
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
        className="consultation-dialog m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg overflow-y-auto overscroll-contain rounded-xl border border-hairline bg-surface p-0 text-ink shadow-lift"
      >
        <div className="relative p-6 sm:p-8">
          <p className="text-sm font-medium tracking-[0.14em] text-accent uppercase">
            {text.eyebrow}
          </p>
          <h2 id={headingId} className="mt-3 pe-10 text-2xl font-bold tracking-[-0.02em] sm:text-3xl">
            {text.heading}
          </h2>
          <p className="mt-3 text-base text-ink-2">{text.intro}</p>

          <ul className="mt-5 space-y-2 rounded-lg bg-surface-2 p-4">
            {text.promises.map((promise) => (
              <li key={promise} className="flex items-start gap-3 text-sm text-ink">
                <CheckIcon size={16} weight="bold" className="mt-0.5 shrink-0 text-cta" aria-hidden />
                <span>{promise}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <EnquiryForm
              text={form}
              dialCodes={dialCodes}
              defaultIso={defaultIso}
              defaultCountry={defaultCountry}
              source={pathname}
              compact
            />
          </div>

          <p className="mt-6 border-t border-hairline pt-4 text-sm text-ink-3">{text.note}</p>

          {/* Last in the DOM, so focus starts on the form, not on close. */}
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            className="absolute end-3 top-3 grid size-11 cursor-pointer place-items-center rounded-md text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
          >
            <XIcon size={20} aria-hidden />
            <span className="sr-only">{text.close}</span>
          </button>
        </div>
      </dialog>
    </>
  );
}
