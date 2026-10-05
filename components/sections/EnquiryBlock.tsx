import type { CountryContent } from "@/content/types";
import { site } from "@/content/site";
import { defaultIso, dialCodesFor } from "@/content/dial-codes";
import { Container } from "@/components/ui/Container";
import { EnquiryForm } from "@/components/form/EnquiryForm";

/**
 * The form again, near the foot of the page, on the same deep green as the
 * hero so the page closes the way it opened.
 *
 * Shared pages pass no country, and a treatment page passes its treatment so
 * the form opens with it already chosen.
 */
export function EnquiryBlock({
  content,
  source,
  treatment = "",
}: {
  content: Pick<CountryContent, "enquiry"> & Partial<Pick<CountryContent, "iso" | "countryName">>;
  source: string;
  treatment?: string;
}) {
  const { enquiry } = content;

  return (
    <section id="plan" className="scroll-mt-24 bg-bg py-16 sm:py-24 lg:py-28">
      <Container>
        <div className="band-deep reveal relative isolate grid gap-10 overflow-hidden rounded-xl p-6 text-white sm:p-12 lg:grid-cols-12 lg:items-center lg:gap-16 lg:p-16">
          <div className="min-w-0 lg:col-span-6">
            <h2 className="display-2 max-w-[16ch]">{enquiry.heading}</h2>
            <p className="mt-6 max-w-[46ch] text-lg text-white/75">{enquiry.support}</p>
          </div>

          <div className="min-w-0 rounded-lg bg-surface p-5 text-ink shadow-[0_30px_60px_-20px_rgb(2_20_16/0.55)] sm:p-7 lg:col-span-6">
            <EnquiryForm
              text={site.form}
              dialCodes={dialCodesFor(content.iso ?? null)}
              defaultIso={content.iso ?? defaultIso}
              defaultCountry={content.countryName ?? ""}
              defaultTreatment={treatment}
              source={source}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
