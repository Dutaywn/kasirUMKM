"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/service/authService";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await authService.login(formData);
      router.push("/"); // Redirect to dashboard or home
    } catch (err: any) {
      setError(err.message || "Invalid email or password.");
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
          <h1 className="text-4xl font-bold text-white tracking-tight">Welcome Back</h1>
          <p className="text-slate-400">Sign in to your account</p>
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/50 text-rose-500 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
            {loading ? "Signing In..." : "Log In"}
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-slate-400 text-sm">
            New to Kasir UMKM?{" "}
            <Link href="/page/register" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
