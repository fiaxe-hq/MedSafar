import { FacebookLogoIcon } from "@phosphor-icons/react/dist/ssr/FacebookLogo";
import { InstagramLogoIcon } from "@phosphor-icons/react/dist/ssr/InstagramLogo";
import { YoutubeLogoIcon } from "@phosphor-icons/react/dist/ssr/YoutubeLogo";
import { site } from "@/content/site";

const icons = {
  instagram: InstagramLogoIcon,
  facebook: FacebookLogoIcon,
  youtube: YoutubeLogoIcon,
} as const;

/** Round icon links to Medsafar's social profiles. */
export function SocialLinks({ className = "", small = false }: { className?: string; small?: boolean }) {
  return (
    <ul className={`flex flex-wrap ${small ? "gap-1" : "gap-3"} ${className}`}>
      {site.contact.social.map(({ network, label, href }) => {
        const Icon = icons[network];
        return (
          <li key={network}>
            <a
              href={href}
              target="_blank"
              rel="noopener"
              aria-label={label}
              title={label}
              className={`grid place-items-center rounded-full transition-[color,background-color,border-color,translate] duration-300 ease-(--ease-soft) hover:-translate-y-0.5 hover:border-accent hover:bg-accent-soft hover:text-accent ${
                small ? "size-8 text-ink-3" : "size-11 border border-line bg-surface text-ink-2"
              }`}
            >
              <Icon size={small ? 16 : 20} aria-hidden />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
