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
  "relative flex min-h-11 items-center gap-1 rounded-full px-3.5 text-[0.9375rem] whitespace-nowrap text-ink-2 transition-colors duration-200 hover:bg-brand/10 hover:text-ink aria-[current=page]:font-medium aria-[current=page]:text-ink";

const panelLink =
  "flex min-h-10 items-center rounded-lg px-3 text-[0.9375rem] text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink";

export async function Header({
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
  const menus = await menuLinks();
  const linksOf = (entry: NavEntry) => (entry.menu ? menus[entry.menu] : (entry.items ?? []));

  return (
    <header className="sticky top-0 z-40 bg-bg/80 shadow-[0_8px_24px_-20px_rgb(11_61_49/0.35)] backdrop-blur-xl">
        <Container className="flex h-16 items-center justify-between gap-4">
          <Logo href={home} />

          {/* Seven entries need the room, so narrower screens use the menu
              button instead. Dropdowns open on hover or keyboard focus. */}
          <nav aria-label={nav.menuLabel} className="relative hidden items-center gap-0.5 xl:flex">
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
                      size={12}
                      className="text-ink-3 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
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
            <NavUnderline current={current} />
          </nav>

          <div className="flex items-center justify-end gap-1 sm:gap-2">
            <LanguageSwitch iso={iso} />

            <span className="hidden sm:block">
              <Link
                href={nav.contact.href}
                aria-current={current === nav.contact.href ? "page" : undefined}
                className="inline-flex min-h-11 items-center rounded-full px-4 text-[0.9375rem] font-medium text-ink-2 transition-colors hover:bg-brand/10 hover:text-ink aria-[current=page]:text-ink"
              >
                {nav.contact.label}
              </Link>
            </span>

            {/* The shorter of the two approved labels. The long one is on the
                buttons that actually carry the page. */}
            <span className="hidden lg:block">
              <ConsultationDialog
                label={cta.secondary}
                className={`${btnPrimary.replace("rounded-md", "rounded-full")} min-h-11 px-5 text-[0.875rem]`}
                text={site.consultation}
                form={site.form}
                dialCodes={dialCodesFor(iso)}
                defaultIso={iso ?? defaultIso}
                defaultCountry={countryName}
              />
            </span>

            {/* Mobile menu. <details> keeps it working with no JavaScript. */}
            <details className="relative xl:hidden">
              <summary className="flex size-11 cursor-pointer list-none items-center justify-center rounded-full text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink">
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
          </div>
        </Container>
      </header>
  );
}
