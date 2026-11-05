import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HelpCircle, 
  ChevronDown, 
  Lightbulb, 
  Truck, 
  Wrench, 
  FileText, 
  ShieldCheck, 
  Info,
  Layers,
  ArrowRight,
  CreditCard,
  GraduationCap,
  TrendingUp,
  Activity,
  Search,
  X,
  Compass,
  CheckCircle2,
  DollarSign,
  MessageCircle,
  Sparkles
} from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
  highlight?: string;
  category: string;
}

export interface FAQCategory {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  badge?: string;
}

const CATEGORIES: FAQCategory[] = [
  {
    id: 'investment',
    name: 'USD Investment & Co-Ownership',
    icon: TrendingUp,
    description: '70/30 net lease profit model, $3,000 entry minimums, monthly USD domiciliary wires, CAC co-ownership deeds, and exit liquidation windows.',
    badge: '18.5%–32.4% ROI'
  },
  {
    id: 'vehicle_management',
    name: 'Vehicle & Fleet Telematics',
    icon: Activity,
    description: '250-hour Sany OEM maintenance schedules, 24/7 live GPS telematics for co-owners, certified operator vetting, and 48-hour replacement SLA.',
    badge: 'Live GPS IoT'
  },
  {
    id: 'logistics',
    name: 'Logistics & LASTMA Permits',
    icon: Truck,
    description: 'Traffic regulations, site assessment surveys, LASTMA expressway permitting, and heavy transit route planning across Lagos.',
    badge: 'Lekki Depot'
  },
  {
    id: 'maintenance',
    name: 'Machinery Maintenance & Testing',
    icon: Wrench,
    description: 'Sany Diagnostics support, on-site breakdown SLA, technical crew licensing, and twin-wall pressure pipeline ultrasonic diagnostics.',
    badge: '42-Point Audit'
  },
  {
    id: 'leasing',
    name: 'Leasing & Pricing Rules',
    icon: FileText,
    description: 'Contract parameters, flexible structures, fuel sourcing responsibilities, and runtime extension protocols.',
    badge: 'Turnkey Charters'
  },
  {
    id: 'billing',
    name: 'Billing & International Payments',
    icon: CreditCard,
    description: 'Invoicing formats, mobilization deposits, multi-currency local settlement options, and VAT/WHT compliance certificates.',
    badge: 'USD & NGN'
  },
  {
    id: 'training',
    name: 'Technical Safety & Training',
    icon: GraduationCap,
    description: 'On-site safety training, contractor personnel onboarding, technical documentation, and mechanical alignment guides.',
    badge: 'Zero-Harm SLA'
  }
];

