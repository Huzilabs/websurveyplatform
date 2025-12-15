"use client";
import React from "react";

export default function Header() {
  return (
    <header className="w-full top-0 z-50 flex flex-row items-center justify-between px-6 sm:px-12 py-6 sm:py-8" style={{ background: '#ffffff', borderBottom: '1px solid #f0f0f0' }}>
      <div className="flex items-center">
        <a href="/">
          <img 
            src="/logo.jpg" 
            alt="MedInsights Logo" 
            className="h-20 sm:h-24 w-auto transition-opacity duration-300 hover:opacity-80" 
            style={{ 
              border: 'none'
            }} 
          />
        </a>
      </div>
      <div className="flex items-center">
        <a 
          href="/admin" 
          className="px-6 py-2 text-sm font-medium transition-all duration-300 tracking-wide" 
          style={{ 
            backgroundColor: 'transparent', 
            color: '#000000', 
            fontFamily: 'Helvetica, Arial, sans-serif', 
            border: '1px solid #000000',
            letterSpacing: '0.05em'
          }} 
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.backgroundColor = '#000000';
            (e.target as HTMLElement).style.color = '#ffffff';
          }} 
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.backgroundColor = 'transparent';
            (e.target as HTMLElement).style.color = '#000000';
          }}
        >
          ADMIN
        </a>
      </div>
    </header>
  );
}