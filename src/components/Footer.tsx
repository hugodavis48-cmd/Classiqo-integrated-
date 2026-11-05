/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MapPin, Mail, Phone, Calendar, ArrowUp, MessageSquare, ShieldCheck, ExternalLink, Cpu } from 'lucide-react';
import ClasqoLogo from './ClasqoLogo';

interface FooterProps {
  onNavChange: (tab: string, category?: string) => void;
  isLightMode?: boolean;
}

export default function Footer({ onNavChange, isLightMode = false }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`border-t text-xs py-12 transition-colors duration-200 select-none ${
      isLightMode 
        ? 'bg-neutral-100 border-neutral-200 text-neutral-600' 
        : 'bg-[#060a1a] border-[#101933] text-neutral-400'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
        
        {/* Col 1: Branding and Core details */}
        <div className="space-y-4">
          <div className="cursor-pointer" onClick={() => onNavChange('home')}>
            <ClasqoLogo mode="horizontal" iconSize={32} isLightMode={isLightMode} />
          </div>
          <p className="text-neutral-500 leading-relaxed text-[11px]">
            Clasqo Integrated Nigeria Limited is an engineering solutions and heavy machinery supply chain provider operating out of Lagos, Nigeria. Specializing in Sany equipment leasing, turnkey foundation piling, and European technical hardware.
          </p>
          <div className="text-[10px] text-neutral-500 font-mono space-y-1 pt-1">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>CAC RC: 1849204 • FIRS TIN: 22441998-0001</span>
            </div>
            <div>
              <span>LASTMA Haulage Permit: #LKG-HAUL-900</span>
            </div>
          </div>
        </div>

        {/* Col 2: Services / Actions */}
        <div className="space-y-3">
          <h4 className="text-amber-500 font-black text-[10px] uppercase tracking-[0.2em] font-mono">Heavy Fleet & Services</h4>
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => onNavChange('equipment', 'concrete')} 
                className="hover:text-amber-500 font-bold uppercase tracking-wide text-left transition-colors cursor-pointer text-[11px] block"
              >
                Sany 56m Boom Fleet
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavChange('equipment', 'drilling')} 
                className="hover:text-amber-500 font-bold uppercase tracking-wide text-left transition-colors cursor-pointer text-[11px] block"
              >
                Rotary Piling Rigs (SR285)
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavChange('construction')} 
                className="hover:text-amber-500 font-bold uppercase tracking-wide text-left transition-colors cursor-pointer text-[11px] block"
              >
                Casting & Piling Contracts
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavChange('workforce')} 
                className="hover:text-amber-500 font-bold uppercase tracking-wide text-left transition-colors cursor-pointer text-[11px] block flex items-center gap-1.5"
              >
                <span>Skilled Labor & Operators</span>
                <span className="text-[8px] bg-amber-500/10 text-amber-500 px-1 border border-amber-500/20 font-mono">ENG. EMMANUEL</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavChange('invest')} 
                className="hover:text-amber-500 font-bold uppercase tracking-wide text-amber-500 text-left transition-colors cursor-pointer text-[11px] block flex items-center gap-1.5"
              >
                <span>USD Partner Investment</span>
                <span className="text-[8px] bg-emerald-500/10 text-emerald-400 px-1 border border-emerald-500/30 font-mono">18-32% ROI</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavChange('investor-admin')} 
                className="hover:text-amber-500 font-bold uppercase tracking-wide text-left transition-colors cursor-pointer text-[11px] block"
              >
                Co-Ownership Admin Portal
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavChange('gallery')} 
                className="hover:text-amber-500 font-bold uppercase tracking-wide text-left transition-colors cursor-pointer text-[11px] block"
              >
                Lagos Project Gallery
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavChange('consultant')} 
                className="hover:text-amber-500 font-bold uppercase tracking-wide text-left transition-colors cursor-pointer text-[11px] block flex items-center gap-1.5"
              >
                <Cpu className="w-3.5 h-3.5 text-amber-500" />
                <span>AI Technical Consultant Desk</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Parts & Istanbul connections */}
        <div className="space-y-3">
          <h4 className="text-amber-500 font-black text-[10px] uppercase tracking-[0.2em] font-mono">European Parts & Gear</h4>
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => onNavChange('parts', 'pipes')} 
                className="hover:text-amber-500 font-bold uppercase tracking-wide text-left transition-colors cursor-pointer text-[11px] block"
              >
                3m Twin-Wall Pipes & Hoses
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavChange('parts', 'couplings')} 
                className="hover:text-amber-500 font-bold uppercase tracking-wide text-left transition-colors cursor-pointer text-[11px] block"
              >
                Snap Clamps & 90/45° Elbows
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavChange('parts', 'chemicals')} 
                className="hover:text-amber-500 font-bold uppercase tracking-wide text-left transition-colors cursor-pointer text-[11px] block"
              >
                Concrete Accelerators & Admixtures
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavChange('parts', 'ppe')} 
                className="hover:text-amber-500 font-bold uppercase tracking-wide text-left transition-colors cursor-pointer text-[11px] block"
              >
                Certified Heavy PPE & Harnesses
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavChange('quote')} 
                className="hover:text-amber-500 font-bold uppercase tracking-wide text-left transition-colors cursor-pointer text-[11px] block flex items-center gap-1.5 pt-1 text-amber-500"
              >
                <span>Instant Proforma Quote Builder</span>
                <span className="text-[8px] bg-amber-500/10 text-amber-500 px-1 border border-amber-500/20 font-mono">PRINT SLA</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Operations Address & Verified Contact Links */}
        <div className="space-y-4">
          <h4 className="text-amber-500 font-black text-[10px] uppercase tracking-[0.2em] font-mono">LAGOS YARD & DISPATCH</h4>
          <div className="space-y-2.5 text-neutral-400 leading-snug">
            <p className="flex items-start gap-2 text-[11px]">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>
                Lekki Scheme, 1 Dr Babatunde Ayeni St, Eti-Osa, Lagos, Nigeria
              </span>
            </p>
            <p className="flex items-center gap-2 font-bold">
              <Phone className="w-4 h-4 text-amber-500 shrink-0" />
              <a 
                href="tel:+2348020879468" 
                className="hover:text-amber-500 text-neutral-300 font-mono transition-colors"
                title="Call Clasqo Lagos Dispatch Yard"
              >
                +234 802 087 9468
              </a>
            </p>
            <p className="flex items-center gap-2 font-bold">
              <MessageSquare className="w-4 h-4 text-emerald-500 shrink-0" />
              <a 
                href="https://wa.me/2348063342947?text=Hello%20Clasqo,%20I%20am%20reaching%20out%20from%20the%20website%20regarding%20equipment%20leasing%20and%20engineering%20support." 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 text-emerald-500 font-mono transition-colors flex items-center gap-1"
                title="WhatsApp Lagos Dispatch Desk"
              >
                <span>+234 806 334 2947</span>
                <span className="text-[9px] font-sans font-bold bg-emerald-500/10 border border-emerald-500/30 px-1 py-0.2">LIVE</span>
              </a>
            </p>
            <p className="flex items-center gap-2 text-[11px]">
              <Mail className="w-4 h-4 text-amber-500 shrink-0" />
              <a 
                href="mailto:info@clasqo.com.ng" 
                className="hover:text-amber-500 text-neutral-300 font-mono transition-colors"
                title="Email Clasqo Technical Services"
              >
                info@clasqo.com.ng
              </a>
            </p>
            <p className="flex items-center gap-2 text-[11px]">
              <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Mon - Sat: 08:00 AM - 06:00 PM</span>
            </p>
          </div>
        </div>
      </div>

      {/* Sub-footer bottom bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 pt-6 border-t border-neutral-800/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-neutral-500 text-[10px] font-mono uppercase tracking-wider">
        <div className="flex flex-wrap items-center gap-2 text-center sm:text-left">
          <span>© {new Date().getFullYear()} Clasqo Integrated Nigeria Limited.</span>
          <span className="hidden sm:inline">•</span>
          <span>All Rights Reserved.</span>
        </div>

        <div className="flex items-center gap-4 flex-wrap justify-center">
          <span>Sany Sourcing Cooperation</span>
          <span>•</span>
          <span>Turkish Engineering Hardware</span>
          <span>•</span>
          <button
            onClick={scrollToTop}
            className="text-amber-500 hover:text-amber-400 flex items-center gap-1 font-bold cursor-pointer transition-colors"
            title="Scroll to top of page"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

