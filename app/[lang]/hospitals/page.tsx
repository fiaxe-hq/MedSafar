import type { Metadata } from "next";
import { showUpcoming } from "@/lib/preview";
import { getDoctors, getHospitalCities, getHospitals, getSpecialities, getTreatments, nameOf } from "@/lib/catalog";
import { first } from "@/lib/query";
import { PageShell } from "@/components/site/PageShell";
import { PageHead } from "@/components/catalog/PageHead";
import { HospitalCard } from "@/components/catalog/HospitalCard";
import { ListBrowser } from "@/components/catalog/ListBrowser";
import { EnquiryBlock } from "@/components/sections/EnquiryBlock";
import { Note } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { getLang, getText } from "@/lib/i18n/text";
import { languageAlternates } from "@/lib/i18n/alternates";
import { localPath } from "@/lib/i18n/languages";

// The filters come from the address, so the page is drawn for each visit
// rather than cached: with no page built ahead, Next cannot tell on its own.
export const dynamic = "force-dynamic";

/** Shared page: one copy for every country. */

type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> };

export async function generateMetadata(): Promise<Metadata> {
  const { catalog } = await getText();
  const lang = await getLang();
  return {
    title: catalog.hospitals.meta.title,
    alternates: languageAlternates("/hospitals", lang.code),
    description: catalog.hospitals.meta.description,
  };
}

export default async function Page({ searchParams }: Props) {
  const all = await getText();
  const { catalog, plainSpeciality } = all;
  const text = catalog.hospitals;
  const lang = await getLang();
  const path = localPath(lang.code, "/hospitals");
  const query = await searchParams;
  const city = first(query.city);
  const speciality = first(query.speciality);

  const [everyone, cities, specialities, doctors, treatments] = await Promise.all([
    getHospitals(),
    getHospitalCities(),
    getSpecialities(),
    getDoctors(),
    getTreatments(),
  ]);
  const covered = new Set(everyone.flatMap((h) => h.specialities));
  const offered = specialities.filter((s) => covered.has(s.slug));

  return (
    <PageShell current="/hospitals">
      <PageHead
        heading={text.heading}
        intro={text.intro}
        stats={[
          { value: covered.size, label: text.stats.specialities },
          { value: doctors.length, label: text.stats.doctors },
          { value: treatments.length, label: text.stats.treatments },
        ]}
        picture={everyone[0]?.gallery.find((p) => !p.pending && p.src) ?? everyone[0]?.picture}
      />

      <ListBrowser
        items={everyone.map((h) => ({
          slug: h.slug,
          place: h.city,
          specialities: h.specialities,
          search: [
            h.name,
            h.city,
            h.address,
            ...h.specialities.flatMap((s) => [nameOf(specialities, s), plainSpeciality[s]]),
            ...h.treatments.map((t) => nameOf(treatments, t)),
          ]
            .join(" ")
            .toLowerCase(),
        }))}
        cards={Object.fromEntries(
          everyone.map((h) => [
            h.slug,
            <HospitalCard
              key={h.slug}
              hospital={h}
              specialities={h.specialities.map((s) => nameOf(specialities, s)).join(", ")}
              heading="h2"
              sizes="(min-width: 1280px) 30vw, (min-width: 640px) 50vw, 100vw"
            />,
          ]),
        )}
        specialities={offered}
        places={cities.map((c) => ({ value: c, label: c }))}
        plainSpeciality={plainSpeciality}
        initial={{ speciality: offered.some((s) => s.slug === speciality) ? speciality : "", place: cities.includes(city) ? city : "" }}
        placeParam="city"
        path={path}
        more={showUpcoming ? text.browse.more : null}
        text={{
          ...catalog.filters,
          placeholder: text.searchPlaceholder,
          place: text.filters.city,
        }}
        grid="sm:grid-cols-2 xl:grid-cols-3"
      />

      <Container className="pb-4">
        <Note>{text.note}</Note>
      </Container>

      <EnquiryBlock content={{ enquiry: catalog.enquiry }} source="/hospitals" />
    </PageShell>
  );
}
