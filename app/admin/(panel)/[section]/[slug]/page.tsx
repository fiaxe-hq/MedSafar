import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { getOptions, getRecord, offeredBy } from "@/lib/admin/records";
import { blankRecord, kindByPath } from "@/lib/admin/schema";
import { Editor } from "@/components/admin/editor/Editor";

/** The editor for one record; /admin/<section>/new for a new one. */
export default async function RecordPage({ params, searchParams }: PageProps<"/admin/[section]/[slug]">) {
  await requireAdmin();
  const { section, slug } = await params;
  const info = kindByPath[section];
  if (!info) notFound();
  const { done } = await searchParams;
  const isNew = slug === "new";
  const [current, options] = await Promise.all([isNew ? null : getRecord(info.kind, slug), getOptions()]);
  if (!isNew && !current) notFound();

  return (
    <Editor
      // A fresh form after each save, so nothing unsaved lingers.
      key={`${slug}-${current?.updatedAt ?? ""}-${typeof done === "string" ? done : ""}`}
      section={section}
      slug={isNew ? null : slug}
      record={current?.record ?? blankRecord(info.kind)}
      status={current?.status ?? null}
      hidden={current?.hidden ?? false}
      inFiles={current?.inFiles ?? false}
      updatedAt={current?.updatedAt ?? null}
      updatedBy={current?.updatedBy ?? null}
      options={options}
      offeredBy={info.kind === "treatment" && !isNew ? await offeredBy(slug) : undefined}
      doneMessage={typeof done === "string" ? done : undefined}
    />
  );
}
