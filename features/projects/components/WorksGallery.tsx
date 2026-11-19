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
  IconMaximize,
} from "@tabler/icons-react";

gsap.registerPlugin(ScrollTrigger);

type FilterType = "all" | "reels";

interface ReelItem {
  id: string;
  title: string;
  tags: string[];
  category: string;
  src: string;
  duration: string;
  description: string;
  director: string;
}

const reelsData: ReelItem[] = [
  {
    id: "reel-1",
    title: "South Indian Bridal Regalia",
    tags: ["Temple Gold", "Heritage Film", "South Indian"],
    category: "South Indian Bridal // Heritage Film",
    src: "/assets/videos/reel-south-indian-bridal.mp4",
    duration: "0:36",
    description: "South Indian bridal elegance, traditional temple gold adornment & timeless moments.",
    director: "Directed by Subham Sharma",
  },
  {
    id: "reel-2",
    title: "Flawless Glam & Royal Vibes",
    tags: ["Royal Vibes", "Calcutta Studio", "Bridal Glam"],
    category: "Royal Bridal // Calcutta Studio",
    src: "/assets/videos/reel-flawless-royal-glam.mp4",
    duration: "0:48",
    description: "Flawless glam, royal vibes & timeless bridal elegance captured live on set.",
    director: "Calcutta Studio Official",
  },
  {
    id: "reel-3",
    title: "The Wedding Struggle & BTS",
    tags: ["On Set", "Unscripted", "Korba, CG"],
    category: "BTS Reel // Korba, CG",
    src: "/assets/videos/bts-reel.mp4",
    duration: "0:47",
    description: "Real unscripted moments captured live during the royal bridal shoot.",
    director: "Directed by Subham Sharma",
  },
  {
    id: "reel-4",
    title: "Pure Elegance & Luminous Glam",
    tags: ["Luminous Skin", "Soft Glam", "Bridal Glow"],
    category: "Bridal Glam // Soft Radiance",
    src: "/assets/videos/reel-pure-elegance-bridal.mp4",
    duration: "0:27",
    description: "Pure elegance beautifully crafted — luminous glass skin, soft glam & timeless bridal grace.",
    director: "Calcutta Studio Official",
  },
  {
    id: "reel-5",
    title: "The Master Angle & BTS Reveal",
    tags: ["BTS Perspective", "Cinematic Reveal", "Studio Set"],
    category: "Behind The Scenes // Studio Cut",
    src: "/assets/videos/reel-angle-transformation.mp4",
    duration: "0:24",
    description: "Spontaneous studio perspective, unscripted moments & the breathtaking final look.",
    director: "Directed by Subham Sharma",
  },
  {
    id: "reel-6",
    title: "Classic Temple Bride & Lotus Glow",
    tags: ["Temple Vows", "Lotus Shringar", "Heritage"],
    category: "Heritage Bride // Calcutta Studio",
    src: "/assets/videos/reel-classic-south-indian.mp4",
    duration: "0:43",
    description: "A classic South Indian bridal moment — intricate temple jewels and divine radiance.",
    director: "Calcutta Studio Official",
  },
  {
    id: "reel-7",
    title: "Festive Splendor & Navratri Couture",
    tags: ["Festive Couture", "Kovastraa", "Garba Glam"],
    category: "Festive Couture // Motion Edit",
    src: "/assets/videos/reel-navratri-festive.mp4",
    duration: "0:36",
    description: "Vibrant festive elegance and traditional couture captured in cinematic motion.",
    director: "Photography & Edit by Calcutta Studio",
  },
];

const filters: { label: string; value: FilterType }[] = [
  { label: "All Works", value: "all" },
  { label: "Reels", value: "reels" },
];

