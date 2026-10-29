"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { ArrowSquareOutIcon } from "@phosphor-icons/react/dist/ssr/ArrowSquareOut";
import { FloppyDiskIcon } from "@phosphor-icons/react/dist/ssr/FloppyDisk";
import {
  deleteAction,
  restoreAction,
  saveRecordAction,
  setVisibleAction,
} from "@/app/admin/(panel)/[section]/actions";
import type { Option, Status } from "@/lib/admin/records";
import { kindByPath, type Field, type OptionList } from "@/lib/admin/schema";
import { AdminBadge, AdminNotice, adminButton, adminCard, adminWhen } from "../ui";
import { Checklist, FaqList, FieldShell, Gallery, Packages, Select, SourceList, SplitText, TextArea, TextInput } from "./fields";
import { PictureField, type PictureValue } from "./PictureField";
import { TranslationPanel } from "../TranslationPanel";
import type { Sentence } from "@/lib/admin/translate";
import type { Language } from "@/lib/i18n/languages";

type RecordValue = Record<string, unknown>;

const done: Record<string, string> = {
  added: "Added. It is on the site now, unless you chose to keep it hidden.",
  saved: "Saved. The site shows the change within a minute.",
  shown: "It is on the site again.",
  hidden: "Hidden. Visitors no longer see it; nothing is deleted.",
  restored: "Back to the original version. Your changes were removed.",
};

const statusLabel: Record<Status, string> = {
  original: "Original version",
  edited: "Edited here",
  new: "Added here",
  hidden: "Hidden from the site",
};

export type EditorProps = {
  section: string;
  slug: string | null;
  record: RecordValue;
  status: Status | null;
  hidden: boolean;
  inFiles: boolean;
  updatedAt: string | null;
  updatedBy: string | null;
  options: Record<OptionList, Option[]>;
  /** For a treatment: who lists it. */
  offeredBy?: { hospitals: { slug: string; name: string }[]; doctors: { slug: string; name: string }[] };
  doneMessage?: string;
  /** Each field's sentences and their translations; null for a record not saved yet. */
  translations: Record<string, Sentence[]> | null;
  languages: Language[];
};

const asString = (v: unknown) => (typeof v === "string" ? v : "");
const asList = <T,>(v: unknown) => (Array.isArray(v) ? (v as T[]) : []);

