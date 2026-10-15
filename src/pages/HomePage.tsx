import React from 'react';
import {
  ArrowRight,
  Compass,
  Building,
  Sparkles,
  Layers,
  ChevronDown,
  Activity,
  Eye,
  Sliders,
  ShieldCheck,
  Zap,
  Users,
  Award,
} from 'lucide-react';
import { PageId } from '../types';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#fbfaf6] via-[#f7f4ec] to-[#f4f0e6] pt-12 pb-20 sm:pt-20 sm:pb-32 border-b border-emerald-950/10">
        {/* Ambient lighting glows */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl" />
          <div className="absolute bottom-10 left-10 h-80 w-80 rounded-full bg-amber-100/60 blur-2xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Headline Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-800/20 bg-emerald-950/5 px-3 py-1 text-[11px] font-bold tracking-widest text-[#064e3b] uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                <span>GREEN BUILDING INTELLIGENCE</span>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.1] text-balance">
                See Your Building.{' '}
                <span className="text-[#064e3b] block sm:inline">
                  Understand Its Impact.
                </span>
              </h1>

              <p className="max-w-2xl text-lg text-slate-700 leading-relaxed font-normal">
                Verdant Twin transforms building activity into a clear digital view of energy, occupancy
                and resource performance.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('digital-twin')}
                  className="metal-glass-btn group inline-flex items-center gap-2.5 rounded-xl px-6 py-3.5 text-sm font-semibold text-white shadow-md focus:outline-none"
                >
                  <Compass className="h-4 w-4 text-emerald-300 transition-transform group-hover:rotate-45" />
                  <span>Explore Digital Twin</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => onNavigate('insights')}
                  className="metal-glass-btn-secondary inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-xs focus:outline-none"
                >
                  <span>View Insights</span>
                </button>
              </div>

              <div className="flex items-center gap-3 pt-3 text-xs text-slate-500 font-mono">
                <span>CodeClash 2026</span>
                <span>·</span>
                <span>Commercial Facility Digital Twin</span>
                <span>·</span>
                <span>LEED Aligned</span>
              </div>
            </div>

            {/* Right Architectural Visual with Floating Glass Statistics Panel */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                {/* Main Architectural Photo Card */}
                <div className="relative overflow-hidden rounded-3xl border border-emerald-950/15 bg-white shadow-2xl">
                  <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-slate-900">
                    <img
                      src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"
                      alt="Modern sustainable architecture with vertical greenery"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                    <div className="absolute top-4 left-4 rounded-full bg-black/60 px-3 py-1 text-[11px] font-mono text-emerald-300 backdrop-blur-md">
                      LEVEL 02 INNOVATION FLOOR
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-950 text-white flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-emerald-400" />
                      <span className="font-semibold">Verdant Innovation Tower</span>
                    </div>
                    <span className="font-mono text-emerald-300">14,320 sq ft Managed</span>
                  </div>
                </div>

                {/* Floating Glass Statistics Panel Over Hero */}
                <div className="mt-4 sm:absolute sm:-bottom-8 sm:-left-6 sm:right-6 liquid-glass rounded-2xl p-4 sm:p-5 shadow-xl border border-white/80">
                  <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center divide-x divide-slate-200/80">
                    <div>
                      <div className="font-mono text-xl sm:text-2xl font-extrabold text-[#064e3b] tabular-nums">
                        82%
                      </div>
                      <div className="text-[11px] font-medium text-slate-500 mt-0.5">
                        Efficiency
                      </div>
                    </div>

                    <div>
                      <div className="font-mono text-xl sm:text-2xl font-extrabold text-[#064e3b] tabular-nums">
                        64%
                      </div>
                      <div className="text-[11px] font-medium text-slate-500 mt-0.5">
                        Occupancy
                      </div>
                    </div>

                    <div>
                      <div className="font-mono text-xl sm:text-2xl font-extrabold text-amber-700 tabular-nums">
                        18%
                      </div>
                      <div className="text-[11px] font-medium text-slate-500 mt-0.5">
                        Energy Saved
                      </div>
                    </div>

                    <div>
                      <div className="font-mono text-xl sm:text-2xl font-extrabold text-[#064e3b] tabular-nums">
                        92
                      </div>
                      <div className="text-[11px] font-medium text-slate-500 mt-0.5">
                        Resource Health
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Elegant scroll indicator */}
          <div className="mt-20 flex flex-col items-center justify-center text-slate-400 gap-1 text-xs font-mono">
            <span>DISCOVER THE PLATFORM</span>
            <ChevronDown className="h-4 w-4 animate-bounce text-emerald-700" />
          </div>
        </div>
      </section>

      {/* THE BUILDING, REIMAGINED Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#064e3b]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>THE BUILDING, REIMAGINED</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl text-balance">
            Every Room Tells a Story. We Give It a Voice.
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-normal">
            Modern commercial structures are complex ecosystems of thermal loads, lighting banks,
            and human activity. Verdant Twin breaks down mechanical data silos and reconstructs them
            into an actionable spatial model.
          </p>
        </div>

        {/* 3 Premium Pillar Cards: OBSERVE, MODEL, IMPROVE */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Card 1: OBSERVE */}
          <div className="rounded-3xl border border-slate-200/90 bg-white p-8 shadow-sm hover:border-emerald-600/30 transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-[#064e3b] border border-emerald-100">
                <Eye className="h-6 w-6" />
              </div>
              <div className="text-xs font-mono font-bold tracking-widest text-emerald-800 uppercase">
                PHASE 01
              </div>
              <h3 className="text-xl font-bold text-slate-900">OBSERVE</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Understand what is happening. Continuous perception of occupancy density, lighting
                demand, water circulation, and ambient temperatures without laggy utility bills.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={() => onNavigate('overview')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#064e3b] group-hover:underline"
              >
                <span>Explore Command Center</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Card 2: MODEL */}
          <div className="rounded-3xl border border-slate-200/90 bg-white p-8 shadow-sm hover:border-emerald-600/30 transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-[#064e3b] border border-emerald-100">
                <Layers className="h-6 w-6" />
              </div>
              <div className="text-xs font-mono font-bold tracking-widest text-emerald-800 uppercase">
                PHASE 02
              </div>
              <h3 className="text-xl font-bold text-slate-900">MODEL</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Visualize the building as a living digital model. Map rooms, corridors, and HVAC
                zones into an interactive spatial digital twin that mirrors operational realities.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={() => onNavigate('digital-twin')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#064e3b] group-hover:underline"
              >
                <span>Launch Interactive Floor Twin</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Card 3: IMPROVE */}
          <div className="rounded-3xl border border-slate-200/90 bg-white p-8 shadow-sm hover:border-emerald-600/30 transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-[#064e3b] border border-emerald-100">
                <Sliders className="h-6 w-6" />
              </div>
              <div className="text-xs font-mono font-bold tracking-widest text-emerald-800 uppercase">
                PHASE 03
              </div>
              <h3 className="text-xl font-bold text-slate-900">IMPROVE</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Test changes and discover opportunities. Run predictive what-if scenarios, trigger
                automated lighting setbacks, and execute verified sustainability improvements.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={() => onNavigate('simulator')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#064e3b] group-hover:underline"
              >
                <span>Run What-If Simulator</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Large Architectural Photography Showcase Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-slate-950 text-white shadow-2xl">
          <div className="relative h-96 sm:h-[480px] w-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
              alt="Sustainable corporate headquarters with solar glazed exterior"
              className="h-full w-full object-cover opacity-60 transition-transform duration-1000 hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-12 max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 text-xs font-mono text-emerald-300 backdrop-blur-md">
                INTELLIGENT FACILITY INFRASTRUCTURE
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Turn Building Data Into Better Decisions.
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                Experience real-time zone telemetry, optical headcount perception, and dynamic
                carbon accounting unified into one single dashboard.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => onNavigate('overview')}
                  className="metal-glass-btn rounded-xl px-5 py-3 text-xs font-semibold text-white inline-flex items-center gap-2"
                >
                  <span>Open Command Center</span>
                  <ArrowRight className="h-3.5 w-3.5 text-emerald-300" />
                </button>
                <button
                  onClick={() => onNavigate('simulator')}
                  className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-xs font-semibold text-white hover:bg-white/20 transition-colors backdrop-blur-xs"
                >
                  <span>Simulate Net-Zero Scenario</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
