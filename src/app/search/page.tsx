"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Flame, Clock, Tag, HelpCircle, Film, Radio, Award } from "lucide-react";
import MainLayout from "@/components/MainLayout";
import VideoCard from "@/components/VideoCard";
import VideoDetailsModal from "@/components/VideoDetailsModal";
import { useAppStore } from "@/lib/store";
import { Video, CATEGORIES } from "@/lib/mockData";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { videos } = useAppStore();

  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  // Sync state query with URL parameters
  useEffect(() => {
    const q = searchParams.get("q") || "";
    setQuery(q);
    if (q && !recentSearches.includes(q)) {
      setRecentSearches(prev => [q, ...prev.slice(0, 4)]);
    }
  }, [searchParams, recentSearches]);

  const trendingQueries = [
    "African Leadership",
    "Tech Incubator",
    "Sintel",
    "Youth Mentorship",
    "Silicon Savanna"
  ];

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    // Dynamic routing update for query
    router.replace(`/search?q=${encodeURIComponent(val)}`);
  };

  const selectTrendingQuery = (term: string) => {
    setQuery(term);
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  // Filter video results
  const filteredResults = videos.filter((v) => {
    // Exclude vertical shorts from global list search
    if (v.type === "short") return false;

    const matchesQuery = query 
      ? v.title.toLowerCase().includes(query.toLowerCase()) || 
        v.description.toLowerCase().includes(query.toLowerCase())
      : true;

    const matchesType = selectedType === "all" ? true : v.type === selectedType;
    const matchesCategory = selectedCategory === "all" ? true : v.categoryId === selectedCategory;

    return matchesQuery && matchesType && matchesCategory;
  });

  return (
    <MainLayout>
      <div className="space-y-8">
        
        {/* 1. SEARCH INPUT SECTION */}
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search by title, description, or cast..."
            value={query}
            onChange={handleQueryChange}
            className="w-full bg-surface border border-white/10 focus:border-primary/50 text-white rounded-3xl py-4 pl-12 pr-6 text-sm focus:outline-none focus:bg-surface shadow-xl shadow-black/30 transition-all font-light"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
        </div>

        {/* 2. FILTER BADGES */}
        <div className="flex flex-col gap-4 border-b border-white/5 pb-6">
          {/* Filter Type */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-[10px] text-text-secondary uppercase font-bold tracking-widest mr-2">Media Format</span>
            <button
              onClick={() => setSelectedType("all")}
              className={`px-3.5 py-1 rounded-full text-xs font-semibold border transition-all ${
                selectedType === "all"
                  ? "bg-primary border-primary text-white"
                  : "bg-card border-white/5 text-text-secondary hover:text-white"
              }`}
            >
              All Formats
            </button>
            {["video", "movie", "documentary", "podcast", "news"].map((format) => (
              <button
                key={format}
                onClick={() => setSelectedType(format)}
                className={`px-3.5 py-1 rounded-full text-xs font-semibold border transition-all uppercase ${
                  selectedType === format
                    ? "bg-primary border-primary text-white"
                    : "bg-card border-white/5 text-text-secondary hover:text-white"
                }`}
              >
                {format}s
              </button>
            ))}
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-[10px] text-text-secondary uppercase font-bold tracking-widest mr-2">Category Desk</span>
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3.5 py-1 rounded-full text-xs font-semibold border transition-all ${
                selectedCategory === "all"
                  ? "bg-primary border-primary text-white"
                  : "bg-card border-white/5 text-text-secondary hover:text-white"
              }`}
            >
              All Categories
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1 rounded-full text-xs font-semibold border transition-all ${
                  selectedCategory === cat.id
                    ? "bg-primary border-primary text-white"
                    : "bg-card border-white/5 text-text-secondary hover:text-white"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* 3. RECENT / TRENDING SEARCH LINKS */}
        {!query && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto pt-4">
            {/* Recent Search Logs */}
            {recentSearches.length > 0 && (
              <div className="space-y-3 p-5 bg-card border border-white/5 rounded-2xl">
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <h4 className="font-bold text-xs uppercase text-white flex items-center gap-1.5">
                    <Clock size={12} className="text-primary" />
                    <span>Recent Searches</span>
                  </h4>
                  <button onClick={clearRecentSearches} className="text-[10px] text-text-secondary hover:text-red-500 font-medium">
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term, i) => (
                    <button
                      key={i}
                      onClick={() => selectTrendingQuery(term)}
                      className="px-3 py-1 bg-surface border border-white/5 hover:border-primary/20 text-xs text-text-secondary hover:text-white rounded-lg transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Search Suggestions */}
            <div className="space-y-3 p-5 bg-card border border-white/5 rounded-2xl">
              <div className="pb-2 border-b border-white/5">
                <h4 className="font-bold text-xs uppercase text-white flex items-center gap-1.5">
                  <Flame size={12} className="text-primary" />
                  <span>Trending Queries</span>
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingQueries.map((term, i) => (
                  <button
                    key={i}
                    onClick={() => selectTrendingQuery(term)}
                    className="px-3 py-1 bg-surface border border-white/5 hover:border-primary/20 text-xs text-text-secondary hover:text-white rounded-lg transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4. RESULTS DISPLAY */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Radio size={14} className="text-primary" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-white">
              Search Results ({filteredResults.length})
            </h3>
          </div>

          {filteredResults.length === 0 ? (
            <div className="text-center py-20 bg-card rounded-3xl border border-white/5 p-8 text-text-secondary max-w-md mx-auto">
              <Award size={36} className="mx-auto mb-2 text-primary opacity-60 animate-bounce" />
              <h4 className="font-bold text-sm text-white">No Matching Signals</h4>
              <p className="text-xs text-text-secondary mt-1">Try expanding your search parameters or query keywords.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
              {filteredResults.map((video) => (
                <VideoCard key={video.id} video={video} onSelect={setSelectedVideo} />
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Dynamic Overlay Details dialog */}
      <VideoDetailsModal 
        video={selectedVideo} 
        onClose={() => setSelectedVideo(null)} 
      />
    </MainLayout>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-dark text-white flex items-center justify-center">
        <div className="text-center text-xs text-text-secondary">Loading search interface...</div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}
