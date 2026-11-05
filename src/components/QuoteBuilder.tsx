/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { QuoteItem } from '../types';
import { 
  FileDown, 
  Printer, 
  Trash2, 
  CalendarCheck, 
  Send, 
  CheckCircle2, 
  PhoneCall, 
  Mail, 
  Building, 
  Loader2, 
  Clock, 
  ShieldCheck, 
  Tag, 
  Check, 
  Copy, 
  ExternalLink,
  MessageSquare,
  Sparkles,
  ArrowRight,
  HardHat,
  Truck
} from 'lucide-react';

interface QuoteBuilderProps {
  addedItems: QuoteItem[];
  onRemoveItem: (id: string, type: 'machinery' | 'part' | 'service' | 'labor') => void;
  onClearQuote: () => void;
  onUpdateQuantity: (id: string, type: 'machinery' | 'part' | 'service' | 'labor', qty: number) => void;
  isLightMode?: boolean;
}

// Quick-add turnkey construction bundles
const QUICK_BUNDLES = [
  {
    id: 'bundle-highrise',
    name: 'High-Rise Slabbing Bundle',
    description: 'Sany 56m Boom Pump + 60m Twin-Wall Pipes + Snap Clamps',
    items: [
      { type: 'machinery' as const, id: 'sany-pump-56m', name: 'Sany 56m Truck-Mounted Concrete Boom Pump', quantity: 1, days: 3, rateOrPrice: 1450000 },
      { type: 'part' as const, id: 'pipe-dn125-3m', name: 'High-Pressure Concrete Pump Straight Pipe 3m (DN125)', quantity: 20, rateOrPrice: 185000 },
      { type: 'part' as const, id: 'coupling-dn125-clamp', name: 'Quick-Release Concrete Snap Clamp (DN125)', quantity: 20, rateOrPrice: 42000 }
    ]
  },
  {
    id: 'bundle-piling',
    name: 'Coastal Deep Piling Bundle',
    description: 'Sany SR285 Rotary Drilling Rig + Piling Engineering Crew',
    items: [
      { type: 'machinery' as const, id: 'sany-drilling-sr285', name: 'Sany SR285 Rotary Drilling Rig', quantity: 1, days: 6, rateOrPrice: 1600000 },
      { type: 'service' as const, id: 'service-cast-piling', name: 'Job Service: Bored Piling & Foundation Drilling (+ Crew)', quantity: 1, days: 6, rateOrPrice: 2250000 }
    ]
  },
  {
    id: 'bundle-earthworks',
    name: 'Compaction & Excavation Package',
    description: 'Sany SY215C Excavator + Sany SSR120 Vibratory Roller',
    items: [
      { type: 'machinery' as const, id: 'sany-excavator-sy215c', name: 'Sany SY215C Medium Excavator (21t)', quantity: 1, days: 5, rateOrPrice: 380000 },
      { type: 'machinery' as const, id: 'sany-roller-ssr120', name: 'Sany 12t Vibratory Road Roller', quantity: 1, days: 5, rateOrPrice: 280000 }
    ]
  },
  {
    id: 'bundle-lead-engineer',
    name: 'Field Crew Lead: Engr. Emmanuel',
    description: 'Lead Multi-Skilled Engineer + Sany 56m Boom Pump + Pipeline Clamping Crew',
    items: [
      { type: 'labor' as const, id: 'wf-engr-emmanuel-lead', name: 'Lead Multi-Skilled Engineer: Engr. Emmanuel (Setup & Maintenance)', quantity: 1, days: 5, rateOrPrice: 150000 },
      { type: 'machinery' as const, id: 'sany-pump-56m', name: 'Sany 56m Truck-Mounted Concrete Boom Pump', quantity: 1, days: 5, rateOrPrice: 1450000 },
      { type: 'part' as const, id: 'coupling-dn125-clamp', name: 'Quick-Release Concrete Snap Clamp (DN125)', quantity: 15, rateOrPrice: 42000 }
    ]
  }
];

