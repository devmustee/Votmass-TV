"use client";

import React from "react";

export default function SkeletonCard() {
  return (
    <div className="w-full bg-card border border-white/5 rounded-2xl p-0.5 overflow-hidden animate-pulse">
      {/* Thumbnail shimmer box */}
      <div className="relative aspect-video w-full bg-surface rounded-t-2xl" />
      
      {/* Text shimmer blocks */}
      <div className="p-4 space-y-3">
        <div className="h-4 bg-surface rounded-lg w-3/4" />
        <div className="space-y-2">
          <div className="h-3 bg-surface rounded-lg w-full" />
          <div className="h-3 bg-surface rounded-lg w-5/6" />
        </div>
        <div className="pt-2 border-t border-white/5 flex justify-between items-center">
          <div className="h-2.5 bg-surface rounded-lg w-1/4" />
          <div className="h-2.5 bg-surface rounded-lg w-1/3" />
        </div>
      </div>
    </div>
  );
}
