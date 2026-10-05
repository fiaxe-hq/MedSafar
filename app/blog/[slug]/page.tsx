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
import { Section, SectionHead } from "@/components/ui/Section";

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
        label={nameOf(categories, post.category)}
        heading={post.title}
        intro={post.summary}
        pending={post.pending}
      />

      <Section tone="quiet">
        <article className="max-w-3xl">
          <p className="text-sm text-ink-3">
            <PostDate post={post} /> · {post.author}
          </p>
          {post.picture ? (
            <Figure
              picture={post.picture}
              ratio="aspect-[27/10]"
              className="mt-8"
              priority
              sizes="(min-width: 768px) 48rem, 100vw"
            />
          ) : null}
          <div className="mt-8 space-y-6">
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
      </Section>

      {treatments.length || hospitals.length ? (
        <Section>
          {treatments.length ? (
            <>
              <SectionHead heading={text.detail.treatments} />
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {treatments.map((treatment) => (
                  <TreatmentCard
                    key={treatment.slug}
                    treatment={treatment}
                    speciality={nameOf(specialities, treatment.speciality)}
                  />
                ))}
              </div>
            </>
          ) : null}

          {hospitals.length ? (
            <>
              <SectionHead
                heading={text.detail.hospitals}
                className={treatments.length ? "mt-20 lg:mt-24" : ""}
              />
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {hospitals.map((hospital) => (
                  <HospitalCard
                    key={hospital.slug}
                    hospital={hospital}
                    specialities={hospital.specialities
                      .map((s) => nameOf(specialities, s))
                      .join(", ")}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                  />
                ))}
              </div>
            </>
          ) : null}
        </Section>
      ) : null}

      {related.length ? (
        <Section tone="quiet">
          <SectionHead heading={text.detail.related} />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((other) => (
              <PostCard
                key={other.slug}
                post={other}
                category={nameOf(categories, other.category)}
              />
            ))}
          </div>
        </Section>
      ) : null}

      <EnquiryBlock content={{ enquiry: catalog.enquiry }} source={`/blog/${post.slug}`} />
    </PageShell>
  );
}
