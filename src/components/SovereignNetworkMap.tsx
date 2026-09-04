import React, { useState, useEffect, useRef, useMemo } from "react";
import * as d3 from "d3";
import { feature } from "topojson-client";
import landTopology from "world-atlas/land-110m.json";
import { PortalRecord } from "../types";
import {
  Globe,
  Compass,
  RotateCw,
  Zap,
  ShieldCheck,
  Radio,
  Building2,
  Cpu,
  Eye,
  ExternalLink,
  Phone,
  Mail,
  Printer,
  X,
  Layers,
  Sparkles
} from "lucide-react";

interface SovereignNetworkMapProps {
  portals: PortalRecord[];
  onSelectPortal: (portal: PortalRecord) => void;
  onTriggerCommunication?: (type: "Call" | "Email" | "Fax", portal: PortalRecord) => void;
}

// Approximate geo-coordinates for countries / cities
const COUNTRY_COORDINATES: Record<string, { lat: number; lng: number; city: string }> = {
  EU: { lat: 50.8503, lng: 4.3517, city: "Brussels" },
  DE: { lat: 52.5200, lng: 13.4050, city: "Berlin" },
  FR: { lat: 48.8566, lng: 2.3522, city: "Paris" },
  BE: { lat: 50.8503, lng: 4.3517, city: "Brussels" },
  CH: { lat: 46.9480, lng: 7.4474, city: "Bern / Zürich" },
  LU: { lat: 49.6116, lng: 6.1319, city: "Luxembourg" },
  DK: { lat: 55.6761, lng: 12.5683, city: "Copenhagen" },
  SE: { lat: 59.3293, lng: 18.0686, city: "Stockholm" },
  NO: { lat: 59.9139, lng: 10.7522, city: "Oslo" },
  IT: { lat: 41.9028, lng: 12.4964, city: "Rome" },
  ES: { lat: 40.4168, lng: -3.7038, city: "Madrid" },
  PT: { lat: 38.7223, lng: -9.1393, city: "Lisbon" },
  US: { lat: 38.9072, lng: -77.0369, city: "Washington D.C." },
  CA: { lat: 45.4215, lng: -75.6981, city: "Ottawa" },
  AU: { lat: -35.2809, lng: 149.1300, city: "Canberra" },
  BR: { lat: -15.7801, lng: -47.9292, city: "Brasilia" },
  GB: { lat: 51.5074, lng: -0.1278, city: "London" },
  IE: { lat: 53.3498, lng: -6.2603, city: "Dublin" },
  FI: { lat: 60.1699, lng: 24.9384, city: "Helsinki" },
  NL: { lat: 52.3676, lng: 4.9041, city: "Amsterdam" },
  AT: { lat: 48.2082, lng: 16.3738, city: "Vienna" },
  JP: { lat: 35.6895, lng: 139.6917, city: "Tokyo" },
  KR: { lat: 37.5665, lng: 126.9780, city: "Seoul" },
  NZ: { lat: -41.2865, lng: 174.7762, city: "Wellington" },
  SG: { lat: 1.3521, lng: 103.8198, city: "Singapore" },
  ZA: { lat: -25.7479, lng: 28.1881, city: "Pretoria" },
  MX: { lat: 19.4326, lng: -99.1332, city: "Mexico City" },
  AR: { lat: -34.6037, lng: -58.3816, city: "Buenos Aires" },
  CN: { lat: 39.9042, lng: 116.4074, city: "Beijing" }
};

// Strategic Arc Connections (Great Circles between major hubs)
const STRATEGIC_ARCS = [
  { from: "EU", to: "US", label: "EU-US Transatlantic Cyber Arc" },
  { from: "EU", to: "JP", label: "EUSPA - JAXA Orbital Data Link" },
  { from: "US", to: "AU", label: "AUKUS Defense Data Gateway" },
  { from: "DE", to: "US", label: "BSI - CISA Threat Feed" },
  { from: "FR", to: "GB", label: "ANSSI - NCSC Security Channel" },
  { from: "EU", to: "CA", label: "Copernicus - CSA Observation Link" },
  { from: "CH", to: "JP", label: "ETH - Tokyo Science Grid" }
];

