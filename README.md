# Medsafar India

Website for Medsafar India, a division of Travgrub Private Limited: a medical
travel facilitator that arranges treatment in India for patients abroad.

Next.js (App Router), TypeScript and Tailwind, running on Cloudflare Workers
through OpenNext. Available in 31 languages.

The client sees it at <https://building-medsafar.xaif-0e9.workers.dev/>.

## Running it locally

1. Copy `.dev.vars.example` to `.dev.vars` and fill it in. `.dev.vars` is
   ignored by git; never commit it.
2. Create the local database tables:

   ```bash
   pnpm run db:migrate:local
   ```

3. Start the site:

   ```bash
   pnpm run dev
   ```

Locally, the mobile number code is written to the dev server's log and an empty
code passes, so the form can be tried without an SMS provider.

## Branches and deploying

- `main` holds all work, finished or not. It is pushed to GitHub but never
  deployed. Its `wrangler.jsonc` is for local development only.
- `design-variants` holds what the client has been shown. It is the only branch
  deployed to Cloudflare, by hand with `pnpm run deploy` from its own folder
  (`../Medsafar-design`), to the `building-medsafar` Worker on the
  xaif@fiaxe.com account. Cloudflare does not build from GitHub.
- Work moves from `main` to `design-variants` only when it is ready for the
  client.
- Database changes are not applied by the deploy. When `design-variants` gains
  a file in `migrations/`, apply it to that Worker's database from the same
  branch.

Never use the WebVerge Cloudflare account.

## Pages

Every page lives under a language: English at the plain address, any other
language at `/<code>/...` (`lib/i18n/languages.ts`).

- `/` is the home page. `/home/<country>` is the same page with a hero photo for
  that country; the visitor's country comes from their location.
- `/treatments`, `/specialities`, `/hospitals`, `/doctors`, each with detail
  pages, plus `/questionnaires` (the body map and the question flows).
- `/blog`, `/about`, `/contact`, `/privacy`, `/terms`, `/disclaimer`,
  `/cancellations`, `/editorial-policy`.
