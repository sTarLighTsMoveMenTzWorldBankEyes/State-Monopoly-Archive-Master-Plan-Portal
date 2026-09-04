import React from "react";
import {
  Building2,
  Database,
  Sparkles,
  PlusCircle,
  Download,
  Upload,
  Cpu,
  Layers,
  Search,
  ShieldCheck,
  PhoneCall,
  Globe,
  Table,
  ShieldAlert
} from "lucide-react";
import { PortalCategory } from "../types";

export type ViewMode = "BOTH" | "MAP" | "TABLE" | "GOV";

interface HeaderProps {
  totalCount: number;
  filteredCount: number;
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeView: ViewMode;
  onToggleView: (view: ViewMode) => void;
  onOpenAiModal: () => void;
  onOpenAddModal: () => void;
  onOpenWorkbench: () => void;
  onExportDatabase: () => void;
  onImportDatabase: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CATEGORIES: { label: string; value: PortalCategory | "ALL" }[] = [
  { label: "All Sectors", value: "ALL" },
  { label: "Open Banking", value: "OPEN BANKING / OPEN FINANCE" },
  { label: "DLT & Trust Services", value: "DLT-TSS & TRUST SERVICES" },
  { label: "Infrastructure Federations", value: "INFRASTRUCTURE & RESEARCH FEDERATIONS" },
  { label: "Institutional Repositories", value: "INSTITUTIONAL & GOVERNMENT REPOSITORIES" },
  { label: "State Monopoly & Central Banks", value: "STATE MONOPOLY & CENTRAL BANKS" },
  { label: "Defence & Security", value: "DEFENCE, SECURITY & MILITARY NODES" },
  { label: "API & MCP Connectors", value: "API & MCP CONNECTORS HUB" }
];

export const Header: React.FC<HeaderProps> = ({
  totalCount,
  filteredCount,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  activeView,
  onToggleView,
  onOpenAiModal,
  onOpenAddModal,
  onOpenWorkbench,
  onExportDatabase,
  onImportDatabase
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-30 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        {/* Top Brand Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  State &amp; Monopoly Archive Master Plan Portal
                </h1>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  v2.5 Sovereign
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Direct Registration Portals • C-Level Roster • Phone/Fax/Email Utilities • MCP Connectors
              </p>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center flex-wrap gap-2">
            {/* View Mode Switcher */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 shadow-inner mr-2">
              <button
                onClick={() => onToggleView("BOTH")}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg flex items-center space-x-1.5 transition-all cursor-pointer ${
                  activeView === "BOTH"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                <span>Full Dashboard</span>
              </button>
              <button
                onClick={() => onToggleView("MAP")}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg flex items-center space-x-1.5 transition-all cursor-pointer ${
                  activeView === "MAP"
                    ? "bg-indigo-600 text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Globe className="h-3.5 w-3.5 text-indigo-300" />
                <span>Network Map</span>
              </button>
              <button
                onClick={() => onToggleView("TABLE")}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg flex items-center space-x-1.5 transition-all cursor-pointer ${
                  activeView === "TABLE"
                    ? "bg-blue-600 text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Table className="h-3.5 w-3.5" />
                <span>Data Table</span>
              </button>
              <button
                onClick={() => onToggleView("GOV")}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg flex items-center space-x-1.5 transition-all cursor-pointer ${
                  activeView === "GOV"
                    ? "bg-rose-600 text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <ShieldAlert className="h-3.5 w-3.5 text-rose-300" />
                <span>Gov Registries</span>
              </button>
            </div>
            <button
              onClick={onOpenAiModal}
              id="btn-ai-parse"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md transition-all border border-purple-400/30 cursor-pointer"
              title="Parse custom URL or raw contact text with Gemini AI"
            >
              <Sparkles className="h-3.5 w-3.5 text-yellow-300 animate-pulse" />
              <span>AI Portal Parser</span>
            </button>

            <button
              onClick={onOpenWorkbench}
              id="btn-mcp-workbench"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 shadow-sm transition-all cursor-pointer"
            >
              <Cpu className="h-3.5 w-3.5 text-cyan-400" />
              <span>MCP &amp; API Workbench</span>
            </button>

            <button
              onClick={onOpenAddModal}
              id="btn-add-portal"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-700 hover:bg-emerald-600 text-white border border-emerald-500/30 shadow-sm transition-all cursor-pointer"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span>Add Portal</span>
            </button>

            <div className="h-5 w-px bg-slate-700 mx-1 hidden sm:block" />

            <button
              onClick={onExportDatabase}
              id="btn-export-db"
              className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
              title="Export database as JSON"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Export</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              id="btn-import-db"
              className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
              title="Import JSON database"
            >
              <Upload className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Import</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={onImportDatabase}
              accept=".json"
              className="hidden"
            />
          </div>
        </div>

        {/* Category Tabs & Quick Search */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              id="input-global-search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search portal name, C-level executive, email, phone, fax, API..."
              className="w-full pl-9 pr-4 py-1.5 bg-slate-950/80 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar pb-1 md:pb-0">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => onSelectCategory(cat.value)}
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold"
                      : "bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};
