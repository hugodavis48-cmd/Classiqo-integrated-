/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WorkforcePersonnel } from '../types';

export const WORKFORCE_DATA: WorkforcePersonnel[] = [
  {
    id: 'wf-site-eng-01',
    name: 'Engr. Babatunde Adeleke (FNSE, COREN)',
    roleCategory: 'site_engineer',
    roleTitle: 'Senior Site Construction & Concrete Manager',
    yearsExperience: 14,
    certifications: ['COREN Certified Engineer', 'NSE Registered', 'PMP Project Management'],
    rating: 4.95,
    completedProjects: 48,
    reviewCount: 34,
    availability: 'Available Now',
    dailyRateNgn: 75000,
    monthlyRateNgn: 1450000,
    location: 'Lagos & Lekki Free Zone',
    bio: '14+ years managing massive high-rise casting, deep bored piling foundations, and complex hydraulic structural pours. Supervised over 120,000 m³ of concrete delivery across Victoria Island and Ikoyi towers.',
    skills: ['Concrete Mix Design Auditing', 'Deep Foundation QA/QC', 'Pour Logistics Coordination', 'BIM / AutoCAD Execution'],
    image: '/src/assets/images/labor_site_engineer_1793853608452.jpg',
    equipmentSpecialization: ['Sany 48m & 56m Boom Pumps', 'Bauer BG30 Drilling Rigs', 'Concrete Batch Plants'],
    featuredReview: {
      client: 'Levitikal Construction Ltd',
      project: 'Banana Island Waterfront Twin Towers',
      rating: 5.0,
      comment: 'Engr. Babatunde coordinated a continuous 18-hour raft foundation casting of 2,200m³ without a single cold joint or pump blockage. Exceptional civil leadership.',
      date: 'January 2025'
    },
    hasVideoDemo: true,
    videoDemoTitle: 'Site Coordination & Slump Inspection Briefing'
  },
  {
    id: 'wf-operator-01',
    name: 'Suleiman Garba',
    roleCategory: 'operator',
    roleTitle: 'Master Boom & Trailer Pump Specialist',
    yearsExperience: 11,
    certifications: ['Certified Heavy Machinery Operator Class E', 'Zoomlion Operator Certified', 'Sany Global Heavy Plant License'],
    rating: 4.92,
    completedProjects: 82,
    reviewCount: 46,
    availability: 'Available Now',
    dailyRateNgn: 45000,
    monthlyRateNgn: 850000,
    location: 'Lagos Island & Mainland',
    bio: 'Expert certified concrete pump operator with over 8,000 incident-free machine operational hours. Master of intricate 5-section RZ boom deployment in restricted urban sites and congested civil roadworks.',
    skills: ['Radio Remote Boom Maneuvering', 'Emergency Line Depressurization', 'S-Valve Timing Adjustment', 'Daily Preventive Hydraulics'],
    image: '/src/assets/images/labor_machine_operator_1793853593127.jpg',
    equipmentSpecialization: ['Sany SY5313THB Boom Pumps', 'Zoomlion 43X-5RZ', 'Atabey Trailer Pumps', 'Schwing Stetter Lines'],
    featuredReview: {
      client: 'Business Contracting Limited (BCL)',
      project: 'Lekki Coastal Expressway Flyover Ramp',
      rating: 4.9,
      comment: 'Flawless precision in controlling boom tip velocity inside dense rebar grids. Zero spillage and spotless daily washout routine.',
      date: 'February 2025'
    },
    hasVideoDemo: true,
    videoDemoTitle: 'Boom Remote Navigation in Dense Rebar Cage'
  },
  {
    id: 'wf-safety-01',
    name: 'Chinyere Okafor (CSP, NEBOSH)',
    roleCategory: 'safety_officer',
    roleTitle: 'HSE Field Safety & Compliance Officer',
    yearsExperience: 9,
    certifications: ['NEBOSH International Diploma', 'OSHA 30-Hour Construction', 'First Aid & Incident Command Level 3'],
    rating: 4.98,
    completedProjects: 39,
    reviewCount: 28,
    availability: 'Available Now',
    dailyRateNgn: 55000,
    monthlyRateNgn: 1100000,
    location: 'Eko Atlantic & Greater Lagos',
    bio: 'Dedicated civil health and safety manager with a proven record of zero lost-time injuries (LTI) across maritime foundation and high-rise structural casting projects. Specializes in crane radius safety and high-pressure concrete pipe securing.',
    skills: ['Hazard Identification & Risk Assessment (HIRA)', 'Pipeline Pressure Bleed Safety Protocols', 'PPE Site Audits & Compliance', 'Emergency Evacuation Drills'],
    image: '/src/assets/images/labor_safety_officer_1793853654932.jpg',
    equipmentSpecialization: ['High-Pressure Hydraulic Pipelines', 'Mobile Crawler Cranes', 'Bored Piling Rigs', 'Tidal Marine Works'],
    featuredReview: {
      client: 'SPG Nigeria Infrastructure',
      project: 'Marina Viaduct Bridge Pier Reinforcement',
      rating: 5.0,
      comment: 'Chinyere maintained 100% PPE compliance across 150 workers on an active marine barge site. Her pre-pour toolboxes prevented multiple potential pipe clamp hazards.',
      date: 'December 2024'
    },
    hasVideoDemo: true,
    videoDemoTitle: 'High-Pressure Pipe Coupling Safety Audit'
  },
  {
    id: 'wf-finisher-01',
    name: 'Emmanuel Nwachukwu & Team',
    roleCategory: 'finisher',
    roleTitle: 'Lead Concrete Casting & Power-Trowel Finisher',
    yearsExperience: 12,
    certifications: ['Master Concrete Artisan Guild', 'ACI Flatwork Associate', 'Laser Screed Leveling Specialist'],
    rating: 4.88,
    completedProjects: 115,
    reviewCount: 52,
    availability: 'Deployable 48h',
    dailyRateNgn: 38000,
    monthlyRateNgn: 720000,
    location: 'Lagos & Ogun Industrial Corridor',
    bio: 'Skilled concrete casting foreman commanding high-speed screed leveling, power float polishing, and tremie column compaction. Expert at achieving FF50/FL35 floor flatness specifications on logistics warehouses.',
    skills: ['Laser Screeding', 'Power Trowel Burnishing', 'Tremie Pipe Vibratory Compaction', 'Expansion Joint Scoring'],
    image: '/src/assets/images/labor_concrete_finisher_1793853655899.jpg',
    equipmentSpecialization: ['Ride-on Power Trowels', 'Tremie Hoppers', 'High-Frequency Needle Vibrators', 'Bull Floats'],
    featuredReview: {
      client: 'Lafarge Africa Partnered Contractor',
      project: 'Sagamu Logistics Distribution Hub (15,000m²)',
      rating: 4.9,
      comment: 'Mirror-grade concrete surface finish without dusting or shrinkage cracking. Delivered 1,800m² per shift with perfect edge compaction.',
      date: 'November 2024'
    },
    hasVideoDemo: true,
    videoDemoTitle: 'Continuous Raft Slab Bull-Floating & Power-Trowel Finishing'
  },
  {
    id: 'wf-cleaner-01',
    name: 'Yakubu & Lagos Site Washout Specialists',
    roleCategory: 'cleaner',
    roleTitle: 'Pump Washout, Slurry Remediation & Site Cleaners',
    yearsExperience: 7,
    certifications: ['Environmental Waste Management Certified', 'Confined Space & Slurry Safety', 'High-Pressure Waterjet Ops'],
    rating: 4.84,
    completedProjects: 94,
    reviewCount: 31,
    availability: 'Available Now',
    dailyRateNgn: 25000,
    monthlyRateNgn: 480000,
    location: 'All Lagos Project Sites',
    bio: 'Dedicated rapid-response site turnaround crew. Handles post-pour pipeline blowout, sponge-ball water washing, hopper descaling, slurry settling pond maintenance, and environmental sediment controls.',
    skills: ['Pipeline Sponge-Ball Blowing', 'Hopper & Delivery Cylinder Descaling', 'Concrete Slurry Neutralization', 'Environmental Runoff Containment'],
    image: '/src/assets/images/labor_machine_operator_1793853593127.jpg',
    equipmentSpecialization: ['High-Pressure 500-Bar Washers', 'Air Blowout Caps', 'Slurry Vacuum Units', 'Sediment Traps'],
    featuredReview: {
      client: 'BCL Construction',
      project: 'Victoria Island Commercial Tower Raft',
      rating: 4.8,
      comment: 'Cleaned out 180 meters of vertical riser pipe and pump hopper in under 45 minutes after a marathon pour. Kept public roads completely free of cement mud.',
      date: 'March 2025'
    }
  },
  {
    id: 'wf-security-01',
    name: 'ShieldGuard Civil Site Security Detachment',
    roleCategory: 'security',
    roleTitle: 'Industrial Plant & Construction Site Security',
    yearsExperience: 10,
    certifications: ['Private Security Regulatory Board Certified', 'K9 Patrol Licensed', 'Access Control & Perimeter Defense'],
    rating: 4.90,
    completedProjects: 65,
    reviewCount: 38,
    availability: 'Deployable 48h',
    dailyRateNgn: 30000,
    monthlyRateNgn: 620000,
    location: 'Lagos Island, Lekki & Epe Axis',
    bio: 'Disciplined industrial asset protection squad protecting heavy machinery, high-value copper cables, diesel fuel bowsers, and steel reinforcement stocks. 24/7 manned access gate control and perimeter surveillance.',
    skills: ['Gate Log Entry Verification', 'Diesel Bower Anti-Siphon Monitoring', 'Night Perimeter Patrol', 'Conflict De-escalation'],
    image: '/src/assets/images/labor_safety_officer_1793853654932.jpg',
    equipmentSpecialization: ['CCTV Remote Watch Towers', 'Handheld Metal Detectors', 'Thermal Night Vision Monoculars', 'Guard Tour Wand Verification'],
    featuredReview: {
      client: 'SPG Nigeria Projects',
      project: 'Dangote Refinery Ancillary Pipeline Laydown Yard',
      rating: 5.0,
      comment: 'Zero asset loss across an 8-month site duration despite heavy nighttime machinery staging. Highly professional personnel.',
      date: 'October 2024'
    }
  }
];
