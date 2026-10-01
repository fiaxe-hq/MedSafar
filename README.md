# Medsafar India

Marketing site for Medsafar India, a division of Travgrub Private Limited: a
medical travel facilitator that arranges treatment in India for patients
abroad.

Next.js (App Router), TypeScript and Tailwind, running on Cloudflare Workers
through OpenNext. English only for now.

Live at <https://medsafar.xaif.workers.dev/>.

## Running it locally

1. Copy `.dev.vars.example` to `.dev.vars` and set your own `ADMIN_PASSWORD`.
   `.dev.vars` is ignored by git; never commit it.
2. Create the local database tables:

   ```bash
   npm run db:migrate:local
   ```

3. Start the site:

   ```bash
   npm run dev
   ```

## Deploying

Every push to `main` deploys to Cloudflare automatically.

Database changes are not applied by the deploy. When a commit adds a file to
`migrations/`, apply it to the live database before or straight after pushing:

```bash
npm run db:migrate
```

## Pages

- `/` is the home page. `/ng`, `/iq`, `/bd`, `/ke`, `/ge` and `/uz` are the
  pages for Nigeria, Iraq, Bangladesh, Kenya, Georgia and Uzbekistan. All of
  them use one component, `components/CountryPage.tsx`, with the same sections
  in the same order. Only the content file changes.
