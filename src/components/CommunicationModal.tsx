import React, { useState } from "react";
import { PortalRecord, ManagementContact, CommunicationLog } from "../types";
import {
  X,
  Phone,
  Mail,
  Printer,
  ExternalLink,
  Check,
  Send,
  Download,
  Copy,
  Clock,
  ShieldCheck
} from "lucide-react";

interface CommunicationModalProps {
  type: "Call" | "Email" | "Fax" | null;
  portal: PortalRecord | null;
  selectedContact?: ManagementContact;
  onClose: () => void;
  onLogCommunication: (log: CommunicationLog) => void;
}

export const CommunicationModal: React.FC<CommunicationModalProps> = ({
  type,
  portal,
  selectedContact,
  onClose,
  onLogCommunication
}) => {
  if (!type || !portal) return null;

  const contact = selectedContact || portal.managementContacts?.[0];
  const targetEmail = contact?.email || portal.generalEmail;
  const targetPhone = contact?.phone || portal.generalPhone;
  const targetFax = contact?.fax || portal.generalFax || portal.generalPhone;
  const recipientName = contact ? `${contact.name} (${contact.role})` : `${portal.name} General Registry`;

  // Call State
  const [callStatus, setCallStatus] = useState<"idle" | "ringing" | "connected" | "ended">("idle");
  const [callTimer, setCallTimer] = useState<number>(0);

  // Email State
  const [emailSubject, setEmailSubject] = useState<string>(
    `[State & Monopoly Archive] Registration & Onboarding Enquiry - ${portal.name}`
  );
  const [emailTemplate, setEmailTemplate] = useState<string>("onboarding");
  const [emailBody, setEmailBody] = useState<string>(
    `Dear ${contact ? contact.name : "Management Team"},\n\nWe are writing from the Sovereign Archive & Master Plan Portal regarding ${portal.name}.\n\nWe request formal technical onboarding details for direct registration, API credentials, and Model Context Protocol (MCP) server connectors.\n\nPlease confirm the required credentials or regulatory clearance procedure.\n\nSincerely,\nMaster Plan Operations Team`
  );

  // Fax State
  const [faxRef, setFaxRef] = useState<string>(`FAX-REF-${Date.now().toString().slice(-6)}`);
  const [faxClassification, setFaxClassification] = useState<string>("SOVEREIGN / OFFICIAL");
  const [faxMessage, setFaxMessage] = useState<string>(
    `OFFICIAL TELEFAX TRANSMISSION\n\nTO: ${portal.name}\nATTN: ${recipientName}\nFAX: ${targetFax}\n\nRE: Formal Request for Direct Registration Portal Access and MCP Connector Clearance.\n\nKindly acknowledge receipt and dispatch onboarding documentation.`
  );
  const [faxStatus, setFaxStatus] = useState<"idle" | "sending" | "dispatched">("idle");

  const [copiedText, setCopiedText] = useState<boolean>(false);

  const handleTemplateChange = (tmpl: string) => {
    setEmailTemplate(tmpl);
    if (tmpl === "onboarding") {
      setEmailSubject(`[State & Monopoly Archive] Registration & Onboarding Enquiry - ${portal.name}`);
      setEmailBody(
        `Dear ${contact ? contact.name : "Management Team"},\n\nWe are writing from the Sovereign Archive & Master Plan Portal regarding ${portal.name}.\n\nWe request formal technical onboarding details for direct registration, API credentials, and Model Context Protocol (MCP) server connectors.\n\nPlease confirm the required credentials or regulatory clearance procedure.\n\nSincerely,\nMaster Plan Operations Team`
      );
    } else if (tmpl === "mcp") {
      setEmailSubject(`[MCP Connector Query] Integration with ${portal.code} MCP Server`);
      setEmailBody(
        `Dear ${contact ? contact.name : "API Team"},\n\nWe are configuring Model Context Protocol (MCP) server bindings for ${portal.name}.\n\nCould you please verify your OpenAPI / SDMX endpoint specs and authentication parameters for server-side integration?\n\nKind regards,\nAI Infrastructure Lead`
      );
    } else if (tmpl === "deposit") {
      setEmailSubject(`[Legal & Research Deposit] High-Capacity Data Ingestion - ${portal.name}`);
      setEmailBody(
        `Dear ${contact ? contact.name : "Legal Deposit Division"},\n\nWe are preparing a multi-terabyte dataset deposit matching Dublin Core & DataCite archival standards.\n\nPlease advise if SFTP or automated OAI-PMH harvesting is recommended for this deposit.\n\nBest regards,\nArchival Services`
      );
    }
  };

  // Simulate Call
  const handleSimulateCall = () => {
    setCallStatus("ringing");
    setTimeout(() => {
      setCallStatus("connected");
      onLogCommunication({
        id: `log-${Date.now()}`,
        portalId: portal.id,
        portalName: portal.name,
        type: "Call",
        recipient: `${recipientName} (${targetPhone})`,
        contactRole: contact?.role,
        timestamp: new Date().toLocaleString(),
        status: "Simulated Call"
      });
    }, 2000);
  };

  // Trigger Native Mailto & Log
  const handleSendEmail = () => {
    const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;
    window.open(mailtoUrl, "_blank");

    onLogCommunication({
      id: `log-${Date.now()}`,
      portalId: portal.id,
      portalName: portal.name,
      type: "Email",
      recipient: targetEmail,
      contactRole: contact?.role,
      subject: emailSubject,
      messageSnippet: emailBody.slice(0, 100),
      timestamp: new Date().toLocaleString(),
      status: "Email Sent"
    });

    onClose();
  };

  // Simulate Fax Dispatch
  const handleSendFax = () => {
    setFaxStatus("sending");
    setTimeout(() => {
      setFaxStatus("dispatched");
      onLogCommunication({
        id: `log-${Date.now()}`,
        portalId: portal.id,
        portalName: portal.name,
        type: "Fax",
        recipient: `${recipientName} (FAX: ${targetFax})`,
        contactRole: contact?.role,
        subject: `Fax Ref: ${faxRef}`,
        messageSnippet: faxMessage.slice(0, 100),
        timestamp: new Date().toLocaleString(),
        status: "Fax Dispatched"
      });
    }, 2500);
  };

  const handleCopyBody = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden text-slate-200">
        {/* Modal Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {type === "Call" && <Phone className="h-5 w-5 text-indigo-400" />}
            {type === "Email" && <Mail className="h-5 w-5 text-sky-400" />}
            {type === "Fax" && <Printer className="h-5 w-5 text-purple-400" />}

            <h3 className="text-base font-bold text-white">
              {type} Utility Console — {portal.code}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5">
          {/* Target Info Header */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 mb-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Target Entity:</span>
              <p className="text-xs font-bold text-slate-100">{portal.name}</p>
              <p className="text-[11px] text-indigo-300">Recipient: {recipientName}</p>
            </div>
            <span className="text-xl">{portal.flagEmoji}</span>
          </div>

          {/* ========================================================== */}
          {/* MODE 1: TELEPHONY CALL UTILITY                             */}
          {/* ========================================================== */}
          {type === "Call" && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-indigo-900/40 text-center">
                <span className="text-xs text-slate-400 block">Direct Telephone Line</span>
                <p className="text-2xl font-bold font-mono text-indigo-300 mt-1">{targetPhone}</p>

                {callStatus === "idle" && (
                  <p className="text-xs text-slate-400 mt-2">
                    Click below to trigger native telephone dialer or simulate web call.
                  </p>
                )}

                {callStatus === "ringing" && (
                  <div className="mt-3 flex items-center justify-center space-x-2 text-amber-400 text-xs font-semibold animate-pulse">
                    <Clock className="h-4 w-4" />
                    <span>Dialing Sovereign Exchange...</span>
                  </div>
                )}

                {callStatus === "connected" && (
                  <div className="mt-3 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold p-2.5 rounded-lg flex items-center justify-center space-x-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    <span>Connected to Sovereign Exchange (Simulated Call Logged)</span>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <a
                  href={`tel:${targetPhone.replace(/[^0-9+]/g, "")}`}
                  className="flex-1 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/30 transition-all"
                >
                  <Phone className="h-4 w-4" />
                  <span>Launch Native Call (tel:)</span>
                </a>

                <button
                  onClick={handleSimulateCall}
                  disabled={callStatus !== "idle"}
                  className="flex-1 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-200 font-bold text-xs flex items-center justify-center space-x-2 border border-indigo-500/30 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Phone className="h-4 w-4 text-indigo-400" />
                  <span>Simulate Call &amp; Log</span>
                </button>
              </div>
            </div>
          )}

          {/* ========================================================== */}
          {/* MODE 2: EMAIL COMPOSER UTILITY                             */}
          {/* ========================================================== */}
          {type === "Email" && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Recipient Email Address
                </label>
                <input
                  type="email"
                  value={targetEmail}
                  readOnly
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-sky-300 font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Select Template
                </label>
                <select
                  value={emailTemplate}
                  onChange={(e) => handleTemplateChange(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500"
                >
                  <option value="onboarding">Onboarding &amp; Registration Access Request</option>
                  <option value="mcp">Model Context Protocol (MCP) Binding Query</option>
                  <option value="deposit">High-Capacity Legal &amp; Research Deposit</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Subject</label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-sky-500 font-semibold"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-300">Message Body</label>
                  <button
                    onClick={() => handleCopyBody(emailBody)}
                    className="text-[10px] text-slate-400 hover:text-white inline-flex items-center space-x-1"
                  >
                    {copiedText ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    <span>{copiedText ? "Copied" : "Copy Text"}</span>
                  </button>
                </div>
                <textarea
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  rows={6}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500 font-mono leading-relaxed"
                />
              </div>

              <div className="pt-2 flex items-center space-x-3">
                <button
                  onClick={handleSendEmail}
                  className="flex-1 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-sky-600/30 transition-all cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                  <span>Send via Email Client (mailto) &amp; Log</span>
                </button>
              </div>
            </div>
          )}

          {/* ========================================================== */}
          {/* MODE 3: TELEFAX DISPATCH UTILITY                           */}
          {/* ========================================================== */}
          {type === "Fax" && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Fax Number
                  </label>
                  <input
                    type="text"
                    value={targetFax}
                    readOnly
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-purple-300 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Transmission Ref Code
                  </label>
                  <input
                    type="text"
                    value={faxRef}
                    onChange={(e) => setFaxRef(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Telefax Transmittal Sheet Message
                </label>
                <textarea
                  value={faxMessage}
                  onChange={(e) => setFaxMessage(e.target.value)}
                  rows={6}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-purple-200 font-mono leading-relaxed focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              {faxStatus === "sending" && (
                <div className="p-3 bg-slate-950 border border-amber-500/40 rounded-xl text-center text-amber-300 text-xs font-semibold animate-pulse">
                  Transmitting Telefax Transmission to {targetFax}...
                </div>
              )}

              {faxStatus === "dispatched" && (
                <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-center text-emerald-300 text-xs font-semibold">
                  Telefax Dispatched &amp; Confirmation Receipt Logged (Ref: {faxRef})
                </div>
              )}

              <div className="pt-2 flex items-center space-x-3">
                <button
                  onClick={handleSendFax}
                  disabled={faxStatus !== "idle"}
                  className="flex-1 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-purple-600/30 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Printer className="h-4 w-4" />
                  <span>Dispatch Telefax &amp; Log Receipt</span>
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
            Close Utility
          </button>
        </div>
      </div>
    </div>
  );
};
