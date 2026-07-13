"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Tv, Radio, Users, Bell, Sparkles, Send, 
  MessageSquare, Play, HelpCircle, Calendar 
} from "lucide-react";
import MainLayout from "@/components/MainLayout";
import { useAppStore } from "@/lib/store";
import { LIVE_SCHEDULE, LiveProgram } from "@/lib/mockData";
import VideoPlayer from "@/components/VideoPlayer";

interface ChatMessage {
  id: string;
  userName: string;
  avatar?: string;
  message: string;
  time: string;
}

export default function LivePage() {
  const { user, addNotification } = useAppStore();
  const [reminders, setReminders] = useState<string[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: "1", userName: "Aisha Yusuf", message: "VOTMASS TV stream quality is so smooth today! 🔥", time: "16:30" },
    { id: "2", userName: "Chinedu Okafor", message: "Excited for the Tech Incubator news review.", time: "16:31" },
    { id: "3", userName: "Sarah Connor", message: "Is the Youth Summit recorded?", time: "16:32" },
  ]);
  const [typedMessage, setTypedMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Live program selection
  const currentLiveProgram = LIVE_SCHEDULE.find((p) => p.isActive);
  const upcomingPrograms = LIVE_SCHEDULE.filter((p) => !p.isActive);

  // Live stream source mock
  const liveVideoMock = {
    id: "live-stream-source",
    title: currentLiveProgram ? currentLiveProgram.title : "Votmass TV News Desk Live",
    description: "24/7 Live Stream of Votmass TV Network broadcasts.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&auto=format&fit=crop",
    categoryId: "cat-1",
    categoryName: "Live TV",
    type: "video" as const,
    duration: 3600,
    views: 4501,
    featured: true,
    trending: true,
    createdAt: "Live Now",
    likes: 853,
    commentsCount: 94
  };

  // Simulate rolling comments in live chat
  useEffect(() => {
    const randomUsers = ["Tayo Alao", "Evelyn Smith", "Kabir Musa", "Blessing Nwachukwu", "David Jones"];
    const randomTexts = [
      "We need more dialogues on leadership role models.",
      "VOTMASS setting high standards!",
      "Great analysis from the anchors.",
      "The green tech documentary was top notch.",
      "Hello from Abuja! 🇳🇬",
      "Is the youth funding bill passed yet?"
    ];

    const chatInterval = setInterval(() => {
      const randomUser = randomUsers[Math.floor(Math.random() * randomUsers.length)];
      const randomText = randomTexts[Math.floor(Math.random() * randomTexts.length)];
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

      setChatMessages((prev) => [
        ...prev.slice(-20), // limit chat history cache length
        {
          id: Date.now().toString(),
          userName: randomUser,
          message: randomText,
          time: timeStr,
        },
      ]);
    }, 4500);

    return () => clearInterval(chatInterval);
  }, []);

  // Auto scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim() || !user) return;
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

    setChatMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        userName: user.fullName,
        message: typedMessage,
        time: timeStr,
      },
    ]);
    setTypedMessage("");
  };

  const toggleReminder = (program: LiveProgram) => {
    if (reminders.includes(program.id)) {
      setReminders(reminders.filter((id) => id !== program.id));
      addNotification("Reminder Cancelled", `You have cancelled the alert for "${program.title}".`);
    } else {
      setReminders([...reminders, program.id]);
      addNotification("Reminder Program Scheduled", `We will send you a push alert when "${program.title}" goes LIVE.`);
    }
  };

  return (
    <MainLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: LIVE STREAM VIDEO & CURRENT SHOW */}
        <div className="lg:col-span-2 space-y-6">
          {/* Livestream Player Wrapper */}
          <div className="relative">
            <VideoPlayer video={liveVideoMock} autoplay={true} />
            <div className="absolute top-4 left-4 z-20 flex gap-2">
              <span className="bg-red-600 animate-pulse text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border border-red-500/20 flex items-center gap-1 shadow-lg shadow-red-600/25">
                <span className="w-1.5 h-1.5 bg-white rounded-full" /> LIVE
              </span>
              <span className="bg-dark/85 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-1 rounded-md border border-white/5 flex items-center gap-1">
                <Users size={10} /> 1,420 Watching
              </span>
            </div>
          </div>

          {/* Current broadcast title info */}
          <div className="p-6 bg-card rounded-3xl border border-white/5 space-y-3">
            <div className="flex justify-between items-start gap-4">
              <div>
                <span className="text-[10px] text-primary uppercase font-bold tracking-widest flex items-center gap-1">
                  <Radio size={10} /> CURRENT BROADCAST SHOW
                </span>
                <h2 className="font-extrabold text-xl text-white mt-1 leading-tight">
                  {currentLiveProgram ? currentLiveProgram.title : "VOTMASS News Hour Desk"}
                </h2>
                <span className="text-[10px] text-text-secondary font-semibold font-mono block mt-1.5">
                  {currentLiveProgram ? currentLiveProgram.time : "04:00 PM - 05:30 PM"}
                </span>
              </div>
              <span className="text-[10px] uppercase font-bold text-green-400 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full shrink-0">
                ACTIVE
              </span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed font-light">
              {currentLiveProgram ? currentLiveProgram.description : "Live coverages of breaking national developments."}
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: LIVE CHAT STREAM */}
        <div className="bg-card border border-white/5 rounded-3xl h-[600px] flex flex-col overflow-hidden shadow-2xl">
          {/* Chat Header */}
          <div className="p-4 border-b border-white/5 bg-surface/50 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MessageSquare size={16} className="text-primary" />
              <span className="font-bold text-xs uppercase tracking-wider text-white">Interactive Live Chat</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-none">
            {chatMessages.map((msg) => (
              <div key={msg.id} className="text-xs leading-relaxed">
                <span className="text-text-secondary font-mono font-medium text-[9px] mr-1.5">{msg.time}</span>
                <span className="font-bold text-primary mr-1.5 hover:underline cursor-pointer">{msg.userName}:</span>
                <span className="text-white/95">{msg.message}</span>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input form */}
          {user ? (
            <form onSubmit={handleSendMessage} className="p-3 border-t border-white/5 bg-surface flex gap-2">
              <input
                type="text"
                placeholder="Message live chat..."
                value={typedMessage}
                onChange={(e) => setTypedMessage(e.target.value)}
                className="flex-grow bg-card border border-white/5 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-primary/50 text-white"
              />
              <button
                type="submit"
                className="p-2.5 bg-gradient-primary text-white rounded-xl flex items-center justify-center border border-primary/25 shadow-md"
              >
                <Send size={12} />
              </button>
            </form>
          ) : (
            <div className="p-3 text-center text-text-secondary text-xs bg-surface border-t border-white/5">
              Please sign in to join live chat.
            </div>
          )}
        </div>

      </div>

      {/* LOWER SECTION: UPCOMING BROADCASTS SCHEDULE */}
      <section className="mt-12 border-t border-white/5 pt-12">
        <div className="flex items-center gap-2 mb-6">
          <Calendar size={16} className="text-primary" />
          <h3 className="font-extrabold text-sm uppercase tracking-wider text-white">Daily Program Guide</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingPrograms.map((prog) => {
            const hasReminder = reminders.includes(prog.id);
            return (
              <div 
                key={prog.id} 
                className="p-5 bg-card border border-white/5 hover:border-primary/25 rounded-2xl transition-all flex flex-col justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-[10px] font-bold font-mono text-text-secondary bg-white/5 border border-white/5 px-2 py-0.5 rounded">
                      {prog.time}
                    </span>
                    <span className="text-[9px] text-text-secondary">{prog.duration}</span>
                  </div>
                  <h4 className="font-extrabold text-sm text-white leading-snug line-clamp-1">{prog.title}</h4>
                  <p className="text-[11px] text-text-secondary font-light line-clamp-2 leading-relaxed">
                    {prog.description}
                  </p>
                </div>

                <button
                  onClick={() => toggleReminder(prog)}
                  className={`w-full py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all ${
                    hasReminder
                      ? "bg-primary border-primary text-white"
                      : "bg-surface border-white/5 text-text-secondary hover:text-white hover:bg-card"
                  }`}
                >
                  <Bell size={12} fill={hasReminder ? "white" : "none"} />
                  <span>{hasReminder ? "Active Reminder" : "Set Reminder Alert"}</span>
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </MainLayout>
  );
}
