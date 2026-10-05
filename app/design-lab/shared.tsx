import { global } from "@/content/countries";
import { site } from "@/content/site";
import { dialCodesFor, defaultIso } from "@/content/dial-codes";
import { getHospitalsBySlugs, getSpecialities, nameOf } from "@/lib/catalog";
import { EnquiryForm } from "@/components/form/EnquiryForm";

/** Temporary design lab helpers. Deleted with the lab. */
export const content = global;
export const source = "/design-lab";

export function LabForm({ compact = false }: { compact?: boolean }) {
  return (
    <EnquiryForm
      text={site.form}
      dialCodes={dialCodesFor(null)}
      defaultIso={defaultIso}
      defaultCountry=""
      source={source}
      compact={compact}
    />
  );
}

export async function featuredHospitals() {
  const [cards, specialities] = await Promise.all([
    getHospitalsBySlugs(content.hospitals.featured),
    getSpecialities(),
  ]);
  return cards.map((hospital) => ({
    hospital,
    specialities: hospital.specialities.map((s) => nameOf(specialities, s)).join(", "),
  }));
}
