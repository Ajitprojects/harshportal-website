import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';

// --- TYPE DEFINITIONS ---

export type Column<T> = {
  key: Extract<keyof T, string> | 'actions';
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
};

interface AdminTableProps<T> {
  data: T[];
  columns: Column<T>[];
  title?: string;
  isLoading?: boolean;
  itemsPerPage?: number;
}

// --- COMPONENT DEFINITION ---

const AdminTable = <T extends { id: number | string }>({
  data,
  columns,
  title,
  isLoading = false,
  itemsPerPage = 5,
}: AdminTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: 'ascending' | 'descending';
  } | null>(null);

  // --- SORTED DATA ---
  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  // --- PAGINATED DATA ---
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleSort = (key: keyof T) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="rounded-xl bg-black/20 backdrop-blur border border-purple-500/30 shadow-lg overflow-hidden">
      {title && (
        <div className="p-4 text-xl font-bold border-b border-purple-500/20 text-cyan-300">
          {title}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-purple-700 text-white">
          <thead className="bg-purple-800/40 text-left">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className="px-6 py-3 text-sm font-semibold tracking-wider uppercase"
                >
                  {col.sortable ? (
                    <button
                      onClick={() => handleSort(col.key as keyof T)}
                      className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
                    >
                      {col.label}
                      <ArrowUpDown size={14} />
                    </button>
                  ) : (
                    col.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-700/50">
            {isLoading ? (
              Array.from({ length: itemsPerPage }).map((_, i) => (
                <tr key={i}>
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-6 py-4">
                      <div className="h-4 bg-purple-900/50 rounded animate-pulse"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : paginatedData.length > 0 ? (
              <AnimatePresence>
                {paginatedData.map((row) => (
                  <motion.tr
                    key={row.id}
                    className="hover:bg-purple-800/20 transition-colors"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {columns.map((col) => (
                      <td
                        key={String(col.key)}
                        className="px-6 py-4 text-sm whitespace-nowrap"
                      >
                        {col.render
                          ? col.render(row[col.key as keyof T], row)
                          : String(row[col.key as keyof T] ?? '')}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </AnimatePresence>
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-8 text-gray-400"
                >
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="p-4 flex justify-between items-center border-t border-purple-500/20">
          <span className="text-sm text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex gap-2">
            <Button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="p-2 disabled:opacity-50"
            >
              <ChevronLeft size={20} />
            </Button>
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="p-2 disabled:opacity-50"
            >
              <ChevronRight size={20} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTable;
