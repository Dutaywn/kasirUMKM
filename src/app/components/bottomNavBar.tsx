"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNavBar() {
    const pathname = usePathname();
    const menuItems = [
        { name: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", path: "/page/dashboard" },
        { name: "Products", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", path: "/page/product" },
        { name: "Order", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", path: "/page/orders" },
    ];
    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 h-20 bg-surface/90 border-t border-outline-variant/30 px-2 sm:px-4 flex justify-around items-center z-50 backdrop-blur-xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-1">
            {menuItems.map((item, index) => {
                const isActive = pathname.startsWith(item.path);
                return (
                    <Link 
                        key={index} 
                        href={item.path} 
                        className={`flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all duration-300 ${
                            isActive 
                            ? "text-primary" 
                            : "text-slate-500 hover:text-slate-800 hover:bg-surface-container"
                        }`}
                    >
                        <div className={`flex items-center justify-center transition-all duration-300 ${
                            isActive ? "bg-primary/10 w-12 h-8 rounded-full mb-1" : "mb-1 w-12 h-8"
                        }`}>
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive ? 2.5 : 2} d={item.icon} />
                            </svg>
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