import React from 'react';
import { Building2, ArrowUp } from 'lucide-react';
import { PageId } from '../types';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onScrollToTop }) => {
  return (
    <footer className="bg-[#0b1a13] text-slate-300 pt-16 pb-12 border-t border-emerald-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#064e3b] text-emerald-300 shadow-sm border border-emerald-500/20">
                <Building2 className="h-5 w-5" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-['Outfit'] text-lg font-extrabold tracking-wider text-white">
                  VERDANT
                </span>
                <span className="font-['Outfit'] text-xs font-semibold tracking-widest text-emerald-400">
                  TWIN
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Green Building Digital Twin platform designed to help facility managers understand
              occupancy, energy usage, lighting, water, and sustainability performance from one living model.
            </p>

            <div className="inline-block rounded-lg bg-emerald-950/80 px-3 py-1.5 text-xs text-emerald-300 border border-emerald-800/40 font-mono">
              Green Building Digital Twin
            </div>
          </div>

          {/* Quick Nav Col 1 */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              Operations & Digital Twin
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('overview')}
                  className="hover:text-white transition-colors"
                >
                  Building Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('digital-twin')}
                  className="hover:text-white transition-colors"
                >
                  Interactive Floor Twin
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('energy')}
                  className="hover:text-white transition-colors"
                >
                  Energy Analytics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('occupancy')}
                  className="hover:text-white transition-colors"
                >
                  Occupancy Vision
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Nav Col 2 */}
          <div className="md:col-span-4 space-y-3 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                Optimization & Impact
              </h4>
              <ul className="mt-3 space-y-2 text-xs text-slate-400">
                <li>
                  <button
                    onClick={() => onNavigate('resources')}
                    className="hover:text-white transition-colors"
                  >
                    Resource Health
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('simulator')}
                    className="hover:text-white transition-colors"
                  >
                    What-If Simulator
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('insights')}
                    className="hover:text-white transition-colors"
                  >
                    Action Center Insights
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('alerts')}
                    className="hover:text-white transition-colors"
                  >
                    Alert Management
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('reports')}
                    className="hover:text-white transition-colors"
                  >
                    Sustainability Reports
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('about')}
                    className="hover:text-white transition-colors"
                  >
                    About & Architecture
                  </button>
                </li>
              </ul>
            </div>

            <button
              onClick={onScrollToTop}
              className="inline-flex items-center gap-2 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors pt-4"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar with mandatory credit */}
        <div className="border-t border-emerald-950/80 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} VERDANT TWIN. All rights reserved.</p>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-right">
            <span className="font-semibold text-slate-200">
              Developed by Nagaraj Harwadekar
            </span>
            <span className="hidden sm:inline text-slate-600">·</span>
            <span className="font-mono text-emerald-400">CodeClash Hackathon 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
