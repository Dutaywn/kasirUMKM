"use client";

import { useState, useEffect } from "react";
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
  User,
  Settings,
  X,
  CheckCircle2,
  AlertCircle,
  Camera,
  LayoutGrid,
  ChevronRight
} from "lucide-react";
import ModalConfirm from "@/app/components/modalConfirm";
import ModalAlert from "@/app/components/modalAlert";
import { authService } from "@/service/authService";

export default function SettingPage() {
  const { data: categories, isLoading, isError } = useGetCategory();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const [user, setUser] = useState<any>(null);
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

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = authService.getUser();
      if (storedUser) {
        setUser(storedUser);
      } else {
        const token = authService.getToken();
        if (token) {
          try {
            const profile = await authService.getProfile(token);
            authService.setUser(profile);
            setUser(profile);
          } catch (err) {
            console.error("Failed to fetch profile in SettingPage:", err);
          }
        }
      }
    };
    fetchUser();
  }, []);

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
      title="KONFIGURASI AKUN"
      subtitle="Kelola profil pribadi dan pengaturan operasional toko Anda."
    >
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="flex justify-between items-end mb-4">
          <div className="space-y-1">
            <h3 className="text-2xl font-black tracking-tight text-on-surface uppercase italic">Account Details</h3>
            <p className="text-on-surface-variant text-sm font-medium">Informasi identitas dan konfigurasi sistem aplikasi.</p>
          </div>
          <button 
             onClick={() => window.location.reload()}
             className="px-8 py-3 rounded-full cta-gradient text-white font-black text-sm shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest"
          >
            Refresh Page
          </button>
        </div>

        {/* Bento Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Profile Section */}
          <section className="md:col-span-5 bg-surface-container-lowest rounded-[2.5rem] p-10 shadow-sm transition-all hover:shadow-xl border-l-[6px] border-primary flex flex-col items-center">
            <div className="w-full flex items-center gap-4 mb-10 self-start">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                <User size={24} strokeWidth={2.5} />
              </div>
              <h4 className="text-xl font-black italic uppercase tracking-tight">Detail Profil</h4>
            </div>

            <div className="relative group mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface-container-low ring-2 ring-primary/20 shadow-inner flex items-center justify-center bg-slate-100">
                {user?.image ? (
                  <img src={user.image} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                   <span className="text-4xl font-black text-primary opacity-50">
                    {user?.userName?.charAt(0).toUpperCase() || "?"}
                   </span>
                )}
              </div>
              <button className="absolute bottom-1 right-1 p-2.5 bg-white rounded-full shadow-lg text-primary hover:bg-primary hover:text-white transition-all ring-2 ring-white border border-slate-100 cursor-pointer active:scale-90">
                <Camera size={18} strokeWidth={2.5} />
              </button>
            </div>

            <div className="flex flex-col items-center gap-1 mb-10">
              <span className="px-5 py-1.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] border border-slate-200">
                {user?.role || "USER"}
              </span>
              <p className="text-xl font-black text-on-surface uppercase italic mt-2">{user?.userName}</p>
            </div>

            <div className="w-full space-y-5">
              <div className="relative bg-surface-container-highest/30 rounded-2xl p-4 group focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/10 transition-all border border-transparent focus-within:border-primary/20">
                <span className="text-[10px] text-slate-400 block mb-1 uppercase font-black tracking-widest ml-1">Username</span>
                <p className="w-full bg-transparent border-none p-0 text-sm font-bold text-on-surface uppercase tracking-tight">
                  {user?.userName}
                </p>
              </div>
              <div className="relative bg-surface-container-highest/30 rounded-2xl p-4 group focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/10 transition-all border border-transparent focus-within:border-primary/20">
                <span className="text-[10px] text-slate-400 block mb-1 uppercase font-black tracking-widest ml-1">Role Akun</span>
                <p className="w-full bg-transparent border-none p-0 text-sm font-bold text-on-surface uppercase tracking-tight capitalize">
                  {user?.role}
                </p>
              </div>
            </div>

            <div className="mt-auto w-full pt-10">
               <button className="w-full py-4 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-2xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 border border-slate-200 flex items-center justify-center gap-2 cursor-pointer">
                 <Settings size={14} strokeWidth={3} />
                 Edit Info Profil
               </button>
            </div>
          </section>

          {/* Category Management Section */}
          <section className="md:col-span-7 bg-surface-container-lowest rounded-[2.5rem] p-10 shadow-sm transition-all hover:shadow-xl flex flex-col">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-secondary/10 text-secondary">
                  <LayoutGrid size={24} strokeWidth={2.5} />
                </div>
                <h4 className="text-xl font-black italic uppercase tracking-tight">Kelola Kategori</h4>
              </div>
              <button 
                onClick={() => {
                  setCategoryName("");
                  setIsModalAddOpen(true);
                }}
                className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-110 active:scale-90 transition-all cursor-pointer"
              >
                <Plus size={24} strokeWidth={3} />
              </button>
            </div>

            <div className="relative mb-8 group">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                <Search size={18} strokeWidth={2.5} />
              </div>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari kategori produk..."
                className="w-full bg-white border border-outline-variant/50 rounded-2xl px-12 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-bold shadow-sm transition-all italic tracking-tight"
              />
            </div>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-16 bg-slate-50 rounded-2xl animate-pulse" />
                ))
              ) : filteredCategories.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
                  <AlertCircle className="mx-auto text-slate-300 mb-4" size={40} />
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-sm italic">Kategori Kosong</p>
                </div>
              ) : (
                filteredCategories.map((cat: Category) => (
                  <div 
                    key={cat.id}
                    className="flex items-center justify-between p-5 bg-white rounded-2xl border border-outline-variant/30 hover:border-primary/50 transition-all hover:bg-primary/[0.02] group"
                  >
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-primary font-black text-sm group-hover:bg-primary group-hover:text-white transition-colors">
                          {cat.name.charAt(0).toUpperCase()}
                       </div>
                       <div>
                          <p className="font-black text-on-surface uppercase italic tracking-tight">{cat.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID: {cat.id}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                       <button 
                        onClick={() => openEdit(cat)}
                        className="p-2.5 rounded-xl hover:bg-blue-50 text-blue-600 transition-all cursor-pointer border border-transparent hover:border-blue-100"
                       >
                          <Edit2 size={16} strokeWidth={2.5} />
                       </button>
                       <button 
                        onClick={() => openDelete(cat)}
                        className="p-2.5 rounded-xl hover:bg-error/5 text-error transition-all cursor-pointer border border-transparent hover:border-error/10"
                       >
                          <Trash2 size={16} strokeWidth={2.5} />
                       </button>
                       <div className="ml-2 pl-2 border-l border-slate-100">
                          <ChevronRight size={18} className="text-slate-200" />
                       </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

        </div>
      </div>

      {/* Modals integrated from previous version */}
      {(isModalAddOpen || isModalEditOpen) && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/40 backdrop-blur-md animate-in fade-in duration-300" onClick={() => { setIsModalAddOpen(false); setIsModalEditOpen(false); }} />
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
                       </div>
                    </div>
                    <button onClick={() => { setIsModalAddOpen(false); setIsModalEditOpen(false); }} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-error hover:bg-error/10 transition-all cursor-pointer">
                       <X size={20} />
                    </button>
                 </div>
                 <form onSubmit={isModalAddOpen ? handleCreate : handleUpdate} className="space-y-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Nama Kategori</label>
                       <input 
                         type="text" autoFocus required value={categoryName} onChange={(e) => setCategoryName(e.target.value)}
                         placeholder="Contoh: Makanan Berat..."
                         className="w-full bg-white border border-outline-variant/50 rounded-2xl px-6 py-5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-xl font-black italic tracking-tight shadow-sm placeholder:text-slate-300"
                       />
                    </div>
                    <div className="flex flex-col gap-4 pt-4">
                       <button type="submit" disabled={createCategory.isPending || updateCategory.isPending} className="w-full py-5 cta-gradient text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-[0_10px_20px_rgba(79,70,229,0.3)] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 uppercase italic tracking-widest">
                          Simpan Perubahan
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
        message="Hapus kategori ini secara permanen?"
        confirmText="Hapus"
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