import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { CommunicationLog, PortalRecord, ManagementContact } from "../types";
import { Phone, Mail, Printer, Clock, History, Plus, MessageSquare, ShieldCheck, CheckCircle2 } from "lucide-react";

interface PortalCommunicationTimelineProps {
  portal: PortalRecord;
  logs: CommunicationLog[];
  onTriggerCommunication: (
    type: "Call" | "Email" | "Fax",
    portal: PortalRecord,
    contact?: ManagementContact
  ) => void;
}

export const PortalCommunicationTimeline: React.FC<PortalCommunicationTimelineProps> = ({
  portal,
  logs,
  onTriggerCommunication
}) => {
  return (
    <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <History className="h-4 w-4 text-indigo-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Portal Communication Timeline ({logs.length})
          </h3>
        </div>

        {/* Quick Action Triggers */}
        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => onTriggerCommunication("Call", portal)}
            className="px-2 py-1 bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-700/50 text-indigo-300 text-[11px] font-semibold rounded-lg flex items-center space-x-1 cursor-pointer transition-all"
          >
            <Phone className="h-3 w-3" />
            <span>Call</span>
          </button>
          <button
            onClick={() => onTriggerCommunication("Email", portal)}
            className="px-2 py-1 bg-sky-950/80 hover:bg-sky-900 border border-sky-700/50 text-sky-300 text-[11px] font-semibold rounded-lg flex items-center space-x-1 cursor-pointer transition-all"
          >
            <Mail className="h-3 w-3" />
            <span>Email</span>
          </button>
          <button
            onClick={() => onTriggerCommunication("Fax", portal)}
            className="px-2 py-1 bg-purple-950/80 hover:bg-purple-900 border border-purple-700/50 text-purple-300 text-[11px] font-semibold rounded-lg flex items-center space-x-1 cursor-pointer transition-all"
          >
            <Printer className="h-3 w-3" />
            <span>Fax</span>
          </button>
        </div>
      </div>

      {/* Timeline Content */}
      {logs.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6 text-center bg-slate-900/50 rounded-lg border border-dashed border-slate-800"
        >
          <MessageSquare className="h-8 w-8 text-slate-600 mx-auto mb-2" />
          <p className="text-xs text-slate-400 font-medium">
            No communication logged yet for {portal.name}.
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            Initiate a call, email, or telefax transmission above to build the audit trail.
          </p>
        </motion.div>
      ) : (
        <div className="relative pl-6 space-y-4">
          {/* Vertical Connecting Line */}
          <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-slate-800/80 rounded-full" />

          <AnimatePresence mode="popLayout">
            {logs.map((log, index) => {
              const isCall = log.type === "Call";
              const isEmail = log.type === "Email";
              const isFax = log.type === "Fax";

              return (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -16, scale: 0.97 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="relative group"
                >
                  {/* Timeline Dot Icon */}
                  <div
                    className={`absolute -left-6 top-1 h-5 w-5 rounded-full flex items-center justify-center text-[10px] shadow-md border ${
                      isCall
                        ? "bg-indigo-950 text-indigo-400 border-indigo-600/60"
                        : isEmail
                        ? "bg-sky-950 text-sky-400 border-sky-600/60"
                        : "bg-purple-950 text-purple-400 border-purple-600/60"
                    }`}
                  >
                    {isCall && <Phone className="h-2.5 w-2.5" />}
                    {isEmail && <Mail className="h-2.5 w-2.5" />}
                    {isFax && <Printer className="h-2.5 w-2.5" />}
                  </div>

                  {/* Log Item Box */}
                  <div className="bg-slate-900/90 border border-slate-800/90 hover:border-slate-700 rounded-lg p-3 transition-all space-y-1.5 shadow-sm">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            isCall
                              ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                              : isEmail
                              ? "bg-sky-500/20 text-sky-300 border border-sky-500/30"
                              : "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                          }`}
                        >
                          {log.type}
                        </span>

                        <span className="text-xs font-semibold text-slate-200">
                          {log.recipient}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono text-slate-500 flex items-center space-x-1">
                          <Clock className="h-3 w-3 text-slate-500" />
                          <span>{log.timestamp}</span>
                        </span>

                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-800/80">
                          {log.status}
                        </span>
                      </div>
                    </div>

                    {log.subject && (
                      <p className="text-xs font-medium text-slate-300">
                        {log.subject}
                      </p>
                    )}

                    {log.notes && (
                      <p className="text-[11px] text-slate-400 font-mono bg-slate-950/60 p-2 rounded border border-slate-800/60 italic">
                        "{log.notes}"
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
