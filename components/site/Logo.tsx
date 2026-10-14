import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import logo from "@/public/brand/medsafar-logo.png";

/** The Medsafar India logo, with the registered trademark mark. The source
 *  is 546px wide, so it stays sharp on high-density screens at header size. */
export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex shrink-0 items-center justify-self-start">
      <Image
        src={logo}
        alt={`${site.brand.name} ${site.brand.country}`}
        priority
        width={104}
        height={44}
        className="h-11 w-auto"
      />
    </Link>
  );
}
