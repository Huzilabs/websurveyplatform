
"use client";
import PersonalDataForm from "../../components/PersonalDataForm";

export default function PersonalDataPage() {
  // PersonalDataForm handles everything including navigation
  function handleSubmit(data: any) {
    // This is just a placeholder - PersonalDataForm handles the actual submission
    console.log('Personal data submitted:', data);
  }

  return (
    <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: '#ffffff', fontFamily: 'Helvetica, Arial, sans-serif' }}>
      <main className="flex flex-col items-center w-full max-w-2xl p-8">
        {/* <h1 className="text-2xl font-bold mb-4 text-center" style={{ color: '#000000', fontFamily: 'Helvetica, Arial, sans-serif' }}>Fill in your personal details</h1> */}
        <PersonalDataForm onSubmit={handleSubmit} />
      </main>
    </div>
  );
}
