import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { ClipboardTextIcon } from "@phosphor-icons/react/dist/ssr/ClipboardText";
import type { Questionnaire } from "@/content/types";
import { questionnaireText } from "@/content/questionnaires";

/** A link to the questionnaire for a speciality, as one wide card. */
export function QuestionnaireCallout({ questionnaire, className = "" }: { questionnaire: Questionnaire; className?: string }) {
  return (
    <Link
      href={`/questionnaires/${questionnaire.slug}`}
      className={`group reveal flex flex-col gap-5 rounded-lg border border-hairline bg-surface p-6 lift sm:flex-row sm:items-center sm:p-7 ${className}`}
    >
      <span className="grid size-12 shrink-0 place-items-center rounded-md bg-accent-soft text-accent">
        <ClipboardTextIcon size={24} aria-hidden />
      </span>
      <span className="min-w-0 grow">
        <span className="block text-xl font-semibold tracking-[-0.02em] transition-colors group-hover:text-accent">
          {questionnaire.card.title}
        </span>
        <span className="mt-1.5 block max-w-[60ch] text-base text-ink-2">{questionnaire.card.body}</span>
      </span>
      <span className="inline-flex shrink-0 items-center gap-2 text-base font-medium text-accent">
        {questionnaireText.list.open}
        <ArrowRightIcon
          size={18}
          className="transition-[translate] duration-300 ease-(--ease-soft) group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
          aria-hidden
        />
      </span>
    </Link>
  );
}
