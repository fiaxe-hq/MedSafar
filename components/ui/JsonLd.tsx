import { jsonLd } from "@/lib/seo";

/** Structured data for search engines and AI assistants; empty entries are skipped. */
export function JsonLd({ data }: { data: (object | null)[] }) {
  return (
    <>
      {data.filter((d): d is object => d !== null).map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(d) }} />
      ))}
    </>
  );
}
