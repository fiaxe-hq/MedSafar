"use client";

import { useEffect, useRef } from "react";
import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr/CaretDown";

/**
 * One filter in a slim bar: a button showing the current choice, which opens
 * a list of options. A <details> menu, so it opens without JavaScript; with
 * it, picking an option, clicking outside or pressing Escape closes it.
 * Menus sharing a name close each other. On a phone the list spans the bar
 * (the nearest positioned parent), so it never runs off the screen.
 */
export function FilterMenu({
  name,
  label,
  current,
  active,
  children,
}: {
  /** Shared by the menus in one bar, so only one is open at a time. */
  name: string;
  label: string;
  /** The chosen option's name, shown on the button. */
  current: string;
  /** True when a choice other than "All" is set. */
  active: boolean;
  /** The options, as links. */
  children: React.ReactNode;
}) {
  const menu = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const close = () => {
      if (menu.current) menu.current.open = false;
    };
    const outside = (e: PointerEvent) => {
      if (menu.current?.open && !menu.current.contains(e.target as Node)) close();
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menu.current?.open) {
        close();
        menu.current.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", key);
    };
  }, []);

  return (
    <details ref={menu} name={name} className="group/menu min-w-0 open:z-10 sm:relative">
      <summary
        className={`flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-full border px-4 text-[0.9375rem] transition-[background-color,border-color,color] duration-200 [&::-webkit-details-marker]:hidden ${
          active
            ? "border-deep bg-deep text-white"
            : "border-hairline bg-surface text-ink-2 hover:border-line hover:text-ink group-open/menu:border-line"
        }`}
      >
        <span className={active ? "text-white/70" : "text-ink-3"}>{label}:</span>
        <span className="max-w-[14rem] truncate font-medium">{current}</span>
        <CaretDownIcon
          size={13}
          weight="bold"
          className="shrink-0 transition-transform duration-200 group-open/menu:rotate-180"
          aria-hidden
        />
      </summary>
      <div
        onClick={(e) => {
          if (!(e.target as HTMLElement).closest("a") || !menu.current) return;
          menu.current.open = false;
          // Scrolled down the list: go back to its top, where the new
          // results begin, rather than leaving the reader in empty space.
          const list = menu.current.closest("section");
          const top = list?.getBoundingClientRect().top ?? 0;
          if (list && top < 0) scrollTo({ top: top + scrollY, behavior: "smooth" });
        }}
        className="absolute inset-x-5 top-full mt-2 max-h-[min(26rem,60svh)] overflow-y-auto sm:inset-x-auto sm:start-0 sm:w-[22rem] overscroll-contain rounded-2xl bg-surface p-2 shadow-lift ring-1 ring-hairline"
      >
        {children}
      </div>
    </details>
  );
}
