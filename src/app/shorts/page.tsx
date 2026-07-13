"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  Heart, MessageCircle, Share2, Bookmark, ArrowLeft, 
  Volume2, VolumeX, Play, Pause, Send, Trash, ChevronDown, ChevronUp 
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { Video } from "@/lib/mockData";

function getYouTubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export default function ShortsPage() {
  const router = useRouter();
  const { 
    user, 
    videos, 
    comments, 
    addComment, 
    likedVideoIds, 
    likeVideo, 
    bookmarkedVideoIds, 
    bookmarkVideo 
  } = useAppStore();

  const shorts = videos.filter((v) => v.type === "short");
  const [activeIndex, setActiveIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [commentDrawerOpen, setCommentDrawerOpen] = useState(false);
  const [commentText, setCommentText] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  // Setup refs length
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, shorts.length);
  }, [shorts.length]);

  // Handle active video playback on scroll focus
  useEffect(() => {
    shorts.forEach((_, idx) => {
      const vid = videoRefs.current[idx];
      if (vid) {
        if (idx === activeIndex && isPlaying) {
          vid.play().catch(() => {});
        } else {
          vid.pause();
          vid.currentTime = 0;
        }
      }
    });
  }, [activeIndex, isPlaying, shorts]);

  // Key navigation (Space to toggle, arrows to swipe)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (commentDrawerOpen) return; // ignore when typing comments
      if (e.code === "Space") {
        e.preventDefault();
        setIsPlaying(!isPlaying);
      } else if (e.code === "ArrowDown") {
        e.preventDefault();
        if (activeIndex < shorts.length - 1) {
          scrollToIndex(activeIndex + 1);
        }
      } else if (e.code === "ArrowUp") {
        e.preventDefault();
        if (activeIndex > 0) {
          scrollToIndex(activeIndex - 1);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, isPlaying, shorts.length, commentDrawerOpen]);

  const scrollToIndex = (index: number) => {
    const container = containerRef.current;
    if (container) {
      const child = container.children[index] as HTMLElement;
      if (child) {
        container.scrollTo({
          top: child.offsetTop,
          behavior: "smooth"
        });
        setActiveIndex(index);
        setIsPlaying(true);
      }
    }
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const scrollPos = container.scrollTop;
      const height = container.clientHeight;
      const newIndex = Math.round(scrollPos / height);
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < shorts.length) {
        setActiveIndex(newIndex);
        setIsPlaying(true);
      }
    }
  };

  const currentShort = shorts[activeIndex];
  const activeShortComments = currentShort ? comments.filter(c => c.videoId === currentShort.id) : [];

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !user || !currentShort) return;
    addComment(currentShort.id, user.fullName, commentText);
    setCommentText("");
  };

  const handleShare = (short: Video) => {
    navigator.clipboard.writeText(window.location.origin + `/shorts?id=${short.id}`);
    alert("Short link copied to clipboard!");
  };

  return (
    <div className="h-screen w-screen bg-black overflow-hidden relative flex justify-center items-center">
      {/* Floating navigation headers */}
      <div className="absolute top-6 left-6 z-40 flex items-center gap-4">
        <Link 
          href="/" 
          className="p-3 bg-dark/60 hover:bg-dark/80 backdrop-blur-md rounded-full border border-white/10 text-white transition-colors"
        >
          <ArrowLeft size={16} />
        </Link>
        <span className="font-extrabold text-sm tracking-wider text-white hidden sm:inline">
          VOTMASS <span className="text-gradient">SHORTS</span>
        </span>
      </div>

      {/* Global Mute Toggle */}
      <div className="absolute top-6 right-6 z-40">
        <button 
          onClick={() => setMuted(!muted)}
          className="p-3 bg-dark/60 hover:bg-dark/80 backdrop-blur-md rounded-full border border-white/10 text-white transition-colors"
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>

      {/* SHORTS SNAP SCROLLER FEED CONTAINER */}
      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="w-full max-w-[480px] h-full overflow-y-scroll snap-y snap-mandatory scrollbar-none relative bg-surface border-x border-white/5 shadow-2xl"
        style={{ scrollbarWidth: "none" }}
      >
        {shorts.map((short, index) => {
          const isLiked = likedVideoIds.includes(short.id);
          const isBookmarked = bookmarkedVideoIds.includes(short.id);
          
          return (
            <div 
              key={short.id}
              className="w-full h-full snap-start snap-always relative flex flex-col justify-end bg-black"
            >
              {/* VIDEO PLAYER */}
              {index === activeIndex ? (
                short.youtubeUrl ? (
                  <div className="absolute inset-0 w-full h-full animate-in fade-in duration-300">
                    <iframe 
                      src={`https://www.youtube.com/embed/${getYouTubeId(short.youtubeUrl)}?autoplay=1&mute=${muted ? '1' : '0'}&controls=0&modestbranding=1&loop=1&playlist=${getYouTubeId(short.youtubeUrl)}&rel=0`} 
                      width="100%" 
                      height="100%" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen={true}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                ) : short.facebookUrl ? (
                  <div className="absolute inset-0 w-full h-full animate-in fade-in duration-300">
                    <iframe 
                      src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(short.facebookUrl)}&show_text=0&autoplay=1&mute=${muted ? '1' : '0'}`} 
                      width="100%" 
                      height="100%" 
                      style={{ border: 'none', overflow: 'hidden' }} 
                      scrolling="no" 
                      frameBorder="0" 
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                      allowFullScreen={true}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <video
                    ref={(el) => { videoRefs.current[index] = el; }}
                    src={short.url}
                    loop
                    muted={muted}
                    playsInline
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                  />
                )
              ) : (
                <div className="absolute inset-0 w-full h-full bg-black">
                  <Image 
                    src={short.thumbnailUrl} 
                    alt={short.title}
                    fill
                    className="object-cover opacity-60"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="p-4 bg-dark/60 rounded-full">
                      <Play size={32} fill="white" className="text-white ml-1" />
                    </div>
                  </div>
                </div>
              )}

              {/* Tap play/pause indicator state display */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
                  <div className="p-4 bg-dark/60 rounded-full animate-ping">
                    <Play size={32} fill="white" className="text-white ml-1" />
                  </div>
                </div>
              )}

              {/* DARK LOWER GRADIENT SCREEN */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

              {/* OVERLAYS ACTION BAR (RIGHT SIDE) */}
              <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6 z-30">
                {/* LIKE */}
                <div className="flex flex-col items-center gap-1.5">
                  <button 
                    onClick={() => likeVideo(short.id)}
                    className={`p-3.5 rounded-full border transition-all ${
                      isLiked 
                        ? "bg-primary border-primary text-white scale-110 shadow-lg shadow-primary/30" 
                        : "bg-dark/60 border-white/10 text-white hover:bg-dark/80"
                    }`}
                  >
                    <Heart size={18} fill={isLiked ? "white" : "none"} />
                  </button>
                  <span className="text-[10px] font-bold font-mono text-white/90 drop-shadow-md">
                    {short.likes}
                  </span>
                </div>

                {/* COMMENTS PANEL TRIGGER */}
                <div className="flex flex-col items-center gap-1.5">
                  <button 
                    onClick={() => setCommentDrawerOpen(true)}
                    className="p-3.5 bg-dark/60 border border-white/10 hover:bg-dark/80 text-white rounded-full transition-colors"
                  >
                    <MessageCircle size={18} />
                  </button>
                  <span className="text-[10px] font-bold font-mono text-white/90 drop-shadow-md">
                    {short.commentsCount}
                  </span>
                </div>

                {/* SAVE */}
                <div className="flex flex-col items-center gap-1.5">
                  <button 
                    onClick={() => bookmarkVideo(short.id)}
                    className={`p-3.5 rounded-full border transition-all ${
                      isBookmarked 
                        ? "bg-yellow-500 border-yellow-500 text-white scale-110" 
                        : "bg-dark/60 border-white/10 text-white hover:bg-dark/80"
                    }`}
                  >
                    <Bookmark size={18} fill={isBookmarked ? "white" : "none"} />
                  </button>
                  <span className="text-[9px] uppercase tracking-wider font-bold text-white/70 drop-shadow">Save</span>
                </div>

                {/* SHARE */}
                <div className="flex flex-col items-center gap-1.5">
                  <button 
                    onClick={() => handleShare(short)}
                    className="p-3.5 bg-dark/60 border border-white/10 hover:bg-dark/80 text-white rounded-full transition-colors"
                  >
                    <Share2 size={18} />
                  </button>
                  <span className="text-[9px] uppercase tracking-wider font-bold text-white/70 drop-shadow">Share</span>
                </div>
              </div>

              {/* SHORT DETAIL DESCRIPTION TEXT (LOWER LEFT) */}
              <div className="absolute left-4 right-20 bottom-20 z-30 space-y-2">
                <span className="bg-primary/20 backdrop-blur-sm text-primary text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-primary/30">
                  {short.categoryName}
                </span>
                <h4 className="font-extrabold text-sm text-white tracking-tight leading-tight">
                  {short.title}
                </h4>
                <p className="text-xs text-white/80 leading-relaxed font-light line-clamp-2">
                  {short.description}
                </p>
              </div>

            </div>
          );
        })}
      </div>

      {/* Swipe navigation help overlays on desktop */}
      <div className="hidden lg:flex flex-col gap-2 absolute right-12 bottom-12 z-30">
        <button 
          onClick={() => activeIndex > 0 && scrollToIndex(activeIndex - 1)}
          className="p-3 bg-surface hover:bg-card border border-white/10 rounded-xl text-text-secondary hover:text-white transition-colors"
        >
          <ChevronUp size={16} />
        </button>
        <button 
          onClick={() => activeIndex < shorts.length - 1 && scrollToIndex(activeIndex + 1)}
          className="p-3 bg-surface hover:bg-card border border-white/10 rounded-xl text-text-secondary hover:text-white transition-colors"
        >
          <ChevronDown size={16} />
        </button>
      </div>

      {/* SLIDE UP COMMENTS SHEET (TikTok comment drawer style) */}
      {commentDrawerOpen && currentShort && (
        <div className="absolute inset-0 bg-black/60 z-50 flex flex-col justify-end">
          <div className="absolute inset-0" onClick={() => setCommentDrawerOpen(false)} />
          <div className="w-full max-w-[480px] h-[60vh] bg-surface rounded-t-3xl border-t border-white/10 p-5 flex flex-col z-10 animate-in slide-in-from-bottom duration-300 relative mx-auto">
            
            {/* Header */}
            <div className="flex justify-between items-center pb-3 border-b border-white/5 mb-4">
              <h4 className="font-bold text-sm text-white">Comments ({activeShortComments.length})</h4>
              <button 
                onClick={() => setCommentDrawerOpen(false)}
                className="text-xs text-text-secondary hover:text-white py-1 px-3 bg-white/5 rounded-full"
              >
                Close
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
              {activeShortComments.length === 0 ? (
                <p className="text-center text-text-secondary text-xs py-8">No comments on this short yet.</p>
              ) : (
                activeShortComments.map((comment) => (
                  <div key={comment.id} className="p-3 bg-card rounded-2xl border border-white/5 flex gap-2.5 relative">
                    <div className="w-5 h-5 rounded-full overflow-hidden bg-primary/20 relative flex-shrink-0">
                      {comment.userAvatar && (
                        <Image src={comment.userAvatar} alt="avatar" fill className="object-cover" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[11px] text-white">{comment.userName}</span>
                        <span className="text-[8px] text-text-secondary">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary mt-1">{comment.content}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Form */}
            {user ? (
              <form onSubmit={handlePostComment} className="flex gap-2 pt-3 border-t border-white/5 mt-4">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="flex-grow bg-card border border-white/5 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-primary/50 text-white"
                />
                <button
                  type="submit"
                  className="p-2.5 bg-gradient-primary text-white rounded-xl flex items-center justify-center border border-primary/25 shadow-md shadow-primary/10"
                >
                  <Send size={14} />
                </button>
              </form>
            ) : (
              <p className="text-xs text-text-secondary text-center py-2">Please login to comments.</p>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
