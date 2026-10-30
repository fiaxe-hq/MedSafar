import Link from "next/link";
import { ArrowSquareOutIcon } from "@phosphor-icons/react/dist/ssr/ArrowSquareOut";
import { SignOutIcon } from "@phosphor-icons/react/dist/ssr/SignOut";
import { UserCircleIcon } from "@phosphor-icons/react/dist/ssr/UserCircle";
import { requireAdmin } from "@/lib/admin/auth";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/site/Logo";
import { AdminNav } from "@/components/admin/AdminNav";
import { adminButton } from "@/components/admin/ui";
import { signOutAction } from "../actions";

/** Every page in the panel needs a session. Actions check again on their own. */
export default async function PanelLayout({ children }: LayoutProps<"/admin">) {
  const user = await requireAdmin();

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-hairline bg-bg/90 backdrop-blur-md">
        <Container className="flex h-16 items-center gap-3">
          <Logo href="/admin" />
          <span className="hidden rounded-full bg-accent-soft px-2.5 py-0.5 text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-accent sm:inline">
            Admin
          </span>
          <div className="ms-auto flex items-center gap-1 sm:gap-2">
            <Link
              href="/"
              target="_blank"
              className="hidden min-h-11 items-center gap-1.5 rounded-sm px-3 text-[0.9375rem] text-ink-2 transition-colors hover:bg-brand/10 hover:text-ink md:flex"
            >
              View site
              <ArrowSquareOutIcon size={16} aria-hidden />
            </Link>
            <Link
              href="/admin/account"
              className="flex min-h-11 items-center gap-1.5 rounded-sm px-2 text-[0.9375rem] text-ink-2 transition-colors hover:bg-brand/10 hover:text-ink sm:px-3"
              title="My account"
            >
              <UserCircleIcon size={20} aria-hidden />
              <span className="max-w-[10rem] truncate">{user.name}</span>
            </Link>
            <form action={signOutAction}>
              <button type="submit" className={adminButton.quiet} aria-label="Sign out">
                <SignOutIcon size={17} aria-hidden />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </form>
          </div>
        </Container>
        <Container className="pb-1">
          <AdminNav owner={user.role === "owner"} />
        </Container>
      </header>
      <main className="page-in flex-1 py-10 sm:py-14">
        <Container>{children}</Container>
      </main>
    </>
  );
}
