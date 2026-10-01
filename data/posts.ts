import type { Post, PostCategory } from "@/content/types";

/**
 * Placeholder records. The admin panel manages these later.
 * Read them through lib/catalog.ts, never directly.
 *
 * Nothing here is a real article. Titles, authors and text are stand-ins, and
 * the date stays empty until a post is actually published.
 */

export const postCategories: PostCategory[] = [
  { slug: "guides", name: "Guides" },
  { slug: "treatments", name: "Treatments" },
  { slug: "travel", name: "Travel" },
];

const author = "Author to be confirmed";
const summary = "Summary to be supplied by Medsafar.";
const body = [
  "Article text to be supplied by Medsafar.",
  "Anything medical in an article is checked by a doctor before it is published.",
];

export const posts: Post[] = [
  {
    slug: "placeholder-article-a",
    title: "Placeholder article A",
    date: null,
    category: "guides",
    author,
    summary,
    body,
    treatments: [],
    hospitals: ["partner-hospital-a"],
    pending: true,
  },
  {
    slug: "placeholder-article-b",
    title: "Placeholder article B",
    date: null,
    category: "treatments",
    author,
    summary,
    body,
    treatments: ["knee-replacement", "hip-replacement"],
    hospitals: [],
    pending: true,
  },
  {
    slug: "placeholder-article-c",
    title: "Placeholder article C",
    date: null,
    category: "treatments",
    author,
    summary,
    body,
    treatments: ["heart-bypass-surgery"],
    hospitals: ["partner-hospital-b"],
    pending: true,
  },
  {
    slug: "placeholder-article-d",
    title: "Placeholder article D",
    date: null,
    category: "travel",
    author,
    summary,
    body,
    treatments: [],
    hospitals: [],
    pending: true,
  },
];
