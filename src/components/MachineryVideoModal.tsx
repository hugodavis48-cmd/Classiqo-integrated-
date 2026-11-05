/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Volume2, VolumeX, Eye, Info, Activity, ShieldCheck, Video, HelpCircle } from 'lucide-react';
import { Machinery } from '../types';
import { handleImageError } from '../utils/imageFallback';

interface MachineryVideoModalProps {
  machinery: Machinery | null;
  onClose: () => void;
}

export default function MachineryVideoModal({ machinery, onClose }: MachineryVideoModalProps) {
  if (!machinery) return null;

  const [isPlaying, setIsPlaying] = useState(true);
  const [playMode, setPlayMode] = useState<'simulation' | 'youtube'>('simulation');
  const [playbackTime, setPlaybackTime] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [rpm, setRpm] = useState(1200);
  const [pressure, setPressure] = useState(12.4);
  const [efficiency, setEfficiency] = useState(94);
  const [angle, setAngle] = useState(42);

  // Playback timer simulator
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlaybackTime((prev) => (prev >= 60 ? 0 : prev + 1));
        
        // Dynamic simulated telemetry fluctuating realistically
        setRpm((prev) => {
          const delta = Math.floor(Math.random() * 80) - 40;
          const target = machinery.category === 'excavator' ? 1800 : 1350;
          const next = prev + delta;
          return next < target - 150 ? target - 100 : next > target + 150 ? target + 100 : next;
        });

        setPressure((prev) => {
          const delta = (Math.random() * 1.2 - 0.6);
          const next = prev + delta;
          return next < 5 ? 8 : next > 22 ? 15 : parseFloat(next.toFixed(1));
        });

        setEfficiency((prev) => {
          const delta = Math.floor(Math.random() * 3) - 1;
          const next = prev + delta;
          return next < 88 ? 91 : next > 99 ? 96 : next;
        });

        setAngle((prev) => {
          const delta = Math.floor(Math.random() * 4) - 2;
          const next = prev + delta;
          return next < 10 ? 25 : next > 85 ? 60 : next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, machinery]);

  // Handle restarting video simulation
  const handleReset = () => {
    setPlaybackTime(0);
    setIsPlaying(true);
  };

  const getTelemetryLabels = () => {
    switch (machinery.category) {
      case 'concrete':
        return {
          metric1: 'PUMPING STROKE RATE',
          metric1Val: `${Math.floor(rpm / 60)} Hz`,
          metric2: 'DELIVERY SYSTEM BAR',
          metric2Val: `${pressure * 10} Bar`,
          metric3: 'BOOM STABILITY',
          metric3Val: `${efficiency}% ACTIVE`,
          metric4: 'DISCHARGE ANGLE',
          metric4Val: `${angle}° VERT`
        };
      case 'excavator':
        return {
          metric1: 'ENGINE SPEED RPM',
          metric1Val: `${rpm} RPM`,
          metric2: 'ARM CYLINDER HYD',
          metric2Val: `${pressure * 12} Bar`,
          metric3: 'BUCKET PEAK LOAD',
          metric3Val: `${efficiency - 15} Tons`,
          metric4: 'BOOM EXCAVATION ROT',
          metric4Val: `${angle}° SWING`
        };
      case 'crane':
        return {
          metric1: 'WINCH LINE SPEED',
          metric1Val: `${Math.floor(rpm / 40)} m/min`,
          metric2: 'BOOM ANGLE/LOAD LIMIT',
          metric2Val: `${pressure * 8} Tons`,
          metric3: 'OUTRIGGER TORQUE',
          metric3Val: `${efficiency}% OK`,
          metric4: 'SLEWING SWING VALUE',
          metric4Val: `${angle}° AZIMUTH`
        };
      case 'drilling':
        return {
          metric1: 'ROTARY DRILL TORQUE',
          metric1Val: `${(pressure * 15).toFixed(0)} kN.m`,
          metric2: 'WINCH LINE PULL',
          metric2Val: `${rpm / 8} kN`,
          metric3: 'PILE DEPTH FEEDED',
          metric3Val: `${Math.floor(playbackTime * 1.2)} Meters`,
          metric4: 'MAST VERTICALITY',
          metric4Val: `${(99.9 - (100 - efficiency) / 20).toFixed(2)}%`
        };
      case 'road':
        return {
          metric1: 'VIBRATION FREQ',
          metric1Val: `${Math.floor(rpm / 40)} Hz`,
          metric2: 'COMPACTION FORCE',
          metric2Val: `${(pressure * 18).toFixed(0)} kN`,
          metric3: 'ROLLER CRITICAL HEAT',
          metric3Val: '78.5° C',
          metric4: 'GRADEABILITY COMP',
          metric4Val: `${Math.floor(angle / 2)}%`
        };
      default:
        return {
          metric1: 'ENGINE PARAMETERS',
          metric1Val: `${rpm} RPM`,
          metric2: 'HYDRAULIC PISTON',
          metric2Val: `${pressure} MPa`,
          metric3: 'WORK EFFICIENCY',
          metric3Val: `${efficiency}%`,
          metric4: 'SWING ANGLE MET',
          metric4Val: `${angle}°`
        };
    }
  };

  const telemetry = getTelemetryLabels();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#060a1a] border border-[#182747] text-neutral-100 flex flex-col md:flex-row shadow-2xl">
        
        {/* Main Video Screen Section (Left/Top) */}
        <div className="flex-1 flex flex-col bg-black relative min-h-[280px] sm:min-h-[420px] justify-between overflow-hidden">
          
          {/* Video Header Overlay */}
          <div className="absolute top-0 inset-x-0 bg-gradient-to-b from-[#060a1a]/95 to-transparent p-4 flex justify-between items-center z-10 font-mono text-[10px]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-ping shrink-0" />
              <span className="font-extrabold text-amber-500 tracking-wider">
                ACTIVE MONITOR: {machinery.model}
              </span>
            </div>
            <div className="flex items-center gap-2 text-neutral-400">
              <span className="border border-[#182747] px-2 py-0.5 uppercase">
                {playMode === 'simulation' ? 'SIM HUDS' : 'REMOTE RAW'}
              </span>
              <span>•</span>
              <span>UTC MON</span>
            </div>
          </div>

          {/* Render Active Player */}
          <div className="relative flex-1 flex items-center justify-center">
            {playMode === 'simulation' ? (
              /* High Tech Simulation Overlay over machinery photo */
              <div className="relative w-full h-full min-h-[220px] flex items-center justify-center">
                <img 
                  src={machinery.image} 
                  alt={machinery.name} 
                  className={`absolute inset-0 w-full h-full object-cover opacity-35 ${isPlaying ? 'brightness-95 contrast-105 saturate-120' : 'brightness-50 grayscale transition-all'}`}
                  referrerPolicy="no-referrer"
                  onError={(e) => handleImageError(e)}
                />
                
                {/* Immersive HUD Overlay Grid */}
                <div className="absolute inset-0 bg-[#080d22]/15 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.85))] pointer-events-none" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                
                {/* Center crosshairs */}
                <div className="absolute w-24 h-24 border border-amber-500/10 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 border-t border-b border-l border-r border-amber-500/30 rounded-full" />
                </div>
                <div className="absolute w-48 h-0.5 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent animate-pulse" style={{ top: `${(playbackTime * 1.5) % 95}%` }} />

                {/* Left Live Telemetry Column */}
                <div className="absolute left-4 bottom-16 sm:bottom-20 z-10 flex flex-col gap-2 pointer-events-none font-mono">
                  <div className="bg-[#060a1a]/95 border border-[#182747] p-2.5 tracking-tight space-y-1 text-[9px] min-w-[130px]">
                    <span className="text-[8px] text-neutral-500 block uppercase font-bold tracking-widest">{telemetry.metric1}</span>
                    <span className="text-amber-500 font-extrabold text-xs">{isPlaying ? telemetry.metric1Val : 'STND_BY'}</span>
                  </div>
                  <div className="bg-[#060a1a]/95 border border-[#182747] p-2.5 tracking-tight space-y-1 text-[9px] min-w-[130px]">
                    <span className="text-[8px] text-neutral-500 block uppercase font-bold tracking-widest">{telemetry.metric2}</span>
                    <span className="text-white font-extrabold text-xs">{isPlaying ? telemetry.metric2Val : 'SYSTEM_OFF'}</span>
                  </div>
                </div>

                {/* Right Live Telemetry Column */}
                <div className="absolute right-4 bottom-16 sm:bottom-20 z-10 flex flex-col gap-2 pointer-events-none font-mono">
                  <div className="bg-[#060a1a]/95 border border-[#182747] p-2.5 tracking-tight space-y-1 text-[9px] text-right min-w-[130px]">
                    <span className="text-[8px] text-neutral-500 block uppercase font-bold tracking-widest">{telemetry.metric3}</span>
                    <span className="text-white font-extrabold text-xs">{isPlaying ? telemetry.metric3Val : 'SYS_STBY'}</span>
                  </div>
                  <div className="bg-[#060a1a]/95 border border-[#182747] p-2.5 tracking-tight space-y-1 text-[9px] text-right min-w-[130px]">
                    <span className="text-[8px] text-neutral-500 block uppercase font-bold tracking-widest">{telemetry.metric4}</span>
                    <span className="text-amber-500 font-extrabold text-xs">{isPlaying ? telemetry.metric4Val : 'ANGLE_HOLD'}</span>
                  </div>
                </div>

                {/* Simulation control elements */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  {!isPlaying && (
                    <button 
                      onClick={() => setIsPlaying(true)}
                      className="bg-amber-500 text-neutral-950 p-4 rounded-none hover:bg-white hover:scale-105 transition-all shadow-xl"
                    >
                      <Play className="w-8 h-8 fill-current" />
                    </button>
                  )}
                </div>

                {/* Floating alert logs ticker inside simulation */}
                <div className="absolute left-4 top-14 bg-neutral-950/85 border border-[#182747] px-2.5 py-1 text-[8px] font-mono text-emerald-400 font-bold tracking-wider rounded-none uppercase flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  <span>DECODER CORE SANY SOURCING ACTIVE [OK]</span>
                </div>
              </div>
            ) : (
              /* Real YouTube Live action embed video screen */
              <div className="absolute inset-0 w-full h-full">
                <iframe
                  width="100%"
                  height="100%"
                  src={`${machinery.videoUrl}?autoplay=1&mute=1&loop=1&playlist=${machinery.videoUrl?.split('/').pop()}`}
                  title={`${machinery.name} Demonstration`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            )}
          </div>

          {/* Interactive Player Controls Footer bar */}
          <div className="bg-[#060a1a] border-t border-[#182747] px-4 py-3 sm:py-4 flex items-center justify-between z-10 gap-4">
            <div className="flex items-center gap-2">
              {playMode === 'simulation' ? (
                <>
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1.5 text-neutral-300 hover:text-amber-500 focus:outline-none transition-colors"
                    title={isPlaying ? 'Pause simulation' : 'Play simulation'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>
                  <button 
                    onClick={handleReset}
                    className="p-1.5 text-neutral-300 hover:text-amber-500 focus:outline-none transition-colors"
                    title="Restart feed"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-mono bg-neutral-950 px-2 py-1 border border-[#101933]">
                  <Video className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                  <span>SANY GLOBAL STREAM</span>
                </div>
              )}
            </div>

            {/* Time scrub placeholder */}
            <div className="flex-1 max-w-sm hidden sm:flex items-center gap-3 text-[10px] font-mono text-neutral-400">
              <span>00:{playbackTime.toString().padStart(2, '0')}</span>
              <div className="flex-1 h-1 bg-neutral-850 relative overflow-hidden">
                <div 
                  className="absolute top-0 bottom-0 left-0 bg-amber-500 transition-all duration-1000"
                  style={{ width: `${(playbackTime / 60) * 100}%` }}
                />
              </div>
              <span>01:00</span>
            </div>

            {/* Embed Switch Mode */}
            <div className="flex gap-1.5">
              <button 
                onClick={() => {
                  setPlayMode('simulation');
                  setIsPlaying(true);
                }}
                className={`px-3 py-1 text-[9px] font-black uppercase tracking-wider font-mono border rounded-none transition-all ${
                  playMode === 'simulation'
                    ? 'bg-amber-500 text-neutral-950 border-amber-500'
                    : 'bg-neutral-950 text-neutral-450 border-[#182747] hover:text-white'
                }`}
              >
                Telemetry HUD
              </button>
              <button 
                onClick={() => setPlayMode('youtube')}
                className={`px-3 py-1 text-[9px] font-black uppercase tracking-wider font-mono border rounded-none transition-all ${
                  playMode === 'youtube'
                    ? 'bg-amber-500 text-neutral-950 border-amber-500'
                    : 'bg-neutral-950 text-neutral-450 border-[#182747] hover:text-white'
                }`}
              >
                Live Video
              </button>
            </div>
          </div>
        </div>

        {/* Machinery Specs Sidebar (Right) */}
        <div className="w-full md:w-72 bg-[#0B122C] border-t md:border-t-0 md:border-l border-[#182747] p-5 flex flex-col justify-between font-sans">
          <div>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-[9px] font-mono font-black text-amber-500 uppercase tracking-widest block">
                  {machinery.brand} OFFICIAL SPECS
                </span>
                <h3 className="text-lg font-black text-white uppercase tracking-tight leading-tight mt-0.5">
                  {machinery.model}
                </h3>
              </div>
              
              <button 
                onClick={onClose}
                className="bg-neutral-900 hover:bg-neutral-850 text-neutral-400 hover:text-white p-1.5 border border-[#182747] cursor-pointer"
                title="Close monitor"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-neutral-400 text-xs leading-relaxed mb-5">
              {machinery.description}
            </p>

            <div className="space-y-4">
              <span className="text-[10px] font-mono font-black text-white uppercase tracking-wide block border-b border-[#182747] pb-1.5">
                TECHNICAL CAPACITY REPORT
              </span>
              <div className="grid grid-cols-1 gap-2 font-mono text-[10px]">
                {Object.entries(machinery.specifications).map(([key, val]) => (
                  <div key={key} className="flex justify-between py-1 border-b border-[#101933] pb-1">
                    <span className="text-neutral-500">{key}:</span>
                    <span className="text-neutral-250 font-semibold text-right">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <span className="text-[10px] font-mono font-black text-white uppercase tracking-wide block border-b border-[#182747] pb-1.5">
                EXECUTIVE HIGHLIGHTS
              </span>
              <ul className="space-y-1.5">
                {machinery.features.slice(0, 2).map((feat, i) => (
                  <li key={i} className="text-[10px] text-neutral-400 leading-snug flex items-start gap-1.5">
                    <span className="text-amber-500 shrink-0 select-none">•</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-[#182747] flex flex-col gap-2">
            <span className="text-[11px] text-neutral-450 text-center font-mono font-bold block">
              LAGOS DEPOT HOURLY RENTAL:
            </span>
            <span className="text-xl text-center text-amber-500 font-mono font-black">
              {new Intl.NumberFormat('en-NG', {
                style: 'currency',
                currency: 'NGN',
                maximumFractionDigits: 0
              }).format(machinery.dailyRateNgn)} <span className="text-[10px] font-normal text-neutral-450">/ Day</span>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
