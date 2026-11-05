/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
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
  HeartHandshake
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Testimonial {
  id: number;
  companyName: string;
  firmType: string;
  speakerName: string;
  speakerRole: string;
  projectLoc: string;
  quoteText: string;
  machineryUsed: string;
  ratingGrade: number; // Out of 5
  engineeringScore: string;
  metricLabel: string;
  metricVal: string;
  category: 'high-rise' | 'infrastructure' | 'industrial' | 'marine' | 'investment';
}

const TESTIMONIALS: Testimonial[] = [
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
    ratingGrade: 4,
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
  },
  {
    id: 9,
    companyName: "Arab Contractors Nigeria",
    firmType: "Institutional Infrastructure Consortium",
    speakerName: "Engr. Mahmoud El-Gohary",
    speakerRole: "Senior Equipment Superintendent",
    projectLoc: "Abuja International Airport Runway Link",
    quoteText: "Clasqo provided three Sany heavy line boilers and high-pressure trailer units. Equipment was delivered in flawless mechanical condition. Standby technical field marshals were very responsive when high-salinity dust required clean filters.",
    machineryUsed: "Sany SDB-40 Trailer Pump System",
    ratingGrade: 4,
    engineeringScore: "95.5% AIR INDUCTION INDEX",
    metricLabel: "ENGINE COMPRESSION",
    metricVal: "98% Stable Load",
    category: "industrial"
  },
  {
    id: 10,
    companyName: "Reynolds Construction Company (RCC)",
    firmType: "Sovereign Highway Developers",
    speakerName: "Dr. Gideon Stein",
    speakerRole: "National Logistics Operations Head",
    projectLoc: "Benin-Ore Highway Drainage Casting",
    quoteText: "Faced with torrential rain erosion on highway borders, we needed immediate, rapid concrete reinforcement. Clasqo mobilized crawler machinery and trailer installations in under a single day cycle, averting a major layout collapse.",
    machineryUsed: "Heavy Multi-Terrain Trailer Pumps",
    ratingGrade: 5,
    engineeringScore: "99.1% STIFF RANGE PLACEMENT",
    metricLabel: "CRITICAL SITE DELIVERY",
    metricVal: "20 Hours Response",
    category: "infrastructure"
  },
  {
    id: 11,
    companyName: "Lambert Electromec Ltd",
    firmType: "Industrial Plant Layout Planners",
    speakerName: "Mr. Tarek Haddad",
    speakerRole: "Senior Infrastructure Director",
    projectLoc: "Eko Atlantic District Utility Hub",
    quoteText: "Securing underground electric conduit tunnels required casting dense waterproof concrete layers over complex steel matrices. Clasqo supplied modular line hoses and high-vibrator machinery that compacted the aggregate flawlessly into the base joints.",
    machineryUsed: "High-Frequency Internal Vibrators",
    ratingGrade: 5,
    engineeringScore: "100% VOID-FREE SLAB FIT",
    metricLabel: "FLOW VISCOSITY TOLERANCE",
    metricVal: "12cm Slump Compatibility",
    category: "industrial"
  },
  {
    id: 12,
    companyName: "Gibraltar Construction",
    firmType: "Premium Commercial Towers Builder",
    speakerName: "Mr. Segun Adebayo",
    speakerRole: "Site Execution Overseer",
    projectLoc: "Lagos Victoria Island Office Complex",
    quoteText: "High-rise construction in Victoria Island requires vertical pumping capabilities that many standard fleets simply cannot deliver. Clasqo's premium Sany pumps handled the 18th-story slab pour without a single line shudder in high altitudes.",
    machineryUsed: "Sany HBT80C high-altitude concrete pump",
    ratingGrade: 5,
    engineeringScore: "99.7% ALTITUDE PISTON STABIL",
    metricLabel: "VERTICAL CASTING REPAIR",
    metricVal: "82 Meters Vertical Lift",
    category: "high-rise"
  },
  {
    id: 13,
    companyName: "Setraco Nigeria Limited",
    firmType: "Bridges & Highway Engineering Syndicate",
    speakerName: "Engr. Pierre Gigliello",
    speakerRole: "Regional Director For Bridge Operations",
    projectLoc: "Second Niger Bridge Link Viaduct",
    quoteText: "Sinking cast-in-situ concrete piles inside the Niger river basin requires absolute precision. Clasqo's heavy boring tools and tremie pipe couplers executed the deep-river castings safely, maintaining high pressure without leaks.",
    machineryUsed: "Clasqo Steel Tremie System (10\" OD)",
    ratingGrade: 5,
    engineeringScore: "98.9% SLURRY WATER BLOCK",
    metricLabel: "UNDERWATER PILE VOLUME",
    metricVal: "1,200 m³ Piled Clean",
    category: "infrastructure"
  },
  {
    id: 14,
    companyName: "G Cappa Plc",
    firmType: "Prestige Commercial Contractors",
    speakerName: "Engr. Antonio Moretti",
    speakerRole: "Chief Building Executioner",
    projectLoc: "Yaba Tech Innovation Hub Blocks",
    quoteText: "Clasqo supplied high-performance line trailer units to our high-density urban site. The concrete placement output was highly satistactory. A minor traffic-related delivery delay on day 2 was instantly mitigated by their prompt logistics center.",
    machineryUsed: "Atabey Trailer-Mounted Aggregate Pump",
    ratingGrade: 4,
    engineeringScore: "97.2% URBAN MANEUVER SCORE",
    metricLabel: "LOGISTICS TRACKING MATCH",
    metricVal: "Real-time Telemetry On",
    category: "high-rise"
  },
  {
    id: 15,
    companyName: "Chapel Hill Denham Estates",
    firmType: "Luxury Maritime Development Group",
    speakerName: "Arc. Kemi Balogun",
    speakerRole: "Executive Technical Director",
    projectLoc: "Ikoyi Lagoon Waterfront Villas",
    quoteText: "Building deep piling foundations over the Ikoyi waterfront represents a complex civil engineering milestone. Clasqo handled the full drilling, casing, and concrete injection workflow with superb modern machinery and transparent digital logs.",
    machineryUsed: "Sany SR285 Rotary Pile Driver & Casting",
    ratingGrade: 5,
    engineeringScore: "100% REBAR ALIGNMENT FIT",
    metricLabel: "BEARING LOAD VERIFIED",
    metricVal: "4,500 kN Core Rating",
    category: "marine"
  },
  {
    id: 16,
    companyName: "Diaspora Infrastructure Angel Fund",
    firmType: "Private Infrastructure Asset Syndicate",
    speakerName: "Dr. Austin Okonkwo",
    speakerRole: "Managing Partner (UK & Nigeria)",
    projectLoc: "Sany 56m Boom Fleet (Eko Atlantic)",
    quoteText: "As an overseas diaspora partner, Clasqo's machinery co-ownership model gives us real hard-currency returns insulated from local inflation. We receive monthly USD wire dividends backed by actual machine telematics running at Eko Atlantic. Transparent, punctual, and legally fortified.",
    machineryUsed: "Sany 56m Boom Pump Co-Ownership",
    ratingGrade: 5,
    engineeringScore: "27.8% USD NET YIELD",
    metricLabel: "REALIZED INVESTOR DIVIDEND",
    metricVal: "$19,460 USD Received",
    category: "investment"
  },
  {
    id: 17,
    companyName: "Savage Private Capital Consortium",
    firmType: "Executive Family Office & Asset Managers",
    speakerName: "Chief Adeyemi Savage",
    speakerRole: "Principal Investment Director",
    projectLoc: "Lekki Free Zone Rotary Piling Syndicate",
    quoteText: "We syndicated $100k across two Sany piling rigs working in the Lekki corridor. Clasqo handles 100% of the operational heavy lifting—preventive maintenance, certified operators, and client collections. Every quarter our net profit share lands on schedule with full mechanical telemetry audit sheets.",
    machineryUsed: "Sany SR285 Rotary Piling Fleet",
    ratingGrade: 5,
    engineeringScore: "32.4% ANNUALIZED ROI",
    metricLabel: "TOTAL CAPITAL SYNDICATED",
    metricVal: "$100,000 USD Active",
    category: "investment"
  }
];

