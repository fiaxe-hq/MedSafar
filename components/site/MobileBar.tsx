import { WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr/WhatsappLogo";
import { site } from "@/content/site";
import { whatsappHref } from "@/lib/contact";

/**
 * Fixed bar on phones, and a round WhatsApp button in the corner on
 * computers, where the bar is hidden.
 */
export function MobileBar() {
  const { cta, mobileBar } = site;

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-bg/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden">
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

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener"
        aria-label={site.whatsappFloat}
        className="group fixed end-6 bottom-6 z-40 hidden items-center gap-3 lg:flex"
      >
        <span className="pointer-events-none translate-x-2 rounded-full bg-surface px-4 py-2 text-sm font-medium text-ink opacity-0 shadow-lift ring-1 ring-hairline transition-[opacity,translate] duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 rtl:-translate-x-2">
          {site.whatsappFloat}
        </span>
        <span className="flex size-11 items-center justify-center rounded-full bg-surface text-accent shadow-lift ring-1 ring-hairline transition-transform duration-200 group-hover:scale-105 group-active:scale-95">
          <WhatsappLogoIcon size={32} aria-hidden />
        </span>
      </a>
    </>
  );
}
