import React from "react";
import Link from "next/link";

export default function Footer({ variant }: { variant?: "landing" }) {
  return (
    <footer className="w-full mt-auto" style={{ 
      backgroundColor: '#fafafa', 
      borderTop: '1px solid #e5e5e5',
      fontFamily: 'Helvetica, Arial, sans-serif'
    }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12 sm:py-16">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-sm" style={{ color: '#999999', fontFamily: 'Helvetica, Arial, sans-serif', letterSpacing: '0.05em' }}>
                © 2025 KOLLÁR & THIRY s.r.o.
              </span>
              <span className="text-sm" style={{ color: '#999999', fontFamily: 'Helvetica, Arial, sans-serif' }}>
                Bratislava, Slovenská republika
              </span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
            {!variant && (
              <Link 
                href="/gdpr" 
                className="text-sm transition-colors duration-300 hover:opacity-60" 
                style={{ 
                  color: '#666666', 
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  letterSpacing: '0.03em'
                }}
              >
                Ochrana údajov
              </Link>
            )}
            <a 
              href="mailto:podpora@webinsights.sk" 
              className="text-sm transition-colors duration-300 hover:opacity-60"
              style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif', letterSpacing: '0.03em' }}
            >
              podpora@webinsights.sk
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
