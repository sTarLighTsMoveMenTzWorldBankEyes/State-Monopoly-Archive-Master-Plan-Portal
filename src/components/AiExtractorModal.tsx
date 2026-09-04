import React, { useState } from "react";
import { PortalRecord } from "../types";
import { Sparkles, X, Loader2, AlertCircle, CheckCircle2, Globe, FileText, ArrowRight } from "lucide-react";

interface AiExtractorModalProps {
  onClose: () => void;
  onAddExtractedPortal: (portal: PortalRecord) => void;
}

export const AiExtractorModal: React.FC<AiExtractorModalProps> = ({
  onClose,
  onAddExtractedPortal
}) => {
  const [inputText, setInputText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [extractedResult, setExtractedResult] = useState<PortalRecord | null>(null);

  const handleRunAiParse = async () => {
    if (!inputText.trim()) {
      setErrorMsg("Please enter text, raw contact information, or a portal URL to analyze.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setExtractedResult(null);

    try {
      const response = await fetch("/api/gemini/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: inputText })
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.error || "Failed to parse portal content");
      }

      const data = json.data;

      const newPortal: PortalRecord = {
        id: `ai-portal-${Date.now()}`,
        name: data.name || "Parsed Sovereign Portal",
        code: (data.name || "CUSTOM").toUpperCase().replace(/[^A-Z]/g, "").slice(0, 8) || "AI-PARSED",
        country: data.country || "EU",
        flagEmoji: data.country === "US" ? "🇺🇸" : data.country === "DE" ? "🇩🇪" : "🇪🇺",
        category: data.category || "API & MCP CONNECTORS HUB",
        subcategory: "AI Scraped Portal",
        summary: data.summary || "Automatically extracted portal record generated via Gemini AI.",
        mainUrl: inputText.startsWith("http") ? inputText : "https://data.europa.eu",
        directRegistrationUrl: data.directRegistrationUrl || "",
        documentationUrl: data.documentationUrl || "",
        generalEmail: data.emailAddresses?.[0] || data.contacts?.[0]?.email || "contact@portal.gov",
        generalPhone: data.phoneNumbers?.[0] || data.contacts?.[0]?.phone || "+1 555 0100",
        generalFax: data.faxNumbers?.[0] || data.contacts?.[0]?.fax || "",
        managementContacts: (data.contacts || []).map((c: any, i: number) => ({
          id: `c-ai-${i}`,
          name: c.name || "Executive Officer",
          role: c.role || "Director",
          email: c.email || "officer@portal.gov",
          phone: c.phone || "+1 555 0100",
          fax: c.fax || "",
          isPrimary: i === 0
        })),
        apiConnectors: data.apiConnector
          ? [
              {
                protocol: data.apiConnector.type || "OpenAPI v3",
                endpointUrl: data.apiConnector.endpointUrl || "https://api.portal.gov/v1",
                documentationUrl: data.documentationUrl || "",
                authType: data.apiConnector.authType || "OAuth 2.0",
                status: "Online / Production",
                mcpCompatible: Boolean(data.apiConnector.mcpSupported),
                mcpServerName: `mcp-${(data.name || "ai").toLowerCase().replace(/[^a-z]/g, "")}`,
                mcpConfigSnippet: data.apiConnector.mcpServerConfig || ""
              }
            ]
          : [],
        depositCapacity: data.depositCapacity || "M (20GB-1TB)",
        metadataStandards: data.metadataStandards || ["Dublin Core", "OpenAPI 3.0"],
        accessLevel: "Registration Required",
        isStateMonopoly: true,
        versionControlSupported: true,
        pidsSupported: true,
        updatedAt: new Date().toISOString().split("T")[0]
      };

      setExtractedResult(newPortal);
    } catch (err: any) {
      setErrorMsg(err.message || "Error analyzing content with Gemini AI.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmAdd = () => {
    if (extractedResult) {
      onAddExtractedPortal(extractedResult);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-purple-500/30 rounded-2xl max-w-2xl w-full shadow-2xl text-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-purple-950 via-slate-950 to-indigo-950 border-b border-purple-900/40 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-yellow-300 animate-pulse" />
            <h3 className="text-base font-bold text-white">Gemini AI Portal &amp; Contact Extractor</h3>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 space-y-4">
          <p className="text-xs text-slate-300">
            Paste a portal URL, raw text, press release, or C-level contact directory snippet below.
            Gemini AI will parse C-level executives, phone/fax, direct registration URLs, and MCP endpoints!
          </p>

          <div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="e.g. Paste URL: https://openbanking.handelsbanken.com or raw directory text..."
              rows={5}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono"
            />
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-950/80 border border-red-500/40 rounded-xl flex items-center space-x-2 text-red-300 text-xs">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {!extractedResult && (
            <button
              onClick={handleRunAiParse}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 flex items-center justify-center space-x-2 transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-yellow-300" />
                  <span>Gemini AI is analyzing portal &amp; contacts...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 text-yellow-300" />
                  <span>Analyze &amp; Extract Portal Master Record</span>
                </>
              )}
            </button>
          )}

          {/* Extracted Record Preview */}
          {extractedResult && (
            <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/40 space-y-3">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
                <CheckCircle2 className="h-4 w-4" />
                <span>Successfully Extracted Portal Dossier!</span>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Portal Name:</span>
                  <span className="font-bold text-white">{extractedResult.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Category:</span>
                  <span className="text-blue-300">{extractedResult.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Direct Registration URL:</span>
                  <span className="text-emerald-300 font-mono text-[11px] truncate max-w-[220px]">
                    {extractedResult.directRegistrationUrl || "Discovered on main site"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">C-Level Contacts Extracted:</span>
                  <span className="text-indigo-300 font-bold">
                    {extractedResult.managementContacts?.length || 0} Contacts
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center space-x-3">
                <button
                  onClick={handleConfirmAdd}
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg flex items-center justify-center space-x-2 shadow-lg cursor-pointer"
                >
                  <span>Insert into Master Plan Archive</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
