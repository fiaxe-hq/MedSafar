import Link from "next/link";
import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr/CaretDown";
import { HandPointingIcon } from "@phosphor-icons/react/dist/ssr/HandPointing";
import { ListIcon } from "@phosphor-icons/react/dist/ssr/List";
import type { NavEntry, NavItem } from "@/content/types";
import { site } from "@/content/site";
import { defaultIso, dialCodesFor } from "@/content/dial-codes";
import { getDoctors, getHospitals, getSpecialities } from "@/lib/catalog";
import { Container } from "@/components/ui/Container";
import { btnPrimary } from "@/components/ui/styles";
import { ConsultationDialog } from "./ConsultationDialog";
import { LanguageSwitch } from "./LanguageSwitch";
import { Logo } from "./Logo";
import { NavUnderline } from "./NavUnderline";
import { resolveHref } from "./resolveHref";

/** The links inside each dropdown. Catalog menus are read fresh, so a new
 *  speciality, hospital or doctor shows up without touching this file. */
async function menuLinks(): Promise<Record<string, NavItem[]>> {
  const [specialities, hospitals, doctors] = await Promise.all([getSpecialities(), getHospitals(), getDoctors()]);
  const withDoctors = new Set(doctors.map((d) => d.speciality));

  return {
    treatments: specialities.map((s) => ({ label: s.name, href: `/treatments#${s.slug}` })),
    hospitals: hospitals.map((h) => ({ label: h.name, href: `/hospitals/${h.slug}` })),
    doctors: specialities
      .filter((s) => withDoctors.has(s.slug))
      .map((s) => ({ label: s.name, href: `/doctors?speciality=${s.slug}` })),
  };
}

const topLink =
  "relative flex h-10 items-center gap-1 px-2.5 text-[0.875rem] whitespace-nowrap text-ink-2 transition-colors duration-200 hover:text-ink aria-[current=page]:text-ink";

const panelLink =
  "flex min-h-10 items-center rounded-lg px-3 text-[0.875rem] text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink";

