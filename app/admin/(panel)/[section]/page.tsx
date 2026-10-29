import Link from "next/link";
import { notFound } from "next/navigation";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import { requireAdmin } from "@/lib/admin/auth";
import { listRecords } from "@/lib/admin/records";
import { kindByPath } from "@/lib/admin/schema";
import { AdminHeading, AdminNotice, adminButton } from "@/components/admin/ui";
import { RecordList } from "@/components/admin/RecordList";

/** Hospitals, doctors, treatments or blog posts: everything in the section, and a way to add one. */
export default async function SectionPage({ params, searchParams }: PageProps<"/admin/[section]">) {
  await requireAdmin();
  const info = kindByPath[(await params).section];
  if (!info) notFound();
  const { done } = await searchParams;
  const rows = await listRecords(info.kind);

  return (
    <>
      <AdminHeading eyebrow="Content" title={info.plural} intro={info.intro}>
        <Link href={`/admin/${info.path}/new`} className={adminButton.primary}>
          <PlusIcon size={18} aria-hidden />
          Add a {info.singular}
        </Link>
      </AdminHeading>
      {done === "deleted" ? <AdminNotice>Deleted. It is gone from the site.</AdminNotice> : null}
      <RecordList rows={rows} path={info.path} singular={info.singular} />
    </>
  );
}
