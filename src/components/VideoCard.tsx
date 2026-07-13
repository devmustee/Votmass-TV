"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Play, Bookmark, Clock, Eye, Sparkles } from "lucide-react";
import { Video } from "@/lib/mockData";
import { useAppStore } from "@/lib/store";

function getYouTubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

interface VideoCardProps {
  video: Video;
  onSelect: (video: Video) => void;
}

export default function VideoCard({ video, onSelect }: VideoCardProps) {
  const { bookmarkedVideoIds, bookmarkVideo, watchHistory } = useAppStore();
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimer = useRef<NodeJS.Timeout | null>(null);

  const isBookmarked = bookmarkedVideoIds.includes(video.id);
  const progress = watchHistory[video.id];
  const progressPercent = progress !== undefined ? Math.min((progress / video.duration) * 100, 100) : 0;

  const handleMouseEnter = () => {
    // Delay video autoplay slightly to prevent playback triggers on fast scrolls
    hoverTimer.current = setTimeout(() => {
      setIsHovered(true);
    }, 450);
  };

  const handleMouseLeave = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
    }
    setIsHovered(false);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    bookmarkVideo(video.id);
  };

  const formatDuration = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div 
      onClick={() => onSelect(video)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative cursor-pointer bg-card border border-white/5 rounded-2xl overflow-hidden glow-hover w-full"
    >
      {/* CARD MEDIA THUMBNAIL */}
      <div className="relative aspect-video w-full bg-surface overflow-hidden rounded-t-2xl">
        {/* Hover silent video autoplay */}
        {isHovered ? (
          video.youtubeUrl ? (
            <div className="absolute inset-0 w-full h-full pointer-events-none scale-105">
              <iframe 
                src={`https://www.youtube.com/embed/${getYouTubeId(video.youtubeUrl)}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${getYouTubeId(video.youtubeUrl)}&rel=0`} 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
            </div>
          ) : video.facebookUrl ? (
            <div className="absolute inset-0 w-full h-full pointer-events-none scale-105">
              <iframe 
                src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(video.facebookUrl)}&show_text=0&autoplay=1&muted=1`} 
                width="100%" 
                height="100%" 
                style={{ border: 'none', overflow: 'hidden' }} 
                scrolling="no" 
                frameBorder="0" 
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
            </div>
          ) : (
            <video
              src={video.url}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 animate-in fade-in"
            />
          )
        ) : (
          <Image
            src={video.thumbnailUrl}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        )}

        {/* Muted overlay badge details */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-primary hover:scale-110 transition-transform p-3 rounded-full shadow-lg shadow-primary/30">
            <Play size={18} fill="white" className="text-white ml-0.5" />
          </div>
        </div>

        {/* Video Duration Badge */}
        {video.type !== "short" && (
          <div className="absolute bottom-2.5 right-2.5 bg-dark/85 backdrop-blur-sm px-2 py-0.5 rounded-lg border border-white/5 text-[10px] font-bold font-mono text-white flex items-center gap-1 z-10">
            <Clock size={10} />
            <span>{formatDuration(video.duration)}</span>
          </div>
        )}

        {/* Categories / Type badge */}
        <div className="absolute top-2.5 left-2.5 z-10 flex gap-1.5">
          <span className="bg-primary/20 backdrop-blur-sm text-primary text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border border-primary/30">
            {video.type}
          </span>
          {video.trending && (
            <span className="bg-yellow-500/20 backdrop-blur-sm text-yellow-400 text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border border-yellow-500/30 flex items-center gap-0.5">
              <Sparkles size={8} /> HOT
            </span>
          )}
        </div>

        {/* Bookmark Action overlay */}
        <button
          onClick={handleBookmark}
          className={`absolute top-2.5 right-2.5 z-10 p-1.5 rounded-lg backdrop-blur-sm border transition-all duration-200 ${
            isBookmarked
              ? "bg-primary border-primary text-white scale-105"
              : "bg-dark/60 border-white/10 text-text-secondary hover:text-white hover:bg-dark/80"
          }`}
          title="Watch Later"
        >
          <Bookmark size={12} fill={isBookmarked ? "white" : "none"} />
        </button>

        {/* Progress bar overlay indicator */}
        {progressPercent > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 overflow-hidden z-10">
            <div 
              className="bg-primary h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}
      </div>

      {/* CARD DESCRIPTIONS */}
      <div className="p-4 space-y-2">
        <h4 className="font-bold text-xs md:text-sm text-white line-clamp-1 group-hover:text-primary transition-colors">
          {video.title}
        </h4>
        <p className="text-[11px] text-text-secondary line-clamp-2 leading-relaxed">
          {video.description}
        </p>

        <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[9px] text-text-secondary">
          <span>{video.categoryName}</span>
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              <Eye size={10} />
              <span>{video.views.toLocaleString()}</span>
            </div>
            <span>•</span>
            <span>{video.createdAt}</span>
          </div>
        </div>
      </div>

    </div>
  );
}
