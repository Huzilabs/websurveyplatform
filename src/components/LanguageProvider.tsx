"use client";
import React, { useState, createContext, ReactNode } from "react";
import LanguageSwitcher from "./LanguageSwitcher";

export const LangContext = createContext<{ lang: string; setLang: (l: string) => void }>({ lang: "en", setLang: () => {} });

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState("en");
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}
