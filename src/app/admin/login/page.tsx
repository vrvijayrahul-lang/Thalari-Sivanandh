"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Eye, EyeOff, UserPlus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const { user, login, register } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/admin/dashboard");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = showRegister
      ? await register(email, password)
      : await login(email, password);

    if (result.success) {
      if (showRegister) {
        setRegisterSuccess(true);
        setShowRegister(false);
        setError("");
      } else {
        router.push("/admin/dashboard");
      }
    } else {
      setError(result.error || "Authentication failed");
    }

    setLoading(false);
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
          <p className="text-sm text-white/40 mt-1">
            {showRegister
              ? "Create your admin account"
              : "Sign in to manage your portfolio"}
          </p>
        </div>

        {/* Login/Register form */}
        <div className="relative p-[1px] rounded-2xl">
          <div className="rounded-2xl bg-white/[0.02] p-[1px]">
            <div className="rounded-[calc(1rem-1px)] bg-[#050505] p-8 border border-white/[0.04]">
              {registerSuccess && (
                <div className="mb-6 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center">
                  <p className="text-emerald-400/90 text-sm font-medium">
                    Account created! Sign in below.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-white/50 mb-2 tracking-wide"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@example.com"
                      className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl pl-10 pr-4 py-3 text-sm text-white/80 placeholder:text-white/20 outline-none focus:border-white/[0.12] focus:bg-white/[0.05] transition-all duration-500"
                      required
                      autoFocus={!showRegister}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm text-white/50 mb-2 tracking-wide"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl pl-4 pr-10 py-3 text-sm text-white/80 placeholder:text-white/20 outline-none focus:border-white/[0.12] focus:bg-white/[0.05] transition-all duration-500"
                      required
                      autoFocus={showRegister}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/40 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="text-red-400/80 text-sm bg-red-500/5 rounded-lg px-3 py-2 border border-red-500/10">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-white text-[#050505] text-sm font-medium tracking-wide transition-all duration-500 hover:bg-white/90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading
                    ? "Processing..."
                    : showRegister
                    ? "Create Account"
                    : "Sign In"}
                </button>
              </form>

              {/* Toggle login/register */}
              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    setShowRegister(!showRegister);
                    setError("");
                  }}
                  className="inline-flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  {showRegister
                    ? "Already have an account? Sign in"
                    : "First time? Create an admin account"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="text-center mt-8">
          <a
            href="/"
            className="text-sm text-white/30 hover:text-white/60 transition-colors"
          >
            ← Back to portfolio
          </a>
        </div>
      </div>
    </div>
  );
}