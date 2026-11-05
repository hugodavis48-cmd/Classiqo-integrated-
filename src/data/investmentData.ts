/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface InvestmentPackage {
  id: string;
  name: string;
  tier: 'Starter' | 'Growth' | 'Executive' | 'Institutional';
  minInvestmentUsd: number;
  maxInvestmentUsd: number;
  projectedAnnualRoiPercent: number; // e.g. 18.5, 23.2, 27.8, 32.4
  payoutFrequency: 'Quarterly' | 'Bi-Monthly' | 'Monthly';
  allocatedMachineryType: string;
  profitShareRatio: string; // e.g. '70% Investor / 30% Clasqo Ops'
  tenureMonths: number[]; // e.g. [6, 12, 24, 36]
  features: string[];
  investorPerks: string[];
  riskMitigation: string;
  isPopular?: boolean;
  image: string;
}

export interface MachineryCoOwnedAsset {
  id: string;
  unitCode: string;
  machineModel: string;
  category: string;
  currentDeployment: string;
  clientContractor: string;
  dailyCharterRateUsd: number;
  monthlyGrossRevenueUsd: number;
  monthlyInvestorProfitUsd: number;
  utilizationRatePercent: number;
  hoursOperated: number;
  nextScheduledMaintenance: string;
  healthScorePercent: number;
  gpsCoordinates: string;
  coOwnersCount: number;
  totalPooledUsd: number;
  status: 'Active Charter' | 'Scheduled Maintenance' | 'Deployment Transit';
}

export interface InvestorTestimonial {
  id: string;
  investorName: string;
  investorTitle: string;
  firmOrOrigin: string;
  packageTier: string;
  investmentAmountUsd: number;
  totalRoiReceivedUsd: number;
  annualYieldRealized: string;
  verifiedProject: string;
  testimonialText: string;
  avatarText: string;
  dateJoined: string;
  ratingStars: number;
}

export const INVESTMENT_PACKAGES: InvestmentPackage[] = [
  {
    id: 'pkg-starter-asset-pool',
    name: 'Starter Equipment Asset Pool',
    tier: 'Starter',
    minInvestmentUsd: 3000,
    maxInvestmentUsd: 9999,
    projectedAnnualRoiPercent: 18.5,
    payoutFrequency: 'Quarterly',
    allocatedMachineryType: 'Trailer Concrete Pumps & DN125 Pipeline Infrastructure',
    profitShareRatio: '70% Investor / 30% Clasqo Management',
    tenureMonths: [6, 12, 24],
    features: [
      'Minimum investment starting at $3,000 USD',
      '18.5% projected annual ROI with quarterly USD disbursements',
      'Fractional asset co-ownership in high-demand trailer pumps and pipeline joints',
      'Quarterly audited utilization and mechanical condition statement',
      'Direct transfer to any USD domiciliary or international bank account'
    ],
    investorPerks: [
      'Digital certificate of asset fractional ownership',
      'Quarterly earnings wire confirmation',
      'Opt-in capital re-investment compound option'
    ],
    riskMitigation: 'Underwritten by active Lagos construction charter agreements with BCL and Lafarge Africa',
    image: '/assets/images/concrete_pump_pipes_1780284052994.png'
  },
  {
    id: 'pkg-growth-equipment-fund',
    name: 'Growth Heavy Equipment Partner',
    tier: 'Growth',
    minInvestmentUsd: 10000,
    maxInvestmentUsd: 24999,
    projectedAnnualRoiPercent: 23.2,
    payoutFrequency: 'Bi-Monthly',
    allocatedMachineryType: 'Sany Heavy Excavators (21t) & Vibratory Road Rollers',
    profitShareRatio: '72% Investor / 28% Clasqo Management',
    tenureMonths: [12, 24, 36],
    features: [
      'Direct co-ownership allocation in Sany SY215C medium excavators',
      '23.2% projected annual ROI with bi-monthly USD disbursements',
      'Live GPS telematics tracking and operational hours access',
      'Full comprehensive insurance covering tidal and road transit risks',
      'Guaranteed 60-day liquidation / exit window post 12 months'
    ],
    investorPerks: [
      'Dedicated Investor Relations asset manager',
      'Bi-monthly performance ledger with telemetry run hours',
      'Quarterly equipment valuation updates'
    ],
    riskMitigation: 'Escrow replacement fund covering 100% of wear parts and engine overhaul cycles',
    isPopular: true,
    image: '/assets/images/sany_excavator_sy215c_1793851331207.jpg'
  },
  {
    id: 'pkg-executive-boom-co-ownership',
    name: 'Executive Boom Fleet Co-Ownership',
    tier: 'Executive',
    minInvestmentUsd: 25000,
    maxInvestmentUsd: 49999,
    projectedAnnualRoiPercent: 27.8,
    payoutFrequency: 'Monthly',
    allocatedMachineryType: 'Sany 48m & 56m Truck-Mounted Concrete Boom Pumps',
    profitShareRatio: '75% Investor / 25% Clasqo Management',
    tenureMonths: [12, 24, 36],
    features: [
      'Primary legal asset deed in premium Sany 56m high-rise boom pumps',
      '27.8% projected annual ROI paid monthly directly in USD ($579+/mo per $25k)',
      'Priority buyback guarantee at amortized fair market value',
      'Quarterly executive boardroom briefing and Lagos dispatch yard VIP pass',
      'Dedicated legal escrow custodian in Lagos and London'
    ],
    investorPerks: [
      'Monthly USD dividend deposits',
      'Physical inspected chassis plate bearing investor syndicate serial',
      'VIP access to major infrastructure project site inaugurations'
    ],
    riskMitigation: 'Backed by binding multi-year concrete supply agreements at Eko Atlantic and Lekki Free Zone',
    image: '/assets/images/sany_boom_pump_1780289808297.png'
  },
  {
    id: 'pkg-institutional-syndicate',
    name: 'Institutional Syndicate & Sovereign Tier',
    tier: 'Institutional',
    minInvestmentUsd: 50000,
    maxInvestmentUsd: 250000,
    projectedAnnualRoiPercent: 32.4,
    payoutFrequency: 'Monthly',
    allocatedMachineryType: 'Full Multi-Plant Fleet (Rotary Drilling Rigs + Boom Pumps + Cranes)',
    profitShareRatio: '80% Investor / 20% Clasqo Management',
    tenureMonths: [24, 36, 48],
    features: [
      'Exclusive bespoke syndication for high-net-worth & institutional investors',
      '32.4% projected annual ROI with guaranteed monthly USD profit share',
      'Direct ownership deeds registered with Nigerian Corporate Affairs Commission',
      'Zero-depreciation replacement guarantee funded by Clasqo capital reserve',
      'Personal chauffeur-driven Lagos yard inspection and site helicopter tours'
    ],
    investorPerks: [
      'Direct seat on the Clasqo Fleet Strategic Advisory Council',
      'Custom bespoke contract structuring (Bermuda/Delaware/UK/Nigeria tax treaties)',
      'First-right-of-refusal on all incoming new machinery procurement lots'
    ],
    riskMitigation: 'Sovereign grade counterparty agreements, bank guarantees, and full international Lloyd\'s marine & transit insurance',
    image: '/assets/images/investor_package_executive_1793855236803.jpg'
  }
];

