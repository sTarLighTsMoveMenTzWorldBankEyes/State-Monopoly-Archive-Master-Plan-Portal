import React from "react";
import { PortalRecord } from "../types";
import { Building2, PhoneCall, Mail, FileText, Cpu, ShieldCheck, ExternalLink, HardDrive } from "lucide-react";

interface StatsOverviewProps {
  portals: PortalRecord[];
  onQuickFilterMcp: () => void;
  onQuickFilterMonopoly: () => void;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({
  portals,
  onQuickFilterMcp,
  onQuickFilterMonopoly
}) => {
  const totalPortals = portals.length;
  
  const totalContacts = portals.reduce(
    (acc, p) => acc + (p.managementContacts ? p.managementContacts.length : 0),
    0
  );

  const mcpCount = portals.filter((p) =>
    p.apiConnectors?.some((c) => c.mcpCompatible)
  ).length;

  const monopolyCount = portals.filter((p) => p.isStateMonopoly).length;

  const directRegistrationCount = portals.filter((p) => Boolean(p.directRegistrationUrl)).length;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 my-4">
      {/* Stat 1 */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 shadow-sm hover:border-slate-700 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">Total Portals</span>
          <Building2 className="h-4 w-4 text-blue-400" />
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-xl font-bold text-white">{totalPortals}</span>
          <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded">
            Sovereign Matrix
          </span>
        </div>
      </div>

      {/* Stat 2 */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 shadow-sm hover:border-slate-700 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">Direct Registration</span>
          <ExternalLink className="h-4 w-4 text-emerald-400" />
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-xl font-bold text-white">{directRegistrationCount}</span>
          <span className="text-[10px] text-slate-400 font-medium">100% Onboarding</span>
        </div>
      </div>

      {/* Stat 3 */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 shadow-sm hover:border-slate-700 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">C-Level Roster</span>
          <PhoneCall className="h-4 w-4 text-indigo-400" />
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-xl font-bold text-white">{totalContacts}</span>
          <span className="text-[10px] text-indigo-300 bg-indigo-500/10 px-1.5 py-0.5 rounded">
            Phone/Email/Fax
          </span>
        </div>
      </div>

      {/* Stat 4 */}
      <button
        onClick={onQuickFilterMcp}
        className="bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-xl p-3 shadow-sm text-left transition-all cursor-pointer group"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400 group-hover:text-cyan-300">
            MCP Server Endpoints
          </span>
          <Cpu className="h-4 w-4 text-cyan-400" />
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-xl font-bold text-cyan-400">{mcpCount}</span>
          <span className="text-[10px] text-cyan-300 bg-cyan-500/10 px-1.5 py-0.5 rounded group-hover:bg-cyan-500/20">
            Click to Filter
          </span>
        </div>
      </button>

      {/* Stat 5 */}
      <button
        onClick={onQuickFilterMonopoly}
        className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-xl p-3 shadow-sm text-left transition-all cursor-pointer group"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400 group-hover:text-amber-300">
            State Monopoly / Bank
          </span>
          <ShieldCheck className="h-4 w-4 text-amber-400" />
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-xl font-bold text-amber-400">{monopolyCount}</span>
          <span className="text-[10px] text-amber-300 bg-amber-500/10 px-1.5 py-0.5 rounded group-hover:bg-amber-500/20">
            Monopoly Portal
          </span>
        </div>
      </button>
    </div>
  );
};
