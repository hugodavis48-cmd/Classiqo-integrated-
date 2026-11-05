/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Truck, MapPin, Ruler, Check, AlertTriangle, Activity } from 'lucide-react';

interface LogisticsCalculatorProps {
  onAddLogisticsFee: (zoneName: string, fee: number) => void;
  activeLogisticsFee: { zone: string; fee: number } | null;
  isLightMode?: boolean;
}

const LAGOS_ZONES = [
  { id: 'zone-lekki', name: 'Lekki Scheme / Victoria Island / Ikoyi', distanceKm: 12, flatbedFeeNgn: 120000, lowbedFeeNgn: 250000, constraints: 'Low overhead cables on Babatunde Ayeni corridor.' },
  { id: 'zone-ikeja', name: 'Ikeja / Gbagada / Maryland (Mainland)', distanceKm: 34, flatbedFeeNgn: 280000, lowbedFeeNgn: 450000, constraints: 'Third Mainland bridge height limits strictly monitored.' },
  { id: 'zone-apapa', name: 'Apapa Ports / Amuwo-Odofin / Lagos West', distanceKm: 42, flatbedFeeNgn: 350000, lowbedFeeNgn: 580000, constraints: 'Port lane congestion; transport escorts recommended.' },
  { id: 'zone-epe', name: 'Ibeju-Lekki / Epe / Lekki Free Zone', distanceKm: 55, flatbedFeeNgn: 220000, lowbedFeeNgn: 380000, constraints: 'Rapid industrial expansion lane; open clearance.' },
  { id: 'zone-shagamu', name: 'Mowe / Ibafo / Ogun boundary corridor', distanceKm: 78, flatbedFeeNgn: 450000, lowbedFeeNgn: 750000, constraints: 'Long distance interstate transit, toll clearances.' }
];

