import type { Metadata } from "next";
import { EnvelopeSimpleIcon } from "@phosphor-icons/react/dist/ssr/EnvelopeSimple";
import { MapPinIcon } from "@phosphor-icons/react/dist/ssr/MapPin";
import { PhoneIcon } from "@phosphor-icons/react/dist/ssr/Phone";
import { WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr/WhatsappLogo";
import { contact } from "@/content/pages";
import { site } from "@/content/site";
import { defaultIso, dialCodesFor } from "@/content/dial-codes";
import { PageShell } from "@/components/site/PageShell";
import { PageHead } from "@/components/catalog/PageHead";
import { SocialLinks } from "@/components/site/SocialLinks";
import { EnquiryForm } from "@/components/form/EnquiryForm";
import { Faq } from "@/components/sections/Faq";
import { Mark } from "@/components/ui/Pending";
import { Note, Section, SectionHead } from "@/components/ui/Section";

/** Shared page: one copy for every country. The form and the direct ways to
 *  reach Medsafar sit side by side, then what happens next, then questions. */

export const metadata: Metadata = {
  title: contact.meta.title,
  description: contact.meta.description,
  alternates: { canonical: "/contact" },
};

const icons: Record<string, typeof PhoneIcon> = {
  WhatsApp: WhatsappLogoIcon,
  Phone: PhoneIcon,
  Email: EnvelopeSimpleIcon,
  Office: MapPinIcon,
};

export default function Page() {
  const { details, form, steps, why, faq } = contact;

  return (
    <PageShell>
      <PageHead heading={contact.heading} intro={contact.intro} tight />

      <Section className="!pt-6 sm:!pt-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div id="plan" className="min-w-0 scroll-mt-24 lg:order-2 lg:col-span-7">
            <div className="rounded-xl bg-accent-soft p-3 sm:p-5">
              <div className="rounded-lg bg-surface p-5 shadow-card sm:p-8">
                <h2 className="font-display text-2xl font-semibold tracking-[-0.02em]">{form.heading}</h2>
                <p className="mt-2 text-base text-ink-2">{form.intro}</p>
                <div className="mt-6">
                  <EnquiryForm
                    text={site.form}
                    dialCodes={dialCodesFor(null)}
                    defaultIso={defaultIso}
                    defaultCountry=""
                    defaultTreatment=""
                    source="/contact"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="min-w-0 lg:order-1 lg:col-span-5">
            <h2 className="font-display text-2xl font-semibold tracking-[-0.02em]">{details.heading}</h2>
            <p className="mt-2 text-base text-ink-2">{details.intro}</p>

            <ul className="mt-6 space-y-3">
              {details.items.map((item) => {
                const Icon = icons[item.label] ?? MapPinIcon;
                const external = item.href?.startsWith("https:");
                const body = (
                  <>
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                      <Icon size={22} aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="flex flex-wrap items-baseline gap-x-2 text-sm text-ink-3">
                        <span className="font-medium text-ink">{item.label}</span>
                        {item.hint ? <span>{item.hint}</span> : null}
                      </span>
                      <span className="mt-0.5 block break-words text-base text-ink-2 group-hover:text-accent">
                        {item.value}
                      </span>
                      {item.pending ? <Mark className="mt-2" /> : null}
                    </span>
                  </>
                );
                const card =
                  "group flex items-start gap-4 rounded-lg border border-hairline bg-surface p-4 transition-[border-color,box-shadow,translate] duration-300 ease-(--ease-soft)";

                return (
                  <li key={item.label} className="reveal">
                    {item.href ? (
                      <a
                        href={item.href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener" : undefined}
                        className={`${card} hover:-translate-y-0.5 hover:border-accent hover:shadow-card`}
                      >
                        {body}
                      </a>
                    ) : (
                      <div className={card}>{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-8">
              <p className="text-sm font-medium text-ink">{contact.follow}</p>
              <SocialLinks className="mt-3" />
            </div>

            {details.note ? <Note>{details.note}</Note> : null}
          </div>
        </div>
      </Section>

      <Section tone="quiet">
        <SectionHead heading={steps.heading} />
        <ol className="mt-10 grid gap-6 md:grid-cols-3 lg:mt-12">
          {steps.items.map((step, i) => (
            <li key={step.title} className="reveal rounded-lg border border-hairline bg-surface p-6 sm:p-8">
              <span className="font-display text-4xl leading-none font-semibold tracking-[-0.04em] text-accent tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 font-display text-xl font-medium tracking-[-0.01em]">{step.title}</h3>
              <p className="mt-2 text-base text-ink-2">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <SectionHead heading={why.heading} />
        <div className="mt-10 grid gap-x-10 gap-y-8 border-t border-hairline pt-10 md:grid-cols-3 lg:mt-12">
          {why.items.map((item) => (
            <div key={item.title} className="reveal">
              <h3 className="font-display text-xl font-medium tracking-[-0.01em]">{item.title}</h3>
              <p className="mt-2 text-base text-ink-2">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Faq content={{ faq }} />
    </PageShell>
  );
}
