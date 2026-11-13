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
    duration: "0:20",
    description: "South Indian bridal elegance, traditional temple gold adornment & timeless moments.",
    director: "Directed by Subham Sharma",
  },
  {
    id: "reel-2",
    title: "Flawless Glam & Royal Vibes",
    tags: ["Royal Vibes", "Calcutta Studio", "Bridal Glam"],
    category: "Royal Bridal // Calcutta Studio",
    src: "/assets/videos/reel-flawless-royal-glam.mp4",
    duration: "0:25",
    description: "Flawless glam, royal vibes & timeless bridal elegance captured live on set.",
    director: "Calcutta Studio Official",
  },
  {
    id: "reel-3",
    title: "The Wedding Struggle & BTS",
    tags: ["On Set", "Unscripted", "Korba, CG"],
    category: "BTS Reel // Korba, CG",
    src: "/assets/videos/bts-reel.mp4",
    duration: "0:15",
    description: "Real unscripted moments captured live during the royal bridal shoot.",
    director: "Directed by Subham Sharma",
  },
  {
    id: "reel-4",
    title: "Cinematic Shringar & Reverie",
    tags: ["Master Cut", "Candlelit", "Bridal Cinema"],
    category: "Bridal Cinema // Calcutta Studio",
    src: "/assets/videos/reference-reel.mp4",
    duration: "0:10",
    description: "Sacred bridal adornment, candlelit reflections & timeless royal poise.",
    director: "Calcutta Studio Official",
  },
  {
    id: "reel-5",
    title: "Timeless Moments of Grace",
    tags: ["Couture Film", "Slow Motion", "4K Archive"],
    category: "Couture Bridal Film",
    src: "/assets/videos/reel-flawless-royal-glam.mp4",
    duration: "0:25",
    description: "Every bride deserves to feel magical — timeless royal moments in cinematic slow-motion.",
    director: "Directed by Subham Sharma",
  },
  {
    id: "reel-6",
    title: "Temple Jewels & Sacred Vows",
    tags: ["Heritage Reel", "Tradition", "Sacred Vows"],
    category: "Traditional Film // Archive",
    src: "/assets/videos/reel-south-indian-bridal.mp4",
    duration: "0:20",
    description: "Sacred traditions woven through timeless light, temple jewels, and deep devotion.",
    director: "Calcutta Studio Official",
  },
];

const filters: { label: string; value: FilterType }[] = [
  { label: "All Works", value: "all" },
  { label: "Reels", value: "reels" },
];

