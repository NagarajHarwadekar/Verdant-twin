import React, { useState } from 'react';
import {
  Layers,
  Users,
  Thermometer,
  Lightbulb,
  Zap,
  CheckCircle,
  AlertTriangle,
  Flame,
  Award,
  Sparkles,
  Sliders,
  ChevronRight,
  Maximize2,
} from 'lucide-react';
import { PageId, RoomZone, ZoneStatus } from '../types';
import { BackButton } from '../components/BackButton';

interface DigitalTwinPageProps {
  zones: RoomZone[];
  selectedZone: RoomZone;
  onSelectZone: (zone: RoomZone) => void;
  onUpdateZone: (updatedZone: RoomZone) => void;
  onBack: () => void;
  onNavigate: (page: PageId) => void;
}

export const DigitalTwinPage: React.FC<DigitalTwinPageProps> = ({
  zones,
  selectedZone,
  onSelectZone,
  onUpdateZone,
  onBack,
  onNavigate,
}) => {
  const [activeFloor, setActiveFloor] = useState<number>(2);
  const [viewMode, setViewMode] = useState<'status' | 'occupancy' | 'lighting'>('status');
  const [feedback, setFeedback] = useState<string | null>(null);

  const getStatusBadge = (status: ZoneStatus) => {
    switch (status) {
      case 'efficient':
        return {
          label: 'Efficient',
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          icon: <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />,
        };
      case 'warning':
        return {
          label: 'Attention',
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          icon: <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />,
        };
      case 'high_usage':
        return {
          label: 'High Usage',
          bg: 'bg-rose-50 text-rose-800 border-rose-200',
          icon: <Flame className="h-3.5 w-3.5 text-rose-600" />,
        };
    }
  };

  const getRoomFill = (zone: RoomZone, isSelected: boolean) => {
    let fill = '#f8fafc';
    let stroke = '#cbd5e1';

    if (viewMode === 'status') {
      if (zone.status === 'efficient') {
        fill = '#ecfdf5';
        stroke = '#059669';
      } else if (zone.status === 'warning') {
        fill = '#fffbeb';
        stroke = '#d97706';
      } else {
        fill = '#fff1f2';
        stroke = '#e11d48';
      }
    } else if (viewMode === 'occupancy') {
      const ratio = zone.currentOccupancy / zone.capacity;
      if (ratio > 0.6) {
        fill = '#dbeafe';
        stroke = '#2563eb';
      } else if (ratio > 0.2) {
        fill = '#eff6ff';
        stroke = '#60a5fa';
      } else {
        fill = '#f8fafc';
        stroke = '#94a3b8';
      }
    } else if (viewMode === 'lighting') {
      if (zone.lightingUtilization > 80) {
        fill = '#fef3c7';
        stroke = '#d97706';
      } else if (zone.lightingUtilization > 50) {
        fill = '#fefce8';
        stroke = '#ca8a04';
      } else {
        fill = '#f1f5f9';
        stroke = '#64748b';
      }
    }

    if (isSelected) {
      stroke = '#064e3b';
    }

    return { fill, stroke, strokeWidth: isSelected ? 3.5 : 1.5 };
  };

  // Quick Action
  const handleTrimLighting = () => {
    const updated: RoomZone = {
      ...selectedZone,
      lightingUtilization: Math.max(30, selectedZone.lightingUtilization - 20),
      energyUsage: Number((selectedZone.energyUsage * 0.88).toFixed(1)),
      status: 'efficient',
      statusMessage: 'Optimized lighting schedule applied; load trimmed.',
      efficiencyScore: Math.min(96, selectedZone.efficiencyScore + 6),
    };
    onUpdateZone(updated);
    setFeedback(`Trimmed lighting in ${selectedZone.name} to ${updated.lightingUtilization}%.`);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleSetHvacSetpoint = () => {
    const updated: RoomZone = {
      ...selectedZone,
      hvacSetpoint: 22.5,
      temperature: 22.4,
      energyUsage: Number((selectedZone.energyUsage * 0.94).toFixed(1)),
      statusMessage: 'Thermostat synced to ASHRAE 22.5°C eco band.',
    };
    onUpdateZone(updated);
    setFeedback(`Thermostat synced to 22.5°C for ${selectedZone.name}.`);
    setTimeout(() => setFeedback(null), 3000);
  };

  const statusBadge = getStatusBadge(selectedZone.status);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <BackButton onBack={onBack} targetLabel="Overview" />
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#064e3b]">
              <Layers className="h-3.5 w-3.5" />
              <span>Spatial Model</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Every Room. One Living Model.
            </h1>
          </div>
        </div>

        {/* Floor and Mode Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center rounded-xl border border-slate-200 bg-white p-1 text-xs font-medium shadow-xs">
            {[1, 2, 3].map((fl) => (
              <button
                key={fl}
                onClick={() => setActiveFloor(fl)}
                className={`rounded-lg px-3 py-1.5 transition-colors ${
                  activeFloor === fl
                    ? 'bg-[#064e3b] text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Level 0{fl}
              </button>
            ))}
          </div>

          <div className="flex items-center rounded-xl border border-slate-200 bg-white p-1 text-xs font-medium shadow-xs">
            <button
              onClick={() => setViewMode('status')}
              className={`rounded-lg px-2.5 py-1.5 transition-colors ${
                viewMode === 'status' ? 'bg-[#064e3b] text-white font-semibold' : 'text-slate-600'
              }`}
            >
              Health Status
            </button>
            <button
              onClick={() => setViewMode('occupancy')}
              className={`rounded-lg px-2.5 py-1.5 transition-colors ${
                viewMode === 'occupancy' ? 'bg-[#064e3b] text-white font-semibold' : 'text-slate-600'
              }`}
            >
              Occupancy
            </button>
            <button
              onClick={() => setViewMode('lighting')}
              className={`rounded-lg px-2.5 py-1.5 transition-colors ${
                viewMode === 'lighting' ? 'bg-[#064e3b] text-white font-semibold' : 'text-slate-600'
              }`}
            >
              Lighting
            </button>
          </div>
        </div>
      </div>

      {/* Main Floor Plan + Detail Panel */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
        {/* Left: SVG Interactive Floor Visualization */}
        <div className="lg:col-span-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4 text-xs">
            <span className="font-semibold text-slate-800">
              Verdant Tower · Floor 0{activeFloor} Layout Plan
            </span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-medium text-emerald-800">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                Efficient
              </span>
              <span className="flex items-center gap-1.5 font-medium text-amber-800">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                Attention
              </span>
              <span className="flex items-center gap-1.5 font-medium text-rose-800">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                High Usage
              </span>
            </div>
          </div>

          {/* SVG Map Canvas */}
          <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-[#fbfaf6] p-2">
            <svg viewBox="0 0 900 520" className="w-full h-auto select-none">
              {/* Pattern */}
              <defs>
                <pattern id="twinGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#eef2f6" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="900" height="520" fill="url(#twinGrid)" />

              {/* Corridors */}
              <rect x="270" y="30" width="20" height="460" fill="#f1f5f9" stroke="#e2e8f0" />
              <rect x="540" y="30" width="20" height="460" fill="#f1f5f9" stroke="#e2e8f0" />
              <rect x="30" y="190" width="240" height="20" fill="#f1f5f9" stroke="#e2e8f0" />
              <rect x="30" y="350" width="240" height="20" fill="#f1f5f9" stroke="#e2e8f0" />
              <rect x="560" y="250" width="310" height="20" fill="#f1f5f9" stroke="#e2e8f0" />

              <text x="280" y="260" fontSize="8" fill="#94a3b8" textAnchor="middle" transform="rotate(-90 280 260)" letterSpacing="2">
                WEST CORRIDOR
              </text>
              <text x="550" y="260" fontSize="8" fill="#94a3b8" textAnchor="middle" transform="rotate(-90 550 260)" letterSpacing="2">
                EAST CORRIDOR
              </text>

              {/* Zones */}
              {zones.map((zone) => {
                const isSelected = selectedZone.id === zone.id;
                const { x, y, width, height, labelX, labelY } = zone.svgPathCoordinates;
                const style = getRoomFill(zone, isSelected);

                return (
                  <g
                    key={zone.id}
                    onClick={() => onSelectZone(zone)}
                    className="cursor-pointer transition-all duration-200"
                  >
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      rx="12"
                      fill={style.fill}
                      stroke={style.stroke}
                      strokeWidth={style.strokeWidth}
                      className="transition-all duration-200 hover:opacity-90"
                    />

                    <text
                      x={labelX}
                      y={labelY - 12}
                      fontSize="13"
                      fontWeight="700"
                      fill="#0f172a"
                      textAnchor="middle"
                      className="font-sans pointer-events-none"
                    >
                      {zone.name}
                    </text>

                    {/* Telemetry pill */}
                    <rect
                      x={labelX - 60}
                      y={labelY}
                      width="120"
                      height="20"
                      rx="6"
                      fill="#ffffff"
                      stroke="#e2e8f0"
                      strokeWidth="1"
                      className="pointer-events-none shadow-xs"
                    />
                    <text
                      x={labelX}
                      y={labelY + 14}
                      fontSize="10"
                      fontWeight="600"
                      fill="#334155"
                      textAnchor="middle"
                      className="font-mono pointer-events-none"
                    >
                      {zone.currentOccupancy} Occ · {zone.energyUsage} kWh
                    </text>

                    {/* Visual state circle indicator */}
                    <circle
                      cx={x + width - 18}
                      cy={y + 18}
                      r="6"
                      fill={
                        zone.status === 'efficient'
                          ? '#10b981'
                          : zone.status === 'warning'
                          ? '#f59e0b'
                          : '#ef4444'
                      }
                      stroke="#ffffff"
                      strokeWidth="2"
                    />

                    {isSelected && (
                      <rect
                        x={x - 2}
                        y={y - 2}
                        width={width + 4}
                        height={height + 4}
                        rx="14"
                        fill="none"
                        stroke="#064e3b"
                        strokeWidth="2"
                        strokeDasharray="4 2"
                      />
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Quick Select Buttons */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 mr-1">Select Zone:</span>
            {zones.map((zone) => {
              const isSelected = selectedZone.id === zone.id;
              return (
                <button
                  key={zone.id}
                  onClick={() => onSelectZone(zone)}
                  className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-[#064e3b] text-white shadow-xs font-semibold'
                      : 'bg-white border border-slate-200 text-slate-700 hover:border-emerald-600/40'
                  }`}
                >
                  {zone.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Detail Panel Showing Exact Prompt Specs */}
        <div className="lg:col-span-4 rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-medium text-slate-400 uppercase">
                Zone Telemetry Detail
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border ${statusBadge.bg}`}
              >
                {statusBadge.icon}
                {statusBadge.label}
              </span>
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-2">{selectedZone.name}</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {selectedZone.statusMessage}
            </p>
          </div>

          {feedback && (
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-900 flex items-center gap-2 animate-in fade-in">
              <Sparkles className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>{feedback}</span>
            </div>
          )}

          {/* Required Metrics Grid:
              Occupancy: 18 people
              Energy: 12.4 kWh
              Lighting: 78% lighting
              Temperature: 23°C
              Efficiency: 86 efficiency
              Status: Efficient */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 bg-[#fbfaf6]">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                <Users className="h-4 w-4 text-emerald-700" />
                <span>Occupancy</span>
              </div>
              <div className="font-mono text-base font-bold text-slate-900 tabular-nums">
                {selectedZone.currentOccupancy} people{' '}
                <span className="text-xs font-normal text-slate-400">/ {selectedZone.capacity}</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 bg-[#fbfaf6]">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                <Zap className="h-4 w-4 text-[#064e3b]" />
                <span>Energy Usage</span>
              </div>
              <div className="font-mono text-base font-bold text-slate-900 tabular-nums">
                {selectedZone.energyUsage} kWh
              </div>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 bg-[#fbfaf6]">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                <Lightbulb className="h-4 w-4 text-amber-600" />
                <span>Lighting</span>
              </div>
              <div className="font-mono text-base font-bold text-slate-900 tabular-nums">
                {selectedZone.lightingUtilization}%
              </div>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 bg-[#fbfaf6]">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                <Thermometer className="h-4 w-4 text-blue-600" />
                <span>Temperature</span>
              </div>
              <div className="font-mono text-base font-bold text-slate-900 tabular-nums">
                {selectedZone.temperature}°C
              </div>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl border border-emerald-900/15 bg-emerald-50/50">
              <div className="flex items-center gap-2 text-xs font-medium text-[#064e3b]">
                <Award className="h-4 w-4 text-[#064e3b]" />
                <span>Efficiency</span>
              </div>
              <div className="font-mono text-base font-bold text-[#064e3b] tabular-nums">
                {selectedZone.efficiencyScore} / 100
              </div>
            </div>
          </div>

          {/* Action Triggers */}
          <div className="pt-4 border-t border-slate-100 space-y-2.5">
            <span className="text-xs font-bold text-slate-800">Zone Actions</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleTrimLighting}
                className="metal-glass-btn-secondary rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 text-center"
              >
                Trim Lighting (-20%)
              </button>
              <button
                onClick={handleSetHvacSetpoint}
                className="metal-glass-btn-secondary rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 text-center"
              >
                Sync HVAC (22.5°C)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
