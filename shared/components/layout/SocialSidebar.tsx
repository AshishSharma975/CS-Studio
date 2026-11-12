"use client";

import { useState, useRef, useEffect } from "react";
import {
  FaInstagram,
  FaWhatsapp,
  FaFacebook,
  FaDeviantart,
} from "react-icons/fa";
import { SiThreads } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_URL =
  "https://wa.me/918839145554?text=Hello%20Calcutta%20Studio%2C%20I%20would%20like%20to%20inquire%20about%20a%20photoshoot.";

const INSTAGRAM_PROFILES = [
  {
    label: "Calcutta Studio",
    handle: "@calcuttastudio98",
    username: "calcuttastudio98",
    tag: "Studio Page",
  },
  {
    label: "Subham Sharma",
    handle: "@sinu__5767_",
    username: "sinu__5767_",
    tag: "Owner / Director",
  },
];

const OTHER_SOCIALS = [
  {
    href: "https://www.facebook.com/motu43",
    label: "Facebook",
    Icon: FaFacebook,
  },
  {
    href: "https://www.threads.net/@ginkomegane",
    label: "Threads",
    Icon: SiThreads,
  },
  {
    href: "https://www.deviantart.com/cachetqn",
    label: "DeviantArt",
    Icon: FaDeviantart,
  },
];

const openInstagram = (username: string) => {
  if (typeof window === "undefined") return;
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const webUrl = `https://www.instagram.com/${username}/`;

  if (isMobile) {
    // Attempt deep link into Instagram Native App
    const appUrl = `instagram://user?username=${username}`;
    window.location.href = appUrl;
    // Fallback to browser if app not installed or blocked
    setTimeout(() => {
      window.open(webUrl, "_blank");
    }, 700);
  } else {
    // Laptop / Desktop opens in new browser tab directly
    window.open(webUrl, "_blank", "noopener,noreferrer");
  }
};

