import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { btnPrimary } from "@/components/ui/styles";

/** Shown in place of every page except the home page during the client preview. */
export const metadata: Metadata = {
  title: "Coming soon",
  robots: { index: false, follow: false },
};

export default function ComingSoon() {
  return (
    <>
      <Header home="/" />
      <main className="page-in flex grow items-center py-24 sm:py-32">
        <Container>
          <h1 className="display-2">Coming soon</h1>
          <p className="mt-5 max-w-[46ch] text-lg text-ink-2">
            This page is built and will open soon. For now, take a look at the home page designs.
          </p>
          <Link href="/design-lab" className={`${btnPrimary} mt-8`}>
            Back to the home page
          </Link>
        </Container>
      </main>
      <Footer />
    </>
  );
}
