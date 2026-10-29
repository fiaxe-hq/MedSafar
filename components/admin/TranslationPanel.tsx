"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { TranslateIcon } from "@phosphor-icons/react/dist/ssr/Translate";
import { XIcon } from "@phosphor-icons/react/dist/ssr/X";
import { saveTranslationsAction } from "@/app/admin/(panel)/translations/actions";
import type { Sentence } from "@/lib/admin/translate";
import type { Language } from "@/lib/i18n/languages";
import { adminButton, adminInput } from "./ui";

type Props = {
  kind: string;
  slug: string | null;
  /** The field's name, as its form shows it. */
  label: string;
  sentences: Sentence[];
  languages: Language[];
  /** Shown instead of opening, e.g. for a record not saved yet. */
  disabledReason?: string;
  /** True while the English in the form has unsaved changes. */
  englishDirty?: boolean;
};

/** A plain name for one sentence of a field: "Question 2", "Photo 3", "Paragraph 1". */
function partName(path: string): string {
  const parts = path.split(".");
  const last = parts[parts.length - 1];
  const number = (n: string | undefined) => (n !== undefined && /^\d+$/.test(n) ? Number(n) + 1 : null);
  const at = (i: number) => number(parts[i]);
  if (last === "question") return `Question ${at(1)}`;
  if (last === "answer") return `Answer ${at(1)}`;
  if (last === "alt") return parts[0] === "gallery" ? `Photo ${at(1)}, description` : "Photo description";
  if (parts[0] === "packages" && last === "name") return `Group ${at(1)}, package ${at(3)}`;
  if (parts[0] === "sources") return `Source ${at(1)}`;
  if (parts[0] === "body") return `Paragraph ${at(1)}`;
  if (number(last)) return `Line ${number(last)}`;
  return "Text";
}

/** A language counts as done when every sentence has a translation that is shown. */
function doneIn(sentences: Sentence[], code: string) {
  return sentences.every((s) => s.langs[code]?.text && !s.langs[code].stale);
}

/**
 * The "Translate" button beside a field, and the panel it opens on the right:
 * pick a language, see each English sentence of the field with the text
 * visitors to that language see, change it, save.
 */
