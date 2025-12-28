import React from "react";
import Link from "next/link";

export default function Footer({ variant }: { variant?: "landing" }) {
  return (
    <footer className="w-full mt-auto" style={{ 
      backgroundColor: '#fafafa', 
      borderTop: '1px solid #e5e7eb',
      fontFamily: 'Helvetica, Arial, sans-serif'
    }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-8 sm:py-12">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Link href="/gdpr" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif' }} className="text-sm">Ochrana osobných údajov</Link>
            </div>
            <div className="mt-3 text-sm" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif' }} >
              V prípade otázok nás kontaktujte na:
            </div>
            <div className="mt-1">
              <a href="mailto:podpora@medinsights.sk" className="text-sm" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif' }}>podpora@medinsights.sk</a>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end">
            <div className="text-sm" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif' }}>© 2026 KOLLÁR & THIRY s.r.o.</div>
            <div className="text-sm mt-1" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif' }}>Všetky práva vyhradené.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
