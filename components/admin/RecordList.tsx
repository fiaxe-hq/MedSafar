"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";
import { PencilSimpleIcon } from "@phosphor-icons/react/dist/ssr/PencilSimple";
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
      <div className="mt-8 flex flex-wrap items-center gap-3">
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
        <div role="group" aria-label="Show" className="flex gap-1 rounded-md border border-line bg-surface p-1">
          {filters.map((f) => (
            <button
              key={f.value}
              type="button"
              aria-pressed={filter === f.value}
              onClick={() => setFilter(f.value)}
              className="min-h-10 cursor-pointer rounded-sm px-3 text-sm text-ink-2 transition-colors hover:text-ink aria-pressed:bg-accent-soft aria-pressed:font-medium aria-pressed:text-accent"
            >
              {f.label}
            </button>
          ))}
        </div>
        <p className="text-sm text-ink-3" aria-live="polite">
          {shown.length} of {rows.length}
        </p>
      </div>

      {shown.length === 0 ? (
        <p className={`${adminCard} mt-4 px-6 py-10 text-center text-base text-ink-3`}>No {singular} matches.</p>
      ) : (
        <ul className={`${adminCard} mt-4 divide-y divide-hairline`}>
          {shown.map((row) => {
            const status = statusInfo[row.status];
            return (
              <li key={row.slug}>
                <Link
                  href={`/admin/${path}/${row.slug}`}
                  className="group flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3.5 transition-colors hover:bg-accent-quiet sm:px-5"
                >
                  <span className="min-w-0 flex-1 basis-60">
                    <span className="block text-base font-medium text-ink group-hover:text-accent">{row.name}</span>
                    {row.note ? <span className="block text-sm text-ink-3">{row.note}</span> : null}
                  </span>
                  <AdminBadge tone={status.tone}>{status.label}</AdminBadge>
                  <span className="hidden w-52 text-sm text-ink-3 md:block">
                    {row.updatedAt ? `${row.updatedBy}, ${adminWhen(row.updatedAt)}` : "Not changed here"}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                    <PencilSimpleIcon size={16} aria-hidden />
                    Edit
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
