import React, { useState, useEffect, useRef } from 'react';
import { 
  ExternalLink, 
  ShieldCheck, 
  ArrowUpRight, 
  Award, 
  Building2, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Compass,
  ArrowRight,
  Sparkles,
  Layers,
  Container,
  Activity,
  HardHat
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

interface Partner {
  name: string;
  url: string;
  description: string;
  logoColor: string;
  accentColor: string;
  location: string;
  founded: string;
  specialty: string;
  category: 'concrete' | 'infrastructure' | 'machinery';
  renderLogo: (isLightMode: boolean) => React.ReactNode;
}

const PARTNERS: Partner[] = [
  {
    name: 'Lafarge Nigeria',
    url: 'https://www.lafarge.com.ng/',
    description: 'Supplying low-carbon eco-label cement and customized ready-mix batches across high-rise Lagos footprints, optimizing coastal concrete cure values.',
    logoColor: '#059669', // Emerald Green
    accentColor: 'from-emerald-500/10 to-teal-500/5',
    location: 'Lagos Island, Nigeria',
    founded: '1959',
    specialty: 'Sustainable Low-Carbon Aggregates',
    category: 'concrete',
    renderLogo: (isLightMode: boolean) => (
      <svg className="h-9 w-auto select-none" viewBox="0 0 340 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 15 L25 65 L48 65 L58 45 L85 45 L85 35 L62 35 L68 22 L85 22 L85 15 Z" fill="#10B981" />
        <text 
          x="100" 
          y="54" 
          fontFamily="system-ui, -apple-system, sans-serif" 
          fontWeight="900" 
          fontSize="36" 
          letterSpacing="0.05em" 
          fill={isLightMode ? '#0C122C' : '#FFFFFF'}
        >
          LAFARGE
        </text>
        <text 
          x="102" 
          y="68" 
          fontFamily="monospace" 
          fontWeight="bold" 
          fontSize="9" 
          letterSpacing="0.1em" 
          fill="#10B981"
        >
          CEMENT & READY-MIX BATCHES
        </text>
      </svg>
    )
  },
  {
    name: 'SPG Nigeria',
    url: 'https://www.spgnigeria.com/projects',
    description: 'Leading heavy engineering consortium executing high-stakes piling and deep-earth civil castings alongside national highway routes.',
    logoColor: '#F59E0B', // Amber Orange
    accentColor: 'from-amber-500/10 to-orange-500/5',
    location: 'Ikoyi HQ, Lagos',
    founded: '1998',
    specialty: 'Heavy Civil Infrastructure & Ground Casting',
    category: 'infrastructure',
    renderLogo: (isLightMode: boolean) => (
      <svg className="h-9 w-auto select-none" viewBox="0 0 340 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text 
          x="20" 
          y="48" 
          fontFamily="system-ui, -apple-system, sans-serif" 
          fontWeight="950" 
          fontSize="44" 
          letterSpacing="0.02em" 
          fill={isLightMode ? '#0C122C' : '#FFFFFF'}
        >
          SPG
        </text>
        <rect x="20" y="54" width="85" height="4" fill="#F59E0B" />
        <text 
          x="22" 
          y="68" 
          fontFamily="monospace" 
          fontWeight="bold" 
          fontSize="10" 
          letterSpacing="0.48em" 
          fill={isLightMode ? '#4B5563' : '#9CA3AF'}
        >
          NIGERIA
        </text>
        <text 
          x="120" 
          y="32" 
          fontFamily="monospace" 
          fontWeight="extrabold" 
          fontSize="8" 
          fill="#F59E0B"
        >
          [ PROJECTS GROUP ]
        </text>
        <text 
          x="120" 
          y="48" 
          fontFamily="system-ui, -apple-system, sans-serif" 
          fontWeight="700" 
          fontSize="14" 
          fill={isLightMode ? '#374151' : '#D1D5DB'}
        >
          Civil Engineering
        </text>
        <text 
          x="120" 
          y="64" 
          fontFamily="system-ui, -apple-system, sans-serif" 
          fontWeight="400" 
          fontSize="11" 
          fill={isLightMode ? '#6B7280' : '#9CA3AF'}
        >
          Heavy Infrastructure
        </text>
      </svg>
    )
  },
  {
    name: 'Levitikal Group',
    url: 'https://levitikalgroup.com/',
    description: 'Premier West African heavy construction equipment charterers, marine staging experts, and project management leaders.',
    logoColor: '#84CC16', // Limon Green
    accentColor: 'from-lime-500/10 to-emerald-500/5',
    location: 'Lekki Staging Depot, Lagos',
    founded: '2012',
    specialty: 'Equipment Charters & Marine Logistics',
    category: 'machinery',
    renderLogo: (isLightMode: boolean) => (
      <svg className="h-9 w-auto select-none" viewBox="0 0 340 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 50 H65 M20 50 L25 40 H55 L60 50 M25 40 L35 25 L50 30" stroke="#84CC16" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M45 28 L62 18 L75 32 L85 30" stroke="#84CC16" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M83 26 L88 34 L82 38 Z" fill="#84CC16" />
        <text 
          x="95" 
          y="44" 
          fontFamily="system-ui, -apple-system, sans-serif" 
          fontWeight="800" 
          fontSize="26" 
          letterSpacing="-0.02em" 
          fill={isLightMode ? '#0C122C' : '#FFFFFF'}
        >
          Levitikal
        </text>
        <text 
          x="96" 
          y="60" 
          fontFamily="system-ui, -apple-system, sans-serif" 
          fontWeight="500" 
          fontSize="9.5" 
          letterSpacing="0.04em" 
          fill="#84CC16"
        >
          CONSTRUCTION & EQUIPMENT LEASING
        </text>
      </svg>
    )
  },
  {
    name: 'BCL Nigeria',
    url: 'https://www.bclnig.com/',
    description: 'Multi-decade general commercial builders delivering prime concrete load-handling and precision structural columns across Nigeria.',
    logoColor: '#0EA5E9', // Sky Blue
    accentColor: 'from-sky-500/10 to-blue-500/5',
    location: 'Apapa, Lagos',
    founded: '1989',
    specialty: 'High-Density Structural Casting',
    category: 'concrete',
    renderLogo: (isLightMode: boolean) => (
      <svg className="h-9 w-auto select-none" viewBox="0 0 340 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text 
          x="15" 
          y="50" 
          fontFamily="system-ui, -apple-system, sans-serif" 
          fontWeight="900" 
          fontSize="48" 
          letterSpacing="-0.03em" 
          fill={isLightMode ? '#1E293B' : '#E2E8F0'}
        >
          B
        </text>
        <text 
          x="50" 
          y="50" 
          fontFamily="system-ui, -apple-system, sans-serif" 
          fontWeight="900" 
          fontSize="48" 
          letterSpacing="-0.03em" 
          fill="#0EA5E9"
        >
          C
        </text>
        <text 
          x="82" 
          y="50" 
          fontFamily="system-ui, -apple-system, sans-serif" 
          fontWeight="900" 
          fontSize="48" 
          letterSpacing="-0.03em" 
          fill={isLightMode ? '#475569' : '#94A3B8'}
        >
          L
        </text>
        <path d="M125 15 H145 M130 15 V55 M135 15 V55 M140 15 V55 M125 55 H145 M122 11 H148" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" />
        <text 
          x="16" 
          y="68" 
          fontFamily="monospace" 
          fontWeight="bold" 
          fontSize="7.5" 
          letterSpacing="0.12em" 
          fill={isLightMode ? '#1E293B' : '#FFFFFF'}
        >
          BUSINESS CONTRACTING LIMITED
        </text>
      </svg>
    )
  },
  {
    name: 'Zoomlion Global',
    url: 'https://en.zoomlion.com/',
    description: 'International machinery giants co-engineering high-pressure pump sensors, drilling metrics, and bulk safety diagnostics.',
    logoColor: '#EAB308', // Yellow
    accentColor: 'from-yellow-500/10 to-amber-500/5',
    location: 'Hunan, Changsha',
    founded: '1992',
    specialty: 'Heavy Machinery Manufacturing',
    category: 'machinery',
    renderLogo: (isLightMode: boolean) => (
      <svg className="h-9 w-auto select-none" viewBox="0 0 340 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="35" cy="40" r="20" stroke="#EAB308" strokeWidth="4" />
        <path d="M25 40 H45 M35 30 V50" stroke="#EAB308" strokeWidth="2.5" strokeLinecap="round" />
        <text 
          x="70" 
          y="48" 
          fontFamily="system-ui, -apple-system, sans-serif" 
          fontWeight="900" 
          fontSize="26" 
          letterSpacing="0.02em" 
          fill={isLightMode ? '#0C122C' : '#FFFFFF'}
        >
          ZOOMLION
        </text>
        <text 
          x="72" 
          y="64" 
          fontFamily="monospace" 
          fontWeight="bold" 
          fontSize="9.5" 
          letterSpacing="0.1em" 
          fill="#EAB308"
        >
          GLOBAL ENGINEERING PARTNERS
        </text>
      </svg>
    )
  },
  {
    name: 'Sany Group',
    url: 'https://www.sanyglobal.com/',
    description: 'Strategic heavy manufacturing allies providing Tier-1 crawler cranes, high-capacity concrete boom pumps, and digital dashboard parameters.',
    logoColor: '#DC2626', // Sany Red
    accentColor: 'from-red-500/10 to-rose-500/5',
    location: 'Beijing, China',
    founded: '1989',
    specialty: 'Hydraulic Pumping & Staging Integration',
    category: 'machinery',
    renderLogo: (isLightMode: boolean) => (
      <svg className="h-9 w-auto select-none" viewBox="0 0 340 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="40" r="22" stroke="#EF4444" strokeWidth="2.5" />
        <path d="M32 40 L32 20 C38 24 38 34 32 40 Z" fill="#EF4444" />
        <path d="M32 40 L49 50 C44 54 36 50 32 40 Z" fill="#EF4444" />
        <path d="M32 40 L15 50 C12 44 20 40 32 40 Z" fill="#EF4444" />
        <text 
          x="68" 
          y="49" 
          fontFamily="system-ui, -apple-system, sans-serif" 
          fontWeight="950" 
          fontSize="36" 
          letterSpacing="-0.02em" 
          fill={isLightMode ? '#0C122C' : '#FFFFFF'}
        >
          SANY
        </text>
        <text 
          x="69" 
          y="64" 
          fontFamily="monospace" 
          fontWeight="bold" 
          fontSize="9" 
          letterSpacing="0.15em" 
          fill="#EF4444"
        >
          HEAVY INDUSTRY CORES
        </text>
      </svg>
    )
  }
];

const PROJECT_DISTRIBUTION = [
  { name: 'Concrete & Ready-Mix', count: 82, color: '#10B981', partners: 'Lafarge & BCL' },
  { name: 'Heavy Civil & Piling', count: 62, color: '#F59E0B', partners: 'SPG Nigeria' },
  { name: 'Heavy Machinery & Fleet', count: 167, color: '#EF4444', partners: 'Sany, Zoomlion & Levitikal' }
];

const SPECIALTY_FILTERS = [
  { id: 'all', label: 'All Specialties', icon: Layers },
  { id: 'concrete', label: 'Concrete & Ready-Mix', icon: Container },
  { id: 'infrastructure', label: 'Heavy Civil & Piling', icon: HardHat },
  { id: 'machinery', label: 'Heavy Machinery & Fleet', icon: Activity }
] as const;

export default function PartnersSection({ isLightMode = false }: { isLightMode?: boolean }) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'concrete' | 'infrastructure' | 'machinery'>('all');
  const [selectedPartnerName, setSelectedPartnerName] = useState<string>(PARTNERS[0].name);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isCardHovered, setIsCardHovered] = useState<boolean>(false);
  const autoPlayTimer = useRef<NodeJS.Timeout | null>(null);

  // Filter partners list based on selected filter
  const filteredPartners = PARTNERS.filter(p => activeFilter === 'all' || p.category === activeFilter);

  // Ensure selectedPartnerName state stays valid on filter change
  useEffect(() => {
    if (filteredPartners.length > 0) {
      // Check if current selected partner name is present in filtered list
      const isStillAvailable = filteredPartners.some(p => p.name === selectedPartnerName);
      if (!isStillAvailable) {
        setSelectedPartnerName(filteredPartners[0].name);
      }
    }
  }, [activeFilter, filteredPartners, selectedPartnerName]);

  // Find the currently active partner details
  const activePartner = PARTNERS.find(p => p.name === selectedPartnerName) || PARTNERS[0];
  const currentIndex = filteredPartners.findIndex(p => p.name === selectedPartnerName);

  // Auto scroll spotlight showcase
  useEffect(() => {
    if (isAutoPlaying && !isHovered && filteredPartners.length > 1) {
      autoPlayTimer.current = setInterval(() => {
        handleNext();
      }, 5500);
    } else {
      if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
    }

    return () => {
      if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
    };
  }, [isAutoPlaying, selectedPartnerName, isHovered, filteredPartners.length]);

  const handleNext = () => {
    if (filteredPartners.length === 0) return;
    setSlideDirection('right');
    const nextIdx = (currentIndex + 1) % filteredPartners.length;
    setSelectedPartnerName(filteredPartners[nextIdx].name);
  };

  const handlePrev = () => {
    if (filteredPartners.length === 0) return;
    setSlideDirection('left');
    const prevIdx = (currentIndex - 1 + filteredPartners.length) % filteredPartners.length;
    setSelectedPartnerName(filteredPartners[prevIdx].name);
  };

  const handleSelectPartner = (name: string) => {
    const targetIdx = filteredPartners.findIndex(p => p.name === name);
    setSlideDirection(targetIdx > currentIndex ? 'right' : 'left');
    setSelectedPartnerName(name);
  };

  // Build the marquee partners with duplicate loops to ensure perfect continuous layout
  const marqueePartners: Partner[] = [];
  if (filteredPartners.length > 0) {
    while (marqueePartners.length < 15) {
      marqueePartners.push(...filteredPartners);
    }
  }

  // Animation Variant values for slides
  const slideVariants = {
    initial: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? 60 : -60,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.35, ease: 'easeOut' }
    },
    exit: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? -60 : 60,
      opacity: 0,
      transition: { duration: 0.32, ease: 'easeIn' }
    })
  };

  return (
    <section 
      id="clasqo-global-partners"
      className={`py-16 border-b transition-colors duration-200 relative overflow-hidden ${
        isLightMode 
          ? 'bg-neutral-50/50 border-neutral-200' 
          : 'bg-[#050918] border-[#182747]'
      }`}
    >
      {/* Structural matrix line visual backdrop */}
      <div className={`absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none ${
        isLightMode ? 'opacity-[0.06]' : 'opacity-100'
      }`} />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-3">
            <span className="text-[10px] text-amber-500 font-black uppercase tracking-[0.25em] leading-none mb-1 font-mono flex items-center gap-1.5 animate-pulse">
              <Award className="w-3.5 h-3.5 text-amber-500" /> CLASQO INDUSTRIAL ALLIANCE
            </span>
            <h2 className={`text-3xl font-black uppercase tracking-tight ${
              isLightMode ? 'text-[#0C122C]' : 'text-white'
            }`}>
              Authorized Partners & Engineering Networks
            </h2>
            <p className={`text-xs sm:text-sm max-w-2xl leading-relaxed ${
              isLightMode ? 'text-neutral-600' : 'text-neutral-400'
            }`}>
              We work in direct alignment with global heavy machinery producers, ready-mix batch manufacturers, and premium civil construction firms across West Africa.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Auto Play status controller toggle */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`font-mono text-[9px] px-3 py-1.5 border uppercase flex items-center gap-1.5 cursor-pointer hover:border-amber-500 transition-colors ${
                isLightMode 
                  ? 'bg-white border-neutral-300 text-neutral-600' 
                  : 'bg-neutral-950 border-[#1c305e]/30 text-neutral-300'
              }`}
              title={isAutoPlaying ? "Pause Auto-Rotation" : "Resume Auto-Rotation"}
            >
              {isAutoPlaying ? (
                <>
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span>Cycle Drive: ON</span>
                  <Pause className="w-2.5 h-2.5 ml-0.5 text-neutral-400" />
                </>
              ) : (
                <>
                  <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full" />
                  <span>Cycle Drive: PAUSE</span>
                  <Play className="w-2.5 h-2.5 ml-0.5 text-amber-500" />
                </>
              )}
            </button>

            <div className={`font-mono text-[9px] px-3.5 py-1.5 border uppercase flex items-center gap-1.5 shrink-0 select-none ${
              isLightMode ? 'bg-white border-neutral-300 text-neutral-500' : 'bg-neutral-950 border-[#1c305e]/30 text-neutral-450'
            }`}>
              <span>{filteredPartners.length} Active Segment Cores</span>
            </div>
          </div>
        </div>

        {/* ================= TAG-BASED SPECIALTY FILTER SELECTOR ================= */}
        <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-dashed border-neutral-800/10 pb-4">
          <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest mr-2 select-none">
            FILTER SPECIALTY:
          </span>
          {SPECIALTY_FILTERS.map(filter => {
            const IconComp = filter.icon;
            const isFilterActive = activeFilter === filter.id;
            const count = filter.id === 'all' 
              ? PARTNERS.length 
              : PARTNERS.filter(p => p.category === filter.id).length;
            
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono font-medium tracking-wide cursor-pointer transition-all border ${
                  isFilterActive
                    ? isLightMode 
                      ? 'bg-[#0C122C] border-[#0C122C] text-white font-bold'
                      : 'bg-amber-550 border-amber-500 text-[#050918] font-bold shadow-sm'
                    : isLightMode
                      ? 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                      : 'bg-neutral-950/60 border-[#182747] text-neutral-400 hover:text-white hover:border-[#1c305e]'
                }`}
              >
                <IconComp className={`w-3.5 h-3.5 ${isFilterActive ? 'text-amber-600 dark:text-neutral-900 animate-pulse' : 'text-neutral-500'}`} />
                <span className="uppercase">{filter.label}</span>
                <span className={`text-[8.5px] px-1.5 py-0.2 rounded font-bold ${
                  isFilterActive 
                    ? isLightMode ? 'bg-neutral-800 text-white' : 'bg-neutral-950/80 text-amber-500'
                    : isLightMode ? 'bg-neutral-100 text-neutral-500' : 'bg-neutral-900 text-neutral-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ================= STAGE 1: INFINITE AUTO-MARQUEE RIBBON ================= */}
        <div className="mb-8 relative">
          <div className={`absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r pointer-events-none z-10 ${
            isLightMode ? 'from-neutral-50/50 to-transparent' : 'from-[#050918] to-transparent'
          }`} />
          <div className={`absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l pointer-events-none z-10 ${
            isLightMode ? 'from-neutral-50/50 to-transparent' : 'from-[#050918] to-transparent'
          }`} />

          {/* Scrolling Marquee wrapper frame */}
          <div 
            className={`border-t border-b overflow-hidden py-4 select-none flex ${
              isLightMode ? 'bg-white/80 border-neutral-200' : 'bg-[#0B122C]/30 border-[#182747]'
            }`}
          >
            {/* Speed loop marquee track */}
            {marqueePartners.length > 0 ? (
              <div className="flex shrink-0 min-w-full justify-around items-center gap-16 animate-marquee hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing">
                {marqueePartners.map((partner, index) => {
                  const isFocused = selectedPartnerName === partner.name;
                  return (
                    <button
                      key={`${partner.name}-${index}`}
                      onClick={() => handleSelectPartner(partner.name)}
                      className={`flex items-center justify-center h-11 px-4 cursor-pointer transition-all duration-300 gap-2 shrink-0 border hover:-translate-y-1 ${
                        isFocused 
                          ? 'border-amber-500 bg-amber-500/10 grayscale-0 opacity-100 scale-105 shadow-[0_0_12px_rgba(245,158,11,0.25)]' 
                          : isLightMode 
                            ? 'border-transparent grayscale opacity-50 hover:grayscale-0 hover:opacity-100 hover:scale-105 hover:bg-neutral-100 hover:shadow-sm' 
                            : 'border-transparent grayscale opacity-40 hover:grayscale-0 hover:opacity-100 hover:scale-105 hover:bg-[#0B122C]/40 hover:shadow-[0_0_12px_rgba(255,255,255,0.05)]'
                      }`}
                      style={{
                        filter: isFocused ? `drop-shadow(0 0 6px ${partner.logoColor}66)` : undefined
                      }}
                    >
                      {partner.renderLogo(isLightMode)}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="w-full text-center py-2 font-mono text-xs text-neutral-500">
                NO PILLARS REGISTERED IN THIS SPECIALTY SEGMENT
              </div>
            )}
          </div>

          {/* Small operational notice */}
          <div className="flex justify-between items-center text-[8.5px] font-mono text-neutral-500 mt-1.5 px-1 uppercase">
            <span>&laquo; DRAG OR HOVER MARQUEE TO FREEZE SWEET SCROLL</span>
            <span>REAL-TIME ALLIANCE TELEMETRY ENGINES &raquo;</span>
          </div>
        </div>

        {/* ================= STAGE 2: SPOTLIGHT SHOWCASE CONSOLE ================= */}
        {filteredPartners.length > 0 ? (
          <div 
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* LEFT SLIDER CONTROL PANELS (Col span 4) */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-4">
              <div className={`p-5 border flex flex-col justify-between gap-4 h-full ${
                isLightMode ? 'bg-white border-neutral-200' : 'bg-[#080d22] border-[#182747]'
              }`}>
                <div>
                  <span className={`text-[9px] font-mono font-black tracking-wider block mb-2.5 ${
                    isLightMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}>
                    PARTNER STATUS DIRECTORY ({filteredPartners.length})
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {filteredPartners.map((partner, idx) => {
                      const isActive = partner.name === selectedPartnerName;
                      return (
                        <button
                          key={partner.name}
                          onClick={() => handleSelectPartner(partner.name)}
                          className={`w-full flex items-center justify-between text-left px-3.5 py-2.5 text-xs font-mono font-semibold transition-all relative cursor-pointer border ${
                            isActive 
                              ? isLightMode 
                                ? 'bg-amber-500 border-amber-500 text-neutral-950 translate-x-1.5 font-bold'
                                : 'bg-[#0B122C]/90 border-amber-500 text-amber-500 translate-x-1.5 shadow-sm font-bold'
                              : isLightMode
                                ? 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:bg-neutral-100 hover:border-neutral-300'
                                : 'bg-neutral-950/40 border-[#182747]/80 text-neutral-400 hover:text-white hover:border-[#1c305e]'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              isActive ? 'bg-amber-500 animate-pulse' : 'bg-neutral-600'
                            }`} />
                            <span className="uppercase tracking-wider">{partner.name}</span>
                          </div>
                          <span className={`text-[10px] ${isActive ? 'text-amber-500 font-bold' : 'text-neutral-500'}`}>
                            0{idx + 1}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Hardware Trigger buttons */}
                {filteredPartners.length > 1 && (
                  <div className="pt-4 border-t border-dashed border-neutral-700/30 flex items-center justify-between gap-2.5">
                    <button
                      onClick={handlePrev}
                      className={`w-1/2 p-2.5 border font-mono text-[10px] font-bold uppercase flex items-center justify-center gap-1 cursor-pointer transition-colors ${
                        isLightMode 
                          ? 'bg-neutral-50 hover:bg-neutral-100 hover:border-neutral-400 text-[#0C122C] border-neutral-200' 
                          : 'bg-neutral-950 hover:border-[#1c305e] text-white border-[#182747]'
                      }`}
                    >
                      <ChevronLeft className="w-3.5 h-3.5 text-amber-500" />
                      <span>PREV BASE</span>
                    </button>
                    <button
                      onClick={handleNext}
                      className={`w-1/2 p-2.5 border font-mono text-[10px] font-bold uppercase flex items-center justify-center gap-1 cursor-pointer transition-colors ${
                        isLightMode 
                          ? 'bg-neutral-50 hover:bg-neutral-100 hover:border-neutral-400 text-[#0C122C] border-neutral-200' 
                          : 'bg-neutral-950 hover:border-[#1c305e] text-white border-[#182747]'
                      }`}
                    >
                      <span>NEXT BASE</span>
                      <ChevronRight className="w-3.5 h-3.5 text-amber-500" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* ACTIVE DETAILS SPOTLIGHT DECK (Col span 8) */}
            <div className="lg:col-span-8 flex flex-col">
              <div 
                onMouseEnter={() => setIsCardHovered(true)}
                onMouseLeave={() => setIsCardHovered(false)}
                className={`p-6 sm:p-8 border h-full flex flex-col justify-between relative overflow-hidden transition-all duration-310 ${
                  isCardHovered 
                    ? isLightMode
                      ? 'bg-white border-neutral-300 -translate-y-1 shadow-md shadow-neutral-200/50'
                      : 'bg-[#0B122C]/50 border-amber-500/40 -translate-y-1 shadow-[0_4px_30px_rgba(245,158,11,0.12)]'
                    : isLightMode 
                      ? 'bg-white border-neutral-200 shadow-sm' 
                      : 'bg-[#0B122C]/40 border-amber-500/20'
                }`}
              >
                
                {/* Dynamic decorative backdrop radial bloom matched to active partner color */}
                <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl blur-3xl opacity-10 pointer-events-none transition-all duration-500 ${activePartner.accentColor}`} />
                
                {/* Corner tech vector tag */}
                <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#182747]/40 pointer-events-none" />
                
                {/* Header metadata layout */}
                <div className="flex items-center justify-between border-b pb-4 border-neutral-800/20 font-mono text-[9px] relative z-10">
                  <span className="flex items-center gap-1.5 uppercase font-bold text-amber-550">
                    <Compass className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" /> Spotlight Deck [ 0{currentIndex + 1} / 0{filteredPartners.length} ]
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 uppercase ${
                      isLightMode ? 'bg-neutral-100 text-neutral-600' : 'bg-neutral-900 text-neutral-400'
                    }`}>
                      Segment: {activePartner.category}
                    </span>
                    <span className={`px-2 py-0.5 uppercase ${
                      isLightMode ? 'bg-neutral-100 text-neutral-600' : 'bg-neutral-900 text-neutral-400'
                    }`}>
                      Founded: {activePartner.founded}
                    </span>
                  </div>
                </div>

                {/* Animated Core Content Frame */}
                <div className="my-6 relative z-10 overflow-hidden flex-grow flex flex-col justify-center min-h-[160px]">
                  <AnimatePresence mode="wait" custom={slideDirection}>
                    <motion.div
                      key={activePartner.name}
                      custom={slideDirection}
                      variants={slideVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="space-y-5"
                    >
                      {/* Brand Logo Presentation Area */}
                      <div 
                        className="h-16 flex items-center justify-start transition-all duration-300"
                        style={{
                          filter: isCardHovered 
                            ? `drop-shadow(0 0 10px ${activePartner.logoColor}bb)` 
                            : 'drop-shadow(0 0 0px transparent)'
                        }}
                      >
                        {activePartner.renderLogo(isLightMode)}
                      </div>

                      <div className="space-y-4">
                        {/* Description Text */}
                        <p className={`text-xs sm:text-sm lg:text-[15px] leading-relaxed font-sans ${
                          isLightMode ? 'text-neutral-700' : 'text-neutral-200'
                        }`}>
                          {activePartner.description}
                        </p>

                        {/* Diagnostic Partner Specs Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                          <div className={`p-3 border font-mono text-[10px] ${
                            isLightMode ? 'bg-neutral-50/50 border-neutral-200' : 'bg-[#050918]/60 border-[#182747]/40'
                          }`}>
                            <span className={`block uppercase mb-0.5 text-[8.5px] ${isLightMode ? 'text-neutral-400' : 'text-neutral-500'}`}>ENGINEERING SPECIALTY</span>
                            <span className={`font-semibold uppercase tracking-wide ${isLightMode ? 'text-[#0C122C]' : 'text-white'}`}>
                              {activePartner.specialty}
                            </span>
                          </div>
                          <div className={`p-3 border font-mono text-[10px] ${
                            isLightMode ? 'bg-neutral-50/50 border-neutral-200' : 'bg-[#050918]/60 border-[#182747]/40'
                          }`}>
                            <span className={`block uppercase mb-0.5 text-[8.5px] ${isLightMode ? 'text-neutral-400' : 'text-neutral-500'}`}>COOPERATIVE HEADBASE</span>
                            <span className={`font-semibold uppercase tracking-wide ${isLightMode ? 'text-[#0C122C]' : 'text-white'}`}>
                              {activePartner.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Showcase Footer Action & Target Link */}
                <div className="pt-4 border-t border-neutral-800/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[10px] relative z-10">
                  <div className="flex items-center gap-1.5 uppercase font-semibold text-neutral-400">
                    <Building2 className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Authorized International Directory Asset</span>
                  </div>
                  
                  <a
                    href={activePartner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2 border font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isLightMode 
                        ? 'bg-[#0C122C] hover:bg-neutral-800 text-white border-[#0C122C]' 
                        : 'bg-amber-500 hover:bg-amber-600 text-[#050918] border-amber-500'
                    }`}
                  >
                    <span>Connect Domain API</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>

              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-10 font-mono text-neutral-500 border border-dashed border-[#182747]">
            NO ACTIVE PARTNERS IN THIS CATEGORY.
          </div>
        )}

        {/* Distribution of Projects by Specialty Bar Chart Section */}
        <div className={`mt-10 p-6 border relative overflow-hidden transition-all duration-300 ${
          isLightMode 
            ? 'bg-white border-neutral-200 shadow-sm hover:shadow-md' 
            : 'bg-[#0B122C]/40 border-[#182747]/80 hover:border-amber-500/20'
        }`}>
          <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-[9px] text-amber-500 font-mono font-bold tracking-[0.25em] uppercase block mb-1">
                ALLIANCE ANALYTICS ENGINE
              </span>
              <h3 className={`text-base font-black uppercase tracking-tight ${isLightMode ? 'text-[#0C122C]' : 'text-white'}`}>
                Distribution of Projects by Specialty
              </h3>
              <p className={`text-xs mt-0.5 ${isLightMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                Active project counts and staged service deployment volumes across all collaborative bases.
              </p>
            </div>
            
            <div className="flex gap-3 font-mono text-[9px]">
              <div className={`px-2.5 py-1.5 border ${isLightMode ? 'bg-neutral-50 border-neutral-200' : 'bg-neutral-950/40 border-[#1c305e]/40'}`}>
                <span className="text-neutral-500 block uppercase text-[7.5px] leading-none mb-0.5">AGGREGATE VALUE</span>
                <span className={`font-bold ${isLightMode ? 'text-[#0C122C]' : 'text-white'}`}>311 MAJOR PROJECTS</span>
              </div>
              <div className={`px-2.5 py-1.5 border ${isLightMode ? 'bg-neutral-50 border-neutral-200' : 'bg-neutral-950/40 border-[#1c305e]/40'}`}>
                <span className="text-neutral-500 block uppercase text-[7.5px] leading-none mb-0.5">UPDATE STATUS</span>
                <span className="text-emerald-500 font-bold uppercase">• LIVE TELEMETRY</span>
              </div>
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={PROJECT_DISTRIBUTION}
                margin={{ top: 10, right: 10, left: -25, bottom: 5 }}
              >
                <CartesianGrid 
                  strokeDasharray="2 2" 
                  stroke={isLightMode ? '#e5e5e5' : '#14223f'} 
                  vertical={false}
                />
                <XAxis 
                  dataKey="name" 
                  stroke={isLightMode ? '#6b7280' : '#4d639b'}
                  fontSize={9}
                  fontFamily="monospace"
                  tickLine={false}
                  axisLine={{ stroke: isLightMode ? '#e2e8f0' : '#182747' }}
                  tickFormatter={(val) => {
                    if (window.innerWidth < 640) {
                      return val.split(' & ')[0];
                    }
                    return val;
                  }}
                />
                <YAxis 
                  stroke={isLightMode ? '#6b7280' : '#4d639b'}
                  fontSize={9}
                  fontFamily="monospace"
                  tickLine={false}
                  axisLine={{ stroke: isLightMode ? '#e2e8f0' : '#182747' }}
                />
                <Tooltip
                  cursor={{ fill: isLightMode ? '#f5f5f5' : '#ffffff03' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className={`p-3 border font-mono text-[10px] pointer-events-none rounded-none shadow-xl ${
                          isLightMode 
                            ? 'bg-white border-neutral-300 text-neutral-800' 
                            : 'bg-[#080d22] border-[#22396e] text-white'
                        }`}>
                          <div className="border-b pb-1 mb-1.5 border-neutral-800/10 dark:border-neutral-850">
                            <span className="text-amber-500 font-bold uppercase text-[7.5px] tracking-wider block">
                              SPECIALTY PROFILE
                            </span>
                            <span className="font-bold uppercase text-[10.5px] block mt-0.5">
                              {data.name}
                            </span>
                          </div>
                          <div className="space-y-1 text-[9.5px]">
                            <div className="flex justify-between gap-6">
                              <span className="text-neutral-500 uppercase">Completed operations:</span>
                              <span className="text-emerald-500 font-extrabold">{data.count} Projects</span>
                            </div>
                            <div className="flex justify-between gap-6">
                              <span className="text-neutral-500 uppercase">Alliance members:</span>
                              <span className="text-amber-500 font-bold">{data.partners}</span>
                            </div>
                            <div className="flex justify-between gap-6">
                              <span className="text-neutral-500 uppercase">Sector weight:</span>
                              <span className={`font-bold ${isLightMode ? 'text-neutral-800' : 'text-neutral-200'}`}>
                                {((data.count / 311) * 100).toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="count" 
                  radius={0} 
                  maxBarSize={45}
                >
                  {PROJECT_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-4 items-center justify-between border-t border-dashed border-neutral-800/10 dark:border-neutral-800/40 pt-3.5 font-mono text-[9px] text-neutral-500">
            <span className="uppercase">Platform Telemetry Senders Active</span>
            <span className="uppercase">AGGREGATOR VERIFIED KPI v4.12</span>
          </div>
        </div>

        {/* Global Compliance Sub-footer bar */}
        <div className={`mt-8 p-4 font-mono text-[9px] flex flex-wrap items-center justify-between gap-4 border border-dashed ${
          isLightMode 
            ? 'bg-white border-neutral-200 text-neutral-400' 
            : 'bg-neutral-950/20 border-[#182747]/60 text-neutral-450'
        }`}>
          <span className="flex items-center gap-1.5 uppercase font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Authorized International Engineering Channels
          </span>
          <span className="uppercase text-neutral-500">
            SECURE ROUTER ID: TR-NG-CN-LKD
          </span>
        </div>

      </div>
    </section>
  );
}
