import { places } from "@/content/places";
import { countryName } from "@/lib/i18n/dialCodes";
import { getLang, getText } from "@/lib/i18n/text";
import { CountryPicker, LanguagePicker } from "./Pickers";

/** The country and language pickers, with country names in the page's language. */
export async function LanguageSwitch({ place }: { place?: string }) {
  const [{ site }, lang] = await Promise.all([getText(), getLang()]);
  const options = places.map((p) => ({
    slug: p.slug,
    iso: p.iso,
    name: p.iso ? countryName(p.iso, lang.code) : site.languages.global,
  }));

  return (
    <div className="flex items-center gap-1.5">
      <CountryPicker
        lang={lang.code}
        places={options}
        label={site.languages.country}
        note={site.languages.countryNote}
        current={place}
      />
      <LanguagePicker lang={lang.code} label={site.languages.label} />
    </div>
  );
}
