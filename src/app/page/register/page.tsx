"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/service/authService";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userName: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await authService.register(formData);
      router.push("/page/login");
    } catch (err: any) {
      setError(err.message || "Something went wrong during registration.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-white tracking-tight">Create Account</h1>
          <p className="text-slate-400">Join Kasir UMKM to manage your business efficiently</p>
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/50 text-rose-500 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">Username</label>
            <input
              name="userName"
              type="text"
              required
              className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              placeholder="johndoe"
              value={formData.userName}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">Email Address</label>
            <input
              name="email"
              type="email"
              required
              className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              placeholder="email@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg shadow-blue-900/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-slate-400 text-sm">
            Already have an account?{" "}
            <Link href="/page/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
