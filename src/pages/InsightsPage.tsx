import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle,
  Lightbulb,
  Thermometer,
  Server,
  Droplets,
  ArrowRight,
  Filter,
  Check,
} from 'lucide-react';
import { PageId, BuildingRecommendation } from '../types';
import { BackButton } from '../components/BackButton';

interface InsightsPageProps {
  recommendations: BuildingRecommendation[];
  onToggleRecommendation: (id: string) => void;
  onBack: () => void;
  onNavigate: (page: PageId) => void;
}

export const InsightsPage: React.FC<InsightsPageProps> = ({
  recommendations,
  onToggleRecommendation,
  onBack,
  onNavigate,
}) => {
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const filtered = recommendations.filter((r) => {
    if (filter === 'all') return true;
    return r.priority === filter;
  });

  const appliedCount = recommendations.filter((r) => r.applied).length;
  const totalKwhSaved = recommendations
    .filter((r) => r.applied)
    .reduce((sum, r) => sum + r.kwhSavings, 0);

  const getPriorityStyle = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return 'bg-rose-100 text-rose-800 border-rose-300 font-extrabold';
      case 'medium':
        return 'bg-amber-100 text-amber-900 border-amber-300 font-bold';
      case 'low':
        return 'bg-blue-100 text-blue-900 border-blue-300 font-medium';
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
              <Sparkles className="h-3.5 w-3.5" />
              <span>Prescriptive Action Center</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              From Data to Direction.
            </h1>
          </div>
        </div>

        {/* Impact Tally and Filter */}
        <div className="flex flex-wrap items-center gap-3">
          {appliedCount > 0 && (
            <span className="font-mono text-xs font-bold text-[#064e3b] bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              {appliedCount} Applied · -{totalKwhSaved.toFixed(1)} kWh/day saved
            </span>
          )}

          <div className="flex items-center rounded-xl border border-slate-200 bg-white p-1 text-xs font-medium shadow-xs">
            <button
              onClick={() => setFilter('all')}
              className={`rounded-lg px-3 py-1.5 transition-colors ${
                filter === 'all' ? 'bg-[#064e3b] text-white font-semibold' : 'text-slate-600'
              }`}
            >
              All ({recommendations.length})
            </button>
            <button
              onClick={() => setFilter('high')}
              className={`rounded-lg px-3 py-1.5 transition-colors ${
                filter === 'high' ? 'bg-[#064e3b] text-white font-semibold' : 'text-slate-600'
              }`}
            >
              HIGH
            </button>
            <button
              onClick={() => setFilter('medium')}
              className={`rounded-lg px-3 py-1.5 transition-colors ${
                filter === 'medium' ? 'bg-[#064e3b] text-white font-semibold' : 'text-slate-600'
              }`}
            >
              MEDIUM
            </button>
            <button
              onClick={() => setFilter('low')}
              className={`rounded-lg px-3 py-1.5 transition-colors ${
                filter === 'low' ? 'bg-[#064e3b] text-white font-semibold' : 'text-slate-600'
              }`}
            >
              LOW
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Recommendation Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`rounded-3xl border p-6 shadow-sm transition-all flex flex-col justify-between ${
              item.applied
                ? 'border-emerald-300 bg-emerald-50/40'
                : 'border-slate-200 bg-white hover:border-emerald-600/30'
            }`}
          >
            <div className="space-y-4">
              {/* Priority badge */}
              <div className="flex items-center justify-between">
                <span
                  className={`inline-block px-2.5 py-0.5 rounded text-[10px] tracking-wider uppercase border ${getPriorityStyle(
                    item.priority
                  )}`}
                >
                  {item.priority.toUpperCase()}
                </span>
                <span className="text-xs font-semibold text-slate-500">{item.zoneName}</span>
              </div>

              {/* Issue */}
              <h3 className="text-lg font-bold text-slate-900 leading-snug">{item.issue}</h3>

              {/* Why */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Why:
                </span>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {item.whyItMatters}
                </p>
              </div>

              {/* Action */}
              <div className="rounded-2xl bg-slate-50 p-3.5 border border-slate-100 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#064e3b]">
                  Action:
                </span>
                <p className="text-xs text-slate-800 leading-relaxed font-semibold">
                  {item.suggestedAction}
                </p>
              </div>

              {/* Estimated Impact */}
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Estimated Impact:
                </span>
                <div className="font-mono text-sm font-extrabold text-[#064e3b]">
                  {item.estimatedImpact}
                </div>
              </div>
            </div>

            {/* Footer Apply Button */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                {item.applied ? 'Action scheduled' : 'Ready to deploy'}
              </span>

              <button
                onClick={() => onToggleRecommendation(item.id)}
                className={`metal-glass-btn inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold ${
                  item.applied ? 'bg-[#047857]' : ''
                }`}
              >
                {item.applied ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>Applied</span>
                  </>
                ) : (
                  <>
                    <span>Apply Action</span>
                    <ArrowRight className="h-3.5 w-3.5 text-emerald-300" />
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
