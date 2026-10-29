# Medsafar go-live checklist

Updated 29 October 2026 (second pass, after the owner's decisions).

## Done

- [x] Home page around the nine-step patient journey
- [x] Treatments, specialities, body map, hospital, doctor and blog pages
- [x] Partner hospitals: Nanavati Max, Kenia Eye, Kenia Dental (confirmed). Placeholder hospitals removed.
- [x] Package prices shown (decided)
- [x] Terms and Privacy Policy, signed off by the client
- [x] About page with the client's text and photos
- [x] 31 languages; only the languages of countries served are offered
- [x] Country from location; phone code follows it
- [x] Enquiry form: number saved at step 1, report upload, spam limit
- [x] Mobile number code check (built; off until an SMS provider is wired)
- [x] Every enquiry goes to the CRM as a lead. Stages "Partial entry" and "New" exist in the CRM.
- [x] Team email alerts go through the CRM (Gmail). The site's own SMTP sender is removed.
- [x] Admin sign-in, enquiries list, trust figures
- [x] Trust figures row on the home page: hidden until a figure is published in `/admin/stats`
- [x] Sitemap, robots, share image, icons
- [x] README rewritten
- [x] Client preview live; coming-soon page live on medsafar.com

## Waiting on you

- [ ] **SMS provider** for the number check: choose one, then it gets wired into `lib/sms.ts`.
- [ ] **Secrets to Cloudflare in one go** once SMS is done: `ADMIN_PASSWORD`, `OTP_SECRET`, `CRM_API_KEY`, SMS keys.
- [ ] **Real social links.** Current Instagram, Facebook and YouTube links are guesses. Flagged until the accounts are set up with the client.
- [ ] **Treatment photos:** about 27 treatments still share a photo (`docs/treatments-still-need-images.md`). You will look at these.
- [ ] **More partner hospitals** as the client sends them.
- [ ] **Doctor check** of treatment descriptions, then remove the flag. Later.
- [ ] **Analytics:** decide what to use; paste the token into `lib/analytics.ts`. Later.
- [ ] **Publish trust figures** (hospital and treatment counts) in `/admin/stats` when wanted. No patient counts until real.
- [ ] **Georgia hero photo** and country-specific photos.

## Test

- [ ] Full test pass: enquiry on a phone (both steps, upload), languages including right-to-left, slow connection, links, Lighthouse.
- [ ] Check the new figures row once a figure is published.

## Launch day (not reviewed yet)

- [ ] Change `siteUrl` in `lib/seo.ts` to `https://medsafar.com`.
- [ ] Turn on R2 and create the reports bucket (the preview has none, so uploads fail there).
- [ ] Create the live D1 database and apply all five migrations.
- [ ] Deploy to the xaif@fiaxe.com account (never WebVerge).
- [ ] Attach `medsafar.com` and `www.medsafar.com` to the app Worker.
- [ ] Remove the coming-soon routes and old Hostinger web records. **Keep the email records** (MX, TXT, autoconfig, autodiscover).
- [ ] Cloudflare Access in front of `/admin`; turn off workers.dev and preview URLs.
- [ ] Submit the sitemap to Google Search Console and Bing.
- [ ] Send a real test enquiry: check D1, the CRM lead, the CRM email and the report in R2.
- [ ] Check `care@medsafar.com` receives mail and the WhatsApp number answers.
