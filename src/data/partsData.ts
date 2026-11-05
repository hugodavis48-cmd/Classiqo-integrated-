/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TechnicalPart } from '../types';

export const PARTS_DATA: TechnicalPart[] = [
  // 1. PIPES
  {
    id: 'pipe-zoomlion-3m',
    name: 'Zoomlion OEM 3-Meter Twin-Wall Casting Pipe (DN125)',
    category: 'pipes',
    sizeInches: 5.0, // DN125
    pressureRatingBar: 130,
    material: 'Twin-wall induction hardened alloy (62-65 HRC)',
    origin: 'Zoomlion OEM Certified',
    stockStatus: 'In Stock',
    description: 'Genuine Zoomlion 3-meter metal casting pipe with 148mm heavy-duty forged collar ends. Inner wall induction quenched for high abrasive pumping across high-rise and heavy civil casting.',
    priceNgn: 195000,
    image: '/assets/images/concrete_pump_pipes_1780284052994.png',
    compatibility: 'Zoomlion & Sany Boom & Trailer Pumps'
  },
  {
    id: 'pipe-dn125-3m',
    name: 'High-Pressure Concrete Straight Delivery Pipe 3m (DN125)',
    category: 'pipes',
    sizeInches: 5.0,
    pressureRatingBar: 130,
    material: 'Twin-wall steel, Hardened Q345/St52',
    origin: 'Turkey Sourced (European standard)',
    stockStatus: 'In Stock',
    description: 'DN125 twin-walled seamless high pressure concrete straight tube. Specially hardened inner casing offering up to 50,000m³ service life performance. Features standard 148mm flare collars.',
    priceNgn: 185000,
    image: '/assets/images/concrete_pump_pipes_1780284052994.png',
    compatibility: 'Boom, Mobile Line & Stationary Pumps'
  },
  {
    id: 'pipe-dn125-2m',
    name: 'Medium-Pressure Line Pipe 2m (DN125)',
    category: 'pipes',
    sizeInches: 5.0,
    pressureRatingBar: 85,
    material: 'Single-wall hardened steel',
    origin: 'Turkey Sourced',
    stockStatus: 'In Stock',
    description: 'DN125 single-walled delivery pipe designed for ground line setups or standard trailer output. Heat-treated flange connections resist heavy wear.',
    priceNgn: 135000,
    image: '/assets/images/concrete_pump_pipes_1780284052994.png',
    compatibility: 'Stationary Trailer & Ground Pipeline'
  },

  // 2. FLEXIBLE CASTING HOSES
  {
    id: 'hose-dn125-4m-discharge',
    name: 'Flexible Rubber Discharge Casting Hose 4m (DN125)',
    category: 'hoses',
    sizeInches: 5.0,
    pressureRatingBar: 85,
    material: 'Multi-ply high tensile steel wire cord & wear synthetic rubber',
    origin: 'Turkish Premium Industrial',
    stockStatus: 'In Stock',
    description: 'Heavy-duty 4-meter flexible end hose with vulcanized hardened steel flange collars. Resists kinking and handles aggressive aggregate velocity at the boom tip or column casting zone.',
    priceNgn: 210000,
    image: '/assets/images/part_flexible_hose_1793853552157.jpg',
    compatibility: 'Boom Pump Tips & Tremie Pouring'
  },
  {
    id: 'hose-dn125-3m-flexible',
    name: 'High-Flex Column Pouring Hose 3m (DN125)',
    category: 'hoses',
    sizeInches: 5.0,
    pressureRatingBar: 85,
    material: 'Textile cord & wire-braided synthetic elastomeric core',
    origin: 'European Standard',
    stockStatus: 'In Stock',
    description: 'Lightweight flexible delivery hose designed for easy manual handling by site crews during pile top grouting and tight slab casting operations.',
    priceNgn: 175000,
    image: '/assets/images/part_flexible_hose_1793853552157.jpg',
    compatibility: 'Mobile Line & Piling Rigs'
  },

  // 3. CLAMPS & COUPLINGS
  {
    id: 'coupling-dn125-snap-clamp',
    name: 'Quick-Release Concrete Pump Snap Clamp (DN125)',
    category: 'couplings',
    sizeInches: 5.0,
    pressureRatingBar: 140,
    material: 'Forged 45# High-Tensile Carbon Steel',
    origin: 'Turkey Sourced',
    stockStatus: 'In Stock',
    description: 'Forged toggle bolt snap coupling clamp. Features a safety locking pin and polyurethane sealing ring to completely block concrete slurry leakage. Quick release design allows rapid line maintenance.',
    priceNgn: 42000,
    image: '/assets/images/part_snap_coupling_clamp_1793852409516.jpg',
    compatibility: 'Universal DN125 / 148mm Flanges'
  },
  {
    id: 'coupling-dn125-heavy-screw',
    name: 'Heavy-Duty Screw Clamp Coupling (DN125)',
    category: 'couplings',
    sizeInches: 5.0,
    pressureRatingBar: 180,
    material: 'Forged Alloy Steel with Hardened Thread',
    origin: 'Turkish Premium',
    stockStatus: 'In Stock',
    description: 'High-integrity dual-bolt screw coupling designed for permanent high-pressure vertical riser pipelines in multi-story towers. Eliminates surge kick-back.',
    priceNgn: 58000,
    image: '/assets/images/part_snap_coupling_clamp_1793852409516.jpg',
    compatibility: 'High-Rise Vertical Risers & High-Pressure Pumping'
  },
  {
    id: 'coupling-wedge-dn125',
    name: 'Wedge-Lock Fast Pipeline Coupling (DN125)',
    category: 'couplings',
    sizeInches: 5.0,
    pressureRatingBar: 130,
    material: 'Drop-forged carbon steel with zinc coating',
    origin: 'Zoomlion OEM',
    stockStatus: 'In Stock',
    description: 'Rugged hammer-drive wedge coupling allowing instantaneous assembly and disassembly on rough site terrains without threaded socket tools.',
    priceNgn: 49000,
    image: '/assets/images/part_snap_coupling_clamp_1793852409516.jpg',
    compatibility: 'Mobile Line Pumps & Civil Ground Pipelines'
  },

  // 4. ELBOW JOINTS (90, 45, 35 DEGREE)
  {
    id: 'elbow-dn125-90-r275',
    name: 'Hardened Steel Twin-Wall Elbow 90° (R275 DN125)',
    category: 'elbows',
    sizeInches: 5.0,
    pressureRatingBar: 130,
    material: 'Twin-wall high chromium steel alloy (63 HRC)',
    origin: 'Turkey Sourced (Premium Brand)',
    stockStatus: 'In Stock',
    description: 'Cast twin-wall steel elbow offering outstanding abrasion resistance. Extra-thick outer wall on the curvature radius handles massive concrete friction forces.',
    priceNgn: 98000,
    image: '/assets/images/part_twinwall_elbow_90_1793852423091.jpg',
    compatibility: 'Boom Arms, Turntables & Pipeline Corners'
  },
  {
    id: 'elbow-dn125-45',
    name: 'High-Wear Cast Pipeline Elbow 45° (DN125)',
    category: 'elbows',
    sizeInches: 5.0,
    pressureRatingBar: 130,
    material: 'Induction hardened alloy steel with manganese insert',
    origin: 'Zoomlion / Sany Compatible',
    stockStatus: 'In Stock',
    description: '45-degree diversion bend minimizing pumping friction and pressure drop when routing pipelines across elevation transitions and bridge viaducts.',
    priceNgn: 85000,
    image: '/assets/images/part_twinwall_elbow_90_1793852423091.jpg',
    compatibility: 'Trailer Pumps, Mobile Lines & Boom Rigs'
  },
  {
    id: 'elbow-dn125-35',
    name: 'Gradual Transition Elbow 35° (DN125)',
    category: 'elbows',
    sizeInches: 5.0,
    pressureRatingBar: 130,
    material: 'Quenched seamless alloy steel',
    origin: 'Turkish Premium',
    stockStatus: 'In Stock',
    description: 'Low-angle 35-degree pipe elbow designed to reduce hydrodynamic drag and line surge on long-distance horizontal runs up to 300 meters.',
    priceNgn: 82000,
    image: '/assets/images/part_twinwall_elbow_90_1793852423091.jpg',
    compatibility: 'Long-Distance Ground Line Pumping'
  },

  // 5. VALVES & FLOW REDIRECTION
  {
    id: 'valve-slide-dn125',
    name: 'Manual Concrete Pump Slide Gate Valve (DN125)',
    category: 'valves',
    sizeInches: 5.0,
    pressureRatingBar: 130,
    material: 'Heavy structural steel plate with precision ground gate',
    origin: 'Istanbul Sourcing (7 Days)',
    stockStatus: 'Istanbul Sourcing (7 Days)',
    description: 'Enables quick pipeline redirection and line isolation. Perfect for pouring concrete sequentially in multiple tall columns or blocks from a single ground pump setup.',
    priceNgn: 480000,
    image: '/assets/images/part_twinwall_elbow_90_1793852423091.jpg',
    compatibility: 'High-Rise Riser Manifolds & Split Pour Lines'
  },
  {
    id: 'valve-shutoff-hydraulic',
    name: 'Hydraulic Pipeline Shut-Off Valve (DN125)',
    category: 'valves',
    sizeInches: 5.0,
    pressureRatingBar: 160,
    material: 'Cast steel body with double hydraulic cylinders',
    origin: 'Sany OEM Compatible',
    stockStatus: 'On Order',
    description: 'Hydraulically actuated gate valve designed to shut off high-head vertical concrete columns during pumping halts, preventing backflow and pipe blockage.',
    priceNgn: 920000,
    image: '/assets/images/part_twinwall_elbow_90_1793852423091.jpg',
    compatibility: 'Stationary Trailer Pumps & High-Rise Towers'
  },

  // 6. PUMP PARTS & WEAR HARDWARE (Mobile line, stationary, boom)
  {
    id: 'wear-plate-sany',
    name: 'S-Valve Wear Plate + Cutting Ring Set',
    category: 'hardware',
    sizeInches: 8.0,
    pressureRatingBar: 160,
    material: 'Tungsten Carbide Inlay (92 HRA)',
    origin: 'Istanbul Sourcing (7 Days)',
    stockStatus: 'In Stock',
    description: 'Tungsten carbide wear plate & companion cutting ring set to fit Sany and Zoomlion concrete trailer/truck pump S-valves. Maximizes pressure sealing and prolongs valve lifecycle.',
    priceNgn: 740000,
    image: '/assets/images/part_twinwall_elbow_90_1793852423091.jpg',
    compatibility: 'Sany & Zoomlion Mobile & Trailer S-Valves'
  },
  {
    id: 'piston-ram-dn200',
    name: 'Polyurethane Concrete Piston Ram (DN200 / DN230)',
    category: 'hardware',
    sizeInches: 8.0,
    pressureRatingBar: 140,
    material: 'Hydrolysis-resistant cast polyurethane with steel core',
    origin: 'Turkish Premium OEM',
    stockStatus: 'In Stock',
    description: 'Direct replacement delivery cylinder piston head for stationary trailer pumps and truck-mounted boom pumps. Resists slurry friction, heat, and oil expansion.',
    priceNgn: 115000,
    image: '/assets/images/part_snap_coupling_clamp_1793852409516.jpg',
    compatibility: 'Trailer Pumps & Boom Delivery Cylinders'
  },
  {
    id: 'cleaning-sponge-ball-kit',
    name: 'Pipeline Washout Cleaning Sponge Balls & Wash Cap Kit',
    category: 'hardware',
    sizeInches: 5.0,
    pressureRatingBar: 80,
    material: 'High-density porous vulcanized rubber (Medium/Hard)',
    origin: 'European Standard',
    stockStatus: 'In Stock',
    description: 'Complete pipeline blowout cleaning pack: includes 6 high-density sponge balls (DN125/DN150), quick-lock water/air washout cap, and slurry catch basket.',
    priceNgn: 65000,
    image: '/assets/images/part_snap_coupling_clamp_1793852409516.jpg',
    compatibility: 'Boom Lines, Mobile Lines & Trailer Outlets'
  },
  {
    id: 'seal-rubber-dn125',
    name: 'O-Ring Rubber Packing Gasket Pack of 10 (DN125)',
    category: 'hardware',
    sizeInches: 5.0,
    pressureRatingBar: 150,
    material: 'Premium Buna-N / Nitrile Rubber',
    origin: 'Turkey Sourced',
    stockStatus: 'In Stock',
    description: 'Specially engineered gasket pack matching standard twin-wall coupling flares. Resists mineral oils, hydraulic fluids, and severe high temperature Lagos climate wear.',
    priceNgn: 28000,
    image: '/assets/images/part_snap_coupling_clamp_1793852409516.jpg',
    compatibility: 'All DN125 Clamps and Couplings'
  },

  // 7. CONCRETE CHEMICALS (QUICK ACTIONS & SUPERPLASTICIZERS)
  {
    id: 'chem-quick-set-accelerator',
    name: 'Quick-Set Rapid Hardening Concrete Accelerator (25L Drum)',
    category: 'chemicals',
    sizeInches: 0,
    pressureRatingBar: 0,
    material: 'Non-chloride liquid calcium-formate accelerator',
    origin: 'Lafarge & EuroChem Approved',
    stockStatus: 'In Stock',
    description: 'High-performance liquid hardening accelerator. Reduces initial set time by up to 60% for fast formwork stripping, precast casting, cold joint avoidance, and urgent tidal revetment works.',
    priceNgn: 85000,
    image: '/assets/images/part_concrete_chemicals_1793853565822.jpg',
    compatibility: 'Ready-mix Trucks, Grout Pumps, Piling Slurry'
  },
  {
    id: 'chem-superplasticizer-flow',
    name: 'Flow-Max Polycarboxylate Superplasticizer (25L Drum)',
    category: 'chemicals',
    sizeInches: 0,
    pressureRatingBar: 0,
    material: 'Polycarboxylate ether (PCE) high-range water reducer',
    origin: 'Turkish Specialty Chemicals',
    stockStatus: 'In Stock',
    description: 'Increases concrete slump from 80mm to self-compacting 220mm without segregation. Drastically lowers pumping line friction and prevents pipeline blockages across long boom pours.',
    priceNgn: 92000,
    image: '/assets/images/part_concrete_chemicals_1793853565822.jpg',
    compatibility: 'Pumpable Concrete C30-C60, High-Rise Pumping'
  },
  {
    id: 'chem-formwork-release',
    name: 'Bio-Coat Clean Formwork Release Oil (20L Jerrycan)',
    category: 'chemicals',
    sizeInches: 0,
    pressureRatingBar: 0,
    material: 'Biodegradable vegetable ester barrier agent',
    origin: 'Industrial Standard',
    stockStatus: 'In Stock',
    description: 'Ensures effortless demolding of steel shutters, aluminum forms, and plywood casings. Leaves architectural concrete surfaces pristine and bubble-free with zero staining.',
    priceNgn: 48000,
    image: '/assets/images/part_concrete_chemicals_1793853565822.jpg',
    compatibility: 'Steel & Aluminum Formwork, Column Moulds'
  },

  // 8. SAFETY & PPE ACCESSORIES
  {
    id: 'ppe-certified-hardhat',
    name: 'Industrial High-Impact Vented Safety Helmet (Pack of 5)',
    category: 'ppe',
    sizeInches: 0,
    pressureRatingBar: 0,
    material: 'ABS high-density impact shell, 6-point suspension harness',
    origin: 'EN 397 & ANSI Z89.1 Certified',
    stockStatus: 'In Stock',
    description: 'Heavy civil construction safety helmets with adjustable ratchet dial, sweatband, and reflective decals. Engineered for site engineers, machine operators, and casting crews.',
    priceNgn: 45000,
    image: '/assets/images/part_safety_ppe_1793853579021.jpg',
    compatibility: 'All Construction Sites & Plant Personnel'
  },
  {
    id: 'ppe-highvis-vest-pack',
    name: 'High-Visibility Breathable Reflective Safety Vests (Pack of 10)',
    category: 'ppe',
    sizeInches: 0,
    pressureRatingBar: 0,
    material: 'Breathable polyester mesh with 3M Scotchlite reflective stripes',
    origin: 'ISO 20471 Class 2 Compliant',
    stockStatus: 'In Stock',
    description: 'Heavy-duty site safety vests featuring walkie-talkie chest clips, reinforced pen slots, dual large tool pockets, and front zip closure for night and daylight visibility.',
    priceNgn: 38000,
    image: '/assets/images/part_safety_ppe_1793853579021.jpg',
    compatibility: 'Site Traffic Officers, Crew, Field Engineers'
  },
  {
    id: 'ppe-concrete-gloves-pack',
    name: 'Puncture & Alkaline-Resistant Grip Safety Gloves (Pack of 10)',
    category: 'ppe',
    sizeInches: 0,
    pressureRatingBar: 0,
    material: 'Heavy nitrile dipped palm with sandy grip finish & HPPE liner',
    origin: 'EN 388 (4X43D) Cut Level D',
    stockStatus: 'In Stock',
    description: 'Protects pipeline crew and concrete finishers against wet alkaline cement burns, sharp pipe burs, wire ties, and heavy steel coupling pinch points.',
    priceNgn: 32000,
    image: '/assets/images/part_safety_ppe_1793853579021.jpg',
    compatibility: 'Concrete Casters, Riggers, Pipeline Mechanics'
  }
];
