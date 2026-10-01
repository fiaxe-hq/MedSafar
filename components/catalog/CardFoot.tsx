import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { Mark } from "@/components/ui/Pending";

/**
 * Foot of a linked card: the placeholder badge, and an arrow that says the
 * card opens something. The arrow matters on a phone, where there is no hover
 * to give that away.
 */
export function CardFoot({ pending = false }: { pending?: boolean }) {
  return (
    <div className="mt-auto flex w-full items-center justify-between gap-3 pt-5">
      {pending ? <Mark /> : <span />}
      <ArrowRightIcon
        size={18}
        className="shrink-0 text-ink-3 transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:text-accent rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
        aria-hidden
      />
    </div>
  );
}
