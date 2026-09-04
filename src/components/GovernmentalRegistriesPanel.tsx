import React, { useState, useMemo } from "react";
import { PortalRecord } from "../types";
import {
  ShieldAlert,
  ShieldCheck,
  Building2,
  Lock,
  ExternalLink,
  Phone,
  Mail,
  Printer,
  Search,
  ChevronRight,
  ChevronDown,
  Cpu,
  Radio,
  Zap,
  Globe,
  Key,
  Copy,
  Check,
  Layers,
  Sparkles
} from "lucide-react";

interface GovernmentalRegistriesPanelProps {
  portals: PortalRecord[];
  onSelectPortal: (portal: PortalRecord) => void;
  onTriggerCommunication?: (type: "Call" | "Email" | "Fax", portal: PortalRecord) => void;
  isOpen?: boolean;
  onToggleOpen?: () => void;
}

export const GovernmentalRegistriesPanel: React.FC<GovernmentalRegistriesPanelProps> = ({
  portals,
  onSelectPortal,
  onTriggerCommunication,
  isOpen = true,
  onToggleOpen
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"ALL" | "DEFENCE" | "STATE_REG" | "SPACE" | "RESEARCH">("ALL");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter for government, military, security, space, and state monopoly nodes
  const govPortals = useMemo(() => {
    return portals.filter((p) => {
      const cat = p.category;
      return (
        cat === "DEFENCE, SECURITY & MILITARY NODES" ||
        cat === "STATE MONOPOLY & CENTRAL BANKS" ||
        cat === "INFRASTRUCTURE & RESEARCH FEDERATIONS" ||
        cat === "INSTITUTIONAL & GOVERNMENT REPOSITORIES"
      );
    });
  }, [portals]);

  // Tab Filtering
  const filteredGovPortals = useMemo(() => {
    return govPortals.filter((p) => {
      const matchesSearch =
        searchQuery === "" ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.code.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (activeTab === "DEFENCE") {
        return p.category === "DEFENCE, SECURITY & MILITARY NODES";
      }
      if (activeTab === "STATE_REG") {
        return p.category === "STATE MONOPOLY & CENTRAL BANKS";
      }
      if (activeTab === "SPACE") {
        return (
          p.subcategory?.toLowerCase().includes("space") ||
          p.name.toLowerCase().includes("space") ||
          p.name.toLowerCase().includes("copernicus") ||
          p.name.toLowerCase().includes("nasa")
        );
      }
      if (activeTab === "RESEARCH") {
        return p.category === "INFRASTRUCTURE & RESEARCH FEDERATIONS";
      }

      return true;
    });
  }, [govPortals, searchQuery, activeTab]);

  const handleCopyEndpoint = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const defenseCount = useMemo(
    () => govPortals.filter((p) => p.category === "DEFENCE, SECURITY & MILITARY NODES").length,
    [govPortals]
  );

  const stateRegCount = useMemo(
    () => govPortals.filter((p) => p.category === "STATE MONOPOLY & CENTRAL BANKS").length,
    [govPortals]
  );

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 text-white shadow-2xl relative overflow-hidden space-y-4">
      {/* Panel Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-rose-600 via-amber-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-rose-600/20">
            <ShieldAlert className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-white tracking-wide uppercase">
                Governmental &amp; Security Registries
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                {filteredGovPortals.length} Critical Nodes
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Mission-critical endpoints for state registers, military defense feeds &amp; federated registries
            </p>
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search security &amp; govt nodes..."
            className="w-full bg-slate-900 border border-slate-800 pl-8 pr-3 py-1.5 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500/50 transition"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar pb-1 border-b border-slate-800/60">
        {[
          { id: "ALL", label: `All Mission Endpoints (${govPortals.length})` },
          { id: "DEFENCE", label: `Defence & Cyber (${defenseCount})` },
          { id: "STATE_REG", label: `State Registers (${stateRegCount})` },
          { id: "SPACE", label: "Space & Earth Obs" },
          { id: "RESEARCH", label: "EOSC & Open Science" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-rose-600 text-white shadow-md shadow-rose-600/20 font-bold"
                : "bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800/80"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid of Governmental Registry Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 max-h-[560px] overflow-y-auto pr-1">
        {filteredGovPortals.map((portal) => {
          const isDefense = portal.category === "DEFENCE, SECURITY & MILITARY NODES";
          const isMonopoly = portal.category === "STATE MONOPOLY & CENTRAL BANKS";
          const primaryApi = portal.apiConnectors?.[0];

          return (
            <div
              key={portal.id}
              className={`bg-slate-900/90 hover:bg-slate-900 border rounded-xl p-3.5 space-y-2.5 transition-all duration-200 flex flex-col justify-between group ${
                isDefense
                  ? "border-rose-900/40 hover:border-rose-500/60 shadow-lg shadow-rose-950/10"
                  : isMonopoly
                  ? "border-amber-900/40 hover:border-amber-500/60"
                  : "border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="space-y-2">
                {/* Card Top Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{portal.flagEmoji}</span>
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="text-[10px] font-bold font-mono text-slate-400">
                          {portal.country}
                        </span>
                        <span
                          className={`px-1.5 py-0.2 text-[9px] font-bold rounded uppercase tracking-wider ${
                            isDefense
                              ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                              : isMonopoly
                              ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                              : "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                          }`}
                        >
                          {portal.code}
                        </span>
                      </div>
                      <h3
                        onClick={() => onSelectPortal(portal)}
                        className="text-xs font-bold text-white group-hover:text-rose-300 transition-colors line-clamp-1 cursor-pointer mt-0.5"
                      >
                        {portal.name}
                      </h3>
                    </div>
                  </div>

                  <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center space-x-1 shrink-0">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>Active</span>
                  </span>
                </div>

                {/* Subcategory */}
                <p className="text-[11px] text-slate-400 font-medium line-clamp-1">
                  {portal.subcategory}
                </p>

                {/* Summary */}
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
                  {portal.summary}
                </p>

                {/* API Connector Specs */}
                {primaryApi && (
                  <div className="bg-slate-950/90 p-2 rounded-lg border border-slate-800/80 space-y-1 font-mono text-[10px]">
                    <div className="flex items-center justify-between text-slate-400">
                      <span className="text-indigo-400 font-semibold flex items-center space-x-1">
                        <Cpu className="h-3 w-3" />
                        <span>{primaryApi.protocol}</span>
                      </span>
                      <span className="text-amber-300">{primaryApi.authType}</span>
                    </div>

                    <div className="flex items-center justify-between bg-slate-900 p-1 rounded border border-slate-800/80">
                      <span className="text-slate-300 truncate max-w-[180px]">
                        {primaryApi.endpointUrl}
                      </span>
                      <button
                        onClick={() => handleCopyEndpoint(portal.id, primaryApi.endpointUrl)}
                        className="text-slate-400 hover:text-white p-0.5 rounded cursor-pointer"
                        title="Copy Endpoint URL"
                      >
                        {copiedId === portal.id ? (
                          <Check className="h-3 w-3 text-emerald-400" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Quick Action Footer */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-1.5">
                <div className="flex items-center space-x-1">
                  <a
                    href={portal.mainUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs transition cursor-pointer"
                    title="Open Main Portal"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>

                  {portal.directRegistrationUrl && (
                    <a
                      href={portal.directRegistrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 bg-emerald-950/80 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-800/80 rounded-lg text-[10px] font-bold flex items-center space-x-1 transition cursor-pointer"
                      title="Direct Registration Node"
                    >
                      <ShieldCheck className="h-3 w-3" />
                      <span>Register</span>
                    </a>
                  )}
                </div>

                {onTriggerCommunication && (
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => onTriggerCommunication("Call", portal)}
                      className="p-1.5 bg-indigo-600/80 hover:bg-indigo-600 text-white rounded-lg text-xs transition cursor-pointer"
                      title="Initiate Call"
                    >
                      <Phone className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => onTriggerCommunication("Email", portal)}
                      className="p-1.5 bg-sky-600/80 hover:bg-sky-600 text-white rounded-lg text-xs transition cursor-pointer"
                      title="Send Email"
                    >
                      <Mail className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => onSelectPortal(portal)}
                      className="px-2.5 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-[11px] font-bold transition cursor-pointer shadow"
                    >
                      Inspect
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredGovPortals.length === 0 && (
        <div className="p-8 text-center text-slate-400 bg-slate-900/50 rounded-xl border border-slate-800 space-y-2">
          <ShieldAlert className="h-8 w-8 text-slate-500 mx-auto animate-bounce" />
          <p className="text-sm font-semibold">No government or security nodes matched your filter query.</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveTab("ALL");
            }}
            className="text-xs text-rose-400 hover:underline cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
