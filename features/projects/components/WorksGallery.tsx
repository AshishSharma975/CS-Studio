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
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md md:backdrop-blur-2xl p-4 md:p-12 cursor-zoom-out"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full h-[70vh] md:h-full max-w-5xl max-h-[85vh] cursor-default flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-0 right-0 md:-right-12 md:top-0 text-white/50 hover:text-[#ff1a1a] transition-all duration-300 z-[10000] p-4 md:p-2 hover:rotate-90"
                onClick={() => setSelectedProject(null)}
                title="Close"
              >
                <IconX size={32} stroke={1.5} />
              </button>

              <div className="relative w-full h-full shadow-[0_0_100px_rgba(138,3,3,0.2)] border border-white/5 bg-black/20">
                <Image
                  src={selectedProject.src}
                  alt={selectedProject.title}
                  fill
                  className="object-contain"
                  priority
                  sizes="100vw"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-4 md:bottom-[-80px] left-0 w-full text-center pointer-events-none px-6 py-4 md:p-0 bg-black/40 md:bg-transparent backdrop-blur-md md:backdrop-blur-none"
              >
                <p className="text-[8px] md:text-[10px] font-sans tracking-[0.4em] text-[#8a0303] uppercase mb-1 drop-shadow-sm">
                  {selectedProject.displayCategory || selectedProject.category.replace("-", " ")}
                </p>
                <h4 className="text-xl md:text-3xl font-cinzel text-neutral-200 tracking-widest uppercase drop-shadow-md">
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

