"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Radio, Compass, Shield, Mail, Phone, Heart, Globe, Tv } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#08090B] border-t border-white/5 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-gradient-primary p-[1.5px]">
                <div className="w-full h-full rounded-[7px] bg-surface relative flex items-center justify-center">
                  <Image 
                    src="/logo.png" 
                    alt="Votmass Logo" 
                    width={28} 
                    height={28} 
                    className="object-cover"
                  />
                </div>
              </div>
              <span className="font-extrabold text-lg tracking-wider text-white">
                VOTMASS <span className="text-gradient font-black">TV</span>
              </span>
            </Link>
            <p className="text-xs text-text-secondary leading-relaxed">
              VOTMASS TV is a next generation digital media and online television platform focusing on leadership, governance, youth development, education, and premium digital streaming content.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2 bg-surface hover:bg-primary/20 hover:text-primary transition-all duration-300 rounded-lg text-text-secondary border border-white/5">
                <Globe size={14} />
              </a>
              <a href="#" className="p-2 bg-surface hover:bg-primary/20 hover:text-primary transition-all duration-300 rounded-lg text-text-secondary border border-white/5">
                <Tv size={14} />
              </a>
              <a href="#" className="p-2 bg-surface hover:bg-primary/20 hover:text-primary transition-all duration-300 rounded-lg text-text-secondary border border-white/5">
                <Instagram size={14} />
              </a>
            </div>
          </div>

          {/* Column 2: Categories */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <Radio size={14} className="text-primary" />
              <span>Channels</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-text-secondary">
              <li><Link href="/movies" className="hover:text-primary transition-colors">Movies & Series</Link></li>
              <li><Link href="/documentaries" className="hover:text-primary transition-colors">Documentaries</Link></li>
              <li><Link href="/podcasts" className="hover:text-primary transition-colors">Votmass Podcasts</Link></li>
              <li><Link href="/live" className="hover:text-primary transition-colors">24/7 Live Stream</Link></li>
              <li><Link href="/shorts" className="hover:text-primary transition-colors">Votmass Shorts</Link></li>
            </ul>
          </div>

          {/* Column 3: Policy / About */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <Compass size={14} className="text-primary" />
              <span>Platform</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-text-secondary">
              <li><Link href="/#about" className="hover:text-primary transition-colors">About VOTMASS TV</Link></li>
              <li><Link href="/#faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/dashboard" className="hover:text-primary transition-colors">Member Dashboard</Link></li>
              <li><Link href="/auth" className="hover:text-primary transition-colors">Sign In / Register</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <Shield size={14} className="text-primary" />
              <span>Contact Desk</span>
            </h4>
            <div className="space-y-2 text-xs text-text-secondary">
              <div className="flex items-center gap-2">
                <Mail size={12} className="text-primary" />
                <span>support@votmasstv.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={12} className="text-primary" />
                <span>+234 (0) 800 VOTMASS</span>
              </div>
            </div>
            <div className="p-3 bg-surface rounded-xl border border-white/5 text-[11px] text-text-secondary leading-relaxed">
              <span className="font-semibold text-white block mb-1">Administrative Office:</span>
              Votmass TV Tower, Central Business District. Only administrators can publish video uploads.
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-text-secondary">
            &copy; {new Date().getFullYear()} VOTMASS TV Network. All Rights Reserved. Built as a high performance Progressive Web App.
          </p>
          <p className="text-[10px] text-text-secondary flex items-center gap-1">
            Empowering Youth & Governance with <Heart size={10} className="text-primary fill-primary animate-pulse" /> globally.
          </p>
        </div>
      </div>
    </footer>
  );
}
