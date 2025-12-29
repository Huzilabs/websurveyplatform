

"use client";
// import SimpleFooter from "@/components/SimpleFooter";
import SimpleFooter from "@/components/SimpleFooter";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ 
      fontFamily: 'Helvetica, Arial, sans-serif',
      backgroundColor: '#ffffff'
    }}>
      {/* Logo only */}
      <div className="w-full  text-center px-2">
        <Image 
          src="/logo.jpg" 
          alt="MedInsights 2026 Logo" 
          width={300} 
          height={300}
          className="w-full h-auto"
          priority
        />
      </div>
          <SimpleFooter />

    </div>
  );
}

