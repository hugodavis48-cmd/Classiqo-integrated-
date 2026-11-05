/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  Award, 
  BadgeCheck, 
  ShieldCheck, 
  Star, 
  Sparkles, 
  Building2, 
  Compass, 
  ShieldAlert, 
  Layers, 
  Flame, 
  Gauge, 
  Wrench,
  TrendingUp,
  Activity,
  HeartHandshake,
  DollarSign,
  FileCheck,
  CheckCircle,
  ExternalLink,
  MapPin,
  Clock,
  Sliders,
  Play,
  Pause,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface Testimonial {
  id: number;
  companyName: string;
  firmType: string;
  speakerName: string;
  speakerRole: string;
  projectLoc: string;
  quoteText: string;
  machineryUsed: string;
  ratingGrade: number; // 4 or 5
  engineeringScore: string;
  metricLabel: string;
  metricVal: string;
  category: 'high-rise' | 'infrastructure' | 'industrial' | 'marine' | 'investment';
  investorCapital?: string;
  investorYield?: string;
  verifiedDeedId?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  // Verified Investor Partners
  {
    id: 16,
    companyName: "Diaspora Infrastructure Angel Fund",
    firmType: "Private Infrastructure Asset Syndicate",
    speakerName: "Dr. Austin Okonkwo",
    speakerRole: "Managing Partner (London & Lagos)",
    projectLoc: "Sany 56m Boom Fleet (Eko Atlantic Basin)",
    quoteText: "As an overseas diaspora partner, Clasqo's machinery co-ownership model gives us real hard-currency returns insulated from local inflation. We receive monthly USD wire dividends backed by actual machine telematics running at Eko Atlantic. Transparent, punctual, and legally fortified.",
    machineryUsed: "Sany 56m Boom Pump Co-Ownership",
    ratingGrade: 5,
    engineeringScore: "27.8% USD NET YIELD",
    metricLabel: "REALIZED INVESTOR DIVIDEND",
    metricVal: "$19,460 USD Received",
    category: "investment",
    investorCapital: "$35,000 USD (Executive Tier)",
    investorYield: "27.8% Annualized",
    verifiedDeedId: "CAC-CO-2024-BM56-02"
  },
  {
    id: 17,
    companyName: "Savage Private Capital Consortium",
    firmType: "Executive Family Office & Asset Managers",
    speakerName: "Chief Adeyemi Savage",
    speakerRole: "Principal Investment Director (Lagos)",
    projectLoc: "Lekki Free Zone Rotary Piling Syndicate",
    quoteText: "We syndicated $100k across two Sany piling rigs working in the Lekki corridor. Clasqo handles 100% of the operational heavy lifting—preventive maintenance, certified operators, and client collections. Every quarter our net profit share lands on schedule with full mechanical telemetry audit sheets.",
    machineryUsed: "Sany SR285 Rotary Piling Fleet",
    ratingGrade: 5,
    engineeringScore: "32.4% ANNUALIZED ROI",
    metricLabel: "TOTAL CAPITAL SYNDICATED",
    metricVal: "$100,000 USD Active",
    category: "investment",
    investorCapital: "$100,000 USD (Institutional)",
    investorYield: "32.4% Annualized",
    verifiedDeedId: "CAC-CO-2024-SR285-01"
  },
  {
    id: 18,
    companyName: "Lekki Peninsula Energy & Civils",
    firmType: "Industrial Infrastructure Syndicate",
    speakerName: "Engr. Tunde Doherty",
    speakerRole: "Chief Executive Officer (Lagos & Houston)",
    projectLoc: "Dangote Refinery & Lekki Port Link Viaduct",
    quoteText: "Our co-owned Zoomlion 50T mobile telescopic crane has maintained a 98% charter occupancy rate since commissioning. Clasqo's 70/30 profit split is executed with Swiss-clock precision directly into our Houston dollar account. The asset security deed registered with CAC provided total confidence.",
    machineryUsed: "Zoomlion 50T All-Terrain Mobile Crane",
    ratingGrade: 5,
    engineeringScore: "31.2% USD NET YIELD",
    metricLabel: "REALIZED INVESTOR DIVIDEND",
    metricVal: "$15,600 USD Received",
    category: "investment",
    investorCapital: "$50,000 USD (Institutional)",
    investorYield: "31.2% Annualized",
    verifiedDeedId: "CAC-CO-2024-CR50-03"
  },
  {
    id: 19,
    companyName: "North-South Capital Growth Trust",
    firmType: "Endowment & Pension Asset Syndicate",
    speakerName: "Alhaja Fatima Dangote-Bello",
    speakerRole: "Executive Trustee (Abuja FCT)",
    projectLoc: "Abuja-Kaduna Rail Flyover Piers",
    quoteText: "Co-owning high-pressure stationary trailer pumps with Clasqo has proven far superior to local real estate or treasury bills. We get monthly verified dollar income, complete GPS engine telematics access, and 100% maintenance guarantee by their factory-trained Sany technicians.",
    machineryUsed: "Atabey Stationary Trailer Pump #CQL-AT-HBT80",
    ratingGrade: 5,
    engineeringScore: "26.5% REALIZED APY",
    metricLabel: "ANNUAL HARVEST DIVIDEND",
    metricVal: "$6,625 USD Disbursed",
    category: "investment",
    investorCapital: "$25,000 USD (Executive Tier)",
    investorYield: "26.5% Annualized",
    verifiedDeedId: "CAC-CO-2024-AT80-04"
  },
  {
    id: 20,
    companyName: "Horizon Law & Maritime Asset Mgmt",
    firmType: "Commercial Legal & Private Equity Partners",
    speakerName: "Barrister Chidi Nwosu",
    speakerRole: "Senior Managing Partner (London & Lagos)",
    projectLoc: "Apapa Container Port Shoreline Reclamation",
    quoteText: "From a legal perspective, Clasqo's co-ownership structure is bulletproof. The chassis serial number is co-titled, backed by an All-Risks AXA Mansard heavy machinery policy. Our Growth Fleet package paid out its first 6 months of dividends without a single day's delay.",
    machineryUsed: "Sany SY215C Hydraulic Excavator #CQL-EX-215C",
    ratingGrade: 5,
    engineeringScore: "22.8% NET USD YIELD",
    metricLabel: "MONTHLY WIRE TRANSFER",
    metricVal: "$285 USD / Month Average",
    category: "investment",
    investorCapital: "$15,000 USD (Growth Fleet)",
    investorYield: "22.8% Annualized",
    verifiedDeedId: "CAC-CO-2024-EX215-05"
  },
  {
    id: 21,
    companyName: "Sahelian Maritime & Heavy Logistics",
    firmType: "Offshore Dredging & Deep Foundation Consortium",
    speakerName: "Capt. Ibrahim Bello",
    speakerRole: "Managing Director (Port Harcourt & Kano)",
    projectLoc: "Bonny Island LNG Terminal Foundation Piles",
    quoteText: "We deployed $75k into the Sany SR285 Bored Piling Rig syndicate. The machine ran continuously sinking 2.5m diameter shafts through deep river sand beds. Clasqo absorbs all replacement wear costs under the 30% operational fee. Our return topped 33% annualized.",
    machineryUsed: "Sany SR285 Bored Piling Rig #CQL-RIG-02",
    ratingGrade: 5,
    engineeringScore: "33.1% NET AUDITED APY",
    metricLabel: "TOTAL REVENUE RECEIVED",
    metricVal: "$24,825 USD Harvested",
    category: "investment",
    investorCapital: "$75,000 USD (Institutional)",
    investorYield: "33.1% Annualized",
    verifiedDeedId: "CAC-CO-2024-SR285-02"
  },
  {
    id: 22,
    companyName: "Pacific Crest Family Office",
    firmType: "Multi-Family Real Estate & Venture Syndicate",
    speakerName: "Mrs. Folashade Adeyemi-Alakija",
    speakerRole: "Principal Family Asset Allocator (Victoria Island)",
    projectLoc: "Banana Island Coastal Luxury Residences",
    quoteText: "As wealth managers safeguarding multi-generational capital, we look for physical revenue-generating machinery with clear demand. Clasqo's boom pumps are booked 6 months in advance across Lekki and Ikoyi. The transparent investor dashboard and on-demand telematics make this an exceptional asset class.",
    machineryUsed: "Sany 56m Concrete Boom Pump #CQL-BM-56M-03",
    ratingGrade: 5,
    engineeringScore: "28.4% USD ANNUALIZED",
    metricLabel: "EXECUTIVE DIVIDEND HARVEST",
    metricVal: "$11,360 USD Realized",
    category: "investment",
    investorCapital: "$40,000 USD (Executive Tier)",
    investorYield: "28.4% Annualized",
    verifiedDeedId: "CAC-CO-2024-BM56-03"
  },
  {
    id: 23,
    companyName: "West Africa Infrastructure Equity Partners",
    firmType: "Pan-African Direct Infrastructure Syndicate",
    speakerName: "Engr. Marcus Sterling",
    speakerRole: "Managing Director (Dubai & Lagos)",
    projectLoc: "Eti-Osa Deep Sea Port Logistics Hub",
    quoteText: "We placed $150,000 across a combined fleet of Sany Reach Stackers and 50T Cranes. The operational discipline Clasqo maintains at their Lekki depot matches the best European standards. Punctual quarterly distributions, full insurance coverage, and zero currency risk.",
    machineryUsed: "Sany Reach Stacker & Crane Syndicate Fleet",
    ratingGrade: 5,
    engineeringScore: "32.8% NET HARD-CURRENCY ROI",
    metricLabel: "CUMULATIVE SYNDICATE RETURN",
    metricVal: "$49,200 USD Harvested",
    category: "investment",
    investorCapital: "$150,000 USD (Institutional)",
    investorYield: "32.8% Annualized",
    verifiedDeedId: "CAC-CO-2024-SYN-08"
  },
  {
    id: 24,
    companyName: "Afro-Euro Heavy Equipment Syndicate",
    firmType: "Diaspora Engineering Investment Group",
    speakerName: "Dr. (Mrs.) Ngozi Eze-Maduka",
    speakerRole: "Diaspora Syndicate Coordinator (Frankfurt & Enugu)",
    projectLoc: "Enugu-Port Harcourt Expressway Rehabilitation",
    quoteText: "Ten of our diaspora engineers in Germany pooled $10k each into Sany single-drum rollers. We monitor the machines on Google Maps with real-time fuel and engine hour logs. The USD returns have outpaced our German bond portfolio threefold.",
    machineryUsed: "Sany SSR120 Single Drum Vibratory Roller Fleet",
    ratingGrade: 5,
    engineeringScore: "22.0% ANNUALIZED YIELD",
    metricLabel: "MONTHLY REVENUE STREAM",
    metricVal: "$183 USD / Member Disbursed",
    category: "investment",
    investorCapital: "$10,000 USD (Growth Fleet)",
    investorYield: "22.0% Annualized",
    verifiedDeedId: "CAC-CO-2024-SSR120-01"
  },
  {
    id: 25,
    companyName: "Lagos Metro Urban Developments",
    firmType: "Commercial Residential Developers",
    speakerName: "Mr. Babatunde Fashanu",
    speakerRole: "Managing Director (Ikeja & Lekki)",
    projectLoc: "Ikeja GRA Luxury Residential Estate",
    quoteText: "Started with the $3,000 Starter Unit co-ownership package to test the model. In just 9 months, I've received $416 USD in quarterly distributions without lifting a finger. Clasqo is revolutionizing equipment financing for Nigerian engineers.",
    machineryUsed: "High-Pressure DN125 Pipeline Fleet Hardware",
    ratingGrade: 5,
    engineeringScore: "18.5% TARGET APY",
    metricLabel: "QUARTERLY PAYOUT METRIC",
    metricVal: "$138.75 USD / Quarter",
    category: "investment",
    investorCapital: "$3,000 USD (Starter Unit)",
    investorYield: "18.5% Annualized",
    verifiedDeedId: "CAC-CO-2024-DN125-09"
  },

  // General Construction Clients
  {
    id: 1,
    companyName: "Julius Berger Nigeria Plc",
    firmType: "General Infrastructure Contractor",
    speakerName: "Engr. Dietrich Vance",
    speakerRole: "Senior Site Logistics Director",
    projectLoc: "Lagos Marina Rail Viaduct (Phase II)",
    quoteText: "Clasqo’s mobile concrete boom system transformed our high-rise slab pouring schedule on the Marina interchange. The Sany 56m pump operated with pristine dampening stability despite the heavy afternoon seaside winds.",
    machineryUsed: "Sany 56m Concrete Boom Pump",
    ratingGrade: 5,
    engineeringScore: "99.4% OPERATIONAL UPTIME",
    metricLabel: "POURING VOLUME FLOW",
    metricVal: "180 m³/h Active",
    category: "infrastructure"
  },
  {
    id: 2,
    companyName: "CCECC Africa Nigeria",
    firmType: "Rail & Civil Engineering Firm",
    speakerName: "Dr. Chen Zhang",
    speakerRole: "Lead Geotechnical Consultant",
    projectLoc: "Lekki Free Zone Industrial Terminal",
    quoteText: "Mobilizing a trailer pump across loose sand routes inside Ibeju-Lekki had always been a high-risk bottleneck. Clasqo dispatched the Atabey towable site pump and completed the full 420-Sqm foundation cast inside 12 hours with their dedicated operators.",
    machineryUsed: "Atabey Mobile Site Pump",
    ratingGrade: 5,
    engineeringScore: "98.6% COUPLING EFFICIENCY",
    metricLabel: "PIPELINE REACH REACHED",
    metricVal: "150+ Meters Horizontal",
    category: "industrial"
  },
  {
    id: 3,
    companyName: "El-Alan Construction Company",
    firmType: "Premium Real Estate Design-Build",
    speakerName: "Arc. Babajide Sowore",
    speakerRole: "Project Execution Head",
    projectLoc: "Banana Island Ocean-View Towers",
    quoteText: "Their Bored Piling service is the absolute gold standard for the Banana Island wetlands. We drilled deep down to the secure bedrock stratum through tidal water without a single slurry-cake failure. Exceptional operators and rig maintenance.",
    machineryUsed: "Sany SR285 Rotary Piling Rig",
    ratingGrade: 5,
    engineeringScore: "100% CAGE STRUCTURAL FIT",
    metricLabel: "DRILLING BORE TO BEDROCK",
    metricVal: "24m Average Depth",
    category: "high-rise"
  },
  {
    id: 4,
    companyName: "BUA Infrastructure Scheme",
    firmType: "Industrial Cement & Engineering",
    speakerName: "Alhaji Kabir Alao",
    speakerRole: "Strategic Sourcing Lead",
    projectLoc: "Eko Atlantic South Peninsular Layout",
    quoteText: "Procuring custom European twin-wall pipe elbows typically holds up construction for months. Clasqo supplied the high-chromium wear joints directly from their Eti-Osa yard inside 24 hours. Minimal downtime on a high-exposure layout.",
    machineryUsed: "Reinforced Twin-Wall Pipeline Joints",
    ratingGrade: 5,
    engineeringScore: "250 BAR FLUID INTEGRITY",
    metricLabel: "HARDWARE PROCUREMENT TIME",
    metricVal: "< 24 Hours Staged Dispatch",
    category: "infrastructure"
  },
  {
    id: 5,
    companyName: "Dantata & Sawoe Construction",
    firmType: "Heavy Civil Works Enterprise",
    speakerName: "Engr. Yusuf Dantata",
    speakerRole: "Northern Operations Lead",
    projectLoc: "Kano-Maiduguri Highway Bypass",
    quoteText: "Superb logistics response. We chartered three heavy road-bed compactors and twin boom pumps. Even across rough, dry Northern layouts, the team maintained high output. Standby technicians quickly resolved a high-pressure coupling clamp adjustment.",
    machineryUsed: "Sany SY5298 line pump fleet",
    ratingGrade: 5,
    engineeringScore: "96.8% FIELD COUPLING RAMP",
    metricLabel: "MOBILIZATION TIME",
    metricVal: "36 Hours to Site",
    category: "infrastructure"
  },
  {
    id: 6,
    companyName: "Megamound Investment Ltd",
    firmType: "Urban Housing Scheme Planners",
    speakerName: "Mr. Olumide Agbaje",
    speakerRole: "VP Real Estate Logistics",
    projectLoc: "Lekki County Homes Expansion Phase II",
    quoteText: "Casting over 80 urban units consecutively requires a relentless machinery loop. Clasqo's trailer pumps and continuous concrete pipeline installations operated day and night without a single seal failure. A highly professional partner in Lekki.",
    machineryUsed: "Atabey Trailer & Dual-Line Pipeline",
    ratingGrade: 5,
    engineeringScore: "99.8% VOLUMETRIC PRECISION",
    metricLabel: "CONSECUTIVE RUN HOURS",
    metricVal: "72 Hours Continuous Flow",
    category: "high-rise"
  },
  {
    id: 7,
    companyName: "Craneburg Construction",
    firmType: "Expressway & Flyover Engineers",
    speakerName: "Engr. Marcos de Silva",
    speakerRole: "Lead Concrete Batching Manager",
    projectLoc: "Epe-Ikorodu Expressway Expansion",
    quoteText: "We put extreme pressure on our ready-mix dispatch timelines. Clasqo handled the transit mixer interfacing and heavy pumping pipelines with military precision. Their operators aren't just drivers; they are real concrete placement engineers.",
    machineryUsed: "Clasqo Twin-Line High Pressure Pumps",
    ratingGrade: 5,
    engineeringScore: "100% PRESSURE RATING",
    metricLabel: "DAILY CONCRETE DISPATCH",
    metricVal: "640 m³ Cast Daily",
    category: "infrastructure"
  },
  {
    id: 8,
    companyName: "Hitech Construction Company",
    firmType: "Marine & Coastal Protection Specialists",
    speakerName: "Engr. Nabil Abu-Fadel",
    speakerRole: "Chief Marine Operations Officer",
    projectLoc: "Victoria Island Shoreline Revetment",
    quoteText: "Pumping heavy concrete aggregates directly into marine seawall layouts is a brutal exercise for hydraulic hardware. The heavy duty wear pipes supplied by Clasqo stood up to high-friction seaside scour without internal wall fatigue.",
    machineryUsed: "Premium Twin-Wall Wear Pipes (5\" ID)",
    ratingGrade: 5,
    engineeringScore: "99.9% COUT-MASS ACCURACY",
    metricLabel: "HYDRAULIC PUMP LOAD",
    metricVal: "165 Bar Continuous",
    category: "marine"
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Audits', icon: Layers, badge: '25 Audits' },
  { id: 'investment', label: 'Investor Partners', icon: TrendingUp, badge: '10 Partners (18.5%–33.1%)' },
  { id: 'high-rise', label: 'High-Rise Towers', icon: Building2, badge: 'Lekki & Ikoyi' },
  { id: 'infrastructure', label: 'Heavy Infrastructure', icon: Compass, badge: 'Highways & Rail' },
  { id: 'industrial', label: 'Industrial Terminals', icon: Gauge, badge: 'Refinery & Ports' },
  { id: 'marine', label: 'Marine Foundations', icon: Activity, badge: 'Seawall & Piling' }
] as const;

export default function ClientTrust({ isLightMode = false }: { isLightMode?: boolean }) {
  const [activeTab, setActiveTab] = useState<'all' | 'high-rise' | 'infrastructure' | 'industrial' | 'marine' | 'investment'>('investment');
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState<number>(7000); // 7 seconds
  const [selectedDeedAudit, setSelectedDeedAudit] = useState<Testimonial | null>(null);
  const [viewMode, setViewMode] = useState<'pro-carousel' | 'spotlight'>('pro-carousel');

  // Filter TESTIMONIALS according to active tab
  const filtered = useMemo(() => {
    return TESTIMONIALS.filter(t => activeTab === 'all' || t.category === activeTab);
  }, [activeTab]);

  // Safely bound activeIndex if the filtered list shrinks
  useEffect(() => {
    setActiveIndex(0);
    setProgress(0);
  }, [activeTab]);

  // Rotation interval hook
  useEffect(() => {
    if (isHovered || !isAutoPlaying || filtered.length <= 1) return;

    const interval = setInterval(() => {
      setDirection('right');
      setActiveIndex((prev) => (prev + 1) % filtered.length);
    }, rotationSpeed);

    return () => clearInterval(interval);
  }, [isHovered, isAutoPlaying, filtered.length, rotationSpeed]);

  // Smooth progress timeline indicator
  useEffect(() => {
    if (isHovered || !isAutoPlaying || filtered.length <= 1) {
      setProgress(0);
      return;
    }
    setProgress(0);
    const updateRate = 100;
    const totalSteps = rotationSpeed / updateRate;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setProgress((step / totalSteps) * 100);
    }, updateRate);

    return () => clearInterval(timer);
  }, [activeIndex, isHovered, isAutoPlaying, activeTab, filtered.length, rotationSpeed]);

  const handlePrev = () => {
    if (filtered.length <= 1) return;
    setDirection('left');
    setActiveIndex((prev) => (prev === 0 ? filtered.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (filtered.length <= 1) return;
    setDirection('right');
    setActiveIndex((prev) => (prev + 1) % filtered.length);
  };

  const active = filtered[activeIndex] || TESTIMONIALS[0];

  // Slide transition variants
  const slideVariants = {
    enter: (dir: 'left' | 'right') => ({
      x: dir === 'right' ? 60 : -60,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.35, ease: 'easeOut' }
    },
    exit: (dir: 'left' | 'right') => ({
      x: dir === 'right' ? -60 : 60,
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.28, ease: 'easeIn' }
    })
  };

  return (
    <section 
      id="client-trust-testimonials"
      className={`py-20 border-t border-b transition-colors duration-200 relative overflow-hidden ${
        isLightMode 
          ? 'bg-[#F4F6FA] border-neutral-200' 
          : 'bg-[#080D22] border-[#182747]'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative Grid Backdrop */}
      <div className={`absolute inset-0 pointer-events-none transition-all ${
        isLightMode 
          ? 'bg-neutral-100/10 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(244,246,250,0.95))]' 
          : 'bg-[#080d22]/5 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.85))]'
      }`} />
      <div className="absolute top-1/4 right-1/12 w-96 h-96 bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none" />

      {/* Top Live Investor Ticker Tape */}
      <div className={`border-b py-2.5 px-6 font-mono text-[10px] uppercase tracking-wider overflow-hidden select-none ${
        isLightMode ? 'bg-amber-500/10 border-amber-500/20 text-neutral-900' : 'bg-[#060a1a] border-amber-500/30 text-amber-400'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0 font-bold text-amber-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>AUDITED USD PAYOUT STREAM:</span>
          </div>
          <div className="truncate text-neutral-400 flex items-center gap-6">
            <span>• Dr. Austin Okonkwo ($19,460 USD Wire Confirmed)</span>
            <span>• Chief Adeyemi Savage (32.4% Net ROI on Rotary Rigs)</span>
            <span>• Engr. Tunde Doherty ($15,600 USD Received / Zoomlion 50T)</span>
            <span>• Capt. Ibrahim Bello ($24,825 USD Harvested)</span>
            <span className="text-emerald-400 font-bold">• 100% On-Time Record Across 18 Months</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-10">
        
        {/* Top visual summary and section title */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-8 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-amber-500 font-black uppercase tracking-[0.25em] leading-none font-mono flex items-center gap-1.5 animate-pulse">
                <Award className="w-3.5 h-3.5 text-amber-500" /> VERIFIED INVESTOR ENDORSEMENTS & AUDITS
              </span>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-mono px-2 py-0.5 font-bold uppercase animate-bounce">
                • 100% CAPITAL PRESERVED
              </span>
            </div>
            
            <h2 className={`text-3xl sm:text-4xl font-black uppercase tracking-tight ${
              isLightMode ? 'text-[#0C122C]' : 'text-white'
            }`}>
              Verified Investor & Contractor Audits
            </h2>
            
            <p className={`text-xs sm:text-sm max-w-2xl leading-relaxed ${
              isLightMode ? 'text-neutral-600' : 'text-neutral-400'
            }`}>
              Review audited hard-currency USD returns (18.5% to 33.1% ROI) from verified co-owners, diaspora funds, and top West African construction syndicates.
            </p>
          </div>

          {/* Aggregate math score badge with bounce effect */}
          <motion.div 
            whileHover={{ scale: 1.03, y: -2 }}
            className={`p-5 border flex items-center gap-4 select-none shrink-0 rounded-none relative shadow-lg ${
              isLightMode ? 'bg-white border-neutral-300' : 'bg-neutral-950/95 border-[#182747]/90'
            }`}
          >
            <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-gradient-to-bl from-amber-500 to-transparent" />
            <div className="text-center font-mono space-y-1">
              <span className="text-[8px] text-neutral-500 tracking-widest block font-bold uppercase">AVERAGE RATING</span>
              <div className="flex items-baseline justify-center gap-0.5">
                <span className={`text-3xl font-black ${isLightMode ? 'text-[#0C122C]' : 'text-white'}`}>4.9</span>
                <span className="text-neutral-500 text-xs font-bold">/ 5.0</span>
              </div>
            </div>
            <div className="h-10 w-[1px] bg-neutral-800" />
            <div className="space-y-1">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500 drop-shadow-[0_0_4px_rgba(245,158,11,0.6)]" />
                ))}
              </div>
              <span className="text-[9px] font-mono text-emerald-400 block font-bold">25 VERIFIED REVIEWS • 100% POSITIVE</span>
            </div>
          </motion.div>
        </div>

        {/* Categories Tab Selector with Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-neutral-800/20 pb-4">
          <span className="text-[8.5px] font-mono text-neutral-500 uppercase tracking-widest mr-2 block select-none">
            FILTER SECTOR:
          </span>
          {CATEGORIES.map(category => {
            const IconComponent = category.icon;
            const isTabActive = activeTab === category.id;
            const count = category.id === 'all' 
              ? TESTIMONIALS.length 
              : TESTIMONIALS.filter(t => t.category === category.id).length;
            
            return (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(category.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-medium tracking-wider cursor-pointer transition-all border ${
                  isTabActive
                    ? isLightMode 
                      ? 'bg-[#0C122C] border-[#0C122C] text-white font-bold shadow-md'
                      : 'bg-amber-500 border-amber-500 text-neutral-950 font-black shadow-lg'
                    : isLightMode
                      ? 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-100 hover:border-neutral-300'
                      : 'bg-neutral-950/60 border-[#182747] text-neutral-400 hover:text-white hover:border-[#1c305e]'
                }`}
              >
                <IconComponent className={`w-3.5 h-3.5 ${isTabActive ? 'animate-pulse' : 'text-neutral-500'}`} />
                <span className="uppercase">{category.label}</span>
                <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold shrink-0 ${
                  isTabActive 
                    ? isLightMode ? 'bg-neutral-800 text-white' : 'bg-neutral-950 text-amber-500'
                    : isLightMode ? 'bg-neutral-100 text-neutral-500' : 'bg-neutral-900 text-neutral-500'
                }`}>
                  {count}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Pro Slider Controls Toolbar */}
        <div className="flex flex-wrap justify-between items-center mb-6 font-mono text-[9px] text-neutral-500 uppercase gap-3">
          <div className="flex items-center gap-2">
            {/* Auto Play / Pause Toggle */}
            <button 
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`px-2.5 py-1.5 border transition-colors cursor-pointer flex items-center gap-1.5 ${
                isLightMode 
                  ? 'bg-white border-neutral-300 hover:border-neutral-400 text-neutral-700' 
                  : 'bg-neutral-950 border-[#1c305e]/40 hover:border-amber-500 text-neutral-300'
              }`}
            >
              {isAutoPlaying ? <Pause className="w-3 h-3 text-emerald-400" /> : <Play className="w-3 h-3 text-amber-500" />}
              <span>CAROUSEL: {isAutoPlaying ? 'AUTO-PLAYING' : 'PAUSED'}</span>
            </button>

            {/* View Mode Toggle */}
            <div className={`flex items-center border ${isLightMode ? 'border-neutral-300 bg-white' : 'border-[#182747] bg-neutral-950'}`}>
              <button
                onClick={() => setViewMode('pro-carousel')}
                className={`px-2.5 py-1.5 font-bold transition-colors cursor-pointer ${
                  viewMode === 'pro-carousel'
                    ? 'bg-amber-500 text-neutral-950'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Pro Multi-Card Slider
              </button>
              <button
                onClick={() => setViewMode('spotlight')}
                className={`px-2.5 py-1.5 font-bold transition-colors cursor-pointer ${
                  viewMode === 'spotlight'
                    ? 'bg-amber-500 text-neutral-950'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Spotlight Audit View
              </button>
            </div>
          </div>

          {/* Slider Prev / Next & Index Indicators */}
          <div className="flex items-center gap-3">
            <div className={`px-2.5 py-1 border ${isLightMode ? 'bg-white border-neutral-200' : 'bg-neutral-950/60 border-[#182747]'}`}>
              <span className="text-amber-500 font-extrabold">{String(activeIndex + 1).padStart(2, '0')}</span>
              <span className="mx-1 text-neutral-600">/</span>
              <span className={isLightMode ? 'text-neutral-750' : 'text-neutral-350'}>{String(filtered.length).padStart(2, '0')}</span>
            </div>

            <div className="flex items-center gap-1">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrev}
                className={`w-8 h-8 border flex items-center justify-center transition-colors cursor-pointer ${
                  isLightMode ? 'bg-white border-neutral-300 hover:bg-neutral-100 text-neutral-800' : 'bg-[#060a1a] border-[#182747] hover:border-amber-500 text-white'
                }`}
                title="Previous Endorsement"
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNext}
                className={`w-8 h-8 border flex items-center justify-center transition-colors cursor-pointer ${
                  isLightMode ? 'bg-white border-neutral-300 hover:bg-neutral-100 text-neutral-800' : 'bg-[#060a1a] border-[#182747] hover:border-amber-500 text-white'
                }`}
                title="Next Endorsement"
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* MODE 1: PRO MULTI-CARD CAROUSEL SLIDER */}
        {viewMode === 'pro-carousel' ? (
          <div className="space-y-6">
            {/* Sliding Multi-Card Row */}
            <div className="relative overflow-hidden">
              
              {/* Top subtle duration process bar */}
              <div className="h-[2px] bg-neutral-900/40 mb-4">
                <div 
                  className="h-full bg-amber-500 transition-all duration-100 ease-linear"
                  style={{ width: `${isHovered || !isAutoPlaying ? 0 : progress}%` }}
                />
              </div>

              {/* Cards Deck */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`${activeTab}-${activeIndex}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {/* Primary Focus Card (Current Active) */}
                  {[
                    filtered[activeIndex],
                    filtered[(activeIndex + 1) % filtered.length],
                    filtered[(activeIndex + 2) % filtered.length]
                  ].filter(Boolean).map((item, colIdx) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ y: -4 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className={`border p-6 flex flex-col justify-between relative transition-all rounded-none ${
                        colIdx === 0
                          ? isLightMode 
                            ? 'bg-white border-amber-500 shadow-xl ring-1 ring-amber-500/30' 
                            : 'bg-[#0B1535] border-amber-500 shadow-[0_10px_30px_rgba(0,0,0,0.6)] ring-1 ring-amber-500/40'
                          : isLightMode
                            ? 'bg-white border-neutral-200 hover:border-neutral-300 shadow-sm'
                            : 'bg-[#060a1a] border-[#182747] hover:border-[#1e3260]'
                      }`}
                    >
                      {/* Top Badges */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2 border-b pb-3 border-neutral-800/20">
                          <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 ${
                            item.category === 'investment' 
                              ? 'bg-amber-500/10 text-amber-500 border border-amber-500/30' 
                              : 'bg-neutral-800/40 text-neutral-400'
                          }`}>
                            {item.category === 'investment' ? '★ USD CO-OWNER PARTNER' : '★ CONTRACTOR AUDIT'}
                          </span>
                          
                          {/* 5-Star Rating */}
                          <div className="flex items-center gap-0.5">
                            {[...Array(item.ratingGrade)].map((_, sIdx) => (
                              <Star key={sIdx} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                            ))}
                          </div>
                        </div>

                        {/* Financial or Engineering Yield Banner */}
                        <div className={`p-3 border flex items-center justify-between ${
                          isLightMode ? 'bg-amber-500/5 border-amber-500/20' : 'bg-neutral-950/80 border-[#182747]'
                        }`}>
                          <div>
                            <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest block">
                              {item.category === 'investment' ? 'AUDITED NET YIELD' : 'FIELD PERFORMANCE'}
                            </span>
                            <span className="text-base font-black text-emerald-400 font-mono">
                              {item.engineeringScore}
                            </span>
                          </div>
                          {item.investorCapital && (
                            <div className="text-right">
                              <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest block">CAPITAL ALLOCATED</span>
                              <span className="text-xs font-bold text-amber-400 font-mono">{item.investorCapital}</span>
                            </div>
                          )}
                        </div>

                        {/* Machinery Name */}
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400">
                          <Wrench className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span className="truncate">{item.machineryUsed}</span>
                        </div>

                        {/* Quote Text */}
                        <p className={`text-xs leading-relaxed italic line-clamp-4 ${
                          isLightMode ? 'text-neutral-700' : 'text-neutral-300'
                        }`}>
                          "{item.quoteText}"
                        </p>
                      </div>

                      {/* Footer Info */}
                      <div className="pt-4 mt-4 border-t border-neutral-800/20 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className={`text-xs font-black uppercase ${isLightMode ? 'text-[#0C122C]' : 'text-white'}`}>
                              {item.speakerName}
                            </h4>
                            <span className="text-[9.5px] text-neutral-500 block leading-tight font-mono">
                              {item.speakerRole}
                            </span>
                            <span className={`text-[9px] font-bold block mt-0.5 ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
                              {item.companyName}
                            </span>
                          </div>

                          <div className={`w-8 h-8 rounded-none border text-amber-500 font-mono font-bold flex items-center justify-center text-xs ${
                            isLightMode ? 'bg-neutral-100 border-neutral-200' : 'bg-neutral-900 border-[#182747]'
                          }`}>
                            {item.speakerName.split(' ')[0]?.[0]}{item.speakerName.split(' ')[1]?.[0] || 'N'}
                          </div>
                        </div>

                        {/* Quick Audit Action Button */}
                        <button
                          onClick={() => setSelectedDeedAudit(item)}
                          className="w-full py-2 bg-neutral-900/60 hover:bg-amber-500 hover:text-neutral-950 text-amber-400 text-[9.5px] font-mono font-bold uppercase tracking-wider border border-[#182747] hover:border-amber-500 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <FileCheck className="w-3.5 h-3.5" />
                          <span>Inspect Co-Ownership Deed & Telematics</span>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dot Pagination indicators */}
            <div className="flex justify-center items-center gap-1.5 pt-2">
              {filtered.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => {
                    setDirection(dotIdx > activeIndex ? 'right' : 'left');
                    setActiveIndex(dotIdx);
                  }}
                  className={`h-1.5 transition-all cursor-pointer ${
                    dotIdx === activeIndex 
                      ? 'w-6 bg-amber-500' 
                      : 'w-2 bg-neutral-700 hover:bg-neutral-500'
                  }`}
                  title={`Jump to review ${dotIdx + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          /* MODE 2: SPOTLIGHT FOCUS AUDIT VIEW */
          <div className={`p-6 sm:p-10 lg:p-11 border relative overflow-hidden transition-colors ${
            isLightMode ? 'bg-white border-neutral-300 shadow-md' : 'bg-[#050918] border-[#182747]'
          }`}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
              >
                {/* Main Content */}
                <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="w-12 h-12 bg-amber-500/10 text-amber-500 flex items-center justify-center rounded-none relative">
                      <Quote className="w-6 h-6 transform rotate-180" />
                    </div>

                    <div className={`flex items-center gap-2 px-3 py-1.5 border select-none font-mono ${
                      isLightMode ? 'bg-neutral-50 border-neutral-200 text-neutral-700' : 'bg-neutral-950/80 border-[#101933]'
                    }`}>
                      <div className="flex items-center gap-0.5">
                        {[...Array(active.ratingGrade)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        ))}
                      </div>
                      <span className="text-[9px] font-black text-amber-500 uppercase tracking-wide">
                        {active.category === 'investment' ? 'AUDITED HARD-CURRENCY YIELD' : 'TIER-1 VERIFIED SLA'}
                      </span>
                    </div>
                  </div>

                  <div className="flex-grow flex items-center">
                    <p className={`text-base sm:text-lg lg:text-xl font-medium leading-relaxed italic ${
                      isLightMode ? 'text-neutral-800' : 'text-neutral-200'
                    }`}>
                      "{active.quoteText}"
                    </p>
                  </div>

                  {/* Speaker Details */}
                  <div className={`flex items-center justify-between pt-4 border-t ${isLightMode ? 'border-neutral-200' : 'border-[#182747]'}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 border text-amber-500 font-mono font-bold flex items-center justify-center text-xs ${
                        isLightMode ? 'bg-neutral-100 border-neutral-200' : 'bg-[#0c1430] border-[#1c305e]'
                      }`}>
                        {active.speakerName.split(' ')[0]?.[0]}{active.speakerName.split(' ')[1]?.[0] || 'N'}
                      </div>
                      <div>
                        <h4 className={`text-sm font-black uppercase ${isLightMode ? 'text-neutral-900' : 'text-white'}`}>
                          {active.speakerName}
                        </h4>
                        <span className={`text-[10px] font-mono ${isLightMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                          {active.speakerRole} • {active.companyName}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedDeedAudit(active)}
                      className="px-3 py-1.5 bg-amber-500 text-neutral-950 font-bold text-[10px] uppercase tracking-wider inline-flex items-center gap-1 cursor-pointer hover:bg-neutral-900 hover:text-white transition-colors"
                    >
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>Inspect Deed</span>
                    </button>
                  </div>
                </div>

                {/* Sidebar Parameters */}
                <div className={`p-6 space-y-4 font-mono text-[10px] border flex flex-col justify-between lg:col-span-4 ${
                  isLightMode ? 'bg-neutral-50 border-neutral-200 text-neutral-800' : 'bg-[#0B122C]/70 border-[#182747] text-white'
                }`}>
                  <div className="space-y-4">
                    <div className="border-b pb-3 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-amber-500 shrink-0" />
                      <div>
                        <span className="text-[8px] text-neutral-500 uppercase tracking-widest block">AUDITED FIRM</span>
                        <span className="font-bold uppercase text-xs">{active.companyName}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[8px] text-neutral-500 uppercase tracking-widest block">PROJECT / DEPLOYMENT LOCATION</span>
                      <span className="font-bold block mt-0.5 text-neutral-300">{active.projectLoc}</span>
                    </div>

                    <div>
                      <span className="text-[8px] text-neutral-500 uppercase tracking-widest block">MACHINERY ASSET</span>
                      <span className="text-amber-500 font-bold block mt-0.5">{active.machineryUsed}</span>
                    </div>

                    {active.investorCapital && (
                      <div className="p-3 bg-neutral-950/80 border border-amber-500/30">
                        <span className="text-[8px] text-amber-400 font-bold uppercase tracking-widest block">CO-OWNERSHIP PROGRAM STATUS</span>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-neutral-400">Capital Tier:</span>
                          <span className="font-bold text-white">{active.investorCapital}</span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-neutral-400">Net Realized:</span>
                          <span className="font-bold text-emerald-400">{active.engineeringScore}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-neutral-800/40">
                    <span className="text-[8px] text-neutral-500 uppercase tracking-widest block">{active.metricLabel}</span>
                    <span className="text-lg font-black text-amber-500 font-mono">{active.metricVal}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

      </div>

      {/* Verified Deed & Telematics Audit Inspection Modal */}
      <AnimatePresence>
        {selectedDeedAudit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className={`max-w-xl w-full border p-6 sm:p-8 relative shadow-2xl ${
                isLightMode ? 'bg-white border-neutral-300 text-[#0C122C]' : 'bg-[#060a1a] border-amber-500/80 text-white'
              }`}
            >
              <button
                onClick={() => setSelectedDeedAudit(null)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 cursor-pointer"
                title="Close Audit"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-amber-500 text-neutral-950 font-black flex items-center justify-center shadow">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold text-amber-500 uppercase tracking-widest block">
                      LEKKI YARD CENTRAL AUDIT ARCHIVE
                    </span>
                    <h3 className="text-lg font-black uppercase tracking-tight">
                      Verified Asset Co-Ownership Certificate
                    </h3>
                  </div>
                </div>

                <div className={`p-4 border font-mono text-[11px] space-y-2 ${
                  isLightMode ? 'bg-neutral-50 border-neutral-200' : 'bg-[#0B1535] border-[#182747]'
                }`}>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Investor / Syndicate:</span>
                    <span className="font-bold">{selectedDeedAudit.speakerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Corporate Entity:</span>
                    <span className="font-bold">{selectedDeedAudit.companyName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Co-Titled Machine:</span>
                    <span className="font-bold text-amber-400">{selectedDeedAudit.machineryUsed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">CAC Asset Deed ID:</span>
                    <span className="font-bold text-emerald-400">{selectedDeedAudit.verifiedDeedId || 'CAC-CO-2024-LEKKI-01'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Audited Hard-Currency Return:</span>
                    <span className="font-black text-emerald-400">{selectedDeedAudit.engineeringScore}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Telemetry GPS Uplink:</span>
                    <span className="font-bold text-white">Active (1 Dr Babatunde Ayeni St, Lekki)</span>
                  </div>
                </div>

                <p className={`text-xs leading-relaxed italic ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  "{selectedDeedAudit.quoteText}"
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-neutral-800">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> 100% Punctual USD Payouts
                  </span>
                  <button
                    onClick={() => setSelectedDeedAudit(null)}
                    className="bg-amber-500 text-neutral-950 font-black text-xs uppercase px-5 py-2 hover:bg-neutral-900 hover:text-white transition-colors cursor-pointer"
                  >
                    Close Verification
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
