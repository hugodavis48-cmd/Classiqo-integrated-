/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GALLERY_PROJECTS } from '../data/galleryData';
import { GalleryProject } from '../types';
import { handleImageError, DEFAULT_GALLERY_FALLBACK } from '../utils/imageFallback';

interface ProjectGalleryProps {
  onNavigateToQuote?: () => void;
  isLightMode?: boolean;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  onNavigateToQuote,
  isLightMode = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProjectModal, setActiveProjectModal] = useState<GalleryProject | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'concrete', label: 'High-Rise & Slab Casting' },
    { id: 'marine', label: 'Marine & Sea Wall Works' },
    { id: 'infrastructure', label: 'Bridges & Viaducts' },
    { id: 'piling', label: 'Deep Bored Piling' },
  ];

  const filteredProjects = GALLERY_PROJECTS.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  return (
    <div className={`py-12 px-4 sm:px-6 lg:px-8 transition-colors ${isLightMode ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-white'}`}>
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-8 border-slate-200 dark:border-slate-800">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-medium tracking-wide uppercase text-amber-600 dark:text-amber-400">
              <span>Engineering Portfolio</span>
              <span aria-hidden="true">·</span>
              <span>Lagos Civil Projects</span>
              <span aria-hidden="true">·</span>
              <span>Major Infrastructure</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Company Project Gallery & Field Deployments
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Explore critical heavy engineering milestones completed across Nigeria. From deep marine revetments at Eko Atlantic to elevated viaduct rail corridors and 28-story luxury towers.
            </p>
          </div>

          {/* Quick Stat Highlights */}
          <div className="flex items-center gap-6 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm shrink-0">
            <div>
              <div className="text-2xl font-bold font-mono tabular-nums text-amber-500">180K+</div>
              <div className="text-xs text-slate-500">m³ Concrete Poured</div>
            </div>
            <div className="w-px h-8 bg-slate-200 dark:bg-slate-800" />
            <div>
              <div className="text-2xl font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400">0.02%</div>
              <div className="text-xs text-slate-500">Pipeline Halt Rate</div>
            </div>
            <div className="w-px h-8 bg-slate-200 dark:bg-slate-800" />
            <div>
              <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">100%</div>
              <div className="text-xs text-slate-500">On-Time Rafts</div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveProjectModal(project)}
              className="group cursor-pointer rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm hover:border-amber-500/50 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Image Container */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    onError={(e) => handleImageError(e, DEFAULT_GALLERY_FALLBACK)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md font-medium text-amber-300">
                      {project.tag}
                    </span>
                    <span className="bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-[11px]">
                      {project.completionYear}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="text-xs text-slate-300">{project.location}</div>
                    <div className="text-base font-bold leading-snug group-hover:text-amber-400 transition-colors line-clamp-1">
                      {project.title}
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-4">
                  {/* Client & Scope summary */}
                  <div className="text-xs text-slate-500">
                    Client: <span className="font-semibold text-slate-800 dark:text-slate-200">{project.client}</span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {project.scope}
                  </p>

                  {/* Key Metrics Chips */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                    {project.metrics.slice(0, 2).map((m, i) => (
                      <div key={i} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                        <div className="text-[10px] text-slate-400">{m.label}</div>
                        <div className="text-xs font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Click Prompt */}
              <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between text-xs font-medium text-amber-600 dark:text-amber-400">
                <span>View Full Civil Specs & Fleet Deployed</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Lightbox Project Modal */}
        {activeProjectModal && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6">
              {/* Modal Top Bar */}
              <div className="flex items-start justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-500 uppercase tracking-wider">
                    <span>{activeProjectModal.tag}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeProjectModal.completionYear}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                    {activeProjectModal.title}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">{activeProjectModal.location}</p>
                </div>
                <button
                  onClick={() => setActiveProjectModal(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Full Image */}
              <div className="relative aspect-16/9 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
                <img
                  src={activeProjectModal.image}
                  alt={activeProjectModal.title}
                  className="w-full h-full object-cover"
                  onError={(e) => handleImageError(e, DEFAULT_GALLERY_FALLBACK)}
                />
              </div>

              {/* Highlight callout */}
              <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 text-xs text-amber-700 dark:text-amber-300 font-medium">
                ★ <span className="font-bold">Project Benchmark:</span> {activeProjectModal.keyHighlight}
              </div>

              {/* Description & Scope */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Technical Scope & Logistics</h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {activeProjectModal.description}
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {activeProjectModal.scope}
                </p>
              </div>

              {/* 4-Column Key Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {activeProjectModal.metrics.map((m, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <div className="text-[11px] text-slate-400">{m.label}</div>
                    <div className="text-base font-bold font-mono text-slate-900 dark:text-white tabular-nums mt-0.5">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Heavy Machinery & Tooling Deployed */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Fleet & Equipment Deployed</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeProjectModal.equipmentDeployed.map((eq, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                      <span className="text-amber-500">▶</span>
                      <span>{eq}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Bottom CTA */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="text-xs text-slate-500">
                  Client Partner: <span className="font-semibold text-slate-800 dark:text-slate-200">{activeProjectModal.client}</span>
                </div>
                <button
                  onClick={() => {
                    setActiveProjectModal(null);
                    if (onNavigateToQuote) onNavigateToQuote();
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-colors text-center shadow-md text-xs sm:text-sm cursor-pointer"
                >
                  Configure Quote for Similar Project
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
