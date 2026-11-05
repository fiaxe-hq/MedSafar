import type {
  Doctor,
  Hospital,
  Post,
  PostCategory,
  Questionnaire,
  Speciality,
  Treatment,
} from "@/content/types";
import { getText } from "@/lib/i18n/text";

/**
 * The only place the site reads hospitals, doctors and treatments from.
 *
 * The records come from the files in data/, in the page's language, with the
 * changes made in /admin laid over them (lib/content.ts, through getText).
 */

export type HospitalFilter = { city?: string; speciality?: string };
export type DoctorFilter = { speciality?: string; hospital?: string };
export type PostFilter = { category?: string };

/** Hospitals without a priority set in /admin sit between the big names and the small clinics. */
export const defaultHospitalPriority = 5;

/** Best-known hospitals first (lowest priority number); ties keep the file's order. */
function byPriority(list: Hospital[]): Hospital[] {
  const rank = (h: Hospital) => h.priority ?? defaultHospitalPriority;
  return list
    .map((h, i) => ({ h, i }))
    .sort((a, b) => rank(a.h) - rank(b.h) || a.i - b.i)
    .map(({ h }) => h);
}

/** A doctor's name without the "Dr" in front, for sorting. */
const sortName = (name: string) => name.replace(/^\s*(dr\.?|doctor)\s+/i, "").trim();

/** Doctors A to Z by name, never by when they were added. */
function byName(list: Doctor[]): Doctor[] {
  return [...list].sort((a, b) =>
    sortName(a.name).localeCompare(sortName(b.name), "en", { sensitivity: "base" }),
  );
}

/** Keeps the order of `slugs`, and drops any slug with no record. */
function pick<T extends { slug: string }>(records: T[], slugs: string[]): T[] {
  return slugs.flatMap((slug) => records.find((r) => r.slug === slug) ?? []);
}

// Specialities

export async function getSpecialities(): Promise<Speciality[]> {
  const { specialities } = await getText();
  return specialities;
}

export async function getSpeciality(slug: string): Promise<Speciality | null> {
  const { specialities } = await getText();
  return specialities.find((s) => s.slug === slug) ?? null;
}

// Hospitals

export async function getHospitals(filter: HospitalFilter = {}): Promise<Hospital[]> {
  const { hospitals } = await getText();
  return byPriority(
    hospitals.filter(
      (h) =>
        (!filter.city || h.city === filter.city) &&
        (!filter.speciality || h.specialities.includes(filter.speciality)),
    ),
  );
}

export async function getHospital(slug: string): Promise<Hospital | null> {
  const { hospitals } = await getText();
  return hospitals.find((h) => h.slug === slug) ?? null;
}

export async function getHospitalsBySlugs(slugs: string[]): Promise<Hospital[]> {
  const { hospitals } = await getText();
  return byPriority(pick(hospitals, slugs));
}

/** Cities that have at least one hospital, for the list filter. */
export async function getHospitalCities(): Promise<string[]> {
  const { hospitals } = await getText();
  return [...new Set(hospitals.map((h) => h.city))].sort();
}

export async function getHospitalsByTreatment(treatment: string): Promise<Hospital[]> {
  const { hospitals } = await getText();
  return byPriority(hospitals.filter((h) => h.treatments.includes(treatment)));
}

// Doctors

export async function getDoctors(filter: DoctorFilter = {}): Promise<Doctor[]> {
  const { doctors } = await getText();
  return byName(
    doctors.filter(
      (d) =>
        (!filter.speciality || d.speciality === filter.speciality) &&
        (!filter.hospital || d.hospital === filter.hospital),
    ),
  );
}

export async function getDoctor(slug: string): Promise<Doctor | null> {
  const { doctors } = await getText();
  return doctors.find((d) => d.slug === slug) ?? null;
}

export async function getDoctorsBySlugs(slugs: string[]): Promise<Doctor[]> {
  const { doctors } = await getText();
  return pick(doctors, slugs);
}

export async function getDoctorsByTreatment(treatment: string): Promise<Doctor[]> {
  const { doctors } = await getText();
  return byName(doctors.filter((d) => d.treatments.includes(treatment)));
}

/**
 * Doctors to suggest for a treatment: those who perform it, and when there
 * are none, specialists in its field at a hospital that offers it (or in its
 * field anywhere, when no partner hospital lists it). A to Z.
 */
export async function getRecommendedDoctors(
  treatment: Treatment,
): Promise<{ doctors: Doctor[]; exact: boolean }> {
  const { doctors, hospitals } = await getText();
  const exact = doctors.filter((d) => d.treatments.includes(treatment.slug));
  if (exact.length) return { doctors: byName(exact), exact: true };
  const field = doctors.filter((d) => d.speciality === treatment.speciality);
  const offering = new Set(
    hospitals.filter((h) => h.treatments.includes(treatment.slug)).map((h) => h.slug),
  );
  const near = field.filter((d) => offering.has(d.hospital));
  return { doctors: byName(near.length ? near : field), exact: false };
}

// Treatments

export async function getTreatments(): Promise<Treatment[]> {
  const { treatments } = await getText();
  return treatments;
}

export async function getTreatment(slug: string): Promise<Treatment | null> {
  const { treatments } = await getText();
  return treatments.find((t) => t.slug === slug) ?? null;
}

export async function getTreatmentsBySlugs(slugs: string[]): Promise<Treatment[]> {
  const { treatments } = await getText();
  return pick(treatments, slugs);
}

// Blog

export async function getPostCategories(): Promise<PostCategory[]> {
  const { postCategories } = await getText();
  return postCategories;
}

export async function getPosts(filter: PostFilter = {}): Promise<Post[]> {
  const { posts } = await getText();
  return posts.filter((p) => !filter.category || p.category === filter.category);
}

export async function getPost(slug: string): Promise<Post | null> {
  const { posts } = await getText();
  return posts.find((p) => p.slug === slug) ?? null;
}

/** Other posts to read next: the same category first, then the rest. */
export async function getRelatedPosts(slug: string, limit = 3): Promise<Post[]> {
  const { posts } = await getText();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return [];
  const others = posts.filter((p) => p.slug !== slug);
  return [
    ...others.filter((p) => p.category === post.category),
    ...others.filter((p) => p.category !== post.category),
  ].slice(0, limit);
}

// Helpers

/** The display name for a slug, or the slug itself if the record is missing. */
export function nameOf(records: { slug: string; name: string }[], slug: string): string {
  return records.find((r) => r.slug === slug)?.name ?? slug;
}

// Questionnaires

export async function getQuestionnaire(slug: string): Promise<Questionnaire | null> {
  const { questionnaires } = await getText();
  return questionnaires.find((q) => q.slug === slug) ?? null;
}

/** The questionnaire for a speciality, if it has one. */
export async function getQuestionnaireFor(speciality: string): Promise<Questionnaire | null> {
  const { questionnaires } = await getText();
  return questionnaires.find((q) => q.speciality === speciality) ?? null;
}