export const CO_OWNED_ASSETS: MachineryCoOwnedAsset[] = [
  {
    id: 'asset-sany-56m-02',
    unitCode: 'CQL-BM-56M-02',
    machineModel: 'Sany SY5313THB 56m Truck Boom Pump',
    category: 'Concrete Pumping',
    currentDeployment: 'Eko Atlantic Coastal Revetment Raft Pour',
    clientContractor: 'South Energyx / BCL Joint Venture',
    dailyCharterRateUsd: 1150,
    monthlyGrossRevenueUsd: 24500,
    monthlyInvestorProfitUsd: 17150,
    utilizationRatePercent: 94.2,
    hoursOperated: 1420,
    nextScheduledMaintenance: 'In 180 engine hours',
    healthScorePercent: 98.4,
    gpsCoordinates: '6.4150° N, 3.4090° E (Eko Atlantic)',
    coOwnersCount: 6,
    totalPooledUsd: 150000,
    status: 'Active Charter'
  },
  {
    id: 'asset-sany-sr285-01',
    unitCode: 'CQL-RIG-SR285-01',
    machineModel: 'Sany SR285 Rotary Foundation Drilling Rig',
    category: 'Deep Bored Piling',
    currentDeployment: 'Lekki Free Zone Rail Freight Terminal',
    clientContractor: 'China Harbour / SPG Infrastructure',
    dailyCharterRateUsd: 1400,
    monthlyGrossRevenueUsd: 31200,
    monthlyInvestorProfitUsd: 21840,
    utilizationRatePercent: 97.5,
    hoursOperated: 2150,
    nextScheduledMaintenance: 'In 320 engine hours',
    healthScorePercent: 99.1,
    gpsCoordinates: '6.4600° N, 3.8200° E (Lekki Free Zone)',
    coOwnersCount: 8,
    totalPooledUsd: 220000,
    status: 'Active Charter'
  },
  {
    id: 'asset-sany-sy215c-03',
    unitCode: 'CQL-EXC-215C-03',
    machineModel: 'Sany SY215C Medium Hydraulic Excavator (21t)',
    category: 'Earthworks & Trenching',
    currentDeployment: 'Marina Coastal Viaduct Abutment Prep',
    clientContractor: 'Julius Berger Partner Support',
    dailyCharterRateUsd: 420,
    monthlyGrossRevenueUsd: 9600,
    monthlyInvestorProfitUsd: 6720,
    utilizationRatePercent: 91.0,
    hoursOperated: 1840,
    nextScheduledMaintenance: 'In 95 engine hours',
    healthScorePercent: 96.8,
    gpsCoordinates: '6.4520° N, 3.3950° E (Marina Lagos)',
    coOwnersCount: 3,
    totalPooledUsd: 45000,
    status: 'Active Charter'
  },
  {
    id: 'asset-sany-stc500-01',
    unitCode: 'CQL-CRN-STC500-01',
    machineModel: 'Sany STC500 50-Ton Mobile Telescopic Crane',
    category: 'Heavy Lifting & Rigging',
    currentDeployment: 'Banana Island Luxury Penthouse Steelwork',
    clientContractor: 'Levitikal Construction Group',
    dailyCharterRateUsd: 850,
    monthlyGrossRevenueUsd: 18700,
    monthlyInvestorProfitUsd: 13090,
    utilizationRatePercent: 88.5,
    hoursOperated: 1610,
    nextScheduledMaintenance: 'In 210 engine hours',
    healthScorePercent: 97.5,
    gpsCoordinates: '6.4670° N, 3.4410° E (Banana Island)',
    coOwnersCount: 4,
    totalPooledUsd: 85000,
    status: 'Active Charter'
  }
];

