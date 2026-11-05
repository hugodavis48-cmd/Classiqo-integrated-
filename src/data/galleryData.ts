/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GalleryProject } from '../types';

export const GALLERY_PROJECTS: GalleryProject[] = [
  {
    id: 'proj-eko-atlantic-sea-defense',
    title: 'Eko Atlantic Coastal Revetment & High-Rise Raft Casting',
    category: 'marine',
    location: 'Eko Atlantic City, Victoria Island, Lagos',
    completionYear: '2024 - 2025',
    client: 'South Energyx / BCL Consortium',
    scope: 'Deployment of 3x Sany 56m boom pumps, twin stationary trailer pumps, and 450m high-pressure DN125 twin-wall pipeline for continuous maritime raft foundations against high-salinity coastal conditions.',
    equipmentDeployed: [
      '2x Sany SY5313THB 56m Boom Pumps',
      'Atabey CP40 Stationary Trailer Pump',
      '450m Hardened DN125 Twin-Wall Pipeline',
      'Continuous 18-Hour Logistics Dispatch'
    ],
    metrics: [
      { label: 'Total Volume Poured', value: '42,500 m³' },
      { label: 'Pumping Distance', value: '450 Meters' },
      { label: 'Zero Blockage Rate', value: '99.8%' },
      { label: 'Safety Record', value: 'Zero LTI' }
    ],
    image: '/assets/images/gallery_eko_atlantic_1793853656107.jpg',
    description: 'A benchmark maritime civil engineering pour in West Africa. Required continuous marine-grade C40/50 sulfate-resistant concrete pumping to anchor deep coastal sea-wall abutments and high-rise core foundations.',
    tag: 'Maritime Civil Engineering',
    keyHighlight: 'Continuous 18-hour monolithic pour completed with zero line halts.'
  },
  {
    id: 'proj-marina-coastal-viaduct',
    title: 'Marina Coastal Viaduct & Elevated Rail Transit Piers',
    category: 'infrastructure',
    location: 'Lagos Marina & Broad Street Transit Corridor',
    completionYear: '2024',
    client: 'SPG Nigeria Infrastructure & LAMATA',
    scope: 'Sub-sea and lagoon pier casting, elevated viaduct deck slab pumping, and high-tensile pile cap grouting using barge-mounted mobile line pumps and 38m flexible boom articulation.',
    equipmentDeployed: [
      'Sany 38m Boom Pump (Barge-Mounted)',
      'High-Pressure Slide Valve Manifold System',
      'Flow-Max Superplasticizer PCE Dosing',
      'Bauer Heavy Foundation Drilling Team'
    ],
    metrics: [
      { label: 'Elevated Pier Caps', value: '78 Piers' },
      { label: 'Lagoon Pumping Height', value: '32 Meters' },
      { label: 'Daily Delivery', value: '850 m³/day' },
      { label: 'Pumping Pressure', value: '110 Bar' }
    ],
    image: '/assets/images/gallery_marina_viaduct_1793853657393.jpg',
    description: 'Precision elevated viaduct bridge casting above active marine traffic in Lagos Lagoon. Required dual-stage pumping manifolds to distribute C50 high-early-strength concrete to pier heads without closing waterway channels.',
    tag: 'Transit Infrastructure',
    keyHighlight: 'Awarded Infrastructure Project of the Year for zero lagoon waterway disruption.'
  },
  {
    id: 'proj-banana-island-twin-towers',
    title: 'Banana Island Waterfront Luxury Towers (28 Floors)',
    category: 'concrete',
    location: 'Zone A, Banana Island, Ikoyi, Lagos',
    completionYear: '2024 - 2025',
    client: 'Levitikal Construction Group',
    scope: 'Vertical high-rise pumping of high-density C60 self-compacting concrete to level 28 using twin-wall riser delivery line and hydraulic pipeline shutoff valves.',
    equipmentDeployed: [
      'High-Pressure Stationary Trailer Pump 130 Bar',
      'Hydraulic Auto-Shutoff Gate Valve',
      '2x 4m Rubber Discharge Hoses',
      'Experienced Site Engineer & Pump Crew'
    ],
    metrics: [
      { label: 'Vertical Height', value: '112 Meters' },
      { label: 'Floor Cycle', value: '7 Days / Floor' },
      { label: 'Concrete Grade', value: 'C60 Self-Compacting' },
      { label: 'Riser Pressure', value: '125 Bar' }
    ],
    image: '/assets/images/service_highrise_pumping_1793852367412.jpg',
    description: 'Ultra-luxury waterfront development with demanding architectural finishes. Utilized self-compacting concrete pumped through our Turkey-sourced twin-wall induction pipes to prevent internal honeycombing.',
    tag: 'High-Rise Vertical Pumping',
    keyHighlight: 'Achieved rapid 7-day floor turnarounds without hydraulic pressure loss.'
  },
  {
    id: 'proj-lekki-deep-bored-piling',
    title: 'Lekki Free Zone Heavy Logistics Terminal Piling',
    category: 'piling',
    location: 'Lekki Free Trade Zone, Ibeju-Lekki, Lagos',
    completionYear: '2023 - 2024',
    client: 'China Harbour / BCL Partner Joint Venture',
    scope: 'Deep bored foundation piling into soft coastal alluvial soils, tremie concrete pumping through continuous casing, and retaining pile wall installation.',
    equipmentDeployed: [
      'Sany SR285 Rotary Drilling Rig',
      'Atabey Grout & Tremie Trailer Pump',
      'Polyurethane Piston High-Stroke Assembly',
      'Certified HSE Safety Supervisor'
    ],
    metrics: [
      { label: 'Bored Piles Drilled', value: '340 Piles' },
      { label: 'Pile Depths', value: 'Up to 42m' },
      { label: 'Pile Diameters', value: '800mm - 1200mm' },
      { label: 'Load Capacity', value: '4,500 kN' }
    ],
    image: '/assets/images/service_bored_piling_1793852380230.jpg',
    description: 'Heavy foundation piles carrying multi-ton container crane rail tracks. Installed deep foundation shafts penetrating through unstable marshland to firm sandstone stratum.',
    tag: 'Deep Bored Foundation Piling',
    keyHighlight: 'Passed 100% of ultrasonic cross-hole sonic logging integrity tests.'
  },
  {
    id: 'proj-ikeja-industrial-slab',
    title: 'Ikeja Mega Distribution Warehouse Continuous Floor Slab',
    category: 'concrete',
    location: 'Ikeja Industrial Estate, Lagos',
    completionYear: '2024',
    client: 'Multinational FMCG Logistics Hub',
    scope: '18,000 m² seamless joint-free superflat concrete floor slab casting using laser screeds and lead concrete finishers.',
    equipmentDeployed: [
      'Sany 48m Mobile Boom Pump',
      'Quick-Set Hardening Accelerator & PCE Admixture',
      'Power Trowel Finishers Detachment (12 men)',
      'Puncture-Resistant PPE & Certified Helmets'
    ],
    metrics: [
      { label: 'Slab Area', value: '18,000 m²' },
      { label: 'Floor Flatness', value: 'FF 55 / FL 40' },
      { label: 'Casting Duration', value: '6 Continuous Days' },
      { label: 'Compressive Strength', value: '45 MPa @ 28 Days' }
    ],
    image: '/assets/images/service_slab_casting_1793852352746.jpg',
    description: 'Precision industrial warehouse floor built for automated high-bay narrow-aisle forklifts. Our skilled finisher crew burnished every square meter to mirror finish.',
    tag: 'Commercial Slab Casting',
    keyHighlight: 'Exceeded international ASTM floor flatness requirements.'
  },
  {
    id: 'proj-eko-bridge-retaining',
    title: 'Eko Bridge Ramp Civil Retaining & Gabion Reinforcement',
    category: 'infrastructure',
    location: 'Costain - Apongbon Corridor, Lagos',
    completionYear: '2024',
    client: 'Federal Ministry of Works / Julius Berger Partner Support',
    scope: 'Emergency embankment retaining wall, secant pile stabilization, and high-volume grout pumping along the critical freight transit artery.',
    equipmentDeployed: [
      'Twin-Wall 90° & 45° Hardened Elbow Line',
      'Quick-Release DN125 Forged Snap Clamps',
      'Rapid-Cure Grout Injection Pump',
      '24/7 Traffic Control Security Detachment'
    ],
    metrics: [
      { label: 'Retaining Wall Height', value: '14 Meters' },
      { label: 'Anchor Tie-backs', value: '180 Anchors' },
      { label: 'Grout Injected', value: '3,800 m³' },
      { label: 'Execution Speed', value: '3 Weeks Ahead of Schedule' }
    ],
    image: '/assets/images/service_civil_retaining_1793852394517.jpg',
    description: 'High-speed civil embankment stabilization executed overnight to safeguard the primary arterial ramp connecting mainland Lagos to the maritime ports.',
    tag: 'Civil Retaining & Earthworks',
    keyHighlight: 'Completed without interrupting daytime commercial container freight.'
  },
  {
    id: 'proj-emmanuel-line-pump-setup',
    title: 'High-Pressure Line Pump Field Setup & DN125 Pipeline Clamping',
    category: 'concrete',
    location: 'Banana Island & Lekki Phase 1 Waterfront, Lagos',
    completionYear: '2024 - 2025',
    client: 'Levitikal Construction & SPG Nigeria',
    scope: 'Continuous 380m pipeline layout assembled by Lead Field Engineer Emmanuel using hardened Turkish DN125 twin-wall pipes, heavy forged quick-snap couplings, and dual-lip rubber seals across active high-rise slab reinforcement.',
    equipmentDeployed: [
      'Turkish DN125 Hardened Induction Twin-Wall Pipes',
      'Forged High-Pressure Quick-Snap Coupling Clamps',
      'Atabey HBT80 Stationary Trailer Pump System',
      'Lead Field Setup Engineer Emmanuel & Rigging Crew'
    ],
    metrics: [
      { label: 'Pipeline Distance', value: '380 Meters' },
      { label: 'Burst Pressure Tested', value: '250 Bar' },
      { label: 'Gasket Seal Integrity', value: '100% Zero-Leak' },
      { label: 'Assembly Turnaround', value: '< 3.5 Hours' }
    ],
    image: '/assets/aistudio/0a5287a2-c619-408b-ace7-27e0183869ac_074b7d7f.jpeg',
    description: 'Precision pipeline configuration across intricate rebar decks. Engineer Emmanuel personally aligned, gasketed, and clamped each joint to prevent aggregate blowout under 125-bar vertical pumping thrust.',
    tag: 'High-Pressure Pipeline Clamping',
    keyHighlight: 'Assembled by Engr. Emmanuel with zero gasket leakage across 2,400m³ continuous monolithic pour.'
  },
  {
    id: 'proj-emmanuel-chassis-maintenance',
    title: '250-Hour Mobile Fleet Hydraulic Diagnostics & Chassis Maintenance',
    category: 'infrastructure',
    location: 'Clasqo Central Staging Yard, 1 Dr Babatunde Ayeni St, Lekki',
    completionYear: '2025 Ongoing',
    client: 'Clasqo Internal Fleet Operations & Partner Co-Owners',
    scope: 'Mandatory 250-hour preventive servicing, high-pressure hydraulic line replacement, Rexroth valve calibrations, and chassis grease manifold audits executed by Engineer Emmanuel.',
    equipmentDeployed: [
      'Sany SY5313THB 56m Concrete Boom Chassis',
      'Rexroth Hydraulic High-Pressure Line Gauges',
      'Ultrasonic Pipe Wall Thickness Transducer',
      'Factory-Trained Sany Maintenance Engineers'
    ],
    metrics: [
      { label: 'Pressure Test Load', value: '320 Bar' },
      { label: 'Hydraulic ISO Cleanliness', value: '16/14/11' },
      { label: 'Overhaul Turnaround', value: '2.5 Hours' },
      { label: 'Fleet Operating Uptime', value: '99.4%' }
    ],
    image: '/assets/aistudio/64457cae-5db4-421a-ba68-8aca45b5f3c6_3dd805e9.jpeg',
    description: 'Proactive under-chassis engineering maintenance ensuring that chartered Sany machinery operates without mechanical or hydraulic failures on high-exposure Lagos construction jobs.',
    tag: 'Preventive Fleet Maintenance',
    keyHighlight: 'Under-chassis hydraulic diagnostics executed by Engr. Emmanuel guaranteeing 99.4% uptime.'
  }
];
