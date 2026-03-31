"use client";

import React, { useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import BottomNavBar from "@/app/components/bottomNavBar";
import { SidebarMobile } from "@/app/components/sidebarMobile";
import { Hamburger } from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  headerActions?: React.ReactNode;
}

export default function MainLayout({ 
  children, 
  title, 
  subtitle, 
  headerActions 
}: MainLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface text-on-surface flex overflow-x-hidden font-body">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 p-4 lg:p-8 space-y-8 pb-24 max-w-full overflow-x-hidden">
        
        {/* Universal Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="space-y-1">
              <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent italic uppercase">
                {title}
              </h1>
              {subtitle && (
                <p className="text-slate-500 text-sm font-medium">
                  {subtitle}
                </p>
              )}
            </div>
            
            {/* Mobile Sidebar Trigger (Hamburger) */}
            <button 
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-3 rounded-2xl bg-white border border-outline-variant/30 text-primary shadow-sm active:scale-95 transition-all"
            >
             <Hamburger className="w-6 h-6"/>
            </button>
          </div>

          {/* Optional Header Actions (Buttons, Filters, etc.) */}
          {headerActions && (
            <div className="flex items-center gap-4">
              {headerActions}
            </div>
          )}
        </header>

        {/* Page Body Content */}
        {children}
      </main>

      {/* Mobile-only Navigation Components */}
      <BottomNavBar />
      <SidebarMobile 
        isOpen={isMobileSidebarOpen} 
        onClose={() => setIsMobileSidebarOpen(false)} 
      />
    </div>
  );
}
