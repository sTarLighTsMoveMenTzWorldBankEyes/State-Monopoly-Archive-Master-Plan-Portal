import React, { useState } from "react";
import { PortalRecord, PortalCategory, DepositCapacity } from "../types";
import { X, PlusCircle, Building2, Phone, Mail, Printer, ExternalLink, ShieldCheck } from "lucide-react";

interface AddPortalModalProps {
  onClose: () => void;
  onAddPortal: (portal: PortalRecord) => void;
}

export const AddPortalModal: React.FC<AddPortalModalProps> = ({ onClose, onAddPortal }) => {
  const [name, setName] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [country, setCountry] = useState<string>("DE");
  const [category, setCategory] = useState<PortalCategory>("OPEN BANKING / OPEN FINANCE");
  const [subcategory, setSubcategory] = useState<string>("Sovereign Infrastructure");
  const [summary, setSummary] = useState<string>("");
  const [mainUrl, setMainUrl] = useState<string>("");
  const [directRegistrationUrl, setDirectRegistrationUrl] = useState<string>("");
  const [generalPhone, setGeneralPhone] = useState<string>("");
  const [generalFax, setGeneralFax] = useState<string>("");
  const [generalEmail, setGeneralEmail] = useState<string>("");

  // Executive Contact
  const [contactName, setContactName] = useState<string>("");
  const [contactRole, setContactRole] = useState<string>("Chief Executive Officer");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [contactPhone, setContactPhone] = useState<string>("");
  const [contactFax, setContactFax] = useState<string>("");

  const [depositCapacity, setDepositCapacity] = useState<DepositCapacity>("M (20GB-1TB)");
  const [isStateMonopoly, setIsStateMonopoly] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !category) return;

    const newRecord: PortalRecord = {
      id: `portal-custom-${Date.now()}`,
      name,
      code: code || name.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 8),
      country,
      flagEmoji: country === "US" ? "🇺🇸" : country === "DE" ? "🇩🇪" : country === "SE" ? "🇸🇪" : "🇪🇺",
      category,
      subcategory,
      summary: summary || `${name} portal registration and API connector entry.`,
      mainUrl: mainUrl || "https://data.europa.eu",
      directRegistrationUrl,
      generalEmail: generalEmail || contactEmail || "info@portal.gov",
      generalPhone: generalPhone || contactPhone || "+49 30 000000",
      generalFax: generalFax || contactFax || "",
      managementContacts: contactName
        ? [
            {
              id: `c-custom-${Date.now()}`,
              name: contactName,
              role: contactRole,
              email: contactEmail || generalEmail,
              phone: contactPhone || generalPhone,
              fax: contactFax || generalFax,
              isPrimary: true
            }
          ]
        : [],
      apiConnectors: [
        {
          protocol: "OpenAPI v3",
          endpointUrl: `${mainUrl || "https://api.portal.gov"}/v1`,
          documentationUrl: mainUrl,
          authType: "OAuth 2.0",
          status: "Online / Production",
          mcpCompatible: true,
          mcpServerName: `mcp-${name.toLowerCase().replace(/[^a-z]/g, "")}`
        }
      ],
      depositCapacity,
      metadataStandards: ["Dublin Core", "OpenAPI 3.0", "DataCite"],
      accessLevel: "Registration Required",
      isStateMonopoly,
      versionControlSupported: true,
      pidsSupported: true,
      updatedAt: new Date().toISOString().split("T")[0]
    };

    onAddPortal(newRecord);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full shadow-2xl text-slate-200 overflow-hidden my-6">
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <PlusCircle className="h-5 w-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Add Portal to Master Plan Archive</h3>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Institution Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Deutsche Bundesbank"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Portal Code / Abbreviation
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. BUBA-STAT"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white font-mono focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as PortalCategory)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="OPEN BANKING / OPEN FINANCE">Open Banking &amp; Open Finance</option>
                <option value="DLT-TSS & TRUST SERVICES">DLT-TSS &amp; Trust Services</option>
                <option value="INFRASTRUCTURE & RESEARCH FEDERATIONS">
                  Infrastructure &amp; Research Federations
                </option>
                <option value="INSTITUTIONAL & GOVERNMENT REPOSITORIES">
                  Institutional Repositories
                </option>
                <option value="STATE MONOPOLY & CENTRAL BANKS">
                  State Monopoly &amp; Central Banks
                </option>
                <option value="DEFENCE, SECURITY & MILITARY NODES">
                  Defence, Security &amp; Military Nodes
                </option>
                <option value="API & MCP CONNECTORS HUB">API &amp; MCP Connectors Hub</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Country / Jurisdiction</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="DE, EU, US, CH..."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Capacity</label>
              <select
                value={depositCapacity}
                onChange={(e) => setDepositCapacity(e.target.value as DepositCapacity)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="S (<20GB)">S (&lt;20GB)</option>
                <option value="M (20GB-1TB)">M (20GB-1TB)</option>
                <option value="L (>1TB)">L (&gt;1TB Multi-TB)</option>
                <option value="Unlimited">Unlimited</option>
                <option value="N/A (API Only)">N/A (API Only)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Direct Registration Portal URL *
            </label>
            <input
              type="url"
              value={directRegistrationUrl}
              onChange={(e) => setDirectRegistrationUrl(e.target.value)}
              placeholder="https://portal.gov/register or https://b2share.eudat.eu/signup"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-emerald-300 font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Summary</label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Brief description of the portal capabilities and state role..."
              rows={2}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* C-Level Executive Section */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-indigo-300 block">
              Level-C Executive Contact Information
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Full Name (e.g. Dr. Andreas Müller)"
                className="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white"
              />
              <input
                type="text"
                value={contactRole}
                onChange={(e) => setContactRole(e.target.value)}
                placeholder="Role (e.g. Chief Executive Officer)"
                className="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white"
              />
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="Direct Email Address"
                className="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-sky-300 font-mono"
              />
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="Direct Telephone Number"
                className="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-indigo-300 font-mono"
              />
              <input
                type="text"
                value={contactFax}
                onChange={(e) => setContactFax(e.target.value)}
                placeholder="Direct Telefax Number"
                className="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-purple-300 font-mono"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-1">
            <input
              type="checkbox"
              id="chk-monopoly"
              checked={isStateMonopoly}
              onChange={(e) => setIsStateMonopoly(e.target.checked)}
              className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500 h-4 w-4"
            />
            <label htmlFor="chk-monopoly" className="text-xs font-medium text-amber-300">
              State Monopoly / Sovereign Institution
            </label>
          </div>

          <div className="pt-3 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
            >
              Add Record to Master Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
