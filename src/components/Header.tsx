"use client";
import React from "react";

export default function Header() {
  return (
    <header className="w-full top-0 z-50 flex flex-row items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4" style={{ background: 'transparent' }}>
      <div className="flex items-center gap-3">
        <a href="/">
          <img 
            src="/logo.jpg" 
            alt="Logo" 
            className="h-16 sm:h-20 lg:h-24 w-auto rounded p-1 transition-all duration-200 hover:scale-105" 
            style={{ 
              border: '1px solid #0097b2', 
              backgroundColor: '#ffffff', 
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
            }} 
          />
        </a>
      </div>
      <div className="flex items-center">
        <a 
          href="/admin" 
          className="px-3 sm:px-4 lg:px-6 py-2 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base" 
          style={{ 
            backgroundColor: '#16a34a', 
            color: '#ffffff', 
            fontFamily: 'Helvetica, Arial, sans-serif', 
            boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)'
          }} 
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.backgroundColor = '#15803d';
            (e.target as HTMLElement).style.transform = 'translateY(-1px)';
            (e.target as HTMLElement).style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.15)';
          }} 
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.backgroundColor = '#16a34a';
            (e.target as HTMLElement).style.transform = 'translateY(0)';
            (e.target as HTMLElement).style.boxShadow = '0 2px 4px 0 rgba(0, 0, 0, 0.1)';
          }}
        >
          Administrácia
        </a>
      </div>
    </header>
  );
}