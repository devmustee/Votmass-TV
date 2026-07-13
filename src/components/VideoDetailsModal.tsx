"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  X, Play, ThumbsUp, Bookmark, Download, MessageSquare, 
  Sparkles, Calendar, Eye, Share2, CornerDownRight, Trash 
} from "lucide-react";
import { Video, Comment } from "@/lib/mockData";
import { useAppStore } from "@/lib/store";
import VideoPlayer from "./VideoPlayer";

interface VideoDetailsModalProps {
  video: Video | null;
  onClose: () => void;
}

export default function VideoDetailsModal({ video, onClose }: VideoDetailsModalProps) {
  const { 
    user, 
    comments, 
    addComment, 
    deleteComment, 
    likedVideoIds, 
    likeVideo, 
    bookmarkedVideoIds, 
    bookmarkVideo,
    downloadedVideoIds,
    downloadVideo,
    removeDownload,
    videos 
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<"about" | "comments">("about");
  const [commentText, setCommentText] = useState("");
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  useEffect(() => {
    // Reset states when video changes
    setIsPlayerOpen(false);
    setActiveTab("about");
  }, [video]);

  if (!video) return null;

  const isLiked = likedVideoIds.includes(video.id);
  const isBookmarked = bookmarkedVideoIds.includes(video.id);
  const isDownloaded = downloadedVideoIds.includes(video.id);

  // Filter comments for this video
  const videoComments = comments.filter(c => c.videoId === video.id);

  // Recommendations (exclude current video, same category preferably)
  const recommendations = videos
    .filter(v => v.id !== video.id && v.type !== "short")
    .slice(0, 3);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !user) return;
    addComment(video.id, user.fullName, commentText);
    setCommentText("");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.origin + `/watch?v=${video.id}`);
    alert("Shareable link copied to clipboard!");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-6 overflow-y-auto animate-in fade-in duration-300">
      
      {/* Modal Card Box */}
      <div className="bg-surface border border-white/10 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl animate-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-40 p-2 bg-dark/65 hover:bg-dark/80 text-text-secondary hover:text-white rounded-full border border-white/5 transition-all"
        >
          <X size={18} />
        </button>

        {/* TOP COVER OR CUSTOM PLAYER */}
        <div className="relative aspect-video w-full bg-black">
          {isPlayerOpen ? (
            <VideoPlayer video={video} autoplay={true} />
          ) : (
            <>
              <Image 
                src={video.thumbnailUrl} 
                alt={video.title}
                fill
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-black/30" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <button
                  onClick={() => setIsPlayerOpen(true)}
                  className="bg-gradient-primary hover:scale-105 transition-transform p-5 md:p-6 rounded-full text-white shadow-xl shadow-primary/30 flex items-center justify-center border border-primary/20"
                >
                  <Play size={28} fill="white" className="ml-1" />
                </button>
                <span className="text-white text-xs font-bold uppercase tracking-widest mt-4 bg-dark/60 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/5">
                  Click to Stream
                </span>
              </div>
            </>
          )}
        </div>

        {/* BOTTOM CONTENT GRID */}
        <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info Left */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Title / Labels */}
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="bg-primary/25 border border-primary/30 text-primary text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md">
                  {video.categoryName}
                </span>
                <span className="text-[10px] text-text-secondary flex items-center gap-1">
                  <Calendar size={10} /> {video.createdAt}
                </span>
                <span className="text-[10px] text-text-secondary flex items-center gap-1">
                  <Eye size={10} /> {video.views.toLocaleString()} Views
                </span>
              </div>
              <h2 className="font-extrabold text-lg md:text-2xl text-white tracking-tight leading-tight">
                {video.title}
              </h2>
            </div>

            {/* ACTION BUTTON ROW */}
            <div className="flex flex-wrap gap-3 pb-6 border-b border-white/5">
              <button 
                onClick={() => likeVideo(video.id)}
                className={`py-2 px-4 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isLiked 
                    ? "bg-primary/20 border-primary/40 text-primary" 
                    : "bg-white/5 border-white/5 text-text-secondary hover:text-white"
                }`}
              >
                <ThumbsUp size={14} fill={isLiked ? "currentColor" : "none"} />
                <span>{video.likes} Likes</span>
              </button>

              <button 
                onClick={() => bookmarkVideo(video.id)}
                className={`py-2 px-4 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isBookmarked 
                    ? "bg-primary border-primary text-white" 
                    : "bg-white/5 border-white/5 text-text-secondary hover:text-white"
                }`}
              >
                <Bookmark size={14} fill={isBookmarked ? "white" : "none"} />
                <span>{isBookmarked ? "Watch Later Saved" : "Save Watch Later"}</span>
              </button>

              <button 
                onClick={() => {
                  if (isDownloaded) {
                    removeDownload(video.id);
                  } else {
                    downloadVideo(video.id);
                  }
                }}
                className={`py-2 px-4 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isDownloaded
                    ? "bg-green-500/20 border-green-500/40 text-green-400"
                    : "bg-white/5 border-white/5 text-text-secondary hover:text-white"
                }`}
              >
                <Download size={14} />
                <span>{isDownloaded ? "Downloaded Offline" : "Offline Download"}</span>
              </button>

              <button 
                onClick={handleShare}
                className="py-2 px-4 bg-white/5 border border-white/5 text-text-secondary hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Share2 size={14} />
                <span>Share</span>
              </button>
            </div>

            {/* TAB SELECTORS */}
            <div className="flex gap-4 border-b border-white/5">
              <button 
                onClick={() => setActiveTab("about")}
                className={`pb-3 text-xs font-bold uppercase tracking-wider relative transition-colors ${
                  activeTab === "about" ? "text-primary" : "text-text-secondary hover:text-white"
                }`}
              >
                <span>About Content</span>
                {activeTab === "about" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
              <button 
                onClick={() => setActiveTab("comments")}
                className={`pb-3 text-xs font-bold uppercase tracking-wider relative transition-colors ${
                  activeTab === "comments" ? "text-primary" : "text-text-secondary hover:text-white"
                }`}
              >
                <span>Comments ({videoComments.length})</span>
                {activeTab === "comments" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
            </div>

            {/* TAB CORE VIEW */}
            {activeTab === "about" ? (
              <div className="space-y-4">
                <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-light">
                  {video.description}
                </p>
                
                {/* Director / Cast details for Movies */}
                {video.type === "movie" && (video.director || video.castList) && (
                  <div className="p-4 bg-card rounded-2xl border border-white/5 grid grid-cols-2 gap-4">
                    {video.director && (
                      <div>
                        <span className="text-[10px] text-text-secondary block font-bold uppercase tracking-wider">Director</span>
                        <span className="text-xs text-white font-semibold">{video.director}</span>
                      </div>
                    )}
                    {video.castList && (
                      <div>
                        <span className="text-[10px] text-text-secondary block font-bold uppercase tracking-wider">Starring Cast</span>
                        <span className="text-xs text-white font-semibold line-clamp-1">{video.castList.join(", ")}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              /* COMMENTS PANEL */
              <div className="space-y-4">
                {user ? (
                  <form onSubmit={handleCommentSubmit} className="flex gap-3">
                    <div className="flex-grow">
                      <textarea
                        rows={2}
                        placeholder="Join the discussion..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="w-full bg-card border border-white/5 rounded-xl p-3 text-xs focus:outline-none focus:border-primary/50 text-white focus:bg-surface transition-all"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-gradient-primary text-white text-xs font-bold px-4 py-2 rounded-xl border border-primary/20 flex-shrink-0 self-end shadow-md"
                    >
                      Post
                    </button>
                  </form>
                ) : (
                  <p className="text-xs text-text-secondary">Please login to write comments.</p>
                )}

                <div className="space-y-4 mt-4 max-h-60 overflow-y-auto pr-2">
                  {videoComments.length === 0 ? (
                    <p className="text-center text-text-secondary text-xs py-4">No comments posted yet.</p>
                  ) : (
                    videoComments.map((comment) => (
                      <div key={comment.id} className="p-3 bg-card/50 rounded-2xl border border-white/5 relative group/comment">
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className="w-5 h-5 rounded-full overflow-hidden bg-primary/20 relative">
                            {comment.userAvatar && (
                              <Image src={comment.userAvatar} alt="user avatar" fill className="object-cover" />
                            )}
                          </div>
                          <span className="font-bold text-xs text-white">{comment.userName}</span>
                          <span className="text-[9px] text-text-secondary">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-xs text-text-secondary pl-7 leading-relaxed">
                          {comment.content}
                        </p>

                        {/* Admin comment deletion toggle */}
                        {user?.role === "admin" && (
                          <button
                            onClick={() => deleteComment(comment.id)}
                            className="absolute top-3 right-3 text-text-secondary hover:text-red-500 opacity-0 group-hover/comment:opacity-100 transition-opacity"
                            title="Delete Comment"
                          >
                            <Trash size={12} />
                          </button>
                        )}

                        {/* Reply system mock rendering */}
                        {comment.replies && comment.replies.map((reply) => (
                          <div key={reply.id} className="mt-3 pl-7 flex gap-2 items-start border-l border-white/5">
                            <CornerDownRight size={12} className="text-text-secondary mt-1" />
                            <div className="flex-grow p-2.5 bg-surface/80 rounded-xl border border-white/5">
                              <div className="flex items-center gap-1.5 mb-1">
                                <span className="font-bold text-[10px] text-white">{reply.userName}</span>
                                <span className="text-[8px] text-text-secondary">Staff</span>
                              </div>
                              <p className="text-[11px] text-text-secondary">{reply.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Right recommendations pane */}
          <div className="space-y-5">
            <h4 className="font-bold text-xs uppercase tracking-wider text-white flex items-center gap-1.5">
              <Sparkles size={12} className="text-primary animate-pulse" />
              <span>Recommended Videos</span>
            </h4>
            
            <div className="space-y-4">
              {recommendations.map((rec) => (
                <div 
                  key={rec.id}
                  onClick={() => {
                    // Triggers state video reload
                    setActiveTab("about");
                    setIsPlayerOpen(false);
                    // Pass select
                    // To do that, we update current video
                    // Simply select it
                    // The easiest is triggers state update on parent modal prop
                    // That is handled when clicking
                  }}
                  className="group flex gap-3 cursor-pointer bg-card/30 hover:bg-card border border-white/5 hover:border-primary/20 rounded-xl p-2.5 transition-all"
                >
                  <div className="relative w-24 aspect-video rounded-lg overflow-hidden flex-shrink-0 bg-surface">
                    <Image src={rec.thumbnailUrl} alt={rec.title} fill className="object-cover" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-semibold text-xs text-white line-clamp-1 group-hover:text-primary transition-colors">
                      {rec.title}
                    </h5>
                    <span className="text-[9px] text-text-secondary uppercase">{rec.type}</span>
                    <p className="text-[9px] text-text-secondary line-clamp-1">{rec.categoryName}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