const ALL_FAQS: FAQItem[] = [
  // Investment & Co-Ownership
  {
    category: 'investment',
    question: 'How does the 70/30 Net Lease Profit Share work in practice for investors?',
    answer: 'Under Clasqo\'s asset co-ownership charter, 70% of gross machinery lease revenue generated on active Lagos infrastructure projects is disbursed directly to co-owners in hard currency USD. The remaining 30% is retained by Clasqo Integrated to cover certified machine operators, preventive fuel handling, LASTMA corridor transit permits, all-risks marine insurance, and genuine OEM replacement parts from Sany Global and Istanbul.',
    highlight: 'Co-owners bear zero operational liabilities or unexpected maintenance charges.'
  },
  {
    category: 'investment',
    question: 'What is the minimum capital threshold and what investment packages are available?',
    answer: 'Our program features 4 transparent tiers tailored for individual and institutional investors:\n1. Starter Unit ($3,000 – $9,999 USD) • 18.5% Target APY • Quarterly USD payouts.\n2. Growth Fleet ($10,000 – $24,999 USD) • 22.0% Target APY • Monthly USD domiciliary wire transfer.\n3. Executive Rig ($25,000 – $49,999 USD) • 26.5% Target APY • Dedicated asset manager and semi-annual Lekki yard inspection.\n4. Institutional Syndicate ($50,000 – $250,000+ USD) • 32.4% Target APY • Direct machine serial co-titling, board seat, and escrow priority.',
    highlight: 'Minimum entry is strictly $3,000 USD to ensure high-grade equipment unit allocation.'
  },
  {
    category: 'investment',
    question: 'How and when are investor profits disbursed into my account?',
    answer: 'Dividends are disbursed directly in USD via international SWIFT bank wire into your verified corporate or individual USD Domiciliary Account (held in Nigeria or overseas in the UK, US, Canada, EU, or UAE). Monthly payouts are executed on the 5th business day of each calendar month following mechanical audit sign-offs.',
    highlight: 'Over $1,840,000 USD distributed to date with a 100% on-time record.'
  },
  {
    category: 'investment',
    question: 'What legal documentation and contracts protect my invested capital?',
    answer: 'Every co-owner executes a tripartite legally binding asset partnership contract comprising: (1) A CAC-registered Deed of Equipment Co-Ownership titling your specific machine chassis and engine serial numbers, (2) A 70/30 Profit Sharing & Turnkey Management Agreement, and (3) A Capital Repayment & Escrow Guarantee backed by Clasqo operational reserves.',
    highlight: 'All agreements are notarized by accredited Nigerian commercial legal practitioners.'
  },
  {
    category: 'investment',
    question: 'How is the investment insulated against Nigerian Naira (NGN) currency devaluation?',
    answer: 'Our equipment lease contracts with multinational infrastructure contractors (such as Julius Berger, CCECC, and El-Alan) are either priced directly in USD or benchmarked against prevailing CBN interbank exchange rates. Because the underlying revenue stream is USD-denominated, your invested capital and monthly dividends remain 100% hard-currency hedge assets.',
    highlight: 'Completely removes foreign exchange erosion risks.'
  },
  {
    category: 'investment',
    question: 'What is the exit policy or capital liquidation process at the end of tenure?',
    answer: 'Investors can choose between 6, 12, 24, and 36-month investment horizons. Upon tenure maturity, you can: (1) Liquidate 100% of your initial capital with a 30-day notice period, returning full principal into your USD account, (2) Roll over capital into an upgraded machinery syndicate, or (3) Sell your co-ownership shares to other syndicate partners at market net-asset-value.',
    highlight: 'Guaranteed principal return underwritten by Clasqo Capital Reserves.'
  },

  // Vehicle Management & Fleet Telematics
  {
    category: 'vehicle_management',
    question: 'How does Clasqo manage 24/7 preventative maintenance on active machinery?',
    answer: 'Every machine in the Clasqo fleet adheres to strict Sany Global preventive servicing protocols. Complete mechanical servicing—including high-pressure hydraulic oil flushes, Rexroth piston inspections, and fuel filter replacements—is performed precisely every 250 operating engine hours by our factory-trained Sany certified engineers.',
    highlight: 'Maintains our verified 99.4% field operating uptime record across Lagos.'
  },
  {
    category: 'vehicle_management',
    question: 'Can investors and charter clients access real-time GPS telematics and hour meters?',
    answer: 'Yes. Every co-owner and corporate lessee is granted secure portal login credentials to Clasqo Telematics Suite. The dashboard broadcasts real-time GPS geolocation, active engine runtime hours, hydraulic pressure readings, diesel fuel consumption curves, and outrigger tilt sensor diagnostics in 60-second intervals.',
    highlight: 'Total operational transparency accessible via mobile browser or desktop.'
  },
  {
    category: 'vehicle_management',
    question: 'What happens if a chartered machine experiences on-site mechanical failure?',
    answer: 'Clasqo operates an audited Tier-1 SLA guarantee. In the rare event of on-site mechanical or hydraulic malfunction, a rapid-response service truck is dispatched from our Lekki Staging Yard with a 2-hour arrival target. If repairs cannot be resolved on-site within 24 hours, an equivalent backup machine is mobilized from our reserve fleet at zero additional cost.',
    highlight: 'Guaranteed 48-hour equipment replacement SLA ensures zero site shutdowns.'
  },
  {
    category: 'vehicle_management',
    question: 'How are equipment operators screened, certified, and managed?',
    answer: 'We do not utilize third-party freelance operators. Every Clasqo operator is an in-house full-time staff member holding valid heavy-machinery certifications and having completed the annual Sany Masterclass. They undergo rigorous drug screening, safety recertification, and coastal sand maneuvering tests.',
    highlight: 'Operator payroll, workers compensation, and site housing are 100% managed by Clasqo.'
  },
  {
    category: 'vehicle_management',
    question: 'What insurance covers the machinery during transport and site operations?',
    answer: 'The entire fleet is insured under an All-Risks Heavy Equipment & Marine Foundation Insurance policy underwritten by leading institutional insurers (AXA Mansard Plc and Leadway Assurance). Coverage includes transit accidents, machinery breakdown, flood damage, fire, and third-party liabilities.',
    highlight: 'Provides complete asset balance-sheet protection for co-owners.'
  },

  // Logistics & LASTMA Permits
  {
    category: 'logistics',
    question: 'How does Clasqo handle heavy transport logistics across Lagos traffic and low-clearance bridges?',
    answer: 'We coordinate all route clearances in-house using specialized modular heavy-duty lowbed trailers. For complex routes across Lekki-Epe Expressway, Third Mainland Bridge, Ikorodu, or Apapa port corridors, we secure necessary LASTMA road transit certificates, federal highway escort permissions, and low-bridge overhead authorizations before dispatch.',
    highlight: 'Our modular lowbed systems are optimized for Sany heavy truck concrete boom pumps.'
  },
  {
    category: 'logistics',
    question: 'Do you conduct preliminary site assessment surveys before dispatching heavy concrete pumps?',
    answer: 'Yes, a pre-dispatch site survey is part of our mandatory safety protocol. Our technical survey crew inspects your Lagos staging ground for load-bearing capacity (particularly for outrigger stabilization points), accesses tight alley corridors, and measures overhead HT powerline boundaries to design safe equipment footprints.',
    highlight: 'Protects critical high-pressure pumping operations from swampy ground failure.'
  },
  {
    category: 'logistics',
    question: 'What are the average equipment delivery timelines from the Lekki Staging Yard?',
    answer: 'Dispatch typically commences 12 to 24 hours following certified quote sign-off and safety audit checkouts. While immediate Lekki and Eti-Osa deliveries are extremely fast, Mainland sites, Ibeju-Lekki deep seaport clusters, and Ogun state boundary zones are scheduled for late-night or early-morning low-traffic windows.',
    highlight: 'Ensures transit compliance within Lagos municipal time windows.'
  },

  // Maintenance & Testing
  {
    category: 'maintenance',
    question: 'How frequently are Sany machinery and Turkish twin-wall pipelines audited for safety?',
    answer: 'Uncompromising engineering safety is our policy. Every machinery system undergoes a 42-point pressure and structural integrity test checklist upon return to our yard. For high-pressure straight pipes and 90-degree wear elbows, we conduct ultrasonic thickness diagnostics to eliminate burst hazards under heavy aggregate load.',
    highlight: 'Every pipeline assembly must hold a 140-bar hydraulic certified test run.'
  },
  {
    category: 'maintenance',
    question: 'Where do you source your concrete pipelines and replacement parts?',
    answer: 'All our high-pressure pipelines (DN125 twin-wall pipes, hardened 90° wear elbows, quick-snap couplings, and slide valves) are imported directly from certified steel manufacturing mills in Istanbul, Turkey. These components feature 65 HRC chromium carbide inner sleeves designed to withstand over 50,000 m³ of aggregate abrasive scour.',
    highlight: 'Stock is staged directly at our Lekki Yard for instant emergency dispatch.'
  },

  // Leasing & Pricing
  {
    category: 'leasing',
    question: 'What flexible pricing structures do you offer for new civil projects?',
    answer: 'We provide three primary billing modes: (1) Standard daily rates for single slab-casts, (2) Weekly and monthly discounted packages for multi-story foundation laying, and (3) Turnkey operation packages combining equipment lease, raw aggregate pumping pipelines, and full technical crew oversight.',
    highlight: 'Prorated credits are automatically calculated for early project sign-offs.'
  },
  {
    category: 'leasing',
    question: 'Who is responsible for fuel sourcing and on-site overnight machine safety?',
    answer: 'Diesel fuel sourcing (Automotive Gas Oil conforming to low-sulfur premium limits to safeguard Sany clean common-rail injection engines) can either be client-supplied or wholesale packages through Clasqo. Securing safe, guarded overnight storage on the construction site is the principal lessee\'s responsibility.',
    highlight: 'Protects advanced direct-injection engine sensors and high-pressure fuel loops.'
  },
  {
    category: 'leasing',
    question: 'Can we adjust or extend our lease runtime durational schedules mid-project?',
    answer: 'Yes. We recognize that coastal concrete pouring schedules depend on unpredictable weather and cement mill supplies. You can request dynamic run-time adjustments or lease extensions directly through the active dispatcher desk. Prorated bulk-use discounts will apply to any extensions over 7 days.',
    highlight: 'Seamless contract amendments with zero penalty fees.'
  },

  // Billing & Payments
  {
    category: 'billing',
    question: 'What are the payment milestones and mobilization deposits required for equipment charters?',
    answer: 'For first-time clients, we require a 100% logistics mobilization fee plus a 50% down-payment of the estimated lease period before equipment dispatch. For long-term partners with pre-audited corporate credit lines, we offer flexible 15-day or 30-day post-delivery payment terms.',
    highlight: 'All local transactions are subject to standard FIRS VAT and withholding tax structures.'
  },
  {
    category: 'billing',
    question: 'Can we settle payments in foreign currencies besides Nigerian Naira (NGN)?',
    answer: 'Yes. We support dual-currency billing options securely settled through our certified corporate bank accounts in Lagos or international domiciliary loops (USD, Euro). Exchange conversions are calculated using the official CBN banking rate valid on the day of milestone invoicing.',
    highlight: 'Streamlines overseas funding pipelines for regional infrastructure developers.'
  },

  // Training & Safety
  {
    category: 'training',
    question: 'Do you provide on-site safety induction training for our contractor ground crews?',
    answer: 'Absolutely. On the morning of mobilization, our staging supervisors host a complimentary 30-minute safety briefing with your civil site foreman, riggers, and concrete crew. We ensure everyone understands emergency cutoff triggers, high-pressure pipeline hazards, and outrigger clear-zones to avoid tipping incidents.',
    highlight: 'A key component of Clasqo’s commitment to Zero-Harm site operations.'
  },
  {
    category: 'training',
    question: 'What manual documentation or operator diagnostic sheets are supplied with the fleet?',
    answer: 'Every machine is dispatched with its corresponding digital safety handbook, laminated pressure tolerances tables, high-chromium pipe assembly logs, and a daily operator shift verification card. Laminated reference cards are permanently mounted inside the operator cabins for instant consulting.',
    highlight: 'Complies fully with Nigerian Society of Engineers guidelines.'
  }
];

