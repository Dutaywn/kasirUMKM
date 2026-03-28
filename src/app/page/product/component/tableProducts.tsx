import React, { useMemo, useState } from "react";

interface ProductTableProps {
  products: any[];
  onEdit: (product: any) => void;
  onDelete: (id: string) => void;
}

type SortField = "name" | "price" | "stocks" | null;
type SortOrder = "asc" | "desc";

export default function TableProducts({ products, onEdit, onDelete}: ProductTableProps) {
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedProducts = useMemo(() => {
    if (!sortField) return products;

    return [...products].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      // Handle strings (name) and numbers (price, stocks)
      if (typeof aVal === "string") {
        return sortOrder === "asc" 
          ? aVal.localeCompare(bVal) 
          : bVal.localeCompare(aVal);
      } else {
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      }
    });
  }, [products, sortField, sortOrder]);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <span className="ml-1 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">⇅</span>;
    return <span className="ml-1 text-primary">{sortOrder === "asc" ? "↑" : "↓"}</span>;
  };

  return (
    <div className="space-y-4">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto bg-white border border-outline-variant/30 rounded-2xl shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-outline-variant/20 bg-surface">
              <th 
                className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 cursor-pointer group"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center">
                  Product <SortIcon field="name" />
                </div>
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Category</th>
              <th 
                className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 cursor-pointer group"
                onClick={() => handleSort("price")}
              >
                <div className="flex items-center">
                  Price <SortIcon field="price" />
                </div>
              </th>
              <th 
                className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 cursor-pointer group"
                onClick={() => handleSort("stocks")}
              >
                <div className="flex items-center">
                  Stock <SortIcon field="stocks" />
                </div>
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {sortedProducts.map((product) => {
              const stockCount = product.stocks ?? 0;
              return (
                <tr key={product.id} className="hover:bg-surface-container-low transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-surface-container-highest border border-outline-variant/20 overflow-hidden flex-shrink-0">
                        {product.imgUrl && product.imgUrl !== "coba" ? (
                          <img src={product.imgUrl} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-on-surface group-hover:text-primary transition-colors">{product.name}</p>
                        <p className="text-xs text-slate-500">ID: #{product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                      {product.category?.name || "General"}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-on-surface">
                    Rp {product.price?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${stockCount <= 5 ? "bg-error animate-pulse" : "bg-emerald-500"}`}></div>
                      <span className={`text-sm font-bold ${stockCount <= 5 ? "text-error" : "text-emerald-600"}`}>
                        {stockCount}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onEdit(product)}
                        className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all border border-blue-200"
                        title="Edit Product"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => onDelete(product.id)}
                        className="p-2 rounded-lg bg-error/10 text-error hover:bg-error hover:text-white transition-all border border-error/20"
                        title="Delete Product"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {sortedProducts.map((product) => {
          const stockCount = product.stocks ?? 0;
          return (
            <div key={product.id} className="bg-white border border-outline-variant/30 rounded-2xl p-4 space-y-4 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-surface-container-high border border-outline-variant/30 overflow-hidden flex-shrink-0">
                  {product.imgUrl && product.imgUrl !== "coba" ? (
                    <img src={product.imgUrl} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-on-surface truncate">{product.name}</p>
                  <p className="text-xs text-slate-500">ID: #{product.id}</p>
                  <div className="mt-1">
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold border border-primary/20">
                      {product.category?.name || "General"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-3 border-t border-outline-variant/20">
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-500">Price</p>
                  <p className="text-sm font-bold text-on-surface letter-tight">Rp {product.price?.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-500">Stock</p>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${stockCount <= 5 ? "bg-error animate-pulse" : "bg-emerald-500"}`}></div>
                    <p className={`text-sm font-bold ${stockCount <= 5 ? "text-error" : "text-emerald-600"}`}>{stockCount} Units</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => onEdit(product)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-blue-50 text-blue-600 font-bold text-xs border border-blue-200 active:scale-95 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-error/10 text-error font-bold text-xs border border-error/20 active:scale-95 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {products.length === 0 && (
        <div className="py-20 text-center text-slate-500 bg-surface-container border border-outline-variant/30 rounded-2xl">
          No products found. Start by adding one!
        </div>
      )}
    </div>
  );
}
