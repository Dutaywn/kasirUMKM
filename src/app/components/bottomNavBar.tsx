"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, ShoppingCart, Wallet, FileText } from "lucide-react";

export default function BottomNavBar() {
    const pathname = usePathname();
    const menuItems = [
        { name: "Home", icon: Home, path: "/page/dashboard" },
        { name: "Barang", icon: Package, path: "/page/product" },
        { name: "Pesanan", icon: ShoppingCart, path: "/page/orders" },
        { name: "Pengeluaran", icon: Wallet, path: "/page/expenditures" },
        { name: "Laporan", icon: FileText, path: "/page/report" },
    ];
    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 h-20 bg-surface/90 border-t border-outline-variant/30 px-2 sm:px-4 flex justify-around items-center z-50 backdrop-blur-xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-1">
            {menuItems.map((item, index) => {
                const isActive = pathname.startsWith(item.path);
                return (
                    <Link
                        key={index}
                        href={item.path}
                        className={`flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all duration-300 ${isActive
                                ? "text-primary"
                                : "text-slate-500 hover:text-slate-800 hover:bg-surface-container"
                            }`}
                    >
                        <div className={`flex items-center justify-center transition-all duration-300 ${isActive ? "bg-primary/10 w-12 h-8 rounded-full mb-1" : "mb-1 w-12 h-8"
                            }`}>
                            <item.icon className="w-6 h-6" />
                        </div>
                        <span className={`text-[10px] font-bold tracking-wide transition-all ${isActive ? "opacity-100" : "opacity-80"}`}>
                            {item.name}
                        </span>
                    </Link>
                );
            })}
        </div>
    );
}