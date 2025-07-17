import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';
import ProductDetailModal from './ProductDetailModal';
import ProductCardSkeleton from './ProductCardSkeleton';
import toast from 'react-hot-toast';
import { db } from '../firebase';
import { collection, getDocs, query, where } from "firebase/firestore";
import { Product } from '../types'; // <-- IMPORT the master Product type

// The local Product interface has been REMOVED from this file.

interface ProductPageLayoutProps {
  category: string;
  subCategories: string[];
}

const PageTitle = ({ category }: { category: string }) => {
    // This component does not need changes
    const titles: { [key: string]: React.ReactNode } = {
        OTT: <><span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">PREMIUM</span> <span className="block text-white">OTT ACCOUNTS</span></>,
        IPTV: <><span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">PREMIUM</span> <span className="block text-white">IPTV SERVICES</span></>,
        Keys: <><span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">SOFTWARE</span><span className="block text-white">LICENSE KEYS</span></>,
        Downloads: <><span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">DOWNLOAD</span><span className="block text-white">CENTER</span></>
    };
    return (<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white mb-6 leading-tight">{titles[category] || 'Products'}</h1>);
};

const ProductPageLayout: React.FC<ProductPageLayoutProps> = ({ category, subCategories }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<string>('All');
  const [sortOption, setSortOption] = useState('default');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const productsCollectionRef = collection(db, "products");
        const q = query(productsCollectionRef, where("category", "==", category));
        
        const data = await getDocs(q);
        // Map the Firestore data to our new master Product type
        const fetchedProducts = data.docs.map(doc => ({
            ...(doc.data() as Omit<Product, 'docId'>),
            docId: doc.id
        }));
        setProducts(fetchedProducts);

      } catch (err: any) {
        setError(err.message || "Failed to load products.");
        toast.error("Failed to load products.");
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, [category]);

  const filteredProducts = activeSubCategory === 'All'
    ? products
    : products.filter((p) => p.tags && p.tags.includes(activeSubCategory));

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'priceLow') return a.price - b.price;
    if (sortOption === 'priceHigh') return b.price - a.price;
    if (sortOption === 'nameAZ') return a.name.localeCompare(b.name);
    if (sortOption === 'nameZA') return b.name.localeCompare(a.name);
    return 0;
  });

  const closeModal = () => setSelectedProduct(null);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="min-h-screen bg-gray-900 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <PageTitle category={category} />
        </motion.div>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-12">
          <div className="flex justify-center flex-wrap gap-3">
            {subCategories.map((c) => (
              <motion.button
                key={c}
                onClick={() => setActiveSubCategory(c)}
                className={`px-6 py-2 rounded-full text-lg font-semibold transition-colors cursor-hover-button ${activeSubCategory === c
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
              >
                {c}
              </motion.button>
            ))}
          </div>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="bg-gray-800 border border-gray-600 text-white text-sm rounded-md px-3 py-2 self-center lg:self-auto"
          >
            <option value="default">Sort By</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="nameAZ">Name: A-Z</option>
            <option value="nameZA">Name: Z-A</option>
          </select>
        </div>
        <hr className="my-12 border-gray-700" />

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)
          ) : error ? (
            <div className="col-span-3 text-center text-red-500 text-xl py-10 bg-red-500/10 rounded-lg border border-red-500/30">{error}</div>
          ) : (
            <AnimatePresence>
              {sortedProducts.map((p) => (
                <ProductCard key={p.id} product={p} onViewDetails={handleViewDetails} />
              ))}
            </AnimatePresence>
          )}
        </motion.div>
      </div>
      <ProductDetailModal product={selectedProduct} onClose={closeModal} />
    </div>
  );
};

export default ProductPageLayout;