- `/admin`, for the team (see [Admin](#admin)). English only.

## Content

No copy and no image path lives in a component.

| File | Holds |
| --- | --- |
| `content/site.ts` | Text shared by every page: header, footer, buttons, contact details, company details and every label in the enquiry form. |
| `content/home.ts`, `content/countries/global.ts` | The home page. |
| `content/pages.ts` | About, Contact, Privacy and Terms. |
| `content/catalog.ts`, `content/ui.ts` | Headings and labels for the catalogue pages and shared interface text. |
| `content/questionnaires.ts` | The question flows. |
| `content/dial-codes.ts` | The country codes in the phone field. |
| `content/types.ts` | The shape all of the above must follow. |
| `data/` | Specialities, treatments, hospitals, doctors, blog posts, the body map and treatment photos. Pages read these only through `lib/catalog.ts`. |

Hospital package prices are shown on the site. The hospital stay lengths on the
treatment pages come from the hospital's price sheet. Originals of material the
client supplied are kept in `docs/client-content/`, outside `public/`.

Partner hospitals today: Nanavati Max, Kenia Eye and Kenia Dental. More are
added to `data/hospitals.ts` as the client sends them. Treatment descriptions
are still flagged "to be checked by a doctor" until a doctor has read them.

### Treatment photos

`data/treatmentPhotos.ts` maps each treatment and speciality to a photo in
`public/photos/care/` and `public/photos/treatments/`. Treatments without their
own photo share a general one; the list is in
`docs/treatments-still-need-images.md`.

### Translations

English is the source. `node scripts/i18n.mjs` writes `public/i18n/en.json`
with every English sentence; each language is `public/i18n/<code>.json` with the
same paths. `node scripts/i18n.mjs check` reports missing or broken sentences.
Only languages for the countries served are offered in the picker.

## Design

Tokens live in `app/globals.css` as semantic CSS variables (`--ink`,
`--surface`, `--accent` and so on), mapped into Tailwind through
`@theme inline`. The theme is light only.

Colour is built on the logo green, `#0E9475`. Text and buttons use
`--accent`/`--cta` (`#0C7E63`), the logo green darkened just enough to pass WCAG
AA; `--brand` (the exact logo green) is for marks, rules and icons only.
Travgrub's red and grey appear only in the Travgrub logo in the footer.

Shape rule: buttons and inputs are `rounded-md`, cards are `rounded-lg`.

Type: Figtree for headings, Inter for reading. Hero heading weight 525, body
weight 415. Keep these when merging.

Motion uses native scroll-driven animation, so reveals cost no JavaScript, and
stops under `prefers-reduced-motion`. Layout uses logical CSS utilities (`ms-`,
`pe-`, `text-start`), so right-to-left languages flip with no extra work.

### Brand files

- `public/brand/medsafar-logo.png`, `medsafar-mark-square.png`,
  `travgrub-logo.png`.
- `docs/brand-reference/`: a photo of the printed poster, for colour reference.
- `public/out_6ac38d6024b6b_p1.jpg` and `_p2.jpg` are the client's business card
  scans. Nothing uses them; keep them.

## Enquiry form

Two steps, in `components/form/EnquiryForm.tsx`:

1. Mobile number with a country code picker, then a code sent to that number.
   The number is saved at once, so an abandoned enquiry is still one the team
   can call.
2. Name, email, country, treatment, timeline, medical report upload and consent.

Both steps post to Server Actions in `app/actions.ts`. The number is checked on
the server.

- **Storage** (`lib/leads.ts`): details in the D1 database (`LEADS_DB`, table
  `leads`), uploaded reports in the R2 bucket (`REPORTS`). The team reads them in
  `/admin/enquiries`.
- **Spam limit:** one connection or one phone number can start at most 3
  enquiries in 24 hours. The IP address is never stored, only a one-way hash.
- **Number check** (`lib/otp.ts`, `lib/sms.ts`): signed cookies, limits counted
  in D1. It switches on by itself once an SMS provider is wired into
  `lib/sms.ts` (`smsReady()` returns true). Until then it is off on the Worker.
  Secret: `OTP_SECRET`.
- **CRM** (`lib/crm.ts`): every enquiry is sent to crm.fiaxe.com as a lead,
  matched by mobile number. A number alone is "Partial entry"; a full form moves
  it to "New". Secret: `CRM_API_KEY`; until set, nothing is sent. The CRM sends
  the team's email alerts; the site sends none itself.

## Admin

`/admin` is a small back end for the team. It is server-rendered and needs no
client JavaScript.

- **Enquiries** (`/admin/enquiries`): every enquiry, newest first, with a
  download link for each uploaded report.
- **Trust figures** (`/admin/stats`): add, edit, reorder, publish and unpublish.

### Trust figures

The home page has a figures row just under the hero (`components/home/TrustFigures.tsx`).
It stays invisible until at least one figure is published in `/admin/stats`, so
no zeros are ever shown. Publish a figure and it appears within a minute, with
no deploy. Figures are in D1 table `site_stats`. The page loads them in the
browser from `/api/figures`, so the home pages stay pre-built.

Decided: no patient counts until there are real patients. Hospital and treatment
counts are fine to publish.

### Sign-in

The admin password is the `ADMIN_PASSWORD` secret on the Worker, at least 8
characters. Signing in sets a signed, httpOnly cookie that lasts 12 hours and is
sent only to `/admin`. Set or change it with:

```bash
npx wrangler secret put ADMIN_PASSWORD
```

Changing it signs everyone out. Never write the password in this README, in code
or in a commit.

### Cloudflare Access (at launch)

Cloudflare Access can add a second check in front of `/admin` on the custom
domain, so only the team's addresses reach the password page.

1. Workers & Pages → the Worker → Settings → Domains & Routes: add the domain.
2. Zero Trust → Access → Applications → Add → **Self-hosted**. Public hostname
   for the domain (and `www`), path `admin`. Policy: Allow, Include → Emails.
3. Turn off the `workers.dev` address and Preview URLs, so `/admin` cannot be
   reached around Access.
4. In a private window, open `/admin`: Access should come first, then the
   password page.

## Search and analytics

- `lib/seo.ts` holds the site address (`siteUrl`) and the organisation data for
  search engines. Change `siteUrl` on launch day when the site moves to
  `medsafar.com`.
- `app/sitemap.ts` and `app/robots.ts` build `/sitemap.xml` and `/robots.txt`.
  `/admin` is blocked.
- `app/opengraph-image.png` is the preview shown when a link is shared.
- Cloudflare Web Analytics loads only once a site token is pasted into
  `lib/analytics.ts`. No cookies, so no consent banner. Not decided yet.

## Settings (Worker secrets)

| Name | Used for |
| --- | --- |
| `ADMIN_PASSWORD` | Sign-in to `/admin`. |
| `OTP_SECRET` | Signs the mobile number check's cookies. |
| `CRM_API_KEY` | Sends enquiries to the CRM. |
| SMS provider keys | To be added when a provider is chosen. |

## Still open

See `docs/go-live-checklist.md`.
