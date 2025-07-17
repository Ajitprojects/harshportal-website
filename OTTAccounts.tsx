import React, { useState, useEffect } from 'react';
import ProductPageLayout from '../components/ProductPageLayout';
import toast from 'react-hot-toast';
import { db } from '../firebase';
import { collection, getDocs, query, where } from "firebase/firestore";

// Define the shape of your Product data
interface Product {
  id: string; 
  name: string;
  price: string;
  stock: number;
  category: string;
}

const OTTAccounts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      try {
        // Reference to your 'products' collection in Firestore
        const productsCollectionRef = collection(db, "products");
        
        // Create a query to get products where the category is relevant
        const q = query(productsCollectionRef, where("category", "in", ["OTT Accounts", "Streaming", "Music", "Sports"]));
        
        const data = await getDocs(q);
        const fetchedProducts = data.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Product[];
        
        setProducts(fetchedProducts);
      } catch (error) {
        toast.error("Failed to fetch products.");
        console.error("Error fetching products: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
      <ProductPageLayout 
      category="OTT Accounts" // This should match the category string in Firestore
      subCategories={['All', 'Streaming', 'Music', 'Sports']}
    />
  );
};

export default OTTAccounts;