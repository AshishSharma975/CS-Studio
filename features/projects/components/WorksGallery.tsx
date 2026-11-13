"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { projects, Project } from "@/shared/data/projects";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "framer-motion";
import {
  IconX,
  IconPlayerPlay,
  IconVolume,
  IconVolumeOff,
  IconChevronLeft,
  IconChevronRight,
  IconLayoutGrid,
  IconDeviceTv,
} from "@tabler/icons-react";

gsap.registerPlugin(ScrollTrigger);

type FilterType = "all" | "reels";

interface ReelItem {
  id: string;
  title: string;
  category: string;
  src: string;
  tag: string;
  duration: string;
  description: string;
  director: string;
}

const reelsData: ReelItem[] = [
  {
    id: "reel-1",
    title: "South Indian Bridal Regalia",
    category: "South Indian Bridal // Heritage Film",
    src: "/assets/videos/reel-south-indian-bridal.mp4",
    tag: "Temple Gold",
    duration: "0:20",
    description: "South Indian bridal elegance, traditional temple gold adornment & timeless moments.",
    director: "Directed by Subham Sharma",
  },
  {
    id: "reel-2",
    title: "Flawless Glam & Royal Vibes",
    category: "Royal Bridal // Calcutta Studio",
    src: "/assets/videos/reel-flawless-royal-glam.mp4",
    tag: "Royal Vibes",
    duration: "0:25",
    description: "Flawless glam, royal vibes & timeless bridal elegance captured live on set.",
    director: "Calcutta Studio Official",
  },
  {
    id: "reel-3",
    title: "The Wedding Struggle & BTS",
    category: "BTS Reel // Korba, CG",
    src: "/assets/videos/bts-reel.mp4",
    tag: "On Set",
    duration: "0:15",
    description: "Real unscripted moments captured live during the royal bridal shoot.",
    director: "Directed by Subham Sharma",
  },
  {
    id: "reel-4",
    title: "Cinematic Shringar & Reverie",
    category: "Bridal Cinema // Calcutta Studio",
    src: "/assets/videos/reference-reel.mp4",
    tag: "Master Cut",
    duration: "0:10",
    description: "Sacred bridal adornment, candlelit reflections & timeless royal poise.",
    director: "Calcutta Studio Official",
  },
  {
    id: "reel-5",
    title: "Timeless Moments of Grace",
    category: "Couture Bridal Film",
    src: "/assets/videos/reel-flawless-royal-glam.mp4",
    tag: "Couture Film",
    duration: "0:25",
    description: "Every bride deserves to feel magical — timeless royal moments in cinematic slow-motion.",
    director: "Directed by Subham Sharma",
  },
  {
    id: "reel-6",
    title: "Temple Jewels & Sacred Vows",
    category: "Traditional Film // Archive",
    src: "/assets/videos/reel-south-indian-bridal.mp4",
    tag: "Heritage Reel",
    duration: "0:20",
    description: "Sacred traditions woven through timeless light, temple jewels, and deep devotion.",
    director: "Calcutta Studio Official",
  },
];

const filters: { label: string; value: FilterType }[] = [
  { label: "All Works", value: "all" },
  { label: "Reels", value: "reels" },
];

