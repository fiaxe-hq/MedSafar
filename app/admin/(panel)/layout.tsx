import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { adminSections } from "@/lib/admin/sections";
import { adminButton } from "@/components/admin/ui";
import { signOutAction } from "../actions";

/** Every page in the panel needs a session. Actions check again on their own. */
export default async function PanelLayout({ children }: LayoutProps<"/admin">) {
  await requireAdmin();

  return (
    <>
      <header className="border-b border-hairline bg-surface">
        <div className="mx-auto flex max-w-[78rem] flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 sm:px-8">
          <Link href="/admin" className="font-display text-lg font-bold">
            Medsafar admin
          </Link>
          <nav aria-label="Admin" className="flex flex-1 flex-wrap gap-1">
            {adminSections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="flex min-h-11 items-center rounded-sm px-3 text-base text-ink-2 hover:bg-surface-2 hover:text-ink"
              >
                {section.label}
              </Link>
            ))}
          </nav>
          <form action={signOutAction}>
            <button type="submit" className={adminButton.quiet}>
              Sign out
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto w-full max-w-[78rem] flex-1 px-4 py-10 sm:px-8">{children}</main>
    </>
  );
}
