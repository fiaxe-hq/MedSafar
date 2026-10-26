import { notFound } from "next/navigation";

/** Any address no page claims: the language's own 404 page, with header and footer. */
export default function Missing() {
  notFound();
}
