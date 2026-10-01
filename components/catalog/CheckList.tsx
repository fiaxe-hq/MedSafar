import { CheckIcon } from "@phosphor-icons/react/dist/ssr/Check";
import { MinusIcon } from "@phosphor-icons/react/dist/ssr/Minus";

/**
 * A marked list in a card, the same treatment as the promises on the home
 * page. `tone="no"` is for things that are left out or not done.
 */
export function CheckList({
  items,
  tone = "yes",
  className = "",
}: {
  items: string[];
  tone?: "yes" | "no";
  className?: string;
}) {
  const Glyph = tone === "yes" ? CheckIcon : MinusIcon;

  return (
    <ul className={`reveal rounded-lg border border-hairline bg-surface px-6 sm:px-8 ${className}`}>
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-4 border-b border-hairline py-5 text-lg last:border-b-0"
        >
          <Glyph
            size={18}
            weight="bold"
            className={`mt-1.5 shrink-0 ${tone === "yes" ? "text-cta" : "text-ink-3"}`}
            aria-hidden
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
