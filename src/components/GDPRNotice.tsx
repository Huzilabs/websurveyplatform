import React from "react";

const gdprRows = [
  {
    purpose: "Účtovná agenda (spracúvanie osobných údajov v účtovnej dokumentácii)",
    legalBasis: "Spracúvanie je v zmysle čl. 6 ods. 1 písm. c) Nariadenia nevyhnutné na splnenie zákonných povinností prevádzkovateľa vyplývajúcich zo zákona č. 431/2002 Z. z. o účtovníctve v znení neskorších predpisov, zákona č. 222/2004 Z. z. o dani z pridanej hodnoty v znení neskorších predpisov, zákona č. 40/1964 Zb. Občiansky zákonník v znení neskorších predpisov, zákona č. 311/2001 Z. z. Zákonník práce v znení neskorších predpisov, zákona č. 595/2003 Z. z. o dani z príjmu v znení neskorších predpisov, zákona č. 582/2004 Z. z. o miestnych daniach a miestnom poplatku za komunálne odpady a drobné stavebné odpady v znení neskorších predpisov a zákona č. 283/2002 Z. z. o cestovných náhradách v znení neskorších predpisov",
    subjects: "Zamestnanci prevádzkovateľa, Zamestnanci dodávateľov tovaru a služieb, Klienti, zamestnanec",
    duration: "10 rokov nasledujúcich po roku ktorého sa týkajú, mesačné plány a výkazy, odsúhlasenie dodávateľov a odberateľov, mesačné odsúhlasenie účtov - 7 rokov nasledujúcich po roku ktorého sa týkajú, bankové avíza, kurzové lístky - 5 rokov nasledujúcich po roku ktorého sa týkajú",
    recipients: "subjekty, ktorým prevádzkovateľ poskytuje osobné údaje nex lege, spracovateľ účtovnej agendy",
    country: "prenos do tretej krajiny sa neuskutočňuje"
  },
  {
    purpose: "Obchodná agenda (spracúvanie osobných údajov na účely komunikovania s dodávateľmi, odberateľmi resp. na obchodnú komunikáciu)",
    legalBasis: "spracúvanie je v zmysle čl. 6 ods. 1 písm. f) Nariadenia nevyhnutné na účely oprávnených záujmov, ktoré sleduje prevádzkovateľ Oprávneným záujmom je: výkon podnikateľskej činnosti, realizácie obchodov, budovania vzťahov so zákazníkmi (starý, nový, potenciálny).",
    subjects: "dodávatelia, odberatelia, zamestnanci dodávateľov a odberateľov, komunikujúce fyzické osoby, zamestnanec",
    duration: "5 rokov po roku v ktorom bola komunikácia ukončená",
    recipients: "dodávatelia, odberatelia, subjekty, ktorým prevádzkovateľ poskytuje osobné údaje ex lege, spracovateľ účtovnej agendy",
    country: "prenos do tretej krajiny sa neuskutočňuje"
  },
  {
    purpose: "Agenda sieťovej bezpečnosti (kontrola IT z pohľadu sieťovej bezpečnosti)",
    legalBasis: "spracúvanie je v zmysle čl. 6 ods. 1 písm. f) Nariadenia nevyhnutné na účely oprávnených záujmov, ktoré sleduje prevádzkovateľ. Oprávneným záujmom je KOLLÁR & THIRY s. r. o., ako prevádzkovateľ má oprávnený záujem spracúvať bežné osobné údaje zamestnancov spoločnosti, zamestnancov dodávateľov poskytujúcich podporu v systémoch, ako aj iných osôb, aby zabezpečil sieťovú bezpečnosť a bezpečnosť spoločnosti KOLLÁR & THIRY s.r.o.",
    subjects: "zamestnanec, Zamestnanec, zamestnanci dodávateľa",
    duration: "",
    recipients: "",
    country: "prenos do tretej krajiny sa neuskutočňuje"
  },
  {
    purpose: "Agenda registratúry správa registratúry, evidencia pošty",
    legalBasis: "spracúvanie je v zmysle čl. 6 ods. 1 písm. c) Nariadenia nevyhnutné na splnenie zákonných povinností prevádzkovateľa vyplývajúcich zo zákona č. 395/2002 Z. z. o archívoch a registratúrach a o doplnení niektorých zákonov v znení neskorších predpisov a zákona č. 305/2013 Z. z o elektronickej podobe výkonu pôsobnosti orgánov verejnej moci a o zmene a doplnení niektorých zákonov (zákon o e-Governmente)",
    subjects: "fyzické osoby – odosielatelia a prijímatelia korešpondencie",
    duration: "bežná korešpondencia 5 rokov nasledujúcich po roku, ktorého sa týkajú, poštovné knihy 3 roky nasledujúce po roku, ktorého sa týkajú",
    recipients: "subjekty, ktorým prevádzkovateľ poskytuje osobné údaje ex lege",
    country: "prenos do tretej krajiny sa neuskutočňuje"
  },
  {
    purpose: "Agenda vybavovania práv dotknutej osoby (Evidencia uplatnených práv dotknutých osôb podľa Kapitoly III Nariadenia 2016/679 o ochrane fyzických osôb pri spracúvaní osobných údajov a o voľnom pohybe takýchto údajov)",
    legalBasis: "spracúvanie je v zmysle čl. 6 ods. 1 písm. c) Nariadenia nevyhnutné na splnenie zákonnej povinnosti prevádzkovateľa vyplývajúce z Nariadenia a zo zákona č. 18/2018 Z. z.",
    subjects: "fyzické osoby uplatňujúce svoje práva ako dotknuté osoby",
    duration: "5 rokov nasledujúcich po roku, ktorého sa týkajú",
    recipients: "subjekty, ktorým prevádzkovateľ poskytuje osobné údaje ex lege",
    country: "prenos do tretej krajiny sa neuskutočňuje"
  },
  {
    purpose: "Agenda zmlúv o dielo",
    legalBasis: "spracúvanie je v zmysle čl. 6 ods. 1 písm. b) Nariadenia nevyhnutné na plnenie zmluvy, ktorej zmluvnou stranou je dotknutá osoba",
    subjects: "fyzická osoba - zmluvná strana",
    duration: "10 rokov nasledujúcich po roku ktorého sa týkajú",
    recipients: "subjekty, ktorým prevádzkovateľ poskytuje osobné údaje ex lege, spoločnosť zabezpečujúca spracovanie dát:",
    country: "prenos do tretej krajiny sa neuskutočňuje"
  },
  {
    purpose: "Agenda databázy lekárov a zdravotníckych pracovníkov (evidencia v databáze lekárov a zdravotníckych pracovníkov) -za účelom zberu aktuálnych dát o existencii a pôsobnosti lekárov a zdravotníckych pracovníkov, analýzu takto získaných dát, stav zdravotníckeho personálu na následnú lepšiu komunikáciu, informovanie (osobne, elektronicky, telefonicky, poštou) lekárov a zdravotníckych pracovníkov s relevantnými informáciami.",
    legalBasis: "súhlas dotknutej osoby v zmysle čl.6 ods.1 písm. a)všeobecného nariadenia o ochrane údajov.",
    subjects: "lekári a zdravotnícki pracovníci",
    duration: "doba platnosti súhlasu uplynie automaticky okamihom skončenia evidencie v databáze lekárov a zdravotníckych pracovníkov",
    recipients: "spoločnosť zabezpečujúca spracovanie dát: KOLLÁR & THIRY s. r. o., Antona Floreka 8680/14A , 841 06 Bratislava, IČO: 546 30 223, farmaceutickým spoločnostiam, ktoré v mene prevádzkovateľa spracúvajú osobné údaje za účelom zberu aktuálnych dát z trhu o stave a pôsobení lekárov a zdravotníckych pracovníkov, spoločnosti zabezpečujúcej poštové zásielky; spoločnosti zabezpečujúcej zasielanie emailových správ (newslettrov) a iným subjektom, ktorým prevádzkovateľ poskytuje údaje ex offo.",
    country: "prenos do tretej krajiny sa neuskutočňuje"
  },
  {
    purpose: "Oodber marketingových informácií (elektronicky, poštou, telefonicky a/alebo inou formou) o marketingových, propagačných, edukačných, vedeckých a iných informáciách o záležitostiach najmä z oblasti medicíny a zdravotníctva, vrátane informácií o liečivých prípravkoch, ktoré pre lekárov, zdravotníckych pracovníkov môžu mať význam alebo môžu byť zaujímavé v rámci výkonu ich profesie.",
    legalBasis: "súhlas dotknutej osoby v zmysle čl.6 ods.1 písm. a)všeobecného nariadenia o ochrane údajov.",
    subjects: "lekári a zdravotnícki pracovníci",
    duration: "doba platnosti súhlasu uplynie automaticky okamihom skončenia zasielania informácií elektronicky, poštou, telefonicky prípadne iným spôsobom",
    recipients: "spoločnosť zabezpečujúca spracovanie dát: KOLLÁR & THIRY s. r. o., Antona Floreka 8680/14A , 841 06 Bratislava, IČO: 546 30 223,  farmaceutickým spoločnostiam, ktoré v mene prevádzkovateľa spracúvajú osobné údaje za účelom informovania o marketingových, propagačných, edukačných, vedeckých a iných informáciách a záležitostiach z oblasti medicíny a zdravotníctva; spoločnosti zabezpečujúcej poštové zásielky; spoločnosti zabezpečujúcej zasielanie emailových správ (newslettrov) a iným subjektom, ktorým prevádzkovateľ poskytuje údaje ex offo",
    country: "prenos do tretej krajiny sa neuskutočňuje"
  },
  {
    purpose: "Agenda kontaktného formulára (kontaktný formulár na webovom sídle na účely zaslania ponuky služieb)",
    legalBasis: "spracúvanie je v zmysle čl. 6 ods. 1 písm. f) Nariadenia nevyhnutné na účely oprávnených záujmov, ktoré sleduje prevádzkovateľ Oprávneným záujmom je: KOLLÁR & THIRY s. r. o. ako prevádzkovateľ má oprávnený záujem na spracúvaní bežných osobných údajov svojich starých, nových, potenciálnych zákazníkov resp. podnetov (titul, meno, priezvisko, telefónne číslo, adresa elektronickej pošty) za účelom komunikácie, zaslania informácií, ponuky služieb a skontaktovania sa so všetkými aj potenciálnymi zákazníkmi na tento účel využíva okrem iného online formulár na svojom webovom sídle.",
    subjects: "fyzické osoby komunikujúce prostredníctvom kontaktného formulára",
    duration: "1 rok odo dňa doručenia dotazu",
    recipients: "prevádzkovateľ",
    country: "prenos do tretej krajiny sa neuskutočňuje"
  }
];

