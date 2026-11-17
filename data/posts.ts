import type { Post, PostCategory } from "@/content/types";

/**
 * Blog posts. The starting point: changes made in /admin are laid over
 * these (lib/content.ts), so an edit there wins over this file.
 * Read them through lib/catalog.ts, never directly.
 *
 * Every post is written in Med Safar's own words, from the sources it lists:
 * the facts come from the source, the telling is ours. Patients are not named.
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
    title: "Double hand transplant in India: how an 18-year-old got both hands back",
    date: "2026-10-05",
    category: "cases",
    author: "Med Safar",
    summary:
      "A double hand transplant is a rare and complex operation. This is how a team in Mumbai did one for a young farmer, and what a patient from abroad should know before asking about it.",
    body: [
      "At Med Safar, people who have lost a hand or an arm ask us two things: is a hand transplant really done in India, and what does it involve? A case from January 2026 at Nanavati Max Super Speciality Hospital in Mumbai, one of the hospitals we work with, answers both.",
      "The patient was 18, the son of a farmer in Gujarat. In January 2024, farm machinery crushed both of his hands. The injury was too severe to repair, and both hands were amputated.",
      "Who can have a hand transplant? Not everyone who has lost a hand. Doctors first check the patient's body, immune system and state of mind, because new hands mean medicine every day and months of therapy. He was found suitable. Then came the wait: donor hands are rare and have to match closely. His wait lasted 13 months.",
      "The match came in January 2026. The family of a 50-year-old woman who had died in Surat agreed to donate her organs. Her lungs, liver and corneas went to patients in Mumbai and Surat, and her hands went to him. Teams in Gujarat and Maharashtra worked together to bring the hands to Mumbai in the short time in which they can be used.",
      "The surgery ran through the night of 9 to 10 January 2026 and took 13 hours. Dr Nilesh Satbhai, Director of Plastic, Reconstructive Microsurgery and Hand Transplantation, led it. Step by step, the team fixed the bones, joined the arteries and veins, repaired the tendons, connected the nerves and closed the skin. Blood flowed into both hands as soon as the vessels were joined. It was the first double (bilateral) hand transplant at Nanavati Max.",
      "Why is a hand transplant harder than an organ transplant? A hand is not one kind of tissue. Skin, muscle, tendon, bone, blood vessels and nerves are all moved together, and skin is the tissue the body is most likely to reject. So the care after the operation counts as much as the operation: medicine to stop rejection, a close watch on the blood supply, protection from infection, and rehabilitation that starts early.",
      "What can a transplanted hand do that a prosthetic hand cannot? When it works, it can bring back feeling and coordinated movement. Simple movements usually start within weeks. Feeling and finer control come back slowly, over one to two years, as the nerves grow.",
      "If you are thinking of travelling to India for this, plan for a long stay: usually about 3 to 4 weeks in hospital, then about 3 to 6 months in India for daily hand therapy. A suitable donor has to be found, so there is usually a waiting period, and the anti-rejection medicine is for life.",
      "If you or someone in your family has lost a hand or an arm, send us the medical reports. We will put them in front of a hand surgeon, who will tell you whether a transplant or a reconstruction could help. The opinion is free.",
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
    title: "Born without a thumb: how toe-to-thumb surgery in India gave a toddler her grip",
    date: "2026-10-05",
    category: "cases",
    author: "Med Safar",
    summary:
      "A girl born without a working thumb on either hand can now grip and hold, after two operations in Mumbai. Here is what the surgeons did, and why parents should ask about surgery early.",
    body: [
      "Parents write to Med Safar about children born with a missing or very small thumb, and the first question is always the same: can it be put right? This case from Nanavati Max Super Speciality Hospital in Mumbai, one of the hospitals we work with, shows what can be done.",
      "A little girl was born with no thumb on her left hand, and a right thumb too underdeveloped to use. Without a working thumb, a child struggles to learn to grasp, pinch and hold things.",
      "Dr Nilesh G Satbhai, Director of Plastic, Reconstructive Microsurgery and Hand Transplantation, and his team planned two operations, one for each hand. Two things made the work delicate. A baby's blood vessels and nerves are tiny. And because both hands were affected, both operations had to succeed.",
      "The right hand came first, in December 2025. The surgeons steadied the weak thumb and moved a muscle from her palm, so the thumb could turn and touch the other fingers. Within weeks she began to use it.",
      "The left hand followed in February 2026. There was no thumb to repair, so the team built one, in an operation known as a toe-to-thumb transfer. They moved the second toe of her left foot to her hand and joined its blood vessels, nerves and tendons under the microscope. They also rebuilt the foot, so it keeps working normally.",
      "At 13 months old, she can hold her parents' fingers.",
      "Timing matters. Surgery like this works best early, while a child is still learning to use their hands. If your child was born with a hand difference, it is worth asking a specialist sooner rather than later.",
      "Send us photos of your child's hands and any reports you have. We will show them to a hand surgeon, who will advise what can be done and when. The opinion is free.",
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
