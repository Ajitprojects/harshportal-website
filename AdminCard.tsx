import React from "react";

type Column<T> = {
  key: keyof T;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
};

interface AdminTableProps<T> {
  data: T[];
  columns: Column<T>[];
  title?: string;
}

const AdminTable = <T extends { id: number | string }>({
  data,
  columns,
  title,
}: AdminTableProps<T>) => {
  return (
    <div className="rounded-xl bg-black/20 backdrop-blur border border-purple-500/30 shadow-lg overflow-x-auto">
      {title && (
        <div className="p-4 text-xl font-bold border-b border-purple-500/20 text-cyan-300">
          {title}
        </div>
      )}
      <table className="min-w-full divide-y divide-purple-700 text-white">
        <thead className="bg-purple-800/40 text-left">
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} className="px-6 py-3 text-sm font-semibold tracking-wider uppercase">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-purple-700/50">
          {data.map((row) => (
            <tr key={String(row.id)} className="hover:bg-purple-800/10 transition">
              {columns.map((col) => (
                <td key={String(col.key)} className="px-6 py-4 text-sm">
                  {col.render ? col.render(row[col.key], row) : String(row[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
