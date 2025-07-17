// src/components/admin/PageHeader.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  buttonText: string;
  searchPlaceholder: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onButtonClick: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  buttonText,
  searchPlaceholder,
  searchQuery,
  onSearchChange,
  onButtonClick,
}) => {
  return (
    <>
      <CardTitle className="text-xl text-cyan-400 tracking-wide">{title}</CardTitle>
      <div className="flex flex-col md:flex-row justify-between items-center mt-4 mb-6 gap-4">
        <input
          className="px-4 py-2 w-full md:w-auto rounded-md border border-purple-400 bg-black/30 text-white placeholder:text-purple-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <motion.button
          onClick={onButtonClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="relative w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-bold bg-gradient-to-r from-purple-600 to-indigo-600 shadow-xl"
        >
          <Plus className="w-5 h-5" />
          {buttonText}
        </motion.button>
      </div>
    </>
  );
};

// You need to import CardTitle from your UI library if it's not globally available
// For example:
import { CardTitle } from '@/components/ui/card';

export default PageHeader;