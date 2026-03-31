"use client";

import React, { useEffect, useState } from "react";
import { authService } from "@/service/authService";
import { useRouter, usePathname } from "next/navigation";
import { Home, Package, ShoppingCart, Wallet, FileText, LogOut, LucideIcon } from "lucide-react";

export default function Sidebar() {
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();

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
            console.error("Failed to auto-fetch profile in Sidebar:", err);
          }
        }
      }
    };

    fetchUser();
  }, []);
  const router = useRouter();

  const menuItems: { name: string; icon: LucideIcon; path: string }[] = [
    { name: "Home", icon: Home, path: "/page/dashboard" },
    { name: "Barang", icon: Package, path: "/page/product" },
    { name: "Pesanan", icon: ShoppingCart, path: "/page/orders" },
    { name: "Pengeluaran", icon: Wallet, path: "/page/expenditures" },
    { name: "Laporan", icon: FileText, path: "/page/report" },
  ];

  const handleLogout = async () => {
    await authService.logout();
    router.push("/page/login");
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-low z-40 p-6 flex flex-col justify-between hidden lg:flex">
      <div className="space-y-8">
        <div className="mb-6 px-2">
          <h1 className="text-xl font-bold tracking-tight text-primary">Kasir UMKM</h1>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Premium POS</p>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <button
                key={item.name}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 active:scale-95 ${isActive ? "bg-white/50 text-primary font-bold border-l-4 border-primary shadow-sm" : "text-slate-500 hover:text-primary hover:bg-white/80 cursor-pointer"}`}
                onClick={() => router.push(item.path)}
              >
                <item.icon className={`w-5 h-5 transition-colors ${isActive ? "text-primary" : "text-slate-400 group-hover:text-primary"}`} />
                <span className="text-sm font-bold uppercase tracking-wide">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>


      <div className="pt-6 border-t border-slate-200">
        <div className="flex items-center gap-3 px-2 mb-6">
          <div className="w-10 h-10 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-primary font-bold">
            {user?.image ? (
              <img src={user.image} alt="Profile" className="w-full h-full rounded-full" />
            ) : (
              user?.userName?.charAt(0).toUpperCase() || "U"
            )}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-on-surface truncate">{user?.userName}</p>
            <p className="text-xs text-slate-400 capitalize">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full text-error hover:bg-error/10 py-3 rounded-xl text-sm font-bold uppercase tracking-wide transition-colors flex items-center justify-center gap-3 active:scale-95 cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
