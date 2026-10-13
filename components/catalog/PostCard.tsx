import Link from "next/link";
import type { Post } from "@/content/types";
import { catalog } from "@/content/catalog";
import { formatDate } from "@/lib/format";
import { CardFoot } from "./CardFoot";

/** The date line of a post. Says so plainly while the post has no date. */
export function PostDate({ post }: { post: Post }) {
  return post.date ? (
    <time dateTime={post.date}>{formatDate(post.date)}</time>
  ) : (
    <span>{catalog.blog.undated}</span>
  );
}

/** A blog post, linked to its own page. */
export function PostCard({
  post,
  category,
  heading: Heading = "h3",
}: {
  post: Post;
  /** Category name. */
  category: string;
  heading?: "h2" | "h3";
}) {
  return (
    <article className="group reveal h-full rounded-lg border border-hairline bg-surface lift">
      <Link
        href={`/blog/${post.slug}`}
        className="flex h-full flex-col p-6 focus-visible:-outline-offset-2 sm:p-7"
      >
        <p className="text-sm text-ink-3">
          <span className="font-medium text-accent">{category}</span> · <PostDate post={post} />
        </p>
        <Heading className="mt-3 text-xl font-semibold tracking-[-0.02em] transition-colors group-hover:text-accent">
          {post.title}
        </Heading>
        <p className="mt-3 text-base text-ink-2">{post.summary}</p>
        <CardFoot pending={post.pending} />
      </Link>
    </article>
  );
}
