"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  IconCrown,
  IconSparkles,
  IconMovie,
  IconPalette,
  IconArrowUpRight,
} from "@tabler/icons-react";

function Counter({ from = 0, to, duration = 1.5, suffix = "" }: { from?: number; to: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * (to - from) + from));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(to);
      }
    };
    requestAnimationFrame(step);
  }, [inView, from, to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function WhyUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 35, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      id="why-us"
      ref={containerRef}
      className="relative w-full py-28 md:py-36 px-6 sm:px-8 md:px-12 lg:px-16 bg-[#050505] text-white overflow-hidden select-none"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute left-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#8a0303]/10 blur-[130px] rounded-full" />
      <div className="pointer-events-none absolute right-10 top-1/3 w-[350px] h-[350px] bg-[#8a0303]/5 blur-[100px] rounded-full" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left / Center: Interactive Floating Bento Cluster */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4"
          >
            {/* Card 1: Heritage Radar & Team Orbits (4 cols) */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              className="sm:col-span-1 md:col-span-5 relative p-6 rounded-2xl bg-neutral-950/70 border border-white/10 hover:border-[#8a0303]/60 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md overflow-hidden flex flex-col justify-between min-h-[220px] group transition-colors duration-500"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-sans tracking-[0.25em] text-[#8a0303] uppercase font-semibold">
                  [ 01 // LEGACY ]
                </span>
                <span className="text-xs text-neutral-400 group-hover:text-white transition-colors duration-300">
                  <IconArrowUpRight size={16} />
                </span>
              </div>

              {/* Orbiting concentric rings */}
              <div className="relative my-4 flex items-center justify-center h-24">
                <div className="absolute w-24 h-24 rounded-full border border-white/5 animate-[spin_20s_linear_infinite]" />
                <div className="absolute w-16 h-16 rounded-full border border-[#8a0303]/20 animate-[spin_12s_linear_infinite_reverse]" />
                <div className="relative z-10 w-12 h-12 rounded-full overflow-hidden border border-white/20 shadow-lg">
                  <Image
                    src="/assets/images/my.jpeg"
                    alt="Creative Director"
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                {/* Floating satellite dot */}
                <div className="absolute top-2 right-12 w-6 h-6 rounded-full overflow-hidden border border-[#8a0303]/60 shadow-md">
                  <Image
                    src="/assets/images/father-vijay-nandan-sharma.jpg"
                    alt="Founder"
                    fill
                    sizes="24px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div>
                <h4 className="font-cinzel text-xl text-neutral-100 font-semibold tracking-wide flex items-baseline gap-2">
                  <Counter to={28} suffix="+" />
                  <span className="text-xs font-sans text-neutral-400 font-normal uppercase tracking-wider">Years Craft</span>
                </h4>
                <p className="text-[11px] font-sans text-neutral-400 mt-1 leading-relaxed">
                  Analog mastery to digital haute couture.
                </p>
              </div>
            </motion.div>

            {/* Card 2: Couture Vertical Bridal Portrait Card (7 cols) */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              className="sm:col-span-1 md:col-span-7 relative rounded-2xl bg-neutral-950/70 border border-white/10 hover:border-[#8a0303]/60 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md overflow-hidden min-h-[220px] group transition-colors duration-500"
            >
              <Image
                src="/assets/projects/bridal/banarasi-red-rose.webp"
                alt="Haute Couture Bride"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="photo-bw-reveal object-cover object-top opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />

              <div className="relative z-10 h-full p-6 flex flex-col justify-between min-h-[220px]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-sans tracking-[0.25em] text-[#8a0303] uppercase font-semibold">
                    [ 02 // COUTURE ]
                  </span>
                  <div className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-sans uppercase tracking-widest text-neutral-300">
                    Vogue Standard
                  </div>
                </div>

                <div>
                  <h4 className="font-cinzel text-xl text-white font-medium tracking-wider">
                    High Fashion Bridal Vision
                  </h4>
                  <p className="text-[11px] font-sans text-neutral-300/90 mt-1 leading-relaxed max-w-sm">
                    Dramatic chiaroscuro lighting and regal symmetry in every frame.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Metric Pill - 1000+ Stories (4 cols) */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              className="md:col-span-4 relative p-6 rounded-2xl bg-gradient-to-br from-neutral-950 via-[#8a0303]/15 to-neutral-950 border border-white/10 hover:border-[#8a0303]/60 shadow-lg backdrop-blur-md flex flex-col justify-between min-h-[170px] group transition-colors duration-500"
            >
              <div className="flex items-center justify-between">
                <IconSparkles size={18} className="text-[#8a0303]" />
                <span className="text-[10px] font-mono uppercase text-neutral-400">Atelier Standard</span>
              </div>
              <div>
                <div className="font-cinzel text-3xl md:text-4xl text-white font-bold tracking-tight">
                  <Counter to={1000} suffix="+" />
                </div>
                <p className="text-[11px] font-sans text-neutral-300 uppercase tracking-widest mt-1">
                  Royal Stories Immortalized
                </p>
              </div>
            </motion.div>

            {/* Card 4: Rotating Craft Stamp Badge (3 cols) */}
            <motion.div
              variants={cardVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              className="md:col-span-3 relative p-4 rounded-2xl bg-neutral-950/70 border border-white/10 hover:border-[#8a0303]/60 shadow-lg backdrop-blur-md flex items-center justify-center min-h-[170px] group transition-colors duration-500"
            >
              <div className="relative w-28 h-28 flex items-center justify-center">
                {/* SVG curved spinning text */}
                <svg className="w-full h-full animate-[spin_14s_linear_infinite]" viewBox="0 0 100 100">
                  <path
                    id="stampCirclePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="text-[7.5px] font-mono uppercase fill-neutral-300 tracking-[0.22em]">
                    <textPath href="#stampCirclePath">
                      • CALCUTTA STUDIO • MASTER ATELIER • EST. 1998
                    </textPath>
                  </text>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-[#8a0303]/20 border border-[#8a0303]/40 flex items-center justify-center text-white">
                    <IconCrown size={16} className="text-white" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 5: Bespoke Film Color Science & BTS (5 cols) */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              className="md:col-span-5 relative p-6 rounded-2xl bg-neutral-950/70 border border-white/10 hover:border-[#8a0303]/60 shadow-lg backdrop-blur-md flex flex-col justify-between min-h-[170px] group transition-colors duration-500"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#8a0303]/20 border border-[#8a0303]/30 flex items-center justify-center text-[#8a0303]">
                  <IconPalette size={15} />
                </div>
                <span className="text-[10px] font-sans tracking-[0.25em] text-neutral-400 uppercase font-semibold">
                  [ 03 // COLOR SCIENCE ]
                </span>
              </div>
              <div className="mt-4">
                <h4 className="font-cinzel text-lg text-neutral-100 font-medium">
                  Custom Handcrafted Grading
                </h4>
                <p className="text-[11px] font-sans text-neutral-400 mt-1 leading-normal">
                  Velvet blacks, organic grain, and authentic Indian skin tones.
                </p>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-[9px] font-mono text-neutral-400">
                  0% Presets
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-[9px] font-mono text-neutral-400">
                  100% Bespoke
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side: The "Why Us?" Headline & Manifesto */}
          <div className="lg:col-span-4 flex flex-col justify-center lg:pl-6 space-y-6">
            <div className="flex flex-col">
              <span className="font-sans text-[10px] sm:text-xs tracking-[0.35em] uppercase text-[#8a0303] mb-3 font-semibold">
                [ 06 // THE CREATIVE EDGE ]
              </span>
              <h2 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl text-neutral-100 uppercase tracking-tight leading-none drop-shadow-xl">
                Why Us?
              </h2>
            </div>

            <div className="space-y-4">
              <p className="font-serif italic text-base sm:text-lg text-neutral-300 leading-relaxed">
                “We do not just document weddings. We craft timeless royal heirlooms with the precision of high fashion and the intimacy of raw cinema.”
              </p>
              <div className="h-px w-20 bg-[#8a0303]/60" />
              <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Founded in 1998, Calcutta Studio blends 28 years of generational heritage with cutting-edge editorial cinema — creating moments you will re-live with pride forever.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-6">
              <div className="flex flex-col">
                <span className="font-cinzel text-2xl text-white font-bold">100%</span>
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">Handcrafted Art</span>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="flex flex-col">
                <span className="font-cinzel text-2xl text-white font-bold">VIP</span>
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">On-Set Production</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
