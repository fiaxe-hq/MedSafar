"use client";

import { useRef, useState, useTransition } from "react";
import { UploadSimpleIcon } from "@phosphor-icons/react/dist/ssr/UploadSimple";
import { applyImportAction, previewImportAction } from "@/app/admin/(panel)/translations/actions";
import type { ImportSummary } from "@/lib/admin/translationCsv";
import { AdminNotice, adminButton, adminCard } from "./ui";

/**
 * Bulk import in two steps: choose the CSV and see what it would change,
 * then confirm. Nothing is saved before the confirm.
 */
export function ImportCsv() {
  const input = useRef<HTMLInputElement>(null);
  const [csv, setCsv] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState<ImportSummary | null>(null);
  const [result, setResult] = useState<ImportSummary | null>(null);
  const [busy, start] = useTransition();

  function choose(file: File | undefined) {
    if (!file) return;
    setResult(null);
    setPreview(null);
    setFileName(file.name);
    start(async () => {
      const text = await file.text();
      setCsv(text);
      setPreview(await previewImportAction(text));
    });
  }

  function confirm() {
    if (!csv) return;
    start(async () => {
      setResult(await applyImportAction(csv));
      setPreview(null);
      setCsv(null);
      if (input.current) input.current.value = "";
    });
  }

  const summary = result ?? preview;
  const toSave = summary ? summary.added + summary.replaced : 0;

  return (
    <div>
      <button type="button" className={adminButton.primary} onClick={() => input.current?.click()} disabled={busy}>
        <UploadSimpleIcon size={18} aria-hidden />
        {busy && !summary ? "Reading…" : "Choose a CSV file"}
      </button>
      <input
        ref={input}
        type="file"
        accept=".csv,text/csv"
        className="sr-only"
        tabIndex={-1}
        onChange={(e) => choose(e.target.files?.[0])}
      />
      {fileName && !result ? <p className="mt-2 text-sm text-ink-3">{fileName}</p> : null}

      {summary?.error ? <AdminNotice tone="error">{summary.error}</AdminNotice> : null}

      {summary && summary.ok ? (
        <div className={`${adminCard} mt-5 p-5`}>
          <h3 className="font-display text-lg font-semibold">
            {result ? (toSave ? "Imported" : "Nothing was imported") : "Check before importing"}
          </h3>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
            {[
              ["Rows read", summary.rowsRead],
              [result ? "New translations" : "New translations to add", summary.added],
              [result ? "Translations replaced" : "Translations to replace", summary.replaced],
              ["Same as now, left alone", summary.unchanged],
            ].map(([label, value]) => (
              <div key={String(label)} className="flex flex-col-reverse justify-end rounded-md bg-surface-2 p-3">
                <dt className="mt-1 text-ink-2">{label}</dt>
                <dd className="numeral text-2xl text-accent">{value}</dd>
              </div>
            ))}
          </dl>
          {summary.byLanguage.length ? (
            <p className="mt-3 text-sm text-ink-2">
              {summary.byLanguage.map((l) => `${l.language}: ${l.count}`).join(" · ")}
            </p>
          ) : null}
          {summary.ignoredColumns.length ? (
            <p className="mt-3 text-sm text-ink-3">Columns not used: {summary.ignoredColumns.join(", ")}.</p>
          ) : null}
          {summary.skipped.length ? (
            <details className="mt-4" open={summary.skipped.length <= 5}>
              <summary className="cursor-pointer text-sm font-medium text-danger">
                {summary.skipped.length} {summary.skipped.length === 1 ? "row was" : "rows were"} skipped
              </summary>
              <ul className="mt-2 max-h-64 space-y-1 overflow-y-auto text-sm text-ink-2">
                {summary.skipped.map((s, i) => (
                  <li key={i}>
                    <span className="font-medium">Row {s.row}:</span> {s.reason}
                  </li>
                ))}
              </ul>
            </details>
          ) : null}
          {!result ? (
            <div className="mt-5 flex flex-wrap gap-3">
              <button type="button" className={adminButton.primary} disabled={busy || toSave === 0} onClick={confirm}>
                {busy ? "Importing…" : `Import ${toSave} ${toSave === 1 ? "translation" : "translations"}`}
              </button>
              <button
                type="button"
                className={adminButton.quiet}
                disabled={busy}
                onClick={() => {
                  setPreview(null);
                  setCsv(null);
                  setFileName("");
                  if (input.current) input.current.value = "";
                }}
              >
                Cancel
              </button>
            </div>
          ) : toSave ? (
            <p className="mt-4 text-sm text-accent">Saved. The site shows the translations within a minute.</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
