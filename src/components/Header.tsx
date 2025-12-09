"use client";
import React from "react";

export default function Header() {
  return (
      <header className="w-full  top-0 z-50 flex flex-col sm:flex-row items-center justify-between px-6 py-3" style={{ background: 'transparent' }}>
      <div className="flex items-center gap-3">
        <a href="/">
            <img src="/logo.jpg" alt="Logo" className="h-20 w-auto rounded p-1 transition-all duration-200" style={{ border: '1px solid #0097b2', backgroundColor: '#ffffff', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
        </a>
      </div>
      <div className="flex flex-col items-end gap-2 mt-3 sm:mt-0">
        <a href="/admin" className="px-4 py-2 rounded font-semibold transition mb-1" style={{ backgroundColor: '#16a34a', color: '#ffffff', fontFamily: 'Helvetica, Arial, sans-serif', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }} onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#15803d'} onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = '#16a34a'}>Administrácia</a>
      </div>
    </header>
  );
}