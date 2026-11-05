import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { ArticleIcon } from "@phosphor-icons/react/dist/ssr/Article";
import { CaretRightIcon } from "@phosphor-icons/react/dist/ssr/CaretRight";
import { ChartBarIcon } from "@phosphor-icons/react/dist/ssr/ChartBar";
import { FirstAidKitIcon } from "@phosphor-icons/react/dist/ssr/FirstAidKit";
import { HospitalIcon } from "@phosphor-icons/react/dist/ssr/Hospital";
import { PhoneIcon } from "@phosphor-icons/react/dist/ssr/Phone";
import { StethoscopeIcon } from "@phosphor-icons/react/dist/ssr/Stethoscope";
import { TranslateIcon } from "@phosphor-icons/react/dist/ssr/Translate";
import { TrayIcon } from "@phosphor-icons/react/dist/ssr/Tray";
import { UsersThreeIcon } from "@phosphor-icons/react/dist/ssr/UsersThree";
import { recentActivity, requireAdmin } from "@/lib/admin/auth";
import { listRecords } from "@/lib/admin/records";
import { listLeads } from "@/lib/leads";
import { AdminHeading, AdminNotice, adminCard, adminWhen } from "@/components/admin/ui";

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

/** Server render only, so the clock is read once per request. */
function weekAgo() {
  return new Date(Date.now() - WEEK_MS).toISOString();
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase() || "?";
}

/** The first page after sign-in: the numbers that matter, shortcuts, and what changed lately. */
export default async function AdminHome({ searchParams }: PageProps<"/admin">) {
  const user = await requireAdmin();
  const { welcome } = await searchParams;
  const [hospitals, doctors, treatments, posts, activity, leads] = await Promise.all([
    listRecords("hospital"),
    listRecords("doctor"),
    listRecords("treatment"),
    listRecords("post"),
    recentActivity(15),
    listLeads(200),
  ]);
  const live = (rows: { status: string }[]) => rows.filter((r) => r.status !== "hidden").length;
  const since = weekAgo();
  const leadsThisWeek = leads.filter((lead) => lead.createdAt > since).length;

  const content = [
    { href: "/admin/hospitals", label: "Hospitals", value: live(hospitals), total: hospitals.length, Icon: HospitalIcon },
    { href: "/admin/doctors", label: "Doctors", value: live(doctors), total: doctors.length, Icon: StethoscopeIcon },
    { href: "/admin/treatments", label: "Treatments", value: live(treatments), total: treatments.length, Icon: FirstAidKitIcon },
    { href: "/admin/blog", label: "Blog posts", value: live(posts), total: posts.length, Icon: ArticleIcon },
  ];

  const shortcuts = [
    { href: "/admin/translations", label: "Translations", hint: "Other languages, one by one or by CSV", Icon: TranslateIcon },
    { href: "/admin/contact", label: "Contact details", hint: "WhatsApp, phone, email, social", Icon: PhoneIcon },
    { href: "/admin/stats", label: "Trust figures", hint: "The numbers under the home page photo", Icon: ChartBarIcon },
    ...(user.role === "owner"
      ? [{ href: "/admin/team", label: "Team", hint: "Who can sign in here", Icon: UsersThreeIcon }]
      : []),
  ];

  return (
    <>
      <AdminHeading
        eyebrow="Overview"
        title={`Hello, ${user.name.split(" ")[0]}`}
        intro="Saved changes show on the site within a minute. Write in English; add the other languages with the Translate buttons or on the Translations page."
      />
      {welcome ? (
        <AdminNotice>Your account is ready. Add the rest of the team under Team.</AdminNotice>
      ) : null}

      <Link
        href="/admin/enquiries"
        className="group relative mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 overflow-hidden rounded-xl bg-deep px-6 py-5 text-white shadow-lift"
      >
        <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-white/10 text-glow ring-1 ring-white/15">
          <TrayIcon size={22} aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm text-white/70">Enquiries in the last 7 days</span>
          <span className="mt-0.5 block font-display text-[2rem] leading-none font-semibold tracking-[-0.02em] tabular-nums">
            {leadsThisWeek}
          </span>
        </span>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-white/85 transition-colors group-hover:text-white">
          See all enquiries
          <ArrowRightIcon size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
        </span>
      </Link>

      <h2 className="mt-10 text-sm font-semibold text-ink">On the site</h2>
      <ul className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {content.map(({ href, label, value, total, Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className={`${adminCard} group flex h-full flex-col p-5 transition-[border-color,box-shadow] duration-200 hover:border-line hover:shadow-card`}
            >
              <span className="flex items-center justify-between">
                <span className="text-sm font-medium text-ink-3">{label}</span>
                <Icon size={20} className="text-ink-3 transition-colors group-hover:text-accent" aria-hidden />
              </span>
              <span className="mt-3 font-display text-[2rem] leading-none font-semibold tracking-[-0.02em] text-ink tabular-nums">
                {value}
              </span>
              <span className="mt-2 text-[0.8125rem] text-ink-3">
                {total - value > 0 ? `${total - value} hidden` : "All visible"}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        <section aria-labelledby="recent">
          <h2 id="recent" className="text-sm font-semibold text-ink">Recent changes</h2>
          {activity.length === 0 ? (
            <p className={`${adminCard} mt-3 px-5 py-10 text-center text-sm text-ink-3`}>Nothing changed yet.</p>
          ) : (
            <ol className={`${adminCard} mt-3 divide-y divide-hairline`}>
              {activity.map((item) => (
                <li key={item.id} className="flex items-start gap-3 px-5 py-3.5">
                  <span
                    aria-hidden
                    className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-accent-soft text-[0.75rem] font-semibold text-accent"
                  >
                    {initials(item.userName)}
                  </span>
                  <span className="min-w-0 flex-1 text-sm">
                    <span className="text-ink">
                      <span className="font-medium">{item.userName}</span>{" "}
                      {item.href ? (
                        <Link href={item.href} className="text-ink-2 hover:text-accent hover:underline">
                          {item.summary}
                        </Link>
                      ) : (
                        <span className="text-ink-2">{item.summary}</span>
                      )}
                    </span>
                    <span className="mt-0.5 block text-[0.8125rem] text-ink-3">{adminWhen(item.at)}</span>
                  </span>
                </li>
              ))}
            </ol>
          )}
        </section>

        <section aria-labelledby="shortcuts">
          <h2 id="shortcuts" className="text-sm font-semibold text-ink">Site settings</h2>
          <ul className={`${adminCard} mt-3 divide-y divide-hairline`}>
            {shortcuts.map(({ href, label, hint, Icon }) => (
              <li key={href}>
                <Link href={href} className="group flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-surface-2">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                    <Icon size={18} aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-ink">{label}</span>
                    <span className="block truncate text-[0.8125rem] text-ink-3">{hint}</span>
                  </span>
                  <CaretRightIcon size={16} className="shrink-0 text-ink-3 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
