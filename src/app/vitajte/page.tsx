"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function VitajtePageContent() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: 'Helvetica, Arial, sans-serif', backgroundColor: '#ffffff' }}>
      <Header />
      
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
        <div className="w-full max-w-5xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-16 sm:mb-20">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" style={{ 
              fontFamily: 'Helvetica, Arial, sans-serif',
              color: '#000000',
              letterSpacing: '-0.02em',
              lineHeight: '1.1'
            }}>
              Vitajte!
            </h1>
            <p className="text-lg sm:text-xl" style={{ color: '#666666' }}>
              Ďakujeme, že ste prijali pozvánku na účasť v prieskume MedInsights 2026.
            </p>
          </div>

          {/* Survey Instructions */}
          <div className="mb-16 sm:mb-20 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center" style={{ 
              fontFamily: 'Helvetica, Arial, sans-serif',
              color: '#000000'
            }}>
              Ako pokračovať
            </h2>
          
            <div className="space-y-6">
              <div className="p-6 border border-gray-200 rounded-lg" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</span>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Vyplňte osobné údaje</h3>
                    <p style={{ color: '#666666' }}>Zadajte základné informácie potrebné na vygenerovanie zmluvy a verifikáciu vašej účasti.</p>
                  </div>
                </div>
              </div>

              <div className="p-6 border border-gray-200 rounded-lg" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</span>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Elektronicky potvrďte zmluvu</h3>
                    <p style={{ color: '#666666' }}>Prečítajte si zmluvu a potvrďte svoj súhlas s podmienkami prieskumu.</p>
                  </div>
                </div>
              </div>

              <div className="p-6 border border-gray-200 rounded-lg" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</span>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Vyplňte dotazník</h3>
                    <p style={{ color: '#666666' }}>Zdieľajte svoje odborné skúsenosti a názory. Vyplnenie trvá približne 60 minút.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button 
              onClick={() => router.push("/personal-data")}
              className="px-12 py-4 text-lg font-medium transition-all duration-300 inline-block"
              style={{ 
                backgroundColor: 'transparent',
                color: '#000000',
                fontFamily: 'Helvetica, Arial, sans-serif',
                border: '2px solid #000000',
                borderRadius: '50px'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = '#000000';
                (e.target as HTMLElement).style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = 'transparent';
                (e.target as HTMLElement).style.color = '#000000';
              }}
            >
              Pokračovať na dotazník
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
