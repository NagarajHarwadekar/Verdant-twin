import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Printer,
  X,
  Award,
  Zap,
  Droplets,
  CloudRain,
  Users,
  Lightbulb,
  Building,
  CheckCircle,
  Download,
  Calendar,
} from 'lucide-react';
import { PageId, RoomZone } from '../types';
import { BackButton } from '../components/BackButton';
import {
  MONTHLY_SUSTAINABILITY_DATA,
  BUILDING_CORE_STATS,
} from '../data/mockBuildingData';

interface ReportsPageProps {
  zones: RoomZone[];
  onBack: () => void;
  onNavigate: (page: PageId) => void;
}

export const ReportsPage: React.FC<ReportsPageProps> = ({ zones, onBack, onNavigate }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleGenerateReport = () => {
    setModalOpen(true);
    setToastMessage('Report generated successfully.');
    setTimeout(() => setToastMessage(null), 3500);
  };

  const maxMonthly = Math.max(...MONTHLY_SUSTAINABILITY_DATA.map((d) => d.energyKWh));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <BackButton onBack={onBack} targetLabel="Overview" />
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#064e3b]">
              <FileSpreadsheet className="h-3.5 w-3.5" />
              <span>ESG Accountability & Certification</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Your Building, In One Report.
            </h1>
          </div>
        </div>

        {/* Generate Report Button */}
        <button
          onClick={handleGenerateReport}
          className="metal-glass-btn inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold text-white shadow-md"
        >
          <FileSpreadsheet className="h-4 w-4 text-emerald-300" />
          <span>Generate Report</span>
        </button>
      </div>

      {toastMessage && (
        <div className="rounded-2xl bg-emerald-50 border border-emerald-300 p-4 text-xs font-bold text-emerald-900 flex items-center gap-2 shadow-sm animate-in fade-in">
          <CheckCircle className="h-4 w-4 text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 6 Key Pillars Strip */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <div className="rounded-2xl border border-emerald-900/15 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase text-slate-500">
            <Award className="h-3.5 w-3.5 text-[#064e3b]" />
            <span>Efficiency</span>
          </div>
          <div className="mt-2 font-mono text-2xl font-extrabold text-[#064e3b]">
            84<span className="text-xs font-normal text-slate-400">/100</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-700 font-medium">LEED Gold Score</div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase text-slate-500">
            <Zap className="h-3.5 w-3.5 text-emerald-700" />
            <span>Energy</span>
          </div>
          <div className="mt-2 font-mono text-2xl font-extrabold text-slate-900">
            11,450 <span className="text-xs font-normal text-slate-400">kWh</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-700 font-medium">-19.3% YTD</div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase text-slate-500">
            <Droplets className="h-3.5 w-3.5 text-blue-600" />
            <span>Water</span>
          </div>
          <div className="mt-2 font-mono text-2xl font-extrabold text-slate-900">
            70 <span className="text-xs font-normal text-slate-400">kL</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-700 font-medium">-20.4% YTD</div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase text-slate-500">
            <Users className="h-3.5 w-3.5 text-emerald-700" />
            <span>Occupancy</span>
          </div>
          <div className="mt-2 font-mono text-2xl font-extrabold text-slate-900">
            64%
          </div>
          <div className="mt-1 text-[11px] text-slate-400">104 Occupants</div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase text-slate-500">
            <Lightbulb className="h-3.5 w-3.5 text-amber-600" />
            <span>Lighting</span>
          </div>
          <div className="mt-2 font-mono text-2xl font-extrabold text-slate-900">
            71%
          </div>
          <div className="mt-1 text-[11px] text-amber-700 font-medium">Auto Daylight</div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase text-slate-500">
            <CloudRain className="h-3.5 w-3.5 text-emerald-700" />
            <span>Carbon</span>
          </div>
          <div className="mt-2 font-mono text-2xl font-extrabold text-slate-900">
            4.6 <span className="text-xs font-normal text-slate-400">Tons</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-700 font-medium">-25.8% Intensity</div>
        </div>
      </div>

      {/* Monthly Performance Chart: January through October */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Monthly Performance</h3>
            <p className="text-xs text-slate-500">
              January, February, March, April, May, June, July, August, September, October
            </p>
          </div>
          <div className="font-mono text-xs font-bold text-[#064e3b] bg-emerald-50 px-3 py-1 rounded-lg">
            Steady 19.3% Reduction
          </div>
        </div>

        {/* SVG Column Bars */}
        <div className="h-64 w-full">
          <div className="grid h-full grid-cols-10 items-end gap-2 sm:gap-4 px-2 pb-6">
            {MONTHLY_SUSTAINABILITY_DATA.map((item, idx) => {
              const barHeight = Math.round((item.energyKWh / maxMonthly) * 100);
              const isCurrent = idx === MONTHLY_SUSTAINABILITY_DATA.length - 1;
              return (
                <div key={item.month} className="flex flex-col items-center h-full justify-end group">
                  <span className="mb-1 font-mono text-[10px] text-slate-500 font-medium tabular-nums hidden sm:block">
                    {(item.energyKWh / 1000).toFixed(1)}k
                  </span>
                  <div className="w-full rounded-t-xl bg-slate-100 h-full max-h-[170px] flex items-end">
                    <div
                      style={{ height: `${barHeight}%` }}
                      className={`w-full rounded-t-xl transition-all duration-300 ${
                        isCurrent ? 'bg-[#064e3b]' : 'bg-emerald-700/80 group-hover:bg-[#064e3b]'
                      }`}
                    />
                  </div>
                  <span
                    className={`mt-2 font-mono text-[10px] truncate max-w-[60px] text-center ${
                      isCurrent ? 'font-bold text-[#064e3b]' : 'text-slate-400'
                    }`}
                  >
                    {item.month.slice(0, 3)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="border-t border-slate-100 pt-4 flex flex-wrap items-center justify-between text-xs text-slate-500">
          <span>Starting Baseline: 14,200 kWh (January)</span>
          <span>Current Consumption: 11,450 kWh (October)</span>
          <span className="font-bold text-[#064e3b]">Year-to-Date Savings: 18,450 kWh</span>
        </div>
      </div>

      {/* Generated Report Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-4xl rounded-3xl bg-white shadow-2xl border border-slate-300 max-h-[92vh] overflow-y-auto">
            {/* Top Bar */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4 print:hidden">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5 text-[#064e3b]" />
                <span className="font-bold text-slate-900 text-sm">
                  Verdant Twin Sustainability Audit Report
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="metal-glass-btn-secondary inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-800"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>Print / Save PDF</span>
                </button>
                <button
                  onClick={() => setModalOpen(false)}
                  className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-200 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Document Content */}
            <div className="p-8 sm:p-12 space-y-8 bg-[#fbfaf6]">
              {/* Header */}
              <div className="border-b-2 border-[#064e3b] pb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                  <span className="text-xs font-mono font-bold tracking-widest text-[#064e3b] uppercase">
                    VERDANT TWIN · FORMAL AUDIT
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                    Commercial Facility Resource Performance Report
                  </h2>
                  <p className="text-xs text-slate-600 mt-1">
                    Verdant Innovation Tower · 14,320 sq ft · Scope 1 & 2 Audit · LEED v4.1 Aligned
                  </p>
                </div>
                <div className="text-left sm:text-right font-mono text-xs text-slate-500">
                  <div>Ref: VT-AUDIT-2026-10</div>
                  <div>Audit Date: October 15, 2026</div>
                  <div>Certified Auditor: CodeOrbit</div>
                </div>
              </div>

              {/* KPI Strip */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="text-xs text-slate-500 uppercase">Efficiency Score</div>
                  <div className="mt-1 font-mono text-3xl font-extrabold text-[#064e3b]">
                    84 / 100
                  </div>
                  <div className="text-[11px] text-emerald-800 font-semibold mt-0.5">
                    Grade A · High Performer
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="text-xs text-slate-500 uppercase">Daily Consumption</div>
                  <div className="mt-1 font-mono text-3xl font-extrabold text-slate-900">
                    428 kWh
                  </div>
                  <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                    -17.7% vs Standard
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="text-xs text-slate-500 uppercase">Operational Carbon</div>
                  <div className="mt-1 font-mono text-3xl font-extrabold text-slate-900">
                    182 kg CO₂
                  </div>
                  <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                    46 kg CO₂ preserved
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="text-xs text-slate-500 uppercase">Water Conservation</div>
                  <div className="mt-1 font-mono text-3xl font-extrabold text-blue-700">
                    2,840 L
                  </div>
                  <div className="text-[11px] text-blue-700 font-semibold mt-0.5">
                    560 L under threshold
                  </div>
                </div>
              </div>

              {/* Zone Audit Table */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h4 className="text-sm font-bold text-slate-900 mb-3">Zone Breakdown Audit</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 font-mono uppercase">
                        <th className="py-2">Zone</th>
                        <th className="py-2 text-right">Occupancy</th>
                        <th className="py-2 text-right">Lighting (%)</th>
                        <th className="py-2 text-right">Energy (kWh)</th>
                        <th className="py-2 text-right">Efficiency</th>
                        <th className="py-2 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {zones.map((z) => (
                        <tr key={z.id}>
                          <td className="py-2 font-medium text-slate-900">{z.name}</td>
                          <td className="py-2 text-right font-mono text-slate-600">
                            {z.currentOccupancy} / {z.capacity}
                          </td>
                          <td className="py-2 text-right font-mono text-slate-600">
                            {z.lightingUtilization}%
                          </td>
                          <td className="py-2 text-right font-mono font-bold text-slate-900">
                            {z.energyUsage}
                          </td>
                          <td className="py-2 text-right font-mono font-bold text-[#064e3b]">
                            {z.efficiencyScore}
                          </td>
                          <td className="py-2 text-right font-semibold text-emerald-800">
                            {z.status === 'efficient' ? 'Compliant' : 'Optimization Underway'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Endorsement */}
              <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-slate-500 gap-4">
                <div>
                  <span className="font-bold text-slate-800 block">Engineering Endorsement</span>
                  <span>Validated by Verdant Twin spatial telemetry node.</span>
                </div>
                <div className="text-left sm:text-right">
                  <div className="font-serif italic text-slate-700">Developed by Nagaraj Harwadekar</div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    HASH: 9B2A-VERDANT-TWIN-2026
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
