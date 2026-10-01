import Image from "next/image";
import Link from "next/link";
import { EnvelopeSimpleIcon } from "@phosphor-icons/react/dist/ssr/EnvelopeSimple";
import { PhoneIcon } from "@phosphor-icons/react/dist/ssr/Phone";
import { WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr/WhatsappLogo";
import { site } from "@/content/site";
import { emailHref, phoneHref, whatsappHref } from "@/lib/contact";
import travgrubLogo from "@/public/brand/travgrub-logo.png";
import { Container } from "@/components/ui/Container";
import { resolveHref } from "./resolveHref";

export function Footer({ home = "/" }: { home?: string }) {
  const { footer, brand, contact, company } = site;
  const year = new Date().getFullYear();

  const reach = [
    { label: footer.contact.whatsapp, value: contact.whatsapp.display, href: whatsappHref, Icon: WhatsappLogoIcon, external: true },
    { label: footer.contact.phone, value: contact.phone.display, href: phoneHref, Icon: PhoneIcon, external: false },
    { label: footer.contact.email, value: contact.email, href: emailHref, Icon: EnvelopeSimpleIcon, external: false },
  ];

  // Each company detail appears as soon as it is filled in.
  const details = [
    { label: footer.company.registeredAddress, value: company.registeredAddress },
    { label: footer.company.gstin, value: company.gstin },
  ].filter((detail): detail is { label: string; value: string } => detail.value !== null);

  return (
    <footer className="border-t border-hairline bg-surface-2 py-16 sm:py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="font-display text-2xl font-bold tracking-[-0.02em]">{brand.tagline}</p>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
              {/* Travgrub's own red and grey live in this logo only. */}
              <Image
                src={travgrubLogo}
                alt={footer.parentLogoAlt}
                width={92}
                height={32}
                className="h-8 w-auto"
              />
              <p className="text-base text-ink-2">{footer.legalName}</p>
            </div>

            <div className="mt-6 max-w-[58ch] space-y-3">
              {footer.lines.map((line) => (
                <p key={line} className="text-sm text-ink-3">
                  {line}
                </p>
              ))}
            </div>

            <div className="mt-10">
              <p className="text-sm font-medium text-ink">{footer.contact.heading}</p>
              <ul className="mt-3 space-y-1">
                {reach.map(({ label, value, href, Icon, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener" : undefined}
                      className="group flex min-h-11 items-center gap-3 text-base text-ink-2 transition-colors hover:text-ink"
                    >
                      <Icon size={20} className="shrink-0 text-accent" aria-hidden />
                      <span className="w-20 shrink-0 text-sm text-ink-3">{label}</span>
                      <span className="underline-offset-4 group-hover:underline">{value}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {details.length > 0 ? (
              <dl className="mt-8 max-w-[58ch] space-y-2 text-sm">
                {details.map((detail) => (
                  <div key={detail.label} className="flex flex-wrap gap-x-3">
                    <dt className="text-ink-3">{detail.label}</dt>
                    <dd className="text-ink-2">{detail.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
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

        <div className="mt-16 border-t border-hairline pt-8 text-sm text-ink-3">
          <p>
            © {year} {brand.name} {brand.country}. {footer.copyright}
          </p>
        </div>
      </Container>
    </footer>
  );
}
