import type {
  Doctor,
  Hospital,
  Post,
  PostCategory,
  Speciality,
  Treatment,
} from "@/content/types";
import { doctors } from "@/data/doctors";
import { hospitals } from "@/data/hospitals";
import { postCategories, posts } from "@/data/posts";
import { specialities } from "@/data/specialities";
import { treatments } from "@/data/treatments";

/**
 * The only place the site reads hospitals, doctors and treatments from.
 *
 * Today the records come from the placeholder files in data/. When the admin
 * panel and its database arrive, they replace this file — nothing else has to
 * change, because pages only call the functions below. They are async for
 * that reason.
 */

export type HospitalFilter = { city?: string; speciality?: string };
export type DoctorFilter = { speciality?: string; hospital?: string };
export type PostFilter = { category?: string };

/** Keeps the order of `slugs`, and drops any slug with no record. */
function pick<T extends { slug: string }>(records: T[], slugs: string[]): T[] {
  return slugs.flatMap((slug) => records.find((r) => r.slug === slug) ?? []);
}

// Specialities

export async function getSpecialities(): Promise<Speciality[]> {
  return specialities;
}

export async function getSpeciality(slug: string): Promise<Speciality | null> {
  return specialities.find((s) => s.slug === slug) ?? null;
}

// Hospitals

export async function getHospitals(filter: HospitalFilter = {}): Promise<Hospital[]> {
  return hospitals.filter(
    (h) =>
      (!filter.city || h.city === filter.city) &&
      (!filter.speciality || h.specialities.includes(filter.speciality)),
  );
}

export async function getHospital(slug: string): Promise<Hospital | null> {
  return hospitals.find((h) => h.slug === slug) ?? null;
}

export async function getHospitalsBySlugs(slugs: string[]): Promise<Hospital[]> {
  return pick(hospitals, slugs);
}

/** Cities that have at least one hospital, for the list filter. */
export async function getHospitalCities(): Promise<string[]> {
  return [...new Set(hospitals.map((h) => h.city))].sort();
}

export async function getHospitalsByTreatment(treatment: string): Promise<Hospital[]> {
  return hospitals.filter((h) => h.treatments.includes(treatment));
}

// Doctors

export async function getDoctors(filter: DoctorFilter = {}): Promise<Doctor[]> {
  return doctors.filter(
    (d) =>
      (!filter.speciality || d.speciality === filter.speciality) &&
      (!filter.hospital || d.hospital === filter.hospital),
  );
}

export async function getDoctor(slug: string): Promise<Doctor | null> {
  return doctors.find((d) => d.slug === slug) ?? null;
}

export async function getDoctorsBySlugs(slugs: string[]): Promise<Doctor[]> {
  return pick(doctors, slugs);
}

export async function getDoctorsByTreatment(treatment: string): Promise<Doctor[]> {
  return doctors.filter((d) => d.treatments.includes(treatment));
}

// Treatments

export async function getTreatments(): Promise<Treatment[]> {
  return treatments;
}

export async function getTreatment(slug: string): Promise<Treatment | null> {
  return treatments.find((t) => t.slug === slug) ?? null;
}

export async function getTreatmentsBySlugs(slugs: string[]): Promise<Treatment[]> {
  return pick(treatments, slugs);
}

// Blog

export async function getPostCategories(): Promise<PostCategory[]> {
  return postCategories;
}

export async function getPosts(filter: PostFilter = {}): Promise<Post[]> {
  return posts.filter((p) => !filter.category || p.category === filter.category);
}

export async function getPost(slug: string): Promise<Post | null> {
  return posts.find((p) => p.slug === slug) ?? null;
}

/** Other posts to read next: the same category first, then the rest. */
export async function getRelatedPosts(slug: string, limit = 3): Promise<Post[]> {
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
