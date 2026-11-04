import type { Metadata } from "next";
import { getDoctors, getHospitals, getSpecialities, nameOf } from "@/lib/catalog";
import { first } from "@/lib/query";
import { PageShell } from "@/components/site/PageShell";
import { Container } from "@/components/ui/Container";
import { PageHead } from "@/components/catalog/PageHead";
import { DoctorTile } from "@/components/catalog/DoctorTile";
import { ListBrowser } from "@/components/catalog/ListBrowser";
import { EnquiryBlock } from "@/components/sections/EnquiryBlock";
import { Note } from "@/components/ui/Section";
import { getLang, getText } from "@/lib/i18n/text";
import { languageAlternates } from "@/lib/i18n/alternates";
import { localPath } from "@/lib/i18n/languages";
import Link from "@/components/ui/Link";

// The filters come from the address, so the page is drawn for each visit
// rather than cached: with no page built ahead, Next cannot tell on its own.
export const dynamic = "force-dynamic";

/** Shared page: one copy for every country. */

type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> };

export async function generateMetadata(): Promise<Metadata> {
  const { catalog } = await getText();
  const lang = await getLang();
  return {
    title: catalog.doctors.meta.title,
    alternates: languageAlternates("/doctors", lang.code),
    description: catalog.doctors.meta.description,
  };
}

export default async function Page({ searchParams }: Props) {
  const { catalog, plainSpeciality } = await getText();
  const text = catalog.doctors;
  const lang = await getLang();
  const query = await searchParams;
  const speciality = first(query.speciality);
  const hospital = first(query.hospital);

  const [everyone, hospitals, specialities] = await Promise.all([getDoctors(), getHospitals(), getSpecialities()]);

  // Only specialities and hospitals that have a doctor on the list, so no
  // option leads to an empty page.
  const chips = specialities.filter((s) => everyone.some((d) => d.speciality === s.slug));
  const places = hospitals.filter((h) => everyone.some((d) => d.hospital === h.slug));

  const stats = [
    { value: everyone.length, label: text.stats.doctors },
    { value: chips.length, label: text.stats.specialities },
    { value: places.length, label: text.stats.hospitals },
  ];

  return (
    <PageShell current="/doctors">
      <PageHead heading={text.heading} intro={text.intro} stats={stats} />

      <ListBrowser
        items={everyone.map((d) => {
          const at = hospitals.find((h) => h.slug === d.hospital);
          return {
            slug: d.slug,
            place: d.hospital,
            specialities: [d.speciality],
            search: [
              d.name,
              d.role,
              nameOf(specialities, d.speciality),
              plainSpeciality[d.speciality],
              at?.name,
              at?.city,
              ...d.expertise,
            ]
              .join(" ")
              .toLowerCase(),
          };
        })}
        cards={Object.fromEntries(
          everyone.map((d) => [
            d.slug,
            <DoctorTile
              key={d.slug}
              doctor={d}
              speciality={nameOf(specialities, d.speciality)}
              hospital={nameOf(hospitals, d.hospital)}
              view={text.view}
            />,
          ]),
        )}
        specialities={chips}
        places={places.map((h) => ({ value: h.slug, label: h.name }))}
        plainSpeciality={plainSpeciality}
        initial={{
          speciality: chips.some((s) => s.slug === speciality) ? speciality : "",
          place: places.some((h) => h.slug === hospital) ? hospital : "",
        }}
        placeParam="hospital"
        path={localPath(lang.code, "/doctors")}
        more={null}
        text={{
          ...catalog.filters,
          placeholder: text.searchPlaceholder,
          place: text.filters.hospital,
        }}
        grid="sm:grid-cols-2 xl:grid-cols-3"
      />

      <Container className="pb-4">
        <Note>
          <AskUsNote note={text.note} href={localPath(lang.code, "/contact")} />
        </Note>
      </Container>

      <EnquiryBlock content={{ enquiry: catalog.enquiry }} source="/doctors" />
    </PageShell>
  );
}

/** The note's last sentence asks people to get in touch, so it links to the
 *  contact page. In English only the words "Ask us" carry the link. */
function AskUsNote({ note, href }: { note: string; href: string }) {
  const linkClass =
    "text-accent underline underline-offset-4 transition-colors hover:text-accent-hover";
  const ask = note.indexOf("Ask us");
  if (ask !== -1) {
    return (
      <>
        {note.slice(0, ask)}
        <Link href={href} className={linkClass}>
          Ask us
        </Link>
        {note.slice(ask + "Ask us".length)}
      </>
    );
  }
  const match = note.match(/^([^]*?[.।。]\s+)([^]+)$/);
  if (!match) return <>{note}</>;
  return (
    <>
      {match[1]}
      <Link href={href} className={linkClass}>
        {match[2]}
      </Link>
    </>
  );
}
