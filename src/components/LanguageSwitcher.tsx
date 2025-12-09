"use client";
import { useState } from "react";
import Link from "next/link";

const languages = [
  { code: "en", label: "English" },
  { code: "sk", label: "Slovensky" },
];

export default function LanguageSwitcher({ lang, setLang }: { lang: string; setLang: (l: string) => void }) {
  return (
    <div>
      <select
        value={lang}
        onChange={e => setLang(e.target.value)}
        className="border rounded px-2 py-1 min-w-[120px]"
      >
        {languages.map(l => (
          <option key={l.code} value={l.code}>{l.label}</option>
        ))}
      </select>
    </div>
  );
}
