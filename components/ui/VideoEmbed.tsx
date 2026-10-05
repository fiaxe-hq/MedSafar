import type { Video } from "@/content/types";

/**
 * A video in a 16:9 frame. YouTube videos load from youtube-nocookie.com, so
 * no YouTube cookie is set until the visitor presses play. Local files
 * download nothing but the poster until then.
 */
export function VideoEmbed({ video }: { video: Video }) {
  return (
    <figure className="reveal min-w-0">
      <div className="relative aspect-video overflow-hidden rounded-lg border border-hairline bg-surface-2">
        {"youtube" in video ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtube}?rel=0`}
            title={video.title}
            loading="lazy"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 size-full"
          />
        ) : (
          <video
            src={video.src}
            poster={video.poster}
            controls
            preload="none"
            playsInline
            className="absolute inset-0 size-full object-cover"
          />
        )}
      </div>
      <figcaption className="mt-3 text-base text-ink-2">{video.title}</figcaption>
    </figure>
  );
}
