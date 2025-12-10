import React from "react";
import Link from "next/link";

export default function Footer({ variant }: { variant?: "landing" }) {
  return (
    <footer className="w-full mt-auto border-t" style={{ 
      backgroundColor: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', 
      borderColor: '#e2e8f0',
      fontFamily: 'Helvetica, Arial, sans-serif', 
      color: '#334155' 
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {variant === "landing" ? (
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6 sm:gap-4 text-center sm:text-left">
            <div className="flex flex-col gap-3 sm:gap-4 items-center sm:items-start">
              <div className="relative">
                <img 
                  src="/logo.jpg" 
                  alt="Logo" 
                  className="h-16 sm:h-20 w-auto rounded-lg transition-transform duration-200 hover:scale-105" 
                  style={{ 
                    border: '2px solid #16a34a', 
                    backgroundColor: '#ffffff',
                    boxShadow: '0 4px 12px rgba(22, 163, 74, 0.15)'
                  }} 
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-medium text-sm sm:text-base" style={{ color: '#475569' }}>© 2025 KOLLÁR & THIRY s.r.o.</span>
                <span className="text-xs opacity-70">Všetky práva vyhradené</span>
              </div>
            </div>
            <div className="text-center sm:text-right">
              <div className="flex flex-col gap-1 sm:gap-2">
                <span className="font-semibold text-base sm:text-lg" style={{ color: '#1e293b' }}>Bratislava</span>
                <span className="text-sm opacity-80">Slovenská republika</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6 sm:gap-4 text-center sm:text-left">
            <div className="flex flex-col gap-3 sm:gap-4 items-center sm:items-start">
              <div className="relative">
                <img 
                  src="/logo.jpg" 
                  alt="Logo" 
                  className="h-16 sm:h-20 w-auto rounded-lg transition-transform duration-200 hover:scale-105" 
                  style={{ 
                    border: '2px solid #16a34a', 
                    backgroundColor: '#ffffff',
                    boxShadow: '0 4px 12px rgba(22, 163, 74, 0.15)'
                  }} 
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-medium text-sm sm:text-base" style={{ color: '#475569' }}>© 2025 KOLLÁR & THIRY s.r.o.</span>
                <span className="text-xs opacity-70">Všetky práva vyhradené</span>
              </div>
            </div>
            <div className="text-center sm:text-right">
              <div className="flex flex-col gap-2 sm:gap-3">
                <Link 
                  href="/gdpr" 
                  className="font-medium text-sm sm:text-base transition-colors duration-200 hover:underline" 
                  style={{ 
                    color: '#16a34a', 
                    fontFamily: 'Helvetica, Arial, sans-serif' 
                  }}
                >
                  Ochrana osobných údajov
                </Link>
                <div className="flex flex-col items-center sm:items-end gap-1">
                  <span className="text-sm font-medium" style={{ color: '#64748b' }}>Kontakt:</span>
                  <a 
                    href="mailto:podpora@webinsights.sk" 
                    className="text-sm transition-colors duration-200 hover:text-green-600"
                    style={{ color: '#475569' }}
                  >
                    podpora@webinsights.sk
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}
