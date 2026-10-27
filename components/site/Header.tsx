import Image from "next/image";
import Link from "@/components/ui/Link";
import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr/CaretDown";
import { CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle";
import { EnvelopeSimpleIcon } from "@phosphor-icons/react/dist/ssr/EnvelopeSimple";
import { HandPointingIcon } from "@phosphor-icons/react/dist/ssr/HandPointing";
import { HospitalIcon } from "@phosphor-icons/react/dist/ssr/Hospital";
import { ListIcon } from "@phosphor-icons/react/dist/ssr/List";
import { PhoneIcon } from "@phosphor-icons/react/dist/ssr/Phone";
import { WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr/WhatsappLogo";
import type { NavEntry, NavItem } from "@/content/types";
import { defaultIso } from "@/content/dial-codes";
import { getDoctors, getHospitals, getSpecialities } from "@/lib/catalog";
import { specialityPhoto } from "@/data/treatmentPhotos";
import { Container } from "@/components/ui/Container";
import { btnPrimary } from "@/components/ui/styles";
import { ConsultationDialog } from "./ConsultationDialog";
import { LanguageSwitch } from "./LanguageSwitch";
import { Logo } from "./Logo";
import { NavUnderline } from "./NavUnderline";
import { resolveHref } from "./resolveHref";
import { getLang, getText } from "@/lib/i18n/text";
import { dialCodesFor } from "@/lib/i18n/dialCodes";

/** The links inside each dropdown. Catalog menus are read fresh, so a new
 *  speciality, hospital or doctor shows up without touching this file.
 *  Treatments and hospitals carry a photo, so the menu can be read at a glance. */
async function menuLinks(
  plain: Record<string, string>,
): Promise<Record<string, NavItem[]>> {
  const [specialities, hospitals, doctors] = await Promise.all([
    getSpecialities(),
    getHospitals(),
    getDoctors(),
  ]);
  const withDoctors = new Set(doctors.map((d) => d.speciality));

  return {
    treatments: specialities.map((s) => ({
      label: plain[s.slug] ?? s.name,
      href: `/treatments#${s.slug}`,
      image: specialityPhoto(s.slug)?.src ?? undefined,
    })),
    hospitals: hospitals.map((h) => ({
      label: h.name,
      href: `/hospitals/${h.slug}`,
      note: h.city,
      image: !h.picture.pending && h.picture.src ? h.picture.src : undefined,
    })),
    doctors: specialities
      .filter((s) => withDoctors.has(s.slug))
      .map((s) => ({ label: s.name, href: `/doctors?speciality=${s.slug}` })),
  };
}

const topLink =
  "relative flex h-10 items-center gap-1 px-3 text-[0.9375rem] whitespace-nowrap text-ink-2 transition-colors duration-200 hover:text-ink aria-[current=page]:text-ink";

const panelLink =
  "flex min-h-11 items-center rounded-lg px-3 text-[0.9375rem] text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink";

const barLink =
  "inline-flex items-center gap-1.5 text-white/70 transition-colors hover:text-white";

export async function Header({
  home,
  current,
  iso = null,
  countryName = "",
  place,
  overlay = false,
}: {
  /** On the home page, the country it was drawn for. */
  place?: string;
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
  const [{ site, plainSpeciality }, lang] = await Promise.all([
    getText(),
    getLang(),
  ]);
  const { nav, cta, contact } = site;
  const menus = await menuLinks(plainSpeciality);
  const linksOf = (entry: NavEntry) =>
    entry.menu ? menus[entry.menu] : (entry.items ?? []);

  return (
    <>
      {/* A slim bar above the header on computers: how to reach a person, and
          the language. It scrolls away; the header below stays. */}
      <div className="band-deep relative z-40 hidden text-[0.8125rem] tracking-[0.01em] lg:block">
        <Container className="flex h-9 items-center gap-6">
          <a href={`tel:${contact.phone.number}`} className={barLink}>
            <PhoneIcon size={14} className="text-glow" aria-hidden />
            <span className="sr-only">{nav.top.call}: </span>
            {contact.phone.display}
          </a>
          <a
            href={`https://wa.me/${contact.whatsapp.number}?text=${encodeURIComponent(contact.whatsapp.message)}`}
            className={barLink}
          >
            <WhatsappLogoIcon size={14} className="text-glow" aria-hidden />
            {nav.top.whatsapp}
          </a>
          <a href={`mailto:${contact.email}`} className={barLink}>
            <EnvelopeSimpleIcon size={14} className="text-glow" aria-hidden />
            <span className="sr-only">{nav.top.email}: </span>
            {contact.email}
          </a>
          <p className="ms-auto inline-flex items-center gap-1.5 text-white/70">
            <CheckCircleIcon
              size={16}
              weight="fill"
              className="text-glow"
              aria-hidden
            />
            {nav.top.free}
          </p>
        </Container>
      </div>

      <header
        className={`pointer-events-none sticky top-0 z-40 px-3 sm:px-6 ${overlay ? "-mb-16 lg:-mb-[4.25rem]" : ""}`}
      >
        {/* A bar hanging from the top of the screen, rounded below. Beside it
            the page shows through. */}
        <div className="nav-notch pointer-events-auto relative mx-auto max-w-[80rem] rounded-b-[1.75rem] shadow-[0_12px_30px_-18px_rgb(2_20_16/0.4)]">
          <Container className="flex h-16 items-center gap-3 px-4! sm:gap-6 sm:px-7! lg:h-[4.25rem]">
            <Logo href={home} />

            {/* Six entries need the room, so narrower screens use the menu
                button instead. Dropdowns open on hover or keyboard focus. */}
            <nav
              aria-label={nav.menuLabel}
              className="relative hidden flex-1 items-center justify-center gap-1 xl:flex"
            >
              {nav.items.map((entry) => {
                const links = linksOf(entry);
                const href = resolveHref(entry.href, home);
                const isCurrent = entry.href === current ? "page" : undefined;

                if (links.length === 0) {
                  return (
                    <Link
                      key={entry.label}
                      data-nav-top
                      href={href}
                      aria-current={isCurrent}
                      className={topLink}
                    >
                      {entry.label}
                    </Link>
                  );
                }

                const treatments = entry.menu === "treatments";
                const pictured = links.some((l) => l.image);
                return (
                  // The wide treatments panel centres on the whole nav, not on its own link.
                  <div
                    key={entry.label}
                    className={`group ${treatments ? "" : "relative"}`}
                  >
                    <Link
                      data-nav-top
                      href={href}
                      aria-current={isCurrent}
                      aria-haspopup="true"
                      className={topLink}
                    >
                      {entry.label}
                      <CaretDownIcon
                        size={11}
                        weight="bold"
                        className="text-ink-3 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                        aria-hidden
                      />
                    </Link>
                    {/* The top padding bridges the gap, so the panel stays open
                        while the pointer moves down to it. */}
                    <div
                      className={`invisible absolute top-full z-50 pt-3 opacity-0 transition-[opacity,visibility] duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100 ${
                        treatments
                          ? "start-1/2 -translate-x-1/2 rtl:translate-x-1/2"
                          : "start-0"
                      }`}
                    >
                      <div
                        className={`rounded-2xl bg-surface p-3 shadow-lift ring-1 ring-hairline ${
                          treatments
                            ? "w-[54rem]"
                            : pictured
                              ? "w-[26rem]"
                              : "w-80"
                        }`}
                      >
                        {entry.finder ? (
                          <Link
                            href={resolveHref(entry.finder.href, home)}
                            className="group/finder mb-3 flex items-center gap-4 rounded-xl bg-deep p-4 text-white transition-[background-color] duration-300 ease-(--ease-soft) hover:bg-deep/90"
                          >
                            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white/10 text-glow">
                              <HandPointingIcon
                                size={24}
                                weight="fill"
                                aria-hidden
                              />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-[1.0625rem] font-medium">
                                {entry.finder.title}
                              </span>
                              <span className="mt-0.5 block text-[0.9375rem] text-white/75">
                                {entry.finder.text}
                              </span>
                            </span>
                            <span
                              aria-hidden
                              className="text-xl text-glow transition-[translate] duration-300 ease-(--ease-soft) group-hover/finder:translate-x-1 rtl:rotate-180"
                            >
                              →
                            </span>
                          </Link>
                        ) : null}

                        {treatments ? (
                          <ul className="grid grid-cols-4 gap-1">
                            {links.map((link) => (
                              <li key={link.href}>
                                <Link
                                  href={resolveHref(link.href, home)}
                                  className="group/tile flex items-center gap-3 rounded-xl p-1.5 transition-colors hover:bg-surface-2"
                                >
                                  <span className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-surface-2">
                                    {link.image ? (
                                      <Image
                                        src={link.image}
                                        alt=""
                                        fill
                                        sizes="56px"
                                        className="object-cover transition-transform duration-500 group-hover/tile:scale-[1.08]"
                                      />
                                    ) : null}
                                  </span>
                                  <span className="text-[0.9375rem] leading-snug font-medium text-ink group-hover/tile:text-accent">
                                    {link.label}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        ) : pictured ? (
                          <ul className="space-y-1">
                            {links.map((link) => (
                              <li key={link.href}>
                                <Link
                                  href={resolveHref(link.href, home)}
                                  className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-surface-2"
                                >
                                  <span className="relative grid size-14 shrink-0 place-items-center overflow-hidden rounded-lg bg-surface-2 text-ink-3">
                                    {link.image ? (
                                      <Image
                                        src={link.image}
                                        alt=""
                                        fill
                                        sizes="56px"
                                        className="object-cover"
                                      />
                                    ) : (
                                      <HospitalIcon size={22} aria-hidden />
                                    )}
                                  </span>
                                  <span className="min-w-0">
                                    <span className="block text-[0.9375rem] leading-snug font-medium text-ink">
                                      {link.label}
                                    </span>
                                    {link.note ? (
                                      <span className="block text-sm text-ink-3">
                                        {link.note}
                                      </span>
                                    ) : null}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <ul>
                            {links.map((link) => (
                              <li key={link.href}>
                                <Link
                                  href={resolveHref(link.href, home)}
                                  className={panelLink}
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}

                        {entry.all ? (
                          <Link
                            href={href}
                            className="mt-2 flex min-h-11 items-center border-t border-hairline px-3 pt-2 text-base font-medium text-accent transition-colors hover:text-accent-hover"
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

            <div className="ms-auto flex items-center gap-2 xl:ms-0">
              {/* The shorter of the two approved labels. The long one is on the
                  buttons that actually carry the page. */}
              <span className="hidden lg:block">
                <ConsultationDialog
                  label={cta.secondary}
                  className={`${btnPrimary.replace("rounded-md", "rounded-full").replace("min-h-13", "h-10")} px-4.5 text-[0.875rem] sm:px-4.5`}
                  text={site.consultation}
                  form={site.form}
                  dialCodes={dialCodesFor(iso, lang.code)}
                  defaultIso={iso ?? defaultIso}
                  defaultCountry={countryName}
                />
              </span>

              {/* Mobile menu. <details> keeps it working with no JavaScript. */}
              <details name="header-menu" className="relative open:z-[60] xl:hidden">
                <summary className="flex h-9 cursor-pointer list-none items-center gap-2 rounded-full px-2.5 text-ink-2 ring-1 ring-hairline transition-colors hover:bg-surface-2 hover:text-ink sm:px-3">
                  <ListIcon size={19} aria-hidden />
                  <span className="hidden text-[0.875rem] sm:inline">
                    {nav.menuLabel}
                  </span>
                </summary>
                {/* On a phone the menu spans the screen, so nothing is cut off. */}
                <nav
                  aria-label={nav.menuLabel}
                  className="fixed inset-x-4 top-20 z-50 max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-2xl sm:absolute sm:inset-x-auto sm:end-0 sm:top-auto sm:mt-2 sm:w-[22rem] bg-surface p-2 shadow-lift ring-1 ring-hairline"
                >
                  {nav.items.map((entry) => (
                    <div key={entry.label}>
                      <a
                        href={resolveHref(entry.href, home, lang.code)}
                        aria-current={
                          entry.href === current ? "page" : undefined
                        }
                        className="flex min-h-13 items-center rounded-lg px-3 text-[1.0625rem] font-medium text-ink transition-colors hover:bg-surface-2 aria-[current=page]:bg-surface-2"
                      >
                        {entry.label}
                      </a>
                      {entry.finder ? (
                        <a
                          href={resolveHref(entry.finder.href, home, lang.code)}
                          className="mx-1 my-1 flex min-h-12 items-center gap-2 rounded-lg bg-deep px-3 text-base font-medium text-white transition-colors hover:bg-deep/90"
                        >
                          <HandPointingIcon
                            size={20}
                            weight="fill"
                            className="text-glow"
                            aria-hidden
                          />
                          {entry.finder.title}
                        </a>
                      ) : null}
                      {entry.menu === "treatments" ? (
                        <ul className="grid grid-cols-2 gap-1.5 p-1">
                          {menus.treatments.map((link) => (
                            <li key={link.href}>
                              <a
                                href={resolveHref(link.href, home, lang.code)}
                                className="flex items-center gap-2 rounded-lg p-1.5 text-sm leading-tight text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
                              >
                                <span className="relative size-9 shrink-0 overflow-hidden rounded-md bg-surface-2">
                                  {link.image ? (
                                    <Image
                                      src={link.image}
                                      alt=""
                                      fill
                                      sizes="36px"
                                      className="object-cover"
                                    />
                                  ) : null}
                                </span>
                                {link.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      {entry.items?.map((link) => (
                        <a
                          key={link.href}
                          href={resolveHref(link.href, home, lang.code)}
                          className="flex min-h-11 items-center rounded-lg ps-7 pe-3 text-base text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  ))}
                  <a
                    href={resolveHref(nav.contact.href, home, lang.code)}
                    className="mt-1 flex min-h-13 items-center rounded-lg border-t border-hairline px-3 text-[1.0625rem] font-medium text-accent transition-colors hover:bg-surface-2"
                  >
                    {nav.contact.label}
                  </a>
                  <div className="mt-1 grid grid-cols-2 gap-2 border-t border-hairline p-2">
                    <a
                      href={`tel:${contact.phone.number}`}
                      className="flex min-h-12 items-center justify-center gap-2 rounded-lg bg-surface-2 text-base font-medium text-ink"
                    >
                      <PhoneIcon
                        size={18}
                        className="text-accent"
                        aria-hidden
                      />
                      {nav.top.call}
                    </a>
                    <a
                      href={`https://wa.me/${contact.whatsapp.number}?text=${encodeURIComponent(contact.whatsapp.message)}`}
                      className="flex min-h-12 items-center justify-center gap-2 rounded-lg bg-surface-2 text-base font-medium text-ink"
                    >
                      <WhatsappLogoIcon
                        size={18}
                        className="text-accent"
                        aria-hidden
                      />
                      {nav.top.whatsapp}
                    </a>
                  </div>
                </nav>
              </details>

              {/* Country (the home page's photos) and language (the whole site):
                  always the last things on the right. */}
              <LanguageSwitch place={place} />
            </div>
          </Container>
        </div>
      </header>
    </>
  );
}
