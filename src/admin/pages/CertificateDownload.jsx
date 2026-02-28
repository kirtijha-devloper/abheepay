import React from 'react';
import { Award, Download, FileText, CheckCircle2 } from 'lucide-react';

const CertificateDownload = () => {
  const certificates = [
    {
      id: "CERT-2026-BH-01",
      title: "Authorized Merchant Certificate",
      description: "Official abheePay partnership certificate for display in your outlet.",
      date: "Issued: Jan 15, 2026",
      status: "Active",
      icon: <Award className="w-10 h-10 text-cyan-500" />
    },
    {
      id: "BC-AGR-8842",
      title: "BC Agent Agreement Letter",
      description: "Banking Correspondent authorization letter and operating guidelines.",
      date: "Issued: Jan 15, 2026",
      status: "Active",
      icon: <FileText className="w-10 h-10 text-blue-500" />
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
            <Award className="w-8 h-8 text-cyan-500" />
            Certificates & Documents
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Download your official authorization certificates and agreement copies.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert, index) => (
          <div key={index} className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 flex flex-col hover:shadow-md hover:border-cyan-200 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-cyan-50 transition-colors">
                {cert.icon}
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/50">
                <CheckCircle2 className="w-3 h-3" />
                {cert.status}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-800 mb-2 leading-tight">
              {cert.title}
            </h3>

            <p className="text-sm font-medium text-slate-500 mb-6 flex-grow">
              {cert.description}
            </p>

            <div className="border-t border-slate-100 pt-4 mt-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-400">{cert.id}</span>
                <span className="text-xs font-medium text-slate-400">{cert.date}</span>
              </div>

              <button className="w-full py-2.5 bg-slate-50 border border-slate-200 text-cyan-700 rounded-xl font-bold flex items-center justify-center gap-2 group-hover:bg-cyan-600 group-hover:text-white group-hover:border-transparent transition-all active:scale-[0.98]">
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificateDownload;
