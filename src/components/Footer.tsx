/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Hammer, MapPin, Mail, Phone, Calendar, Globe } from 'lucide-react';
import ClasqoLogo from './ClasqoLogo';

interface FooterProps {
  onNavChange: (tab: string) => void;
  isLightMode?: boolean;
}

export default function Footer({ onNavChange, isLightMode = false }: FooterProps) {
  return (
    <footer className={`border-t text-xs py-12 transition-colors duration-250 ${
      isLightMode 
        ? 'bg-neutral-100 border-neutral-200 text-neutral-600' 
        : 'bg-[#060a1a] border-[#101933] text-neutral-450'
    }`}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Col 1: Branding and Core details */}
        <div className="space-y-4">
          <ClasqoLogo mode="horizontal" iconSize={32} isLightMode={isLightMode} />
          <p className="text-neutral-500 leading-relaxed text-[11px]">
            Clasqo Integrated Nigeria Limited is an engineering solutions and heavy machinery supply chain provider operating out of Lagos, Nigeria. We specialize in Sany equipment leasing and Turkish technical hardware.
          </p>
          <div className="text-[10px] text-neutral-600 font-mono mt-1">
            <span>FIRS TIN: 22441998-0001</span> <br />
            <span>LASTMA Permit Code: #LKG-HAUL-900</span>
          </div>
        </div>

        {/* Col 2: Services / Actions */}
        <div className="space-y-3">
          <h4 className="text-neutral-200 font-black text-[10px] uppercase tracking-[0.2em]">Heavy Fleet & Services</h4>
          <ul className="space-y-2">
            <li>
              <button onClick={() => onNavChange('equipment')} className="hover:text-amber-500 font-bold uppercase tracking-wide text-neutral-450 text-left transition-colors cursor-pointer text-[11px]">
                Sany 56m Boom Fleet
              </button>
            </li>
            <li>
              <button onClick={() => onNavChange('construction')} className="hover:text-amber-500 font-bold uppercase tracking-wide text-neutral-450 text-left transition-colors cursor-pointer text-[11px]">
                Casting & Piling Jobs
              </button>
            </li>
            <li>
              <button onClick={() => onNavChange('workforce')} className="hover:text-amber-500 font-bold uppercase tracking-wide text-amber-500 text-left transition-colors cursor-pointer text-[11px]">
                Skilled Labor & Operators
              </button>
            </li>
            <li>
              <button onClick={() => onNavChange('invest')} className="hover:text-amber-500 font-bold uppercase tracking-wide text-amber-500 text-left transition-colors cursor-pointer text-[11px]">
                USD Partner Investment & ROI
              </button>
            </li>
            <li>
              <button onClick={() => onNavChange('investor-admin')} className="hover:text-amber-500 font-bold uppercase tracking-wide text-neutral-450 text-left transition-colors cursor-pointer text-[11px]">
                Co-Ownership Admin Portal
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Parts & Istanbul connections */}
        <div className="space-y-3">
          <h4 className="text-neutral-200 font-black text-[10px] uppercase tracking-[0.2em]">European Parts & Gear</h4>
          <ul className="space-y-2">
            <li>
              <button onClick={() => onNavChange('parts')} className="hover:text-amber-500 font-bold uppercase tracking-wide text-neutral-450 text-left transition-colors cursor-pointer text-[11px]">
                3m Casting Pipes & Hoses
              </button>
            </li>
            <li>
              <button onClick={() => onNavChange('parts')} className="hover:text-amber-500 font-bold uppercase tracking-wide text-neutral-450 text-left transition-colors cursor-pointer text-[11px]">
                Snap Clamps & 90/45° Elbows
              </button>
            </li>
            <li>
              <button onClick={() => onNavChange('parts')} className="hover:text-amber-500 font-bold uppercase tracking-wide text-neutral-450 text-left transition-colors cursor-pointer text-[11px]">
                Concrete Quick Accelerators
              </button>
            </li>
            <li>
              <button onClick={() => onNavChange('parts')} className="hover:text-amber-500 font-bold uppercase tracking-wide text-neutral-450 text-left transition-colors cursor-pointer text-[11px]">
                Certified PPE & Safety Kits
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Operations Address */}
        <div className="space-y-4">
          <h4 className="text-amber-550 font-black text-[10px] uppercase tracking-[0.2em]">LAGOS YARD COORDINATES</h4>
          <div className="space-y-2.5 text-neutral-450 leading-snug">
            <p className="flex items-start gap-2 text-[11px]">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>
                Lekki Scheme, 1 Dr Babatunde Ayeni St, Eti-Osa, Lagos, Nigeria
              </span>
            </p>
            <p className="flex items-center gap-2 font-bold text-neutral-300">
              <Phone className="w-4 h-4 text-amber-500 shrink-0" />
              <a href="tel:+2348020879468" className="hover:text-amber-500">+234 802 087 9468</a>
            </p>
            <p className="flex items-center gap-2 text-[11px]">
              <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Mon - Sat: 08:00 AM - 06:00 PM</span>
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-neutral-600 text-[10px] font-mono uppercase tracking-wider">
        <div>
          © {new Date().getFullYear()} Clasqo Integrated Nigeria Limited.
        </div>
        <div className="flex gap-4">
          <span>Sany Sourcing Cooperation</span>
          <span>•</span>
          <span>Turkish Heavy Engineering Sourced</span>
        </div>
      </div>
    </footer>
  );
}
