import { WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr/WhatsappLogo";
import { FacebookLogoIcon } from "@phosphor-icons/react/dist/ssr/FacebookLogo";
import { InstagramLogoIcon } from "@phosphor-icons/react/dist/ssr/InstagramLogo";
import { YoutubeLogoIcon } from "@phosphor-icons/react/dist/ssr/YoutubeLogo";
import { contactLinks } from "@/lib/contact";
import { getText } from "@/lib/i18n/text";

/** Each network in its own brand colours. */
const networks = {
  instagram: {
    Icon: InstagramLogoIcon,
    tone: "bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fd5949_45%,#d6249f_60%,#285AEB_90%)]",
  },
  facebook: { Icon: FacebookLogoIcon, tone: "bg-[#1877F2]" },
  youtube: { Icon: YoutubeLogoIcon, tone: "bg-[#FF0000]" },
} as const;

/**
 * Fixed bar on phones, and a round WhatsApp button in the corner on
 * computers, where the bar is hidden. The social profiles float in a small
 * column above: over the bar on phones, over WhatsApp on computers.
 */
export async function MobileBar() {
  const { site } = await getText();
  const { cta, mobileBar } = site;
  const whatsappHref = contactLinks(site.contact).whatsapp;
  const social = site.contact.social;

  return (
    <>
      <div data-intro-fade className="fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-bg/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden">
        <div className="flex gap-2 p-3">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener"
            className="flex min-h-13 flex-1 items-center justify-center gap-2 rounded-md border border-line bg-surface text-base font-medium text-[#137D4D]"
          >
            <WhatsappLogoIcon size={20} aria-hidden />
            {cta.whatsapp}
          </a>
          <a
            href="#plan"
            className="flex min-h-13 flex-1 items-center justify-center rounded-md bg-cta text-base font-medium text-cta-ink"
          >
            {mobileBar.plan}
          </a>
        </div>
      </div>

      {social.length ? (
        <ul
          data-intro-fade
          className="fixed end-3 bottom-[calc(5.75rem+env(safe-area-inset-bottom))] z-40 flex flex-col gap-2 lg:end-6.5 lg:bottom-[5.25rem]"
        >
          {social.map(({ network, label, href }) => {
            const { Icon, tone } = networks[network];
            return (
              <li key={network}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener"
                  aria-label={label}
                  title={label}
                  className={`flex size-10 items-center justify-center rounded-full text-white shadow-lift ring-2 ring-white/80 transition-transform duration-200 hover:scale-105 active:scale-95 ${tone}`}
                >
                  <Icon size={22} weight="fill" aria-hidden />
                </a>
              </li>
            );
          })}
        </ul>
      ) : null}

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener"
        aria-label={site.whatsappFloat}
        data-intro-fade
        className="group fixed end-6 bottom-6 z-40 hidden items-center gap-3 lg:flex"
      >
        <span className="pointer-events-none translate-x-2 rounded-full bg-surface px-4 py-2 text-sm font-medium text-ink opacity-0 shadow-lift ring-1 ring-hairline transition-[opacity,translate] duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 rtl:-translate-x-2">
          {site.whatsappFloat}
        </span>
        <span className="flex size-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift ring-2 ring-white/80 transition-transform duration-200 group-hover:scale-105 group-active:scale-95">
          <WhatsappLogoIcon size={28} weight="fill" aria-hidden />
        </span>
      </a>
    </>
  );
}
