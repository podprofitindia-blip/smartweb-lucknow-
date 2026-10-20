export type Language = 'en' | 'hi';

export type BusinessCategory = 'shop' | 'coaching' | 'clinic' | 'services' | 'other';

export type ColorTheme = 'emerald' | 'blue' | 'indigo' | 'amber' | 'rose';

export interface BusinessConfig {
  businessName: string;
  tagline: string;
  taglineHi: string;
  city: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  theme: ColorTheme;
  turnaroundHours: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  nameHi: string;
  price: number;
  originalPrice: number;
  popular?: boolean;
  bestFor: string;
  bestForHi: string;
  features: string[];
  featuresHi: string[];
  deliveryTime: string;
  deliveryTimeHi: string;
  includedDemoId: BusinessCategory;
}

export interface DemoItem {
  id: BusinessCategory;
  title: string;
  titleHi: string;
  subtitle: string;
  subtitleHi: string;
  categoryLabel: string;
  categoryLabelHi: string;
  image: string;
  features: string[];
  featuresHi: string[];
  sampleBusinessName: string;
  sampleLocation: string;
  demoUrl?: string;
}

export interface EnquirySubmission {
  id: string;
  fullName: string;
  phone: string;
  businessName: string;
  category: BusinessCategory;
  city: string;
  selectedPlan: string;
  notes?: string;
  estimatedTotal: number;
  createdAt: string;
  status: 'new' | 'contacted' | 'completed';
}
