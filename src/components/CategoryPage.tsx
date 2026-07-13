"use client";

import React, { useState } from "react";
import { Sparkles, ArrowUpDown, ShieldAlert, Award } from "lucide-react";
import MainLayout from "./MainLayout";
import VideoCard from "./VideoCard";
import VideoDetailsModal from "./VideoDetailsModal";
import { useAppStore } from "@/lib/store";
import { Video } from "@/lib/mockData";

interface CategoryPageProps {
  title: string;
  description: string;
  type: "movie" | "documentary" | "podcast" | "news" | "trending";
  icon: React.ComponentType<any>;
}

export default function CategoryPage({ title, description, type, icon: Icon }: CategoryPageProps) {
  const { videos } = useAppStore();
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [sortBy, setSortBy] = useState<"latest" | "popular">("latest");

  // Get matching videos
  let matchingVideos = videos.filter((v) => v.type !== "short");
  if (type === "trending") {
    matchingVideos = matchingVideos.filter((v) => v.trending);
  } else {
    matchingVideos = matchingVideos.filter((v) => v.type === type);
  }

  // Handle Sort
  const sortedVideos = [...matchingVideos].sort((a, b) => {
    if (sortBy === "popular") {
      return b.views - a.views;
    }
    // Sort by Date (latest)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <MainLayout>
      {/* 1. CHANNEL HEADER HERO */}
      <div className="relative p-8 md:p-12 bg-gradient-to-r from-surface to-dark rounded-3xl border border-white/5 shadow-2xl mb-10 overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2 relative z-10 max-w-xl">
          <div className="flex items-center gap-2">
            <div className="p-2.5 bg-primary/20 text-primary rounded-xl border border-primary/20">
              <Icon size={18} />
            </div>
            <span className="text-[10px] text-primary uppercase font-bold tracking-widest flex items-center gap-1">
              <Sparkles size={10} fill="currentColor" /> OFFICIAL VOTMASS CHANNEL
            </span>
          </div>
          <h1 className="font-extrabold text-2xl md:text-3xl text-white tracking-tight uppercase">
            {title}
          </h1>
          <p className="text-xs text-text-secondary leading-relaxed font-light">
            {description}
          </p>
        </div>

        {/* Sort triggers */}
        <div className="flex items-center gap-2 bg-card border border-white/5 p-1.5 rounded-xl shrink-0">
          <button
            onClick={() => setSortBy("latest")}
            className={`py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
              sortBy === "latest" ? "bg-primary text-white" : "text-text-secondary hover:text-white"
            }`}
          >
            Latest Releases
          </button>
          <button
            onClick={() => setSortBy("popular")}
            className={`py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
              sortBy === "popular" ? "bg-primary text-white" : "text-text-secondary hover:text-white"
            }`}
          >
            Popular Views
          </button>
        </div>
      </div>

      {/* 2. VIDEOS GRID */}
      {sortedVideos.length === 0 ? (
        <div className="text-center py-20 bg-card rounded-3xl border border-white/5 p-8 text-text-secondary max-w-md mx-auto">
          <Award size={36} className="mx-auto mb-2 text-primary opacity-60 animate-bounce" />
          <h4 className="font-bold text-sm text-white">Broadcast Desk Muted</h4>
          <p className="text-xs text-text-secondary mt-1">No uploads currently published to this TV guide.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedVideos.map((video) => (
            <VideoCard key={video.id} video={video} onSelect={setSelectedVideo} />
          ))}
        </div>
      )}

      {/* Centralized play details overlay */}
      <VideoDetailsModal 
        video={selectedVideo} 
        onClose={() => setSelectedVideo(null)} 
      />
    </MainLayout>
  );
}
