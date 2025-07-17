export interface Product {
  id: number;           // Numeric ID for your components
  docId: string;          // String ID from Firestore document
  name: string;
  price: number;
  originalPrice?: number;
  stock: number;
  category: string;
  tags: string[];
  description: string;
  features: string[];
  image: string;
  gradient: string[];     // Added missing 'gradient' property
}