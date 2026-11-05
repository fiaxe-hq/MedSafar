# Medsafar go-live checklist

Updated 5 November 2026.

The site in use is the **medsafar** Worker: https://medsafar.xaif-0e9.workers.dev
(account xaif@fiaxe.com). It deploys from the `design-variants` worktree with
`pnpm run deploy` (`wrangler.live.jsonc`). The old `building-medsafar` Worker was deleted on
5 November 2026; its admin logins, edits and enquiries were copied to `medsafar-leads`.

## Done

- [x] Home page around the nine-step patient journey
- [x] Treatments, specialities, body map, hospital, doctor and blog pages
- [x] Partner hospitals: Nanavati Max, Kenia Eye, Kenia Dental, five Wockhardt hospitals; their doctors
- [x] Package prices shown (decided)
- [x] Terms, Privacy Policy, Disclaimer, Editorial Policy (with clause 20), Cancellations
- [x] Privacy contact: care@medsafar.com only
- [x] About page with the client's text and photos
- [x] 12 languages: English, Hindi and the languages of the countries served, every page translated
- [x] Country from location; phone code follows it; a hero photo per country
- [x] Enquiry form: number saved at step 1 (no code check), report upload, spam limit, Turnstile bot check
- [x] Every enquiry goes to the CRM as a lead; the CRM emails the team
- [x] Admin with team logins, editing, translations, enquiries list, trust figures
- [x] Real Instagram and Facebook links (no YouTube)
- [x] Treatment pages: "Pending doctor check" removed; a general-information note asks readers to confirm with their own doctor
- [x] Worker secrets on medsafar: `ADMIN_PASSWORD`, `CRM_API_KEY`, `TURNSTILE_SECRET_KEY`
- [x] Tested (on the old preview Worker, same code and secrets): Turnstile, enquiry to D1/CRM/R2, CRM emails, admin

## Still open

- [ ] **Trust figures:** publish in `/admin/stats` once there are real ones.
- [ ] **Analytics:** later; paste the token into `lib/analytics.ts`.

## Launch day

1. Change `siteUrl` in `lib/seo.ts` to `https://medsafar.com` (on design-variants), deploy.
2. Remove the coming-soon Worker's routes for `medsafar.com` and `www.medsafar.com`
   (Cloudflare → the coming-soon account → Workers → its Routes), or delete that Worker.
3. In DNS, delete the old Hostinger web records (A / CNAME for `@` and `www`).
   **Keep the email records** (MX, TXT/SPF/DKIM/DMARC, autoconfig, autodiscover).
4. Attach `medsafar.com` and `www.medsafar.com` to the `medsafar` Worker as Custom Domains
   (Workers → medsafar → Settings → Domains & Routes).
5. Add `medsafar.com` to the Turnstile widget's hostnames.
6. Send a real test enquiry on medsafar.com: check D1, the CRM lead, the CRM email and the report in R2.
7. Check `care@medsafar.com` receives mail and the WhatsApp number answers.
8. Submit the sitemap to Google Search Console and Bing Webmaster Tools.
9. Optional: turn off the workers.dev address once the domain works.
