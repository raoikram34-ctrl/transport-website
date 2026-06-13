import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Compass, Globe, Navigation, Radio, Power, Eye, Pin, Info } from "lucide-react";

interface GlobeNode {
  name: string;
  state: string;
  lat: number;
  lng: number;
  mockLat: number;
  mockLng: number;
  // Pre-calculated 3D coordinates relative to unit sphere
  x: number;
  y: number;
  z: number;
}

const GLOBAL_HUBS: GlobeNode[] = [
  { name: "Seattle", state: "WA", lat: 47.6, lng: -122.3, mockLat: 45, mockLng: -135, x: 0, y: 0, z: 0 },
  { name: "Los Angeles", state: "CA", lat: 34.05, lng: -118.24, mockLat: -15, mockLng: -110, x: 0, y: 0, z: 0 },
  { name: "Phoenix", state: "AZ", lat: 33.45, lng: -112.07, mockLat: -45, mockLng: -40, x: 0, y: 0, z: 0 },
  { name: "Dallas", state: "TX", lat: 32.78, lng: -96.8, mockLat: -25, mockLng: 40, x: 0, y: 0, z: 0 },
  { name: "Chicago", state: "IL", lat: 41.88, lng: -87.63, mockLat: 55, mockLng: 15, x: 0, y: 0, z: 0 },
  { name: "New York", state: "NY", lat: 40.71, lng: -74.0, mockLat: 25, mockLng: 105, x: 0, y: 0, z: 0 },
  { name: "Miami", state: "FL", lat: 25.76, lng: -80.19, mockLat: -35, mockLng: 160, x: 0, y: 0, z: 0 },
];

// Pre-convert Mock Lat/Lng to normalized 3D coords on a unit sphere (R = 1)
GLOBAL_HUBS.forEach((hub) => {
  const phi = (90 - hub.mockLat) * (Math.PI / 180);
  const theta = (hub.mockLng + 180) * (Math.PI / 180);
  
  hub.x = -(Math.sin(phi) * Math.sin(theta));
  hub.y = Math.cos(phi);
  hub.z = Math.sin(phi) * Math.cos(theta);
});

const ROUTES = [
  { from: "Seattle", to: "Los Angeles", color: "#f97316" },
  { from: "Los Angeles", to: "Phoenix", color: "#f97316" },
  { from: "Phoenix", to: "Dallas", color: "#f97316" },
  { from: "Dallas", to: "Chicago", color: "#f97316" },
  { from: "Chicago", to: "New York", color: "#f97316" },
  { from: "Dallas", to: "Miami", color: "#f97316" },
];

