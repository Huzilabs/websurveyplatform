"use client";

import React, { useEffect, useState } from "react";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { supabase } from "../../lib/supabaseClient";

// This would be passed as props or context in a real app
const contractorData = {
  name: "Meno a priezvisko",
  street: "Ulica, č. d.",
  city: "PSČ, mesto",
  email: "Email",
  bank: "Bankové spojenie (Názov banky)",
  iban: "IBAN",
  taxId: "DIČ alebo rodné číslo",
};

const contractText = `Zmluva o dielo
uzavretá podľa § 536 a nasl. zákona č.513/1991 Zb. Obchodný zákonník v znení neskorších predpisov medzi
OBJEDNÁVATEĽ:
KOLLÁR & THIRY s. r. o.
Antona Floreka 8680/14A
841 06 Bratislava
www.yourbrandtransformers.com
IČO: 54630223
DIČ: 2121757561
IČ DPH: SK2121757561
Bankové spojenie: Tatra Banka
IBAN: SK96 1100 0000 0029 4713 0958
Obchodný Register Mestského súdu Bratislava III oddiel Sro, vložka č. 161136/B
(ďalej len "Objednávateľ")
a
ZHOTOVITEĽ:
Meno a priezvisko: {name}
Ulica, č. d.: {street}
PSČ, mesto: {city}
Email: {email}
Bankové spojenie (Názov banky): {bank}
IBAN: {iban}
DIČ alebo rodné číslo: {taxId}

(ďalej len "Zhotoviteľ")

Článok I.
Dielo
1. Zhotoviteľ sa touto zmluvou zaväzuje zapojiť v termíne od 15. 12. 2025 do 15.1. 2026 do marketingového prieskumu s názvom „MedInsights 2026" organizovaného objednávateľom a za tým účelom sa zaväzuje vyplniť pre objednávateľa digitálny formulár/dotazník, ktoré mu objednávateľ sprístupní vo webovom rozhraní na doméne www.medinsights.sk. Zhotoviteľ sa zaväzuje vyplniť digitálny formulár/dotazník podľa metodiky určenej objednávateľom a digitálne ho odovzdať (digitálne odoslať) objednávateľovi najneskôr do 15. 1. 2026 (ďalej len „dielo").
2. Objednávateľ sa zaväzuje zaplatiť zhotoviteľovi odmenu za dielo uvedenú v čl. II.

Článok II.
Odmena
1. Objednávateľ sa zaväzuje za riadne vykonané dielo zaplatiť zhotoviteľovi odmenu vo výške 300,00 € (slovom: tristo EUR nula centov) bez DPH za úplne vyplnený a digitálne odoslaný digitálny formulár/dotazník. Táto suma bude zaťažená daňou z príjmu vykonanou formou zrážky podľa § 43 zákona o dani z príjmov.
Úhrada bude vykonaná formou prevodu na hore uvedené číslo účtu vo formáte IBAN zhotoviteľa vedeného v Slovenskej republike najneskôr do 60 dní od ukončenia projektu.

Článok III.
Vykonanie diela
1. Zhotoviteľ nemôže poveriť vykonaním diela inú osobu. Pri vykonaní diela je zhotoviteľ viazaný pokynmi objednávateľa, pričom sa výslovne zaväzuje plniť ich v zmysle článku I. bod 1. tejto zmluvy.
2. Objednávateľ je oprávnený kontrolovať vykonávanie diela, a ak zistí, že zhotoviteľ vykonáva dielo v rozpore so svojimi povinnosťami (t.j. nie podľa metodiky určenej objednávateľom), zhotoviteľ je povinný odstrániť vady vzniknuté vadným vykonávaním v lehote stanovenej objednávateľom. Ak tak zhotoviteľ diela neurobí v takto poskytnutej lehote, je objednávateľ oprávnený odstúpiť od zmluvy. Objednávateľ musí skutočnosti zistené pri kontrole vykonávania diela oznámiť zhotoviteľovi písomne a bezodkladne po ich zistení.
3. Zhotoviteľ je povinný elektronicky na podpora@medinsights.sk upozorniť objednávateľa bez zbytočného odkladu na nevhodnú povahu pokynov daných mu objednávateľom na vykonanie diela, ak zhotoviteľ zistí túto nevhodnosť pokynov. Ak zhotoviteľ túto povinnosť nesplní, zodpovedá za vady diela spôsobené použitím nevhodných pokynov daných mu objednávateľom.
4. Objednávateľ je oprávnený písomne reklamovať vadne zhotovené dielo bezodkladne po jeho obdŕžaní, pokiaľ odovzdané dielo nie je vyhotovené v zmysle článku I. bod 1. tejto zmluvy. Zhotoviteľ je povinný reklamované vady odstrániť bezplatne a bez zbytočného odkladu, podľa pripomienok a požiadaviek objednávateľa. Ak zhotoviteľ vady bez zbytočného odkladu bezplatne neodstráni, je objednávateľ oprávnený okamžite písomne odstúpiť od zmluvy.
5. Odovzdaním zhotovenej veci (diela podľa článku I. bod 1. tejto zmluvy) zhotoviteľom objednávateľovi, nadobúda jej vlastníctvo objednávateľ. Zhotovenú vec môže zhotoviteľ odovzdá objednávateľovi elektronicky a to vyplnením digitálneho formulára/dotazníka na webovej stránke www.medinsights.sk. Akékoľvek zmeny webovej stránky alebo e-mailových adries zmluvných strán je každá zmluvná strana povinná oznámiť druhej zmluvnej strane bezodkladne, preukázateľným spôsobom.

Článok IV.
Osobitné ustanovenia
1. Zhotoviteľ prehlasuje a uisťuje, že je spôsobilý uzatvoriť túto zmluvu, získal všetky potrebné schválenia a povolenia k podpisu tejto zmluvy a k plneniu záväzkov z nej vyplývajúcich.
2. Zhotoviteľ prehlasuje a uisťuje, že uzatvorenie tejto zmluvy nie je v rozpore s podmienkami stanovenými v akejkoľvek zmluve uzavretej zhotoviteľom s treťou stranou, jej plnenia z jeho strany nepovedú k porušeniu práv tretích osôb, etických štandardov a ani použiteľných všeobecne záväzných právnych predpisov ani interných predpisov a hlavne, že plnenie zmluvy a poskytovanie odmeny na základe tejto zmluvy nie je vnímané alebo vo výsledku nepôsobí ako prostriedok presvedčovania či motivácie k užívaniu, predpisovaniu alebo inej podpore liekov alebo k akémukoľvek ovplyvňovaniu výsledkov klinického skúšania liekov alebo k priamemu alebo nepriamemu vplyvu na prijímanie akýchkoľvek rozhodnutí, týkajúcich sa farmaceutických spoločností a liekov.
3. Zhotoviteľ prehlasuje a uisťuje, že nebude priamo alebo nepriamo ponúkať alebo vyplácať peňažnú čiastku alebo čokoľvek hodnotné alebo schvaľovať ich ponúkanie úradnej osobe, ani sa nebude snažiť nedovoleným spôsobom ovplyvňovať úradné osoby, a ani takúto platbu neprijal ani v budúcnosti neprijme. Akékoľvek porušenie tohto článku zhotoviteľom sa bude považovať za podstatné porušenie tejto zmluvy.
4. Odstúpenie od zmluvy. Objednávateľ je oprávnený okamžite odstúpiť od Zmluvy písomným oznámením doručeným zhotoviteľovi v prípade, že zhotoviteľ poruší akékoľvek prehlásenia alebo záruky uvedené v tejto zmluve, alebo pokiaľ Objednávateľ zistí, že sú alebo boli zhotoviteľom uskutočňované neprípustné platby úradnej osobe. Ak dôjde k ukončeniu zmluvy týmto spôsobom, zanikajú zhotoviteľovi okamihom odstúpenia Objednávateľa od tejto zmluvy všetky nároky na akékoľvek ďalšie platby či plnenia podľa tejto zmluvy, ktorých platnosť nastáva po dni odstúpenia, a to bez ohľadu na akúkoľvek podniknutú činnosť alebo zmluvy s ďalšími tretími stranami uzatvorenými pred odstúpením spoločnosti KOLLÁR & THIRY s. r. o. od zmluvy, a zároveň zhotoviteľ nesie zodpovednosť za škodu alebo za prostriedky nápravy ako je stanovené príslušnými právnymi predpismi.
5. Zhotoviteľ v zmysle všeobecného nariadenia o ochrane údajov poskytuje Objednávateľovi osobné údaje na účel vytvorenia platnej zmluvy o dielo s Objednávateľom, spracovania elektronickej zmluvy, riadneho dodania služby, zúčtovania platieb a nevyhnutnej komunikácie medzi Zmluvnými stranami Poskytnutie osobných údajov zo strany Zhotoviteľa je dobrovoľné. Osobné údaje nebudú sprístupňované, zverejňované a ani nebude dochádzať k cezhraničnému prenosu do tretích krajín a ani nedôjde k profilovaniu. Objednávateľ postupuje pri zaobchádzaní s osobnými údajmi Zhotoviteľa v súlade s ustanoveniami nariadenia. Iným subjektom bude umožnený prístup k osobným údajom zákazníkov len v prípadoch stanovených všeobecne záväznými právnymi predpismi (najmä v priebehu správneho či trestného konania). Zhotoviteľ je povinný svoje osobné údaje uvádzať správne a pravdivo a bez zbytočného odkladu informovať objednávajúceho o ich zmene. V prípade, ak Zhotoviteľ neposkytne Objednávateľovi osobné údaje, nie je možné uzatvoriť zmluvný vzťah. Osobné údaje bude Objednávateľ spracúvať a archivovať v súlade s osobitnými predpismi počas 10 rokov odo dňa skončenia zmluvného vzťahu. Zhotoviteľ, ktorého osobné údaje sú spracúvané Objednávateľom, má právo od Objednávateľa požadovať prístup k osobným údajom, ktoré sa ho týkajú, ako aj právo na opravu, vymazanie alebo obmedzenie spracúvania týchto údajov. Ak sa Zhotoviteľ domnieva, že spracúvanie osobných údajov, ktoré sa ho týka, je v rozpore so všeobecným nariadením o ochrane údajov, má právo podať sťažnosť dozornému orgánu, ktorým sa rozumie Úrad na ochranu osobných údajov Slovenskej republiky, Hraničná 12, 820 07 Bratislava.
Prípadné otázky týkajúce sa ochrany osobných údajov môže Zhotoviteľ adresovať zodpovednej osobe Objednávateľa prostredníctvom e-mailovej adresy: podpora@medinsights.sk.
6. Zhotoviteľ sa zaväzuje dodržiavať mlčanlivosť o všetkých skutočnostiach týkajúcich sa objednávateľa, jeho predmetu činnosti, výsledkov práce jeho činnosti, obchodných partnerov, iných Respondentov, marketingových projektov a ďalších skutočností, o ktorých sa zhotoviteľ dozvie pri plnení predmetu tejto zmluvy. Zhotoviteľ sa zaväzuje oboznámiť s týmto svojim záväzkom mlčanlivosti, ktorý má voči objednávateľovi všetkých, s ktorými opodstatnene a v nevyhnutnej miere musí spolupracovať pri zhotovovaní diela podľa článku I. bod. 1. tejto zmluvy a súčasne vykoná všetko pre to, aby aj oni dodržiavali mlčanlivosť o vyššie uvedených skutočnostiach. Zhotoviteľ za tieto osoby zodpovedá v plnom rozsahu. Tento záväzok mlčanlivosti platí nielen po dobu trvania tejto zmluvy, ale aj po jej skončení.
7. Zhotoviteľ sa zaväzuje neodkladne nahlásiť objednávateľovi všetky informácie týkajúce sa nežiaducich účinkov liekov.

Článok V.
Záverečné ustanovenia
1. Táto zmluva nadobúda platnosť a účinnosť dňom jej uzavretia zmluvnými stranami, t.j. dňom elektronického potvrdenia akceptácie návrhu zmluvy (zmluvných podmienok) zhotoviteľom.
2. Zmluvné strany sa v zmysle § 262 Obchodného zákonníka dohodli, že ich záväzkový vzťah sa spravuje Obchodným zákonníkom.
3. Túto zmluvu je možné meniť len písomnými dodatkami podpísanými obidvoma zmluvnými stranami.
4. Zmluvné strany prehlasujú, že si zmluvu prečítali, jej obsahu porozumeli a na potvrdenie toho, že obsah tejto zmluvy zodpovedá ich skutočnej a slobodnej vôli, túto zmluvu uzavreli elektronickými prostriedkami.
5. Zmluvné strany týmto prehlasujú, že elektronická výmena dát vykonávaná na základe tejto zmluvy má povahu písomne vykonávaného právneho úkonu a je rovnocenná s inak bežne užívanou formou písomného styku. Zmluvné strany zároveň výslovne berú na vedomie, že takým prenosom informácií vznikajú záväzky, ktoré sú právne platné a že na ich základe sa zmluvné strany môžu domáhať plnenia povinností.
6. Zmluvné strany sa zaväzujú, že nebudú úkony urobené na základe tejto zmluvy akokoľvek spochybňovať alebo prehlasovať za neplatné iba preto, že úkon bol urobený elektronickými prostriedkami.
7. Zmluvné strany týmto prehlasujú, že elektronické správy a záznamy sú hodnoverným a prijateľným dôkazným materiálom a rovnako sa zaväzujú, že nenapadnú ani nebudú spochybňovať dôkaznú prípustnosť úkonov urobených elektronickými prostriedkami.
`;

