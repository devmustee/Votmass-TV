"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Play, Info, Sparkles, Flame, Clock, Radio, 
  ChevronLeft, ChevronRight, Award, Plus, Check 
} from "lucide-react";
import MainLayout from "@/components/MainLayout";
import VideoCard from "@/components/VideoCard";
import VideoDetailsModal from "@/components/VideoDetailsModal";
import SkeletonCard from "@/components/SkeletonCard";
import { useAppStore } from "@/lib/store";
import { Video, CATEGORIES } from "@/lib/mockData";

export default function HomePage() {
  const { videos, watchHistory, bookmarkedVideoIds, bookmarkVideo } = useAppStore();
  
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [heroIndex, setHeroIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [mounted, setMounted] = useState(false);
  const [heroHovered, setHeroHovered] = useState(false);

  const featuredVideos = videos.filter(v => v.featured);
  const currentHero = featuredVideos[heroIndex] || featuredVideos[0];

  // Auto-rotate Hero Carousel every 8 seconds
  useEffect(() => {
    setMounted(true);
    if (featuredVideos.length <= 1) return;
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % featuredVideos.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [featuredVideos.length]);

  // Filtered uploads
  const filteredVideos = activeCategory === "all"
    ? videos.filter(v => v.type !== "short" && !v.featured)
    : videos.filter(v => v.type !== "short" && !v.featured && v.categoryId === activeCategory);

  // Continue Watching list
  const continueWatchingVideos = videos.filter(v => watchHistory[v.id] !== undefined);

  // Trending list
  const trendingVideos = videos.filter(v => v.trending && v.type !== "short");

  const isHeroBookmarked = currentHero ? bookmarkedVideoIds.includes(currentHero.id) : false;

  return (
    <MainLayout>
      {!mounted ? (
        <div className="space-y-10 animate-pulse">
          {/* Skeleton Hero Shimmer */}
          <div className="w-full h-[55vh] min-h-[460px] md:h-[65vh] md:min-h-[500px] rounded-3xl bg-card border border-white/5" />
          
          {/* Skeletons row */}
          <div className="space-y-4 pt-4">
            <div className="h-4 bg-card rounded-lg w-48" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* 1. CINEMATIC HERO SPOTLIGHT */}
          {currentHero && (
        <section 
          onMouseEnter={() => setHeroHovered(true)}
          onMouseLeave={() => setHeroHovered(false)}
          className="relative w-full h-[55vh] min-h-[460px] md:h-[65vh] md:min-h-[500px] rounded-3xl overflow-hidden mb-12 border border-white/5 shadow-2xl bg-black group/hero"
        >
          {/* Background image & gradient overlay */}
          <div className="absolute inset-0">
            {heroHovered ? (
              <video
                src={currentHero.url}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover opacity-40 transition-opacity duration-700 animate-in fade-in"
              />
            ) : (
              <Image 
                src={currentHero.thumbnailUrl} 
                alt={currentHero.title} 
                fill 
                priority
                className="object-cover opacity-50 transition-transform duration-10000 scale-105 group-hover/hero:scale-100"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/30 to-transparent z-10" />
          </div>

          {/* Featured details content */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-14 space-y-4 max-w-2xl z-20">
            <div className="flex items-center gap-2">
              <span className="bg-primary/30 border border-primary/40 text-primary text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-md flex items-center gap-1 shadow-md">
                <Sparkles size={8} fill="currentColor" /> FEATURED SPOTLIGHT
              </span>
              <span className="text-[10px] text-white/70 font-semibold uppercase">{currentHero.categoryName}</span>
            </div>

            <h1 className="font-black text-2xl md:text-4xl text-white tracking-tight leading-tight uppercase animate-in slide-in-from-bottom-2 duration-300">
              {currentHero.title}
            </h1>

            <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-light line-clamp-2 md:line-clamp-3">
              {currentHero.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button 
                onClick={() => setSelectedVideo(currentHero)}
                className="bg-gradient-primary hover:opacity-95 text-white font-bold text-xs md:text-sm py-3 px-6 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-primary/20 border border-primary/20"
              >
                <Play size={16} fill="white" /> Play Video
              </button>
              
              <button 
                onClick={() => setSelectedVideo(currentHero)}
                className="bg-white/5 hover:bg-white/10 text-white font-bold text-xs md:text-sm py-3 px-5 rounded-xl border border-white/10 flex items-center gap-2 transition-colors backdrop-blur-sm"
              >
                <Info size={16} /> More Info
              </button>

              <button
                onClick={() => bookmarkVideo(currentHero.id)}
                className="p-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl transition-colors backdrop-blur-sm"
                title="Save Watch Later"
              >
                {isHeroBookmarked ? <Check size={16} className="text-primary" /> : <Plus size={16} />}
              </button>
            </div>
          </div>

          {/* Carousel Next/Prev triggers */}
          {featuredVideos.length > 1 && (
            <div className="absolute right-6 bottom-6 flex gap-2">
              <button 
                onClick={() => setHeroIndex((prev) => (prev - 1 + featuredVideos.length) % featuredVideos.length)}
                className="p-2 bg-dark/60 hover:bg-dark/80 rounded-xl border border-white/10 text-white transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={() => setHeroIndex((prev) => (prev + 1) % featuredVideos.length)}
                className="p-2 bg-dark/60 hover:bg-dark/80 rounded-xl border border-white/10 text-white transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </section>
      )}

      {/* 2. CONTINUE WATCHING ROW (DYNAMIC FROM HISTORY) */}
      {continueWatchingVideos.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={16} className="text-primary animate-pulse" />
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-white">Continue Watching</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {continueWatchingVideos.map((video) => (
              <VideoCard key={video.id} video={video} onSelect={setSelectedVideo} />
            ))}
          </div>
        </section>
      )}

      {/* 3. TRENDING SLIDER */}
      {trendingVideos.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Flame size={16} className="text-primary" />
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-white">Trending Dialogue</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingVideos.slice(0, 3).map((video) => (
              <VideoCard key={video.id} video={video} onSelect={setSelectedVideo} />
            ))}
          </div>
        </section>
      )}

      {/* 4. PLATFORM CORE CONTENT & CATEGORY FILTERS */}
      <section className="mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Radio size={16} className="text-primary" />
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-white">All Platform Broadcasts</h3>
          </div>

          {/* Horizontally scrollable Category Badges */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-thin max-w-full">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border shrink-0 ${
                activeCategory === "all"
                  ? "bg-primary border-primary text-white"
                  : "bg-surface border-white/5 text-text-secondary hover:text-white"
              }`}
            >
              All Categories
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border shrink-0 ${
                  activeCategory === cat.id
                    ? "bg-primary border-primary text-white"
                    : "bg-surface border-white/5 text-text-secondary hover:text-white"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        {filteredVideos.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-2xl border border-white/5 p-8 text-text-secondary">
            <Award size={36} className="mx-auto mb-2 text-primary opacity-60" />
            <p className="text-xs font-semibold">No uploads in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <VideoCard key={video.id} video={video} onSelect={setSelectedVideo} />
            ))}
          </div>
        )}
      </section>

      {/* 5. ABOUT PLATFORM SECTION IN HOMEPAGE */}
      <section id="about" className="py-12 border-t border-white/5 bg-card/10 rounded-3xl p-8 border border-white/5 flex flex-col md:flex-row gap-8 items-center mb-6">
        <div className="relative w-28 h-28 rounded-2xl overflow-hidden bg-gradient-primary p-[3px] flex-shrink-0 animate-pulse">
          <div className="w-full h-full rounded-[13px] bg-surface relative flex items-center justify-center">
            <Image src="/logo.png" alt="Brand Logo" width={90} height={90} className="object-cover" />
          </div>
        </div>
        <div className="space-y-3">
          <h4 className="font-extrabold text-lg text-white uppercase tracking-wider">
            About VOTMASS TV Network
          </h4>
          <p className="text-xs text-text-secondary leading-relaxed font-light max-w-3xl">
            VOTMASS TV is a next generation digital media and online television platform focused on leadership, governance, youth development, education, documentaries, movies, interviews, podcasts, news, and short form video content. The platform combines the user experience of YouTube, Netflix, and TikTok while maintaining the credibility of a professional television network. Only administrators can publish content.
          </p>
        </div>
      </section>

        </>
      )}

      {/* GLOBAL CENTRALIZED DETAILS MODAL ELEMENT */}
      <VideoDetailsModal 
        video={selectedVideo} 
        onClose={() => setSelectedVideo(null)} 
      />
    </MainLayout>
  );
}
