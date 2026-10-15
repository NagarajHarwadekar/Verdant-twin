import React, { useState } from 'react';
import {
  Zap,
  TrendingDown,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  BarChart3,
  Sun,
  Activity,
  Layers,
} from 'lucide-react';
import { PageId, RoomZone } from '../types';
import { BackButton } from '../components/BackButton';

interface EnergyPageProps {
  zones: RoomZone[];
  onBack: () => void;
  onNavigate: (page: PageId) => void;
}

export const EnergyPage: React.FC<EnergyPageProps> = ({ zones, onBack, onNavigate }) => {
  const [selectedRoomId, setSelectedRoomId] = useState<string>('all');
  const [activeChartTab, setActiveChartTab] = useState<'hourly' | 'comparison' | 'trend'>('hourly');

  const currentZone = zones.find((z) => z.id === selectedRoomId);

  // Compute energy profile for selected room or aggregate
  const energyProfile = currentZone
    ? {
        todayEnergy: Number((currentZone.energyUsage * 8.2).toFixed(1)),
        peakDemand: Number((currentZone.energyUsage * 1.6).toFixed(1)),
        avgUsage: Number((currentZone.energyUsage * 1.1).toFixed(1)),
        savingsOpportunity: Number((currentZone.energyUsage * 1.8).toFixed(1)),
        timeSeries: currentZone.timeSeries,
      }
    : {
        todayEnergy: 428,
        peakDemand: 68.4,
        avgUsage: 53.5,
        savingsOpportunity: 86,
        timeSeries: {
          morning: 104,
          afternoon: 168,
          evening: 88,
          night: 68,
        },
      };

  const hourlyCurve = [
    { hour: '06:00', kw: Math.round(energyProfile.avgUsage * 0.4) },
    { hour: '08:00', kw: Math.round(energyProfile.avgUsage * 0.8) },
    { hour: '10:00', kw: Math.round(energyProfile.avgUsage * 1.15) },
    { hour: '12:00', kw: Math.round(energyProfile.peakDemand) },
    { hour: '14:00', kw: Math.round(energyProfile.peakDemand * 0.95) },
    { hour: '16:00', kw: Math.round(energyProfile.avgUsage * 1.05) },
    { hour: '18:00', kw: Math.round(energyProfile.avgUsage * 0.7) },
    { hour: '20:00', kw: Math.round(energyProfile.avgUsage * 0.45) },
    { hour: '22:00', kw: Math.round(energyProfile.avgUsage * 0.3) },
  ];

  const maxKw = Math.max(...hourlyCurve.map((h) => h.kw)) * 1.2 || 80;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <BackButton onBack={onBack} targetLabel="Overview" />
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#064e3b]">
              <Zap className="h-3.5 w-3.5" />
              <span>Electrical Grid & Consumption</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Where Energy Moves.
            </h1>
          </div>
        </div>

        {/* Room Selector Required in Specs */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 hidden sm:inline">Scope:</span>
          <select
            value={selectedRoomId}
            onChange={(e) => setSelectedRoomId(e.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 shadow-xs focus:border-[#064e3b] focus:outline-none"
          >
            <option value="all">All Rooms (Entire Floor)</option>
            <option value="conference-room">Conference Room</option>
            <option value="office-a">Office A</option>
            <option value="office-b">Office B</option>
            <option value="meeting-room">Meeting Room</option>
            <option value="server-room">Server Room</option>
          </select>
        </div>
      </div>

      {/* 4 Required Metric Cards: Today's Energy, Peak Demand, Average Usage, Potential Savings */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {/* 1. Today's Energy */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Today's Energy
          </div>
          <div className="mt-2 font-mono text-3xl font-extrabold text-[#064e3b] tabular-nums">
            {energyProfile.todayEnergy}{' '}
            <span className="text-xs font-normal text-slate-400 font-sans">kWh</span>
          </div>
          <div className="mt-1 text-xs text-slate-400">Total diurnal load</div>
        </div>

        {/* 2. Peak Demand */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Peak Demand
          </div>
          <div className="mt-2 font-mono text-3xl font-extrabold text-slate-900 tabular-nums">
            {energyProfile.peakDemand}{' '}
            <span className="text-xs font-normal text-slate-400 font-sans">kW</span>
          </div>
          <div className="mt-1 text-xs text-slate-400">Recorded at 12:45 PM</div>
        </div>

        {/* 3. Average Usage */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Average Usage
          </div>
          <div className="mt-2 font-mono text-3xl font-extrabold text-slate-900 tabular-nums">
            {energyProfile.avgUsage}{' '}
            <span className="text-xs font-normal text-slate-400 font-sans">kW</span>
          </div>
          <div className="mt-1 text-xs text-slate-400">Mean operating demand</div>
        </div>

        {/* 4. Potential Savings */}
        <div className="rounded-2xl border border-amber-900/15 bg-amber-50/60 p-5 shadow-sm">
          <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
            Potential Savings
          </div>
          <div className="mt-2 font-mono text-3xl font-extrabold text-amber-800 tabular-nums">
            {energyProfile.savingsOpportunity}{' '}
            <span className="text-xs font-normal text-amber-700 font-sans">kWh</span>
          </div>
          <div className="mt-1 text-xs text-amber-800 font-medium">Via daylight & setback</div>
        </div>
      </div>

      {/* Charts Section: Hourly Consumption, Room Comparison, Daily Trend */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {currentZone ? currentZone.name : 'All Rooms (Entire Innovation Floor)'} — Load Analysis
            </h3>
            <p className="text-xs text-slate-500">
              Telemetry synchronized from sub-metering transducers across zones
            </p>
          </div>

          {/* Chart View Switcher */}
          <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1 text-xs font-medium">
            <button
              onClick={() => setActiveChartTab('hourly')}
              className={`rounded-lg px-3 py-1.5 transition-colors ${
                activeChartTab === 'hourly'
                  ? 'bg-[#064e3b] text-white font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Hourly Consumption
            </button>
            <button
              onClick={() => setActiveChartTab('comparison')}
              className={`rounded-lg px-3 py-1.5 transition-colors ${
                activeChartTab === 'comparison'
                  ? 'bg-[#064e3b] text-white font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Room Comparison
            </button>
            <button
              onClick={() => setActiveChartTab('trend')}
              className={`rounded-lg px-3 py-1.5 transition-colors ${
                activeChartTab === 'trend'
                  ? 'bg-[#064e3b] text-white font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Daily Trend
            </button>
          </div>
        </div>

        {/* View 1: Hourly Consumption */}
        {activeChartTab === 'hourly' && (
          <div className="h-64 w-full">
            <div className="grid h-full grid-cols-9 items-end gap-2 sm:gap-4 px-2 pb-6">
              {hourlyCurve.map((item) => {
                const barHeight = Math.round((item.kw / maxKw) * 100);
                return (
                  <div key={item.hour} className="flex flex-col items-center h-full justify-end group">
                    <span className="mb-1 font-mono text-[11px] font-bold text-slate-800 tabular-nums">
                      {item.kw} kW
                    </span>
                    <div className="w-full max-w-[50px] rounded-t-xl bg-slate-100 h-full max-h-[160px] flex items-end">
                      <div
                        style={{ height: `${barHeight}%` }}
                        className="w-full rounded-t-xl bg-[#064e3b] group-hover:bg-emerald-600 transition-all duration-300"
                      />
                    </div>
                    <span className="mt-2 font-mono text-[10px] text-slate-400">{item.hour}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* View 2: Room Comparison */}
        {activeChartTab === 'comparison' && (
          <div className="space-y-4 pt-2">
            {zones.map((zone) => {
              const pct = Math.round((zone.energyUsage / 34) * 100);
              return (
                <div key={zone.id} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium text-slate-700">
                    <span className="font-semibold">{zone.name}</span>
                    <span className="font-mono text-slate-900 font-bold">{zone.energyUsage} kWh</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      style={{ width: `${pct}%` }}
                      className={`h-full rounded-full ${
                        zone.status === 'efficient'
                          ? 'bg-[#064e3b]'
                          : zone.status === 'warning'
                          ? 'bg-amber-500'
                          : 'bg-rose-600'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View 3: Daily Trend */}
        {activeChartTab === 'trend' && (
          <div className="grid grid-cols-7 gap-3 text-center pt-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri (Today)', 'Sat', 'Sun'].map((day, i) => {
              const val = [412, 424, 436, 418, 428, 220, 180][i];
              return (
                <div key={day} className="rounded-2xl border border-slate-100 bg-[#fbfaf6] p-4">
                  <div className="text-xs font-semibold text-slate-500">{day}</div>
                  <div className="mt-2 font-mono text-lg font-bold text-slate-900">{val} kWh</div>
                  <div className="mt-1 text-[11px] text-emerald-700 font-medium">
                    {val > 300 ? 'Normal Workday' : 'Eco Standby'}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Energy Performance Section */}
      <div className="rounded-3xl border border-emerald-900/20 bg-gradient-to-br from-[#064e3b] to-[#022c22] p-6 sm:p-10 text-white shadow-xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-center">
          <div className="md:col-span-8 space-y-3">
            <span className="inline-block rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 text-xs font-mono text-emerald-300">
              ENERGY PERFORMANCE BENCHMARK
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Operating 17.7% Below Standard Code Baseline
            </h3>
            <p className="text-sm text-emerald-100/80 leading-relaxed max-w-xl">
              Through integrated daylight harvesting, vacancy setbacks, and rooftop solar microgrid
              generation, Verdant Twin maintains continuous peak shaving.
            </p>
          </div>

          <div className="md:col-span-4 flex justify-start md:justify-end">
            <button
              onClick={() => onNavigate('simulator')}
              className="metal-glass-btn rounded-xl px-5 py-3 text-xs font-bold text-white shadow-lg inline-flex items-center gap-2"
            >
              <span>Test Optimization Simulator</span>
              <ArrowRight className="h-4 w-4 text-emerald-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