export default function ContractPage() {
  const [agreed, setAgreed] = useState(false);
  const [contractor, setContractor] = useState<any>(null);
  const [contractId, setContractId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);

  // Test function to check if contract exists and can be read
  async function testContractAccess() {
    if (!contractId) {
      console.log('No contractId to test');
      return;
    }
    try {
      console.log('Testing access to contract with ID:', contractId);
      const { data, error } = await supabase
        .from("contracts")
        .select("*")
        .eq("id", contractId)
        .single();
      
      if (error) {
        console.error('Error reading contract:', error);
      } else {
        console.log('Contract data:', data);
      }
    } catch (error) {
      console.error('Unexpected error reading contract:', error);
    }
  }

  useEffect(() => {
    const stored = window.localStorage.getItem('contractorData');
    console.log('Stored contractor data:', stored);
    if (stored) {
      const parsed = JSON.parse(stored);
      console.log('Parsed contractor data:', parsed);
      setContractor(parsed);
      setContractId(parsed.contractId || null);
      console.log('Set contractId to:', parsed.contractId || null);
      setLoaded(true);
      // Test database access
      setTimeout(() => testContractAccess(), 1000);
    } else {
      console.log('No contractor data found in localStorage');
      setError("Chýbajú osobné údaje alebo ID zmluvy. Prosím, vyplňte najskôr osobné údaje.");
      setLoaded(true);
    }
  }, []);

  async function handleApproveContract() {
    console.log('handleApproveContract called with contractId:', contractId, 'agreed:', agreed);
    if (!contractId || !agreed) {
      console.log('Cannot approve - missing contractId or not agreed');
      alert('Prosím zaškrtnite súhlas so zmluvou.');
      return;
    }
    try {
      console.log('Updating contract approval status to true for contract ID:', contractId);
      const { data, error } = await supabase
        .from("contracts")
        .update({ 
          contract_approved: true,
          updated_at: new Date().toISOString()
        })
        .eq("id", contractId)
        .select();
      
      if (error) {
        console.error('Error approving contract:', error);
        console.error('Error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        alert(`Chyba pri schvaľovaní zmluvy: ${error.message}\nKód: ${error.code}`);
        return;
      }
      
      console.log('Contract approved successfully:', data);
      alert('Zmluva bola schválená!');
      // Navigate to questionnaire
      window.location.href = '/questionnaire';
    } catch (error) {
      console.error('Unexpected error approving contract:', error);
      alert(`Neočakávaná chyba: ${error instanceof Error ? error.message : 'Neznáma chyba'}`);
    }
  }

  if (error) {
    return <div className="text-red-600 font-bold text-center py-8">{error}<br /><a href="/personal-data" className="text-blue-600 underline">Prejsť na osobné údaje</a></div>;
  }
  if (!loaded || !contractor || !contractId) return <div className="text-center py-8">Načítavam...</div>;

  const filledContract = contractText.replace("{name}", contractor.name || "Meno a priezvisko")
    .replace("{street}", contractor.street || "Ulica, č. d.")
    .replace("{city}", contractor.city || "PSČ, mesto")
    .replace("{email}", contractor.email || "Email")
    .replace("{bank}", contractor.bank || "Bankové spojenie (Názov banky)")
    .replace("{iban}", contractor.iban || "IBAN")
    .replace("{taxId}", contractor.taxId || "DIČ alebo rodné číslo");

  // Download contract as a real .docx file using docx library
  async function handleDownload() {
    setDownloading(true);
    // Build the document with headings and formatting
    // Helper for font
    const font = "Helvetica";
    const size = 24; // docx uses half-points, so 12pt = 24
    function run(text: string, opts: any = {}) {
      return new TextRun({ text, font, size, ...opts });
    }
    const doc = new Document({
      sections: [
        {
          properties: {},
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
            new Paragraph({ children: [run("ZHOTOVITEĽ:", { bold: true })] }),
            new Paragraph({ children: [run(`Meno a priezvisko: ${contractor.name}`)] }),
            new Paragraph({ children: [run(`Ulica, č. d.: ${contractor.street}`)] }),
            new Paragraph({ children: [run(`PSČ, mesto: ${contractor.city}`)] }),
            new Paragraph({ children: [run(`Email: ${contractor.email}`)] }),
            new Paragraph({ children: [run(`Bankové spojenie (Názov banky): ${contractor.bank}`)] }),
            new Paragraph({ children: [run(`IBAN: ${contractor.iban}`)] }),
            new Paragraph({ children: [run(`DIČ alebo rodné číslo: ${contractor.taxId}`, { bold: true })] }),
            new Paragraph({ children: [run("(ďalej len 'Zhotoviteľ')")] }),
            new Paragraph({ children: [run("")] }),
            new Paragraph({ children: [run("Článok I.", { bold: true })], alignment: "center" }),
            new Paragraph({ children: [run("Dielo", { bold: true })], alignment: "center" }),
            new Paragraph({ children: [run("1. Zhotoviteľ sa touto zmluvou zaväzuje zapojiť v termíne od 15. 12. 2025 do 15.1. 2026 do marketingového prieskumu s názvom 'MedInsights 2026' organizovaného objednávateľom a za tým účelom sa zaväzuje vyplniť pre objednávateľa digitálny formulár/dotazník, ktoré mu objednávateľ sprístupní vo webovom rozhraní na doméne www.medinsights.sk. Zhotoviteľ sa zaväzuje vyplniť digitálny formulár/dotazník podľa metodiky určenej objednávateľom a digitálne ho odovzdať (digitálne odoslať) objednávateľovi najneskôr do 15. 1. 2026 (ďalej len 'dielo'.)")] , spacing: { line: 720 }, }),
            new Paragraph({ children: [run("2. Objednávateľ sa zaväzuje zaplatiť zhotoviteľovi odmenu za dielo uvedenú v čl. II.")], spacing: { line: 720 }, }),
            new Paragraph({ children: [run("Článok II.", { bold: true })], alignment: "center" }),
            new Paragraph({ children: [run("Odmena", { bold: true })], alignment: "center" }),
            new Paragraph({ children: [run("1. Objednávateľ sa zaväzuje za riadne vykonané dielo zaplatiť zhotoviteľovi odmenu vo výške 300,00 € (slovom: tristo EUR nula centov) bez DPH za úplne vyplnený a digitálne odoslaný digitálny formulár/dotazník. Táto suma bude zaťažená daňou z príjmu vykonanou formou zrážky podľa § 43 zákona o dani z príjmov.")], spacing: { line: 720 }, }),
            new Paragraph({ children: [run("2. Úhrada bude vykonaná formou prevodu na hore uvedené číslo účtu vo formáte IBAN zhotoviteľa vedeného v Slovenskej republike najneskôr do 60 dní od ukončenia projektu.")], spacing: { line: 720 }, }),
            new Paragraph({ children: [run("Článok III.", { bold: true })], alignment: "center" }),
            new Paragraph({ children: [run("Vykonanie diela", { bold: true })], alignment: "center" }),
            new Paragraph({ children: [run("1. Zhotoviteľ nemôže poveriť vykonaním diela inú osobu. Pri vykonaní diela je zhotoviteľ viazaný pokynmi objednávateľa, pričom sa výslovne zaväzuje plniť ich v zmysle článku I. bod 1. tejto zmluvy.")], spacing: { line: 720 }, }),
            new Paragraph({ children: [run("2. Objednávateľ je oprávnený kontrolovať vykonávanie diela, a ak zistí, že zhotoviteľ vykonáva dielo v rozpore so svojimi povinnosťami (t.j. nie podľa metodiky určenej objednávateľom), zhotoviteľ je povinný odstrániť vady vzniknuté vadným vykonávaním v lehote stanovenej objednávateľom. Ak tak zhotoviteľ diela neurobí v takto poskytnutej lehote, je objednávateľ oprávnený odstúpiť od zmluvy. Objednávateľ musí skutočnosti zistené pri kontrole vykonávania diela oznámiť zhotoviteľovi písomne a bezodkladne po ich zistení.")], spacing: { line: 720 }, }),
            new Paragraph({ children: [run("3. Zhotoviteľ je povinný elektronicky na podpora@medinsights.sk upozorniť objednávateľa bez zbytočného odkladu na nevhodnú povahu pokynov daných mu objednávateľom na vykonanie diela, ak zhotoviteľ zistí túto nevhodnosť pokynov. Ak zhotoviteľ túto povinnosť nesplní, zodpovedá za vady diela spôsobené použitím nevhodných pokynov daných mu objednávateľom.")], spacing: { line: 720 }, }),
            new Paragraph({ children: [run("4. Objednávateľ je oprávnený písomne reklamovať vadne zhotovené dielo bezodkladne po jeho obdŕžaní, pokiaľ odovzdané dielo nie je vyhotovené v zmysle článku I. bod 1. tejto zmluvy. Zhotoviteľ je povinný reklamované vady odstrániť bezplatne a bez zbytočného odkladu, podľa pripomienok a požiadaviek objednávateľa. Ak zhotoviteľ vady bez zbytočného odkladu bezplatne neodstráni, je objednávateľ oprávnený okamžite písomne odstúpiť od zmluvy.")], spacing: { line: 720 }, }),
            new Paragraph({ children: [run("5. Odovzdaním zhotovenej veci (diela podľa článku I. bod 1. tejto zmluvy) zhotoviteľom objednávateľovi, nadobúda jej vlastníctvo objednávateľ. Zhotovenú vec môže zhotoviteľ odovzdá objednávateľovi elektronicky a to vyplnením digitálneho formulára/dotazníka na webovej stránke www.medinsights.sk. Akékoľvek zmeny webovej stránky alebo e-mailových adries zmluvných strán je každá zmluvná strana povinná oznámiť druhej zmluvnej strane bezodkladne, preukázateľným spôsobom.")], spacing: { line: 720 }, }),
            new Paragraph({ children: [run("Článok IV.", { bold: true })], alignment: "center" }),
            new Paragraph({ children: [run("Osobitné ustanovenia", { bold: true })], alignment: "center" }),
            new Paragraph({ children: [run("1. Zhotoviteľ prehlasuje a uisťuje, že je spôsobilý uzatvoriť túto zmluvu, získal všetky potrebné schválenia a povolenia k podpisu tejto zmluvy a k plneniu záväzkov z nej vyplývajúcich.")], spacing: { line: 720 }, }),
            new Paragraph({ children: [run("2. Zhotoviteľ prehlasuje a uisťuje, že uzatvorenie tejto zmluvy nie je v rozpore s podmienkami stanovenými v akejkoľvek zmluve uzavretej zhotoviteľom s treťou stranou, jej plnenia z jeho strany nepovedú k porušeniu práv tretích osôb, etických štandardov a ani použiteľných všeobecne záväzných právnych predpisov ani interných predpisov a hlavne, že plnenie zmluvy a poskytovanie odmeny na základe tejto zmluvy nie je vnímané alebo vo výsledku nepôsobí ako prostriedok presvedčovania či motivácie k užívaniu, predpisovaniu alebo inej podpore liekov alebo k akémukoľvek ovplyvňovaniu výsledkov klinického skúšania liekov alebo k priamemu alebo nepriamemu vplyvu na prijímanie akýchkoľvek rozhodnutí, týkajúcich sa farmaceutických spoločností a liekov.")], spacing: { line: 720 }, }),
            new Paragraph({ children: [run("3. Zhotoviteľ prehlasuje a uisťuje, že nebude priamo alebo nepriamo ponúkať alebo vyplácať peňažnú čiastku alebo čokoľvek hodnotné alebo schvaľovať ich ponúkanie úradnej osobe, ani sa nebude snažiť nedovoleným spôsobom ovplyvňovať úradné osoby, a ani takúto platbu neprijal ani v budúcnosti neprijme. Akékoľvek porušenie tohto článku zhotoviteľom sa bude považovať za podstatné porušenie tejto zmluvy.")], spacing: { line: 720 }, }),
            new Paragraph({ children: [run("4. Odstúpenie od zmluvy. Objednávateľ je oprávnený okamžite odstúpiť od Zmluvy písomným oznámením doručeným zhotoviteľovi v prípade, že zhotoviteľ poruší akékoľvek prehlásenia alebo záruky uvedené v tejto zmluve, alebo pokiaľ Objednávateľ zistí, že sú alebo boli zhotoviteľom uskutočňované neprípustné platby úradnej osobe. Ak dôjde k ukončeniu zmluvy týmto spôsobom, zanikajú zhotoviteľovi okamihom odstúpenia Objednávateľa od tejto zmluvy všetky nároky na akékoľvek ďalšie platby či plnenia podľa tejto zmluvy, ktorých platnosť nastáva po dni odstúpenia, a to bez ohľadu na akúkoľvek podniknutú činnosť alebo zmluvy s ďalšími tretími stranami uzatvorenými pred odstúpením spoločnosti KOLLÁR & THIRY s. r. o. od zmluvy, a zároveň zhotoviteľ nesie zodpovednosť za škodu alebo za prostriedky nápravy ako je stanovené príslušnými právnymi predpismi.")], spacing: { line: 720 }, }),
            new Paragraph({ children: [run("5. Zhotoviteľ v zmysle všeobecného nariadenia o ochrane údajov poskytuje Objednávateľovi osobné údaje na účel vytvorenia platnej zmluvy o dielo s Objednávateľom, spracovania elektronickej zmluvy, riadneho dodania služby, zúčtovania platieb a nevyhnutnej komunikácie medzi Zmluvnými stranami Poskytnutie osobných údajov zo strany Zhotoviteľa je dobrovoľné. Osobné údaje nebudú sprístupňované, zverejňované a ani nebude dochádzať k cezhraničnému prenosu do tretích krajín a ani nedôjde k profilovaniu. Objednávateľ postupuje pri zaobchádzaní s osobnými údajmi Zhotoviteľa v súlade s ustanoveniami nariadenia. Iným subjektom bude umožnený prístup k osobným údajom zákazníkov len v prípadoch stanovených všeobecne záväznými právnymi predpismi (najmä v priebehu správneho či trestného konania). Zhotoviteľ je povinný svoje osobné údaje uvádzať správne a pravdivo a bez zbytočného odkladu informovať objednávajúceho o ich zmene. V prípade, ak Zhotoviteľ neposkytne Objednávateľovi osobné údaje, nie je možné uzatvoriť zmluvný vzťah. Osobné údaje bude Objednávateľ spracúvať a archivovať v súlade s osobitnými predpismi počas 10 rokov odo dňa skončenia zmluvného vzťahu. Zhotoviteľ, ktorého osobné údaje sú spracúvané Objednávateľom, má právo od Objednávateľa požadovať prístup k osobným údajom, ktoré sa ho týkajú, ako aj právo na opravu, vymazanie alebo obmedzenie spracúvania týchto údajov. Ak sa Zhotoviteľ domnieva, že spracúvanie osobných údajov, ktoré sa ho týka, je v rozpore so všeobecným nariadením o ochrane údajov, má právo podať sťažnosť dozornému orgánu, ktorým sa rozumie Úrad na ochranu osobných údajov Slovenskej republiky, Hraničná 12, 820 07 Bratislava.")], spacing: { line: 720 }, }),
            new Paragraph({ children: [run("6. Prípadné otázky týkajúce sa ochrany osobných údajov môže Zhotoviteľ adresovať zodpovednej osobe Objednávateľa prostredníctvom e-mailovej adresy: podpora@medinsights.sk.")], spacing: { line: 720 }, }),
            new Paragraph({ children: [run("7. Zhotoviteľ sa zaväzuje dodržiavať mlčanlivosť o všetkých skutočnostiach týkajúcich sa objednávateľa, jeho predmetu činnosti, výsledkov práce jeho činnosti, obchodných partnerov, iných Respondentov, marketingových projektov a ďalších skutočností, o ktorých sa zhotoviteľ dozvie pri plnení predmetu tejto zmluvy. Zhotoviteľ sa zaväzuje oboznámiť s týmto svojim záväzkom mlčanlivosti, ktorý má voči objednávateľovi všetkých, s ktorými opodstatnene a v nevyhnutnej miere musí spolupracovať pri zhotovovaní diela podľa článku I. bod. 1. tejto zmluvy a súčasne vykoná všetko pre to, aby aj oni dodržiavali mlčanlivosť o vyššie uvedených skutočnostiach. Zhotoviteľ za tieto osoby zodpovedá v plnom rozsahu. Tento záväzok mlčanlivosti platí nielen po dobu trvania tejto zmluvy, ale aj po jej skončení.")], spacing: { line: 720 }, }),
            new Paragraph({ children: [run("8. Zhotoviteľ sa zaväzuje neodkladne nahlásiť objednávateľovi všetky informácie týkajúce sa nežiaducich účinkov liekov.")], spacing: { line: 720 }, }),
            new Paragraph({ children: [run("Článok V.", { bold: true })], alignment: "center" }),
            new Paragraph({ children: [run("Záverečné ustanovenia", { bold: true })], alignment: "center" }),
            new Paragraph({ children: [run("1. Táto zmluva nadobúda platnosť a účinnosť dňom jej uzavretia zmluvnými stranami, t.j. dňom elektronického potvrdenia akceptácie návrhu zmluvy (zmluvných podmienok) zhotoviteľom.")] }),
            new Paragraph({ children: [run("2. Zmluvné strany sa v zmysle § 262 Obchodného zákonníka dohodli, že ich záväzkový vzťah sa spravuje Obchodným zákonníkom.")] }),
            new Paragraph({ children: [run("3. Túto zmluvu je možné meniť len písomnými dodatkami podpísanými obidvoma zmluvnými stranami.")] }),
            new Paragraph({ children: [run("4. Zmluvné strany prehlasujú, že si zmluvu prečítali, jej obsahu porozumeli a na potvrdenie toho, že obsah tejto zmluvy zodpovedá ich skutočnej a slobodnej vôli, túto zmluvu uzavreli elektronickými prostriedkami.")] }),
            new Paragraph({ children: [run("5. Zmluvné strany týmto prehlasujú, že elektronická výmena dát vykonávaná na základe tejto zmluvy má povahu písomne vykonávaného právneho úkonu a je rovnocenná s inak bežne užívanou formou písomného styku. Zmluvné strany zároveň výslovne berú na vedomie, že takým prenosom informácií vznikajú záväzky, ktoré sú právne platné a že na ich základe sa zmluvné strany môžu domáhať plnenia povinností.")] }),
            new Paragraph({ children: [run("6. Zmluvné strany sa zaväzujú, že nebudú úkony urobené na základe tejto zmluvy akokoľvek spochybňovať alebo prehlasovať za neplatné iba preto, že úkon bol urobený elektronickými prostriedkami.")] }),
            new Paragraph({ children: [run("7. Zmluvné strany týmto prehlasujú, že elektronické správy a záznamy sú hodnoverným a prijateľným dôkazným materiálom a rovnako sa zaväzujú, že nenapadnú ani nebudú spochybňovať dôkaznú prípustnosť úkonov urobených elektronickými prostriedkami.")] }),
          ],
        },
      ],
    });
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'zmluva-o-dielo.docx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloading(false);
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16" style={{ backgroundColor: '#ffffff', fontFamily: 'Helvetica, Arial, sans-serif' }}>
      <div className="mb-12 p-8" style={{ backgroundColor: '#fafafa' }}>
        <div className="text-sm mb-2" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif' }}><span className="font-medium">Meno:</span> {contractor.name}</div>
        <div className="text-sm" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif' }}><span className="font-medium">Email:</span> {contractor.email}</div>
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8" style={{ color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif', letterSpacing: '-0.02em' }}>Zmluva o dielo</h1>
      <div className="overflow-y-scroll whitespace-pre-wrap p-8 text-sm mb-12 leading-relaxed" style={{ backgroundColor: '#fafafa', border: '1px solid #e0e0e0', color: '#333333', fontFamily: 'Helvetica, Arial, sans-serif', maxHeight: '60vh' }}>
        {filledContract}
      </div>
      <div className="mb-8 p-8" style={{ backgroundColor: '#fafafa' }}>
        <div className="flex items-start">
          <input 
            id="agree-contract" 
            type="checkbox" 
            checked={agreed} 
            onChange={e => setAgreed(e.target.checked)} 
            className="mr-3 mt-1" 
            style={{ accentColor: '#000000', width: '18px', height: '18px' }}
          />
          <label htmlFor="agree-contract" className="text-sm leading-relaxed" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif' }}>
            Zaškrtnutím tohto políčka prehlasujem, že som si zmluvu riadne prečítal/a a súhlasím s hore uvedenými zmluvnými podmienkami.
          </label>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          className="flex-1 py-4 font-medium transition-all duration-300"
          style={{ backgroundColor: 'transparent', color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif', border: '2px solid #000000', letterSpacing: '0.05em', borderRadius: '50px' }}
          onMouseEnter={(e) => { (e.target as HTMLElement).style.backgroundColor = '#000000'; (e.target as HTMLElement).style.color = '#ffffff'; }}
          onMouseLeave={(e) => { (e.target as HTMLElement).style.backgroundColor = 'transparent'; (e.target as HTMLElement).style.color = '#000000'; }}
          onClick={handleDownload}
          disabled={downloading}
        >
          {downloading ? "SŤAHOVANIE..." : "STIAHNUŤ"}
        </button>
        <button
          className="flex-1 py-4 font-medium transition-all duration-300"
          style={{
            backgroundColor: agreed ? 'transparent' : '#f5f5f5',
            color: agreed ? '#000000' : '#999999',
            fontFamily: 'Helvetica, Arial, sans-serif',
            border: '2px solid #000000',
            cursor: agreed ? 'pointer' : 'not-allowed',
            letterSpacing: '0.05em',
            borderRadius: '50px'
          }}
          onMouseEnter={(e) => {
            if (agreed) {
              (e.target as HTMLElement).style.backgroundColor = '#000000';
              (e.target as HTMLElement).style.color = '#ffffff';
            }
          }}
          onMouseLeave={(e) => {
            if (agreed) {
              (e.target as HTMLElement).style.backgroundColor = 'transparent';
              (e.target as HTMLElement).style.color = '#000000';
            }
          }}
          onClick={handleApproveContract}
          disabled={!agreed}
        >
          SCHVÁLIŤ ZMLUVU
        </button>
      </div>
    </div>
  );
}
