/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { PortalRecord, ManagementContact, CommunicationLog } from "./types";
import { INITIAL_PORTALS } from "./data/portalDatabase";
import { Header, ViewMode } from "./components/Header";
import { StatsOverview } from "./components/StatsOverview";
import { MasterTable } from "./components/MasterTable";
import { PortalDetailModal } from "./components/PortalDetailModal";
import { CommunicationModal } from "./components/CommunicationModal";
import { McpApiWorkbench } from "./components/McpApiWorkbench";
import { AiExtractorModal } from "./components/AiExtractorModal";
import { AddPortalModal } from "./components/AddPortalModal";
import { CommunicationLogDrawer } from "./components/CommunicationLogDrawer";
import { SovereignNetworkMap } from "./components/SovereignNetworkMap";
import { GovernmentalRegistriesPanel } from "./components/GovernmentalRegistriesPanel";
import { ShieldCheck, Database, Globe, Map } from "lucide-react";

const STORAGE_KEY_PORTALS = "masterplan_portals_v2";
const STORAGE_KEY_LOGS = "masterplan_comm_logs_v2";

export default function App() {
  // Load persisted portals or fallback to initial dataset
  const [portals, setPortals] = useState<PortalRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PORTALS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Could not load portals from localStorage", e);
    }
    return INITIAL_PORTALS;
  });

  // Load communication logs
  const [commLogs, setCommLogs] = useState<CommunicationLog[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LOGS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn("Could not load comm logs", e);
    }
    return [];
  });

  // Filter State
  const [filterState, setFilterState] = useState({
    searchQuery: "",
    category: "ALL",
    country: "ALL",
    capacity: "ALL",
    hasMcpOnly: false,
    hasOpenApiOnly: false,
    isMonopolyOnly: false
  });

  // Modals
  const [selectedPortal, setSelectedPortal] = useState<PortalRecord | null>(null);
  const [commModal, setCommModal] = useState<{
    type: "Call" | "Email" | "Fax" | null;
    portal: PortalRecord | null;
    contact?: ManagementContact;
  }>({ type: null, portal: null });

  const [showWorkbench, setShowWorkbench] = useState<boolean>(false);
  const [showAiModal, setShowAiModal] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<ViewMode>("BOTH");

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PORTALS, JSON.stringify(portals));
    } catch (e) {
      console.error("Failed to save portals to localStorage", e);
    }
  }, [portals]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(commLogs));
    } catch (e) {
      console.error("Failed to save comm logs to localStorage", e);
    }
  }, [commLogs]);

  // Handlers
  const handleSelectCategory = (cat: string) => {
    setFilterState((prev) => ({ ...prev, category: cat }));
  };

  const handleSearchChange = (q: string) => {
    setFilterState((prev) => ({ ...prev, searchQuery: q }));
  };

  const handleTriggerCommunication = (
    type: "Call" | "Email" | "Fax",
    portal: PortalRecord,
    contact?: ManagementContact
  ) => {
    setCommModal({ type, portal, contact });
  };

  const handleLogCommunication = (log: CommunicationLog) => {
    setCommLogs((prev) => [log, ...prev]);
  };

  const handleAddPortal = (newPortal: PortalRecord) => {
    setPortals((prev) => [newPortal, ...prev]);
  };

  const handleDeletePortal = (id: string) => {
    if (confirm("Are you sure you want to remove this portal from your master plan archive?")) {
      setPortals((prev) => prev.filter((p) => p.id !== id));
      if (selectedPortal?.id === id) {
        setSelectedPortal(null);
      }
    }
  };

  const handleUpdateNotes = (id: string, notes: string) => {
    setPortals((prev) =>
      prev.map((p) => (p.id === id ? { ...p, notes, updatedAt: new Date().toISOString().split("T")[0] } : p))
    );
    if (selectedPortal?.id === id) {
      setSelectedPortal((prev) => (prev ? { ...prev, notes } : null));
    }
  };

  // Export / Import
  const handleExportDatabase = () => {
    const dataStr = JSON.stringify(portals, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Sovereign_MasterPlan_Database_${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportDatabase = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          setPortals(parsed);
          alert(`Successfully imported ${parsed.length} portal records!`);
        } else {
          alert("Invalid database format. Expected JSON array of portal records.");
        }
      } catch (err) {
        alert("Failed to parse JSON file.");
      }
    };
    reader.readAsText(file);
  };

  const handleResetFilters = () => {
    setFilterState({
      searchQuery: "",
      category: "ALL",
      country: "ALL",
      capacity: "ALL",
      hasMcpOnly: false,
      hasOpenApiOnly: false,
      isMonopolyOnly: false
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Header Bar */}
      <Header
        totalCount={portals.length}
        filteredCount={portals.length}
        activeCategory={filterState.category}
        onSelectCategory={handleSelectCategory}
        searchQuery={filterState.searchQuery}
        onSearchChange={handleSearchChange}
        activeView={activeView}
        onToggleView={setActiveView}
        onOpenAiModal={() => setShowAiModal(true)}
        onOpenAddModal={() => setShowAddModal(true)}
        onOpenWorkbench={() => setShowWorkbench(true)}
        onExportDatabase={handleExportDatabase}
        onImportDatabase={handleImportDatabase}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Top Summary Dashboard */}
        <StatsOverview
          portals={portals}
          onQuickFilterMcp={() =>
            setFilterState((prev) => ({ ...prev, hasMcpOnly: !prev.hasMcpOnly }))
          }
          onQuickFilterMonopoly={() =>
            setFilterState((prev) => ({ ...prev, isMonopolyOnly: !prev.isMonopolyOnly }))
          }
        />

        {/* Communication History Drawer */}
        <CommunicationLogDrawer logs={commLogs} onClearLogs={() => setCommLogs([])} />

        {/* Sovereign Network Map Component */}
        {(activeView === "MAP" || activeView === "BOTH") && (
          <SovereignNetworkMap
            portals={portals}
            onSelectPortal={setSelectedPortal}
            onTriggerCommunication={handleTriggerCommunication}
          />
        )}

        {/* Governmental Registries Panel */}
        {(activeView === "GOV" || activeView === "BOTH") && (
          <GovernmentalRegistriesPanel
            portals={portals}
            onSelectPortal={setSelectedPortal}
            onTriggerCommunication={handleTriggerCommunication}
          />
        )}

        {/* Master Interactive Data Grid */}
        {(activeView === "TABLE" || activeView === "BOTH") && (
          <MasterTable
            portals={portals}
            onSelectPortal={setSelectedPortal}
            onTriggerCommunication={handleTriggerCommunication}
            onOpenMcpSpec={(p) => {
              setSelectedPortal(p);
              setShowWorkbench(true);
            }}
            onDeletePortal={handleDeletePortal}
            filterState={filterState}
            setFilterState={setFilterState}
          />
        )}
      </main>

      {/* Sovereign Master Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="font-semibold text-slate-300">
              State &amp; Monopoly Archive Master Plan Portal
            </span>
            <span>•</span>
            <span>European &amp; Global Sovereign Matrix</span>
          </div>

          <div className="flex items-center space-x-4 text-slate-400">
            <span>Open Banking (Berlin Group)</span>
            <span>•</span>
            <span>DLT-TSS (eIDAS 2.0 / EUDI)</span>
            <span>•</span>
            <span>OpenAPI 3.0 &amp; MCP v1.0</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {selectedPortal && (
        <PortalDetailModal
          portal={selectedPortal}
          commLogs={commLogs.filter(
            (log) =>
              log.portalId === selectedPortal.id ||
              log.portalName.toLowerCase() === selectedPortal.name.toLowerCase()
          )}
          onClose={() => setSelectedPortal(null)}
          onTriggerCommunication={handleTriggerCommunication}
          onUpdateNotes={handleUpdateNotes}
        />
      )}

      {commModal.type && (
        <CommunicationModal
          type={commModal.type}
          portal={commModal.portal}
          selectedContact={commModal.contact}
          onClose={() => setCommModal({ type: null, portal: null })}
          onLogCommunication={handleLogCommunication}
        />
      )}

      {showWorkbench && (
        <McpApiWorkbench portals={portals} onClose={() => setShowWorkbench(false)} />
      )}

      {showAiModal && (
        <AiExtractorModal
          onClose={() => setShowAiModal(false)}
          onAddExtractedPortal={handleAddPortal}
        />
      )}

      {showAddModal && (
        <AddPortalModal onClose={() => setShowAddModal(false)} onAddPortal={handleAddPortal} />
      )}
    </div>
  );
}
