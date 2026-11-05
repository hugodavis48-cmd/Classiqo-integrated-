/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CO_OWNED_ASSETS, INVESTMENT_PACKAGES } from '../data/investmentData';
import { 
  Building2, 
  DollarSign, 
  TrendingUp, 
  ShieldCheck, 
  Cpu, 
  Wrench, 
  Activity, 
  FileSpreadsheet, 
  Download, 
  CheckCircle2, 
  AlertCircle,
  Truck,
  Users,
  Settings,
  Calendar
} from 'lucide-react';

interface InvestorAdminPortalProps {
  isLightMode?: boolean;
}

export const InvestorAdminPortal: React.FC<InvestorAdminPortalProps> = ({ isLightMode = false }) => {
  const [activeView, setActiveView] = useState<'investor' | 'admin'>('investor');
  const [selectedAssetId, setSelectedAssetId] = useState<string>(CO_OWNED_ASSETS[0].id);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Simulated investor portfolio data
  const userPortfolio = {
    investorName: 'Dr. Austin Okonkwo',
    accountNumber: 'CLQ-USD-9921',
    totalPledgedUsd: 35000,
    activeTier: 'Executive Boom Fleet Co-Ownership',
    monthlyDividendUsd: 810.83,
    totalDisbursedToDateUsd: 19460,
    nextDisbursementDate: 'December 1, 2026',
    linkedAssetUnit: 'CQL-BM-56M-02 (Sany 56m Boom Pump)',
    linkedAssetLocation: 'Eko Atlantic City, Victoria Island'
  };

  const handleSimulateDisbursement = () => {
    setActionNotice('Disbursement batch executed: $810.83 USD wired to investor domiciliary account.');
    setTimeout(() => setActionNotice(null), 3500);
  };

  const handleSimulateMaintenanceCheck = (code: string) => {
    setActionNotice(`Maintenance inspection log for ${code} signed off by Chief Maintenance Engineer.`);
    setTimeout(() => setActionNotice(null), 3500);
  };

  return (
    <div className={`py-12 px-4 sm:px-6 lg:px-8 transition-colors ${
      isLightMode ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-white'
    }`}>
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header & View Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6 border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500 font-mono">
              <span>Machinery Management & Co-Ownership Portal</span>
              <span aria-hidden="true">·</span>
              <span>USD Dividends</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              Investor & Fleet Operations Console
            </h1>
          </div>

          {/* Toggle between Investor View and Admin View */}
          <div className="flex items-center p-1 rounded-xl bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 select-none">
            <button
              onClick={() => setActiveView('investor')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeView === 'investor'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Investor Portfolio View
            </button>
            <button
              onClick={() => setActiveView('admin')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeView === 'admin'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Fleet Admin Operations
            </button>
          </div>
        </div>

        {/* Action Notice Toast */}
        {actionNotice && (
          <div className="p-3.5 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center justify-between shadow-lg">
            <span>✓ {actionNotice}</span>
            <span className="text-[10px] opacity-80">Ledger Updated</span>
          </div>
        )}

        {/* VIEW 1: INVESTOR PORTFOLIO DASHBOARD */}
        {activeView === 'investor' && (
          <div className="space-y-8 animate-fade-in">
            {/* Top 4 Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1 shadow-sm">
                <span className="text-xs font-semibold text-slate-400 uppercase">Active Capital Pledge</span>
                <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                  ${userPortfolio.totalPledgedUsd.toLocaleString()} USD
                </div>
                <div className="text-[11px] text-amber-500 font-medium">{userPortfolio.activeTier}</div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1 shadow-sm">
                <span className="text-xs font-semibold text-slate-400 uppercase">Monthly USD Cashflow</span>
                <div className="text-2xl font-black font-mono text-emerald-500">
                  +${userPortfolio.monthlyDividendUsd.toFixed(2)}
                </div>
                <div className="text-[11px] text-slate-400">Next Payout: {userPortfolio.nextDisbursementDate}</div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1 shadow-sm">
                <span className="text-xs font-semibold text-slate-400 uppercase">Total Realized Dividends</span>
                <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                  ${userPortfolio.totalDisbursedToDateUsd.toLocaleString()} USD
                </div>
                <div className="text-[11px] text-emerald-500 font-medium">55.6% Principal Recovered</div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1 shadow-sm">
                <span className="text-xs font-semibold text-slate-400 uppercase">Linked Physical Asset</span>
                <div className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                  {userPortfolio.linkedAssetUnit}
                </div>
                <div className="text-[11px] text-slate-500">{userPortfolio.linkedAssetLocation}</div>
              </div>
            </div>

            {/* Split Section: Linked Telematics & Payout Statement */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Linked Co-Owned Machinery Telematics (Col 7) */}
              <div className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-6 shadow-sm">
                <div className="flex items-center justify-between border-b pb-4 border-slate-100 dark:border-slate-800">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Your Co-Owned Equipment Telematics
                    </h3>
                    <p className="text-xs text-slate-400">
                      Live sensor stream from Sany SY5313THB 56m Boom Pump (Unit #CQL-BM-56M-02)
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-500 text-xs font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Online & Pouring
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                    <span className="text-[10px] text-slate-400 block font-sans">Deployment Site</span>
                    <span className="font-bold text-slate-900 dark:text-white">Eko Atlantic City</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                    <span className="text-[10px] text-slate-400 block font-sans">Engine Hours Run</span>
                    <span className="font-bold text-slate-900 dark:text-white">1,420 Hours</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                    <span className="text-[10px] text-slate-400 block font-sans">Hydraulic Pressure</span>
                    <span className="font-bold text-emerald-500">145 Bar (Optimal)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                    <span className="text-[10px] text-slate-400 block font-sans">Monthly Charter Rate</span>
                    <span className="font-bold text-slate-900 dark:text-white">$24,500 Gross</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                    <span className="text-[10px] text-slate-400 block font-sans">Your Ownership Share</span>
                    <span className="font-bold text-amber-500">23.33% ($35k/$150k)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                    <span className="text-[10px] text-slate-400 block font-sans">Next Service SLA</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">180 hrs remaining</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 space-y-1">
                  <div className="font-bold">Maintenance Reserve Assurance:</div>
                  <p>
                    All replacement wear plates, cutting rings, and twin-wall pipes are fully provisioned from our $284,500 USD maintenance reserve with zero liability charged to your account.
                  </p>
                </div>
              </div>

              {/* Payout History Ledger (Col 5) */}
              <div className="lg:col-span-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-5 shadow-sm">
                <div className="flex items-center justify-between border-b pb-4 border-slate-100 dark:border-slate-800">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    USD Dividend Receipts
                  </h3>
                  <button 
                    onClick={handleSimulateDisbursement}
                    className="text-xs text-amber-500 font-bold hover:underline"
                  >
                    Simulate Wire
                  </button>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  {[
                    { date: 'Nov 1, 2026', amount: '$810.83', ref: 'CQL-TX-8821', status: 'Completed' },
                    { date: 'Oct 1, 2026', amount: '$810.83', ref: 'CQL-TX-7910', status: 'Completed' },
                    { date: 'Sep 1, 2026', amount: '$810.83', ref: 'CQL-TX-7043', status: 'Completed' },
                    { date: 'Aug 1, 2026', amount: '$810.83', ref: 'CQL-TX-6192', status: 'Completed' },
                  ].map((tx, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">{tx.amount} USD</div>
                        <div className="text-[10px] text-slate-400">{tx.date} • {tx.ref}</div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
                        {tx.status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setActionNotice('Audited Q3/Q4 Financial Statement PDF downloaded.');
                      setTimeout(() => setActionNotice(null), 3000);
                    }}
                    className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-3.5 h-3.5" /> Download Certified Tax / Audit PDF
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* VIEW 2: FLEET ADMIN MANAGEMENT CONSOLE */}
        {activeView === 'admin' && (
          <div className="space-y-8 animate-fade-in">
            {/* Admin Overview Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <span className="text-xs text-slate-400 font-medium">Total Co-Owned Fleet</span>
                <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1">4 Machinery Units</div>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <span className="text-xs text-slate-400 font-medium">Total Capital Under Mgmt</span>
                <div className="text-xl font-bold font-mono text-amber-500 mt-1">$500,000 USD</div>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <span className="text-xs text-slate-400 font-medium">Monthly Gross Charter Rev</span>
                <div className="text-xl font-bold font-mono text-emerald-500 mt-1">$84,000 USD</div>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <span className="text-xs text-slate-400 font-medium">Maintenance Escrow Balance</span>
                <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1">$284,500 USD</div>
              </div>
            </div>

            {/* Fleet Units Management Table */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
              <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Active Machinery Fleet Units</h3>
                  <p className="text-xs text-slate-500">Live operational status, telemetry logs, and maintenance sign-offs</p>
                </div>
                <button
                  onClick={() => {
                    setActionNotice('Full fleet telematics ledger CSV exported.');
                    setTimeout(() => setActionNotice(null), 3000);
                  }}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-500" /> Export CSV
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase tracking-wider font-mono text-[10px]">
                    <tr>
                      <th className="px-5 py-3">Unit Code</th>
                      <th className="px-5 py-3">Machine Model</th>
                      <th className="px-5 py-3">Current Deployment</th>
                      <th className="px-5 py-3">Daily Charter</th>
                      <th className="px-5 py-3">Monthly Yield</th>
                      <th className="px-5 py-3">Health Score</th>
                      <th className="px-5 py-3">Admin Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                    {CO_OWNED_ASSETS.map((asset) => (
                      <tr key={asset.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                        <td className="px-5 py-3.5 font-bold text-amber-500">{asset.unitCode}</td>
                        <td className="px-5 py-3.5 font-sans font-bold text-slate-900 dark:text-white">{asset.machineModel}</td>
                        <td className="px-5 py-3.5 font-sans text-slate-600 dark:text-slate-400">{asset.currentDeployment}</td>
                        <td className="px-5 py-3.5">${asset.dailyCharterRateUsd}/day</td>
                        <td className="px-5 py-3.5 text-emerald-500 font-bold">${asset.monthlyInvestorProfitUsd.toLocaleString()}</td>
                        <td className="px-5 py-3.5">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-bold">
                            {asset.healthScorePercent}%
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <button
                            onClick={() => handleSimulateMaintenanceCheck(asset.unitCode)}
                            className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-700 dark:text-slate-300 font-sans font-bold transition-colors"
                          >
                            Sign Maintenance
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Escrow & Regulatory Security Summary */}
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-500">
                <ShieldCheck className="w-4 h-4" />
                <span>Capital Preservation & Counterparty Risk Structure</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                All capital pledges are held in segregated legal trusts with First Bank of Nigeria and Standard Chartered UK. Physical machinery deeds are legally registered with the Corporate Affairs Commission (CAC) with first-charge liens allocated to the respective partner syndicate.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
