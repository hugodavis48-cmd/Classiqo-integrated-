/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WorkforcePersonnel } from '../types';

export const WORKFORCE_DATA: WorkforcePersonnel[] = [
  {
    id: 'wf-engr-emmanuel-lead',
    name: 'Engr. Emmanuel (Chief Field Operations & Multi-Skilled Master)',
    roleCategory: 'site_engineer',
    roleTitle: 'Chief Field Operations Engineer & Multi-Disciplinary Master Specialist',
    yearsExperience: 16,
    certifications: [
      'Clasqo Most Decorated Multi-Skilled Engineer',
      'Certified Sany OEM Machinery Maintenance & Hydraulic Repair Specialist',
      'Master Line Pump Field Setup & 250-Bar Pipeline Engineer',
      'Senior Project Supervisor & Monolithic Pour Coordinator',
      'Certified Sany Excavator & Heavy Plant Operator Class E'
    ],
    rating: 5.0,
    completedProjects: 142,
    reviewCount: 68,
    availability: 'Available Now',
    dailyRateNgn: 95000,
    monthlyRateNgn: 1850000,
    location: 'Central Lekki Depot & All Lagos Project Corridors',
    bio: 'Clasqo\'s most decorated, highly proactive, multi-skilled field engineer. Unmatched hands-on mastery spanning heavy machinery maintenance/hydraulic repair under chassis, complex line pump setup and 250-bar DN125 twin-wall pipeline clamping, high-rise monolithic slab casting supervision, and certified heavy Sany excavator operation.',
    skills: [
      'Machinery Maintenance & Hydraulic Fault Overhaul',
      'Line Pump Field Setup & DN125 Couplings Lockup',
      'Project Supervision & Real-Time Pour Coordination',
      'Certified Sany Heavy Excavator & Plant Operation',
      'Emergency Pressure Bleed & Field Breakdown SLA (<35 Mins)',
      'High-Slump Concrete Mix Flow Quality Assurance'
    ],
    image: '/assets/aistudio/a988fb32-58ae-4b9b-a798-129545d20f7c_c8faa863.jpeg',
    equipmentSpecialization: [
      'Sany 56m Boom Pumps & HBT80 Trailer Units',
      'Sany SY215C & SY365H Heavy Excavators',
      'Turkish DN125 Twin-Wall Induction Pipelines',
      'Sany SR285 Rotary Piling Rig Systems',
      'Zoomlion 50T Mobile Telescopic Cranes'
    ],
    featuredReview: {
      client: 'Julius Berger & BCL Consortium',
      project: 'Eko Atlantic Coastal Revetment & High-Rise Monolithic Pour',
      rating: 5.0,
      comment: 'Engineer Emmanuel is Clasqo\'s MVP. When a hydraulic line blew at 2 AM during a continuous 2,000m³ raft pour, Emmanuel diagnosed the pressure surge, replaced the hydraulic coupling under the truck chassis in 35 minutes, and personally took over line coordination. A proactive master of every construction discipline.',
      date: 'March 2025'
    },
    hasVideoDemo: true,
    videoDemoTitle: 'Engineer Emmanuel Field Supervision & Line Setup Masterclass'
  },
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
    image: '/assets/images/labor_site_engineer_1793853608452.jpg',
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
    image: '/assets/images/labor_machine_operator_1793853593127.jpg',
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
    image: '/assets/images/labor_safety_officer_1793853654932.jpg',
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
    image: '/assets/images/labor_concrete_finisher_1793853655899.jpg',
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
    image: '/assets/images/labor_machine_operator_1793853593127.jpg',
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
    image: '/assets/images/labor_safety_officer_1793853654932.jpg',
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

export interface EmmanuelRole {
  id: string;
  title: string;
  badge: string;
  image: string;
  summary: string;
  toolsAndEquip: string[];
  keyHighlight: string;
  fieldDeployment: string;
}

export const ENGINEER_EMMANUEL_PROFILE = {
  name: 'Engineer Emmanuel',
  title: "Clasqo's Most Decorated Multi-Skilled Master Engineer",
  tagline: "Unmatched Expertise across Machinery Maintenance, Line Pump Field Setup, Site Supervision & Heavy Plant Operation",
  experienceYears: 16,
  rating: 5.0,
  completedProjects: 142,
  availability: 'Available for Priority Mobilization',
  dailyRateNgn: 95000,
  monthlyRateNgn: 1850000,
  roles: [
    {
      id: 'lead-coordinator',
      title: 'Chief Field Operations Engineer & Lead Technical Coordinator',
      badge: 'Chief Technical Lead',
      image: '/assets/aistudio/a988fb32-58ae-4b9b-a798-129545d20f7c_c8faa863.jpeg',
      summary: 'Commanding high-exposure civil projects across Lagos. Oversees equipment dispatch logistics, site crew safety briefings, digital slump metrics, and overall contract quality assurance.',
      toolsAndEquip: ['Two-Way Digital UHF Radio', 'Digital Field Tablet & Slump Sensors', 'COREN Site Logbook', 'Clasqo Project Badge'],
      keyHighlight: 'Maintains an unblemished record of 142 monolithic pours completed without a single cold joint.',
      fieldDeployment: 'Eko Atlantic, Lekki Scheme 1 & Victoria Island High-Rises'
    },
    {
      id: 'project-supervisor',
      title: 'Project Supervisor & Concrete Casting Operations Coordinator',
      badge: 'Site Operations Lead',
      image: '/assets/aistudio/eb5b8f2c-b798-446c-ada3-c5c16e884e98_7a261d0a.jpeg',
      summary: 'Active on-deck supervision of high-volume concrete slab casting. Directs boom pump tip velocity, transit mixer flow sequences, vibratory compaction crews, and rebar clearance.',
      toolsAndEquip: ['Walkie-Talkie Radio Hub', 'Pour Checklist & Slump Log Clipboard', 'High-Visibility Safety Vest', 'Heavy Industrial Work Boots'],
      keyHighlight: 'Orchestrated continuous 18-hour raft casting of 2,200m³ at Banana Island with zero pump blockages.',
      fieldDeployment: 'Marina Viaduct Interchange & Lekki Deep Sea Port Facilities'
    },
    {
      id: 'maintenance-repair',
      title: 'Machinery Maintenance & Hydraulic Repair Specialist',
      badge: 'Master Mechanic',
      image: '/assets/aistudio/64457cae-5db4-421a-ba68-8aca45b5f3c6_3dd805e9.jpeg',
      summary: 'Proactive under-chassis hydraulic diagnostics and mechanical overhaul. Specializes in Rexroth hydraulic piston loops, high-pressure line bleeding, S-valve timing, and emergency field turnaround.',
      toolsAndEquip: ['Double-Ended Spanner Wrenches', 'Ultrasonic Pipe Thickness Gauges', 'Hydraulic Pressure Calibration Gauges', 'High-Temp Nitrile O-Rings'],
      keyHighlight: 'Achieved average emergency field repair turnaround of under 35 minutes across all chartered fleets.',
      fieldDeployment: 'Lekki Staging Yard & Lagos Mobile Breakdown SLA Response'
    },
    {
      id: 'line-pump-setup',
      title: 'Line Pump Field Setup Engineer & High-Pressure Pipeline Specialist',
      badge: 'Pipeline Specialist',
      image: '/assets/aistudio/0a5287a2-c619-408b-ace7-27e0183869ac_074b7d7f.jpeg',
      summary: 'Hands-on assembly and secure clamping of Turkish Istanbul DN125 twin-wall concrete pipelines. Inspects 250-bar burst thresholds, anchor tie-backs, 90° wear elbows, and double-lip rubber seals.',
      toolsAndEquip: ['Forged Quick-Snap Coupling Clamps', 'Turkish DN125 Twin-Wall Induction Pipes', 'Full-Body Fall Arrest Harness', 'Reinforced Puncture Gloves'],
      keyHighlight: 'Assembled and certified over 450 meters of horizontal line pump pipes without a single gasket blow-by.',
      fieldDeployment: 'Banana Island High-Rises & Bonny Island LNG Terminals'
    },
    {
      id: 'machine-operator',
      title: 'Certified Heavy Machinery & Sany Excavator Master Operator',
      badge: 'Master Machine Pilot',
      image: '/assets/aistudio/Gemini_Generated_Image_36480v36480v3648_0d1e6c9d.jpeg',
      summary: 'Sany Global Masterclass Certified operator. Commands Sany SY215C and SY365H heavy hydraulic excavators, Sany 56m boom pumps, and rotary drilling rigs in demanding coastal swamp terrain.',
      toolsAndEquip: ['Dual Ergonomic Hydraulic Joysticks', 'Sany Global Certified Red Helmet', 'Digital In-Cabin Load Sensors', 'Tinted UV Safety Glasses'],
      keyHighlight: 'Over 8,500 incident-free machine operating hours in coastal reclamation and foundation excavation.',
      fieldDeployment: 'Dangote Refinery Arterial Works & Ibeju-Lekki Earthworks'
    }
  ]
};