export const SovereignNetworkMap: React.FC<SovereignNetworkMapProps> = ({
  portals,
  onSelectPortal,
  onTriggerCommunication
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // States
  const [projectionMode, setProjectionMode] = useState<"globe" | "2d">("globe");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [isAutoSpin, setIsAutoSpin] = useState<boolean>(true);
  const [rotation, setRotation] = useState<[number, number]>([-15, -30]); // [lambda, phi]
  const [hoveredPortal, setHoveredPortal] = useState<PortalRecord | null>(null);
  const [activePortalCard, setActivePortalCard] = useState<PortalRecord | null>(null);
  const [dimensions, setDimensions] = useState({ width: 900, height: 520 });

  // Mouse interaction state for manual dragging
  const isDragging = useRef<boolean>(false);
  const lastMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: Math.max(320, width),
          height: Math.max(400, Math.min(600, width * 0.58))
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filtered Portals
  const filteredPortals = useMemo(() => {
    if (selectedCategory === "ALL") return portals;
    return portals.filter((p) => p.category === selectedCategory);
  }, [portals, selectedCategory]);

  // Convert portals into geo-mapped nodes with slight jitter if multiple nodes in same country
  const mappedNodes = useMemo(() => {
    const countsByCountry: Record<string, number> = {};

    return filteredPortals.map((portal) => {
      const country = portal.country || "EU";
      const coords = COUNTRY_COORDINATES[country] || { lat: 48.8566, lng: 2.3522, city: "Europe" };

      const count = countsByCountry[country] || 0;
      countsByCountry[country] = count + 1;

      // Add deterministic spiral jitter so overlapping nodes in same country/city spread out nicely
      const angle = count * 1.2;
      const radius = count === 0 ? 0 : 0.8 + count * 0.45;
      const jitterLng = Math.cos(angle) * radius;
      const jitterLat = Math.sin(angle) * radius;

      return {
        portal,
        country,
        city: coords.city,
        coordinates: [coords.lng + jitterLng, coords.lat + jitterLat] as [number, number]
      };
    });
  }, [filteredPortals]);

  // Auto-Spin animation frame loop for 3D globe
  useEffect(() => {
    if (!isAutoSpin || projectionMode !== "globe") return;

    let animId: number;
    const spin = () => {
      setRotation((prev) => [(prev[0] + 0.25) % 360, prev[1]]);
      animId = requestAnimationFrame(spin);
    };

    animId = requestAnimationFrame(spin);
    return () => cancelAnimationFrame(animId);
  }, [isAutoSpin, projectionMode]);

  // Mouse Drag handlers
  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDragging.current) return;

    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    lastMousePos.current = { x: e.clientX, y: e.clientY };

    const k = projectionMode === "globe" ? 0.35 : 0.25;
    setRotation((prev) => [
      prev[0] + dx * k,
      Math.max(-80, Math.min(80, prev[1] - dy * k))
    ]);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Focus specific region preset
  const handleFocusRegion = (region: "EU" | "US" | "APAC" | "LATAM") => {
    setIsAutoSpin(false);
    if (region === "EU") setRotation([-15, -48]);
    if (region === "US") setRotation([95, -38]);
    if (region === "APAC") setRotation([-135, -25]);
    if (region === "LATAM") setRotation([60, 15]);
  };

  // Convert land topology into GeoJSON feature
  const landGeoJson = useMemo(() => {
    return feature(landTopology as any, landTopology.objects.land as any);
  }, []);

  // Setup D3 Projection & Path generator
  const { pathGenerator, projection, graticulePath } = useMemo(() => {
    const { width, height } = dimensions;
    const radius = Math.min(width, height) * 0.42;

    let proj: d3.GeoProjection;

    if (projectionMode === "globe") {
      proj = d3
        .geoOrthographic()
        .scale(radius)
        .translate([width / 2, height / 2])
        .rotate([rotation[0], rotation[1], 0]);
    } else {
      proj = d3
        .geoMercator()
        .scale(width / 6.5)
        .translate([width / 2, height / 1.7])
        .rotate([rotation[0] * 0.2, 0, 0]);
    }

    const path = d3.geoPath().projection(proj);
    const graticule = d3.geoGraticule10();
    const graticuleP = path(graticule);

    return {
      pathGenerator: path,
      projection: proj,
      graticulePath: graticuleP
    };
  }, [dimensions, projectionMode, rotation]);

  // Check if a point is visible on 3D globe hemisphere
  const isVisibleOnGlobe = (lng: number, lat: number) => {
    if (projectionMode === "2d") return true;
    const centerLng = -rotation[0];
    const centerLat = -rotation[1];
    const dist = d3.geoDistance([lng, lat], [centerLng, centerLat]);
    return dist < Math.PI / 2.05;
  };

  // Color helper based on portal category
  const getNodeColor = (cat: string) => {
    if (cat === "DEFENCE, SECURITY & MILITARY NODES") return "#f43f5e"; // Rose / Red
    if (cat === "INFRASTRUCTURE & RESEARCH FEDERATIONS") return "#10b981"; // Emerald
    if (cat === "STATE MONOPOLY & CENTRAL BANKS") return "#f59e0b"; // Amber
    if (cat === "DLT-TSS & TRUST SERVICES") return "#8b5cf6"; // Purple
    if (cat === "OPEN BANKING / OPEN FINANCE") return "#0284c7"; // Sky blue
    return "#6366f1"; // Indigo default
  };

  return (
    <div
      ref={containerRef}
      className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 text-white shadow-2xl relative overflow-hidden space-y-4"
    >
      {/* Top Title & Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-rose-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Globe className="h-5 w-5 text-white animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-white tracking-wide uppercase">
                Sovereign Network Map
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {mappedNodes.length} Nodes Mapped
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Interactive 3D Globe &amp; Geospatial Node Topology across Sovereign Registries
            </p>
          </div>
        </div>

        {/* Action Controls & Region Jumps */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Projection Switcher */}
          <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setProjectionMode("globe")}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md flex items-center space-x-1.5 transition-all cursor-pointer ${
                projectionMode === "globe"
                  ? "bg-indigo-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Globe className="h-3.5 w-3.5" />
              <span>3D Globe</span>
            </button>
            <button
              onClick={() => setProjectionMode("2d")}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md flex items-center space-x-1.5 transition-all cursor-pointer ${
                projectionMode === "2d"
                  ? "bg-indigo-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Compass className="h-3.5 w-3.5" />
              <span>2D Map</span>
            </button>
          </div>

          {/* Auto Spin Toggle */}
          {projectionMode === "globe" && (
            <button
              onClick={() => setIsAutoSpin(!isAutoSpin)}
              className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg flex items-center space-x-1.5 border transition-all cursor-pointer ${
                isAutoSpin
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
              }`}
            >
              <RotateCw className={`h-3.5 w-3.5 ${isAutoSpin ? "animate-spin" : ""}`} />
              <span>{isAutoSpin ? "Spinning" : "Auto-Spin"}</span>
            </button>
          )}

          {/* Preset Quick Focus */}
          <div className="flex items-center space-x-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => handleFocusRegion("EU")}
              className="px-2 py-1 text-[11px] font-medium text-slate-300 hover:bg-slate-800 rounded transition cursor-pointer"
            >
              🇪🇺 EU
            </button>
            <button
              onClick={() => handleFocusRegion("US")}
              className="px-2 py-1 text-[11px] font-medium text-slate-300 hover:bg-slate-800 rounded transition cursor-pointer"
            >
              🇺🇸 US
            </button>
            <button
              onClick={() => handleFocusRegion("APAC")}
              className="px-2 py-1 text-[11px] font-medium text-slate-300 hover:bg-slate-800 rounded transition cursor-pointer"
            >
              🌏 APAC
            </button>
            <button
              onClick={() => handleFocusRegion("LATAM")}
              className="px-2 py-1 text-[11px] font-medium text-slate-300 hover:bg-slate-800 rounded transition cursor-pointer"
            >
              🌎 LATAM
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar pb-1">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pr-1">
          Sector Filter:
        </span>
        {[
          { label: "All Nodes", value: "ALL" },
          { label: "Defence & Security", value: "DEFENCE, SECURITY & MILITARY NODES" },
          { label: "Infrastructure & Research", value: "INFRASTRUCTURE & RESEARCH FEDERATIONS" },
          { label: "State Monopoly & Central Banks", value: "STATE MONOPOLY & CENTRAL BANKS" },
          { label: "DLT & Trust Services", value: "DLT-TSS & TRUST SERVICES" },
          { label: "Open Banking", value: "OPEN BANKING / OPEN FINANCE" }
        ].map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-2.5 py-1 text-xs font-medium rounded-full whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat.value
                ? "bg-slate-100 text-slate-950 font-bold shadow"
                : "bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Interactive Map Stage */}
      <div className="relative bg-slate-950 rounded-xl border border-slate-800/80 overflow-hidden flex items-center justify-center">
        {/* Globe Radial Backdrop Glow */}
        <div className="absolute inset-0 bg-radial from-indigo-900/10 via-slate-950/80 to-slate-950 pointer-events-none" />

        <svg
          ref={svgRef}
          width={dimensions.width}
          height={dimensions.height}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="cursor-grab active:cursor-grabbing select-none relative z-10"
        >
          <defs>
            {/* Ocean Globe Gradient */}
            <radialGradient id="oceanGradient" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#1e1b4b" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#0f172a" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#020617" stopOpacity="1" />
            </radialGradient>

            {/* Globe Atmosphere Glow Filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Globe Atmosphere Backing Sphere */}
          {projectionMode === "globe" && (
            <circle
              cx={dimensions.width / 2}
              cy={dimensions.height / 2}
              r={Math.min(dimensions.width, dimensions.height) * 0.42}
              fill="url(#oceanGradient)"
              stroke="#4338ca"
              strokeWidth="1.5"
              strokeOpacity="0.4"
              filter="url(#glow)"
            />
          )}

          {/* Graticule Lines */}
          {graticulePath && (
            <path
              d={graticulePath}
              fill="none"
              stroke="#334155"
              strokeWidth="0.5"
              strokeOpacity="0.4"
            />
          )}

          {/* Landmass Polygons */}
          {landGeoJson && (
            <path
              d={pathGenerator(landGeoJson as any) || ""}
              fill="#1e293b"
              stroke="#334155"
              strokeWidth="0.75"
              className="transition-all duration-300 hover:fill-slate-700"
            />
          )}

          {/* Strategic Arc Connections */}
          {STRATEGIC_ARCS.map((arc, i) => {
            const fromCoords = COUNTRY_COORDINATES[arc.from];
            const toCoords = COUNTRY_COORDINATES[arc.to];
            if (!fromCoords || !toCoords) return null;

            if (
              !isVisibleOnGlobe(fromCoords.lng, fromCoords.lat) &&
              !isVisibleOnGlobe(toCoords.lng, toCoords.lat)
            ) {
              return null;
            }

            const geoLine: any = {
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: [
                  [fromCoords.lng, fromCoords.lat],
                  [toCoords.lng, toCoords.lat]
                ]
              }
            };

            const arcPath = pathGenerator(geoLine);
            if (!arcPath) return null;

            return (
              <g key={`arc-${i}`}>
                <path
                  d={arcPath}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                  strokeOpacity="0.6"
                  className="animate-pulse"
                />
              </g>
            );
          })}

          {/* Mapped Portal Nodes Pins */}
          {mappedNodes.map((node) => {
            const [lng, lat] = node.coordinates;
            if (!isVisibleOnGlobe(lng, lat)) return null;

            const point = projection([lng, lat]);
            if (!point || isNaN(point[0]) || isNaN(point[1])) return null;

            const [x, y] = point;
            const nodeColor = getNodeColor(node.portal.category);
            const isHovered = hoveredPortal?.id === node.portal.id;
            const isSelected = activePortalCard?.id === node.portal.id;
            const isDefense = node.portal.category === "DEFENCE, SECURITY & MILITARY NODES";

            return (
              <g
                key={node.portal.id}
                transform={`translate(${x}, ${y})`}
                onMouseEnter={() => setHoveredPortal(node.portal)}
                onMouseLeave={() => setHoveredPortal(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePortalCard(node.portal);
                }}
                className="cursor-pointer group"
              >
                {/* Outer Pulsing Ring */}
                <circle
                  r={isHovered || isSelected ? 14 : isDefense ? 10 : 7}
                  fill="none"
                  stroke={nodeColor}
                  strokeWidth="1.5"
                  strokeOpacity={isHovered ? 0.9 : 0.5}
                  className="animate-ping"
                />

                {/* Core Node Marker Circle */}
                <circle
                  r={isHovered || isSelected ? 6.5 : isDefense ? 5 : 4}
                  fill={nodeColor}
                  stroke="#020617"
                  strokeWidth="1.5"
                  className="transition-all duration-200"
                />

                {/* Flag Emoji on Hover or Selected */}
                {(isHovered || isSelected) && (
                  <text
                    y="-10"
                    textAnchor="middle"
                    fontSize="11"
                    className="pointer-events-none drop-shadow"
                  >
                    {node.portal.flagEmoji}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Hover Floating Tooltip */}
        {hoveredPortal && !activePortalCard && (
          <div className="absolute top-4 left-4 z-20 bg-slate-900/95 backdrop-blur-md border border-slate-700 p-3 rounded-xl shadow-xl max-w-xs space-y-1.5 pointer-events-none transition-all">
            <div className="flex items-center space-x-2">
              <span className="text-base">{hoveredPortal.flagEmoji}</span>
              <span className="text-xs font-bold text-white line-clamp-1">
                {hoveredPortal.name}
              </span>
            </div>
            <p className="text-[11px] text-slate-300 line-clamp-2">
              {hoveredPortal.summary}
            </p>
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-800">
              <span className="text-indigo-300 font-semibold">{hoveredPortal.country}</span>
              <span className="text-emerald-400">{hoveredPortal.depositCapacity}</span>
            </div>
          </div>
        )}

        {/* Active Selected Node Side Drawer Overlay */}
        {activePortalCard && (
          <div className="absolute top-3 right-3 bottom-3 z-30 w-80 bg-slate-900/95 backdrop-blur-md border border-slate-700 p-4 rounded-xl shadow-2xl flex flex-col justify-between space-y-3 animate-in slide-in-from-right-5 duration-200">
            <div className="space-y-3 overflow-y-auto pr-1">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{activePortalCard.flagEmoji}</span>
                  <div>
                    <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase">
                      {activePortalCard.country} Node
                    </span>
                    <h4 className="text-sm font-bold text-white leading-tight mt-0.5">
                      {activePortalCard.name}
                    </h4>
                  </div>
                </div>
                <button
                  onClick={() => setActivePortalCard(null)}
                  className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Subcategory & Sector */}
              <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800 space-y-1 text-xs">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">
                  {activePortalCard.category}
                </span>
                <p className="text-slate-300 text-[11px] font-medium">
                  {activePortalCard.subcategory}
                </p>
              </div>

              {/* Summary */}
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/60">
                {activePortalCard.summary}
              </p>

              {/* Primary Contact */}
              {activePortalCard.managementContacts?.[0] && (
                <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800 space-y-1 text-xs">
                  <span className="text-[10px] text-slate-400 uppercase block font-semibold">
                    Primary Level-C Contact:
                  </span>
                  <p className="font-bold text-white text-xs">
                    {activePortalCard.managementContacts[0].name}
                  </p>
                  <p className="text-[10px] text-indigo-300 font-mono">
                    {activePortalCard.managementContacts[0].role}
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono truncate">
                    {activePortalCard.managementContacts[0].email}
                  </p>
                </div>
              )}

              {/* Links & Direct Access */}
              <div className="space-y-1.5 pt-1">
                <a
                  href={activePortalCard.mainUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold flex items-center justify-center space-x-1.5 shadow transition cursor-pointer"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Open Official Portal</span>
                </a>

                {activePortalCard.directRegistrationUrl && (
                  <a
                    href={activePortalCard.directRegistrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold flex items-center justify-center space-x-1.5 shadow transition cursor-pointer"
                  >
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Direct Registration Node</span>
                  </a>
                )}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  onSelectPortal(activePortalCard);
                  setActivePortalCard(null);
                }}
                className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold border border-slate-700 transition cursor-pointer"
              >
                Inspect Dossier
              </button>

              {onTriggerCommunication && (
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => onTriggerCommunication("Call", activePortalCard)}
                    className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs transition cursor-pointer"
                    title="Initiate Call"
                  >
                    <Phone className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => onTriggerCommunication("Email", activePortalCard)}
                    className="p-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs transition cursor-pointer"
                    title="Compose Email"
                  >
                    <Mail className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Map Footer Stats Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono">
        <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
          <span className="text-[10px] text-slate-400 font-sans block uppercase">
            Active Sovereign Nodes
          </span>
          <span className="text-sm font-bold text-indigo-300">
            {mappedNodes.length} Registries
          </span>
        </div>

        <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
          <span className="text-[10px] text-slate-400 font-sans block uppercase">
            Defence &amp; Security Hubs
          </span>
          <span className="text-sm font-bold text-rose-400">
            {portals.filter((p) => p.category === "DEFENCE, SECURITY & MILITARY NODES").length} High-Access
          </span>
        </div>

        <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
          <span className="text-[10px] text-slate-400 font-sans block uppercase">
            Transatlantic Cyber Arcs
          </span>
          <span className="text-sm font-bold text-sky-300">
            {STRATEGIC_ARCS.length} Strategic Links
          </span>
        </div>

        <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
          <span className="text-[10px] text-slate-400 font-sans block uppercase">
            Global Coverage
          </span>
          <span className="text-sm font-bold text-emerald-400">
            {Object.keys(COUNTRY_COORDINATES).length} Sovereign Nations
          </span>
        </div>
      </div>
    </div>
  );
};
