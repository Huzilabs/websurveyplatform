"use client";
import React from "react";
import Link from "next/link";
import Footer from "../../components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #e6f7ff 50%, #ffffff 100%)', fontFamily: 'Helvetica, Arial, sans-serif' }}>
      <div className="flex flex-col items-center justify-center flex-1 px-4">
        <div className="text-center mb-8">
          <img src="/logo.png" alt="MedInsights Logo" className="mx-auto mb-6" style={{ maxWidth: 250, filter: 'drop-shadow(0 10px 20px rgba(0, 151, 178, 0.2))' }} />
          <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: '#0097b2' }}></div>
        </div>
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8" style={{ color: '#0097b2', fontFamily: 'Helvetica, Arial, sans-serif', textShadow: '0 2px 4px rgba(0, 151, 178, 0.1)' }}>Vitajte v prieskume MedInsights 2025!</h1>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="p-6 rounded-xl" style={{ backgroundColor: '#ffffff', border: '1px solid #0097b2', boxShadow: '0 10px 25px rgba(0, 151, 178, 0.1)' }}>
              <h2 className="text-xl font-bold mb-4 flex items-center" style={{ color: '#0097b2', fontFamily: 'Helvetica, Arial, sans-serif' }}>
                <span className="mr-3 text-2xl">✨</span> Prečo sa zapojiť
              </h2>
              <ul className="space-y-3 text-left" style={{ color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif' }}>
                <li className="flex items-start">
                  <span className="mr-3 mt-1 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#0097b2' }}></span>
                  <span>Vaše názory majú reálny dopad na tvorbu edukácie pre lekárov aj pacientov</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#0097b2' }}></span>
                  <span>Prieskum je anonymný, administrácia prebieha cez zabezpečený portál</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#0097b2' }}></span>
                  <span>Vyplnenie dotazníka trvá približne 60 minút</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#0097b2' }}></span>
                  <span>Dôležitý je Váš osobný odborný názor - nie sú správne či nesprávne odpovede</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#0097b2' }}></span>
                  <span>Vyplnenie celého dotazníka je podmienkou účasti a odmeny</span>
                </li>
              </ul>
            </div>
            <div className="p-6 rounded-xl" style={{ backgroundColor: '#ffffff', border: '1px solid #0097b2', boxShadow: '0 10px 25px rgba(0, 151, 178, 0.1)' }}>
              <h2 className="text-xl font-bold mb-4 flex items-center" style={{ color: '#0097b2', fontFamily: 'Helvetica, Arial, sans-serif' }}>
                <span className="mr-3 text-2xl">🚀</span> Ako sa zapojiť
              </h2>
              <div className="space-y-4 text-left" style={{ color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif' }}>
                <div className="flex items-center p-3 rounded-lg" style={{ backgroundColor: '#e6f7ff' }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center mr-4 text-white font-bold" style={{ backgroundColor: '#0097b2' }}>1</div>
                  <span>Vyplňte osobné údaje</span>
                </div>
                <div className="flex items-center p-3 rounded-lg" style={{ backgroundColor: '#e6f7ff' }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center mr-4 text-white font-bold" style={{ backgroundColor: '#0097b2' }}>2</div>
                  <span>Elektronicky potvrďte zmluvu</span>
                </div>
                <div className="flex items-center p-3 rounded-lg" style={{ backgroundColor: '#e6f7ff' }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center mr-4 text-white font-bold" style={{ backgroundColor: '#0097b2' }}>3</div>
                  <span>Vyplňte dotazník</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <Link href="/personal-data">
              <button className="px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105" style={{ 
                backgroundColor: '#16a34a', 
                color: '#ffffff', 
                fontFamily: 'Helvetica, Arial, sans-serif',
                boxShadow: '0 10px 25px rgba(34, 197, 94, 0.3)',
                border: 'none'
              }} onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = '#15803d';
                (e.target as HTMLElement).style.boxShadow = '0 15px 35px rgba(34, 197, 94, 0.4)';
              }} onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = '#16a34a';
                (e.target as HTMLElement).style.boxShadow = '0 10px 25px rgba(34, 197, 94, 0.3)';
              }}>
                🚀 Začať prieskum
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer variant="landing" />
    </div>
  );
}