export default function FAQSection({ isLightMode = false }: { isLightMode?: boolean }) {
  const [activeCategory, setActiveCategory] = useState<string>('investment');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIndices, setExpandedIndices] = useState<Record<string, boolean>>({ '0': true });

  // Filter FAQs by category or search term
  const displayedFAQs = useMemo(() => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return ALL_FAQS.filter(
        item => item.question.toLowerCase().includes(q) || 
                item.answer.toLowerCase().includes(q) ||
                (item.highlight && item.highlight.toLowerCase().includes(q))
      );
    }
    return ALL_FAQS.filter(item => item.category === activeCategory);
  }, [activeCategory, searchQuery]);

  const toggleAccordion = (idxKey: string) => {
    setExpandedIndices(prev => ({
      ...prev,
      [idxKey]: !prev[idxKey]
    }));
  };

  const handleExpandAll = () => {
    const next: Record<string, boolean> = {};
    displayedFAQs.forEach((_, i) => {
      next[String(i)] = true;
    });
    setExpandedIndices(next);
  };

  const handleCollapseAll = () => {
    setExpandedIndices({});
  };

  const activeCategoryObj = CATEGORIES.find(c => c.id === activeCategory) || CATEGORIES[0];

  return (
    <section 
      id="clasqo-faq-index"
      className={`py-20 border-t border-b transition-colors duration-200 relative overflow-hidden ${
        isLightMode 
          ? 'bg-[#FFFFFF] border-neutral-200' 
          : 'bg-[#080D22] border-[#182747]'
      }`}
    >
      {/* Background visual detail */}
      <div className={`absolute top-0 right-1/4 w-96 h-96 rounded-full filter blur-3xl pointer-events-none ${
        isLightMode ? 'bg-amber-500/3' : 'bg-amber-500/5'
      }`} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] text-amber-500 font-black uppercase tracking-[0.25em] leading-none mb-2 font-mono flex items-center justify-center gap-1.5"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-500 animate-pulse" /> CLASQO HELP CENTER & OPERATIONAL SPECIFICATIONS
          </motion.span>
          <h2 className={`text-3xl sm:text-4xl font-black uppercase tracking-tight ${
            isLightMode ? 'text-[#0C122C]' : 'text-white'
          }`}>
            Frequently Asked Questions
          </h2>
          <p className={`text-xs sm:text-sm mt-3 leading-relaxed ${
            isLightMode ? 'text-neutral-600' : 'text-neutral-400'
          }`}>
            Review verified details on USD equipment co-ownership returns (18.5%–32.4% ROI), 24/7 fleet telematics, Sany machinery charters, and LASTMA transit protocols across Lagos.
          </p>
        </div>

        {/* Live Search and Quick Action Toolbar */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className={`p-2 sm:p-2.5 border flex flex-col sm:flex-row items-center gap-2 shadow-sm ${
            isLightMode ? 'bg-neutral-50 border-neutral-300' : 'bg-[#0B1535] border-[#182747]'
          }`}>
            <div className="relative flex-1 w-full flex items-center">
              <Search className="w-4 h-4 text-amber-500 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search investment yields, vehicle telematics, boom pumps, LASTMA permits..."
                className={`w-full pl-9 pr-8 py-2 text-xs font-sans outline-none rounded-none ${
                  isLightMode 
                    ? 'bg-white border border-neutral-200 text-[#0C122C] placeholder-neutral-400' 
                    : 'bg-[#060a1a] border border-[#182747] text-white placeholder-neutral-500'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 text-neutral-400 hover:text-white p-1"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-between sm:justify-end">
              <button
                onClick={handleExpandAll}
                className={`px-3 py-2 text-[10px] font-mono uppercase font-bold border transition-colors cursor-pointer ${
                  isLightMode 
                    ? 'bg-white border-neutral-300 hover:bg-neutral-100 text-neutral-700' 
                    : 'bg-[#060a1a] border-[#182747] hover:border-amber-500 text-neutral-300'
                }`}
              >
                Expand All
              </button>
              <button
                onClick={handleCollapseAll}
                className={`px-3 py-2 text-[10px] font-mono uppercase font-bold border transition-colors cursor-pointer ${
                  isLightMode 
                    ? 'bg-white border-neutral-300 hover:bg-neutral-100 text-neutral-700' 
                    : 'bg-[#060a1a] border-[#182747] hover:border-amber-500 text-neutral-300'
                }`}
              >
                Collapse
              </button>
            </div>
          </div>

          {searchQuery && (
            <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-neutral-400 px-1">
              <span>Found <strong className="text-amber-500">{displayedFAQs.length}</strong> questions matching "{searchQuery}"</span>
              <button 
                onClick={() => setSearchQuery('')}
                className="text-amber-500 underline hover:text-amber-400 cursor-pointer"
              >
                Clear Filter
              </button>
            </div>
          )}
        </div>

        {/* Categories Tab Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Tab buttons sidebar (Col span 4) */}
          <div className="lg:col-span-4 space-y-3">
            <span className={`text-[9px] font-mono font-bold uppercase tracking-wider block ${
              isLightMode ? 'text-neutral-400' : 'text-neutral-500'
            }`}>
              OPERATIONAL SECTORS
            </span>
            <div className="flex flex-col gap-2">
              {CATEGORIES.map((cat) => {
                const CategoryIcon = cat.icon;
                const isActive = !searchQuery && cat.id === activeCategory;
                const count = ALL_FAQS.filter(f => f.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory(cat.id);
                      setExpandedIndices({ '0': true });
                    }}
                    className={`w-full flex items-left text-left p-3.5 sm:p-4 rounded-none border transition-all cursor-pointer relative group ${
                      isActive 
                        ? isLightMode 
                          ? 'bg-amber-500 border-amber-500 text-neutral-950 translate-x-1 shadow-md'
                          : 'bg-[#0B1535] border-amber-500 text-amber-500 translate-x-1 shadow-lg'
                        : isLightMode
                          ? 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:bg-neutral-100 hover:border-neutral-300'
                          : 'bg-[#050918] border-[#182747] text-neutral-400 hover:text-white hover:border-[#1c305e]'
                    }`}
                  >
                    {/* Active accent bar */}
                    {isActive && (
                      <div className={`absolute top-0 bottom-0 left-0 w-[4px] ${
                        isLightMode ? 'bg-neutral-900' : 'bg-amber-500'
                      }`} />
                    )}

                    <div className="flex items-start gap-3 w-full">
                      <div className={`w-9 h-9 flex items-center justify-center shrink-0 ${
                        isActive 
                          ? isLightMode ? 'bg-neutral-900/10 text-neutral-950' : 'bg-amber-500/10 text-amber-500' 
                          : 'bg-neutral-500/5 text-neutral-500'
                      }`}>
                        <CategoryIcon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className={`text-xs font-black uppercase tracking-wider truncate ${
                            isActive 
                              ? isLightMode ? 'text-neutral-950' : 'text-amber-500' 
                              : isLightMode ? 'text-[#0C122C]' : 'text-neutral-200'
                          }`}>
                            {cat.name}
                          </h4>
                          {cat.badge && (
                            <span className={`text-[8px] font-mono px-1.5 py-0.2 shrink-0 font-bold ${
                              isActive
                                ? 'bg-neutral-950 text-amber-400'
                                : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                            }`}>
                              {cat.badge}
                            </span>
                          )}
                        </div>
                        <p className={`text-[9.5px] mt-1 line-clamp-2 leading-relaxed ${
                          isActive 
                            ? isLightMode ? 'text-neutral-900/90' : 'text-neutral-300' 
                            : isLightMode ? 'text-neutral-500' : 'text-neutral-500'
                        }`}>
                          {cat.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Direct support CTA card */}
            <div className={`p-4 border font-mono text-[10px] mt-4 space-y-3 ${
              isLightMode ? 'bg-neutral-50 border-neutral-200' : 'bg-[#050918]/60 border-[#182747]'
            }`}>
              <div className="flex items-start gap-2 text-amber-500 font-bold uppercase leading-none">
                <Sparkles className="w-4 h-4 shrink-0 text-amber-500" />
                <span>Live Engineering Support</span>
              </div>
              <p className={isLightMode ? 'text-neutral-600 leading-relaxed' : 'text-neutral-400 leading-relaxed'}>
                Have a specialized engineering or USD co-ownership question? Ask our AI Live Support Assistant directly via the floating console or WhatsApp.
              </p>
              <div className="pt-2 flex justify-between items-center text-[10px] uppercase font-bold text-amber-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> SANY TIER-1
                </span>
                <span className="flex items-center gap-1 text-emerald-500 font-mono text-[9px] font-bold">
                  ● 24/7 ONLINE
                </span>
              </div>
            </div>
          </div>

          {/* FAQ Accordion list (Col span 8) */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Category header inside active slot */}
            <div className="pb-3 border-b border-dashed border-neutral-700/30 flex items-center justify-between font-mono">
              <span className={`text-[10px] uppercase tracking-wider ${
                isLightMode ? 'text-neutral-500' : 'text-neutral-400'
              }`}>
                {searchQuery ? `Search Results (${displayedFAQs.length} Matches)` : `Department » ${activeCategoryObj.name}`}
              </span>
              <span className="bg-amber-500/10 text-amber-500 text-[8.5px] font-black px-2 py-0.5 rounded-none uppercase">
                {displayedFAQs.length} Question{displayedFAQs.length === 1 ? '' : 's'}
              </span>
            </div>

            {displayedFAQs.length === 0 ? (
              <div className={`p-10 text-center border font-mono ${
                isLightMode ? 'bg-white border-neutral-200' : 'bg-[#050918] border-[#182747]'
              }`}>
                <HelpCircle className="w-8 h-8 text-amber-500 mx-auto mb-2 animate-bounce" />
                <h4 className="text-xs font-bold uppercase tracking-wider">No matching answers found</h4>
                <p className="text-[10px] text-neutral-400 mt-1">Try another search keyword or contact our dispatch desk directly.</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 px-3 py-1.5 bg-amber-500 text-neutral-950 font-bold text-[9px] uppercase tracking-wider cursor-pointer"
                >
                  Clear Search Filter
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {displayedFAQs.map((item, idx) => {
                  const key = String(idx);
                  const isOpen = !!expandedIndices[key];
                  return (
                    <div 
                      key={idx}
                      className={`border transition-all duration-200 ${
                        isOpen 
                          ? isLightMode 
                            ? 'bg-white border-amber-500 shadow-sm' 
                            : 'bg-[#0B1535]/50 border-amber-500'
                          : isLightMode 
                            ? 'bg-neutral-50 border-neutral-200 hover:border-neutral-300' 
                            : 'bg-[#050918] border-[#182747] hover:border-[#1c305e]'
                      }`}
                    >
                      {/* Accordion trigger button */}
                      <button
                        onClick={() => toggleAccordion(key)}
                        className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer"
                      >
                        <h3 className={`text-xs sm:text-sm font-bold uppercase tracking-wide leading-snug ${
                          isOpen 
                            ? 'text-amber-500' 
                            : isLightMode ? 'text-[#0C122C]' : 'text-white'
                        }`}>
                          {item.question}
                        </h3>
                        <div className={`mt-0.5 w-5 h-5 shrink-0 flex items-center justify-center border transition-transform duration-200 ${
                          isOpen 
                            ? 'bg-amber-500/10 border-amber-500 text-amber-500 rotate-180' 
                            : isLightMode ? 'bg-white border-neutral-300 text-neutral-550' : 'bg-[#050918] border-neutral-800 text-neutral-550'
                        }`}>
                          <ChevronDown className="w-3.5 h-3.5" />
                        </div>
                      </button>

                      {/* Accordion expandable panel */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: 'easeOut' }}
                            className="overflow-hidden"
                          >
                            <div className={`px-4 sm:px-5 pb-5 pt-0 text-xs leading-relaxed space-y-3.5 border-t border-dashed ${
                              isLightMode ? 'border-neutral-200 text-neutral-600' : 'border-[#182747] text-neutral-300'
                            }`}>
                              <p className="font-sans leading-relaxed text-xs sm:text-[13px] whitespace-pre-line pt-3">
                                {item.answer}
                              </p>

                              {item.highlight && (
                                <div className={`flex items-start gap-2.5 p-3 font-mono text-[10px] leading-relaxed border ${
                                  isLightMode 
                                    ? 'bg-amber-500/5 border-amber-500/30 text-[#0C122C]' 
                                    : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                                }`}>
                                  <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                                  <div>
                                    <span className="font-bold uppercase tracking-wider block mb-0.5 text-amber-500">
                                      AUDITED SPECIFICATION MEMO:
                                    </span>
                                    {item.highlight}
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Quick action checklist footer */}
            <div className={`p-4 font-mono text-[9px] flex flex-wrap items-center justify-between gap-4 border ${
              isLightMode ? 'bg-neutral-50 border-neutral-200 text-neutral-500' : 'bg-[#050918]/40 border-[#182747]/60 text-neutral-400'
            }`}>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> SANY GLOBAL & CAC CERTIFIED COMPILATION
              </span>
              <span className="flex items-center gap-1 leading-none text-amber-500 font-bold">
                LEKKI STAGING YARD PIN: 101-ETH-LEKKI
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
