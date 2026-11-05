/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  mode?: 'full' | 'horizontal' | 'icon';
  className?: string;
  iconSize?: number;
  isLightMode?: boolean;
}

export default function ClasqoLogo({ mode = 'horizontal', className = '', iconSize = 40, isLightMode = false }: LogoProps) {
  // SVG of stylized construction crane integrated with letter CG/CI
  const logoIcon = (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      {/* Background Frame Grid (subtle structural lines like steel engineering) */}
      <circle cx="50" cy="50" r="48" stroke={isLightMode ? "#cbd5e1" : "#1e293b"} strokeWidth="1" strokeDasharray="3 3" />
      <line x1="50" y1="2" x2="50" y2="98" stroke={isLightMode ? "#cbd5e1" : "#1e293b"} strokeWidth="0.5" strokeDasharray="4 4" />
      <line x1="2" y1="50" x2="98" y2="50" stroke={isLightMode ? "#cbd5e1" : "#1e293b"} strokeWidth="0.5" strokeDasharray="4 4" />

      {/* Styled Tower Crane Structure (Gold / Amber #F2A900) */}
      {/* Crane Jib (Horizontal boom) */}
      <path
        d="M10 24H85L68 12H10V24Z"
        fill="#f59e0b"
        fillOpacity="0.1"
        stroke="#f59e0b"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Crane Jib Truss (Internal cross diagonal columns) */}
      <path
        d="M15 24L25 12M25 24L35 12M35 24L45 12M45 24L55 12M55 24L65 12"
        stroke="#d97706"
        strokeWidth="1.5"
      />
      {/* Crane counterweight block */}
      <rect x="18" y="16" width="10" height="5" fill="#f59e0b" />

      {/* Crane Vertical Mast (Torus) on the left */}
      <path
        d="M28 24V90M34 24V90"
        stroke="#f59e0b"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Mast Truss diagonal steel cross braces */}
      <path
        d="M28 32H34M28 44H34M28 56H34M28 68H34M28 80H34"
        stroke="#d97706"
        strokeWidth="1.5"
      />
      <path
        d="M28 24L34 32M28 32L34 44M28 44L34 56M28 56L34 68M28 68L34 80M28 80L34 90"
        stroke="#d97706"
        strokeWidth="1.2"
      />

      {/* Interlocking Block Letters representing CLASQO "C" & "G" / "I" */}
      {/* Block C (White) */}
      <path
        d="M42 36H68V48H54V56H68V68H42V36Z"
        fill={isLightMode ? "#1e293b" : "white"}
        stroke={isLightMode ? "#0f172a" : "#e2e8f0"}
        strokeWidth="1"
        strokeLinejoin="round"
        fillRule="evenodd"
        clipRule="evenodd"
        opacity="0.95"
      />
      
      {/* Block G or I (Gold/Amber) - nested */}
      <path
        d="M58 48H80V80H48V68H58V58H80V68"
        stroke="#f59e0b"
        strokeWidth="3.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <rect x="62" y="60" width="12" height="12" fill="#f59e0b" opacity="0.95" />
    </svg>
  );

  if (mode === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {logoIcon}
      </div>
    );
  }

  if (mode === 'horizontal') {
    return (
      <div className={`flex items-center gap-3 select-none ${className}`}>
        {logoIcon}
        <div className="flex flex-col text-left">
          <span className={`text-base sm:text-lg font-black uppercase tracking-widest leading-none font-sans ${isLightMode ? 'text-[#0C122C]' : 'text-white'}`}>
            CLASQO
          </span>
          <span className="text-[9px] sm:text-[10px] font-black uppercase text-amber-500 tracking-[0.2em] leading-tight font-mono">
            INTEGRATED
          </span>
          <span className={`text-[7.5px] sm:text-[8px] font-bold uppercase tracking-[0.25em] leading-none mt-0.5 font-sans ${isLightMode ? 'text-neutral-550' : 'text-neutral-400'}`}>
            NIGERIA LTD
          </span>
        </div>
      </div>
    );
  }

  // Full styled landing banner (beautiful brand container)
  return (
    <div className={`relative overflow-hidden border rounded-none p-6 sm:p-8 ${isLightMode ? 'border-neutral-250 bg-gradient-to-r from-neutral-50 via-white to-neutral-50' : 'border-amber-500/20 bg-gradient-to-r from-[#0D1B3E] via-[#0E152F] to-[#0A0F24]'} ${className}`}>
      {/* Tech Grid Backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-10" />
      <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
        <div className={`p-3 border shadow-xl ${isLightMode ? 'bg-[#F4F6FA] border-neutral-200' : 'bg-neutral-950/40 border-[#1e295c]'}`}>
          {logoIcon}
        </div>
        <div className="text-center sm:text-left space-y-1">
          <span className="text-[9px] font-mono font-black text-amber-500 uppercase tracking-[0.3em] block">
            FIRS REG. NO: 22441998-0001
          </span>
          <h2 className={`text-2xl sm:text-3xl font-black uppercase tracking-tight leading-none ${isLightMode ? 'text-[#0C122C]' : 'text-white'}`}>
            Clasqo Integrated
          </h2>
          <p className={`text-xs max-w-md font-sans leading-relaxed ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
            Leading contractor for Sany heavy machinery chartering, Turkish hydraulics accessories supply, and authorized LASTMA heavy transport logistics staging in Lekki, Lagos.
          </p>
        </div>
      </div>
    </div>
  );
}
