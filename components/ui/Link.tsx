"use client";

import NextLink from "next/link";
import { useParams } from "next/navigation";
import { localPath } from "@/lib/i18n/languages";

/**
 * next/link that keeps the visitor in their language: "/treatments" on a
 * Bengali page goes to "/bn/treatments". Use it for every link inside the site.
 */
export default function Link({ href, ...props }: React.ComponentProps<typeof NextLink>) {
  const { lang } = useParams<{ lang?: string }>();
  return <NextLink href={typeof href === "string" && lang ? localPath(lang, href) : href} {...props} />;
}
