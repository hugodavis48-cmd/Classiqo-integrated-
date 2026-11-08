/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GALLERY_PROJECTS } from '../data/galleryData';
import { GalleryProject } from '../types';
import { handleImageError, DEFAULT_GALLERY_FALLBACK } from '../utils/imageFallback';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize2, 
  Minimize2, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Info, 
  FileText, 
  MapPin, 
  Calendar, 
  Wrench, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Eye,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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
  
  // Lightbox State
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panPosition, setPanPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showInfoHud, setShowInfoHud] = useState<boolean>(true);
  const [showThumbnails, setShowThumbnails] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const lightboxContainerRef = useRef<HTMLDivElement>(null);

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

  const currentLightboxProject: GalleryProject | null = 
    activeLightboxIndex !== null && filteredProjects[activeLightboxIndex]
      ? filteredProjects[activeLightboxIndex]
      : null;

  // Open Lightbox for a project
  const handleOpenLightbox = (project: GalleryProject, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const index = filteredProjects.findIndex((p) => p.id === project.id);
    if (index !== -1) {
      setActiveLightboxIndex(index);
      setZoomLevel(1);
      setPanPosition({ x: 0, y: 0 });
    }
  };

  const handleCloseLightbox = useCallback(() => {
    setActiveLightboxIndex(null);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    setIsFullscreen(false);
  }, []);

  const handleNextPhoto = useCallback(() => {
    if (filteredProjects.length === 0) return;
    setActiveLightboxIndex((prev) => 
      prev === null ? 0 : (prev + 1) % filteredProjects.length
    );
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  }, [filteredProjects.length]);

  const handlePrevPhoto = useCallback(() => {
    if (filteredProjects.length === 0) return;
    setActiveLightboxIndex((prev) => 
      prev === null ? 0 : (prev - 1 + filteredProjects.length) % filteredProjects.length
    );
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  }, [filteredProjects.length]);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setPanPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const handleToggleZoom = () => {
    if (zoomLevel === 1) {
      setZoomLevel(2);
    } else {
      handleResetZoom();
    }
  };

  const handleToggleFullscreen = () => {
    if (!lightboxContainerRef.current) return;

    if (!document.fullscreenElement) {
      lightboxContainerRef.current.requestFullscreen?.().then(() => {
        setIsFullscreen(true);
      }).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => {
        setIsFullscreen(false);
      }).catch(() => {});
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (activeLightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseLightbox();
      } else if (e.key === 'ArrowRight') {
        handleNextPhoto();
      } else if (e.key === 'ArrowLeft') {
        handlePrevPhoto();
      } else if (e.key === '+' || e.key === '=') {
        handleZoomIn();
      } else if (e.key === '-' || e.key === '_') {
        handleZoomOut();
      } else if (e.key === '0') {
        handleResetZoom();
      } else if (e.key === 'i' || e.key === 'I') {
        setShowInfoHud((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, handleCloseLightbox, handleNextPhoto, handlePrevPhoto]);

  // Mouse pan handlers when zoomed in
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setPanPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className={`py-12 px-4 sm:px-6 lg:px-8 transition-colors ${isLightMode ? 'bg-[#F4F6FA] text-[#0C122C]' : 'bg-[#080D22] text-neutral-100'}`}>
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-8 ${isLightMode ? 'border-neutral-200' : 'border-[#182747]'}`}>
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-amber-500">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>ENGINEERING PORTFOLIO</span>
              <span>•</span>
              <span>LAGOS CIVIL PROJECTS</span>
              <span>•</span>
              <span>HEAVY FLEET DEPLOYMENTS</span>
            </div>
            <h1 className={`text-3xl sm:text-4xl font-black uppercase tracking-tight ${isLightMode ? 'text-[#0C122C]' : 'text-white'}`}>
              Company Project Gallery & Field Deployments
            </h1>
            <p className={`text-xs sm:text-sm leading-relaxed ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
              Inspect high-resolution photographic records of critical heavy civil engineering milestones executed across Nigeria. Click any image to launch the high-resolution machinery lightbox.
            </p>
          </div>

          {/* Quick Stat Highlights */}
          <div className={`flex items-center gap-6 p-4 border shrink-0 ${isLightMode ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#060a1a] border-[#182747]'}`}>
            <div>
              <div className="text-2xl font-black font-mono text-amber-500">180K+</div>
              <div className="text-[10px] uppercase font-mono text-neutral-500 tracking-wider">m³ Concrete Poured</div>
            </div>
            <div className={`w-px h-8 ${isLightMode ? 'bg-neutral-200' : 'bg-neutral-800'}`} />
            <div>
              <div className="text-2xl font-black font-mono text-emerald-400">0.02%</div>
              <div className="text-[10px] uppercase font-mono text-neutral-500 tracking-wider">Pipeline Halt Rate</div>
            </div>
            <div className={`w-px h-8 ${isLightMode ? 'bg-neutral-200' : 'bg-neutral-800'}`} />
            <div>
              <div className="text-2xl font-black font-mono text-amber-500">100%</div>
              <div className="text-[10px] uppercase font-mono text-neutral-500 tracking-wider">On-Time Rafts</div>
            </div>
          </div>
        </div>

        {/* Filter Bar & Lightbox Hint */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className={`flex flex-wrap items-center gap-1.5 p-1.5 border ${isLightMode ? 'bg-white border-neutral-200 shadow-xs' : 'bg-[#060a1a] border-[#182747]'}`}>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const count = cat.id === 'all' 
                ? GALLERY_PROJECTS.length 
                : GALLERY_PROJECTS.filter((p) => p.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-xs font-mono font-bold uppercase transition-all tracking-wider whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-neutral-950 font-black shadow-sm'
                      : isLightMode
                        ? 'text-neutral-600 hover:text-black hover:bg-neutral-100'
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-900/60'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`ml-1.5 text-[9px] px-1 py-0.2 ${isActive ? 'bg-black/20 text-neutral-950' : 'text-neutral-500'}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
            <Eye className="w-3.5 h-3.5 text-amber-500" />
            <span>Click photo to open High-Res Lightbox</span>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className={`group border transition-all duration-300 flex flex-col justify-between overflow-hidden relative ${
                isLightMode 
                  ? 'bg-white border-neutral-200 shadow-sm hover:border-amber-500 hover:shadow-xl' 
                  : 'bg-[#060a1a] border-[#182747] hover:border-amber-500/80 hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
              }`}
            >
              <div>
                {/* Image Container with Direct Lightbox Trigger */}
                <div 
                  onClick={(e) => handleOpenLightbox(project, e)}
                  className="relative aspect-16/10 w-full overflow-hidden bg-black cursor-pointer group/img"
                  title="Click to view high-resolution photo in Lightbox"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover/img:scale-108 transition-transform duration-500"
                    onError={(e) => handleImageError(e, DEFAULT_GALLERY_FALLBACK)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs text-white z-10">
                    <span className="bg-amber-500 text-neutral-950 font-mono text-[9px] font-black uppercase px-2 py-0.5 tracking-wider shadow">
                      {project.tag}
                    </span>
                    <span className="bg-black/70 backdrop-blur-md px-2 py-0.5 text-[10px] font-mono font-bold text-neutral-300 border border-white/10">
                      {project.completionYear}
                    </span>
                  </div>

                  {/* Hover Lightbox Indicator Center Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 z-10 bg-black/40 backdrop-blur-[2px]">
                    <div className="bg-amber-500 text-neutral-950 px-4 py-2 font-mono text-xs font-black uppercase tracking-wider shadow-2xl flex items-center gap-2 transform translate-y-2 group-hover/img:translate-y-0 transition-transform">
                      <ZoomIn className="w-4 h-4" />
                      <span>Open High-Res Lightbox</span>
                    </div>
                  </div>

                  {/* Bottom Image Title */}
                  <div className="absolute bottom-3 left-3 right-3 text-white z-10">
                    <div className="text-[10px] text-amber-400 font-mono uppercase tracking-wider flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>{project.location}</span>
                    </div>
                    <div className="text-sm font-black uppercase tracking-tight mt-0.5 group-hover/img:text-amber-400 transition-colors line-clamp-1">
                      {project.title}
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-4">
                  {/* Client & Scope summary */}
                  <div className="text-xs font-mono text-neutral-400 flex items-center justify-between">
                    <span>Client: <strong className={isLightMode ? 'text-neutral-800' : 'text-neutral-200'}>{project.client}</strong></span>
                  </div>

                  <p className={`text-xs leading-relaxed line-clamp-2 ${isLightMode ? 'text-neutral-600' : 'text-neutral-300'}`}>
                    {project.scope}
                  </p>

                  {/* Key Metrics Chips */}
                  <div className={`grid grid-cols-2 gap-2 pt-2 border-t ${isLightMode ? 'border-neutral-100' : 'border-neutral-800/80'}`}>
                    {project.metrics.slice(0, 2).map((m, i) => (
                      <div key={i} className={`p-2 font-mono border ${isLightMode ? 'bg-neutral-50 border-neutral-200' : 'bg-[#0B1535] border-[#182747]'}`}>
                        <div className="text-[9px] text-neutral-500 uppercase">{m.label}</div>
                        <div className={`text-xs font-black tabular-nums mt-0.5 ${isLightMode ? 'text-neutral-900' : 'text-white'}`}>
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Actions: Specs Modal & Lightbox Trigger */}
              <div className={`px-5 py-3 border-t flex items-center justify-between text-xs font-mono font-bold ${
                isLightMode ? 'bg-neutral-50/80 border-neutral-200 text-neutral-700' : 'bg-[#0B122C]/60 border-[#182747] text-neutral-300'
              }`}>
                <button
                  onClick={() => setActiveProjectModal(project)}
                  className="hover:text-amber-500 transition-colors cursor-pointer uppercase text-[10px] tracking-wider flex items-center gap-1"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-500" />
                  <span>Technical Specs</span>
                </button>

                <button
                  onClick={(e) => handleOpenLightbox(project, e)}
                  className="text-amber-500 hover:text-amber-400 transition-colors cursor-pointer uppercase text-[10px] tracking-wider flex items-center gap-1"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Lightbox Photo →</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ============================================================== */}
        {/* ADVANCED FULL-SCREEN HIGH-RESOLUTION LIGHTBOX MODAL */}
        {/* ============================================================== */}
        <AnimatePresence>
          {activeLightboxIndex !== null && currentLightboxProject && (
            <motion.div
              ref={lightboxContainerRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between select-none overflow-hidden"
              onClick={handleCloseLightbox}
            >
              {/* TOP TOOLBAR */}
              <div 
                onClick={(e) => e.stopPropagation()} 
                className="w-full bg-gradient-to-b from-black/95 via-black/80 to-transparent p-4 sm:px-6 z-30 flex items-center justify-between gap-4 border-b border-white/10"
              >
                {/* Left: Photo Info & Counter */}
                <div className="flex items-center gap-3">
                  <div className="bg-amber-500 text-neutral-950 font-black font-mono text-xs px-2.5 py-1 uppercase tracking-wider">
                    {String(activeLightboxIndex + 1).padStart(2, '0')} / {String(filteredProjects.length).padStart(2, '0')}
                  </div>
                  <div className="hidden sm:block">
                    <h3 className="text-sm font-black text-white uppercase tracking-tight truncate max-w-md">
                      {currentLightboxProject.title}
                    </h3>
                    <p className="text-[10.5px] font-mono text-neutral-400 flex items-center gap-2">
                      <span>{currentLightboxProject.location}</span>
                      <span>•</span>
                      <span className="text-amber-400">{currentLightboxProject.tag}</span>
                    </p>
                  </div>
                </div>

                {/* Right: Controls (Zoom In, Zoom Out, Reset, Info HUD, Fullscreen, Close) */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {/* Zoom Controls */}
                  <div className="flex items-center bg-neutral-900/90 border border-neutral-700/80 px-1 py-0.5">
                    <button
                      onClick={handleZoomOut}
                      disabled={zoomLevel <= 1}
                      className="p-1.5 text-neutral-300 hover:text-white disabled:opacity-30 disabled:hover:text-neutral-300 transition-colors cursor-pointer"
                      title="Zoom Out (-)"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <span className="font-mono text-[10px] text-amber-400 font-bold px-2 tabular-nums">
                      {Math.round(zoomLevel * 100)}%
                    </span>
                    <button
                      onClick={handleZoomIn}
                      disabled={zoomLevel >= 3}
                      className="p-1.5 text-neutral-300 hover:text-white disabled:opacity-30 disabled:hover:text-neutral-300 transition-colors cursor-pointer"
                      title="Zoom In (+)"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleResetZoom}
                      className="p-1.5 text-neutral-300 hover:text-amber-400 border-l border-neutral-700 transition-colors cursor-pointer"
                      title="Reset Zoom (0)"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Toggle Info HUD */}
                  <button
                    onClick={() => setShowInfoHud(!showInfoHud)}
                    className={`p-2 border transition-colors cursor-pointer ${
                      showInfoHud 
                        ? 'bg-amber-500 text-neutral-950 border-amber-500 font-bold' 
                        : 'bg-neutral-900/80 text-neutral-300 border-neutral-700 hover:text-white'
                    }`}
                    title="Toggle Specs HUD (I)"
                  >
                    <Info className="w-4 h-4" />
                  </button>

                  {/* Fullscreen Toggle */}
                  <button
                    onClick={handleToggleFullscreen}
                    className="p-2 bg-neutral-900/80 text-neutral-300 border border-neutral-700 hover:text-white transition-colors cursor-pointer hidden sm:block"
                    title="Toggle Fullscreen"
                  >
                    {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>

                  {/* Close Lightbox */}
                  <button
                    onClick={handleCloseLightbox}
                    className="p-2 bg-red-600/90 hover:bg-red-500 text-white font-bold transition-colors cursor-pointer border border-red-500 flex items-center gap-1"
                    title="Close Lightbox (ESC)"
                  >
                    <X className="w-4 h-4" />
                    <span className="text-[10px] font-mono hidden sm:inline uppercase">ESC</span>
                  </button>
                </div>
              </div>

              {/* MAIN IMAGE DISPLAY AREA */}
              <div 
                className="relative flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                {/* Previous Image Arrow */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevPhoto();
                  }}
                  className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 bg-black/80 hover:bg-amber-500 hover:text-neutral-950 text-white border border-white/20 transition-all flex items-center justify-center cursor-pointer shadow-2xl active:scale-95 group"
                  title="Previous Photo (←)"
                >
                  <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
                </button>

                {/* Next Image Arrow */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextPhoto();
                  }}
                  className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 bg-black/80 hover:bg-amber-500 hover:text-neutral-950 text-white border border-white/20 transition-all flex items-center justify-center cursor-pointer shadow-2xl active:scale-95 group"
                  title="Next Photo (→)"
                >
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
                </button>

                {/* Centered High-Res Photo Container */}
                <div 
                  onClick={(e) => e.stopPropagation()}
                  onDoubleClick={handleToggleZoom}
                  className="relative max-w-full max-h-full flex items-center justify-center transition-transform duration-150 ease-out"
                  style={{
                    transform: `scale(${zoomLevel}) translate(${panPosition.x / zoomLevel}px, ${panPosition.y / zoomLevel}px)`,
                  }}
                >
                  <img
                    key={currentLightboxProject.id}
                    src={currentLightboxProject.image}
                    alt={currentLightboxProject.title}
                    referrerPolicy="no-referrer"
                    className="max-h-[75vh] max-w-[92vw] object-contain shadow-2xl border border-white/10"
                    onError={(e) => handleImageError(e, DEFAULT_GALLERY_FALLBACK)}
                  />

                  {zoomLevel > 1 && (
                    <div className="absolute top-2 right-2 bg-black/80 text-amber-400 font-mono text-[9px] px-2 py-0.5 uppercase tracking-wider border border-amber-500/40 pointer-events-none">
                      Drag to Pan • Double-click to Reset
                    </div>
                  )}
                </div>
              </div>

              {/* BOTTOM HUD: INFO OVERLAY & THUMBNAIL STRIP */}
              <div 
                onClick={(e) => e.stopPropagation()}
                className="w-full bg-gradient-to-t from-black via-black/95 to-transparent z-30 border-t border-white/10"
              >
                {/* Engineering Info HUD Overlay */}
                <AnimatePresence>
                  {showInfoHud && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden px-4 sm:px-6 py-3 border-b border-neutral-800"
                    >
                      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1 max-w-2xl">
                          <div className="flex flex-wrap items-center gap-2 font-mono text-[10px]">
                            <span className="text-amber-400 font-black uppercase">
                              ★ {currentLightboxProject.tag}
                            </span>
                            <span className="text-neutral-500">•</span>
                            <span className="text-neutral-300 font-bold">{currentLightboxProject.client}</span>
                            <span className="text-neutral-500">•</span>
                            <span className="text-neutral-400">{currentLightboxProject.location}</span>
                          </div>
                          <h4 className="text-sm sm:text-base font-black text-white uppercase tracking-tight">
                            {currentLightboxProject.title}
                          </h4>
                          <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                            {currentLightboxProject.scope}
                          </p>
                        </div>

                        {/* Quick Fleet Tags & CTAs */}
                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                          <button
                            onClick={() => {
                              handleCloseLightbox();
                              setActiveProjectModal(currentLightboxProject);
                            }}
                            className="px-3 py-2 bg-neutral-900 hover:bg-neutral-800 text-amber-400 border border-amber-500/40 font-mono text-xs font-bold uppercase tracking-wider cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5 inline mr-1" />
                            <span>Full Civil Specs</span>
                          </button>
                          
                          <button
                            onClick={() => {
                              handleCloseLightbox();
                              if (onNavigateToQuote) onNavigateToQuote();
                            }}
                            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-mono text-xs font-black uppercase tracking-wider cursor-pointer shadow-lg active:scale-95 flex items-center gap-1.5"
                          >
                            <span>Configure Quote</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* THUMBNAIL STRIP */}
                <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
                  <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest shrink-0 hidden sm:block">
                    <span>SECTOR FLEET:</span>
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-thin max-w-full">
                    {filteredProjects.map((p, pIdx) => {
                      const isCurrent = pIdx === activeLightboxIndex;
                      return (
                        <button
                          key={p.id}
                          onClick={() => {
                            setActiveLightboxIndex(pIdx);
                            setZoomLevel(1);
                            setPanPosition({ x: 0, y: 0 });
                          }}
                          className={`relative h-12 w-20 shrink-0 overflow-hidden border-2 transition-all cursor-pointer ${
                            isCurrent
                              ? 'border-amber-500 scale-105 shadow-[0_0_12px_rgba(245,158,11,0.6)]'
                              : 'border-neutral-800 opacity-60 hover:opacity-100 hover:border-neutral-500'
                          }`}
                          title={p.title}
                        >
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-full h-full object-cover"
                            onError={(e) => handleImageError(e, DEFAULT_GALLERY_FALLBACK)}
                          />
                          {isCurrent && (
                            <div className="absolute inset-0 bg-amber-500/15 pointer-events-none" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="text-[10px] font-mono text-neutral-500 shrink-0 hidden md:block">
                    Use <kbd className="px-1 py-0.5 bg-neutral-800 text-neutral-300">←</kbd> <kbd className="px-1 py-0.5 bg-neutral-800 text-neutral-300">→</kbd> or <kbd className="px-1 py-0.5 bg-neutral-800 text-neutral-300">ESC</kbd>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Detailed Specs Project Modal */}
        {activeProjectModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className={`max-w-3xl w-full max-h-[90vh] overflow-y-auto border shadow-2xl p-6 sm:p-8 space-y-6 ${
              isLightMode ? 'bg-white border-neutral-200 text-[#0C122C]' : 'bg-[#060a1a] border-[#182747] text-white'
            }`}>
              {/* Modal Top Bar */}
              <div className="flex items-start justify-between border-b border-neutral-700/30 pb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-500 uppercase tracking-wider">
                    <span>{activeProjectModal.tag}</span>
                    <span>•</span>
                    <span>{activeProjectModal.completionYear}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight mt-1">
                    {activeProjectModal.title}
                  </h2>
                  <p className="text-xs text-neutral-500 font-mono mt-0.5">{activeProjectModal.location}</p>
                </div>
                <button
                  onClick={() => setActiveProjectModal(null)}
                  className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Close Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Full Image with Lightbox Zoom Prompt */}
              <div 
                onClick={() => {
                  handleOpenLightbox(activeProjectModal);
                }}
                className="relative aspect-16/9 overflow-hidden bg-black border border-neutral-700/40 cursor-pointer group/modalimg"
                title="Click to view in full-screen Lightbox"
              >
                <img
                  src={activeProjectModal.image}
                  alt={activeProjectModal.title}
                  className="w-full h-full object-cover group-hover/modalimg:scale-105 transition-transform duration-500"
                  onError={(e) => handleImageError(e, DEFAULT_GALLERY_FALLBACK)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-3 right-3 bg-amber-500 text-neutral-950 font-mono text-[9px] font-black uppercase px-2.5 py-1 tracking-wider shadow flex items-center gap-1.5">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Click For Full Lightbox</span>
                </div>

                <div className="absolute bottom-3 left-3 text-white text-xs font-mono">
                  <span>Photo: High-Resolution On-Site Field Deployment</span>
                </div>
              </div>

              {/* Highlight callout */}
              <div className={`p-4 border font-mono text-xs ${
                isLightMode ? 'bg-amber-500/10 border-amber-500/30 text-neutral-900' : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
              }`}>
                ★ <span className="font-bold">PROJECT BENCHMARK:</span> {activeProjectModal.keyHighlight}
              </div>

              {/* Description & Scope */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-500 font-mono">
                  Technical Scope & Logistics Execution
                </h3>
                <p className={`text-sm leading-relaxed ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  {activeProjectModal.description}
                </p>
                <p className="text-xs text-neutral-500 leading-relaxed font-mono">
                  {activeProjectModal.scope}
                </p>
              </div>

              {/* 4-Column Key Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {activeProjectModal.metrics.map((m, i) => (
                  <div key={i} className={`p-3 border font-mono ${
                    isLightMode ? 'bg-neutral-50 border-neutral-200' : 'bg-[#0B1535] border-[#182747]'
                  }`}>
                    <div className="text-[10px] text-neutral-500 uppercase">{m.label}</div>
                    <div className={`text-base font-black tabular-nums mt-0.5 ${isLightMode ? 'text-neutral-900' : 'text-white'}`}>
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Heavy Machinery & Tooling Deployed */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-500 font-mono">
                  Fleet & Machinery Deployed
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeProjectModal.equipmentDeployed.map((eq, i) => (
                    <div key={i} className={`flex items-center gap-2 text-xs font-mono p-2.5 border ${
                      isLightMode ? 'bg-neutral-50 border-neutral-200 text-neutral-800' : 'bg-[#0B1535]/50 border-[#182747] text-neutral-300'
                    }`}>
                      <Wrench className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{eq}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Bottom CTA */}
              <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t ${
                isLightMode ? 'border-neutral-200' : 'border-[#182747]'
              }`}>
                <div className="text-xs text-neutral-500 font-mono">
                  Client Partner: <strong className={isLightMode ? 'text-neutral-800' : 'text-neutral-200'}>{activeProjectModal.client}</strong>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const proj = activeProjectModal;
                      setActiveProjectModal(null);
                      handleOpenLightbox(proj);
                    }}
                    className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-amber-400 border border-amber-500/40 font-mono text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    <ZoomIn className="w-3.5 h-3.5 inline mr-1" />
                    <span>View High-Res Photo</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveProjectModal(null);
                      if (onNavigateToQuote) onNavigateToQuote();
                    }}
                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black font-mono uppercase text-xs tracking-wider transition-colors shadow-md cursor-pointer"
                  >
                    Configure Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
