"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authService } from "@/service/authService";
import { Loader2 } from "lucide-react";

function AuthSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("Authenticating...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      handleAuth(token);
    } else {
      setError("No authentication token found.");
      setTimeout(() => router.push("/page/login"), 3000);
    }
  }, [searchParams, router]);

  const handleAuth = async (token: string) => {
    try {
      setStatus("Fetching user profile...");
      authService.setToken(token);
      
      const user = await authService.getProfile(token);
      authService.setUser(user);
      
      setStatus("Success! Redirecting...");
      router.push("/page/dashboard");
    } catch (err: any) {
      console.error("Auth error:", err);
      setError("Failed to complete authentication. Please try again.");
      setTimeout(() => router.push("/page/login"), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4 font-body">
      <div className="w-full max-w-md bg-white border border-outline-variant/30 rounded-3xl shadow-xl p-10 text-center space-y-6">
        {!error ? (
          <>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-primary animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-black text-on-surface">Almost There</h1>
              <p className="text-slate-500 font-medium">{status}</p>
            </div>
          </>
        ) : (
          <>
            <div className="w-20 h-20 bg-error/10 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-10 h-10 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-black text-error">Authentication Failed</h1>
              <p className="text-slate-500 font-medium">{error}</p>
              <p className="text-xs text-slate-400 pt-4">Redirecting you to login page...</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function AuthSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    }>
      <AuthSuccessContent />
    </Suspense>
  );
}
