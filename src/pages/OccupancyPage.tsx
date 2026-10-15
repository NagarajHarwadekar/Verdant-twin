import React, { useState, useRef } from 'react';
import {
  Users,
  Camera,
  Upload,
  RefreshCw,
  Eye,
  CheckCircle2,
  Scan,
  Cpu,
  Layers,
  ArrowRight,
  TrendingUp,
  Clock,
  Zap,
} from 'lucide-react';
import { PageId, VisionAnalysisResult, VisionDetectionBox } from '../types';
import { BackButton } from '../components/BackButton';

interface OccupancyPageProps {
  onBack: () => void;
  onNavigate: (page: PageId) => void;
}

export const OccupancyPage: React.FC<OccupancyPageProps> = ({ onBack, onNavigate }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);

  // Exact demo state matching prompt specifications
  const [visionResult, setVisionResult] = useState<VisionAnalysisResult>({
    detectedPeople: 18,
    confidence: 94,
    roomStatus: 'Active',
    suggestedHvac: 'Optimized airflow for 18 occupants (+14% energy savings)',
    timestamp: 'Just now',
    roomName: 'Conference Room (East Wing)',
    imageUrl:
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=80',
    boxes: [
      { id: 'b1', x: 18, y: 35, width: 9, height: 26, confidence: 96, label: 'Person #1' },
      { id: 'b2', x: 29, y: 36, width: 8, height: 25, confidence: 94, label: 'Person #2' },
      { id: 'b3', x: 38, y: 38, width: 8, height: 23, confidence: 92, label: 'Person #3' },
      { id: 'b4', x: 47, y: 32, width: 9, height: 28, confidence: 97, label: 'Person #4' },
      { id: 'b5', x: 57, y: 35, width: 8, height: 25, confidence: 93, label: 'Person #5' },
      { id: 'b6', x: 67, y: 34, width: 9, height: 27, confidence: 95, label: 'Person #6' },
      { id: 'b7', x: 77, y: 40, width: 8, height: 24, confidence: 91, label: 'Person #7' },
      { id: 'b8', x: 22, y: 55, width: 10, height: 32, confidence: 95, label: 'Person #8' },
      { id: 'b9', x: 34, y: 56, width: 10, height: 33, confidence: 98, label: 'Person #9' },
      { id: 'b10', x: 46, y: 54, width: 11, height: 35, confidence: 96, label: 'Person #10' },
      { id: 'b11', x: 59, y: 55, width: 10, height: 33, confidence: 93, label: 'Person #11' },
      { id: 'b12', x: 72, y: 57, width: 10, height: 32, confidence: 94, label: 'Person #12' },
      { id: 'b13', x: 12, y: 45, width: 8, height: 25, confidence: 89, label: 'Person #13' },
      { id: 'b14', x: 84, y: 48, width: 8, height: 26, confidence: 92, label: 'Person #14' },
      { id: 'b15', x: 26, y: 28, width: 7, height: 22, confidence: 90, label: 'Person #15' },
      { id: 'b16', x: 62, y: 27, width: 7, height: 23, confidence: 93, label: 'Person #16' },
      { id: 'b17', x: 42, y: 25, width: 7, height: 21, confidence: 92, label: 'Person #17' },
      { id: 'b18', x: 52, y: 26, width: 7, height: 22, confidence: 95, label: 'Person #18' },
    ],
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAnalyzing(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setTimeout(() => {
        const count = 18;
        const generatedBoxes: VisionDetectionBox[] = Array.from({ length: count }, (_, i) => ({
          id: `box-user-${i}`,
          x: 16 + ((i * 18) % 68),
          y: 28 + ((i * 14) % 44),
          width: 8 + (i % 3) * 2,
          height: 24 + (i % 4) * 3,
          confidence: Math.round(91 + (i % 8)),
          label: `Person #${i + 1}`,
        }));

        setVisionResult({
          detectedPeople: 18,
          confidence: 94,
          roomStatus: 'Active',
          suggestedHvac: 'Optimized airflow for 18 occupants (+14% energy savings)',
          timestamp: 'Just now (Uploaded capture)',
          imageUrl: dataUrl,
          roomName: file.name.replace(/\.[^/.]+$/, '').slice(0, 24) || 'Custom Room Feed',
          boxes: generatedBoxes,
        });
        setAnalyzing(false);
      }, 700);
    };
    reader.readAsDataURL(file);
  };

  const handleRunDemoAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setVisionResult((prev) => ({
        ...prev,
        detectedPeople: 18,
        confidence: 94,
        roomStatus: 'Active',
        suggestedHvac: 'Optimized airflow for 18 occupants (+14% energy savings)',
        timestamp: 'Just now (Simulated Run)',
      }));
      setAnalyzing(false);
    }, 600);
  };

  // Hourly occupancy trend
  const occupancyHourly = [
    { hour: '07:00', percent: 12 },
    { hour: '09:00', percent: 54 },
    { hour: '11:00', percent: 78 },
    { hour: '13:00', percent: 65 },
    { hour: '14:00', percent: 88 }, // Peak
    { hour: '16:00', percent: 64 },
    { hour: '18:00', percent: 28 },
    { hour: '20:00', percent: 8 },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <BackButton onBack={onBack} targetLabel="Overview" />
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#064e3b]">
              <Users className="h-3.5 w-3.5" />
              <span>Spatial Density & Perception</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Understand How Space Is Used.
            </h1>
          </div>
        </div>

        <button
          onClick={() => onNavigate('digital-twin')}
          className="metal-glass-btn-secondary inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold text-slate-800"
        >
          <span>View On Floor Twin</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* 4 Core Occupancy Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {/* 1. Current Occupancy */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Current Occupancy
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-mono text-3xl font-extrabold text-[#064e3b] tabular-nums">
              64%
            </span>
            <span className="text-xs text-slate-500 font-medium">104 / 162</span>
          </div>
          <div className="mt-1 text-xs text-slate-400">Active head count on floor</div>
        </div>

        {/* 2. Peak Occupancy */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Peak Occupancy
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-mono text-3xl font-extrabold text-slate-900 tabular-nums">
              88%
            </span>
            <span className="text-xs text-slate-500 font-medium">142 people</span>
          </div>
          <div className="mt-1 text-xs text-slate-400">Peak reached at 14:15</div>
        </div>

        {/* 3. Available Capacity */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Available Capacity
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-mono text-3xl font-extrabold text-emerald-700 tabular-nums">
              58
            </span>
            <span className="text-xs text-slate-500 font-medium">Seats open</span>
          </div>
          <div className="mt-1 text-xs text-slate-400">Flexible workstation desks</div>
        </div>

        {/* 4. Utilization */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Space Utilization
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-mono text-3xl font-extrabold text-slate-900 tabular-nums">
              72%
            </span>
            <span className="text-xs text-slate-500 font-medium">Avg Working</span>
          </div>
          <div className="mt-1 text-xs text-emerald-700 font-medium">Balanced spatial layout</div>
        </div>
      </div>

      {/* Hourly Occupancy Trend Chart */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Occupancy Distribution Profile</h3>
            <p className="text-xs text-slate-500">Hourly density trajectory across floor spaces</p>
          </div>
          <span className="font-mono text-xs font-semibold text-[#064e3b] bg-emerald-50 px-2.5 py-1 rounded-md">
            Capacity: 162 Workspaces
          </span>
        </div>

        <div className="mt-6 h-52 w-full">
          <div className="grid h-full grid-cols-8 items-end gap-3 sm:gap-6 px-2 pb-6">
            {occupancyHourly.map((item) => (
              <div key={item.hour} className="flex flex-col items-center h-full justify-end group">
                <span className="mb-1 font-mono text-xs font-bold text-slate-700 tabular-nums">
                  {item.percent}%
                </span>
                <div className="w-full max-w-[60px] rounded-t-xl bg-slate-100 h-full max-h-[140px] flex items-end">
                  <div
                    style={{ height: `${item.percent}%` }}
                    className="w-full rounded-t-xl bg-[#064e3b] transition-all duration-300 group-hover:bg-emerald-600"
                  />
                </div>
                <span className="mt-2 font-mono text-[11px] text-slate-400">{item.hour}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Occupancy Vision Section */}
      <div className="rounded-3xl border border-emerald-950/15 bg-white p-6 sm:p-8 shadow-sm space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#064e3b]">
              <Camera className="h-3.5 w-3.5" />
              <span>Occupancy Vision</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              Optical Edge Perception Demo
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Simulated computer vision pipeline running locally on mock room telemetry.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="metal-glass-btn-secondary inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold text-slate-800"
            >
              <Upload className="h-3.5 w-3.5" />
              <span>Upload Image</span>
            </button>

            <button
              onClick={handleRunDemoAnalysis}
              disabled={analyzing}
              className="metal-glass-btn inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold text-white disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${analyzing ? 'animate-spin' : ''}`} />
              <span>Run Demo Analysis</span>
            </button>
          </div>
        </div>

        {/* Workflow Diagram: IMAGE -> OCCUPANCY SIGNAL -> ROOM STATUS -> BUILDING INSIGHT */}
        <div className="rounded-2xl border border-slate-200 bg-[#fbfaf6] p-4 sm:p-5">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center sm:text-left">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200">
              <div className="flex items-center gap-2.5">
                <Camera className="h-4 w-4 text-[#064e3b]" />
                <span className="text-xs font-extrabold text-slate-900">IMAGE</span>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-slate-300 hidden sm:block" />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200">
              <div className="flex items-center gap-2.5">
                <Scan className="h-4 w-4 text-[#064e3b]" />
                <span className="text-xs font-extrabold text-slate-900">OCCUPANCY SIGNAL</span>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-slate-300 hidden sm:block" />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200">
              <div className="flex items-center gap-2.5">
                <Cpu className="h-4 w-4 text-[#064e3b]" />
                <span className="text-xs font-extrabold text-slate-900">ROOM STATUS</span>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-slate-300 hidden sm:block" />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-[#064e3b]">
              <div className="flex items-center gap-2.5">
                <Zap className="h-4 w-4 text-emerald-700" />
                <span className="text-xs font-extrabold">BUILDING INSIGHT</span>
              </div>
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 hidden sm:block" />
            </div>
          </div>
        </div>

        {/* Visualizer Frame & Results */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Feed Preview */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-800">{visionResult.roomName}</span>
              <button
                onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
                className="text-slate-600 hover:text-slate-900 inline-flex items-center gap-1 font-medium"
              >
                <Eye className="h-3.5 w-3.5" />
                <span>{showBoundingBoxes ? 'Hide Bounding Boxes' : 'Show Bounding Boxes'}</span>
              </button>
            </div>

            <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-slate-900 shadow-inner">
              {visionResult.imageUrl ? (
                <img
                  src={visionResult.imageUrl}
                  alt="Room feed"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-slate-400">
                  <span>Room Camera Feed</span>
                </div>
              )}

              {/* Bounding boxes */}
              {showBoundingBoxes &&
                !analyzing &&
                visionResult.boxes.map((b) => (
                  <div
                    key={b.id}
                    style={{
                      left: `${b.x}%`,
                      top: `${b.y}%`,
                      width: `${b.width}%`,
                      height: `${b.height}%`,
                    }}
                    className="absolute border-2 border-emerald-400 bg-emerald-500/15 pointer-events-none"
                  >
                    <span className="absolute -top-3.5 left-0 rounded-xs bg-[#064e3b] px-1 text-[8px] font-mono text-emerald-200">
                      {b.confidence}%
                    </span>
                  </div>
                ))}

              {analyzing && (
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center text-white">
                  <div className="flex flex-col items-center gap-2">
                    <RefreshCw className="h-6 w-6 animate-spin text-emerald-400" />
                    <span className="text-xs font-mono">Running local edge inference...</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Prompt Required Result Display */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-[#fbfaf6] p-6 space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#064e3b] block">
                Analysis Signal Summary
              </span>

              {/* Exact required elements:
                  Occupancy detected
                  Estimated people: 18
                  Confidence: 94%
                  Room status: Active */}
              <div className="space-y-3 divide-y divide-slate-200/80">
                <div className="flex items-center justify-between pb-2">
                  <span className="text-sm font-semibold text-slate-700">Occupancy detected</span>
                  <span className="inline-flex items-center gap-1 font-bold text-[#064e3b] text-sm">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    Confirmed
                  </span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium text-slate-600">Estimated people</span>
                  <span className="font-mono text-2xl font-extrabold text-slate-900 tabular-nums">
                    {visionResult.detectedPeople}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium text-slate-600">Confidence</span>
                  <span className="font-mono text-lg font-bold text-emerald-700 tabular-nums">
                    {visionResult.confidence}%
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm font-medium text-slate-600">Room status</span>
                  <span className="rounded-lg bg-emerald-100 px-3 py-1 text-xs font-bold text-[#064e3b]">
                    {visionResult.roomStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Actuation card */}
            <div className="rounded-2xl bg-gradient-to-br from-[#064e3b] to-[#022c22] p-5 text-white">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-300">
                <Zap className="h-4 w-4" />
                <span>AUTOMATED DISPATCH</span>
              </div>
              <p className="mt-2 text-sm text-emerald-50 leading-relaxed">
                {visionResult.suggestedHvac}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
