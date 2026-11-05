import Image from "next/image";
import Link from "@/components/ui/Link";
import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr/CaretDown";
import { CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle";
import { EnvelopeSimpleIcon } from "@phosphor-icons/react/dist/ssr/EnvelopeSimple";
import { HandPointingIcon } from "@phosphor-icons/react/dist/ssr/HandPointing";
import { HospitalIcon } from "@phosphor-icons/react/dist/ssr/Hospital";
import { ListIcon } from "@phosphor-icons/react/dist/ssr/List";
import { MapPinIcon } from "@phosphor-icons/react/dist/ssr/MapPin";
import { StethoscopeIcon } from "@phosphor-icons/react/dist/ssr/Stethoscope";
import { PhoneIcon } from "@phosphor-icons/react/dist/ssr/Phone";
import { WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr/WhatsappLogo";
import type { NavEntry, NavItem } from "@/content/types";
import { defaultIso } from "@/content/dial-codes";
import { getDoctors, getHospitals, getSpecialities, nameOf } from "@/lib/catalog";
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
import { isUploaded } from "@/lib/uploaded";
import { SpecialityIcon } from "@/components/ui/SpecialityIcon";

/** The links inside each dropdown. Catalog menus are read fresh, so a new
 *  speciality, hospital or doctor shows up without touching this file.
 *  Every catalog menu carries photos, so it can be read at a glance. */
async function menuLinks(
  plain: Record<string, string>,
): Promise<Record<string, (NavItem & { slug?: string })[]>> {
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
      focus: h.picture.focus,
    })),
    // Faces first: one doctor from each speciality, then the rest, up to
    // two rows of four.
    doctors: [
      ...specialities.flatMap((s) => doctors.find((d) => d.speciality === s.slug) ?? []),
      ...doctors,
    ]
      .filter((d, i, all) => all.indexOf(d) === i)
      .slice(0, 8)
      .map((d) => ({
        label: d.name,
        href: `/doctors/${d.slug}`,
        note: plain[d.speciality] ?? nameOf(specialities, d.speciality),
        image: !d.picture.pending && d.picture.src ? d.picture.src : undefined,
      })),
    doctorSpecialities: specialities
      .filter((s) => withDoctors.has(s.slug))
      .map((s) => ({
        label: plain[s.slug] ?? s.name,
        href: `/doctors?speciality=${s.slug}`,
        note: String(doctors.filter((d) => d.speciality === s.slug).length),
        image: specialityPhoto(s.slug)?.src ?? undefined,
        slug: s.slug,
      })),
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
          the language. It scrolls away; the header below stays. Over the
          home photo it floats, so the photo runs to the top of the screen. */}
      <div
        data-intro-slide
        className={`band-deep z-40 hidden text-[0.8125rem] tracking-[0.01em] lg:block ${overlay ? "absolute inset-x-0 top-0" : "relative"}`}
      >
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
        data-intro-slide
        className={`pointer-events-none sticky top-0 z-40 px-3 sm:px-6 ${overlay ? "-mb-16 lg:mt-9 lg:-mb-[6.5rem]" : ""}`}
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

                // Catalog menus open as one wide panel of photo tiles, centred
                // on the whole nav rather than on their own link.
                const wide = Boolean(entry.menu);
                const pictured = links.some((l) => l.image);
                return (
                  <div
                    key={entry.label}
                    className={`group ${wide ? "" : "relative"}`}
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
                        wide
                          ? "start-1/2 -translate-x-1/2 rtl:translate-x-1/2"
                          : "start-0"
                      }`}
                    >
                      <div
                        className={`rounded-2xl bg-surface p-3 shadow-lift ring-1 ring-hairline ${
                          wide
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

                        {entry.menu === "hospitals" ? (
                          <ul className="grid grid-cols-4 gap-2">
                            {links.map((link) => (
                              <li key={link.href}>
                                <Link
                                  href={resolveHref(link.href, home)}
                                  className="group/tile block rounded-xl p-1.5 transition-colors hover:bg-surface-2"
                                >
                                  <span className="relative grid aspect-[16/10] place-items-center overflow-hidden rounded-lg bg-surface-2 text-ink-3">
                                    {link.image ? (
                                      <Image
                                        src={link.image} unoptimized={isUploaded(link.image)}
                                        alt=""
                                        fill
                                        sizes="200px"
                                        style={link.focus ? { objectPosition: link.focus } : undefined}
                                        className="object-cover transition-transform duration-500 ease-(--ease-soft) group-hover/tile:scale-[1.05]"
                                      />
                                    ) : (
                                      <HospitalIcon size={24} aria-hidden />
                                    )}
                                  </span>
                                  <span className="mt-2 block px-0.5 text-[0.9375rem] leading-snug font-medium text-ink group-hover/tile:text-accent">
                                    {link.label}
                                  </span>
                                  {link.note ? (
                                    <span className="mt-0.5 flex items-center gap-1 px-0.5 text-sm text-ink-3">
                                      <MapPinIcon size={13} weight="fill" className="text-accent" aria-hidden />
                                      {link.note}
                                    </span>
                                  ) : null}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        ) : entry.menu === "doctors" ? (
                          <div className="grid grid-cols-12 gap-4">
                            <ul className="col-span-8 grid grid-cols-4 gap-2">
                              {links.map((link) => (
                                <li key={link.href}>
                                  <Link
                                    href={resolveHref(link.href, home)}
                                    className="group/tile block rounded-xl p-1.5 transition-colors hover:bg-surface-2"
                                  >
                                    <span className="relative grid aspect-square place-items-center overflow-hidden rounded-lg bg-accent-soft text-accent">
                                      {link.image ? (
                                        <Image
                                          src={link.image} unoptimized={isUploaded(link.image)}
                                          alt=""
                                          fill
                                          sizes="140px"
                                          className="object-cover object-top transition-transform duration-500 ease-(--ease-soft) group-hover/tile:scale-[1.05]"
                                        />
                                      ) : (
                                        <StethoscopeIcon size={26} aria-hidden />
                                      )}
                                    </span>
                                    <span className="mt-2 block px-0.5 text-sm leading-snug font-medium text-ink group-hover/tile:text-accent">
                                      {link.label}
                                    </span>
                                    {link.note ? (
                                      <span className="mt-0.5 block px-0.5 text-[0.8125rem] leading-snug text-ink-3">
                                        {link.note}
                                      </span>
                                    ) : null}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                            <div className="col-span-4 border-s border-hairline ps-4">
                              <p className="px-3 pt-1.5 pb-2 text-sm font-medium text-ink-3">{nav.bySpeciality}</p>
                              <ul>
                                {menus.doctorSpecialities.map((link) => (
                                  <li key={link.href}>
                                    <Link
                                      href={resolveHref(link.href, home)}
                                      className="group/row flex min-h-10 items-center gap-2.5 rounded-lg px-3 text-[0.9375rem] text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
                                    >
                                      <SpecialityIcon slug={link.slug ?? ""} size={17} className="shrink-0 text-accent" aria-hidden />
                                      <span className="flex-1 leading-snug">{link.label}</span>
                                      <span className="rounded-full bg-surface-2 px-2 py-0.5 text-xs text-ink-3 tabular-nums group-hover/row:bg-surface">
                                        {link.note}
                                      </span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ) : wide ? (
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
                                        src={link.image} unoptimized={isUploaded(link.image)}
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
                                        src={link.image} unoptimized={isUploaded(link.image)}
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
                  className="fixed inset-x-4 top-20 z-50 max-h-[calc(100dvh-12.5rem)] overflow-y-auto overscroll-contain lg:max-h-[calc(100dvh-6rem)] rounded-2xl sm:absolute sm:inset-x-auto sm:end-0 sm:top-auto sm:mt-2 sm:w-[22rem] bg-surface p-2 shadow-lift ring-1 ring-hairline"
                >
                  {nav.items.map((entry) => {
                    const hasSub = Boolean(entry.menu || entry.items?.length);
                    if (!hasSub) {
                      return (
                        <a
                          key={entry.label}
                          href={resolveHref(entry.href, home, lang.code)}
                          aria-current={
                            entry.href === current ? "page" : undefined
                          }
                          className="flex min-h-13 items-center rounded-lg px-3 text-[1.0625rem] font-medium text-ink transition-colors hover:bg-surface-2 aria-[current=page]:bg-surface-2"
                        >
                          {entry.label}
                        </a>
                      );
                    }
                    return (
                    <details key={entry.label} name="header-submenu" className="group/sub">
                      <summary
                        aria-current={
                          entry.href === current ? "page" : undefined
                        }
                        className="flex min-h-13 cursor-pointer list-none items-center justify-between gap-2 rounded-lg px-3 text-[1.0625rem] font-medium text-ink transition-colors hover:bg-surface-2 group-open/sub:bg-surface-2 aria-[current=page]:bg-surface-2 [&::-webkit-details-marker]:hidden"
                      >
                        {entry.label}
                        <CaretDownIcon
                          size={16}
                          weight="bold"
                          className="shrink-0 text-ink-3 transition-transform duration-200 group-open/sub:rotate-180"
                          aria-hidden
                        />
                      </summary>
                      <div className="pt-1 pb-2">
                      <a
                        href={resolveHref(entry.href, home, lang.code)}
                        className="flex min-h-11 items-center rounded-lg px-3 text-base font-medium text-accent transition-colors hover:bg-surface-2"
                      >
                        {entry.all ?? entry.label} →
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
                      {entry.menu ? (
                        <ul className="grid grid-cols-2 gap-1.5 p-1">
                          {menus[entry.menu === "doctors" ? "doctorSpecialities" : entry.menu].map((link) => (
                            <li key={link.href}>
                              <a
                                href={resolveHref(link.href, home, lang.code)}
                                className="flex items-center gap-2 rounded-lg p-1.5 text-sm leading-tight text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
                              >
                                <span className="relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-md bg-surface-2 text-ink-3">
                                  {link.image ? (
                                    <Image
                                      src={link.image} unoptimized={isUploaded(link.image)}
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
                    </details>
                    );
                  })}
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
              <LanguageSwitch />
            </div>
          </Container>
        </div>
      </header>
    </>
  );
}
