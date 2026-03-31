"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Settings, X, User } from "lucide-react";
import { authService } from "@/service/authService";

interface SidebarMobileProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SidebarMobile = ({ isOpen, onClose }: SidebarMobileProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);

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
            console.error("Failed to auto-fetch profile in SidebarMobile:", err);
          }
        }
      }
    };

    if (isOpen) {
      fetchUser();
    }
  }, [isOpen]);

  const menuItems = [
    { name: "Setting", icon: Settings, path: "/page/setting" },
  ];

  const handleLogout = () => {
    authService.logout();
    onClose();
    router.push("/page/login");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar Content */}
      <aside
        className={`fixed left-0 top-0 h-full w-72 bg-surface-container-low z-[70] p-6 flex flex-col justify-between transition-transform duration-300 ease-out lg:hidden shadow-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-8">
          <div className="flex items-center justify-between px-2">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-primary">Kasir UMKM</h1>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Mobile Admin</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-200 text-slate-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <button
                  key={item.name}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 active:scale-95 ${
                    isActive
                      ? "bg-white/50 text-primary font-bold border-l-4 border-primary shadow-sm"
                      : "text-slate-500 hover:text-primary hover:bg-white/80"
                  }`}
                  onClick={() => {
                    router.push(item.path);
                    onClose();
                  }}
                >
                  <item.icon className={`w-5 h-5 transition-colors ${isActive ? "text-primary" : "text-slate-400"}`} />
                  <span className="text-sm font-bold uppercase tracking-wide">{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="space-y-6">
          <div className="pt-6 border-t border-slate-200">
            <div className="flex items-center gap-3 px-2 mb-6">
              <div className="w-12 h-12 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-primary font-bold">
                {user?.image ? (
                  <img src={user.image} alt="Profile" className="w-full h-full rounded-full" />
                ) : (
                  user?.userName?.charAt(0).toUpperCase() || "U"
                )}
              </div>
              <div className="overflow-hidden">
                <p className="text-md font-bold text-on-surface truncate">
                  {user?.userName || "Guest"}
                </p>
                <p className="text-xs text-slate-400 capitalize">{user?.role || "User"}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full text-error hover:bg-error/10 py-3 rounded-xl text-sm font-bold uppercase tracking-wide transition-colors flex items-center justify-center gap-3 active:scale-95 shadow-sm border border-error/5 bg-white/50"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};