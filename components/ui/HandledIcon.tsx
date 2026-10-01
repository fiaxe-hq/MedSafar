import { IdentificationCardIcon } from "@phosphor-icons/react/dist/ssr/IdentificationCard";
import { CarIcon } from "@phosphor-icons/react/dist/ssr/Car";
import { BedIcon } from "@phosphor-icons/react/dist/ssr/Bed";
import { TranslateIcon } from "@phosphor-icons/react/dist/ssr/Translate";
import { StethoscopeIcon } from "@phosphor-icons/react/dist/ssr/Stethoscope";
import type { Handled } from "@/content/types";

const icons = {
  visa: IdentificationCardIcon,
  pickup: CarIcon,
  stay: BedIcon,
  interpreter: TranslateIcon,
  aftercare: StethoscopeIcon,
} as const;

/** Rendered on the server, so these icons cost no client JavaScript. */
export function HandledIcon({ name }: { name: Handled["icon"] }) {
  const Glyph = icons[name];
  return (
    <span className="grid size-12 place-items-center rounded-md border border-hairline bg-surface">
      <Glyph size={22} weight="regular" className="text-accent" aria-hidden />
    </span>
  );
}
