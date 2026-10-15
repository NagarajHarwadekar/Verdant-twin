import React, { useState } from 'react';
import {
  Zap,
  Users,
  Lightbulb,
  Droplets,
  CloudRain,
  Award,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingDown,
  SunMedium,
  AlertCircle,
  Activity,
  ShieldCheck,
} from 'lucide-react';
import { PageId } from '../types';
import { BackButton } from '../components/BackButton';
import { BUILDING_CORE_STATS } from '../data/mockBuildingData';

interface OverviewPageProps {
  onBack: () => void;
  onNavigate: (page: PageId) => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({ onBack, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'today' | 'week' | 'month'>('today');

  const hourlyData = [
    { hour: '06:00', actual: 22, baseline: 26 },
    { hour: '08:00', actual: 44, baseline: 52 },
    { hour: '10:00', actual: 62, baseline: 74 },
    { hour: '12:00', actual: 68, baseline: 82 },
    { hour: '14:00', actual: 64, baseline: 78 },
    { hour: '16:00', actual: 55, baseline: 69 },
    { hour: '18:00', actual: 38, baseline: 46 },
    { hour: '20:00', actual: 24, baseline: 30 },
    { hour: '22:00', actual: 16, baseline: 20 },
  ];

  const pulseData = [
    { period: 'Morning', time: '06:00 – 12:00', load: '104 kWh', status: 'Optimal', icon: '🌅' },
    { period: 'Afternoon', time: '12:00 – 18:00', load: '168 kWh', status: 'Peak Load', icon: '☀️' },
    { period: 'Evening', time: '18:00 – 22:00', load: '88 kWh', status: 'Standby Trim', icon: '🌆' },
    { period: 'Night', time: '22:00 – 06:00', load: '68 kWh', status: 'Base Chiller', icon: '🌙' },
  ];

  const highlights = [
    {
      text: 'Energy demand is within expected range.',
      type: 'positive',
    },
    {
      text: 'Conference Room lighting requires attention.',
      type: 'attention',
    },
    {
      text: 'Office B has higher-than-average consumption.',
      type: 'attention',
    },
    {
      text: 'Water systems are operating normally.',
      type: 'positive',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Back button and page title row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <BackButton onBack={onBack} targetLabel="Home" />
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#064e3b]">
              <span>Command Center</span>
              <span>·</span>
              <span>Level 02 Innovation Floor</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Building Overview
            </h1>
          </div>
        </div>

        {/* Status tag */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900">
            <CheckCircle2 className="h-4 w-4 text-emerald-700" />
            <span>{BUILDING_CORE_STATS.status}</span>
          </div>
        </div>
      </div>

      {/* 6 Required Metrics Strip */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {/* 1. Overall Efficiency */}
        <div className="rounded-2xl border border-emerald-900/15 bg-white p-4 shadow-sm hover:border-emerald-600/30 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase">
            <span>Overall Efficiency</span>
            <Award className="h-4 w-4 text-[#064e3b]" />
          </div>
          <div className="mt-3">
            <div className="font-mono text-2xl sm:text-3xl font-extrabold text-[#064e3b] tabular-nums">
              {BUILDING_CORE_STATS.efficiencyScore}
              <span className="text-xs font-normal text-slate-400 font-sans">/100</span>
            </div>
            <div className="mt-1 text-[11px] text-emerald-700 font-medium">Grade A · High</div>
          </div>
        </div>

        {/* 2. Energy Today */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:border-emerald-600/30 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase">
            <span>Energy Today</span>
            <Zap className="h-4 w-4 text-emerald-700" />
          </div>
          <div className="mt-3">
            <div className="font-mono text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
              {BUILDING_CORE_STATS.energyToday}
              <span className="text-xs font-normal text-slate-400 font-sans">kWh</span>
            </div>
            <div className="mt-1 text-[11px] text-emerald-700 font-medium">-17.7% vs base</div>
          </div>
        </div>

        {/* 3. Occupancy */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:border-emerald-600/30 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase">
            <span>Occupancy</span>
            <Users className="h-4 w-4 text-emerald-700" />
          </div>
          <div className="mt-3">
            <div className="font-mono text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
              {BUILDING_CORE_STATS.occupancyPercent}%
            </div>
            <div className="mt-1 text-[11px] text-slate-500">
              {BUILDING_CORE_STATS.headcountCurrent} active seats
            </div>
          </div>
        </div>

        {/* 4. Water Usage */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:border-emerald-600/30 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase">
            <span>Water Usage</span>
            <Droplets className="h-4 w-4 text-blue-600" />
          </div>
          <div className="mt-3">
            <div className="font-mono text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
              {BUILDING_CORE_STATS.waterUsageToday.toLocaleString()}
              <span className="text-xs font-normal text-slate-400 font-sans">L</span>
            </div>
            <div className="mt-1 text-[11px] text-emerald-700 font-medium">Under budget</div>
          </div>
        </div>

        {/* 5. Lighting */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:border-amber-600/30 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase">
            <span>Lighting</span>
            <Lightbulb className="h-4 w-4 text-amber-600" />
          </div>
          <div className="mt-3">
            <div className="font-mono text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
              {BUILDING_CORE_STATS.lightingUtilization}%
            </div>
            <div className="mt-1 text-[11px] text-amber-700 font-medium">Trim available</div>
          </div>
        </div>

        {/* 6. Carbon Estimate */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:border-emerald-600/30 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase">
            <span>Carbon Est.</span>
            <CloudRain className="h-4 w-4 text-emerald-700" />
          </div>
          <div className="mt-3">
            <div className="font-mono text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
              {BUILDING_CORE_STATS.estimatedCarbonKg}
              <span className="text-xs font-normal text-slate-400 font-sans">kg CO₂</span>
            </div>
            <div className="mt-1 text-[11px] text-emerald-700 font-medium">46 kg avoided</div>
          </div>
        </div>
      </div>

      {/* Building Health Section & Performance Highlights */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Building Health Card with Performance Rings */}
        <div className="lg:col-span-5 rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Building Health</h3>
                <p className="text-xs text-slate-500">Holistic composite sustainability score</p>
              </div>
              <span className="font-mono text-xs font-semibold text-[#064e3b] bg-emerald-50 px-2.5 py-1 rounded-md">
                LEED GOLD
              </span>
            </div>

            {/* Performance Ring SVG Visualizer */}
            <div className="my-6 flex items-center justify-center">
              <div className="relative h-44 w-44">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                  {/* Outer Background Ring */}
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                  {/* Outer Value Ring: 82% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="#064e3b"
                    strokeWidth="8"
                    strokeDasharray="264"
                    strokeDashoffset={264 - (264 * 82) / 100}
                    strokeLinecap="round"
                  />
                  {/* Inner Ring: Occupancy 64% */}
                  <circle cx="50" cy="50" r="30" fill="none" stroke="#f1f5f9" strokeWidth="6" />
                  <circle
                    cx="50"
                    cy="50"
                    r="30"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="6"
                    strokeDasharray="188"
                    strokeDashoffset={188 - (188 * 64) / 100}
                    strokeLinecap="round"
                  />
                </svg>

                {/* Centered Score */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="font-mono text-3xl font-extrabold text-[#064e3b]">
                    82<span className="text-sm font-normal text-slate-400">/100</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                    Health Index
                  </span>
                </div>
              </div>
            </div>

            {/* Performance Ring Legend */}
            <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#064e3b]" />
                <span className="text-slate-600">Overall Efficiency (82%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span className="text-slate-600">Occupancy Balance (64%)</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <button
              onClick={() => onNavigate('reports')}
              className="w-full metal-glass-btn-secondary rounded-xl py-2.5 text-xs font-semibold text-slate-800 text-center inline-flex items-center justify-center gap-1.5"
            >
              <span>View Full Sustainability Audit</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Performance Highlights Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">Performance Highlights</h3>
              <span className="text-xs text-slate-400 font-mono">Real-time status</span>
            </div>

            <div className="mt-6 space-y-3.5">
              {highlights.map((h, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 rounded-xl p-3.5 border transition-all ${
                    h.type === 'positive'
                      ? 'border-emerald-200 bg-emerald-50/40 text-emerald-900'
                      : 'border-amber-200 bg-amber-50/50 text-amber-950'
                  }`}
                >
                  {h.type === 'positive' ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-700 mt-0.5 shrink-0" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-amber-700 mt-0.5 shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="text-xs font-semibold leading-relaxed">{h.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">Automated diagnostic rules</span>
              <button
                onClick={() => onNavigate('insights')}
                className="text-xs font-semibold text-[#064e3b] hover:underline inline-flex items-center gap-1"
              >
                <span>Go to Actionable Insights</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Today's Building Pulse */}
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Today's Building Pulse</h3>
                <p className="text-xs text-slate-500">Diurnal operating cycles</p>
              </div>
              <Activity className="h-4 w-4 text-[#064e3b]" />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {pulseData.map((p) => (
                <div
                  key={p.period}
                  className="rounded-2xl border border-slate-100 bg-[#fbfaf6] p-4 text-center hover:border-emerald-600/30 transition-all"
                >
                  <div className="text-xl mb-1">{p.icon}</div>
                  <div className="text-xs font-bold text-slate-800">{p.period}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">{p.time}</div>
                  <div className="mt-2 font-mono text-sm font-bold text-slate-900">{p.load}</div>
                  <span className="mt-1 inline-block rounded-md bg-white px-2 py-0.5 text-[10px] font-semibold text-[#064e3b] border border-slate-200/80">
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
