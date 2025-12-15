"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

// Complete questionnaire with all 29 biosimilar questions
const questionnaire = [
  {
    section: "I. DEMOGRAFICKÁ ČASŤ",
    introduction: null,
    questions: [
      { id: "age", text: "Vek respondenta", type: "single", options: ["do 35", "36–45", "46–55", "56+"], coding: [1,2,3,4] },
      { id: "gender", text: "Pohlavie", type: "single", options: ["Muž", "Žena"], coding: [1,2] },
      { id: "practice_years", text: "Dĺžka odbornej praxe", type: "single", options: ["do 5 rokov", "6–10", "11–20", "21+"], coding: [1,2,3,4] },
      { id: "workplace_type", text: "Typ pracoviska", type: "single_open", options: ["Nemocnica/Ústavná starostlivosť", "Ambulancia", "Iné"], coding: [1,2,3] },
      { id: "region", text: "Kraj pôsobenia", type: "single", options: ["BA", "NT", "TT", "ZA", "BB", "PO", "KE", "ZV"], coding: [1,2,3,4,5,6,7,8] },
      { id: "specialization", text: "Špecializácia", type: "single", options: ["Reumatológ", "Osteológ", "Endokrinológ", "Onkológ", "Ortopéd"], coding: [1,2,3,4,5] },
    ],
  },
  {
    section: "II. VEDOMOSTI A POVEDOMIE O BIOSIMILÁRNYCH LIEKOCH",
    introduction: "V tejto časti sa chceme dozvedieť o Vašom povedomí o biosimilárnych liekoch, ktoré  sú biologickými liekmi vysoko podobnými s originálnym referenčným liekom. Prešli prísnym procesom schvaľovania Európskou liekovou agentúrou (EMA), ktorý potvrdzuje ich kvalitu, účinnosť a bezpečnosť. Ich vývoj je postavený na dôkaze farmakokinetickej a farmakodynamickej podobnosti s originálnym liekom, ktorý sa dokazuje v klinických štúdiách fázy 1, a následne sa potvrdzuje v klinickej štúdii fázy 3, že účinnosť a bezpečnosť je podobná originálnemu biologiku",
    questions: [
      { id: "q1_trust_expert", text: "Do akej miery sa v súčasnosti považujete za dôveryhodného odborníka na biosimilárne lieky?", type: "likert", options: ["Úplne nesúhlasím", "Nesúhlasím", "Skôr nesúhlasím", "Neutrálne", "Skôr súhlasím"], coding: [1,2,3,4,5] },
      { id: "q2_info_sources", text: "Aké sú v súčasnosti Vaše hlavné zdroje informácií o biosimilárnych liekoch?", type: "multi_other", options: ["Kolegovia", "Konferencie", "Farmaceutické spoločnosti", "Iné"], coding: [1,2,3,4] },
      { id: "q3_better_orientation", text: "Čo by Vám pomohlo lepšie sa orientovať v oblasti biosimilárnych liekov?", type: "open" },
      { id: "q4_communication_form", text: "Aká forma komunikácie by Vám pomohla získať dôveru v biosimilárne lieky?", type: "open" },
    ],
  },
  {
    section: "III. HODNOTENIE BIOSIMILÁRNYCH LIEKOV",
    introduction: "V tejto časti sa chceme dozvedieť o Vašom vnímaní účinnosti a bezpečnosti biosimilárnych liekoch, ktoré sú porovnateľné s originálnymi liekmi. Tieto lieky sú dôkladne testované v klinických štúdiách a podliehajú rovnakej kontrole bezpečnosti ako lieky originálne.",
    questions: [
      { id: "q5_effectiveness_rating", text: "Ako celkovo hodnotíte účinnosť biosimilárnych liekov?", type: "likert", options: ["Úplne nesúhlasím", "Nesúhlasím", "Skôr nesúhlasím", "Neutrálne"], coding: [1,2,3,4] },
      { id: "q6_safety_rating", text: "Ako hodnotíte bezpečnosť biosimilárnych liekov?", type: "likert", options: ["Úplne nesúhlasím", "Nesúhlasím", "Skôr nesúhlasím", "Neutrálne"], coding: [1,2,3,4] },
      { id: "q7_side_effects_risk", text: "Ako hodnotíte riziko nežiaducich účinkov u biosimilárnych liekov?", type: "likert", options: ["Úplne nesúhlasím", "Nesúhlasím", "Skôr nesúhlasím", "Neutrálne"], coding: [1,2,3,4] },
      { id: "q8_safety_support", text: "Čo by podporilo Vašu dôveru v bezpečnosť biosimilárnych liekov?", type: "open" },
    ],
  },
  {
    section: "IV. POUŽÍVANIE BIOSIMILÁRNYCH LIEKOV V PRAXI",
    introduction: "Táto sekcia sa zameriava na Vaše praktické skúsenosti s biosimilárnymi liekmi.",
    questions: [
      { id: "q9_use_biosimilars", text: "Používate vo svojej praxi biosimilárne lieky?", type: "single", options: ["Áno", "Nie"], coding: [1,2] },
      { id: "q10_diagnoses_usage", text: "Ak áno, pri ktorých diagnózach alebo liečbe ich používate?", type: "open" },
      { id: "q11_barriers_usage", text: "Ak nie, čo Vám bráni v ich využívaní?", type: "open" },
      { id: "q12_prescribe_frequency", text: "Ako často predpisujete biosimilárny liek namiesto originálneho lieku?", type: "likert", options: ["Úplne nesúhlasím", "Nesúhlasím", "Skôr nesúhlasím", "Neutrálne"], coding: [1,2,3,4] },
      { id: "q13_prescription_reason", text: "Ak predpisujete biosimilárny liek, čo je vaším hlavným dôvodom?", type: "single", options: ["Nižšia cena", "Dostupnosť v distribučnej sieti", "Dlhodobé skúsenosti s liekom"], coding: [1,2,3] },
    ],
  },
  {
    section: "V. PRECHOD PACIENTA NA BIOSIMILÁRNE LIEKY",
    introduction: "V tejto sekcii sa pýtame na Vaše názory týkajúce sa prechodu pacientov z originálnych liekov na biosimilárne.",
    questions: [
      { id: "q14_patient_transition", text: "Ako vnímate prechod pacienta z originálneho lieku na biosimilárny liek?", type: "likert", options: ["Úplne nesúhlasím", "Nesúhlasím", "Skôr nesúhlasím", "Neutrálne"], coding: [1,2,3,4] },
      { id: "q15_original_response_influence", text: "Ak pacient dobre reaguje na originál, aký je vplyv na rozhodovanie o prechode na biosimilárny liek?", type: "single", options: ["Odporúčam vždy", "Zvážim pri ekonomickej potrebe", "Nezvažujem prechod"], coding: [1,2,3] },
      { id: "q16_switching_motivators", text: "Ktoré faktory by vás motivovali k switching-u pacienta na biosimilárny liek?", type: "multi", options: ["Úspora nákladov", "Tlak poisťovní na finančné aspekty", "Zlepšenie prístupu pacienta k liečbe", "Výkon biosimilárnych liekov"], coding: [1,2,3,4] },
      { id: "q17_transition_conditions", text: "Aké podmienky by ste považovali za nevyhnutné pri prechode na biosimilárny liek?", type: "open" },
    ],
  },
  {
    section: "VI. KOMUNIKÁCIA S PACIENTAMI",
    introduction: "V tejto časti sa chceme dozvedieť o Vašich skúsenostiach s transparentnou komunikáciou o biosimilárnych liekoch. Napríklad finančná spoluúčasť pacientov môže byť jedným z najvýznamnejších faktorov, ktoré ovplyvňujú prijatie biosimilárnych liekov a ochotu prejsť z originálneho lieku na biosimilár.Z dát vieme, že pacienti často dôverujú odporúčaniu svojho lekára viac než samotnej značke lieku. ",
    questions: [
      { id: "q18_patient_presentation", text: "Ako zvyčajne predstavíte pacientovi zmenu lieku na biosimilárny?", type: "open" },
      { id: "q19_discuss_origin_frequency", text: "Ako často diskutujete s pacientmi o pôvode lieku (originál vs. biosimilárny)?", type: "single", options: ["Vždy", "Väčšinou", "Len pri otázke pacienta", "Nikdy"], coding: [1,2,3,4] },
      { id: "q20_prescription_barriers", text: "Podľa vašich doterajších skúseností, čo je najväčšou prekážkou pri predpisovaní biosimilárnych liekov?", type: "multi", options: ["Účinnosť liečby", "Bezpečnosť liečby", "Cena liekov", "Nedostatok informácií o lieku"], coding: [1,2,3,4] },
    ],
  },
  {
    section: "VII. SKÚSENOSTI A VÝHODY",
    introduction: "V tejto časti sa preto chceme dozvedieť o Vašich osobných skúsenostiach pri prechode z originálneho lieku na biosimilárny liek a Vašej následnej komunikácii s pacientom Doterajšie dáta potvrdzujú, že switch nemá negatívny vplyv na účinnosť ani bezpečnosť liečby.",
    questions: [
      { id: "q21_indication_experience", text: "Aké sú Vaše skúsenosti s indikáciou a použiteľnosťou biosimilárnych liekov?", type: "open" },
      { id: "q22_transition_advantages", text: "Aké výhody by ste považovali za významné pri prechode na biosimilárne lieky?", type: "open" },
      { id: "q23_patient_decision_factors", text: "Aké faktory by mohli ovplyvniť rozhodovanie pacientov o prechode na biosimilárny liek?", type: "open" },
      { id: "q24_info_accuracy_rating", text: "Ako hodnotíte presnosť informácií o biosimilárnych liekoch dostupných pre pacientov?", type: "likert", options: ["Úplne nesúhlasím", "Nesúhlasím", "Skôr nesúhlasím", "Neutrálne"], coding: [1,2,3,4] },
      { id: "q25_communication_improvements", text: "Aké zlepšenia v komunikácii by podľa Vás mohli zlepšiť dôveru pacientov v biosimilárne lieky?", type: "open" },
      { id: "q26_necessary_conditions", text: "Aké podmienky by ste považovali za nevyhnutné pre prechod pacienta na biosimilárny liek?", type: "open" },
      { id: "q27_additional_info_needed", text: "Aké ďalšie informácie by Vám pomohli pri rozhodovaní o biosimilárnych liekoch?", type: "open" },
      { id: "q28_colleague_consultation_frequency", text: "Ako často konzultujete s kolegami ohľadom predpisovania biosimilárnych liekov?", type: "single", options: ["Vždy", "Väčšinou", "Len pri otázke pacienta", "Nikdy"], coding: [1,2,3,4] },
      { id: "q29_patient_advantages", text: "Aké výhody vidíte v používaní biosimilárnych liekov pre pacientov?", type: "open" },
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
          console.error('Error checking contract approval:', error);
          return;
        }
        
        console.log('Contract approval status:', contract?.contract_approved);
        console.log('Questionnaire status:', contract?.questionnaire_status);
        
        // Check if questionnaire is already submitted
        if (contract && contract.questionnaire_status === 'submitted') {
          console.log('Questionnaire already submitted, redirecting to confirmation page');
          router.replace("/questionnaire/confirmation");
          return;
        }
        
        if (contract && contract.contract_approved !== true) {
          console.log('Contract not approved (value:', contract.contract_approved, '), redirecting to contract page');
          router.replace("/contract");
        } else {
          console.log('Contract approved, staying on questionnaire page');
          setCheckingAccess(false); // Allow questionnaire to show
        }
      } catch (error) {
        console.error('Unexpected error checking contract approval:', error);
      }
    };
    checkContractApproval();
  }, [respondent, contractId, profileComplete, router, missingData, isLoaded]);

  // Helper: Map answers to columns for Supabase
  const mapAnswersToColumns = (answers: Record<string, string | string[]>) => {
    // List all question IDs that should be columns in Supabase
    const columns: Record<string, any> = {};
    for (const section of questionnaire) {
      for (const q of section.questions) {
        if (q.type === "multi" || q.type === "multi_other") {
          columns[q.id] = Array.isArray(answers[q.id]) ? (answers[q.id] as string[]).join(", ") : "";
          // Handle 'other' specification for multi_other type
          if (q.type === "multi_other" && answers[`${q.id}_other`]) {
            columns[`${q.id}_other`] = answers[`${q.id}_other`];
          }
        } else if (q.type === "single_open") {
          columns[q.id] = answers[q.id] || "";
          if (answers[`${q.id}_other`]) {
            columns[`${q.id}_other`] = answers[`${q.id}_other`];
          }
        } else {
          // single, likert, open
          columns[q.id] = answers[q.id] || "";
        }
      }
    }
    console.log('Mapped columns:', columns);
    console.log('Number of columns:', Object.keys(columns).length);
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
        const { error } = await supabase.from("contracts").update({
          ...columns,
          questionnaire_status: "in_progress",
          updated_at: new Date().toISOString(),
        }).eq("id", contractId);
        
        if (error) {
          console.error('Autosave error:', error);
        } else {
          console.log('Autosave successful at:', new Date().toLocaleTimeString());
        }
      } catch (error) {
        console.error('Unexpected autosave error:', error);
      }
    }, 15000);
    return () => clearInterval(interval);
  }, [answers, submitted, respondent, contractId]);

  const handleChange = (qid: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  };

  // Calculate progress
  const totalQuestions = questionnaire.reduce((total, section) => total + section.questions.length, 0);
  const answeredQuestions = Object.keys(answers).filter(key => !key.endsWith('_other')).length;
  const progressPercentage = Math.round((answeredQuestions / totalQuestions) * 100);

  const handleSubmit = async () => {
    if (!respondent || !contractId) return;
    
    // Check if minimum required questions are answered (at least 50%)
    if (answeredQuestions < totalQuestions * 0.5) {
      alert(`Prosím odpovedajte aspoň na polovicu otázok pred odoslaním. Aktuálne: ${answeredQuestions}/${totalQuestions}`);
      return;
    }
    
    console.log('Starting questionnaire submission...');
    console.log('Current answers:', answers);
    
    try {
      // Submit answers to contracts table
      const columns = mapAnswersToColumns(answers);
      console.log('Mapped columns for database:', columns);
      
      const { data, error } = await supabase.from("contracts").update({
        ...columns,
        questionnaire_status: "submitted",
        submitted_at: new Date().toISOString(),
      }).eq("id", contractId).select();

      if (error) {
        console.error('Error submitting questionnaire:', error);
        alert(`Chyba pri odosielaní prieskumu: ${error.message}`);
        return;
      }

      console.log('Questionnaire submitted successfully:', data);
      setSubmitted(true);
      setTimestamp(new Date().toLocaleString());
      router.push("/questionnaire/confirmation");
    } catch (error) {
      console.error('Unexpected error during submission:', error);
      alert(`Neočakávaná chyba pri odosielaní: ${error instanceof Error ? error.message : 'Neznáma chyba'}`);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20" style={{ backgroundColor: '#ffffff', fontFamily: 'Helvetica, Arial, sans-serif', color: '#000000' }}>
      {!isLoaded || checkingAccess ? (
        <div className="text-center py-20" style={{ fontFamily: 'Helvetica, Arial, sans-serif', color: '#000000', fontSize: '16px', letterSpacing: '0.02em' }}>NAČÍTAVAM...</div>
      ) : missingData ? (
        <div className="text-center py-20" style={{ color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '16px' }}>
          <p className="mb-6">Chýbajú osobné údaje. Prosím, vyplňte najskôr osobné údaje.</p>
          <a href="/personal-data" style={{ color: '#000000', textDecoration: 'none', borderBottom: '2px solid #000000', fontFamily: 'Helvetica, Arial, sans-serif', display: 'inline-block', paddingBottom: '2px', fontSize: '14px', letterSpacing: '0.05em' }}>PREJSŤ NA OSOBNÉ ÚDAJE</a>
        </div>
      ) : (
        <>
          <div className="mb-16" style={{ paddingBottom: '16px', borderBottom: '1px solid #e5e7eb' }}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div style={{ color: '#999999', fontSize: '13px', fontFamily: 'Helvetica, Arial, sans-serif', letterSpacing: '0.03em' }}>ID: {contractId}</div>
              <div className="flex gap-6">
                <div style={{ color: '#666666', fontSize: '13px', fontFamily: 'Helvetica, Arial, sans-serif' }}>{respondent?.name}</div>
                <div style={{ color: '#666666', fontSize: '13px', fontFamily: 'Helvetica, Arial, sans-serif' }}>{respondent?.email}</div>
              </div>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light mb-4 sm:mb-6" style={{ fontFamily: 'Helvetica, Arial, sans-serif', color: '#000000', letterSpacing: '-0.03em' }}>Prieskum</h1>
          <p className="text-base sm:text-lg mb-12 sm:mb-20" style={{ fontFamily: 'Helvetica, Arial, sans-serif', color: '#666666' }}>MedInsights 2025</p>
          <div className="mb-20">
            <div className="flex justify-between items-center mb-4">
              <div style={{ color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '14px', letterSpacing: '0.02em' }}>{answeredQuestions} / {totalQuestions}</div>
              <div style={{ color: '#999999', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '13px' }}>{progressPercentage}%</div>
            </div>
            <div className="w-full h-0.5" style={{ backgroundColor: '#f0f0f0' }}>
              <div 
                className="h-0.5 transition-all duration-500"
                style={{ width: `${progressPercentage}%`, backgroundColor: '#000000' }}
              ></div>
            </div>
            <p className="mt-6" style={{ color: '#999999', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '13px', lineHeight: '1.6' }}>
              Dotazník obsahuje {totalQuestions} otázok v {questionnaire.length} sekciách. Vaše odpovede sa automaticky ukladajú.
            </p>
          </div>
          {questionnaire.map((section, sectionIndex) => (
            <div key={section.section} className="mb-16 sm:mb-24">
              <div className="mb-8 sm:mb-10 pb-4 sm:pb-6" style={{ borderBottom: '1px solid #e5e7eb' }}>
                <div className="text-xs mb-2 sm:mb-3" style={{ color: '#999999', fontFamily: 'Helvetica, Arial, sans-serif', letterSpacing: '0.1em' }}>SEKCIA {sectionIndex + 1}</div>
                <h2 className="text-2xl sm:text-3xl font-light" style={{ color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif', letterSpacing: '-0.02em' }}>{section.section}</h2>
              </div>
              {section.introduction && <div className="mb-8 sm:mb-12 pl-4 sm:pl-6" style={{ borderLeft: '2px solid #f0f0f0', color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '14px', lineHeight: '1.8' }}>{section.introduction}</div>}
              {section.questions.map((q, questionIndex) => {
                const globalQuestionNumber = questionnaire
                  .slice(0, sectionIndex)
                  .reduce((total, s) => total + s.questions.length, 0) + questionIndex + 1;
                
                return (
                <div key={q.id} className="mb-8 sm:mb-10">
                  <div className="flex items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <div className="text-xs mt-1" style={{ color: '#cccccc', fontFamily: 'Helvetica, Arial, sans-serif', minWidth: '20px', letterSpacing: '0.05em' }}>
                      {globalQuestionNumber}
                    </div>
                    <label className="block flex-1" style={{ color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '16px', lineHeight: '1.6', fontWeight: '400' }}>
                      {q.text}
                    </label>
                  </div>
                  <div className="ml-8 sm:ml-12">
                  {q.type === "single" && Array.isArray(q.options) ? (
                    <div className="flex flex-col gap-3">
                      {q.options.map((opt: string, idx: number) => (
                        <label key={opt} className="flex items-center gap-4 cursor-pointer py-2 px-4 transition-all" style={{ fontSize: '15px', fontFamily: 'Helvetica, Arial, sans-serif', color: '#000000', backgroundColor: answers[q.id] === opt ? '#fafafa' : 'transparent' }}>
                          <input
                            type="radio"
                            name={q.id}
                            value={opt}
                            checked={answers[q.id] === opt}
                            onChange={() => handleChange(q.id, opt)}
                            disabled={submitted}
                            style={{ width: '16px', height: '16px', accentColor: '#000000', flexShrink: 0 }}
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  ) : q.type === "multi_other" && Array.isArray(q.options) ? (
                    <>
                      <div className="flex flex-col gap-3 mb-2">
                        {q.options.map((opt: string, idx: number) => (
                          <label key={opt} className="flex items-center gap-4 cursor-pointer py-2 px-4 transition-all" style={{ fontSize: '15px', fontFamily: 'Helvetica, Arial, sans-serif', color: '#000000', backgroundColor: Array.isArray(answers[q.id]) && (answers[q.id] as string[]).includes(opt) ? '#fafafa' : 'transparent' }}>
                            <input
                              type="checkbox"
                              name={q.id}
                              value={opt}
                              checked={Array.isArray(answers[q.id]) && (answers[q.id] as string[]).includes(opt)}
                              onChange={() => {
                                const prev = Array.isArray(answers[q.id]) ? (answers[q.id] as string[]) : [];
                                if (prev.includes(opt)) {
                                  handleChange(q.id, prev.filter((v: string) => v !== opt));
                                } else {
                                  handleChange(q.id, [...prev, opt]);
                                }
                              }}
                              disabled={submitted}
                              style={{ width: '16px', height: '16px', accentColor: '#000000', flexShrink: 0 }}
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                      {Array.isArray(answers[q.id]) && (answers[q.id] as string[]).includes("Iné") && (
                        <textarea
                          className="w-full p-5 mt-4 transition-all"
                          rows={3}
                          placeholder="Prosím špecifikujte..."
                          value={answers[`${q.id}_other`] || ""}
                          onChange={(e) => handleChange(`${q.id}_other`, e.target.value)}
                          disabled={submitted}
                          style={{ minHeight: '100px', resize: 'vertical', border: '1px solid #f0f0f0', fontFamily: 'Helvetica, Arial, sans-serif', color: '#000000', fontSize: '15px', lineHeight: '1.7', outline: 'none', backgroundColor: '#fafafa' }}
                          onFocus={(e) => { (e.target as HTMLElement).style.border = '1px solid #000000'; }}
                          onBlur={(e) => { (e.target as HTMLElement).style.border = '1px solid #f0f0f0'; }}
                        />
                      )}
                    </>
                  ) : q.type === "single_open" && Array.isArray(q.options) ? (
                    <>
                      <div className="flex flex-col gap-3 mb-2">
                        {q.options.map((opt: string, idx: number) => (
                          <label key={opt} className="flex items-center gap-4 cursor-pointer py-2 px-4 transition-all" style={{ fontSize: '15px', fontFamily: 'Helvetica, Arial, sans-serif', color: '#000000', backgroundColor: answers[q.id] === opt ? '#fafafa' : 'transparent' }}>
                            <input
                              type="radio"
                              name={q.id}
                              value={opt}
                              checked={answers[q.id] === opt}
                              onChange={() => handleChange(q.id, opt)}
                              disabled={submitted}
                              style={{ width: '16px', height: '16px', accentColor: '#000000', flexShrink: 0 }}
                            />
                            {opt}
                          </label>
                        ))}
                      </div>
                      {answers[q.id] === "Iné" && (
                        <textarea
                          className="w-full p-5 mt-4 transition-all"
                          rows={3}
                          value={answers[q.id] || ""}
                          onChange={(e) => handleChange(q.id, e.target.value)}
                          disabled={submitted}
                          style={{ minHeight: '100px', resize: 'vertical', border: '1px solid #f0f0f0', fontFamily: 'Helvetica, Arial, sans-serif', color: '#000000', fontSize: '15px', lineHeight: '1.7', outline: 'none', backgroundColor: '#fafafa' }}
                          onFocus={(e) => { (e.target as HTMLElement).style.border = '1px solid #000000'; }}
                          onBlur={(e) => { (e.target as HTMLElement).style.border = '1px solid #f0f0f0'; }}
                        />
                      )}
                    </>
                  ) : q.type === "multi" && Array.isArray(q.options) ? (
                    <div className="flex flex-col gap-3">
                      {q.options.map((opt: string, idx: number) => (
                        <label key={opt} className="flex items-center gap-4 cursor-pointer py-2 px-4 transition-all" style={{ fontFamily: 'Helvetica, Arial, sans-serif', color: '#000000', fontSize: '15px', backgroundColor: Array.isArray(answers[q.id]) && (answers[q.id] as string[]).includes(opt) ? '#fafafa' : 'transparent' }}>
                          <input
                            type="checkbox"
                            name={q.id}
                            value={opt}
                            checked={Array.isArray(answers[q.id]) && (answers[q.id] as string[]).includes(opt)}
                            onChange={() => {
                              const prev = Array.isArray(answers[q.id]) ? (answers[q.id] as string[]) : [];
                              if (prev.includes(opt)) {
                                handleChange(q.id, prev.filter((v: string) => v !== opt));
                              } else if (prev.length < 3) {
                                handleChange(q.id, [...prev, opt]);
                              }
                            }}
                            disabled={submitted}
                            style={{ width: '16px', height: '16px', accentColor: '#000000', flexShrink: 0 }}
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                  ) : q.type === "likert" && Array.isArray(q.options) ? (
                    <div className="flex flex-col gap-3">
                      {q.options.map((opt: string, idx: number) => (
                        <label key={opt} className="flex items-center gap-4 cursor-pointer py-2 px-4 transition-all" style={{ fontFamily: 'Helvetica, Arial, sans-serif', color: '#000000', fontSize: '15px', backgroundColor: answers[q.id] === opt ? '#fafafa' : 'transparent' }}>
                          <input
                            type="radio"
                            name={q.id}
                            value={opt}
                            checked={answers[q.id] === opt}
                            onChange={() => handleChange(q.id, opt)}
                            disabled={submitted}
                            style={{ width: '16px', height: '16px', accentColor: '#000000', flexShrink: 0 }}
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                  ) : (
                    <textarea
                      className="w-full p-5 transition-all"
                      style={{ border: '1px solid #f0f0f0', fontFamily: 'Helvetica, Arial, sans-serif', color: '#000000', minHeight: '120px', resize: 'vertical', fontSize: '15px', lineHeight: '1.7', outline: 'none', backgroundColor: '#fafafa' }}
                      rows={4}
                      value={answers[q.id] || ""}
                      onChange={(e) => handleChange(q.id, e.target.value)}
                      disabled={submitted}
                      onFocus={(e) => { (e.target as HTMLElement).style.border = '1px solid #000000'; }}
                      onBlur={(e) => { (e.target as HTMLElement).style.border = '1px solid #f0f0f0'; }}
                    />
                  )}
                  </div>
                </div>
                );
              })}
            </div>
          ))}
          <div className="mt-16 sm:mt-24 mb-12 sm:mb-16 pt-8 sm:pt-12" style={{ borderTop: '1px solid #e5e7eb' }}>
            <div className="flex justify-between items-center mb-8 sm:mb-12">
              <div>
                <div style={{ color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '20px', fontWeight: '300', marginBottom: '4px' }}>{answeredQuestions} / {totalQuestions}</div>
                <div style={{ color: '#999999', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '12px' }}>Vyplnené otázky</div>
              </div>
              <div className="text-right">
                <div style={{ color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '20px', fontWeight: '300', marginBottom: '4px' }}>{Math.ceil(totalQuestions * 0.5)}</div>
                <div style={{ color: '#999999', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '12px' }}>Minimum (50%)</div>
              </div>
            </div>
            <button
              className="w-full py-5 sm:py-6 px-6 sm:px-8 font-normal transition-all duration-300"
              style={{
                backgroundColor: answeredQuestions >= totalQuestions * 0.5 && !submitted ? 'transparent' : '#f5f5f5',
                color: answeredQuestions >= totalQuestions * 0.5 && !submitted ? '#000000' : '#cccccc',
                fontFamily: 'Helvetica, Arial, sans-serif',
                border: '2px solid #000000',
                cursor: answeredQuestions >= totalQuestions * 0.5 && !submitted ? 'pointer' : 'not-allowed',
                letterSpacing: '0.1em',
                fontSize: '13px',
                borderRadius: '50px'
              }}
              onMouseEnter={(e) => {
                if (answeredQuestions >= totalQuestions * 0.5 && !submitted) {
                  (e.target as HTMLElement).style.backgroundColor = '#000000';
                  (e.target as HTMLElement).style.color = '#ffffff';
                }
              }}
              onMouseLeave={(e) => {
                if (answeredQuestions >= totalQuestions * 0.5 && !submitted) {
                  (e.target as HTMLElement).style.backgroundColor = 'transparent';
                  (e.target as HTMLElement).style.color = '#000000';
                }
              }}
              onClick={handleSubmit}
              disabled={submitted || answeredQuestions < totalQuestions * 0.5}
            >
              {submitted ? 'ODOSLANÉ' : 
               answeredQuestions < totalQuestions * 0.5 ? 
               `POTREBUJETE ASPOŇ ${Math.ceil(totalQuestions * 0.5)} ODPOVEDÍ` :
               'ODOSLAŤ PRIESKUM'}
            </button>
            {autosaveTime && !submitted && (
              <div className="text-center mt-6" style={{ color: '#cccccc', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '12px' }}>Naposledy uložené {autosaveTime.toLocaleTimeString()}</div>
            )}
          </div>
          {submitted && timestamp && (
            <div className="mt-16 text-center py-12" style={{ borderTop: '1px solid #e5e7eb' }}>
              <div style={{ fontSize: '32px', fontWeight: '300', marginBottom: '12px', fontFamily: 'Helvetica, Arial, sans-serif', color: '#000000', letterSpacing: '-0.02em' }}>Ďakujeme</div>
              <p style={{ fontSize: '15px', color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif', marginBottom: '8px' }}>Váš prieskum bol úspešne odoslaný</p>
              <span style={{ color: '#cccccc', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '12px' }}>{timestamp}</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
