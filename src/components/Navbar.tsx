"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { 
  Search, Bell, User, Film, Tv, Podcast, FileText, 
  TrendingUp, Home, Flame, LogOut, Settings, ShieldAlert,
  ChevronDown, Menu, X, Sparkles
} from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { 
    user, 
    logout, 
    toggleRole, 
    upgradeSubscription, 
    notifications, 
    markNotificationsAsRead 
  } = useAppStore();

  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  const exploreRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (exploreRef.current && !exploreRef.current.contains(target)) {
        setExploreOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(target)) {
        setProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(target)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  // Primary visible links in navbar
  const primaryLinks = [
    { name: "Home", href: "/" },
    { name: "Live TV", href: "/live" },
    { name: "Movies", href: "/movies" },
    { name: "Shorts", href: "/shorts" },
  ];

  // Secondary links in explore dropdown
  const secondaryLinks = [
    { name: "Trending", href: "/trending", icon: Flame },
    { name: "Documentaries", href: "/documentaries", icon: FileText },
    { name: "Podcasts", href: "/podcasts", icon: Podcast },
    { name: "News Desk", href: "/news", icon: FileText },
  ];

  const unreadNotifications = notifications.filter(n => !n.read);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-350 ${
      scrolled 
        ? "bg-dark/90 backdrop-blur-md border-b border-white/5 py-3 shadow-2xl" 
        : "bg-gradient-to-b from-dark/95 via-dark/40 to-transparent py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group select-none">
          <div className="relative w-9 h-9 overflow-hidden rounded-xl bg-gradient-primary p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-md shadow-primary/10">
            <div className="w-full h-full rounded-[10px] overflow-hidden bg-surface relative flex items-center justify-center">
              <Image 
                src="/logo.png" 
                alt="VOTMASS TV Logo" 
                width={32} 
                height={32} 
                className="object-cover"
                priority
              />
            </div>
          </div>
          <span className="font-extrabold text-lg tracking-wider text-white whitespace-nowrap block">
            VOTMASS <span className="text-gradient font-black">TV</span>
          </span>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 flex-grow ml-8">
          {primaryLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={`text-[13px] font-bold tracking-wide uppercase transition-colors hover:text-primary ${
                  isActive ? "text-primary font-black" : "text-text-secondary"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          {/* EXPLORE DROPDOWN */}
          <div ref={exploreRef} className="relative">
            <button
              onClick={() => setExploreOpen(!exploreOpen)}
              className={`flex items-center gap-1.5 text-[13px] font-bold tracking-wide uppercase transition-colors hover:text-primary focus:outline-none ${
                exploreOpen ? "text-primary" : "text-text-secondary"
              }`}
            >
              <span>Explore</span>
              <ChevronDown size={14} className={`transition-transform duration-250 ${exploreOpen ? "rotate-180" : ""}`} />
            </button>

            {exploreOpen && (
              <div className="absolute left-0 mt-3 w-56 bg-surface border border-white/10 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                {secondaryLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setExploreOpen(false)}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors hover:bg-white/5 hover:text-white ${
                        isActive ? "text-primary bg-primary/5" : "text-text-secondary"
                      }`}
                    >
                      <Icon size={14} className={isActive ? "text-primary" : "text-text-secondary"} />
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT AREA: SEARCH, NOTIFICATIONS, PROFILE */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          
          {/* SEARCH BAR */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-card border border-white/10 rounded-full py-1.5 pl-4 pr-10 text-xs w-40 focus:w-56 transition-all duration-300 focus:outline-none focus:border-primary/50 text-white focus:bg-surface"
            />
            <button type="submit" className="absolute right-3 text-text-secondary hover:text-primary transition-colors">
              <Search size={13} />
            </button>
          </form>

          {/* NOTIFICATION BELL */}
          <div ref={notificationsRef} className="relative">
            <button 
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setProfileOpen(false);
                setExploreOpen(false);
                if (!notificationsOpen) markNotificationsAsRead();
              }}
              className="p-2 text-text-secondary hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors relative"
            >
              <Bell size={16} />
              {mounted && unreadNotifications.length > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-dark scale-95">
                  {unreadNotifications.length}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-3 w-80 bg-surface border border-white/10 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-2">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-white">Alerts</h4>
                  <span className="text-[9px] text-text-secondary">Recent</span>
                </div>
                <div className="max-h-60 overflow-y-auto space-y-2 pr-1 scrollbar-none">
                  {notifications.length === 0 ? (
                    <p className="text-center text-text-secondary text-xs py-4">No new alerts.</p>
                  ) : (
                    notifications.map((n) => (
                      <div key={n.id} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                        <div className="flex justify-between items-start">
                          <h5 className="font-semibold text-xs text-white leading-tight">{n.title}</h5>
                          <span className="text-[8px] text-text-secondary whitespace-nowrap ml-2">{n.date}</span>
                        </div>
                        <p className="text-[11px] text-text-secondary mt-1 leading-relaxed">{n.content}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* USER PROFILE */}
          {mounted && user ? (
            <div ref={profileRef} className="relative">
              <button 
                onClick={() => {
                  setProfileOpen(!profileOpen);
                  setNotificationsOpen(false);
                  setExploreOpen(false);
                }}
                className="flex items-center gap-1.5 p-1 rounded-full bg-card border border-white/10 pl-1 pr-2.5 hover:bg-surface transition-colors duration-250 focus:outline-none"
              >
                <div className="relative w-6 h-6 rounded-full overflow-hidden border border-primary/30 bg-gradient-primary">
                  {user.avatarUrl ? (
                    <Image src={user.avatarUrl} alt="Avatar" fill className="object-cover" />
                  ) : (
                    <User size={12} className="m-auto text-white" />
                  )}
                </div>
                <ChevronDown size={10} className="text-text-secondary" />
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 mt-3 w-60 bg-surface border border-white/10 rounded-2xl shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-3 py-2.5 border-b border-white/5 mb-2">
                    <p className="font-bold text-xs text-white truncate">{user.fullName}</p>
                    <p className="text-[9px] text-text-secondary truncate mt-0.5">{user.email}</p>
                    <div className="flex items-center gap-1.5 mt-2.5">
                      <span className={`text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        user.role === "admin" 
                          ? "bg-red-500/20 text-red-400 border border-red-500/30" 
                          : "bg-primary/20 text-primary border border-primary/30"
                      }`}>
                        {user.role}
                      </span>
                      {user.subscriptionActive ? (
                        <span className="text-[8px] px-2 py-0.5 rounded-full font-bold uppercase bg-green-500/20 text-green-400 border border-green-500/30 flex items-center gap-0.5">
                          <Sparkles size={8} /> VIP
                        </span>
                      ) : (
                        <button 
                          onClick={upgradeSubscription}
                          className="text-[8px] px-2 py-0.5 rounded-full font-bold uppercase bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30 transition-colors"
                        >
                          Go VIP
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    {/* Switch role toggle button (helper for testing) */}
                    <button 
                      onClick={() => {
                        toggleRole();
                        setProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-text-secondary hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                    >
                      <ShieldAlert size={13} className="text-yellow-500 animate-pulse" />
                      <span>Switch to {user.role === "admin" ? "User" : "Admin"}</span>
                    </button>

                    <Link 
                      href="/dashboard" 
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs text-text-secondary hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                    >
                      <Settings size={13} />
                      <span>Dashboard Settings</span>
                    </Link>

                    {user.role === "admin" && (
                      <Link 
                        href="/admin" 
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/5 rounded-xl transition-colors font-semibold border border-red-500/10"
                      >
                        <ShieldAlert size={13} />
                        <span>Admin Console</span>
                      </Link>
                    )}

                    <button 
                      onClick={() => {
                        logout();
                        setProfileOpen(false);
                        router.push("/auth");
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-500 hover:text-red-400 hover:bg-white/5 rounded-xl transition-colors mt-1.5 border-t border-white/5 pt-2"
                    >
                      <LogOut size={13} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link 
              href="/auth" 
              className="bg-gradient-primary hover:opacity-95 text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-md transition-opacity"
            >
              Sign In
            </Link>
          )}

          {/* MOBILE MENU BUTTON */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-text-secondary hover:text-white rounded-full bg-white/5 lg:hidden"
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>

        </div>
      </div>

      {/* MOBILE MENU DROP DOWN */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-dark/95 border-b border-white/10 px-4 py-4 space-y-4 animate-in fade-in duration-200">
          <form onSubmit={handleSearchSubmit} className="flex items-center relative w-full mb-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-card border border-white/10 rounded-full py-2 pl-4 pr-10 text-xs w-full focus:outline-none focus:border-primary/50 text-white"
            />
            <button type="submit" className="absolute right-3 text-text-secondary hover:text-primary transition-colors">
              <Search size={13} />
            </button>
          </form>

          <div className="grid grid-cols-2 gap-2.5">
            {primaryLinks.concat(secondaryLinks).map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-center p-2.5 rounded-xl text-xs font-bold transition-colors ${
                    isActive 
                      ? "bg-primary/10 text-primary border border-primary/20" 
                      : "bg-surface/50 text-text-secondary hover:text-white border border-white/5"
                  }`}
                >
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
