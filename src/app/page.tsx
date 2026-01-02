

"use client";
// import SimpleFooter from "@/components/SimpleFooter";
import SimpleFooter from "@/components/SimpleFooter";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col  " style={{ 
      fontFamily: 'Helvetica, Arial, sans-serif',
      backgroundColor: '#ffffff'
    }}>
      {/* Logo only */}
      <div className="w-full text-center flex justify-center mt-10">
  <Image
    src="/1.svg"
    alt="MedInsights 2026 Logo"
    width={520}
    height={400}
    
    priority
  />
</div>

          <SimpleFooter />

    </div>
  );
}

