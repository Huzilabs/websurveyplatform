"use client";

import { useContext, useEffect, useState } from 'react';
import { LangContext } from './LanguageProvider';
import { supabase } from "../lib/supabaseClient";

interface PersonalData {
  name: string;
  street: string;
  city: string;
  email: string;
  bank: string;
  iban: string;
  taxId: string;
  contractId?: string;
}


export default function PersonalDataForm({ onSubmit }: { onSubmit: (data: PersonalData) => void }) {
  const initialData: PersonalData = {
    name: '',
    street: '',
    city: '',
    email: '',
    bank: '',
    iban: '',
    taxId: '',
  };
  const [form, setForm] = useState(initialData);
  const [showContract, setShowContract] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submissionInProgress, setSubmissionInProgress] = useState(false);
  const [emailError, setEmailError] = useState('');
  const { lang } = useContext(LangContext) as { lang: 'en' | 'sk' };
  const [selectedLang, setSelectedLang] = useState<'en' | 'sk'>(
    (typeof lang === 'string' && (lang === 'en' || lang === 'sk')) ? lang : 'sk'
  );

  type Translation = {
    title: string;
    reviewTitle: string;
    name: string;
    street: string;
    city: string;
    email: string;
    bank: string;
    iban: string;
    taxId: string;
    submit: string;
    contractTitle: string;
    contractText: string;
    agree: string;
    submitFinal: string;
  };
  const translations: Record<'en' | 'sk', Translation> = {
    en: {
      title: 'Fill in your personal details',
      reviewTitle: 'Review your details',
      name: 'Full Name',
      street: 'Street, No.',
      city: 'ZIP, City',
      email: 'Email',
      bank: 'Bank (Name)',
      iban: 'IBAN',
      taxId: 'Tax ID or Birth No.',
      submit: 'Generate contract draft',
      contractTitle: 'Contract Details',
      contractText: 'By checking the box below, I confirm that the above information is correct and I agree to the terms of the contract.',
      agree: 'I agree',
      submitFinal: 'Submit and Continue',
    },
    sk: {
      title: 'Vyplňte svoje osobné údaje',
      reviewTitle: 'Skontrolujte svoje údaje',
      name: 'Meno a priezvisko',
      street: 'Ulica, číslo domu',
      city: 'PSČ, mesto',
      email: 'E-mailová adresa',
      bank: 'Bankové spojenie (Názov banky)',
      iban: 'IBAN',
      taxId: 'DIČ alebo rodné číslo',
      submit: 'Vygenerovať návrh zmluvy o dielo',
      contractTitle: 'Návrh zmluvy',
      contractText: 'Zaškrtnutím políčka nižšie potvrdzujem, že vyššie uvedené údaje sú správne a súhlasím s podmienkami zmluvy.',
      agree: 'Súhlasím',
      submitFinal: 'Odoslať a pokračovať',
    },
  };
  const t = translations[lang] || translations.en;

  function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Validate email in real time
    if (name === 'email') {
      if (value && !validateEmail(value)) {
        setEmailError('Prosím, zadajte platnú e-mailovú adresu');
      } else {
        setEmailError('');
      }
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    // Validate email before proceeding
    if (!validateEmail(form.email)) {
      setEmailError('Prosím, zadajte platnú e-mailovú adresu');
      return;
    }
    
    setReviewMode(true);
  }

  async function handleApprove() {
    if (!agreed || loading || submissionInProgress) return;
    console.log('handleApprove called with email:', form.email);
    setLoading(true);
    setSubmissionInProgress(true);
    try {
      let contractId = null;
      
      // Check for existing contract by email
      console.log('Checking for existing contract with email:', form.email);
      const { data: existing, error: fetchError } = await supabase
        .from("contracts")
        .select("id")
        .eq("email", form.email)
        .maybeSingle(); // Use maybeSingle() to avoid errors when no record exists
      
      console.log('Existing contract check result:', { existing, fetchError });
      
        if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('Error checking existing contract:', fetchError);
        setLoading(false);
        setSubmissionInProgress(false);
        return;
      }      if (existing && existing.id) {
        // Update existing contract with latest personal data
        console.log('Updating existing contract with ID:', existing.id);
        contractId = existing.id;
        const { error: updateError } = await supabase.from("contracts").update({
          name: form.name,
          street: form.street,
          postal_code_city: form.city,
          bank_name: form.bank,
          iban: form.iban,
          tin_or_personal_id: form.taxId,
          contract_approved: false,
          questionnaire_status: "not started",
          updated_at: new Date().toISOString()
        }).eq("id", contractId);
        
        if (updateError) {
          console.error('Error updating contract:', updateError);
          setLoading(false);
          setSubmissionInProgress(false);
          return;
        }
        console.log('Successfully updated existing contract');
      } else {
        // Insert new contract only if none exists
        console.log('Creating new contract for email:', form.email);
        const { data, error } = await supabase.from("contracts").insert({
          name: form.name,
          street: form.street,
          postal_code_city: form.city,
          email: form.email,
          bank_name: form.bank,
          iban: form.iban,
          tin_or_personal_id: form.taxId,
          contract_approved: false,
          questionnaire_status: "not started",
          created_at: new Date().toISOString()
        }).select().single();
        
        if (error) {
          console.error('Error creating contract:', error);
          setLoading(false);
          setSubmissionInProgress(false);
          return;
        }
        
        contractId = data?.id || null;
        console.log('Successfully created new contract with ID:', contractId);
      }
      
      // Save to localStorage
      if (contractId) {
        const contractorData = { ...form, contractId };
        console.log('Saving to localStorage:', contractorData);
        window.localStorage.setItem('contractorData', JSON.stringify(contractorData));
        window.localStorage.setItem('contractId', contractId);
      }
      
      setLoading(false);
      onSubmit({ ...form, contractId });
      
      // Navigate to contract page
      console.log('Navigating to contract page');
      window.location.href = "/contract";
    } catch (error) {
      console.error('Unexpected error in handleApprove:', error);
      setLoading(false);
      setSubmissionInProgress(false);
    }
  }

  return (
<div className="w-full max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 rounded-lg" style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', fontFamily: 'Helvetica, Arial, sans-serif' }}>
      <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 sm:mb-6 text-center" style={{color: '#1f2937', fontFamily: 'Helvetica, Arial, sans-serif'}}>{reviewMode ? t.reviewTitle : t.title}</h2>
      {!showContract && !reviewMode ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input name="name" value={form.name} onChange={handleChange} placeholder={t.name} required className="block w-full p-3 rounded-lg transition-colors" style={{ border: '1px solid #d1d5db', backgroundColor: '#ffffff', color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '16px' }} onFocus={(e) => (e.target as HTMLElement).style.borderColor = '#16a34a'} onBlur={(e) => (e.target as HTMLElement).style.borderColor = '#d1d5db'} />
          </div>
          <div>
            <input name="street" value={form.street} onChange={handleChange} placeholder={t.street} required className="block w-full p-3 rounded-lg transition-colors" style={{ border: '1px solid #d1d5db', backgroundColor: '#ffffff', color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '16px' }} onFocus={(e) => (e.target as HTMLElement).style.borderColor = '#16a34a'} onBlur={(e) => (e.target as HTMLElement).style.borderColor = '#d1d5db'} />
          </div>
          <div>
            <input name="city" value={form.city} onChange={handleChange} placeholder={t.city} required className="block w-full p-3 rounded-lg transition-colors" style={{ border: '1px solid #d1d5db', backgroundColor: '#ffffff', color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '16px' }} onFocus={(e) => (e.target as HTMLElement).style.borderColor = '#16a34a'} onBlur={(e) => (e.target as HTMLElement).style.borderColor = '#d1d5db'} />
          </div>
          <div>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder={t.email} required className="block w-full p-3 rounded-lg transition-colors" style={{ border: emailError ? '1px solid #ef4444' : '1px solid #d1d5db', backgroundColor: '#ffffff', color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '16px' }} onFocus={(e) => (e.target as HTMLElement).style.borderColor = emailError ? '#ef4444' : '#16a34a'} onBlur={(e) => (e.target as HTMLElement).style.borderColor = emailError ? '#ef4444' : '#d1d5db'} />
            {emailError && <p className="mt-1 text-sm" style={{ color: '#ef4444', fontFamily: 'Helvetica, Arial, sans-serif' }}>{emailError}</p>}
          </div>
          <div>
            <input name="bank" value={form.bank} onChange={handleChange} placeholder={t.bank} required className="block w-full p-3 rounded-lg transition-colors" style={{ border: '1px solid #d1d5db', backgroundColor: '#ffffff', color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '16px' }} onFocus={(e) => (e.target as HTMLElement).style.borderColor = '#16a34a'} onBlur={(e) => (e.target as HTMLElement).style.borderColor = '#d1d5db'} />
          </div>
          <div>
            <input name="iban" value={form.iban} onChange={handleChange} placeholder={t.iban} required className="block w-full p-3 rounded-lg transition-colors" style={{ border: '1px solid #d1d5db', backgroundColor: '#ffffff', color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '16px' }} onFocus={(e) => (e.target as HTMLElement).style.borderColor = '#16a34a'} onBlur={(e) => (e.target as HTMLElement).style.borderColor = '#d1d5db'} />
          </div>
          <div>
            <input name="taxId" value={form.taxId} onChange={handleChange} placeholder={t.taxId} required className="block w-full p-3 rounded-lg transition-colors" style={{ border: '1px solid #d1d5db', backgroundColor: '#ffffff', color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '16px' }} onFocus={(e) => (e.target as HTMLElement).style.borderColor = '#16a34a'} onBlur={(e) => (e.target as HTMLElement).style.borderColor = '#d1d5db'} />
          </div>
          <button type="submit" disabled={!!emailError} className="w-full mt-6 px-6 py-3 font-semibold rounded-lg transition-all duration-200" style={{ backgroundColor: emailError ? '#d1d5db' : '#16a34a', color: emailError ? '#6b7280' : '#ffffff', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '16px', cursor: emailError ? 'not-allowed' : 'pointer' }} onMouseEnter={(e) => !emailError && ((e.target as HTMLElement).style.backgroundColor = '#15803d')} onMouseLeave={(e) => !emailError && ((e.target as HTMLElement).style.backgroundColor = '#16a34a')}>{t.submit}</button>
        </form>
      ) : reviewMode ? (
        <div className="space-y-4">
          <div className="rounded p-4" style={{ backgroundColor: '#e6f7ff', border: '1px solid #0097b2', color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif' }}>
            <h3 className="font-semibold mb-2" style={{ color: '#0097b2', fontFamily: 'Helvetica, Arial, sans-serif' }}>Review your details</h3>
            <p>
              <span className="font-semibold">{t.name}:</span> {form.name}<br />
              <span className="font-semibold">{t.street}:</span> {form.street}<br />
              <span className="font-semibold">{t.city}:</span> {form.city}<br />
              <span className="font-semibold">{t.email}:</span> {form.email}<br />
              <span className="font-semibold">{t.bank}:</span> {form.bank}<br />
              <span className="font-semibold">{t.iban}:</span> {form.iban}<br />
              <span className="font-semibold">{t.taxId}:</span> {form.taxId}
            </p>
            <p className="mt-4" style={{ color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif' }}>Zaškrtnutím políčka nižšie potvrdzujem, že vyššie uvedené údaje sú správne a súhlasim s podmienkami zmluvy.</p>
          </div>
          <div className="flex items-center">
            <input id="agree" type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mr-2" style={{ accentColor: '#0097b2' }} />
            <label htmlFor="agree" style={{ color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif' }}>
              Súhlasím - <a href="/gdpr" style={{ color: '#0097b2', textDecoration: 'underline', fontFamily: 'Helvetica, Arial, sans-serif' }}>Ochrana osobných údajov</a>
            </label>
          </div>
          <button
            onClick={handleApprove}
            disabled={!agreed || loading || submissionInProgress}
            className="w-full py-2 rounded font-semibold transition"
            style={{
              backgroundColor: agreed && !loading && !submissionInProgress ? '#16a34a' : '#d1d5db',
              color: agreed && !loading && !submissionInProgress ? '#ffffff' : '#6b7280',
              fontFamily: 'Helvetica, Arial, sans-serif',
              cursor: agreed && !loading && !submissionInProgress ? 'pointer' : 'not-allowed'
            }}
            onMouseEnter={(e) => {
              if (agreed && !loading && !submissionInProgress) {
                (e.target as HTMLElement).style.backgroundColor = '#15803d';
              }
            }}
            onMouseLeave={(e) => {
              if (agreed && !loading && !submissionInProgress) {
                (e.target as HTMLElement).style.backgroundColor = '#16a34a';
              }
            }}
          >
            {loading || submissionInProgress ? "Ukladám..." : "Potvrdiť a pokračovať na zmluvu"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