/** The form for one hospital, doctor, treatment or blog post. */
export function Editor(props: EditorProps) {
  const info = kindByPath[props.section];
  const [record, setRecord] = useState<RecordValue>(props.record);
  const [visible, setVisible] = useState(!props.hidden);
  const [dirty, setDirty] = useState(false);
  const [changedFields, setChangedFields] = useState<Set<string>>(new Set());
  const [state, formAction, saving] = useActionState(saveRecordAction, null);
  const errors = state?.errors ?? {};
  const name = asString(record[info.nameKey]);
  const siteHref = props.slug ? `${info.sitePath}/${props.slug}` : null;

  // Warn before leaving with unsaved changes.
  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  // After a failed save, bring the first problem into view.
  useEffect(() => {
    if (state?.message) document.getElementById("editor-message")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [state]);

  const set = (key: string, value: unknown) => {
    setRecord((r) => ({ ...r, [key]: value }));
    setDirty(true);
    setChangedFields((f) => (f.has(key) ? f : new Set(f).add(key)));
  };

  function control(field: Field) {
    const id = `field-${field.key}`;
    const error = errors[field.key];
    const value = record[field.key];
    switch (field.type) {
      case "text":
        return <TextInput id={id} value={asString(value)} onChange={(v) => set(field.key, v)} error={error} max={field.max} placeholder={field.placeholder} />;
      case "textarea":
        return <TextArea id={id} value={asString(value)} onChange={(v) => set(field.key, v)} error={error} rows={field.rows} max={field.max} />;
      case "lines":
        return <SplitText id={id} value={asList<string>(value)} onChange={(v) => set(field.key, v)} error={error} />;
      case "paragraphs":
        return <SplitText id={id} value={asList<string>(value)} onChange={(v) => set(field.key, v)} error={error} paragraphs />;
      case "select":
        return <Select id={id} value={asString(value)} onChange={(v) => set(field.key, v)} options={props.options[field.options]} error={error} />;
      case "checklist":
        return <Checklist id={id} value={asList<string>(value)} onChange={(v) => set(field.key, v)} options={props.options[field.options]} />;
      case "date":
        return (
          <input
            id={id}
            type="date"
            value={asString(value)}
            onChange={(e) => set(field.key, e.target.value || null)}
            className="min-h-11 rounded-md border border-line bg-surface px-3.5 text-base text-ink focus:border-accent focus:ring-4 focus:ring-accent/10 focus:outline-none"
          />
        );
      case "picture":
        return <PictureField id={id} section={props.section} value={value as PictureValue | undefined} onChange={(v) => set(field.key, v)} />;
      case "gallery":
        return <Gallery id={id} section={props.section} value={asList<PictureValue>(value)} onChange={(v) => set(field.key, v)} />;
      case "faq":
        return <FaqList id={id} value={asList(value)} onChange={(v) => set(field.key, v)} />;
      case "packages":
        return <Packages id={id} value={asList(value)} onChange={(v) => set(field.key, v)} />;
      case "sources":
        return <SourceList id={id} value={asList(value)} onChange={(v) => set(field.key, v)} />;
      case "checkbox":
        return null;
    }
  }

  return (
    <>
      <Link href={`/admin/${info.path}`} className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-accent hover:underline">
        <ArrowLeftIcon size={16} aria-hidden />
        All {info.plural.toLowerCase()}
      </Link>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="display-2">{props.slug ? name || "Untitled" : `New ${info.singular}`}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-ink-3">
            {props.status ? (
              <AdminBadge tone={props.status === "hidden" ? "off" : "good"}>{statusLabel[props.status]}</AdminBadge>
            ) : null}
            {props.updatedAt ? <span>Last changed by {props.updatedBy}, {adminWhen(props.updatedAt)}</span> : null}
          </div>
        </div>
        {siteHref && !props.hidden ? (
          <a href={siteHref} target="_blank" rel="noopener" className={adminButton.quiet}>
            View on the site
            <ArrowSquareOutIcon size={16} aria-hidden />
          </a>
        ) : null}
      </div>

      {props.doneMessage && done[props.doneMessage] && !state ? <AdminNotice>{done[props.doneMessage]}</AdminNotice> : null}
      <p className="mt-4 max-w-3xl text-sm text-ink-3">
        Type everything in English.{" "}
        {props.translations
          ? "For the other languages, use Translate beside a field, or import many at once on the Translations page."
          : `Once the ${info.singular} is added, each field gets a Translate button for the other languages.`}
      </p>
      {state?.message ? (
        <div id="editor-message">
          <AdminNotice tone="error">{state.message}</AdminNotice>
        </div>
      ) : null}

      <form action={formAction} className="mt-8 grid gap-6 lg:grid-cols-[1fr_18rem] lg:items-start">
        <input type="hidden" name="section" value={props.section} />
        <input type="hidden" name="slug" value={props.slug ?? ""} />
        <input type="hidden" name="record" value={JSON.stringify(record)} />

        <div className="min-w-0 space-y-6">
          {info.sections.map((section) => (
            <fieldset key={section.title} className={`${adminCard} min-w-0 p-5 sm:p-6`}>
              <legend className="sr-only">{section.title}</legend>
              <h2 aria-hidden className="font-display text-xl font-semibold">
                {section.title}
              </h2>
              {section.intro ? <p className="mt-1 text-sm text-ink-3">{section.intro}</p> : null}
              <div className="mt-5 space-y-6">
                {section.fields.map((field) =>
                  field.type === "checkbox" ? (
                    <label key={field.key} className="flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        checked={record[field.key] === true}
                        onChange={(e) => set(field.key, e.target.checked)}
                        className="mt-1 size-[1.125rem] shrink-0 accent-accent"
                      />
                      <span>
                        <span className="block text-base font-medium text-ink">{field.label}</span>
                        {field.help ? <span className="block text-sm text-ink-3">{field.help}</span> : null}
                      </span>
                    </label>
                  ) : (
                    <FieldShell
                      key={field.key}
                      id={`field-${field.key}`}
                      label={field.label}
                      help={field.help}
                      error={errors[field.key]}
                      required={"required" in field && field.required}
                      aside={
                        props.translations ? (
                          <TranslationPanel
                            kind={info.kind}
                            slug={props.slug}
                            label={field.label}
                            sentences={props.translations[field.key] ?? []}
                            languages={props.languages}
                            englishDirty={changedFields.has(field.key)}
                          />
                        ) : null
                      }
                    >
                      {control(field)}
                    </FieldShell>
                  ),
                )}
              </div>
            </fieldset>
          ))}

          {props.offeredBy ? (
            <section className={`${adminCard} p-5 sm:p-6`}>
              <h2 className="font-display text-xl font-semibold">Who offers it</h2>
              <p className="mt-1 text-sm text-ink-3">To change this, tick the treatment on a hospital or a doctor.</p>
              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                {(["hospitals", "doctors"] as const).map((group) => (
                  <div key={group}>
                    <dt className="text-sm font-medium text-ink-2">{group === "hospitals" ? "Hospitals" : "Doctors"}</dt>
                    <dd className="mt-1">
                      {props.offeredBy![group].length ? (
                        <ul className="space-y-1">
                          {props.offeredBy![group].map((r) => (
                            <li key={r.slug}>
                              <Link href={`/admin/${group}/${r.slug}`} className="text-base text-accent hover:underline">
                                {r.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-sm text-ink-3">None yet</span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}
        </div>

        {/* Save panel: beside the form on wide screens, fixed to the bottom on phones. */}
        <aside className="lg:sticky lg:top-36">
          <div className={`${adminCard} fixed inset-x-0 bottom-0 z-30 rounded-none border-x-0 border-b-0 p-4 shadow-lift lg:static lg:rounded-lg lg:border lg:p-5 lg:shadow-none`}>
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                name="visible"
                value="yes"
                checked={visible}
                onChange={(e) => {
                  setVisible(e.target.checked);
                  setDirty(true);
                }}
                className="mt-1 size-[1.125rem] shrink-0 accent-accent"
              />
              <span>
                <span className="block text-base font-medium text-ink">Show on the site</span>
                <span className="hidden text-sm text-ink-3 lg:block">Untick to keep it hidden from visitors.</span>
              </span>
            </label>
            <button type="submit" disabled={saving} className={`${adminButton.primary} mt-4 min-h-12 w-full text-base`}>
              <FloppyDiskIcon size={18} aria-hidden />
              {saving ? "Saving…" : props.slug ? "Save changes" : `Add ${info.singular}`}
            </button>
            {dirty ? <p className="mt-2 text-center text-sm text-ink-3">You have unsaved changes.</p> : null}
          </div>
        </aside>
      </form>

      {props.slug ? (
        <section className={`${adminCard} mt-10 mb-28 p-5 sm:p-6 lg:mb-0`}>
          <h2 className="font-display text-xl font-semibold">Other actions</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <form action={setVisibleAction}>
              <input type="hidden" name="section" value={props.section} />
              <input type="hidden" name="slug" value={props.slug} />
              <input type="hidden" name="visible" value={props.hidden ? "yes" : "no"} />
              <button type="submit" className={adminButton.quiet}>
                {props.hidden ? "Show on the site again" : "Hide from the site"}
              </button>
            </form>
            {props.inFiles && props.status === "edited" ? (
              <form
                action={restoreAction}
                onSubmit={(e) => {
                  if (!confirm("Remove every change made here and go back to the original version?")) e.preventDefault();
                }}
              >
                <input type="hidden" name="section" value={props.section} />
                <input type="hidden" name="slug" value={props.slug} />
                <button type="submit" className={adminButton.quiet}>
                  Go back to the original version
                </button>
              </form>
            ) : null}
            {!props.inFiles ? (
              <form
                action={deleteAction}
                onSubmit={(e) => {
                  if (!confirm(`Delete "${name}" for good? This cannot be undone. Hiding it keeps it for later.`)) e.preventDefault();
                }}
              >
                <input type="hidden" name="section" value={props.section} />
                <input type="hidden" name="slug" value={props.slug} />
                <button type="submit" className={adminButton.danger}>
                  Delete for good
                </button>
              </form>
            ) : null}
          </div>
          <p className="mt-3 text-sm text-ink-3">
            {props.inFiles
              ? `This ${info.singular} came with the website, so it can be hidden but not deleted.`
              : `This ${info.singular} was added here. Hiding keeps it for later; deleting removes it for good.`}
          </p>
        </section>
      ) : (
        <div className="mb-28 lg:mb-0" />
      )}
    </>
  );
}