export default function LogisticsCalculator({ onAddLogisticsFee, activeLogisticsFee, isLightMode = false }: LogisticsCalculatorProps) {
  const [selectedZoneId, setSelectedZoneId] = useState('zone-lekki');
  const [useLowbed, setUseLowbed] = useState(false);

  const selectedZone = LAGOS_ZONES.find(z => z.id === selectedZoneId) || LAGOS_ZONES[0];
  const calculatedFee = useLowbed ? selectedZone.lowbedFeeNgn : selectedZone.flatbedFeeNgn;

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleApplyLogistics = () => {
    const label = `${selectedZone.name} Delivery (${useLowbed ? 'Low-bed Trailer' : 'Flatbed Trailer'})`;
    onAddLogisticsFee(label, calculatedFee);
  };

  return (
    <div className={`rounded-none border p-6 space-y-6 transition-colors duration-200 ${
      isLightMode 
        ? 'bg-white border-neutral-200 shadow-sm' 
        : 'bg-[#060a1a] border-[#182747]'
    }`}>
      <div className={`border-b pb-4 ${isLightMode ? 'border-neutral-200' : 'border-neutral-900'}`}>
        <h3 className={`text-xs font-black uppercase tracking-widest flex items-center gap-2 ${
          isLightMode ? 'text-[#0C122C]' : 'text-white'
        }`}>
          <Truck className="w-4 h-4 text-amber-500 shrink-0" />
          Clasqo Lagos Logistics Dispatch Planner
        </h3>
        <p className={`text-[11px] mt-1 ${isLightMode ? 'text-neutral-500' : 'text-neutral-450'}`}>
          Calculate hauling logistics from our office yard (1 Babatunde Ayeni St, Lekki) to your metropolitan site.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left selectors */}
        <div className="space-y-4">
          <div>
            <label className={`text-[9px] font-black block mb-1.5 uppercase tracking-widest ${
              isLightMode ? 'text-neutral-700' : 'text-neutral-450'
            }`}>
              Destination Site Zone
            </label>
            <select
              value={selectedZoneId}
              onChange={(e) => setSelectedZoneId(e.target.value)}
              className={`w-full border rounded-none text-xs p-2.5 font-bold focus:outline-none uppercase tracking-wide cursor-pointer ${
                isLightMode 
                  ? 'bg-neutral-50 border-neutral-300 text-neutral-900 focus:border-amber-500' 
                  : 'bg-[#0B122C] border-[#182747] text-neutral-100 focus:border-amber-500'
              }`}
            >
              {LAGOS_ZONES.map(z => (
                <option key={z.id} value={z.id} className={isLightMode ? 'bg-white text-neutral-900' : 'bg-[#080D22] text-neutral-100'}>
                  {z.name} (~{z.distanceKm} Km)
                </option>
              ))}
            </select>
          </div>

          <div>
            <span className={`text-[9px] font-black block mb-2 uppercase tracking-widest ${
              isLightMode ? 'text-neutral-700' : 'text-neutral-450'
            }`}>
              Heavy Machinery Transport Type
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setUseLowbed(false)}
                className={`p-4 rounded-none border text-left transition-all cursor-pointer ${
                  !useLowbed 
                    ? 'border-amber-500 bg-amber-500/10 text-amber-500 font-extrabold shadow-xs' 
                    : isLightMode 
                      ? 'border-neutral-200 bg-neutral-50 text-neutral-600 hover:border-neutral-300' 
                      : 'border-[#182747] bg-[#0B122C]/50 text-neutral-400 hover:border-neutral-700'
                }`}
              >
                <span className="text-xs uppercase tracking-wider block">Flatbed Trailer</span>
                <span className="text-[9px] text-neutral-500 block font-mono mt-1">Excavators & Pipes</span>
              </button>
              <button
                type="button"
                onClick={() => setUseLowbed(true)}
                className={`p-4 rounded-none border text-left transition-all cursor-pointer ${
                  useLowbed 
                    ? 'border-amber-500 bg-amber-500/10 text-amber-500 font-extrabold shadow-xs' 
                    : isLightMode 
                      ? 'border-neutral-200 bg-neutral-50 text-neutral-600 hover:border-neutral-300' 
                      : 'border-[#182747] bg-[#0B122C]/50 text-neutral-400 hover:border-neutral-700'
                }`}
              >
                <span className="text-xs uppercase tracking-wider block">Modular Lowbed</span>
                <span className="text-[9px] text-neutral-500 block font-mono mt-1">Rotary Rigs & 50t Cranes</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right route math outputs */}
        <div className={`rounded-none p-5 border flex flex-col justify-between space-y-4 ${
          isLightMode ? 'bg-neutral-50 border-neutral-200' : 'bg-[#0B122C] border-[#182747]'
        }`}>
          <div className="space-y-3">
            <span className="text-[9px] text-amber-500 font-black uppercase tracking-[0.2em] block leading-none">
              Logistics Route Insights
            </span>
            
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between items-center pb-1 border-b border-neutral-200 dark:border-neutral-800/40">
                <span className="text-neutral-500">Staging Hub:</span>
                <span className={`font-bold ${isLightMode ? 'text-neutral-800' : 'text-neutral-300'}`}>Lekki Eti-Osa Yard</span>
              </div>
              <div className="flex justify-between items-center pb-1 border-b border-neutral-200 dark:border-neutral-800/40">
                <span className="text-neutral-500">Approx. Distance:</span>
                <span className="font-bold text-amber-500">{selectedZone.distanceKm} Kilometers</span>
              </div>
              <div className="flex justify-between items-center pb-1 border-b border-neutral-200 dark:border-neutral-800/40">
                <span className="text-neutral-500">Transit Permits:</span>
                <span className={isLightMode ? 'text-neutral-800' : 'text-neutral-300'}>
                  {useLowbed ? 'LASTMA Escort Required' : 'Standard haul permits'}
                </span>
              </div>
            </div>

            {/* Constraints and alerts */}
            <div className={`p-3 text-[10px] rounded-none border flex gap-2.5 items-start mt-2 ${
              isLightMode 
                ? 'bg-amber-50/60 border-amber-200 text-neutral-700' 
                : 'bg-[#060a1a] border-neutral-800 text-neutral-400'
            }`}>
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span className="leading-relaxed">
                <strong className={`font-black uppercase tracking-wider mr-1 ${isLightMode ? 'text-neutral-900' : 'text-neutral-300'}`}>
                  Transit constraints:
                </strong> 
                {selectedZone.constraints}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-2.5">
            <div>
              <span className="text-[8px] text-neutral-500 uppercase font-black tracking-widest block leading-none">
                Logistics Surcharge
              </span>
              <span className={`text-base font-mono font-black mt-1 block ${
                isLightMode ? 'text-[#0C122C]' : 'text-white'
              }`}>
                {formatNaira(calculatedFee)}
              </span>
            </div>

            {activeLogisticsFee && activeLogisticsFee.fee === calculatedFee && activeLogisticsFee.zone.includes(selectedZone.name) ? (
              <button 
                disabled 
                className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 text-[9px] font-black uppercase tracking-widest py-2.5 px-4 rounded-none flex items-center gap-1.5 cursor-default"
              >
                <Check className="w-3.5 h-3.5" /> Surcharge Logged
              </button>
            ) : (
              <button
                type="button"
                onClick={handleApplyLogistics}
                className="bg-amber-500 hover:bg-amber-400 text-neutral-950 text-[9px] font-black uppercase tracking-widest py-2.5 px-4 rounded-none transition-all active:scale-95 cursor-pointer leading-none shadow-sm"
              >
                Log Surcharge
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
