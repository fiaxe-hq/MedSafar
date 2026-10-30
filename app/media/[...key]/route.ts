import { getPhoto } from "@/lib/media";

/** A photo uploaded in /admin. Each upload gets a new name, so it can be cached for good. */
export async function GET(_request: Request, { params }: RouteContext<"/media/[...key]">) {
  const { key } = await params;
  const photo = await getPhoto(key.join("/"));
  if (!photo) return new Response("Not found", { status: 404 });
  return new Response(photo.body, {
    headers: {
      "Content-Type": photo.httpMetadata?.contentType ?? "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
