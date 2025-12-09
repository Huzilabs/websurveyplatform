

"use client";

import Link from "next/link";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ 
      // background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      fontFamily: 'Helvetica, Arial, sans-serif' 
    }}>
      <div className="max-w-3xl mx-auto px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-8" style={{ 
            fontFamily: 'Helvetica, Arial, sans-serif',
            color: '#1e293b'
          }}>
            Vitajte!
          </h1>
          <h2 className="text-2xl font-semibold mb-6" style={{ 
            fontFamily: 'Helvetica, Arial, sans-serif',
            color: '#334155'
          }}>
            Prečo sa zapojiť
          </h2>
          
          <div className="text-left max-w-2xl mx-auto mb-8">
            <ul className="space-y-3 text-base" style={{ fontFamily: 'Helvetica, Arial, sans-serif', color: '#475569' }}>
              <li className="flex items-start">
                <span className="mr-3 mt-1.5 w-2 h-2 bg-green-600 rounded-full flex-shrink-0"></span>
                Vaše názory majú reálny dopad na tvorbu edukácie pre lekárov aj pacientov.
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1.5 w-2 h-2 bg-green-600 rounded-full flex-shrink-0"></span>
                Prieskum je anonymný v oblasti odpovedí, administrácia prebieha cez zabezpečený portál.
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1.5 w-2 h-2 bg-green-600 rounded-full flex-shrink-0"></span>
                Vyplnenie dotazníka trvá približne 60 minút.
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1.5 w-2 h-2 bg-green-600 rounded-full flex-shrink-0"></span>
                Neexistujú správne alebo nesprávne odpovede – dôležitý je Váš osobný odborný názor.
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1.5 w-2 h-2 bg-green-600 rounded-full flex-shrink-0"></span>
                Po vyplnení všetkých položiek bude možné úspešne dokončiť dotazník.
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1.5 w-2 h-2 bg-green-600 rounded-full flex-shrink-0"></span>
                Vyplnenie celého dotazníka je podmienkou účasti a následne aj odmeny.
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mb-6" style={{ 
            fontFamily: 'Helvetica, Arial, sans-serif',
            color: '#334155'
          }}>
            Ako sa zapojiť v 3 jednoduchých krokoch
          </h3>
          
          <div className="text-left max-w-xl mx-auto mb-12">
            <ol className="space-y-3 text-base" style={{ fontFamily: 'Helvetica, Arial, sans-serif', color: '#475569' }}>
              <li className="flex items-start">
                <span className="mr-3 mt-0.5 w-6 h-6 bg-green-600 text-white text-sm font-semibold rounded-full flex items-center justify-center flex-shrink-0">1</span>
                Vyplňte osobné údaje
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-0.5 w-6 h-6 bg-green-600 text-white text-sm font-semibold rounded-full flex items-center justify-center flex-shrink-0">2</span>
                Elektronicky potvrďte zmluvu.
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-0.5 w-6 h-6 bg-green-600 text-white text-sm font-semibold rounded-full flex items-center justify-center flex-shrink-0">3</span>
                Vyplňte dotazník
              </li>
            </ol>
          </div>
        </div>

        <div className="text-center">
          <Link href="/personal-data">
            <button 
              className="px-8 py-4 rounded-2xl text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              style={{ 
                backgroundColor: '#16a34a',
                color: '#ffffff',
                fontFamily: 'Helvetica, Arial, sans-serif',
                boxShadow: '0 10px 25px rgba(22, 163, 74, 0.3)',
                border: 'none'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = '#15803d';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = '#16a34a';
              }}
            >
              Vyplniť osobné údaje
            </button>
          </Link>
          <p className="mt-4 text-sm text-gray-500" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            Anonymný • Bezpečný • Odmenený
          </p>
        </div>
      </div>
    </div>
  );
}

