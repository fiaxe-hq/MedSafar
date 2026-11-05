import { cookies } from "next/headers";
import { requireAdmin } from "@/lib/admin/auth";
import { AdminShell } from "@/components/admin/AdminNav";
import { NAV_COOKIE } from "@/lib/admin/nav";

/** Every page in the panel needs a session. Actions check again on their own. */
export default async function PanelLayout({ children }: LayoutProps<"/admin">) {
  const user = await requireAdmin();
  // Read on the server, so a collapsed sidebar does not open wide for a moment on load.
  const collapsed = (await cookies()).get(NAV_COOKIE)?.value === "collapsed";

  return (
    <AdminShell user={{ name: user.name, email: user.email, role: user.role }} initialCollapsed={collapsed}>
      {children}
    </AdminShell>
  );
}
