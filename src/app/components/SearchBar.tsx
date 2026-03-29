"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  resultCount?: number;
  className?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Cari...",
  resultCount,
  className = "",
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: Ctrl+K or Cmd+K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape" && isFocused) {
        inputRef.current?.blur();
        if (value) onChange("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFocused, value, onChange]);

  return (
    <div className={`relative group ${className}`}>
      <div
        className={`relative flex items-center bg-white border rounded-2xl transition-all duration-300 shadow-sm overflow-hidden ${
          isFocused
            ? "border-primary ring-2 ring-primary/15 shadow-md"
            : "border-outline-variant/40 hover:border-outline-variant/70 hover:shadow-md"
        }`}
      >
        {/* Search Icon */}
        <div
          className={`flex items-center justify-center pl-4 transition-colors duration-300 ${
            isFocused ? "text-primary" : "text-slate-400"
          }`}
        >
          <Search className="w-[18px] h-[18px]" strokeWidth={2.5} />
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          id="search-bar"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 bg-transparent py-3 px-3 text-sm font-medium text-on-surface placeholder:text-slate-400 focus:outline-none"
          autoComplete="off"
        />

        {/* Result count badge */}
        {value && resultCount !== undefined && (
          <span className="text-[10px] font-bold text-slate-500 bg-surface-container-high px-2.5 py-1 rounded-full mr-1 tabular-nums whitespace-nowrap animate-in fade-in">
            {resultCount} hasil
          </span>
        )}

        {/* Clear button */}
        {value && (
          <button
            onClick={() => {
              onChange("");
              inputRef.current?.focus();
            }}
            className="flex items-center justify-center w-8 h-8 mr-1.5 rounded-xl text-slate-400 hover:text-error hover:bg-error/10 transition-all duration-200 active:scale-90 cursor-pointer"
            aria-label="Hapus pencarian"
          >
            <X className="w-4 h-4" strokeWidth={2.5} />
          </button>
        )}

        {/* Keyboard shortcut hint */}
        {!value && !isFocused && (
          <div className="hidden sm:flex items-center gap-1 mr-3">
            <kbd className="px-1.5 py-0.5 text-[10px] font-bold text-slate-400 bg-surface-container-high border border-outline-variant/30 rounded-md">
              Ctrl
            </kbd>
            <kbd className="px-1.5 py-0.5 text-[10px] font-bold text-slate-400 bg-surface-container-high border border-outline-variant/30 rounded-md">
              K
            </kbd>
          </div>
        )}
      </div>
    </div>
  );
}
