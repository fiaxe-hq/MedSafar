import type { CountryContent, Story } from "@/content/types";
import { Figure, Mark } from "@/components/ui/Pending";
import { Note, Section, SectionHead } from "@/components/ui/Section";

function Attribution({ story }: { story: Story }) {
  return (
    <div className="mt-8 flex items-center gap-4">
      <Figure
        picture={story.picture}
        ratio="aspect-square"
        rounded="rounded-full"
        className="size-12 shrink-0"
        sizes="48px"
        compact
      />
      <div className="text-sm">
        <p className="font-medium text-ink">{story.name}</p>
        <p className="text-ink-3">
          {story.city}, {story.treatment}
        </p>
      </div>
    </div>
  );
}

/** One quote carries the section; two sit beneath it. Three cells, three
 *  stories, nothing left over. */
export function Stories({ content }: { content: CountryContent }) {
  const { stories } = content;
  // Stand-in stories are left off the page until a real, consented one exists.
  if (stories.items.every((s) => s.pending)) return null;
  const [lead, ...rest] = stories.items;

  return (
    <Section id="stories" tone="quiet">
      <SectionHead heading={stories.heading} intro={stories.intro} />

      <div className="mt-12 grid gap-4 lg:mt-14 lg:grid-cols-2">
        <figure className="reveal lift rounded-lg border border-hairline bg-surface p-8 sm:p-12 lg:col-span-2">
          <blockquote className="max-w-[34ch] font-display text-2xl leading-[1.3] font-semibold tracking-[-0.02em] sm:text-3xl">
            {lead.quote}
          </blockquote>
          <figcaption>
            <Attribution story={lead} />
            {lead.pending ? <Mark className="mt-6" /> : null}
          </figcaption>
        </figure>

        {rest.map((story, i) => (
          <figure
            key={i}
            className="reveal lift rounded-lg border border-hairline bg-surface p-8"
          >
            <blockquote className="max-w-[44ch] text-lg text-ink">{story.quote}</blockquote>
            <figcaption>
              <Attribution story={story} />
              {story.pending ? <Mark className="mt-6" /> : null}
            </figcaption>
          </figure>
        ))}
      </div>

      <Note>{stories.note}</Note>
    </Section>
  );
}