export const INVESTOR_TESTIMONIALS: InvestorTestimonial[] = [
  {
    id: 'inv-test-01',
    investorName: 'Dr. Austin Okonkwo',
    investorTitle: 'Managing Partner, Diaspora Infrastructure Angel Fund',
    firmOrOrigin: 'London, UK / Lagos',
    packageTier: 'Executive Boom Fleet Co-Ownership',
    investmentAmountUsd: 35000,
    totalRoiReceivedUsd: 19460,
    annualYieldRealized: '27.8% USD Payout',
    verifiedProject: 'Sany 56m Boom Pump (Eko Atlantic Raft)',
    testimonialText: 'As a diaspora investor seeking hard-currency returns insulated from local inflation, Clasqo’s machinery asset co-ownership is unmatched. I receive monthly USD wire dividends backed by actual machine telematics running at Eko Atlantic. Transparent, punctual, and legally fortified.',
    avatarText: 'AO',
    dateJoined: 'November 2023',
    ratingStars: 5
  },
  {
    id: 'inv-test-02',
    investorName: 'Chief Adeyemi Savage',
    investorTitle: 'Principal, Savage Private Capital Consortium',
    firmOrOrigin: 'Victoria Island, Lagos',
    packageTier: 'Institutional Syndicate & Sovereign Tier',
    investmentAmountUsd: 100000,
    totalRoiReceivedUsd: 64800,
    annualYieldRealized: '32.4% Net USD',
    verifiedProject: 'Rotary Piling Fleet & Boom Pump Syndicate',
    testimonialText: 'We syndicated $100k across two Sany piling rigs working in the Lekki corridor. Clasqo handles 100% of the operational heavy lifting—preventive maintenance, certified operators, and client collections. Every quarter our net profit share lands on schedule with full mechanical telemetry audit sheets.',
    avatarText: 'AS',
    dateJoined: 'March 2024',
    ratingStars: 5
  },
  {
    id: 'inv-test-03',
    investorName: 'Sarah Jenkins',
    investorTitle: 'Director of African Emerging Infrastructure',
    firmOrOrigin: 'Valour Capital Partners, Dubai / London',
    packageTier: 'Growth Heavy Equipment Partner',
    investmentAmountUsd: 20000,
    totalRoiReceivedUsd: 9280,
    annualYieldRealized: '23.2% Annualized',
    verifiedProject: 'Sany SY215C Hydraulic Excavator',
    testimonialText: 'The minimum $3,000 to $10,000 entry point makes institutional-grade heavy equipment leasing accessible. Our fund wanted exposure to Nigeria\'s civil boom without physical asset headache. The GPS telematics app lets us verify operating hours daily. Stellar team.',
    avatarText: 'SJ',
    dateJoined: 'August 2024',
    ratingStars: 5
  },
  {
    id: 'inv-test-04',
    investorName: 'Alhaji Mansur Danbaba',
    investorTitle: 'Chairman, Northern Transit & Civil Holdings',
    firmOrOrigin: 'Abuja & Kano',
    packageTier: 'Starter Equipment Asset Pool',
    investmentAmountUsd: 5000,
    totalRoiReceivedUsd: 1850,
    annualYieldRealized: '18.5% Net USD',
    verifiedProject: 'DN125 High-Pressure Riser Pipeline Pool',
    testimonialText: 'Started with a modest $5,000 position in their pipeline asset pool to test the disbursement mechanism. Received my first two quarterly dividends in clean USD within 48 hours of quarter close. I am now rolling over my capital into the Executive Boom tier.',
    avatarText: 'MD',
    dateJoined: 'October 2024',
    ratingStars: 5
  }
];
