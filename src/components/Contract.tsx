import { useState } from 'react';

interface ContractProps {
  personalData: {
    name: string;
    street: string;
    city: string;
    email: string;
    bank: string;
    iban: string;
    taxId: string;
  };
  onConfirm: () => void;
}

export default function Contract({ personalData, onConfirm }: ContractProps) {
  const [checked, setChecked] = useState(false);

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 bg-white rounded shadow overflow-y-auto" style={{ maxHeight: '70vh' }}>
      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Contract Preview</h2>
      <div className="mb-3 sm:mb-4 text-xs sm:text-sm">
        <p><strong>OBJEDNÁVATEĽ:</strong> KOLLÁR & THIRY s. r. o., Antona Floreka 8680/14A, 841 06 Bratislava</p>
        <p><strong>ZHOTOVITEĽ:</strong> {personalData.name}, {personalData.street}, {personalData.city}, {personalData.email}, {personalData.bank}, {personalData.iban}, {personalData.taxId}</p>
        {/* ...rest of contract text, use provided template... */}
      </div>
      <label className="flex items-start mb-3 sm:mb-4">
        <input type="checkbox" checked={checked} onChange={e => setChecked(e.target.checked)} className="mt-1 flex-shrink-0" />
        <span className="ml-2 text-xs sm:text-sm">Zaškrtnutím tohto políčka prehlasujem, že som si zmluvu riadne prečítal/a a súhlasím s hore uvedenými zmluvnými podmienkami.</span>
      </label>
      <button
        className="px-4 py-2 bg-green-600 text-white font-bold rounded hover:bg-green-700 transition"
        disabled={!checked}
        onClick={onConfirm}
      >
        Elektronický podpis zmluvy
      </button>
    </div>
  );
}
