/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  INVESTMENT_PACKAGES, 
  CO_OWNED_ASSETS, 
  INVESTOR_TESTIMONIALS, 
  InvestmentPackage, 
  MachineryCoOwnedAsset 
} from '../data/investmentData';
import { 
  DollarSign, 
  TrendingUp, 
  ShieldCheck, 
  Activity, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Calculator, 
  Users, 
  FileText, 
  PhoneCall, 
  MapPin, 
  Cpu, 
  Sliders, 
  ChevronRight, 
  Sparkles,
  Building,
  Briefcase
} from 'lucide-react';

interface PartnersInvestmentPortalProps {
  onNavigateToQuote?: () => void;
  isLightMode?: boolean;
}

export const PartnersInvestmentPortal: React.FC<PartnersInvestmentPortalProps> = ({
  onNavigateToQuote,
  isLightMode = false,
}) => {
  // Calculator state
  const [investmentAmount, setInvestmentAmount] = useState<number>(15000);
  const [selectedTenureMonths, setSelectedTenureMonths] = useState<number>(12);
  const [payoutSchedule, setPayoutSchedule] = useState<'Monthly' | 'Quarterly'>('Monthly');

  // Selected package for pledge modal
  const [selectedPackage, setSelectedPackage] = useState<InvestmentPackage | null>(null);
  const [selectedAssetModal, setSelectedAssetModal] = useState<MachineryCoOwnedAsset | null>(null);

  // Pledge modal form state
  const [pledgeName, setPledgeName] = useState('');
  const [pledgeEmail, setPledgeEmail] = useState('');
  const [pledgePhone, setPledgePhone] = useState('');
  const [pledgeCountry, setPledgeCountry] = useState('Nigeria');
  const [pledgeSuccess, setPledgeSuccess] = useState(false);

  // Dynamic ROI calculation
  const getRoiRate = (amount: number): number => {
    if (amount >= 50000) return 0.324; // 32.4%
    if (amount >= 25000) return 0.278; // 27.8%
    if (amount >= 10000) return 0.232; // 23.2%
    return 0.185; // 18.5%
  };

  const annualRoiRate = getRoiRate(investmentAmount);
  const effectiveYears = selectedTenureMonths / 12;
  const totalNetProfitUsd = investmentAmount * annualRoiRate * effectiveYears;
  const totalPayoutUsd = investmentAmount + totalNetProfitUsd;
  const monthlyProfitUsd = totalNetProfitUsd / selectedTenureMonths;
  const quarterlyProfitUsd = monthlyProfitUsd * 3;

  const handlePledgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPledgeSuccess(true);
    setTimeout(() => {
      setPledgeSuccess(false);
      setSelectedPackage(null);
    }, 4000);
  };

  return (
    <div className={`py-12 transition-colors duration-200 ${
      isLightMode ? 'bg-[#F4F6FA] text-[#0C122C]' : 'bg-[#080D22] text-neutral-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        
        {/* HERO SECTION: Partner Investment & Asset Management */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-600 dark:text-amber-400">
                  <span>Co-Ownership Asset Pool</span>
                  <span aria-hidden="true">·</span>
                  <span>Hard-Currency USD Yield</span>
                  <span aria-hidden="true">·</span>
                  <span>100% Asset Backed</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                  Partners Investment & Machinery Profit Share in <span className="text-amber-500">USD</span>
                </h1>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                  Co-own premium Sany concrete boom pumps, rotary drilling rigs, and heavy civil excavators deployed on major infrastructure projects across Lagos. Earn predictable <strong>18.5% to 32.4% annual net ROI in USD</strong> with zero operational liability.
                </p>
              </div>

              {/* Key Trust KPI Pill Strips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                  <div className="text-[11px] text-slate-500 uppercase font-bold">Min. Entry</div>
                  <div className="text-lg font-black font-mono text-amber-500">$3,000 USD</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                  <div className="text-[11px] text-slate-500 uppercase font-bold">Projected ROI</div>
                  <div className="text-lg font-black font-mono text-emerald-500">18.5% - 32.4%</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                  <div className="text-[11px] text-slate-500 uppercase font-bold">Disbursement</div>
                  <div className="text-lg font-black font-mono text-slate-900 dark:text-white">Monthly USD</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                  <div className="text-[11px] text-slate-500 uppercase font-bold">Profit Share</div>
                  <div className="text-lg font-black font-mono text-amber-500">70% / 30%</div>
                </div>
              </div>

              {/* Action Jump Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#roi-calculator"
                  className="px-6 py-3.5 rounded-none bg-amber-500 hover:bg-amber-400 text-slate-950 font-black uppercase text-xs tracking-wider transition-all shadow-md active:scale-95 inline-flex items-center gap-2"
                >
                  <Calculator className="w-4 h-4" /> Launch USD ROI Calculator
                </a>
                <a
                  href="#investment-packages"
                  className={`px-6 py-3.5 rounded-none border font-bold uppercase text-xs tracking-wider transition-all inline-flex items-center gap-2 ${
                    isLightMode 
                      ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800' 
                      : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                  }`}
                >
                  View Tier Packages &rarr;
                </a>
              </div>
            </div>

            {/* Right Hero Image Column */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full overflow-hidden bg-slate-900">
              <img
                src="/src/assets/images/investor_portal_hero_1793855237606.jpg"
                alt="Clasqo Machinery Executive Investment Review"
                className="w-full h-full object-cover filter brightness-95"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 space-y-1">
                <span className="text-[10px] text-amber-400 font-mono font-bold uppercase tracking-wider block">
                  LEKKI & EKO ATLANTIC CO-OWNERSHIP PROGRAM
                </span>
                <p className="text-xs text-slate-200 leading-snug">
                  "Our equipment generates continuous daily charter revenue from top tier engineering multinationals while you receive hard-currency USD dividends."
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 2: INTERACTIVE DYNAMIC ROI CALCULATOR */}
        <div id="roi-calculator" className="scroll-mt-24 space-y-6">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-500">
              INTERACTIVE INVESTMENT SIMULATOR
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
              USD Return on Investment (ROI) Calculator
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Adjust your capital placement and tenure to calculate your exact monthly and total USD profit distributions. Minimum investment begins at $3,000 USD.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-lg">
            
            {/* Input Controls (Col Span 6) */}
            <div className="lg:col-span-6 space-y-8 flex flex-col justify-between">
              
              {/* Investment Amount Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Your Capital Pledge (USD):
                  </label>
                  <span className="text-2xl font-black font-mono text-amber-500">
                    ${investmentAmount.toLocaleString()} USD
                  </span>
                </div>

                <input
                  type="range"
                  min={3000}
                  max={250000}
                  step={1000}
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />

                <div className="flex justify-between text-[10px] font-mono font-bold text-slate-400">
                  <span>$3,000 (Min Entry)</span>
                  <span>$25,000 (Executive)</span>
                  <span>$100,000+ (Institutional)</span>
                  <span>$250,000 (Max)</span>
                </div>

                {/* Quick select buttons */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {[3000, 10000, 25000, 50000, 100000].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setInvestmentAmount(amt)}
                      className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg border transition-all ${
                        investmentAmount === amt
                          ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-amber-500'
                      }`}
                    >
                      ${amt.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tenure Duration Selection */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  Contract Tenure:
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[6, 12, 24, 36].map((months) => (
                    <button
                      key={months}
                      onClick={() => setSelectedTenureMonths(months)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        selectedTenureMonths === months
                          ? 'border-amber-500 bg-amber-500/10 text-amber-500 font-bold shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-base font-black font-mono">{months}</div>
                      <div className="text-[10px] uppercase text-slate-500 font-sans">Months</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payout Frequency */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  USD Disbursement Frequency:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['Monthly', 'Quarterly'] as const).map((freq) => (
                    <button
                      key={freq}
                      onClick={() => setPayoutSchedule(freq)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        payoutSchedule === freq
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <div className="text-sm font-bold">{freq} Payout</div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {freq === 'Monthly' ? '1st of every calendar month' : 'End of every Q1, Q2, Q3, Q4'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Output Calculation Card (Col Span 6) */}
            <div className="lg:col-span-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700/80 pb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Projected Annual Yield Rate:
                  </span>
                  <span className="text-2xl font-black font-mono text-emerald-500">
                    {(annualRoiRate * 100).toFixed(1)}% APY
                  </span>
                </div>

                {/* Primary Output Numbers */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60">
                    <span className="text-[11px] text-slate-400 uppercase font-semibold block">
                      {payoutSchedule === 'Monthly' ? 'Monthly USD Return' : 'Quarterly USD Return'}
                    </span>
                    <div className="text-xl sm:text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">
                      ${Math.round(payoutSchedule === 'Monthly' ? monthlyProfitUsd : quarterlyProfitUsd).toLocaleString()}
                    </div>
                    <span className="text-[10px] text-emerald-500 font-medium">Direct USD wire</span>
                  </div>

                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60">
                    <span className="text-[11px] text-slate-400 uppercase font-semibold block">
                      Total Net Profit ({selectedTenureMonths}mo)
                    </span>
                    <div className="text-xl sm:text-2xl font-black font-mono text-amber-500 mt-1">
                      +${Math.round(totalNetProfitUsd).toLocaleString()}
                    </div>
                    <span className="text-[10px] text-slate-500">Over tenure</span>
                  </div>
                </div>

                {/* Grand Total Return */}
                <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
                    Total Estimated Return (Principal + Profit):
                  </span>
                  <div className="text-3xl sm:text-4xl font-black font-mono text-slate-900 dark:text-white">
                    ${Math.round(totalPayoutUsd).toLocaleString()} USD
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 pt-1">
                    Your initial ${investmentAmount.toLocaleString()} USD principal is 100% asset-backed by audited heavy machinery with priority liquidation deeds.
                  </p>
                </div>

                {/* Comparative Asset Class Benchmark */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    How This Compares vs Traditional Asset Classes
                  </span>
                  <div className="space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700/60">
                      <span className="text-slate-500">US 10-Year Treasury Bonds:</span>
                      <span className="font-bold text-slate-700 dark:text-slate-300">~4.3% p.a.</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700/60">
                      <span className="text-slate-500">Commercial Real Estate (Lagos Prime):</span>
                      <span className="font-bold text-slate-700 dark:text-slate-300">8.0% - 11.5%</span>
                    </div>
                    <div className="flex justify-between py-1 text-emerald-600 dark:text-emerald-400 font-bold">
                      <span>Clasqo Machinery Co-Ownership:</span>
                      <span>{(annualRoiRate * 100).toFixed(1)}% p.a. (USD)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  const targetPkg = INVESTMENT_PACKAGES.find(p => 
                    investmentAmount >= p.minInvestmentUsd && investmentAmount <= p.maxInvestmentUsd
                  ) || INVESTMENT_PACKAGES[0];
                  setSelectedPackage(targetPkg);
                }}
                className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black uppercase text-xs tracking-wider transition-all shadow-md text-center"
              >
                Pledge Investment of ${investmentAmount.toLocaleString()} USD &rarr;
              </button>

            </div>

          </div>
        </div>

        {/* SECTION 3: TIERED INVESTMENT PACKAGES */}
        <div id="investment-packages" className="scroll-mt-24 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-6 border-slate-200 dark:border-slate-800">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-500">
                CURATED PARTICIPATION TIERS
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
                Investment Packages & Investor Benefits
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Choose the structure that matches your liquidity and risk profile. From entry-level asset pool shares to institutional sovereign syndications.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-500">
              <ShieldCheck className="w-4 h-4" />
              <span>Legally Structured Under Nigerian & UK Commercial Laws</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INVESTMENT_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative rounded-2xl border flex flex-col justify-between overflow-hidden transition-all duration-200 ${
                  pkg.isPopular
                    ? 'border-amber-500 shadow-xl bg-white dark:bg-slate-900 ring-2 ring-amber-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {pkg.isPopular && (
                  <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 font-black text-[9px] uppercase tracking-wider px-3 py-1 rounded-bl-lg font-mono">
                    Most Popular Tier
                  </div>
                )}

                <div>
                  {/* Image header */}
                  <div className="aspect-16/10 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Header info */}
                  <div className="p-5 space-y-4">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-500">
                        Tier {pkg.tier}
                      </span>
                      <h3 className="text-base font-black text-slate-900 dark:text-white leading-tight mt-0.5">
                        {pkg.name}
                      </h3>
                    </div>

                    {/* Pricing & Yield */}
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1">
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs text-slate-500 font-medium">Entry:</span>
                        <span className="text-base font-black font-mono text-slate-900 dark:text-white">
                          ${pkg.minInvestmentUsd.toLocaleString()} USD
                        </span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs text-slate-500 font-medium">Projected ROI:</span>
                        <span className="text-base font-black font-mono text-emerald-500">
                          {pkg.projectedAnnualRoiPercent}% / year
                        </span>
                      </div>
                      <div className="flex justify-between items-baseline text-[11px] text-slate-400">
                        <span>Disbursement:</span>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{pkg.payoutFrequency}</span>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Core Benefits</span>
                      <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-400">
                        {pkg.features.slice(0, 3).map((f, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Risk mitigation */}
                    <div className="text-[10px] text-slate-500 leading-snug p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/40">
                      <strong>Security:</strong> {pkg.riskMitigation}
                    </div>
                  </div>
                </div>

                {/* Footer Button */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() => {
                      setInvestmentAmount(pkg.minInvestmentUsd);
                      setSelectedPackage(pkg);
                    }}
                    className={`w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-sm ${
                      pkg.isPopular
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                        : 'border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white'
                    }`}
                  >
                    Select Package & Pledge &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: MACHINERY ASSET MANAGEMENT & PROFIT SHARING */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 lg:p-12 shadow-xl space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-500">
                TURNKEY ASSET MANAGEMENT
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-slate-900 dark:text-white leading-tight">
                How Clasqo Manages The Machinery & Distributes Profit
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                As a co-owner, you hold hard legal equity in high-earning industrial machines while Clasqo takes full responsibility for 100% of the operational overhead.
              </p>

              {/* 3 Pillars */}
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 font-bold">
                    01
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Lagos Dispatch & Multi-Year Charter Contracts</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      We negotiate ongoing casting, excavation, and piling contracts with premier builders (Julius Berger, BCL, Lafarge, SPG Nigeria) ensuring 88%+ average fleet utilization.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 font-bold">
                    02
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Zero Maintenance or Labor Liability</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Clasqo employs certified operators, manages fuel logistics, performs scheduled hydraulic overhauls, and covers comprehensive insurance through our operational reserve fund.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                  <div className="w-10 h-10 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center shrink-0 font-bold">
                    03
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">70/30 Transparent Net Revenue Sharing</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      70% of all net monthly charter earnings are wired directly to co-owners in USD, while 30% funds preventive wear parts replacement and management.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative aspect-4/3 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950">
              <img
                src="/src/assets/images/machinery_asset_management_1793855237921.jpg"
                alt="Clasqo Certified Machinery Inspection Facility"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wide">Eti-Osa Central Maintenance Facility</div>
                <div className="text-[11px] text-slate-300 mt-0.5">
                  Overhaul diagnostics, cylinder pressure tests, and Sany OEM certified preventive maintenance carried out weekly.
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 5: LIVE ASSET TELEMATICS & PORTFOLIO TRACKER */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-6 border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-500 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                LIVE FLEET ASSET MONITOR
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white mt-1">
                Active Co-Owned Machinery Telematics
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-md">
              Real-time telemetry showing physical deployment coordinates, monthly charter revenue, and co-owner yield allocations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CO_OWNED_ASSETS.map((asset) => (
              <div
                key={asset.id}
                onClick={() => setSelectedAssetModal(asset)}
                className="group cursor-pointer rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4 hover:border-amber-500/50 hover:shadow-lg transition-all"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20">
                    {asset.unitCode}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {asset.status}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors line-clamp-1">
                    {asset.machineModel}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                    {asset.currentDeployment}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                    <span className="text-[10px] text-slate-400 block font-sans">Monthly Yield</span>
                    <span className="font-bold text-emerald-500">${asset.monthlyInvestorProfitUsd.toLocaleString()}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                    <span className="text-[10px] text-slate-400 block font-sans">Utilization</span>
                    <span className="font-bold text-slate-900 dark:text-white">{asset.utilizationRatePercent}%</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
                  <span>Co-owners: {asset.coOwnersCount} partners</span>
                  <span className="text-amber-500 font-bold group-hover:translate-x-1 transition-transform">Specs &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 6: CLIENT & INVESTOR POSITIVE TESTIMONIALS */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-500">
              VERIFIED INVESTOR ENDORSEMENTS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
              What Machinery Co-Owners Say
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Positive feedback from institutional funds, diaspora executives, and corporate contractors earning steady hard-currency USD dividends.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INVESTOR_TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 font-mono font-bold flex items-center justify-center text-sm border border-amber-500/20">
                      {t.avatarText}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t.investorName}</h4>
                      <p className="text-xs text-amber-600 dark:text-amber-400">{t.investorTitle}</p>
                      <p className="text-[11px] text-slate-400">{t.firmOrOrigin}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-black font-mono text-emerald-500 block">
                      {t.annualYieldRealized}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      ${t.investmentAmountUsd.toLocaleString()} USD Pledge
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
                  "{t.testimonialText}"
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
                  <span>Allocated to: <strong>{t.verifiedProject}</strong></span>
                  <div className="flex text-amber-500">
                    {Array.from({ length: t.ratingStars }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PLEDGE MODAL DRAWER */}
        {selectedPackage && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-start justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold uppercase text-amber-500">
                    Official Investment Pledge • {selectedPackage.tier} Tier
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                    {selectedPackage.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Expected Yield: {selectedPackage.projectedAnnualRoiPercent}% Annual Net ROI in USD
                  </p>
                </div>
                <button
                  onClick={() => setSelectedPackage(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
                >
                  ✕
                </button>
              </div>

              {pledgeSuccess ? (
                <div className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto text-2xl font-bold">
                    ✓
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">Pledge Recorded Successfully</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Our Executive Investment Director has received your pledge of ${investmentAmount.toLocaleString()} USD. Formal KYC verification documents and co-ownership deeds will be emailed to {pledgeEmail}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handlePledgeSubmit} className="space-y-4">
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-800 dark:text-amber-300 font-medium">
                    You are pledging <strong>${investmentAmount.toLocaleString()} USD</strong> into {selectedPackage.allocatedMachineryType}.
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Full Legal Name / Entity
                      </label>
                      <input
                        type="text"
                        required
                        value={pledgeName}
                        onChange={(e) => setPledgeName(e.target.value)}
                        placeholder="e.g. Dr. Austin Okonkwo"
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Corporate Email
                      </label>
                      <input
                        type="email"
                        required
                        value={pledgeEmail}
                        onChange={(e) => setPledgeEmail(e.target.value)}
                        placeholder="austin@investments.com"
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="text"
                        required
                        value={pledgePhone}
                        onChange={(e) => setPledgePhone(e.target.value)}
                        placeholder="+234 802 ... or +44 ..."
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Country of Residence
                      </label>
                      <input
                        type="text"
                        required
                        value={pledgeCountry}
                        onChange={(e) => setPledgeCountry(e.target.value)}
                        placeholder="Nigeria, UK, USA, UAE..."
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black uppercase text-xs tracking-wider transition-all shadow-md"
                    >
                      Confirm Pledge & Request Legal Deed Documents
                    </button>

                    <a
                      href={`https://wa.me/2348063342947?text=${encodeURIComponent(`Hello Clasqo Executive Desk, I would like to pledge $${investmentAmount.toLocaleString()} USD into the ${selectedPackage.name}. Please send legal co-ownership deed terms.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 font-bold uppercase text-[11px] tracking-wider transition-all flex items-center justify-center gap-2 hover:bg-emerald-500/10"
                    >
                      Connect Directly with Investor Relations on WhatsApp
                    </a>
                  </div>
                </form>
              )}

            </div>
          </div>
        )}

        {/* ASSET TELEMATICS DETAIL MODAL */}
        {selectedAssetModal && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-5">
              <div className="flex items-start justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-500">{selectedAssetModal.unitCode}</span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{selectedAssetModal.machineModel}</h3>
                  <p className="text-xs text-slate-500">{selectedAssetModal.category}</p>
                </div>
                <button
                  onClick={() => setSelectedAssetModal(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-[10px] text-slate-400 block font-sans">Active Deployment</span>
                  <span className="font-bold text-slate-900 dark:text-white">{selectedAssetModal.currentDeployment}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-[10px] text-slate-400 block font-sans">Contractor Client</span>
                  <span className="font-bold text-amber-500">{selectedAssetModal.clientContractor}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-[10px] text-slate-400 block font-sans">Daily Charter Rate</span>
                  <span className="font-bold text-emerald-500">${selectedAssetModal.dailyCharterRateUsd} / day</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-[10px] text-slate-400 block font-sans">Monthly Co-Owner Profit</span>
                  <span className="font-bold text-emerald-500">${selectedAssetModal.monthlyInvestorProfitUsd.toLocaleString()}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-[10px] text-slate-400 block font-sans">GPS Coordinates</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">{selectedAssetModal.gpsCoordinates}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-[10px] text-slate-400 block font-sans">Mechanical Health</span>
                  <span className="font-bold text-emerald-500">{selectedAssetModal.healthScorePercent}%</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/40 text-xs text-slate-600 dark:text-slate-400">
                <strong>Next Service:</strong> {selectedAssetModal.nextScheduledMaintenance}. Fully covered by Clasqo maintenance escrow with zero out-of-pocket charges to co-owners.
              </div>

              <button
                onClick={() => setSelectedAssetModal(null)}
                className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs uppercase"
              >
                Close Asset Monitor
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
