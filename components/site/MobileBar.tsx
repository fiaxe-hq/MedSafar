import { WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr/WhatsappLogo";
import { site } from "@/content/site";
import { whatsappHref } from "@/lib/contact";

/** Fixed bar on phones only. */
export function MobileBar() {
  const { cta, mobileBar } = site;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-bg/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden">
      <div className="flex gap-2 p-3">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener"
          className="flex min-h-13 flex-1 items-center justify-center gap-2 rounded-md border border-line bg-surface text-base font-medium text-ink"
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
  );
}
