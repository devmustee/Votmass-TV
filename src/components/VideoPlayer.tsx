"use client";

import React, { useRef, useState, useEffect } from "react";
import { 
  Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, 
  Settings, PictureInPicture, Subtitles, RefreshCw, X, ChevronRight 
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { Video } from "@/lib/mockData";

interface VideoPlayerProps {
  video: Video;
  onEnded?: () => void;
  autoplay?: boolean;
}

export default function VideoPlayer({ video, onEnded, autoplay = true }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { 
    playbackSpeed, setPlaybackSpeed, 
    volume, setVolume, 
    subtitlesEnabled, toggleSubtitles,
    updateHistory 
  } = useAppStore();

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [speedOpen, setSpeedOpen] = useState(false);
  
  // Auto Next states
  const [showAutoNext, setShowAutoNext] = useState(false);
  const [autoNextSeconds, setAutoNextSeconds] = useState(5);

  // Auto hide controls timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const resetTimer = () => {
      setShowControls(true);
      clearTimeout(timer);
      if (isPlaying) {
        timer = setTimeout(() => setShowControls(false), 3000);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", resetTimer);
      container.addEventListener("mouseleave", () => isPlaying && setShowControls(false));
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", resetTimer);
      }
      clearTimeout(timer);
    };
  }, [isPlaying]);

  // Handle speed and volume initialization
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
      videoRef.current.volume = volume;
      videoRef.current.muted = isMuted;
    }
  }, [playbackSpeed, volume, isMuted, video]);

  // Autoplay and seek to history progress on load
  useEffect(() => {
    if (videoRef.current) {
      const savedTime = useAppStore.getState().watchHistory[video.id];
      if (savedTime && savedTime < video.duration - 10) {
        videoRef.current.currentTime = savedTime;
        setCurrentTime(savedTime);
      }
      if (autoplay) {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  }, [autoplay, video]);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true));
      setShowAutoNext(false);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    // Periodically save history to Zustand
    if (Math.floor(videoRef.current.currentTime) % 5 === 0) {
      updateHistory(video.id, Math.floor(videoRef.current.currentTime));
    }
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const seekTime = parseFloat(e.target.value);
    videoRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    setIsMuted(vol === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const handlePip = async () => {
    if (!videoRef.current) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else if (videoRef.current.requestPictureInPicture) {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (e) {
      console.log("PIP error", e);
    }
  };

  // Video ended -> Auto Next simulation
  const handleVideoEnded = () => {
    setIsPlaying(false);
    setShowAutoNext(true);
    setAutoNextSeconds(5);
  };

  useEffect(() => {
    let countdownTimer: NodeJS.Timeout;
    if (showAutoNext && autoNextSeconds > 0) {
      countdownTimer = setTimeout(() => {
        setAutoNextSeconds(autoNextSeconds - 1);
      }, 1000);
    } else if (showAutoNext && autoNextSeconds === 0) {
      setShowAutoNext(false);
      if (onEnded) onEnded();
    }
    return () => clearTimeout(countdownTimer);
  }, [showAutoNext, autoNextSeconds, onEnded]);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/5 select-none group"
    >
      {/* HTML5 VIDEO TAG */}
      <video
        ref={videoRef}
        src={video.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleVideoEnded}
        onClick={handlePlayPause}
        className="w-full h-full object-contain cursor-pointer"
        playsInline
      />

      {/* SUBTITLES OVERLAY */}
      {subtitlesEnabled && isPlaying && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black/75 px-4 py-2 rounded-xl text-center max-w-lg border border-white/10 z-10 animate-in fade-in duration-200">
          <p className="text-sm md:text-base font-medium text-white tracking-wide">
            [Subtitles] Speaking on Governance, Youth, and National Technology Frameworks.
          </p>
        </div>
      )}

      {/* AUTO NEXT OVERLAY */}
      {showAutoNext && (
        <div className="absolute inset-0 bg-dark/95 flex flex-col items-center justify-center z-30 animate-in fade-in duration-300">
          <div className="max-w-md text-center p-6 space-y-4">
            <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Up Next</span>
            <h4 className="text-xl md:text-2xl font-extrabold text-white">Next Video Auto-playing</h4>
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-95">
                <circle cx="40" cy="40" r="32" stroke="rgba(255,255,255,0.05)" strokeWidth="4" fill="transparent" />
                <circle 
                  cx="40" cy="40" r="32" stroke="#F4510B" strokeWidth="4" fill="transparent" 
                  strokeDasharray="200" 
                  strokeDashoffset={200 - (autoNextSeconds / 5) * 200}
                  className="transition-all duration-1000"
                />
              </svg>
              <span className="absolute text-xl font-bold text-white">{autoNextSeconds}s</span>
            </div>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => setShowAutoNext(false)}
                className="px-5 py-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <X size={12} /> Cancel Play
              </button>
              <button 
                onClick={() => { setShowAutoNext(false); if (onEnded) onEnded(); }}
                className="px-5 py-2 bg-gradient-primary hover:opacity-95 text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-1"
              >
                Play Now <ChevronRight size={12} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CUSTOM PLAYER CONTROLS PANEL */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark/90 via-dark/50 to-transparent p-4 flex flex-col gap-3 transition-opacity duration-300 z-20 ${
          showControls || !isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Progress Slider bar */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-semibold font-mono text-text-secondary">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 accent-primary bg-white/10 h-1.5 rounded-full appearance-none cursor-pointer focus:outline-none"
          />
          <span className="text-[10px] font-semibold font-mono text-text-secondary">{formatTime(duration)}</span>
        </div>

        {/* Lower buttons controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            
            {/* Play/Pause */}
            <button 
              onClick={handlePlayPause}
              className="text-white hover:text-primary transition-colors focus:outline-none p-1 bg-white/5 rounded-full hover:bg-white/10"
            >
              {isPlaying ? <Pause size={18} fill="white" /> : <Play size={18} fill="white" />}
            </button>

            {/* Volume */}
            <div className="flex items-center gap-2 group/volume">
              <button onClick={toggleMute} className="text-white hover:text-primary transition-colors focus:outline-none">
                {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-white/10 rounded-full accent-primary appearance-none cursor-pointer scale-x-0 origin-left group-hover/volume:scale-x-100 transition-transform duration-200"
              />
            </div>
            
            <span className="text-[11px] font-semibold text-white/90 truncate max-w-[200px] sm:max-w-sm hidden sm:inline">
              {video.title}
            </span>
          </div>

          <div className="flex items-center gap-4">
            
            {/* Subtitles Button */}
            <button 
              onClick={toggleSubtitles}
              className={`p-1 rounded-lg transition-colors focus:outline-none ${
                subtitlesEnabled ? "bg-primary/20 text-primary" : "text-white hover:text-primary"
              }`}
              title="Toggle Captions"
            >
              <Subtitles size={18} />
            </button>

            {/* Playback speed trigger */}
            <div className="relative">
              <button 
                onClick={() => setSpeedOpen(!speedOpen)}
                className="text-white hover:text-primary transition-colors flex items-center gap-0.5 text-xs font-bold bg-white/5 hover:bg-white/10 px-2 py-1 rounded-lg"
              >
                <Settings size={14} />
                <span>{playbackSpeed}x</span>
              </button>

              {/* Speed Popover */}
              {speedOpen && (
                <div className="absolute bottom-10 right-0 w-24 bg-surface border border-white/10 rounded-xl p-1.5 shadow-2xl flex flex-col z-50">
                  {[0.5, 1.0, 1.5, 2.0].map((spd) => (
                    <button
                      key={spd}
                      onClick={() => {
                        setPlaybackSpeed(spd);
                        setSpeedOpen(false);
                      }}
                      className={`w-full py-1 text-center text-xs rounded-lg transition-colors font-bold ${
                        playbackSpeed === spd 
                          ? "bg-primary/15 text-primary" 
                          : "text-text-secondary hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Picture-in-picture */}
            <button 
              onClick={handlePip}
              className="text-white hover:text-primary transition-colors focus:outline-none"
              title="Picture in Picture"
            >
              <PictureInPicture size={18} />
            </button>

            {/* Fullscreen */}
            <button 
              onClick={toggleFullscreen}
              className="text-white hover:text-primary transition-colors focus:outline-none"
              title="Fullscreen"
            >
              {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
