"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  User, Bookmark, Clock, Download, CreditCard, 
  Trash2, Play, Sparkles, ShieldCheck, Mail, ShieldAlert, Award
} from "lucide-react";
import MainLayout from "@/components/MainLayout";
import { useAppStore } from "@/lib/store";
import { Video } from "@/lib/mockData";
import VideoCard from "@/components/VideoCard";
import VideoDetailsModal from "@/components/VideoDetailsModal";

export default function DashboardPage() {
  const { 
    user, 
    videos, 
    watchHistory, 
    bookmarkedVideoIds, 
    downloadedVideoIds, 
    removeDownload, 
    upgradeSubscription 
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<"watchlist" | "history" | "downloads" | "subscription">("watchlist");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  
  // Checkout mock states
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  
  const [mounted, setMounted] = useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <MainLayout>
        <div className="text-center py-24 text-xs text-text-secondary animate-pulse">
          Initializing secure member portal...
        </div>
      </MainLayout>
    );
  }

  if (!user) {
    return (
      <MainLayout>
        <div className="text-center py-20 bg-card rounded-3xl border border-white/5 p-8 max-w-md mx-auto">
          <ShieldAlert size={48} className="mx-auto mb-2 text-red-500 animate-bounce" />
          <h4 className="font-bold text-base text-white">Authentication Required</h4>
          <p className="text-xs text-text-secondary mt-1">Please sign in to view your dashboard settings.</p>
        </div>
      </MainLayout>
    );
  }

  // Filter lists
  const watchlistVideos = videos.filter((v) => bookmarkedVideoIds.includes(v.id));
  const historyVideos = videos.filter((v) => watchHistory[v.id] !== undefined);
  const downloadedVideos = videos.filter((v) => downloadedVideoIds.includes(v.id));

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutLoading(true);
    // Simulate API delay
    setTimeout(() => {
      upgradeSubscription();
      setCheckoutLoading(false);
      setCardNumber("");
      setCardExpiry("");
      setCardCvc("");
    }, 2000);
  };

  return (
    <MainLayout>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* LEFT COLUMN: USER PANEL SUMMARY */}
        <div className="bg-card border border-white/5 rounded-3xl p-6 h-fit space-y-6 shadow-2xl relative overflow-hidden">
          {/* Accent border glow */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-primary" />
          
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-primary bg-gradient-primary shadow-lg">
              {user.avatarUrl ? (
                <Image src={user.avatarUrl} alt="Avatar" fill className="object-cover" />
              ) : (
                <User size={36} className="m-auto text-white" />
              )}
            </div>
            <div>
              <h3 className="font-black text-base text-white">{user.fullName}</h3>
              <p className="text-xs text-text-secondary mt-0.5">{user.email}</p>
            </div>
            
            <div className="flex items-center gap-1.5 pt-1">
              <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase border ${
                user.role === "admin" 
                  ? "bg-red-500/20 text-red-400 border-red-500/30" 
                  : "bg-primary/20 text-primary border-primary/30"
              }`}>
                {user.role} Member
              </span>
              {user.subscriptionActive && (
                <span className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase bg-green-500/20 text-green-400 border-green-500/30 flex items-center gap-0.5">
                  <Sparkles size={8} /> VIP
                </span>
              )}
            </div>
          </div>

          {/* TAB TRIGGERS */}
          <div className="flex flex-col gap-1 border-t border-white/5 pt-6">
            <button
              onClick={() => setActiveTab("watchlist")}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${
                activeTab === "watchlist" 
                  ? "bg-primary/10 text-primary border border-primary/20" 
                  : "text-text-secondary hover:text-white hover:bg-white/5"
              }`}
            >
              <Bookmark size={14} />
              <span>Watch Later ({watchlistVideos.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("history")}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${
                activeTab === "history" 
                  ? "bg-primary/10 text-primary border border-primary/20" 
                  : "text-text-secondary hover:text-white hover:bg-white/5"
              }`}
            >
              <Clock size={14} />
              <span>Watch History ({historyVideos.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("downloads")}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${
                activeTab === "downloads" 
                  ? "bg-primary/10 text-primary border border-primary/20" 
                  : "text-text-secondary hover:text-white hover:bg-white/5"
              }`}
            >
              <Download size={14} />
              <span>Offline Downloads ({downloadedVideos.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("subscription")}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${
                activeTab === "subscription" 
                  ? "bg-primary/10 text-primary border border-primary/20" 
                  : "text-text-secondary hover:text-white hover:bg-white/5"
              }`}
            >
              <CreditCard size={14} />
              <span>VIP Subscription</span>
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: CORE TAB SCREEN CONTENT */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* WATCH LIST TAB */}
          {activeTab === "watchlist" && (
            <div className="space-y-4">
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-white">Your Saved Watchlist</h3>
              {watchlistVideos.length === 0 ? (
                <div className="text-center py-20 bg-card rounded-3xl border border-white/5 p-8 text-text-secondary">
                  <Bookmark size={36} className="mx-auto mb-2 text-primary opacity-60" />
                  <p className="text-xs font-semibold">No saved broadcasts yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {watchlistVideos.map((video) => (
                    <VideoCard key={video.id} video={video} onSelect={setSelectedVideo} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* WATCH HISTORY TAB */}
          {activeTab === "history" && (
            <div className="space-y-4">
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-white">Your Watch History</h3>
              {historyVideos.length === 0 ? (
                <div className="text-center py-20 bg-card rounded-3xl border border-white/5 p-8 text-text-secondary">
                  <Clock size={36} className="mx-auto mb-2 text-primary opacity-60" />
                  <p className="text-xs font-semibold">No watch history logged yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {historyVideos.map((video) => (
                    <VideoCard key={video.id} video={video} onSelect={setSelectedVideo} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* OFFLINE DOWNLOADS TAB */}
          {activeTab === "downloads" && (
            <div className="space-y-4">
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-white">Simulated Offline Cache</h3>
              
              {downloadedVideos.length === 0 ? (
                <div className="text-center py-20 bg-card rounded-3xl border border-white/5 p-8 text-text-secondary">
                  <Download size={36} className="mx-auto mb-2 text-primary opacity-60" />
                  <p className="text-xs font-semibold">No offline downloads cached.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {downloadedVideos.map((video) => (
                    <div 
                      key={video.id}
                      className="p-4 bg-card border border-white/5 rounded-2xl flex items-center justify-between gap-4 hover:border-primary/20 transition-all"
                    >
                      <div className="flex gap-4 items-center">
                        <div 
                          onClick={() => setSelectedVideo(video)}
                          className="relative w-20 aspect-video rounded-lg overflow-hidden flex-shrink-0 bg-surface cursor-pointer group"
                        >
                          <Image src={video.thumbnailUrl} alt={video.title} fill className="object-cover" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play size={14} fill="white" className="text-white" />
                          </div>
                        </div>
                        <div>
                          <h4 
                            onClick={() => setSelectedVideo(video)}
                            className="font-bold text-xs md:text-sm text-white hover:text-primary transition-colors cursor-pointer"
                          >
                            {video.title}
                          </h4>
                          <span className="text-[9px] text-text-secondary uppercase font-semibold block mt-0.5">
                            SIZE: 120.4 MB | RESOLUTION: 1080p (MP4)
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => removeDownload(video.id)}
                        className="p-2 text-text-secondary hover:text-red-500 hover:bg-white/5 rounded-xl transition-colors"
                        title="Remove Download"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SUBSCRIPTION CHECKOUT PANEL TAB */}
          {activeTab === "subscription" && (
            <div className="space-y-6">
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-white">VIP Membership Plan</h3>
              
              {user.subscriptionActive ? (
                /* Active VIP Banner */
                <div className="p-8 bg-gradient-primary rounded-3xl border border-primary/20 text-center space-y-4 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl pointer-events-none" />
                  <Award size={48} className="mx-auto text-white animate-bounce" />
                  <div className="space-y-1">
                    <h4 className="font-black text-2xl text-white">YOU ARE A VIP MEMBER</h4>
                    <p className="text-xs text-white/80 leading-relaxed max-w-md mx-auto">
                      Thank you for supporting VOTMASS TV! You have active, unrestricted access to premium movies, early documentary releases, and live chat features.
                    </p>
                  </div>
                  <div className="inline-block bg-white/10 px-5 py-2 rounded-2xl text-xs font-bold text-white border border-white/10 shadow-lg">
                    Plan Status: ACTIVE (Infinite access)
                  </div>
                </div>
              ) : (
                /* Inactive Subscription - Render Card Checkout form */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Subscription card offer details */}
                  <div className="p-6 bg-card border border-white/5 rounded-3xl space-y-4 flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="text-[10px] text-primary uppercase font-bold tracking-widest flex items-center gap-1">
                        <Sparkles size={10} className="animate-spin" /> PRO PREMIUM MEMBERSHIP
                      </span>
                      <h4 className="font-extrabold text-lg text-white">VOTMASS Premium Access</h4>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        Unlocks restricted movies, early documentaries, full playback speed controls, infinite loop shorts, and direct streaming lines.
                      </p>
                      <ul className="text-xs text-text-secondary space-y-2 pt-2">
                        <li className="flex items-center gap-2">✓ No Advertisements</li>
                        <li className="flex items-center gap-2">✓ Early Access to Documentaries</li>
                        <li className="flex items-center gap-2">✓ 4K UHD Streams & Offline Files</li>
                      </ul>
                    </div>

                    <div className="space-y-1">
                      <span className="text-text-secondary text-[10px] uppercase font-bold block">Monthly Subscription</span>
                      <span className="text-2xl font-black text-white">$4.99 <span className="text-xs font-normal text-text-secondary">/ Month</span></span>
                    </div>
                  </div>

                  {/* Checkout inputs (simulation) */}
                  <div className="p-6 bg-card border border-white/5 rounded-3xl space-y-4">
                    <h5 className="font-bold text-xs uppercase text-white flex items-center gap-2 pb-2 border-b border-white/5">
                      <CreditCard size={14} className="text-primary" />
                      <span>Secure Payment Portal</span>
                    </h5>

                    <form onSubmit={handleCheckoutSubmit} className="space-y-3.5">
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-wider font-bold text-text-secondary">Card Number</label>
                        <input
                          type="text"
                          required
                          placeholder="4000 1234 5678 9010"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-surface border border-white/5 rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:border-primary/50 text-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase tracking-wider font-bold text-text-secondary">Expiry Date</label>
                          <input
                            type="text"
                            required
                            placeholder="MM / YY"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full bg-surface border border-white/5 rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:border-primary/50 text-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase tracking-wider font-bold text-text-secondary">CVC / CVV</label>
                          <input
                            type="password"
                            required
                            placeholder="•••"
                            maxLength={3}
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            className="w-full bg-surface border border-white/5 rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:border-primary/50 text-white"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={checkoutLoading}
                        className="w-full bg-gradient-primary hover:opacity-95 text-white font-bold py-3 rounded-xl text-xs transition-opacity mt-4 border border-primary/20 shadow-md shadow-primary/10 flex items-center justify-center gap-1.5"
                      >
                        {checkoutLoading ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Processing...</span>
                          </>
                        ) : (
                          <span>Pay $4.99 via Stripe/Paystack</span>
                        )}
                      </button>
                    </form>
                  </div>

                </div>
              )}
            </div>
          )}

        </div>

      </div>

      {/* Dynamic details dialog */}
      <VideoDetailsModal 
        video={selectedVideo} 
        onClose={() => setSelectedVideo(null)} 
      />
    </MainLayout>
  );
}