export default function InteractiveGlobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  const [selectedHub, setSelectedHub] = useState<GlobeNode>(GLOBAL_HUBS[4]); // Chicago by default
  const [isRotating, setIsRotating] = useState(true);
  const [hudMessage, setHudMessage] = useState("SATELLITE TRACK_ONLINE. SYS_LOADED.");
  
  // Angle states
  const rotationRef = useRef({ alpha: 0.1, beta: -0.4 }); // rotation angles (Y and X axes)
  const lastMousePos = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  // Focus transition animation helper
  const targetRotation = useRef({ alpha: 0, beta: 0, active: false });

  // Handle Hub selection from HUD
  const focusHub = (hub: GlobeNode) => {
    setSelectedHub(hub);
    setHudMessage(`RADAR CALIBRATING TO CORRIDOR HUBS // ${hub.name.toUpperCase()}_NODE`);
    
    // Project the selected hub to face the viewer using mock coordinates
    const thetaHub = (hub.mockLng + 180) * (Math.PI / 180);
    const phiHub = (90 - hub.mockLat) * (Math.PI / 180);
    
    targetRotation.current = {
      alpha: -thetaHub + Math.PI / 2,
      beta: phiHub - Math.PI / 2,
      active: true
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let size = 480;
    
    // Resize function
    const resize = () => {
      if (containerRef.current) {
        // Clamp canvas width to container size but maintain high-DPI clarity
        const rect = containerRef.current.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        size = Math.min(rect.width, 500);
        canvas.width = size * dpr;
        canvas.height = size * dpr;
        canvas.style.width = `${size}px`;
        canvas.style.height = `${size}px`;
        ctx.scale(dpr, dpr);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    // Grid particles representing background globe density
    const gridCount = 280;
    const gridPoints: { x: number; y: number; z: number }[] = [];
    
    // Generate evenly spaced points on a sphere (Fibonacci lattice)
    for (let i = 0; i < gridCount; i++) {
      const y = 1 - (i / (gridCount - 1)) * 2; // y goes from 1 to -1
      const radius = Math.sqrt(1 - y * y); // radius at y
      
      const goldenRatio = (1 + Math.sqrt(5)) / 2;
      const theta = 2 * Math.PI * i / goldenRatio;
      
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      gridPoints.push({ x, y, z });
    }

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, size, size);
      
      const radius = size * 0.38; // Globe Radius
      const centerX = size / 2;
      const centerY = size / 2;

      // Handle continuous rotation or interpolation to face focused hub
      if (targetRotation.current.active) {
        const ease = 0.08;
        const diffAlpha = targetRotation.current.alpha - rotationRef.current.alpha;
        const diffBeta = targetRotation.current.beta - rotationRef.current.beta;
        
        rotationRef.current.alpha += diffAlpha * ease;
        rotationRef.current.beta += diffBeta * ease;
        
        if (Math.abs(diffAlpha) < 0.005 && Math.abs(diffBeta) < 0.005) {
          targetRotation.current.active = false;
        }
      } else if (isRotating && !isDragging.current) {
        rotationRef.current.alpha += 0.003; // Rotate around Y-axis
      }

      const cosAlpha = Math.cos(rotationRef.current.alpha);
      const sinAlpha = Math.sin(rotationRef.current.alpha);
      const cosBeta = Math.cos(rotationRef.current.beta);
      const sinBeta = Math.sin(rotationRef.current.beta);

      // 3D Rotation Math (First around Y, then around X)
      const project = (p: { x: number; y: number; z: number }) => {
        // Rotate around Y-axis (alpha)
        let x1 = p.x * cosAlpha - p.z * sinAlpha;
        let z1 = p.x * sinAlpha + p.z * cosAlpha;

        // Rotate around X-axis (beta)
        let y2 = p.y * cosBeta - z1 * sinBeta;
        let z2 = p.y * sinBeta + z1 * cosBeta;

        // Depth projection & coordinate offset
        const scale = 1 / (1 + z2 * 0.4); // perspective factor
        const sx = centerX + x1 * radius * scale;
        const sy = centerY - y2 * radius * scale;

        return { x: sx, y: sy, z: z2, scale };
      };

      // Draw background globe wireframe glow circular bounds
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.strokeStyle = "rgba(249, 115, 22, 0.04)";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius + 15, 0, 2 * Math.PI);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.01)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Render grid points representing landmasses/background sphere density
      gridPoints.forEach((p) => {
        const proj = project(p);
        
        // Render only if on the front hemisphere relative to perspective (z > -0.1 to avoid back clipping harshly)
        if (proj.z < 0.7) {
          const alphaFactor = Math.max(0, 1 - proj.z); // Fade points on the back side
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, 1.2 * proj.scale, 0, 2 * Math.PI);
          ctx.fillStyle = `rgba(255, 255, 255, ${0.15 * alphaFactor})`;
          ctx.fill();
        }
      });

      // Map out calculated 2D projected coordinates for hubs
      const projectedHubs = GLOBAL_HUBS.map((hub) => ({
        hub,
        proj: project(hub)
      }));

      // Draw Connection routes/orbits
      ROUTES.forEach((route) => {
        const fromProj = projectedHubs.find((h) => h.hub.name === route.from);
        const toProj = projectedHubs.find((h) => h.hub.name === route.to);

        if (fromProj && toProj) {
          // If both nodes are visible or somewhat visible on front side
          if (fromProj.proj.z < 0.75 && toProj.proj.z < 0.75) {
            const opacity = Math.min(1 - fromProj.proj.z, 1 - toProj.proj.z);
            
            // Draw spherical curvature using a control point pulled toward center/offset
            const midX = (fromProj.proj.x + toProj.proj.x) * 0.5;
            const midY = (fromProj.proj.y + toProj.proj.y) * 0.5;
            
            // Calculate vector toward center to push the curve out slightly
            const dx = midX - centerX;
            const dy = midY - centerY;
            const len = Math.sqrt(dx * dx + dy * dy);
            
            // Control point for curvature
            const curveOffset = 30; // pixels to bend route outwards
            const cx = midX + (dx / (len || 1)) * curveOffset;
            const cy = midY + (dy / (len || 1)) * curveOffset;

            ctx.beginPath();
            ctx.moveTo(fromProj.proj.x, fromProj.proj.y);
            ctx.quadraticCurveTo(cx, cy, toProj.proj.x, toProj.proj.y);
            ctx.strokeStyle = `rgba(249, 115, 22, ${0.45 * opacity})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Animated light streak moving from source to target
            const time = (Date.now() % 3000) / 3000;
            // Approximate quadratic Bezier interpolation
            const t = time;
            const sx = (1 - t) * (1 - t) * fromProj.proj.x + 2 * (1 - t) * t * cx + t * t * toProj.proj.x;
            const sy = (1 - t) * (1 - t) * fromProj.proj.y + 2 * (1 - t) * t * cy + t * t * toProj.proj.y;

            ctx.beginPath();
            ctx.arc(sx, sy, 3, 0, 2 * Math.PI);
            ctx.fillStyle = `rgba(249, 115, 22, ${0.9 * opacity})`;
            ctx.shadowBlur = 10;
            ctx.shadowColor = "#f97316";
            ctx.fill();
            ctx.shadowBlur = 0; // reset
          }
        }
      });

      // Draw interactive Hub points
      projectedHubs.forEach(({ hub, proj }) => {
        const isFocused = hub.name === selectedHub.name;
        
        if (proj.z < 0.8) {
          const opacity = Math.max(0, 1 - proj.z);
          
          // Outer beacon glow ring
          if (isFocused) {
            const wave = (Date.now() % 1600) / 1600;
            ctx.beginPath();
            ctx.arc(proj.x, proj.y, (8 + wave * 16) * proj.scale, 0, 2 * Math.PI);
            ctx.strokeStyle = `rgba(249, 115, 22, ${0.5 * (1 - wave) * opacity})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }

          // Node core point
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, (isFocused ? 5.5 : 4) * proj.scale, 0, 2 * Math.PI);
          ctx.fillStyle = isFocused ? "#f97316" : "rgba(255, 255, 255, 0.85)";
          ctx.strokeStyle = "#050505";
          ctx.lineWidth = 1.5;
          ctx.fill();
          ctx.stroke();

          // Text labels for Hub points
          ctx.fillStyle = isFocused ? "#ffffff" : "rgba(163, 163, 163, 0.85)";
          ctx.font = isFocused ? "bold 10px JetBrains Mono, monospace" : "9px Inter, sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(
            `${hub.name} (${hub.state})`, 
            proj.x, 
            proj.y - 10 * proj.scale
          );
        }
      });

      // Subtle geometric HUD accessories
      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
      ctx.beginPath();
      ctx.moveTo(centerX - radius - 20, centerY);
      ctx.lineTo(centerX + radius + 20, centerY);
      ctx.moveTo(centerX, centerY - radius - 20);
      ctx.lineTo(centerX, centerY + radius + 20);
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [selectedHub, isRotating]);

  // Mouse handlers for dragging/interactive rotate
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;

    rotationRef.current.alpha += dx * 0.007;
    rotationRef.current.beta += dy * 0.007;

    // Clamp beta to prevent complete vertical flip looping
    rotationRef.current.beta = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, rotationRef.current.beta));

    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full min-h-[480px] bg-neutral-950/65 border border-white/5 p-6 sm:p-8 rounded-sm backdrop-blur-xl relative overflow-hidden group">
      
      {/* Visual glowing corners for hardware tech vibe */}
      <div className="absolute top-0 left-0 w-4 h-px bg-orange-500" />
      <div className="absolute top-0 left-0 w-px h-4 bg-orange-500" />
      <div className="absolute bottom-0 right-0 w-4 h-px bg-orange-500" />
      <div className="absolute bottom-0 right-0 w-px h-4 bg-orange-500" />
      
      {/* Background technical text */}
      <div className="absolute top-4 left-6 hidden sm:flex items-center gap-2 font-mono text-[8px] text-neutral-600 tracking-wider">
        <Radio className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
        <span>SYS_LOG: 48_STATES_BOUND // CHICAGO_HQ_ONLINE</span>
      </div>

      <div className="absolute top-4 right-6 hidden sm:flex items-center gap-4 font-mono text-[8px] text-neutral-600">
        <span>LATENCY: 12MS</span>
        <span>FPS: 60/SEC</span>
      </div>

      {/* LEFT PANEL: Controls & HUB Details */}
      <div className="lg:col-span- così lg:col-span-5 flex flex-col justify-between h-full relative z-10 gap-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-orange-500 font-bold block mb-2">
            3D Navigation Core
          </span>
          <h3 className="text-xl sm:text-2xl font-display font-medium text-white tracking-tight">
            INTELLIGENT FLEET COMPASS
          </h3>
          <p className="text-xs text-neutral-400 mt-2 font-light leading-relaxed">
            Drag the telemetry sphere to pan orbit tracking. Click any core intermodal terminal node below to face track its active routing metrics.
          </p>
        </div>

        {/* Hub Selection Buttons */}
        <div className="flex flex-wrap gap-2 py-2">
          {GLOBAL_HUBS.map((hub) => {
            const isSelected = hub.name === selectedHub.name;
            return (
              <button
                key={hub.name}
                onClick={() => focusHub(hub)}
                className={`px-3 py-1.5 font-mono text-[9px] uppercase rounded-sm border transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-orange-500/10 border-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.15)]"
                    : "bg-neutral-900/60 border-white/5 text-neutral-400 hover:border-white/10 hover:text-white"
                }`}
              >
                <div className={`w-1 h-1 rounded-full ${isSelected ? "bg-orange-500 animate-ping" : "bg-neutral-600"}`} />
                {hub.name}
              </button>
            );
          })}
        </div>

        {/* Selected Hub Details Panel */}
        <div className="bg-black/40 border border-white/5 p-4 rounded-sm font-mono text-[10px] space-y-3 relative">
          <div className="flex justify-between items-center text-neutral-500 border-b border-white/5 pb-2 uppercase font-bold text-[9px] tracking-wider">
            <span className="flex items-center gap-1.5 text-white">
              <Navigation className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
              Terminal parameters
            </span>
            <span>NODE_STA: LIVE</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-neutral-500 uppercase block">Terminal Location</span>
              <span className="text-white font-bold block mt-0.5">{selectedHub.name}, {selectedHub.state}</span>
            </div>
            <div>
              <span className="text-neutral-500 uppercase block">Coordinates</span>
              <span className="text-orange-500 font-bold block mt-0.5">{selectedHub.lat}°N / {Math.abs(selectedHub.lng)}°W</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5">
            <div>
              <span className="text-neutral-500 uppercase block">Active Gateway Routes</span>
              <span className="text-white font-bold block mt-0.5">
                {ROUTES.filter(r => r.from === selectedHub.name || r.to === selectedHub.name).length} High-Yield Lanes
              </span>
            </div>
            <div>
              <span className="text-neutral-500 uppercase block">Station Status</span>
              <span className="text-emerald-400 font-bold block mt-0.5">✓ 100% Operational Uptime</span>
            </div>
          </div>
        </div>

        {/* Console / Status Ticker */}
        <div className="bg-neutral-900/40 px-3.5 py-2.5 rounded-sm flex items-center gap-3 font-mono text-[9px] uppercase tracking-wider text-neutral-400">
          <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse flex-shrink-0" />
          <p className="truncate text-neutral-350">{hudMessage}</p>
        </div>
      </div>

      {/* RIGHT PANEL: The Actual Interactive Globe Canvas */}
      <div 
        ref={containerRef} 
        className="lg:col-span-7 flex items-center justify-center relative select-none"
      >
        <div 
          className="relative cursor-grab active:cursor-grabbing w-[320px] h-[320px] xs:w-[400px] xs:h-[400px] sm:w-[450px] sm:h-[450px] max-w-full"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <canvas 
            ref={canvasRef} 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          
          {/* Controls Overlay */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-neutral-950/80 border border-white/15 px-3 py-1.5 rounded-full backdrop-blur-md">
            <button 
              onClick={() => setIsRotating(!isRotating)}
              className="text-[9px] font-mono uppercase text-orange-500 hover:text-white transition-colors flex items-center gap-1 cursor-pointer focus:outline-none"
            >
              <Power className={`w-3 h-3 ${isRotating ? "text-emerald-400" : "text-neutral-600"}`} />
              <span>{isRotating ? "Auto_Rot" : "Locked_Rot"}</span>
            </button>
            <span className="h-3 w-px bg-white/10" />
            <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest flex items-center gap-1"><Eye className="w-3 h-3" /> Drag orbit</span>
          </div>
        </div>
      </div>

    </div>
  );
}
