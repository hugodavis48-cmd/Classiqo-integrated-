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
    image: '/src/assets/images/gallery_eko_atlantic_1793853656107.jpg',
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
    image: '/src/assets/images/gallery_marina_viaduct_1793853657393.jpg',
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
    image: '/src/assets/images/service_highrise_pumping_1793852367412.jpg',
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
    image: '/src/assets/images/service_bored_piling_1793852380230.jpg',
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
    image: '/src/assets/images/service_slab_casting_1793852352746.jpg',
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
    image: '/src/assets/images/service_civil_retaining_1793852394517.jpg',
    description: 'High-speed civil embankment stabilization executed overnight to safeguard the primary arterial ramp connecting mainland Lagos to the maritime ports.',
    tag: 'Civil Retaining & Earthworks',
    keyHighlight: 'Completed without interrupting daytime commercial container freight.'
  }
];