/* 3D Smooth Cinematic Reel Carousel */
function ReelCinemaCarousel({
  reels,
  onOpenModal,
}: {
  reels: ReelItem[];
  onOpenModal: (reel: ReelItem) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const activeVideoRef = useRef<HTMLVideoElement>(null);

  const prevIndex = (currentIndex - 1 + reels.length) % reels.length;
  const nextIndex = (currentIndex + 1) % reels.length;

  const currentReel = reels[currentIndex];
  const prevReel = reels[prevIndex];
  const nextReel = reels[nextIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reels.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reels.length) % reels.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  // Keep active video playing smoothly on change
  useEffect(() => {
    const video = activeVideoRef.current;
    if (video) {
      video.currentTime = 0;
      video.muted = isMuted;
      video.play().catch(() => {
        video.muted = true;
        setIsMuted(true);
        video.play().catch(() => {});
      });
      setIsPlaying(true);
    }
  }, [currentIndex, isMuted]);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = activeVideoRef.current;
    if (!video) return;
    const next = !video.muted;
    video.muted = next;
    setIsMuted(next);
  };

  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = activeVideoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center select-none pt-2 pb-12">
      {/* 3D Stage Container */}
      <div className="relative w-full h-[68vh] sm:h-[74vh] md:h-[80vh] flex items-center justify-center overflow-visible">
        {/* Left Peek Reel (Previous) */}
        <motion.div
          key={`prev-${prevReel.id}`}
          onClick={handlePrev}
          className="absolute left-1/2 -translate-x-[115%] sm:-translate-x-[125%] md:-translate-x-[135%] top-1/2 -translate-y-1/2 z-10 w-[240px] sm:w-[280px] md:w-[320px] aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer opacity-30 sm:opacity-40 hover:opacity-75 transition-opacity duration-300 shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-white/10 hidden sm:block"
          style={{ transform: "translate(-135%, -50%) scale(0.85) perspective(1000px) rotateY(15deg)" }}
        >
          <video
            src={prevReel.src}
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute bottom-4 left-4 right-4 text-left">
            <span className="text-[8px] font-sans tracking-[0.2em] text-red-400 uppercase">
              {prevReel.tag}
            </span>
            <p className="text-xs font-cinzel text-neutral-300 truncate">{prevReel.title}</p>
          </div>
        </motion.div>

        {/* Center Active Reel (Main Stage) */}
        <motion.div
          key={`active-${currentReel.id}`}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 w-[270px] sm:w-[320px] md:w-[370px] aspect-[9/16] h-full max-h-[78vh] rounded-2xl overflow-hidden border border-red-800/60 shadow-[0_0_80px_rgba(160,10,10,0.45)] bg-black group cursor-pointer"
          onClick={() => onOpenModal(currentReel)}
        >
          <video
            ref={activeVideoRef}
            src={currentReel.src}
            loop
            playsInline
            autoPlay
            muted={isMuted}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />

          {/* Ambient Lighting & Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60 pointer-events-none group-hover:opacity-70 transition-opacity" />
          <div className="absolute inset-0 bg-[#8a0303]/10 mix-blend-color-burn pointer-events-none" />

          {/* Top Bar: Tag & Sound Toggle */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-30 pointer-events-auto">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-red-900/50 text-[10px] font-sans tracking-[0.25em] text-red-400 uppercase shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              {currentReel.tag}
            </span>

            <button
              onClick={toggleSound}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-xs font-sans tracking-wider hover:border-red-500 hover:bg-red-950/80 transition-all cursor-pointer shadow-lg"
              title={isMuted ? "Unmute sound" : "Mute sound"}
            >
              {isMuted ? (
                <>
                  <IconVolumeOff size={14} className="text-red-400" />
                  <span className="text-[10px] uppercase font-mono">Muted</span>
                </>
              ) : (
                <>
                  <IconVolume size={14} className="text-red-400" />
                  <span className="text-[10px] uppercase font-mono">Sound</span>
                </>
              )}
            </button>
          </div>

          {/* Central Play/Pause Trigger */}
          <div
            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-auto"
            onClick={togglePlayPause}
          >
            <div
              className={`w-14 h-14 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-300 shadow-[0_0_25px_rgba(0,0,0,0.8)] ${
                isPlaying
                  ? "opacity-0 group-hover:opacity-80 scale-90 group-hover:scale-100"
                  : "opacity-100 scale-100 border-red-500 bg-red-950/80"
              }`}
            >
              <IconPlayerPlay size={24} className="fill-white translate-x-0.5 text-white" />
            </div>
          </div>

          {/* Bottom Card Information */}
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 z-30 flex flex-col pointer-events-none">
            <span className="text-[9px] font-sans tracking-[0.35em] text-[#ff3333] uppercase mb-1 drop-shadow-md">
              {currentReel.category}
            </span>
            <h3 className="text-xl md:text-2xl font-cinzel text-white leading-tight drop-shadow-xl">
              {currentReel.title}
            </h3>
            <p className="text-xs text-neutral-300 font-sans mt-1.5 opacity-90 drop-shadow-md line-clamp-2">
              {currentReel.description}
            </p>
            <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-neutral-400 pt-2 border-t border-white/10">
              <span className="text-[#8a0303] uppercase tracking-wider">{currentReel.director}</span>
              <span>{currentReel.duration}</span>
            </div>
          </div>
        </motion.div>

        {/* Right Peek Reel (Next) */}
        <motion.div
          key={`next-${nextReel.id}`}
          onClick={handleNext}
          className="absolute left-1/2 translate-x-[15%] sm:translate-x-[25%] md:translate-x-[35%] top-1/2 -translate-y-1/2 z-10 w-[240px] sm:w-[280px] md:w-[320px] aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer opacity-30 sm:opacity-40 hover:opacity-75 transition-opacity duration-300 shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-white/10 hidden sm:block"
          style={{ transform: "translate(35%, -50%) scale(0.85) perspective(1000px) rotateY(-15deg)" }}
        >
          <video
            src={nextReel.src}
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute bottom-4 left-4 right-4 text-left">
            <span className="text-[8px] font-sans tracking-[0.2em] text-red-400 uppercase">
              {nextReel.tag}
            </span>
            <p className="text-xs font-cinzel text-neutral-300 truncate">{nextReel.title}</p>
          </div>
        </motion.div>
      </div>

      {/* Navigation Controls & Pagination */}
      <div className="flex items-center justify-center gap-6 mt-8 z-30">
        <button
          onClick={handlePrev}
          className="w-12 h-12 rounded-full bg-black/60 border border-white/10 hover:border-red-600 hover:bg-red-950/40 flex items-center justify-center text-white backdrop-blur-md transition-all duration-300 shadow-lg cursor-pointer hover:scale-105 active:scale-95"
          aria-label="Previous reel"
        >
          <IconChevronLeft size={22} />
        </button>

        {/* Dots Indicators */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/5">
          {reels.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                currentIndex === i
                  ? "w-8 h-2 bg-[#ff1a1a] drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]"
                  : "w-2 h-2 bg-neutral-600 hover:bg-neutral-400"
              }`}
              aria-label={`Go to reel ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-12 h-12 rounded-full bg-black/60 border border-white/10 hover:border-red-600 hover:bg-red-950/40 flex items-center justify-center text-white backdrop-blur-md transition-all duration-300 shadow-lg cursor-pointer hover:scale-105 active:scale-95"
          aria-label="Next reel"
        >
          <IconChevronRight size={22} />
        </button>
      </div>

      <div className="mt-3 text-center">
        <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest">
          {String(currentIndex + 1).padStart(2, "0")} / {String(reels.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

/* Fallback Grid View for Reels */
function ReelGridView({
  reels,
  onSelect,
}: {
  reels: ReelItem[];
  onSelect: (reel: ReelItem) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 max-w-6xl mx-auto">
      {reels.map((reel) => (
        <div
          key={reel.id}
          className="reel-card group relative aspect-[9/16] w-full rounded-2xl overflow-hidden bg-[#080808] border border-white/10 hover:border-red-600/70 cursor-pointer transition-all duration-500 hover:shadow-[0_0_35px_rgba(200,20,20,0.4)] transform-gpu hover:-translate-y-2 select-none"
          onClick={() => onSelect(reel)}
        >
          <video
            src={reel.src}
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
            onMouseLeave={(e) => {
              e.currentTarget.pause();
              e.currentTarget.currentTime = 0;
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60 pointer-events-none group-hover:opacity-60 transition-opacity duration-500" />

          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-red-900/50 text-[10px] font-sans tracking-[0.25em] text-red-400 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              {reel.tag}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-neutral-300">
              {reel.duration}
            </span>
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="w-14 h-14 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:scale-110 group-hover:border-red-500 group-hover:bg-red-950/80 transition-all duration-300 shadow-xl">
              <IconPlayerPlay size={24} className="fill-white translate-x-0.5 text-white" />
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5 z-10 flex flex-col pointer-events-none">
            <span className="text-[9px] font-sans tracking-[0.3em] text-[#ff3333] uppercase mb-1 drop-shadow-md">
              {reel.category}
            </span>
            <h4 className="text-lg md:text-xl font-cinzel text-neutral-100 group-hover:text-white transition-colors leading-tight drop-shadow-lg">
              {reel.title}
            </h4>
            <p className="text-xs text-neutral-400 font-sans line-clamp-2 mt-1.5 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
              {reel.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

const GalleryContent = () => {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [activeCategory, setActiveCategory] = useState<FilterType>(
    categoryParam === "reels" ? "reels" : "all"
  );
  const [reelDisplayMode, setReelDisplayMode] = useState<"cinema" | "grid">("cinema");

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedReel, setSelectedReel] = useState<ReelItem | null>(null);

  // Modal Reel Player States
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const [modalPlaying, setModalPlaying] = useState(true);
  const [modalMuted, setModalMuted] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when either modal is active
  useEffect(() => {
    const isModalOpen = Boolean(selectedProject || selectedReel);
    if (isModalOpen) {
      document.body.style.overflowY = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setSelectedProject(null);
          setSelectedReel(null);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflowY = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflowY = "";
    }
    return () => {
      document.body.style.overflowY = "";
    };
  }, [selectedProject, selectedReel]);

  // Handle modal video playback when selected
  useEffect(() => {
    if (selectedReel && modalVideoRef.current) {
      modalVideoRef.current.currentTime = 0;
      modalVideoRef.current.muted = modalMuted;
      modalVideoRef.current.play().catch(() => {
        if (modalVideoRef.current) {
          modalVideoRef.current.muted = true;
          setModalMuted(true);
          modalVideoRef.current.play().catch(() => {});
        }
      });
      setModalPlaying(true);
    }
  }, [selectedReel, modalMuted]);

  const toggleModalPlayPause = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const v = modalVideoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setModalPlaying(true);
    } else {
      v.pause();
      setModalPlaying(false);
    }
  };

  const toggleModalSound = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const v = modalVideoRef.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    setModalMuted(next);
  };

  // GSAP animation on tab change
  useGSAP(
    () => {
      if (!gridRef.current) return;
      if (activeCategory === "all") {
        gsap.fromTo(
          ".project-card",
          { y: 45, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.05,
            ease: "back.out(1.2)",
            overwrite: "auto",
          }
        );
      }
    },
    { scope: gridRef, dependencies: [activeCategory] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen pb-32 px-4 md:px-12 lg:px-24"
    >
      <style>{`
        .card-image-wrap {
          transition: filter 0.4s ease, transform 0.4s ease;
          will-change: filter, transform;
        }
        .card-glow .card-image-wrap {
          filter: drop-shadow(0 0 8px rgba(220, 20, 20, 0.45));
        }

        @media (max-width: 768px) {
          .card-glow .card-image-wrap {
            filter: drop-shadow(0 2px 8px rgba(180, 10, 10, 0.4));
          }
          .card-glow:hover .card-image-wrap {
            filter: drop-shadow(0 4px 12px rgba(255, 20, 20, 0.6));
          }
        }

        @media (min-width: 769px) {
          .card-glow:hover .card-image-wrap {
            filter:
              drop-shadow(0 0 8px rgba(255, 0, 0, 0.85))
              drop-shadow(0 0 24px rgba(161, 0, 0, 0.6))
              drop-shadow(0 0 50px rgba(138, 3, 3, 0.3));
          }
        }
      `}</style>

      {/* Filter Tabs: Pure typography navigation, NO dabba / border container */}
      <div className="flex items-center justify-center gap-10 md:gap-16 mb-12 md:mb-16 relative z-20">
        {filters.map((tab) => {
          const isActive = activeCategory === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => setActiveCategory(tab.value)}
              className={`relative pb-3 text-sm md:text-base font-sans tracking-[0.3em] uppercase transition-all duration-300 cursor-pointer select-none ${
                isActive
                  ? "text-[#ff1a1a] drop-shadow-[0_0_12px_rgba(255,0,0,0.8)] font-semibold scale-105"
                  : "text-neutral-500 hover:text-neutral-200"
              }`}
            >
              <span>{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeFilterUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff1a1a] to-transparent drop-shadow-[0_0_8px_rgba(255,0,0,0.9)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Active Tab Content */}
      <div ref={gridRef} className="relative z-20">
        {activeCategory === "all" ? (
          /* All Works (Photos) Grid */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-x-12 md:gap-y-16">
            {projects.map((project) => (
              <div
                key={project.id}
                className="project-card card-glow group w-full flex flex-col cursor-pointer select-none"
                onClick={() => setSelectedProject(project)}
              >
                <div className="card-image-wrap relative w-full aspect-3/4 overflow-hidden bg-[#0a0a0a]/50 border border-white/5 rounded-sm">
                  <Image
                    src={project.src}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-10 transition-opacity duration-500" />
                </div>

                <div className="mt-4 md:mt-6 flex flex-col">
                  <span className="text-[8px] md:text-[10px] font-sans tracking-[0.3em] text-[#8a0303] uppercase mb-1 md:mb-2 text-center md:text-left font-medium">
                    {project.displayCategory || project.category.replace("-", " ")}
                  </span>
                  <span className="text-lg md:text-2xl font-cinzel text-neutral-300 group-hover:text-white transition-colors duration-300 text-center md:text-left leading-tight">
                    {project.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Cinematic Reels Section with Smooth 3D Deck Animation & Mode Switcher */
          <div className="w-full flex flex-col items-center">
            {/* View Mode Switcher: 3D Cinema Stage vs Grid */}
            <div className="flex items-center justify-end w-full max-w-6xl mb-6 pr-2">
              <div className="flex items-center gap-1 p-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-md">
                <button
                  onClick={() => setReelDisplayMode("cinema")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-sans tracking-wider uppercase transition-all cursor-pointer ${
                    reelDisplayMode === "cinema"
                      ? "bg-red-950/80 text-white border border-red-600/60 shadow-[0_0_10px_rgba(255,0,0,0.4)]"
                      : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  <IconDeviceTv size={12} />
                  <span>Cinema Deck</span>
                </button>
                <button
                  onClick={() => setReelDisplayMode("grid")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-sans tracking-wider uppercase transition-all cursor-pointer ${
                    reelDisplayMode === "grid"
                      ? "bg-red-950/80 text-white border border-red-600/60 shadow-[0_0_10px_rgba(255,0,0,0.4)]"
                      : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  <IconLayoutGrid size={12} />
                  <span>Grid</span>
                </button>
              </div>
            </div>

            {reelDisplayMode === "cinema" ? (
              <ReelCinemaCarousel
                reels={reelsData}
                onOpenModal={(reel) => setSelectedReel(reel)}
              />
            ) : (
              <ReelGridView
                reels={reelsData}
                onSelect={(reel) => setSelectedReel(reel)}
              />
            )}
          </div>
        )}
      </div>

      {/* Image Modal Lightbox */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md md:backdrop-blur-2xl p-4 sm:p-6 md:p-8 cursor-zoom-out select-none"
            onClick={() => setSelectedProject(null)}
          >
            <button
              className="absolute top-4 right-4 md:top-6 md:right-8 text-white/60 hover:text-[#ff1a1a] transition-all duration-300 z-[10000] p-2 hover:rotate-90 cursor-pointer"
              onClick={() => setSelectedProject(null)}
              title="Close"
              aria-label="Close modal"
            >
              <IconX size={32} stroke={1.5} />
            </button>

            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full max-w-4xl h-full flex flex-col items-center justify-center cursor-default gap-3 md:gap-4 py-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full flex-1 min-h-0 flex items-center justify-center">
                <div className="relative w-full h-full max-h-[74vh] flex items-center justify-center shadow-[0_0_80px_rgba(138,3,3,0.25)] border border-white/5 bg-black/30 rounded-xs overflow-hidden">
                  <Image
                    src={selectedProject.src}
                    alt={selectedProject.title}
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 1024px) 95vw, 1200px"
                  />
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="w-full text-center flex flex-col items-center justify-center shrink-0 pt-1"
              >
                <p className="text-[9px] md:text-[11px] font-sans tracking-[0.4em] text-[#8a0303] uppercase font-semibold mb-1">
                  {selectedProject.displayCategory || selectedProject.category.replace("-", " ")}
                </p>
                <h4 className="text-xl sm:text-2xl md:text-3xl font-cinzel text-neutral-100 tracking-widest uppercase drop-shadow-md">
                  {selectedProject.title}
                </h4>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Reel Lightbox Modal */}
      <AnimatePresence>
        {selectedReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl md:backdrop-blur-2xl p-4 sm:p-6 select-none"
            onClick={() => setSelectedReel(null)}
          >
            {/* Top Close Button */}
            <button
              className="absolute top-4 right-4 md:top-6 md:right-8 text-white/60 hover:text-[#ff1a1a] transition-all duration-300 z-[10000] p-2 hover:rotate-90 cursor-pointer"
              onClick={() => setSelectedReel(null)}
              title="Close Reel"
              aria-label="Close reel player"
            >
              <IconX size={32} stroke={1.5} />
            </button>

            {/* Inner Reel Player Container */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full max-w-lg h-full max-h-[90vh] flex flex-col items-center justify-center cursor-default gap-3 md:gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 9:16 Vertical Video Frame with Ambient Glow */}
              <div
                className="relative aspect-[9/16] h-full max-h-[76vh] rounded-2xl overflow-hidden border border-red-900/60 shadow-[0_0_60px_rgba(138,3,3,0.5)] bg-black flex items-center justify-center group cursor-pointer"
                onClick={toggleModalPlayPause}
              >
                <video
                  ref={modalVideoRef}
                  src={selectedReel.src}
                  loop
                  playsInline
                  autoPlay
                  className="w-full h-full object-cover"
                />

                {/* Sound Toggle Button Top-Right of Video */}
                <button
                  onClick={toggleModalSound}
                  className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-xs font-sans tracking-wider hover:border-red-500 hover:bg-red-950/80 transition-all cursor-pointer"
                >
                  {modalMuted ? (
                    <>
                      <IconVolumeOff size={14} className="text-red-400" />
                      <span className="text-[10px] uppercase font-mono">Unmute</span>
                    </>
                  ) : (
                    <>
                      <IconVolume size={14} className="text-red-400" />
                      <span className="text-[10px] uppercase font-mono">Sound On</span>
                    </>
                  )}
                </button>

                {/* Tag Badge Top-Left */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-red-900/50 text-[10px] font-sans tracking-[0.2em] text-red-400 uppercase pointer-events-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  {selectedReel.tag}
                </div>

                {/* Pause/Play Overlay Icon */}
                <div
                  className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
                    modalPlaying ? "opacity-0" : "opacity-100 bg-black/40"
                  }`}
                >
                  <div className="w-16 h-16 rounded-full bg-black/70 border border-white/30 flex items-center justify-center text-white backdrop-blur-md">
                    <IconPlayerPlay size={28} className="fill-white translate-x-0.5" />
                  </div>
                </div>
              </div>

              {/* Reel Info Underneath */}
              <div className="w-full text-center flex flex-col items-center justify-center shrink-0">
                <span className="text-[9px] md:text-[10px] font-sans tracking-[0.35em] text-[#ff3333] uppercase font-semibold mb-1">
                  {selectedReel.category} • {selectedReel.director}
                </span>
                <h3 className="text-lg sm:text-xl md:text-2xl font-cinzel text-neutral-100 uppercase tracking-wider drop-shadow-md">
                  {selectedReel.title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export const WorksGallery = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <GalleryContent />
    </Suspense>
  );
};

export const WorkGallery = WorksGallery;
export default WorksGallery;
