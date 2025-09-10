import { TripPlan, MarketplaceItem, Guide, District, TouristStats } from '@/types/tourism';

export const sampleItineraries: Record<string, TripPlan[]> = {
  Nature: [
    {
      id: '1',
      day: 1,
      attraction: 'Betla National Park',
      description: 'Explore the rich wildlife and dense forests of Jharkhand',
      estimatedTime: '6-8 hours',
      estimatedCost: '₹800-1200',
      weather: 'Sunny, 26°C',
      category: 'Wildlife Safari'
    },
    {
      id: '2',
      day: 2,
      attraction: 'Hundru Falls',
      description: 'Magnificent waterfall cascading from 98 meters height',
      estimatedTime: '4-5 hours',
      estimatedCost: '₹500-800',
      weather: 'Partly cloudy, 24°C',
      category: 'Natural Wonder'
    },
    {
      id: '3',
      day: 3,
      attraction: 'Dalma Wildlife Sanctuary',
      description: 'Home to elephants and diverse bird species',
      estimatedTime: '5-6 hours',
      estimatedCost: '₹600-1000',
      weather: 'Clear, 25°C',
      category: 'Wildlife Safari'
    }
  ],
  Culture: [
    {
      id: '4',
      day: 1,
      attraction: 'Jagannath Temple, Ranchi',
      description: 'Replica of Puri Jagannath Temple with stunning architecture',
      estimatedTime: '2-3 hours',
      estimatedCost: '₹200-400',
      weather: 'Sunny, 28°C',
      category: 'Religious Site'
    },
    {
      id: '5',
      day: 2,
      attraction: 'Tribal Research Institute Museum',
      description: 'Learn about rich tribal heritage and culture',
      estimatedTime: '3-4 hours',
      estimatedCost: '₹300-500',
      weather: 'Cloudy, 26°C',
      category: 'Cultural Museum'
    },
    {
      id: '6',
      day: 3,
      attraction: 'Birsa Munda Memorial',
      description: 'Pay homage to the tribal freedom fighter',
      estimatedTime: '2-3 hours',
      estimatedCost: '₹150-300',
      weather: 'Partly sunny, 27°C',
      category: 'Historical Monument'
    }
  ]
};

export const marketplaceItems: MarketplaceItem[] = [
  {
    id: '1',
    title: 'Handwoven Tussar Silk Saree',
    description: 'Authentic Jharkhand tussar silk with traditional motifs',
    price: '₹3,500 - ₹8,000',
    type: 'handicraft',
    image: 'silk-saree',
    rating: 4.8
  },
  {
    id: '2',
    title: 'Tribal Art Wooden Sculptures',
    description: 'Handcrafted wooden sculptures by local tribal artists',
    price: '₹800 - ₹2,500',
    type: 'handicraft',
    image: 'wooden-sculpture',
    rating: 4.6
  },
  {
    id: '3',
    title: 'Dhokra Metal Crafts',
    description: 'Traditional bell metal handicrafts using ancient technique',
    price: '₹600 - ₹1,800',
    type: 'handicraft',
    image: 'dhokra-craft',
    rating: 4.7
  },
  {
    id: '4',
    title: 'Village Homestay - Netarhat',
    description: 'Experience authentic tribal lifestyle in hill station',
    price: '₹1,200 per night',
    type: 'homestay',
    image: 'netarhat-homestay',
    rating: 4.5
  }
];

export const verifiedGuides: Guide[] = [
  {
    id: '1',
    name: 'Rajesh Kumar Munda',
    photo: 'guide-rajesh',
    experience: 8,
    verified: true,
    specialization: 'Wildlife & Nature Tours',
    rating: 4.9,
    languages: ['Hindi', 'English', 'Mundari']
  },
  {
    id: '2',
    name: 'Sunita Devi',
    photo: 'guide-sunita',
    experience: 12,
    verified: true,
    specialization: 'Cultural & Heritage Tours',
    rating: 4.8,
    languages: ['Hindi', 'English', 'Santali']
  },
  {
    id: '3',
    name: 'Amit Singh',
    photo: 'guide-amit',
    experience: 6,
    verified: false,
    specialization: 'Adventure & Trekking',
    rating: 4.4,
    languages: ['Hindi', 'English']
  },
  {
    id: '4',
    name: 'Priya Oraon',
    photo: 'guide-priya',
    experience: 10,
    verified: true,
    specialization: 'Spiritual & Temple Tours',
    rating: 4.7,
    languages: ['Hindi', 'English', 'Kurukh']
  }
];

export const jharkhandDistricts: District[] = [
  {
    id: 'ranchi',
    name: 'Ranchi',
    description: 'Capital city known for waterfalls, hills, and urban attractions',
    image: 'ranchi-district',
    highlights: ['Rock Garden', 'Tagore Hill', 'Kanke Dam']
  },
  {
    id: 'jamshedpur',
    name: 'Jamshedpur',
    description: 'Steel city with modern infrastructure and cultural sites',
    image: 'jamshedpur-district',
    highlights: ['Tata Steel Zoological Park', 'Jubilee Park', 'Dalma Hills']
  },
  {
    id: 'dhanbad',
    name: 'Dhanbad',
    description: 'Coal capital with mining heritage and natural beauty',
    image: 'dhanbad-district',
    highlights: ['Maithon Dam', 'Topchanchi Lake', 'Bhatinda Falls']
  }
];

export const touristStats: TouristStats[] = [
  { month: 'Jan', visitors: 45000 },
  { month: 'Feb', visitors: 52000 },
  { month: 'Mar', visitors: 48000 },
  { month: 'Apr', visitors: 38000 },
  { month: 'May', visitors: 31000 },
  { month: 'Jun', visitors: 28000 },
  { month: 'Jul', visitors: 35000 },
  { month: 'Aug', visitors: 42000 },
  { month: 'Sep', visitors: 47000 },
  { month: 'Oct', visitors: 55000 },
  { month: 'Nov', visitors: 62000 },
  { month: 'Dec', visitors: 58000 }
];