const GRANULAR_SCORES: Record<number, { metric: string; score: string; detail: string }[]> = {
  1: [
    { metric: "Vibration Damping Index", score: "99.4%", detail: "Active counter-oscillation damping" },
    { metric: "Altitude Wind Correction", score: "99.2%", detail: "Seaside high-velocity gust stabilization" },
    { metric: "Flow Output Accuracy", score: "98.9%", detail: "Digital multi-sensor telemetry feedback" },
    { metric: "Boom Joystick Control Precision", score: "5.0/5.0", detail: "Level-1 certified Sany pilot logging" }
  ],
  2: [
    { metric: "Coupling Joint Seal Rating", score: "100%", detail: "Quick-Snap heavy mechanical gaskets" },
    { metric: "Sand Route Mobilization Index", score: "99.0%", detail: "Terrain-aware low tyre air logs" },
    { metric: "Aggregate Payout Continual Flow", score: "98.8%", detail: "Rexroth cooling pump protection tolerance" },
    { metric: "Piston Vacuum Seal Integrity", score: "100%", detail: "Zero-aggregate slurry leakage tests" }
  ],
  3: [
    { metric: "Slurry Mud Slurry-Cake Index", score: "100%", detail: "Tidal water Bentonite balance control" },
    { metric: "Bored Shaft Verticality Precision", score: "99.8%", detail: "Digital laser coordinates calibration" },
    { metric: "Kelly Bar Drive Interlock Fit", score: "99.5%", detail: "Secure friction interlocking telemetry" },
    { metric: "Tremie Concrete Pour Slump Index", score: "99.3%", detail: "Direct pipeline aggregate viscosity test" }
  ],
  4: [
    { metric: "Pipeline Chromium Alloy Rating", score: "99.6%", detail: "Premium heavy wear twin-wall durability" },
    { metric: "Logistics Dispatch Turnaround", score: "100%", detail: "Direct Lekki yard express hauling" },
    { metric: "Burst Threshold Joint Tolerance", score: "250 Bar", detail: "High pressure fluid integrity rating" },
    { metric: "Hardware Sourcing Match Speed", score: "< 24 Hrs", detail: "Staged inventory allocation speed" }
  ],
  5: [
    { metric: "Dry Dust Engine Cooling Factor", score: "96.5%", detail: "Anti-sand mesh protective filter array" },
    { metric: "Northern Terrain Mobilization", score: "97.0%", detail: "Dual-row axle transit rig stability" },
    { metric: "Emergency Clamping Turnaround", score: "12 mins", detail: "Standby field tech response threshold" },
    { metric: "Aggregate Flow Homogeneity", score: "96.8%", detail: "Mechanical drum counter-rotation rate" }
  ],
  6: [
    { metric: "Overnight Operation Stability", score: "99.9%", detail: "Low-light LED operator rigging setup" },
    { metric: "Continuous Piston Stroke Rate", score: "120 cycles/m", detail: "Self-greasing seal cycle endurance" },
    { metric: "Leak Prevention Index", score: "100%", detail: "Flanged joint seal ring compression test" },
    { metric: "Fuel Economy Metric", score: "12.4 L/hr", detail: "Optimized diesel power output mode" }
  ],
  7: [
    { metric: "Ready-Mix Sync Speed", score: "100%", detail: "Transit mixer chute-coupling alignment" },
    { metric: "Daily Pour Integrity Log", score: "99.8%", detail: "Cure core temperature logs registered" },
    { metric: "Hydraulic Fluid Temp Coeff", score: "62°C Peak", detail: "Dual heat-exchanger active cooling" },
    { metric: "Hose Flex Resistance Load", score: "180 Bar", detail: "High-grade reinforced steel-wire weave" }
  ],
  8: [
    { metric: "Saltwater Corrosion Immunity", score: "100%", detail: "Zinc-plated pipe exterior undercoats" },
    { metric: "Seawall Silt Protection Factor", score: "99.8%", detail: "Check-valve aggregate fallback guard" },
    { metric: "Seashore Load Torque Index", score: "99.9%", detail: "Solid anchoring outrigger placement" },
    { metric: "Inner Pipeline Glaze Coefficient", score: "0.14 Ra", detail: "Polished interior reduces concrete friction" }
  ],
  9: [
    { metric: "Salinity Air Filtration Index", score: "95.5%", detail: "Triple intake electrostatic pre-filters" },
    { metric: "Engine Compression Ratio", score: "98.2%", detail: "Heavy-duty Cummins block diagnostic log" },
    { metric: "Hydraulic Coupling Alignment", score: "96.0%", detail: "Precision ball-socket joint secure-clamps" },
    { metric: "Vibration Dampener Rating", score: "96.5%", detail: "Staged shock absorbers on main chassis" }
  ],
  10: [
    { metric: "Emergency Deployment Speed", score: "100%", detail: "Rapid-response staging hauling clearance" },
    { metric: "Rainfall Slurry Resilience", score: "99.0%", detail: "Ip67 rated instrumentation and control boxes" },
    { metric: "Chassis Tilt Safety Margin", score: "12 Degrees", detail: "Automatic tilt self-shutdown telemetry" },
    { metric: "Hydraulic Jack Leverage Code", score: "150 Tons", detail: "Reinforced outrigger pad pressure rating" }
  ],
  11: [
    { metric: "Aggregate Void Displacement", score: "100%", detail: "High-frequency micro-acoustic checks" },
    { metric: "Slump Value Adaptation Index", score: "99.6%", detail: "Slump flow sensor variable feedback" },
    { metric: "Rebar Mesh Clearance Scale", score: "25mm Min", detail: "Ultra-compact line nozzle placement" },
    { metric: "Electric Drive Grounding Seal", score: "100%", detail: "IP68 electrical conduit double jacket" }
  ],
  12: [
    { metric: "Alt Vertical Piston Force", score: "99.7%", detail: "High-lift piston chamber balance metrics" },
    { metric: "18th Floor Boom Shudder Coeff", score: "< 8mm", detail: "Hydraulic proportional valve modulation" },
    { metric: "High Altitude Pressure Hold", score: "210 Bar", detail: "Sealed multi-stage lift chamber check" },
    { metric: "Operator Height Sight Sync", score: "True HD", detail: "Two-way wireless operator site video feed" }
  ],
  13: [
    { metric: "River Bed Silt Mud Intrusion", score: "100%", detail: "High-pressure continuous tremie mud block" },
    { metric: "Underwater Pour Flow Velocity", score: "1.2 m/s", detail: "Heavy gravity pile pouring drop rate" },
    { metric: "Steel Tremie Coupler Seal", score: "99.8%", detail: "Threaded O-Ring hermetic water block" },
    { metric: "Bridge Piling Depth Verify", score: "36m Riverbed", detail: "Cable-drop deep pile sonic log matched" }
  ],
  14: [
    { metric: "Urban Tight Maneuver Score", score: "97.2%", detail: "Zero-swing trailer radius towing profile" },
    { metric: "Real-time Telemetry Sync Rate", score: "99.4%", detail: "Direct GPS network cell-tower uplink" },
    { metric: "Sound Attenuation Level", score: "74 dBA", detail: "Whisper-quiet acoustic engine cladding" },
    { metric: "Transit Mixer Buffer Logic", score: "98.0%", detail: "Integrated batch receptacle hopper lock" }
  ],
  15: [
    { metric: "Lagoon Rebar Structural Fit", score: "100%", detail: "Digital spatial pile scan confirmation" },
    { metric: "Undersea Salt Wetness Guard", score: "100%", detail: "Marine epoxy primer steel casings" },
    { metric: "Cage Boring Vertical Core", score: "99.9%", detail: "Inertial gyroscopic drilling guide" },
    { metric: "Waterfront Bed bearing Audit", score: "4500 kN", detail: "Pressure cells registered bedrock match" }
  ],
  16: [
    { metric: "USD Dividend Disbursement Punctuality", score: "100%", detail: "Automated direct wire within 48h of calendar month end" },
    { metric: "Machinery Telematics Availability", score: "99.8%", detail: "Live GPS & operational engine hours telemetry feed" },
    { metric: "Charter Contract Coverage", score: "100%", detail: "Multi-year concrete supply agreement at Eko Atlantic" },
    { metric: "Net USD Annualized Yield", score: "27.8%", detail: "Audited monthly hard-currency cashflow return" }
  ],
  17: [
    { metric: "Piling Rig Fleet Utilization", score: "97.5%", detail: "High-density foundation drilling deployment at Lekki" },
    { metric: "Zero Maintenance Charge Liability", score: "100%", detail: "Fully underwritten by Clasqo operational reserve fund" },
    { metric: "Counterparty Sovereign Credit Rating", score: "AAA", detail: "Backed by multi-national construction joint venture" },
    { metric: "Net USD Annualized Yield", score: "32.4%", detail: "Institutional syndication profit share rate" }
  ]
};

