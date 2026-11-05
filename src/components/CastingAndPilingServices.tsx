/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { QuoteItem } from '../types';
import { motion } from 'motion/react';
import { 
  HardHat, 
  Hammer, 
  HelpCircle, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronRight, 
  Calculator, 
  Plus, 
  Eye, 
  Award, 
  Users, 
  AlertCircle, 
  Sparkles 
} from 'lucide-react';

interface CastingAndPilingServicesProps {
  onAddToQuote: (item: QuoteItem) => void;
  addedItems: QuoteItem[];
  isLightMode?: boolean;
}

export default function CastingAndPilingServices({ onAddToQuote, addedItems, isLightMode = false }: CastingAndPilingServicesProps) {
  const [selectedService, setSelectedService] = useState<'floor' | 'highrise' | 'piling' | 'general'>('floor');
  const [slabSqm, setSlabSqm] = useState(500);
  const [floors, setFloors] = useState(4);
  const [pileCount, setPileCount] = useState(25);
  const [pileDepth, setPileDepth] = useState(24);
  const [concreteVolume, setConcreteVolume] = useState(150);

  const [includeConcreteSupply, setIncludeConcreteSupply] = useState(false);
  const [concreteGrade, setConcreteGrade] = useState<'C25' | 'C30' | 'C40'>('C30');
  const [durationDays, setDurationDays] = useState(3);
  const [successAnimation, setSuccessAnimation] = useState(false);

  // Core Service Details Content with matching generated imagery
  const servicesData = {
    floor: {
      title: 'Full Floor & Slab Casting',
      tagline: 'High-yield horizontal slab pouring for warehouses, commercial yards, and industrial floors.',
      image: '/src/assets/images/service_slab_casting_1793852352746.jpg',
      baseRatePerDay: 850000,
      description: 'Clasqo dispatches Sany High-Volume Boom Pumps or Sany Truck-mounted Line Pumps with a fully equipped team including pump technicians, pipeline couplers, and ground dispatch directors. Perfect for marshy sand zones of Ibeju-Lekki to guarantee rapid, high-pressure concrete spread before setting.',
      crewSize: 6,
      benefits: [
        'Advanced level-line vibration tolerance standards',
        'Direct Sany Line Pump mobilization for confined layouts',
        'Includes 100m pipeline couplers with Quick-Snap seals',
        '24/7 technical logistics supervisor presence included'
      ],
      defaultMachinery: 'Sany Truck-Mounted Line Pump (SY5133THB)'
    },
    highrise: {
      title: 'High-Rise Vertical Casting',
      tagline: 'Complex vertical pumping logistics matching heavy tower design configurations.',
      image: '/src/assets/images/service_highrise_pumping_1793852367412.jpg',
      baseRatePerDay: 1350000,
      description: 'Engineered specifically for sky-facing delivery. Utilizes our premium Sany 56m Truck-Mounted Concrete Boom Pump combined with specialized climbing pipeline conduits. Our operators work in sync with crane signals to lay high-strength structural concrete on high floors with millimeter accuracy.',
      crewSize: 8,
      benefits: [
        'Safe high-altitude pipe anchoring validation',
        'Operated exclusively by Level-1 Sany-certified boom pilots',
        'Active boom oscillation damping controls for structural safety',
        'Laser verticality compliance testing'
      ],
      defaultMachinery: 'Sany 56m Concrete Boom Pump (SY5418THB)'
    },
    piling: {
      title: 'Bored Piling & Foundation Drilling',
      tagline: 'High stability structural pile foundations engineered for tidal Lekki swamp strata.',
      image: '/src/assets/images/service_bored_piling_1793852380230.jpg',
      baseRatePerDay: 1950000,
      description: 'Our specialized piling department dispatches Sany SR285 Rotary Drilling Rigs along with geotechnical excavation supervisors, mud-circulation pump engineers, and structural cage lower crews. We drill and cast durable load-bearing concrete pillars deep through sandy sediment to solid bedrock.',
      crewSize: 10,
      benefits: [
        'Swamp-terrain tracking and mud slurry cake stabilization',
        'Friction and interlocking Kelly bars tailored to geological resistance',
        'Complete steel rebar structure placement and tremie casting teams',
        'Certified pile integrity test (PIT) verification reports'
      ],
      defaultMachinery: 'Sany SR285 Rotary Drilling Rig'
    },
    general: {
      title: 'Structural Retaining Walls & Civil Castings',
      tagline: 'Integrated engineering castings for bridge piers, box culverts, and structural retaining structures.',
      image: '/src/assets/images/service_civil_retaining_1793852394517.jpg',
      baseRatePerDay: 950000,
      description: 'Tailored for specialized public infrastructure, civil roads, drainage systems, or heavy ocean retaining walls. Clasqo manages the entire machinery matching, site permitting, delivery pipeline layouts, and operator mobilization, delivering smooth casting schedules under harsh Lagos weather.',
      crewSize: 5,
      benefits: [
        'Custom modular framework design configurations',
        'Marshy terrain logistics carrier clearances',
        'Underwater or tidal harbor concrete casting experts',
        'Integrated aggregate slump pressure tests reports'
      ],
      defaultMachinery: 'Sany Trailer Concrete Pump (HBT80)'
    }
  };

  const activeService = servicesData[selectedService];

  // Recalculate dynamic estimates
  const calculateEstimate = () => {
    let baseRate = activeService.baseRatePerDay * durationDays;
    let materialCost = 0;

    if (selectedService === 'floor') {
      baseRate += slabSqm * 2200; // NGN 2,200 handling layout surcharge per sqm
    } else if (selectedService === 'highrise') {
      baseRate += floors * 450000; // NGN 450,000 altitude pump fee per floor level
    } else if (selectedService === 'piling') {
      baseRate += pileCount * pileDepth * 35000; // NGN 35,000 geotechnical labor surcharge per meter drilled
    } else if (selectedService === 'general') {
      baseRate += concreteVolume * 15000; // NGN 15,000 flow rate surcharge per m³ poured
    }

    if (includeConcreteSupply) {
      const ratePerM3 = concreteGrade === 'C25' ? 95000 : concreteGrade === 'C30' ? 115000 : 145000;
      let estimatedM3 = concreteVolume;
      if (selectedService === 'floor') estimatedM3 = (slabSqm * 0.15); // Average 15cm thickness
      if (selectedService === 'piling') estimatedM3 = (pileCount * Math.PI * Math.pow(0.4, 2) * pileDepth); // Bored volume estimate
      
      materialCost = estimatedM3 * ratePerM3;
    }

    return {
      operationalBase: baseRate,
      materialConcrete: materialCost,
      total: baseRate + materialCost
    };
  };

  const costs = calculateEstimate();

  const handleAddServiceToQuote = () => {
    const quoteName = `Job Service: ${activeService.title} (+ Machinery & Operating Crew Team)`;
    const totalCost = costs.total;

    onAddToQuote({
      type: 'service',
      id: `service-cast-${selectedService}`,
      name: quoteName,
      quantity: 1,
      days: durationDays,
      rateOrPrice: totalCost / durationDays
    });

    setSuccessAnimation(true);
    setTimeout(() => {
      setSuccessAnimation(false);
    }, 3000);
  };

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Check if added already
  const isAdded = addedItems.some(item => item.id === `service-cast-${selectedService}`);

  return (
    <div className={`py-12 px-4 sm:px-6 font-sans transition-colors duration-200 ${
      isLightMode ? 'bg-[#F4F6FA] text-[#0C122C]' : 'bg-[#080D22] text-neutral-100'
    }`}>
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className={`border p-8 sm:p-12 relative overflow-hidden transition-colors ${
          isLightMode 
            ? 'bg-white border-neutral-200 shadow-sm' 
            : 'bg-[#060a1a] border-[#182747]'
        }`}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.06),transparent_60%)] pointer-events-none" />
          
          <div className="max-w-3xl space-y-3 relative z-10">
            <span className="text-[10px] text-amber-500 font-black uppercase tracking-[0.25em] leading-none mb-1 font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> HEAVY ENGINEERING CONTRACTING SERVICES
            </span>
            <h1 className={`text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight ${
              isLightMode ? 'text-[#0C122C]' : 'text-white'
            }`}>
              Lagos Integrated Concrete Casting & Foundation Piling
            </h1>
            <p className={`text-xs sm:text-sm leading-relaxed max-w-2xl ${
              isLightMode ? 'text-neutral-600' : 'text-neutral-400'
            }`}>
              Do not just rent raw machinery. Save weeks of coordination, logistics planning, and local regulatory delays. Clasqo dispatches the active Sany machine together with licensed site engineers, operators, and pipe coupling crews to manage complex casts end-to-end.
            </p>
          </div>
        </div>

        {/* Inner Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Services Column (Col Span 5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className={`border p-5 ${
              isLightMode ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#060a1a] border-[#182747]'
            }`}>
              <span className="text-[10px] text-amber-500 font-mono font-black uppercase tracking-wider block mb-4">
                SELECT PRIMARY CASTING JOB
              </span>
              <div className="space-y-3">
                {Object.entries(servicesData).map(([key, data]) => {
                  const isSelected = selectedService === key;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedService(key as any);
                        if (key === 'floor') setDurationDays(3);
                        else if (key === 'highrise') setDurationDays(5);
                        else if (key === 'piling') setDurationDays(8);
                        else setDurationDays(4);
                      }}
                      className={`w-full text-left p-3.5 rounded-none transition-all duration-200 border cursor-pointer flex items-center justify-between gap-3 group ${
                        isSelected 
                          ? 'border-amber-500 bg-amber-500/10 text-amber-500 shadow-xs' 
                          : isLightMode
                            ? 'bg-neutral-50/50 border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-100/50'
                            : 'bg-[#0B122C]/40 border-[#182747] text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <div className="w-12 h-12 shrink-0 overflow-hidden border border-neutral-300 dark:border-neutral-800">
                        <img 
                          src={data.image} 
                          alt={data.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="space-y-1 flex-1 min-w-0">
                        <h3 className={`text-xs font-black uppercase transition-colors truncate ${
                          isSelected ? 'text-amber-500' : isLightMode ? 'text-neutral-900 group-hover:text-amber-600' : 'text-neutral-200 group-hover:text-amber-500'
                        }`}>
                          {data.title}
                        </h3>
                        <p className="text-[10px] text-neutral-500 truncate">{data.tagline}</p>
                      </div>

                      <ChevronRight className={`w-4 h-4 transition-transform duration-200 shrink-0 ${isSelected ? 'text-amber-500 transform translate-x-1' : 'text-neutral-400'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Operating Logistics & Guarantee Notice */}
            <div className={`border p-6 space-y-4 font-mono text-[10px] ${
              isLightMode ? 'bg-white border-neutral-200 text-neutral-600 shadow-sm' : 'bg-[#0B122C] border-[#182747] text-neutral-400'
            }`}>
              <div className={`flex items-center gap-2 font-extrabold border-b pb-2 text-[11px] ${
                isLightMode ? 'text-neutral-900 border-neutral-200' : 'text-white border-[#182747]'
              }`}>
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>CLASQO MOBILIZATION GUARANTEES</span>
              </div>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2 leading-relaxed">
                  <span className="text-amber-500 font-extrabold">•</span>
                  <span><strong>Zero Machinery Overhead:</strong> Sany fuel supply, hauling permit logs, and safety tests are cleared entirely by Clasqo logistics managers.</span>
                </li>
                <li className="flex items-start gap-2 leading-relaxed">
                  <span className="text-amber-500 font-extrabold">•</span>
                  <span><strong>Licensed Engineering Teams:</strong> Operators have Tier-1 certified expertise to work around harsh sand beds, marshy waterways, or extreme heights.</span>
                </li>
                <li className="flex items-start gap-2 leading-relaxed">
                  <span className="text-amber-500 font-extrabold">•</span>
                  <span><strong>Full pipeline support:</strong> Up to 150m heavy twin-wall structural pipes included with all line pump bookings.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Service Configuration & Estimator (Col Span 7) */}
          <div className={`lg:col-span-7 flex flex-col justify-between border p-6 sm:p-8 relative ${
            isLightMode ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#060a1a] border-[#182747]'
          }`}>
            <div className="space-y-6">
              
              {/* Header Active service details with Photographic Showcase Banner */}
              <div className={`border-b pb-5 space-y-3 ${isLightMode ? 'border-neutral-200' : 'border-[#182747]'}`}>
                <div className="flex items-center justify-between gap-4">
                  <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2.5 py-0.5 rounded-none text-[9px] font-bold uppercase tracking-widest font-mono">
                    CONTRACTING SCHEME ACTIVE
                  </span>
                  <div className="flex items-center gap-1.5 text-neutral-500 text-[10px] font-mono">
                    <Users className="w-3.5 h-3.5 text-amber-500" />
                    <span>Est. Crew: {activeService.crewSize} Staff</span>
                  </div>
                </div>

                {/* Service Showcase Image Banner */}
                <div className="relative h-48 sm:h-56 w-full overflow-hidden border border-neutral-200 dark:border-neutral-800 rounded-none group">
                  <img 
                    src={activeService.image} 
                    alt={activeService.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-amber-500 text-neutral-950 px-2 py-0.5 text-[8.5px] font-mono font-black uppercase tracking-wider">
                        ACTIVE DISPATCH DECK
                      </span>
                      <span className="text-neutral-200 text-[10px] font-mono font-bold">
                        {activeService.defaultMachinery}
                      </span>
                    </div>
                    <span className="text-white text-xs font-bold uppercase tracking-wide">
                      {activeService.tagline}
                    </span>
                  </div>
                </div>

                <h2 className={`text-xl sm:text-2xl font-black uppercase tracking-tight ${
                  isLightMode ? 'text-[#0C122C]' : 'text-white'
                }`}>
                  {activeService.title}
                </h2>
                <p className={`text-xs leading-relaxed ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
                  {activeService.description}
                </p>
              </div>

              {/* Dynamic input configurators dependent on selected service */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-widest font-mono">
                  STEP 1: CONFIGURE JOB PARAMETERS
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedService === 'floor' && (
                    <div className="space-y-1">
                      <label className={`text-[9px] font-black block uppercase tracking-wider font-mono ${
                        isLightMode ? 'text-neutral-700' : 'text-neutral-450'
                      }`}>
                        SLAB SURFACE AREA (Sqm)
                      </label>
                      <div className={`flex items-center border ${
                        isLightMode ? 'bg-neutral-50 border-neutral-300 focus-within:border-amber-500' : 'bg-[#0B122C] border-[#182747] focus-within:border-amber-500'
                      }`}>
                        <input
                          type="number"
                          value={slabSqm}
                          onChange={(e) => setSlabSqm(Math.max(50, parseInt(e.target.value) || 50))}
                          className={`w-full bg-transparent border-0 text-xs py-2.5 px-3 font-mono focus:outline-none ${
                            isLightMode ? 'text-neutral-900' : 'text-white'
                          }`}
                        />
                        <span className="text-[10px] text-neutral-500 font-bold px-3 font-mono">Sqm</span>
                      </div>
                    </div>
                  )}

                  {selectedService === 'highrise' && (
                    <div className="space-y-1">
                      <label className={`text-[9px] font-black block uppercase tracking-wider font-mono ${
                        isLightMode ? 'text-neutral-700' : 'text-neutral-450'
                      }`}>
                        VERTICAL FLOORS COUNT
                      </label>
                      <div className={`flex items-center border ${
                        isLightMode ? 'bg-neutral-50 border-neutral-300 focus-within:border-amber-500' : 'bg-[#0B122C] border-[#182747] focus-within:border-amber-500'
                      }`}>
                        <input
                          type="number"
                          value={floors}
                          onChange={(e) => setFloors(Math.max(1, parseInt(e.target.value) || 1))}
                          className={`w-full bg-transparent border-0 text-xs py-2.5 px-3 font-mono focus:outline-none ${
                            isLightMode ? 'text-neutral-900' : 'text-white'
                          }`}
                        />
                        <span className="text-[10px] text-neutral-500 font-bold px-3 font-mono">LEVELS</span>
                      </div>
                    </div>
                  )}

                  {selectedService === 'piling' && (
                    <>
                      <div className="space-y-1">
                        <label className={`text-[9px] font-black block uppercase tracking-wider font-mono ${
                          isLightMode ? 'text-neutral-700' : 'text-neutral-450'
                        }`}>
                          NUMBER OF BORED PILES
                        </label>
                        <div className={`flex items-center border ${
                          isLightMode ? 'bg-neutral-50 border-neutral-300 focus-within:border-amber-500' : 'bg-[#0B122C] border-[#182747] focus-within:border-amber-500'
                        }`}>
                          <input
                            type="number"
                            value={pileCount}
                            onChange={(e) => setPileCount(Math.max(1, parseInt(e.target.value) || 1))}
                            className={`w-full bg-transparent border-0 text-xs py-2.5 px-3 font-mono focus:outline-none ${
                              isLightMode ? 'text-neutral-900' : 'text-white'
                            }`}
                          />
                          <span className="text-[10px] text-neutral-500 font-bold px-3 font-mono">PILES</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className={`text-[9px] font-black block uppercase tracking-wider font-mono ${
                          isLightMode ? 'text-neutral-700' : 'text-neutral-450'
                        }`}>
                          AVERAGE DEPTH PER PILE
                        </label>
                        <div className={`flex items-center border ${
                          isLightMode ? 'bg-neutral-50 border-neutral-300 focus-within:border-amber-500' : 'bg-[#0B122C] border-[#182747] focus-within:border-amber-500'
                        }`}>
                          <input
                            type="number"
                            value={pileDepth}
                            onChange={(e) => setPileDepth(Math.max(5, parseInt(e.target.value) || 5))}
                            className={`w-full bg-transparent border-0 text-xs py-2.5 px-3 font-mono focus:outline-none ${
                              isLightMode ? 'text-neutral-900' : 'text-white'
                            }`}
                          />
                          <span className="text-[10px] text-neutral-500 font-bold px-3 font-mono">METERS</span>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="space-y-1">
                    <label className={`text-[9px] font-black block uppercase tracking-wider font-mono ${
                      isLightMode ? 'text-neutral-700' : 'text-neutral-450'
                    }`}>
                      ESTIMATED POUR VOLUME (m³)
                    </label>
                    <div className={`flex items-center border ${
                      isLightMode ? 'bg-neutral-50 border-neutral-300 focus-within:border-amber-500' : 'bg-[#0B122C] border-[#182747] focus-within:border-amber-500'
                    }`}>
                      <input
                        type="number"
                        value={concreteVolume}
                        onChange={(e) => setConcreteVolume(Math.max(10, parseInt(e.target.value) || 10))}
                        className={`w-full bg-transparent border-0 text-xs py-2.5 px-3 font-mono focus:outline-none ${
                          isLightMode ? 'text-neutral-900' : 'text-white'
                        }`}
                      />
                      <span className="text-[10px] text-neutral-500 font-bold px-3 font-mono">m³</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className={`text-[9px] font-black block uppercase tracking-wider font-mono ${
                      isLightMode ? 'text-neutral-700' : 'text-neutral-450'
                    }`}>
                      ESTIMATED ACTIVE WORKING DAYS
                    </label>
                    <div className={`flex items-center border ${
                      isLightMode ? 'bg-neutral-50 border-neutral-300 focus-within:border-amber-500' : 'bg-[#0B122C] border-[#182747] focus-within:border-amber-500'
                    }`}>
                      <input
                        type="number"
                        value={durationDays}
                        onChange={(e) => setDurationDays(Math.max(1, parseInt(e.target.value) || 1))}
                        className={`w-full bg-transparent border-0 text-xs py-2.5 px-3 font-mono focus:outline-none ${
                          isLightMode ? 'text-neutral-900' : 'text-white'
                        }`}
                      />
                      <span className="text-[10px] text-neutral-500 font-bold px-3 font-mono">DAYS</span>
                    </div>
                  </div>
                </div>

                <div className={`p-3 border text-[10px] flex items-center gap-2.5 rounded-none ${
                  isLightMode ? 'bg-neutral-50 border-neutral-200 text-neutral-700' : 'bg-[#0B122C] border-[#182747] text-neutral-400'
                }`}>
                  <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>
                    <strong>Default Heavy Dispatch Auto-Bundle:</strong> This project will be mobilized matching one <strong>{activeService.defaultMachinery}</strong> and the dedicated <strong>{activeService.crewSize}-Man Operations & Permitting Crew</strong>.
                  </span>
                </div>
              </div>

              {/* Concrete Grade Mix Sourcing Overlay */}
              <div className={`border p-5 space-y-4 ${
                isLightMode ? 'bg-neutral-50/70 border-neutral-200' : 'bg-[#0B122C]/40 border-[#182747]'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className={`text-[10px] font-black uppercase tracking-wider block font-mono ${
                      isLightMode ? 'text-[#0C122C]' : 'text-white'
                    }`}>
                      STEP 2: ADD COMPLETE CONCRETE GRADE SOURCING?
                    </span>
                    <p className={`text-[10px] leading-relaxed ${isLightMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                      Toggle to include aggregate ready-mix supply (C30/C40 concrete mix pipelines) directly with Clasqo fleet.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={includeConcreteSupply}
                    onChange={(e) => setIncludeConcreteSupply(e.target.checked)}
                    className="w-5 h-5 accent-amber-500 rounded-none cursor-pointer"
                  />
                </div>

                {includeConcreteSupply && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 font-mono text-[10px] animate-fade-in">
                    <div className="space-y-1">
                      <label className={`text-[9px] block uppercase tracking-wider ${isLightMode ? 'text-neutral-700' : 'text-neutral-400'}`}>
                        CONCRETE MIX GRADE
                      </label>
                      <select
                        value={concreteGrade}
                        onChange={(e: any) => setConcreteGrade(e.target.value)}
                        className={`w-full border rounded-none py-2 px-3 focus:outline-none ${
                          isLightMode ? 'bg-white border-neutral-300 text-neutral-900' : 'bg-[#0B122C] border-[#182747] text-neutral-100'
                        }`}
                      >
                        <option value="C25">C25/30 - For slab sub-floors (Standard)</option>
                        <option value="C30">C30/37 - High early strength (Recommended)</option>
                        <option value="C40">C40/50 - Ultra dense micro silica (Piling & High Rise)</option>
                      </select>
                    </div>
                    <div className={`p-2.5 border flex flex-col justify-center space-y-0.5 ${
                      isLightMode ? 'bg-white border-neutral-200' : 'bg-[#060a1a] border-[#182747]'
                    }`}>
                      <span className="text-neutral-500 uppercase font-bold text-[8px]">ESTIMATED RATE:</span>
                      <span className={`text-[11px] font-black ${isLightMode ? 'text-[#0C122C]' : 'text-white'}`}>
                        {concreteGrade === 'C25' ? '₦95,000' : concreteGrade === 'C30' ? '₦115,000' : '₦145,000'} / cubic meter
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Dynamic Benefits Bullet List */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-black text-neutral-500 uppercase tracking-wide block">
                  TECHNICAL WORK SCOPE INCLUSIONS:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px]">
                  {activeService.benefits.map((feat, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Total Section with Action */}
            <div className={`border-t pt-6 mt-8 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-6 ${
              isLightMode ? 'border-neutral-200' : 'border-[#182747]'
            }`}>
              <div className="space-y-1 font-mono">
                <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-wider block">
                  INTEGRATED CONTRACT ESTIMATE ({durationDays} working days)
                </span>
                <div className="space-y-0.5">
                  <div className="text-[10px] text-neutral-500">
                    Base Operational Hire + Crew: <span className={isLightMode ? 'text-neutral-800 font-bold' : 'text-neutral-200 font-bold'}>{formatNaira(costs.operationalBase)}</span>
                  </div>
                  {includeConcreteSupply && (
                    <div className="text-[10px] text-neutral-500">
                      Concrete Supply Mix: <span className={isLightMode ? 'text-neutral-800 font-bold' : 'text-neutral-200 font-bold'}>{formatNaira(costs.materialConcrete)}</span>
                    </div>
                  )}
                  <div className="text-xl sm:text-2xl font-black text-amber-500">
                    {formatNaira(costs.total)} <span className="text-[10px] font-normal text-neutral-500">in NGN</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 relative">
                {successAnimation && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="absolute bottom-full mb-2 inset-x-0 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 text-center text-emerald-500 font-mono text-[9px] font-extrabold"
                  >
                    COUPLED TO SCOPE!
                  </motion.div>
                )}
                
                <button
                  type="button"
                  onClick={handleAddServiceToQuote}
                  disabled={isAdded}
                  className={`px-8 py-3.5 font-bold uppercase text-xs tracking-widest rounded-none transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                    isAdded
                      ? isLightMode ? 'bg-neutral-200 text-neutral-500 border border-neutral-300 cursor-not-allowed' : 'bg-[#121c3b] text-neutral-400 border border-[#182747] cursor-not-allowed'
                      : 'bg-amber-500 text-neutral-950 hover:bg-amber-400'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  {isAdded ? 'SERVICE IN PLANNED SCOPE' : 'ADD JOB SERVICE TO QUOTE'}
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
