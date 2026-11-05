/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ProjectQuery, ConsultationResponse, QuoteItem } from '../types';
import { EQUIPMENT_DATA } from '../data/equipmentData';
import { PARTS_DATA } from '../data/partsData';
import { 
  Bot, 
  MapPin, 
  Ruler, 
  Layers, 
  ShieldAlert, 
  Truck, 
  Sparkles, 
  Settings, 
  CheckCircle,
  Plus,
  Loader2,
  Info
} from 'lucide-react';

interface AIConsultantProps {
  onAddToQuote: (item: QuoteItem) => void;
  addedItems: QuoteItem[];
  isLightMode?: boolean;
}

export default function AIConsultant({ onAddToQuote, addedItems, isLightMode = false }: AIConsultantProps) {
  const [projectForm, setProjectForm] = useState<ProjectQuery>({
    projectType: 'Concrete Slabbing High-Rise',
    location: 'Lekki Phase 1, Eti-Osa, Lagos',
    soilType: 'Loose Coastal Sandy beds with high water table',
    pumpingHeight: 45,
    pumpingDistance: 80,
    estimatedDurationDays: 30,
    additionalDetails: 'Horizontal Bypass pumping across deltaic wetlands.'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<ConsultationResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setResponse(null);

    try {
      const res = await fetch('/api/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectForm)
      });

      if (!res.ok) {
        throw new Error('Failed to retrieve consulting recommendations.');
      }

      const data: ConsultationResponse = await res.json();
      setResponse(data);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'An unexpected error occurred while communicating with the consultation API.');
    } finally {
      setIsLoading(false);
    }
  };

  const isItemInCart = (id: string, type: 'machinery' | 'part' | 'labor' | 'service') => {
    return addedItems.some(item => item.id === id && item.type === type);
  };

  const handleAddEquipment = (id: string) => {
    const item = EQUIPMENT_DATA.find(e => e.id === id);
    if (item) {
      onAddToQuote({
        type: 'machinery',
        id: item.id,
        name: `${item.name} (${projectForm.estimatedDurationDays || 30} Days Chartered)`,
        quantity: 1,
        days: projectForm.estimatedDurationDays || 30,
        rateOrPrice: item.dailyRateNgn
      });
    }
  };

  const handleAddPart = (id: string) => {
    const item = PARTS_DATA.find(p => p.id === id);
    if (item) {
      onAddToQuote({
        type: 'part',
        id: item.id,
        name: item.name,
        quantity: 1,
        rateOrPrice: item.priceNgn
      });
    }
  };

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className={`py-12 transition-colors duration-200 border-b ${
      isLightMode 
        ? 'bg-[#F4F6FA] text-[#0C122C] border-neutral-200' 
        : 'bg-[#080D22] text-neutral-100 border-[#182747]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-none bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0 border border-amber-500/20">
            <Bot className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className={`text-2xl sm:text-3xl font-black uppercase tracking-tight flex flex-wrap items-center gap-2 ${
              isLightMode ? 'text-[#0C122C]' : 'text-white'
            }`}>
              Clasqo AI Engineering Consultation Advisor
              <span className="bg-amber-500 text-neutral-950 text-[9px] font-black px-2 py-0.5 rounded-none uppercase tracking-widest leading-none">
                Gemini Powered
              </span>
            </h2>
            <p className={`text-xs mt-1 ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
              Analyze soil stability, pressure head, and concrete tube wear for Nigeria projects and receive direct Sany fleet procurement recommendations.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Consultation Form */}
          <form onSubmit={handleSubmit} className={`lg:col-span-4 p-6 rounded-none border space-y-4 transition-colors ${
            isLightMode ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#060a1a] border-[#182747]'
          }`}>
            <h3 className={`text-sm font-black uppercase tracking-widest border-b pb-2.5 flex items-center gap-2 mb-2 ${
              isLightMode ? 'text-neutral-900 border-neutral-200' : 'text-neutral-200 border-neutral-800'
            }`}>
              <Settings className="w-4 h-4 text-amber-500" />
              Project Variables
            </h3>

            <div>
              <label className={`text-[9px] font-black block mb-1.5 uppercase tracking-wider ${
                isLightMode ? 'text-neutral-700' : 'text-neutral-400'
              }`}>
                Project Target Type
              </label>
              <select
                value={projectForm.projectType}
                onChange={(e) => setProjectForm({ ...projectForm, projectType: e.target.value })}
                className={`w-full border rounded-none text-xs p-2.5 font-medium focus:outline-none ${
                  isLightMode ? 'bg-neutral-50 border-neutral-300 text-neutral-900 focus:border-amber-500' : 'bg-[#0B122C] border-[#182747] text-neutral-100 focus:border-amber-500'
                }`}
              >
                <option>Concrete Slabbing High-Rise</option>
                <option>Deep Piling Mud Foundations</option>
                <option>Highway sub-soil Compaction & Road Paving</option>
                <option>Lagoon Sand Dredging & Marsh Reclamation</option>
                <option>Heavy Lifting & Steel Structural Erection</option>
                <option>Port Terminal Cargo Material Handling</option>
              </select>
            </div>

            <div>
              <label className={`text-[9px] font-black block mb-1.5 uppercase tracking-wider ${
                isLightMode ? 'text-neutral-700' : 'text-neutral-400'
              }`}>
                Lagos Region Location
              </label>
              <input
                type="text"
                value={projectForm.location}
                onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                className={`w-full border rounded-none text-xs p-2.5 font-medium font-mono focus:outline-none ${
                  isLightMode ? 'bg-neutral-50 border-neutral-300 text-neutral-900 focus:border-amber-500' : 'bg-[#0B122C] border-[#182747] text-neutral-100 focus:border-amber-500'
                }`}
                placeholder="e.g. Lekki Phase 1, Lagos"
              />
            </div>

            <div>
              <label className={`text-[9px] font-black block mb-1.5 uppercase tracking-wider ${
                isLightMode ? 'text-neutral-700' : 'text-neutral-400'
              }`}>
                Estimated Soil/Strata State
              </label>
              <input
                type="text"
                value={projectForm.soilType}
                onChange={(e) => setProjectForm({ ...projectForm, soilType: e.target.value })}
                className={`w-full border rounded-none text-xs p-2.5 font-medium focus:outline-none ${
                  isLightMode ? 'bg-neutral-50 border-neutral-300 text-neutral-900 focus:border-amber-500' : 'bg-[#0B122C] border-[#182747] text-neutral-100 focus:border-amber-500'
                }`}
                placeholder="e.g. Marshy sandbed"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`text-[9px] block mb-1.5 font-black uppercase tracking-wider ${
                  isLightMode ? 'text-neutral-700' : 'text-neutral-400'
                }`}>
                  Vert. Height (M)
                </label>
                <input
                  type="number"
                  value={projectForm.pumpingHeight}
                  onChange={(e) => setProjectForm({ ...projectForm, pumpingHeight: parseInt(e.target.value) || 0 })}
                  className={`w-full border rounded-none text-xs p-2.5 font-mono focus:outline-none text-center font-bold ${
                    isLightMode ? 'bg-neutral-50 border-neutral-300 text-neutral-900 focus:border-amber-500' : 'bg-[#0B122C] border-[#182747] text-neutral-100 focus:border-amber-500'
                  }`}
                />
              </div>
              <div>
                <label className={`text-[9px] block mb-1.5 font-black uppercase tracking-wider ${
                  isLightMode ? 'text-neutral-700' : 'text-neutral-400'
                }`}>
                  Horiz. Distance (M)
                </label>
                <input
                  type="number"
                  value={projectForm.pumpingDistance}
                  onChange={(e) => setProjectForm({ ...projectForm, pumpingDistance: parseInt(e.target.value) || 0 })}
                  className={`w-full border rounded-none text-xs p-2.5 font-mono focus:outline-none text-center font-bold ${
                    isLightMode ? 'bg-neutral-50 border-neutral-300 text-neutral-900 focus:border-amber-500' : 'bg-[#0B122C] border-[#182747] text-neutral-100 focus:border-amber-500'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`text-[9px] block mb-1.5 font-black uppercase tracking-wider ${
                  isLightMode ? 'text-neutral-700' : 'text-neutral-400'
                }`}>
                  Charter Days
                </label>
                <input
                  type="number"
                  value={projectForm.estimatedDurationDays}
                  onChange={(e) => setProjectForm({ ...projectForm, estimatedDurationDays: parseInt(e.target.value) || 30 })}
                  className={`w-full border rounded-none text-xs p-2.5 font-mono focus:outline-none text-center font-bold ${
                    isLightMode ? 'bg-neutral-50 border-neutral-300 text-neutral-900 focus:border-amber-500' : 'bg-[#0B122C] border-[#182747] text-neutral-100 focus:border-amber-500'
                  }`}
                />
              </div>
              <div className="flex flex-col justify-end">
                <span className="text-[9px] text-neutral-500 italic leading-snug">Estimates LASTMA permits</span>
              </div>
            </div>

            <div>
              <label className={`text-[9px] font-black block mb-1.5 uppercase tracking-wider ${
                isLightMode ? 'text-neutral-700' : 'text-neutral-400'
              }`}>
                Custom Project Obstacles
              </label>
              <textarea
                value={projectForm.additionalDetails}
                onChange={(e) => setProjectForm({ ...projectForm, additionalDetails: e.target.value })}
                className={`w-full border rounded-none text-xs p-2.5 font-medium h-20 resize-none focus:outline-none ${
                  isLightMode ? 'bg-neutral-50 border-neutral-300 text-neutral-900 focus:border-amber-500' : 'bg-[#0B122C] border-[#182747] text-neutral-100 focus:border-amber-500'
                }`}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-neutral-700 text-neutral-950 py-3.5 rounded-none text-[10px] font-black uppercase tracking-widest shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-neutral-950" />
                  Analyzing Site Mechanics...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Evaluate & Match Fleet
                </>
              )}
            </button>
          </form>

          {/* Response Panel (Col Span 8) */}
          <div className="lg:col-span-8 space-y-6">
            {isLoading && (
              <div className={`border rounded-none p-12 text-center space-y-4 ${
                isLightMode ? 'bg-white border-neutral-200' : 'bg-[#060a1a] border-[#182747]'
              }`}>
                <Loader2 className="w-12 h-12 animate-spin text-amber-500 mx-auto" />
                <div className="max-w-md mx-auto space-y-2">
                  <h4 className={`font-black uppercase tracking-wide text-sm ${isLightMode ? 'text-neutral-900' : 'text-neutral-200'}`}>
                    Validating Lagos Engineering Logistics...
                  </h4>
                  <p className="text-neutral-500 text-xs leading-relaxed">
                    Gemini model is scanning Sany specifications, computing backpressure rates, checking soil mechanics, and structuring optimal pipeline Bill of Materials from Turkey mills.
                  </p>
                </div>
              </div>
            )}

            {errorMessage && (
              <div className="bg-red-500/10 border-2 border-red-500/30 text-red-500 rounded-none p-6 flex gap-3 items-start">
                <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-sm">Failed Consultation Request</h4>
                  <p className="text-xs mt-1">{errorMessage}</p>
                </div>
              </div>
            )}

            {!isLoading && !response && !errorMessage && (
              <div className={`border rounded-none p-12 text-center space-y-4 ${
                isLightMode ? 'bg-white border-neutral-200 shadow-xs' : 'bg-[#060a1a]/60 border-[#182747]'
              }`}>
                <Bot className="w-10 h-10 text-neutral-400 dark:text-neutral-600 mx-auto" />
                <div>
                  <h4 className={`font-black uppercase tracking-wide text-sm ${isLightMode ? 'text-neutral-800' : 'text-neutral-300'}`}>
                    Awaiting Project Specifications
                  </h4>
                  <p className="text-neutral-500 text-xs mt-2 max-w-sm mx-auto leading-relaxed">
                    Configure your pavement, piling depth, or slabbing length values in the sidebar grid and click evaluate. The AI advisor processes matching Sany setups dynamically.
                  </p>
                </div>
              </div>
            )}

            {response && (
              <div className="space-y-6">
                {/* Visual Engineering Assessment */}
                <div className={`rounded-none border p-6 space-y-4 shadow-xl relative overflow-hidden ${
                  isLightMode ? 'bg-white border-amber-500/30' : 'bg-[#060a1a] border-amber-500/30'
                }`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
                  
                  <div>
                    <span className="text-[9px] text-amber-500 uppercase font-black tracking-[0.25em] block mb-1">
                      Clasqo Engineering Verdict
                    </span>
                    <h3 className={`text-lg font-black uppercase tracking-tight ${isLightMode ? 'text-[#0C122C]' : 'text-white'}`}>
                      Project Consultative Assessment
                    </h3>
                    <p className={`text-xs mt-3 leading-relaxed whitespace-pre-line text-justify ${
                      isLightMode ? 'text-neutral-700' : 'text-neutral-350'
                    }`}>
                      {response.analysis}
                    </p>
                  </div>

                  {/* Safety alerts banner */}
                  <div className={`border p-4 rounded-none space-y-2.5 ${
                    isLightMode ? 'bg-neutral-50 border-neutral-200' : 'bg-[#0B122C] border-[#182747]'
                  }`}>
                    <span className="text-[9px] font-black text-red-500 uppercase tracking-widest flex items-center gap-1.5 leading-none">
                      <ShieldAlert className="w-3.5 h-3.5" /> Static Site Safety Guidelines
                    </span>
                    <ul className="list-disc list-inside space-y-1 text-xs text-neutral-500 dark:text-neutral-400">
                      {response.safetyGuidelines.map((g, idx) => (
                        <li key={idx}>{g}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Transport logistics banner */}
                  <div className={`border p-4 rounded-none space-y-1.5 flex gap-3.5 items-start ${
                    isLightMode ? 'bg-neutral-50 border-neutral-200' : 'bg-[#0B122C] border-[#182747]'
                  }`}>
                    <div className="w-9 h-9 rounded-none bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 mt-0.5">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest block">
                        Lagos Logistics Assessment
                      </span>
                      <p className={`text-xs mt-1 leading-relaxed ${isLightMode ? 'text-neutral-700' : 'text-neutral-400'}`}>
                        {response.logisticsAssessment}
                      </p>
                    </div>
                  </div>

                  {/* Assigned Lead Field Engineer Recommendation: Engineer Emmanuel */}
                  <div className={`p-4 border rounded-none flex flex-col sm:flex-row items-center justify-between gap-4 ${
                    isLightMode ? 'bg-amber-500/10 border-amber-500/40' : 'bg-[#0B1535] border-amber-500/40'
                  }`}>
                    <div className="flex items-center gap-3.5">
                      <img 
                        src="/assets/aistudio/a988fb32-58ae-4b9b-a798-129545d20f7c_c8faa863.jpeg" 
                        alt="Engineer Emmanuel" 
                        className="w-14 h-14 object-cover border border-amber-500/60 shadow-sm shrink-0"
                      />
                      <div>
                        <span className="text-[8.5px] font-mono font-bold text-amber-500 uppercase tracking-widest block">
                          RECOMMENDED ON-SITE FIELD LEADERSHIP
                        </span>
                        <h4 className={`text-xs font-black uppercase ${isLightMode ? 'text-[#0C122C]' : 'text-white'}`}>
                          Engineer Emmanuel — Lead Multi-Skilled Engineer
                        </h4>
                        <p className={`text-[10px] font-mono mt-0.5 ${isLightMode ? 'text-neutral-600' : 'text-neutral-300'}`}>
                          Machinery Maintenance, Line Pump Setup, Pour Supervision & Operator • 16+ Yrs Lagos Experience
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        onAddToQuote({
                          type: 'labor',
                          id: 'wf-engr-emmanuel-lead',
                          name: `Lead Field Engineer: Engr. Emmanuel (${projectForm.estimatedDurationDays || 30} Days Assigned)`,
                          quantity: 1,
                          days: projectForm.estimatedDurationDays || 30,
                          rateOrPrice: 150000
                        });
                      }}
                      className={`px-4 py-2.5 text-[9.5px] font-black uppercase tracking-wider shrink-0 transition-all cursor-pointer ${
                        isItemInCart('wf-engr-emmanuel-lead', 'labor')
                          ? 'bg-emerald-500 text-neutral-950 cursor-default'
                          : 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow'
                      }`}
                    >
                      {isItemInCart('wf-engr-emmanuel-lead', 'labor') ? '✓ Lead Assigned' : '+ Assign Engr. Emmanuel'}
                    </button>
                  </div>
                </div>

                {/* Direct Matching recommendations */}
                <div className={`rounded-none border p-6 space-y-4 ${
                  isLightMode ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#060a1a] border-[#182747]'
                }`}>
                  <h3 className={`text-xs font-black uppercase tracking-widest border-b pb-2.5 flex items-center gap-2 ${
                    isLightMode ? 'text-neutral-900 border-neutral-200' : 'text-neutral-200 border-neutral-900'
                  }`}>
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Dynamic System Recommendations
                  </h3>

                  {/* Recommended Machinery */}
                  <div className="space-y-3">
                    <p className="text-[9px] text-neutral-500 uppercase font-black tracking-wider leading-none">
                      Recommended Sany Fleet
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {response.recommendedMachineryIds.map(id => {
                        const m = EQUIPMENT_DATA.find(e => e.id === id);
                        if (!m) return null;
                        const added = isItemInCart(id, 'machinery');
                        return (
                          <div key={id} className={`border rounded-none p-4 flex items-center justify-between gap-2.5 transition-colors ${
                            isLightMode 
                              ? 'bg-neutral-50 border-neutral-200 hover:border-neutral-300' 
                              : 'bg-[#0B122C] border-[#182747] hover:border-amber-500/30'
                          }`}>
                            <div>
                              <h4 className={`text-xs font-black uppercase ${isLightMode ? 'text-[#0C122C]' : 'text-neutral-100'}`}>
                                {m.name}
                              </h4>
                              <p className="text-[10px] text-neutral-500 font-mono mt-0.5">{m.model}</p>
                              <p className="text-amber-500 text-[11px] font-bold font-mono mt-1">{formatNaira(m.dailyRateNgn)} / Day</p>
                            </div>
                            {added ? (
                              <span className="text-[8px] font-black uppercase tracking-wider text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-none">
                                Added
                              </span>
                            ) : (
                              <button
                                onClick={() => handleAddEquipment(id)}
                                className="bg-amber-500 hover:bg-amber-400 text-neutral-950 p-2.5 rounded-none font-bold shrink-0 shadow transition-all active:scale-95 cursor-pointer"
                                title="Add machine to quote"
                              >
                                <Plus className="w-3.5 h-3.5 text-neutral-950" />
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Recommended Parts */}
                  <div className="space-y-3 pt-2">
                    <p className="text-[9px] text-neutral-500 uppercase font-black tracking-wider leading-none">
                      High-Wear Pipes & Couplings
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {response.recommendedPartIds.map(id => {
                        const p = PARTS_DATA.find(e => e.id === id);
                        if (!p) return null;
                        const added = isItemInCart(id, 'part');
                        return (
                          <div key={id} className={`border rounded-none p-4 flex items-center justify-between gap-2.5 transition-colors ${
                            isLightMode 
                              ? 'bg-neutral-50 border-neutral-200 hover:border-neutral-300' 
                              : 'bg-[#0B122C] border-[#182747] hover:border-amber-500/30'
                          }`}>
                            <div>
                              <h4 className={`text-xs font-black uppercase ${isLightMode ? 'text-[#0C122C]' : 'text-neutral-100'}`}>
                                {p.name}
                              </h4>
                              <p className="text-[10px] text-neutral-500 font-mono mt-0.5">{p.origin}</p>
                              <p className="text-amber-500 text-[11px] font-bold font-mono mt-1">{formatNaira(p.priceNgn)}</p>
                            </div>
                            {added ? (
                              <span className="text-[8px] font-black uppercase tracking-wider text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-none">
                                Added
                              </span>
                            ) : (
                              <button
                                onClick={() => handleAddPart(id)}
                                className="bg-amber-500 hover:bg-amber-400 text-neutral-950 p-2.5 rounded-none font-bold shrink-0 shadow transition-all active:scale-95 cursor-pointer"
                                title="Add part to quote"
                              >
                                <Plus className="w-3.5 h-3.5 text-neutral-950" />
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
