import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileBar } from "@/components/site/MobileBar";
import { HomeC } from "@/components/home/HomeC";
import { Motion } from "@/components/site/Motion";
import { Intro } from "@/components/site/Intro";
import "@/components/site/motion.css";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div data-home>
      <Intro />
      <div aria-hidden className="home-progress" />
      <Header home="/" iso={null} countryName="" overlay />
      {/* Room at the foot of the page for the fixed bar on phones. */}
      <main className="w-full max-w-full overflow-x-clip pb-24 lg:pb-0">
        <HomeC />
      </main>
      <Footer home="/" />
      <MobileBar />
      <Motion />
    </div>
  );
}
