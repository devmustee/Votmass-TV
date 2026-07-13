"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  ShieldCheck, Upload, Video as VideoIcon, MessageSquare, 
  Settings, Users, BarChart3, TrendingUp, DollarSign, 
  Trash2, BellRing, Sparkles, AlertCircle, Play 
} from "lucide-react";
import MainLayout from "@/components/MainLayout";
import { useAppStore } from "@/lib/store";
import { Video, CATEGORIES } from "@/lib/mockData";
import VideoDetailsModal from "@/components/VideoDetailsModal";

export default function AdminPage() {
  const router = useRouter();
  const { 
    user, 
    videos, 
    comments, 
    addVideo, 
    deleteVideo, 
    deleteComment, 
    addNotification 
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<"analytics" | "upload" | "videos" | "comments" | "push">("analytics");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  // Form states for uploading content
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4");
  const [thumbnailUrl, setThumbnailUrl] = useState("https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&auto=format&fit=crop");
  const [categoryId, setCategoryId] = useState("cat-1");
  const [contentType, setContentType] = useState<'video' | 'movie' | 'short' | 'podcast' | 'documentary' | 'news'>("video");
  const [duration, setDuration] = useState("600");
  const [castInput, setCastInput] = useState("");
  const [directorInput, setDirectorInput] = useState("");

  // Push notification states
  const [pushTitle, setPushTitle] = useState("");
  const [pushContent, setPushContent] = useState("");

  // Search/Filter states inside admin listings
  const [videoSearch, setVideoSearch] = useState("");

  const [mounted, setMounted] = useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <MainLayout>
        <div className="text-center py-24 text-xs text-text-secondary animate-pulse">
          Verifying security authorizations...
        </div>
      </MainLayout>
    );
  }

  // SAFEGUARD: Authorization check
  if (!user || user.role !== "admin") {
    return (
      <MainLayout>
        <div className="max-w-md mx-auto py-16 text-center space-y-4 bg-card border border-red-500/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-red-500" />
          <AlertCircle size={48} className="mx-auto text-red-500 animate-pulse" />
          <h2 className="text-xl font-black text-white">ACCESS DENIED</h2>
          <p className="text-xs text-text-secondary leading-relaxed font-light">
            You do not have administrative privileges to access this console. Only VOTMASS TV administrators can upload and publish video content.
          </p>
          <button 
            onClick={() => router.push("/auth")}
            className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 py-2.5 rounded-xl text-xs font-semibold transition-colors"
          >
            Authenticate as Admin
          </button>
        </div>
      </MainLayout>
    );
  }

  // Upload Form Submit handler
  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !videoUrl) return;

    const matchedCat = CATEGORIES.find(c => c.id === categoryId);
    const newVideo: Video = {
      id: `v-uploaded-${Date.now()}`,
      title,
      description,
      url: videoUrl,
      thumbnailUrl,
      categoryId,
      categoryName: matchedCat ? matchedCat.name : "Uncategorized",
      type: contentType,
      duration: parseInt(duration) || 300,
      views: 0,
      featured: false,
      trending: false,
      createdAt: new Date().toISOString().split("T")[0],
      likes: 0,
      commentsCount: 0,
      castList: castInput ? castInput.split(",").map(c => c.trim()) : undefined,
      director: directorInput || undefined
    };

    addVideo(newVideo);

    // Reset Form
    setTitle("");
    setDescription("");
    setCastInput("");
    setDirectorInput("");
    alert("Broadcast content uploaded and published successfully!");
    setActiveTab("videos");
  };

  // Push notifications dispatcher
  const handlePushSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pushTitle || !pushContent) return;
    addNotification(pushTitle, pushContent);
    setPushTitle("");
    setPushContent("");
    alert("Push alert dispatched to all active sessions!");
  };

  // Listings queries
  const filteredAdminVideos = videos.filter((v) => 
    v.title.toLowerCase().includes(videoSearch.toLowerCase()) ||
    v.categoryName.toLowerCase().includes(videoSearch.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* LEFT COLUMN: CONTROL TABS */}
        <div className="bg-card border border-white/5 rounded-3xl p-6 h-fit space-y-6 shadow-2xl relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-red-500" />
          
          <div className="flex items-center gap-3 pb-4 border-b border-white/5">
            <ShieldCheck size={20} className="text-red-500 animate-pulse" />
            <div>
              <h3 className="font-extrabold text-sm uppercase text-white tracking-wider">Admin Console</h3>
              <p className="text-[10px] text-text-secondary mt-0.5">Control center</p>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <button
              onClick={() => setActiveTab("analytics")}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${
                activeTab === "analytics" 
                  ? "bg-red-500/10 text-red-400 border border-red-500/20" 
                  : "text-text-secondary hover:text-white hover:bg-white/5"
              }`}
            >
              <BarChart3 size={14} />
              <span>Platform Metrics</span>
            </button>

            <button
              onClick={() => setActiveTab("upload")}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${
                activeTab === "upload" 
                  ? "bg-red-500/10 text-red-400 border border-red-500/20" 
                  : "text-text-secondary hover:text-white hover:bg-white/5"
              }`}
            >
              <Upload size={14} />
              <span>Upload Video Desk</span>
            </button>

            <button
              onClick={() => setActiveTab("videos")}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${
                activeTab === "videos" 
                  ? "bg-red-500/10 text-red-400 border border-red-500/20" 
                  : "text-text-secondary hover:text-white hover:bg-white/5"
              }`}
            >
              <VideoIcon size={14} />
              <span>Manage Content ({videos.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("comments")}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${
                activeTab === "comments" 
                  ? "bg-red-500/10 text-red-400 border border-red-500/20" 
                  : "text-text-secondary hover:text-white hover:bg-white/5"
              }`}
            >
              <MessageSquare size={14} />
              <span>Comment Moderation ({comments.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("push")}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${
                activeTab === "push" 
                  ? "bg-red-500/10 text-red-400 border border-red-500/20" 
                  : "text-text-secondary hover:text-white hover:bg-white/5"
              }`}
            >
              <BellRing size={14} />
              <span>Send Push Alert</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: CORE ACTIVE VIEW */}
        <div className="lg:col-span-3 space-y-6 bg-card/25 border border-white/5 p-6 rounded-3xl min-h-[500px]">
          
          {/* ANALYTICS TAB */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-white">Platform Metrics Dashboard</h3>
              
              {/* Cards grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-card rounded-2xl border border-white/5 relative overflow-hidden">
                  <span className="text-[10px] text-text-secondary uppercase font-bold block">Total Stream Views</span>
                  <span className="text-xl font-black text-white block mt-1.5">648,321</span>
                  <span className="text-[9px] text-green-400 font-bold block mt-1">+14.2% MoM</span>
                </div>
                <div className="p-4 bg-card rounded-2xl border border-white/5 relative overflow-hidden">
                  <span className="text-[10px] text-text-secondary uppercase font-bold block">Active Registrations</span>
                  <span className="text-xl font-black text-white block mt-1.5">24,509</span>
                  <span className="text-[9px] text-green-400 font-bold block mt-1">+8.4% MoM</span>
                </div>
                <div className="p-4 bg-card rounded-2xl border border-white/5 relative overflow-hidden">
                  <span className="text-[10px] text-text-secondary uppercase font-bold block">VIP Subscriptions</span>
                  <span className="text-xl font-black text-white block mt-1.5">1,822</span>
                  <span className="text-[9px] text-yellow-400 font-bold block mt-1">7.4% Conversion</span>
                </div>
                <div className="p-4 bg-card rounded-2xl border border-white/5 relative overflow-hidden">
                  <span className="text-[10px] text-text-secondary uppercase font-bold block">Est. Revenue (Stripe)</span>
                  <span className="text-xl font-black text-white block mt-1.5">$9,101.78</span>
                  <span className="text-[9px] text-green-400 font-bold block mt-1">Paystack Sync Active</span>
                </div>
              </div>

              {/* Chart simulations */}
              <div className="p-5 bg-card border border-white/5 rounded-2xl space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <h4 className="font-bold text-xs uppercase text-white">Monthly Broadcast Viewers (UHD & HD)</h4>
                  <span className="text-[10px] text-text-secondary">Jan 2026 - Jun 2026</span>
                </div>
                <div className="h-44 flex items-end gap-3 pt-4 px-2">
                  <div className="flex-1 flex flex-col items-center gap-1.5 group/bar">
                    <span className="text-[9px] text-text-secondary opacity-0 group-hover/bar:opacity-100 transition-opacity">85k</span>
                    <div className="w-full bg-surface border border-white/5 rounded-t-lg h-24 group-hover/bar:bg-primary transition-colors" />
                    <span className="text-[10px] font-semibold text-text-secondary font-mono">Jan</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-1.5 group/bar">
                    <span className="text-[9px] text-text-secondary opacity-0 group-hover/bar:opacity-100 transition-opacity">92k</span>
                    <div className="w-full bg-surface border border-white/5 rounded-t-lg h-28 group-hover/bar:bg-primary transition-colors" />
                    <span className="text-[10px] font-semibold text-text-secondary font-mono">Feb</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-1.5 group/bar">
                    <span className="text-[9px] text-text-secondary opacity-0 group-hover/bar:opacity-100 transition-opacity">110k</span>
                    <div className="w-full bg-surface border border-white/5 rounded-t-lg h-32 group-hover/bar:bg-primary transition-colors" />
                    <span className="text-[10px] font-semibold text-text-secondary font-mono">Mar</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-1.5 group/bar">
                    <span className="text-[9px] text-text-secondary opacity-0 group-hover/bar:opacity-100 transition-opacity">148k</span>
                    <div className="w-full bg-surface border border-white/5 rounded-t-lg h-40 group-hover/bar:bg-primary transition-colors animate-pulse" />
                    <span className="text-[10px] font-semibold text-text-secondary font-mono">Apr</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* UPLOAD FORM TAB */}
          {activeTab === "upload" && (
            <div className="space-y-4">
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-white">Publish New Video Broadcast</h3>
              
              <form onSubmit={handleUploadSubmit} className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider font-bold text-text-secondary">Video Title</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter broadcast title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-surface border border-white/5 rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:border-primary/50 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider font-bold text-text-secondary">Category Channel</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full bg-surface border border-white/5 rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:border-primary/50 text-white"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider font-bold text-text-secondary">Content Format</label>
                  <select
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value as any)}
                    className="w-full bg-surface border border-white/5 rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:border-primary/50 text-white select"
                  >
                    <option value="video">Standard Video</option>
                    <option value="movie">Movie</option>
                    <option value="documentary">Documentary</option>
                    <option value="podcast">Podcast</option>
                    <option value="news">News Desk</option>
                    <option value="short">TikTok Short</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider font-bold text-text-secondary">Duration (Seconds)</label>
                  <input
                    type="number"
                    placeholder="600"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-surface border border-white/5 rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:border-primary/50 text-white"
                  />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-[9px] uppercase tracking-wider font-bold text-text-secondary">Stream Source URL (Mux / Cloudflare)</label>
                  <input
                    type="text"
                    required
                    placeholder="https://..."
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="w-full bg-surface border border-white/5 rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:border-primary/50 text-white font-mono"
                  />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-[9px] uppercase tracking-wider font-bold text-text-secondary">Cover Thumbnail Image URL</label>
                  <input
                    type="text"
                    required
                    placeholder="https://..."
                    value={thumbnailUrl}
                    onChange={(e) => setThumbnailUrl(e.target.value)}
                    className="w-full bg-surface border border-white/5 rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:border-primary/50 text-white font-mono"
                  />
                </div>

                {contentType === "movie" && (
                  <>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider font-bold text-text-secondary">Director</label>
                      <input
                        type="text"
                        placeholder="Colin Levy"
                        value={directorInput}
                        onChange={(e) => setDirectorInput(e.target.value)}
                        className="w-full bg-surface border border-white/5 rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:border-primary/50 text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider font-bold text-text-secondary">Starring Cast (Comma Separated)</label>
                      <input
                        type="text"
                        placeholder="Actor A, Actor B"
                        value={castInput}
                        onChange={(e) => setCastInput(e.target.value)}
                        className="w-full bg-surface border border-white/5 rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:border-primary/50 text-white"
                      />
                    </div>
                  </>
                )}

                <div className="space-y-1 md:col-span-2">
                  <label className="text-[9px] uppercase tracking-wider font-bold text-text-secondary">Narrative Description</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Detailed overview..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-surface border border-white/5 rounded-xl p-3 text-xs focus:outline-none focus:border-primary/50 text-white"
                  />
                </div>

                <div className="md:col-span-2 pt-4">
                  <button
                    type="submit"
                    className="w-full bg-gradient-primary hover:opacity-95 text-white font-bold py-3.5 rounded-xl text-xs transition-opacity border border-primary/20 shadow-md shadow-primary/10"
                  >
                    Publish Content to VOTMASS TV
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* MANAGE VIDEOS TAB */}
          {activeTab === "videos" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <h3 className="font-extrabold text-sm uppercase tracking-wider text-white">Broadcast Listings</h3>
                <input
                  type="text"
                  placeholder="Search list..."
                  value={videoSearch}
                  onChange={(e) => setVideoSearch(e.target.value)}
                  className="bg-surface border border-white/10 rounded-xl py-1.5 px-3 text-xs w-48 text-white focus:outline-none"
                />
              </div>

              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {filteredAdminVideos.map((video) => (
                  <div 
                    key={video.id}
                    className="p-3 bg-card border border-white/5 rounded-2xl flex items-center justify-between gap-4 hover:border-red-500/20 transition-all"
                  >
                    <div className="flex gap-4 items-center">
                      <div 
                        onClick={() => setSelectedVideo(video)}
                        className="relative w-16 aspect-video rounded-lg overflow-hidden bg-surface flex-shrink-0 cursor-pointer group"
                      >
                        <Image src={video.thumbnailUrl} alt="Cover" fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play size={10} fill="white" className="text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 
                          onClick={() => setSelectedVideo(video)}
                          className="font-bold text-xs hover:text-red-400 transition-colors cursor-pointer"
                        >
                          {video.title}
                        </h4>
                        <span className="text-[9px] text-text-secondary uppercase font-semibold block mt-0.5">
                          {video.type} | {video.categoryName} | VIEWS: {video.views.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (confirm(`Delete "${video.title}"?`)) {
                          deleteVideo(video.id);
                        }
                      }}
                      className="p-2 text-text-secondary hover:text-red-500 hover:bg-white/5 rounded-xl transition-colors"
                      title="Delete Video"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* COMMENT MODERATION TAB */}
          {activeTab === "comments" && (
            <div className="space-y-4">
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-white">Comment Moderation Board</h3>
              
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {comments.map((comment) => (
                  <div 
                    key={comment.id}
                    className="p-4 bg-card border border-white/5 rounded-2xl relative group/admin-comm space-y-1.5"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-white">{comment.userName}</span>
                        <span className="text-[9px] text-text-secondary">{new Date(comment.createdAt).toLocaleDateString()}</span>
                      </div>

                      <button
                        onClick={() => deleteComment(comment.id)}
                        className="p-1.5 text-text-secondary hover:text-red-500 hover:bg-white/5 rounded-lg transition-all"
                        title="Delete Comment"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>

                    <p className="text-xs text-text-secondary pr-6 leading-relaxed font-light">{comment.content}</p>
                    <div className="text-[9px] text-primary uppercase font-bold tracking-wider pt-1">
                      VIDEO ID: {comment.videoId}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DISPATCH ALERTS TAB */}
          {activeTab === "push" && (
            <div className="space-y-4">
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-white">Dispatch Global System Notification</h3>
              
              <form onSubmit={handlePushSubmit} className="space-y-4 max-w-lg">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider font-bold text-text-secondary">Notification Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Live Broadcast Starting"
                    value={pushTitle}
                    onChange={(e) => setPushTitle(e.target.value)}
                    className="w-full bg-surface border border-white/5 rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:border-primary/50 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider font-bold text-text-secondary">Message Content</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Enter notification details for dispatch..."
                    value={pushContent}
                    onChange={(e) => setPushContent(e.target.value)}
                    className="w-full bg-surface border border-white/5 rounded-xl p-3 text-xs focus:outline-none focus:border-primary/50 text-white font-light"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-500 hover:opacity-95 text-white font-bold py-3 rounded-xl text-xs transition-opacity border border-red-500/20 flex items-center justify-center gap-1.5 shadow-md"
                >
                  <BellRing size={14} />
                  <span>Send Push Alert</span>
                </button>
              </form>
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
