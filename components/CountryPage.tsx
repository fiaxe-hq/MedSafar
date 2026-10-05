import type { CountryContent } from "@/content/types";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileBar } from "@/components/site/MobileBar";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Hospitals } from "@/components/sections/Hospitals";
import { WhatWeHandle } from "@/components/sections/WhatWeHandle";
import { Stories } from "@/components/sections/Stories";
import { CountryInfo } from "@/components/sections/CountryInfo";
import { Faq } from "@/components/sections/Faq";
import { EnquiryBlock } from "@/components/sections/EnquiryBlock";

/**
 * One template for the home page and for every country page. The sections and
 * their order never change. Only the content file does.
 */
export function CountryPage({ content }: { content: CountryContent }) {
  const source = content.slug ? `/${content.slug}` : "/";

  return (
    <>
      <Header home={source} iso={content.iso} countryName={content.countryName ?? ""} />
      {/* Room at the foot of the page for the fixed bar on phones. */}
      <main className="page-in w-full max-w-full overflow-x-clip pb-24 lg:pb-0">
        <Hero content={content} source={source} />
        <TrustStrip content={content} />
        <HowItWorks content={content} />
        <Hospitals content={content} />
        <WhatWeHandle content={content} />
        <Stories content={content} />
        <CountryInfo content={content} />
        <Faq content={content} />
        <EnquiryBlock content={content} source={source} />
      </main>
      <Footer home={source} />
      <MobileBar />
    </>
  );
}