/* Exact Reference Video Accordion Reel Item */
function EditorialReelRow({
  reel,
  isActive,
  onActivate,
  onOpenModal,
}: {
  reel: ReelItem;
  isActive: boolean;
  onActivate: () => void;
  onOpenModal: (reel: ReelItem) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Play video when active, pause when inactive
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isActive) {
      video.muted = isMuted;
      video.play().catch(() => {
        video.muted = true;
        setIsMuted(true);
        video.play().catch(() => {});
      });
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isActive, isMuted]);

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
      className={`border-b border-white/10 transition-colors duration-500 ${
        isActive ? "bg-black/40" : "hover:bg-white/[0.02]"
      }`}
      onMouseEnter={onActivate}
    >
      {/* Clickable Header Row: Big Typography Title + Pill Tags */}
      <div
        className="w-full py-8 md:py-12 px-2 sm:px-4 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none group"
        onClick={onActivate}
      >
        <div className="flex items-baseline gap-4 md:gap-6 flex-wrap">
          <h3
            className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-sans tracking-tight transition-all duration-500 font-light ${
              isActive
                ? "text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.4)] translate-x-2"
                : "text-neutral-400 group-hover:text-neutral-200"
            }`}
          >
            {reel.title}
          </h3>

          {/* Tags in Pill Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            {reel.tags.map((tag, i) => (
              <span
                key={i}
                className={`text-[9px] sm:text-[10px] md:text-xs font-sans px-2.5 py-0.5 rounded-full border transition-all duration-300 ${
                  isActive
                    ? "border-red-600/70 text-red-300 bg-red-950/30"
                    : "border-white/10 text-neutral-500 group-hover:border-white/20 group-hover:text-neutral-400"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <span className="text-xs md:text-sm font-mono text-neutral-500 tracking-widest shrink-0 self-end md:self-center">
          {reel.duration}
        </span>
      </div>

      {/* Smooth Expanding Accordion Content with 3-Dot Browser/Cinema Window */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden px-2 sm:px-4 pb-10"
          >
            {/* Window Container with Top Bar Dots matching reference */}
            <div className="relative w-full max-w-4xl mx-auto rounded-xl overflow-hidden border border-white/10 bg-[#070707] shadow-[0_0_50px_rgba(138,3,3,0.35)]">
              {/* Window Header Bar with 3 Dots */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.03] backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                </div>
                <span className="text-[10px] md:text-xs font-mono text-neutral-400 uppercase tracking-widest">
                  {reel.category}
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleSound}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-white/15 text-neutral-300 hover:text-white hover:border-red-500 transition-all text-[10px] font-sans tracking-wider uppercase cursor-pointer"
                  >
                    {isMuted ? (
                      <>
                        <IconVolumeOff size={13} className="text-red-400" />
                        <span>Muted</span>
                      </>
                    ) : (
                      <>
                        <IconVolume size={13} className="text-red-400" />
                        <span>Sound</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => onOpenModal(reel)}
                    className="p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                    title="Fullscreen Cinema View"
                  >
                    <IconMaximize size={15} />
                  </button>
                </div>
              </div>

              {/* Video Player Display */}
              <div
                className="relative w-full h-[52vh] sm:h-[62vh] md:h-[70vh] bg-black flex items-center justify-center cursor-pointer group"
                onClick={() => onOpenModal(reel)}
              >
                <video
                  ref={videoRef}
                  src={reel.src}
                  loop
                  playsInline
                  autoPlay
                  muted={isMuted}
                  className="w-full h-full object-contain md:object-cover"
                />

                {/* Subtle Hover Play Badge */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="w-14 h-14 rounded-full bg-black/70 border border-white/30 flex items-center justify-center text-white backdrop-blur-md shadow-2xl">
                    <IconPlayerPlay size={24} className="fill-white translate-x-0.5" />
                  </div>
                </div>

                {/* Bottom Details Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col md:flex-row md:items-end justify-between gap-2 pointer-events-none">
                  <div>
                    <p className="text-xs md:text-sm text-neutral-300 font-sans max-w-lg leading-relaxed">
                      {reel.description}
                    </p>
                    <span className="text-[10px] font-mono text-[#8a0303] uppercase tracking-wider mt-1 block">
                      {reel.director}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                    Tap to expand 4K modal
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
          /* Cinematic Reels Section: Exact Editorial Expanding Accordion List from Reference Video */
          <div className="w-full max-w-6xl mx-auto flex flex-col border-t border-white/10">
            {reelsData.map((reel) => (
              <EditorialReelRow
                key={reel.id}
                reel={reel}
                isActive={activeReelId === reel.id}
                onActivate={() => setActiveReelId(reel.id)}
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
            <button
              className="absolute top-4 right-4 md:top-6 md:right-8 text-white/60 hover:text-[#ff1a1a] transition-all duration-300 z-[10000] p-2 hover:rotate-90 cursor-pointer"
              onClick={() => setSelectedReel(null)}
              title="Close Reel"
              aria-label="Close reel player"
            >
              <IconX size={32} stroke={1.5} />
            </button>

            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full max-w-lg h-full max-h-[90vh] flex flex-col items-center justify-center cursor-default gap-3 md:gap-4"
              onClick={(e) => e.stopPropagation()}
            >
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
