import type { Post, PostCategory } from "@/content/types";

/**
 * Blog posts. The admin panel manages these later.
 * Read them through lib/catalog.ts, never directly.
 *
 * Every post is written from the sources it lists. Patients are not named.
 */

export const postCategories: PostCategory[] = [
  { slug: "cases", name: "Patient cases" },
  { slug: "guides", name: "Guides" },
  { slug: "treatments", name: "Treatments" },
  { slug: "travel", name: "Travel" },
];

export const posts: Post[] = [
  {
    slug: "bilateral-hand-transplant-nanavati-max",
    title: "A double hand transplant gives an 18-year-old his hands back",
    date: "2026-10-05",
    category: "cases",
    author: "Medsafar",
    summary:
      "A young farmer who lost both hands in an accident received two donor hands in a 13-hour operation at Nanavati Max Super Speciality Hospital, Mumbai.",
    body: [
      "In January 2024, an 18-year-old farmer's son from Gujarat lost both hands in an accident with farm machinery. The crush injury was too severe to repair, and both hands had to be amputated.",
      "After detailed medical, psychological and immune testing, doctors judged that he was suitable for a transplant of both hands. Donor hands are rare and have to match closely, so he waited 13 months.",
      "In January 2026 the family of a 50-year-old woman who had died in Surat agreed to donate her organs. Her lungs, liver and corneas went to patients in Mumbai and Surat, and her hands to him. Teams in Gujarat and Maharashtra worked together to bring the hands to Mumbai in the short time available.",
      "The operation took place overnight on 9 to 10 January 2026, led by Dr Nilesh Satbhai, Director of Plastic, Reconstructive Microsurgery and Hand Transplantation. Over 13 hours the team fixed the bones, joined the arteries and veins, repaired the tendons, connected the nerves and closed the skin. Blood flowed into both hands as soon as the vessels were joined.",
      "Afterwards he was cared for by a team that managed medicine to stop rejection, watched the blood supply closely, prevented infection and started rehabilitation early. It was the first bilateral hand transplant at Nanavati Max.",
      "A hand transplant is harder than an organ transplant, because it moves skin, muscle, tendon, bone, vessels and nerves together, and skin is very likely to be rejected. When it works, it can bring back feeling and coordinated movement that a prosthetic hand cannot.",
      "If you or someone in your family has lost a hand or arm, send us the medical reports. A specialist will tell you whether a transplant or reconstruction could help.",
    ],
    picture: {
      src: "/photos/blog/hand-transplant-team.jpg",
      alt: "The patient with the doctors, nurses and staff of Nanavati Max Super Speciality Hospital who cared for him",
      pending: false,
    },
    sources: [
      {
        label: "Max Healthcare: Bilateral hand transplantation from female donor to male recipient",
        href: "https://www.maxhealthcare.in/rare-case/bilateral-hand-transplantation-from-female-donor-to-male-recipient",
      },
    ],
    treatments: ["hand-transplant"],
    hospitals: ["nanavati-max"],
  },
  {
    slug: "thumb-reconstruction-toddler-nanavati-max",
    title: "Born without a thumb: how surgeons rebuilt a toddler's grip",
    date: "2026-10-05",
    category: "cases",
    author: "Medsafar",
    summary:
      "A baby girl born with severe thumb deformities on both hands can now grip and hold, after two operations at Nanavati Max Super Speciality Hospital, Mumbai.",
    body: [
      "A little girl was born without a left thumb, and with a right thumb too underdeveloped to use. Without working thumbs, a child struggles to learn to grasp, pinch and hold things.",
      "Dr Nilesh G Satbhai, Director of Plastic, Reconstructive Microsurgery and Hand Transplantation, and his team planned two operations. Her blood vessels and nerves were tiny, which made the work delicate, and because both hands were affected, both operations had to succeed.",
      "The first operation, in December 2025, steadied the weak right thumb and moved a muscle from her palm so the thumb could turn and touch the other fingers. Within weeks she began to use it.",
      "The second, in February 2026, built a new left thumb by moving the second toe from her left foot to her hand and joining its blood vessels, nerves and tendons under the microscope. The surgeons also rebuilt the foot so it would keep working normally.",
      "At 13 months old she can hold her parents' fingers. Surgery like this works best early, while a child is still learning to use their hands.",
      "If your child was born with a hand difference, send us photos and any reports. A specialist will advise what can be done and when.",
    ],
    sources: [
      {
        label: "mid-day: report by Ritika Gondhalekar",
        href: "https://www.instagram.com/p/DXJfKjAjLAs/",
      },
      {
        label: "Nanavati Max Super Speciality Hospital on Instagram",
        href: "https://www.instagram.com/reel/DXx4Q4ylXSA/",
      },
    ],
    treatments: [],
    hospitals: ["nanavati-max"],
  },
];
