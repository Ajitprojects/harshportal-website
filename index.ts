// src/types/index.ts

// This is the single, correct definition for a Product
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  description: string;
  features: { title: string; desc: string }[];
  tags: string[];
  image: string;
  gradient: string;
  buttonColor: string;
  category: string;
}