export default function GDPRNotice() {
  return (
    <div className="w-full my-6" style={{overflowX: 'auto'}}>
      <table className="w-full border border-green-300 text-sm">
        <thead className="" style={{backgroundColor: '#e6f7ff', padding: '10px',}}>
          <tr>
            <th className="px-2 py-1 border">Účel spracúvania</th>
            <th className="px-2 py-1 border">Právny základ spracovateľskej činnosti</th>
            <th className="px-2 py-1 border">Kategórie dotknutých osôb</th>
            <th className="px-2 py-1 border">Doba spracúvania osobných údajov</th>
            <th className="px-2 py-1 border">Kategória príjemcov</th>
            <th className="px-2 py-1 border">Označenie tretej krajiny alebo medzinárodnej organizácie</th>
          </tr>
        </thead>
        <tbody>
          {gdprRows.map((row, idx) => (
            <tr key={idx}>
              <td className="border px-2 py-1">{row.purpose || '-'}</td>
              <td className="border px-2 py-1">{row.legalBasis || '-'}</td>
              <td className="border px-2 py-1">{row.subjects || '-'}</td>
              <td className="border px-2 py-1">{row.duration || '-'}</td>
              <td className="border px-2 py-1">{row.recipients || '-'}</td>
              <td className="border px-2 py-1">{row.country || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
