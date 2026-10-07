import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { catalog } from "@/content/catalog";
import { site } from "@/content/site";
import {
  getHospitalsBySlugs,
  getPost,
  getPostCategories,
  getPosts,
  getRelatedPosts,
  getSpecialities,
  getTreatmentsBySlugs,
  nameOf,
} from "@/lib/catalog";
import { PageShell } from "@/components/site/PageShell";
import { PageHead } from "@/components/catalog/PageHead";
import { HospitalCard } from "@/components/catalog/HospitalCard";
import { PostCard, PostDate } from "@/components/catalog/PostCard";
import { TreatmentCard } from "@/components/catalog/TreatmentCard";
import { EnquiryBlock } from "@/components/sections/EnquiryBlock";
import { Figure } from "@/components/ui/Pending";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getPosts()).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title}. ${site.brand.name} ${site.brand.country}.`,
    description: post.summary,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const text = catalog.blog;
  const [categories, related, treatments, hospitals, specialities] = await Promise.all([
    getPostCategories(),
    getRelatedPosts(post.slug),
    getTreatmentsBySlugs(post.treatments),
    getHospitalsBySlugs(post.hospitals),
    getSpecialities(),
  ]);

  return (
    <PageShell current="/blog">
      <PageHead
        back={{ href: "/blog", label: text.back }}
        heading={post.title}
        intro={post.summary}
        pending={post.pending}
        tight={!!post.picture}
        center
      />

      {post.picture ? (
        <div className="bg-[linear-gradient(to_bottom,var(--color-bg)_50%,var(--color-surface-2)_50%)]">
          <Container>
            <div className="lg:w-2/3 lg:pe-6">
              <p className="mb-6 text-sm text-ink-3">
                <PostDate post={post} /> · {post.author}
              </p>
              <Figure
                picture={post.picture}
                ratio="aspect-[27/10]"
                rounded="rounded-2xl"
                className="relative shadow-[0_24px_60px_-20px_rgb(15_40_35/0.35),0_8px_20px_-8px_rgb(15_40_35/0.18)] ring-1 ring-black/5"
                priority
                sizes="(min-width: 1024px) 50rem, 100vw"
              />
            </div>
          </Container>
        </div>
      ) : null}

      <Section tone="quiet" className={post.picture ? "!pt-12 sm:!pt-16" : ""}>
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-12">
          <article className="lg:col-span-2">
            {post.picture ? null : (
              <p className="text-sm text-ink-3">
                <PostDate post={post} /> · {post.author}
              </p>
            )}
            <div className={`space-y-6 ${post.picture ? "" : "mt-8"}`}>
              {post.body.map((paragraph, i) => (
                <p key={i} className="reveal max-w-[68ch] text-lg text-ink-2">
                  {paragraph}
                </p>
              ))}
            </div>
            {post.sources?.length ? (
              <div className="reveal mt-12 border-t border-hairline pt-6">
                <h2 className="text-sm font-medium text-ink">{text.detail.sources}</h2>
                <ul className="mt-3 space-y-2">
                  {post.sources.map((source) => (
                    <li key={source.href}>
                      <a
                        href={source.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base text-accent underline-offset-4 transition-colors hover:text-accent-hover hover:underline"
                      >
                        {source.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </article>

          <aside className="space-y-12">
            {treatments.length ? (
              <div>
                <h2 className="text-xl font-semibold text-ink">{text.detail.treatments}</h2>
                <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                  {treatments.map((treatment) => (
                    <TreatmentCard
                      key={treatment.slug}
                      treatment={treatment}
                      speciality={nameOf(specialities, treatment.speciality)}
                    />
                  ))}
                </div>
              </div>
            ) : null}

            {hospitals.length ? (
              <div>
                <h2 className="text-xl font-semibold text-ink">{text.detail.hospitals}</h2>
                <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                  {hospitals.map((hospital) => (
                    <HospitalCard
                      key={hospital.slug}
                      hospital={hospital}
                      specialities={hospital.specialities
                        .map((s) => nameOf(specialities, s))
                        .join(", ")}
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    />
                  ))}
                </div>
              </div>
            ) : null}

            {related.length ? (
              <div>
                <h2 className="text-xl font-semibold text-ink">{text.detail.related}</h2>
                <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                  {related.map((other) => (
                    <PostCard
                      key={other.slug}
                      post={other}
                      category={nameOf(categories, other.category)}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </aside>
        </div>
      </Section>

      <EnquiryBlock content={{ enquiry: catalog.enquiry }} source={`/blog/${post.slug}`} />
    </PageShell>
  );
}
