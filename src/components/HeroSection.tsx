/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Compass, Cpu, CheckCircle, ShieldAlert, Truck, Globe, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onLearnMore: (tab: string) => void;
  isLightMode?: boolean;
}

export default function HeroSection({ onLearnMore, isLightMode = false }: HeroSectionProps) {
  return (
    <div className={`relative overflow-hidden py-12 md:py-20 border-b transition-colors duration-200 ${
      isLightMode 
        ? 'bg-[#FFFFFF] text-[#0C122C] border-neutral-200' 
        : 'bg-[#0B122C] text-white border-[#182747]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch relative z-10">
        
        {/* Left Branding / CTA (Col Span 7) */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
          
          {/* Featured Update Banner */}
          <div 
            onClick={() => onLearnMore('invest')}
            className={`cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 rounded-none border transition-all ${
              isLightMode
                ? 'bg-amber-500/10 border-amber-500/40 hover:bg-amber-500/15 text-slate-900'
                : 'bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/15 text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="bg-amber-500 text-slate-950 text-[9px] font-black uppercase px-2 py-0.5 tracking-wider font-mono shrink-0">
                FEATURED UPDATE
              </span>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                Partners Investment & Profit in USD • 18.5%–32.4% ROI (Min. $3,000)
              </span>
            </div>
            <span className="text-[11px] font-mono font-bold text-amber-500 flex items-center gap-1 group-hover:translate-x-1 transition-transform shrink-0">
              Launch ROI Calculator &rarr;
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-block bg-amber-500 text-neutral-950 text-[10px] font-black uppercase px-3 py-1 rounded-none tracking-widest font-mono shadow-xs">
              Heavy Machinery Solutions • Lagos Depot
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase leading-[0.95] tracking-tighter text-balance">
            Building <br />
            <span className="text-amber-500">Infrastructure</span><br />
            With Precision
          </h1>

          <p className={`text-base sm:text-lg max-w-xl leading-relaxed ${
            isLightMode ? 'text-neutral-600' : 'text-neutral-400'
          }`}>
            Lagos-based leaders in heavy-duty machinery leasing, industrial parts procurement, and specialized engineering logistics for large-scale civil projects across Nigeria.
          </p>

          {/* Action buttons with bold uppercase and square shape */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => onLearnMore('invest')}
              className="bg-amber-500 text-neutral-950 px-7 py-3.5 font-black uppercase text-xs sm:text-sm tracking-wider rounded-none hover:bg-amber-450 transition-all cursor-pointer shadow-md active:scale-95 flex items-center gap-2"
            >
              <span>Partner Investment (USD)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onLearnMore('equipment')}
              className={`border px-6 py-3.5 font-bold uppercase text-xs sm:text-sm tracking-wider rounded-none transition-all cursor-pointer ${
                isLightMode 
                  ? 'border-neutral-300 bg-neutral-50 text-neutral-800 hover:border-amber-500 hover:bg-white' 
                  : 'border-[#1E2E5B] bg-[#121c3b] text-neutral-200 hover:border-amber-500 hover:text-white'
              }`}
            >
              Rent Equipment
            </button>
            <button
              onClick={() => onLearnMore('construction')}
              className={`border px-6 py-3.5 font-bold uppercase text-xs sm:text-sm tracking-wider rounded-none transition-all cursor-pointer ${
                isLightMode 
                  ? 'border-neutral-300 text-neutral-600 hover:border-neutral-400 hover:text-black' 
                  : 'border-[#1E2E5B] text-neutral-400 hover:border-amber-500 hover:text-white'
              }`}
            >
              Casting & Piling
            </button>
          </div>
        </div>

        {/* Right Visual / Featured Spec (Col Span 5) */}
        <div className={`border relative flex flex-col justify-between overflow-hidden p-8 sm:p-10 min-h-[360px] ${
          isLightMode 
            ? 'bg-neutral-50 border-neutral-200 shadow-sm' 
            : 'bg-[#060a1a] border-[#182747]'
        }`}>
          {/* Subtle Dot Grid Background Overlay */}
          <div className="absolute inset-0 opacity-10 geometric-dots pointer-events-none" />
          
          <div className="relative z-10 flex flex-col justify-between h-full space-y-8">
            <div className="flex justify-between items-start">
              <span className={`px-3 py-1 font-mono font-bold text-[9px] uppercase tracking-widest border ${
                isLightMode ? 'bg-white text-amber-600 border-neutral-200' : 'bg-[#0B122C] text-amber-500 border-[#182747]'
              }`}>
                Staged at Eti-Osa Lekki
              </span>
              <span className="text-neutral-500" title="Active Yard Status">
                <Globe className="w-5 h-5 text-amber-500 animate-spin-slow" />
              </span>
            </div>

            <div className={`p-5 border space-y-2 ${
              isLightMode ? 'bg-white border-neutral-200' : 'bg-[#0B122C] border-[#182747]'
            }`}>
              <span className="text-[10px] text-amber-500 font-bold uppercase tracking-wider block font-mono">
                Featured Fleet Specification
              </span>
              <h3 className={`text-2xl sm:text-3xl font-black uppercase tracking-tight ${
                isLightMode ? 'text-[#0C122C]' : 'text-white'
              }`}>
                SANY SY750H Pro
              </h3>
              <p className={`text-xs leading-relaxed ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
                The absolute benchmark in heavy-duty excavation reliability. Engineered specifically for marshy terrain and deep mud foundation laying around Lekki lagoon corridors.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className={`p-4 border rounded-none ${
                isLightMode ? 'bg-white border-neutral-200' : 'bg-[#0B122C] border-[#182747]'
              }`}>
                <div className="text-amber-500 text-2xl font-black font-mono tracking-tight">506 kW</div>
                <div className="text-[9px] text-neutral-500 uppercase tracking-widest font-black mt-1 font-mono">Engine Power</div>
              </div>
              <div className={`p-4 border rounded-none ${
                isLightMode ? 'bg-white border-neutral-200' : 'bg-[#0B122C] border-[#182747]'
              }`}>
                <div className="text-amber-500 text-2xl font-black font-mono tracking-tight">76.2 Tons</div>
                <div className="text-[9px] text-neutral-500 uppercase tracking-widest font-black mt-1 font-mono">Operating Weight</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
