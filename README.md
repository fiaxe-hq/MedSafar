# Medsafar India

Website for Medsafar India, a division of Travgrub Private Limited: a medical
travel facilitator that arranges treatment in India for patients abroad.

Next.js (App Router), TypeScript and Tailwind, running on Cloudflare Workers
through OpenNext. Available in 12 languages: English, Hindi and the native
languages of the countries served (`lib/i18n/languages.ts`).

The client sees it at <https://medsafar.xaif-0e9.workers.dev/>.

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

For the admin, open `/admin`: the first time, it asks for the setup key (the
`ADMIN_PASSWORD` in `.dev.vars`) and creates your account. To try the page
cache as the Worker runs it, use `pnpm run preview`.

## Branches and deploying

- `main` holds all work, finished or not. It is pushed to GitHub but never
  deployed. Its `wrangler.jsonc` is for local development only.
- `design-variants` holds what the client has been shown. It is the only branch
  deployed to Cloudflare, by hand with `pnpm run deploy` from its own folder
  (`../Medsafar-design`), to the `medsafar` Worker (`wrangler.live.jsonc`) on the
  xaif@fiaxe.com account. Cloudflare does not build from GitHub.
- Work moves from `main` to `design-variants` only when it is ready for the
  client.
- Database changes are not applied by the deploy. When `design-variants` gains
  a file in `migrations/`, apply it to that Worker's database from the same
  branch.
- The admin panel needs three more bindings on the deployed Worker, besides
  `LEADS_DB` and `REPORTS` (see `wrangler.jsonc` on `main` for the shape):
  a KV namespace `NEXT_INC_CACHE_KV` (the page cache), a second D1 binding
  `NEXT_TAG_CACHE_D1` pointing at the same database as `LEADS_DB`, and an R2
  bucket `MEDIA` (photos uploaded in `/admin`). Deploy with
  `opennextjs-cloudflare deploy`, which also fills the page cache.

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

