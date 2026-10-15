import React, { useState, useMemo, useEffect } from 'react';
import {
  Sliders,
  Sparkles,
  Zap,
  Leaf,
  RotateCcw,
  CheckCircle,
  Save,
  ArrowRight,
  TrendingDown,
} from 'lucide-react';
import { PageId, SimulatorState, SimulationResult } from '../types';
import { BackButton } from '../components/BackButton';
import { BUILDING_CORE_STATS } from '../data/mockBuildingData';

interface SimulatorPageProps {
  onBack: () => void;
  onNavigate: (page: PageId) => void;
}

export const SimulatorPage: React.FC<SimulatorPageProps> = ({ onBack, onNavigate }) => {
  const [params, setParams] = useState<SimulatorState>(() => {
    const saved = localStorage.getItem('verdant_twin_sim_scenario');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return {
      lightingReduction: 20,
      acReduction: 15,
      idleReduction: 25,
      occupancyOptimization: 10,
    };
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const results: SimulationResult = useMemo(() => {
    const currentEnergy = BUILDING_CORE_STATS.energyToday; // 428 kWh

    const hvacBase = currentEnergy * 0.42;
    const lightBase = currentEnergy * 0.26;
    const idleBase = currentEnergy * 0.20;

    const savedFromLighting = lightBase * (params.lightingReduction / 100);
    const savedFromAC = hvacBase * (params.acReduction / 100);
    const savedFromIdle = idleBase * (params.idleReduction / 100);
    const savedFromOccupancy =
      (lightBase + hvacBase) * 0.5 * (params.occupancyOptimization / 100);

    const totalSaved = Math.round(
      savedFromLighting + savedFromAC + savedFromIdle + savedFromOccupancy
    );

    const projectedEnergy = Math.max(160, currentEnergy - totalSaved);
    const energySaved = currentEnergy - projectedEnergy;
    const percentageSaved = Number(((energySaved / currentEnergy) * 100).toFixed(1));
    const carbonReduction = Number((energySaved * 0.425).toFixed(1));
    const annualDollarSavings = Math.round(energySaved * 0.22 * 365);

    return {
      currentEnergy,
      projectedEnergy,
      energySaved,
      percentageSaved,
      carbonReduction,
      annualDollarSavings,
    };
  }, [params]);

  const handleApplyScenario = () => {
    localStorage.setItem('verdant_twin_sim_scenario', JSON.stringify(params));
    setToastMessage('Scenario saved locally.');
    setTimeout(() => setToastMessage(null), 3500);
  };

  const applyPreset = (preset: 'conservative' | 'aggressive' | 'weekend' | 'reset') => {
    if (preset === 'conservative') {
      setParams({
        lightingReduction: 10,
        acReduction: 8,
        idleReduction: 15,
        occupancyOptimization: 5,
      });
    } else if (preset === 'aggressive') {
      setParams({
        lightingReduction: 35,
        acReduction: 22,
        idleReduction: 35,
        occupancyOptimization: 20,
      });
    } else if (preset === 'weekend') {
      setParams({
        lightingReduction: 45,
        acReduction: 28,
        idleReduction: 38,
        occupancyOptimization: 25,
      });
    } else {
      setParams({
        lightingReduction: 0,
        acReduction: 0,
        idleReduction: 0,
        occupancyOptimization: 0,
      });
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
              <Sliders className="h-3.5 w-3.5" />
              <span>Predictive Scenario Engine</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Test a Better Building.
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Explore what could happen before changing the real building.
            </p>
          </div>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => applyPreset('conservative')}
            className="metal-glass-btn-secondary rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800"
          >
            Conservative (-10%)
          </button>
          <button
            onClick={() => applyPreset('aggressive')}
            className="metal-glass-btn-secondary rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800"
          >
            Net-Zero (-24%)
          </button>
          <button
            onClick={() => applyPreset('weekend')}
            className="metal-glass-btn-secondary rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800"
          >
            Weekend Standby
          </button>
          <button
            onClick={() => applyPreset('reset')}
            className="rounded-xl border border-slate-200 bg-white p-2 text-slate-500 hover:text-slate-900"
            title="Reset sliders"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="rounded-2xl bg-emerald-50 border border-emerald-300 p-4 text-xs font-bold text-emerald-900 flex items-center gap-2 shadow-sm animate-in fade-in">
          <CheckCircle className="h-4 w-4 text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Workspace */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
        {/* Sliders Box */}
        <div className="lg:col-span-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">Optimization Levers</h3>
            <span className="text-xs text-slate-400 font-mono">Dynamic Recalculation</span>
          </div>

          {/* Slider 1: Lighting Reduction */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-800">
                Lighting Reduction
              </label>
              <span className="font-mono text-sm font-bold text-[#064e3b] tabular-nums">
                {params.lightingReduction}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="1"
              value={params.lightingReduction}
              onChange={(e) =>
                setParams({ ...params, lightingReduction: Number(e.target.value) })
              }
              className="w-full accent-[#064e3b] cursor-pointer h-2 bg-slate-100 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>0% (As-is)</span>
              <span>Daylight Harvesting & Task Dimming</span>
              <span>50% Max</span>
            </div>
          </div>

          {/* Slider 2: AC Usage Reduction */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-800">
                AC Usage Reduction
              </label>
              <span className="font-mono text-sm font-bold text-[#064e3b] tabular-nums">
                {params.acReduction}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              step="1"
              value={params.acReduction}
              onChange={(e) =>
                setParams({ ...params, acReduction: Number(e.target.value) })
              }
              className="w-full accent-[#064e3b] cursor-pointer h-2 bg-slate-100 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>0% (Unmanaged)</span>
              <span>+1.5°C Eco Deadband & Economizer</span>
              <span>30% Max</span>
            </div>
          </div>

          {/* Slider 3: Idle Equipment Reduction */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-800">
                Idle Equipment Reduction
              </label>
              <span className="font-mono text-sm font-bold text-[#064e3b] tabular-nums">
                {params.idleReduction}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              step="1"
              value={params.idleReduction}
              onChange={(e) =>
                setParams({ ...params, idleReduction: Number(e.target.value) })
              }
              className="w-full accent-[#064e3b] cursor-pointer h-2 bg-slate-100 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>0% (Phantom load)</span>
              <span>Smart Receptacle Night Standby</span>
              <span>40% Max</span>
            </div>
          </div>

          {/* Slider 4: Occupancy Optimization */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-800">
                Occupancy Optimization
              </label>
              <span className="font-mono text-sm font-bold text-[#064e3b] tabular-nums">
                {params.occupancyOptimization}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="25"
              step="1"
              value={params.occupancyOptimization}
              onChange={(e) =>
                setParams({ ...params, occupancyOptimization: Number(e.target.value) })
              }
              className="w-full accent-[#064e3b] cursor-pointer h-2 bg-slate-100 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>0% (Dispersed)</span>
              <span>Consolidated Pod Seating</span>
              <span>25% Max</span>
            </div>
          </div>

          {/* Apply Scenario Button */}
          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={handleApplyScenario}
              className="metal-glass-btn w-full rounded-xl py-3 px-4 text-xs font-bold text-white inline-flex items-center justify-center gap-2 shadow-md"
            >
              <Save className="h-4 w-4 text-emerald-300" />
              <span>Apply Scenario</span>
            </button>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-6 space-y-6">
          {/* 4 Required Result Outputs:
              Current Energy (428 kWh)
              Projected (342 kWh)
              Saved (86 kWh)
              Carbon Reduction */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Current Energy
              </div>
              <div className="mt-2 font-mono text-3xl font-extrabold text-slate-900 tabular-nums">
                {results.currentEnergy}{' '}
                <span className="text-xs font-normal text-slate-400 font-sans">kWh</span>
              </div>
              <div className="mt-1 text-xs text-slate-400">Baseline load today</div>
            </div>

            <div className="rounded-2xl border border-emerald-900/20 bg-emerald-50/70 p-5 shadow-sm">
              <div className="text-xs font-semibold text-[#064e3b] uppercase tracking-wider">
                Projected Energy
              </div>
              <div className="mt-2 font-mono text-3xl font-extrabold text-[#064e3b] tabular-nums">
                {results.projectedEnergy}{' '}
                <span className="text-xs font-normal text-emerald-800 font-sans">kWh</span>
              </div>
              <div className="mt-1 text-xs text-emerald-700 font-medium">
                -{results.percentageSaved}% demand trimmed
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Energy Saved
              </div>
              <div className="mt-2 font-mono text-3xl font-extrabold text-amber-700 tabular-nums">
                {results.energySaved}{' '}
                <span className="text-xs font-normal text-slate-400 font-sans">kWh</span>
              </div>
              <div className="mt-1 text-xs text-amber-700 font-medium">Daily net savings</div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Carbon Reduction
              </div>
              <div className="mt-2 font-mono text-3xl font-extrabold text-[#064e3b] tabular-nums">
                {results.carbonReduction}{' '}
                <span className="text-xs font-normal text-slate-400 font-sans">kg CO₂</span>
              </div>
              <div className="mt-1 text-xs text-emerald-700 font-medium">
                ~${results.annualDollarSavings.toLocaleString()} / yr
              </div>
            </div>
          </div>

          {/* Elegant Before / After Visualization */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Before & After Scenario</h3>
              <span className="text-xs font-mono font-bold text-emerald-800">
                Preserving {results.energySaved} kWh
              </span>
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                  <span>Current Baseline (Unmanaged)</span>
                  <span className="font-mono font-bold text-slate-800">{results.currentEnergy} kWh</span>
                </div>
                <div className="h-4 w-full rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full rounded-full bg-slate-500" style={{ width: '100%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                  <span className="text-[#064e3b] font-bold">Simulated Projection (Scenario)</span>
                  <span className="font-mono font-bold text-[#064e3b]">
                    {results.projectedEnergy} kWh (-{results.percentageSaved}%)
                  </span>
                </div>
                <div className="h-4 w-full rounded-full bg-slate-100 overflow-hidden flex">
                  <div
                    className="h-full bg-[#064e3b] rounded-l-full transition-all duration-300"
                    style={{ width: `${Math.max(15, 100 - results.percentageSaved)}%` }}
                  />
                  <div
                    className="h-full bg-emerald-300 rounded-r-full transition-all duration-300"
                    style={{ width: `${results.percentageSaved}%` }}
                    title={`Avoided: ${results.energySaved} kWh`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
