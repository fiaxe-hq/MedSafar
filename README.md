# Medsafar India

Marketing site for Medsafar India, a division of Travgrub Private Limited — a
medical travel facilitator that arranges treatment in India for patients abroad.

Next.js (App Router), TypeScript, Tailwind. English only for now.

```bash
npm run dev
```

## What is built

- `/` — the home page, which is also the template for every country page.
- `/ng` — Nigeria.
- `/iq`, `/bd`, `/ke`, `/ge`, `/uz` — Iraq, Bangladesh, Kenya, Georgia and Uzbekistan.

Every page uses the same component, `components/CountryPage.tsx`, with the same
sections in the same order. Only the content file changes.

## Content

No copy and no image path lives in a component. Everything is in `content/`:

| File | Holds |
| --- | --- |
| `content/site.ts` | Header, footer, buttons and every label in the enquiry form — the text that is the same in every country. |
| `content/dial-codes.ts` | The country codes in the phone field. |
| `content/countries/global.ts` | The home page. |
| `content/countries/ng.ts` | Nigeria. The other country files follow the same pattern. |
| `content/types.ts` | The shape all of the above must follow. |

### Adding a country

1. Copy `content/countries/ng.ts` to `content/countries/<slug>.ts` and rewrite
   the words, photos, stories and travel information.
2. Register it in `content/countries/index.ts`.

The page then exists at `/<slug>`. Any slug that is not registered is a 404.

### Placeholders

Nothing invented is presented as real. Hospital names, patient stories, photos
and every number are stand-ins, marked on the page with a **Placeholder** badge
and flagged in the content files. Replace them only with things Medsafar can
prove.

No prices appear anywhere. Each patient gets an individual quote.

## Design

Tokens live in `app/globals.css` as semantic CSS variables (`--ink`,
`--surface`, `--accent`), mapped into Tailwind through `@theme inline`. The
theme is light only; no section inverts on its own.

Colour is built on the logo green, `#0E9475`, sampled from
`public/brand/medsafar-logo.png`:

| Token | Value | Use |
| --- | --- | --- |
| `--brand` | `#0E9475` | The exact logo green. Marks, rules and icons only (3.8:1 on white, enough for non-text, not for small text). |
| `--accent`, `--cta` | `#09745B` | Links, small accent text and buttons. A darker cut of the logo green so it passes WCAG AA: 5.7:1 on white, 4.8:1 on `--accent-soft`. |
| `--accent-hover`, `--cta-hover` | `#075C48` | Hover state. |
| `--accent-soft` | `#D8F0E7` | Tinted panels, numbered steps, photo placeholders. |
| `--accent-quiet` | `#EEF8F4` | Selected options, notices. |
| `--ink`, `--ink-2`, `--ink-3` | `#0D3B30`, `#3F544E`, `#55665F` | Text. Lowest pair is `--ink-3` on `--accent-soft` at 5.1:1. |
| `--surface-2` | `#F1F8F5` | Quiet sections, the footer. |
| `--hairline`, `--line` | `#D3E7DF`, `#97BFB0` | Dividers and control borders. |

Every text and background pair above passes WCAG AA for body text.

Travgrub's red (`#EC3237`) and grey (`#555557`) appear only in the Travgrub
logo in the footer, never as tokens.

Shape rule, applied everywhere: buttons and inputs are `rounded-md`, cards are
`rounded-lg`.

Motion is the native scroll-driven `animation-timeline: view()`, so reveals
cost no JavaScript and no download. The hidden start state sits inside an
`@supports` block, so a browser without scroll timelines simply shows the
content, and everything collapses under `prefers-reduced-motion`.

### Brand files

- `public/brand/medsafar-logo.png` — the header logo (420×177, transparent).
- `public/brand/medsafar-mark-square.png` — the square version. The favicon
  and app icons in `app/` are cropped from it to the heartbeat "M".
- `public/brand/travgrub-logo.png` — the parent company logo, footer only.
- `docs/brand-reference/` — a photo of the printed poster, kept for colour
  reference. Not shipped.

## Enquiry form

Two steps, in `components/form/EnquiryForm.tsx`:

1. Mobile number with a country code picker. It is saved the moment it is
   submitted, so an abandoned enquiry is still an enquiry we can answer.
2. Name, email, country, treatment, timeline, medical report upload and
   consent.

Both steps post to Server Actions in `app/actions.ts`, so the form works before
the JavaScript has loaded. The phone number is validated on the server, which
keeps the phone metadata off the visitor's connection.

Enquiries currently go to a **local stub**: `lib/leads.ts` writes them to
`.data/leads.json`, with uploaded reports in `.data/uploads/`. The CRM, the
email alert and the WhatsApp hook replace that one file later.

## Later: other languages

The site is English only and nothing else is stubbed. Three things are already
in place for the translation pass:

- All text is in content files.
- The language switch is in the header, showing English.
- Layout uses logical CSS utilities (`ms-`, `pe-`, `text-start`, `border-s`),
  so setting `dir="rtl"` in `app/layout.tsx` flips the site with no rework.
- IBM Plex Sans has a matching Arabic cut, IBM Plex Sans Arabic, so the
  typeface does not change when the site is translated.

## Still to supply

- Real hospitals, accreditations, patient stories, photos and numbers.
- The registered address and GSTIN. Set `site.company.registeredAddress` and
  `site.company.gstin` and the footer shows them.
- Header links for Treatments and Doctors point at sections of this page until
  those pages exist; change the `href` in `site.nav.items`.
