
import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { Document, Packer, Paragraph, TextRun } from "docx";

function buildContractDoc(contractor: any) {
  const font = "Helvetica";
  const size = 24;
  function run(text: string, opts: any = {}) {
    return new TextRun({ text, font, size, ...opts });
  }
  return new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({ children: [run("Zmluva o dielo", { bold: true })], alignment: "center", spacing: { after: 200 } }),
          new Paragraph({ children: [run("uzavretá podľa § 536 a nasl. zákona č.513/1991 Zb. Obchodný zákonník v znení neskorších predpisov medzi")], alignment: "center", spacing: { after: 200 } }),
          new Paragraph({ children: [run("OBJEDNÁVATEĽ:", { bold: true })] }),
          new Paragraph({ children: [run("KOLLÁR & THIRY s. r. o.", { bold: true })] }),
          new Paragraph({ children: [run("Antona Floreka 8680/14A")] }),
          new Paragraph({ children: [run("841 06 Bratislava")] }),
          new Paragraph({ children: [run("www.yourbrandtransformers.com")] }),
          new Paragraph({ children: [run("IČO: 54630223")] }),
          new Paragraph({ children: [run("DIČ: 2121757561")] }),
          new Paragraph({ children: [run("IČ DPH: SK2121757561")] }),
          new Paragraph({ children: [run("Bankové spojenie: Tatra Banka")] }),
          new Paragraph({ children: [run("IBAN: SK96 1100 0000 0029 4713 0958")] }),
          new Paragraph({ children: [run("Obchodný Register Mestského súdu Bratislava III oddiel Sro, vložka č. 161136/B")] }),
          new Paragraph({ children: [run("(ďalej len 'Objednávateľ')")] }),
          new Paragraph({ children: [run("ZHOTOVITEĽ:", { bold: true })] }),
          new Paragraph({ children: [run(`Meno a priezvisko: ${contractor.name}`)] }),
          new Paragraph({ children: [run(`Ulica, č. d.: ${contractor.street}`)] }),
          new Paragraph({ children: [run(`PSČ, mesto: ${contractor.postal_code_city}`)] }),
          new Paragraph({ children: [run(`Email: ${contractor.email}`)] }),
          new Paragraph({ children: [run(`Bankové spojenie (Názov banky): ${contractor.bank_name}`)] }),
          new Paragraph({ children: [run(`IBAN: ${contractor.iban}`)] }),
          new Paragraph({ children: [run(`DIČ alebo rodné číslo: ${contractor.tin_or_personal_id}`, { bold: true })] }),
          new Paragraph({ children: [run("(ďalej len 'Zhotoviteľ')")] }),
          new Paragraph({ children: [run("")] }),
          // ... (You can add the rest of the contract body here as needed)
        ],
      },
    ],
  });
}


export default function AdminDashboard() {
  const [physicians, setPhysicians] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    async function fetchData() {
      setLoading(true);
      const { data, error } = await supabase
        .from('contracts')
        .select('*')
        .order('created_at', { ascending: false });
      setPhysicians(data || []);
      setLoading(false);
    }
    fetchData();
  }, []);

  async function handleDownload(contractor: any) {
    setDownloadingId(contractor.id);
    const doc = buildContractDoc(contractor);
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zmluva-${contractor.name.replace(/\s+/g, '_')}.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloadingId(null);
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-6">Project Administration Dashboard</h1>
      {loading ? (
        <div className="text-center text-gray-500">Loading data...</div>
      ) : (
        <table className="w-full border mb-8">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Physician Name</th>
              <th className="p-2 border">Login Timestamp</th>
              <th className="p-2 border">Contract Approved</th>
              <th className="p-2 border">Questionnaire Status</th>
              <th className="p-2 border">Contract Download</th>
              <th className="p-2 border">Contract Details</th>
            </tr>
          </thead>
          <tbody>
            {physicians.length === 0 ? (
              <tr>
                <td className="p-2 border text-center" colSpan={6}>No data found.</td>
              </tr>
            ) : (
              physicians.map((p) => (
                <tr key={p.id}>
                  <td className="p-2 border font-semibold">{p.name || '-'}</td>
                  <td className="p-2 border">
                    {p.login_timestamp
                      ? isClient
                        ? new Date(p.login_timestamp).toLocaleString()
                        : p.login_timestamp
                      : '-'}
                  </td>
                  <td className="p-2 border">{typeof p.contract_approved === 'boolean' ? (p.contract_approved ? 'Yes' : 'No') : '-'}</td>
                  <td className="p-2 border">{p.questionnaire_status || '-'}</td>
                  <td className="p-2 border">
                    <button
                      className="text-blue-600 underline disabled:opacity-50"
                      onClick={() => handleDownload(p)}
                      disabled={!!downloadingId}
                    >
                      {downloadingId === p.id ? 'Downloading...' : 'Download'}
                    </button>
                  </td>
                  <td className="p-2 border text-xs">
                    <div><b>Street:</b> {p.street || '-'}</div>
                    <div><b>City:</b> {p.postal_code_city || '-'}</div>
                    <div><b>Email:</b> {p.email || '-'}</div>
                    <div><b>Bank:</b> {p.bank_name || '-'}</div>
                    <div><b>IBAN:</b> {p.iban || '-'}</div>
                    <div><b>Tax ID:</b> {p.tin_or_personal_id || '-'}</div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
