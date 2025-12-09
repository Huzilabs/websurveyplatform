"use client";
import { useEffect, useState, useContext } from 'react';
import { LangContext } from './LanguageProvider';
import { Survey, SurveyQuestion, SurveyResponse } from '../lib/surveyModels';
import { supabase } from '../lib/supabaseClient';

interface SurveyFormProps {
  survey: Survey;
  respondentId: string;
}

export default function SurveyForm({ survey, respondentId }: SurveyFormProps) {
  const [answers, setAnswers] = useState<{ id: string; value: string | number }[]>([]);
  const [status, setStatus] = useState<'not_started' | 'in_progress' | 'submitted'>('not_started');
  const [autosaveTimer, setAutosaveTimer] = useState<NodeJS.Timeout | null>(null);
  const { lang } = useContext(LangContext);

  useEffect(() => {
    setStatus('in_progress');
    setAutosaveTimer(
      setInterval(() => {
        handleAutosave();
      }, survey.autosave_interval_seconds * 1000)
    );
    return () => {
      if (autosaveTimer) clearInterval(autosaveTimer);
    };
    // eslint-disable-next-line
  }, []);

  function handleChange(id: string, value: string | number) {
    setAnswers(prev => {
      const idx = prev.findIndex(a => a.id === id);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx] = { id, value };
        return updated;
      }
      return [...prev, { id, value }];
    });
  }

  async function handleAutosave() {
    const response: SurveyResponse = {
      respondent_id: respondentId,
      timestamp_started: new Date().toISOString(),
      timestamp_submitted: '',
      status,
      answers,
    };
    await supabase.from('responses').upsert([response]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitted');
    const response: SurveyResponse = {
      respondent_id: respondentId,
      timestamp_started: new Date().toISOString(),
      timestamp_submitted: new Date().toISOString(),
      status: 'submitted',
      answers,
    };
    await supabase.from('responses').upsert([response]);
    alert('Ďakujeme za vyplnenie prieskumu MedInsights 2025. Váš záznam bol úspešne odoslaný.');
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">{lang === 'sk' ? 'Dotazník MedInsights 2025' : 'MedInsights 2025 Questionnaire'}</h2>
      {survey.questions.map(q => (
        <div key={q.id} className="mb-6">
          <label className="block font-semibold mb-2">{String(q.question_text[lang as keyof typeof q.question_text])}</label>
          {q.type === 'likert_1_7' && (
            <div className="flex gap-2">
              {[...Array(7)].map((_, i) => (
                <label key={i} className="flex flex-col items-center">
                  <input type="radio" name={q.id} value={i + 1} onChange={() => handleChange(q.id, i + 1)} />
                  <span className="text-xs">{(q.scale?.labels as any)?.[lang]?.[String(i + 1)] || i + 1}</span>
                </label>
              ))}
            </div>
          )}
          {q.type === 'Áno_Nie_Neviem' && (
            <div className="flex gap-2">
              {q.options?.map(opt => (
                <label key={opt.value} className="flex items-center gap-1">
                  <input type="radio" name={q.id} value={opt.value} onChange={() => handleChange(q.id, opt.value)} />
                  {(opt.label as any)[lang]}
                </label>
              ))}
            </div>
          )}
          {q.type === 'slider_1_10' && (
            <div className="flex flex-col">
              <input type="range" min={q.scale?.min} max={q.scale?.max} onChange={e => handleChange(q.id, Number(e.target.value))} />
              <div className="flex justify-between text-xs">
                <span>{(q.scale?.min_label as any)?.[lang]}</span>
                <span>{(q.scale?.max_label as any)?.[lang]}</span>
              </div>
            </div>
          )}
          {q.type === 'open_text' && (
            <textarea minLength={q.constraints?.min_characters || 5} onChange={e => handleChange(q.id, e.target.value)} className="w-full p-2 border rounded" />
          )}
        </div>
      ))}
      <button type="submit" className="px-4 py-2 bg-green-600 text-white font-bold rounded hover:bg-green-700 transition">{lang === 'sk' ? 'Poslať prieskum' : 'Submit survey'}</button>
    </form>
  );
}
