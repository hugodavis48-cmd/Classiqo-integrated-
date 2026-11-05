import React, { useState } from 'react';
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
  GraduationCap
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  highlight?: string;
}

interface FAQCategory {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  items: FAQItem[];
}

const FAQ_DATA: FAQCategory[] = [
  {
    id: 'logistics',
    name: 'Logistics & Permits',
    icon: Truck,
    description: 'Traffic regulations, site assessment surveys, LASTMA expressway permitting, and heavy transit route planning across Lagos.',
    items: [
      {
        question: 'How does Clasqo handle heavy transport logistics across Lagos traffic and low-clearance bridges?',
        answer: 'We coordinate all route clearances in-house using specialized modular heavy-duty lowbed trailers. For complex routes across Lekki-Epe Expressway, Third Mainland, Ikorodu, or Apapa, we secure necessary LASTMA road transit certificates, federal highway escort permissions, and low-bridge overhead authorizations before dispatch.',
        highlight: 'Our modular lowbed systems are optimized for Sany heavy truck concrete boom pumps.'
      },
      {
        question: 'Do you conduct preliminary site assessment surveys before dispatching heavy concrete pumps?',
        answer: 'Yes, a pre-dispatch site survey is part of our mandatory safety protocol. Our technical survey crew inspects your Lagos staging ground for load-bearing capacity (particularly for outrigger stabilization points), accesses tight alley corridors, and measures overhead HT powerline boundaries to design safe equipment footprints.',
        highlight: 'Protects critical high-pressure pumping operations from swampy ground failure.'
      },
      {
        question: 'What are the average equipment delivery timelines from the Lekki Staging Yard?',
        answer: 'Dispatch typically commences 12 to 24 hours following certified quote sign-off and safety audit checkouts. While immediate Lekki and Eti-Osa deliveries are extremely fast, Mainland sites, Ibeju-Lekki deep seaport clusters, and Ogun state boundary zones are scheduled for late-night or early-morning low-traffic windows.',
        highlight: 'Ensures transit compliance within Lagos municipal time windows.'
      }
    ]
  },
  {
    id: 'maintenance',
    name: 'Machinery Maintenance',
    icon: Wrench,
    description: 'Sany Diagnostics support, on-site breakdown SLA, technical crew licensing, and twin-wall pressure pipeline pressure tests.',
    items: [
      {
        question: 'What happens if a concrete pump or crawler piling rig experiences downtime on site?',
        answer: 'Clasqo operates a Tier-1 SLA response engine. In case of any mechanical, hydraulic, or electronic issues on-site, a rapid-duty service mechanical crew is dispatched from our Lekki depot with a target 2-hour response window. Our field vans run fully loaded with diagnostic tools and essential spare parts.',
        highlight: '98% on-site uptime rate across our active Lagos leasing projects.'
      },
      {
        question: 'How frequently are Sany machinery and Turkish twin-wall pipelines audited for safety?',
        answer: 'Uncompromising engineering safety is our policy. Every machinery system undergoes a 42-point pressure and structural integrity test checklist upon return to our yard. For high-pressure straight pipes and 90-degree wear elbows, we conduct ultrasonic thickness diagnostics to eliminate burst hazards under heavy aggregate load.',
        highlight: 'Every pipeline assembly must hold a 140-bar hydraulic certified test run.'
      },
      {
        question: 'Are Clasqo operator crews trained, licensed, and certified?',
        answer: 'Yes, all machinery is chartered with our in-house, certified professional operators. Every operator holds active heavy-equipment licenses, passes annual Sany specialized masterclasses, and has a minimum of 5 years of active experience operating large-batch hydraulic pumps in swampy coastal soils across West Africa.',
        highlight: 'Operator costs are fully transparent and pre-negotiated within your quote.'
      }
    ]
  },
  {
    id: 'leasing',
    name: 'Leasing & Pricing Rules',
    icon: FileText,
    description: 'Contract parameters, flexible structures, fuel sourcing responsibilities, and runtime extension protocols.',
    items: [
      {
        question: 'What flexible pricing structures do you offer for new civil projects?',
        answer: 'We provide three primary billing modes: (1) Standard daily rates for single slab-casts, (2) Weekly and monthly discounted packages for multi-story foundation laying, and (3) Turnkey operation packages combining equipment lease, raw aggregate pumping pipelines, and full technical crew oversight.',
        highlight: 'Prorated credits are automatically calculated for early project sign-offs.'
      },
      {
        question: 'Who is responsible for fuel sourcing and on-site overnight machine safety?',
        answer: 'Diesel fuel sourcing (Automotive Gas Oil conforming to low-sulfur premium limits to safeguard Sany clean common-rail injection engines) can either be client-supplied or wholesale packages through Clasqo. Securing safe, guarded overnight storage on the construction site is the principal lessee\'s responsibility.',
        highlight: 'Protects advanced direct-injection engine sensors and high-pressure fuel loops.'
      },
      {
        question: 'Can we adjust or extend our lease runtime durational schedules mid-project?',
        answer: 'Yes. We recognize that coastal concrete pouring schedules depend on unpredictable weather and cement mill supplies. You can request dynamic run-time adjustments or lease extensions directly through the active dispatcher desk. Prorated bulk-use discounts will apply to any extensions over 7 days.',
        highlight: 'Seamless contract amendments with zero penalty fees.'
      }
    ]
  },
  {
    id: 'billing',
    name: 'Billing & Payments',
    icon: CreditCard,
    description: 'Invoicing formats, mobilization deposits, multi-currency local settlement options, and VAT/WHT compliance certificates.',
    items: [
      {
        question: 'What are the payment milestones and mobilization deposits required for equipment charters?',
        answer: 'For first-time clients, we require a 100% logistics mobilization fee plus a 50% down-payment of the estimated lease period before equipment dispatch. For long-term partners with pre-audited corporate credit lines, we offer flexible 15-day or 30-day post-delivery payment terms.',
        highlight: 'All local transactions are subject to standard FIRS VAT and withholding tax structures.'
      },
      {
        question: 'Can we settle payments in foreign currencies besides Nigerian Naira (NGN)?',
        answer: 'Yes. We support dual-currency billing options securely settled through our certified corporate bank accounts in Lagos or international domiciliary loops (USD, Euro). Exchange conversions are calculated using the official CBN banking rate valid on the day of milestone invoicing.',
        highlight: 'Streamlines overseas funding pipelines for regional infrastructure developers.'
      },
      {
        question: 'Do you charge extra for standby time or weather-induced concrete delays?',
        answer: 'Standard rates include up to 2 hours of complimentary standby time per day to accommodate local concrete mixer delays. Excess standby delays caused by cement supply shortages are billed at a prorated hourly rate, while recognized force majeure weather disruptions receive extended grace options under dispatcher desk approval.',
        highlight: 'Minimizes financial penalties during unpredictable tropical precipitation cycles.'
      }
    ]
  },
  {
    id: 'training',
    name: 'Technical Support & Training',
    icon: GraduationCap,
    description: 'On-site safety training, contractor personnel onboarding, technical documentation, and mechanical alignment guides.',
    items: [
      {
        question: 'Do you provide on-site safety induction training for our contractor ground crews?',
        answer: 'Absolutely. On the morning of mobilization, our staging supervisors host a complimentary 30-minute safety briefing with your civil site foreman, riggers, and concrete crew. We ensure everyone understands emergency cutoff triggers, high-pressure pipeline hazards, and outrigger clear-zones to avoid tipping incidents.',
        highlight: 'A key component of Clasqo’s commitment to Zero-Harm site operations.'
      },
      {
        question: 'Can we request specialized training for our core personnel on Sany technical equipment dashboards?',
        answer: 'Yes, for clients desiring advanced real-time oversight, we offer training sessions on Sany digital dashboard integration, fluid level alerts, and hydraulic alignment metrics. Our engineering leads provide quick checklists, pressure-drop curves, and concrete viscosity guidelines to help your teams maximize delivery speed.',
        highlight: 'Empowers your crew to handle minor troubleshooting with direct radio support.'
      },
      {
        question: 'What manual documentation or operator diagnostic sheets are supplied with the fleet?',
        answer: 'Every machine is dispatched with its corresponding digital safety handbook, laminated pressure tolerances tables, high-chromium pipe assembly logs, and a daily operator shift verification card. Laminated reference cards are permanently mounted inside the operator cabins for instant consulting.',
        highlight: 'Complies fully with Nigerian Society of Engineers guidelines.'
      }
    ]
  }
];

