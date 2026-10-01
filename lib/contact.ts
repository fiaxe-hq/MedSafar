import { site } from "@/content/site";

const { whatsapp, phone, email } = site.contact;

/** Opens a WhatsApp chat with Medsafar, with a short message already typed. */
export const whatsappHref = `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(whatsapp.message)}`;

export const phoneHref = `tel:${phone.number}`;

export const emailHref = `mailto:${email}`;
