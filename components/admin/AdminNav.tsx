"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Icon } from "@phosphor-icons/react";
import { ArrowSquareOutIcon } from "@phosphor-icons/react/dist/ssr/ArrowSquareOut";
import { ArticleIcon } from "@phosphor-icons/react/dist/ssr/Article";
import { ChartBarIcon } from "@phosphor-icons/react/dist/ssr/ChartBar";
import { FirstAidKitIcon } from "@phosphor-icons/react/dist/ssr/FirstAidKit";
import { GearSixIcon } from "@phosphor-icons/react/dist/ssr/GearSix";
import { HospitalIcon } from "@phosphor-icons/react/dist/ssr/Hospital";
import { ListIcon } from "@phosphor-icons/react/dist/ssr/List";
import { PhoneIcon } from "@phosphor-icons/react/dist/ssr/Phone";
import { SignOutIcon } from "@phosphor-icons/react/dist/ssr/SignOut";
import { SquaresFourIcon } from "@phosphor-icons/react/dist/ssr/SquaresFour";
import { StethoscopeIcon } from "@phosphor-icons/react/dist/ssr/Stethoscope";
import { TranslateIcon } from "@phosphor-icons/react/dist/ssr/Translate";
import { TrayIcon } from "@phosphor-icons/react/dist/ssr/Tray";
import { UsersThreeIcon } from "@phosphor-icons/react/dist/ssr/UsersThree";
import { XIcon } from "@phosphor-icons/react/dist/ssr/X";
import { adminSections } from "@/lib/admin/sections";
import { signOutAction } from "@/app/admin/actions";
import logo from "@/public/brand/medsafar-logo.png";

const icons: Record<(typeof adminSections)[number]["href"], Icon> = {
  "/admin": SquaresFourIcon,
  "/admin/enquiries": TrayIcon,
  "/admin/hospitals": HospitalIcon,
  "/admin/doctors": StethoscopeIcon,
  "/admin/treatments": FirstAidKitIcon,
  "/admin/blog": ArticleIcon,
  "/admin/translations": TranslateIcon,
  "/admin/contact": PhoneIcon,
  "/admin/stats": ChartBarIcon,
  "/admin/team": UsersThreeIcon,
};

const itemClass =
  "group relative flex min-h-10 items-center gap-3 rounded-md px-3 text-[0.9375rem] text-ink-2 transition-colors duration-150 hover:bg-surface-2 hover:text-ink aria-[current=page]:bg-accent-soft aria-[current=page]:font-medium aria-[current=page]:text-accent";

type User = { name: string; email: string; role: string };

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase() || "?";
}

