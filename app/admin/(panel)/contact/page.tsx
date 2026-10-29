import { requireAdmin } from "@/lib/admin/auth";
import { CONTACT, applyEntries, getEntries } from "@/lib/content";
import { sentencesFor, targetLanguages } from "@/lib/admin/translate";
import { getRecordTranslations } from "@/lib/translations";
import { TranslationPanel } from "@/components/admin/TranslationPanel";
import { source } from "@/lib/i18n/source";
import { AdminHeading, AdminNotice, adminButton, adminCard, adminInput, adminLabel } from "@/components/admin/ui";
import { saveContactAction } from "./actions";

const errors: Record<string, string> = {
  whatsapp: "That WhatsApp number does not look right. Type it with the country code, for example +91 98203 22088.",
  phone: "That phone number does not look right. Type it with the country code, for example +91 98203 22088.",
  email: "Please enter a valid email address.",
  message: "The WhatsApp greeting needs 2 to 300 characters.",
  instagram: "The Instagram link must be a full https://www.instagram.com/... address.",
  facebook: "The Facebook link must be a full https://www.facebook.com/... address.",
  youtube: "The YouTube link must be a full https://www.youtube.com/... address.",
};

function Row({
  id,
  label,
  help,
  defaultValue,
  type = "text",
}: {
  id: string;
  label: string;
  help: string;
  defaultValue: string;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className={adminLabel}>
        {label}
      </label>
      <p className="mt-0.5 text-sm text-ink-3">{help}</p>
      <input id={id} name={id} type={type} defaultValue={defaultValue} className={`${adminInput} mt-2`} />
    </div>
  );
}

/** WhatsApp, phone, email and social links: shown in the header, footer, contact page and buttons across the site. */
export default async function ContactPage({ searchParams }: PageProps<"/admin/contact">) {
  await requireAdmin();
  const params = await searchParams;
  const error = typeof params.error === "string" ? errors[params.error] : undefined;
  const contact = applyEntries(source, source, await getEntries()).site.contact;
  const greeting = await sentencesFor(
    "settings",
    CONTACT,
    contact as unknown as Record<string, unknown>,
    source.site.contact as unknown as Record<string, unknown>,
    await getRecordTranslations("settings", CONTACT),
  );
  const social = (network: string) => contact.social.find((s) => s.network === network)?.href ?? "";

  return (
    <>
      <AdminHeading
        eyebrow="Whole site"
        title="Contact details"
        intro="Shown in the header, the footer, the contact page and every WhatsApp button. A change shows everywhere within a minute."
      />
      {error ? <AdminNotice tone="error">{error}</AdminNotice> : null}
      {params.done === "saved" ? <AdminNotice>Saved. The site shows the new details within a minute.</AdminNotice> : null}

      <form action={saveContactAction} className="mt-8 max-w-3xl space-y-6">
        <fieldset className={`${adminCard} min-w-0 space-y-6 p-5 sm:p-6`}>
          <legend className="sr-only">How visitors reach Medsafar</legend>
          <h2 aria-hidden className="font-display text-xl font-semibold">How visitors reach Medsafar</h2>
          <Row
            id="whatsapp"
            label="WhatsApp number"
            help="With the country code, for example +91 98203 22088."
            defaultValue={contact.whatsapp.display}
            type="tel"
          />
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label htmlFor="message" className={adminLabel}>
                WhatsApp greeting
              </label>
              <TranslationPanel
                kind="settings"
                slug={CONTACT}
                label="WhatsApp greeting"
                sentences={greeting}
                languages={targetLanguages}
              />
            </div>
            <p className="mt-0.5 text-sm text-ink-3">Already typed for the visitor when they open the chat. They can change it before sending.</p>
            <textarea
              id="message"
              name="message"
              rows={2}
              defaultValue={contact.whatsapp.message}
              className={`${adminInput} mt-2 min-h-0 py-2.5`}
            />
          </div>
          <Row id="phone" label="Phone number" help="For the call buttons. With the country code." defaultValue={contact.phone.display} type="tel" />
          <Row id="email" label="Email" help="Where visitors write to." defaultValue={contact.email} type="email" />
        </fieldset>

        <fieldset className={`${adminCard} min-w-0 space-y-6 p-5 sm:p-6`}>
          <legend className="sr-only">Social media</legend>
          <h2 aria-hidden className="font-display text-xl font-semibold">Social media</h2>
          <p className="-mt-3 text-sm text-ink-3">Paste the full address of each profile. Leave one empty to hide its icon.</p>
          <Row id="instagram" label="Instagram" help="For example https://www.instagram.com/medsafar" defaultValue={social("instagram")} type="url" />
          <Row id="facebook" label="Facebook" help="For example https://www.facebook.com/medsafar" defaultValue={social("facebook")} type="url" />
          <Row id="youtube" label="YouTube" help="For example https://www.youtube.com/@medsafar" defaultValue={social("youtube")} type="url" />
        </fieldset>

        <button type="submit" className={`${adminButton.primary} min-h-12 px-6 text-base`}>
          Save contact details
        </button>
      </form>
    </>
  );
}
