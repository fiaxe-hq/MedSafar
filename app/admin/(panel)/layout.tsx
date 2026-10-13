import Link from "next/link";
import { ArrowSquareOutIcon } from "@phosphor-icons/react/dist/ssr/ArrowSquareOut";
import { SignOutIcon } from "@phosphor-icons/react/dist/ssr/SignOut";
import { requireAdmin } from "@/lib/admin/auth";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/site/Logo";
import { AdminNav } from "@/components/admin/AdminNav";
import { adminButton } from "@/components/admin/ui";
import { signOutAction } from "../actions";

/** Every page in the panel needs a session. Actions check again on their own. */
export default async function PanelLayout({ children }: LayoutProps<"/admin">) {
  await requireAdmin();

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-hairline bg-bg/90 backdrop-blur-md">
        <Container className="flex h-16 items-center gap-4">
          <Logo href="/admin" />
          <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-accent">
            Admin
          </span>
          <div className="hidden flex-1 justify-center md:flex">
            <AdminNav />
          </div>
          <div className="ms-auto flex items-center gap-2 md:ms-0">
            <Link
              href="/"
              target="_blank"
              className="hidden min-h-11 items-center gap-1.5 rounded-sm px-3 text-[0.9375rem] text-ink-2 transition-colors hover:bg-brand/10 hover:text-ink sm:flex"
            >
              View site
              <ArrowSquareOutIcon size={16} aria-hidden />
            </Link>
            <form action={signOutAction}>
              <button type="submit" className={adminButton.quiet}>
                <SignOutIcon size={17} aria-hidden />
                Sign out
              </button>
            </form>
          </div>
        </Container>
        <Container className="pb-1 md:hidden">
          <AdminNav />
        </Container>
      </header>
      <main className="page-in flex-1 py-10 sm:py-14">
        <Container>{children}</Container>
      </main>
    </>
  );
}
