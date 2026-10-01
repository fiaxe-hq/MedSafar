import { WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr/WhatsappLogo";
import { ChatCircleTextIcon } from "@phosphor-icons/react/dist/ssr/ChatCircleText";
import { site } from "@/content/site";

/**
 * Fixed bar on phones only. While no WhatsApp number has been supplied the
 * WhatsApp button opens the enquiry form rather than a dead link.
 */
export function MobileBar() {
  const { whatsapp, cta, mobileBar } = site;
  const hasNumber = Boolean(whatsapp.number);
  const href = hasNumber ? `https://wa.me/${whatsapp.number}` : "#plan";

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-bg/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden">
      <div className="flex gap-2 p-3">
        <a
          href={href}
          title={hasNumber ? undefined : whatsapp.display}
          className="flex min-h-13 flex-1 items-center justify-center gap-2 rounded-md border border-line bg-surface text-base font-medium text-ink"
        >
          {hasNumber ? (
            <WhatsappLogoIcon size={20} aria-hidden />
          ) : (
            <ChatCircleTextIcon size={20} aria-hidden />
          )}
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
