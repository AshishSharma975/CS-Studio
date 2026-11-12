"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  IconVolume,
  IconVolumeOff,
  IconPlayerPlay,
} from "@tabler/icons-react";

gsap.registerPlugin(ScrollTrigger);

export default function BehindTheScenes() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoFrameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const cinemaBadgeRef = useRef<HTMLDivElement>(null);
  const leftWingRef = useRef<HTMLDivElement>(null);
  const rightWingRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasSoundPrompt, setHasSoundPrompt] = useState(false);

  const syncVideos = () => {
    const main = videoRef.current;
    const bg = bgVideoRef.current;
    if (main && bg && Math.abs(bg.currentTime - main.currentTime) > 0.25) {
      bg.currentTime = main.currentTime;
    }
  };

  const playVideo = async () => {
    const video = videoRef.current;
    const bg = bgVideoRef.current;
    if (!video) return;

    try {
      // Attempt unmuted play first as requested
      video.muted = isMuted;
      video.volume = 1;
      await video.play();
      if (bg) {
        bg.muted = true;
        bg.play().catch(() => {});
      }
      setIsPlaying(true);
    } catch {
      // Browser autoplay policy fallback to muted
      video.muted = true;
      setIsMuted(true);
      setHasSoundPrompt(true);
      try {
        await video.play();
        if (bg) {
          bg.muted = true;
          bg.play().catch(() => {});
        }
        setIsPlaying(true);
      } catch {
        // Handled
      }
    }
  };

  const pauseVideo = () => {
    const video = videoRef.current;
    const bg = bgVideoRef.current;
    if (video) {
      video.pause();
      setIsPlaying(false);
    }
    if (bg) {
      bg.pause();
    }
  };

  const toggleSound = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    video.volume = 1;
    setIsMuted(nextMuted);
    setHasSoundPrompt(false);

    if (video.paused) {
      playVideo();
    }
  };

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      playVideo();
    } else {
      pauseVideo();
    }
  };

  useGSAP(
    () => {
      if (!sectionRef.current || !videoContainerRef.current) return;

      gsap.set(videoContainerRef.current, {
        scale: 0.68,
        transformOrigin: "center center",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 1.4}`,
          pin: true,
          anticipatePin: 1,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onEnter: () => playVideo(),
          onEnterBack: () => playVideo(),
          onLeave: () => pauseVideo(),
          onLeaveBack: () => pauseVideo(),
        },
      });

      // 1. Header slides up and fades out cleanly
      if (headerRef.current) {
        tl.to(
          headerRef.current,
          {
            opacity: 0,
            y: -35,
            ease: "power2.out",
            duration: 0.35,
          },
          0
        );
      }

      // 2. Video deck expands smoothly to maximum cinema deck size
      tl.fromTo(
        videoContainerRef.current,
        {
          scale: 0.68,
          borderRadius: "28px",
        },
        {
          scale: 1,
          borderRadius: "20px",
          ease: "power2.out",
          duration: 1,
        },
        0
      );

      // 3. Border, shadows and frame morph seamlessly
      if (videoFrameRef.current) {
        tl.fromTo(
          videoFrameRef.current,
          {
            borderRadius: "28px",
            borderColor: "rgba(255, 255, 255, 0.15)",
          },
          {
            borderRadius: "20px",
            borderColor: "rgba(138, 3, 3, 0.45)",
            ease: "power2.out",
            duration: 1,
          },
          0
        );
      }

      // 4. Cinema watermark overlay fades in once expanded
      if (cinemaBadgeRef.current) {
        tl.fromTo(
          cinemaBadgeRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, ease: "power2.out", duration: 0.35 },
          0.65
        );
      }

      // 5. Left and right wings fade in smoothly
      if (leftWingRef.current) {
        tl.fromTo(
          leftWingRef.current,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, ease: "power2.out", duration: 0.5 },
          0.4
        );
      }
      if (rightWingRef.current) {
        tl.fromTo(
          rightWingRef.current,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, ease: "power2.out", duration: 0.5 },
          0.4
        );
      }
    },
    { scope: sectionRef }
  );

  useEffect(() => {
    // Cleanup video playback on unmount
    return () => {
      pauseVideo();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="behind-the-scenes"
      className="relative w-full h-screen bg-[#050505] text-white overflow-hidden flex flex-col items-center justify-center select-none"
    >
      {/* Subtle cinematic ambient glow behind video card */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(138,3,3,0.15)_0%,transparent_70%)]" />

      {/* ============================================================== */}
      {/* 1. SECTION HEADER (Visible on initial arrival, fades on scroll) */}
      {/* ============================================================== */}
      <div
        ref={headerRef}
        className="absolute top-10 sm:top-14 md:top-16 z-30 flex flex-col items-center text-center px-6 pointer-events-none"
      >
        <span className="font-sans text-[9px] sm:text-[11px] tracking-[0.4em] uppercase text-[#8a0303] mb-2 font-semibold">
          [ 05 // Behind The Scenes ]
        </span>
        <h2 className="font-cinzel text-2xl sm:text-4xl md:text-5xl uppercase tracking-widest text-neutral-100 drop-shadow-2xl">
          The Art of The Shoot
        </h2>
        <p className="mt-2 text-neutral-400 font-serif italic text-xs sm:text-sm tracking-wide max-w-md">
          A real glimpse behind the lens — where every frame tells the story.
        </p>
      </div>

      {/* ============================================================== */}
      {/* 2. EXPANDING CINEMA DECK (Landscape on laptop, Vertical on mobile) */}
      {/* ============================================================== */}
      <div
        ref={videoContainerRef}
        onClick={togglePlayPause}
        className="relative z-20 flex items-center justify-center overflow-hidden cursor-pointer group w-[88vw] max-w-sm md:max-w-5xl md:w-[86vw] h-[76vh] max-h-[780px] rounded-2xl md:rounded-3xl shadow-[0_0_70px_rgba(0,0,0,0.95),0_0_40px_rgba(138,3,3,0.3)] will-change-transform origin-center border border-neutral-800/80 bg-neutral-950/95"
      >
        {/* Subtle Frame Glow */}
        <div
          ref={videoFrameRef}
          className="absolute inset-0 z-30 border border-neutral-800/80 rounded-2xl md:rounded-3xl pointer-events-none group-hover:border-[#8a0303]/60 transition-colors duration-500"
        />

        {/* Ambient Blurred Video Reflection (Desktop only, 0% overhead on mobile) */}
        <video
          ref={bgVideoRef}
          src="/assets/videos/bts-reel.mp4"
          playsInline
          loop
          muted
          aria-hidden="true"
          tabIndex={-1}
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-25 scale-110 pointer-events-none hidden md:block"
        />

        {/* Ambient Dark Gradient Overlays */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(138,3,3,0.22)_0%,rgba(10,10,10,0.85)_75%)] z-10" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/90 via-transparent to-black/90 z-10 hidden md:block" />

        {/* ============================================================ */}
        {/* LEFT WING (Desktop Landscape Cinema Info)                    */}
        {/* ============================================================ */}
        <div
          ref={leftWingRef}
          className="hidden md:flex flex-col justify-between flex-1 h-full py-8 pl-8 pr-4 z-20 select-none text-left"
        >
          <div className="flex flex-col">
            <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-[#8a0303] font-semibold">
              [ 05 // BTS REEL ]
            </span>
            <h3 className="font-cinzel text-xl lg:text-2xl uppercase tracking-wider text-neutral-100 mt-1">
              Behind The Lens
            </h3>
          </div>

          <div className="flex flex-col max-w-xs space-y-2">
            <p className="font-serif italic text-xs lg:text-sm text-neutral-300 leading-relaxed">
              “Behind every flawless wedding portrait lies raw dedication, laughter, and the relentless pursuit of perfection.”
            </p>
            <div className="h-px w-16 bg-[#8a0303]/60 my-2" />
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
              Directed by Subham Sharma
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">
              4K Cinema Archive • Korba, CG
            </span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* CENTER STAGE: PRIMARY 9:16 VERTICAL REEL (ZERO CROPPING)    */}
        {/* ============================================================ */}
        <div className="relative h-full aspect-[9/16] flex items-center justify-center overflow-hidden rounded-xl md:rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_30px_rgba(138,3,3,0.35)] border border-neutral-800/80 z-20 shrink-0">
          {/* Main Reel Video */}
          <video
            ref={videoRef}
            src="/assets/videos/bts-reel.mp4"
            playsInline
            loop
            preload="metadata"
            onTimeUpdate={syncVideos}
            className="w-full h-full object-cover object-center bg-black"
          />

          {/* Soft Vignette Overlay */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10" />

          {/* Subtle Center Play/Pause Indicator on hover/pause */}
          {!isPlaying && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-2xs transition-opacity duration-300">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#8a0303]/80 border border-white/20 flex items-center justify-center text-white shadow-[0_0_40px_rgba(138,3,3,0.8)] transform group-hover:scale-110 transition-transform duration-300">
                <IconPlayerPlay size={32} className="ml-1" />
              </div>
            </div>
          )}

          {/* Cinema Watermark Badge */}
          <div
            ref={cinemaBadgeRef}
            className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-30 flex flex-col pointer-events-none max-w-[85vw] sm:max-w-xs"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-neutral-300">
                On Set // Calcutta Studio
              </span>
            </div>
            <span className="font-cinzel text-sm sm:text-base md:text-lg uppercase tracking-wider text-white drop-shadow-lg leading-tight">
              Real Moments, Cinematic Magic
            </span>
            <span className="text-[9px] font-mono tracking-widest text-neutral-400 mt-0.5">
              BTS FILM ARCHIVE / 2026
            </span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* RIGHT WING (Desktop Landscape Cinema Controls & Notes)       */}
        {/* ============================================================ */}
        <div
          ref={rightWingRef}
          className="hidden md:flex flex-col justify-between items-end flex-1 h-full py-8 pr-8 pl-4 z-20 select-none text-right"
        >
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase mb-1">
              Audio Experience
            </span>
            <span className="text-xs font-sans text-neutral-300">
              {isMuted ? "Muted // Click to Listen" : "Stereo Sound Active"}
            </span>
          </div>

          <div className="flex flex-col items-end max-w-xs space-y-2">
            <span className="text-[9px] font-sans tracking-[0.25em] uppercase text-neutral-400">
              Scene Breakdown
            </span>
            <p className="font-cinzel text-sm lg:text-base text-neutral-200 uppercase tracking-wide">
              The Wedding Struggle
            </p>
            <p className="text-[11px] font-sans text-neutral-400 leading-normal">
              Real unscripted moments captured live during the royal bridal shoot.
            </p>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-[9px] font-mono tracking-widest text-[#8a0303] uppercase">
              Calcutta Studio Official
            </span>
            <span className="text-[10px] font-mono text-neutral-400 tracking-wider">
              © 2026 All Rights Reserved
            </span>
          </div>
        </div>

        {/* Sound Toggle Button (Always at top-right for both mobile & desktop) */}
        <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-30 flex items-center gap-2">
          <button
            type="button"
            onClick={toggleSound}
            aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
            className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/70 backdrop-blur-md border border-white/10 hover:border-[#8a0303] text-white/90 hover:text-white transition-all duration-300 text-[10px] sm:text-xs font-sans tracking-widest uppercase shadow-lg"
          >
            {isMuted ? (
              <>
                <IconVolumeOff size={15} className="text-neutral-400" />
                <span className="hidden sm:inline">Sound Off</span>
              </>
            ) : (
              <>
                <IconVolume size={15} className="text-[#25D366] animate-pulse" />
                <span className="hidden sm:inline">Sound On</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-ping" />
              </>
            )}
          </button>
        </div>

        {/* Sound Notice prompt if browser muted autoplay */}
        {hasSoundPrompt && isMuted && (
          <div
            onClick={toggleSound}
            className="absolute top-16 sm:top-20 right-4 sm:right-6 z-30 px-3 py-1 bg-red-950/80 border border-red-700/50 rounded-full text-[9px] font-sans tracking-wider text-red-200 backdrop-blur-md animate-bounce pointer-events-auto"
          >
            Tap for Audio 🔊
          </div>
        )}
      </div>
    </section>
  );
}

