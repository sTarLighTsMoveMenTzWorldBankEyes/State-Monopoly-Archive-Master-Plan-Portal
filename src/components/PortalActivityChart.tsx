import React, { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts";
import { PortalRecord, CommunicationLog } from "../types";
import { Activity, BarChart3, TrendingUp, Calendar, Zap, ShieldCheck } from "lucide-react";

interface PortalActivityChartProps {
  portal: PortalRecord;
  logs: CommunicationLog[];
}

export const PortalActivityChart: React.FC<PortalActivityChartProps> = ({
  portal,
  logs
}) => {
  const [chartMode, setChartMode] = useState<"comm" | "api">("comm");

  // Generate 30 days timeline dataset ending at current date
  const chartData = useMemo(() => {
    const data = [];
    const today = new Date();

    // Map logs to date strings (YYYY-MM-DD)
    const logCountsByDate: Record<string, { calls: number; emails: number; faxes: number }> = {};

    logs.forEach((log) => {
      // log.timestamp format e.g. "2026-09-04 10:15" or ISO
      const datePart = log.timestamp.split(" ")[0] || log.timestamp.split("T")[0];
      if (!logCountsByDate[datePart]) {
        logCountsByDate[datePart] = { calls: 0, emails: 0, faxes: 0 };
      }
      if (log.type === "Call") logCountsByDate[datePart].calls += 1;
      if (log.type === "Email") logCountsByDate[datePart].emails += 1;
      if (log.type === "Fax") logCountsByDate[datePart].faxes += 1;
    });

    // Hash function to make deterministic daily activity pings based on portal.id
    const hashStr = (str: string) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
      }
      return Math.abs(hash);
    };

    const portalHash = hashStr(portal.id || portal.name);

    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);

      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const dateStr = `${year}-${month}-${day}`;
      const labelStr = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

      const dayLogs = logCountsByDate[dateStr] || { calls: 0, emails: 0, faxes: 0 };

      // Base activity generated deterministically with slight pseudo-random variation
      const pseudoRand = ((portalHash + i * 17) % 100) / 100;
      const apiPings = Math.floor(120 + pseudoRand * 400 + (dayLogs.calls + dayLogs.emails) * 50);
      const latencyMs = Math.floor(18 + pseudoRand * 35);
      const statusScore = Math.min(100, Math.floor(98 + pseudoRand * 2));

      data.push({
        date: dateStr,
        label: labelStr,
        Calls: dayLogs.calls,
        Emails: dayLogs.emails,
        Faxes: dayLogs.faxes,
        TotalComms: dayLogs.calls + dayLogs.emails + dayLogs.faxes,
        ApiRequests: apiPings,
        LatencyMs: latencyMs,
        Uptime: statusScore
      });
    }

    return data;
  }, [logs, portal]);

  const totalComms30d = useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.TotalComms, 0),
    [chartData]
  );

  const totalApiPings30d = useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.ApiRequests, 0),
    [chartData]
  );

  const avgLatency = useMemo(() => {
    const sum = chartData.reduce((acc, curr) => acc + curr.LatencyMs, 0);
    return Math.round(sum / chartData.length);
  }, [chartData]);

  return (
    <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-4">
      {/* Top Header & Toggles */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <Activity className="h-4 w-4 text-emerald-400 animate-pulse" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            30-Day Activity &amp; Communication Analytics
          </h3>
        </div>

        {/* View Switcher */}
        <div className="flex items-center space-x-1 bg-slate-900 p-1 rounded-lg border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setChartMode("comm")}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-md flex items-center space-x-1.5 transition-all cursor-pointer ${
              chartMode === "comm"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <BarChart3 className="h-3 w-3" />
            <span>Communication Volume</span>
          </button>
          <button
            onClick={() => setChartMode("api")}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-md flex items-center space-x-1.5 transition-all cursor-pointer ${
              chartMode === "api"
                ? "bg-emerald-600 text-white shadow-md"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Zap className="h-3 w-3" />
            <span>API &amp; Gateway Pings</span>
          </button>
        </div>
      </div>

      {/* Metric Summary Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80 font-mono">
          <span className="text-[10px] text-slate-400 uppercase font-sans block">
            30D Comms Logged
          </span>
          <span className="text-base font-bold text-indigo-300">{totalComms30d} Dispatches</span>
        </div>

        <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80 font-mono">
          <span className="text-[10px] text-slate-400 uppercase font-sans block">
            30D API Requests
          </span>
          <span className="text-base font-bold text-emerald-300">
            {totalApiPings30d.toLocaleString()} Pings
          </span>
        </div>

        <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80 font-mono">
          <span className="text-[10px] text-slate-400 uppercase font-sans block">
            Avg Endpoint Latency
          </span>
          <span className="text-base font-bold text-sky-300">{avgLatency} ms</span>
        </div>

        <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80 font-mono">
          <span className="text-[10px] text-slate-400 uppercase font-sans block">
            Service Availability
          </span>
          <span className="text-base font-bold text-emerald-400">99.9% Operational</span>
        </div>
      </div>

      {/* Recharts Render */}
      <div className="h-56 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          {chartMode === "comm" ? (
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
              <XAxis dataKey="label" stroke="#94a3b8" fontSize={10} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  borderColor: "#334155",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "#f8fafc"
                }}
                itemStyle={{ color: "#e2e8f0" }}
              />
              <Legend
                wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
                iconType="circle"
              />
              <Bar dataKey="Calls" stackId="a" fill="#6366f1" radius={[0, 0, 0, 0]} />
              <Bar dataKey="Emails" stackId="a" fill="#0284c7" radius={[0, 0, 0, 0]} />
              <Bar dataKey="Faxes" stackId="a" fill="#a855f7" radius={[4, 4, 0, 0]} />
            </BarChart>
          ) : (
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="colorApi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
              <XAxis dataKey="label" stroke="#94a3b8" fontSize={10} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  borderColor: "#334155",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "#f8fafc"
                }}
              />
              <Area
                type="monotone"
                dataKey="ApiRequests"
                name="API Requests / Day"
                stroke="#10b981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorApi)"
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
