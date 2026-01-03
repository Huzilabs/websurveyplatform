"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "../../lib/supabaseClient";

// Complete questionnaire with all 29 biosimilar questions
const questionnaire = [
 
  {
    section: "I. DEMOGRAFICKÁ ČASŤ",
    introduction:
      "Cieľom tohto marketingového prieskumu je získať dôkladný prehľad o znalostiach, aktuálnych postojoch a skúsenostiach reumatológov,  endokrinológov, a osteológov s biosimilármi.Dotazník je anonymný a výsledky budú použité výhradne v súhrnnej podobe za celé vyhodnocované teritórium",
    questions: [
      {
        id: "age",
        text: "Vek respondenta",
        type: "single",
        options: ["do 35", "36–45", "46–55", "56+"],
        coding: [1, 2, 3, 4],
      },
      {
        id: "gender",
        text: "Pohlavie",
        type: "single",
        options: ["Muž", "Žena"],
        coding: [1, 2],
      },
      {
        id: "practice_years",
        text: "Dĺžka odbornej praxe",
        type: "single",
        options: ["do 5 rokov", "6–10", "11–20", "21+"],
        coding: [1, 2, 3, 4],
      },
      {
        id: "workplace_type",
        text: "Typ pracoviska",
        type: "single_open",
        options: ["Nemocnica/Ústavná starostlivosť", "Ambulancia", "Iné"],
        coding: [1, 2, 3],
      },
      {
        id: "region",
        text: "Kraj pôsobenia",
        type: "single",
        options: ["BA", "NT", "TT", "ZA", "BB", "PO", "KE", "ZV"],
        coding: [1, 2, 3, 4, 5, 6, 7, 8],
      },
      {
        id: "specialization",
        text: "Špecializácia",
        type: "single",
        options: [
          "Reumatológ",
          "Osteológ",
          "Endokrinológ",
          "Onkológ",
          "Ortopéd",
        ],
        coding: [1, 2, 3, 4, 5],
      },
    ],
  },
  {
    section: "II. VEDOMOSTI A POVEDOMIE O BIOSIMILÁRNYCH LIEKOCH",
    introduction:
      "V tejto časti sa chceme dozvedieť o Vašom povedomí o biosimilárnych liekoch, ktoré  sú biologickými liekmi vysoko podobnými s originálnym referenčným liekom. Prešli prísnym procesom schvaľovania Európskou liekovou agentúrou (EMA), ktorý potvrdzuje ich kvalitu, účinnosť a bezpečnosť. Ich vývoj je postavený na dôkaze farmakokinetickej a farmakodynamickej podobnosti s originálnym liekom, ktorý sa dokazuje v klinických štúdiách fázy 1, a následne sa potvrdzuje v klinickej štúdii fázy 3, že účinnosť a bezpečnosť je podobná originálnemu biologiku.",
    questions: [
      {
        id: "q1_trust_expert",
        text: "Do akej miery sa v súčasnosti  považujete za dostatočne informovaného o biosimilárnych liekoch?",
        type: "likert",
        options: [
          "Vôbec nie",
          "Skôr nie",
          "Neutrálne",
          "Skôr áno",
          "Veľmi dobre",
        ],
        coding: [1, 2, 3, 4, 5],
      },
      {
        id: "q2_communication_form",
        text: "Aké sú v súčasnosti Vaše hlavné zdroje informácií o  biosimilárnych liekoch? ",
        type: "multi",
        options: [
          "Kolegovia",
          "Konferencie",
          "Farmaceutické spoločnosti",
          "Odborná literatúra",
          "Online",
          "Iné",
        ],
        coding: [1, 2, 3, 4, 5, 6],
      },
      {
        id: "q3_better_orientation",
        text: "Čo by Vám pomohlo lepšie sa orientovať v oblasti biosimilárnych liekov?",
        type: "open",
      },
      {
        id: "q4_communication_form",
        text: "Aká forma komunikácie by Vám pomohla získať dôveru v biosimilárne lieky?",
        type: "open",
      },
    ],
  },
  {
    section: "III. VNÍMANIE ÚČINNOSTI A BEZPEČNOSTI",
    introduction:
      "V tejto časti sa chceme dozvedieť o Vašom vnímaní účinnosti a bezpečnosti biosimilárnych liekoch, ktoré sú porovnateľné s originálnymi liekmi. Tieto lieky sú dôkladne testované v klinických štúdiách a podliehajú rovnakej kontrole bezpečnosti ako lieky originálne.",
    questions: [
      {
        id: "q5_effectiveness_rating",
        text: "Ako celkovo hodnotíte účinnosť biosimilárnych liekov v porovnaní s originálnymi liekmi?",
        type: "likert",
        options: [
          "Nižšia",
          "Porovnateľná",
          "Vyššia",
          "Neviem posúdiť",
        ],
        coding: [1, 2, 3, 4],
      },
      {
        id: "q6_safety_rating",
        text: "Ako hodnotíte bezpečnosť biosimilárnych liekov  v porovnaní s originálmi?",
        type: "likert",
        options: [
         "Nižšia",
          "Porovnateľná",
          "Vyššia",
          "Neviem posúdiť",
        ],
        coding: [1, 2, 3, 4],
      },
      {
        id: "q7_side_effects_risk",
        text: "Ako hodnotíte riziko nežiaducich účinkov u biosimilárnych liekov v porovnaní s originálmi?",
        type: "likert",
        options: [
          "Výrazne vyššie",
          "Mierne vyššie",
          "Rovnaké",
          "Mierne nižšie",
          "Výrazne nižšie"
        ],
        coding: [1, 2, 3, 4, 5],
      },
      {
        id: "q8_safety_support",
        text: "Čo by podporilo Vašu dôveru v bezpečnosť biosimilárnych liekov?",
        type: "open",
      },
    ],
  },
  {
    section: "IV. SKÚSENOSTI S POUŽÍVANÍM",
    introduction:
      "V tejto časti sa chceme dozvedieť o Vašich skúsenostiach s biosimilárnymi liekmi v praxi. V klinickej praxi je k dispozícii už viac ako 100 rôznych biosimilárnych liekov a začali sa používať v EU už v roku 2006. Posledných 20 rokov používania v klinickej praxi potvrdzuje ich efektívnosť a bezpečnosť.",
    questions: [
      {
        id: "q9_use_biosimilars",
        text: "Používate vo svojej praxi biosimilárne lieky?",
        type: "single",
        options: ["Áno", "Nie"],
        coding: [1, 2],
      },
      {
        id: "q10_diagnoses_usage",
        text: "Ak áno, pri ktorých diagnózach alebo liečbe ich využívate najčastejšie?",
        type: "open",
      },
      {
        id: "q11_barriers_usage",
        text: "Ak nie, čo Vám bráni v ich využívaní?",
        type: "open",
      },
      {
        id: "q12_prescribe_frequency",
        text: "Ako často predpisujete biosimilárny liek namiesto originálu?",
        type: "likert",
        options: [
          "Vždy",
          "Často",
          "Zriedka",
          "Nikdy",
        ],
        coding: [1, 2, 3, 4],
      },
      {
        id: "q13_prescription_reason",
        text: "Ak predpisujete biosimilárny liek, čo je vaším hlavným motívom pre rozhodnutie?",
        type: "multi",
        options: [
          "Nižšia cena",
          "Dostupnosť v distribučnej sieti",
          "Guideliny / Odborné odporúčania",
          "Preferencia pacienta",
          "Skúsenosť kolegov",
          "Lieková forma",
          "Iné"
        ],
        coding: [1, 2, 3, 4, 5, 6, 7],
      },
    ],
  },
  {
    section: "V. SWITCHING (PRECHOD Z ORIGINÁLU NA BIOSIMILÁRNY LIEK)",
    introduction:
      "V tejto časti sa preto chceme dozvedieť o Vašich osobných skúsenostiach pri prechode z originálneho lieku na biosimilárny liek a Vašej následnej komunikácii s pacientom. Doterajšie dáta potvrdzujú, že switch nemá negatívny vplyv na účinnosť ani bezpečnosť liečby.",
    questions: [
      {
        id: "q14_patient_transition",
        text: "Ako vnímate prechod pacienta z originálneho lieku na biosimilárny liek?",
        type: "likert",
        options: [
          "Veľmi negatívne",
          "Negatívne,",
          "Neutrálne,",
          "Pozitívne,",
          "Veľmi pozitívne",
        ],
        coding: [1, 2, 3, 4, 5],
      },
      {
        id: "q15_original_response_influence",
        text: "Ak pacient dobre reaguje na originál, aký je váš postoj k prechodu na biosimilárny liek?",
        type: "single",
        options: [
          "Odporúčam vždy",
          "Zvážim pri ekonomickej potrebe",
          "Neodporúčam",
          "Závisí od pacienta",
        ],
        coding: [1, 2, 3, 4],
      },
      {
        id: "q16_switching_motivators",
        text: "Ktoré faktory by vás motivovali k switching-u u stabilného pacienta? (možnosť voľby viacerých odpovedí)",
        type: "multi",
        options: [
          "Úspora nákladov",
          "Tlak poisťovní na finančnú efektivitu",
          "Dostupné dáta",
          "Preferencia pacienta",
          "Logistika",
          "Iné",
        ],
        coding: [1, 2, 3, 4, 5, 6],
      },
      {
        id: "q17_transition_conditions",
        text: "Aké podmienky by ste považovali za nevyhnutné na switch pacienta?",
        type: "open",
      },
      {
  id: "q_v7_1",
  text: "Ako zvyčajne predstavíte pacientovi zmenu liečby?",
  type: "open"
}
    ],
  },
  {
    section: "VI. KOMUNIKÁCIA S PACIENTAMI",
    introduction:
      "V tejto časti sa chceme dozvedieť o Vašich skúsenostiach s transparentnou komunikáciou o biosimilárnych liekoch. Napríklad finančná spoluúčasť pacientov môže byť jedným z najvýznamnejších faktorov, ktoré ovplyvňujú prijatie biosimilárnych liekov a ochotu prejsť z originálneho lieku na biosimilár.Z dát vieme, že pacienti často dôverujú odporúčaniu svojho lekára viac než samotnej značke lieku.  ",
    questions: [
      {
        id: "q18_patient_presentation",
        text: "Ako často diskutujete s pacientmi o pôvode liekov (originál vs. biosimilárny liek)?",
         type: "single",
        options: [
          "Vždy",
          "Väčšinou",
          "Len pri otázke pacienta",
          "Nikdy",
         
        ],
        coding: [1, 2, 3, 4],
      },
      {
        id: "q19_discuss_origin_frequency",
        text: "Podľa vašich doterajších skúseností, čo je najdôležitejšia informácia z pohľadu pacienta pri vysvetľovaní výhod biosimilárneho lieku?",
        type: "single",
        options: ["Účinnosť liečby", "Bezpečnosť liečby", "Cena/Doplatok", "Riziko nežiadúcich účinkov", "Regulácia", "Iné"],
        coding: [1, 2, 3, 4, 5, 6],
      },
      {
        id: "q20_prescription_barriers",
        text: "Ak je rozdiel v doplatku pacienta za originálny liek a biosimilárny liek (biosimilárny liek má plnú úhradu, originál doplatok pacienta), aká je hranica kedy pacient už nie je zvyčajne ochotný doplácať na mesačnú liečbu?",
        type: "single",
        options: [
          "0 - 2 EUR",
          "3 - 5 EUR",
          "6 - 10 EUR",
          "10-20 EUR",
        ],
        coding: [1, 2, 3, 4],
      },
      {
  id: "q_v6_1",
  text: "Do akej miery podľa Vás ovplyvňuje senzitívnosť pacientov na výšku doplatku ochotu prejsť na biosimilárny liek (switch)?",
  type: "likert",
  options: [
    "Neovplyvňuje vôbec",
    "Slabo ovplyvňuje",
    "Stredne ovplyvňuje",
    "Výrazne ovplyvňuje",
    "Veľmi výrazne ovplyvňuje"
  ],
  coding: [1, 2, 3, 4, 5]
},
{
  id: "q_v6_2",
  text: "Máte osobnú skúsenosť, že Váš pacient odmietol biosimilárny liek zo subjektívnych obáv?",
  type: "single",
  options: ["Áno", "Nie"],
  coding: [1, 2]
},
{
  id: "q_v6_3",
  text: "Čo by Vám pomohlo uľahčiť komunikáciu s pacientom o biosimilárnych liekoch?",
  type: "open"
}
    ],
  },
  {
    section: "VII. Postoje k predpisovaniu biosimilárnych liekov",
    introduction:
      "V tejto časti sa chceme dozvedieť o rozhodovaní o predpise biosimilárnych liekov s cieľom udržať rovnaký terapeutický efekt pri nižších nákladoch. Rovnako nás zaujíma Váš postoj k faktu, že  Biosimilárne lieky sú vyvíjané 10–15 rokov po originálnych biologikách, a preto môžu využívať modernejšie výrobné postupy, lepšie analytické metódy a aktuálne vedecké poznatky, pričom ich účinnosť a bezpečnosť sú potvrdené klinickými štúdiami a schválením EMA.",
    questions: [
      {
        id: "q21_indication_experience",
        text: "Ste otvorený k predpisovaniu biosimilárnych liekov?",
       type: "likert",
  options: [
   "Určite nie",
          "Skôr nie",
          "Hodnotím to neutrálne",
          "Skôr áno",
          "Určite áno",
  ],
  coding: [1, 2, 3, 4, 5]
      },
      {
        id: "q22_transition_advantages",
        text: "V čom vidíte výhodu originálneho biologika v porovnaní s biosimilárnym liekom, ktorý je vyrábaný novšími technológiami a skúmaný na základe modernejších poznatkov?",
        type: "single",
        options: [
   "Nevidím žiadnu výhodu originálneho biologika",
          "Malé výhody originálu",
          "Stredné výhody originálu",
          "Výrazné výhody originálu",
          "Veľmi výrazné výhody originálu",
  ],
  coding: [1, 2, 3, 4, 5]
      },
      {
        id: "q23_patient_decision_factors",
        text: "V čom vidíte výhodu originálneho biologika v porovnaní s biosimilárnym liekom, ktorý je vyrábaný novšími technológiami a skúmaný na základe modernejších poznatkov?",
        type: "open",
      },
      {
        id: "q24_info_accuracy_rating",
        text: "Čo by Vám pomohlo lepšie porozumieť rozdielom medzi originálnymi biologikami a biosimilármi?",
        type: "open",
        
      },
    ],
  },
   {
    section: "VIII. REGULÁCIA A SCHVAĽOVANIE",
    introduction:
      "V tejto časti sa chceme dozvedieť o Vašom povedomí o regulácií a schvaľovaní biosimilárnych liekov. Každý biosimilárny liek musí preukázať farmaceutickú kvalitu, biologickú podobnosť a klinickú účinnosť. EMA aj ŠÚKL dôsledne hodnotia každý liek pred uvedením na trh. Zároveň EMA povoľuje tzv. extrapoláciu indikácií – ak biosimilárny liek preukáže porovnateľnú účinnosť a bezpečnosť v jednej kľúčovej indikácii, môže byť schválený aj pre ostatné indikácie originálneho lieku. Tento proces je prísne regulovaný a opiera sa o kompletný súbor dát o podobnosti.",
    questions: [
      {
        id: "q_v2_1",
        text: "Ste dostatočne oboznámený/á s procesom schvaľovania biosimilárnych liekov zo strany EMA?",
        type: "single",
        options: ["Áno", "Nie"],
        coding: [1, 2],
      },
      {
        id: "q_v2_2",
        text: "Je vám známy termín extrapolácia indikácií zo strany EMA?",
        type: "likert",
        options: [
          "Vôbec nepoznám",
          "Okrajovo som už počul/a",
          "Poznám základ",
          "Dobre sa orientujem",
          "Som plne oboznámený/á s princípom",
        ],
        coding: [1, 2, 3, 4, 5],
      },
      {
        id: "q_v2_3",
        text: "Aké informácie o procese extrapolácie by Vám najviac pomohli pri rozhodovaní o použití biosimilárneho lieku?",
        type: "open",
      },
      {
        id: "q_v2_4",
        text: "Privítali by ste viac informácií o regulačných požiadavkách pri schvaľovaní biosimilárnych liekov?",
        type: "open",
      },
    ],
  },
  {
    section: "IX. EKONOMICKÉ A DOSTUPNOSTNÉ FAKTORY",
    introduction:
      "V tejto časti sa chceme dozvedieť o Vašom povedomí o ekonomických a dostupnostných faktoroch súvisiacich s používaním biosimilárnych liekov. Biosimilárne lieky pri vstupe na trh znižujú cenu liečby približne o 25 %, čím znižujú celkové náklady zdravotného systému a umožňujú širší prístup pacientov k liečbe. Ich využívanie zároveň podporuje dlhodobú udržateľnosť zdravotnej starostlivosti.",
    questions: [
      {
        id: "q_v3_1",
        text: "Považujete biosimilárne lieky za nákladovo efektívne riešenie?",
        type: "likert",
        options: [
          "Určite nie",
          "Skôr nie",
          "Hodnotím to neutrálne",
          "Skôr áno",
          "Určite áno",
        ],
        coding: [1, 2, 3, 4, 5],
      },
      {
        id: "q_v3_2",
        text: "Čo by podľa vášho názoru pomohlo zlepšiť využívanie biosimilárnych liekov vo Vašej praxi?",
        type: "open",
      },
    ],
  },
  {
    section: "X. EDUKÁCIA A PODPORA",
    introduction:
      "V tejto časti sa chceme dozvedieť o Vašich postojoch k edukácii a odbornej podpore zo strany výrobcov liekov. Veríme, že systematické vzdelávanie lekárov, dostupnosť vedeckých dát a zdieľanie klinických skúseností sú kľúčové pre posilnenie dôvery v biosimilárne lieky a ich racionálne využívanie v klinickej praxi.",
    questions: [
      {
        id: "q_v4_1",
        text: "Máte záujem o ďalšie vzdelávanie v oblasti vedeckých informácií o biosimilárnych liekoch?",
        type: "likert",
        options: ["Určite nie", "Skôr nie", "Skôr áno", "Určite áno"],
        coding: [1, 2, 3, 4],
      },
      {
        id: "q_v4_2",
        text: "Ktoré témy by mali byť prioritou vo vzdelávaní? (maximálne 3 odpovede)",
        type: "multi",
        options: [
          "Účinnosť",
          "Bezpečnosť",
          "Switching",
          "Právo a regulácia",
          "Komunikácia s pacientom",
          "Farmakovigilancia",
          "Iné",
        ],
        coding: [1, 2, 3, 4, 5, 6, 7],
        maxSelections: 3,
      },
      {
        id: "q_v4_3",
        text: "Aká forma vzdelávania by Vám najviac vyhovovala?",
        type: "open",
      },
    ],
  },  
  {
    section: "XI. ODPORÚČANIA A NÁVRHY",
    introduction:
      "V tejto časti sa chceme dozvedieť Vaše návrhy a odporúčania, ktoré by nám pomohli formovať budúce stratégie komunikácie, edukácie a odbornej podpory v oblasti informovanosti o biosimilárnych liekoch.",
    questions: [
      {  
        id: "q_v5_1",
        text: "Aké kroky by mali výrobcovia alebo odborné spoločnosti podniknúť na zvýšenie kvality informovanosti o biosimilárnych liekoch?",
        type: "open",     
      },
    ],
  },
];

