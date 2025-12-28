// Multilingual survey questions for MedInsights 2026
export const survey = {
  survey_id: "MedInsights2026",
  version: "1.0",
  autosave_interval_seconds: 15,
  questions: [
    {
      id: "Q01",
      type: "likert_1_7",
      mandatory: true,
      question_text: {
        en: "I trust that biosimilars are as effective as original biologics.",
        sk: "Dôverujem tomu, že biosimilárne lieky sú rovnako účinné ako originálne biologiká."
      },
      scale: {
        min: 1,
        max: 7,
        labels: {
          en: { "1": "Strongly disagree", "7": "Strongly agree" },
          sk: { "1": "Úplne nesúhlasím", "7": "Úplne súhlasím" }
        }
      },
      response: null
    },
    {
      id: "Q02",
      type: "Áno_Nie_Neviem",
      mandatory: true,
      question_text: {
        en: "Are you familiar with the concept of indication extrapolation?",
        sk: "Poznáte pojem extrapolácia indikácií?"
      },
      options: [
        { value: "yes", label: { en: "Yes", sk: "Áno" } },
        { value: "no", label: { en: "No", sk: "Nie" } },
        { value: "not_sure", label: { en: "Not sure", sk: "Neviem" } }
      ],
      response: null
    },
    {
      id: "Q03",
      type: "slider_1_10",
      mandatory: true,
      question_text: {
        en: "How much does the patient co-payment influence your decision to switch to a biosimilar medicine?",
        sk: "Ako veľmi ovplyvňuje výška doplatku pacienta vaše rozhodnutie prejsť na biosimilárny liek?"
      },
      scale: {
        min: 1,
        max: 10,
        min_label: { en: "Does not influence at all", sk: "vôbec neovplyvňuje rozhodovanie" },
        max_label: { en: "Strongly influences", sk: "silne ovplyvňuje rozhodovanie" }
      },
      control: "slider",
      response: null
    },
    {
      id: "Q04",
      type: "open_text",
      mandatory: false,
      question_text: {
        en: "What barriers do you observe when switching patients to biosimilars?",
        sk: "Aké bariéry vnímate pri prechode pacientov na biosimilárne lieky?"
      },
      constraints: {
        min_characters: 20
      },
      response: null
    }
  ]
};
