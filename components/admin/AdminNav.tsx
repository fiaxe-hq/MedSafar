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
import { SidebarSimpleIcon } from "@phosphor-icons/react/dist/ssr/SidebarSimple";
import { SignOutIcon } from "@phosphor-icons/react/dist/ssr/SignOut";
import { SquaresFourIcon } from "@phosphor-icons/react/dist/ssr/SquaresFour";
import { StethoscopeIcon } from "@phosphor-icons/react/dist/ssr/Stethoscope";
import { TranslateIcon } from "@phosphor-icons/react/dist/ssr/Translate";
import { TrayIcon } from "@phosphor-icons/react/dist/ssr/Tray";
import { UsersThreeIcon } from "@phosphor-icons/react/dist/ssr/UsersThree";
import { XIcon } from "@phosphor-icons/react/dist/ssr/X";
import { NAV_COOKIE } from "@/lib/admin/nav";
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
  "group relative flex min-h-10 items-center gap-3 overflow-hidden rounded-md px-3 text-[0.9375rem] whitespace-nowrap text-ink-2 transition-colors duration-150 hover:bg-surface-2 hover:text-ink aria-[current=page]:bg-accent-soft aria-[current=page]:font-medium aria-[current=page]:text-accent";

type User = { name: string; email: string; role: string };

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase() || "?";
}

/** The panel's sidebar: sections by group, the site link and the signed-in person. */
function SidebarBody({
  user,
  onNavigate,
  collapsed = false,
  onToggle,
}: {
  user: User;
  onNavigate?: () => void;
  /** Icons only (wide screens). Labels stay for screen readers and show as tooltips. */
  collapsed?: boolean;
  onToggle?: () => void;
}) {
  const pathname = usePathname();
  const owner = user.role === "owner";
  const sections = adminSections.filter((section) => owner || !("ownerOnly" in section));
  const isCurrent = (section: (typeof sections)[number]) =>
    "exact" in section ? pathname === section.href : pathname.startsWith(section.href);
  const groups = [...new Set(sections.map((s) => s.group))];
  const onAccount = pathname.startsWith("/admin/account");
  const item = `${itemClass} ${collapsed ? "justify-center px-0" : ""}`;

  return (
    <div className="flex h-full flex-col">
      <div className={`flex h-16 shrink-0 items-center gap-2.5 ${collapsed ? "justify-center px-3" : "px-5"}`}>
        {collapsed ? null : (
          <>
            <Link href="/admin" onClick={onNavigate} className="flex shrink-0 items-center">
              <Image src={logo} alt="Medsafar India" priority width={95} height={40} className="h-9 w-auto" />
            </Link>
            <span className="rounded-sm bg-surface-2 px-1.5 py-0.5 text-[0.6875rem] font-semibold tracking-[0.12em] text-ink-3 uppercase ring-1 ring-hairline">
              Admin
            </span>
          </>
        )}
        {onToggle ? (
          <button
            type="button"
            onClick={onToggle}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!collapsed}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={`grid size-9 shrink-0 cursor-pointer place-items-center rounded-md text-ink-3 transition-colors hover:bg-surface-2 hover:text-ink ${collapsed ? "" : "ms-auto"}`}
          >
            <SidebarSimpleIcon size={19} aria-hidden />
          </button>
        ) : null}
      </div>

      <nav aria-label="Admin" className="flex-1 overflow-x-hidden overflow-y-auto px-3 pt-2 pb-4">
        {groups.map((group) => (
          <div
            key={group || "main"}
            className={group ? (collapsed ? "mt-3 border-t border-hairline pt-3" : "mt-6") : ""}
          >
            {group && !collapsed ? (
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
                        title={collapsed ? section.label : undefined}
                        className={item}
                      >
                        <ItemIcon
                          size={19}
                          weight={current ? "fill" : "regular"}
                          className="shrink-0 text-ink-3 transition-colors group-hover:text-ink group-aria-[current=page]:text-accent"
                          aria-hidden
                        />
                        <span className={collapsed ? "sr-only" : ""}>{section.label}</span>
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="shrink-0 border-t border-hairline p-3">
        <a href="/" target="_blank" rel="noopener" title={collapsed ? "View the site" : undefined} className={item}>
          <ArrowSquareOutIcon size={19} className="shrink-0 text-ink-3 group-hover:text-ink" aria-hidden />
          <span className={collapsed ? "sr-only" : ""}>View the site</span>
        </a>
        <div className={`mt-2 flex items-center gap-1 rounded-md ${collapsed ? "flex-col" : ""}`}>
          <Link
            href="/admin/account"
            onClick={onNavigate}
            aria-current={onAccount ? "page" : undefined}
            title={collapsed ? `${user.name}: my account` : "My account"}
            className={`flex min-w-0 items-center gap-3 rounded-md p-2 transition-colors hover:bg-surface-2 aria-[current=page]:bg-accent-soft ${collapsed ? "" : "flex-1"}`}
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent text-[0.8125rem] font-semibold text-accent-ink">
              {initials(user.name)}
            </span>
            <span className={collapsed ? "sr-only" : "min-w-0 leading-tight"}>
              <span className="block truncate text-sm font-medium text-ink">{user.name}</span>
              <span className="block truncate text-[0.8125rem] text-ink-3">{owner ? "Owner" : "Editor"}</span>
            </span>
            {collapsed ? null : <GearSixIcon size={17} className="ms-auto shrink-0 text-ink-3" aria-hidden />}
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
 * The panel's frame. Wide screens: a sidebar fixed on the left that folds to
 * icons only and remembers that in a cookie. Phones and tablets: a slim top
 * bar with a menu button that opens the same sidebar as a drawer.
 */
export function AdminShell({
  user,
  initialCollapsed,
  children,
}: {
  user: User;
  initialCollapsed: boolean;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(initialCollapsed);
  const current = adminSections.find((s) =>
    "exact" in s ? pathname === s.href : pathname.startsWith(s.href),
  );

  function toggle() {
    const next = !collapsed;
    setCollapsed(next);
    document.cookie = `${NAV_COOKIE}=${next ? "collapsed" : "open"}; path=/admin; max-age=31536000; samesite=lax`;
  }

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
      <aside
        className={`fixed inset-y-0 start-0 z-40 hidden border-e border-hairline bg-bg transition-[width] duration-200 ease-(--ease-soft) lg:block ${collapsed ? "w-[4.5rem]" : "w-64"}`}
      >
        <SidebarBody user={user} collapsed={collapsed} onToggle={toggle} />
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

      <main
        className={`page-in flex-1 transition-[padding] duration-200 ease-(--ease-soft) ${collapsed ? "lg:ps-[4.5rem]" : "lg:ps-64"}`}
      >
        <div className="mx-auto w-full max-w-[76rem] px-4 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">{children}</div>
      </main>
    </>
  );
}
