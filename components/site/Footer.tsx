import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { resolveHref } from "./resolveHref";

export function Footer({ home = "/" }: { home?: string }) {
  const { footer, brand } = site;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline bg-surface-2 py-16 sm:py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="font-display text-2xl font-bold tracking-[-0.02em]">{brand.tagline}</p>
            <p className="mt-6 text-base text-ink-2">{footer.legalName}</p>
            <div className="mt-6 max-w-[58ch] space-y-3">
              {footer.lines.map((line) => (
                <p key={line} className="text-sm text-ink-3">
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:justify-items-end">
            {footer.columns.map((column) => (
              <div key={column.heading}>
                <p className="text-sm font-medium text-ink">{column.heading}</p>
                <ul className="mt-4 space-y-1">
                  {column.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={resolveHref(item.href, home)}
                        className="flex min-h-11 items-center text-base text-ink-2 transition-colors hover:text-ink"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-hairline pt-8 text-sm text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <p>{footer.note}</p>
          <p>
            © {year} {brand.name} {brand.country}. {footer.copyright}
          </p>
        </div>
      </Container>
    </footer>
  );
}
