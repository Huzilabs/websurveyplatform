
"use client";
import PersonalDataForm from "../../components/PersonalDataForm";

export default function PersonalDataPage() {
  // PersonalDataForm handles everything including navigation
  function handleSubmit(data: any) {
    // This is just a placeholder - PersonalDataForm handles the actual submission
    console.log('Personal data submitted:', data);
  }

  return (
    <div className="flex min-h-screen items-center justify-center py-12 sm:py-16" style={{ backgroundColor: '#ffffff', fontFamily: 'Helvetica, Arial, sans-serif' }}>
      <main className="flex flex-col items-center w-full max-w-4xl px-4 sm:px-6">
        <PersonalDataForm onSubmit={handleSubmit} />
      </main>
    </div>
  );
}
