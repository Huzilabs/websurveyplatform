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
      name: 'Meno a priezvisko:',
      street: 'Ulica, č. d.:',
      city: 'PSČ, mesto:',
      email: 'Email:',
      bank: 'Bankové spojenie (Názov banky):',
      iban: 'IBAN:',
      taxId: 'DIČ alebo rodné číslo:',
      submit: 'Vygenerovať návrh zmluvy o dielo',
      contractTitle: 'Návrh zmluvy',
      contractText: 'Zaškrtnutím tohto políčka prehlasujem, že som si zmluvu riadne prečítal/a a súhlasím s hore uvedenými zmluvnými podmienkami.',
      agree: 'Súhlasím',
      submitFinal: 'Schváliť zmluvu',
    },
  };
  // Use Slovak expressions for Frame 2 as requested by client
  const t = translations['sk'];

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validate email before proceeding
    if (!validateEmail(form.email)) {
      setEmailError('Prosím, zadajte platnú e-mailovú adresu');
      return;
    }

    setLoading(true);
    try {
      // Create or update contract draft in DB and redirect to /contract to show the draft
      let contractId = null;
      const { data: existing, error: fetchError } = await supabase
        .from('contracts')
        .select('id')
        .eq('email', form.email)
        .maybeSingle();

      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('Error checking existing contract:', fetchError);
      }

      if (existing && existing.id) {
        contractId = existing.id;
        const { error: updateError } = await supabase.from('contracts').update({
          name: form.name,
          street: form.street,
          postal_code_city: form.city,
          bank_name: form.bank,
          iban: form.iban,
          tin_or_personal_id: form.taxId,
          contract_approved: false,
          questionnaire_status: 'not started',
          updated_at: new Date().toISOString()
        }).eq('id', contractId);

        if (updateError) console.error('Error updating contract:', updateError);
      } else {
        const { data, error } = await supabase.from('contracts').insert({
          name: form.name,
          street: form.street,
          postal_code_city: form.city,
          email: form.email,
          bank_name: form.bank,
          iban: form.iban,
          tin_or_personal_id: form.taxId,
          contract_approved: false,
          questionnaire_status: 'not started',
          created_at: new Date().toISOString()
        }).select().single();

        if (error) {
          console.error('Error creating contract:', error);
        }

        contractId = data?.id || null;
      }

      // Save to localStorage for contract page to read
      if (contractId) {
        const contractorData = { ...form, contractId };
        window.localStorage.setItem('contractorData', JSON.stringify(contractorData));
        window.localStorage.setItem('contractId', contractId);
      }

      setLoading(false);
      // Redirect to contract page where the draft will be displayed and user can check the box and approve
      window.location.href = '/contract';
    } catch (error) {
      console.error('Unexpected error in handleSubmit:', error);
      setLoading(false);
    }
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
<div className="w-full max-w-3xl mx-auto p-6 sm:p-8 lg:p-12" style={{ backgroundColor: '#ffffff', fontFamily: 'Helvetica, Arial, sans-serif' }}>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 text-center" style={{color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif', letterSpacing: '-0.02em'}}>{reviewMode ? t.reviewTitle : t.title}</h2>
      {!showContract && !reviewMode ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input name="name" value={form.name} onChange={handleChange} placeholder={t.name} required className="block w-full p-4 transition-all duration-300" style={{ border: 'none', borderBottom: '1px solid #e0e0e0', backgroundColor: 'transparent', color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '16px', outline: 'none' }} onFocus={(e) => (e.target as HTMLElement).style.borderBottomColor = '#000000'} onBlur={(e) => (e.target as HTMLElement).style.borderBottomColor = '#e0e0e0'} />
          </div>
          <div>
            <input name="street" value={form.street} onChange={handleChange} placeholder={t.street} required className="block w-full p-4 transition-all duration-300" style={{ border: 'none', borderBottom: '1px solid #e0e0e0', backgroundColor: 'transparent', color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '16px', outline: 'none' }} onFocus={(e) => (e.target as HTMLElement).style.borderBottomColor = '#000000'} onBlur={(e) => (e.target as HTMLElement).style.borderBottomColor = '#e0e0e0'} />
          </div>
          <div>
            <input name="city" value={form.city} onChange={handleChange} placeholder={t.city} required className="block w-full p-4 transition-all duration-300" style={{ border: 'none', borderBottom: '1px solid #e0e0e0', backgroundColor: 'transparent', color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '16px', outline: 'none' }} onFocus={(e) => (e.target as HTMLElement).style.borderBottomColor = '#000000'} onBlur={(e) => (e.target as HTMLElement).style.borderBottomColor = '#e0e0e0'} />
          </div>
          <div>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder={t.email} required className="block w-full p-4 transition-all duration-300" style={{ border: 'none', borderBottom: emailError ? '1px solid #ef4444' : '1px solid #e0e0e0', backgroundColor: 'transparent', color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '16px', outline: 'none' }} onFocus={(e) => (e.target as HTMLElement).style.borderBottomColor = emailError ? '#ef4444' : '#000000'} onBlur={(e) => (e.target as HTMLElement).style.borderBottomColor = emailError ? '#ef4444' : '#e0e0e0'} />
            {emailError && <p className="mt-2 text-sm" style={{ color: '#ef4444', fontFamily: 'Helvetica, Arial, sans-serif' }}>{emailError}</p>}
          </div>
          <div>
            <input name="bank" value={form.bank} onChange={handleChange} placeholder={t.bank} required className="block w-full p-4 transition-all duration-300" style={{ border: 'none', borderBottom: '1px solid #e0e0e0', backgroundColor: 'transparent', color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '16px', outline: 'none' }} onFocus={(e) => (e.target as HTMLElement).style.borderBottomColor = '#000000'} onBlur={(e) => (e.target as HTMLElement).style.borderBottomColor = '#e0e0e0'} />
          </div>
          <div>
            <input name="iban" value={form.iban} onChange={handleChange} placeholder={t.iban} required className="block w-full p-4 transition-all duration-300" style={{ border: 'none', borderBottom: '1px solid #e0e0e0', backgroundColor: 'transparent', color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '16px', outline: 'none' }} onFocus={(e) => (e.target as HTMLElement).style.borderBottomColor = '#000000'} onBlur={(e) => (e.target as HTMLElement).style.borderBottomColor = '#e0e0e0'} />
          </div>
          <div>
            <input name="taxId" value={form.taxId} onChange={handleChange} placeholder={t.taxId} required className="block w-full p-4 transition-all duration-300" style={{ border: 'none', borderBottom: '1px solid #e0e0e0', backgroundColor: 'transparent', color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '16px', outline: 'none' }} onFocus={(e) => (e.target as HTMLElement).style.borderBottomColor = '#000000'} onBlur={(e) => (e.target as HTMLElement).style.borderBottomColor = '#e0e0e0'} />
          </div>
          <button type="submit" disabled={!!emailError} className="w-full mt-10 px-8 py-4 font-medium transition-all duration-300" style={{ backgroundColor: emailError ? '#f5f5f5' : 'transparent', color: emailError ? '#999999' : '#000000', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '16px', cursor: emailError ? 'not-allowed' : 'pointer', border: '2px solid #000000', letterSpacing: '0.05em', borderRadius: '50px' }} onMouseEnter={(e) => !emailError && ((e.target as HTMLElement).style.backgroundColor = '#000000', (e.target as HTMLElement).style.color = '#ffffff')} onMouseLeave={(e) => !emailError && ((e.target as HTMLElement).style.backgroundColor = 'transparent', (e.target as HTMLElement).style.color = '#000000')}>{t.submit}</button>
        </form>
      ) : reviewMode ? (
        <div className="space-y-8">
          <div className="p-8" style={{ backgroundColor: '#fafafa', color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif' }}>
            <h3 className="text-lg font-semibold mb-6" style={{ color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif' }}>Skontrolujte svoje údaje</h3>
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
          <div className="flex items-start py-6">
            <input id="agree" type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mr-3 mt-1" style={{ accentColor: '#000000', width: '18px', height: '18px' }} />
            <label htmlFor="agree" className="text-sm leading-relaxed" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif' }}>
              Zaškrtnutím tohto políčka prehlasujem, že som si zmluvu riadne prečítal/a a súhlasím s hore uvedenými zmluvnými podmienkami.
            </label>
          </div>
          <button
            onClick={handleApprove}
            disabled={!agreed || loading || submissionInProgress}
            className="w-full py-4 font-medium transition-all duration-300"
            style={{
              backgroundColor: agreed && !loading && !submissionInProgress ? '#000000' : '#f5f5f5',
              color: agreed && !loading && !submissionInProgress ? '#ffffff' : '#999999',
              fontFamily: 'Helvetica, Arial, sans-serif',
              border: '1px solid #000000',
              cursor: agreed && !loading && !submissionInProgress ? 'pointer' : 'not-allowed',
              letterSpacing: '0.05em'
            }}
            onMouseEnter={(e) => {
              if (agreed && !loading && !submissionInProgress) {
                (e.target as HTMLElement).style.backgroundColor = '#ffffff';
                (e.target as HTMLElement).style.color = '#000000';
              }
            }}
            onMouseLeave={(e) => {
              if (agreed && !loading && !submissionInProgress) {
                (e.target as HTMLElement).style.backgroundColor = '#000000';
                (e.target as HTMLElement).style.color = '#ffffff';
              }
            }}
          >
            {loading || submissionInProgress ? "UKLADÁM..." : "POKRAČOVAŤ"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
