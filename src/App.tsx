import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { OverviewPage } from './pages/OverviewPage';
import { DigitalTwinPage } from './pages/DigitalTwinPage';
import { OccupancyPage } from './pages/OccupancyPage';
import { EnergyPage } from './pages/EnergyPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { SimulatorPage } from './pages/SimulatorPage';
import { InsightsPage } from './pages/InsightsPage';
import { AlertsPage } from './pages/AlertsPage';
import { ReportsPage } from './pages/ReportsPage';
import { AboutPage } from './pages/AboutPage';

import { PageId, RoomZone, BuildingAlert, BuildingRecommendation } from './types';
import {
  INITIAL_ZONES,
  INITIAL_ALERTS,
  INITIAL_RECOMMENDATIONS,
} from './data/mockBuildingData';

export default function App() {
  // Navigation & Page routing state
  const [currentPage, setCurrentPage] = useState<PageId>(() => {
    const hash = window.location.hash.replace('#', '') as PageId;
    const validPages: PageId[] = [
      'home',
      'overview',
      'digital-twin',
      'occupancy',
      'energy',
      'resources',
      'simulator',
      'insights',
      'alerts',
      'reports',
      'about',
    ];
    return validPages.includes(hash) ? hash : 'home';
  });

  const [historyStack, setHistoryStack] = useState<PageId[]>(['home']);

  // Building State
  const [zones, setZones] = useState<RoomZone[]>(INITIAL_ZONES);
  const [selectedZone, setSelectedZone] = useState<RoomZone>(INITIAL_ZONES[1]); // Conference Room default
  const [alerts, setAlerts] = useState<BuildingAlert[]>(INITIAL_ALERTS);
  const [recommendations, setRecommendations] =
    useState<BuildingRecommendation[]>(INITIAL_RECOMMENDATIONS);

  // Sync hash changes from browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = [
        'home',
        'overview',
        'digital-twin',
        'occupancy',
        'energy',
        'resources',
        'simulator',
        'insights',
        'alerts',
        'reports',
        'about',
      ];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Navigate to a new page
  const handleNavigate = (page: PageId) => {
    if (page === currentPage) return;
    setHistoryStack((prev) => [...prev, page]);
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back button handler with history support
  const handleBack = () => {
    if (historyStack.length > 1) {
      const newStack = [...historyStack];
      newStack.pop(); // Remove current page
      const prevPage = newStack[newStack.length - 1];
      setHistoryStack(newStack);
      setCurrentPage(prevPage);
      window.location.hash = prevPage;
    } else {
      // Fallback gracefully to overview or home
      const fallback: PageId = currentPage === 'overview' ? 'home' : 'overview';
      setCurrentPage(fallback);
      setHistoryStack([fallback]);
      window.location.hash = fallback;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Zone update
  const handleUpdateZone = (updatedZone: RoomZone) => {
    setZones((prev) => prev.map((z) => (z.id === updatedZone.id ? updatedZone : z)));
    setSelectedZone(updatedZone);
  };

  // Alert resolve/restore
  const handleToggleResolveAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, resolved: !a.resolved } : a))
    );
  };

  // Recommendation apply/unapply
  const handleToggleRecommendation = (recId: string) => {
    setRecommendations((prev) =>
      prev.map((r) => (r.id === recId ? { ...r, applied: !r.applied } : r))
    );
  };

  const activeAlertsCount = alerts.filter((a) => !a.resolved).length;

  return (
    <div className="min-h-screen bg-[#faf8f5] text-slate-800 flex flex-col font-sans selection:bg-[#064e3b] selection:text-white">
      {/* Premium Sticky Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        alertCount={activeAlertsCount}
      />

      {/* Main Multi-Page Content Viewport */}
      <main className="flex-1 animate-in fade-in duration-200">
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}

        {currentPage === 'overview' && (
          <OverviewPage onBack={handleBack} onNavigate={handleNavigate} />
        )}

        {currentPage === 'digital-twin' && (
          <DigitalTwinPage
            zones={zones}
            selectedZone={selectedZone}
            onSelectZone={setSelectedZone}
            onUpdateZone={handleUpdateZone}
            onBack={handleBack}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'occupancy' && (
          <OccupancyPage onBack={handleBack} onNavigate={handleNavigate} />
        )}

        {currentPage === 'energy' && (
          <EnergyPage zones={zones} onBack={handleBack} onNavigate={handleNavigate} />
        )}

        {currentPage === 'resources' && (
          <ResourcesPage onBack={handleBack} onNavigate={handleNavigate} />
        )}

        {currentPage === 'simulator' && (
          <SimulatorPage onBack={handleBack} onNavigate={handleNavigate} />
        )}

        {currentPage === 'insights' && (
          <InsightsPage
            recommendations={recommendations}
            onToggleRecommendation={handleToggleRecommendation}
            onBack={handleBack}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'alerts' && (
          <AlertsPage
            alerts={alerts}
            onToggleResolveAlert={handleToggleResolveAlert}
            onBack={handleBack}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'reports' && (
          <ReportsPage zones={zones} onBack={handleBack} onNavigate={handleNavigate} />
        )}

        {currentPage === 'about' && (
          <AboutPage onBack={handleBack} onNavigate={handleNavigate} />
        )}
      </main>

      {/* Premium Footer with 'Developed by Nagaraj Harwadekar' */}
      <Footer
        onNavigate={handleNavigate}
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />
    </div>
  );
}
