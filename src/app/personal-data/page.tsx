
"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PersonalDataForm from "../../components/PersonalDataForm";

export default function PersonalDataPage() {
  // PersonalDataForm handles everything including navigation
  function handleSubmit(data: any) {
    // This is just a placeholder - PersonalDataForm handles the actual submission
    console.log('Personal data submitted:', data);
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#ffffff', fontFamily: 'Helvetica, Arial, sans-serif' }}>
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 sm:py-16 w-full">
        <div className="flex flex-col items-center w-full max-w-4xl px-4 sm:px-6">
          <PersonalDataForm onSubmit={handleSubmit} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
