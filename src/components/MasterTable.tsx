import React, { useState } from "react";
import { PortalRecord, ManagementContact } from "../types";
import {
  ExternalLink,
  Phone,
  Mail,
  Printer,
  Cpu,
  Eye,
  ShieldCheck,
  Globe,
  FileCode,
  HardDrive,
  UserCheck,
  ChevronUp,
  ChevronDown,
  Filter,
  Trash2
} from "lucide-react";

interface MasterTableProps {
  portals: PortalRecord[];
  onSelectPortal: (portal: PortalRecord) => void;
  onTriggerCommunication: (
    type: "Call" | "Email" | "Fax",
    portal: PortalRecord,
    contact?: ManagementContact
  ) => void;
  onOpenMcpSpec: (portal: PortalRecord) => void;
  onDeletePortal: (portalId: string) => void;
  filterState: {
    searchQuery: string;
    category: string;
    country: string;
    capacity: string;
    hasMcpOnly: boolean;
    hasOpenApiOnly: boolean;
    isMonopolyOnly: boolean;
  };
  setFilterState: React.Dispatch<
    React.SetStateAction<{
      searchQuery: string;
      category: string;
      country: string;
      capacity: string;
      hasMcpOnly: boolean;
      hasOpenApiOnly: boolean;
      isMonopolyOnly: boolean;
    }>
  >;
}

