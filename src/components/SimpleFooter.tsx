import React from "react";

export default function SimpleFooter() {
  return (
    <footer className="w-full" style={{ 
      backgroundColor: '#fafafa', 
      borderTop: '1px solid #e5e7eb',
      fontFamily: 'Helvetica, Arial, sans-serif'
    }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-8 sm:py-12">
        <div className="text-center">
          <div className="text-sm" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif' }}>© 2026 KOLLÁR & THIRY s.r.o.</div>
          <div className="text-sm mt-1" style={{ color: '#666666', fontFamily: 'Helvetica, Arial, sans-serif' }}>Všetky práva vyhradené.</div>
        </div>
      </div>
    </footer>
  );
}
