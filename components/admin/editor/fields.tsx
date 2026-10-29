"use client";

import { useMemo, useState } from "react";
import { ArrowDownIcon } from "@phosphor-icons/react/dist/ssr/ArrowDown";
import { ArrowUpIcon } from "@phosphor-icons/react/dist/ssr/ArrowUp";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import { XIcon } from "@phosphor-icons/react/dist/ssr/X";
import type { Option } from "@/lib/admin/records";
import { adminButton, adminInput, adminLabel } from "../ui";
import { PictureField, type PictureValue } from "./PictureField";

/** The form controls of the editor, one per field type in lib/admin/schema.ts. */

const errorRing = "border-danger focus:border-danger focus:ring-danger/10";

export function FieldShell({
  id,
  label,
  help,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  help?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={adminLabel}>
        {label}
        {required ? null : <span className="font-normal text-ink-3"> (optional)</span>}
      </label>
      {help ? (
        <p id={`${id}-help`} className="mt-0.5 text-sm text-ink-3">
          {help}
        </p>
      ) : null}
      <div className="mt-2">{children}</div>
      {error ? (
        <p role="alert" className="mt-1.5 text-sm font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextInput({
  id,
  value,
  onChange,
  error,
  max,
  placeholder,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  max?: number;
  placeholder?: string;
}) {
  return (
    <input
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      maxLength={max ? max + 200 : undefined}
      placeholder={placeholder}
      aria-invalid={error ? true : undefined}
      className={`${adminInput} ${error ? errorRing : ""}`}
    />
  );
}

export function TextArea({
  id,
  value,
  onChange,
  error,
  rows = 4,
  max,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  rows?: number;
  max?: number;
}) {
  return (
    <>
      <textarea
        id={id}
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        className={`${adminInput} min-h-0 py-2.5 leading-relaxed ${error ? errorRing : ""}`}
      />
      {max ? (
        <p className={`mt-1 text-end text-xs ${value.length > max ? "font-medium text-danger" : "text-ink-3"}`}>
          {value.length} / {max}
        </p>
      ) : null}
    </>
  );
}

/**
 * A list typed into one box: one item per line, or paragraphs separated by an
 * empty line. The typed text is kept as it is while editing.
 */
export function SplitText({
  id,
  value,
  onChange,
  error,
  paragraphs = false,
}: {
  id: string;
  value: string[];
  onChange: (v: string[]) => void;
  error?: string;
  paragraphs?: boolean;
}) {
  const joiner = paragraphs ? "\n\n" : "\n";
  const [text, setText] = useState(() => value.join(joiner));
  const split = (t: string) => (paragraphs ? t.split(/\n\s*\n/) : t.split("\n")).map((s) => s.trim()).filter(Boolean);
  return (
    <textarea
      id={id}
      value={text}
      rows={paragraphs ? 16 : Math.min(12, Math.max(4, value.length + 2))}
      onChange={(e) => {
        setText(e.target.value);
        onChange(split(e.target.value));
      }}
      aria-invalid={error ? true : undefined}
      className={`${adminInput} min-h-0 py-2.5 leading-relaxed ${error ? errorRing : ""}`}
    />
  );
}

export function Select({
  id,
  value,
  onChange,
  options,
  error,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  error?: string;
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-invalid={error ? true : undefined}
      className={`${adminInput} ${error ? errorRing : ""}`}
    >
      <option value="">Choose…</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
          {o.note === "hidden" ? " (hidden)" : ""}
        </option>
      ))}
    </select>
  );
}

