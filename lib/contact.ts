import type { Text } from "@/lib/i18n/source";

type Contact = Text["site"]["contact"];

/**
 * Links for the contact details, built from the page's text so a change made
 * in /admin reaches every button. The WhatsApp link opens a chat with a short
 * message already typed.
 */
export function contactLinks({ whatsapp, phone, email }: Contact) {
  return {
    whatsapp: `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(whatsapp.message)}`,
    phone: `tel:${phone.number}`,
    email: `mailto:${email}`,
  };
}