export const MasterTable: React.FC<MasterTableProps> = ({
  portals,
  onSelectPortal,
  onTriggerCommunication,
  onOpenMcpSpec,
  onDeletePortal,
  filterState,
  setFilterState
}) => {
  const [sortField, setSortField] = useState<keyof PortalRecord>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Unique country list
  const availableCountries = Array.from(new Set(portals.map((p) => p.country))).sort();

  // Filter Logic
  const filteredPortals = portals.filter((p) => {
    // Search query
    if (filterState.searchQuery) {
      const q = filterState.searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchCode = p.code.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      const matchSub = p.subcategory.toLowerCase().includes(q);
      const matchCountry = p.country.toLowerCase().includes(q);
      const matchContacts = p.managementContacts?.some(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.role.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.phone.includes(q) ||
          (c.fax && c.fax.includes(q))
      );
      const matchGeneral =
        p.generalEmail.toLowerCase().includes(q) ||
        p.generalPhone.includes(q) ||
        p.generalFax.includes(q);

      if (
        !matchName &&
        !matchCode &&
        !matchCat &&
        !matchSub &&
        !matchCountry &&
        !matchContacts &&
        !matchGeneral
      ) {
        return false;
      }
    }

    // Category
    if (filterState.category !== "ALL" && p.category !== filterState.category) {
      return false;
    }

    // Country
    if (filterState.country !== "ALL" && p.country !== filterState.country) {
      return false;
    }

    // Capacity
    if (filterState.capacity !== "ALL" && p.depositCapacity !== filterState.capacity) {
      return false;
    }

    // MCP
    if (filterState.hasMcpOnly && !p.apiConnectors?.some((c) => c.mcpCompatible)) {
      return false;
    }

    // OpenAPI
    if (
      filterState.hasOpenApiOnly &&
      !p.apiConnectors?.some((c) => c.protocol === "OpenAPI v3" || c.protocol === "REST API")
    ) {
      return false;
    }

    // Monopoly
    if (filterState.isMonopolyOnly && !p.isStateMonopoly) {
      return false;
    }

    return true;
  });

  // Sort Logic
  const sortedPortals = [...filteredPortals].sort((a, b) => {
    let valA = a[sortField] ?? "";
    let valB = b[sortField] ?? "";

    if (typeof valA === "string") valA = valA.toLowerCase();
    if (typeof valB === "string") valB = valB.toLowerCase();

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const toggleSort = (field: keyof PortalRecord) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden">
      {/* Secondary Filter Ribbon */}
      <div className="p-3 bg-slate-950/60 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center flex-wrap gap-2">
          <div className="flex items-center space-x-1 text-slate-400 font-medium">
            <Filter className="h-3.5 w-3.5 text-blue-400" />
            <span>Refine Matrix:</span>
          </div>

          {/* Country Filter */}
          <select
            value={filterState.country}
            onChange={(e) => setFilterState({ ...filterState, country: e.target.value })}
            className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="ALL">All Jurisdictions / Countries</option>
            {availableCountries.map((c) => (
              <option key={c} value={c}>
                Country / Jurisdiction: {c}
              </option>
            ))}
          </select>

          {/* Capacity Filter */}
          <select
            value={filterState.capacity}
            onChange={(e) => setFilterState({ ...filterState, capacity: e.target.value })}
            className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="ALL">All Deposit Capacities</option>
            <option value="S (<20GB)">S (&lt;20GB)</option>
            <option value="M (20GB-1TB)">M (20GB-1TB)</option>
            <option value="L (>1TB)">L (&gt;1TB Multi-TB)</option>
            <option value="Unlimited">Unlimited / Infrastructure</option>
            <option value="N/A (API Only)">N/A (API Only)</option>
          </select>
        </div>

        {/* Feature Checkboxes */}
        <div className="flex items-center flex-wrap gap-3">
          <label className="inline-flex items-center space-x-1.5 cursor-pointer text-slate-300 hover:text-white">
            <input
              type="checkbox"
              checked={filterState.hasMcpOnly}
              onChange={(e) =>
                setFilterState({ ...filterState, hasMcpOnly: e.target.checked })
              }
              className="rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-cyan-500 h-3.5 w-3.5"
            />
            <span className="text-cyan-300 font-medium">MCP Supported</span>
          </label>

          <label className="inline-flex items-center space-x-1.5 cursor-pointer text-slate-300 hover:text-white">
            <input
              type="checkbox"
              checked={filterState.hasOpenApiOnly}
              onChange={(e) =>
                setFilterState({ ...filterState, hasOpenApiOnly: e.target.checked })
              }
              className="rounded border-slate-700 bg-slate-800 text-blue-500 focus:ring-blue-500 h-3.5 w-3.5"
            />
            <span>OpenAPI / REST</span>
          </label>

          <label className="inline-flex items-center space-x-1.5 cursor-pointer text-slate-300 hover:text-white">
            <input
              type="checkbox"
              checked={filterState.isMonopolyOnly}
              onChange={(e) =>
                setFilterState({ ...filterState, isMonopolyOnly: e.target.checked })
              }
              className="rounded border-slate-700 bg-slate-800 text-amber-500 focus:ring-amber-500 h-3.5 w-3.5"
            />
            <span className="text-amber-300 font-medium">State Monopoly</span>
          </label>

          <div className="text-slate-400 font-mono text-[11px] bg-slate-800 px-2 py-0.5 rounded">
            Showing {sortedPortals.length} of {portals.length} records
          </div>
        </div>
      </div>

      {/* Main Table View */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-slate-300 text-xs border-collapse">
          <thead>
            <tr className="bg-slate-950/80 text-slate-400 font-semibold uppercase tracking-wider text-[10px] border-b border-slate-800">
              <th
                className="py-3 px-3 cursor-pointer hover:text-white transition-colors"
                onClick={() => toggleSort("name")}
              >
                <div className="flex items-center space-x-1">
                  <span>Institution &amp; Portal</span>
                  {sortField === "name" && (sortOrder === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
                </div>
              </th>

              <th
                className="py-3 px-3 cursor-pointer hover:text-white transition-colors"
                onClick={() => toggleSort("category")}
              >
                <div className="flex items-center space-x-1">
                  <span>Category</span>
                  {sortField === "category" && (sortOrder === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
                </div>
              </th>

              <th className="py-3 px-3 min-w-[140px]">
                <span>Direct Registration Portal</span>
              </th>

              <th className="py-3 px-3 min-w-[200px]">
                <span>C-Level Management Roster</span>
              </th>

              <th className="py-3 px-3 min-w-[120px]">
                <span>Action Utilities</span>
              </th>

              <th className="py-3 px-3">
                <span>API &amp; MCP Connectors</span>
              </th>

              <th className="py-3 px-3">
                <span>Deposit &amp; Standards</span>
              </th>

              <th className="py-3 px-3 text-right">
                <span>Inspect / Actions</span>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800/60">
            {sortedPortals.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-slate-500">
                  <Globe className="h-8 w-8 mx-auto mb-2 text-slate-600" />
                  <p className="text-sm font-medium">No portals match the current search or filters.</p>
                  <p className="text-xs text-slate-600 mt-1">Try resetting the search or category filters.</p>
                </td>
              </tr>
            ) : (
              sortedPortals.map((portal) => {
                const primaryContact =
                  portal.managementContacts?.find((c) => c.isPrimary) ||
                  portal.managementContacts?.[0];

                const hasMcp = portal.apiConnectors?.some((c) => c.mcpCompatible);

                return (
                  <tr
                    key={portal.id}
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    {/* Institution Name & Badges */}
                    <td className="py-3 px-3 font-medium text-white max-w-[220px]">
                      <div className="flex items-start space-x-2">
                        <span className="text-lg leading-none" title={`Country: ${portal.country}`}>
                          {portal.flagEmoji}
                        </span>
                        <div>
                          <div className="font-semibold text-slate-100 flex items-center gap-1.5 flex-wrap">
                            <span
                              onClick={() => onSelectPortal(portal)}
                              className="hover:text-blue-400 cursor-pointer underline-offset-2 hover:underline"
                            >
                              {portal.name}
                            </span>
                            {portal.isStateMonopoly && (
                              <span
                                className="inline-flex items-center px-1.5 py-0.2 text-[9px] font-bold rounded bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                title="Sovereign / State Monopoly Institution"
                              >
                                Monopoly
                              </span>
                            )}
                          </div>

                          <div className="flex items-center space-x-2 text-[10px] text-slate-400 mt-0.5">
                            <span className="font-mono bg-slate-800 px-1 rounded text-slate-300">
                              {portal.code}
                            </span>
                            <span>•</span>
                            <span>{portal.country}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category & Subcategory */}
                    <td className="py-3 px-3">
                      <span className="inline-block px-2 py-0.5 text-[10px] font-semibold rounded bg-blue-900/40 text-blue-300 border border-blue-700/40 max-w-[160px] truncate">
                        {portal.category}
                      </span>
                      <p className="text-[10px] text-slate-400 mt-0.5 truncate max-w-[150px]">
                        {portal.subcategory}
                      </p>
                    </td>

                    {/* Direct Registration Portal URL */}
                    <td className="py-3 px-3">
                      {portal.directRegistrationUrl ? (
                        <a
                          href={portal.directRegistrationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30 transition-all font-medium text-xs shadow-sm hover:scale-[1.02]"
                          title={`Open Direct Onboarding Portal: ${portal.directRegistrationUrl}`}
                        >
                          <ExternalLink className="h-3.5 w-3.5 text-emerald-400" />
                          <span>Direct Onboarding</span>
                        </a>
                      ) : (
                        <span className="text-slate-500 text-[11px] italic">Via Main Site</span>
                      )}
                    </td>

                    {/* C-Level Management Roster */}
                    <td className="py-3 px-3">
                      {primaryContact ? (
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="truncate max-w-[150px]">
                              <span className="font-semibold text-slate-200">
                                {primaryContact.name}
                              </span>
                              <p className="text-[10px] text-slate-400 truncate">
                                {primaryContact.role}
                              </p>
                            </div>
                          </div>

                          {/* Action icons for primary contact */}
                          <div className="flex items-center space-x-1 text-[10px]">
                            {primaryContact.phone && (
                              <button
                                onClick={() =>
                                  onTriggerCommunication("Call", portal, primaryContact)
                                }
                                className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded bg-slate-800 text-indigo-300 hover:bg-indigo-600 hover:text-white transition-colors cursor-pointer"
                                title={`Call ${primaryContact.phone}`}
                              >
                                <Phone className="h-3 w-3 text-indigo-400" />
                                <span>Call</span>
                              </button>
                            )}

                            {primaryContact.email && (
                              <button
                                onClick={() =>
                                  onTriggerCommunication("Email", portal, primaryContact)
                                }
                                className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded bg-slate-800 text-sky-300 hover:bg-sky-600 hover:text-white transition-colors cursor-pointer"
                                title={`Email ${primaryContact.email}`}
                              >
                                <Mail className="h-3 w-3 text-sky-400" />
                                <span>Email</span>
                              </button>
                            )}

                            {primaryContact.fax && (
                              <button
                                onClick={() =>
                                  onTriggerCommunication("Fax", portal, primaryContact)
                                }
                                className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded bg-slate-800 text-purple-300 hover:bg-purple-600 hover:text-white transition-colors cursor-pointer"
                                title={`Send Fax to ${primaryContact.fax}`}
                              >
                                <Printer className="h-3 w-3 text-purple-400" />
                                <span>Fax</span>
                              </button>
                            )}
                          </div>
                        </div>
                      ) : (
                        <span className="text-slate-500 text-[11px] italic">Contact Dept.</span>
                      )}
                    </td>

                    {/* General Portal Action Utilities */}
                    <td className="py-3 px-3">
                      <div className="flex flex-col space-y-1">
                        <button
                          onClick={() => onTriggerCommunication("Call", portal)}
                          className="inline-flex items-center space-x-1 text-[11px] text-slate-300 hover:text-indigo-400 transition-colors"
                        >
                          <Phone className="h-3 w-3 text-indigo-400" />
                          <span className="font-mono text-[10px]">{portal.generalPhone}</span>
                        </button>

                        <button
                          onClick={() => onTriggerCommunication("Email", portal)}
                          className="inline-flex items-center space-x-1 text-[11px] text-slate-300 hover:text-sky-400 transition-colors"
                        >
                          <Mail className="h-3 w-3 text-sky-400" />
                          <span className="truncate max-w-[110px] text-[10px]">{portal.generalEmail}</span>
                        </button>

                        {portal.generalFax && (
                          <button
                            onClick={() => onTriggerCommunication("Fax", portal)}
                            className="inline-flex items-center space-x-1 text-[11px] text-slate-300 hover:text-purple-400 transition-colors"
                          >
                            <Printer className="h-3 w-3 text-purple-400" />
                            <span className="font-mono text-[10px]">{portal.generalFax}</span>
                          </button>
                        )}
                      </div>
                    </td>

                    {/* API & MCP Connectors */}
                    <td className="py-3 px-3">
                      <div className="space-y-1">
                        {portal.apiConnectors?.map((conn, i) => (
                          <div key={i} className="flex items-center space-x-1.5">
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-800 text-slate-200 border border-slate-700">
                              {conn.protocol}
                            </span>

                            {conn.mcpCompatible && (
                              <button
                                onClick={() => onOpenMcpSpec(portal)}
                                className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-900 transition-all text-[9px] font-bold cursor-pointer"
                                title="Open MCP Server Config"
                              >
                                <Cpu className="h-2.5 w-2.5 text-cyan-400" />
                                <span>MCP Server</span>
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Deposit Capacity & Standards */}
                    <td className="py-3 px-3">
                      <div>
                        <div className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 text-[10px] font-semibold">
                          <HardDrive className="h-3 w-3 text-emerald-400" />
                          <span>{portal.depositCapacity}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {portal.metadataStandards?.slice(0, 2).map((std) => (
                            <span
                              key={std}
                              className="text-[9px] text-slate-400 bg-slate-800 px-1 py-0.2 rounded"
                            >
                              {std}
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>

                    {/* Action Inspector Buttons */}
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <button
                          onClick={() => onSelectPortal(portal)}
                          className="p-1.5 rounded bg-slate-800 text-slate-300 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
                          title="View Portal Dossier"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>

                        <button
                          onClick={() => onDeletePortal(portal.id)}
                          className="p-1.5 rounded bg-slate-800 text-slate-400 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                          title="Delete Portal from Local Archive"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
