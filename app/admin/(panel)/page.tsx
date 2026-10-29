import Link from "next/link";
import { ArticleIcon } from "@phosphor-icons/react/dist/ssr/Article";
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
import { AdminHeading, AdminNotice, adminCard, adminWhen } from "@/components/admin/ui";

/** The first page after sign-in: where everything is, and what changed lately. */
export default async function AdminHome({ searchParams }: PageProps<"/admin">) {
  const user = await requireAdmin();
  const { welcome } = await searchParams;
  const [hospitals, doctors, treatments, posts, activity] = await Promise.all([
    listRecords("hospital"),
    listRecords("doctor"),
    listRecords("treatment"),
    listRecords("post"),
    recentActivity(15),
  ]);
  const live = (rows: { status: string }[]) => rows.filter((r) => r.status !== "hidden").length;

  const cards = [
    { href: "/admin/hospitals", label: "Hospitals", count: `${live(hospitals)} on the site`, Icon: HospitalIcon },
    { href: "/admin/doctors", label: "Doctors", count: `${live(doctors)} on the site`, Icon: StethoscopeIcon },
    { href: "/admin/treatments", label: "Treatments", count: `${live(treatments)} on the site`, Icon: FirstAidKitIcon },
    { href: "/admin/blog", label: "Blog posts", count: `${live(posts)} on the site`, Icon: ArticleIcon },
    { href: "/admin/translations", label: "Translations", count: "Other languages, one by one or by CSV", Icon: TranslateIcon },
    { href: "/admin/contact", label: "Contact details", count: "WhatsApp, phone, email, social", Icon: PhoneIcon },
    { href: "/admin/stats", label: "Trust figures", count: "The numbers under the home page photo", Icon: ChartBarIcon },
    { href: "/admin/enquiries", label: "Enquiries", count: "A copy of what goes to the CRM", Icon: TrayIcon },
    ...(user.role === "owner"
      ? [{ href: "/admin/team", label: "Team", count: "Who can sign in here", Icon: UsersThreeIcon }]
      : []),
  ];

  return (
    <>
      <AdminHeading
        eyebrow="Admin"
        title={`Hello, ${user.name.split(" ")[0]}`}
        intro="Choose what you want to change. Saved changes show on the site within a minute. Write in English; add the other languages with the Translate buttons or on the Translations page."
      />
      {welcome ? (
        <AdminNotice>Your account is ready. Add the rest of the team under Team.</AdminNotice>
      ) : null}

      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ href, label, count, Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className={`${adminCard} group flex h-full items-start gap-4 p-5 transition-[border-color,box-shadow] hover:border-accent hover:shadow-card`}
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                <Icon size={22} aria-hidden />
              </span>
              <span>
                <span className="block text-base font-medium text-ink group-hover:text-accent">{label}</span>
                <span className="mt-0.5 block text-sm text-ink-3">{count}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <h2 className="mt-12 font-display text-xl font-semibold">Recent changes</h2>
      {activity.length === 0 ? (
        <p className="mt-2 text-base text-ink-3">Nothing changed yet.</p>
      ) : (
        <ol className={`${adminCard} mt-4 divide-y divide-hairline`}>
          {activity.map((item) => (
            <li key={item.id} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-5 py-3.5">
              <span className="text-base text-ink">
                <span className="font-medium">{item.userName}</span>{" "}
                {item.href ? (
                  <Link href={item.href} className="text-ink-2 hover:text-accent hover:underline">
                    {item.summary}
                  </Link>
                ) : (
                  <span className="text-ink-2">{item.summary}</span>
                )}
              </span>
              <span className="text-sm text-ink-3">{adminWhen(item.at)}</span>
            </li>
          ))}
        </ol>
      )}
    </>
  );
}
