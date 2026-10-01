import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medsafar admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return <div className="flex min-h-full flex-1 flex-col bg-surface-2">{children}</div>;
}