- `/treatments`, `/hospitals` and `/doctors`, each with a detail page.
- `/blog`, `/about`, `/contact`, `/privacy` and `/terms`.
- `/admin`, for the team (see [Admin](#admin)).

## Content

No copy and no image path lives in a component.

| File | Holds |
| --- | --- |
| `content/site.ts` | Text shared by every page: header, footer, buttons, contact details, company details and every label in the enquiry form. |
| `content/countries/global.ts` | The home page. |
| `content/countries/<slug>.ts` | One file per country page. |
| `content/pages.ts` | About, Contact, Privacy and Terms. |
| `content/catalog.ts` | Headings and labels for the treatment, hospital, doctor and blog pages. |
| `content/dial-codes.ts` | The country codes in the phone field. |
| `content/types.ts` | The shape all of the above must follow. |
| `data/` | Specialities, treatments, hospitals, doctors and blog posts. Pages read these only through `lib/catalog.ts`. |

### Adding a country

1. Copy `content/countries/ng.ts` to `content/countries/<slug>.ts`. Rewrite the
   words, photo briefs, stories and travel information. Put the source of each
   travel fact in a comment next to it.
2. Register it in `content/countries/index.ts`.

The page then exists at `/<slug>`. Any slug that is not registered is a 404.

### Placeholders

Nothing invented is presented as real. Hospitals, doctors, patient stories,
photos and treatment descriptions are stand-ins. They are marked on the page
with a **Placeholder** badge and flagged in the content files. Replace them
only with things Medsafar can prove.

The trust figures (patients helped and so on) are not in the code at all. They
appear only once someone publishes them in `/admin`.

No prices appear anywhere. Each patient gets an individual quote.

## Design

Tokens live in `app/globals.css` as semantic CSS variables (`--ink`,
`--surface`, `--accent` and so on), mapped into Tailwind through
`@theme inline`. The theme is light only.

Colour is built on the logo green, `#0E9475`, sampled from
`public/brand/medsafar-logo.png`. Every shade keeps the logo's exact hue
(166°); only lightness and saturation change, so tints and darks read as the
same green as the logo.

| Token | Value | Use |
| --- | --- | --- |
| `--brand` | `#0E9475` | The exact logo green. Marks, rules and icons only: 3.8:1 on white is enough for non-text, not for small text. |
| `--accent`, `--cta` | `#0C7E63` | Links, small accent text and buttons. The logo green darkened only as far as WCAG AA needs: 5.0:1 on white, 4.6:1 on `--accent-soft`. |
| `--accent-hover`, `--cta-hover` | `#09644F` | Hover state. |
| `--accent-soft` | `#E8F7F4` | Tinted panels, numbered steps, photo placeholders. |
| `--accent-quiet` | `#EEF9F7` | Selected options, notices. |
| `--ink`, `--ink-2`, `--ink-3` | `#0B3D31`, `#415853`, `#566C67` | Text. The lowest pair, `--ink-3` on `--accent-soft`, is 5.1:1. |
| `--surface-2` | `#F4FBF9` | Quiet sections, the footer. |
| `--hairline`, `--line` | `#D9EDE8`, `#8EC2B6` | Dividers and control borders. |
| `--danger` | `#A61B1B` | Errors and delete buttons in `/admin`. |

Every text and background pair above passes WCAG AA for body text.

Travgrub's red (`#EC3237`) and grey (`#555557`) appear only in the Travgrub
logo in the footer, never as tokens.

Shape rule, applied everywhere: buttons and inputs are `rounded-md`, cards are
`rounded-lg`.

Motion uses the native scroll-driven `animation-timeline: view()`, so reveals
cost no JavaScript. The hidden start state sits inside an `@supports` block,
so a browser without scroll timelines simply shows the content. Everything
stops under `prefers-reduced-motion`.

Type is Noto Sans for reading and Figtree for headings.

### Brand files

- `public/brand/medsafar-logo.png`: the header logo (420×177, transparent).
- `public/brand/medsafar-mark-square.png`: the square version. The favicon and
  app icons in `app/` are cropped from it to the heartbeat "M", widened 1.3
  times so it reads as an M rather than a tall spike at tab size.
- `public/brand/travgrub-logo.png`: the parent company logo, footer only.
- `docs/brand-reference/`: a photo of the printed poster, kept for colour
  reference. Not shipped.

## Enquiry form

Two steps, in `components/form/EnquiryForm.tsx`:

1. Mobile number with a country code picker. It is saved the moment it is
   submitted, so an abandoned enquiry is still an enquiry the team can answer.
2. Name, email, country, treatment, timeline, medical report upload and
   consent.

Both steps post to Server Actions in `app/actions.ts`, so the form works before
the JavaScript has loaded. The phone number is checked on the server.

Enquiries are stored by `lib/leads.ts`: the details in the D1 database
(`LEADS_DB`, table `leads`) and uploaded reports in the R2 bucket (`REPORTS`).
The team reads them in `/admin/enquiries`. Nobody is alerted when one arrives
yet; an email or WhatsApp alert would plug into `lib/leads.ts`.

## Admin

`/admin` is a small back end for the team. It is server-rendered and needs no
client JavaScript.

- **Enquiries** (`/admin/enquiries`): every enquiry, newest first, read-only,
  with a download link for each uploaded report. A number with no name is a
  visitor who stopped after step 1.
- **Trust figures** (`/admin/stats`): the figures in the trust strip. Add,
  edit, reorder, publish and unpublish.

### How the trust figures work

- They live in D1, table `site_stats`
  (`migrations/0002_create_site_stats.sql`).
- The site shows only published figures. With none published, the figures row
  is not shown at all; the rest of the trust strip stays.
- A figure with no country applies to every page. The table can also hold a
  per-country figure that replaces the global one on that country's page. The
  admin cannot edit those yet.
- The home and country pages read the figures on every visit, so a change
  shows at once. If the database cannot be read, the page shows no figures
  rather than breaking.

### Sign-in

The admin password is the `ADMIN_PASSWORD` secret on the Worker. It must be at
least 8 characters; longer is safer. Signing in sets a signed, httpOnly cookie
that lasts 12 hours and is sent only to `/admin`. Every admin page, action and
report download checks it (`lib/admin/auth.ts`).

- To set or change the password, run the command below, or use the Cloudflare
  dashboard: Workers & Pages → `medsafar` → Settings → Variables and Secrets.
  Changing it signs everyone out.

  ```bash
  npx wrangler secret put ADMIN_PASSWORD
  ```

- If the secret is missing or too short, nobody can sign in, and the sign-in
  page says which.
- Never write the password in this README, in code or in a commit. Share it
  through a password manager.

### Cloudflare Access (recommended)

Cloudflare Access can add a second check in front of `/admin`, so only the
team's own email addresses reach the password page at all.

Access protects paths on a custom domain that is set up in Cloudflare. It
cannot protect only `/admin` on the `workers.dev` address: Cloudflare's Access
switch for `workers.dev` covers the whole address, which would lock the public
site too. So while the site is live only on `medsafar.xaif.workers.dev`,
the password is the only protection for `/admin`.

Once the site moves to a custom domain:

1. Workers & Pages → `medsafar` → Settings → Domains & Routes: add the custom
   domain.
2. Zero Trust dashboard → Access → Applications → Add an application →
   **Self-hosted**.
   - Name: `Medsafar admin`. Session duration: 24 hours.
   - Add a public hostname for the domain (and `www`, if it is served), each
     with path `admin`. This covers everything under `/admin`, including
     report downloads.
   - Policy: Action **Allow**, Include → **Emails**, listing each team
     member's address (or **Emails ending in** the company domain).
   - Login method: the default one-time PIN by email is enough.
3. In the same Domains & Routes screen, turn off the `workers.dev` address and
   Preview URLs, so `/admin` cannot be reached around Access.
4. Check it: in a private window, open `https://<your domain>/admin`. The
   Cloudflare Access sign-in should come first, then the Medsafar password
   page.

### Adding a section

Hospitals and doctors move into the admin next. Every section has the same
shape, described in `lib/admin/sections.ts`:

1. A migration in `migrations/`.
2. A file in `lib/` that holds all the database code for that table, like
   `lib/stats.ts`.
3. A page and an `actions.ts` under `app/admin/(panel)/<section>/`.
4. An entry in the list in `lib/admin/sections.ts`.

Shared form styles are in `components/admin/ui.tsx`. For hospitals and doctors,
`lib/catalog.ts` then reads from the new `lib/` file instead of `data/`, and no
public page has to change.

## Later: other languages

The site is English only. Four things are already in place for translation:

- All text is in content files.
- The language switch is in the header, showing English.
- Layout uses logical CSS utilities (`ms-`, `pe-`, `text-start`, `border-s`),
  so setting `dir="rtl"` in `app/layout.tsx` flips the site with no rework.
- Noto Sans has a matching Arabic cut, Noto Sans Arabic, so the typeface does
  not change when the site is translated.

## Still to supply

- Privacy and Terms text.
- Partner hospitals and doctors, and their accreditations.
- Treatment descriptions, stays, recovery times and FAQs, written or checked by
  a doctor.
- Patient stories, with written consent, and photos (see
  `docs/stock-photos.md`).
- Trust figures Medsafar can prove. Enter and publish them in `/admin/stats`.
- Working hours for `/contact`.
- The team, and how hospitals are chosen, for `/about`.
- Real blog articles.
