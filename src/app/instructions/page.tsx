"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function InstructionsPage() {
  const router = useRouter();
  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 bg-white rounded shadow mt-4 sm:mt-8">
      <ul className="list-disc pl-4 sm:pl-6 mb-4 sm:mb-6 text-sm sm:text-base">
        <li>Dotazník je možné vyplniť naraz alebo v niekoľkých krokoch.</li>
        <li>Pri škálach prosíme označiť vždy jednu odpoveď, ak nie je uvedené inak.</li>
        <li>Pri otvorených otázkach môžete uviesť ľubovoľne dlhú odpoveď.</li>
        <li>Po odoslaní dát získate potvrdenie o účasti.</li>
        <li>V prípade otázok nás kontaktujte na <a href="mailto:podpora@medinsights.sk" className="text-blue-600 underline">podpora@medinsights.sk</a></li>
      </ul>
      <h2 className="text-lg sm:text-xl font-semibold mb-2">Dôležité termíny</h2>
      <ul className="list-disc pl-4 sm:pl-6 mb-4 sm:mb-6 text-sm sm:text-base">
        <li>Trvanie prieskumu: 15. 12. 2026 – 15. 01. 2026</li>
        <li>Dotazník je potrebné vyplniť v rámci daného obdobia.</li>
      </ul>
      <button
        className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded hover:bg-blue-700 cursor-pointer font-semibold text-sm sm:text-base w-full sm:w-auto"
        onClick={() => router.push("/questionnaire")}
      >
        Prejsť do prieskumu
      </button>
    </div>
  );
}
