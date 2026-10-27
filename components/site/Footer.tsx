import Image from "next/image";
import Link from "@/components/ui/Link";
import { EnvelopeSimpleIcon } from "@phosphor-icons/react/dist/ssr/EnvelopeSimple";
import { PhoneIcon } from "@phosphor-icons/react/dist/ssr/Phone";
import { WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr/WhatsappLogo";
import { emailHref, phoneHref, whatsappHref } from "@/lib/contact";
import travgrubLogo from "@/public/brand/travgrub-logo.png";
import { Container } from "@/components/ui/Container";
import { resolveHref } from "./resolveHref";
import { SocialLinks } from "./SocialLinks";
import { hiddenLink, showUpcoming } from "@/lib/preview";
import { getText } from "@/lib/i18n/text";

export async function Footer({ home = "/" }: { home?: string }) {
  const { site } = await getText();
  const { footer, brand, contact, company } = site;
  const year = new Date().getFullYear();

  const reach = [
    {
      label: footer.contact.whatsapp,
      value: contact.whatsapp.display,
      href: whatsappHref,
      Icon: WhatsappLogoIcon,
      external: true,
    },
    {
      label: footer.contact.phone,
      value: contact.phone.display,
      href: phoneHref,
      Icon: PhoneIcon,
      external: false,
    },
    {
      label: footer.contact.email,
      value: contact.email,
      href: emailHref,
      Icon: EnvelopeSimpleIcon,
      external: false,
    },
  ];

  // Each company detail appears as soon as it is filled in.
  const details = [
    {
      label: footer.company.registeredAddress,
      value: company.registeredAddress,
    },
    { label: footer.company.gstin, value: company.gstin },
  ].filter(
    (detail): detail is { label: string; value: string } =>
      detail.value !== null,
  );

  return (
    <footer className="border-t border-hairline bg-surface-2 pt-14 pb-8 sm:pt-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Who we are and how to reach us. */}
          <div className="lg:col-span-4">
            <p className="max-w-[22ch] font-display text-xl font-semibold tracking-[-0.02em]">
              {brand.tagline}
            </p>

            <ul className="mt-6 space-y-2">
              {reach.map(({ label, value, href, Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener" : undefined}
                    className="group inline-flex min-h-9 items-center gap-2.5 text-[0.9375rem] text-ink-2 transition-colors hover:text-ink"
                  >
                    <Icon
                      size={17}
                      className="shrink-0 text-accent"
                      aria-hidden
                    />
                    <span className="sr-only">{label}: </span>
                    <span className="underline-offset-4 group-hover:underline">
                      {value}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <SocialLinks className="mt-5" />
          </div>

          {/* Links, four short columns. */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-8">
            {footer.columns.map((column) => (
              <div key={column.heading}>
                <p className="text-[0.8125rem] font-medium tracking-[0.08em] text-ink-3 uppercase">
                  {column.heading}
                </p>
                <ul className="mt-4 space-y-0.5">
                  {column.items
                    .filter((item) => !hiddenLink(item.href))
                    .map((item) => (
                      <li key={item.label}>
                        <Link
                          href={resolveHref(item.href, home)}
                          className="flex min-h-9 w-fit items-center text-[0.9375rem] text-ink-2 transition-colors hover:text-accent"
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

        {/* The company behind Medsafar, and the fine print. */}
        <div className="mt-14 border-t border-hairline pt-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            {/* Travgrub's own red and grey live in this logo only. */}
            <Image
              src={travgrubLogo}
              alt={footer.parentLogoAlt}
              width={80}
              height={28}
              className="h-7 w-auto"
            />
            <p className="text-[0.9375rem] text-ink-2">{footer.legalName}</p>
          </div>
          <div className="mt-4 max-w-[80ch] space-y-2 text-[0.8125rem] leading-relaxed text-ink-3">
            {(showUpcoming
              ? [...footer.lines, footer.payment]
              : footer.lines
            ).map((line) => (
              <p key={line}>{line}</p>
            ))}
            {details.length > 0 ? (
              <dl className="flex flex-wrap gap-x-6 gap-y-1">
                {details.map((detail) => (
                  <div key={detail.label} className="flex flex-wrap gap-x-2">
                    <dt>{detail.label}:</dt>
                    <dd className="text-ink-2">{detail.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>
          <p className="mt-6 text-[0.8125rem] text-ink-3">
            © {year} {brand.name} {brand.country}. {footer.copyright}
          </p>
        </div>
      </Container>
    </footer>
  );
}
