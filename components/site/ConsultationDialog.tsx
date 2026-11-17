"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr/Check";
import { XIcon } from "@phosphor-icons/react/dist/ssr/X";
import type { ConsultationText, DialCode, FormContent } from "@/content/types";
import { EnquiryForm } from "@/components/form/EnquiryForm";

/**
 * The enquiry form as a pop-up, centred over the page with the page blurred
 * behind it. One per page, in the header.
 *
 * Every button that used to scroll down to the form (a link to "#plan" or
 * "#reports" on the same page) opens it instead, right where the visitor is.
 * The page's own form section says which page and treatment the enquiry is
 * about (data-source, data-treatment), so the pop-up sends the same.
 *
 * Built on the native <dialog>, so focus, Escape and the backdrop are handled
 * by the browser. Without JavaScript the buttons stay plain links to the form
 * on the page.
 */
export function ConsultationDialog({
  text,
  form,
  dialCodes,
  defaultIso,
  defaultCountry,
}: {
  text: ConsultationText;
  form: FormContent;
  dialCodes: DialCode[];
  defaultIso: string;
  defaultCountry: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const [about, setAbout] = useState({ source: "", treatment: "", reports: false });
  const headingId = "consultation-heading";

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // A new tab or window is the visitor's choice: leave those alone.
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link || link.target === "_blank") return;
      const to = new URL(link.href, window.location.href);
      if (to.origin !== window.location.origin || to.pathname !== window.location.pathname) return;
      if (to.hash !== "#plan" && to.hash !== "#reports") return;
      const box = dialog.current;
      if (!box || box.open) return;

      e.preventDefault();
      const section = document.getElementById("plan");
      setAbout({
        source: section?.dataset.source ?? "",
        treatment: section?.dataset.treatment ?? "",
        reports: to.hash === "#reports",
      });
      box.showModal();
    };
    // Before the link's own handler, so the page neither scrolls nor navigates.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return (
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
        <h2 id={headingId} className="pe-10 text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
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
            defaultTreatment={about.treatment}
            source={about.source || pathname}
            reports={about.reports}
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
  );
}
