// src/components/admin/Modal.tsx

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: -30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: -30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-gradient-to-br from-[#1e1c47] to-[#120f2f] rounded-xl shadow-2xl border border-purple-500/30 w-full max-w-md"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <div className="flex justify-between items-center p-4 border-b border-purple-500/20">
              <h3 className="text-lg font-bold text-cyan-300">{title}</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;