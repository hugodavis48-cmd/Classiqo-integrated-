/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { EQUIPMENT_DATA } from '../data/equipmentData';
import { Machinery, QuoteItem } from '../types';
import { ShieldCheck, Layers, Settings, CircleAlert, Plus, Check, Info, Video, Play, Phone } from 'lucide-react';
import MachineryVideoModal from './MachineryVideoModal';
import { handleImageError } from '../utils/imageFallback';

interface EquipmentCatalogProps {
  onAddToQuote: (item: QuoteItem) => void;
  addedItems: QuoteItem[];
  initialCategory?: string;
  isLightMode?: boolean;
}

const CATEGORIES = [
  { id: 'all', label: 'All Equipment' },
  { id: 'concrete', label: 'Concrete Machinery' },
  { id: 'excavator', label: 'Heavy Excavators' },
  { id: 'crane', label: 'Mobile Cranes' },
  { id: 'drilling', label: 'Rotary Piling Rigs' },
  { id: 'road', label: 'Compaction & Road' },
  { id: 'port', label: 'Port Logistics' }
];

export default function EquipmentCatalog({ onAddToQuote, addedItems, initialCategory = 'all', isLightMode = false }: EquipmentCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  React.useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const [estimateDays, setEstimateDays] = useState<{ [id: string]: number }>({});
  const [activeVideoMachine, setActiveVideoMachine] = useState<Machinery | null>(null);

  const filteredEquipment = selectedCategory === 'all'
    ? EQUIPMENT_DATA
    : EQUIPMENT_DATA.filter(item => item.category === selectedCategory);

  const handleDayChange = (id: string, value: number) => {
    setEstimateDays(prev => ({
      ...prev,
      [id]: Math.max(1, value)
    }));
  };

  const isAlreadyAdded = (id: string) => {
    return addedItems.some(item => item.id === id && item.type === 'machinery');
  };

  const getDayCount = (id: string) => {
    return estimateDays[id] || 4; // default to 4 days for simulation
  };

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className={`py-12 transition-colors duration-200 ${
      isLightMode ? 'bg-[#F4F6FA] text-[#0C122C]' : 'bg-[#080D22] text-neutral-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[10px] text-amber-500 font-black uppercase tracking-[0.2em] mb-2 font-mono block">
            CLASQO LOGISTICAL EQUIPMENT FLEET
          </span>
          <h2 className={`text-3xl sm:text-4xl font-black uppercase tracking-tight ${isLightMode ? 'text-[#0C122C]' : 'text-white'}`}>
            Sany Heavy Machinery Charter Fleet
          </h2>
          <p className={`mt-3 text-xs sm:text-sm leading-relaxed ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
            Configure, calculate, and request formal quotations for Lagos high-pressure pumping, foundation drilling, and earthworks heavy hardware direct from Eti-Osa Lekki depot.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border transition-all rounded-none whitespace-nowrap cursor-pointer ${
                selectedCategory === category.id
                  ? 'bg-amber-500 text-neutral-950 border-amber-500 font-black shadow-xs'
                  : isLightMode
                    ? 'bg-white text-neutral-700 border-neutral-300 hover:text-black hover:border-neutral-400'
                    : 'bg-[#060a1a] text-neutral-400 border-neutral-800 hover:text-white hover:bg-[#0B122C]'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEquipment.map(item => {
            const days = getDayCount(item.id);
            const subtotal = item.dailyRateNgn * days;
            const isAdded = isAlreadyAdded(item.id);

            return (
              <div 
                key={item.id} 
                className={`rounded-none overflow-hidden border transition-all flex flex-col group relative ${
                  isLightMode 
                    ? 'bg-white border-neutral-200 hover:border-neutral-300 hover:shadow-md' 
                    : 'bg-[#060a1a] border-[#182747] hover:border-amber-500/30'
                }`}
              >
                {/* Image section */}
                <div className={`relative h-60 w-full overflow-hidden border-b ${
                  isLightMode ? 'bg-neutral-100 border-neutral-200' : 'bg-neutral-900 border-[#182747]'
                }`}>
                  <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 items-end">
                    <span className={`text-[9px] uppercase tracking-widest font-black px-2 py-1 rounded-none border backdrop-blur-sm ${
                      item.availability === 'Available'
                        ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                        : item.availability === 'Leased'
                        ? 'bg-amber-500/10 text-amber-500 border-amber-500/30'
                        : 'bg-blue-500/10 text-blue-500 border-blue-500/30'
                    }`}>
                      {item.availability}
                    </span>
                  </div>

                  {/* Play video hover overlay */}
                  <div className="absolute inset-0 bg-neutral-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                    <button
                      onClick={() => setActiveVideoMachine(item)}
                      className="bg-amber-500 hover:bg-white text-neutral-950 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-none shadow-2xl inline-flex items-center gap-1.5 transition-all transform translate-y-3 group-hover:translate-y-0 duration-300 cursor-pointer"
                    >
                      <Video className="w-3.5 h-3.5" /> Watch Action Video
                    </button>
                  </div>

                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => handleImageError(e)}
                  />
                  
                  {/* Brand badge */}
                  <span className="absolute bottom-3 left-3 bg-neutral-950/90 border border-neutral-700 px-2 py-0.5 rounded-none text-[10px] font-bold text-amber-500 uppercase tracking-widest">
                    {item.brand} • {item.model}
                  </span>

                  {/* Live video badge */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveVideoMachine(item);
                    }}
                    className="absolute bottom-3 right-3 bg-[#060a1a]/95 hover:bg-amber-500 text-neutral-300 hover:text-neutral-950 border border-[#182747] hover:border-amber-500 px-2.5 py-1.5 rounded-none text-[8px] font-extrabold uppercase tracking-widest font-mono flex items-center gap-1.5 duration-250 cursor-pointer z-10"
                    title="Watch live-action preview"
                  >
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
                    </span>
                    Action Reel
                  </button>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className={`text-base font-black transition-colors uppercase tracking-tight ${
                      isLightMode ? 'text-[#0C122C] hover:text-amber-600' : 'text-white hover:text-amber-500'
                    }`}>
                      {item.name}
                    </h3>
                    <p className={`text-xs mt-2 line-clamp-3 leading-relaxed ${
                      isLightMode ? 'text-neutral-600' : 'text-neutral-400'
                    }`}>
                      {item.description}
                    </p>

                    {/* Technical Specs Accordion Preview */}
                    <div className={`mt-4 p-4 border rounded-none text-xs ${
                      isLightMode ? 'bg-neutral-50 border-neutral-200' : 'bg-[#0B122C] border-[#182747]'
                    }`}>
                      <div className={`flex items-center justify-between font-bold border-b pb-2 mb-2 uppercase tracking-wider text-[10px] ${
                        isLightMode ? 'text-neutral-800 border-neutral-200' : 'text-neutral-300 border-neutral-800'
                      }`}>
                        <span>Technical Metrics</span>
                        <Settings className="w-3.5 h-3.5 text-amber-500" />
                      </div>
                      <div className={`grid grid-cols-2 gap-x-4 gap-y-1.5 font-mono text-[10px] ${
                        isLightMode ? 'text-neutral-700' : 'text-neutral-300'
                      }`}>
                        {Object.entries(item.specifications).map(([key, val]) => (
                          <div key={key} className={`flex justify-between items-center py-0.5 border-b ${
                            isLightMode ? 'border-neutral-200/60' : 'border-neutral-800/40'
                          }`}>
                            <span className="text-neutral-500 text-[9px] truncate">{key}:</span>
                            <span className="text-right truncate font-semibold">{val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pricing / Booking Section */}
                  <div className={`mt-6 pt-5 border-t ${isLightMode ? 'border-neutral-200' : 'border-neutral-800'}`}>
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="text-[9px] text-neutral-500 uppercase tracking-wider font-bold">Leasing Tariff</p>
                        <p className="text-lg font-black text-amber-500 font-mono">
                          {formatNaira(item.dailyRateNgn)} <span className="text-[10px] font-medium text-neutral-500">/ Day</span>
                        </p>
                      </div>
                      {item.salesPriceNgn && (
                        <div className="text-right">
                          <p className="text-[9px] text-neutral-500 uppercase tracking-wider font-bold">Outright Purchase</p>
                          <p className={`text-xs font-semibold font-mono ${isLightMode ? 'text-neutral-800' : 'text-neutral-300'}`}>
                            {formatNaira(item.salesPriceNgn)}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Multiplier estimator */}
                    <div className={`p-3 border rounded-none flex items-center justify-between gap-2 mb-4 ${
                      isLightMode ? 'bg-neutral-50 border-neutral-200' : 'bg-[#0B122C] border-[#182747]'
                    }`}>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className={`text-[9px] font-bold uppercase tracking-wider ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
                          Rent Duration:
                        </span>
                        <input
                          type="number"
                          min="1"
                          max="90"
                          value={days}
                          onChange={(e) => handleDayChange(item.id, parseInt(e.target.value) || 1)}
                          className={`w-12 border rounded-none text-center text-xs py-1 font-mono font-black focus:outline-none focus:border-amber-500 ${
                            isLightMode 
                              ? 'bg-white border-neutral-300 text-neutral-900' 
                              : 'bg-[#060a1a] border-neutral-700 text-neutral-100'
                          }`}
                        />
                        <span className={`text-[9px] font-bold uppercase tracking-wider ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
                          Days
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-neutral-500 uppercase block font-medium leading-none">Est. Subtotal</span>
                        <span className={`text-sm font-black font-mono ${isLightMode ? 'text-[#0C122C]' : 'text-white'}`}>
                          {formatNaira(subtotal)}
                        </span>
                      </div>
                    </div>

                    {/* Add / Action buttons */}
                    {isAdded ? (
                      <div
                        className={`w-full border text-emerald-500 py-3 rounded-none text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 ${
                          isLightMode ? 'bg-emerald-50 border-emerald-300' : 'bg-[#0B122C] border-emerald-500/40'
                        }`}
                      >
                        <Check className="w-4 h-4" />
                        Added to Quote Scope
                      </div>
                    ) : (
                      <button
                        onClick={() => onAddToQuote({
                          type: 'machinery',
                          id: item.id,
                          name: `${item.name} (${days} Days Charter)`,
                          quantity: 1,
                          days: days,
                          rateOrPrice: item.dailyRateNgn
                        })}
                        className={`w-full py-3 rounded-none text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98] ${
                          item.availability === 'Sourcing'
                            ? isLightMode 
                              ? 'bg-neutral-200 hover:bg-neutral-300 text-neutral-800 border border-neutral-300'
                              : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700'
                            : 'bg-amber-500 hover:bg-amber-400 text-black shadow-xs'
                        }`}
                      >
                        <Plus className="w-4 h-4 text-black" />
                        {item.availability === 'Sourcing' ? 'Request Sany Sourcing' : 'Add to Rental Scope'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quality standard guarantees */}
        <div className={`mt-16 border p-8 rounded-none flex flex-col md:flex-row gap-6 items-center justify-between ${
          isLightMode 
            ? 'bg-white border-neutral-200 shadow-sm' 
            : 'bg-[#060a1a] border-[#182747]'
        }`}>
          <div className="flex gap-4 items-start max-w-2xl">
            <div className="w-12 h-12 rounded-none bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0 border border-amber-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className={`font-extrabold text-md uppercase tracking-tight ${isLightMode ? 'text-[#0C122C]' : 'text-white'}`}>
                Clasqo Engineering Standard Protection
              </h4>
              <p className={`text-xs mt-1 leading-relaxed ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
                All Sany machinery is routinely field-tested under strict structural guidelines before mobilising from Eti-Osa. Quote estimates automatically calculate LASTMA logistics permits, lowbed transportation tariffs, and site operator staging logs inside Lagos.
              </p>
            </div>
          </div>
          <a
            href="tel:+2348020879468"
            className={`border py-3.5 px-6 rounded-none text-xs font-bold tracking-wider uppercase shrink-0 transition-all select-none inline-flex items-center gap-2 ${
              isLightMode 
                ? 'bg-neutral-50 hover:bg-neutral-100 border-neutral-300 text-neutral-800' 
                : 'bg-[#0B122C] hover:bg-[#121c3b] border-[#182747] text-neutral-200'
            }`}
          >
            <Phone className="w-4 h-4 text-amber-500" /> Dispatch: +234 802 087 9468
          </a>
        </div>
      </div>

      {/* Machinery Video Live Action Player Modal */}
      <MachineryVideoModal
        machinery={activeVideoMachine}
        onClose={() => setActiveVideoMachine(null)}
      />
    </div>
  );
}
