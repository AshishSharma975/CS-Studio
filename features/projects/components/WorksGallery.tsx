"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { projects, ProjectCategory, Project } from "@/shared/data/projects";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "framer-motion";
import { IconX } from "@tabler/icons-react";

gsap.registerPlugin(ScrollTrigger);

type FilterType = "all" | ProjectCategory;

const filters: { label: string; value: FilterType }[] = [
  { label: "All Works", value: "all" },
  { label: "Portraits", value: "portraits" },
  { label: "Des Gothic", value: "des-gothic" },
  { label: "Monsters", value: "monster" },
  { label: "Visuals & Char", value: "visual-char" },
];

const GalleryContent = () => {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [activeCategory, setActiveCategory] = useState<FilterType>(
    categoryParam && filters.some((f) => f.value === categoryParam)
      ? (categoryParam as FilterType)
      : "all"
  );
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflowY = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setSelectedProject(null);
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
  }, [selectedProject]);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  useGSAP(
    () => {
      if (!gridRef.current) return;
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".project-card",
          { y: 50, opacity: 0, scale: 0.95 },
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
      }, gridRef);

      return () => ctx.revert();
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

      {/* Filter Tabs */}
      <div className="flex flex-nowrap items-center md:justify-center gap-6 mb-8 md:mb-24 relative z-20 overflow-x-auto scrollbar-hide -mx-4 px-8 pb-4">
        {filters.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveCategory(tab.value)}
            className={`text-xs md:text-sm font-sans tracking-[0.2em] uppercase transition-all duration-500 whitespace-nowrap ${
              activeCategory === tab.value
                ? "text-[#ff1a1a] drop-shadow-[0_0_8px_rgba(255,0,0,0.8)] scale-110"
                : "text-neutral-500 hover:text-neutral-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-x-12 md:gap-y-16 relative z-20"
      >
        {filteredProjects.map((project) => (
          <div
            key={`${project.id}-${activeCategory}`}
            className="project-card card-glow group w-full flex flex-col cursor-pointer"
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
              <span className="text-[8px] md:text-[10px] font-sans tracking-[0.3em] text-[#8a0303] uppercase mb-1 md:mb-2 text-center md:text-left">
                {project.displayCategory || project.category.replace("-", " ")}
              </span>
              <span className="text-lg md:text-2xl font-cinzel text-neutral-300 group-hover:text-white transition-colors duration-300 text-center md:text-left leading-tight">
                {project.title}
              </span>
            </div>
          </div>
        ))}
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
            {/* Close Button top-right */}
            <button
              className="absolute top-4 right-4 md:top-6 md:right-8 text-white/60 hover:text-[#ff1a1a] transition-all duration-300 z-[10000] p-2 hover:rotate-90 cursor-pointer"
              onClick={() => setSelectedProject(null)}
              title="Close"
              aria-label="Close modal"
            >
              <IconX size={32} stroke={1.5} />
            </button>

            {/* Inner Content Card (Flex column: Image on top, Text firmly inside viewport underneath) */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full max-w-4xl h-full flex flex-col items-center justify-center cursor-default gap-3 md:gap-4 py-2"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Frame: Takes flex-1 so it naturally fits remaining vertical height without overflowing */}
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

              {/* Text Info: Firmly placed below the image, guaranteed inside viewport without being cut off */}
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

