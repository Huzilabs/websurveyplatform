"use client";

import Link from "next/link";
import Footer from "../../components/Footer";

export default function GDPRPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#ffffff', fontFamily: 'Helvetica, Arial, sans-serif' }}>
      <div className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="mb-12 pb-6" style={{ borderBottom: '1px solid #e5e7eb' }}>
            <Link href="/" style={{ color: '#999999', fontSize: '13px', textDecoration: 'none', letterSpacing: '0.05em', transition: 'color 0.3s' }}>← SPÄŤ</Link>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-6" style={{ color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif', letterSpacing: '-0.02em' }}>Zásady spracúvania osobných údajov</h1>
          <p className="text-base mb-16" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif' }}>GDPR - Ochrana osobných údajov</p>
          
          <div className="space-y-16">
            <section>
              <h2 className="text-2xl font-normal mb-6" style={{ color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif', letterSpacing: '-0.01em' }}>Zásady spracúvania osobných údajov</h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif', lineHeight: '1.8' }}>
                V súlade s legislatívou o ochrane osobných údajov (GDPR) sme vypracovali zásady spracúvania osobných údajov. Keďže naša spoločnosť plne rešpektuje Vaše právo na súkromie, chceli by sme Vás na tomto mieste informovať ako nakladáme aj s vašimi osobnými údajmi a aké sú vaše práva v zmysle Nariadenia Európskeho parlamentu a Rady EÚ 2016/679 z 27. apríla 2016 o ochrane fyzických osôb pri spracúvaní osobných údajov a o voľnom pohybe takýchto údajov a zákona č. 18/2018 Z. z. o ochrane osobných údajov.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-normal mb-6" style={{ color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif', letterSpacing: '-0.01em' }}>Informácie o spracúvaní osobných údajov</h2>
              <p className="text-base leading-relaxed" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif', lineHeight: '1.8' }}>
                Odporúčame prečítať si celú informáciu o spracúvaní osobných údajov a v prípade akýchkoľvek otázok alebo nejasnosti, obráťte sa na našu zodpovednú osobu určenú na výkon dohľadu nad ochranou osobných údajov: <a href="mailto:podpora@medinsights.sk" style={{ color: '#000000', textDecoration: 'none', borderBottom: '1px solid #000000' }}>podpora@medinsights.sk</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-normal mb-6" style={{ color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif', letterSpacing: '-0.01em' }}>Kto sme a aké osobné údaje spracúvame</h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif', lineHeight: '1.8' }}>
                Vaše osobné údaje spracúva <span style={{ fontWeight: '600', color: '#000000' }}>KOLLÁR & THIRY s. r. o.</span>, Antona Floreka 8680/14A, 841 06 Bratislava, IČO: 546 30 223 (ďalej len ako „KOLLÁR & THIRY") pretože je to nevyhnutné za účelom poskytovania služieb, ktoré pre vás spoločnosť KOLLÁR & THIRY s. r. o. zaisťuje, tiež z dôvodu oprávneného záujmu a pre plnenie verejnoprávnych povinností tejto spoločnosti.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif', lineHeight: '1.8' }}>
                Cieľom týchto zásad je poskytnúť vám ako zákazníkom, obchodným partnerom a priaznivcom našej spoločnosti na nami ponúkané produkty a služby informáciu najmä o tom, akým spôsobom, na aké účely a akými subjektmi sa vaše osobné údaje spracúvajú.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-normal mb-6" style={{ color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif', letterSpacing: '-0.01em' }}>1. Kontaktné údaje prevádzkovateľa a zodpovednej osoby</h2>
              <p className="text-base leading-relaxed" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif', lineHeight: '1.8' }}>
                Právnym základom spracúvania vašich osobných údajov je skutočnosť, že toto spracúvanie je nevyhnutné pre poskytovanie našich služieb a plnenie zmluvných vzťahov.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-normal mb-6" style={{ color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif', letterSpacing: '-0.01em' }}>2. Účel, právny základ a doba spracúvania osobných údajov</h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif', lineHeight: '1.8' }}>
                Právnym základom spracúvania vašich osobných údajov je skutočnosť, že toto spracúvanie je nevyhnutné pre:
              </p>
              <ul className="space-y-2 ml-6" style={{ listStyleType: 'none' }}>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-black mt-2" style={{ minWidth: '6px', minHeight: '6px', borderRadius: '50%' }}></div>
                  <span className="text-base" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif' }}>plnenie zmluvy, ktorej zmluvnou stranou je dotknutá osoba</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-black mt-2" style={{ minWidth: '6px', minHeight: '6px', borderRadius: '50%' }}></div>
                  <span className="text-base" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif' }}>splnenie zákonnej povinnosti</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-black mt-2" style={{ minWidth: '6px', minHeight: '6px', borderRadius: '50%' }}></div>
                  <span className="text-base" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif' }}>oprávnené záujmy prevádzkovateľa</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-normal mb-6" style={{ color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif', letterSpacing: '-0.01em' }}>3. Práva dotknutých osôb</h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif', lineHeight: '1.8' }}>
                Zo strany prevádzkovateľa nedochádza k automatizovanému individuálnemu rozhodovaniu. Ako dotknutá osoba máte nasledujúce práva:
              </p>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-3" style={{ color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif' }}>Právo na prístup k údajom podľa čl. 15 všeobecného nariadenia o ochrane údajov</h3>
                  <p className="text-base leading-relaxed" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif', lineHeight: '1.8' }}>
                    Máte právo získať od nás informáciu o tom, či spracúvame Vaše osobné údaje. V prípade, ak Vaše osobné údaje spracúvame, máte právo získať prístup k týmto osobným údajom, a to v rozsahu: účel spracúvania, kategória osobných údajov, príjemcovia osobných údajov, doba spracúvania osobných údajov a informácia o zdroji, z ktorého sme Vaše osobné údaje získali. Ďalej máte právo na poskytnutie kópie Vašich osobných údajov.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3" style={{ color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif' }}>Právo na opravu alebo doplnenie podľa čl. 16 všeobecného nariadenia o ochrane údajov</h3>
                  <p className="text-base leading-relaxed" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif', lineHeight: '1.8' }}>
                    Máte právo požiadať o opravu nesprávnych osobných údajov alebo o doplnenie neúplných osobných údajov, ktoré o Vás spracúvame. Využitím tohto práva korektným spôsobom pomôžete udržiavať Vaše osobné údaje správne a aktuálne.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3" style={{ color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif' }}>Právo na vymazanie (právo „na zabudnutie") podľa čl. 17 všeobecného nariadenia o ochrane údajov</h3>
                  <p className="text-base leading-relaxed mb-4" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif', lineHeight: '1.8' }}>
                    Máte právo požiadať, aby bez zbytočného odkladu boli vymazané Vaše osobné údaje, ak je naplnený niektorý z týchto dôvodov:
                  </p>
                  <ul className="space-y-2 ml-6" style={{ listStyleType: 'none' }}>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-black mt-2" style={{ minWidth: '6px', minHeight: '6px', borderRadius: '50%' }}></div>
                      <span className="text-base" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif' }}>osobné údaje už nie sú potrebné na účely, na ktoré sa získavali alebo inak spracúvali</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-black mt-2" style={{ minWidth: '6px', minHeight: '6px', borderRadius: '50%' }}></div>
                      <span className="text-base" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif' }}>dotknutá osoba odvolá súhlas a neexistuje iný právny základ pre spracúvanie</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-black mt-2" style={{ minWidth: '6px', minHeight: '6px', borderRadius: '50%' }}></div>
                      <span className="text-base" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif' }}>dotknutá osoba namieta voči spracúvaniu podľa článku 21 ods. 1 všeobecného nariadenia o ochrane údajov</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-black mt-2" style={{ minWidth: '6px', minHeight: '6px', borderRadius: '50%' }}></div>
                      <span className="text-base" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif' }}>osobné údaje sa spracúvali nezákonne</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-black mt-2" style={{ minWidth: '6px', minHeight: '6px', borderRadius: '50%' }}></div>
                      <span className="text-base" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif' }}>osobné údaje musia byť vymazané, aby sa splnila zákonná povinnosť</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3" style={{ color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif' }}>Právo na obmedzenie spracúvania podľa čl. 18 všeobecného nariadenia o ochrane údajov</h3>
                  <p className="text-base leading-relaxed mb-4" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif', lineHeight: '1.8' }}>
                    Máte právo na základe žiadosti o blokáciu Vašich osobných údajov (obmedzenie spracúvania Vašich osobných údajov na ich uchovávanie) v týchto prípadoch:
                  </p>
                  <ul className="space-y-2 ml-6" style={{ listStyleType: 'none' }}>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-black mt-2" style={{ minWidth: '6px', minHeight: '6px', borderRadius: '50%' }}></div>
                      <span className="text-base" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif' }}>v čase overovania správnosti osobných údajov</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-black mt-2" style={{ minWidth: '6px', minHeight: '6px', borderRadius: '50%' }}></div>
                      <span className="text-base" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif' }}>ak sú osobné údaje spracúvané nezákonne</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-black mt-2" style={{ minWidth: '6px', minHeight: '6px', borderRadius: '50%' }}></div>
                      <span className="text-base" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif' }}>potrebujete osobné údaje na preukázanie, uplatňovanie alebo obhajovanie právnych nárokov</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3" style={{ color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif' }}>Právo na prenosnosť údajov podľa čl. 20 všeobecného nariadenia o ochrane údajov</h3>
                  <p className="text-base leading-relaxed" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif', lineHeight: '1.8' }}>
                    Máte právo získať Vaše osobné údaje, ktoré ste nám poskytli, v štruktúrovanom, bežne používanom a strojovo čitateľnom formáte. Máte právo od nás požadovať, aby sme Vaše osobné údaje preniesli od spoločnosti KOLLÁR & THIRY s. r. o. k inému prevádzkovateľovi, a to za predpokladu, že je to technicky možné.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3" style={{ color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif' }}>Právo namietať podľa čl. 21 všeobecného nariadenia o ochrane údajov</h3>
                  <p className="text-base leading-relaxed mb-4" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif', lineHeight: '1.8' }}>
                    Máte právo kedykoľvek namietať voči spracúvaniu Vašich osobných údajov, ak právnym základom spracúvania osobných údajov je oprávnený záujem, a to zaslaním písomnej žiadosti na e-mailovú adresu <a href="mailto:podpora@medinsights.sk" style={{ color: '#000000', textDecoration: 'none', borderBottom: '1px solid #000000' }}>podpora@medinsights.sk</a> poštou alebo osobným odovzdaním písomnej žiadosti v sídle spoločnosti KOLLÁR & THIRY s. r. o.
                  </p>
                  <p className="text-base leading-relaxed mb-4" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif', lineHeight: '1.8' }}>
                    Po doručení námietky Vaše osobné údaje zlikvidujeme, s výnimkou nasledujúcich prípadov:
                  </p>
                  <ul className="space-y-2 ml-6" style={{ listStyleType: 'none' }}>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-black mt-2" style={{ minWidth: '6px', minHeight: '6px', borderRadius: '50%' }}></div>
                      <span className="text-base" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif' }}>ak spoločnosť preukáže nevyhnutné oprávnené dôvody na spracúvanie</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-black mt-2" style={{ minWidth: '6px', minHeight: '6px', borderRadius: '50%' }}></div>
                      <span className="text-base" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif' }}>ak sa preukáže, že osobné údaje spoločnosť potrebuje na preukazovanie, uplatňovanie alebo obhajovanie právnych nárokov</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3" style={{ color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif' }}>Automatizované individuálne rozhodovanie vrátane profilovania podľa čl. 22</h3>
                  <p className="text-base leading-relaxed" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif', lineHeight: '1.8' }}>
                    Máte právo na to, aby sa na Vás nevzťahovalo rozhodnutie, ktoré je založené výlučne na automatizovanom spracúvaní, vrátane profilovania. Pri poskytovaní našich služieb nedochádza k automatizovanému individuálnemu rozhodovaniu v zmysle všeobecného nariadenia o ochrane údajov.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3" style={{ color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif' }}>Právo podať sťažnosť dozornému orgánu podľa čl. 77 všeobecného nariadenia o ochrane údajov</h3>
                  <p className="text-base leading-relaxed mb-4" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif', lineHeight: '1.8' }}>
                    Pokiaľ sa domnievate, že došlo k porušeniu Vašich práv k osobným údajom alebo k porušeniu spracúvania Vašich údajov, máte právo obrátiť sa so sťažnosťou na dozorný orgán, ktorým je:
                  </p>
                  <div className="pl-6 mb-4" style={{ borderLeft: '2px solid #f0f0f0' }}>
                    <p className="text-base leading-relaxed" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif', lineHeight: '1.8' }}>
                      Úrad na ochranu osobných údajov SR<br />
                      Hraničná 4826/12<br />
                      820 07 Bratislava 27<br />
                      Tel: +421 2 3231 3214<br />
                      Email: statny.dozor@pdp.gov.sk<br />
                      Web: <a href="https://www.dataprotection.gov.sk" target="_blank" rel="noopener noreferrer" style={{ color: '#000000', textDecoration: 'none', borderBottom: '1px solid #000000' }}>www.dataprotection.gov.sk</a>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-normal mb-6" style={{ color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif', letterSpacing: '-0.01em' }}>4. Uplatnenie Vašich práv podľa čl. 12 všeobecného nariadenia o ochrane údajov</h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif', lineHeight: '1.8' }}>
                Spoločnosť KOLLÁR & THIRY s. r. o. poskytne informácie ohľadom spracúvania osobných údajov len na základe žiadosti dotknutej osoby pri výkone jej práv, a to za predpokladu, že dotknutú osobu je preukázateľne schopná identifikovať. Bez úspešného overenia Vašej identity nie je spoločnosť povinná poskytovať akékoľvek informácie ohľadom spracúvania osobných údajov.
              </p>
              <p className="text-base leading-relaxed mb-6" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif', lineHeight: '1.8' }}>
                Vaše práva k osobným údajom si môžete uplatniť nasledujúcimi spôsobmi:
              </p>
              <ul className="space-y-3 ml-6 mb-6" style={{ listStyleType: 'none' }}>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-black mt-2" style={{ minWidth: '6px', minHeight: '6px', borderRadius: '50%' }}></div>
                  <span className="text-base" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif' }}>osobne v sídle spoločnosti KOLLÁR & THIRY s. r. o.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-black mt-2" style={{ minWidth: '6px', minHeight: '6px', borderRadius: '50%' }}></div>
                  <span className="text-base" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif' }}>poštou na adrese: KOLLÁR & THIRY s. r. o., Antona Floreka 8680/14A, 841 06 Bratislava</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-black mt-2" style={{ minWidth: '6px', minHeight: '6px', borderRadius: '50%' }}></div>
                  <span className="text-base" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif' }}>emailom zaslaným na adresu: <a href="mailto:podpora@medinsights.sk" style={{ color: '#000000', textDecoration: 'none', borderBottom: '1px solid #000000' }}>podpora@medinsights.sk</a></span>
                </li>
              </ul>
              <p className="text-base leading-relaxed" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif', lineHeight: '1.8' }}>
                Žiadosť musí obsahovať všetky potrebné informácie a prílohy nevyhnutné na jej vybavenie a posúdenie Vašich nárokov ohľadom spracúvania osobných údajov. V prípade, ak bude Vaša žiadosť neúplná, budeme Vás kontaktovať s cieľom doplnenia žiadosti.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-normal mb-6" style={{ color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif', letterSpacing: '-0.01em' }}>5. Informácie o povahe poskytnutých osobných údajov</h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif', lineHeight: '1.8' }}>
                V prípade, ak právnym základom spracúvania osobných údajov je zmluva, poskytnutie osobných údajov je zmluvnou požiadavkou. Dotknutá osoba je povinná poskytnúť osobné údaje; v prípade neposkytnutia takýchto údajov nie je možné uzatvorenie zmluvného vzťahu.
              </p>
              <p className="text-base leading-relaxed mb-6" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif', lineHeight: '1.8' }}>
                V prípade, ak právnym základom spracúvania osobných údajov je zákon, poskytnutie osobných údajov je zákonnou požiadavkou. Dotknutá osoba je povinná poskytnúť osobné údaje, v opačnom prípade nie je možné riadne plnenie povinností prevádzkovateľa vyplývajúcich z príslušných všeobecne záväzných právnych predpisov.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif', lineHeight: '1.8' }}>
                V prípade ak právny základ je súhlas, dotknutá osoba má právo súhlas kedykoľvek odvolať.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-normal mb-6" style={{ color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif', letterSpacing: '-0.01em' }}>Záverečné ustanovenia</h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif', lineHeight: '1.8' }}>
                Spoločnosť KOLLÁR & THIRY s. r. o. si vyhradzuje právo na akúkoľvek aktualizáciu tejto informačnej povinnosti, a to najmä v súvislosti so zmenami v legislatívnych procesoch. Aktuálna verzia bude aktualizovaná na webovej stránke prevádzkovateľa.
              </p>
              <p className="text-base leading-relaxed mb-6" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif', lineHeight: '1.8' }}>
                V prípade, ak dôjde k podstatnej zmene ochrany osobných údajov, najmä spôsobu spracúvania osobných údajov, spoločnosť KOLLÁR & THIRY s. r. o. si svoju informačnú povinnosť splní tak, že táto zmena bude zverejnená na webovej stránke spoločnosti alebo osobitným oznámením prostredníctvom emailu.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif', lineHeight: '1.8' }}>
                Týmito zásadami Vás chceme ubezpečiť, že k osobným údajom pristupujeme s najväčšou starostlivosťou a rešpektom, riadiac sa platnými právnymi predpismi a využívajúc dostupnú mieru technickej ochrany. V prípade otázok týkajúcich sa ochrany osobných údajov, na ktoré ste nenašli odpoveď v tomto dokumente, napíšte na e-mailovú adresu: <a href="mailto:podpora@medinsights.sk" style={{ color: '#000000', textDecoration: 'none', borderBottom: '1px solid #000000' }}>podpora@medinsights.sk</a>
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
