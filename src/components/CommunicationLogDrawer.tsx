import React from "react";
import { CommunicationLog } from "../types";
import { Phone, Mail, Printer, Clock, History, Trash2 } from "lucide-react";

interface CommunicationLogDrawerProps {
  logs: CommunicationLog[];
  onClearLogs: () => void;
}

export const CommunicationLogDrawer: React.FC<CommunicationLogDrawerProps> = ({
  logs,
  onClearLogs
}) => {
  if (logs.length === 0) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 my-4 shadow-lg">
      <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
        <div className="flex items-center space-x-2">
          <History className="h-4 w-4 text-indigo-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Sovereign Communication Utility Logs ({logs.length})
          </h3>
        </div>

        <button
          onClick={onClearLogs}
          className="text-[11px] text-slate-400 hover:text-red-400 inline-flex items-center space-x-1 cursor-pointer"
        >
          <Trash2 className="h-3 w-3" />
          <span>Clear Logs</span>
        </button>
      </div>

      <div className="space-y-2 max-h-[160px] overflow-y-auto">
        {logs.map((log) => (
          <div
            key={log.id}
            className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs flex items-center justify-between font-mono"
          >
            <div className="flex items-center space-x-2">
              {log.type === "Call" && <Phone className="h-3.5 w-3.5 text-indigo-400" />}
              {log.type === "Email" && <Mail className="h-3.5 w-3.5 text-sky-400" />}
              {log.type === "Fax" && <Printer className="h-3.5 w-3.5 text-purple-400" />}

              <div>
                <span className="font-bold text-slate-200">{log.portalName}</span>
                <span className="text-slate-500 mx-1">•</span>
                <span className="text-slate-300">{log.recipient}</span>
                {log.subject && (
                  <span className="text-slate-400 text-[10px] block font-sans truncate max-w-[280px]">
                    {log.subject}
                  </span>
                )}
              </div>
            </div>

            <div className="text-right">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-emerald-300 border border-slate-700">
                {log.status}
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">{log.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
