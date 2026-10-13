import type { Questionnaire, QuestionnaireText } from "./types";

/**
 * Short questionnaires a patient can fill before a surgeon looks at the case.
 * The answers arrive as an enquiry, written into its notes, so the case
 * manager has them before the first call.
 *
 * Question ids are stable: they label the answers in the enquiry.
 */

export const questionnaireText: QuestionnaireText = {
  eyebrow: "Questionnaire",
  list: {
    meta: {
      title: "Surgery questionnaires. Medsafar India.",
      description:
        "Answer a few questions before a surgeon looks at your case. Free, and it takes about three minutes.",
    },
    heading: "Answer a few questions first",
    intro:
      "A surgeon reads your answers before the first call, so the advice you get fits your case. It takes about three minutes.",
    open: "Start the questionnaire",
    back: "All questionnaires",
  },
  optional: "optional",
  contact: {
    heading: "Where should we send the answer?",
    intro: "A case manager replies on WhatsApp or by call, with what the surgeon thinks.",
  },
  submit: "Send my answers",
  done: {
    heading: "Thank you. We have your answers.",
    body: "A Medsafar case manager will contact you once a surgeon has read them.",
    again: "Back to the home page",
  },
  errors: {
    required: "Please answer every question that is not marked optional.",
  },
  note: "Your answers are used only to plan your care. They are not a diagnosis: the surgeon decides what is right for you after reading your reports and examining you.",
};

export const questionnaires: Questionnaire[] = [
  {
    slug: "weight-loss-surgery",
    speciality: "bariatric-surgery",
    treatment: "Weight loss surgery",
    meta: {
      title: "Weight loss surgery questionnaire. Medsafar India.",
      description:
        "Find out whether weight loss surgery may suit you. Answer a few questions and a surgeon in India reads them for free.",
    },
    card: {
      title: "Weight loss surgery questionnaire",
      body: "Your height, weight and health in a few questions, so the surgeon can tell you whether surgery may suit you.",
    },
    heading: "Weight loss surgery questionnaire",
    intro:
      "Tell us about your weight and health. A bariatric surgeon at a partner hospital reads your answers and tells you whether surgery may suit you.",
    bmi: {
      height: "height",
      weight: "weight",
      label: "Your BMI",
      note: "BMI is a rough guide. Surgeons usually consider weight loss surgery from a BMI of about 35, or lower for some people with type 2 diabetes. The surgeon decides for your case.",
    },
    sections: [
      {
        heading: "About you",
        questions: [
          { id: "height", kind: "number", label: "Height", unit: "cm", min: 120, max: 230 },
          { id: "weight", kind: "number", label: "Weight", unit: "kg", min: 40, max: 350 },
          { id: "age", kind: "number", label: "Age", unit: "years", min: 16, max: 80 },
          { id: "sex", kind: "choice", label: "Sex", options: ["Female", "Male"] },
        ],
      },
      {
        heading: "Your health",
        questions: [
          {
            id: "conditions",
            kind: "multi",
            label: "Do you have any of these?",
            options: [
              "Type 2 diabetes",
              "High blood pressure",
              "Sleep apnoea or heavy snoring",
              "Joint or back pain",
              "High cholesterol",
              "Heart disease",
              "None of these",
            ],
          },
          {
            id: "tried",
            kind: "multi",
            label: "What have you tried to lose weight?",
            options: [
              "Diet plans",
              "An exercise programme",
              "Weight loss medicines or injections",
              "Weight loss surgery before",
              "Nothing yet",
            ],
          },
          { id: "smoking", kind: "choice", label: "Do you smoke?", options: ["No", "Yes", "I have stopped"] },
          {
            id: "medicines",
            kind: "text",
            label: "Medicines you take every day",
            placeholder: "Names and doses, if you know them",
            optional: true,
          },
        ],
      },
      {
        heading: "What you are looking for",
        questions: [
          {
            id: "interest",
            kind: "choice",
            label: "Is there an operation you have in mind?",
            options: ["Gastric sleeve", "Gastric bypass", "Not sure, I would like advice"],
          },
          {
            id: "notes",
            kind: "text",
            label: "Anything else the surgeon should know",
            placeholder: "Earlier operations, other health problems, questions",
            optional: true,
          },
        ],
      },
    ],
  },
  {
    slug: "cosmetic-surgery",
    speciality: "cosmetic-plastic-surgery",
    treatment: "Plastic, reconstructive and cosmetic surgery",
    meta: {
      title: "Cosmetic surgery questionnaire. Medsafar India.",
      description:
        "Tell a plastic surgeon in India what you would like to change. Answer a few questions and get free advice for your case.",
    },
    card: {
      title: "Cosmetic surgery questionnaire",
      body: "What you would like to change and a little about your health, so the surgeon can advise before you travel.",
    },
    heading: "Cosmetic surgery questionnaire",
    intro:
      "Tell us what you would like to change and a little about your health. A plastic surgeon at a partner hospital reads your answers and advises on what is possible.",
    sections: [
      {
        heading: "What you would like",
        questions: [
          {
            id: "area",
            kind: "multi",
            label: "Which areas are you thinking about?",
            options: [
              "Face, eyelids or brow",
              "Nose",
              "Breasts",
              "Tummy",
              "Liposuction or body contouring",
              "Hair transplant",
              "Something else",
            ],
          },
          {
            id: "goal",
            kind: "text",
            label: "In a few words, what would you like to change?",
            placeholder: "For example: a smaller nose with a straighter bridge",
          },
          {
            id: "before",
            kind: "choice",
            label: "Have you had cosmetic surgery before?",
            options: ["No", "Yes"],
          },
        ],
      },
      {
        heading: "Your health",
        questions: [
          { id: "age", kind: "number", label: "Age", unit: "years", min: 18, max: 85 },
          { id: "height", kind: "number", label: "Height", unit: "cm", min: 120, max: 230 },
          { id: "weight", kind: "number", label: "Weight", unit: "kg", min: 35, max: 250 },
          {
            id: "conditions",
            kind: "multi",
            label: "Do you have any of these?",
            options: [
              "Diabetes",
              "High blood pressure",
              "A bleeding or clotting problem",
              "Heart disease",
              "None of these",
            ],
          },
          { id: "smoking", kind: "choice", label: "Do you smoke?", options: ["No", "Yes", "I have stopped"] },
          {
            id: "pregnancy",
            kind: "choice",
            label: "Are you pregnant, breastfeeding or planning a pregnancy in the next year?",
            options: ["No", "Yes", "Does not apply"],
          },
          {
            id: "medicines",
            kind: "text",
            label: "Medicines you take every day",
            placeholder: "Names and doses, if you know them",
            optional: true,
          },
        ],
      },
      {
        heading: "Your trip",
        questions: [
          {
            id: "stay",
            kind: "choice",
            label: "How long could you stay in India?",
            options: ["Up to a week", "1 to 2 weeks", "2 to 3 weeks", "More than 3 weeks"],
          },
        ],
      },
    ],
  },
];

export function getQuestionnaire(slug: string): Questionnaire | null {
  return questionnaires.find((q) => q.slug === slug) ?? null;
}

export function questionnaireFor(speciality: string): Questionnaire | null {
  return questionnaires.find((q) => q.speciality === speciality) ?? null;
}
