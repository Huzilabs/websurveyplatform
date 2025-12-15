

"use client";

import Link from "next/link";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ 
      fontFamily: 'Helvetica, Arial, sans-serif',
      backgroundColor: '#ffffff'
    }}>
      {/* Hero Section */}
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
        <div className="w-full max-w-5xl mx-auto">
          
          {/* Main Heading */}
          <div className="text-center mb-16 sm:mb-20">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" style={{ 
              fontFamily: 'Helvetica, Arial, sans-serif',
              color: '#000000',
              letterSpacing: '-0.02em',
              lineHeight: '1.1'
            }}>
              Vitajte!
            </h1>
            <p className="text-xl sm:text-2xl mb-12" style={{ 
              fontFamily: 'Helvetica, Arial, sans-serif',
              color: '#666666',
              fontWeight: '300'
            }}>
              Váš názor formuje budúcnosť zdravotnej starostlivosti
            </p>
          </div>

          {/* Why Participate Section */}
          <div className="mb-16 sm:mb-20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center" style={{ 
              fontFamily: 'Helvetica, Arial, sans-serif',
              color: '#000000'
            }}>
              Prečo sa zapojiť
            </h2>
          
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
              <div className="p-6 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                <div className="w-3 h-3 bg-black rounded-full mb-4"></div>
                <p className="text-base leading-relaxed" style={{ color: '#333333' }}>
                  Vaše názory majú reálny dopad na tvorbu edukácie pre lekárov aj pacientov.
                </p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                <div className="w-3 h-3 bg-black rounded-full mb-4"></div>
                <p className="text-base leading-relaxed" style={{ color: '#333333' }}>
                  Prieskum je anonymný v oblasti odpovedí, administrácia prebieha cez zabezpečený portál.
                </p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                <div className="w-3 h-3 bg-black rounded-full mb-4"></div>
                <p className="text-base leading-relaxed" style={{ color: '#333333' }}>
                  Vyplnenie dotazníka trvá približne 60 minút.
                </p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                <div className="w-3 h-3 bg-black rounded-full mb-4"></div>
                <p className="text-base leading-relaxed" style={{ color: '#333333' }}>
                  Neexistujú správne alebo nesprávne odpovede – dôležitý je Váš osobný odborný názor.
                </p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                <div className="w-3 h-3 bg-black rounded-full mb-4"></div>
                <p className="text-base leading-relaxed" style={{ color: '#333333' }}>
                  Po vyplnení všetkých položiek bude možné úspešne dokončiť dotazník.
                </p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                <div className="w-3 h-3 bg-black rounded-full mb-4"></div>
                <p className="text-base leading-relaxed" style={{ color: '#333333' }}>
                  Vyplnenie celého dotazníka je podmienkou účasti a následne aj odmeny.
                </p>
              </div>
            </div>
          </div>

          {/* Steps Section */}
          <div className="mb-16 sm:mb-20">
            <h3 className="text-2xl sm:text-3xl font-bold mb-12 text-center" style={{ 
              fontFamily: 'Helvetica, Arial, sans-serif',
              color: '#000000'
            }}>
              Ako sa zapojiť
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center text-2xl font-bold" style={{ border: '2px solid #000000', color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif' }}>
                  1
                </div>
                <h4 className="text-lg font-semibold mb-3" style={{ color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif' }}>
                  Vyplňte osobné údaje
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif' }}>
                  Zadajte základné informácie potrebné na vygenerovanie zmluvy
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center text-2xl font-bold" style={{ border: '2px solid #000000', color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif' }}>
                  2
                </div>
                <h4 className="text-lg font-semibold mb-3" style={{ color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif' }}>
                  Elektronicky potvrďte zmluvu
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif' }}>
                  Prečítajte si zmluvu a potvrďte súhlas
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center text-2xl font-bold" style={{ border: '2px solid #000000', color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif' }}>
                  3
                </div>
                <h4 className="text-lg font-semibold mb-3" style={{ color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif' }}>
                  Vyplňte dotazník
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif' }}>
                  Zdieľajte svoje odborné skúsenosti a názory
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Link href="/personal-data">
              <button 
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
                Začať teraz
              </button>
            </Link>
            <p className="mt-6 text-sm" style={{ fontFamily: 'Helvetica, Arial, sans-serif', color: '#999999', letterSpacing: '0.05em' }}>
              ANONYMNÝ • BEZPEČNÝ • ODMENENÝ
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}

