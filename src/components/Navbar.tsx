import React, { useState } from 'react';
import { Building2, Menu, X, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';
import { PageId } from '../types';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  alertCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  alertCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'overview', label: 'Overview' },
    { id: 'digital-twin', label: 'Digital Twin' },
    { id: 'energy', label: 'Energy' },
    { id: 'occupancy', label: 'Occupancy' },
    { id: 'resources', label: 'Resources' },
    { id: 'simulator', label: 'Simulator' },
    { id: 'insights', label: 'Insights' },
    { id: 'alerts', label: `Alerts${alertCount > 0 ? ` (${alertCount})` : ''}` },
    { id: 'reports', label: 'Reports' },
    { id: 'about', label: 'About' },
  ];

  const handleLinkClick = (id: PageId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-950/10 bg-[#fbfaf6]/90 backdrop-blur-md transition-all duration-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo: VERDANT TWIN */}
        <button
          onClick={() => handleLinkClick('home')}
          className="group flex items-center gap-3 text-left focus:outline-none shrink-0"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#064e3b] to-[#022c22] text-emerald-300 shadow-sm border border-emerald-500/20 transition-transform duration-200 group-hover:scale-105">
            <Building2 className="h-5 w-5" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-['Outfit'] text-base font-extrabold tracking-wider text-[#064e3b]">
              VERDANT
            </span>
            <span className="font-['Outfit'] text-xs font-semibold tracking-widest text-emerald-800">
              TWIN
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-5 text-[13px] font-medium text-slate-600">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`relative py-1.5 transition-colors hover:text-[#064e3b] focus:outline-none whitespace-nowrap ${
                  isActive ? 'font-semibold text-[#064e3b]' : 'text-slate-600'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#064e3b] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Medium Screen Navigation Subset */}
        <nav className="hidden md:flex xl:hidden items-center gap-4 text-xs font-medium text-slate-600">
          {navLinks.slice(0, 6).map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`relative py-1 transition-colors hover:text-[#064e3b] focus:outline-none whitespace-nowrap ${
                  isActive ? 'font-semibold text-[#064e3b]' : 'text-slate-600'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#064e3b] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Primary CTA: "Explore Twin" */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleLinkClick('digital-twin')}
            className="metal-glass-btn group inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold text-emerald-50 focus:outline-none"
          >
            <span>Explore Twin</span>
            <ArrowRight className="h-3.5 w-3.5 text-emerald-300 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Mobile menu hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200/80 bg-[#fbfaf6] px-4 pt-3 pb-5 md:hidden shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                  currentPage === link.id
                    ? 'bg-emerald-100/70 font-semibold text-[#064e3b]'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-3">
              <button
                onClick={() => handleLinkClick('digital-twin')}
                className="metal-glass-btn flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold text-emerald-50"
              >
                <span>Explore Digital Twin</span>
                <ArrowRight className="h-4 w-4 text-emerald-300" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
