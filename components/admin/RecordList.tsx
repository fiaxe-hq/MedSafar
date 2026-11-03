"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";
import { CaretRightIcon } from "@phosphor-icons/react/dist/ssr/CaretRight";
import type { RecordRow, Status } from "@/lib/admin/records";
import { AdminBadge, adminCard, adminInput, adminWhen } from "./ui";

const statusInfo: Record<Status, { label: string; tone: "good" | "neutral" | "warn" | "off" }> = {
  original: { label: "On the site", tone: "good" },
  edited: { label: "On the site, edited", tone: "good" },
  new: { label: "On the site, added here", tone: "good" },
  hidden: { label: "Hidden", tone: "off" },
};

const filters: { value: "all" | "hidden" | "changed"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "changed", label: "Changed here" },
  { value: "hidden", label: "Hidden" },
];

/** The records of one section, with a search box. Clicking a row opens its editor. */
export function RecordList({ rows, path, singular }: { rows: RecordRow[]; path: string; singular: string }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]["value"]>("all");

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter(
      (row) =>
        (!q || row.name.toLowerCase().includes(q) || row.note.toLowerCase().includes(q)) &&
        (filter === "all" ||
          (filter === "hidden" && row.status === "hidden") ||
          (filter === "changed" && row.status !== "original")),
    );
  }, [rows, query, filter]);

  return (
    <>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <label className="relative w-full sm:w-auto sm:max-w-sm sm:flex-1">
          <span className="sr-only">Search</span>
          <MagnifyingGlassIcon size={18} className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-ink-3" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name"
            className={`${adminInput} ps-10`}
          />
        </label>
        <div role="group" aria-label="Show" className="flex gap-0.5 rounded-lg border border-hairline bg-surface-2 p-0.5">
          {filters.map((f) => (
            <button
              key={f.value}
              type="button"
              aria-pressed={filter === f.value}
              onClick={() => setFilter(f.value)}
              className="min-h-9 cursor-pointer rounded-md px-3 text-sm text-ink-2 transition-colors hover:text-ink aria-pressed:bg-surface aria-pressed:font-medium aria-pressed:text-ink aria-pressed:shadow-[0_1px_2px_rgb(11_61_49/0.1)]"
            >
              {f.label}
            </button>
          ))}
        </div>
        <p className="ms-auto text-sm text-ink-3 tabular-nums" aria-live="polite">
          {shown.length} of {rows.length}
        </p>
      </div>

      {shown.length === 0 ? (
        <p className={`${adminCard} mt-4 px-6 py-12 text-center text-sm text-ink-3`}>No {singular} matches.</p>
      ) : (
        <div className={`${adminCard} mt-4 overflow-hidden`}>
          <div
            aria-hidden
            className="hidden grid-cols-[1fr_12rem_14rem_1.5rem] gap-4 border-b border-hairline bg-surface-2 px-5 py-2.5 text-[0.75rem] font-semibold tracking-[0.06em] text-ink-3 uppercase md:grid"
          >
            <span>Name</span>
            <span>Status</span>
            <span>Last changed</span>
            <span />
          </div>
          <ul className="divide-y divide-hairline">
            {shown.map((row) => {
              const status = statusInfo[row.status];
              return (
                <li key={row.slug}>
                  <Link
                    href={`/admin/${path}/${row.slug}`}
                    className="group grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1.5 px-4 py-3.5 transition-colors hover:bg-surface-2 sm:px-5 md:grid-cols-[1fr_12rem_14rem_1.5rem]"
                  >
                    <span className="min-w-0">
                      <span className="block text-[0.9375rem] font-medium text-ink group-hover:text-accent md:truncate">{row.name}</span>
                      {row.note ? <span className="block text-[0.8125rem] md:truncate text-ink-3">{row.note}</span> : null}
                    </span>
                    <span>
                      <AdminBadge tone={status.tone}>{status.label}</AdminBadge>
                    </span>
                    <span className="hidden text-[0.8125rem] text-ink-3 md:block">
                      {row.updatedAt ? (
                        <>
                          <span className="block truncate text-ink-2">{row.updatedBy}</span>
                          {adminWhen(row.updatedAt)}
                        </>
                      ) : (
                        "Not changed here"
                      )}
                    </span>
                    <CaretRightIcon
                      size={16}
                      className="hidden text-ink-3 transition-[translate,color] group-hover:translate-x-0.5 group-hover:text-accent md:block"
                      aria-label="Edit"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
