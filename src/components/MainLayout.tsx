"use client";

import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Download, X, Sparkles } from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  useEffect(() => {
    // Listen for the PWA install prompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Only show banner if app is not already launched in standalone mode
      if (!window.matchMedia("(display-mode: standalone)").matches) {
        setShowInstallBanner(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);
    setDeferredPrompt(null);
    setShowInstallBanner(false);
  };

  return (
    <div className="min-h-screen bg-dark flex flex-col relative text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow pt-24 pb-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto w-full animate-in fade-in duration-500">
        {children}
      </main>

      {/* PWA Floating Install Prompt */}
      {showInstallBanner && (
        <div className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-50 bg-surface/90 backdrop-blur-md border border-primary/20 p-4 rounded-2xl shadow-2xl flex items-center justify-between gap-4 animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex gap-3 items-start">
            <div className="bg-primary/20 text-primary p-2.5 rounded-xl border border-primary/20 flex-shrink-0">
              <Download size={18} />
            </div>
            <div>
              <h5 className="font-bold text-xs text-white flex items-center gap-1">
                Install VOTMASS TV <Sparkles size={10} className="text-primary fill-primary animate-pulse" />
              </h5>
              <p className="text-[10px] text-text-secondary mt-0.5 leading-relaxed">
                Add to your home screen for quick offline access, push alerts, and direct streaming capabilities.
              </p>
            </div>
          </div>
          <div className="flex gap-2 items-center flex-shrink-0">
            <button
              onClick={handleInstallClick}
              className="bg-gradient-primary hover:opacity-95 text-white text-[10px] font-bold px-3 py-2 rounded-xl transition-all border border-primary/20 shadow-md shadow-primary/10"
            >
              Install
            </button>
            <button
              onClick={() => setShowInstallBanner(false)}
              className="text-text-secondary hover:text-white p-1 hover:bg-white/5 rounded-lg transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
