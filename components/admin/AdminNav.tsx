"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminSections } from "@/lib/admin/sections";

/** The section links, with the one being viewed marked like the site's header. */
export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Admin" className="-mx-1 flex gap-0.5 overflow-x-auto">
      {adminSections.map((section) => (
        <Link
          key={section.href}
          href={section.href}
          aria-current={pathname.startsWith(section.href) ? "page" : undefined}
          className="relative flex min-h-11 items-center rounded-sm px-3 text-[0.9375rem] whitespace-nowrap text-ink-2 transition-colors duration-200 after:absolute after:inset-x-3 after:bottom-1 after:h-0.5 after:rounded-full after:bg-brand after:opacity-0 after:transition-opacity hover:bg-brand/10 hover:text-ink aria-[current=page]:font-medium aria-[current=page]:text-ink aria-[current=page]:after:opacity-100"
        >
          {section.label}
        </Link>
      ))}
    </nav>
  );
}