export default function FAQSection({ isLightMode = false }: { isLightMode?: boolean }) {
  const [activeCategory, setActiveCategory] = useState<string>('logistics');
  const [expandedId, setExpandedId] = useState<number | null>(0);

  const selectedCategoryData = FAQ_DATA.find(cat => cat.id === activeCategory) || FAQ_DATA[0];

  const handleToggleFAQ = (idx: number) => {
    setExpandedId(prev => (prev === idx ? null : idx));
  };

  return (
    <section 
      id="clasqo-faq-index"
      className={`py-16 border-t border-b transition-colors duration-200 relative overflow-hidden ${
        isLightMode 
          ? 'bg-[#FFFFFF] border-neutral-200' 
          : 'bg-[#080D22] border-[#182747]'
      }`}
    >
      {/* Background visual detail */}
      <div className={`absolute top-0 right-1/4 w-80 h-80 rounded-full filter blur-3xl pointer-events-none ${
        isLightMode ? 'bg-amber-500/2' : 'bg-amber-500/5'
      }`} />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] text-amber-500 font-black uppercase tracking-[0.25em] leading-none mb-2 font-mono flex items-center justify-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-amber-500 animate-pulse" /> CLASQO HELP CENTER
          </span>
          <h2 className={`text-3xl font-black uppercase tracking-tight ${
            isLightMode ? 'text-[#0C122C]' : 'text-white'
          }`}>
            Frequently Asked Questions
          </h2>
          <p className={`text-xs sm:text-sm mt-2 leading-relaxed ${
            isLightMode ? 'text-neutral-600' : 'text-neutral-400'
          }`}>
            Review standard engineering logistics, Sany maquinaria diagnostics, and flexible equipment lease frameworks staged from Eti-Osa.
          </p>
        </div>

        {/* Categories Tab Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Tab buttons sidebar (Col span 4) */}
          <div className="lg:col-span-4 space-y-3">
            <span className={`text-[9px] font-mono font-bold uppercase tracking-wider block ${
              isLightMode ? 'text-neutral-400' : 'text-neutral-500'
            }`}>
              SELECT DEPT INQUIRY
            </span>
            <div className="flex flex-col gap-2">
              {FAQ_DATA.map((cat) => {
                const CategoryIcon = cat.icon;
                const isActive = cat.id === activeCategory;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setExpandedId(0); // Reset accordion to first item in new tab
                    }}
                    className={`w-full flex items-left text-left p-4 rounded-none border transition-all cursor-pointer relative group ${
                      isActive 
                        ? isLightMode 
                          ? 'bg-amber-500 border-amber-500 text-neutral-950 translate-x-1'
                          : 'bg-[#0B122C]/80 border-amber-500 text-amber-500 translate-x-1'
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

                    <div className="flex items-start gap-3.5">
                      <div className={`w-10 h-10 flex items-center justify-center shrink-0 ${
                        isActive 
                          ? isLightMode ? 'bg-neutral-900/10 text-neutral-950' : 'bg-amber-500/10 text-amber-500' 
                          : 'bg-neutral-500/5 text-neutral-500'
                      }`}>
                        <CategoryIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className={`text-xs font-black uppercase tracking-wider ${
                          isActive 
                            ? isLightMode ? 'text-neutral-950' : 'text-amber-550' 
                            : isLightMode ? 'text-[#0C122C]' : 'text-neutral-200'
                        }`}>
                          {cat.name}
                        </h4>
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

            {/* Direct support CTA */}
            <div className={`p-4 border font-mono text-[10px] mt-4 space-y-3.5 ${
              isLightMode ? 'bg-neutral-50 border-neutral-200' : 'bg-[#050918]/50 border-[#182747]'
            }`}>
              <div className="flex items-start gap-2 text-amber-550 font-bold uppercase leading-none">
                <Lightbulb className="w-4 h-4 shrink-0" />
                <span>Custom Charter?</span>
              </div>
              <p className={isLightMode ? 'text-neutral-600 leading-relaxed' : 'text-neutral-400 leading-relaxed'}>
                Can't find a response matched to your civil engineering scope? Load up our AI Consultant to run custom calculations on-demand, or talk with dispatch.
              </p>
              <div className="pt-1.5 flex justify-between items-center text-[10px] uppercase font-bold text-amber-550">
                <span>SECURED CORES TIER-1</span>
                <span className="flex items-center gap-1.5 animate-pulse text-emerald-500 font-mono text-[9px] font-bold">
                  ● ACTIVE DIRECTORY
                </span>
              </div>
            </div>
          </div>

          {/* FAQ Accordion list (Col span 8) */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Category header inside active slot */}
            <div className="pb-3 border-b border-dashed border-neutral-700/30 flex items-center justify-between">
              <span className={`text-[10px] font-mono uppercase tracking-wider ${
                isLightMode ? 'text-neutral-500' : 'text-neutral-400'
              }`}>
                Engineering Desk &raquo; {selectedCategoryData.name} FAQs
              </span>
              <span className="bg-amber-500/10 text-amber-500 text-[8.5px] font-black font-mono px-2 py-0.5 rounded-none uppercase">
                {selectedCategoryData.items.length} Bulletins
              </span>
            </div>

            <div className="space-y-3">
              {selectedCategoryData.items.map((item, idx) => {
                const isOpen = expandedId === idx;
                return (
                  <div 
                    key={idx}
                    className={`border transition-all duration-250 ${
                      isOpen 
                        ? isLightMode 
                          ? 'bg-white border-amber-500 shadow-sm' 
                          : 'bg-[#0B122C]/40 border-amber-500'
                        : isLightMode 
                          ? 'bg-neutral-50 border-neutral-200 hover:border-neutral-300' 
                          : 'bg-[#050918] border-[#182747] hover:border-[#1c305e]'
                    }`}
                  >
                    {/* Accordion trigger button */}
                    <button
                      onClick={() => handleToggleFAQ(idx)}
                      className="w-full text-left p-5 flex items-start justify-between gap-4 cursor-pointer"
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
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className={`px-5 pb-5 pt-0 text-xs leading-relaxed space-y-3.5 border-t border-dashed ${
                            isLightMode ? 'border-neutral-200 text-neutral-600' : 'border-neutral-900 text-neutral-300'
                          }`}>
                            <p className="font-sans leading-relaxed text-xs lg:text-[13px]">
                              {item.answer}
                            </p>

                            {item.highlight && (
                              <div className={`flex items-start gap-2 p-3 font-mono text-[10px] leading-relaxed rounded-none border ${
                                isLightMode 
                                  ? 'bg-amber-500/5 border-amber-500/25 text-[#0C122C]' 
                                  : 'bg-amber-500/5 border-amber-500/10 text-amber-400'
                              }`}>
                                <Info className="w-4 h-4 text-amber-500 shrink-0" />
                                <div>
                                  <span className="font-bold uppercase tracking-wider block mb-0.5">TECHNICAL MEMO:</span>
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

            {/* Quick action checklist footer */}
            <div className={`p-4 font-mono text-[9px] flex flex-wrap items-center justify-between gap-4 border ${
              isLightMode ? 'bg-neutral-50 border-neutral-200 text-neutral-500' : 'bg-[#050918]/20 border-[#182747]/40 text-neutral-450'
            }`}>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> SANY GLOBAL CERTIFIED COMPILATION
              </span>
              <span className="flex items-center gap-1 leading-none">
                LAGOS STAGING DESK PIN: 101-ETH-LEKKI
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