export async function Header({
  home,
  current,
  iso = null,
  countryName = "",
  overlay = false,
}: {
  /** Lay the bar over the top of a full-bleed band (the home hero), so its
   *  rounded corners sit on that band instead of on empty page. */
  overlay?: boolean;
  home: string;
  /** On a country page, so the pop-up form starts with that country. */
  iso?: string | null;
  countryName?: string;
  /** The nav link for the section being viewed, for example "/hospitals". */
  current?: string;
}) {
  const { nav, cta } = site;
  const menus = await menuLinks();
  const linksOf = (entry: NavEntry) => (entry.menu ? menus[entry.menu] : (entry.items ?? []));

  return (
    <header className={`pointer-events-none sticky top-0 z-40 px-5 sm:px-6 ${overlay ? "-mb-16" : ""}`}>
      {/* A bar hanging from the top of the screen, rounded below. Beside it
          the page shows through. */}
      <div className="nav-notch pointer-events-auto relative mx-auto max-w-[78rem] rounded-b-[1.75rem] shadow-[0_12px_30px_-18px_rgb(2_20_16/0.4)]">
        <Container className="flex h-16 items-center gap-6 px-5! sm:px-7!">
          <Logo href={home} />

          {/* Five entries need the room, so narrower screens use the menu
              button instead. Dropdowns open on hover or keyboard focus. */}
          <nav aria-label={nav.menuLabel} className="relative hidden flex-1 items-center justify-center gap-1 xl:flex">
            {nav.items.map((entry) => {
              const links = linksOf(entry);
              const href = resolveHref(entry.href, home);
              const isCurrent = entry.href === current ? "page" : undefined;

              if (links.length === 0) {
                return (
                  <Link key={entry.label} data-nav-top href={href} aria-current={isCurrent} className={topLink}>
                    {entry.label}
                  </Link>
                );
              }

              const wide = entry.menu === "treatments";
              return (
                <div key={entry.label} className="group relative">
                  <Link data-nav-top href={href} aria-current={isCurrent} aria-haspopup="true" className={topLink}>
                    {entry.label}
                    <CaretDownIcon
                      size={11}
                      className="text-ink-3/80 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                      aria-hidden
                    />
                  </Link>
                  {/* The top padding bridges the gap, so the panel stays open
                      while the pointer moves down to it. */}
                  <div className="invisible absolute start-0 top-full z-50 pt-2 opacity-0 transition-[opacity,visibility] duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <div
                      className={`rounded-2xl bg-surface p-2 shadow-lift ring-1 ring-hairline ${
                        wide ? "w-[36rem]" : "w-72"
                      }`}
                    >
                      {entry.finder ? (
                        <Link
                          href={resolveHref(entry.finder.href, home)}
                          className="group/finder mb-2 flex items-center gap-4 rounded-xl bg-deep p-4 text-white transition-[background-color] duration-300 ease-(--ease-soft) hover:bg-deep/90"
                        >
                          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/10 text-glow">
                            <HandPointingIcon size={22} weight="fill" aria-hidden />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-medium">{entry.finder.title}</span>
                            <span className="mt-0.5 block text-sm text-white/75">{entry.finder.text}</span>
                          </span>
                          <span
                            aria-hidden
                            className="text-glow transition-[translate] duration-300 ease-(--ease-soft) group-hover/finder:translate-x-1 rtl:rotate-180"
                          >
                            →
                          </span>
                        </Link>
                      ) : null}
                      <ul className={wide ? "grid grid-cols-2 gap-x-1" : ""}>
                        {links.map((link) => (
                          <li key={link.href}>
                            <Link href={resolveHref(link.href, home)} className={panelLink}>
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      {entry.all ? (
                        <Link
                          href={href}
                          className="mt-1 flex min-h-10 items-center border-t border-hairline px-3 pt-1 text-[0.9375rem] font-medium text-accent transition-colors hover:text-accent-hover"
                        >
                          {entry.all} →
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
            <Link
              data-nav-top
              href={nav.contact.href}
              aria-current={current === nav.contact.href ? "page" : undefined}
              className={topLink}
            >
              {nav.contact.label}
            </Link>
            <NavUnderline current={current} />
          </nav>

          <div className="ms-auto -me-2 flex items-center gap-1.5 sm:-me-4 lg:-me-6 xl:ms-0">

            {/* The shorter of the two approved labels. The long one is on the
                buttons that actually carry the page. */}
            <span className="hidden lg:block">
              <ConsultationDialog
                label={cta.secondary}
                className={`${btnPrimary.replace("rounded-md", "rounded-full").replace("min-h-13", "h-8")} px-3.5 text-[0.75rem] sm:px-3.5`}
                text={site.consultation}
                form={site.form}
                dialCodes={dialCodesFor(iso)}
                defaultIso={iso ?? defaultIso}
                defaultCountry={countryName}
              />
            </span>

            {/* Mobile menu. <details> keeps it working with no JavaScript. */}
            <details className="relative xl:hidden">
              <summary className="flex size-9 cursor-pointer list-none items-center justify-center rounded-full text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink">
                <ListIcon size={22} aria-hidden />
                <span className="sr-only">{nav.menuLabel}</span>
              </summary>
              <nav
                aria-label={nav.menuLabel}
                className="absolute end-0 z-50 mt-2 max-h-[calc(100dvh-5rem)] w-72 overflow-y-auto rounded-2xl bg-surface p-2 shadow-lift ring-1 ring-hairline"
              >
                {nav.items.map((entry) => (
                  <div key={entry.label}>
                    <a
                      href={resolveHref(entry.href, home)}
                      aria-current={entry.href === current ? "page" : undefined}
                      className="flex min-h-12 items-center rounded-lg px-3 text-base text-ink transition-colors hover:bg-surface-2 aria-[current=page]:bg-surface-2 aria-[current=page]:font-medium"
                    >
                      {entry.label}
                    </a>
                    {entry.finder ? (
                      <a
                        href={resolveHref(entry.finder.href, home)}
                        className="mx-1 my-1 flex min-h-11 items-center gap-2 rounded-lg bg-deep px-3 text-[0.9375rem] font-medium text-white transition-colors hover:bg-deep/90"
                      >
                        <HandPointingIcon size={18} weight="fill" className="text-glow" aria-hidden />
                        {entry.finder.title}
                      </a>
                    ) : null}
                    {entry.items?.map((link) => (
                      <a
                        key={link.href}
                        href={resolveHref(link.href, home)}
                        className="flex min-h-11 items-center rounded-lg ps-7 pe-3 text-[0.9375rem] text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                ))}
                <a
                  href={nav.contact.href}
                  className="mt-1 flex min-h-12 items-center rounded-lg border-t border-hairline px-3 text-base font-medium text-accent transition-colors hover:bg-surface-2"
                >
                  {nav.contact.label}
                </a>
              </nav>
            </details>

            {/* Country and language, one choice: always the last thing on the right. */}
            <LanguageSwitch iso={iso} />
          </div>
        </Container>
      </div>
    </header>
  );
}
