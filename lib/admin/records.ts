import { revalidatePath } from "next/cache";
import { getEntries, getEntry, same, textKey, type Entry, type ListKind } from "@/lib/content";
import { source } from "@/lib/i18n/source";
import type { OptionList } from "./schema";

/**
 * The records the admin editors work on, in English: the files with the
 * changes from /admin laid over them, hidden ones included.
 */

export type Status = "original" | "edited" | "new" | "hidden";

export type RecordRow = {
  slug: string;
  name: string;
  /** A second line in the list: city, hospital, speciality or date. */
  note: string;
  status: Status;
  updatedAt: string | null;
  updatedBy: string | null;
};

export type AdminRecord = {
  record: Record<string, unknown>;
  status: Status;
  /** True when the record comes from the files: it can be restored, not deleted. */
  inFiles: boolean;
  hidden: boolean;
  updatedAt: string | null;
  updatedBy: string | null;
};

type AnyRecord = Record<string, unknown> & { slug: string };

function fileRecords(kind: ListKind): AnyRecord[] {
  return source[textKey[kind]] as unknown as AnyRecord[];
}

function statusOf(file: AnyRecord | undefined, entry: Entry | undefined): Status {
  if (entry?.hidden) return "hidden";
  if (!file) return "new";
  if (entry && !same(entry.data, file)) return "edited";
  return "original";
}

/** Every record of a kind, as the editor sees it. */
async function allOf(kind: ListKind) {
  const entries = (await getEntries()).filter((e) => e.kind === kind);
  const bySlug = new Map(entries.map((e) => [e.slug, e]));
  const files = fileRecords(kind);
  const known = new Set(files.map((r) => r.slug));
  const fromFiles = files.map((file) => {
    const entry = bySlug.get(file.slug);
    return { record: (entry?.data as AnyRecord) ?? file, file, entry };
  });
  const added = entries
    .filter((e) => !known.has(e.slug))
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    .map((entry) => ({ record: entry.data as AnyRecord, file: undefined, entry }));
  return [...fromFiles, ...added];
}

const names = {
  specialities: () => source.specialities.map((s) => ({ value: s.slug, label: s.name })),
  categories: () => source.postCategories.map((c) => ({ value: c.slug, label: c.name })),
};

function noteFor(kind: ListKind, record: AnyRecord, hospitals: Map<string, string>, specialities: Map<string, string>) {
  switch (kind) {
    case "hospital":
      return String(record.city ?? "");
    case "doctor":
      return [hospitals.get(String(record.hospital)), specialities.get(String(record.speciality))].filter(Boolean).join(" · ");
    case "treatment":
      return specialities.get(String(record.speciality)) ?? "";
    case "post":
      return record.date ? String(record.date) : "No date";
  }
}

export async function listRecords(kind: ListKind): Promise<RecordRow[]> {
  const [rows, hospitals] = await Promise.all([allOf(kind), allOf("hospital")]);
  const hospitalNames = new Map(hospitals.map((h) => [h.record.slug, String(h.record.name)]));
  const specialityNames = new Map(names.specialities().map((s) => [s.value, s.label]));
  return rows.map(({ record, file, entry }) => ({
    slug: record.slug,
    name: String(record.name ?? record.title ?? record.slug),
    note: noteFor(kind, record, hospitalNames, specialityNames),
    status: statusOf(file, entry),
    updatedAt: entry?.updatedAt ?? null,
    updatedBy: entry?.updatedBy ?? null,
  }));
}

export async function getRecord(kind: ListKind, slug: string): Promise<AdminRecord | null> {
  const file = fileRecords(kind).find((r) => r.slug === slug);
  const entry = (await getEntry(kind, slug)) ?? undefined;
  if (!file && !entry) return null;
  return {
    record: (entry?.data as AnyRecord) ?? file!,
    status: statusOf(file, entry),
    inFiles: Boolean(file),
    hidden: entry?.hidden ?? false,
    updatedAt: entry?.updatedAt ?? null,
    updatedBy: entry?.updatedBy ?? null,
  };
}

/** The version in the files, for "restore". */
export function fileRecord(kind: ListKind, slug: string): AnyRecord | undefined {
  return fileRecords(kind).find((r) => r.slug === slug);
}

export async function slugTaken(kind: ListKind, slug: string): Promise<boolean> {
  return (await allOf(kind)).some((r) => r.record.slug === slug);
}

export type Option = { value: string; label: string; note?: string };

/** The choices for selects and checklists: every record, hidden ones marked. */
export async function getOptions(): Promise<Record<OptionList, Option[]>> {
  const [hospitals, treatments] = await Promise.all([allOf("hospital"), allOf("treatment")]);
  const specialityNames = new Map(names.specialities().map((s) => [s.value, s.label]));
  const hiddenNote = (entry?: Entry) => (entry?.hidden ? "hidden" : undefined);
  return {
    specialities: names.specialities(),
    categories: names.categories(),
    hospitals: hospitals.map(({ record, entry }) => ({
      value: record.slug,
      label: String(record.name),
      note: hiddenNote(entry) ?? String(record.city ?? ""),
    })),
    treatments: treatments.map(({ record, entry }) => ({
      value: record.slug,
      label: String(record.name),
      note: hiddenNote(entry) ?? specialityNames.get(String(record.speciality)),
    })),
  };
}

/** Which hospitals and doctors list a treatment, for its editor. */
export async function offeredBy(treatment: string) {
  const [hospitals, doctors] = await Promise.all([allOf("hospital"), allOf("doctor")]);
  const lists = (rows: Awaited<ReturnType<typeof allOf>>) =>
    rows
      .filter(({ record }) => Array.isArray(record.treatments) && (record.treatments as string[]).includes(treatment))
      .map(({ record }) => ({ slug: record.slug, name: String(record.name) }));
  return { hospitals: lists(hospitals), doctors: lists(doctors) };
}

/**
 * After any change: every page is drawn again on its next visit. The site is
 * small, so marking all of it is simpler and safer than working out which
 * pages show the record.
 */
export function refreshSite() {
  revalidatePath("/[lang]", "layout");
}
