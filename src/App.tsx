/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import EquipmentCatalog from './components/EquipmentCatalog';
import CastingAndPilingServices from './components/CastingAndPilingServices';
import ClientTrust from './components/ClientTrust';
import PartsSourcing from './components/PartsSourcing';
import AIConsultant from './components/AIConsultant';
import QuoteBuilder from './components/QuoteBuilder';
import LogisticsCalculator from './components/LogisticsCalculator';
import FAQSection from './components/FAQSection';
import PartnersSection from './components/PartnersSection';
import { WorkforceManagement } from './components/WorkforceManagement';
import { ProjectGallery } from './components/ProjectGallery';
import { PartnersInvestmentPortal } from './components/PartnersInvestmentPortal';
import { InvestorAdminPortal } from './components/InvestorAdminPortal';
import Footer from './components/Footer';
import ClasqoLiveSupport from './components/ClasqoLiveSupport';
import { QuoteItem } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Truck, Cpu, Compass, HardHat, PhoneCall, MapPin, Users, Image as ImageIcon, TrendingUp, ArrowRight, Briefcase, DollarSign } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [equipmentCategory, setEquipmentCategory] = useState<string>('all');
  const [addedItems, setAddedItems] = useState<QuoteItem[]>([]);
  const [activeLogisticsFee, setActiveLogisticsFee] = useState<{ zone: string; fee: number } | null>(null);

  // Theme support
  const [isLightMode, setIsLightMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'light';
    }
    return false;
  });

  const handleToggleTheme = () => {
    setIsLightMode(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
      }
      return next;
    });
  };

  // Sync theme class name on initial mount and change
  React.useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
    }
  }, [isLightMode]);

  const handleNavChange = (tab: string, category?: string) => {
    setActiveTab(tab);
    if (category) {
      setEquipmentCategory(category);
    }
  };

  // Add Item to QuotationScope
  const handleAddToQuote = (newItem: QuoteItem) => {
    setAddedItems(prev => {
      // Check if already exists based on ID and type
      const exists = prev.find(item => item.id === newItem.id && item.type === newItem.type);
      if (exists) {
        return prev.map(item => 
          item.id === newItem.id && item.type === newItem.type
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      return [...prev, newItem];
    });
  };

  // Remove Item
  const handleRemoveItem = (id: string, type: 'machinery' | 'part' | 'service' | 'labor') => {
    setAddedItems(prev => prev.filter(item => !(item.id === id && item.type === type)));
    // If we removed logistics, clear activeLogistics state
    if (type === 'part' && id.startsWith('logistics-')) {
      setActiveLogisticsFee(null);
    }
  };

  // Update Item Quantity
  const handleUpdateQuantity = (id: string, type: 'machinery' | 'part' | 'service' | 'labor', qty: number) => {
    if (qty < 1) {
      handleRemoveItem(id, type);
      return;
    }
    setAddedItems(prev => prev.map(item => 
      item.id === id && item.type === type
        ? { ...item, quantity: qty }
        : item
    ));
  };

  // Clear quotation
  const handleClearQuote = () => {
    setAddedItems([]);
    setActiveLogisticsFee(null);
  };

  // Log Lagos Surcharge
  const handleAddLogisticsFee = (zoneName: string, fee: number) => {
    // If there's an existing fee, let's strip it first
    if (activeLogisticsFee) {
      handleRemoveItem(`logistics-${activeLogisticsFee.zone.replace(/\s+/g, '-')}`, 'part');
    }

    const uniqueId = `logistics-${zoneName.replace(/\s+/g, '-')}`;
    
    // Set state
    setActiveLogisticsFee({ zone: zoneName, fee });

    // Inject as a QuoteItem
    handleAddToQuote({
      type: 'part',
      id: uniqueId,
      name: zoneName,
      quantity: 1,
      rateOrPrice: fee
    });
    
    // Jump straight to quote review
    setActiveTab('quote');
  };

  const cartCount = addedItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className={`min-h-screen transition-colors duration-200 selection:bg-amber-500 selection:text-black flex flex-col justify-between font-sans ${
      isLightMode ? 'bg-[#F4F6FA] text-[#0C122C]' : 'bg-[#080D22] text-neutral-100'
    }`}>
      
      {/* Dynamic Navigation Header */}
      <Header 
        onNavChange={handleNavChange} 
        activeTab={activeTab} 
        cartCount={cartCount} 
        isLightMode={isLightMode}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Container with state-based rendering */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-0"
            >
              {/* Animated industrial Hero */}
              <HeroSection onLearnMore={setActiveTab} isLightMode={isLightMode} />

              {/* Partners Section */}
              <PartnersSection isLightMode={isLightMode} />

              {/* Operations Stats Overview Section */}
              <section className={`py-16 max-w-7xl mx-auto px-6 transition-colors duration-200 ${
                isLightMode ? 'bg-[#F4F6FA] text-[#0C122C]' : 'bg-[#080D22] text-white'
              }`}>
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <span className="text-[10px] text-amber-500 font-extrabold uppercase tracking-[0.2em] block mb-2">CLASQO ENTERPRISE CAPABILITIES</span>
                  <h2 className={`text-3xl font-black uppercase tracking-tight ${isLightMode ? 'text-[#0C122C]' : 'text-white'}`}>Lagos-Staged Engineering Logistics</h2>
                  <p className={`text-xs sm:text-sm mt-2 ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
                    Acting as a localized buyer, design logistics carrier, and heavy charter contractor.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Fact 1 */}
                  <div className={`border rounded-none flex flex-col justify-between overflow-hidden group transition-all ${
                    isLightMode ? 'bg-[#FFFFFF] border-neutral-200 shadow-sm hover:shadow-md' : 'bg-[#060a1a] border-[#182747] hover:border-amber-500/30'
                  }`}>
                    <div className="h-44 w-full overflow-hidden relative border-b border-neutral-200 dark:border-neutral-800">
                      <img 
                        src="/src/assets/images/sany_boom_pump_1780289808297.png" 
                        alt="Sany Leasing & Sales Fleet" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-2 left-2 bg-neutral-950/90 text-amber-500 text-[8.5px] font-mono font-bold px-2 py-0.5 uppercase tracking-wider">
                        Sany Global Alliance
                      </span>
                    </div>
                    <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="w-9 h-9 bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold rounded-none">
                          <Compass className="w-4 h-4" />
                        </div>
                        <h3 className={`font-black text-sm uppercase tracking-wider ${isLightMode ? 'text-[#0C122C]' : 'text-neutral-100'}`}>
                          Leasing & Sales Fleet
                        </h3>
                        <p className={`text-xs leading-relaxed ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
                          Authorized logistics matching for Sany Global concrete trailer pumps, twin-wall boom assemblies, mobile telescopic cranes, and crawler piling drills staged locally.
                        </p>
                      </div>
                      <button 
                        onClick={() => setActiveTab('equipment')}
                        className="text-amber-500 font-bold hover:text-amber-600 text-xs text-left inline-flex items-center gap-1 mt-6 uppercase tracking-wider cursor-pointer"
                      >
                        Browse Sany Fleets &rarr;
                      </button>
                    </div>
                  </div>

                  {/* Fact 2 */}
                  <div className={`border rounded-none flex flex-col justify-between overflow-hidden group transition-all ${
                    isLightMode ? 'bg-[#FFFFFF] border-neutral-200 shadow-sm hover:shadow-md' : 'bg-[#060a1a] border-[#182747] hover:border-amber-500/30'
                  }`}>
                    <div className="h-44 w-full overflow-hidden relative border-b border-neutral-200 dark:border-neutral-800">
                      <img 
                        src="/src/assets/images/concrete_pump_pipes_1780284052994.png" 
                        alt="Twin-Wall Pipelines" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-2 left-2 bg-neutral-950/90 text-amber-500 text-[8.5px] font-mono font-bold px-2 py-0.5 uppercase tracking-wider">
                        Istanbul Sourced (DN125)
                      </span>
                    </div>
                    <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="w-9 h-9 bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold rounded-none">
                          <Cpu className="w-4 h-4" />
                        </div>
                        <h3 className={`font-black text-sm uppercase tracking-wider ${isLightMode ? 'text-[#0C122C]' : 'text-neutral-100'}`}>
                          Twin-Wall Pipelines
                        </h3>
                        <p className={`text-xs leading-relaxed ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
                          International procurement and custom validation of European & Turkish manufactured concrete pump straight pipes, high-chromium 90deg wear elbows, and quick-snap toggle clamps.
                        </p>
                      </div>
                      <button 
                        onClick={() => setActiveTab('parts')}
                        className="text-amber-500 font-bold hover:text-amber-600 text-xs text-left inline-flex items-center gap-1 mt-6 uppercase tracking-wider cursor-pointer"
                      >
                        Explore Turkish Hardware &rarr;
                      </button>
                    </div>
                  </div>

                  {/* Fact 3 */}
                  <div className={`border rounded-none flex flex-col justify-between overflow-hidden group transition-all ${
                    isLightMode ? 'bg-[#FFFFFF] border-neutral-200 shadow-sm hover:shadow-md' : 'bg-[#060a1a] border-[#182747] hover:border-amber-500/30'
                  }`}>
                    <div className="h-44 w-full overflow-hidden relative border-b border-neutral-200 dark:border-neutral-800">
                      <img 
                        src="/src/assets/images/sany_crane_stc500_1793851361061.jpg" 
                        alt="Hauling & Permitting Logistics" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-2 left-2 bg-neutral-950/90 text-amber-500 text-[8.5px] font-mono font-bold px-2 py-0.5 uppercase tracking-wider">
                        LASTMA Express Transit
                      </span>
                    </div>
                    <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="w-9 h-9 bg-amber-500/10 text-amber-500 flex items-center justify-center rounded-none">
                          <Truck className="w-4 h-4" />
                        </div>
                        <h3 className={`font-black text-sm uppercase tracking-wider ${isLightMode ? 'text-[#0C122C]' : 'text-neutral-100'}`}>
                          Hauling & Permitting
                        </h3>
                        <p className={`text-xs leading-relaxed ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
                          In-house transport coordination using modular heavy-duty multi-axle lowbeds. We secure LASTMA expressway certificates and low overhead permissions across Lagos bridges.
                        </p>
                      </div>
                      <button 
                        onClick={() => setActiveTab('quote')}
                        className="text-amber-500 font-bold hover:text-amber-600 text-xs text-left inline-flex items-center gap-1 mt-6 uppercase tracking-wider cursor-pointer"
                      >
                        Access Dispatch Planner &rarr;
                      </button>
                    </div>
                  </div>
                </div>

                {/* FEATURED UPDATE: Partners Investment & Profit in USD Spotlight */}
                <div className={`mt-16 border rounded-none p-6 sm:p-10 relative overflow-hidden transition-all ${
                  isLightMode 
                    ? 'bg-gradient-to-br from-amber-500/10 via-white to-white border-amber-500/30 shadow-md' 
                    : 'bg-gradient-to-br from-amber-500/15 via-[#0A122C] to-[#060a1a] border-amber-500/40 shadow-2xl'
                }`}>
                  <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Left Column: Image with Overlays */}
                    <div className="lg:col-span-5 relative group">
                      <div className="relative h-64 sm:h-72 w-full overflow-hidden border border-amber-500/30">
                        <img 
                          src="/src/assets/images/investor_portal_hero_1793855237606.jpg" 
                          alt="Partners Investment & Fleet Co-Ownership"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        
                        <div className="absolute top-3 left-3 bg-amber-500 text-neutral-950 text-[10px] font-black uppercase px-2.5 py-1 tracking-wider shadow">
                          FEATURED PROGRAM UPDATE
                        </div>
                        
                        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                          <div>
                            <div className="text-[9px] text-amber-400 font-mono uppercase tracking-wider font-bold">MINIMUM CAPITAL ENTRY</div>
                            <div className="text-xl font-black text-white">$3,000 USD <span className="text-xs text-neutral-300 font-normal">and above</span></div>
                          </div>
                          <div className="text-right">
                            <div className="text-[9px] text-emerald-400 font-mono uppercase tracking-wider font-bold">ANNUALIZED APY</div>
                            <div className="text-xl font-black text-emerald-400">18.5% – 32.4%</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Copy, Tier Preview, and Actions */}
                    <div className="lg:col-span-7 space-y-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1">
                          USD CAPITAL PRESERVATION & YIELD
                        </span>
                        <span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5">
                          • 70/30 NET PROFIT DIVIDENDS
                        </span>
                      </div>

                      <h3 className={`text-2xl sm:text-3xl font-black uppercase tracking-tight ${isLightMode ? 'text-[#0C122C]' : 'text-white'}`}>
                        Machinery Asset Co-Ownership & USD Profit Share
                      </h3>

                      <p className={`text-xs sm:text-sm leading-relaxed ${isLightMode ? 'text-neutral-600' : 'text-neutral-300'}`}>
                        Co-own heavy concrete boom pumps, rotary drilling rigs, and all-terrain cranes staged at our Lekki Depot. Clasqo manages 100% of project dispatching, certified operators, port clearance, and OEM maintenance while transferring net rental profits monthly directly into your corporate USD domiciliary accounts.
                      </p>

                      {/* Mini 4-Package Tier Preview Chips */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono">
                        <div className={`p-2.5 border text-center ${isLightMode ? 'bg-white border-neutral-200' : 'bg-[#0B1535] border-[#1E2E5B]'}`}>
                          <div className="text-[9px] text-neutral-400 uppercase">Starter Unit</div>
                          <div className="font-bold text-xs text-amber-500">$3,000 USD</div>
                          <div className="text-[9px] text-emerald-400">18.5% ROI</div>
                        </div>
                        <div className={`p-2.5 border text-center ${isLightMode ? 'bg-white border-neutral-200' : 'bg-[#0B1535] border-[#1E2E5B]'}`}>
                          <div className="text-[9px] text-neutral-400 uppercase">Growth Fleet</div>
                          <div className="font-bold text-xs text-amber-500">$10,000 USD</div>
                          <div className="text-[9px] text-emerald-400">22.0% ROI</div>
                        </div>
                        <div className={`p-2.5 border text-center ${isLightMode ? 'bg-white border-neutral-200' : 'bg-[#0B1535] border-[#1E2E5B]'}`}>
                          <div className="text-[9px] text-neutral-400 uppercase">Executive Rig</div>
                          <div className="font-bold text-xs text-amber-500">$25,000 USD</div>
                          <div className="text-[9px] text-emerald-400">26.5% ROI</div>
                        </div>
                        <div className={`p-2.5 border text-center border-amber-500/40 ${isLightMode ? 'bg-amber-50' : 'bg-[#15234A]'}`}>
                          <div className="text-[9px] text-amber-400 uppercase font-black">Syndicate</div>
                          <div className="font-bold text-xs text-amber-500">$50K - $250K+</div>
                          <div className="text-[9px] text-emerald-400 font-bold">32.4% ROI</div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 pt-3">
                        <motion.button
                          whileHover={{ scale: 1.04, y: -2 }}
                          whileTap={{ scale: 0.96 }}
                          transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                          onClick={() => setActiveTab('invest')}
                          className="bg-amber-500 text-neutral-950 hover:bg-neutral-900 hover:text-white px-6 py-3 font-black text-xs uppercase tracking-widest inline-flex items-center gap-2 transition-all cursor-pointer shadow-lg whitespace-nowrap"
                        >
                          <TrendingUp className="w-4 h-4 animate-bounce" />
                          <span>Launch USD ROI Calculator & Packages</span>
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.03, y: -2 }}
                          whileTap={{ scale: 0.96 }}
                          transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                          onClick={() => setActiveTab('investor-admin')}
                          className={`border px-5 py-3 font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                            isLightMode 
                              ? 'border-neutral-300 text-neutral-800 hover:bg-neutral-100' 
                              : 'border-[#1E2E5B] text-neutral-300 hover:bg-[#121c3b] hover:text-white'
                          }`}
                        >
                          <Briefcase className="w-4 h-4 text-amber-500" />
                          <span>Fleet Operations Console</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FIELD LEADERSHIP & TECHNICAL MASTERY: ENGINEER EMMANUEL */}
                <div className={`mt-16 border rounded-none p-6 sm:p-10 relative overflow-hidden transition-all ${
                  isLightMode 
                    ? 'bg-white border-neutral-300 shadow-md' 
                    : 'bg-[#060a1a] border-[#182747]'
                }`}>
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-6 border-neutral-800/30">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-amber-500 font-black uppercase tracking-[0.25em] font-mono flex items-center gap-1.5">
                          <HardHat className="w-3.5 h-3.5 text-amber-500 animate-pulse" /> CLASQO FIELD LEADERSHIP
                        </span>
                        <span className="bg-amber-500/10 text-amber-500 border border-amber-500/30 text-[9px] font-mono font-bold px-2 py-0.5 uppercase">
                          ★ MOST DECORATED MULTI-SKILLED ENGINEER
                        </span>
                      </div>
                      <h3 className={`text-2xl sm:text-3xl font-black uppercase tracking-tight ${isLightMode ? 'text-[#0C122C]' : 'text-white'}`}>
                        Engineer Emmanuel — Master of Field Operations
                      </h3>
                      <p className={`text-xs sm:text-sm max-w-2xl leading-relaxed ${isLightMode ? 'text-neutral-600' : 'text-neutral-300'}`}>
                        Proactive, battle-tested engineering leadership across Lagos. From under-chassis hydraulic diagnostics and 250-bar line pump clamping to continuous high-rise pour supervision and heavy Sany equipment operations.
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        onClick={() => handleNavChange('workforce')}
                        className="bg-amber-500 text-neutral-950 hover:bg-neutral-900 hover:text-white px-5 py-2.5 font-black text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap shadow"
                      >
                        <Users className="w-4 h-4" />
                        <span>Deploy Engineer Emmanuel & Crew</span>
                      </button>
                    </div>
                  </div>

                  {/* 4 Multi-Discipline Action Photos Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                    {/* Role 1: Maintenance */}
                    <div className="group relative border border-neutral-800 overflow-hidden bg-black">
                      <div className="h-56 w-full overflow-hidden relative">
                        <img 
                          src="/assets/aistudio/64457cae-5db4-421a-ba68-8aca45b5f3c6_3dd805e9.jpeg"
                          alt="Engineer Emmanuel - Machinery Maintenance & Hydraulic Repair"
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />
                        <span className="absolute top-2 left-2 bg-amber-500 text-neutral-950 text-[8.5px] font-mono font-black px-2 py-0.5 uppercase">
                          Hydraulic Overhauls
                        </span>
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <h4 className="text-xs font-black uppercase leading-tight">Machinery Maintenance & Repair</h4>
                          <p className="text-[10px] text-neutral-300 font-mono mt-0.5">Under-chassis hydraulic lines & Rexroth pumps</p>
                        </div>
                      </div>
                    </div>

                    {/* Role 2: Line Pump Setup */}
                    <div className="group relative border border-neutral-800 overflow-hidden bg-black">
                      <div className="h-56 w-full overflow-hidden relative">
                        <img 
                          src="/assets/aistudio/0a5287a2-c619-408b-ace7-27e0183869ac_074b7d7f.jpeg"
                          alt="Engineer Emmanuel - Line Pump Field Setup & DN125 Pipeline Specialist"
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />
                        <span className="absolute top-2 left-2 bg-amber-500 text-neutral-950 text-[8.5px] font-mono font-black px-2 py-0.5 uppercase">
                          250-Bar DN125 Setup
                        </span>
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <h4 className="text-xs font-black uppercase leading-tight">Line Pump Setup & Clamping</h4>
                          <p className="text-[10px] text-neutral-300 font-mono mt-0.5">Forged snap clamps & twin-wall pipe layouts</p>
                        </div>
                      </div>
                    </div>

                    {/* Role 3: Pour Supervision */}
                    <div className="group relative border border-neutral-800 overflow-hidden bg-black">
                      <div className="h-56 w-full overflow-hidden relative">
                        <img 
                          src="/assets/aistudio/eb5b8f2c-b798-446c-ada3-c5c16e884e98_7a261d0a.jpeg"
                          alt="Engineer Emmanuel - Project Supervisor & Pour Coordinator"
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />
                        <span className="absolute top-2 left-2 bg-amber-500 text-neutral-950 text-[8.5px] font-mono font-black px-2 py-0.5 uppercase">
                          Pour Supervision
                        </span>
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <h4 className="text-xs font-black uppercase leading-tight">Project Coordination & QC</h4>
                          <p className="text-[10px] text-neutral-300 font-mono mt-0.5">On-deck boom directing & slump flow control</p>
                        </div>
                      </div>
                    </div>

                    {/* Role 4: Heavy Machine Operator */}
                    <div className="group relative border border-neutral-800 overflow-hidden bg-black">
                      <div className="h-56 w-full overflow-hidden relative">
                        <img 
                          src="/assets/aistudio/Gemini_Generated_Image_36480v36480v3648_0d1e6c9d.jpeg"
                          alt="Engineer Emmanuel - Certified Heavy Sany Machine Operator"
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />
                        <span className="absolute top-2 left-2 bg-amber-500 text-neutral-950 text-[8.5px] font-mono font-black px-2 py-0.5 uppercase">
                          Sany Masterclass Pilot
                        </span>
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <h4 className="text-xs font-black uppercase leading-tight">Certified Heavy Operator</h4>
                          <p className="text-[10px] text-neutral-300 font-mono mt-0.5">Sany SY215C & SY365H heavy excavator pilot</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Client Trust rotating testimonials section */}
                <div className="mt-16">
                  <ClientTrust isLightMode={isLightMode} />
                </div>

                {/* Local Staging map simulation */}
                <div className={`mt-12 border p-6 sm:p-10 flex flex-col lg:flex-row justify-between items-center gap-8 ${
                  isLightMode ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#060a1a] border-[#182747]'
                }`}>
                  <div className="space-y-4 max-w-xl">
                    <span className="text-[10px] text-amber-500 font-black uppercase tracking-[0.25em] block leading-none font-mono">STAGED AT LEKKI OUTLET</span>
                    <h3 className={`text-2xl font-black uppercase ${isLightMode ? 'text-[#0C122C]' : 'text-white'}`}>Primary Lagos Operations Yard</h3>
                    <p className={`text-xs leading-relaxed ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
                      Lekki Scheme, 1 Dr Babatunde Ayeni St, Eti-Osa. This central depot hosts our active truck concrete pumps and crawler piling systems. Call our Lagos office directly to schedule physical machinery tests, aggregates pressure validation, or custom steel flare dimensions inspection.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-2">
                      <a 
                        href="tel:+2348020879468" 
                        className="bg-amber-500 text-neutral-950 px-6 py-3 rounded-none text-xs font-black shadow inline-flex items-center gap-1.5 transition-all hover:bg-neutral-900 hover:text-white active:scale-95 uppercase tracking-widest cursor-pointer whitespace-nowrap scroll-smooth"
                      >
                        <PhoneCall className="w-4 h-4" /> Call +234 802 087 9468
                      </a>
                    </div>
                  </div>

                  <div className={`w-full lg:w-96 h-48 rounded-none relative overflow-hidden border flex items-center justify-center ${
                    isLightMode ? 'bg-neutral-50/50 border-neutral-200' : 'bg-[#0B122C] border-[#182747]'
                  }`}>
                    {/* Simulated vector radar look for map */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.05),transparent_60%)]" />
                    
                    <div className="relative text-center space-y-2 z-10 p-4">
                      <MapPin className="w-8 h-8 text-amber-500 animate-bounce mx-auto" />
                      <div>
                        <h4 className={`text-xs font-bold uppercase font-sans tracking-widest ${isLightMode ? 'text-[#0C122C]' : 'text-white'}`}>Eti-Osa Hub HQ</h4>
                        <p className={`text-[10px] mt-1 font-mono ${isLightMode ? 'text-neutral-550' : 'text-neutral-500'}`}>1 Dr Babatunde Ayeni St, Lekki</p>
                        <span className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-[9px] font-bold px-2 py-0.5 mt-2 rounded-none inline-block uppercase tracking-wider">
                          • Yard Live & Dispatching
                        </span>
                      </div>
                    </div>
              </div>
            </div>
        </section>

        {/* Dynamic Client FAQ Section */}
        <FAQSection isLightMode={isLightMode} />
      </motion.div>
          )}

          {activeTab === 'equipment' && (
            <motion.div
              key="equipment"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <EquipmentCatalog 
                onAddToQuote={handleAddToQuote} 
                addedItems={addedItems}
                initialCategory={equipmentCategory}
                isLightMode={isLightMode}
              />
            </motion.div>
          )}

          {activeTab === 'construction' && (
            <motion.div
              key="construction"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CastingAndPilingServices 
                onAddToQuote={handleAddToQuote} 
                addedItems={addedItems} 
                isLightMode={isLightMode}
              />
            </motion.div>
          )}

          {activeTab === 'parts' && (
            <motion.div
              key="parts"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <PartsSourcing 
                onAddToQuote={handleAddToQuote} 
                addedItems={addedItems} 
                isLightMode={isLightMode}
              />
            </motion.div>
          )}

          {activeTab === 'consultant' && (
            <motion.div
              key="consultant"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AIConsultant 
                onAddToQuote={handleAddToQuote} 
                addedItems={addedItems} 
                isLightMode={isLightMode}
              />
            </motion.div>
          )}

          {activeTab === 'workforce' && (
            <motion.div
              key="workforce"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <WorkforceManagement 
                onAddToQuote={handleAddToQuote} 
                isLightMode={isLightMode}
              />
            </motion.div>
          )}

          {activeTab === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ProjectGallery 
                onNavigateToQuote={() => setActiveTab('quote')}
                isLightMode={isLightMode}
              />
            </motion.div>
          )}

          {activeTab === 'invest' && (
            <motion.div
              key="invest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <PartnersInvestmentPortal 
                onNavigateToQuote={() => setActiveTab('quote')}
                isLightMode={isLightMode}
              />
            </motion.div>
          )}

          {activeTab === 'investor-admin' && (
            <motion.div
              key="investor-admin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <InvestorAdminPortal 
                isLightMode={isLightMode}
              />
            </motion.div>
          )}

          {activeTab === 'quote' && (
            <motion.div
              key="quote"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-0"
            >
              {/* Dynamic Quote and checkout */}
              <QuoteBuilder 
                addedItems={addedItems} 
                onRemoveItem={handleRemoveItem} 
                onClearQuote={handleClearQuote}
                onUpdateQuantity={handleUpdateQuantity}
                isLightMode={isLightMode}
              />

              {/* Hauling zone logistics calculator under checkout to complete the loop */}
              <div className={`py-16 border-t transition-colors duration-200 ${
                isLightMode ? 'bg-[#FFFFFF] border-neutral-200' : 'bg-[#060a1a] border-[#182747]'
              }`}>
                <div className="max-w-7xl mx-auto px-6">
                  <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="text-[10px] text-amber-500 font-black uppercase tracking-[0.25em] leading-none mb-3 font-mono">LAGOS CORRIDOR ROAD TRANSIT</span>
                    <h3 className={`text-2xl font-black uppercase tracking-tight ${
                      isLightMode ? 'text-[#0C122C]' : 'text-white'
                    }`}>Logistics Surcharge Schedulers</h3>
                    <p className={`text-xs mt-2 ${
                      isLightMode ? 'text-neutral-600' : 'text-neutral-450'
                    }`}>Configure site distances from Lekki yard and log transport cost dynamically.</p>
                  </div>
                  <div className="max-w-3xl mx-auto">
                    <LogisticsCalculator 
                      onAddLogisticsFee={handleAddLogisticsFee} 
                      activeLogisticsFee={activeLogisticsFee} 
                      isLightMode={isLightMode}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Branded Footer */}
      <Footer onNavChange={setActiveTab} isLightMode={isLightMode} />

      {/* Clasqo Live Support AI Assistant & Direct WhatsApp Hub */}
      <ClasqoLiveSupport onNavigateTab={handleNavChange} isLightMode={isLightMode} />
    </div>
  );
}
