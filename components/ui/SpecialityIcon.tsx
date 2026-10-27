import { HandHeartIcon } from "@phosphor-icons/react/dist/ssr/HandHeart";
import { MicroscopeIcon } from "@phosphor-icons/react/dist/ssr/Microscope";
import { DropIcon } from "@phosphor-icons/react/dist/ssr/Drop";
import { BrainIcon } from "@phosphor-icons/react/dist/ssr/Brain";
import { ScalesIcon } from "@phosphor-icons/react/dist/ssr/Scales";
import { BabyIcon } from "@phosphor-icons/react/dist/ssr/Baby";
import { BoneIcon } from "@phosphor-icons/react/dist/ssr/Bone";
import { HeartIcon } from "@phosphor-icons/react/dist/ssr/Heart";
import { SparkleIcon } from "@phosphor-icons/react/dist/ssr/Sparkle";
import { EyeIcon } from "@phosphor-icons/react/dist/ssr/Eye";
import { ToothIcon } from "@phosphor-icons/react/dist/ssr/Tooth";
import { FirstAidIcon } from "@phosphor-icons/react/dist/ssr/FirstAid";
import { BandaidsIcon } from "@phosphor-icons/react/dist/ssr/Bandaids";
import { StethoscopeIcon } from "@phosphor-icons/react/dist/ssr/Stethoscope";
import { FlaskIcon } from "@phosphor-icons/react/dist/ssr/Flask";
import { GenderFemaleIcon } from "@phosphor-icons/react/dist/ssr/GenderFemale";
import { EarIcon } from "@phosphor-icons/react/dist/ssr/Ear";

/** One glyph per speciality slug. A new speciality falls back to a first-aid
 *  cross until it is given its own. */
const icons: Record<string, typeof FirstAidIcon> = {
  "organ-transplant": HandHeartIcon,
  oncology: MicroscopeIcon,
  "haematology-bmt": DropIcon,
  "neurology-neurosurgery": BrainIcon,
  "bariatric-surgery": ScalesIcon,
  "fertility-ivf": BabyIcon,
  orthopaedics: BoneIcon,
  cardiology: HeartIcon,
  "general-surgery": BandaidsIcon,
  gastroenterology: StethoscopeIcon,
  urology: FlaskIcon,
  gynaecology: GenderFemaleIcon,
  ent: EarIcon,
  "cosmetic-plastic-surgery": SparkleIcon,
  ophthalmology: EyeIcon,
  dentistry: ToothIcon,
};

export function SpecialityIcon({
  slug,
  ...props
}: { slug: string } & React.ComponentProps<typeof FirstAidIcon>) {
  const Glyph = icons[slug] ?? FirstAidIcon;
  return <Glyph {...props} />;
}
