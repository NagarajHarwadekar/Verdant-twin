import React from 'react';
import {
  Building2,
  Award,
  ShieldCheck,
  Leaf,
  Layers,
  Sparkles,
  ArrowRight,
  Code2,
} from 'lucide-react';
import { PageId } from '../types';
import { BackButton } from '../components/BackButton';

interface AboutPageProps {
  onBack: () => void;
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBack, onNavigate }) => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <BackButton onBack={onBack} targetLabel="Home" />
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#064e3b]">
              <Building2 className="h-3.5 w-3.5" />
              <span>Commercial Sustainability Platform</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl leading-tight">
              Building Intelligence, Designed for a Better Future.
            </h1>
          </div>
        </div>

        <button
          onClick={() => onNavigate('digital-twin')}
          className="metal-glass-btn inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold text-white shadow-md"
        >
          <span>Explore Digital Twin</span>
          <ArrowRight className="h-3.5 w-3.5 text-emerald-300" />
        </button>
      </div>

      {/* Hero Architectural Vignette */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-950 text-white shadow-xl">
        <div className="relative h-72 sm:h-80 w-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80"
            alt="Sustainable architectural innovation"
            className="h-full w-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 max-w-2xl space-y-2">
            <span className="inline-block rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 text-xs font-mono text-emerald-300 backdrop-blur-md">
              CODECLASH HACKATHON 2026
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Green Building Digital Twin — Problem Statement 4
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Designed as a luxury enterprise management console that turns disparate building signals
              into proactive spatial conservation.
            </p>
          </div>
        </div>
      </div>

      {/* 3 Core Pillars: The Problem, The Approach, The Vision */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Pillar 1: The Problem */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-700 border border-rose-100">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
            CHALLENGE
          </span>
          <h3 className="text-xl font-bold text-slate-900">The Problem</h3>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            Buildings generate huge amounts of operational information, but that information is often fragmented.
            Facility directors are left reviewing static utility bills weeks after power and water have already been wasted.
          </p>
        </div>

        {/* Pillar 2: The Approach */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-[#064e3b] border border-emerald-100">
            <Layers className="h-6 w-6" />
          </div>
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-800 uppercase">
            METHODOLOGY
          </span>
          <h3 className="text-xl font-bold text-slate-900">The Approach</h3>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            Verdant Twin brings occupancy, energy, lighting and resource signals into one understandable digital model.
            By visualizing physical floor plans and spatial zones in real time, waste becomes immediately identifiable and actionable.
          </p>
        </div>

        {/* Pillar 3: The Vision */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-700 border border-amber-100">
            <Sparkles className="h-6 w-6" />
          </div>
          <span className="text-xs font-mono font-bold tracking-widest text-amber-800 uppercase">
            IMPACT
          </span>
          <h3 className="text-xl font-bold text-slate-900">The Vision</h3>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            Help buildings become more efficient, measurable and sustainable.
            Empowering facility teams with predictive what-if simulators so every HVAC trimming and daylight harvesting scenario can be tested with confidence.
          </p>
        </div>
      </div>

      {/* Developer Credit Box */}
      <div className="rounded-3xl border border-emerald-900/20 bg-gradient-to-br from-[#064e3b] to-[#022c22] p-8 sm:p-12 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-300">
              <Code2 className="h-4 w-4" />
              <span>ENGINEERING CREDITS</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Developed by Nagaraj Harwadekar
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed max-w-xl">
              CodeClash Hackathon 2026 · Problem Statement: Green Building Digital Twin.
              Engineered with pure React + TypeScript, zero external API dependencies, local state, and luxury architectural UI design.
            </p>
          </div>

          <div className="shrink-0">
            <div className="rounded-2xl bg-black/30 border border-white/20 p-4 text-center font-mono text-xs">
              <span className="text-emerald-300 font-bold block">CodeClash 2026</span>
              <span className="text-slate-300">Hackathon Submission</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
