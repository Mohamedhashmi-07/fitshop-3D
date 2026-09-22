export type OfferStatus = 'locked' | 'activity_completed' | 'unlocked';

export type FitnessActivityType = 'running' | 'walking' | 'cycling' | 'workout' | 'gym';

export interface FitnessRequirement {
  type: FitnessActivityType;
  target: number;
  unit: string; // 'KM', 'Steps', 'Mins'
  description: string;
  challengeId: string;
}

export interface FitnessOffer {
  discountPercentage: number;
  requirement: FitnessRequirement;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  brandId: string;
  category: string;
  categoryId: string;
  description: string;
  originalPrice: number; // NEVER OVERWRITTEN
  fitnessOffer: FitnessOffer;
  rating: number;
  reviewCount: number;
  stock: number;
  images: string[];
  featured?: boolean;
  trending?: boolean;
  specs?: Record<string, string>;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  activityType: FitnessActivityType;
  target: number;
  unit: string;
  stepIncrement: number; // e.g. 1 for KM, 1000 for steps
  associatedProductId: string;
  discountPercentage: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  durationDays?: number;
}

export interface UserChallengeProgress {
  challengeId: string;
  current: number;
  target: number;
  isCompleted: boolean;
  isUnlocked: boolean;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  appliedDiscountPercentage: number; // 0 if locked, e.g. 40 if unlocked
  originalPrice: number;
  finalPrice: number;
  savings: number;
}

export interface ShippingAddress {
  fullName: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  brand: string;
  image: string;
  quantity: number;
  originalPrice: number;
  discountPercentage: number;
  finalPrice: number;
  savings: number;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  totalOriginalPrice: number;
  totalFitnessDiscount: number;
  finalTotal: number;
  totalSavings: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  status: 'Processing' | 'Shipped' | 'Delivered';
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatar?: string;
  profile: {
    bio: string;
    location: string;
    joinedDate: string;
  };
  fitnessGoals: string;
  activityPreferences: string[];
  cart: CartItem[];
  wishlist: string[]; // product IDs
  orders: Order[];
  challenges: Record<string, UserChallengeProgress>;
  streaks: number;
  rewards: number;
  totalSteps: number;
  totalDistanceKm: number;
  unlockedOffers: string[]; // product IDs
  totalSavings: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  image: string;
  productCount: number;
}

export interface Brand {
  id: string;
  name: string;
  tagline: string;
  logo: string;
  productCount: number;
  verified: boolean;
  featured: boolean;
  category: string;
  description: string;
}
