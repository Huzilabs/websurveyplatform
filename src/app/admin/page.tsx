'use client';
import { useEffect, useState } from 'react';
// import { supabase } from '../lib/supabaseClient';
import { supabase } from '@/lib/supabaseClient';
import { Document, Packer, Paragraph, TextRun } from 'docx';

interface ContractData {
  id: string;
  name: string;
  email: string;
  street: string;
  postal_code_city: string;
  bank_name: string;
  iban: string;
  tin_or_personal_id: string;
  contract_approved: boolean;
  questionnaire_status: string;
  created_at: string;
  updated_at: string;
  submitted_at?: string;
  login_timestamp?: string;
  contract_url?: string;
  "1.1"?: string;
  "1.2"?: string;
  "1.3"?: string;
  "1.4"?: string;
  // Demographic data
  age?: string;
  gender?: string;
  practice_years?: string;
  workplace_type?: string;
  workplace_type_other?: string;
  region?: string;
  specialization?: string;
  // Biosimilar questions
  q1_trust_expert?: string;
  q2_info_sources?: string;
  q2_other?: string;
  q3_better_orientation?: string;
  q4_communication_form?: string;
  q5_effectiveness_rating?: string;
  q6_safety_rating?: string;
  q7_side_effects_risk?: string;
  q8_safety_support?: string;
  q9_use_biosimilars?: string;
  q10_diagnoses_usage?: string;
  q11_barriers_usage?: string;
  q12_prescribe_frequency?: string;
  q13_prescription_reason?: string;
  q14_patient_transition?: string;
  q15_original_response_influence?: string;
  q16_switching_motivators?: string;
  q17_transition_conditions?: string;
  q18_patient_presentation?: string;
  q19_discuss_origin_frequency?: string;
  q20_prescription_barriers?: string;
  q21_indication_experience?: string;
  q22_transition_advantages?: string;
  q23_patient_decision_factors?: string;
  q24_info_accuracy_rating?: string;
  q25_communication_improvements?: string;
  q26_necessary_conditions?: string;
  q27_additional_info_needed?: string;
  q28_colleague_consultation_frequency?: string;
  q29_patient_advantages?: string;
  q_v2_1: string;
  q_v2_2: string;
  q_v2_3: string;
  q_v2_4: string;
  q_v3_1: string;
  q_v3_2: string;
  q_v4_1: string;
  q_v4_2: string;
  q_v4_3: string;
  q_v5_1: string;
  q_v6_1: string;
  q_v6_2: string;
  q_v6_3: string;
  q_v7_1: string
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [contracts, setContracts] = useState<ContractData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContract, setSelectedContract] = useState<ContractData | null>(null);
  const [view, setView] = useState<'list' | 'detail'>('list');

  // Check for existing authentication on component mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('adminAuth');
    if (savedAuth === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    async function fetchContracts() {
      setLoading(true);
      const { data, error } = await supabase
        .from('contracts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setContracts(data);
      } else {
        console.error('Error fetching contracts:', error);
      }
      setLoading(false);
    }
    fetchContracts();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    if (loginForm.email === 'MedInsights@admin.com' && loginForm.password === 'medinsights1221') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'authenticated');
    } else {
      setLoginError('Nesprávny email alebo heslo');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
    setLoginForm({ email: '', password: '' });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sk-SK', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'text-green-600 bg-green-50';
      case 'in_progress': return 'text-yellow-600 bg-yellow-50';
      case 'not started': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  // Contract download functionality - Complete contract with all sections
  const downloadContract = async (contract: ContractData) => {
    try {
      // Helper for font with character spacing
      const font = "Helvetica";
      const size = 24; // docx uses half-points, so 12pt = 24
      function run(text: string, opts: any = {}) {
        return new TextRun({ text, font, size, characterSpacing: -10, ...opts }); // Reduced character spacing
      }

      const doc = new Document({
        styles: {
          default: {
            document: {
              run: {
                font: "Helvetica",
                size: 24, // 12pt in half-points
              },
              paragraph: {
                alignment: "both", // Justify text
                spacing: {
                  line: 276, // 1.15 line spacing (240 * 1.15)
                },
              },
            },
          },
        },
        sections: [
          {
            properties: {
              page: {
                margin: {
                  top: 1440, // 1 inch
                  right: 1440,
                  bottom: 1440,
                  left: 1440,
                },
              },
            },
            children: [
              new Paragraph({
                children: [run("Zmluva o dielo", { bold: true })],
                alignment: "center",
                spacing: { after: 200 },
              }),
              new Paragraph({
                children: [run("uzavretá podľa § 536 a nasl. zákona č.513/1991 Zb. Obchodný zákonník v znení neskorších predpisov medzi")],
                alignment: "center",
                spacing: { after: 200 },
              }),
              new Paragraph({ children: [run("OBJEDNÁVATEĽ:", { bold: true })] }),
              new Paragraph({ children: [run("KOLLÁR & THIRY s. r. o.", { bold: true })] }),
              new Paragraph({ children: [run("Antona Floreka 8680/14A")] }),
              new Paragraph({ children: [run("841 06 Bratislava")] }),
              new Paragraph({ children: [run("www.yourbrandtransformers.com")] }),
              new Paragraph({ children: [run("IČO: 54630223")] }),
              new Paragraph({ children: [run("DIČ: 2121757561")] }),
              new Paragraph({ children: [run("IČ DPH: SK2121757561")] }),
              new Paragraph({ children: [run("Bankové spojenie: Tatra Banka")] }),
              new Paragraph({ children: [run("IBAN: SK96 1100 0000 0029 4713 0958")] }),
              new Paragraph({ children: [run("Obchodný Register Mestského súdu Bratislava III oddiel Sro, vložka č. 161136/B")] }),
              new Paragraph({ children: [run("(ďalej len 'Objednávateľ')")] }),
              new Paragraph({ children: [run("a")] }),
              new Paragraph({ children: [run("ZHOTOVITEĽ:", { bold: true })] }),
              new Paragraph({ children: [run(`Meno a priezvisko: ${contract.name}`)] }),
              new Paragraph({ children: [run(`Ulica, č. d.: ${contract.street}`)] }),
              new Paragraph({ children: [run(`PSČ, mesto: ${contract.postal_code_city}`)] }),
              new Paragraph({ children: [run(`Email: ${contract.email}`)] }),
              new Paragraph({ children: [run(`Bankové spojenie (Názov banky): ${contract.bank_name}`)] }),
              new Paragraph({ children: [run(`IBAN: ${contract.iban}`)] }),
              new Paragraph({ children: [run(`DIČ alebo rodné číslo: ${contract.tin_or_personal_id}`, { bold: true })] }),
              new Paragraph({ children: [run("(ďalej len 'Zhotoviteľ')")] }),
              new Paragraph({ children: [run("")] }),
              new Paragraph({ children: [run("Článok I.", { bold: true })], alignment: "center", spacing: { before: 200, after: 100 } }),
              new Paragraph({ children: [run("Dielo", { bold: true })], alignment: "center", spacing: { after: 200 } }),
              new Paragraph({ children: [run("1.\tZhotoviteľ sa touto zmluvou zaväzuje zapojiť v termíne od 15. 12. 2025 do 15.1. 2026 do marketingového prieskumu s názvom \"MedInsights 2025\" organizovaného objednávateľom a za tým účelom sa zaväzuje vyplniť pre objednávateľa digitálny formulár/dotazník, ktoré mu objednávateľ sprístupní vo webovom rozhraní na doméne www.medinsights.sk. Zhotoviteľ sa zaväzuje vyplniť digitálny formulár/dotazník podľa metodiky určenej objednávateľom a digitálne ho odovzdať (digitálne odoslať) objednávateľovi najneskôr do 15. 1. 2026 (ďalej len \"dielo\").")], alignment: "both", spacing: { line: 276, after: 120 } }),
              new Paragraph({ children: [run("2.\tObjednávateľ sa zaväzuje zaplatiť zhotoviteľovi odmenu za dielo uvedenú v čl. II.")], alignment: "both", spacing: { line: 276, after: 200 } }),
              new Paragraph({ children: [run("Článok II.", { bold: true })], alignment: "center", spacing: { before: 200, after: 100 } }),
              new Paragraph({ children: [run("Odmena", { bold: true })], alignment: "center", spacing: { after: 200 } }),
              new Paragraph({ children: [run("1.\tObjednávateľ sa zaväzuje za riadne vykonané dielo zaplatiť zhotoviteľovi odmenu vo výške 300,00 € (slovom: tristo EUR nula centov) bez DPH za úplne vyplnený a digitálne odoslaný digitálny formulár/dotazník. Táto suma bude zaťažená daňou z príjmu vykonanou formou zrážky podľa § 43 zákona o dani z príjmov.")], alignment: "both", spacing: { line: 276, after: 120 } }),
              new Paragraph({ children: [run("Úhrada bude vykonaná formou prevodu na hore uvedené číslo účtu vo formáte IBAN zhotoviteľa vedeného v Slovenskej republike najneskôr do 60 dní od ukončenia projektu.")], alignment: "both", spacing: { line: 276, after: 200 } }),
              new Paragraph({ children: [run("Článok III.", { bold: true })], alignment: "center" }),
              new Paragraph({ children: [run("Vykonanie diela", { bold: true })], alignment: "center" }),
              new Paragraph({ children: [run("1.\tZhotoviteľ nemôže poveriť vykonaním diela inú osobu. Pri vykonaní diela je zhotoviteľ viazaný pokynmi objednávateľa, pričom sa výslovne zaväzuje plniť ich v zmysle článku I. bod 1. tejto zmluvy.")], alignment: "both", spacing: { line: 276, after: 120 } }),
              new Paragraph({ children: [run("2.\tObjednávateľ je oprávnený kontrolovať vykonávanie diela, a ak zistí, že zhotoviteľ vykonáva dielo v rozpore so svojimi povinnosťami (t.j. nie podľa metodiky určenej objednávateľom), zhotoviteľ je povinný odstrániť vady vzniknuté vadným vykonávaním v lehote stanovenej objednávateľom. Ak tak zhotoviteľ diela neurobí v takto poskytnutej lehote, je objednávateľ oprávnený odstúpiť od zmluvy. Objednávateľ musí skutočnosti zistené pri kontrole vykonávania diela oznámiť zhotoviteľovi písomne a bezodkladne po ich zistení.")], alignment: "both", spacing: { line: 276, after: 120 } }),
              new Paragraph({ children: [run("3.\tZhotoviteľ je povinný elektronicky na podpora@medinsights.sk upozorniť objednávateľa bez zbytočného odkladu na nevhodnú povahu pokynov daných mu objednávateľom na vykonanie diela, ak zhotoviteľ zistí túto nevhodnosť pokynov. Ak zhotoviteľ túto povinnosť nesplní, zodpovedá za vady diela spôsobené použitím nevhodných pokynov daných mu objednávateľom.")], alignment: "both", spacing: { line: 276, after: 120 } }),
              new Paragraph({ children: [run("4.\tObjednávateľ je oprávnený písomne reklamovať vadne zhotovené dielo bezodkladne po jeho obdŕžaní, pokiaľ odovzdané dielo nie je vyhotovené v zmysle článku I. bod 1. tejto zmluvy. Zhotoviteľ je povinný reklamované vady odstrániť bezplatne a bez zbytočného odkladu, podľa pripomienok a požiadaviek objednávateľa. Ak zhotoviteľ vady bez zbytočného odkladu bezplatne neodstráni, je objednávateľ oprávnený okamžite písomne odstúpiť od zmluvy.")], alignment: "both", spacing: { line: 276, after: 120 } }),
              new Paragraph({ children: [run("5.\tOdovzdaním zhotovenej veci (diela podľa článku I. bod 1. tejto zmluvy) zhotoviteľom objednávateľovi, nadobúda jej vlastníctvo objednávateľ. Zhotovenú vec môže zhotoviteľ odovzdá objednávateľovi elektronicky a to vyplnením digitálneho formulára/dotazníka na webovej stránke www.medinsights.sk. Akékoľvek zmeny webovej stránky alebo e-mailových adries zmluvných strán je každá zmluvná strana povinná oznámiť druhej zmluvnej strane bezodkladne, preukázateľným spôsobom.")], alignment: "both", spacing: { line: 276, after: 200 } }),
              new Paragraph({ children: [run("Článok IV.", { bold: true })], alignment: "center", spacing: { before: 200, after: 100 } }),
              new Paragraph({ children: [run("Osobitné ustanovenia", { bold: true })], alignment: "center", spacing: { after: 200 } }),
              new Paragraph({ children: [run("1.\tZhotoviteľ prehlasuje a uisťuje, že je spôsobilý uzatvoriť túto zmluvu, získal všetky potrebné schválenia a povolenia k podpisu tejto zmluvy a k plneniu záväzkov z nej vyplývajúcich.")], alignment: "both", spacing: { line: 276, after: 120 } }),
              new Paragraph({ children: [run("2.\tZhotoviteľ prehlasuje a uisťuje, že uzatvorenie tejto zmluvy nie je v rozpore s podmienkami stanovenými v akejkoľvek zmluve uzavretej zhotoviteľom s treťou stranou, jej plnenia z jeho strany nepovedú k porušeniu práv tretích osôb, etických štandardov a ani použiteľných všeobecne záväzných právnych predpisov ani interných predpisov a hlavne, že plnenie zmluvy a poskytovanie odmeny na základe tejto zmluvy nie je vnímané alebo vo výsledku nepôsobí ako prostriedok presvedčovania či motivácie k užívaniu, predpisovaniu alebo inej podpore liekov alebo k akémukoľvek ovplyvňovaniu výsledkov klinického skúšania liekov alebo k priamemu alebo nepriamemu vplyvu na prijímanie akýchkoľvek rozhodnutí, týkajúcich sa farmaceutických spoločností a liekov.")], alignment: "both", spacing: { line: 276, after: 120 } }),
              new Paragraph({ children: [run("3.\tZhotoviteľ prehlasuje a uisťuje, že nebude priamo alebo nepriamo ponúkať alebo vyplácať peňažnú čiastku alebo čokoľvek hodnotné alebo schvaľovať ich ponúkanie úradnej osobe, ani sa nebude snažiť nedovoleným spôsobom ovplyvňovať úradné osoby, a ani takúto platbu neprijal ani v budúcnosti neprijme. Akékoľvek porušenie tohto článku zhotoviteľom sa bude považovať za podstatné porušenie tejto zmluvy.")], alignment: "both", spacing: { line: 276, after: 120 } }),
              new Paragraph({ children: [run("4.\tOdstúpenie od zmluvy. Objednávateľ je oprávnený okamžite odstúpiť od Zmluvy písomným oznámením doručeným zhotoviteľovi v prípade, že zhotoviteľ poruší akékoľvek prehlásenia alebo záruky uvedené v tejto zmluve, alebo pokiaľ Objednávateľ zistí, že sú alebo boli zhotoviteľom uskutočňované neprípustné platby úradnej osobe. Ak dôjde k ukončeniu zmluvy týmto spôsobom, zanikajú zhotoviteľovi okamihom odstúpenia Objednávateľa od tejto zmluvy všetky nároky na akékoľvek ďalšie platby či plnenia podľa tejto zmluvy, ktorých platnosť nastáva po dni odstúpenia, a to bez ohľadu na akúkoľvek podniknutú činnosť alebo zmluvy s ďalšími tretími stranami uzatvorenými pred odstúpením spoločnosti KOLLÁR & THIRY s. r. o. od zmluvy, a zároveň zhotoviteľ nesie zodpovednosť za škodu alebo za prostriedky nápravy ako je stanovené príslušnými právnymi predpismi.")], alignment: "both", spacing: { line: 276, after: 120 } }),
              new Paragraph({ children: [run("5.\tZhotoviteľ v zmysle všeobecného nariadenia o ochrane údajov poskytuje Objednávateľovi osobné údaje na účel vytvorenia platnej zmluvy o dielo s Objednávateľom, spracovania elektronickej zmluvy, riadneho dodania služby, zúčtovania platieb a nevyhnutnej komunikácie medzi Zmluvnými stranami Poskytnutie osobných údajov zo strany Zhotoviteľa je dobrovoľné. Osobné údaje nebudú sprístupňované, zverejňované a ani nebude dochádzať k cezhraničnému prenosu do tretích krajín a ani nedôjde k profilovaniu. Objednávateľ postupuje pri zaobchádzaní s osobnými údajmi Zhotoviteľa v súlade s ustanoveniami nariadenia. Iným subjektom bude umožnený prístup k osobným údajom zákazníkov len v prípadoch stanovených všeobecne záväznými právnymi predpismi (najmä v priebehu správneho či trestného konania). Zhotoviteľ je povinný svoje osobné údaje uvádzať správne a pravdivo a bez zbytočného odkladu informovať objednávajúceho o ich zmene. V prípade, ak Zhotoviteľ neposkytne Objednávateľovi osobné údaje, nie je možné uzatvoriť zmluvný vzťah. Osobné údaje bude Objednávateľ spracúvať a archivovať v súlade s osobitnými predpismi počas 10 rokov odo dňa skončenia zmluvného vzťahu. Zhotoviteľ, ktorého osobné údaje sú spracúvané Objednávateľom, má právo od Objednávateľa požadovať prístup k osobným údajom, ktoré sa ho týkajú, ako aj právo na opravu, vymazanie alebo obmedzenie spracúvania týchto údajov. Ak sa Zhotoviteľ domnieva, že spracúvanie osobných údajov, ktoré sa ho týka, je v rozpore so všeobecným nariadením o ochrane údajov, má právo podať sťažnosť dozornému orgánu, ktorým sa rozumie Úrad na ochranu osobných údajov Slovenskej republiky, Hraničná 12, 820 07 Bratislava.")], alignment: "both", spacing: { line: 276, after: 120 } }),
              new Paragraph({ children: [run("Prípadné otázky týkajúce sa ochrany osobných údajov môže Zhotoviteľ adresovať zodpovednej osobe Objednávateľa prostredníctvom e-mailovej adresy: podpora@medinsights.sk.")], alignment: "both", spacing: { line: 276, after: 120 } }),
              new Paragraph({ children: [run("6.\tZhotoviteľ sa zaväzuje dodržiavať mlčanlivosť o všetkých skutočnostiach týkajúcich sa objednávateľa, jeho predmetu činnosti, výsledkov práce jeho činnosti, obchodných partnerov, iných Respondentov, marketingových projektov a ďalších skutočností, o ktorých sa zhotoviteľ dozvie pri plnení predmetu tejto zmluvy. Zhotoviteľ sa zaväzuje oboznámiť s týmto svojim záväzkom mlčanlivosti, ktorý má voči objednávateľovi všetkých, s ktorými opodstatnene a v nevyhnutnej miere musí spolupracovať pri zhotovovaní diela podľa článku I. bod. 1. tejto zmluvy a súčasne vykoná všetko pre to, aby aj oni dodržiavali mlčanlivosť o vyššie uvedených skutočnostiach. Zhotoviteľ za tieto osoby zodpovedá v plnom rozsahu. Tento záväzok mlčanlivosti platí nielen po dobu trvania tejto zmluvy, ale aj po jej skončení.")], alignment: "both", spacing: { line: 276, after: 120 } }),
              new Paragraph({ children: [run("7.\tZhotoviteľ sa zaväzuje neodkladne nahlásiť objednávateľovi všetky informácie týkajúce sa nežiaducich účinkov liekov.")], alignment: "both", spacing: { line: 276, after: 200 } }),
              new Paragraph({ children: [run("Článok V.", { bold: true })], alignment: "center", spacing: { before: 200, after: 100 } }),
              new Paragraph({ children: [run("Záverečné ustanovenia", { bold: true })], alignment: "center", spacing: { after: 200 } }),
              new Paragraph({ children: [run("1.\tTáto zmluva nadobúda platnosť a účinnosť dňom jej uzavretia zmluvnými stranami, t.j. dňom elektronického potvrdenia akceptácie návrhu zmluvy (zmluvných podmienok) zhotoviteľom.")], alignment: "both", spacing: { line: 276, after: 120 } }),
              new Paragraph({ children: [run("2.\tZmluvné strany sa v zmysle § 262 Obchodného zákonníka dohodli, že ich záväzkový vzťah sa spravuje Obchodným zákonníkom.")], alignment: "both", spacing: { line: 276, after: 120 } }),
              new Paragraph({ children: [run("3.\tTúto zmluvu je možné meniť len písomnými dodatkami podpísanými obidvoma zmluvnými stranami.")], alignment: "both", spacing: { line: 276, after: 120 } }),
              new Paragraph({ children: [run("4.\tZmluvné strany prehlasujú, že si zmluvu prečítali, jej obsahu porozumeli a na potvrdenie toho, že obsah tejto zmluvy zodpovedá ich skutočnej a slobodnej vôli, túto zmluvu uzavreli elektronickými prostriedkami.")], alignment: "both", spacing: { line: 276, after: 120 } }),
              new Paragraph({ children: [run("5.\tZmluvné strany týmto prehlasujú, že elektronická výmena dát vykonávaná na základe tejto zmluvy má povahu písomne vykonávaného právneho úkonu a je rovnocenná s inak bežne užívanou formou písomného styku. Zmluvné strany zároveň výslovne berú na vedomie, že takým prenosom informácií vznikajú záväzky, ktoré sú právne platné a že na ich základe sa zmluvné strany môžu domáhať plnenia povinností.")], alignment: "both", spacing: { line: 276, after: 120 } }),
              new Paragraph({ children: [run("6.\tZmluvné strany sa zaväzujú, že nebudú úkony urobené na základe tejto zmluvy akokoľvek spochybňovať alebo prehlasovať za neplatné iba preto, že úkon bol urobený elektronickými prostriedkami.")], alignment: "both", spacing: { line: 276, after: 120 } }),
              new Paragraph({ children: [run("7.\tZmluvné strany týmto prehlasujú, že elektronické správy a záznamy sú hodnoverným a prijateľným dôkazným materiálom a rovnako sa zaväzujú, že nenapadnú ani nebudú spochybňovať dôkaznú prípustnosť úkonov urobených elektronickými prostriedkami.")], alignment: "both", spacing: { line: 276, after: 300 } }),
              new Paragraph({ children: [run("☐ Zaškrtnutím tohto políčka prehlasujem, že som si zmluvu riadne prečítal/a a súhlasím s hore uvedenými zmluvnými podmienkami.")], alignment: "both", spacing: { line: 276, after: 200 } }),
              new Paragraph({ children: [run("Tlačítko \"Uložiť\"", { bold: true })], alignment: "center", spacing: { before: 200, after: 400 } }),
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `zmluva-${contract.name.replace(/\s+/g, '-').toLowerCase()}-${contract.id}.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating contract:', error);
      alert('Chyba pri generovaní zmluvy!');
    }
  };

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#fbfbfc' }}>
        <div className="w-full max-w-md p-8 rounded-2xl shadow-xl" style={{ backgroundColor: '#ffffff', border: 'none' }}>
          <h1 className="text-2xl sm:text-3xl font-light text-center mb-6" style={{ color: '#0f172a', fontFamily: 'Helvetica, Arial, sans-serif' }}>Admin Prihlásenie</h1>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#334155', fontFamily: 'Helvetica, Arial, sans-serif' }}>Email</label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                className="w-full p-3 bg-transparent border-b transition-colors focus:outline-none"
                style={{ borderBottom: '2px solid #e6e9ee', fontFamily: 'Helvetica, Arial, sans-serif' }}
                placeholder="Enter Admin Email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#334155', fontFamily: 'Helvetica, Arial, sans-serif' }}>Heslo</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                className="w-full p-3 bg-transparent border-b transition-colors focus:outline-none"
                style={{ borderBottom: '2px solid #e6e9ee', fontFamily: 'Helvetica, Arial, sans-serif' }}
                placeholder="••••••••••••"
                required
              />
            </div>
            {loginError && (
              <p className="text-sm" style={{ color: '#ef4444', fontFamily: 'Helvetica, Arial, sans-serif' }}>{loginError}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 px-4 font-semibold transition-all duration-300"
              style={{ backgroundColor: '#000000', color: '#ffffff', borderRadius: '50px', fontFamily: 'Helvetica, Arial, sans-serif' }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = '0.9'; (e.target as HTMLElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = '1'; (e.target as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              Prihlásiť sa
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (view === 'detail' && selectedContract) {
    return (
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8" style={{ backgroundColor: '#ffffff', fontFamily: 'Helvetica, Arial, sans-serif' }}>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h2 className="text-2xl sm:text-3xl font-light" style={{ color: '#0f172a', fontFamily: 'Helvetica, Arial, sans-serif' }}>Detail respondenta: {selectedContract.name}</h2>
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <button
              onClick={() => setView('list')}
              className="px-4 py-2 rounded-full font-medium transition-all duration-200"
              style={{ backgroundColor: '#000000', color: '#ffffff', fontFamily: 'Helvetica, Arial, sans-serif', borderRadius: '50px' }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.backgroundColor = '#111827'; (e.target as HTMLElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.backgroundColor = '#000000'; (e.target as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              Späť na zoznam
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Info */}
          <div className="p-6 rounded-2xl shadow-md" style={{ backgroundColor: '#ffffff', border: '1px solid #f1f5f9' }}>
            <h3 className="font-semibold mb-3 text-lg" style={{ color: '#0f172a', fontFamily: 'Helvetica, Arial, sans-serif' }}>Základné údaje</h3>
            <div className="space-y-2 text-sm" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
              <p><strong>Meno:</strong> {selectedContract.name}</p>
              <p><strong>Email:</strong> {selectedContract.email}</p>
              <p><strong>Adresa:</strong> {selectedContract.street}, {selectedContract.postal_code_city}</p>
              <p><strong>Banka:</strong> {selectedContract.bank_name}</p>
              <p><strong>IBAN:</strong> {selectedContract.iban}</p>
              <p><strong>DIČ:</strong> {selectedContract.tin_or_personal_id}</p>
              <p><strong>Zmluva schválená:</strong> {selectedContract.contract_approved ? 'Áno' : 'Nie'}</p>
              <p><strong>Stav dotazníka:</strong> {selectedContract.questionnaire_status}</p>
              <p><strong>Vytvorené:</strong> {formatDate(selectedContract.created_at)}</p>
              {selectedContract.submitted_at && (
                <p><strong>Odoslané:</strong> {formatDate(selectedContract.submitted_at)}</p>
              )}
            </div>
          </div>

          {/* Demographics */}
          <div className="p-6 rounded-2xl shadow-md" style={{ backgroundColor: '#ffffff', border: '1px solid #f1f5f9' }}>
            <h3 className="font-semibold mb-3 text-lg" style={{ color: '#0f172a', fontFamily: 'Helvetica, Arial, sans-serif' }}>Demografické údaje</h3>
            <div className="space-y-2 text-sm" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
              <p><strong>Vek:</strong> {selectedContract.age || 'Nevyplnené'}</p>
              <p><strong>Pohlavie:</strong> {selectedContract.gender || 'Nevyplnené'}</p>
              <p><strong>Dĺžka praxe:</strong> {selectedContract.practice_years || 'Nevyplnené'}</p>
              <p><strong>Typ pracoviska:</strong> {selectedContract.workplace_type || 'Nevyplnené'}</p>
              <p><strong>Región:</strong> {selectedContract.region || 'Nevyplnené'}</p>
              <p><strong>Špecializácia:</strong> {selectedContract.specialization || 'Nevyplnené'}</p>
            </div>
          </div>
        </div>

        {/* Questionnaire Responses */}
        {selectedContract.questionnaire_status !== 'not started' && (
          <div className="mt-6">
            <h3 className="font-semibold mb-4 text-lg" style={{ color: '#0f172a', fontFamily: 'Helvetica, Arial, sans-serif' }}>Odpovede na otázky o biosimilárnych liekoch</h3>
            
            {/* Response Statistics */}
            <div className="mb-6 p-4 rounded-xl" style={{ backgroundColor: '#f8fafc', border: '1px solid #eef2ff' }}>
              {(() => {
                const totalQuestions = 44;
                const answeredQuestions = [
                  'q1_trust_expert', 'q2_info_sources', 'q3_better_orientation', 'q4_communication_form',
                  'q5_effectiveness_rating', 'q6_safety_rating', 'q7_side_effects_risk', 'q8_safety_support',
                  'q9_use_biosimilars', 'q10_diagnoses_usage', 'q11_barriers_usage', 'q12_prescribe_frequency',
                  'q13_prescription_reason', 'q14_patient_transition', 'q15_original_response_influence',
                  'q16_switching_motivators', 'q17_transition_conditions', 'q18_patient_presentation',
                  'q19_discuss_origin_frequency', 'q20_prescription_barriers', 'q21_indication_experience',
                  'q22_transition_advantages', 'q23_patient_decision_factors', 'q24_info_accuracy_rating',
                  'q25_communication_improvements', 'q26_necessary_conditions', 'q27_additional_info_needed',
                  'q28_colleague_consultation_frequency', 'q29_patient_advantages'
                ].filter(key => selectedContract[key as keyof ContractData]).length;
                
                const completionRate = Math.round((answeredQuestions / totalQuestions) * 100);
                
                return (
                  <div className="flex justify-between items-center">
                    <span className="font-medium" style={{ color: '#0f172a', fontFamily: 'Helvetica, Arial, sans-serif' }}>Pokrok dotazníka:</span>
                    <span className="font-semibold px-3 py-1 rounded" style={{ color: '#065f46', backgroundColor: '#ecfdf5', fontFamily: 'Helvetica, Arial, sans-serif' }}>{answeredQuestions}/{totalQuestions} ({completionRate}%)</span>
                  </div>
                );
              })()}
            </div>

            {/* Grouped Questions */}
            <div className="space-y-6">
              {/* Section 1: Knowledge and Awareness */}
              <div className="p-4 rounded-lg border shadow-sm" style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }}>
                <h4 className="font-semibold mb-3" style={{ color: '#374151', fontFamily: 'Helvetica, Arial, sans-serif' }}>Vedomosti a povedomie (Otázky 1-4)</h4>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { key: 'q1_trust_expert', label: 'Dôveryhodnosť ako odborník (1-5)' },
                    { key: 'q2_info_sources', label: 'Zdroje informácií', other: 'q2_other' },
                    { key: 'q3_better_orientation', label: 'Čo by pomohlo lepšej orientácii' },
                    { key: 'q4_communication_form', label: 'Forma komunikácie pre dôveru' }
                  ].map((question) => {
                    const value = selectedContract[question.key as keyof ContractData] as string;
                    const otherValue = question.other ? selectedContract[question.other as keyof ContractData] as string : null;
                    
                    return (
                      <div key={question.key} className="p-3 rounded border" style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}>
                        <p className="font-medium mb-1" style={{ color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif' }}>{question.label}:</p>
                        <p style={{ color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif' }}>{value || 'Nevyplnéné'}</p>
                        {otherValue && <p className="italic mt-1" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif' }}>Iné: {otherValue}</p>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Section 2: Evaluation */}
              <div className="bg-gray-50 p-4 rounded">
                <h4 className="font-bold text-gray-700 mb-3">Hodnotenie biosimilárov (Otázky 5-8)</h4>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { key: 'q5_effectiveness_rating', label: 'Hodnotenie účinnosti (1-4)' },
                    { key: 'q6_safety_rating', label: 'Hodnotenie bezpečnosti (1-4)' },
                    { key: 'q7_side_effects_risk', label: 'Riziko nežiaducich účinkov (1-4)' },
                    { key: 'q8_safety_support', label: 'Podpora dôvery v bezpečnosť' }
                  ].map((question) => {
                    const value = selectedContract[question.key as keyof ContractData] as string;
                    
                    return (
                      <div key={question.key} className="bg-white p-3 border rounded">
                        <p className="font-medium text-gray-800 mb-1">{question.label}:</p>
                        <p className="text-gray-600">{value || 'Nevyplnené'}</p>
                      </div>
                    );
                  })}
                </div>  
              </div>     

              {/* Section 3: Practical Use */}
              <div className="p-4 rounded-lg border shadow-sm" style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }}>
                <h4 className="font-semibold mb-3" style={{ color: '#374151', fontFamily: 'Helvetica, Arial, sans-serif' }}>Používanie v praxi (Otázky 9-13)</h4>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { key: 'q9_use_biosimilars', label: 'Používanie biosimilárov v praxi' },
                    { key: 'q10_diagnoses_usage', label: 'Diagnózy pre použitie' },
                    { key: 'q11_barriers_usage', label: 'Prekážky vo využívaní' },
                    { key: 'q12_prescribe_frequency', label: 'Frekvencia predpisovania (1-4)' },
                    { key: 'q13_prescription_reason', label: 'Hlavný důvod predpisovania' }
                  ].map((question) => {
                    const value = selectedContract[question.key as keyof ContractData] as string;
                    
                    return (
                      <div key={question.key} className="bg-white p-3 border rounded">
                        <p className="font-medium text-gray-800 mb-1">{question.label}:</p>
                        <p className="text-gray-600">{value || 'Nevyplnené'}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Section 4: Patient Transition */}
              <div className="p-4 rounded-lg border shadow-sm" style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }}>
                <h4 className="font-semibold mb-3" style={{ color: '#374151', fontFamily: 'Helvetica, Arial, sans-serif' }}>Prechod pacienta (Otázky 14-17)</h4>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { key: 'q14_patient_transition', label: 'Vnímanie prechodu pacienta (1-4)' },
                    { key: 'q15_original_response_influence', label: 'Vplyv dobrej reakcie na originál' },
                    { key: 'q16_switching_motivators', label: 'Motivátory pre switching' },
                    { key: 'q17_transition_conditions', label: 'Podmienky pre prechod' },
                    {key: 'q_v7_1', label: 'Ako zvyčajne predstavíte pacientovi zmenu liečby? '}
                  ].map((question) => {
                    const value = selectedContract[question.key as keyof ContractData] as string;
                    
                    return (
                      <div key={question.key} className="bg-white p-3 border rounded">
                        <p className="font-medium text-gray-800 mb-1">{question.label}:</p>
                        <p className="text-gray-600">{value || 'Nevyplnené'}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Section 5: Communication */}
              <div className="p-4 rounded-lg border shadow-sm" style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }}>
                <h4 className="font-semibold mb-3" style={{ color: '#374151', fontFamily: 'Helvetica, Arial, sans-serif' }}>Komunikácia s pacientami (Otázky 18-20)</h4>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { key: 'q18_patient_presentation', label: 'Prezentovanie zmeny pacientovi' },
                    { key: 'q19_discuss_origin_frequency', label: 'Frekvencia diskusie o pôvode' },
                    { key: 'q20_prescription_barriers', label: 'Prekážky pri predpisovaní' },
                    { key: 'q_v6_1', label: 'Vás ovplyvňuje senzitívnosť' },
                    { key: 'q_v6_2', label: 'Máte osobnú skúsenosť' },
                    { key: 'q_v6_3', label: 'Vám pomohlo uľahčiť komunikáciu' },
                  ].map((question) => {
                    const value = selectedContract[question.key as keyof ContractData] as string;
                    
                    return (
                      <div key={question.key} className="bg-white p-3 border rounded">
                        <p className="font-medium text-gray-800 mb-1">{question.label}:</p>
                        <p className="text-gray-600">{value || 'Nevyplnené'}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Section 7: Experience and Benefits */}
              <div className="p-4 rounded-lg border shadow-sm" style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }}>
                <h4 className="font-semibold mb-3" style={{ color: '#374151', fontFamily: 'Helvetica, Arial, sans-serif' }}>Skúsenosti a výho dy (Otázky 21-29)</h4>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { key: 'q21_indication_experience', label: 'Skúsenosti s indikáciou' },
                    { key: 'q22_transition_advantages', label: 'Výhody prechodu' },
                    { key: 'q23_patient_decision_factors', label: 'Faktory rozhodnutia pacienta' },
                    { key: 'q24_info_accuracy_rating', label: 'Presnosť informácií (1-4)' },
                    // { key: 'q25_communication_improvements', label: 'Zlepšenie komunikácie' },
                    // { key: 'q26_necessary_conditions', label: 'Potrebné podmienky' },
                    // { key: 'q27_additional_info_needed', label: 'Dodatočné informácie' },
                    // { key: 'q28_colleague_consultation_frequency', label: 'Konzultácie s kolegami (1-4)' },
                    // { key: 'q29_patient_advantages', label: 'Výhody pre pacientov' }
                  ].map((question) => {
                    const value = selectedContract[question.key as keyof ContractData] as string;
                    
                    return (
                      <div key={question.key} className="bg-white p-3 border rounded">
                        <p className="font-medium text-gray-800 mb-1">{question.label}:</p>
                        <p className="text-gray-600">{value || 'Nevyplnené'}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
<div className="p-4 rounded-lg border shadow-sm" style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }}>
                <h4 className="font-semibold mb-3" style={{ color: '#374151', fontFamily: 'Helvetica, Arial, sans-serif' }}>Regulácia a schvaľovanie</h4>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { key: 'q_v2_1', label: 'dostatočne oboznámený/á' },
                    { key: 'q_v2_2', label: 'termín extrapolácia' },
                    { key: 'q_v2_3', label: 'Aké informácie' },
                    { key: 'q_v2_4', label: 'Privítali by ste' },
                    
                  ].map((question) => {
                    const value = selectedContract[question.key as keyof ContractData] as string;
                    
                    return (
                      <div key={question.key} className="bg-white p-3 border rounded">
                        <p className="font-medium text-gray-800 mb-1">{question.label}:</p>
                        <p className="text-gray-600">{value || 'Nevyplnené'}</p>
                      </div>
                    );
                  })}
                </div>
              </div>



 <div className="p-4 rounded-lg border shadow-sm" style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }}>
                <h4 className="font-semibold mb-3" style={{ color: '#374151', fontFamily: 'Helvetica, Arial, sans-serif' }}>Ekonomické a dostupnostné faktory</h4>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { key: 'q_v3_1', label: 'Považujete biosimilárne' },
                    { key: 'q_v3_2', label: 'Čo by podľa vášho' },
                    
                  ].map((question) => {
                    const value = selectedContract[question.key as keyof ContractData] as string;
                    
                    return (
                      <div key={question.key} className="bg-white p-3 border rounded">
                        <p className="font-medium text-gray-800 mb-1">{question.label}:</p>
                        <p className="text-gray-600">{value || 'Nevyplnené'}</p>
                      </div>
                    );
                  })}
                </div>
              </div>


 <div className="p-4 rounded-lg border shadow-sm" style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }}>
                <h4 className="font-semibold mb-3" style={{ color: '#374151', fontFamily: 'Helvetica, Arial, sans-serif' }}>Edukácia a podpora</h4>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { key: 'q_v4_1', label: 'Máte záujem' },
                    { key: 'q_v4_2', label: 'Ktoré témy' },
                     { key: 'q_v4_3', label: 'Aká forma vzdelávania' },
                    
                  ].map((question) => {
                    const value = selectedContract[question.key as keyof ContractData] as string;
                    
                    return (
                      <div key={question.key} className="bg-white p-3 border rounded">
                        <p className="font-medium text-gray-800 mb-1">{question.label}:</p>
                        <p className="text-gray-600">{value || 'Nevyplnené'}</p>
                      </div>
                    );
                  })}
                </div>
              </div>


<div className="p-4 rounded-lg border shadow-sm" style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }}>
                <h4 className="font-semibold mb-3" style={{ color: '#374151', fontFamily: 'Helvetica, Arial, sans-serif' }}>Odporúčania a návrhy (Otázky 18-20)</h4>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { key: 'q_v5_1', label: 'Aké kroky' },
                    
                  ].map((question) => {
                    const value = selectedContract[question.key as keyof ContractData] as string;
                    
                    return (
                      <div key={question.key} className="bg-white p-3 border rounded">
                        <p className="font-medium text-gray-800 mb-1">{question.label}:</p>
                        <p className="text-gray-600">{value || 'Nevyplnené'}</p>
                      </div>
                    );
                  })}
                </div>
              </div>


              {/* Demographics */}
              <div className="p-4 rounded-lg border shadow-sm" style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }}>
                <h4 className="font-semibold mb-3" style={{ color: '#374151', fontFamily: 'Helvetica, Arial, sans-serif' }}>Demografické údaje</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { key: 'age', label: 'Vek' },
                    { key: 'gender', label: 'Pohlavie' },
                    { key: 'practice_years', label: 'Roky praxe' },
                    { key: 'workplace_type', label: 'Typ pracoviska', other: 'workplace_type_other' },
                    { key: 'region', label: 'Región' },
                    { key: 'specialization', label: 'Špecializácia' }
                  ].map((question) => {
                    const value = selectedContract[question.key as keyof ContractData] as string;
                    const otherValue = question.other ? selectedContract[question.other as keyof ContractData] as string : null;
                    
                    return (
                      <div key={question.key} className="bg-white p-3 border rounded">
                        <p className="font-medium text-gray-800 mb-1">{question.label}:</p>
                        <p className="text-gray-600">{value || 'Nevyplnené'}</p>
                        {otherValue && <p className="text-gray-600 italic mt-1">Iné: {otherValue}</p>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8" style={{ backgroundColor: '#ffffff', fontFamily: 'Helvetica, Arial, sans-serif', color: '#000000' }}>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold" style={{ fontFamily: 'Helvetica, Arial, sans-serif', color: '#000000' }}>Admin Dashboard - MedInsights 2025</h2>
        <button
          onClick={handleLogout}
          className="px-4 sm:px-6 py-2 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base"
          style={{
            backgroundColor: '#ef4444',
            color: '#ffffff',
            fontFamily: 'Helvetica, Arial, sans-serif',
            boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)'
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.backgroundColor = '#dc2626';
            (e.target as HTMLElement).style.transform = 'translateY(-1px)';
            (e.target as HTMLElement).style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.15)';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.backgroundColor = '#ef4444';
            (e.target as HTMLElement).style.transform = 'translateY(0)';
            (e.target as HTMLElement).style.boxShadow = '0 2px 4px 0 rgba(0, 0, 0, 0.1)';
          }}
        >
          Odhlásiť sa
        </button>
      </div>
      
      {loading ? (
        <div className="text-center py-8">
          <p style={{ fontFamily: 'Helvetica, Arial, sans-serif', color: '#000000' }}>Načítavam dáta...</p>
        </div>
      ) : (
        <>
          <div className="mb-4 text-sm" style={{ fontFamily: 'Helvetica, Arial, sans-serif', color: '#000000' }}>
            Počet záznamov: {contracts.length}
          </div>
          
          {/* Mobile Card Layout */}
          <div className="block md:hidden space-y-4">
            {contracts.map((contract) => (
              <div key={contract.id} className="p-4 rounded-lg border shadow-sm" style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }}>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg" style={{ color: '#1f2937', fontFamily: 'Helvetica, Arial, sans-serif' }}>{contract.name}</h3>
                  <p className="text-sm" style={{ color: '#6b7280', fontFamily: 'Helvetica, Arial, sans-serif' }}>{contract.email}</p>
                  <p className="text-xs" style={{ color: '#9ca3af', fontFamily: 'Helvetica, Arial, sans-serif' }}>
                    Vytvorené: {formatDate(contract.created_at)}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: contract.contract_approved ? '#16a34a' : '#d65050ff', color: '#ffffff', fontFamily: 'Helvetica, Arial, sans-serif' }}>
                      Zmluva: {contract.contract_approved ? 'Schválená' : 'Neschválená'}
                    </span>
                    <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: contract.questionnaire_status === 'submitted' ? '#16a34a' : contract.questionnaire_status === 'in_progress' ? '#eab308' : '#6b7280', color: '#ffffff', fontFamily: 'Helvetica, Arial, sans-serif' }}>
                      {contract.questionnaire_status === 'submitted' ? 'Odoslaný' : 
                       contract.questionnaire_status === 'in_progress' ? 'V procese' : 
                       'Nezačatý'}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => {
                        setSelectedContract(contract);
                        setView('detail');
                      }}
                      className="flex-1 px-4 py-2 rounded-full font-medium transition-all text-sm"
                      style={{ backgroundColor: '#000000', color: '#ffffff', fontFamily: 'Helvetica, Arial, sans-serif', borderRadius: '50px' }}
                      onMouseEnter={(e) => { (e.target as HTMLElement).style.backgroundColor = '#111827'; (e.target as HTMLElement).style.transform = 'translateY(-2px)'; }}
                      onMouseLeave={(e) => { (e.target as HTMLElement).style.backgroundColor = '#000000'; (e.target as HTMLElement).style.transform = 'translateY(0)'; }}
                    >
                      Detail
                    </button>
                    <button
                      onClick={() => downloadContract(contract)}
                      className="flex-1 px-4 py-2 rounded-full font-medium transition-all text-sm"
                      style={{ backgroundColor: '#1f9d6a', color: '#ffffff', fontFamily: 'Helvetica, Arial, sans-serif', borderRadius: '50px' }}
                      onMouseEnter={(e) => { (e.target as HTMLElement).style.backgroundColor = '#15803d'; (e.target as HTMLElement).style.transform = 'translateY(-2px)'; }}
                      onMouseLeave={(e) => { (e.target as HTMLElement).style.backgroundColor = '#1f9d6a'; (e.target as HTMLElement).style.transform = 'translateY(0)'; }}
                    >
                      Zmluva
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table Layout */}
          <div className="hidden md:block">
            <div className="rounded-2xl overflow-hidden shadow-lg" style={{ border: '1px solid #eef2f7' }}>
              <table className="w-full table-auto" style={{ fontFamily: 'Helvetica, Arial, sans-serif', borderCollapse: 'separate', borderSpacing: '0' }}>
                <thead>
                  <tr style={{ backgroundColor: '#fbfbff' }}>
                    <th className="px-4 py-3 text-left font-semibold text-sm" style={{ color: '#334155' }}>Meno</th>
                    <th className="px-4 py-3 text-left font-semibold text-sm" style={{ color: '#334155' }}>Email</th>
                    <th className="px-4 py-3 text-left font-semibold text-sm" style={{ color: '#334155' }}>Vytvorené</th>
                    <th className="px-4 py-3 text-left font-semibold text-sm" style={{ color: '#334155' }}>Zmluva</th>
                    <th className="px-4 py-3 text-left font-semibold text-sm" style={{ color: '#334155' }}>Dotazník</th>
                    <th className="px-4 py-3 text-left font-semibold text-sm" style={{ color: '#334155' }}>Akcie</th>
                  </tr>
                </thead>
                <tbody>
                  {contracts.map((contract) => (
                    <tr key={contract.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm" style={{ color: '#0f172a' }}>{contract.name}</td>
                      <td className="px-4 py-3 text-sm" style={{ color: '#0f172a' }}>{contract.email}</td>
                      <td className="px-4 py-3 text-sm" style={{ color: '#0f172a' }}>{formatDate(contract.created_at)}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: contract.contract_approved ? '#ecfdf5' : '#fff1f2', color: contract.contract_approved ? '#065f46' : '#9f1239' }}>
                          {contract.contract_approved ? 'Schválená' : 'Neschválená'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className="px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: contract.questionnaire_status === 'submitted' ? '#ecfdf5' : contract.questionnaire_status === 'in_progress' ? '#fffbeb' : '#f1f5f9', color: contract.questionnaire_status === 'submitted' ? '#065f46' : contract.questionnaire_status === 'in_progress' ? '#92400e' : '#334155' }}>
                          {contract.questionnaire_status === 'submitted' ? 'Odoslaný' : contract.questionnaire_status === 'in_progress' ? 'V procese' : 'Nezačatý'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => { setSelectedContract(contract); setView('detail'); }}
                            className="px-3 py-1 text-sm font-medium rounded-full"
                            style={{ backgroundColor: '#000000', color: '#ffffff', borderRadius: '50px' }}
                            onMouseEnter={(e) => { (e.target as HTMLElement).style.backgroundColor = '#111827'; (e.target as HTMLElement).style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={(e) => { (e.target as HTMLElement).style.backgroundColor = '#000000'; (e.target as HTMLElement).style.transform = 'translateY(0)'; }}
                          >
                            Detail
                          </button>
                          <button
                            onClick={() => downloadContract(contract)}
                            className="px-3 py-1 text-sm font-medium rounded-full"
                            style={{ backgroundColor: '#1f9d6a', color: '#ffffff', borderRadius: '50px' }}
                            onMouseEnter={(e) => { (e.target as HTMLElement).style.backgroundColor = '#15803d'; (e.target as HTMLElement).style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={(e) => { (e.target as HTMLElement).style.backgroundColor = '#1f9d6a'; (e.target as HTMLElement).style.transform = 'translateY(0)'; }}
                          >
                            Zmluva
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {contracts.length === 0 && (
            <div className="text-center py-8" style={{ color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif' }}>
              Žiadne záznamy neboli nájdené.
            </div>
          )}
        </>
      )}
    </div>
  );
}
