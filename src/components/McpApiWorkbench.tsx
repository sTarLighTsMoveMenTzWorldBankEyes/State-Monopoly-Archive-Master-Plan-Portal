import React, { useState } from "react";
import { PortalRecord } from "../types";
import {
  X,
  Cpu,
  Layers,
  Copy,
  Check,
  Download,
  Code,
  FileJson,
  CheckSquare,
  Square,
  ShieldCheck,
  Zap,
  Globe
} from "lucide-react";

interface McpApiWorkbenchProps {
  portals: PortalRecord[];
  onClose: () => void;
}

export const McpApiWorkbench: React.FC<McpApiWorkbenchProps> = ({ portals, onClose }) => {
  const [activeTab, setActiveTab] = useState<"connectors" | "openapi_merge" | "mcp_merge">(
    "connectors"
  );

  // Selected portals for merge
  const [selectedPortalIds, setSelectedPortalIds] = useState<string[]>(
    portals.slice(0, 8).map((p) => p.id)
  );

  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const toggleSelectPortal = (id: string) => {
    if (selectedPortalIds.includes(id)) {
      setSelectedPortalIds(selectedPortalIds.filter((p) => p !== id));
    } else {
      setSelectedPortalIds([...selectedPortalIds, id]);
    }
  };

  const selectAllPortals = () => {
    setSelectedPortalIds(portals.map((p) => p.id));
  };

  const deselectAllPortals = () => {
    setSelectedPortalIds([]);
  };

  // Generate Merged Master Plan OpenAPI 3.0 Spec
  const generateMergedOpenApi = () => {
    const selected = portals.filter((p) => selectedPortalIds.includes(p.id));

    const paths: Record<string, any> = {};

    selected.forEach((p) => {
      p.apiConnectors?.forEach((conn) => {
        const basePath = `/api/v1/${p.code.toLowerCase()}`;
        paths[`${basePath}/status`] = {
          get: {
            summary: `Health & Status endpoint for ${p.name}`,
            description: p.summary,
            tags: [p.category],
            operationId: `getStatus_${p.code}`,
            responses: {
              "200": {
                description: "Successful status response",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        institution: { type: "string", example: p.name },
                        status: { type: "string", example: conn.status },
                        protocol: { type: "string", example: conn.protocol },
                        directRegistrationUrl: { type: "string", example: p.directRegistrationUrl }
                      }
                    }
                  }
                }
              }
            }
          }
        };

        paths[`${basePath}/data`] = {
          get: {
            summary: `Primary Data Query for ${p.name}`,
            description: `Connects to endpoint ${conn.endpointUrl}`,
            tags: [p.category],
            operationId: `queryData_${p.code}`,
            parameters: [
              { name: "query", in: "query", required: false, schema: { type: "string" } },
              { name: "limit", in: "query", required: false, schema: { type: "integer", default: 100 } }
            ],
            responses: {
              "200": {
                description: "Data records",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        records: { type: "array", items: { type: "object" } },
                        depositCapacity: { type: "string", example: p.depositCapacity }
                      }
                    }
                  }
                }
              }
            }
          }
        };
      });
    });

    const masterOpenApi = {
      openapi: "3.0.3",
      info: {
        title: "Sovereign Master Plan Merged OpenAPI Portal",
        version: "2.5.0",
        description: "Unified master API specification merging sovereign, monopoly, open banking, and research federation endpoints."
      },
      servers: [
        {
          url: "https://api.masterplan.gov/v1",
          description: "Sovereign Unified Master Plan Gateway"
        }
      ],
      tags: Array.from(new Set(selected.map((p) => p.category))).map((cat) => ({
        name: cat,
        description: `Endpoints for sector ${cat}`
      })),
      paths
    };

    return JSON.stringify(masterOpenApi, null, 2);
  };

  // Generate Merged MCP Servers Configuration File
  const generateMergedMcpConfig = () => {
    const selected = portals.filter((p) => selectedPortalIds.includes(p.id));

    const mcpServers: Record<string, any> = {};

    selected.forEach((p) => {
      p.apiConnectors?.forEach((conn) => {
        if (conn.mcpCompatible) {
          const serverName =
            conn.mcpServerName || `mcp-${p.code.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;

          if (conn.mcpConfigSnippet) {
            try {
              const parsed = JSON.parse(conn.mcpConfigSnippet);
              if (parsed.command) {
                mcpServers[serverName] = parsed;
              } else if (parsed.mcpServers) {
                Object.assign(mcpServers, parsed.mcpServers);
              }
            } catch {
              mcpServers[serverName] = {
                command: "npx",
                args: ["-y", `@mcp/${p.code.toLowerCase()}-connector`],
                env: {
                  ENDPOINT_URL: conn.endpointUrl,
                  PORTAL_NAME: p.name
                }
              };
            }
          } else {
            mcpServers[serverName] = {
              command: "npx",
              args: ["-y", `@mcp/${p.code.toLowerCase()}-connector`],
              env: {
                ENDPOINT_URL: conn.endpointUrl,
                PORTAL_NAME: p.name
              }
            };
          }
        }
      });
    });

    return JSON.stringify({ mcpServers }, null, 2);
  };

  const handleCopyText = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const mergedOpenApiJson = generateMergedOpenApi();
  const mergedMcpConfigJson = generateMergedMcpConfig();

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl text-slate-200">
        {/* Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Cpu className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <span>API &amp; MCP Connector Workbench</span>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold border border-cyan-500/30">
                  OpenAPI 3.0 &amp; Model Context Protocol
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Inspect connectors, test endpoints, and merge multiple portal specs into a unified Master Plan spec.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-slate-950/60 border-b border-slate-800 px-5 pt-3 flex items-center space-x-2 shrink-0">
          <button
            onClick={() => setActiveTab("connectors")}
            className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-all cursor-pointer ${
              activeTab === "connectors"
                ? "bg-slate-900 text-cyan-300 border-t-2 border-cyan-400 border-x border-slate-800"
                : "text-slate-400 hover:text-white"
            }`}
          >
            All Active Connectors Roster ({portals.length})
          </button>

          <button
            onClick={() => setActiveTab("openapi_merge")}
            className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-all cursor-pointer ${
              activeTab === "openapi_merge"
                ? "bg-slate-900 text-blue-300 border-t-2 border-blue-400 border-x border-slate-800"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Merged OpenAPI 3.0 Spec Generator
          </button>

          <button
            onClick={() => setActiveTab("mcp_merge")}
            className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-all cursor-pointer ${
              activeTab === "mcp_merge"
                ? "bg-slate-900 text-emerald-300 border-t-2 border-emerald-400 border-x border-slate-800"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Master MCP Config (claude_desktop_config.json)
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {/* TAB 1: ALL CONNECTORS ROSTER */}
          {activeTab === "connectors" && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {portals.map((portal) => (
                  <div
                    key={portal.id}
                    className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 hover:border-slate-700 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <span>{portal.flagEmoji}</span>
                        <div>
                          <h4 className="font-bold text-xs text-slate-100">{portal.name}</h4>
                          <span className="font-mono text-[10px] text-cyan-300 bg-slate-900 px-1.5 py-0.5 rounded">
                            {portal.code}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-semibold">{portal.category}</span>
                    </div>

                    <div className="mt-3 space-y-1.5">
                      {portal.apiConnectors?.map((conn, idx) => (
                        <div
                          key={idx}
                          className="bg-slate-900 p-2 rounded border border-slate-800/80 text-[11px] font-mono flex items-center justify-between"
                        >
                          <div>
                            <span className="text-cyan-400 font-bold">{conn.protocol}</span>
                            <span className="text-slate-500 mx-1">•</span>
                            <span className="text-slate-300">{conn.authType}</span>
                          </div>

                          <div className="flex items-center space-x-1">
                            {conn.mcpCompatible && (
                              <span className="px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-[9px]">
                                MCP Ready
                              </span>
                            )}
                            <span className="px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[9px]">
                              {conn.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2 & TAB 3: MERGED OPENAPI / MCP CONFIG GENERATOR */}
          {(activeTab === "openapi_merge" || activeTab === "mcp_merge") && (
            <div className="space-y-4">
              {/* Portal Selector Strip */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-300">
                    Select Portals to Include in Master Merged Specification ({selectedPortalIds.length}/{portals.length}):
                  </span>

                  <div className="space-x-2">
                    <button
                      onClick={selectAllPortals}
                      className="text-[11px] text-blue-400 hover:underline"
                    >
                      Select All
                    </button>
                    <button
                      onClick={deselectAllPortals}
                      className="text-[11px] text-slate-400 hover:underline"
                    >
                      Deselect All
                    </button>
                  </div>
                </div>

                <div className="flex items-center flex-wrap gap-2 max-h-[110px] overflow-y-auto pt-1">
                  {portals.map((portal) => {
                    const isSelected = selectedPortalIds.includes(portal.id);
                    return (
                      <button
                        key={portal.id}
                        onClick={() => toggleSelectPortal(portal.id)}
                        className={`px-2.5 py-1 rounded text-xs font-medium inline-flex items-center space-x-1.5 transition-all cursor-pointer ${
                          isSelected
                            ? "bg-blue-600 text-white shadow-sm font-semibold"
                            : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
                        }`}
                      >
                        {isSelected ? <CheckSquare className="h-3 w-3" /> : <Square className="h-3 w-3" />}
                        <span>{portal.flagEmoji} {portal.code}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Code Preview & Actions */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 font-mono">
                    {activeTab === "openapi_merge"
                      ? "MasterPlan_Merged_OpenAPI_v3.json"
                      : "claude_desktop_config.json"}
                  </span>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        handleCopyText(
                          activeTab === "openapi_merge" ? mergedOpenApiJson : mergedMcpConfigJson
                        )
                      }
                      className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold inline-flex items-center space-x-1 cursor-pointer"
                    >
                      {copiedCode ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copiedCode ? "Copied!" : "Copy JSON"}</span>
                    </button>

                    <button
                      onClick={() =>
                        handleDownloadFile(
                          activeTab === "openapi_merge" ? mergedOpenApiJson : mergedMcpConfigJson,
                          activeTab === "openapi_merge"
                            ? "MasterPlan_Merged_OpenAPI_v3.json"
                            : "claude_desktop_config.json"
                        )
                      }
                      className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold inline-flex items-center space-x-1 shadow-md cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download JSON File</span>
                    </button>
                  </div>
                </div>

                <pre className="bg-slate-900 p-4 rounded-lg border border-slate-800 font-mono text-[11px] text-cyan-300 max-h-[380px] overflow-y-auto leading-relaxed">
                  {activeTab === "openapi_merge" ? mergedOpenApiJson : mergedMcpConfigJson}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-400">
            Model Context Protocol v1.0 • OpenAPI 3.0 Standardized Gateway
          </span>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-lg transition-colors cursor-pointer"
          >
            Close Workbench
          </button>
        </div>
      </div>
    </div>
  );
};
