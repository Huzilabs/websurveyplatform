
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


import SessionTimeout from "../components/SessionTimeout";
import LanguageProvider from "../components/LanguageProvider";
import Header from "../components/Header";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MEDINSIGHTS",
  description: "Generated with Love",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
};




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ 
          fontFamily: 'Helvetica, Arial, sans-serif', 
          background: '#ffffff',   
          color: '#000000', 
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column',
          width: '100%',
          maxWidth: '100vw',
          overflowX: 'hidden'
        }}
        suppressHydrationWarning={true}
      >
        <SessionTimeout />
        <LanguageProvider>
          <Header />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}  
