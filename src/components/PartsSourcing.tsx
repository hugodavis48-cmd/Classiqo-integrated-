/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PARTS_DATA } from '../data/partsData';
import { TechnicalPart, QuoteItem } from '../types';
import { Globe, FileSpreadsheet, Ruler, Layers, ShieldCheck, Check, Plus, AlertCircle, Search } from 'lucide-react';

interface PartsSourcingProps {
  onAddToQuote: (item: QuoteItem) => void;
  addedItems: QuoteItem[];
  isLightMode?: boolean;
}

export default function PartsSourcing({ onAddToQuote, addedItems, isLightMode = false }: PartsSourcingProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'pipes' | 'hoses' | 'couplings' | 'elbows' | 'hardware' | 'chemicals' | 'ppe'
  >('all');
  
  // High pressure custom pipeline estimator state
  const [targetLengthMeters, setTargetLengthMeters] = useState(60);
  const [usePremiumTwined, setUsePremiumTwined] = useState(true);

  // Filter Parts catalog
  const filteredParts = PARTS_DATA.filter(part => {
    const matchesSearch = part.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          part.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (part.compatibility && part.compatibility.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || part.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const isAlreadyAdded = (id: string) => {
    return addedItems.some(item => item.id === id && item.type === 'part');
  };

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Pipeline Calculation Math
  const pipesCount = Math.ceil(targetLengthMeters / 3);
  const couplingsCount = pipesCount; 
  const gasketsCount = pipesCount;   
  const structuralElbowsCount = Math.max(2, Math.floor(targetLengthMeters / 25)); 

  // Base Prices mapping
  const pipeUnitPrice = usePremiumTwined ? 185000 : 135000; 
  const couplingUnitPrice = 42000;  
  const gasketUnitPrice = 4500;     
  const elbowUnitPrice = 98000;     

  const pipesSubtotal = pipesCount * pipeUnitPrice;
  const couplingsSubtotal = couplingsCount * couplingUnitPrice;
  const gasketsSubtotal = gasketsCount * gasketUnitPrice;
  const elbowsSubtotal = structuralElbowsCount * elbowUnitPrice;
  const totalPipelineCost = pipesSubtotal + couplingsSubtotal + gasketsSubtotal + elbowsSubtotal;

  const handleAddPipelineLayoutToQuote = () => {
    onAddToQuote({
      type: 'part',
      id: `compiled-pipeline-dn125-${targetLengthMeters}m`,
      name: `DN125 Compiled Pipeline Layout (${targetLengthMeters}m: ${pipesCount}x Pipes, ${couplingsCount}x Clamps, ${gasketsCount}x Seals, ${structuralElbowsCount}x Elbows)`,
      quantity: 1,
      rateOrPrice: totalPipelineCost
    });
  };

  const isPipelineLayoutAdded = () => {
    return addedItems.some(item => item.id === `compiled-pipeline-dn125-${targetLengthMeters}m`);
  };

  const categories = [
    { id: 'all', label: 'All Equipment' },
    { id: 'pipes', label: 'Casting Pipes' },
    { id: 'hoses', label: 'Flexible Hoses' },
    { id: 'couplings', label: 'Clamps & Couplings' },
    { id: 'elbows', label: 'Elbows (90/45/35°)' },
    { id: 'hardware', label: 'Pump Parts' },
    { id: 'chemicals', label: 'Concrete Chemicals' },
    { id: 'ppe', label: 'Safety / PPE' },
  ] as const;

  return (
    <div className={`py-12 transition-colors duration-200 ${
      isLightMode ? 'bg-[#F4F6FA] text-[#0C122C]' : 'bg-[#080D22] text-neutral-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Sourcing Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-5 relative">
            <div className={`rounded-none overflow-hidden border shadow-xl relative group ${
              isLightMode ? 'border-neutral-200 bg-white' : 'border-[#182747] bg-[#060a1a]'
            }`}>
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/10 to-transparent z-10" />
              <img 
                src="/src/assets/images/concrete_pump_pipes_1780284052994.png" 
                alt="Clasqo Sourced twin-wall concrete pipelines" 
                className="w-full h-[300px] sm:h-[350px] object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 z-20 bg-amber-500 text-neutral-950 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-none shadow">
                Direct Sourcing Gateway
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <span className="text-[10px] text-amber-500 font-extrabold uppercase tracking-[0.2em] leading-none font-mono block">
              ISTANBUL-LAGOS DIRECT PROCUREMENT ALLIANCE
            </span>
            <h2 className={`text-3xl sm:text-4xl font-black uppercase leading-tight tracking-tight ${
              isLightMode ? 'text-[#0C122C]' : 'text-white'
            }`}>
              European Sourced High-Pressure Concrete Pipeline & Plant Parts
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${
              isLightMode ? 'text-neutral-600' : 'text-neutral-400'
            }`}>
              We specialize in direct procurement of Zoomlion/Sany compatible 3m induction hardened casting pipes, wire-braided flexible end hoses, 90°/45°/35° elbows, forged snap clamps, polyurethane piston heads, quick-action concrete accelerators, and certified construction PPE. Sourced from certified partner mills in Istanbul, Turkey.
            </p>
            
            <div className={`flex flex-wrap gap-6 text-[10px] uppercase tracking-wider font-extrabold pt-2 border-t ${
              isLightMode ? 'text-neutral-700 border-neutral-200' : 'text-neutral-300 border-[#182747]'
            }`}>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-500" />
                <span>Turkish API & Zoomlion OEM Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-amber-500" />
                <span>Fast 7-Day Air Freight Staging</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: INTERACTIVE Pipeline Layout Compiler */}
        <div className={`border rounded-none p-6 sm:p-10 mb-16 relative transition-colors ${
          isLightMode ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#060a1a] border-[#182747]'
        }`}>
          <div className="absolute top-0 right-0 transform translate-x-[-15px] translate-y-[-15px] bg-amber-500 text-neutral-950 text-[9px] font-black px-3 py-1 rounded-none uppercase tracking-widest shadow">
            Interactive Calculator
          </div>

          <div className="max-w-2xl">
            <h3 className={`text-xl font-black uppercase tracking-tight flex items-center gap-2 ${
              isLightMode ? 'text-[#0C122C]' : 'text-white'
            }`}>
              <Ruler className="w-5 h-5 text-amber-500" />
              Dynamic DN125 Pressure Line Configurator
            </h3>
            <p className={`text-xs mt-2 leading-relaxed ${
              isLightMode ? 'text-neutral-600' : 'text-neutral-400'
            }`}>
              Contracting a vertical high-rise slab or extensive horizontal bypass road? Input your target delivery path length. We will mathematically layout the required straight pipes, toggle-screw clamps, structural curves, and nitrile rubber gaskets matching strict safety line limits.
            </p>
          </div>

          <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 pt-8 border-t ${
            isLightMode ? 'border-neutral-200' : 'border-[#182747]'
          }`}>
            {/* Input Config parameters */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <label className={`text-xs font-bold block mb-2 uppercase tracking-wide ${
                  isLightMode ? 'text-neutral-800' : 'text-neutral-300'
                }`}>
                  Target Pipeline Path Length: <span className="text-amber-500 font-mono text-sm">{targetLengthMeters} Meters</span>
                </label>
                <input 
                  type="range"
                  min="15"
                  max="300"
                  step="3"
                  value={targetLengthMeters}
                  onChange={(e) => setTargetLengthMeters(parseInt(e.target.value))}
                  className="w-full accent-amber-500 h-1.5 bg-neutral-300 dark:bg-neutral-800 rounded-none cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-neutral-500 font-bold font-mono mt-2 uppercase tracking-wider">
                  <span>15 M (Boom Bypass)</span>
                  <span>150 M (Mid-Range)</span>
                  <span>300 M (High-Rise)</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <span className={`text-[10px] font-black block uppercase tracking-widest ${
                  isLightMode ? 'text-neutral-700' : 'text-neutral-400'
                }`}>
                  Tube Quality Tier
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setUsePremiumTwined(true)}
                    className={`p-4 rounded-none border text-left transition-all cursor-pointer ${
                      usePremiumTwined 
                        ? 'border-amber-500 bg-amber-500/10 text-amber-500 font-bold shadow-xs' 
                        : isLightMode
                          ? 'border-neutral-200 bg-neutral-50 text-neutral-600 hover:border-neutral-300'
                          : 'border-[#182747] bg-[#0B122C] text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <span className="text-xs font-black uppercase tracking-tight block">Twin-Wall Premium</span>
                    <span className="text-[9px] text-neutral-500 block font-mono mt-1">St52 Twin (130 Bar)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setUsePremiumTwined(false)}
                    className={`p-4 rounded-none border text-left transition-all cursor-pointer ${
                      !usePremiumTwined 
                        ? 'border-amber-500 bg-amber-500/10 text-amber-500 font-bold shadow-xs' 
                        : isLightMode
                          ? 'border-neutral-200 bg-neutral-50 text-neutral-600 hover:border-neutral-300'
                          : 'border-[#182747] bg-[#0B122C] text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <span className="text-xs font-black uppercase tracking-tight block">Hardened Single</span>
                    <span className="text-[9px] text-neutral-500 block font-mono mt-1">Q345 Single (85 Bar)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Compiled BoM (Bill of Materials) */}
            <div className={`lg:col-span-7 rounded-none p-6 border flex flex-col justify-between ${
              isLightMode ? 'bg-neutral-50 border-neutral-200' : 'bg-[#0B122C] border-[#182747]'
            }`}>
              <div>
                <h4 className={`text-xs font-black text-amber-500 uppercase tracking-[0.15em] border-b pb-3 mb-4 ${
                  isLightMode ? 'border-neutral-200' : 'border-neutral-800'
                }`}>
                  Compiled Layout Bill of Materials (DN125 Line)
                </h4>
                
                <div className="space-y-2 text-xs font-mono">
                  {/* Pipes row */}
                  <div className={`flex justify-between items-center py-2 border-b ${
                    isLightMode ? 'border-neutral-200' : 'border-neutral-800/60'
                  }`}>
                    <span className={isLightMode ? 'text-neutral-700' : 'text-neutral-400'}>
                      {pipesCount}x {usePremiumTwined ? 'Twin-Wall steel tube (3m)' : 'Single-Wall hardened tube (3m)'}
                    </span>
                    <span className={`font-bold ${isLightMode ? 'text-neutral-900' : 'text-white'}`}>{formatNaira(pipesSubtotal)}</span>
                  </div>
                  {/* Clamps row */}
                  <div className={`flex justify-between items-center py-2 border-b ${
                    isLightMode ? 'border-neutral-200' : 'border-neutral-800/60'
                  }`}>
                    <span className={isLightMode ? 'text-neutral-700' : 'text-neutral-400'}>{couplingsCount}x Toggle snap clamp couplings</span>
                    <span className={`font-bold ${isLightMode ? 'text-neutral-900' : 'text-white'}`}>{formatNaira(couplingsSubtotal)}</span>
                  </div>
                  {/* Gaskets row */}
                  <div className={`flex justify-between items-center py-2 border-b ${
                    isLightMode ? 'border-neutral-200' : 'border-neutral-800/60'
                  }`}>
                    <span className={isLightMode ? 'text-neutral-700' : 'text-neutral-400'}>{gasketsCount}x Nitrile O-Ring packings</span>
                    <span className={`font-bold ${isLightMode ? 'text-neutral-900' : 'text-white'}`}>{formatNaira(gasketsSubtotal)}</span>
                  </div>
                  {/* Elbows row */}
                  <div className={`flex justify-between items-center py-2 border-b ${
                    isLightMode ? 'border-neutral-200' : 'border-neutral-800/60'
                  }`}>
                    <span className={isLightMode ? 'text-neutral-700' : 'text-neutral-400'}>{structuralElbowsCount}x Cast high-alloy elbows (90°)</span>
                    <span className={`font-bold ${isLightMode ? 'text-neutral-900' : 'text-white'}`}>{formatNaira(elbowsSubtotal)}</span>
                  </div>
                </div>
              </div>

              {/* Layout Total Subtotal & Action */}
              <div className={`mt-8 pt-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isLightMode ? 'border-neutral-200' : 'border-neutral-800'
              }`}>
                <div>
                  <span className="text-[9px] text-neutral-500 uppercase font-black tracking-widest leading-none">Compiled Layout Price</span>
                  <p className="text-xl font-black text-amber-500 font-mono leading-tight mt-1">{formatNaira(totalPipelineCost)}</p>
                  <p className="text-[10px] text-neutral-500 leading-none mt-1.5 font-sans">Includes structural load standard certification</p>
                </div>

                {isPipelineLayoutAdded() ? (
                  <div 
                    className={`py-3 px-6 rounded-none text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5 pointer-events-none border ${
                      isLightMode ? 'bg-emerald-50 border-emerald-300 text-emerald-600' : 'bg-[#060a1a] border-emerald-500/40 text-emerald-400'
                    }`}
                  >
                    <Check className="w-4 h-4" /> Layout Config Added
                  </div>
                ) : (
                  <button 
                    type="button"
                    onClick={handleAddPipelineLayoutToQuote}
                    className="bg-amber-500 hover:bg-amber-400 text-neutral-950 py-3.5 px-6 rounded-none text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm"
                  >
                    <Plus className="w-4 h-4 text-neutral-950" /> Import Layout To Quote
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: INDIVIDUAL Spare Parts Catalog */}
        <div className={`border-t pt-12 ${isLightMode ? 'border-neutral-200' : 'border-[#182747]'}`}>
          <div className="flex flex-col md:flex-row sm:items-center justify-between gap-6 mb-8">
            <div>
              <h3 className={`text-xl font-black uppercase tracking-tight ${isLightMode ? 'text-[#0C122C]' : 'text-white'}`}>
                Parts, Accessories, Chemicals & PPE Catalog
              </h3>
              <p className={`text-xs mt-1 ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
                Direct procurement of Zoomlion/Sany casting pipes, flexible rubber hoses, 35/45/90° elbows, rapid accelerators, and safety gear.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search accessories, pipes, chemicals..."
                className={`w-full pl-9 pr-3 py-2 text-xs rounded-none border transition-colors focus:outline-none focus:border-amber-500 ${
                  isLightMode
                    ? 'bg-white border-neutral-300 text-neutral-900'
                    : 'bg-[#060a1a] border-[#182747] text-white'
                }`}
              />
            </div>
          </div>

          {/* Filter buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 scrollbar-none">
            {categories.map((cat) => (
              <button 
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`py-2 px-3.5 rounded-none text-[10px] font-black uppercase tracking-widest border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedCategory === cat.id 
                    ? 'bg-amber-500 text-neutral-950 border-amber-500 shadow-xs' 
                    : isLightMode
                      ? 'bg-white text-neutral-700 border-neutral-300 hover:text-black'
                      : 'bg-[#060a1a] text-neutral-400 border-neutral-800 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Parts Catalog Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredParts.map(part => {
              const isAdded = isAlreadyAdded(part.id);
              return (
                <div 
                  key={part.id} 
                  className={`border rounded-none p-6 flex flex-col justify-between group transition-all ${
                    isLightMode 
                      ? 'bg-white border-neutral-200 hover:border-neutral-300 shadow-xs' 
                      : 'bg-[#060a1a] border-[#182747] hover:border-amber-500/30'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className={`text-[8px] px-2 py-0.5 rounded-none font-mono font-bold uppercase tracking-widest border ${
                        isLightMode 
                          ? 'bg-neutral-100 border-neutral-200 text-neutral-600' 
                          : 'bg-[#0B122C] border-neutral-800 text-neutral-400'
                      }`}>
                        {part.category}
                      </span>
                      <span className={`text-[9px] font-black uppercase tracking-wider ${part.stockStatus === 'In Stock' ? 'text-emerald-500' : 'text-amber-500'}`}>
                        {part.stockStatus}
                      </span>
                    </div>

                    {/* Part Image Preview */}
                    {part.image && (
                      <div className={`h-36 w-full mb-3.5 overflow-hidden border ${
                        isLightMode ? 'bg-neutral-100 border-neutral-200' : 'bg-neutral-900 border-neutral-800'
                      }`}>
                        <img 
                          src={part.image} 
                          alt={part.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}

                    <h4 className={`text-xs font-black uppercase tracking-tight transition-colors line-clamp-2 leading-snug ${
                      isLightMode ? 'text-[#0C122C] group-hover:text-amber-600' : 'text-neutral-100 group-hover:text-amber-500'
                    }`}>
                      {part.name}
                    </h4>

                    <p className={`text-xs mt-2 line-clamp-3 leading-relaxed ${
                      isLightMode ? 'text-neutral-600' : 'text-neutral-400'
                    }`}>
                      {part.description}
                    </p>

                    {/* Technical metrics inside part */}
                    <div className={`mt-4 p-3 text-[9px] rounded-none border font-mono space-y-1 ${
                      isLightMode ? 'bg-neutral-50 border-neutral-200 text-neutral-700' : 'bg-[#0B122C] border-[#182747] text-neutral-300'
                    }`}>
                      <p><span className="text-neutral-500 uppercase tracking-wide">Pressure Limit:</span> {part.pressureRatingBar} Bar</p>
                      <p><span className="text-neutral-500 uppercase tracking-wide">Cast Rating:</span> {part.material}</p>
                      <p><span className="text-neutral-500 uppercase tracking-wide text-ellipsis block">Origin Mills:</span> {part.origin}</p>
                    </div>
                  </div>

                  <div className={`mt-6 pt-4 border-t ${isLightMode ? 'border-neutral-200' : 'border-neutral-800'}`}>
                    <div className="flex items-center justify-between gap-1 mb-4">
                      <span className="text-[9px] text-neutral-500 uppercase block font-bold tracking-wider">Unit Rate</span>
                      <span className="text-sm font-black text-amber-500 font-mono">{formatNaira(part.priceNgn)}</span>
                    </div>

                    {isAdded ? (
                      <div
                        className={`w-full py-2.5 rounded-none text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-1 border ${
                          isLightMode ? 'bg-emerald-50 border-emerald-300 text-emerald-600' : 'bg-[#0B122C] border-emerald-500/40 text-emerald-400'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" /> Added to Scope
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onAddToQuote({
                          type: 'part',
                          id: part.id,
                          name: part.name,
                          quantity: 1,
                          rateOrPrice: part.priceNgn
                        })}
                        className={`w-full py-2.5 rounded-none text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-[0.97] border ${
                          isLightMode 
                            ? 'bg-neutral-50 hover:bg-neutral-100 border-neutral-300 text-neutral-800' 
                            : 'bg-[#0B122C] hover:bg-[#121c3b] border-[#182747] text-neutral-200'
                        }`}
                      >
                        <Plus className="w-3.5 h-3.5 text-amber-500" /> Add to Quote
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
