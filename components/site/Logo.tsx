import Image from "next/image";
import Link from "@/components/ui/Link";
import logo from "@/public/brand/medsafar-logo.png";
import { getText } from "@/lib/i18n/text";

/** The Medsafar India logo, with the registered trademark mark. The source
 *  is 546px wide, so it stays sharp on high-density screens at header size. */
export async function Logo({ href = "/" }: { href?: string }) {
  const { site } = await getText();
  return (
    <Link href={href} data-logo className="flex shrink-0 items-center justify-self-start">
      <Image
        src={logo}
        alt={`${site.brand.name} ${site.brand.country}`}
        priority
        width={123}
        height={52}
        className="h-9 w-auto sm:h-11 lg:h-13"
      />
    </Link>
  );
}
