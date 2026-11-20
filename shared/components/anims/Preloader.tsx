"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(true);
  const [statusText, setStatusText] = useState("CALIBRATING LIGHT");

  useEffect(() => {
    // Show only once per browser session
    if (sessionStorage.getItem("cs_visited")) return;
    setIsComplete(false);

    document.body.style.overflow = "hidden";

    const duration = 650;
    const startTime = performance.now();
    let completeTimer: ReturnType<typeof setTimeout> | null = null;

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progressFraction = Math.min(elapsed / duration, 1);
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
        completeTimer = setTimeout(() => {
          setIsComplete(true);
          sessionStorage.setItem("cs_visited", "1");
          document.body.style.overflow = "";
        }, 120);
      }
    };

    const animFrame = requestAnimationFrame(updateCounter);

    return () => {
      cancelAnimationFrame(animFrame);
      if (completeTimer) clearTimeout(completeTimer);
      document.body.style.overflow = "";
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
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] bg-[#050505] text-white flex flex-col justify-between p-6 sm:p-10 md:p-14 select-none pointer-events-auto"
        >
          <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(180,10,10,0.12)_0%,transparent_70%)]" />

          <div className="relative z-10 flex justify-between items-center text-[10px] sm:text-xs font-sans tracking-[0.25em] uppercase text-neutral-500">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
              <span>CALCUTTA STUDIO</span>
            </div>
            <div className="tracking-[0.3em] text-neutral-600 hidden sm:block">
              PORTFOLIO ARCHIVE / 2026
            </div>
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center my-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
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

            <div className="w-44 sm:w-60 md:w-72 h-[1px] bg-neutral-900 mt-8 relative overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-950 via-red-500 to-white transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

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

