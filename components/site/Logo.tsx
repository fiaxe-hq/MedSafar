import Link from "next/link";
import { site } from "@/content/site";

/** Wordmark only. No mark, no lockup, nothing to redraw when the brand lands. */
export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link
      href={href}
      className="flex items-baseline gap-1.5 justify-self-start font-display text-xl font-bold tracking-[-0.02em] text-ink"
      aria-label={site.brand.legal}
    >
      {site.brand.name}
      <span className="text-base font-normal text-ink-3">{site.brand.country}</span>
    </Link>
  );
}
