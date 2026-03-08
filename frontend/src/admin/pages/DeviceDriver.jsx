import React from 'react';
import { MonitorDown, Download, Terminal, Settings } from 'lucide-react';

const DeviceDriver = () => {
  const drivers = [
    {
      brand: "Mantra",
      model: "MFS100",
      type: "Biometric Fingerprint Scanner",
      version: "v9.2.0.0",
      os: "Windows 7/8/10/11 (32/64 bit)",
      size: "15.4 MB",
      icon: <Terminal className="w-12 h-12 text-cyan-500" />
    },
    {
      brand: "Morpho",
      model: "MSO 1300 E3",
      type: "Biometric Fingerprint Scanner",
      version: "v3.1.20",
      os: "Windows 10/11 (64 bit)",
      size: "24.1 MB",
      icon: <Settings className="w-12 h-12 text-cyan-600" />
    },
    {
      brand: "Star",
      model: "TSP143III",
      type: "Thermal Receipt Printer",
      version: "v7.5.0",
      os: "Windows All Versions",
      size: "42.8 MB",
      icon: <MonitorDown className="w-12 h-12 text-slate-700" />
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
            <MonitorDown className="w-8 h-8 text-cyan-500" />
            Device Drivers
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Download the officially supported drivers and RD services for your peripheral hardware.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 sm:p-10 mb-8 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-50 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-slate-800 mb-2">Need Help Installing?</h2>
            <p className="text-slate-600 font-medium text-sm leading-relaxed max-w-2xl">
              Please ensure you completely uninstall any previous versions of the driver or RD services before installing the updated versions provided below. After installation, a system restart is highly recommended for biometric devices to initialize correctly.
            </p>
          </div>
          <button className="px-6 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-900 transition-colors shrink-0 shadow-sm">
            View Installation Guide
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drivers.map((driver, index) => (
          <div key={index} className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 flex flex-col hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-4 bg-slate-50 rounded-2xl shrink-0">
                {driver.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 leading-tight mb-1">{driver.brand}</h3>
                <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs font-bold font-mono">
                  {driver.model}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-8 flex-grow">
              <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                <span className="text-slate-500 font-medium">Device Type</span>
                <span className="text-slate-800 font-bold truncate ml-2 text-right">{driver.type}</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                <span className="text-slate-500 font-medium">OS Supported</span>
                <span className="text-slate-800 font-medium truncate ml-2 text-right">{driver.os}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium">Driver Version</span>
                <div className="text-right">
                  <span className="text-cyan-600 font-bold bg-cyan-50 px-2 py-0.5 rounded text-xs">{driver.version}</span>
                </div>
              </div>
            </div>

            <button className="w-full py-3.5 bg-cyan-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-cyan-700 transition-all shadow-sm shadow-cyan-500/20 active:scale-[0.98]">
              <Download className="w-5 h-5" />
              Download ({driver.size})
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceDriver;
