"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { Mail, Lock, User, ShieldCheck, Sparkles, ChevronLeft } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const { login } = useAppStore();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all standard fields.");
      return;
    }
    setError("");
    login(email, role);
    router.push(role === "admin" ? "/admin" : "/");
  };

  const handleQuickLogin = (selectedRole: "user" | "admin") => {
    const mockEmail = selectedRole === "admin" ? "admin@votmasstv.com" : "viewer@votmasstv.com";
    login(mockEmail, selectedRole);
    router.push(selectedRole === "admin" ? "/admin" : "/");
  };

  return (
    <div className="min-h-screen bg-dark flex flex-col relative overflow-hidden">
      {/* Background glowing gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-secondary/15 blur-[120px] pointer-events-none" />

      {/* Back button */}
      <div className="absolute top-6 left-6 z-10">
        <Link 
          href="/" 
          className="flex items-center gap-1 text-xs text-text-secondary hover:text-white transition-colors py-2 px-4 rounded-full bg-white/5 border border-white/5"
        >
          <ChevronLeft size={14} /> Back to Hub
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-surface border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10">
          
          {/* Logo brand */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-gradient-primary p-[3px] shadow-lg shadow-primary/25 mb-4 animate-bounce">
              <div className="w-full h-full rounded-[13px] bg-surface relative flex items-center justify-center">
                <Image 
                  src="/logo.png" 
                  alt="Votmass Logo" 
                  width={52} 
                  height={52} 
                  className="object-cover"
                />
              </div>
            </div>
            <h1 className="font-extrabold text-2xl tracking-wider text-white">
              VOTMASS <span className="text-gradient">TV</span>
            </h1>
            <p className="text-xs text-text-secondary mt-1.5">
              {isLogin ? "Sign in to manage playlists & unlock premium files" : "Register a brand new viewer account"}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs text-center font-medium">
              {error}
            </div>
          )}

          {/* Login/Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary">Full Name</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary"><User size={16} /></span>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-card border border-white/5 rounded-2xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-primary/50 text-white focus:bg-surface transition-all"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary">Email Address</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary"><Mail size={16} /></span>
                <input
                  type="email"
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-card border border-white/5 rounded-2xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-primary/50 text-white focus:bg-surface transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary">Password</label>
                {isLogin && (
                  <a href="#" className="text-[10px] text-primary hover:underline font-semibold">Forgot Password?</a>
                )}
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary"><Lock size={16} /></span>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-card border border-white/5 rounded-2xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-primary/50 text-white focus:bg-surface transition-all"
                />
              </div>
            </div>

            {/* Role switch selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary">Request Role Access</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("user")}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                    role === "user" 
                      ? "bg-primary/10 border-primary text-primary" 
                      : "bg-card border-white/5 text-text-secondary hover:text-white"
                  }`}
                >
                  <User size={14} />
                  <span>Standard User</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole("admin")}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                    role === "admin" 
                      ? "bg-red-500/10 border-red-500/30 text-red-400" 
                      : "bg-card border-white/5 text-text-secondary hover:text-white"
                  }`}
                >
                  <ShieldCheck size={14} />
                  <span>Administrator</span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-primary hover:shadow-lg hover:shadow-primary/20 text-white font-bold py-3.5 rounded-2xl transition-all mt-4 border border-primary/20"
            >
              {isLogin ? "Sign In" : "Register Account"}
            </button>
          </form>

          {/* Quick Mock Login panel for testing roles */}
          <div className="mt-8 pt-6 border-t border-white/5 space-y-3">
            <p className="text-[10px] uppercase tracking-wider text-text-secondary font-bold text-center">
              Quick Test Accounts (Bypass credentials)
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleQuickLogin("user")}
                className="py-2.5 px-3 bg-surface hover:bg-card border border-white/10 hover:border-primary/30 rounded-xl text-xs text-white transition-all flex items-center justify-center gap-1 font-medium group"
              >
                <Sparkles size={12} className="text-primary group-hover:animate-spin" />
                <span>Test User</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin("admin")}
                className="py-2.5 px-3 bg-surface hover:bg-card border border-white/10 hover:border-red-500/30 rounded-xl text-xs text-white transition-all flex items-center justify-center gap-1 font-medium group"
              >
                <ShieldCheck size={12} className="text-red-400 group-hover:animate-bounce" />
                <span>Test Admin</span>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-xs text-text-secondary hover:text-white transition-colors"
            >
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span className="text-primary font-bold hover:underline">
                {isLogin ? "Create one" : "Sign in"}
              </span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
