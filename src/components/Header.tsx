/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  MapPin, 
  Hammer, 
  FileText, 
  Cpu, 
  Compass, 
  ChevronDown, 
  Menu, 
  X, 
  Settings, 
  HelpCircle,
  Truck,
  Layers,
  Award,
  Sun,
  Moon,
  Users,
  Image as ImageIcon,
  DollarSign,
  TrendingUp,
  Briefcase
} from 'lucide-react';
import ClasqoLogo from './ClasqoLogo';

interface HeaderProps {
  onNavChange: (tab: string, category?: string) => void;
  activeTab: string;
  cartCount: number;
  isLightMode: boolean;
  onToggleTheme: () => void;
}

export default function Header({ onNavChange, activeTab, cartCount, isLightMode, onToggleTheme }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Desktop Dropdown Open States
  const [fleetDropdownOpen, setFleetDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  // Mobile Dropdown Accordion States
  const [mobileFleetOpen, setMobileFleetOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const fleetRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  // Click outside to close desktop dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (fleetRef.current && !fleetRef.current.contains(event.target as Node)) {
        setFleetDropdownOpen(false);
      }
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFleetSelect = (category: string) => {
    onNavChange('equipment', category);
    setFleetDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleServicesSelect = (tab: string) => {
    onNavChange(tab);
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const triggerDirectNav = (tab: string) => {
    onNavChange(tab);
    setFleetDropdownOpen(false);
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-40 transition-colors duration-200 ${isLightMode ? 'bg-[#FFFFFF]/95 border-b border-neutral-200 text-[#0C122C]' : 'bg-[#0B122C]/95 border-b border-[#182747] text-neutral-100'} backdrop-blur-md`}>
      
      {/* Top Bar with Quick Contact - Fully Responsive Wrapping */}
      <div className={`transition-colors duration-200 text-[10px] md:text-xs py-2 px-4 sm:px-6 border-b select-none ${isLightMode ? 'bg-neutral-100/90 text-neutral-600 border-neutral-200' : 'bg-[#060a1a] text-neutral-400 border-[#101933]'}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 text-center md:text-left">
            <span className={`flex items-center gap-1.5 transition-colors tracking-tight ${isLightMode ? 'hover:text-[#0C122C] text-neutral-500' : 'hover:text-white text-neutral-350'}`}>
              <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="hidden xs:inline">Lagos Station:</span> 1 Dr Babatunde Ayeni St, Lekki Scheme, Eti-Osa
            </span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
            <a 
              href="tel:+2348020879468" 
              className="flex items-center gap-1.5 text-amber-500 font-bold hover:text-amber-600 transition-colors py-0.5"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>+234 802 087 9468</span>
            </a>
            <span className={`hidden sm:inline-block px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider border transition-colors ${isLightMode ? 'bg-white text-neutral-700 border-neutral-300' : 'bg-[#0B122C] text-neutral-350 border-[#1E2E5B]'}`}>
              Lagos Dispatch Yard Active
            </span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center relative">
        
        {/* Branding/Logo */}
        <div className="cursor-pointer shrink-0 z-50" onClick={() => triggerDirectNav('home')}>
          <ClasqoLogo mode="horizontal" iconSize={32} isLightMode={isLightMode} />
        </div>

        {/* Desktop & Tablet Navigation Menu Bar (lg breakpoint for extra padding room) */}
        <nav className="hidden lg:flex items-center gap-2 xl:gap-4 z-40">
          
          {/* Company Overview (Direct Link) */}
          <button
            onClick={() => triggerDirectNav('home')}
            className={`px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all border rounded-none cursor-pointer ${
              activeTab === 'home'
                ? 'bg-amber-500 text-neutral-950 border-amber-500 font-black shadow-md'
                : isLightMode
                  ? 'text-neutral-700 border-transparent hover:text-black hover:border-neutral-300 hover:bg-neutral-100'
                  : 'text-neutral-300 border-transparent hover:text-white hover:border-[#1E2E5B] hover:bg-neutral-900/40'
            }`}
          >
            Overview
          </button>
          
          {/* Dropdown 1: Heavy Machinery Fleet */}
          <div ref={fleetRef} className="relative">
            <button
              onClick={() => {
                setFleetDropdownOpen(!fleetDropdownOpen);
                setServicesDropdownOpen(false);
              }}
              className={`px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all border rounded-none cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'equipment'
                  ? 'bg-amber-500 text-neutral-950 border-amber-500 font-black shadow-md'
                  : isLightMode
                    ? 'text-neutral-700 border-transparent hover:text-black hover:border-neutral-300 hover:bg-neutral-100'
                    : 'text-neutral-300 border-transparent hover:text-white hover:border-[#1E2E5B] hover:bg-neutral-900/40'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Machinery Fleet</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${fleetDropdownOpen ? 'transform rotate-180 text-neutral-950' : 'text-neutral-500'}`} />
            </button>

            {fleetDropdownOpen && (
              <div className={`absolute left-0 mt-2 w-64 border p-2 shadow-2xl z-50 font-mono text-[11px] animate-fade-in animate-duration-150 transition-colors ${isLightMode ? 'bg-white border-neutral-200 text-neutral-800' : 'bg-[#060a1a] border-[#182747] text-neutral-100'}`}>
                <div className={`px-3 py-1.5 text-[9px] text-amber-500 tracking-widest font-black uppercase border-b mb-1.5 select-none ${isLightMode ? 'border-neutral-200' : 'border-[#101933]'}`}>
                  Select Charter Strata
                </div>
                <button
                  onClick={() => handleFleetSelect('all')}
                  className={`w-full text-left px-3 py-2 hover:bg-amber-500 hover:text-neutral-950 font-bold transition-colors block border border-transparent rounded-none cursor-pointer ${isLightMode ? 'text-neutral-700 hover:text-neutral-950' : 'text-neutral-300'}`}
                >
                  All Heavy Fleet
                </button>
                <div className={`h-[1px] my-1 ${isLightMode ? 'bg-neutral-200' : 'bg-[#101933]'}`} />
                <button
                  onClick={() => handleFleetSelect('concrete')}
                  className={`w-full text-left px-3 py-2 hover:bg-amber-500 hover:text-neutral-950 transition-colors block border border-transparent cursor-pointer ${isLightMode ? 'text-neutral-600 hover:text-neutral-950' : 'text-neutral-300'}`}
                >
                  Concrete Pumping Fleet
                </button>
                <button
                  onClick={() => handleFleetSelect('drilling')}
                  className={`w-full text-left px-3 py-2 hover:bg-amber-500 hover:text-neutral-950 transition-colors block border border-transparent cursor-pointer ${isLightMode ? 'text-neutral-600 hover:text-neutral-950' : 'text-neutral-300'}`}
                >
                  Rotary Piling Rigs
                </button>
                <button
                  onClick={() => handleFleetSelect('excavator')}
                  className={`w-full text-left px-3 py-2 hover:bg-amber-500 hover:text-neutral-950 transition-colors block border border-transparent cursor-pointer ${isLightMode ? 'text-neutral-600 hover:text-neutral-950' : 'text-neutral-300'}`}
                >
                  Heavy Excavators
                </button>
                <button
                  onClick={() => handleFleetSelect('crane')}
                  className={`w-full text-left px-3 py-2 hover:bg-amber-500 hover:text-neutral-950 transition-colors block border border-transparent cursor-pointer ${isLightMode ? 'text-neutral-600 hover:text-neutral-950' : 'text-neutral-300'}`}
                >
                  Mobile Cranes
                </button>
                <button
                  onClick={() => handleFleetSelect('road')}
                  className={`w-full text-left px-3 py-2 hover:bg-amber-500 hover:text-neutral-950 transition-colors block border border-transparent cursor-pointer ${isLightMode ? 'text-neutral-600 hover:text-neutral-950' : 'text-neutral-300'}`}
                >
                  Compaction & Road
                </button>
                <button
                  onClick={() => handleFleetSelect('port')}
                  className={`w-full text-left px-3 py-2 hover:bg-amber-500 hover:text-neutral-950 transition-colors block border border-transparent cursor-pointer ${isLightMode ? 'text-neutral-600 hover:text-neutral-950' : 'text-neutral-300'}`}
                >
                  Port Logistics
                </button>
              </div>
            )}
          </div>

          {/* Dropdown 2: Engineering Services */}
          <div ref={servicesRef} className="relative">
            <button
              onClick={() => {
                setServicesDropdownOpen(!servicesDropdownOpen);
                setFleetDropdownOpen(false);
              }}
              className={`px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all border rounded-none cursor-pointer flex items-center gap-1.5 ${
                ['construction', 'parts', 'consultant'].includes(activeTab)
                  ? 'bg-amber-500 text-neutral-950 border-amber-500 font-black shadow-md'
                  : isLightMode
                    ? 'text-neutral-700 border-transparent hover:text-black hover:border-neutral-300 hover:bg-neutral-100'
                    : 'text-neutral-300 border-transparent hover:text-white hover:border-[#1E2E5B] hover:bg-neutral-900/40'
              }`}
            >
              <Hammer className="w-3.5 h-3.5" />
              <span>Engineering Services</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'transform rotate-180 text-neutral-950' : 'text-neutral-500'}`} />
            </button>

            {servicesDropdownOpen && (
              <div className={`absolute left-0 mt-2 w-64 border p-2 shadow-2xl z-50 font-mono text-[11px] animate-fade-in animate-duration-150 transition-colors ${isLightMode ? 'bg-white border-neutral-200 text-neutral-800' : 'bg-[#060a1a] border-[#182747] text-neutral-100'}`}>
                <div className={`px-3 py-1.5 text-[9px] text-amber-500 tracking-widest font-black uppercase border-b mb-1.5 select-none ${isLightMode ? 'border-neutral-200' : 'border-[#101933]'}`}>
                  Core Dispatch Activities
                </div>
                <button
                  onClick={() => handleServicesSelect('construction')}
                  className={`w-full text-left px-3 py-2 hover:bg-amber-500 hover:text-neutral-950 font-bold transition-colors block border border-transparent cursor-pointer flex justify-between items-center ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}
                >
                  <span>Casting & Piling Jobs</span>
                  <span className="text-[8px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1 font-black">CONTRACT</span>
                </button>
                <button
                  onClick={() => handleServicesSelect('parts')}
                  className={`w-full text-left px-3 py-2 hover:bg-amber-500 hover:text-neutral-950 transition-colors block border border-transparent cursor-pointer flex justify-between items-center ${isLightMode ? 'text-neutral-600' : 'text-neutral-300'}`}
                >
                  <span>Turkish Parts Supply</span>
                  <span className="text-[8px] bg-sky-500/10 text-sky-400 border border-sky-450/30 px-1">FLEX PIPE</span>
                </button>
                <div className={`h-[1px] my-1 ${isLightMode ? 'bg-neutral-200' : 'bg-[#101933]'}`} />
                  <button
                    onClick={() => handleServicesSelect('workforce')}
                    className={`w-full text-left px-3 py-2 hover:bg-amber-500 hover:text-neutral-950 font-bold transition-colors block border border-transparent cursor-pointer flex justify-between items-center ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}
                  >
                    <span>Skilled Crew & Labor</span>
                    <span className="text-[8px] bg-amber-500/10 text-amber-500 border border-amber-500/20 px-1 font-black">CREW</span>
                  </button>
                  <button
                    onClick={() => handleServicesSelect('gallery')}
                    className={`w-full text-left px-3 py-2 hover:bg-amber-500 hover:text-neutral-950 font-bold transition-colors block border border-transparent cursor-pointer flex justify-between items-center ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}
                  >
                    <span>Project Gallery</span>
                    <span className="text-[8px] bg-sky-500/10 text-sky-400 border border-sky-400/20 px-1 font-black">LAGOS</span>
                  </button>
                  <button
                    onClick={() => handleServicesSelect('invest')}
                    className={`w-full text-left px-3 py-2 hover:bg-amber-500 hover:text-neutral-950 font-bold transition-colors block border border-transparent cursor-pointer flex justify-between items-center ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}
                  >
                    <span className="text-amber-500 font-extrabold flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      USD Investment & ROI
                    </span>
                    <span className="text-[8px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-1 font-black">18-32% ROI</span>
                  </button>
                  <button
                    onClick={() => handleServicesSelect('investor-admin')}
                    className={`w-full text-left px-3 py-2 hover:bg-amber-500 hover:text-neutral-950 font-bold transition-colors block border border-transparent cursor-pointer flex justify-between items-center ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}
                  >
                    <span>Machinery Admin Portal</span>
                    <span className="text-[8px] bg-neutral-500/10 text-neutral-400 border border-neutral-500/20 px-1 font-mono">PORTAL</span>
                  </button>
                  <div className={`h-[1px] my-1 ${isLightMode ? 'bg-neutral-200' : 'bg-[#101933]'}`} />
                  <button
                    onClick={() => handleServicesSelect('consultant')}
                    className={`w-full text-left px-3 py-2 hover:bg-amber-500 hover:text-neutral-950 font-extrabold transition-colors block border border-transparent cursor-pointer flex justify-between items-center ${isLightMode ? 'bg-neutral-100/80 text-neutral-700' : 'bg-[#101833]/50 text-neutral-350'}`}
                  >
                    <span className="flex items-center gap-1 text-amber-500">
                      <Cpu className="w-3.5 h-3.5 animate-pulse text-amber-500 shrink-0" />
                      AI Specialist Desk
                    </span>
                    <span className="text-[7.5px] bg-[#1E2E5B] text-amber-400 border border-amber-500/30 px-1 font-black uppercase">LIVE AI</span>
                  </button>
                </div>
              )}
            </div>

            {/* Direct Link: Skilled Workforce */}
            <button
              onClick={() => triggerDirectNav('workforce')}
              className={`px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all border rounded-none cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'workforce'
                  ? 'bg-amber-500 text-neutral-950 border-amber-500 font-black shadow-md'
                  : isLightMode
                    ? 'text-neutral-700 border-transparent hover:text-black hover:border-neutral-300 hover:bg-neutral-100'
                    : 'text-neutral-300 border-transparent hover:text-white hover:border-[#1E2E5B] hover:bg-neutral-900/40'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Workforce</span>
            </button>

            {/* Direct Link: Project Gallery */}
            <button
              onClick={() => triggerDirectNav('gallery')}
              className={`px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all border rounded-none cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'gallery'
                  ? 'bg-amber-500 text-neutral-950 border-amber-500 font-black shadow-md'
                  : isLightMode
                    ? 'text-neutral-700 border-transparent hover:text-black hover:border-neutral-300 hover:bg-neutral-100'
                    : 'text-neutral-300 border-transparent hover:text-white hover:border-[#1E2E5B] hover:bg-neutral-900/40'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Gallery</span>
            </button>

            {/* Direct Link: Partner Investment & ROI (USD) */}
            <button
              onClick={() => triggerDirectNav('invest')}
              className={`px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all border rounded-none cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'invest'
                  ? 'bg-amber-500 text-neutral-950 border-amber-500 font-black shadow-md'
                  : isLightMode
                    ? 'text-neutral-700 border-transparent hover:text-amber-600 hover:border-neutral-300 hover:bg-neutral-100'
                    : 'text-amber-400 border-transparent hover:text-white hover:border-[#1E2E5B] hover:bg-neutral-900/40'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
              <span>Invest & ROI ($)</span>
            </button>

            {/* Interactive Dynamic Quote Scope Button */}
            <button
              onClick={() => triggerDirectNav('quote')}
              className={`px-4 py-2 rounded-none text-xs font-bold uppercase tracking-wider transition-all border flex items-center gap-2 relative cursor-pointer ${
                activeTab === 'quote'
                  ? isLightMode 
                    ? 'bg-[#0C122C] text-white border-[#0C122C] font-black'
                    : 'bg-white text-neutral-950 border-white font-black'
                  : isLightMode
                    ? 'bg-neutral-100 text-[#0C122C] border-neutral-300 hover:bg-neutral-200 hover:border-neutral-400'
                    : 'bg-[#121c3b] text-neutral-300 border-[#182747] hover:text-white hover:border-[#1E2E5B]'
              }`}
            >
              <FileText className="w-3.5 h-3.5 shrink-0" />
              <span>Quotation Scope</span>
              {cartCount > 0 ? (
                <span className={`text-[10px] font-black w-5 h-5 flex items-center justify-center shadow ml-1 border ${isLightMode ? 'bg-amber-500 text-neutral-950 border-white/20' : 'bg-amber-500 text-neutral-950 border-[#060a1a]'}`}>
                  {cartCount}
                </span>
              ) : (
                <span className={`w-1.5 h-1.5 rounded-full ml-1 ${isLightMode ? 'bg-neutral-400' : 'bg-neutral-600'}`} />
              )}
            </button>

          {/* Desktop Tactile Theme Switcher Slide Control */}
          <button
            onClick={onToggleTheme}
            className={`p-2 border transition-all cursor-pointer flex items-center justify-center ${
              isLightMode
                ? 'bg-neutral-100 border-neutral-300 text-neutral-700 hover:text-black hover:bg-neutral-200'
                : 'bg-[#121c3b]/70 border-[#182747] text-amber-500 hover:text-white hover:bg-[#1E2E5B]'
            }`}
            title={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            {isLightMode ? <Moon className="w-4 h-4 shrink-0" /> : <Sun className="w-4 h-4 shrink-0 animate-pulse text-amber-500" />}
          </button>

        </nav>

        {/* Mobile / Notebook Hamburger Controller */}
        <div className="flex lg:hidden items-center gap-2 z-50">
          
          {/* Quick Access Mobile Theme Switcher */}
          <button
            onClick={onToggleTheme}
            className={`p-2 border transition-colors cursor-pointer flex items-center justify-center ${
              isLightMode
                ? 'bg-neutral-100 border-neutral-300 text-[#0C122C] hover:bg-neutral-200'
                : 'bg-[#121c3b] border-[#182747] text-amber-500 hover:bg-[#1E2E5B]'
            }`}
            aria-label="Toggle Brightness Mode"
          >
            {isLightMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-500" />}
          </button>

          {/* Quick Access Cart Counter Badge for Mobile screens */}
          <button
            onClick={() => triggerDirectNav('quote')}
            className={`p-2 border transition-colors relative cursor-pointer ${
              isLightMode ? 'bg-neutral-100 border-neutral-300 text-[#0C122C]' : 'p-2 bg-[#121c3b] border border-[#182747] text-white'
            }`}
            title="Open Quote Builder"
          >
            <FileText className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-neutral-950 text-[9px] font-black w-4.5 h-4.5 flex items-center justify-center border border-[#060a1a]">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 border focus:outline-none transition-colors cursor-pointer ${
              isLightMode ? 'bg-neutral-150 border-neutral-300 text-neutral-800' : 'bg-neutral-950 border border-[#182747] text-neutral-300'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-amber-500" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu (Collapsible overlay layout with scrolling for short screens) */}
      {mobileMenuOpen && (
        <div className={`lg:hidden w-full absolute top-full left-0 right-0 z-40 p-4 shadow-2xl space-y-3 font-sans animate-fade-in border-t max-h-[calc(100vh-80px)] overflow-y-auto transition-colors ${
          isLightMode ? 'bg-[#FFFFFF] border-neutral-200 text-[#0C122C]' : 'bg-[#080d22] border-[#182747] text-neutral-100'
        }`}>
          
          {/* Company Overview (Direct Link) */}
          <button
            onClick={() => triggerDirectNav('home')}
            className={`w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-widest border transition-all rounded-none block cursor-pointer ${
              activeTab === 'home'
                ? 'bg-amber-500 text-neutral-950 border-amber-500 font-extrabold'
                : isLightMode
                  ? 'bg-neutral-100 text-neutral-700 border-neutral-300 hover:bg-neutral-200'
                  : 'bg-[#060a1a]/80 text-neutral-300 border-[#101933] hover:text-white'
            }`}
          >
            Overview & Lagos Yard
          </button>

          {/* Collapsible Mobile Section: Heavy Machinery Fleet */}
          <div className={`border p-2 space-y-1 transition-colors ${
            isLightMode ? 'border-neutral-200 bg-neutral-100/90' : 'border-[#101933] bg-[#060a1a]/50'
          }`}>
            <button
              onClick={() => setMobileFleetOpen(!mobileFleetOpen)}
              className={`w-full flex items-center justify-between text-left px-3 py-2 text-xs font-bold uppercase tracking-wider cursor-pointer ${
                isLightMode ? 'text-neutral-800' : 'text-neutral-300'
              }`}
            >
              <span className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-500 shrink-0" />
                Heavy Machinery Fleet
              </span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform text-neutral-500 ${mobileFleetOpen ? 'transform rotate-180 text-amber-500' : ''}`} />
            </button>

            {mobileFleetOpen && (
              <div className={`pl-6 pr-2 py-1 space-y-1.5 border-t mt-1 font-mono text-[10.5px] ${
                isLightMode ? 'border-neutral-200' : 'border-[#101933]'
              }`}>
                <button
                  onClick={() => handleFleetSelect('all')}
                  className={`w-full text-left py-1.5 block border-b cursor-pointer ${
                    isLightMode ? 'text-neutral-600 hover:text-neutral-950 border-neutral-200' : 'text-neutral-400 hover:text-white border-neutral-900'
                  }`}
                >
                  • All Equipment Fleet
                </button>
                <button
                  onClick={() => handleFleetSelect('concrete')}
                  className={`w-full text-left py-1.5 block border-b cursor-pointer ${
                    isLightMode ? 'text-neutral-600 hover:text-neutral-950 border-neutral-200' : 'text-neutral-400 hover:text-white border-neutral-900'
                  }`}
                >
                  • Concrete Pumping Fleet
                </button>
                <button
                  onClick={() => handleFleetSelect('drilling')}
                  className={`w-full text-left py-1.5 block border-b cursor-pointer ${
                    isLightMode ? 'text-neutral-600 hover:text-neutral-950 border-neutral-200' : 'text-neutral-400 hover:text-white border-neutral-900'
                  }`}
                >
                  • Sany Rotary Drilling rigs
                </button>
                <button
                  onClick={() => handleFleetSelect('excavator')}
                  className={`w-full text-left py-1.5 block border-b cursor-pointer ${
                    isLightMode ? 'text-neutral-600 hover:text-neutral-950 border-neutral-200' : 'text-neutral-400 hover:text-white border-neutral-900'
                  }`}
                >
                  • Heavy Duty Excavators
                </button>
                <button
                  onClick={() => handleFleetSelect('crane')}
                  className={`w-full text-left py-1.5 block border-b cursor-pointer ${
                    isLightMode ? 'text-neutral-600 hover:text-neutral-950 border-neutral-200' : 'text-neutral-400 hover:text-white border-neutral-900'
                  }`}
                >
                  • Mobile Hydraulic Cranes
                </button>
                <button
                  onClick={() => handleFleetSelect('road')}
                  className={`w-full text-left py-1.5 block border-b cursor-pointer ${
                    isLightMode ? 'text-neutral-600 hover:text-neutral-950 border-neutral-200' : 'text-neutral-400 hover:text-white border-neutral-900'
                  }`}
                >
                  • Compactors & Asphalt Road Equipment
                </button>
                <button
                  onClick={() => handleFleetSelect('port')}
                  className={`w-full text-left py-1.5 block cursor-pointer ${
                    isLightMode ? 'text-neutral-600 hover:text-neutral-950' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  • Port Logistics & Stacking
                </button>
              </div>
            )}
          </div>

          {/* Collapsible Mobile Section: Engineering Services */}
          <div className={`border p-2 space-y-1 transition-colors ${
            isLightMode ? 'border-neutral-200 bg-neutral-100/90' : 'border-[#101933] bg-[#060a1a]/50'
          }`}>
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className={`w-full flex items-center justify-between text-left px-3 py-2 text-xs font-bold uppercase tracking-wider cursor-pointer ${
                isLightMode ? 'text-neutral-800' : 'text-neutral-300'
              }`}
            >
              <span className="flex items-center gap-2">
                <Hammer className="w-4 h-4 text-amber-500 shrink-0" />
                Engineering Services
              </span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform text-neutral-500 ${mobileServicesOpen ? 'transform rotate-180 text-amber-500' : ''}`} />
            </button>

            {mobileServicesOpen && (
              <div className={`pl-6 pr-2 py-1 space-y-1.5 border-t mt-1 font-mono text-[10.5px] ${
                isLightMode ? 'border-neutral-200' : 'border-[#101933]'
              }`}>
                <button
                  onClick={() => handleServicesSelect('construction')}
                  className={`w-full text-left py-1.5 flex justify-between items-center border-b cursor-pointer ${
                    isLightMode ? 'text-neutral-600 hover:text-neutral-950 border-neutral-200' : 'text-neutral-400 hover:text-white border-neutral-900'
                  }`}
                >
                  <span>• Casting & Piling Contracts</span>
                  <span className="text-[7.5px] bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-1 font-black">CONTRACT</span>
                </button>
                <button
                  onClick={() => handleServicesSelect('parts')}
                  className={`w-full text-left py-1.5 flex justify-between items-center border-b cursor-pointer ${
                    isLightMode ? 'text-neutral-600 hover:text-neutral-950 border-neutral-200' : 'text-neutral-400 hover:text-white border-neutral-900'
                  }`}
                >
                  <span>• Pipeline Parts & Clamps</span>
                  <span className="text-[7.5px] bg-sky-500/10 text-sky-600 border border-sky-500/30 px-1">STAGING</span>
                </button>
                <button
                  onClick={() => handleServicesSelect('consultant')}
                  className="w-full text-left py-2 text-amber-500 hover:text-neutral-950 flex justify-between items-center font-extrabold cursor-pointer"
                >
                  <span className="flex items-center gap-1">
                    <Cpu className="w-4 h-4 text-amber-550 shrink-0 animate-pulse" />
                    • AI Specialist Desk
                  </span>
                  <span className="text-[7.5px] bg-amber-500 text-neutral-950 px-1 font-black">AI LIVE</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Direct Link: Skilled Workforce */}
          <button
            onClick={() => triggerDirectNav('workforce')}
            className={`w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-widest border transition-all rounded-none flex items-center justify-between cursor-pointer ${
              activeTab === 'workforce'
                ? 'bg-amber-500 text-neutral-950 border-amber-500 font-extrabold'
                : isLightMode
                  ? 'bg-neutral-100 text-neutral-700 border-neutral-300 hover:bg-neutral-200'
                  : 'bg-[#060a1a]/80 text-neutral-300 border-[#101933] hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-500 shrink-0" />
              Skilled Crew & Labor
            </span>
            <span className="text-[9px] bg-amber-500/10 text-amber-500 border border-amber-500/30 px-1 font-mono">
              VETTED
            </span>
          </button>

          {/* Mobile Direct Link: Project Gallery */}
          <button
            onClick={() => triggerDirectNav('gallery')}
            className={`w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-widest border transition-all rounded-none flex items-center justify-between cursor-pointer ${
              activeTab === 'gallery'
                ? 'bg-amber-500 text-neutral-950 border-amber-500 font-extrabold'
                : isLightMode
                  ? 'bg-neutral-100 text-neutral-700 border-neutral-300 hover:bg-neutral-200'
                  : 'bg-[#060a1a]/80 text-neutral-300 border-[#101933] hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-sky-400 shrink-0" />
              Project Gallery
            </span>
            <span className="text-[9px] bg-sky-500/10 text-sky-400 border border-sky-500/30 px-1 font-mono">
              LAGOS
            </span>
          </button>

          {/* Mobile Direct Link: Partner Investment & ROI (USD) */}
          <button
            onClick={() => triggerDirectNav('invest')}
            className={`w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-widest border transition-all rounded-none flex items-center justify-between cursor-pointer ${
              activeTab === 'invest'
                ? 'bg-amber-500 text-neutral-950 border-amber-500 font-extrabold'
                : isLightMode
                  ? 'bg-amber-50 text-neutral-800 border-amber-300 hover:bg-amber-100'
                  : 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
            }`}
          >
            <span className="flex items-center gap-2 font-black">
              <TrendingUp className="w-4 h-4 text-amber-500 shrink-0" />
              USD Investment & ROI
            </span>
            <span className="text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-1 font-mono font-bold">
              18-32% ROI
            </span>
          </button>

          {/* Mobile Direct Link: Fleet Admin & Co-Ownership Console */}
          <button
            onClick={() => triggerDirectNav('investor-admin')}
            className={`w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-widest border transition-all rounded-none flex items-center justify-between cursor-pointer ${
              activeTab === 'investor-admin'
                ? 'bg-amber-500 text-neutral-950 border-amber-500 font-extrabold'
                : isLightMode
                  ? 'bg-neutral-100 text-neutral-700 border-neutral-300 hover:bg-neutral-200'
                  : 'bg-[#060a1a]/80 text-neutral-300 border-[#101933] hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
              Fleet Admin & Co-Ownership
            </span>
            <span className="text-[9px] bg-neutral-500/10 text-neutral-400 border border-neutral-500/30 px-1 font-mono">
              PORTAL
            </span>
          </button>

          {/* Mobile Quote Builder Button */}
          <button
            onClick={() => triggerDirectNav('quote')}
            className={`w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-widest border transition-all rounded-none flex items-center justify-between cursor-pointer ${
              activeTab === 'quote'
                ? isLightMode
                  ? 'bg-[#0C122C] text-white border-[#0C122C] font-extrabold'
                  : 'bg-white text-neutral-950 border-white font-extrabold'
                : isLightMode
                  ? 'bg-neutral-100 text-neutral-700 border-neutral-300 hover:bg-neutral-200'
                  : 'bg-[#121c3b] text-neutral-300 border-[#182747] hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2">
              <FileText className="w-4 h-4 shrink-0" />
              Active Quote Scope
            </span>
            {cartCount > 0 ? (
              <span className="bg-amber-500 text-neutral-950 text-[10px] font-black w-5 h-5 flex items-center justify-center shadow">
                {cartCount}
              </span>
            ) : (
              <span className="text-[9px] text-neutral-500 uppercase tracking-widest font-mono">Empty</span>
            )}
          </button>

          {/* Quick Call Direct Line Button inside drawer */}
          <a
            href="tel:+2348020879468"
            className="w-full bg-[#1e2e5b]/40 border border-amber-500/30 font-bold block text-center text-xs py-3 rounded-none uppercase tracking-widest text-amber-400 inline-flex items-center justify-center gap-2.5 hover:bg-amber-500 hover:text-neutral-950 transition-colors"
          >
            <Phone className="w-4 h-4 shrink-0" />
            Lagos Dispatch Yard Desk
          </a>

        </div>
      )}

    </header>
  );
}
