# Medsafar go-live checklist

Updated 3 November 2026.

## Done

- [x] Home page around the nine-step patient journey
- [x] Treatments, specialities, body map, hospital, doctor and blog pages
- [x] Partner hospitals: Nanavati Max, Kenia Eye, Kenia Dental, five Wockhardt hospitals; their doctors
- [x] Package prices shown (decided)
- [x] Terms, Privacy Policy, Disclaimer, Editorial Policy, Cancellations
- [x] About page with the client's text and photos
- [x] 12 languages: English, Hindi and the languages of the countries served, every page translated
- [x] Country from location; phone code follows it; a hero photo per country
- [x] Enquiry form: number saved at step 1 (no code check), report upload, spam limit, Turnstile bot check
- [x] Every enquiry goes to the CRM as a lead; the CRM emails the team
- [x] Admin with team logins, editing, translations, enquiries list, trust figures
- [x] Real Instagram and Facebook links (no YouTube)
- [x] Live Worker `medsafar` on the xaif@fiaxe.com account: https://medsafar.xaif-0e9.workers.dev
  with its own D1 (`medsafar-leads`, all migrations), KV page cache, R2 buckets for
  reports, report backups (30-day rule) and admin photos. Owner login copied from the preview.
  Deploy: `pnpm run deploy`. Migrate: `pnpm run db:migrate`. Config: `wrangler.live.jsonc`.

## Waiting on you

- [ ] **Worker secrets** on `medsafar`: `ADMIN_PASSWORD`, `CRM_API_KEY`, `TURNSTILE_SECRET_KEY`.
- [ ] **Turnstile widget:** add `medsafar.xaif-0e9.workers.dev` (and later `medsafar.com`) to its hostnames.
- [ ] **Editorial Policy clause 20:** the client's document has only "[Insert ...]" blanks there. Send the details to fill in.
- [ ] **Submit the sitemap** to Google Search Console and Bing once on the domain.
- [ ] **Analytics:** later; paste the token into `lib/analytics.ts`.
- [ ] **Trust figures:** publish in `/admin/stats` once there are real ones.
- [ ] **Test the admin** on the live Worker (edit a hospital, check the page).

## Domain day

- [ ] Change `siteUrl` in `lib/seo.ts` to `https://medsafar.com`, deploy.
- [ ] Attach `medsafar.com` and `www.medsafar.com` to the `medsafar` Worker.
- [ ] Remove the coming-soon routes and old Hostinger web records. **Keep the email records** (MX, TXT, autoconfig, autodiscover).
- [ ] Optional: turn off the workers.dev address once the domain works.
- [ ] Send a real test enquiry: check D1, the CRM lead, the CRM email and the report in R2.
- [ ] Check `care@medsafar.com` receives mail and the WhatsApp number answers.
