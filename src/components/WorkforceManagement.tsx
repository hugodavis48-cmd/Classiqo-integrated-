/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { WORKFORCE_DATA, ENGINEER_EMMANUEL_PROFILE } from '../data/workforceData';
import { WorkforcePersonnel } from '../types';
import { Award, Wrench, ShieldCheck, CheckCircle2, Star, Sparkles, Truck, PhoneCall, ChevronRight, Layers, HardHat } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WorkforceManagementProps {
  onAddToQuote: (item: {
    type: 'labor';
    id: string;
    name: string;
    rateOrPrice: number;
    quantity: number;
    days?: number;
    unitLabel?: string;
  }) => void;
  isLightMode?: boolean;
}

export const WorkforceManagement: React.FC<WorkforceManagementProps> = ({
  onAddToQuote,
  isLightMode = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPersonnel, setSelectedPersonnel] = useState<WorkforcePersonnel | null>(null);
  const [activeVideoModal, setActiveVideoModal] = useState<WorkforcePersonnel | null>(null);
  const [activeEmmanuelRole, setActiveEmmanuelRole] = useState<string>('lead-coordinator');
  const [bookingDays, setBookingDays] = useState<{ [id: string]: number }>({});
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Personnel' },
    { id: 'site_engineer', label: 'Site Engineer Managers' },
    { id: 'operator', label: 'Machine Operators' },
    { id: 'safety_officer', label: 'Field Safety Officers' },
    { id: 'finisher', label: 'Concrete Finishers & Casters' },
    { id: 'cleaner', label: 'Washout & Cleaners' },
    { id: 'security', label: 'Site Security' },
  ];

  const filteredPersonnel = WORKFORCE_DATA.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.roleCategory === selectedCategory;
  });

  const handleBooking = (person: WorkforcePersonnel) => {
    const days = bookingDays[person.id] || 3;
    onAddToQuote({
      type: 'labor',
      id: person.id,
      name: `${person.roleTitle} - ${person.name}`,
      rateOrPrice: person.dailyRateNgn,
      quantity: 1,
      days: days,
      unitLabel: 'shifts / days',
    });

    setFeedbackMsg(`Added ${person.name} (${days} days) to Project Quote`);
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  const updateDays = (id: string, delta: number) => {
    setBookingDays((prev) => {
      const current = prev[id] || 3;
      const updated = Math.max(1, current + delta);
      return { ...prev, [id]: updated };
    });
  };

  return (
    <div className={`py-12 px-4 sm:px-6 lg:px-8 transition-colors ${isLightMode ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-white'}`}>
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-8 border-slate-200 dark:border-slate-800">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-medium tracking-wide uppercase text-amber-600 dark:text-amber-400">
              <span>Verified Civil Workforce</span>
              <span aria-hidden="true">·</span>
              <span>Lagos State Certified</span>
              <span aria-hidden="true">·</span>
              <span>Rapid Site Deployment</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Skilled Construction Labor & Site Specialists
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Deploy certified concrete pump operators, licensed COREN site engineering managers, NEBOSH HSE safety inspectors, power-trowel slab casters, and plant security detachments for projects across Nigeria.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-6 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm shrink-0">
            <div>
              <div className="text-2xl font-bold font-mono tabular-nums text-amber-500">4.91</div>
              <div className="text-xs text-slate-500">Average Client Rating</div>
            </div>
            <div className="w-px h-8 bg-slate-200 dark:bg-slate-800" />
            <div>
              <div className="text-2xl font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400">100%</div>
              <div className="text-xs text-slate-500">Vetted & Insured</div>
            </div>
            <div className="w-px h-8 bg-slate-200 dark:bg-slate-800" />
            <div>
              <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">48h</div>
              <div className="text-xs text-slate-500">Mobilization SLA</div>
            </div>
          </div>
        </div>

        {/* Floating Notification */}
        {feedbackMsg && (
          <div className="p-3 rounded-lg bg-emerald-600 text-white text-sm font-medium flex items-center justify-between shadow-lg animate-fade-in">
            <span>{feedbackMsg}</span>
            <span className="text-xs opacity-80">Check Quote tab to review total budget</span>
          </div>
        )}

        {/* CLASQO MASTERCLASS SPOTLIGHT: ENGINEER EMMANUEL */}
        <section className={`p-6 sm:p-8 lg:p-10 border rounded-2xl relative overflow-hidden transition-all ${
          isLightMode 
            ? 'bg-gradient-to-br from-amber-500/10 via-white to-white border-amber-500/30 shadow-xl' 
            : 'bg-gradient-to-br from-amber-500/15 via-[#0B1535] to-[#060a1a] border-amber-500/40 shadow-2xl'
        }`}>
          <div className="absolute top-0 right-0 transform translate-x-12 -translate-y-12 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 border-neutral-700/20">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="bg-amber-500 text-neutral-950 font-black text-[9.5px] uppercase tracking-widest px-2.5 py-0.5 rounded shadow">
                  ★ CLASQO MASTERCLASS SPOTLIGHT
                </span>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-mono px-2 py-0.5 font-bold uppercase animate-pulse">
                  ● LEAD FIELD DEPLOYMENT
                </span>
              </div>
              <h2 className={`text-2xl sm:text-3xl font-black uppercase tracking-tight ${isLightMode ? 'text-[#0C122C]' : 'text-white'}`}>
                Engineer Emmanuel — Most Decorated Multi-Skilled Field Engineer
              </h2>
              <p className={`text-xs sm:text-sm max-w-3xl leading-relaxed ${isLightMode ? 'text-neutral-600' : 'text-neutral-300'}`}>
                Highly experienced and exceptionally proactive technical lead commanding hands-on machinery maintenance, high-pressure line pump field setups, continuous high-rise pour supervision, and certified heavy equipment operations.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 font-mono">
              <div className={`p-3 border text-center ${isLightMode ? 'bg-white border-neutral-200' : 'bg-neutral-950/80 border-[#182747]'}`}>
                <div className="text-xl font-black text-amber-500">16+ Yrs</div>
                <div className="text-[8px] text-neutral-500 uppercase tracking-widest">Field Leadership</div>
              </div>
              <div className={`p-3 border text-center ${isLightMode ? 'bg-white border-neutral-200' : 'bg-neutral-950/80 border-[#182747]'}`}>
                <div className="text-xl font-black text-emerald-400">142 Pours</div>
                <div className="text-[8px] text-neutral-500 uppercase tracking-widest">Zero Blockages</div>
              </div>
            </div>
          </div>

          {/* Interactive Multi-Role Selector Tabs */}
          <div className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest font-bold">
                SELECT OPERATIONAL SPECIALTY ROLE:
              </span>
              <span className="text-[9px] font-mono text-amber-500">
                5 Active Master Disciplines
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 font-mono">
              {ENGINEER_EMMANUEL_PROFILE.roles.map((role) => {
                const isSelected = activeEmmanuelRole === role.id;
                return (
                  <button
                    key={role.id}
                    onClick={() => setActiveEmmanuelRole(role.id)}
                    className={`p-2.5 text-left border transition-all cursor-pointer flex flex-col justify-between rounded-lg ${
                      isSelected
                        ? isLightMode
                          ? 'bg-amber-500 border-amber-500 text-neutral-950 shadow-md translate-y-[-2px]'
                          : 'bg-amber-500 border-amber-500 text-neutral-950 shadow-lg translate-y-[-2px]'
                        : isLightMode
                          ? 'bg-white border-neutral-200 hover:border-neutral-300 text-neutral-700'
                          : 'bg-[#060a1a] border-[#182747] hover:border-[#1e3260] text-neutral-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[8px] font-bold uppercase opacity-80 mb-1">
                      <span>{role.badge}</span>
                      {isSelected && <span>✓ ACTIVE</span>}
                    </div>
                    <div className="text-[11px] font-black line-clamp-2 leading-tight">
                      {role.title}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Role Showcase Card */}
          {(() => {
            const currentRole = ENGINEER_EMMANUEL_PROFILE.roles.find(r => r.id === activeEmmanuelRole) || ENGINEER_EMMANUEL_PROFILE.roles[0];
            return (
              <div className="mt-6 pt-6 border-t border-neutral-700/20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Photo with Overlay (5 Cols) */}
                  <div className="lg:col-span-5 relative group">
                    <div className="relative h-72 sm:h-80 w-full overflow-hidden rounded-xl border border-amber-500/40 shadow-2xl bg-black">
                      <img
                        src={currentRole.image}
                        alt={`Engineer Emmanuel - ${currentRole.title}`}
                        className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                      <div className="absolute top-3 left-3 bg-neutral-950/90 text-amber-500 text-[9px] font-mono font-bold px-2.5 py-1 uppercase tracking-wider border border-amber-500/30">
                        {currentRole.badge}
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <div className="text-xs text-amber-400 font-mono font-bold uppercase tracking-wider">
                          FIELD SPECIALIZATION
                        </div>
                        <div className="text-base font-black uppercase leading-tight mt-0.5">
                          {currentRole.title}
                        </div>
                      </div>
                    </div>

                    {/* Role Thumbnails Strip */}
                    <div className="grid grid-cols-5 gap-2 mt-3">
                      {ENGINEER_EMMANUEL_PROFILE.roles.map((r) => (
                        <button
                          key={r.id}
                          onClick={() => setActiveEmmanuelRole(r.id)}
                          className={`relative aspect-square overflow-hidden rounded-md border-2 transition-all cursor-pointer ${
                            activeEmmanuelRole === r.id
                              ? 'border-amber-500 scale-105 shadow-md'
                              : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                          title={r.title}
                        >
                          <img 
                            src={r.image} 
                            alt={r.title} 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Role Details & Actions (7 Cols) */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex flex-wrap items-center gap-2 font-mono text-[9.5px]">
                      <span className="text-amber-500 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 font-bold">
                        ★ {currentRole.badge}
                      </span>
                      <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 font-bold">
                        DEPLOYMENT: {currentRole.fieldDeployment}
                      </span>
                    </div>

                    <h3 className={`text-xl sm:text-2xl font-black uppercase tracking-tight ${isLightMode ? 'text-[#0C122C]' : 'text-white'}`}>
                      {currentRole.title}
                    </h3>

                    <p className={`text-xs sm:text-sm leading-relaxed ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                      {currentRole.summary}
                    </p>

                    {/* Tools and Deployment Highlights */}
                    <div className="space-y-2 pt-2">
                      <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-bold">
                        FIELD HARDWARE & DIAGNOSTIC GEAR:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {currentRole.toolsAndEquip.map((tool, tIdx) => (
                          <span
                            key={tIdx}
                            className={`text-xs font-mono px-3 py-1 border rounded ${
                              isLightMode 
                                ? 'bg-neutral-100 border-neutral-300 text-neutral-800' 
                                : 'bg-[#060a1a] border-[#182747] text-amber-300'
                            }`}
                          >
                            ✓ {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Verified Benchmark Highlight */}
                    <div className={`p-3.5 border rounded-lg flex items-start gap-3 font-mono text-xs ${
                      isLightMode 
                        ? 'bg-amber-500/5 border-amber-500/30 text-neutral-800' 
                        : 'bg-neutral-950/80 border-amber-500/30 text-amber-200'
                    }`}>
                      <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold uppercase tracking-wider block text-[9px] text-amber-500 mb-0.5">
                          VERIFIED FIELD BENCHMARK:
                        </span>
                        <span>{currentRole.keyHighlight}</span>
                      </div>
                    </div>

                    {/* Booking Actions */}
                    <div className="pt-3 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => {
                          const leadPerson = WORKFORCE_DATA.find(p => p.id === 'wf-engr-emmanuel-lead') || WORKFORCE_DATA[0];
                          handleBooking(leadPerson);
                        }}
                        className="bg-amber-500 text-neutral-950 hover:bg-neutral-900 hover:text-white px-6 py-3 font-black text-xs uppercase tracking-widest inline-flex items-center gap-2 transition-all cursor-pointer shadow-lg active:scale-95 rounded-lg whitespace-nowrap"
                      >
                        <HardHat className="w-4 h-4" />
                        <span>Deploy Engineer Emmanuel (₦95,000 / Day)</span>
                      </button>

                      <a
                        href="https://wa.me/2348063342947?text=Hello%20Clasqo,%20I%20would%20like%20to%20request%20Engineer%20Emmanuel%20for%20our%20construction%20project%20supervision%20and%20line%20pump%20setup."
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`border px-5 py-3 font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-all cursor-pointer rounded-lg whitespace-nowrap ${
                          isLightMode 
                            ? 'border-neutral-300 text-neutral-800 hover:bg-neutral-100' 
                            : 'border-[#1E2E5B] text-neutral-300 hover:bg-[#121c3b] hover:text-white'
                        }`}
                      >
                        <PhoneCall className="w-4 h-4 text-emerald-400" />
                        <span>Direct Field Dispatch WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </section>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Personnel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPersonnel.map((person) => {
            const currentDays = bookingDays[person.id] || 3;
            const subtotal = person.dailyRateNgn * currentDays;

            return (
              <div
                key={person.id}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm hover:border-amber-500/50 hover:shadow-md transition-all duration-200"
              >
                <div>
                  {/* Photo & Quick Info Overlay */}
                  <div className="relative aspect-4/3 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <img
                      src={person.image}
                      alt={person.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                    {/* Top status info */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                      <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md font-medium">
                        {person.availability}
                      </span>
                      {person.hasVideoDemo && (
                        <button
                          onClick={() => setActiveVideoModal(person)}
                          className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-2.5 py-1 rounded-md font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shadow-sm"
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                          <span>Video Clip</span>
                        </button>
                      )}
                    </div>

                    {/* Bottom overlay title */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="text-lg font-bold tracking-tight leading-tight">{person.name}</div>
                      <div className="text-xs text-amber-300 font-medium mt-0.5">{person.roleTitle}</div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-4">
                    {/* Rating, Experience, & Projects */}
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-b pb-3 border-slate-100 dark:border-slate-800/80">
                      <div className="flex items-center gap-1.5">
                        <div className="flex text-amber-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="font-semibold text-slate-900 dark:text-white tabular-nums">{person.rating}</span>
                        <span>({person.reviewCount})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>{person.yearsExperience} yrs exp</span>
                        <span aria-hidden="true">·</span>
                        <span>{person.completedProjects} pours</span>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {person.bio}
                    </p>

                    {/* Key Technical Skills */}
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-semibold tracking-wider uppercase text-slate-400">Equipment & Skills</div>
                      <div className="flex flex-wrap gap-1.5">
                        {person.equipmentSpecialization.slice(0, 2).map((eq, i) => (
                          <span
                            key={i}
                            className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                          >
                            {eq}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Rates Section */}
                    <div className="pt-2 flex items-baseline justify-between">
                      <div>
                        <div className="text-xs text-slate-400">Daily Rate</div>
                        <div className="text-base font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                          ₦{person.dailyRateNgn.toLocaleString()} <span className="text-xs font-normal text-slate-500">/ day</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-400">Monthly Contract</div>
                        <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 font-mono tabular-nums">
                          ₦{person.monthlyRateNgn.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
                  {/* Days Multiplier Controller */}
                  <div className="flex items-center justify-between text-xs pt-3">
                    <span className="text-slate-500">Shift Duration:</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateDays(person.id, -1)}
                        className="w-6 h-6 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center font-bold text-slate-700 dark:text-slate-200"
                        title="Decrease shift days"
                      >
                        -
                      </button>
                      <span className="w-10 text-center font-mono font-semibold text-slate-900 dark:text-white tabular-nums">
                        {currentDays} {currentDays === 1 ? 'day' : 'days'}
                      </span>
                      <button
                        onClick={() => updateDays(person.id, 1)}
                        className="w-6 h-6 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center font-bold text-slate-700 dark:text-slate-200"
                        title="Increase shift days"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedPersonnel(person)}
                      className="px-3 py-2 text-xs font-medium border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap text-slate-700 dark:text-slate-300 text-center"
                    >
                      Reviews & Specs
                    </button>
                    <button
                      onClick={() => handleBooking(person)}
                      className="px-3 py-2 text-xs font-semibold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors whitespace-nowrap text-center shadow-sm"
                    >
                      Book (₦{subtotal.toLocaleString()})
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detail & Reviews Modal Drawer */}
        {selectedPersonnel && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-start justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedPersonnel.image}
                    alt={selectedPersonnel.name}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                  />
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">{selectedPersonnel.name}</h2>
                    <p className="text-sm text-amber-500 font-medium">{selectedPersonnel.roleTitle}</p>
                    <p className="text-xs text-slate-500">{selectedPersonnel.location}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPersonnel(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Bio & Certifications */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Professional Summary</h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{selectedPersonnel.bio}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Accreditations</h4>
                  <ul className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
                    {selectedPersonnel.certifications.map((c, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-emerald-500">✓</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Specialized Fleet</h4>
                  <ul className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
                    {selectedPersonnel.equipmentSpecialization.map((eq, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-amber-500">■</span> {eq}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Featured Review */}
              {selectedPersonnel.featuredReview && (
                <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-amber-600 dark:text-amber-400">
                      Verified Client Evaluation: {selectedPersonnel.featuredReview.client}
                    </span>
                    <span className="text-slate-400">{selectedPersonnel.featuredReview.date}</span>
                  </div>
                  <div className="text-xs text-slate-500">
                    Project: <span className="font-medium text-slate-700 dark:text-slate-300">{selectedPersonnel.featuredReview.project}</span>
                  </div>
                  <p className="text-sm italic text-slate-800 dark:text-slate-200">
                    "{selectedPersonnel.featuredReview.comment}"
                  </p>
                </div>
              )}

              {/* Modal Action CTA */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                <div>
                  <div className="text-xs text-slate-400">Standard Daily Rate</div>
                  <div className="text-lg font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                    ₦{selectedPersonnel.dailyRateNgn.toLocaleString()} / day
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleBooking(selectedPersonnel);
                    setSelectedPersonnel(null);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-colors whitespace-nowrap shadow-md"
                >
                  Confirm & Add to Quote
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Video Clip Showcase Modal */}
        {activeVideoModal && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-slate-900 rounded-2xl max-w-2xl w-full border border-slate-800 shadow-2xl p-6 space-y-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">{activeVideoModal.name}</h3>
                  <p className="text-xs text-amber-400">{activeVideoModal.videoDemoTitle || 'Operational Site Demonstration'}</p>
                </div>
                <button
                  onClick={() => setActiveVideoModal(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Visual Simulation Player Box */}
              <div className="relative aspect-16/9 rounded-xl overflow-hidden bg-black border border-slate-800 flex items-center justify-center">
                <img
                  src={activeVideoModal.image}
                  alt={activeVideoModal.name}
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-center p-6 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-amber-500/90 text-slate-950 flex items-center justify-center shadow-xl animate-pulse">
                    <svg className="w-8 h-8 fill-current ml-1" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <div className="text-sm font-semibold tracking-wide text-white">
                    4K Operational Field Verification Clip
                  </div>
                  <p className="text-xs text-slate-300 max-w-md">
                    Showing real-time remote boom pump maneuvering, hydraulic pressure safety bleed testing, and laser screed concrete compaction.
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    handleBooking(activeVideoModal);
                    setActiveVideoModal(null);
                  }}
                  className="px-5 py-2 text-xs font-bold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors whitespace-nowrap"
                >
                  Add {activeVideoModal.name} to Quote
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
