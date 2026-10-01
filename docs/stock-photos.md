# Stock photos: slots, briefs and options

Research only. Nothing has been bought or downloaded. Researched 1 October 2026;
check each image and price again before buying.

## Ground rules

- **Free route**: Unsplash (Unsplash Licence) and Pexels (Pexels Licence). Both
  allow commercial web use without attribution. Do not pick images marked
  **Unsplash+**, which are paid.
- **Paid route**: iStock (Getty Images' royalty-free library), Standard licence,
  which covers website use. A credit pack works out at about
  $12 for 1 credit, $33 for 3, $60 for 6 and $115 for 12. An **Essentials**
  image costs 1 credit; a **Signature** image costs 3. The collection is shown
  on each image page. Prices from
  [Photutorial's iStock pricing guide](https://photutorial.com/istock-pricing),
  to be confirmed at checkout.
- Use only images with model and property releases. Skip anything marked
  "Editorial use only" and photos of named hospitals (Fortis, Amrita and so on):
  they suggest a partnership that may not exist.
- The README rule still holds: nothing invented is presented as real. A stock
  photo is fine where it **illustrates** (a hero, a typical patient room). It
  is not fine where the page says it **is** someone or something specific.
  See "Slots that must not use stock" below.
- Stock coverage for patients from Iraq, Bangladesh, Kenya, Georgia and
  Uzbekistan in an Indian hospital is thin on every library. Where a
  nationality-specific image matters, a short commissioned shoot at a partner
  hospital will look better and be more honest than stock.

## Slot list

Found by searching for `pending: true` pictures and every `<Figure>`.

| # | Slot | Where | Shape | Count | Stock? |
| --- | --- | --- | --- | --- | --- |
| 1 | Home hero | `content/countries/global.ts` → `components/sections/Hero.tsx` | 4:3 phone, 16:10 tablet, 5:4 desktop | 1 | Yes |
| 2 | Nigeria hero | `content/countries/ng.ts` → `Hero.tsx` | as above | 1 | Yes |
| 3 | Hospital main photo | `data/hospitals.ts` → `HospitalCard.tsx`, `app/hospitals/[slug]/page.tsx` | 16:9, 16:11 and 4:3 | 3 | Only until the hospital supplies one (see below) |
| 4 | Hospital gallery: patient room | `data/hospitals.ts` gallery → `app/hospitals/[slug]/page.tsx` | 4:3 | 1 (shared) | Yes, as illustration |
| 5 | Hospital gallery: international patient desk | as above | 4:3 | 1 (shared) | Yes, as illustration |
| 6 | Hospital gallery: treatment area | as above | 4:3 | 1 (shared) | Yes, as illustration |
| 7 | Patient story portraits, home | `content/countries/global.ts` → `Stories.tsx` | square, small | 3 | **No** |
| 8 | Patient story portraits, Nigeria | `content/countries/ng.ts` → `Stories.tsx` | square, small | 3 | **No** |
| 9 | Doctor portraits | `data/doctors.ts` → `DoctorCard.tsx`, `app/doctors/[slug]/page.tsx` | square card, 4:5 detail | 4 | **No** |
| 10 | Team portraits | `content/pages.ts` → `app/about/page.tsx` | square, small | 3 | **No** |
| 11 | Iraq hero | `content/countries/iq.ts` → `Hero.tsx` | as slot 1 | 1 | Yes |
| 12 | Bangladesh hero | `content/countries/bd.ts` → `Hero.tsx` | as slot 1 | 1 | Yes |
| 13 | Kenya hero | `content/countries/ke.ts` → `Hero.tsx` | as slot 1 | 1 | Yes |
| 14 | Georgia hero | `content/countries/ge.ts` → `Hero.tsx` | as slot 1 | 1 | Yes |
| 15 | Uzbekistan hero | `content/countries/uz.ts` → `Hero.tsx` | as slot 1 | 1 | Yes |
| 16 | Patient story portraits, Iraq, Bangladesh, Kenya, Georgia, Uzbekistan | the five country files → `Stories.tsx` | square, small | 3 each, 15 in all | **No** |

---

## 1. Home hero

**Brief**: patients and families from the countries Medsafar serves, arriving
in India or being welcomed at a hospital. Warm, daylight, calm. A family group
reads better than a lone patient. Room on one side is not needed; the photo
sits beside the form.

Free:

1. [Medical checkup in a Lagos clinic, NinthGrid](https://www.pexels.com/photo/30678208/) (Pexels). African patient with a clinician; set in Nigeria, not India.
2. [A woman and a child on airport terminal chairs, Gylain Omer](https://unsplash.com/photos/woman-and-child-in-airport-terminal-bZg_EjTYMTM) (Unsplash). African mother and child travelling; fits "arriving".
3. [Healthcare professionals in a hospital corridor, Adarsh MP](https://www.pexels.com/photo/healthcare-professionals-in-hospital-corridor-31499386/) (Pexels). Indian hospital staff in a real Indian corridor.

Paid:

- [Happy young Indian doctor discussing treatment with African patient](https://www.istockphoto.com/photo/happy-young-indian-doctor-discussing-treatment-with-african-patient-gm1337312743-418249545) (iStock). Closest match to the brief on any library: an Indian doctor and an African patient. 1 credit if Essentials, 3 if Signature (about $12–$36 bought singly).

## 2. Nigeria hero

**Brief**: a Nigerian patient with their family, ideally in or near a
hospital, hopeful rather than unwell. Must read as Nigerian, not generically
African.

Free:

1. [Nigerian family embracing their newborn, Skylight Views](https://www.pexels.com/photo/33248034/) (Pexels). Nigerian family, warm, not a hospital.
2. [Traditional Nigerian family portrait outdoors, AB Pixels](https://www.pexels.com/photo/33900415/) (Pexels). Clearly Nigerian; formal, not medical.
3. [Medical checkup in a Lagos clinic, NinthGrid](https://www.pexels.com/photo/30678208/) (Pexels). Nigerian patient in a clinic; set in Lagos, not India, so keep the caption general.

Paid:

- [Son holding father's hand at the hospital](https://www.istockphoto.com/photo/son-holding-fathers-hand-at-the-hospital-gm1341484868-421224547) (iStock). Black family at a hospital bedside, calm and hopeful. 1 or 3 credits (about $12–$36).

## 3. Hospital main photo

**Brief**: the outside or main lobby of the partner hospital. This slot sits
under the hospital's name, so a stock building would be read as *that*
hospital. Ask each partner hospital for its own photo. If a stand-in is needed
while that arrives, use a generic interior (not a recognisable building) and
keep the Placeholder badge.

Free:

1. [Modern medical reception area, Jinshu Pulpatta](https://www.pexels.com/photo/modern-medical-reception-area-interior-design-33812025/) (Pexels). Indian clinic lobby, no signage.
2. [Healthcare professionals in a hospital corridor, Adarsh MP](https://www.pexels.com/photo/healthcare-professionals-in-hospital-corridor-31499386/) (Pexels).

Paid:

- [Working day in a medical clinic, lobby with doctors, nurses and patients](https://www.istockphoto.com/photo/working-day-in-medical-clinic-view-of-lobby-with-doctors-in-white-coats-nurses-gm1422752332-467946383) (iStock). Generic busy lobby. 1 or 3 credits.

## 4. Hospital gallery: patient room

**Brief**: a clean, private or semi-private patient room in an Indian hospital,
daylight, bed made, no patient. Reassures families about where they will stay.

Free:

1. [A modern hospital room with an adjustable bed, Irshad Pathan](https://unsplash.com/photos/3EIraOmufG4) (Unsplash). Indian hospital.
2. [Hospital room with medical bed and equipment, Irshad Pathan](https://unsplash.com/photos/Vxa1lSuGOBE) (Unsplash). Same hospital, different angle.
3. [Hospital bed in a room, Yash Gaikwad](https://www.pexels.com/photo/hospital-bed-in-a-room-11007013/) (Pexels). Indian hospital.

Paid:

- [Hospital room, iStock 920723384](https://www.istockphoto.com/search/2/image?phrase=920723384) (iStock). Empty private room. 1 or 3 credits.

## 5. Hospital gallery: international patient desk

**Brief**: a reception or help desk where a staff member is helping a patient
or family from abroad. Shows that someone meets you on arrival.

Free:

1. [Modern medical reception area, Jinshu Pulpatta](https://www.pexels.com/photo/modern-medical-reception-area-interior-design-33812025/) (Pexels). Desk only, no people. Do not reuse if picked for slot 3.
2. [Couple looking at documents at a medical centre reception, Pavel Danilyuk](https://www.pexels.com/photo/couple-looking-at-documents-in-reception-of-medical-center-7108325/) (Pexels). People at the desk; not Indian, so a weaker fit.

Paid:

- [Efficient reception management by Indian nurse](https://www.istockphoto.com/photo/efficient-reception-management-by-indian-nurse-gm1991210560-559614213) (iStock). Indian staff at a hospital desk. 1 or 3 credits.

## 6. Hospital gallery: treatment area

**Brief**: a clinical space (operating theatre, ICU or consultation room) in an
Indian hospital. Clean and modern, no visible patient faces.

Free:

1. [Hospital room with three beds and medical equipment, Irshad Pathan](https://unsplash.com/photos/cTH0dAHdqtQ) (Unsplash). Indian ward with monitors.
2. [Medical equipment in a hospital room](https://www.pexels.com/photo/medical-equipment-in-hospital-room-16571733/) (Pexels).
3. [A man in a surgical mask in a hospital room, Danish Pandit](https://unsplash.com/photos/6FD4W2_n1sU) (Unsplash). Indian clinical setting with staff.

Paid:

- [Nurse with male doctor examining patient on ICU bed](https://www.istockphoto.com/search/2/image?phrase=1419003142) (iStock 1419003142). Indian ICU team. 1 or 3 credits.

## 11–15. New country heroes

**Brief for each**: a patient from that country with their family, hopeful
rather than unwell, ideally in or near a hospital. It must read as that
nationality, not as a generic "Middle Eastern", "Asian" or "African" face.

Free stock for these is mostly street and travel photography, not medical
scenes. The picks below are the closest; a short commissioned shoot with real
patients (with consent) will look better for every one of them.

### 11. Iraq

Free:

1. [Father with children on a colourful mat, Tima Miroshnichenko](https://www.pexels.com/photo/5988678/) (Pexels). Warm family scene, not medical.
2. [Grandma and baby, Eslames1](https://www.pexels.com/photo/27593286/) (Pexels). Family, indoors.

Paid:

- [Muslim nurse talking to a senior patient at the hospital](https://www.istockphoto.com/photo/muslim-nurse-talking-to-a-senior-patient-at-the-hospital-gm1404912379-456993026) (iStock). Hospital setting, Middle Eastern patient. 1 or 3 credits.

### 12. Bangladesh

Free:

1. [Happy family relaxing by the river in Chittagong, Minhaj Ahmed Ahyan](https://www.pexels.com/photo/34935084/) (Pexels). Clearly Bangladeshi, not medical.
2. [Traditional Bangladeshi family portrait outdoors, Sagor Bormon](https://www.pexels.com/photo/28977852/) (Pexels).
3. [Happy family walking outdoors in traditional attire, Ornob Sadi](https://www.pexels.com/photo/38974355/) (Pexels).

Paid:

- [Mid adult Indian doctor consulting with patient](https://www.istockphoto.com/photo/mid-adult-indian-doctor-consulting-with-patient-gm2187596869-606169311) (iStock). South Asian consultation; check the patient reads as Bangladeshi before buying. 1 or 3 credits.

### 13. Kenya

Free:

1. [A joyful mother and child in colourful traditional Kenyan clothing, Riccardo Parretti](https://www.pexels.com/photo/10628608/) (Pexels).
2. [Father and children on a camping trip in a Kenyan forest, Kim Jackson](https://www.pexels.com/photo/8374651/) (Pexels).
3. [A woman and a child on airport terminal chairs, Gylain Omer](https://unsplash.com/photos/woman-and-child-in-airport-terminal-bZg_EjTYMTM) (Unsplash). Travel; if not already used on the home page.

Paid:

- [Father and son drawing together in a hospital room](https://www.istockphoto.com/search/2/image?phrase=687000700) (iStock 687000700). Calm hospital family scene; check the family fits before buying. 1 or 3 credits.

### 14. Georgia

Free: no suitable photos of Georgian patients or families found on Unsplash
or Pexels; results are almost all Tbilisi landmarks. A landmark is the wrong
subject for this slot.

Paid: no specific match found on iStock. Commission a shoot, or use a
generic hospital family photo and keep the brief honest.

### 15. Uzbekistan

Free:

1. [Two women in traditional scarves smiling indoors, RDNE](https://www.pexels.com/photo/7158617/) (Pexels). Warm, indoors, not medical.
2. [A woman in traditional Uzbek dress outside a historic building, Aksioart](https://www.pexels.com/photo/30133166/) (Pexels). Clearly Uzbek, not medical.

Paid: no specific match found on iStock. Commission a shoot, or use a generic
hospital family photo.

## Slots that must not use stock

These slots claim to show a specific, real person. A stock face there would
present something invented as real, which the site rules forbid and which
would mislead patients.

| Slot | What to use instead |
| --- | --- |
| 7, 8, 16. Patient story portraits | The real patient's photo, with written consent. Until then keep the placeholder, or show initials. |
| 9. Doctor portraits | The doctor's own photo, supplied by the hospital. |
| 10. Team portraits | The Medsafar team's own photos. A phone portrait against a plain wall is enough. |

No stock suggestions are given for these, so they cost nothing on either route.

## Totals

Images to license: slots 1–6 and 11–15, one image each, so **11 images**.
Slot 3 is needed only until the hospitals send their own photos. For Georgia
and Uzbekistan no good paid match was found, so the paid count assumes a
generic image for those two.

| Route | Images | Cost |
| --- | --- | --- |
| Free (Unsplash and Pexels) | 11 | **$0** |
| Paid (iStock, all Essentials) | 11 credits | **$115** (one 12-credit pack) |
| Paid (iStock, all Signature) | 33 credits | **about $325** (two 12-credit packs, a 6 and a 3: $115 + $115 + $60 + $33) |

The real paid total sits between $115 and about $325, depending on how many
of the chosen images are Signature. A mix of free and paid works too: for
example, pay only for the seven country heroes (slots 1, 2 and 11–15) and use
free photos for the hospital gallery. That costs $72 to $208 (7 credits as a
6-credit pack plus 1, up to 21 credits as a 12, a 6 and a 3).
