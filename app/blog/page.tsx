import type { Metadata } from "next";
import { catalog } from "@/content/catalog";
import { getPostCategories, getPosts, nameOf } from "@/lib/catalog";
import { first } from "@/lib/query";
import { PageShell } from "@/components/site/PageShell";
import { PageHead } from "@/components/catalog/PageHead";
import { Filters, NoResults, ResultCount } from "@/components/catalog/Filters";
import { PostCard } from "@/components/catalog/PostCard";
import { EnquiryBlock } from "@/components/sections/EnquiryBlock";
import { Note, Section } from "@/components/ui/Section";

/** Shared page: one copy for every country. */

type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> };

export const metadata: Metadata = {
  title: catalog.blog.meta.title,
  description: catalog.blog.meta.description,
};

export default async function Page({ searchParams }: Props) {
  const text = catalog.blog;
  const category = first((await searchParams).category);

  const [posts, categories] = await Promise.all([getPosts({ category }), getPostCategories()]);

  return (
    <PageShell current="/blog">
      <PageHead label={text.eyebrow} heading={text.heading} intro={text.intro} />

      <Section tone="quiet">
        <Filters
          action="/blog"
          fields={[
            {
              name: "category",
              label: text.filters.category,
              value: category,
              options: categories.map((c) => ({ value: c.slug, label: c.name })),
            },
          ]}
        />

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
