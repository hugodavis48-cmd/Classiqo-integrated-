/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { WORKFORCE_DATA } from '../data/workforceData';
import { WorkforcePersonnel } from '../types';

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
