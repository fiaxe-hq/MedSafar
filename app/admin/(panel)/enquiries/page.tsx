import { FileArrowDownIcon } from "@phosphor-icons/react/dist/ssr/FileArrowDown";
import { WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr/WhatsappLogo";
import { listLeads } from "@/lib/leads";
import { AdminBadge, AdminHeading, AdminTile, adminCard } from "@/components/admin/ui";

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

/** Read-only. Each row is one enquiry; step-2 fields are blank if the visitor stopped at step 1. */
export default async function EnquiriesPage() {
  const leads = await listLeads(LIMIT);
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
        <div className={`${adminCard} mt-6 overflow-x-auto shadow-card`}>
          <table className="w-full min-w-[80rem] text-start text-sm">
            <thead className="border-b border-hairline bg-surface-2 text-[0.8125rem] tracking-[0.06em] text-ink-3 uppercase">
              <tr>
                {["Received", "Name", "Phone", "Email", "From", "Treatment", "When", "Priority", "Prefers", "Page", "Report", "Notes"].map(
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