/** The panel's sidebar: sections by group, the site link and the signed-in person. */
function SidebarBody({ user, onNavigate }: { user: User; onNavigate?: () => void }) {
  const pathname = usePathname();
  const owner = user.role === "owner";
  const sections = adminSections.filter((section) => owner || !("ownerOnly" in section));
  const isCurrent = (section: (typeof sections)[number]) =>
    "exact" in section ? pathname === section.href : pathname.startsWith(section.href);
  const groups = [...new Set(sections.map((s) => s.group))];
  const onAccount = pathname.startsWith("/admin/account");

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 shrink-0 items-center gap-2.5 px-5">
        <Link href="/admin" onClick={onNavigate} className="flex items-center">
          <Image src={logo} alt="Medsafar India" priority width={95} height={40} className="h-9 w-auto" />
        </Link>
        <span className="rounded-sm bg-surface-2 px-1.5 py-0.5 text-[0.6875rem] font-semibold tracking-[0.12em] text-ink-3 uppercase ring-1 ring-hairline">
          Admin
        </span>
      </div>

      <nav aria-label="Admin" className="flex-1 overflow-y-auto px-3 pt-2 pb-4">
        {groups.map((group) => (
          <div key={group || "main"} className={group ? "mt-6" : ""}>
            {group ? (
              <p className="px-3 pb-1.5 text-[0.75rem] font-semibold tracking-[0.1em] text-ink-3 uppercase">{group}</p>
            ) : null}
            <ul className="space-y-0.5">
              {sections
                .filter((s) => s.group === group)
                .map((section) => {
                  const ItemIcon = icons[section.href];
                  const current = isCurrent(section);
                  return (
                    <li key={section.href}>
                      <Link
                        href={section.href}
                        onClick={onNavigate}
                        aria-current={current ? "page" : undefined}
                        className={itemClass}
                      >
                        <ItemIcon
                          size={19}
                          weight={current ? "fill" : "regular"}
                          className="shrink-0 text-ink-3 transition-colors group-hover:text-ink group-aria-[current=page]:text-accent"
                          aria-hidden
                        />
                        {section.label}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="shrink-0 border-t border-hairline p-3">
        <a href="/" target="_blank" rel="noopener" className={itemClass}>
          <ArrowSquareOutIcon size={19} className="shrink-0 text-ink-3 group-hover:text-ink" aria-hidden />
          View the site
        </a>
        <div className="mt-2 flex items-center gap-1 rounded-md">
          <Link
            href="/admin/account"
            onClick={onNavigate}
            aria-current={onAccount ? "page" : undefined}
            title="My account"
            className="flex min-w-0 flex-1 items-center gap-3 rounded-md p-2 transition-colors hover:bg-surface-2 aria-[current=page]:bg-accent-soft"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent text-[0.8125rem] font-semibold text-accent-ink">
              {initials(user.name)}
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-sm font-medium text-ink">{user.name}</span>
              <span className="block truncate text-[0.8125rem] text-ink-3">{owner ? "Owner" : "Editor"}</span>
            </span>
            <GearSixIcon size={17} className="ms-auto shrink-0 text-ink-3" aria-hidden />
          </Link>
          <form action={signOutAction}>
            <button
              type="submit"
              title="Sign out"
              aria-label="Sign out"
              className="grid size-10 cursor-pointer place-items-center rounded-md text-ink-3 transition-colors hover:bg-danger-soft hover:text-danger"
            >
              <SignOutIcon size={18} aria-hidden />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/**
 * Fixed on the left on wide screens. On phones and tablets a slim top bar
 * with a menu button opens the same sidebar as a drawer.
 */
export function AdminNav({ user }: { user: User }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const current = adminSections.find((s) =>
    "exact" in s ? pathname === s.href : pathname.startsWith(s.href),
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <aside className="fixed inset-y-0 start-0 z-40 hidden w-64 border-e border-hairline bg-bg lg:block">
        <SidebarBody user={user} />
      </aside>

      <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-hairline bg-bg/90 px-4 backdrop-blur-md sm:px-6 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          className="-ms-2 grid size-10 cursor-pointer place-items-center rounded-md text-ink transition-colors hover:bg-surface-2"
        >
          <ListIcon size={22} aria-hidden />
        </button>
        <Link href="/admin" className="flex items-center">
          <Image src={logo} alt="Medsafar India" width={76} height={32} className="h-8 w-auto" />
        </Link>
        <span className="ms-auto truncate text-sm font-medium text-ink-2">
          {pathname.startsWith("/admin/account") ? "My account" : current?.label}
        </span>
      </header>

      <div
        className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
        inert={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-deep/40 transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className={`absolute inset-y-0 start-0 w-72 max-w-[85vw] bg-bg shadow-lift transition-transform duration-300 ease-(--ease-soft) ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="absolute end-3 top-3 grid size-10 cursor-pointer place-items-center rounded-md text-ink-3 transition-colors hover:bg-surface-2 hover:text-ink"
          >
            <XIcon size={20} aria-hidden />
          </button>
          <SidebarBody user={user} onNavigate={() => setOpen(false)} />
        </div>
      </div>
    </>
  );
}
