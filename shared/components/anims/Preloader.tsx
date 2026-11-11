"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [statusText, setStatusText] = useState("CALIBRATING LIGHT");

  useEffect(() => {
    // Disable scrolling while preloader is active
    document.body.style.overflowY = "hidden";
    document.body.style.overflowX = "hidden";

    const duration = 1400; // 1.4 seconds total count-up
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progressFraction = Math.min(elapsed / duration, 1);

      // Smooth custom easing curve (easeOutCubic)
      const easedProgress = Math.round((1 - Math.pow(1 - progressFraction, 3)) * 100);
      setProgress(easedProgress);

      if (easedProgress < 40) {
        setStatusText("CALIBRATING LIGHT");
      } else if (easedProgress < 85) {
        setStatusText("SUMMONING ARCHIVE");
      } else {
        setStatusText("READY");
      }

      if (progressFraction < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setTimeout(() => {
          setIsComplete(true);
          document.body.style.overflowY = "";
          document.body.style.overflowX = "hidden";
        }, 220);
      }
    };

    const animFrame = requestAnimationFrame(updateCounter);

    return () => {
      cancelAnimationFrame(animFrame);
      document.body.style.overflowY = "";
      document.body.style.overflowX = "hidden";
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {!isComplete && (
        <motion.div
          key="calcutta-preloader"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="fixed inset-0 z-[9999] bg-[#050505] text-white flex flex-col justify-between p-6 sm:p-10 md:p-14 select-none pointer-events-auto"
        >
          {/* Subtle Film Grain Noise */}
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-[0.035] mix-blend-overlay"
            style={{
              backgroundImage:
                "url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')",
            }}
          />

          {/* Atmospheric Dark Crimson Ambient Glow */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(180,10,10,0.12)_0%,transparent_70%)]" />

          {/* Top Header Bar */}
          <div className="relative z-10 flex justify-between items-center text-[10px] sm:text-xs font-sans tracking-[0.25em] uppercase text-neutral-500">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
              <span>CALCUTTA STUDIO</span>
            </div>
            <div className="tracking-[0.3em] text-neutral-600 hidden sm:block">
              PORTFOLIO ARCHIVE / 2026
            </div>
          </div>

          {/* Center Brand Showcase */}
          <div className="relative z-10 flex flex-col items-center justify-center my-auto">
            {/* Calcutta Signature Mark */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex flex-col items-center gap-3"
            >
              <Image
                src="/assets/images/calcutta-title.png"
                alt="CALCUTTA"
                width={320}
                height={70}
                priority
                className="w-48 sm:w-64 md:w-80 h-auto object-contain drop-shadow-[0_0_15px_rgba(255,20,20,0.3)]"
              />
              <span className="text-[9px] sm:text-[11px] font-sans font-medium tracking-[0.45em] text-neutral-400 uppercase">
                CALCUTTASTUDIO.IN
              </span>
            </motion.div>

            {/* Ultra-Minimal 1px Hairline Progress Bar */}
            <div className="w-44 sm:w-60 md:w-72 h-[1px] bg-neutral-900 mt-8 relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-950 via-red-500 to-white"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
          </div>

          {/* Bottom Status & Numeric Counter */}
          <div className="relative z-10 flex justify-between items-end text-[10px] sm:text-xs font-mono tracking-widest text-neutral-500">
            <div className="flex items-center gap-2 font-sans tracking-[0.2em] text-neutral-400">
              <span className="text-red-600 font-serif italic text-xs sm:text-sm">§</span>
              <span>{statusText}</span>
            </div>
            <div className="text-right text-xs sm:text-sm text-neutral-300 font-mono tracking-widest tabular-nums">
              {String(progress).padStart(2, "0")}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