export const SocialSidebar = () => {
  const [isDesktopInstaOpen, setIsDesktopInstaOpen] = useState(false);
  const [isMobileInstaOpen, setIsMobileInstaOpen] = useState(false);
  const desktopCloseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleDesktopMouseEnter = () => {
    if (desktopCloseTimeout.current) clearTimeout(desktopCloseTimeout.current);
    setIsDesktopInstaOpen(true);
  };

  const handleDesktopMouseLeave = () => {
    desktopCloseTimeout.current = setTimeout(() => {
      setIsDesktopInstaOpen(false);
    }, 250);
  };

  useEffect(() => {
    return () => {
      if (desktopCloseTimeout.current) clearTimeout(desktopCloseTimeout.current);
    };
  }, []);

  return (
    <>
      {/* ============================================================== */}
      {/* DESKTOP FLOATING SIDEBAR (LEFT)                                */}
      {/* ============================================================== */}
      <aside
        className="fixed left-5 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-6"
        aria-label="Social Links"
      >
        {/* 1. Instagram with Dual-Profile Flyout Menu */}
        <div
          className="relative flex items-center"
          onMouseEnter={handleDesktopMouseEnter}
          onMouseLeave={handleDesktopMouseLeave}
        >
          <button
            type="button"
            onClick={() => setIsDesktopInstaOpen((prev) => !prev)}
            aria-label="Instagram Profiles"
            className="flex items-center justify-center w-8 h-8 rounded-full border border-neutral-800 hover:border-[#8a0303]/60 hover:bg-[#8a0303]/10 transition-all duration-300 group"
          >
            <FaInstagram
              size={16}
              className="text-neutral-500 group-hover:text-[#8a0303] group-hover:scale-110 transition-all duration-300"
            />
          </button>

          {/* Minimal Label when closed */}
          {!isDesktopInstaOpen && (
            <span className="absolute left-10 text-[9px] tracking-[0.3em] font-sans uppercase text-neutral-500 whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out pointer-events-none">
              Instagram
            </span>
          )}

          {/* Desktop Flyout Menu */}
          <AnimatePresence>
            {isDesktopInstaOpen && (
              <motion.div
                initial={{ opacity: 0, x: -8, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -8, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute left-11 top-1/2 -translate-y-1/2 w-64 p-3 bg-[#0a0a0a]/95 backdrop-blur-xl border border-neutral-800 shadow-[0_0_35px_rgba(0,0,0,0.85)] rounded-sm flex flex-col gap-2 z-50 pointer-events-auto"
              >
                <div className="flex justify-between items-center pb-1.5 border-b border-neutral-900">
                  <span className="text-[9px] font-sans tracking-[0.25em] text-[#8a0303] uppercase font-semibold">
                    Instagram Pages
                  </span>
                  <span className="text-[8px] font-mono text-neutral-600">
                    2 Profiles
                  </span>
                </div>

                <div className="flex flex-col gap-1.5">
                  {INSTAGRAM_PROFILES.map((profile) => (
                    <button
                      key={profile.username}
                      type="button"
                      onClick={() => {
                        openInstagram(profile.username);
                        setIsDesktopInstaOpen(false);
                      }}
                      className="group/item flex flex-col p-2 rounded-xs border border-transparent hover:border-[#8a0303]/40 hover:bg-[#8a0303]/10 transition-all duration-200 text-left"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-cinzel text-xs text-neutral-200 group-hover/item:text-white transition-colors">
                          {profile.label}
                        </span>
                        <span className="text-[8px] font-sans tracking-widest uppercase text-[#8a0303]/90 bg-[#8a0303]/10 px-1.5 py-0.5 rounded-xs">
                          {profile.tag}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-500 group-hover/item:text-neutral-300 transition-colors mt-0.5">
                        {profile.handle}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 2. WhatsApp Direct Link */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp Contact"
          className="group relative flex items-center"
        >
          <span className="absolute left-10 text-[9px] tracking-[0.3em] font-sans uppercase text-neutral-500 whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out pointer-events-none">
            WhatsApp
          </span>
          <span className="flex items-center justify-center w-8 h-8 rounded-full border border-neutral-800 group-hover:border-[#25D366]/50 group-hover:bg-[#25D366]/10 transition-all duration-300">
            <FaWhatsapp
              size={16}
              className="text-neutral-500 group-hover:text-[#25D366] group-hover:scale-110 transition-all duration-300"
            />
          </span>
        </a>

        {/* 3. Other Social Links (Facebook, Threads, DeviantArt) */}
        {OTHER_SOCIALS.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="group relative flex items-center"
          >
            <span className="absolute left-10 text-[9px] tracking-[0.3em] font-sans uppercase text-neutral-500 whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out pointer-events-none">
              {label}
            </span>

            <span className="flex items-center justify-center w-8 h-8 rounded-full border border-neutral-800 group-hover:border-[#8a0303]/50 group-hover:bg-[#8a0303]/10 transition-all duration-300">
              <Icon
                size={16}
                className="text-neutral-500 group-hover:text-[#8a0303] group-hover:scale-110 transition-all duration-300"
              />
            </span>
          </a>
        ))}

        <div className="w-px h-16 bg-neutral-800" />
      </aside>

      {/* ============================================================== */}
      {/* MOBILE BOTTOM NAVIGATION BAR                                   */}
      {/* ============================================================== */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden items-center justify-around py-3 px-4 bg-[#050505]/95 backdrop-blur-md border-t border-neutral-900"
        aria-label="Social Links"
      >
        {/* Mobile Instagram Button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsMobileInstaOpen((prev) => !prev)}
            aria-label="Instagram Profiles"
            className="flex items-center justify-center w-9 h-9 rounded-full border border-neutral-800 hover:border-[#8a0303]/60 transition-all duration-300"
          >
            <FaInstagram size={17} className="text-neutral-400 hover:text-[#8a0303]" />
          </button>
        </div>

        {/* Mobile WhatsApp Button */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="flex items-center justify-center w-9 h-9 rounded-full border border-neutral-800 hover:border-[#25D366]/60 transition-all duration-300"
        >
          <FaWhatsapp size={17} className="text-neutral-400 hover:text-[#25D366]" />
        </a>

        {/* Mobile Other Socials */}
        {OTHER_SOCIALS.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex items-center justify-center w-9 h-9 rounded-full border border-neutral-800 hover:border-[#8a0303]/60 transition-all duration-300"
          >
            <Icon size={16} className="text-neutral-400 hover:text-[#8a0303]" />
          </a>
        ))}
      </nav>

      {/* Mobile Instagram Modal Popup */}
      <AnimatePresence>
        {isMobileInstaOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileInstaOpen(false)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs md:hidden"
            />

            {/* Popup Card */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-20 left-4 right-4 z-50 p-4 bg-[#0a0a0a] border border-neutral-800 shadow-[0_0_50px_rgba(0,0,0,0.95)] rounded-md flex flex-col gap-3 md:hidden"
            >
              <div className="flex justify-between items-center pb-2 border-b border-neutral-900">
                <span className="text-[10px] font-sans tracking-[0.25em] text-[#8a0303] uppercase font-semibold">
                  Select Instagram Page
                </span>
                <button
                  type="button"
                  onClick={() => setIsMobileInstaOpen(false)}
                  className="text-neutral-500 hover:text-white text-xs font-mono px-2 py-1"
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {INSTAGRAM_PROFILES.map((profile) => (
                  <button
                    key={profile.username}
                    type="button"
                    onClick={() => {
                      openInstagram(profile.username);
                      setIsMobileInstaOpen(false);
                    }}
                    className="flex flex-col p-3 rounded-xs border border-neutral-900 bg-neutral-950/60 active:border-[#8a0303] active:bg-[#8a0303]/10 text-left"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-cinzel text-sm text-neutral-200">
                        {profile.label}
                      </span>
                      <span className="text-[9px] font-sans tracking-widest uppercase text-[#8a0303] bg-[#8a0303]/10 px-2 py-0.5 rounded-xs">
                        {profile.tag}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-neutral-500 mt-1">
                      {profile.handle}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
