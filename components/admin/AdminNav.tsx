"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr/CaretDown";
import { ListIcon } from "@phosphor-icons/react/dist/ssr/List";
import { adminSections } from "@/lib/admin/sections";

const linkClass =
  "relative flex min-h-11 items-center rounded-sm px-3 text-[0.9375rem] whitespace-nowrap text-ink-2 transition-colors duration-200 after:absolute after:inset-x-3 after:bottom-1 after:h-0.5 after:rounded-full after:bg-brand after:opacity-0 after:transition-opacity hover:bg-brand/10 hover:text-ink aria-[current=page]:font-medium aria-[current=page]:text-ink aria-[current=page]:after:opacity-100";

/**
 * The section links. On wide screens a row, with the one being viewed marked
 * like the site's header; on phones one button that names the current section
 * and opens the full list, so no section hides off the edge.
 */
export function AdminNav({ owner }: { owner: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const sections = adminSections.filter((section) => owner || !("ownerOnly" in section));
  const isCurrent = (section: (typeof sections)[number]) =>
    "exact" in section ? pathname === section.href : pathname.startsWith(section.href);
  const current = sections.find(isCurrent);

  return (
    <nav aria-label="Admin">
      <div className="-mx-1 hidden gap-0.5 overflow-x-auto lg:flex">
        {sections.map((section) => (
          <Link key={section.href} href={section.href} aria-current={isCurrent(section) ? "page" : undefined} className={linkClass}>
            {section.label}
          </Link>
        ))}
      </div>

      <div className="lg:hidden">
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="flex min-h-11 w-full cursor-pointer items-center gap-2 rounded-md text-start text-base font-medium text-ink"
        >
          <ListIcon size={20} className="text-brand" aria-hidden />
          <span className="flex-1">{current?.label ?? "Menu"}</span>
          <span className="text-sm font-normal text-ink-3">All sections</span>
          <CaretDownIcon size={16} className={`text-ink-3 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
        </button>
        {open ? (
          <ul className="grid grid-cols-2 gap-1.5 pb-3 pt-1">
            {sections.map((section) => (
              <li key={section.href}>
                <Link
                  href={section.href}
                  aria-current={isCurrent(section) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center rounded-md border border-hairline bg-surface px-3 text-base text-ink-2 aria-[current=page]:border-accent aria-[current=page]:bg-accent-soft aria-[current=page]:font-medium aria-[current=page]:text-accent"
                >
                  {section.label}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </nav>
  );
}
