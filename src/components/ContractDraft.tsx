"use client";

import { useState } from "react";

export default function ContractDraft({ contractor, onSave }: {
  contractor: {
    name: string;
    street: string;
    city: string;
    email: string;
    bank: string;
    iban: string;
    taxId: string;
  };
  onSave: () => void;
}) {
  const [agreed, setAgreed] = useState(false);

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
Meno a priezvisko: ${contractor.name}
Ulica, č. d.: ${contractor.street}
PSČ, mesto: ${contractor.city}
Email: ${contractor.email}
Bankové spojenie (Názov banky): ${contractor.bank}
IBAN: ${contractor.iban}
DIČ alebo rodné číslo: ${contractor.taxId}

(ďalej len "Zhotoviteľ")
Článok I.
Dielo
1. Zhotoviteľ sa touto zmluvou zaväzuje zapojiť v termíne od 15. 12. 2025 do 15.1. 2026 do marketingového prieskumu s názvom „MedInsights 2025“ organizovaného objednávateľom a za tým účelom sa zaväzuje vyplniť pre objednávateľa digitálny formulár/dotazník, ktoré mu objednávateľ sprístupní vo webovom rozhraní na doméne www.medinsights.sk. Zhotoviteľ sa zaväzuje vyplniť digitálny formulár/dotazník podľa metodiky určenej objednávateľom a digitálne ho odovzdať (digitálne odoslať) objednávateľovi najneskôr do 15. 1. 2026 (ďalej len „dielo“).
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

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-green-200 mt-8 mb-16">
      <h1 className="text-2xl font-bold text-green-700 mb-4">Návrh zmluvy</h1>
      <div className="h-96 overflow-y-scroll whitespace-pre-wrap bg-green-50 border border-green-100 rounded p-4 text-gray-800 text-sm mb-6" style={{ maxHeight: '60vh' }}>
        {contractText}
      </div>
      <div className="flex items-center mb-4">
        <input
          id="agree"
          type="checkbox"
          checked={agreed}
          onChange={e => setAgreed(e.target.checked)}
          className="mr-2 accent-green-600"
        />
        <label htmlFor="agree" className="text-green-800 text-sm">
          Zaškrtnutím tohto políčka prehlasujem, že som si zmluvu riadne prečítal/a a súhlasím s hore uvedenými zmluvnými podmienkami.
        </label>
      </div>
      <button
        className={`w-full py-2 rounded font-semibold transition ${agreed ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
        disabled={!agreed}
        onClick={agreed ? onSave : undefined}
      >
        Uložiť
      </button>
    </div>
  );
}
