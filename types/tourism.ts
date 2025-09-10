export interface TripPlan {
  id: string;
  day: number;
  attraction: string;
  description: string;
  estimatedTime: string;
  estimatedCost: string;
  weather: string;
  category: string;
}

export interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  price: string;
  type: 'handicraft' | 'homestay';
  image: string;
  rating?: number;
}

export interface Guide {
  id: string;
  name: string;
  photo: string;
  experience: number;
  verified: boolean;
  specialization: string;
  rating: number;
  languages: string[];
}

export interface District {
  id: string;
  name: string;
  description: string;
  image: string;
  highlights: string[];
}

export interface TouristStats {
  month: string;
  visitors: number;
}

export interface TripPlannerInput {
  days: number;
  interest: 'Nature' | 'Culture' | 'Adventure' | 'Spiritual';
  budget: 'Low' | 'Medium' | 'High';
}