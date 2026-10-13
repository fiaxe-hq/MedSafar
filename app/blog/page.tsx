import type { Metadata } from "next";
import { catalog } from "@/content/catalog";
import { getPostCategories, getPosts, nameOf } from "@/lib/catalog";
import { first } from "@/lib/query";
import { PageShell } from "@/components/site/PageShell";
import { PageHead } from "@/components/catalog/PageHead";
import { Filters, NoResults, ResultCount } from "@/components/catalog/Filters";
import { PostCard } from "@/components/catalog/PostCard";
import { EnquiryBlock } from "@/components/sections/EnquiryBlock";
import { Container } from "@/components/ui/Container";
import { Note, Section } from "@/components/ui/Section";

/** Shared page: one copy for every country. */

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const metadata: Metadata = {
  title: catalog.blog.meta.title,
  description: catalog.blog.meta.description,
};

export default async function Page({ searchParams }: Props) {
  const text = catalog.blog;
  const category = first((await searchParams).category);

  const [posts, categories] = await Promise.all([
    getPosts({ category }),
    getPostCategories(),
  ]);

  return (
    <PageShell current="/blog">
      <PageHead
        heading={text.heading}
        intro={text.intro}
        tight
      />

      <div className="bg-[linear-gradient(to_bottom,var(--color-bg)_50%,var(--color-surface-2)_50%)]">
        <Container>
          <div className="relative rounded-2xl shadow-[0_24px_60px_-20px_rgb(15_40_35/0.25),0_8px_20px_-8px_rgb(15_40_35/0.12)]">
            <Filters
              action="/blog"
              fields={[
                {
                  name: "category",
                  label: text.filters.category,
                  value: category,
                  options: categories.map((c) => ({
                    value: c.slug,
                    label: c.name,
                  })),
                },
              ]}
            />
          </div>
        </Container>
      </div>

      <Section tone="quiet" className="!pt-8 sm:!pt-10">
        <ResultCount count={posts.length} />

        {posts.length ? (
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard
                key={post.slug}
                post={post}
                category={nameOf(categories, post.category)}
                heading="h2"
              />
            ))}
          </div>
        ) : (
          <NoResults action="/blog" />
        )}

        <Note>{text.note}</Note>
      </Section>

      <EnquiryBlock content={{ enquiry: catalog.enquiry }} source="/blog" />
    </PageShell>
  );
}
