"use client";

import React, { useEffect, useState } from "react";
import { authService } from "@/service/authService";
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar() {
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    setUser(authService.getUser());
  }, []);
  const router = useRouter();

  const menuItems = [
    { name: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", path: "/page/dashboard" },
    { name: "Products", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", path: "/page/product" },
    { name: "Order", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", path: "/page/orders" },
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
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 active:scale-95 ${isActive ? "bg-white/50 text-primary font-bold border-l-4 border-primary shadow-sm" : "text-slate-500 hover:text-primary hover:bg-white/80"}`}
                onClick={() => router.push(item.path)}
              >
                <svg className={`w-5 h-5 transition-colors ${isActive ? "text-primary" : "text-slate-400 group-hover:text-primary"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                <span className="text-sm font-bold uppercase tracking-wide">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>


      <div className="pt-6 border-t border-slate-200">
        <div className="flex items-center gap-3 px-2 mb-6">
          <div className="w-10 h-10 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-primary font-bold">
            {user?.userName?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-on-surface truncate">{user?.userName}</p>
            <p className="text-xs text-slate-400 capitalize">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full text-error hover:bg-error/10 py-3 rounded-xl text-sm font-bold uppercase tracking-wide transition-colors flex items-center justify-center gap-3 active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );
}
