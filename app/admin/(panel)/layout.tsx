import { requireAdmin } from "@/lib/admin/auth";
import { AdminNav } from "@/components/admin/AdminNav";

/** Every page in the panel needs a session. Actions check again on their own. */
export default async function PanelLayout({ children }: LayoutProps<"/admin">) {
  const user = await requireAdmin();

  return (
    <>
      <AdminNav user={{ name: user.name, email: user.email, role: user.role }} />
      <main className="page-in flex-1 lg:ps-64">
        <div className="mx-auto w-full max-w-[76rem] px-4 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">{children}</div>
      </main>
    </>
  );
}
