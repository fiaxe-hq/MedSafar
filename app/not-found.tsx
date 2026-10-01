import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { btnPrimary } from "@/components/ui/styles";
import { site } from "@/content/site";

export default function NotFound() {
  return (
    <>
      <Header home="/" />
      <main className="flex grow items-center py-24 sm:py-32">
        <Container>
          <h1 className="display-2">{site.notFound.heading}</h1>
          <p className="mt-5 max-w-[46ch] text-lg text-ink-2">{site.notFound.body}</p>
          <Link href="/" className={`${btnPrimary} mt-8`}>
            {site.cta.primary}
          </Link>
        </Container>
      </main>
      <Footer />
    </>
  );
}
