import { getLang, getText } from "@/lib/i18n/text";
import { LanguagePicker } from "./Pickers";
import { LocationPrompt } from "./LocationPrompt";

/** The language picker. There is no country picker: the country comes from
 *  the visitor's location (see LocationPrompt). */
export async function LanguageSwitch() {
  const [{ site }, lang] = await Promise.all([getText(), getLang()]);
  return (
    <div className="flex items-center gap-1.5">
      <LocationPrompt />
      <LanguagePicker lang={lang.code} label={site.languages.label} />
    </div>
  );
}
