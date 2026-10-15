import React, { useState } from 'react';
import {
  Bell,
  AlertOctagon,
  AlertTriangle,
  Info,
  CheckCircle2,
  Check,
  Undo2,
  ShieldCheck,
} from 'lucide-react';
import { PageId, BuildingAlert, AlertSeverity } from '../types';
import { BackButton } from '../components/BackButton';

interface AlertsPageProps {
  alerts: BuildingAlert[];
  onToggleResolveAlert: (id: string) => void;
  onBack: () => void;
  onNavigate: (page: PageId) => void;
}

export const AlertsPage: React.FC<AlertsPageProps> = ({
  alerts,
  onToggleResolveAlert,
  onBack,
  onNavigate,
}) => {
  const [filter, setFilter] = useState<'active' | 'all' | 'resolved'>('active');

  const filtered = alerts.filter((a) => {
    if (filter === 'active') return !a.resolved;
    if (filter === 'resolved') return a.resolved;
    return true;
  });

  const activeCount = alerts.filter((a) => !a.resolved).length;

  const getSeverityBadge = (severity: AlertSeverity) => {
    switch (severity) {
      case 'high':
        return {
          label: 'HIGH',
          badge: 'bg-rose-100 text-rose-800 border-rose-300 font-extrabold',
          icon: <AlertOctagon className="h-4 w-4 text-rose-600" />,
        };
      case 'medium':
        return {
          label: 'MEDIUM',
          badge: 'bg-amber-100 text-amber-900 border-amber-300 font-bold',
          icon: <AlertTriangle className="h-4 w-4 text-amber-600" />,
        };
      case 'low':
        return {
          label: 'LOW',
          badge: 'bg-blue-100 text-blue-900 border-blue-300 font-medium',
          icon: <Info className="h-4 w-4 text-blue-600" />,
        };
      case 'info':
        return {
          label: 'INFO',
          badge: 'bg-slate-100 text-slate-800 border-slate-300 font-medium',
          icon: <CheckCircle2 className="h-4 w-4 text-slate-600" />,
        };
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
              <Bell className="h-3.5 w-3.5" />
              <span>Real-Time Facility Surveillance</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Watch What Matters.
            </h1>
          </div>
        </div>

        {/* Filter Switcher */}
        <div className="flex items-center rounded-xl border border-slate-200 bg-white p-1 text-xs font-medium shadow-xs">
          <button
            onClick={() => setFilter('active')}
            className={`rounded-lg px-3 py-1.5 transition-colors ${
              filter === 'active' ? 'bg-[#064e3b] text-white font-semibold' : 'text-slate-600'
            }`}
          >
            Active ({activeCount})
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`rounded-lg px-3 py-1.5 transition-colors ${
              filter === 'all' ? 'bg-[#064e3b] text-white font-semibold' : 'text-slate-600'
            }`}
          >
            All Logs ({alerts.length})
          </button>
          <button
            onClick={() => setFilter('resolved')}
            className={`rounded-lg px-3 py-1.5 transition-colors ${
              filter === 'resolved' ? 'bg-[#064e3b] text-white font-semibold' : 'text-slate-600'
            }`}
          >
            Resolved ({alerts.length - activeCount})
          </button>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-500">
            <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600 mb-3" />
            <p className="text-base font-bold text-slate-800">No active alerts in this queue</p>
            <p className="text-xs text-slate-400 mt-1">
              All mechanical and lighting boundaries are operating nominally.
            </p>
          </div>
        ) : (
          filtered.map((alert) => {
            const sev = getSeverityBadge(alert.severity);
            return (
              <div
                key={alert.id}
                className={`rounded-2xl border p-5 sm:p-6 shadow-xs transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${
                  alert.resolved
                    ? 'border-slate-200 bg-slate-50/70 opacity-60'
                    : 'border-slate-200 bg-white hover:border-emerald-600/30'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">{sev.icon}</div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded text-[10px] tracking-wider uppercase border ${sev.badge}`}
                      >
                        {sev.label}
                      </span>
                      <h4 className="text-base font-bold text-slate-900">{alert.title}</h4>
                      <span className="text-xs text-slate-300">·</span>
                      <span className="text-xs font-semibold text-slate-500">{alert.zoneName}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                      {alert.description}
                    </p>
                  </div>
                </div>

                {/* Timestamp and Resolve / Restore Toggle */}
                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
                  <span className="font-mono text-xs text-slate-400">{alert.timestamp}</span>

                  <button
                    onClick={() => onToggleResolveAlert(alert.id)}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                      alert.resolved
                        ? 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                        : 'metal-glass-btn text-white'
                    }`}
                  >
                    {alert.resolved ? (
                      <>
                        <Undo2 className="h-3.5 w-3.5" />
                        <span>Restore Alert</span>
                      </>
                    ) : (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span>Resolve Alert</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