The files below are the starting point. Hospitals, doctors, treatments, blog
posts and the contact details can also be changed in `/admin`; those changes
live in D1 (table `content_entries`) and are laid over the files on every page
(`lib/content.ts`, through `getText`). An edit in `/admin` wins over the file.

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
Text added or changed in `/admin` is translated there, field by field or by CSV
(see [Translations in the admin](#translations-in-the-admin)).

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
- **Bot check** (`lib/turnstile.ts`): Cloudflare Turnstile on both forms.
  Secret: `TURNSTILE_SECRET_KEY`; until set, it is skipped.
- **CRM** (`lib/crm.ts`): every enquiry is sent to crm.fiaxe.com as a lead,
  matched by mobile number. A number alone is "Partial entry"; a full form moves
  it to "Email pending", and a CRM workflow sends the visitor a thank-you email
  and moves it to "New". Secret: `CRM_API_KEY`; until set, nothing is sent. The CRM sends
  the team's email alerts; the site sends none itself.

## Admin

`/admin` is the back end for the team. Each person signs in with their own
email and password. It is English only.

- **Home**: a card for each section and the latest changes, with who made them.
- **Hospitals, Doctors, Treatments, Blog**: list, search, edit, add, hide.
  One editor serves all four, driven by `lib/admin/schema.ts` (which fields,
  their labels and help text) and checked on the server by
  `lib/admin/validate.ts`. The team can add records inside these sections but
  cannot create new sections or pages. Specialities and blog categories are
  fixed.
- **Contact details**: WhatsApp, phone, email and social links, everywhere on
  the site.
- **Trust figures** (`/admin/stats`): add, edit, reorder, publish and unpublish.
- **Enquiries** (`/admin/enquiries`): a read-only copy of what goes to the CRM,
  with a download link for each uploaded report. Leads are worked in the CRM.
- **Team** (owners only): add people, change roles, set new passwords, remove
  access. **My account**: change one's own name and password.

### How a change reaches the site

Saving writes a row to `content_entries` and marks every page stale
(`refreshSite()` in `lib/admin/records.ts`). Pages are not built ahead: each is
drawn on its first visit and kept in the page cache (KV) until the next change
in `/admin` (`open-next.config.ts`). So a save shows on the next visit.

- **Records from the files** can be edited, hidden, or restored to the file's
  version. They cannot be deleted.
- **Records added in `/admin`** can be edited, hidden or deleted. Their web
  address is made from the name when they are added and never changes.
- **Other languages**: the team writes in English. A field nobody changed keeps
  its translation; a changed field shows the new English until it is
  translated, so an out-of-date translation (an old price) never shows.
- **Photos** uploaded in `/admin` are shrunk in the browser, stored in the R2
  bucket `MEDIA` and served at `/media/...` (`lib/media.ts`).

### Translations in the admin

Everything is typed in English. The other 11 languages are added in the admin:

- **One field at a time**: a **Translate** button beside each field (and beside
  the WhatsApp greeting and each trust figure) opens a panel on the right.
  Pick a language, see each English sentence with what that language shows
  now, change it, save. The button shows how many languages are done.
- **Many at once**: `/admin/translations` shows how far each language is,
  offers three CSV downloads (what still needs translating, everything, or an
  empty template with instructions) and imports a filled-in CSV. The import
  shows what it will change and saves only after a confirm.

The CSV has one row per sentence: `Section, ID, Field, English`, then one
column per language (`hi (Hindi)`, `ar (Arabic)`...). English is for
reference only. Rows starting with `HOW TO USE` or `EXAMPLE` are skipped.
Comma or semicolon files both work; save as CSV UTF-8.

Translations live in D1 (table `content_translations`, `lib/translations.ts`),
each with the English it was made from. If the English is changed later, the
old translation stops showing and the page shows the new English until it is
translated again (the panel marks it "out of date"; "still correct" keeps it).
Text nobody changed in the admin keeps its translation from
`public/i18n/<code>.json`, and the panel shows that as the starting text.

### Trust figures

The home page has a figures row just under the hero (`components/home/TrustFigures.tsx`).
It stays invisible until at least one figure is published in `/admin/stats`, so
no zeros are ever shown. Figures are in D1 table `site_stats`. The page loads
them in the browser from `/api/figures`, so they show within a minute.

Decided: no patient counts until there are real patients. Hospital and treatment
counts are fine to publish.

### Sign-in

Accounts are in D1 table `admin_users`, passwords stored only as PBKDF2 hashes.
Roles: **owner** (everything, including the team) and **editor** (everything
except the team). There is always at least one owner.

The first account is made at `/admin/setup`, which only works while there are
no accounts and asks for the setup key: the `ADMIN_PASSWORD` secret on the
Worker (at least 8 characters). Set it with:

```bash
npx wrangler secret put ADMIN_PASSWORD
```

Signing in sets a signed, httpOnly cookie that lasts 12 hours and is sent only
to `/admin`. It is checked against the account on every request, so removing
someone or changing their password signs them out at once. Changing
`ADMIN_PASSWORD` signs everyone out. Five wrong passwords for one email, or 20
from one connection, pause sign-in for 15 minutes. A forgotten password is
reset by an owner in Team. Never write a password in this README, in code or
in a commit.

### Cloudflare Access (at launch)

Cloudflare Access can add a second check in front of `/admin` on the custom
domain, so only the team's addresses reach the sign-in page.

1. Workers & Pages → the Worker → Settings → Domains & Routes: add the domain.
2. Zero Trust → Access → Applications → Add → **Self-hosted**. Public hostname
   for the domain (and `www`), path `admin`. Policy: Allow, Include → Emails.
3. Turn off the `workers.dev` address and Preview URLs, so `/admin` cannot be
   reached around Access.
4. In a private window, open `/admin`: Access should come first, then the
   sign-in page.

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
| `ADMIN_PASSWORD` | Setup key for the first `/admin` account; also signs the sign-in cookies. |
| `CRM_API_KEY` | Sends enquiries to the CRM. |
| `TURNSTILE_SECRET_KEY` | The bot check on the forms. |

## Still open

See `docs/go-live-checklist.md`.
