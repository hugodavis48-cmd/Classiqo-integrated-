/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Machinery {
  id: string;
  name: string;
  category: 'concrete' | 'excavator' | 'crane' | 'drilling' | 'road' | 'port';
  brand: string;
  model: string;
  specifications: { [key: string]: string };
  description: string;
  dailyRateNgn: number;
  salesPriceNgn?: number;
  availability: 'Available' | 'Leased' | 'Sourcing';
  image: string;
  features: string[];
  videoUrl?: string;
}

export interface TechnicalPart {
  id: string;
  name: string;
  category: 'pipes' | 'couplings' | 'elbows' | 'valves' | 'hardware' | 'hoses' | 'chemicals' | 'ppe';
  sizeInches: number;
  pressureRatingBar: number;
  material: string;
  origin: string; // Turkish, Zoomlion OEM, Sany OEM, European Standard, etc.
  stockStatus: 'In Stock' | 'Istanbul Sourcing (7 Days)' | 'On Order';
  description: string;
  priceNgn: number;
  image?: string;
  compatibility?: string; // e.g. Boom Pumps, Stationary Trailer Pumps, Mobile Line Pumps
}

export interface WorkforcePersonnel {
  id: string;
  name: string;
  roleCategory: 'operator' | 'site_engineer' | 'safety_officer' | 'finisher' | 'cleaner' | 'security';
  roleTitle: string;
  yearsExperience: number;
  certifications: string[];
  rating: number; // e.g. 4.9
  completedProjects: number;
  reviewCount: number;
  availability: 'Available Now' | 'Deployable 48h' | 'On Contract';
  dailyRateNgn: number;
  monthlyRateNgn: number;
  location: string;
  bio: string;
  skills: string[];
  image: string;
  equipmentSpecialization: string[];
  featuredReview?: {
    client: string;
    project: string;
    rating: number;
    comment: string;
    date: string;
  };
  hasVideoDemo?: boolean;
  videoDemoTitle?: string;
}

export interface GalleryProject {
  id: string;
  title: string;
  category: 'all' | 'concrete' | 'piling' | 'marine' | 'infrastructure';
  location: string;
  completionYear: string;
  client: string;
  scope: string;
  equipmentDeployed: string[];
  metrics: { label: string; value: string }[];
  image: string;
  description: string;
  tag: string;
  keyHighlight: string;
}

export interface QuoteItem {
  type: 'machinery' | 'part' | 'service' | 'labor';
  id: string;
  name: string;
  quantity: number;
  days?: number; // for machinery renting, labor shifts, or service duration
  rateOrPrice: number;
  unitLabel?: string; // e.g., 'days', 'pcs', 'shifts'
}

export interface ProjectQuery {
  projectType: string;
  location: string;
  soilType?: string;
  pumpingHeight?: number;
  pumpingDistance?: number;
  estimatedDurationDays?: number;
  additionalDetails?: string;
}

export interface ConsultationResponse {
  analysis: string;
  recommendedMachineryIds: string[];
  recommendedPartIds: string[];
  safetyGuidelines: string[];
  logisticsAssessment: string;
}

