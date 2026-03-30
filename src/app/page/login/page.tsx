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
    <div className="min-h-screen bg-surface flex items-center justify-center p-4 font-body">
      <div className="w-full max-w-md bg-white border border-outline-variant/30 rounded-3xl shadow-lg p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-on-surface tracking-tight">Welcome Back</h1>
          <p className="text-slate-500 font-medium">Sign in to your account</p>
        </div>

        {error && (
          <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-2xl text-sm font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
            <input
              name="email"
              type="email"
              required
              className="w-full bg-white border border-outline-variant/50 text-on-surface px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
              placeholder="email@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full bg-white border border-outline-variant/50 text-on-surface px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full cta-gradient text-white font-bold py-4 rounded-2xl shadow-md active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {loading ? "Signing In..." : "Log In"}
          </button>
        </form>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-outline-variant/30"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-slate-400 font-bold">Or continue with</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => authService.loginWithGoogle()}
          className="w-full bg-white border border-outline-variant/50 hover:bg-slate-50 text-on-surface font-bold py-4 rounded-2xl shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-3"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              fill="#EA4335"
            />
          </svg>
          Sign in with Google
        </button>

        <div className="text-center pt-2">
          <p className="text-slate-500 text-sm font-medium">
            New to Kasir UMKM?{" "}
            <Link href="/page/register" className="text-primary hover:text-primary/80 font-bold transition-colors">
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
