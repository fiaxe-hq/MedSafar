import Link from "next/link";
import { ListIcon } from "@phosphor-icons/react/dist/ssr/List";
import { site } from "@/content/site";
import { defaultIso, dialCodesFor } from "@/content/dial-codes";
import { Container } from "@/components/ui/Container";
import { btnPrimary } from "@/components/ui/styles";
import { ConsultationDialog } from "./ConsultationDialog";
import { LanguageSwitch } from "./LanguageSwitch";
import { Logo } from "./Logo";
import { resolveHref } from "./resolveHref";

export function Header({
  home,
  current,
  iso = null,
  countryName = "",
}: {
  home: string;
  /** On a country page, so the pop-up form starts with that country. */
  iso?: string | null;
  countryName?: string;
  /** The nav link for the section being viewed, for example "/hospitals". */
  current?: string;
}) {
  const { nav, cta } = site;

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-bg/90 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4 xl:grid xl:grid-cols-[1fr_auto_1fr]">
        <Logo href={home} />

        {/* Centred on wide screens. Six links need the room, so narrower
            screens use the menu button instead. */}
        <nav
          aria-label={nav.menuLabel}
          className="hidden items-center gap-1 xl:flex"
        >
          {nav.items.map((item) => (
            <Link
              key={item.label}
              href={resolveHref(item.href, home)}
              aria-current={item.href === current ? "page" : undefined}
              className="relative flex min-h-11 items-center rounded-sm px-3.5 text-base whitespace-nowrap text-ink-2 transition-colors after:absolute after:inset-x-3.5 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-brand after:transition-[scale] after:duration-300 after:ease-(--ease-soft) hover:text-ink hover:after:scale-x-100 aria-[current=page]:font-medium aria-[current=page]:text-ink aria-[current=page]:after:scale-x-100 rtl:after:origin-right"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-1 sm:gap-2">
          <LanguageSwitch />

          {/* The shorter of the two approved labels. The long one is on the
              buttons that actually carry the page. */}
          <span className="hidden lg:block">
            <ConsultationDialog
              label={cta.secondary}
              className={`${btnPrimary} min-h-11 px-5 text-[0.9375rem]`}
              text={site.consultation}
              form={site.form}
              dialCodes={dialCodesFor(iso)}
              defaultIso={iso ?? defaultIso}
              defaultCountry={countryName}
            />
          </span>

          {/* Mobile menu. <details> keeps it working with no JavaScript. */}
          <details className="relative xl:hidden">
            <summary className="flex size-11 cursor-pointer list-none items-center justify-center rounded-sm text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink">
              <ListIcon size={22} aria-hidden />
              <span className="sr-only">{nav.menuLabel}</span>
            </summary>
            <nav
              aria-label={nav.menuLabel}
              className="absolute end-0 z-50 mt-2 w-60 rounded-md border border-hairline bg-surface p-2 shadow-lift"
            >
              {nav.items.map((item) => (
                <a
                  key={item.label}
                  href={resolveHref(item.href, home)}
                  aria-current={item.href === current ? "page" : undefined}
                  className="flex min-h-12 items-center rounded-sm px-3 text-base text-ink transition-colors hover:bg-surface-2 aria-[current=page]:bg-surface-2 aria-[current=page]:font-medium"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </details>
        </div>
      </Container>
    </header>
  );
}