/* Exact Reference Video Accordion Reel Item: Hover-to-expand, Zero-Reflow CSS Grid Transition */
function EditorialReelRow({
  reel,
  isActive,
  onHover,
  onSelect,
  onOpenModal,
}: {
  reel: ReelItem;
  isActive: boolean;
  onHover: () => void;
  onSelect: () => void;
  onOpenModal: (reel: ReelItem) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const hoverTimer = useRef<NodeJS.Timeout | null>(null);

  // Play video smoothly when active, pause when inactive (no DOM remounting)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isActive) {
      video.muted = isMuted;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => {});
        });
      }
    } else {
      video.pause();
    }
  }, [isActive, isMuted]);

  const handleMouseEnter = () => {
    // Only expand on hover on desktop devices with mouse pointer (prevents mobile touch conflict)
    if (typeof window !== "undefined") {
      const isTouchOrMobile =
        window.innerWidth < 1024 ||
        window.matchMedia("(hover: none), (pointer: coarse)").matches;
      if (isTouchOrMobile) return;
    }
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    // 45ms hover intent debounce: snappy response, zero stutter during rapid scroll
    hoverTimer.current = setTimeout(() => {
      onHover();
    }, 45);
  };

  const handleMouseLeave = () => {
    if (typeof window !== "undefined") {
      const isTouchOrMobile =
        window.innerWidth < 1024 ||
        window.matchMedia("(hover: none), (pointer: coarse)").matches;
      if (isTouchOrMobile) return;
    }
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const next = !video.muted;
    video.muted = next;
    setIsMuted(next);
  };

  return (
    <div
      className={`border-b border-white/10 transition-colors duration-300 ${
        isActive ? "bg-white/[0.02]" : "hover:bg-white/[0.01]"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header Row: Refined luxury proportions, opens on hover (desktop) and instant click (mobile) */}
      <div
        role="button"
        tabIndex={0}
        aria-expanded={isActive}
        className="w-full py-4 sm:py-5 md:py-6 px-2 sm:px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none group touch-manipulation active:bg-white/[0.04] transition-colors"
        onClick={onSelect}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect();
          }
        }}
      >
        <div className="flex items-center gap-3 md:gap-4 flex-wrap pointer-events-none">
          <h3
            className={`text-xl sm:text-2xl md:text-3xl font-cinzel tracking-normal transition-all duration-300 ${
              isActive
                ? "text-white drop-shadow-[0_0_12px_rgba(255,50,50,0.35)] translate-x-1"
                : "text-neutral-400 group-hover:text-neutral-200"
            }`}
          >
            {reel.title}
          </h3>

          {/* Tags in Pill Badges */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {reel.tags.map((tag, i) => (
              <span
                key={i}
                className={`text-[9px] sm:text-[10px] font-sans px-2.5 py-0.5 rounded-full border transition-all duration-300 ${
                  isActive
                    ? "border-red-600/60 text-red-300 bg-red-950/30"
                    : "border-white/10 text-neutral-500 group-hover:border-white/20 group-hover:text-neutral-400"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 self-end sm:self-center shrink-0 pointer-events-none">
          <span className="text-xs font-mono text-neutral-500 tracking-wider">
            {reel.duration}
          </span>
          <span
            className={`text-xs text-neutral-500 transition-transform duration-300 ${
              isActive ? "rotate-90 text-red-500" : "group-hover:translate-x-1"
            }`}
          >
            →
          </span>
        </div>
      </div>

      {/* Buttery-Smooth Zero-Reflow CSS Grid Accordion */}
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 pointer-events-none"
        }`}
      >
        <div className="overflow-hidden min-h-0">
          <div className="px-2 sm:px-4 pb-8 pt-1">
            {/* Window Container with Compact Reference Scale */}
            <div className="relative w-full max-w-xl mx-auto rounded-xl overflow-hidden border border-white/10 bg-[#080808] shadow-[0_0_35px_rgba(180,20,20,0.25)]">
              {/* Window Header Bar with 3 Dots */}
              <div className="flex items-center justify-between px-3.5 py-2 border-b border-white/10 bg-white/[0.03]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600/90" />
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                </div>
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest truncate max-w-[180px] sm:max-w-none">
                  {reel.category}
                </span>
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={toggleSound}
                    className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/60 border border-white/15 text-neutral-300 hover:text-white hover:border-red-500 transition-all text-[10px] font-sans tracking-wider uppercase cursor-pointer"
                  >
                    {isMuted ? (
                      <>
                        <IconVolumeOff size={11} className="text-red-400" />
                        <span className="hidden sm:inline">Muted</span>
                      </>
                    ) : (
                      <>
                        <IconVolume size={11} className="text-red-400" />
                        <span className="hidden sm:inline">Sound</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenModal(reel);
                    }}
                    className="p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                    title="Fullscreen Cinema View"
                  >
                    <IconMaximize size={13} />
                  </button>
                </div>
              </div>

              {/* Video Player Display: Centered 9:16 vertical reel inside cinema stage */}
              <div
                className="relative w-full h-[320px] sm:h-[370px] md:h-[400px] bg-black flex items-center justify-center cursor-pointer group overflow-hidden"
                onClick={() => onOpenModal(reel)}
              >
                {/* Pure CSS Radial Gradient (Replaces heavy blurred video for 120 FPS smoothness) */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(180,20,20,0.22)_0%,rgba(5,5,5,0.92)_72%,#000000_100%)] pointer-events-none" />

                {/* Main Centered Reel Video */}
                <video
                  ref={videoRef}
                  src={reel.src}
                  loop
                  playsInline
                  preload="metadata"
                  muted={isMuted}
                  className="relative z-10 h-full w-auto aspect-[9/16] object-cover rounded-md shadow-2xl"
                />

                {/* Subtle Hover Play Badge */}
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="w-11 h-11 rounded-full bg-black/75 border border-white/30 flex items-center justify-center text-white backdrop-blur-md shadow-2xl">
                    <IconPlayerPlay size={18} className="fill-white translate-x-0.5" />
                  </div>
                </div>

                {/* Bottom Details Overlay */}
                <div className="absolute inset-x-0 bottom-0 z-20 p-3 sm:p-3.5 bg-gradient-to-t from-black via-black/85 to-transparent flex items-end justify-between gap-2 pointer-events-none">
                  <div>
                    <p className="text-xs text-neutral-300 font-sans max-w-sm leading-snug line-clamp-1">
                      {reel.description}
                    </p>
                    <span className="text-[9px] font-mono text-[#ff2a2a] uppercase tracking-wider block mt-0.5">
                      {reel.director}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest shrink-0">
                    Tap for 4K
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const GalleryContent = () => {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [activeCategory, setActiveCategory] = useState<FilterType>(
    categoryParam === "reels" ? "reels" : "all"
  );
  const [activeReelId, setActiveReelId] = useState<string>("reel-1");

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
      document.body.classList.add("modal-open");
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setSelectedProject(null);
          setSelectedReel(null);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflowY = "";
        document.body.classList.remove("modal-open");
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflowY = "";
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.style.overflowY = "";
      document.body.classList.remove("modal-open");
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

  // Auto color center cards on mobile scroll in /works via zero-reflow IntersectionObserver
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth >= 1024) return;
    const cards = document.querySelectorAll<HTMLElement>(".project-card");
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const img = entry.target.querySelector<HTMLElement>(".photo-bw-reveal");
          img?.classList.toggle("is-in-center", entry.isIntersecting);
        });
      },
      { rootMargin: "-20% 0px -20% 0px", threshold: 0.1 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [activeCategory]);

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

  // GSAP animation for Photos on tab change
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
      <div className="flex items-center justify-center gap-12 md:gap-20 mb-14 md:mb-20 relative z-20">
        {filters.map((tab) => {
          const isActive = activeCategory === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => setActiveCategory(tab.value)}
              className={`relative pb-3 text-base md:text-lg font-sans tracking-[0.3em] uppercase transition-all duration-300 cursor-pointer select-none ${
                isActive
                  ? "text-[#ff1a1a] drop-shadow-[0_0_14px_rgba(255,0,0,0.85)] font-semibold scale-105"
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
                    className="photo-bw-reveal object-cover group-hover:scale-105"
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
          /* Cinematic Reels Section: Exact Editorial Expanding Accordion List from Reference Video */
          <div className="w-full max-w-4xl mx-auto flex flex-col border-t border-white/10">
            {reelsData.map((reel) => (
              <EditorialReelRow
                key={reel.id}
                reel={reel}
                isActive={activeReelId === reel.id}
                onHover={() => setActiveReelId(reel.id)}
                onSelect={() =>
                  setActiveReelId((prev) => (prev === reel.id ? "" : reel.id))
                }
                onOpenModal={(r) => setSelectedReel(r)}
              />
            ))}
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
            className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md md:backdrop-blur-2xl p-4 pt-14 pb-14 sm:pb-8 md:p-8 cursor-zoom-out select-none"
            onClick={() => setSelectedProject(null)}
          >
            <button
              className="absolute top-5 right-5 md:top-8 md:right-10 text-white/90 hover:text-white bg-black/80 hover:bg-red-950/90 border border-white/20 hover:border-red-500 rounded-full p-2.5 transition-all duration-300 z-[100001] cursor-pointer shadow-2xl backdrop-blur-md hover:scale-105"
              onClick={() => setSelectedProject(null)}
              title="Close"
              aria-label="Close modal"
            >
              <IconX size={24} stroke={2} />
            </button>

            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full max-w-4xl h-full flex flex-col items-center justify-center cursor-default gap-2.5 sm:gap-3 md:gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full flex-1 min-h-0 flex items-center justify-center">
                <div className="relative w-full h-full max-h-[60vh] sm:max-h-[68vh] md:max-h-[74vh] flex items-center justify-center shadow-[0_0_80px_rgba(138,3,3,0.25)] border border-white/5 bg-black/30 rounded-xs overflow-hidden">
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
                className="w-full text-center flex flex-col items-center justify-center shrink-0 pt-1 pb-1"
              >
                <p className="text-[9px] sm:text-[10px] md:text-[11px] font-sans tracking-[0.35em] text-[#ff3333] uppercase font-semibold mb-1">
                  {selectedProject.displayCategory || selectedProject.category.replace("-", " ")}
                </p>
                <h4 className="text-lg sm:text-2xl md:text-3xl font-cinzel text-neutral-100 tracking-widest uppercase drop-shadow-md">
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
            className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl md:backdrop-blur-2xl p-4 pt-14 pb-14 sm:pb-6 select-none"
            onClick={() => setSelectedReel(null)}
          >
            <button
              className="absolute top-5 right-5 md:top-8 md:right-10 text-white/90 hover:text-white bg-black/80 hover:bg-red-950/90 border border-white/20 hover:border-red-500 rounded-full p-2.5 transition-all duration-300 z-[100001] cursor-pointer shadow-2xl backdrop-blur-md hover:scale-105"
              onClick={() => setSelectedReel(null)}
              title="Close Reel"
              aria-label="Close reel player"
            >
              <IconX size={24} stroke={2} />
            </button>

            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full max-w-lg h-full max-h-[90vh] flex flex-col items-center justify-center cursor-default gap-2.5 md:gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="relative aspect-[9/16] h-full max-h-[62vh] sm:max-h-[70vh] md:max-h-[76vh] rounded-2xl overflow-hidden border border-red-900/60 shadow-[0_0_60px_rgba(138,3,3,0.5)] bg-black flex items-center justify-center group cursor-pointer"
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

              <div className="w-full text-center flex flex-col items-center justify-center shrink-0 pt-1 pb-1">
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