export function TranslationPanel({ kind, slug, label, sentences, languages, disabledReason, englishDirty }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState(languages[0]?.code ?? "");
  const [drafts, setDrafts] = useState<Record<string, Record<string, string>>>({});
  const [confirmed, setConfirmed] = useState<Record<string, Set<string>>>({});
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [saving, startSaving] = useTransition();

  const done = useMemo(() => languages.filter((l) => doneIn(sentences, l.code)).length, [languages, sentences]);
  const language = languages.find((l) => l.code === lang);

  // Close with Escape, and keep the page behind from scrolling.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  if (sentences.length === 0) return null;

  const draftOf = (s: Sentence) => drafts[lang]?.[s.path] ?? s.langs[lang]?.text ?? "";
  const changed = sentences.filter(
    (s) => draftOf(s) !== (s.langs[lang]?.text ?? "") || (confirmed[lang]?.has(s.path) ?? false),
  );

  function save() {
    setMessage(null);
    startSaving(async () => {
      const result = await saveTranslationsAction({
        kind,
        slug: slug ?? "",
        lang,
        changes: changed.map((s) => ({ path: s.path, text: draftOf(s) })),
      });
      setMessage({ ok: result.ok, text: result.message });
      if (result.ok) {
        setDrafts((d) => ({ ...d, [lang]: {} }));
        setConfirmed((c) => ({ ...c, [lang]: new Set() }));
        router.refresh();
      }
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => (disabledReason ? setMessage({ ok: false, text: disabledReason }) : setOpen(true))}
        title={disabledReason}
        className={`inline-flex min-h-10 cursor-pointer items-center gap-1.5 rounded-full border px-3.5 text-sm transition-colors ${
          disabledReason
            ? "border-line text-ink-3"
            : done === languages.length
              ? "border-accent/40 bg-accent-soft text-accent hover:bg-accent/15"
              : "border-line bg-surface text-ink-2 hover:border-accent hover:text-accent"
        }`}
      >
        <TranslateIcon size={15} aria-hidden />
        Translate
        <span className="text-xs opacity-80">
          {done}/{languages.length}
        </span>
      </button>
      {!open && message && disabledReason ? <span className="ms-2 text-sm text-ink-3">{message.text}</span> : null}

      {open ? (
        <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label={`Translations: ${label}`}>
          <button type="button" aria-label="Close" className="absolute inset-0 cursor-default bg-ink/30" onClick={() => setOpen(false)} />
          <div className="relative flex h-full w-full max-w-xl flex-col bg-surface shadow-lift">
            <div className="border-b border-hairline p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-accent">Translations</p>
                  <h2 className="mt-1 font-display text-xl font-semibold">{label}</h2>
                </div>
                <button type="button" className={adminButton.icon} aria-label="Close" onClick={() => setOpen(false)}>
                  <XIcon size={18} aria-hidden />
                </button>
              </div>
              <label className="mt-4 block text-sm font-medium text-ink-2" htmlFor="translation-language">
                Language
              </label>
              <select
                id="translation-language"
                value={lang}
                onChange={(e) => {
                  setLang(e.target.value);
                  setMessage(null);
                }}
                className={`${adminInput} mt-1.5`}
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.english} · {l.name} {doneIn(sentences, l.code) ? "✓ done" : "· to do"}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-sm text-ink-3">
                Visitors to the {language?.english} site see the text below. Leave a box empty to show them the English.
              </p>
              {englishDirty ? (
                <p className="mt-2 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-900 ring-1 ring-amber-200">
                  You changed the English in the form but have not saved it. Translations go with the saved English: save the
                  form first.
                </p>
              ) : null}
            </div>

            <ol className="flex-1 space-y-5 overflow-y-auto p-5">
              {sentences.map((s, i) => {
                const state = s.langs[lang];
                const id = `t-${i}`;
                return (
                  <li key={s.path}>
                    <p className="text-xs font-medium tracking-[0.06em] text-ink-3 uppercase">
                      {sentences.length > 1 ? `${partName(s.path)} · English` : "English"}
                    </p>
                    <p className="mt-1 rounded-md bg-surface-2 px-3 py-2 text-sm whitespace-pre-wrap text-ink-2">{s.english}</p>
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                      <label htmlFor={id} className="text-sm font-medium text-ink">
                        {language?.english}
                      </label>
                      <span className="text-xs text-ink-3">
                        {state?.stale
                          ? "Out of date: the English changed since"
                          : state?.origin === "admin"
                            ? "Added here"
                            : state?.origin === "file"
                              ? "From the website's translation"
                              : "Not translated: shows in English"}
                      </span>
                    </div>
                    <textarea
                      id={id}
                      lang={lang}
                      dir={language?.dir ?? "ltr"}
                      rows={Math.min(8, Math.max(2, Math.ceil(s.english.length / 60)))}
                      value={draftOf(s)}
                      onChange={(e) => setDrafts((d) => ({ ...d, [lang]: { ...d[lang], [s.path]: e.target.value } }))}
                      className={`${adminInput} mt-1.5 min-h-0 py-2.5 leading-relaxed ${state?.stale ? "border-amber-400" : ""}`}
                    />
                    {state?.stale && draftOf(s) === state.text ? (
                      <label className="mt-1.5 flex cursor-pointer items-center gap-2 text-sm text-ink-2">
                        <input
                          type="checkbox"
                          checked={confirmed[lang]?.has(s.path) ?? false}
                          onChange={(e) =>
                            setConfirmed((c) => {
                              const next = new Set(c[lang]);
                              if (e.target.checked) next.add(s.path);
                              else next.delete(s.path);
                              return { ...c, [lang]: next };
                            })
                          }
                          className="size-4 accent-accent"
                        />
                        Still correct for the new English
                      </label>
                    ) : null}
                  </li>
                );
              })}
            </ol>

            <div className="border-t border-hairline p-5">
              {message ? (
                <p role={message.ok ? "status" : "alert"} className={`mb-3 text-sm ${message.ok ? "text-accent" : "font-medium text-danger"}`}>
                  {message.text}
                </p>
              ) : null}
              <div className="flex flex-wrap items-center gap-3">
                <button type="button" className={adminButton.primary} disabled={saving || changed.length === 0 || englishDirty} onClick={save}>
                  {saving ? "Saving…" : `Save ${language?.english}`}
                </button>
                <button type="button" className={adminButton.quiet} onClick={() => setOpen(false)}>
                  Close
                </button>
                <span className="text-sm text-ink-3">
                  {changed.length ? `${changed.length} to save` : "No changes"}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