/** Ticks from a long list, with a search box and the chosen ones shown first as chips. */
export function Checklist({
  id,
  value,
  onChange,
  options,
}: {
  id: string;
  value: string[];
  onChange: (v: string[]) => void;
  options: Option[];
}) {
  const [query, setQuery] = useState("");
  const chosen = new Set(value);
  const byValue = useMemo(() => new Map(options.map((o) => [o.value, o])), [options]);
  const q = query.trim().toLowerCase();
  const shown = options.filter((o) => !q || o.label.toLowerCase().includes(q) || o.note?.toLowerCase().includes(q));
  const toggle = (v: string) => onChange(chosen.has(v) ? value.filter((x) => x !== v) : [...value, v]);

  return (
    <div className="rounded-md border border-line bg-surface">
      <div className="border-b border-hairline p-3">
        {value.length > 0 ? (
          <ul className="flex flex-wrap gap-1.5" aria-label="Chosen">
            {value.map((v) => (
              <li key={v}>
                <button
                  type="button"
                  onClick={() => toggle(v)}
                  className="inline-flex min-h-8 cursor-pointer items-center gap-1 rounded-full bg-accent-soft px-3 text-sm text-accent hover:bg-accent/15"
                  aria-label={`Remove ${byValue.get(v)?.label ?? v}`}
                >
                  {byValue.get(v)?.label ?? v}
                  <XIcon size={13} aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-ink-3">None chosen yet.</p>
        )}
        <input
          id={id}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${options.length} to add or remove`}
          className={`${adminInput} mt-3`}
        />
      </div>
      <ul className="max-h-72 overflow-y-auto p-1.5">
        {shown.map((o) => (
          <li key={o.value}>
            <label className="flex min-h-10 cursor-pointer items-center gap-3 rounded-sm px-2.5 py-1.5 hover:bg-surface-2">
              <input
                type="checkbox"
                checked={chosen.has(o.value)}
                onChange={() => toggle(o.value)}
                className="size-[1.125rem] shrink-0 accent-accent"
              />
              <span className="min-w-0 text-base text-ink">
                {o.label}
                {o.note ? <span className="ms-2 text-sm text-ink-3">{o.note}</span> : null}
              </span>
            </label>
          </li>
        ))}
        {shown.length === 0 ? <li className="px-2.5 py-3 text-sm text-ink-3">Nothing matches.</li> : null}
      </ul>
    </div>
  );
}

/** Up, down and remove buttons for one row of a repeating list. */
function RowTools({
  index,
  count,
  onMove,
  onRemove,
  noun,
}: {
  index: number;
  count: number;
  onMove: (from: number, to: number) => void;
  onRemove: (index: number) => void;
  noun: string;
}) {
  return (
    <div className="flex gap-1.5">
      <button type="button" className={adminButton.icon} aria-label={`Move ${noun} up`} disabled={index === 0} onClick={() => onMove(index, index - 1)}>
        <ArrowUpIcon size={16} aria-hidden />
      </button>
      <button
        type="button"
        className={adminButton.icon}
        aria-label={`Move ${noun} down`}
        disabled={index === count - 1}
        onClick={() => onMove(index, index + 1)}
      >
        <ArrowDownIcon size={16} aria-hidden />
      </button>
      <button type="button" className={adminButton.icon} aria-label={`Remove ${noun}`} onClick={() => onRemove(index)}>
        <XIcon size={16} aria-hidden />
      </button>
    </div>
  );
}

/** Shared add/move/remove handling for a list of rows. */
function useRows<T>(value: T[], onChange: (v: T[]) => void) {
  return {
    update: (i: number, row: T) => onChange(value.map((r, j) => (j === i ? row : r))),
    move: (from: number, to: number) => {
      const next = [...value];
      [next[from], next[to]] = [next[to], next[from]];
      onChange(next);
    },
    remove: (i: number) => onChange(value.filter((_, j) => j !== i)),
    add: (row: T) => onChange([...value, row]),
  };
}

export function Gallery({
  id,
  section,
  value,
  onChange,
}: {
  id: string;
  section: string;
  value: PictureValue[];
  onChange: (v: PictureValue[]) => void;
}) {
  const rows = useRows(value, onChange);
  return (
    <div className="space-y-3">
      {value.map((picture, i) => (
        <div key={`${picture.src}-${i}`} className="rounded-md border border-hairline bg-surface-2/60 p-3">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-ink-2">Photo {i + 1}</p>
            <RowTools index={i} count={value.length} onMove={rows.move} onRemove={rows.remove} noun="photo" />
          </div>
          <PictureField id={`${id}-${i}`} section={section} value={picture} onChange={(p) => rows.update(i, p)} />
        </div>
      ))}
      <button type="button" className={adminButton.quiet} onClick={() => rows.add({ src: null, alt: "", pending: true })}>
        <PlusIcon size={17} aria-hidden />
        Add a photo
      </button>
    </div>
  );
}

type Faq = { question: string; answer: string };

export function FaqList({ id, value, onChange }: { id: string; value: Faq[]; onChange: (v: Faq[]) => void }) {
  const rows = useRows(value, onChange);
  return (
    <div className="space-y-3">
      {value.map((item, i) => (
        <div key={i} className="space-y-2 rounded-md border border-hairline bg-surface-2/60 p-3">
          <div className="flex items-center justify-between gap-3">
            <label htmlFor={`${id}-${i}-q`} className={adminLabel}>
              Question {i + 1}
            </label>
            <RowTools index={i} count={value.length} onMove={rows.move} onRemove={rows.remove} noun="question" />
          </div>
          <input
            id={`${id}-${i}-q`}
            value={item.question}
            onChange={(e) => rows.update(i, { ...item, question: e.target.value })}
            className={adminInput}
          />
          <label htmlFor={`${id}-${i}-a`} className={adminLabel}>
            Answer
          </label>
          <textarea
            id={`${id}-${i}-a`}
            value={item.answer}
            rows={3}
            onChange={(e) => rows.update(i, { ...item, answer: e.target.value })}
            className={`${adminInput} min-h-0 py-2.5 leading-relaxed`}
          />
        </div>
      ))}
      <button type="button" className={adminButton.quiet} onClick={() => rows.add({ question: "", answer: "" })}>
        <PlusIcon size={17} aria-hidden />
        Add a question
      </button>
    </div>
  );
}

type Source = { label: string; href: string };

export function SourceList({ id, value, onChange }: { id: string; value: Source[]; onChange: (v: Source[]) => void }) {
  const rows = useRows(value, onChange);
  return (
    <div className="space-y-3">
      {value.map((item, i) => (
        <div key={i} className="grid gap-2 rounded-md border border-hairline bg-surface-2/60 p-3 md:grid-cols-[1fr_1fr_auto] md:items-end">
          <div>
            <label htmlFor={`${id}-${i}-label`} className={adminLabel}>
              Name
            </label>
            <input
              id={`${id}-${i}-label`}
              value={item.label}
              onChange={(e) => rows.update(i, { ...item, label: e.target.value })}
              placeholder="For example: Hospital press release"
              className={`${adminInput} mt-1.5`}
            />
          </div>
          <div>
            <label htmlFor={`${id}-${i}-href`} className={adminLabel}>
              Web address
            </label>
            <input
              id={`${id}-${i}-href`}
              value={item.href}
              type="url"
              onChange={(e) => rows.update(i, { ...item, href: e.target.value })}
              placeholder="https://"
              className={`${adminInput} mt-1.5`}
            />
          </div>
          <RowTools index={i} count={value.length} onMove={rows.move} onRemove={rows.remove} noun="source" />
        </div>
      ))}
      <button type="button" className={adminButton.quiet} onClick={() => rows.add({ label: "", href: "" })}>
        <PlusIcon size={17} aria-hidden />
        Add a source
      </button>
    </div>
  );
}

type PackageItem = { name: string; stay: string; priceUsd: number | string };
type PackageGroup = { category: string; items: PackageItem[] };

/** Groups of packages (Transplants, Cancer care...), each a small table of name, stay and price. */
export function Packages({ id, value, onChange }: { id: string; value: PackageGroup[]; onChange: (v: PackageGroup[]) => void }) {
  const groups = useRows(value, onChange);
  const blankItem: PackageItem = { name: "", stay: "", priceUsd: "" };
  return (
    <div className="space-y-4">
      {value.map((group, g) => {
        const items = group.items;
        const setItems = (next: PackageItem[]) => groups.update(g, { ...group, items: next });
        return (
          <div key={g} className="rounded-md border border-hairline bg-surface-2/60 p-3 sm:p-4">
            <div className="flex flex-wrap items-end gap-3">
              <div className="min-w-0 flex-1">
                <label htmlFor={`${id}-${g}`} className={adminLabel}>
                  Group heading
                </label>
                <input
                  id={`${id}-${g}`}
                  value={group.category}
                  onChange={(e) => groups.update(g, { ...group, category: e.target.value })}
                  placeholder="For example: Transplants"
                  className={`${adminInput} mt-1.5`}
                />
              </div>
              <RowTools index={g} count={value.length} onMove={groups.move} onRemove={groups.remove} noun="group" />
            </div>
            <div className="mt-3 space-y-2">
              <div className="hidden grid-cols-[1fr_7rem_8rem_auto] gap-2 text-sm font-medium text-ink-2 md:grid">
                <span>Package</span>
                <span>Days in hospital</span>
                <span>Price (US$)</span>
                <span className="w-[8.75rem]" />
              </div>
              {items.map((item, i) => (
                <div key={i} className="grid gap-2 border-t border-hairline pt-2 md:grid-cols-[1fr_7rem_8rem_auto] md:border-0 md:pt-0">
                  <input
                    aria-label={`Package ${i + 1} name`}
                    value={item.name}
                    onChange={(e) => setItems(items.map((it, j) => (j === i ? { ...it, name: e.target.value } : it)))}
                    placeholder="Package name"
                    className={adminInput}
                  />
                  <input
                    aria-label={`Package ${i + 1} days in hospital`}
                    value={item.stay}
                    onChange={(e) => setItems(items.map((it, j) => (j === i ? { ...it, stay: e.target.value } : it)))}
                    placeholder="e.g. 5 or 1+4"
                    className={adminInput}
                  />
                  <input
                    aria-label={`Package ${i + 1} price in US dollars`}
                    value={item.priceUsd}
                    inputMode="numeric"
                    onChange={(e) => setItems(items.map((it, j) => (j === i ? { ...it, priceUsd: e.target.value } : it)))}
                    placeholder="e.g. 5500"
                    className={adminInput}
                  />
                  <RowTools
                    index={i}
                    count={items.length}
                    onMove={(from, to) => {
                      const next = [...items];
                      [next[from], next[to]] = [next[to], next[from]];
                      setItems(next);
                    }}
                    onRemove={(r) => setItems(items.filter((_, j) => j !== r))}
                    noun="package"
                  />
                </div>
              ))}
              <button type="button" className={adminButton.quiet} onClick={() => setItems([...items, blankItem])}>
                <PlusIcon size={17} aria-hidden />
                Add a package
              </button>
            </div>
          </div>
        );
      })}
      <button type="button" className={adminButton.quiet} onClick={() => groups.add({ category: "", items: [blankItem] })}>
        <PlusIcon size={17} aria-hidden />
        Add a group of packages
      </button>
      <p className="text-sm text-ink-3">
        Days in hospital: as the hospital writes it. &ldquo;1+4&rdquo; means 1 day in intensive care and 4 on the ward.
      </p>
    </div>
  );
}