export default function QuoteBuilder({ 
  addedItems, 
  onRemoveItem, 
  onClearQuote, 
  onUpdateQuantity, 
  isLightMode = false 
}: QuoteBuilderProps) {
  const [clientName, setClientName] = useState('John Okafor');
  const [clientEmail, setClientEmail] = useState('okafor.builds@engineering.ng');
  const [company, setCompany] = useState('Okafor Civil Structures Ltd');
  const [deliveryAddress, setDeliveryAddress] = useState('Site B, Lekki Free Zone Phase 2, Lagos');
  const [phone, setPhone] = useState('+234 803 111 2222');
  
  // Advanced procurement options
  const [dispatchPriority, setDispatchPriority] = useState<'standard' | 'express'>('standard');
  const [includeOperatorCrew, setIncludeOperatorCrew] = useState<boolean>(true);
  const [voucherCode, setVoucherCode] = useState<string>('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percent: number; label: string } | null>({
    code: 'CLASQO2026',
    percent: 5,
    label: '5% Certified Contractor Concession'
  });
  const [voucherMessage, setVoucherMessage] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [invoiceSubmitted, setInvoiceSubmitted] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [quoteReference] = useState(() => `CQL-${Math.floor(1000 + Math.random() * 9000)}-LAG`);

  // Compute Subtotal
  const rawSubtotal = addedItems.reduce((acc, item) => {
    const factor = item.days ? item.days : 1;
    return acc + (item.rateOrPrice * item.quantity * factor);
  }, 0);

  // Operator crew surcharge (optional addition)
  const machineryCount = addedItems.filter(i => i.type === 'machinery').reduce((sum, i) => sum + i.quantity, 0);
  const operatorCrewFee = includeOperatorCrew && machineryCount > 0 ? machineryCount * 75000 : 0;

  // Dispatch priority surcharge
  const prioritySurcharge = dispatchPriority === 'express' ? 150000 : 0;

  const baseCalculated = rawSubtotal + operatorCrewFee + prioritySurcharge;

  // Voucher discount
  const discountAmount = appliedDiscount ? (baseCalculated * (appliedDiscount.percent / 100)) : 0;
  const subtotalAfterDiscount = Math.max(0, baseCalculated - discountAmount);

  // Nigeria VAT (7.5%)
  const vat = subtotalAfterDiscount * 0.075;
  const grandTotal = subtotalAfterDiscount + vat;

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = voucherCode.trim().toUpperCase();
    if (cleanCode === 'CLASQO2026') {
      setAppliedDiscount({ code: 'CLASQO2026', percent: 5, label: '5% Certified Contractor Concession' });
      setVoucherMessage('Success: 5% Corporate Contractor Concession applied.');
    } else if (cleanCode === 'LEKKIFREEZONE') {
      setAppliedDiscount({ code: 'LEKKIFREEZONE', percent: 7.5, label: '7.5% Lekki Free Zone Strategic Partner Rebate' });
      setVoucherMessage('Success: 7.5% Lekki Free Zone partner concession applied.');
    } else if (cleanCode === 'BUILDNIGERIA') {
      setAppliedDiscount({ code: 'BUILDNIGERIA', percent: 10, label: '10% National Infrastructure Builders Grant' });
      setVoucherMessage('Success: 10% National Builder concession applied.');
    } else {
      setVoucherMessage('Invalid voucher code. Try CLASQO2026 or LEKKIFREEZONE.');
    }
  };

  const handleAddBundle = (bundle: typeof QUICK_BUNDLES[0]) => {
    bundle.items.forEach(item => {
      onUpdateQuantity(item.id, item.type, item.quantity);
    });
  };

  const generateWhatsAppMessage = () => {
    const itemsList = addedItems.map((item, idx) => {
      const days = item.days ? ` (${item.days} days)` : '';
      return `${idx + 1}. ${item.name} x${item.quantity}${days} - ${formatNaira(item.rateOrPrice * item.quantity * (item.days || 1))}`;
    }).join('\n');

    const msg = `*CLASQO INTEGRATED NIGERIA - QUOTATION ESTIMATE*\nRef: #${quoteReference}\nClient: ${clientName} (${company})\nTel: ${phone}\nEmail: ${clientEmail}\nSite: ${deliveryAddress}\n\n*PROCUREMENT SCOPE:*\n${itemsList}\n\n*DISPATCH SPECIFICATIONS:*\n• Dispatch Priority: ${dispatchPriority === 'express' ? 'Express 24h Priority Mobilization' : 'Standard 3-5 Days Scheduled'}\n• Operator Crew: ${includeOperatorCrew ? 'Full Licensed Sany Operator Crew Included' : 'Bare Machine Charter'}\n${appliedDiscount ? `• Concession: ${appliedDiscount.label} (-${formatNaira(discountAmount)})\n` : ''}----------------------------------------\n*Subtotal:* ${formatNaira(subtotalAfterDiscount)}\n*VAT (7.5%):* ${formatNaira(vat)}\n*GRAND TOTAL:* ${formatNaira(grandTotal)}\n\nPlease confirm lowbed trailer availability and logistics scheduling from Lekki Eti-Osa yard.`;

    return encodeURIComponent(msg);
  };

  const handleCopySummary = () => {
    const itemsList = addedItems.map((item, idx) => {
      const days = item.days ? ` (${item.days} days)` : '';
      return `${idx + 1}. ${item.name} x${item.quantity}${days} - ${formatNaira(item.rateOrPrice * item.quantity * (item.days || 1))}`;
    }).join('\n');

    const summary = `CLASQO INTEGRATED NIGERIA - QUOTATION PROFORMA\nRef: #${quoteReference}\nDate: ${new Date().toLocaleDateString('en-GB')}\nContractor: ${company} (Attn: ${clientName})\nPhone: ${phone} | Email: ${clientEmail}\nDelivery Site: ${deliveryAddress}\n\nITEMS:\n${itemsList}\n\nSUMMARY:\nSubtotal: ${formatNaira(subtotalAfterDiscount)}\nVAT (7.5%): ${formatNaira(vat)}\nGrand Total: ${formatNaira(grandTotal)}\n\nDispatch Yard: Clasqo Eti-Osa Hub, 1 Dr Babatunde Ayeni St, Lekki`;

    navigator.clipboard.writeText(summary);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const handleCreateMockQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (addedItems.length === 0) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setInvoiceSubmitted(true);
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`py-12 min-h-screen transition-colors duration-200 ${
      isLightMode ? 'bg-[#F4F6FA] text-[#0C122C]' : 'bg-[#080D22] text-neutral-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Title & Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[10px] text-amber-500 font-extrabold uppercase tracking-[0.25em] block mb-2 font-mono">
            CLASQO PROCUREMENT & PROFORMA DESK
          </span>
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight ${
            isLightMode ? 'text-[#0C122C]' : 'text-white'
          }`}>
            Interactive Engineering Quote Builder
          </h2>
          <p className={`text-xs sm:text-sm mt-2 leading-relaxed ${
            isLightMode ? 'text-neutral-600' : 'text-neutral-400'
          }`}>
            Review your selected Sany heavy machineries, twin-wall pipeline joints, and road logistics surcharges. Generate a Lagos FIRS VAT-compliant proforma estimate flyer with instant WhatsApp dispatch.
          </p>
        </div>

        {invoiceSubmitted ? (
          /* Submission Confirmation & 4-Stage Dispatch Roadmap */
          <div className={`max-w-3xl mx-auto p-8 rounded-none border text-center space-y-8 relative overflow-hidden print:hidden transition-all duration-300 ${
            isLightMode 
              ? 'bg-white border-emerald-500/30 shadow-lg' 
              : 'bg-[#060a1a] border-emerald-500/30 shadow-2xl'
          }`}>
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-3">
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 flex items-center justify-center rounded-none mx-auto border border-emerald-500/20">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <span className="text-[10px] font-mono font-bold text-amber-500 tracking-[0.2em] uppercase block">
                PROFORMA REFERENCE #{quoteReference}
              </span>
              <h3 className={`text-xl sm:text-2xl font-black uppercase tracking-tight ${isLightMode ? 'text-[#0C122C]' : 'text-white'}`}>
                Quotation Request Logged Successfully!
              </h3>
              <p className={`text-xs max-w-lg mx-auto leading-relaxed ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
                Clasqo Integrated has processed your machinery charter specifications and site delivery coordinates. Official proforma flyer has been generated and dispatched to <strong>{clientEmail}</strong>.
              </p>
            </div>

            {/* Interactive 4-Stage Dispatch Roadmap */}
            <div className={`p-6 border text-left space-y-4 ${
              isLightMode ? 'bg-neutral-50 border-neutral-200' : 'bg-[#0B122C] border-[#182747]'
            }`}>
              <div className="flex items-center justify-between border-b pb-3 border-neutral-200 dark:border-neutral-800">
                <span className="text-[10px] font-mono font-black uppercase text-amber-500 tracking-wider flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5" /> LAGOS OPERATIONS MOBILIZATION ROADMAP
                </span>
                <span className="text-[9px] font-mono font-bold text-emerald-500 uppercase">
                  STATUS: QUEUED FOR STAGING
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-1">
                {/* Milestone 1 */}
                <div className={`p-3 border rounded-none ${
                  isLightMode ? 'bg-white border-emerald-500/40' : 'bg-[#060a1a] border-emerald-500/40'
                }`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] font-mono font-bold text-emerald-500">STAGE 01</span>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <h4 className={`text-xs font-bold uppercase ${isLightMode ? 'text-[#0C122C]' : 'text-white'}`}>Scope Verification</h4>
                  <p className="text-[9.5px] text-neutral-500 mt-1">VAT & specification verified by logistics lead.</p>
                </div>

                {/* Milestone 2 */}
                <div className={`p-3 border rounded-none ${
                  isLightMode ? 'bg-white border-amber-500/40' : 'bg-[#060a1a] border-amber-500/40'
                }`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] font-mono font-bold text-amber-500">STAGE 02</span>
                    <Clock className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
                  </div>
                  <h4 className={`text-xs font-bold uppercase ${isLightMode ? 'text-[#0C122C]' : 'text-white'}`}>Yard Slump & Pressure Test</h4>
                  <p className="text-[9.5px] text-neutral-500 mt-1">Hydraulic inspection at Eti-Osa yard depot.</p>
                </div>

                {/* Milestone 3 */}
                <div className={`p-3 border rounded-none ${
                  isLightMode ? 'bg-white border-neutral-200' : 'bg-[#060a1a] border-neutral-800'
                }`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] font-mono font-bold text-neutral-400">STAGE 03</span>
                  </div>
                  <h4 className={`text-xs font-bold uppercase ${isLightMode ? 'text-[#0C122C]' : 'text-white'}`}>LASTMA Escort Clearance</h4>
                  <p className="text-[9.5px] text-neutral-500 mt-1">Wide-load lowbed expressway transit pass.</p>
                </div>

                {/* Milestone 4 */}
                <div className={`p-3 border rounded-none ${
                  isLightMode ? 'bg-white border-neutral-200' : 'bg-[#060a1a] border-neutral-800'
                }`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] font-mono font-bold text-neutral-400">STAGE 04</span>
                  </div>
                  <h4 className={`text-xs font-bold uppercase ${isLightMode ? 'text-[#0C122C]' : 'text-white'}`}>Site Delivery</h4>
                  <p className="text-[9.5px] text-neutral-500 mt-1">Arrival at {deliveryAddress.split(',')[0]} & handover.</p>
                </div>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="flex flex-wrap gap-3 justify-center pt-2">
              <a
                href={`https://wa.me/2348063342947?text=${generateWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-emerald-500 text-neutral-950 font-black uppercase tracking-wider text-[10px] py-3 px-6 rounded-none transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <MessageSquare className="w-4 h-4 fill-current text-neutral-950" />
                Dispatch to WhatsApp Desk
              </a>

              <button
                onClick={handlePrint}
                className="bg-amber-500 hover:bg-amber-450 text-neutral-950 font-black uppercase tracking-wider text-[10px] py-3 px-6 rounded-none transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Printer className="w-4 h-4 text-neutral-950" /> Print Proforma Flyer
              </button>

              <button
                onClick={handleCopySummary}
                className={`border text-[10px] font-bold uppercase tracking-wider py-3 px-5 transition-colors flex items-center gap-1.5 cursor-pointer ${
                  isLightMode 
                    ? 'border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-100' 
                    : 'border-[#182747] bg-[#0B122C] text-neutral-200 hover:bg-[#121c3b]'
                }`}
              >
                {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedSummary ? 'Copied Summary' : 'Copy Text Memo'}
              </button>

              <button
                onClick={() => {
                  setInvoiceSubmitted(false);
                  onClearQuote();
                }}
                className={`border text-[10px] font-bold uppercase tracking-wider py-3 px-5 transition-colors cursor-pointer ${
                  isLightMode 
                    ? 'border-neutral-300 text-neutral-600 hover:text-black' 
                    : 'border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                Create New Quote
              </button>
            </div>
          </div>
        ) : (
          /* Active Quote Workspace */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Added Items Scope (Col Span 7) */}
            <div className={`lg:col-span-7 rounded-none border p-6 space-y-6 transition-colors duration-200 ${
              isLightMode 
                ? 'bg-white border-neutral-200 shadow-sm' 
                : 'bg-[#060a1a] border-[#182747]'
            }`}>
              <div className="flex items-center justify-between border-b pb-3 border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center gap-2">
                  <HardHat className="w-4 h-4 text-amber-500" />
                  <h3 className={`text-xs font-black uppercase tracking-[0.15em] ${isLightMode ? 'text-[#0C122C]' : 'text-neutral-100'}`}>
                    Active Machinery & Sourcing Scope
                  </h3>
                </div>
                <span className="text-[9px] font-black text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-none border border-amber-500/20 uppercase tracking-wider font-mono">
                  {addedItems.length} Scope Items
                </span>
              </div>

              {addedItems.length === 0 ? (
                /* Empty state with Turnkey Bundles */
                <div className="py-8 space-y-6">
                  <div className={`p-8 text-center space-y-3 border border-dashed ${
                    isLightMode ? 'border-neutral-300 bg-neutral-50/50 text-neutral-500' : 'border-neutral-800 bg-neutral-950/40 text-neutral-400'
                  }`}>
                    <CalendarCheck className="w-10 h-10 text-neutral-400 dark:text-neutral-600 mx-auto" />
                    <p className="text-xs font-medium max-w-sm mx-auto">
                      Your quote scope is empty. Browse the Fleet or Parts tab, or select one of our pre-configured turnkey construction bundles below:
                    </p>
                  </div>

                  {/* Turnkey Quick-Add Bundles */}
                  <div className="space-y-3">
                    <span className="text-[9px] font-mono font-bold text-amber-500 uppercase tracking-widest block">
                      TURNKEY LAGOS JOB PACKAGES (1-CLICK LOAD)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {QUICK_BUNDLES.map(bundle => (
                        <div
                          key={bundle.id}
                          className={`p-3.5 border transition-all flex flex-col justify-between gap-3 text-left ${
                            isLightMode 
                              ? 'bg-neutral-50 border-neutral-200 hover:border-amber-500' 
                              : 'bg-[#0B122C] border-[#182747] hover:border-amber-500/60'
                          }`}
                        >
                          <div>
                            <h4 className={`text-xs font-black uppercase ${isLightMode ? 'text-[#0C122C]' : 'text-white'}`}>
                              {bundle.name}
                            </h4>
                            <p className="text-[10px] text-neutral-500 mt-1 line-clamp-2">
                              {bundle.description}
                            </p>
                          </div>
                          <button
                            onClick={() => handleAddBundle(bundle)}
                            className="bg-amber-500 hover:bg-amber-450 text-neutral-950 text-[9px] font-black uppercase tracking-wider py-1.5 px-3 rounded-none transition-all flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <Sparkles className="w-3 h-3" /> Load Package
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Items List */
                <div className="space-y-3">
                  {addedItems.map(item => {
                    const daysFactor = item.days ? item.days : 1;
                    const itemTotal = item.rateOrPrice * item.quantity * daysFactor;
                    return (
                      <div 
                        key={`${item.type}-${item.id}`} 
                        className={`p-4 rounded-none border transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group ${
                          isLightMode 
                            ? 'bg-white border-neutral-200 hover:border-neutral-300 shadow-xs' 
                            : 'bg-[#0B122C] border-[#182747] hover:border-amber-500/30'
                        }`}
                      >
                        <div className="space-y-1 max-w-sm">
                          <span className={`text-[8px] uppercase font-mono font-black px-2 py-0.5 rounded-none border leading-none ${
                            item.type === 'machinery' 
                              ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' 
                              : item.type === 'service'
                              ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                              : item.type === 'labor'
                              ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                              : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                          }`}>
                            {item.type}
                          </span>
                          <h4 className={`text-xs font-black uppercase transition-colors mt-2 ${
                            isLightMode ? 'text-[#0C122C] group-hover:text-amber-600' : 'text-neutral-100 group-hover:text-amber-500'
                          }`}>
                            {item.name}
                          </h4>
                          <p className="text-[10px] text-neutral-500 font-mono mt-0.5">
                            {formatNaira(item.rateOrPrice)} {item.days ? `x ${item.days} active job days` : 'base unit rate'}
                          </p>
                        </div>

                        <div className="flex items-center gap-4 self-end sm:self-auto">
                          {/* Quantity selector */}
                          <div className={`flex items-center gap-1 border rounded-none px-1 ${
                            isLightMode ? 'bg-neutral-50 border-neutral-300' : 'bg-[#060a1a] border-neutral-800'
                          }`}>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.type, item.quantity - 1)}
                              className="text-neutral-500 hover:text-amber-500 font-bold px-2 py-1 text-xs cursor-pointer"
                              title="Decrease quantity"
                            >
                              -
                            </button>
                            <span className={`text-xs font-mono font-bold px-1 w-6 text-center ${
                              isLightMode ? 'text-neutral-800' : 'text-neutral-200'
                            }`}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.type, item.quantity + 1)}
                              className="text-neutral-500 hover:text-amber-500 font-bold px-2 py-1 text-xs cursor-pointer"
                              title="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          <div className="text-right shrink-0">
                            <span className={`text-xs font-mono font-black ${
                              isLightMode ? 'text-[#0C122C]' : 'text-white'
                            }`}>
                              {formatNaira(itemTotal)}
                            </span>
                            <button
                              onClick={() => onRemoveItem(item.id, item.type)}
                              className="block ml-auto text-neutral-400 hover:text-red-500 mt-2 cursor-pointer transition-colors"
                              title="Delete Item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div className="flex justify-between items-center pt-2">
                    <button
                      onClick={handleCopySummary}
                      className={`text-[9px] uppercase font-bold tracking-wider transition-colors flex items-center gap-1 cursor-pointer ${
                        isLightMode ? 'text-neutral-600 hover:text-neutral-900' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      <Copy className="w-3.5 h-3.5" /> {copiedSummary ? 'Copied to Clipboard' : 'Copy Text Scope'}
                    </button>

                    <button
                      onClick={onClearQuote}
                      className="text-[9px] uppercase font-bold tracking-wider text-red-500 hover:text-red-400 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Clear All Items
                    </button>
                  </div>
                </div>
              )}

              {/* Sourcing & Warranty Assurance Bar */}
              <div className={`p-4 border font-mono text-[10px] space-y-2 ${
                isLightMode ? 'bg-neutral-50 border-neutral-200 text-neutral-600' : 'bg-[#0B122C]/40 border-[#182747] text-neutral-400'
              }`}>
                <div className="flex items-center gap-2 font-bold text-amber-500 uppercase tracking-wider text-[10.5px]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>CLASQO NIGERIA PROCUREMENT COMMITMENT</span>
                </div>
                <p className="leading-relaxed">
                  All chartered Sany machines are staged with active insurance, hydraulic test logs, and Lagos bridge transport clearances. Turkish delivery tubes are forged under European St52 / API standards.
                </p>
              </div>
            </div>

            {/* Client Checkout Form & Dispatch Parameters (Col Span 5) */}
            <div className={`lg:col-span-5 rounded-none border p-6 flex flex-col justify-between space-y-6 transition-colors duration-200 ${
              isLightMode 
                ? 'bg-white border-neutral-200 shadow-sm' 
                : 'bg-[#060a1a] border-[#182747]'
            }`}>
              <form onSubmit={handleCreateMockQuote} className="space-y-4">
                <div className="border-b pb-3 border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-amber-500" />
                    <h3 className={`text-xs font-black uppercase tracking-wider ${isLightMode ? 'text-[#0C122C]' : 'text-neutral-100'}`}>
                      Client & Site Dispatch Details
                    </h3>
                  </div>
                  <span className="text-[9px] font-mono text-neutral-500 font-bold">LAGOS HQ</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={`text-[9px] font-black block mb-1 uppercase tracking-wider ${isLightMode ? 'text-neutral-700' : 'text-neutral-400'}`}>
                      Representative Name
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className={`w-full border rounded-none text-xs p-2.5 font-medium focus:outline-none transition-colors ${
                        isLightMode 
                          ? 'bg-neutral-50 border-neutral-300 text-neutral-900 focus:border-amber-500 focus:bg-white' 
                          : 'bg-[#0B122C] border-[#182747] text-neutral-100 focus:border-amber-500'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`text-[9px] font-black block mb-1 uppercase tracking-wider ${isLightMode ? 'text-neutral-700' : 'text-neutral-400'}`}>
                      Lagos Office Line
                    </label>
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`w-full border rounded-none text-xs p-2.5 font-medium font-mono focus:outline-none transition-colors ${
                        isLightMode 
                          ? 'bg-neutral-50 border-neutral-300 text-neutral-900 focus:border-amber-500 focus:bg-white' 
                          : 'bg-[#0B122C] border-[#182747] text-neutral-100 focus:border-amber-500'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`text-[9px] font-black block mb-1 uppercase tracking-wider ${isLightMode ? 'text-neutral-700' : 'text-neutral-400'}`}>
                    Corporate Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className={`w-full border rounded-none text-xs p-2.5 font-medium focus:outline-none transition-colors ${
                      isLightMode 
                        ? 'bg-neutral-50 border-neutral-300 text-neutral-900 focus:border-amber-500 focus:bg-white' 
                        : 'bg-[#0B122C] border-[#182747] text-neutral-100 focus:border-amber-500'
                    }`}
                  />
                </div>

                <div>
                  <label className={`text-[9px] font-black block mb-1 uppercase tracking-wider ${isLightMode ? 'text-neutral-700' : 'text-neutral-400'}`}>
                    Company Registered Name
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className={`w-full border rounded-none text-xs p-2.5 font-medium focus:outline-none transition-colors ${
                      isLightMode 
                        ? 'bg-neutral-50 border-neutral-300 text-neutral-900 focus:border-amber-500 focus:bg-white' 
                        : 'bg-[#0B122C] border-[#182747] text-neutral-100 focus:border-amber-500'
                    }`}
                  />
                </div>

                <div>
                  <label className={`text-[9px] font-black block mb-1 uppercase tracking-wider ${isLightMode ? 'text-neutral-700' : 'text-neutral-400'}`}>
                    Delivery Site Address / GPS Coordinates
                  </label>
                  <textarea
                    required
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className={`w-full border rounded-none text-xs p-2.5 font-medium h-14 resize-none focus:outline-none transition-colors ${
                      isLightMode 
                        ? 'bg-neutral-50 border-neutral-300 text-neutral-900 focus:border-amber-500 focus:bg-white' 
                        : 'bg-[#0B122C] border-[#182747] text-neutral-100 focus:border-amber-500'
                    }`}
                  />
                </div>

                {/* Dispatch Scheduling & Mobilization Option */}
                <div className="pt-2 space-y-3">
                  <span className={`text-[9px] font-black uppercase tracking-wider block ${isLightMode ? 'text-neutral-700' : 'text-neutral-400'}`}>
                    Mobilization Speed & Sany Operator Team
                  </span>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDispatchPriority('standard')}
                      className={`p-2.5 border text-left rounded-none transition-all cursor-pointer ${
                        dispatchPriority === 'standard'
                          ? 'border-amber-500 bg-amber-500/10 text-amber-500 font-bold'
                          : isLightMode 
                            ? 'border-neutral-200 bg-neutral-50 text-neutral-600' 
                            : 'border-neutral-800 bg-[#0B122C] text-neutral-400'
                      }`}
                    >
                      <span className="text-[10px] uppercase font-bold block">Standard Dispatch</span>
                      <span className="text-[8.5px] block font-mono text-neutral-500">3-5 Working Days</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDispatchPriority('express')}
                      className={`p-2.5 border text-left rounded-none transition-all cursor-pointer ${
                        dispatchPriority === 'express'
                          ? 'border-amber-500 bg-amber-500/10 text-amber-500 font-bold'
                          : isLightMode 
                            ? 'border-neutral-200 bg-neutral-50 text-neutral-600' 
                            : 'border-neutral-800 bg-[#0B122C] text-neutral-400'
                      }`}
                    >
                      <span className="text-[10px] uppercase font-bold block">⚡ Express 24h</span>
                      <span className="text-[8.5px] block font-mono text-neutral-500">+₦150k Priority Permit</span>
                    </button>
                  </div>

                  {machineryCount > 0 && (
                    <label className={`flex items-center gap-2 p-2 border cursor-pointer select-none ${
                      isLightMode ? 'bg-neutral-50 border-neutral-200' : 'bg-[#0B122C] border-[#182747]'
                    }`}>
                      <input
                        type="checkbox"
                        checked={includeOperatorCrew}
                        onChange={(e) => setIncludeOperatorCrew(e.target.checked)}
                        className="accent-amber-500 w-3.5 h-3.5"
                      />
                      <span className="text-[10px] font-bold">
                        Include Licensed Sany Machine Operator (+₦75k/day)
                      </span>
                    </label>
                  )}
                </div>

                {/* Corporate Voucher Code */}
                <div className="pt-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. CLASQO2026)"
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value)}
                      className={`flex-1 border rounded-none text-xs p-2 uppercase font-mono tracking-wider focus:outline-none ${
                        isLightMode 
                          ? 'bg-neutral-50 border-neutral-300 text-neutral-900 focus:border-amber-500' 
                          : 'bg-[#0B122C] border-[#182747] text-neutral-100 focus:border-amber-500'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={handleApplyVoucher}
                      className="bg-neutral-800 hover:bg-neutral-700 text-white text-[10px] font-bold uppercase px-3 rounded-none cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {voucherMessage && (
                    <p className={`text-[9px] mt-1 font-mono ${
                      voucherMessage.startsWith('Success') ? 'text-emerald-500' : 'text-amber-500'
                    }`}>
                      {voucherMessage}
                    </p>
                  )}
                </div>

                {/* Subtotals & Taxes calculation */}
                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-neutral-500">
                    <span>Base Scope Subtotal:</span>
                    <span>{formatNaira(rawSubtotal)}</span>
                  </div>

                  {operatorCrewFee > 0 && (
                    <div className="flex justify-between text-neutral-500">
                      <span>Operator Crew Fee:</span>
                      <span>+{formatNaira(operatorCrewFee)}</span>
                    </div>
                  )}

                  {prioritySurcharge > 0 && (
                    <div className="flex justify-between text-neutral-500">
                      <span>Express 24h Staging Permit:</span>
                      <span>+{formatNaira(prioritySurcharge)}</span>
                    </div>
                  )}

                  {appliedDiscount && (
                    <div className="flex justify-between text-emerald-500 font-bold">
                      <span>Corporate Concession ({appliedDiscount.code}):</span>
                      <span>-{formatNaira(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-neutral-500">
                    <span>Lagos Tax / VAT (7.5%):</span>
                    <span>{formatNaira(vat)}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm font-bold border-t border-neutral-200 dark:border-neutral-800 pt-3">
                    <span className="text-amber-500 uppercase text-[10px] tracking-widest font-black">
                      Grand Total (NGN):
                    </span>
                    <span className="text-amber-500 font-mono text-base sm:text-lg font-black">
                      {formatNaira(grandTotal)}
                    </span>
                  </div>
                </div>

                {addedItems.length > 0 ? (
                  <div className="space-y-2 pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-amber-500 hover:bg-amber-450 disabled:bg-neutral-800 text-neutral-950 py-3.5 rounded-none text-[10px] font-black uppercase tracking-widest shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-neutral-950" />
                          Logging Proforma Contract...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-neutral-950" />
                          Submit Quotation Specs
                        </>
                      )}
                    </button>

                    <a
                      href={`https://wa.me/2348063342947?text=${generateWhatsAppMessage()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#25D366] hover:bg-emerald-500 text-neutral-950 py-3 rounded-none text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    >
                      <MessageSquare className="w-4 h-4 fill-current text-neutral-950" />
                      Instant WhatsApp Quote Dispatch
                    </a>
                  </div>
                ) : (
                  <div className="text-center font-bold text-neutral-500 text-[10px] uppercase tracking-wider py-4 border border-dashed border-neutral-300 dark:border-neutral-800 rounded-none font-mono">
                    Scope Empty • Select Machines or Turnkey Packages
                  </div>
                )}
              </form>
            </div>
          </div>
        )}

        {/* Browser Print Proforma Letterhead Sheet */}
        <div className="hidden print:block bg-white text-zinc-900 p-8 text-xs font-serif min-h-screen border-2 border-zinc-400 max-w-4xl mx-auto font-sans leading-relaxed">
          {/* Print Letterhead */}
          <div className="flex justify-between items-center border-b-2 border-zinc-950 pb-6 mb-6">
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-zinc-950 font-sans uppercase">
                CLASQO INTEGRATED NIGERIA LIMITED
              </h1>
              <p className="text-[9px] font-sans text-zinc-600 tracking-wider font-semibold uppercase mt-0.5">
                Heavy Machinery Leasing • Foundation Piling • European Parts Procurement
              </p>
              <div className="text-[10px] text-zinc-500 leading-tight mt-2 flex flex-col font-sans">
                <span>1 Dr Babatunde Ayeni St, Lekki Scheme, Eti-Osa, Lagos State</span>
                <span>Tel: +234 802 087 9468 • WhatsApp: +234 806 334 2947 • solutions@clasqo.com.ng</span>
                <span>FIRS Registered Corporate TIN: 22441998-0001</span>
              </div>
            </div>
            <div className="text-right font-sans">
              <span className="bg-zinc-950 text-white px-3 py-1 font-extrabold text-[10px] uppercase tracking-widest rounded">
                Official Proforma Estimate
              </span>
              <p className="text-[10px] text-zinc-500 font-mono mt-3">Date: {new Date().toLocaleDateString('en-GB')}</p>
              <p className="text-[10px] text-zinc-500 font-mono font-bold">Ref: #{quoteReference}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-6 font-sans">
            <div>
              <h4 className="text-[11px] font-extrabold text-zinc-950 uppercase border-b border-zinc-300 pb-1 mb-2">
                QUOTED CONTRACTOR
              </h4>
              <p className="font-bold text-zinc-900">{company || 'Registered Corporate'}</p>
              <p className="text-zinc-600">Attn: {clientName}</p>
              <p className="text-zinc-600">Email: {clientEmail}</p>
              <p className="text-zinc-600">Tel: {phone}</p>
            </div>
            <div>
              <h4 className="text-[11px] font-extrabold text-zinc-950 uppercase border-b border-zinc-300 pb-1 mb-2">
                STAGING & LOGISTICS DISPATCH
              </h4>
              <p className="text-zinc-600">{deliveryAddress || 'Site coordinate'}</p>
              <p className="text-zinc-600">Staging Depot: Clasqo Eti-Osa Hub, Lekki</p>
              <p className="text-zinc-600">Escorts: LASTMA Wide-Load Expressway Transit</p>
              <p className="text-zinc-600">Priority: {dispatchPriority === 'express' ? 'Express 24h Mobilization' : 'Standard Scheduled'}</p>
            </div>
          </div>

          <h3 className="text-[10px] font-extrabold text-zinc-950 uppercase tracking-widest bg-zinc-100 p-2 border border-zinc-300 mb-4 font-sans text-center">
            SPECIFICATION BILL OF QUANTITIES
          </h3>

          <table className="w-full text-left border-collapse border border-zinc-300 mb-6 font-sans">
            <thead>
              <tr className="bg-zinc-100 border-b border-zinc-300 font-extrabold text-[10px] text-zinc-800 uppercase">
                <th className="p-2 border-r border-zinc-300">Scope item details</th>
                <th className="p-2 text-center border-r border-zinc-300">Unit rate (NGN)</th>
                <th className="p-2 text-center border-r border-zinc-300">Quantity</th>
                <th className="p-2 text-center border-r border-zinc-300">Duration</th>
                <th className="p-2 text-right">Total Charge</th>
              </tr>
            </thead>
            <tbody className="text-[11px]">
              {addedItems.map((item, idx) => {
                const days = item.days ? item.days : 1;
                const totalItemCharge = item.rateOrPrice * item.quantity * days;
                return (
                  <tr key={idx} className="border-b border-zinc-200">
                    <td className="p-2 border-r border-zinc-300 font-bold">{item.name}</td>
                    <td className="p-2 text-center border-r border-zinc-300 font-mono">{formatNaira(item.rateOrPrice)}</td>
                    <td className="p-2 text-center border-r border-zinc-300 font-mono">{item.quantity}</td>
                    <td className="p-2 text-center border-r border-zinc-300 font-mono">{item.days ? `${item.days} Days` : 'N/A'}</td>
                    <td className="p-2 text-right font-mono font-bold text-zinc-900">{formatNaira(totalItemCharge)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="flex justify-end font-sans">
            <div className="w-1/2 space-y-2 border border-zinc-300 p-3 rounded text-[11px]">
              <div className="flex justify-between text-zinc-600">
                <span>Materials & Rentals Subtotal:</span>
                <span className="font-mono font-bold text-zinc-900">{formatNaira(rawSubtotal)}</span>
              </div>
              {operatorCrewFee > 0 && (
                <div className="flex justify-between text-zinc-600">
                  <span>Operator Crew Allowance:</span>
                  <span className="font-mono font-bold text-zinc-900">+{formatNaira(operatorCrewFee)}</span>
                </div>
              )}
              {prioritySurcharge > 0 && (
                <div className="flex justify-between text-zinc-600">
                  <span>Express Staging Permit:</span>
                  <span className="font-mono font-bold text-zinc-900">+{formatNaira(prioritySurcharge)}</span>
                </div>
              )}
              {appliedDiscount && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Corporate Rebate ({appliedDiscount.code}):</span>
                  <span className="font-mono font-bold text-emerald-700">-{formatNaira(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-600 border-t border-zinc-200 pt-1.5">
                <span>Nigeria VAT Surcharge (7.5%):</span>
                <span className="font-mono font-bold text-zinc-900">{formatNaira(vat)}</span>
              </div>
              <div className="flex justify-between text-zinc-950 font-black text-[12px] border-t-2 border-zinc-900 pt-2 uppercase">
                <span>Grand Total:</span>
                <span className="font-mono text-zinc-950">{formatNaira(grandTotal)}</span>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-12 text-[10px] text-zinc-500 font-sans border-t border-zinc-300 pt-6">
            <div>
              <p className="font-bold text-zinc-800">TERMS AND MOBILIZATION CONDITIONS:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Delivery times: Standard fleet, 2-3 days; Istanbul air freight parts, 7 working days.</li>
                <li>Equipment mobilizes only upon advance proforma endorsement and confirmed payment schedule.</li>
                <li>Fueling and active on-site machinery operator lodging are coordinated per dispatch scope.</li>
              </ul>
            </div>
            <div className="text-right flex flex-col justify-end items-end space-y-8">
              <div className="border-b-2 border-zinc-400 w-44 h-8" />
              <p className="text-[10px] text-zinc-700 font-extrabold uppercase leading-none">AUTHORIZED DISPATCH SIGN-OFF</p>
              <p className="text-[9px] text-zinc-500 mt-0.5 whitespace-nowrap">Clasqo Integrated Nigeria Limited Operations Team</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