export default function QuestionnairePage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [autosaveTime, setAutosaveTime] = useState<Date | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [timestamp, setTimestamp] = useState<string | null>(null);
  // Simulated physician profile and contract status
  const [profileComplete, setProfileComplete] = useState(true); // TODO: Replace with real logic
  const [contractApproved, setContractApproved] = useState(true); // TODO: Replace with real logic

  // Load respondent info and contractId from localStorage
  const [respondent, setRespondent] = useState<any>(null);
  const [contractId, setContractId] = useState<string | null>(null);
  const [missingData, setMissingData] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    const stored = window.localStorage.getItem("contractorData");
    if (stored) {
      const parsed = JSON.parse(stored);
      setRespondent(parsed);
      setContractId(parsed.contractId || null);
    } else {
      setMissingData(true);
    }
    setIsLoaded(true);
  }, []);

  // Access control
  useEffect(() => {
    if (!isLoaded) return;
    if (missingData) return;
    if (!respondent || !contractId) return;
    if (!profileComplete) {
      router.replace("/personal-data");
      return;
    }
    // Check contract table for approval status and questionnaire submission status
    const checkContractApproval = async () => {
      try {
        const { data: contract, error } = await supabase
          .from("contracts")
          .select("contract_approved, questionnaire_status, submitted_at")
          .eq("id", contractId)
          .single();

        if (error) {
          console.error("Error checking contract approval:", error);
          return;
        }

        console.log("Contract approval status:", contract?.contract_approved);
        console.log("Questionnaire status:", contract?.questionnaire_status);

        // Check if questionnaire is already submitted
        if (contract && contract.questionnaire_status === "submitted") {
          console.log(
            "Questionnaire already submitted, redirecting to confirmation page"
          );
          router.replace("/questionnaire/confirmation");
          return;
        }

        if (contract && contract.contract_approved !== true) {
          console.log(
            "Contract not approved (value:",
            contract.contract_approved,
            "), redirecting to contract page"
          );
          router.replace("/contract");
        } else {
          console.log("Contract approved, staying on questionnaire page");
          setCheckingAccess(false); // Allow questionnaire to show
        }
      } catch (error) {
        console.error("Unexpected error checking contract approval:", error);
      }
    };
    checkContractApproval();
  }, [respondent, contractId, profileComplete, router, missingData, isLoaded]);

  // Helper: Map answers to columns for Supabase
