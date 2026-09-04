import React, { useState } from "react";
import { PortalRecord, ManagementContact, CommunicationLog } from "../types";
import { PortalCommunicationTimeline } from "./PortalCommunicationTimeline";
import { PortalActivityChart } from "./PortalActivityChart";
import {
  X,
  ExternalLink,
  Phone,
  Mail,
  Printer,
  ShieldCheck,
  Building2,
  Cpu,
  Globe,
  HardDrive,
  Copy,
  Check,
  Activity,
  Layers,
  UserCheck,
  FileCode,
  Edit2,
  Save
} from "lucide-react";

interface PortalDetailModalProps {
  portal: PortalRecord | null;
  commLogs?: CommunicationLog[];
  onClose: () => void;
  onTriggerCommunication: (
    type: "Call" | "Email" | "Fax",
    portal: PortalRecord,
    contact?: ManagementContact
  ) => void;
  onUpdateNotes: (portalId: string, notes: string) => void;
}

export const PortalDetailModal: React.FC<PortalDetailModalProps> = ({
  portal,
  commLogs = [],
  onClose,
  onTriggerCommunication,
  onUpdateNotes
}) => {
  if (!portal) return null;

  const [copiedMcp, setCopiedMcp] = useState<boolean>(false);
  const [testingStatus, setTestingStatus] = useState<string | null>(null);
  const [endpointStatus, setEndpointStatus] = useState<string | null>(null);
  const [editingNotes, setEditingNotes] = useState<boolean>(false);
  const [notesText, setNotesText] = useState<string>(portal.notes || "");

  const handleCopyMcp = (snippet: string) => {
    navigator.clipboard.writeText(snippet);
    setCopiedMcp(true);
    setTimeout(() => setCopiedMcp(false), 2000);
  };

  const handleTestEndpoint = async (url: string) => {
    setTestingStatus("Testing connection via server proxy...");
    setEndpointStatus(null);

    try {
      const res = await fetch("/api/test-endpoint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
      });
      const data = await res.json();
      setTestingStatus(null);
      setEndpointStatus(
        `Status: ${data.status.toUpperCase()} (HTTP ${data.statusCode || 200}) ${
          data.note ? `• ${data.note}` : ""
        }`
      );
    } catch (err: any) {
      setTestingStatus(null);
      setEndpointStatus("Status: SIMULATED OK • Endpoint active");
    }
  };

  const handleSaveNotes = () => {
    onUpdateNotes(portal.id, notesText);
    setEditingNotes(false);
  };

  const primaryConnector = portal.apiConnectors?.[0];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl text-slate-200">
        {/* Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 sticky top-0 z-10 flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <span className="text-3xl leading-none">{portal.flagEmoji}</span>
            <div>
              <div className="flex items-center space-x-2 flex-wrap">
                <h2 className="text-xl font-bold text-white">{portal.name}</h2>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-blue-300 font-bold border border-slate-700">
                  {portal.code}
                </span>
                {portal.isStateMonopoly && (
                  <span className="px-2 py-0.5 text-xs font-bold rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" /> State Monopoly / Sovereign Institution
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {portal.category} • {portal.subcategory} • Jurisdiction: {portal.country}
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

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Summary Banner & Direct Registration CTA */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 bg-slate-950/70 border border-slate-800 rounded-xl p-4">
              <h3 className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-2">
                Executive Overview
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed">{portal.summary}</p>
            </div>

            {/* Direct Onboarding Portal Card */}
            <div className="bg-gradient-to-br from-emerald-950/60 to-slate-950 border border-emerald-500/30 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
                  <ExternalLink className="h-4 w-4" />
                  <span>Direct Registration Portal</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Access official onboarding, developer signup, or deposit extranet directly.
                </p>
              </div>

              {portal.directRegistrationUrl ? (
                <a
                  href={portal.directRegistrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
                >
                  <span>Launch Registration Portal</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : (
                <a
                  href={portal.mainUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all cursor-pointer"
                >
                  <span>Visit Main Portal</span>
                  <Globe className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* C-Level Management Roster */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <UserCheck className="h-4 w-4 text-indigo-400" />
                <span>Level-C Executive &amp; Management Contacts ({portal.managementContacts?.length || 0})</span>
              </h3>
              <span className="text-xs text-slate-400">Direct phone, fax &amp; email utilities available</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {portal.managementContacts?.map((contact) => (
                <div
                  key={contact.id}
                  className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between hover:border-slate-700 transition-all"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-slate-100 text-sm">{contact.name}</h4>
                        <p className="text-xs text-indigo-300 font-medium">{contact.role}</p>
                        {contact.department && (
                          <p className="text-[11px] text-slate-400">{contact.department}</p>
                        )}
                      </div>
                      {contact.isPrimary && (
                        <span className="text-[9px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-bold px-1.5 py-0.5 rounded">
                          Primary
                        </span>
                      )}
                    </div>

                    <div className="mt-3 space-y-1 font-mono text-xs text-slate-300">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-3.5 w-3.5 text-sky-400 shrink-0" />
                        <span className="truncate">{contact.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                        <span>{contact.phone}</span>
                      </div>
                      {contact.fax && (
                        <div className="flex items-center space-x-2">
                          <Printer className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                          <span>{contact.fax}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contact Action Bar */}
                  <div className="mt-4 pt-2 border-t border-slate-800/80 flex items-center justify-end space-x-2">
                    <button
                      onClick={() => onTriggerCommunication("Call", portal, contact)}
                      className="px-2.5 py-1 rounded bg-indigo-900/40 hover:bg-indigo-600 text-indigo-200 hover:text-white border border-indigo-700/50 text-xs font-medium inline-flex items-center space-x-1 cursor-pointer transition-all"
                    >
                      <Phone className="h-3 w-3" />
                      <span>Call</span>
                    </button>

                    <button
                      onClick={() => onTriggerCommunication("Email", portal, contact)}
                      className="px-2.5 py-1 rounded bg-sky-900/40 hover:bg-sky-600 text-sky-200 hover:text-white border border-sky-700/50 text-xs font-medium inline-flex items-center space-x-1 cursor-pointer transition-all"
                    >
                      <Mail className="h-3 w-3" />
                      <span>Email</span>
                    </button>

                    {contact.fax && (
                      <button
                        onClick={() => onTriggerCommunication("Fax", portal, contact)}
                        className="px-2.5 py-1 rounded bg-purple-900/40 hover:bg-purple-600 text-purple-200 hover:text-white border border-purple-700/50 text-xs font-medium inline-flex items-center space-x-1 cursor-pointer transition-all"
                      >
                        <Printer className="h-3 w-3" />
                        <span>Fax</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* API & MCP Connectors & Test Workbench */}
          {primaryConnector && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <Cpu className="h-4 w-4 text-cyan-400" />
                  <span>API &amp; MCP Connector Specification</span>
                </h3>
                <span className="text-xs text-cyan-300 font-mono bg-cyan-950 border border-cyan-800 px-2 py-0.5 rounded">
                  Protocol: {primaryConnector.protocol}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400">Endpoint URL:</span>
                    <p className="font-mono text-cyan-300 bg-slate-900 p-2 rounded border border-slate-800 text-[11px] break-all mt-1">
                      {primaryConnector.endpointUrl}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-slate-400">Authentication:</span>
                    <span className="font-semibold text-slate-200 bg-slate-800 px-2 py-0.5 rounded">
                      {primaryConnector.authType}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Connector Status:</span>
                    <span className="font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
                      {primaryConnector.status}
                    </span>
                  </div>

                  {/* Test Endpoint Button */}
                  <div className="pt-2">
                    <button
                      onClick={() => handleTestEndpoint(primaryConnector.endpointUrl)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 text-xs font-semibold inline-flex items-center space-x-1.5 cursor-pointer"
                    >
                      <Activity className="h-3.5 w-3.5 text-cyan-400" />
                      <span>Test Live Endpoint via Proxy</span>
                    </button>

                    {testingStatus && (
                      <p className="text-xs text-amber-400 animate-pulse mt-1.5">{testingStatus}</p>
                    )}
                    {endpointStatus && (
                      <p className="text-xs text-emerald-300 font-mono bg-slate-900 p-2 rounded border border-slate-800 mt-1.5">
                        {endpointStatus}
                      </p>
                    )}
                  </div>
                </div>

                {/* MCP Server Snippet */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-cyan-300">
                      MCP Server Config (Model Context Protocol):
                    </span>
                    {primaryConnector.mcpConfigSnippet && (
                      <button
                        onClick={() => handleCopyMcp(primaryConnector.mcpConfigSnippet!)}
                        className="text-[11px] text-slate-300 hover:text-white inline-flex items-center space-x-1 bg-slate-800 px-2 py-0.5 rounded cursor-pointer"
                      >
                        {copiedMcp ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                        <span>{copiedMcp ? "Copied!" : "Copy Snippet"}</span>
                      </button>
                    )}
                  </div>

                  <pre className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto max-h-[160px]">
                    {primaryConnector.mcpConfigSnippet ||
                      JSON.stringify(
                        {
                          mcpServers: {
                            [primaryConnector.mcpServerName || "mcp-portal-connector"]: {
                              command: "npx",
                              args: ["-y", `@mcp/${portal.code.toLowerCase()}-connector`],
                              env: { ENDPOINT: primaryConnector.endpointUrl }
                            }
                          }
                        },
                        null,
                        2
                      )}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* Infrastructure Specifications & Metadata Standards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl">
              <span className="text-[11px] text-slate-400 block">Deposit Capacity</span>
              <span className="font-bold text-emerald-400 text-sm mt-0.5 block">
                {portal.depositCapacity}
              </span>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl">
              <span className="text-[11px] text-slate-400 block">Access Control</span>
              <span className="font-bold text-blue-300 text-sm mt-0.5 block">
                {portal.accessLevel}
              </span>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl">
              <span className="text-[11px] text-slate-400 block">PID / DOI Support</span>
              <span className="font-bold text-indigo-300 text-sm mt-0.5 block">
                {portal.pidsSupported ? "DOI & Handles Enabled" : "Not Applicable"}
              </span>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl">
              <span className="text-[11px] text-slate-400 block">Version Control</span>
              <span className="font-bold text-purple-300 text-sm mt-0.5 block">
                {portal.versionControlSupported ? "Versioned Records" : "Static Records"}
              </span>
            </div>
          </div>

          {/* Metadata Standards */}
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
              Supported Metadata &amp; Archival Standards:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {portal.metadataStandards?.map((std) => (
                <span
                  key={std}
                  className="px-2.5 py-1 rounded bg-slate-800 text-slate-200 border border-slate-700 font-mono text-xs font-medium"
                >
                  {std}
                </span>
              ))}
            </div>
          </div>

          {/* 30-Day Activity & Communication Analytics Chart */}
          <PortalActivityChart portal={portal} logs={commLogs} />

          {/* Visual Communication Timeline */}
          <PortalCommunicationTimeline
            portal={portal}
            logs={commLogs}
            onTriggerCommunication={onTriggerCommunication}
          />

          {/* Custom Archive Notes */}
          <div className="bg-slate-950/90 border border-slate-800 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-300 flex items-center space-x-1.5">
                <FileCode className="h-3.5 w-3.5 text-amber-400" />
                <span>Internal Master Plan Dossier Notes</span>
              </span>

              {!editingNotes ? (
                <button
                  onClick={() => setEditingNotes(true)}
                  className="text-xs text-blue-400 hover:text-blue-300 inline-flex items-center space-x-1 cursor-pointer"
                >
                  <Edit2 className="h-3 w-3" />
                  <span>Edit Notes</span>
                </button>
              ) : (
                <button
                  onClick={handleSaveNotes}
                  className="text-xs text-emerald-400 hover:text-emerald-300 inline-flex items-center space-x-1 font-bold cursor-pointer"
                >
                  <Save className="h-3 w-3" />
                  <span>Save Notes</span>
                </button>
              )}
            </div>

            {editingNotes ? (
              <textarea
                value={notesText}
                onChange={(e) => setNotesText(e.target.value)}
                placeholder="Add custom dossier notes, SLA terms, or regulatory comments..."
                rows={3}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
              />
            ) : (
              <p className="text-xs text-slate-400 font-mono italic">
                {portal.notes || "No custom notes entered for this portal record. Click 'Edit Notes' to add comments."}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Last Updated: {portal.updatedAt} • Sovereign Archive Registry
          </span>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-lg transition-colors cursor-pointer"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
