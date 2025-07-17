export interface Product {
  id: number;           // Numeric ID for components
  docId?: string;         // String ID from Firestore
  name: string;
  price: number;
  originalPrice?: number;
  stock: number;
  category: string;
  tags: string[];
  description: string;
  features: { title: string; desc: string }[];
  image: string;
  gradient?: string[];      // Make optional if not on all products
  buttonColor?: string;     // Make optional if not on all products
}