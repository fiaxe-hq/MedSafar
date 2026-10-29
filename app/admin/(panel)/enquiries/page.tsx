import { FileArrowDownIcon } from "@phosphor-icons/react/dist/ssr/FileArrowDown";
import { PhoneIcon } from "@phosphor-icons/react/dist/ssr/Phone";
import { TrashIcon } from "@phosphor-icons/react/dist/ssr/Trash";
import { WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr/WhatsappLogo";
import { REPORT_REVIEW_DAYS, listLeads, listOldReports } from "@/lib/leads";
import { AdminBadge, AdminHeading, AdminNotice, AdminTile, adminButton, adminCard } from "@/components/admin/ui";
import { deleteLeadAction, deleteReportAction, keepReportAction } from "./actions";

const LIMIT = 200;
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

/** Server render only, so the clock is read once per request. */
function weekAgo() {
  return new Date(Date.now() - WEEK_MS).toISOString();
}

function when(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });
}

/** Each row is one enquiry; step-2 fields are blank if the visitor stopped at step 1. */
export default async function EnquiriesPage({ searchParams }: PageProps<"/admin/enquiries">) {
  const params = await searchParams;
  const [leads, oldReports] = await Promise.all([listLeads(LIMIT), listOldReports()]);
  const complete = leads.filter((lead) => lead.name).length;
  const since = weekAgo();
  const thisWeek = leads.filter((lead) => lead.createdAt > since).length;

  return (
    <>
      <AdminHeading
        eyebrow="Leads"
        title="Enquiries"
        intro={`Newest first, times in IST. Showing the latest ${LIMIT}. A number with no name means the visitor left after step 1: call or WhatsApp them.`}
      />

      {params.done === "deleted" ? (
        <AdminNotice>Enquiry deleted, with its report. Delete it in the CRM too.</AdminNotice>
      ) : null}
      {params.done === "kept" ? <AdminNotice>Report kept. It will not be asked about again.</AdminNotice> : null}
      {params.done === "report-deleted" ? (
        <AdminNotice>Report deleted. The rest of the enquiry is still here.</AdminNotice>
      ) : null}
      {params.error === "missing" ? <AdminNotice tone="error">That enquiry no longer exists.</AdminNotice> : null}

      {oldReports.length > 0 ? (
        <section className={`${adminCard} mt-6 p-5`} aria-labelledby="old-reports">
          <h2 id="old-reports" className="font-display text-lg font-semibold">
            Reports over {REPORT_REVIEW_DAYS} days old ({oldReports.length})
          </h2>
          <p className="mt-1 text-sm text-ink-2">Keep each one, or delete the report. The enquiry itself stays either way.</p>
          <ul className="mt-4 divide-y divide-hairline">
            {oldReports.map((lead) => (
              <li key={lead.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 py-3">
                <span className="min-w-48 flex-1 text-sm">
                  <span className="font-medium">{lead.name ?? lead.phone}</span>
                  <span className="text-ink-3"> · sent {when(lead.completedAt ?? lead.createdAt)}</span>
                </span>
                <a
                  href={`/admin/reports/${encodeURIComponent(lead.reportFile!)}`}
                  className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
                >
                  <FileArrowDownIcon size={17} aria-hidden />
                  Download
                </a>
                <form className="flex gap-2">
                  <input type="hidden" name="id" value={lead.id} />
                  <button type="submit" formAction={keepReportAction} className={adminButton.quiet}>
                    Keep
                  </button>
                  <button type="submit" formAction={deleteReportAction} className={adminButton.danger}>
                    <TrashIcon size={17} aria-hidden />
                    Delete report
                  </button>
                </form>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <dl className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <AdminTile label="Shown" value={leads.length} />
        <AdminTile label="Last 7 days" value={thisWeek} />
        <AdminTile label="Full details" value={complete} />
        <AdminTile label="Step 1 only" value={leads.length - complete} />
      </dl>

      {leads.length === 0 ? (
        <div className={`${adminCard} mt-6 px-6 py-14 text-center`}>
          <p className="font-display text-xl font-semibold">No enquiries yet</p>
          <p className="mt-2 text-base text-ink-2">
            They appear here the moment a visitor sends a number.
          </p>
        </div>
      ) : (
        <>
        {/* Phones: one card per enquiry, with large call and WhatsApp buttons. */}
        <ul className="mt-6 space-y-3 md:hidden">
          {leads.map((lead) => {
            const details = [
              ["Email", lead.email],
              ["From", lead.country ?? lead.phoneIso],
              ["Treatment", lead.treatment],
              ["When", lead.timeline],
              ["Priority", lead.budget],
              ["Prefers", lead.preference],
              ["Page", lead.source],
            ].filter(([, v]) => v);
            return (
              <li key={lead.id} className={`${adminCard} p-4`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  {lead.name ? <p className="text-base font-medium">{lead.name}</p> : <AdminBadge>Step 1 only</AdminBadge>}
                  <p className="text-sm text-ink-3">{when(lead.createdAt)}</p>
                </div>
                <p className="mt-1 text-base text-ink-2">{lead.phone}</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <a href={`tel:${lead.phone}`} className={adminButton.quiet}>
                    <PhoneIcon size={17} aria-hidden />
                    Call
                  </a>
                  <a href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className={adminButton.quiet}>
                    <WhatsappLogoIcon size={17} aria-hidden />
                    WhatsApp
                  </a>
                </div>
                {details.length ? (
                  <dl className="mt-3 grid grid-cols-[6rem_1fr] gap-x-3 gap-y-1 text-sm">
                    {details.map(([label, value]) => (
                      <div key={label} className="contents">
                        <dt className="text-ink-3">{label}</dt>
                        <dd className="min-w-0 break-words text-ink">{value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
                {lead.reportFile ? (
                  <a href={`/admin/reports/${encodeURIComponent(lead.reportFile)}`} className={`${adminButton.quiet} mt-3 w-full`}>
                    <FileArrowDownIcon size={17} aria-hidden />
                    Download report
                  </a>
                ) : null}
                {lead.notes ? (
                  <details className="mt-3">
                    <summary className="min-h-10 cursor-pointer py-2 text-sm font-medium text-accent">Notes</summary>
                    <p className="whitespace-pre-wrap text-sm text-ink-2">{lead.notes}</p>
                  </details>
                ) : null}
              </li>
            );
          })}
        </ul>
        <div className={`${adminCard} mt-6 hidden overflow-x-auto shadow-card md:block`}>
          <table className="w-full min-w-[80rem] text-start text-sm">
            <thead className="border-b border-hairline bg-surface-2 text-[0.8125rem] tracking-[0.06em] text-ink-3 uppercase">
              <tr>
                {["Received", "Name", "Phone", "Email", "From", "Treatment", "When", "Priority", "Prefers", "Page", "Report", "Notes", ""].map(
                  (heading) => (
                    <th key={heading} scope="col" className="px-4 py-3 text-start font-medium">
                      {heading}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b border-hairline align-top transition-colors last:border-b-0 hover:bg-accent-quiet"
                >
                  <td className="px-4 py-3.5 whitespace-nowrap text-ink-2">{when(lead.createdAt)}</td>
                  <td className="px-4 py-3.5">
                    {lead.name ? (
                      <span className="font-medium">{lead.name}</span>
                    ) : (
                      <AdminBadge>Step 1 only</AdminBadge>
                    )}
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="flex items-center gap-2">
                      <a href={`tel:${lead.phone}`} className="text-accent hover:underline">
                        {lead.phone}
                      </a>
                      <a
                        href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`WhatsApp ${lead.phone}`}
                        className="flex size-7 items-center justify-center rounded-sm text-brand transition-colors hover:bg-accent-soft"
                      >
                        <WhatsappLogoIcon size={18} aria-hidden />
                      </a>
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    {lead.email ? (
                      <a href={`mailto:${lead.email}`} className="text-accent hover:underline">
                        {lead.email}
                      </a>
                    ) : null}
                  </td>
                  <td className="px-4 py-3.5">{lead.country ?? lead.phoneIso}</td>
                  <td className="px-4 py-3.5">{lead.treatment}</td>
                  <td className="px-4 py-3.5">{lead.timeline}</td>
                  <td className="px-4 py-3.5">{lead.budget}</td>
                  <td className="px-4 py-3.5">{lead.preference}</td>
                  <td className="px-4 py-3.5 text-ink-3">{lead.source}</td>
                  <td className="px-4 py-3.5">
                    {lead.reportFile ? (
                      <a
                        href={`/admin/reports/${encodeURIComponent(lead.reportFile)}`}
                        className="inline-flex items-center gap-1.5 text-accent hover:underline"
                      >
                        <FileArrowDownIcon size={17} aria-hidden />
                        Download
                      </a>
                    ) : null}
                  </td>
                  <td className="max-w-[22rem] px-4 py-3.5 text-ink-2">
                    {lead.notes ? (
                      <details className="accordion">
                        <summary className="cursor-pointer">
                          {lead.notes.length > 40 ? `${lead.notes.slice(0, 40)}…` : lead.notes}
                        </summary>
                        <p className="mt-2 whitespace-pre-wrap">{lead.notes}</p>
                      </details>
                    ) : null}
                  </td>
                  <td className="px-4 py-3.5">
                    {/* Two clicks, so a stray one cannot erase an enquiry. */}
                    <details>
                      <summary className="cursor-pointer list-none text-ink-3 hover:text-red-700">Delete</summary>
                      <form action={deleteLeadAction} className="mt-2">
                        <input type="hidden" name="id" value={lead.id} />
                        <button type="submit" className={`${adminButton.danger} whitespace-nowrap`}>
                          <TrashIcon size={17} aria-hidden />
                          Delete for good
                        </button>
                      </form>
                    </details>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </>
      )}
    </>
  );
}
