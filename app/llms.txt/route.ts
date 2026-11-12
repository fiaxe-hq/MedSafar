import { connection } from "next/server";
import { textWithEdits } from "@/lib/i18n/text";
import { languages } from "@/lib/i18n/languages";
import { hiddenLink } from "@/lib/preview";
import { siteUrl } from "@/lib/seo";

/**
 * /llms.txt: the site in plain text for AI assistants (ChatGPT, Claude,
 * Perplexity, Gemini), so they can describe and cite Med Safar correctly.
 * Built from the same records as the pages, with the changes made in /admin.
 */
export async function GET() {
  await connection();
  const { site, global, specialities, treatments, hospitals, doctors } = await textWithEdits("en");
  const real = <T extends { pending?: boolean }>(records: T[]) => records.filter((r) => !r.pending);
  const url = (path: string) => `${siteUrl}${path}`;
  const end = (text: string) => text.trim().replace(/.+$/, "");
  const usd = (n: number) => `US$${n.toLocaleString("en-US")}`;

  const lines: string[] = [
    "# Med Safar India",
    "",
    `> ${global.meta.description}`,
    "",
    `Med Safar India, a division of Travgrub Private Limited, is a medical travel facilitator based in Mumbai, India. It connects patients from Africa, the Middle East, Central Asia, South Asia and the rest of the world with experienced doctors and accredited multi-speciality hospitals in India, where treatment usually costs far less than in the US, UK or Gulf countries. ${site.consultation.note}`,
    "",
    "Key facts:",
    "- The medical opinion and the written cost estimate are free. The estimate comes from the treating hospital, and package prices are shown on the website in US dollars.",
    "- Med Safar arranges the hospital, the doctor, the visa invitation letter, flights, airport pickup, a place to stay, a local coordinator and follow-up after the patient returns home.",
    "- Doctors have more than 15 years of experience; hospitals are multi-speciality hospitals in India, several accredited by JCI and NABH.",
    `- The website is available in ${languages.length} languages: ${languages.map((l) => l.english).join(", ")}.`,
    `- Contact: WhatsApp or phone ${site.contact.phone.display}, email ${site.contact.email}, or the free treatment plan form at ${url("/contact")}.`,
    `- Office: ${site.company.registeredAddress ?? "Mumbai, India"}.`,
    "",
    "## Treatments by speciality",
    "",
  ];

  for (const speciality of specialities) {
    const list = treatments.filter((t) => t.speciality === speciality.slug && !hiddenLink(`/treatments/${t.slug}`));
    if (!list.length) continue;
    lines.push(`### ${speciality.name}`, "", speciality.summary, "");
    for (const t of list) {
      lines.push(`- [${t.name} in India](${url(`/treatments/${t.slug}`)}): ${t.summary} Hospital stay: ${end(t.stay)}. Recovery: ${end(t.recovery)}.`);
    }
    lines.push("");
  }

  lines.push("## Partner hospitals and package prices", "");
  for (const h of real(hospitals)) {
    const prices = (h.packages ?? []).flatMap((g) => g.items.map((i) => i.priceUsd));
    const range = prices.length ? ` Package prices from ${usd(Math.min(...prices))} to ${usd(Math.max(...prices))}.` : "";
    lines.push(`- [${h.name}, ${h.city}](${url(`/hospitals/${h.slug}`)})${h.accreditation ? ` (${h.accreditation})` : ""}: ${h.overview}${range}`);
    for (const g of h.packages ?? []) {
      lines.push(`  - ${g.category}: ${g.items.map((i) => `${i.name} ${usd(i.priceUsd)}`).join("; ")}`);
    }
  }

  lines.push("", "## Doctors", "");
  for (const d of real(doctors)) {
    const hospital = hospitals.find((h) => h.slug === d.hospital);
    lines.push(`- [${d.name}](${url(`/doctors/${d.slug}`)}): ${d.role}${hospital ? `, ${hospital.name}, ${hospital.city}` : ""}.`);
  }

  lines.push("", "## Questions patients ask", "");
  for (const q of global.faq.items) lines.push(`### ${q.question}`, "", q.answer, "");

  lines.push(
    "## Other pages",
    "",
    `- [About Med Safar India](${url("/about")})`,
    `- [All treatments](${url("/treatments")})`,
    `- [All hospitals](${url("/hospitals")})`,
    `- [All doctors](${url("/doctors")})`,
    `- [Guides for patients](${url("/blog")})`,
    `- [Contact and free treatment plan](${url("/contact")})`,
    `- [Sitemap](${url("/sitemap.xml")})`,
    "",
  );

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
