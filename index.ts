export interface Product {
  id: number;           // Numeric ID for your components
  docId?: string;         // String ID from the database if needed
  name: string;
  price: number;
  originalPrice?: number;
  stock: number;
  category: string;
  tags: string[];
  description: string;
  features: { title: string; desc: string }[];
  image: string;
  gradient?: string[];
  buttonColor?: string;
}