const mapAnswersToColumns = (answers: Record<string, string | string[]>) => {
  const columns: Record<string, any> = {};

  for (const section of questionnaire) {
    for (const q of section.questions) {
      const value = answers[q.id];

      // Check if question has "Iné" option
      const hasIne = Array.isArray(q.options) && q.options.includes("Iné");

      // MULTI questions → always send as array
      if (q.type === "multi") {
        if (Array.isArray(value)) {
          columns[q.id] = value;
        } else if (typeof value === "string" && value) {
          columns[q.id] = [value];
        } else {
          columns[q.id] = [];
        }
        console.log(`MULTI [${q.id}]:`, columns[q.id], "type:", Array.isArray(columns[q.id]) ? "array" : typeof columns[q.id]);
        continue;
      }

      // Questions with "Iné" option → send as array even if single/likert/single_open
      if (hasIne) {
        if (Array.isArray(value)) {
          columns[q.id] = value;
        } else if (typeof value === "string" && value) {
          columns[q.id] = [value];
        } else {
          columns[q.id] = [];
        }
        console.log(`HAS_INE [${q.id}]:`, columns[q.id], "type:", Array.isArray(columns[q.id]) ? "array" : typeof columns[q.id]);
        continue;
      }

      // SINGLE / LIKERT / SINGLE_OPEN / OPEN (without Iné)
      columns[q.id] = value ?? "";
    }
  }

  console.log("Final mapped columns:", columns);
  return columns;
};



  // Progressive autosave every 15 seconds
  useEffect(() => {
    if (submitted || !respondent || !contractId) return;
    const interval = setInterval(async () => {
      try {
        setAutosaveTime(new Date());
        // Save answers to contracts table (autosave)
        const columns = mapAnswersToColumns(answers);
        const { error } = await supabase
          .from("contracts")
          .update({
            ...columns,
            questionnaire_status: "in_progress",
            updated_at: new Date().toISOString(),
          })
          .eq("id", contractId);

        if (error) {
          console.error("Autosave error details:", {
            message: error.message,
            code: error.code,
            details: error.details,
            hint: error.hint
          });
        } else {
          console.log(
            "Autosave successful at:",
            new Date().toLocaleTimeString()
          );
        }
      } catch (error) {
        console.error("Unexpected autosave error:", error);
      }
    }, 15000);
    return () => clearInterval(interval);
  }, [answers, submitted, respondent, contractId]);

  const handleChange = (qid: string, value: string | string[]) => {
    // Find the question and check type
    let qType: string | undefined;
    let hasIne = false;
    for (const section of questionnaire) {
      const q = section.questions.find((q) => q.id === qid);
      if (q) {
        qType = q.type;
        hasIne = Array.isArray(q.options) && q.options.includes("Iné");
        break;
      }
    }
    // For multi-select, always store as array
    if (qType === "multi") {
      setAnswers((prev) => ({ ...prev, [qid]: Array.isArray(value) ? value : value ? [value] : [] }));
    } 
    // For questions with "Iné" option, store as array
    else if (hasIne) {
      setAnswers((prev) => ({ ...prev, [qid]: Array.isArray(value) ? value : value ? [value] : [] }));
    } 
    // For other types, store as is
    else {
      setAnswers((prev) => ({ ...prev, [qid]: value }));
    }
  };

  // Calculate progress
  const totalQuestions = questionnaire.reduce(
    (total, section) => total + section.questions.length,
    0
  );
  const answeredQuestions = Object.keys(answers).length;
  const progressPercentage = Math.round(
    (answeredQuestions / totalQuestions) * 100
  );

  const handleSubmit = async () => {
    if (!respondent || !contractId) return;

    // Check if minimum required questions are answered (at least 50%)
    if (answeredQuestions < totalQuestions * 0.5) {
      alert(
        `Prosím odpovedajte aspoň na polovicu otázok pred odoslaním. Aktuálne: ${answeredQuestions}/${totalQuestions}`
      );
      return;
    }

    console.log("Starting questionnaire submission...");
    console.log("Current answers:", answers);

    try {
      // Submit answers to contracts table
      const columns = mapAnswersToColumns(answers);
      console.log("Mapped columns for database:", columns);

      const { data, error } = await supabase
        .from("contracts")
        .update({
          ...columns,
          questionnaire_status: "submitted",
          submitted_at: new Date().toISOString(),
        })
        .eq("id", contractId)
        .select();

      if (error) {
        console.error("Error submitting questionnaire:", error);
        alert(`Chyba pri odoslaní prieskumu: ${error.message}`);
        return;
      }

      console.log("Questionnaire submitted successfully:", data);
      setSubmitted(true);
      setTimestamp(new Date().toLocaleString());
      router.push("/questionnaire/confirmation");
    } catch (error) {
      console.error("Unexpected error during submission:", error);
      alert(
        `Neočakávaná chyba pri odosielaní: ${
          error instanceof Error ? error.message : "Neznáma chyba"
        }`
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#ffffff', fontFamily: 'Helvetica, Arial, sans-serif' }}>
      <Header />
      <main className="flex-grow">
        <div
          className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20"
          style={{
            backgroundColor: "#ffffff",
            fontFamily: "Helvetica, Arial, sans-serif",
            color: "#000000",
          }}
        >
      {!isLoaded || checkingAccess ? (
        <div
          className="text-center py-20"
          style={{
            fontFamily: "Helvetica, Arial, sans-serif",
            color: "#000000",
            fontSize: "16px",
            letterSpacing: "0.02em",
          }}
        >
          NAČÍTAVAM...
        </div>
      ) : missingData ? (
        <div
          className="text-center py-20"
          style={{
            color: "#000000",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: "16px",
          }}
        >
          <p className="mb-6">
            Chýbajú osobné údaje. Prosím, „v“yplňte najskôr osobné údaje.
          </p>
          <a
            href="/personal-data"
            style={{
              color: "#000000",
              textDecoration: "none",
              borderBottom: "2px solid #000000",
              fontFamily: "Helvetica, Arial, sans-serif",
              display: "inline-block",
              paddingBottom: "2px",
              fontSize: "14px",
              letterSpacing: "0.05em",
            }}
          >
            PREJSŤ NA OSOBNÉ ÚDAJE
          </a>
        </div>
      ) : showInstructions ? (
        <>
          <div
            className="mb-16"
            style={{ paddingBottom: "16px", borderBottom: "1px solid #e5e7eb" }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div
                style={{
                  color: "#999999",
                  fontSize: "13px",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  letterSpacing: "0.03em",
                }}
              >
                ID: {contractId}
              </div>
              <div className="flex gap-6">
                <div
                  style={{
                    color: "#666666",
                    fontSize: "13px",
                    fontFamily: "Helvetica, Arial, sans-serif",
                  }}
                >
                  {respondent?.name}
                </div>
                <div
                  style={{
                    color: "#666666",
                    fontSize: "13px",
                    fontFamily: "Helvetica, Arial, sans-serif",
                  }}
                >
                  {respondent?.email}
                </div>
              </div>
            </div>
          </div>
          
          <p
            className="text-base sm:text-lg mb-12 sm:mb-20"
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              color: "#666666",
            }}
          >
            MedInsights 2026
          </p>
          <div className="mb-16">
            <h2
              className="text-xl sm:text-2xl font-semibold mb-6"
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                color: "#000000",
              }}
            >
              Inštrukcie k vypĺňaniu
            </h2>
            <ul
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                color: "#666666",
                fontSize: "16px",
                lineHeight: "1.8",
              }}
            >
              <li className="mb-4">
                • Dotazník je možné vyplniť naraz alebo v niekoľkých krokoch.
              </li>
              <li className="mb-4">
                • Pri škálach prosíme označiť vždy jednu odpoveď, ak nie je
                uvedené inak.
              </li>
              <li className="mb-4">
                • Pri otvorených otázkach môžete uviesť ľubovoľne dlhú odpoveď.
              </li>
              <li className="mb-4">
                • Po odoslaní dát získate potvrdenie o účasti.
              </li>
              <li className="mb-6">
                • V prípade otázok nás kontaktujte na podpora@medinsights.sk
              </li>
            </ul>
          </div>
          <div className="mb-16">
            <h2
              className="text-xl sm:text-2xl font-semibold mb-6"
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                color: "#000000",
              }}
            >
              Dôležité termíny
            </h2>
            <ul
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                color: "#666666",
                fontSize: "16px",
                lineHeight: "1.8",
              }}
            >
              <li className="mb-4">
                • Trvanie prieskumu: 15. 1. 2026 – 15. 02. 2026
              </li>
              <li className="mb-6">
                • Dotazník je potrebné vyplniť v rámci daného obdobia.
              </li>
            </ul>
          </div>
          <button
            onClick={() => setShowInstructions(false)}
            className="w-full py-4 px-6 font-medium transition-all duration-300"
            style={{
              backgroundColor: "#000000",
              color: "#ffffff",
              fontFamily: "Helvetica, Arial, sans-serif",
              borderRadius: "50px",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              letterSpacing: "0.05em",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.opacity = "0.9";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.opacity = "1";
            }}
          >
            ZAČAŤ DOTAZNÍK
          </button>
        </>
      ) : (
        <>
          <div
            className="mb-16"
            style={{ paddingBottom: "16px", borderBottom: "1px solid #e5e7eb" }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div
                style={{
                  color: "#999999",
                  fontSize: "13px",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  letterSpacing: "0.03em",
                }}
              >
                ID: {contractId}
              </div>
              <div className="flex gap-6">
                <div
                  style={{
                    color: "#666666",
                    fontSize: "13px",
                    fontFamily: "Helvetica, Arial, sans-serif",
                  }}
                >
                  {respondent?.name}
                </div>
                <div
                  style={{
                    color: "#666666",
                    fontSize: "13px",
                    fontFamily: "Helvetica, Arial, sans-serif",
                  }}
                >
                  {respondent?.email}
                </div>
              </div>
            </div>
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-light mb-4 sm:mb-6"
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              color: "#000000",
              letterSpacing: "-0.03em",
            }}
          >
            Prieskum
          </h1>
          <p
            className="text-base sm:text-lg mb-12 sm:mb-20"
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              color: "#666666",
            }}
          >
            MedInsights 2026
          </p>
          <div className="mb-20">
            <div className="flex justify-between items-center mb-4">
              <div
                style={{
                  color: "#000000",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontSize: "14px",
                  letterSpacing: "0.02em",
                }}
              >
                {answeredQuestions} / {totalQuestions}
              </div>
              <div
                style={{
                  color: "#999999",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontSize: "13px",
                }}
              >
                {progressPercentage}%
              </div>
            </div>
            <div
              className="w-full h-0.5"
              style={{ backgroundColor: "#f0f0f0" }}
            >
              <div
                className="h-0.5 transition-all duration-500"
                style={{
                  width: `${progressPercentage}%`,
                  backgroundColor: "#000000",
                }}
              ></div>
            </div>
            <p
              className="mt-6"
              style={{
                color: "#999999",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontSize: "13px",
                lineHeight: "1.6",
              }}
            >
              Dotazník obsahuje {totalQuestions} otázok v {questionnaire.length}{" "}
              sekciách. Vaše odpovede sa automaticky ukladajú.
            </p>
          </div>
          {questionnaire.map((section, sectionIndex) => (
            <div key={section.section} className="mb-16 sm:mb-24">
              <div
                className="mb-8 sm:mb-10 pb-4 sm:pb-6"
                style={{ borderBottom: "1px solid #e5e7eb" }}
              >
                <div
                  className="text-xs mb-2 sm:mb-3"
                  style={{
                    color: "#999999",
                    fontFamily: "Helvetica, Arial, sans-serif",
                    letterSpacing: "0.1em",
                  }}
                >
                </div>
                <h2
                  className="text-2xl sm:text-3xl font-light"
                  style={{
                    color: "#000000",
                    fontFamily: "Helvetica, Arial, sans-serif",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {section.section}
                </h2>
              </div>
              {section.introduction && (
                <div
                  className="mb-8 sm:mb-12 pl-4 sm:pl-6"
                  style={{
                    borderLeft: "2px solid #f0f0f0",
                    color: "#666666",
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontSize: "14px",
                    lineHeight: "1.8",
                  }}
                >
                  {section.introduction}
                </div>
              )}
              {section.questions.map((q, questionIndex) => {
                const globalQuestionNumber =
                  questionnaire
                    .slice(0, sectionIndex)
                    .reduce((total, s) => total + s.questions.length, 0) +
                  questionIndex +
                  1;

                return (
                    <div key={q.id} className="mb-8 sm:mb-10">
                      <div className="flex items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
                        <div
                          className="text-xs mt-1"
                          style={{
                            color: "#cccccc",
                            fontFamily: "Helvetica, Arial, sans-serif",
                            minWidth: "20px",
                            letterSpacing: "0.05em",
                          }}
                        >
                          {globalQuestionNumber}
                        </div>
                        <label
                          className="block flex-1"
                          style={{
                            color: "#000000",
                            fontFamily: "Helvetica, Arial, sans-serif",
                            fontSize: "16px",
                            lineHeight: "1.6",
                            fontWeight: "400",
                          }}
                        >
                          {q.text}
                        </label>
                      </div>
                      <div className="ml-8 sm:ml-12">
                        {q.type === "single" && Array.isArray(q.options) ? (
                          <div className="flex flex-col gap-3">
                            {q.options.map((opt: string, idx: number) => {
                              const hasIne = Array.isArray(q.options) && q.options.includes("Iné");
                              const isChecked = hasIne
                                ? Array.isArray(answers[q.id]) && (answers[q.id] as string[]).includes(opt)
                                : answers[q.id] === opt;
                              return (
                                <label
                                  key={opt}
                                  className="flex items-center gap-4 cursor-pointer py-2 px-4 transition-all"
                                  style={{
                                    fontSize: "15px",
                                    fontFamily: "Helvetica, Arial, sans-serif",
                                    color: "#000000",
                                    backgroundColor:
                                      isChecked ? "#fafafa" : "transparent",
                                  }}
                                >
                                  <input
                                    type="radio"
                                    name={q.id}
                                    value={opt}
                                    checked={isChecked}
                                    onChange={() => handleChange(q.id, opt)}
                                    disabled={submitted}
                                    style={{
                                      width: "16px",
                                      height: "16px",
                                      accentColor: "#000000",
                                      flexShrink: 0,
                                    }}
                                  />
                                  <span>{opt}</span>
                                </label>
                              );
                            })}
                          </div>
                        ) : q.type === "multi_other" &&
                          Array.isArray(q.options) ? (
                          <>
                            <div className="flex flex-col gap-3 mb-2">
                              {q.options.map((opt: string, idx: number) => (
                                <label
                                  key={opt}
                                  className="flex items-center gap-4 cursor-pointer py-2 px-4 transition-all"
                                  style={{
                                    fontSize: "15px",
                                    fontFamily: "Helvetica, Arial, sans-serif",
                                    color: "#000000",
                                    backgroundColor:
                                      Array.isArray(answers[q.id]) &&
                                      (answers[q.id] as string[]).includes(opt)
                                        ? "#fafafa"
                                        : "transparent",
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    name={q.id}
                                    value={opt}
                                    checked={
                                      Array.isArray(answers[q.id]) &&
                                      (answers[q.id] as string[]).includes(opt)
                                    }
                                    onChange={() => {
                                      const prev = Array.isArray(answers[q.id])
                                        ? (answers[q.id] as string[])
                                        : [];
                                      if (prev.includes(opt)) {
                                        handleChange(
                                          q.id,
                                          prev.filter((v: string) => v !== opt)
                                        );
                                      } else {
                                        handleChange(q.id, [...prev, opt]);
                                      }
                                    }}
                                    disabled={submitted}
                                    style={{
                                      width: '16px',
                                      height: '16px',
                                      accentColor: '#000000',
                                      flexShrink: 0,
                                    }}
                                  />
                                  <span>{opt}</span>
                                </label>
                              ))}
                            </div>
                          </>
                        ) : q.type === "single_open" &&
                          Array.isArray(q.options) ? (
                          <>
                            <div className="flex flex-col gap-3 mb-2">
                              {q.options.map((opt: string, idx: number) => {
                                const hasIne = Array.isArray(q.options) && q.options.includes("Iné");
                                const isChecked = hasIne
                                  ? Array.isArray(answers[q.id]) && (answers[q.id] as string[]).includes(opt)
                                  : answers[q.id] === opt;
                                return (
                                  <label
                                    key={opt}
                                    className="flex items-center gap-4 cursor-pointer py-2 px-4 transition-all"
                                    style={{
                                      fontSize: "15px",
                                      fontFamily: "Helvetica, Arial, sans-serif",
                                      color: "#000000",
                                      backgroundColor:
                                        isChecked
                                          ? "#fafafa"
                                          : "transparent",
                                    }}
                                  >
                                    <input
                                      type="radio"
                                      name={q.id}
                                      value={opt}
                                      checked={isChecked}
                                      onChange={() => handleChange(q.id, opt)}
                                      disabled={submitted}
                                      style={{
                                        width: "16px",
                                        height: "16px",
                                        accentColor: "#000000",
                                        flexShrink: 0,
                                      }}
                                    />
                                    {opt}
                                  </label>
                                );
                              })}
                            </div>
                          </>
                      ) : q.type === "multi" && Array.isArray(q.options) ? (
                        <div className="flex flex-col gap-3">
                          {q.options.map((opt: string, idx: number) => (
                            <label
                              key={opt}
                              className="flex items-center gap-4 cursor-pointer py-2 px-4 transition-all"
                              style={{
                                fontFamily: "Helvetica, Arial, sans-serif",
                                color: "#000000",
                                fontSize: "15px",
                                backgroundColor:
                                  Array.isArray(answers[q.id]) && (answers[q.id] as string[]).includes(opt)
                                    ? "#fafafa"
                                    : "transparent",
                              }}
                            >
                              <input
                                type="checkbox"
                                name={q.id}
                                value={opt}
                                checked={
                                  Array.isArray(answers[q.id]) && (answers[q.id] as string[]).includes(opt)
                                }
                                onChange={() => {
                                  const prev = Array.isArray(answers[q.id])
                                    ? (answers[q.id] as string[])
                                    : [];
                                  if (prev.includes(opt)) {
                                    handleChange(
                                      q.id,
                                      prev.filter((v: string) => v !== opt)
                                    );
                                  } else if (!q.maxSelections || prev.length < q.maxSelections) {
                                    handleChange(q.id, [...prev, opt]);
                                  }
                                }}
                                disabled={submitted}
                                style={{
                                  width: "16px",
                                  height: "16px",
                                  accentColor: "#000000",
                                  flexShrink: 0,
                                }}
                              />
                              {opt}
                            </label>
                          ))}
                        </div>
                      ) : q.type === "likert" && Array.isArray(q.options) ? (
                        <div className="flex flex-col gap-3">
                          {q.options.map((opt: string, idx: number) => {
                            const hasIne = Array.isArray(q.options) && q.options.includes("Iné");
                            const isChecked = hasIne
                              ? Array.isArray(answers[q.id]) && (answers[q.id] as string[]).includes(opt)
                              : answers[q.id] === opt;
                            return (
                              <label
                                key={opt}
                                className="flex items-center gap-4 cursor-pointer py-2 px-4 transition-all"
                                style={{
                                  fontFamily: "Helvetica, Arial, sans-serif",
                                  color: "#000000",
                                  fontSize: "15px",
                                  backgroundColor:
                                    isChecked
                                      ? "#fafafa"
                                      : "transparent",
                                }}
                              >
                                <input
                                  type="radio"
                                  name={q.id}
                                  value={opt}
                                  checked={isChecked}
                                  onChange={() => handleChange(q.id, opt)}
                                  disabled={submitted}
                                  style={{
                                    width: "16px",
                                    height: "16px",
                                    accentColor: "#000000",
                                    flexShrink: 0,
                                  }}
                                />
                                {opt}
                              </label>
                            );
                          })}
                        </div>
                      ) : (
                        <textarea
                          className="w-full p-5 transition-all"
                          style={{
                            border: "1px solid #f0f0f0",
                            fontFamily: "Helvetica, Arial, sans-serif",
                            color: "#000000",
                            minHeight: "120px",
                            resize: "vertical",
                            fontSize: "15px",
                            lineHeight: "1.7",
                            outline: "none",
                            backgroundColor: "#fafafa",
                          }}
                          rows={4}
                          value={answers[q.id] || ""}
                          onChange={(e) => handleChange(q.id, e.target.value)}
                          disabled={submitted}
                          onFocus={(e) => {
                            (e.target as HTMLElement).style.border =
                              "1px solid #000000";
                          }}
                          onBlur={(e) => {
                            (e.target as HTMLElement).style.border =
                              "1px solid #f0f0f0";
                          }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
          <div
            className="mt-16 sm:mt-24 mb-12 sm:mb-16 pt-8 sm:pt-12"
            style={{ borderTop: "1px solid #e5e7eb" }}
          >
            <div className="flex justify-between items-center mb-8 sm:mb-12">
              <div>
                <div
                  style={{
                    color: "#000000",
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontSize: "20px",
                    fontWeight: "300",
                    marginBottom: "4px",
                  }}
                >
                  {answeredQuestions} / {totalQuestions}
                </div>
                <div
                  style={{
                    color: "#999999",
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontSize: "12px",
                  }}
                >
                  Vyplnené otázky
                </div>
              </div>
              <div className="text-right">
                <div
                  style={{
                    color: "#000000",
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontSize: "20px",
                    fontWeight: "300",
                    marginBottom: "4px",
                  }}
                >
                  {Math.ceil(totalQuestions * 0.5)}
                </div>
                <div
                  style={{
                    color: "#999999",
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontSize: "12px",
                  }}
                >
                  Minimum (50%)
                </div>
              </div>
            </div>
            <button
              className="w-full py-5 sm:py-6 px-6 sm:px-8 font-normal transition-all duration-300"
              style={{
                backgroundColor:
                  answeredQuestions >= totalQuestions * 0.5 && !submitted
                    ? "transparent"
                    : "#f5f5f5",
                color:
                  answeredQuestions >= totalQuestions * 0.5 && !submitted
                    ? "#000000"
                    : "#cccccc",
                fontFamily: "Helvetica, Arial, sans-serif",
                border: "2px solid #000000",
                cursor:
                  answeredQuestions >= totalQuestions * 0.5 && !submitted
                    ? "pointer"
                    : "not-allowed",
                letterSpacing: "0.1em",
                fontSize: "13px",
                borderRadius: "50px",
              }}
              onMouseEnter={(e) => {
                if (answeredQuestions >= totalQuestions * 0.5 && !submitted) {
                  (e.target as HTMLElement).style.backgroundColor = "#000000";
                  (e.target as HTMLElement).style.color = "#ffffff";
                }
              }}
              onMouseLeave={(e) => {
                if (answeredQuestions >= totalQuestions * 0.5 && !submitted) {
                  (e.target as HTMLElement).style.backgroundColor =
                    "transparent";
                  (e.target as HTMLElement).style.color = "#000000";
                }
              }}
              onClick={handleSubmit}
              disabled={submitted || answeredQuestions < totalQuestions * 0.5}
            >
              {submitted
                ? "ODOSLANÉ"
                : answeredQuestions < totalQuestions * 0.5
                ? `POTREBUJETE ASPOŇ ${Math.ceil(
                    totalQuestions * 0.5
                  )} ODPOVEDÍ`
                : "ODOSLAŤ PRIESKUM"}
            </button>
            {autosaveTime && !submitted && (
              <div
                className="text-center mt-6"
                style={{
                  color: "#cccccc",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontSize: "12px",
                }}
              >
                Naposledy uložené {autosaveTime.toLocaleTimeString()}
              </div>
            )}
          </div>
          {submitted && timestamp && (
            <div
              className="mt-16 text-center py-12"
              style={{ borderTop: "1px solid #e5e7eb" }}
            >
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: "300",
                  marginBottom: "12px",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  color: "#000000",
                  letterSpacing: "-0.02em",
                }}
              >
                Ďakujeme
              </div>
              <p
                style={{
                  fontSize: "15px",
                  color: "#666666",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  marginBottom: "8px",
                }}
              >
                Váš prieskum bol úspešne odoslaný
              </p>
              <span
                style={{
                  color: "#cccccc",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontSize: "12px",
                }}
              >
                {timestamp}
              </span>
            </div>
          )}
        </>
      )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
