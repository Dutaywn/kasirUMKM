"use client";

import { useState } from "react";
import MainLayout from "@/app/components/MainLayout";
import { 
  useGetCategory, 
  useCreateCategory, 
  useUpdateCategory, 
  useDeleteCategory,
  Category 
} from "@/app/hook/useCategory";
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Filter, 
  LayoutGrid, 
  MoreVertical,
  X,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import ModalConfirm from "@/app/components/modalConfirm";
import ModalAlert from "@/app/components/modalAlert";

export default function SettingPage() {
  const { data: categories, isLoading, isError } = useGetCategory();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const [searchQuery, setSearchQuery] = useState("");
  
  // Modals state
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [categoryName, setCategoryName] = useState("");

  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    type: "delete";
    id?: number;
  }>({ isOpen: false, type: "delete" });

  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    title: string;
    message: string;
  }>({ isOpen: false, type: "success", title: "", message: "" });

  // Filter categories based on search
  const filteredCategories = categories?.filter((cat: Category) => 
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCategory.mutateAsync({ name: categoryName });
      setIsModalAddOpen(false);
      setCategoryName("");
      setAlertModal({
        isOpen: true,
        type: "success",
        title: "Berhasil!",
        message: "Kategori baru telah ditambahkan."
      });
    } catch (err: any) {
      setAlertModal({
        isOpen: true,
        type: "error",
        title: "Gagal!",
        message: err.message || "Gagal menambahkan kategori."
      });
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) return;
    try {
      await updateCategory.mutateAsync({ id: selectedCategory.id, name: categoryName });
      setIsModalEditOpen(false);
      setSelectedCategory(null);
      setCategoryName("");
      setAlertModal({
        isOpen: true,
        type: "success",
        title: "Berhasil!",
        message: "Nama kategori telah diperbarui."
      });
    } catch (err: any) {
      setAlertModal({
        isOpen: true,
        type: "error",
        title: "Gagal!",
        message: err.message || "Gagal memperbarui kategori."
      });
    }
  };

  const handleDelete = async () => {
    if (!confirmModal.id) return;
    try {
      await deleteCategory.mutateAsync({ id: confirmModal.id });
      setConfirmModal({ isOpen: false, type: "delete" });
      setAlertModal({
        isOpen: true,
        type: "success",
        title: "Dihapus!",
        message: "Kategori telah dihapus dari sistem."
      });
    } catch (err: any) {
      setConfirmModal({ isOpen: false, type: "delete" });
      setAlertModal({
        isOpen: true,
        type: "error",
        title: "Gagal!",
        message: err.message || "Gagal menghapus kategori."
      });
    }
  };

  const openEdit = (cat: Category) => {
    setSelectedCategory(cat);
    setCategoryName(cat.name);
    setIsModalEditOpen(true);
  };

  const openDelete = (cat: Category) => {
    setConfirmModal({ isOpen: true, type: "delete", id: cat.id });
  };

  return (
    <MainLayout
      title="PENGATURAN KATEGORI"
      subtitle="Kelola kategori produk untuk pengorganisasian inventaris yang lebih baik."
      headerActions={
        <button
          onClick={() => {
            setCategoryName("");
            setIsModalAddOpen(true);
          }}
          className="group relative px-6 py-3 cta-gradient text-white rounded-2xl font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 overflow-hidden cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          <Plus size={20} strokeWidth={3} />
          Tambah Kategori
        </button>
      }
    >
      {/* Search Bar - Custom for Settings */}
      <div className="relative group max-w-2xl">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
          <Search size={20} strokeWidth={2.5} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari kategori berdasarkan nama..."
          className="w-full bg-white border border-outline-variant/50 text-on-surface px-14 py-4 rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm font-medium"
        />
        <div className="absolute inset-y-0 right-5 flex items-center text-slate-300">
           <Filter size={18} />
        </div>
      </div>

      {/* Category Card Grid */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center justify-between mb-4">
           <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary flex items-center gap-2">
            <LayoutGrid size={14} />
            Daftar Kategori
          </h3>
          <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
            {filteredCategories.length} TOTAL
          </span>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-outline-variant/30 h-32 animate-pulse" />
            ))}
          </div>
        ) : isError ? (
          <div className="bg-error/10 border border-error/20 p-10 rounded-[2rem] text-center max-w-lg mx-auto">
             <AlertCircle className="mx-auto text-error mb-4" size={48} />
             <h4 className="text-lg font-bold text-error">Gagal Memuat Kategori</h4>
             <p className="text-slate-500 text-sm mt-2">Terjadi kesalahan pada server saat mencoba mengambil data kategori.</p>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="border-2 border-dashed border-outline-variant/30 p-20 rounded-[3rem] text-center max-w-2xl mx-auto flex flex-col items-center gap-4">
             <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300">
                <Search size={32} />
             </div>
             <div>
                <p className="text-on-surface font-black text-xl italic uppercase">Kategori Tidak Ditemukan</p>
                <p className="text-slate-500 font-medium text-sm mt-1">Coba gunakan kata kunci pencarian yang berbeda.</p>
             </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredCategories.map((cat: Category) => (
              <div 
                key={cat.id}
                className="group bg-white p-6 rounded-[2rem] border border-outline-variant/30 hover:border-primary/50 transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Decoration */}
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
                
                <div className="flex items-start justify-between relative">
                  <div className="w-12 h-12 bg-surface-container-high rounded-2xl flex items-center justify-center text-primary font-bold text-xl shadow-sm border border-outline-variant/20">
                    {cat.name.charAt(0).toUpperCase()}
                  </div>
                  <button className="text-slate-300 hover:text-on-surface p-1 rounded-lg transition-colors">
                     <MoreVertical size={18} />
                  </button>
                </div>

                <div className="mt-6">
                  <h4 className="text-lg font-black text-on-surface tracking-tight truncate uppercase italic">
                    {cat.name}
                  </h4>
                  <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">
                    ID: #{cat.id}
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-8 pt-4 border-t border-outline-variant/20">
                  <button 
                    onClick={() => openEdit(cat)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary/5 hover:bg-primary/10 text-primary rounded-xl text-xs font-black uppercase tracking-wider transition-all active:scale-95 cursor-pointer"
                  >
                    <Edit2 size={14} strokeWidth={3} />
                    Edit
                  </button>
                  <button 
                    onClick={() => openDelete(cat)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-error/5 hover:bg-error/10 text-error rounded-xl text-xs font-black uppercase tracking-wider transition-all active:scale-95 cursor-pointer"
                  >
                    <Trash2 size={14} strokeWidth={3} />
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Add / Edit Modal */}
      {(isModalAddOpen || isModalEditOpen) && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
           {/* Backdrop */}
           <div 
             className="absolute inset-0 bg-black/40 backdrop-blur-md animate-in fade-in duration-300"
             onClick={() => {
               setIsModalAddOpen(false);
               setIsModalEditOpen(false);
             }}
           />
           
           {/* Modal Body */}
           <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="p-8">
                 <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                          {isModalAddOpen ? <Plus size={24} strokeWidth={3} /> : <Edit2 size={24} strokeWidth={3} />}
                       </div>
                       <div>
                          <h3 className="text-2xl font-black italic tracking-tight text-on-surface uppercase">
                             {isModalAddOpen ? "TAMBAH" : "EDIT"} KATEGORI
                          </h3>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">FORM DATA KATEGORI</p>
                       </div>
                    </div>
                    <button 
                      onClick={() => {
                        setIsModalAddOpen(false);
                        setIsModalEditOpen(false);
                      }}
                      className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-error hover:bg-error/10 transition-all cursor-pointer"
                    >
                       <X size={20} />
                    </button>
                 </div>

                 <form onSubmit={isModalAddOpen ? handleCreate : handleUpdate} className="space-y-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Nama Kategori</label>
                       <input 
                         type="text"
                         autoFocus
                         required
                         value={categoryName}
                         onChange={(e) => setCategoryName(e.target.value)}
                         placeholder="Contoh: Makanan Berat, Minuman..."
                         className="w-full bg-white border border-outline-variant/50 rounded-2xl px-6 py-5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-xl font-bold tracking-tight shadow-sm placeholder:text-slate-300"
                       />
                    </div>

                    <div className="flex flex-col gap-4 pt-4">
                       <button 
                         type="submit"
                         disabled={createCategory.isPending || updateCategory.isPending}
                         className="w-full py-5 cta-gradient text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-[0_10px_20px_rgba(79,70,229,0.3)] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                       >
                          {(createCategory.isPending || updateCategory.isPending) ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/20 border-t-white" />
                          ) : <CheckCircle2 size={18} strokeWidth={3} />}
                          Simpan Perubahan
                       </button>
                       <button 
                         type="button"
                         onClick={() => {
                           setIsModalAddOpen(false);
                           setIsModalEditOpen(false);
                         }}
                         className="w-full py-4 text-slate-500 font-bold text-xs uppercase tracking-widest hover:text-error transition-colors cursor-pointer"
                       >
                          Batalkan
                       </button>
                    </div>
                 </form>
              </div>
           </div>
        </div>
      )}

      {/* Confirmation & Alert Modals */}
      <ModalConfirm
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={handleDelete}
        isLoading={deleteCategory.isPending}
        title="Hapus Kategori?"
        message="Menghapus kategori ini tidak akan menghapus produk di dalamnya, tapi kategori produk tersebut akan menjadi tidak terdefinisi. Lanjutkan?"
        confirmText="Ya, Hapus"
      />

      <ModalAlert
        isOpen={alertModal.isOpen}
        onClose={() => setAlertModal({ ...alertModal, isOpen: false })}
        type={alertModal.type}
        title={alertModal.title}
        message={alertModal.message}
      />
    </MainLayout>
  );
}