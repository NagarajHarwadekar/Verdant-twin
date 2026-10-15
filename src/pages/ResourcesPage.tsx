import React from 'react';
import {
  Droplets,
  Zap,
  Lightbulb,
  Thermometer,
  Users,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { PageId } from '../types';
import { BackButton } from '../components/BackButton';
import { RESOURCE_METRICS } from '../data/mockBuildingData';

interface ResourcesPageProps {
  onBack: () => void;
  onNavigate: (page: PageId) => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({ onBack, onNavigate }) => {
  const getResourceIcon = (id: string) => {
    switch (id) {
      case 'energy':
        return <Zap className="h-5 w-5 text-[#064e3b]" />;
      case 'water':
        return <Droplets className="h-5 w-5 text-blue-600" />;
      case 'lighting':
        return <Lightbulb className="h-5 w-5 text-amber-600" />;
      case 'cooling':
        return <Thermometer className="h-5 w-5 text-emerald-700" />;
      case 'occupancy':
        return <Users className="h-5 w-5 text-purple-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === 'Optimal') {
      return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    } else if (status === 'Nominal') {
      return 'bg-slate-100 text-slate-800 border-slate-200';
    } else {
      return 'bg-amber-50 text-amber-800 border-amber-200';
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <BackButton onBack={onBack} targetLabel="Overview" />
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#064e3b]">
              <Droplets className="h-3.5 w-3.5" />
              <span>Multi-Utility Telemetry</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Every Resource Counts.
            </h1>
          </div>
        </div>

        <button
          onClick={() => onNavigate('reports')}
          className="metal-glass-btn-secondary inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold text-slate-800"
        >
          <span>Generate Resource Audit</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Resource Health Overview Hero Strip */}
      <div className="rounded-3xl border border-emerald-900/15 bg-white p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-center">
          <div className="md:col-span-8 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#064e3b]">
              <ShieldCheck className="h-4 w-4" />
              <span>Composite Resource Health</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              92 / 100 Overall Resource Index
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
              Water recirculation pumps, greywater recycling loops, zoned HVAC air handlers, and
              photovoltaic inverters are performing within nominal design tolerances.
            </p>
          </div>

          <div className="md:col-span-4 flex items-center justify-start md:justify-end">
            <div className="rounded-2xl bg-emerald-50 border border-emerald-200/80 p-5 text-center min-w-[200px]">
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800">
                Resource Status
              </span>
              <div className="font-mono text-3xl font-extrabold text-[#064e3b] mt-1">
                92<span className="text-sm font-normal text-slate-400">/100</span>
              </div>
              <span className="text-xs font-semibold text-emerald-700 mt-1 block">
                Nominal / Resilient
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Required Resource Cards: Energy, Water, Lighting, Cooling, Occupancy */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {RESOURCE_METRICS.map((res) => (
          <div
            key={res.id}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:border-emerald-600/30 transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    {getResourceIcon(res.id)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{res.name}</h3>
                    <span className="text-[11px] text-slate-400 font-mono">Resource Node</span>
                  </div>
                </div>

                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getStatusBadge(
                    res.status
                  )}`}
                >
                  {res.status}
                </span>
              </div>

              {/* Current Usage & Normal Range */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-slate-500 font-medium">Current Usage:</span>
                  <span className="font-mono text-base font-bold text-slate-900">
                    {res.currentUsage}
                  </span>
                </div>

                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-slate-500 font-medium">Normal Range:</span>
                  <span className="font-mono text-xs text-slate-600">{res.normalRange}</span>
                </div>

                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-slate-500 font-medium">Efficiency:</span>
                  <span className="font-mono text-xs font-bold text-[#064e3b]">
                    {res.efficiency} / 100
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    style={{ width: `${res.efficiency}%` }}
                    className="h-full rounded-full bg-[#064e3b]"
                  />
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{res.detail}</p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-medium text-emerald-800">{res.trend}</span>
              <button
                onClick={() => onNavigate('simulator')}
                className="font-semibold text-slate-500 hover:text-slate-900 inline-flex items-center gap-1"
              >
                <span>Simulate</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
