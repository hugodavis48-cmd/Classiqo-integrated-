/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Machinery } from '../types';

export const EQUIPMENT_DATA: Machinery[] = [
  // Concrete Machinery
  {
    id: 'sany-pump-56m',
    name: 'Sany 56m Truck-Mounted Concrete Boom Pump',
    category: 'concrete',
    brand: 'Sany',
    model: 'SY5418THB 560C-8 Active',
    specifications: {
      'Reach Height': '56 Meters (Vertical)',
      'Reach Depth': '42.8 Meters',
      'Delivery Volume': '180 m³/h',
      'Pumping Pressure': '8.3 MPa',
      'Boom Sections': '6 R-RZ Fold',
      'Chassis': 'Sany C10 Heavy Carrier'
    },
    description: 'High-efficiency truck-mounted concrete boom pump featuring active vibration control technology. Equipped with intelligent arm damping systems. Staged directly at Lagos Eti-Osa yard and perfect for high-rise slabs, heavy piling foundations, and major civil drainage systems.',
    dailyRateNgn: 1450000,
    salesPriceNgn: 285000000,
    availability: 'Available',
    image: '/src/assets/images/sany_boom_pump_1780289808297.png',
    videoUrl: 'https://www.youtube.com/embed/5U_74nI_2U0',
    features: [
      'Active Boom Vibration Reduction (reduces fatigue by 50%)',
      'One-touch automatic boom unfolding and terminal hover control',
      'High configuration Rexroth hydraulic pumps with active cooling',
      'Intelligent digital operating screens inside the main cabin'
    ]
  },
  {
    id: 'sany-line-pump-sy5133',
    name: 'Sany Truck-Mounted Concrete Line Pump',
    category: 'concrete',
    brand: 'Sany',
    model: 'SY5133THB-100',
    specifications: {
      'Pipeline Reach': '150+ Meters Horizontal',
      'Delivery Volume': '100 m³/h',
      'Max Payout Pressure': '13 MPa',
      'Pipeline Diameter': '125 mm (5" High-Chromium)',
      'Chassis': 'Dongfeng-Sany White Custom'
    },
    description: 'The premier solution for long-range, horizontal line-poured concrete casting. Ideal for sites inside narrow Lagos channels or highly dense residential schemes where boom deployment is restricted. Includes 100 meters of premium twin-wall pipeline joints.',
    dailyRateNgn: 950000,
    salesPriceNgn: 195000000,
    availability: 'Available',
    image: '/src/assets/images/sany_line_pump_1780289828457.png',
    videoUrl: 'https://www.youtube.com/embed/fE39O_9E57M',
    features: [
      'Truck-mounted agility with quick horizontal pipeline couplings',
      'Excellent performance in low slump and highly dense aggregate concrete',
      'Sany bespoke high-low pressure switching system',
      'Double-layer wear-resistant spectacle plates and concrete piston linings'
    ]
  },
  {
    id: 'atabey-trailer-gp30',
    name: 'Atabey Mobile Placing Boom & Concrete Pump',
    category: 'concrete',
    brand: 'Atabey',
    model: 'GP 30 / Scorpion',
    specifications: {
      'Placing Radius': '24 Meters',
      'Max Delivery Height': '30 Meters',
      'Slewing Range': '360° Endless Swing',
      'Trailer Chassis': 'Dual-Axle Site Towable',
      'Hydraulic Power': '37 kW electric motor / diesel auxiliary'
    },
    description: 'Specially designed towable site pump and placing boom, ideal for sand beds of Lekki, high density foundations, and horizontal pipeline casting jobs. Move in effortlessly across tight sand routes.',
    dailyRateNgn: 680000,
    salesPriceNgn: 89000000,
    availability: 'Available',
    image: '/src/assets/images/atabey_trailer_1780289846185.png',
    videoUrl: 'https://www.youtube.com/embed/1v0s1Ems9Kk',
    features: [
      'Compact structure towable on loose sand terrains',
      'Endless hydraulic 360-degree boom swing articulation',
      'Direct line casting connections for rapid slab distribution',
      'Integrated heavy outrigger stabilizer stabilizers'
    ]
  },
  {
    id: 'sany-trailer-hbt80',
    name: 'Sany HBT80 Trailer Concrete Pump',
    category: 'concrete',
    brand: 'Sany',
    model: 'HBT8016C-5S',
    specifications: {
      'Max. Pressure': '16 MPa',
      'Max. Capacity': '80 m³/h',
      'Engine Power': '112 kW',
      'Pipe Diameter': '125 mm (5")',
      'Weight': '6,500 kg'
    },
    description: 'Ultra-reliable stationary concrete pump built for long-distance horizontal pumping and tall buildings. Easily handles tough concrete mixes containing coarse aggregate. Frequently paired with our heavy horizontal casting projects.',
    dailyRateNgn: 450000,
    salesPriceNgn: 72000000,
    availability: 'Available',
    image: '/src/assets/images/sany_trailer_pump_1780289861283.png',
    videoUrl: 'https://www.youtube.com/embed/W-E0L-Nf5m8',
    features: [
      'Dual-power system capability',
      'Reverse pumping option for clearing pipe line blocks',
      'Turkey-sourced wear-resistant spectacles plate & cutting ring',
      'Highly compact design for Lekki sandy ground conditions'
    ]
  },

  // Excavators
  {
    id: 'sany-excavator-sy215c',
    name: 'Sany SY215C Medium Excavator',
    category: 'excavator',
    brand: 'Sany',
    model: 'SY215C-9',
    specifications: {
      'Operating Weight': '21,900 kg',
      'Bucket Capacity': '1.2 m³',
      'Engine Power': '118 kW',
      'Max. Digging Depth': '6.6 m',
      'Fuel Tank Rate': '340 L'
    },
    description: 'The global workhorse of earthmoving. Features customized heavy-duty undercarriage and high efficiency power systems optimized for Nigeria’s high ambient humidity and dust.',
    dailyRateNgn: 380000,
    salesPriceNgn: 115000000,
    availability: 'Available',
    image: '/src/assets/images/sany_excavator_sy215c_1793851331207.jpg',
    videoUrl: 'https://www.youtube.com/embed/T9d1SgX85r4',
    features: [
      'Advanced dynamic optimization matching control system (DOMCS)',
      'Reinforced boom, arm, and high-strength bucket',
      'Reinforced track rollers and structural chain guides',
      'Outstanding fuel efficiency with customizable eco modes'
    ]
  },
  {
    id: 'sany-excavator-sy365h',
    name: 'Sany SY365H Heavy Mining Excavator',
    category: 'excavator',
    brand: 'Sany',
    model: 'SY365H-10',
    specifications: {
      'Operating Weight': '36,000 kg',
      'Bucket Capacity': '1.6 m³',
      'Engine Power': '212 kW',
      'Max. Digging Depth': '7.3 m',
      'Max. Dumping Height': '7.1 m'
    },
    description: 'Heavy-duty excavator designed specifically for severe mining, deep quarry, and major marine sand-filling dredging logistics around Ibeju-Lekki lagoon corridors.',
    dailyRateNgn: 650000,
    salesPriceNgn: 198000000,
    availability: 'Leased',
    image: '/src/assets/images/sany_excavator_sy365h_1793851348308.jpg',
    videoUrl: 'https://www.youtube.com/embed/Y0D8Ym5SgK4',
    features: [
      'Heavy duty undercarriage for structural granite tasks',
      'High displacement positive-flow hydraulic engine technology',
      'Multi-stage filtration system protecting engine from fuel contaminants',
      'ROPS/FOPS certified safe cabin design'
    ]
  },

  // Cranes
  {
    id: 'sany-crane-stc500',
    name: 'Sany STC500 Mobile Truck Crane',
    category: 'crane',
    brand: 'Sany',
    model: 'STC500S 50t',
    specifications: {
      'Lifting Capacity': '50 Metric Tons',
      'Max. Boom Length': '43.5 Meters',
      'Max. Lifting Height': '59.5 Meters (with Jib)',
      'Engine Model': 'Cummins ISLe315',
      'Axles': '4 Axle Steering Carrier'
    },
    description: 'An exceptionally stable mobile vehicle crane. Excellent load charter metrics and swift road transport characteristics across Lagos bridges and arterial roads.',
    dailyRateNgn: 950000,
    salesPriceNgn: 185000000,
    availability: 'Available',
    image: '/src/assets/images/sany_crane_stc500_1793851361061.jpg',
    videoUrl: 'https://www.youtube.com/embed/_K-fA-69Mfk',
    features: [
      'U-shaped high-strength tensile steel boom',
      'Real-time safe load indicator (LMI) with auto shutdown',
      'Superb ultra-slow motion micro-positioning capabilities',
      'High-performance chassis built for severe logistics lanes'
    ]
  },

  // Piling Machinery
  {
    id: 'sany-drilling-sr285',
    name: 'Sany SR285 Rotary Drilling Rig',
    category: 'drilling',
    brand: 'Sany',
    model: 'SR285R-W10',
    specifications: {
      'Max. Torque': '285 kN.m',
      'Max. Pile Diameter': '2.2 m',
      'Max. Pile Depth': '84 m',
      'Engine Power': '250 kW',
      'Kelly Bar Options': 'Interlocking or Friction'
    },
    description: 'Ideal specialized heavy engineering tool tailored for high-rise piling projects in Lagos sand beds. Ensures perfect pile foundation drilling in swampy or tidal Lekki strata.',
    dailyRateNgn: 1600000,
    salesPriceNgn: 410000000,
    availability: 'Available',
    image: '/src/assets/images/sany_drilling_rig_1780289790352.png',
    videoUrl: 'https://www.youtube.com/embed/8KPr7A0-csk',
    features: [
      'High stability heavy duty rotary structural chassis',
      'Rotary drive auto spin-off function for high speeds drilling',
      'Crowd winch system matching extreme soil resistance layers',
      'Cabling health tracking & auto mast verticality corrections'
    ]
  },

  // Road Rollers & Port Stackers
  {
    id: 'sany-roller-ssr120',
    name: 'Sany 12t Single Drum Vibratory Road Roller',
    category: 'road',
    brand: 'Sany',
    model: 'SSR120C-8',
    specifications: {
      'Operating Weight': '12,000 kg',
      'Vibration Frequency': '32/38 Hz',
      'Centrifugal Force': '280/170 kN',
      'Drum Width': '2.1 m',
      'Engine': 'Cummins Turbocharged'
    },
    description: 'Advanced road roller ensuring density standards on heavy sand, sub-base compaction, and asphalt pavement layers for Nigeria municipal roads.',
    dailyRateNgn: 280000,
    salesPriceNgn: 58000000,
    availability: 'Available',
    image: '/src/assets/images/sany_roller_ssr120_1793851374589.jpg',
    videoUrl: 'https://www.youtube.com/embed/jD6nE-198u8',
    features: [
      'Optimized drum vibration control (increases efficiency)',
      'Highly durable steel structural frame & heavy shock absorbers',
      'Spacious low-noise cabin and 360-degree field of vision',
      'Exceptional gradeability performance up to 35%'
    ]
  },
  {
    id: 'sany-stacker-srsc45',
    name: 'Sany Reach Stacker (Container Handler)',
    category: 'port',
    brand: 'Sany',
    model: 'SRSC45H1',
    specifications: {
      'Max. Lifting Capacity': '45 Metric Tons',
      'Stacking Rows': '5 Containers (9\'6")',
      'Engine Model': 'Volvo TAD1170VE',
      'Transmission': 'ZF 5WG261',
      'Spreader Type': 'Sany SDJ450'
    },
    description: 'Primary material logistics tool used in Apapa port terminal, Onne port, or Lekki Deep Sea port. Delivers lightning-fast container movements with anti-rollover safety technology.',
    dailyRateNgn: 1300000,
    salesPriceNgn: 320000000,
    availability: 'Sourcing',
    image: '/src/assets/images/sany_reach_stacker_1780289875670.png',
    videoUrl: 'https://www.youtube.com/embed/WdAt_6ZtZio',
    features: [
      'Dynamic anti-rollover protection technology',
      'Sany spreader tracking auto centering correction',
      'Energy saving hydromatic system matching load weights',
      'Intelligent fire suppression system built in'
    ]
  }
];
