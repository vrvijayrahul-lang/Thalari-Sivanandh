"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("admin_token", data.token);
        router.push("/admin/dashboard");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch {
      setError("Connection failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-emerald-500 mx-auto mb-4 flex items-center justify-center">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-medium tracking-tight text-white/90">
            Admin Panel
          </h1>
          <p className="text-sm text-white/40 mt-1">Sign in to manage your portfolio</p>
        </div>

        {/* Login form */}
        <div className="relative p-[1px] rounded-2xl">
          <div className="rounded-2xl bg-white/[0.02] p-[1px]">
            <div className="rounded-[calc(1rem-1px)] bg-[#050505] p-8 border border-white/[0.04]">
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label htmlFor="password" className="block text-sm text-white/50 mb-2 tracking-wide">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-white/80 placeholder:text-white/20 outline-none focus:border-white/[0.12] focus:bg-white/[0.05] transition-all duration-500"
                    autoFocus
                  />
                </div>

                {error && (
                  <p className="text-red-400/80 text-sm">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-white text-[#050505] text-sm font-medium tracking-wide transition-all duration-500 hover:bg-white/90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>

              <p className="text-[11px] text-white/20 text-center mt-6 tracking-wide">
                Default password: <span className="text-white/40">admin123</span>
              </p>
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="text-center mt-8">
          <a href="/" className="text-sm text-white/30 hover:text-white/60 transition-colors">
            ← Back to portfolio
          </a>
        </div>
      </div>
    </div>
  );
}