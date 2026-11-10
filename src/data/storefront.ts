export type StoreProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  compareAt?: number;
  category: string;
  image: string;
  sizes: string[];
  colors: string[];
  stock: number;
  featured?: boolean;
  bestseller?: boolean;
  isNew?: boolean;
};

export type ClothingStoreConfig = {
  name: string;
  logo: string;
  primary: string;
  accent: string;
  whatsapp: string;
  phone: string;
  email: string;
  address: string;
  banner: string;
  currency: 'INR';
  language: 'en' | 'hi';
  categories: string[];
};

export const defaultClothingStore: ClothingStoreConfig = {
  name: 'Aarya Studio',
  logo: '',
  primary: '#32271f',
  accent: '#a46c48',
  // Deliberately blank: enter the shop owner's real WhatsApp number in the demo admin.
  whatsapp: '',
  phone: '+91 00000 00000',
  email: 'hello@example.com',
  address: 'Hazratganj, Lucknow, Uttar Pradesh',
  banner: 'A little tradition, a lot of you. Discover the new season edit.',
  currency: 'INR',
  language: 'en',
  categories: ['All', 'Kurtas', 'Sarees', 'Dresses', 'Accessories'],
};

const photo = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

export const demoClothingProducts: StoreProduct[] = [
  { id: 'kurta-01', name: 'The Noor Chikankari Kurta', description: 'An easy, airy cotton kurta with delicate hand-inspired chikankari detailing. A versatile piece for slow mornings and festive evenings.', price: 1890, compareAt: 2490, category: 'Kurtas', image: photo('photo-1583743814966-8936f37f4678'), sizes: ['S', 'M', 'L', 'XL'], colors: ['Ivory', 'Sage'], stock: 12, featured: true, bestseller: true },
  { id: 'saree-01', name: 'Gulab Chanderi Saree', description: 'A luminous Chanderi-inspired drape in a soft rose hue, finished with a subtle woven border. Includes an unstitched blouse piece.', price: 3290, compareAt: 3990, category: 'Sarees', image: photo('photo-1610030469983-98e550d6193c'), sizes: ['One size'], colors: ['Rose'], stock: 7, featured: true, isNew: true },
  { id: 'dress-01', name: 'Meher Everyday Co-ord', description: 'A relaxed two-piece set cut from breathable cotton. Thoughtful tailoring makes it comfortable enough for all-day wear.', price: 2190, category: 'Dresses', image: photo('photo-1594633312681-425c7b97ccd1'), sizes: ['S', 'M', 'L', 'XL'], colors: ['Terracotta', 'Black'], stock: 9, bestseller: true },
  { id: 'kurta-02', name: 'Sunehri Anarkali Set', description: 'A graceful flared silhouette with tonal embroidery, paired with a lightweight dupatta for celebrations big and small.', price: 2890, compareAt: 3490, category: 'Kurtas', image: photo('photo-1597983073493-88cd35cf93b0'), sizes: ['S', 'M', 'L'], colors: ['Marigold'], stock: 5, featured: true, isNew: true },
  { id: 'accessory-01', name: 'Mogra Handloom Dupatta', description: 'A soft, airy handloom dupatta with a fine contrast edge. An effortless finishing touch for everyday looks.', price: 890, category: 'Accessories', image: photo('photo-1606760227091-3dd870d97f1d'), sizes: ['One size'], colors: ['Blue', 'Ivory'], stock: 18, bestseller: true },
  { id: 'dress-02', name: 'Aabha Printed Midi Dress', description: 'A playful floral print meets a flattering, easy fit. Made for brunches, errands and everything in between.', price: 1790, compareAt: 2290, category: 'Dresses', image: photo('photo-1515886657613-9f3515b0c78f'), sizes: ['S', 'M', 'L', 'XL'], colors: ['Indigo'], stock: 0, isNew: true },
];
