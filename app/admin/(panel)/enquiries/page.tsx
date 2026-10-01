import { listLeads } from "@/lib/leads";
import { AdminHeading } from "@/components/admin/ui";

const LIMIT = 200;

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

  return (
    <>
      <AdminHeading
        title="Enquiries"
        intro={`Newest first, times in IST. Showing the latest ${LIMIT}. A number with no name means the visitor left after step 1: call or WhatsApp them.`}
      />

      {leads.length === 0 ? (
        <p className="mt-8 text-base text-ink-2">No enquiries yet.</p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-lg border border-hairline bg-surface">
          <table className="w-full min-w-[64rem] text-start text-sm">
            <thead className="border-b border-hairline bg-surface-2 text-ink-2">
              <tr>
                {["Received", "Name", "Phone", "Email", "From", "Treatment", "When", "Page", "Report", "Notes"].map(
                  (heading) => (
                    <th key={heading} scope="col" className="px-3 py-3 text-start font-medium">
                      {heading}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-hairline align-top last:border-b-0">
                  <td className="px-3 py-3 whitespace-nowrap text-ink-2">{when(lead.createdAt)}</td>
                  <td className="px-3 py-3">
                    {lead.name ?? <span className="text-ink-3">Step 1 only</span>}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <a href={`tel:${lead.phone}`} className="text-accent hover:underline">
                      {lead.phone}
                    </a>
                  </td>
                  <td className="px-3 py-3">
                    {lead.email ? (
                      <a href={`mailto:${lead.email}`} className="text-accent hover:underline">
                        {lead.email}
                      </a>
                    ) : null}
                  </td>
                  <td className="px-3 py-3">{lead.country ?? lead.phoneIso}</td>
                  <td className="px-3 py-3">{lead.treatment}</td>
                  <td className="px-3 py-3">{lead.timeline}</td>
                  <td className="px-3 py-3 text-ink-2">{lead.source}</td>
                  <td className="px-3 py-3">
                    {lead.reportFile ? (
                      <a
                        href={`/admin/reports/${encodeURIComponent(lead.reportFile)}`}
                        className="text-accent hover:underline"
                      >
                        Download
                      </a>
                    ) : null}
                  </td>
                  <td className="max-w-[22rem] px-3 py-3 text-ink-2">
                    {lead.notes ? (
                      <details>
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
