import { Footer } from "./Footer";
import { Header } from "./Header";
import { MobileBar } from "./MobileBar";

/**
 * Frame for the shared pages: hospitals, doctors, treatments and the rest.
 * The same header, footer and phone bar as the home page.
 */
export function PageShell({
  children,
  current,
}: {
  children: React.ReactNode;
  /** The header link to mark as the section being viewed. */
  current?: string;
}) {
  return (
    <>
      <Header home="/" current={current} />
      {/* Room at the foot of the page for the fixed bar on phones. */}
      <main className="page-in w-full max-w-full overflow-x-clip pb-24 lg:pb-0">{children}</main>
      <Footer />
      <MobileBar />
    </>
  );
}