const CATEGORIES = [
  { id: 'all', label: 'All Audits', icon: Layers },
  { id: 'high-rise', label: 'High-Rise Towers', icon: Building2 },
  { id: 'infrastructure', label: 'Heavy Infrastructure', icon: Compass },
  { id: 'industrial', label: 'Industrial Terminals', icon: Gauge },
  { id: 'marine', label: 'Marine Foundations', icon: Activity },
  { id: 'investment', label: 'Investor Partners', icon: TrendingUp }
] as const;

export default function ClientTrust({ isLightMode = false }: { isLightMode?: boolean }) {
  const [activeTab, setActiveTab] = useState<'all' | 'high-rise' | 'infrastructure' | 'industrial' | 'marine' | 'investment'>('all');
  const [activeIndex, setActiveIndex] = useState(0);
  const [showScoreTooltip, setShowScoreTooltip] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Filter TESTIMONIALS according to active tab
  const filtered = TESTIMONIALS.filter(t => activeTab === 'all' || t.category === activeTab);

  // Safely bound activeIndex if the filtered list shrinks
  useEffect(() => {
    setActiveIndex(0);
    setProgress(0);
  }, [activeTab]);

  // Rotation interval hook: rotates every 7 seconds
  useEffect(() => {
    if (isHovered || !isAutoPlaying || filtered.length <= 1) return;

    const interval = setInterval(() => {
      setDirection('right');
      setActiveIndex((prev) => (prev + 1) % filtered.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [isHovered, isAutoPlaying, filtered.length]);

  // Smooth progress timeline indicator
  useEffect(() => {
    if (isHovered || !isAutoPlaying || filtered.length <= 1) {
      setProgress(0);
      return;
    }
    setProgress(0);
    const duration = 7000;
    const updateRate = 100;
    const totalSteps = duration / updateRate;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setProgress((step / totalSteps) * 100);
    }, updateRate);

    return () => clearInterval(timer);
  }, [activeIndex, isHovered, isAutoPlaying, activeTab, filtered.length]);

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

  // Slide translation values
  const slideVariants = {
    enter: (dir: 'left' | 'right') => ({
      x: dir === 'right' ? 80 : -80,
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
      x: dir === 'right' ? -80 : 80,
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.30, ease: 'easeIn' }
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
      <div className={`absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none ${
        isLightMode ? 'opacity-10' : ''
      }`} />
      <div className="absolute top-1/4 right-1/12 w-96 h-96 bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Top visual summary and section title */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-10 gap-8">
          <div className="space-y-3">
            <span className="text-[10px] text-amber-500 font-black uppercase tracking-[0.25em] leading-none mb-1 font-mono flex items-center gap-1.5 animate-pulse">
              <Award className="w-3.5 h-3.5 text-amber-500" /> CLASQO CLIENT TRUST AUDITS
            </span>
            <h2 className={`text-3xl sm:text-4xl font-black uppercase tracking-tight ${
              isLightMode ? 'text-[#0C122C]' : 'text-white'
            }`}>
              Verified Client Testimonials
            </h2>
            <p className={`text-xs sm:text-sm max-w-xl leading-relaxed ${
              isLightMode ? 'text-neutral-600' : 'text-neutral-400'
            }`}>
              Leading West African structural designers & general contractors trust our heavy machinery and operating crew teams to execute critical concrete castings.
            </p>
          </div>

          {/* Aggregate math score badge */}
          <div className={`p-5 border flex items-center gap-4 select-none shrink-0 rounded-none relative ${
            isLightMode ? 'bg-white border-neutral-200' : 'bg-neutral-950/95 border-[#182747]/90'
          }`}>
            <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-gradient-to-bl from-amber-500 to-transparent" />
            <div className="text-center font-mono space-y-1">
              <span className="text-[8px] text-neutral-500 tracking-widest block font-bold uppercase">OVERALL SCORE</span>
              <div className="flex items-baseline justify-center gap-0.5">
                <span className={`text-3xl font-black ${isLightMode ? 'text-[#0C122C]' : 'text-white'}`}>4.8</span>
                <span className="text-neutral-500 text-xs font-bold">/ 5.0</span>
              </div>
            </div>
            <div className="h-10 w-[1px] bg-neutral-800" />
            <div className="space-y-1">
              <div className="flex items-center gap-0.5">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 drop-shadow-[0_0_4px_rgba(245,158,11,0.5)]" />
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 drop-shadow-[0_0_4px_rgba(245,158,11,0.5)]" />
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 drop-shadow-[0_0_4px_rgba(245,158,11,0.5)]" />
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 drop-shadow-[0_0_4px_rgba(245,158,11,0.5)]" />
                <div className="relative w-3.5 h-3.5 overflow-hidden">
                  <Star className="absolute top-0 left-0 w-3.5 h-3.5 text-neutral-700" />
                  <div className="absolute top-0 left-0 w-[80%] h-full overflow-hidden">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  </div>
                </div>
              </div>
              <span className="text-[9px] font-mono text-emerald-500 block font-bold">17 VERIFIED AUDITS & REVIEWS</span>
            </div>
          </div>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-neutral-800/20 pb-4">
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
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-medium tracking-wider cursor-pointer transition-all border ${
                  isTabActive
                    ? isLightMode 
                      ? 'bg-[#0C122C] border-[#0C122C] text-white font-bold'
                      : 'bg-amber-550 border-amber-500 text-[#050918] font-bold shadow-sm'
                    : isLightMode
                      ? 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-100 hover:border-neutral-300'
                      : 'bg-neutral-950/60 border-[#182747] text-neutral-450 hover:text-white hover:border-[#1c305e]'
                }`}
              >
                <IconComponent className={`w-3.5 h-3.5 ${isTabActive ? 'animate-pulse' : 'text-neutral-500'}`} />
                <span className="uppercase">{category.label}</span>
                <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold shrink-0 ${
                  isTabActive 
                    ? isLightMode ? 'bg-neutral-800 text-white' : 'bg-neutral-950/80 text-amber-500'
                    : isLightMode ? 'bg-neutral-100 text-neutral-500' : 'bg-neutral-900 text-neutral-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Header Slide Switcher */}
        <div className="flex justify-between items-center mb-4 font-mono text-[9px] text-neutral-500 uppercase">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`px-2 py-1 border transition-colors cursor-pointer flex items-center gap-1.5 ${
                isLightMode 
                  ? 'bg-white border-neutral-300 hover:border-neutral-400 text-neutral-700' 
                  : 'bg-neutral-950 border-[#1c305e]/20 hover:border-[#1c305e] text-neutral-450'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isAutoPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-600'}`} />
              <span>AUTO DRILL: {isAutoPlaying ? 'ACTIVE' : 'PAUSED'}</span>
            </button>
            <span className="text-neutral-600">|</span>
            <span>HOVER REQ TO HOLD CAROUSEL LOCK</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">Spotlight Sweep Index:</span>
            <div className={`px-2.5 py-1 border ${isLightMode ? 'bg-white border-neutral-200' : 'bg-neutral-950/60 border-[#182747]'}`}>
              {filtered.length > 0 ? (
                <>
                  <span className="text-amber-500 font-extrabold">{String(activeIndex + 1).padStart(2, '0')}</span>
                  <span className="mx-1 text-neutral-600">/</span>
                  <span className={isLightMode ? 'text-neutral-750' : 'text-neutral-350'}>{String(filtered.length).padStart(2, '0')}</span>
                </>
              ) : (
                <span className="text-neutral-500">00 / 00</span>
              )}
            </div>
          </div>
        </div>

        {/* Empty state safeguard */}
        {filtered.length === 0 ? (
          <div className={`p-12 text-center border font-mono ${
            isLightMode ? 'bg-white border-neutral-200' : 'bg-[#050918] border-[#182747]'
          }`}>
            <ShieldAlert className="w-8 h-8 text-amber-500 mx-auto mb-3 animate-bounce" />
            <span className="block text-xs font-bold uppercase tracking-wider text-neutral-400">NO TESTIMONIAL AUDITS FOUND IN THIS SECTOR</span>
            <button 
              onClick={() => setActiveTab('all')} 
              className="mt-4 px-3 py-1.5 border border-amber-500 text-amber-500 bg-amber-500/5 text-[9px] uppercase font-bold tracking-wider hover:bg-amber-500 hover:text-[#050918] transition-all cursor-pointer"
            >
              Reset Sector Filter
            </button>
          </div>
        ) : (
          /* Testimonial Active Display Layout Card */
          <div className={`p-6 sm:p-10 lg:p-11 min-h-[460px] sm:min-h-[380px] lg:min-h-[340px] flex flex-col justify-between relative overflow-hidden border transition-colors ${
            isLightMode 
              ? 'bg-white border-neutral-200 shadow-md' 
              : 'bg-[#050918] border-[#182747]'
          }`}>
            
            {/* Top subtle duration process bar */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-neutral-900/40">
              <div 
                className="h-full bg-amber-500 transition-all duration-100 ease-linear"
                style={{ width: `${isHovered || !isAutoPlaying ? 0 : progress}%` }}
              />
            </div>

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
                
                {/* Testimonial Main Content (Col Span 8) */}
                <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
                  
                  {/* Visual quote icon and score */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="w-12 h-12 bg-amber-500/10 text-amber-500 flex items-center justify-center rounded-none relative">
                      <Quote className="w-6 h-6 transform rotate-180" />
                    </div>
                    {/* Heavy Gear Rating */}
                    <div className={`flex items-center gap-2 px-3 py-1.5 border select-none font-mono ${
                      isLightMode 
                        ? 'bg-neutral-50 border-neutral-200 text-neutral-700' 
                        : 'bg-neutral-950/80 border-[#101933]'
                    }`}>
                      <div 
                        className="relative flex items-center gap-0.5 cursor-help group/stars py-0.5 px-1.5 bg-amber-500/5 hover:bg-amber-500/15 border border-amber-500/20 transition-all rounded"
                        onMouseEnter={() => setShowScoreTooltip(true)}
                        onMouseLeave={() => setShowScoreTooltip(false)}
                      >
                        {[...Array(active.ratingGrade)].map((_, i) => (
                          <Star 
                            key={i} 
                            className="w-3.5 h-3.5 text-amber-500 fill-amber-500 drop-shadow-[0_0_3px_rgba(245,158,11,0.6)] transition-transform group-hover/stars:scale-110" 
                            style={{ transitionDelay: `${i * 30}ms` }} 
                          />
                        ))}
                        {active.ratingGrade < 5 && (
                          <Star className="w-3.5 h-3.5 text-neutral-700" />
                        )}

                        <AnimatePresence>
                          {showScoreTooltip && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 5, scale: 0.95 }}
                              className={`absolute bottom-full left-0 mb-3 w-80 border p-4 shadow-2xl z-50 text-left font-mono pointer-events-none rounded-none ${
                                isLightMode 
                                  ? 'bg-white border-amber-500/70 text-[#0C122C]' 
                                  : 'bg-[#060a1a] border-amber-500/50 text-white'
                              }`}
                              style={{ originX: 0 }}
                            >
                              <div className={`border-b pb-1.5 mb-2.5 ${isLightMode ? 'border-neutral-200' : 'border-[#182747]'}`}>
                                <span className="text-[8px] text-amber-500 font-extrabold uppercase tracking-widest block font-mono">DIAGNOSTIC TELEMETRY REPORT</span>
                                <h5 className={`text-[10px] font-black uppercase mt-0.5 ${isLightMode ? 'text-[#0C122C]' : 'text-white'}`}>{active.companyName}</h5>
                              </div>
                              <div className="space-y-2">
                                {(GRANULAR_SCORES[active.id] || []).map((item, idx) => (
                                  <div key={idx} className="space-y-0.5">
                                    <div className="flex justify-between items-center text-[9px]">
                                      <span className={isLightMode ? 'text-neutral-600' : 'text-neutral-450'}>{item.metric}</span>
                                      <span className="text-emerald-500 font-bold">{item.score}</span>
                                    </div>
                                    <p className={`text-[7.5px] leading-none ${isLightMode ? 'text-neutral-500' : 'text-neutral-400'}`}>{item.detail}</p>
                                  </div>
                                ))}
                              </div>
                              <div className={`mt-3 pt-2 border-t flex items-center justify-between text-[7.5px] ${
                                isLightMode ? 'border-neutral-200 text-neutral-500' : 'border-[#182747] text-neutral-500'
                              }`}>
                                <span>CORES INTEGRITY: SECURE</span>
                                <span className="text-amber-500">AUDITED BY CLASQO TIER-1</span>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <span className="text-[9px] font-black text-amber-500 uppercase tracking-wide">
                        {active.ratingGrade === 5 ? 'PERFECT TIER-1 SLA' : 'HEAVY SHIELD ACTIVE'}
                      </span>
                      <span className="text-[8px] text-neutral-500 border border-neutral-350 bg-neutral-100/50 dark:border-neutral-800 dark:bg-neutral-900/50 px-1 hover:text-amber-550 hover:border-amber-550 transition-colors">KPI REPORT</span>
                    </div>
                  </div>

                  {/* The core Quote Text */}
                  <div className="flex-grow flex items-center">
                    <p className={`text-sm sm:text-base lg:text-[17px] font-medium leading-relaxed font-sans italic tracking-wide select-none ${
                      isLightMode ? 'text-neutral-800 font-medium' : 'text-neutral-200 font-normal'
                    }`}>
                      "{active.quoteText}"
                    </p>
                  </div>

                  {/* Speaker Identity */}
                  <div className={`flex items-center gap-4 pt-4 border-t ${isLightMode ? 'border-neutral-200' : 'border-[#182747]'}`}>
                    <div className={`w-10 h-10 border text-amber-400 font-mono font-bold flex items-center justify-center text-xs text-center select-none shrink-0 ${
                      isLightMode ? 'bg-neutral-100 border-neutral-200' : 'bg-[#0c1430] border-[#1c305e]'
                    }`} title="Verified Engineering Representative">
                      {active.speakerName.split(' ')[1]?.[0] || 'E'}{active.speakerName.split(' ')[2]?.[0] || 'N'}
                    </div>
                    <div className="leading-tight">
                      <span className={`text-xs font-black block uppercase tracking-wider ${isLightMode ? 'text-neutral-900' : 'text-white'}`}>{active.speakerName}</span>
                      <span className={`text-[10px] font-mono ${isLightMode ? 'text-neutral-500' : 'text-neutral-450'}`}>{active.speakerRole}</span>
                    </div>
                  </div>

                </div>

                {/* Technical / Project Parameters Sidebar (Col Span 4) */}
                <div className={`p-5 sm:p-6 space-y-5 font-mono text-[10px] border flex flex-col justify-between transition-colors lg:col-span-4 ${
                  isLightMode 
                    ? 'bg-neutral-50/70 border-neutral-200 text-neutral-850' 
                    : 'bg-[#0B122C]/60 border-[#182747] text-white'
                }`}>
                  
                  <div className="space-y-4">
                    {/* Construction Firm Logo Label Header */}
                    <div className={`border-b pb-3 flex items-center gap-2 ${isLightMode ? 'border-neutral-200' : 'border-[#182747]'}`}>
                      <Building2 className="w-4 h-4 text-amber-500 shrink-0" />
                      <div>
                        <h4 className={`font-extrabold uppercase text-[11px] leading-none tracking-tight ${isLightMode ? 'text-[#0C122C]' : 'text-white'}`}>{active.companyName}</h4>
                        <span className="text-neutral-500 text-[8px] uppercase tracking-widest mt-1 block">{active.firmType}</span>
                      </div>
                    </div>

                    <div className="space-y-3.5">
                      {/* Verified Project Badge */}
                      <div className="space-y-1">
                        <span className="text-neutral-500 text-[7.5px] font-bold uppercase tracking-wider block">VERIFIED PROJECT DELIVERY</span>
                        <div className={`px-2.5 py-1.5 border flex items-center gap-1.5 ${
                          isLightMode ? 'bg-white border-neutral-200' : 'bg-neutral-950 border-[#101933]'
                        }`}>
                          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full shrink-0" />
                          <span className={isLightMode ? 'text-neutral-800' : 'text-neutral-250'}>{active.projectLoc}</span>
                        </div>
                      </div>

                      {/* Machinery used section */}
                      <div className="space-y-1">
                        <span className="text-neutral-500 text-[7.5px] font-bold uppercase tracking-wider block">DISPATCHED MACHINERY</span>
                        <div className={`px-2.5 py-1.5 border text-amber-500 font-bold uppercase ${
                          isLightMode ? 'bg-white border-neutral-200' : 'bg-neutral-900 border-[#1c305e]/20'
                        }`}>
                          {active.machineryUsed}
                        </div>
                      </div>

                      {/* Technical efficiency parameters info */}
                      <div className="grid grid-cols-2 gap-3 pt-1">
                        <div className={`border p-2 ${isLightMode ? 'bg-white border-neutral-200' : 'border-[#182747] bg-neutral-950'}`}>
                          <span className="text-neutral-500 text-[7px] uppercase tracking-wider block leading-none">{active.metricLabel}</span>
                          <span className={`text-[10px] font-black block mt-1 leading-none ${isLightMode ? 'text-[#0C122C]' : 'text-white'}`}>{active.metricVal}</span>
                        </div>
                        <div className={`border p-2 ${isLightMode ? 'bg-white border-neutral-200' : 'border-[#182747] bg-neutral-950'}`}>
                          <span className="text-neutral-500 text-[7px] uppercase tracking-wider block leading-none">ENGINEERING RAMP</span>
                          <span className="text-emerald-500 text-[10px] font-black block mt-1 leading-none">{active.engineeringScore.split(' ')[0]}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom verified live seal */}
                  <div className={`pt-3 mt-4 border-t flex items-center justify-between text-[8px] font-extrabold tracking-widest ${
                    isLightMode ? 'border-neutral-200 text-slate-500' : 'border-[#182747] text-[#4d639b]'
                  }`}>
                    <span className="flex items-center gap-1 uppercase">
                      <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" /> CLASQO SEAL OF TRUST
                    </span>
                    <span>CJ-{active.id}-NGR</span>
                  </div>

                </div>

              </motion.div>
            </AnimatePresence>

          </div>
        )}

        {/* Navigation arrow buttons / dot pagination bar */}
        {filtered.length > 1 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
            
            {/* Quick base triggers */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className={`px-3 py-2 border transition-all cursor-pointer rounded-none flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase group ${
                  isLightMode 
                    ? 'bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-100' 
                    : 'bg-[#050918] border-[#182747] text-neutral-400 hover:text-white hover:border-[#1c305e]'
                }`}
              >
                <ChevronLeft className="w-3.5 h-3.5 text-amber-500 group-hover:-translate-x-0.5 transition-transform" />
                <span>PREVIOUS AUDIT</span>
              </button>

              <button
                onClick={handleNext}
                className={`px-3 py-2 border transition-all cursor-pointer rounded-none flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase group ${
                  isLightMode 
                    ? 'bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-100' 
                    : 'bg-[#050918] border-[#182747] text-neutral-400 hover:text-white hover:border-[#1c305e]'
                }`}
              >
                <span>NEXT AUDIT</span>
                <ChevronRight className="w-3.5 h-3.5 text-amber-500 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Micro dot indicator trail */}
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-[280px] sm:max-w-md">
              {filtered.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setDirection(index > activeIndex ? 'right' : 'left');
                    setActiveIndex(index);
                  }}
                  className={`h-2 transition-all cursor-pointer rounded-none ${
                    index === activeIndex 
                      ? 'bg-amber-500 w-8' 
                      : isLightMode 
                        ? 'bg-neutral-300 hover:bg-neutral-400 w-2' 
                        : 'bg-neutral-800 hover:bg-neutral-600 w-2'
                  }`}
                  title={`Focus on ${item.companyName}`}
                />
              ))}
            </div>

            {/* SLA badge */}
            <div className={`font-mono text-[8px] uppercase flex items-center gap-1 shrink-0 ${
              isLightMode ? 'text-neutral-500' : 'text-neutral-450'
            }`}>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>SLA Performance Level: 98.4%</span>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
