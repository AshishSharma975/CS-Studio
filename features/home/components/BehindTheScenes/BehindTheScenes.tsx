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
  const cinemaBadgeRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasSoundPrompt, setHasSoundPrompt] = useState(false);

  const playVideo = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      // Attempt unmuted play first as requested
      video.muted = isMuted;
      video.volume = 1;
      await video.play();
      setIsPlaying(true);
    } catch {
      // Browser autoplay policy fallback to muted
      video.muted = true;
      setIsMuted(true);
      setHasSoundPrompt(true);
      try {
        await video.play();
        setIsPlaying(true);
      } catch {
        // Handled
      }
    }
  };

  const pauseVideo = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      setIsPlaying(false);
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
      video.play().catch(() => {});
      setIsPlaying(true);
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
        scale: 0.65,
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

      // 2. Video container expands smoothly to maximum cinema size (locked 9:16 aspect ratio, zero cropping)
      tl.fromTo(
        videoContainerRef.current,
        {
          scale: 0.65,
          borderRadius: "28px",
        },
        {
          scale: 1,
          borderRadius: "18px",
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
            borderRadius: "18px",
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
      {/* 2. EXPANDING VIDEO CARD CONTAINER                               */}
      {/* ============================================================== */}
      <div
        ref={videoContainerRef}
        onClick={togglePlayPause}
        className="relative z-20 flex items-center justify-center overflow-hidden cursor-pointer group aspect-[9/16] h-[82vh] max-h-[85vh] max-w-[90vw] rounded-2xl md:rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.95),0_0_35px_rgba(180,20,20,0.3)] will-change-transform origin-center"
      >
        {/* Frame Border with subtle hover glow */}
        <div
          ref={videoFrameRef}
          className="absolute inset-0 z-20 border border-neutral-800/80 rounded-2xl md:rounded-3xl pointer-events-none group-hover:border-[#8a0303]/60 transition-colors duration-500"
        />

        {/* Video Element (720x1280 9:16 vertical video matches 9:16 container with zero cropping) */}
        <video
          ref={videoRef}
          src="/assets/videos/bts-reel.mp4"
          playsInline
          loop
          preload="metadata"
          className="w-full h-full object-cover object-center bg-black"
        />

        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10" />

        {/* ============================================================ */}
        {/* 4. CONTROLS OVERLAY (Sound Pill & Play/Pause)                */}
        {/* ============================================================ */}
        <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-30 flex items-center gap-2">
          {/* Sound Toggle Button */}
          <button
            type="button"
            onClick={toggleSound}
            aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
            className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:border-[#8a0303] text-white/90 hover:text-white transition-all duration-300 text-[10px] sm:text-xs font-sans tracking-widest uppercase shadow-lg"
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

        {/* Subtle Center Play/Pause Indicator on hover/pause */}
        {!isPlaying && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-2xs transition-opacity duration-300">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#8a0303]/80 border border-white/20 flex items-center justify-center text-white shadow-[0_0_40px_rgba(138,3,3,0.8)] transform group-hover:scale-110 transition-transform duration-300">
              <IconPlayerPlay size={32} className="ml-1" />
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 5. CINEMA WATERMARK BADGE (Fades in when full screen)        */}
        {/* ============================================================ */}
        <div
          ref={cinemaBadgeRef}
          className="absolute bottom-4 sm:bottom-8 left-4 sm:left-10 z-30 flex flex-col pointer-events-none max-w-[85vw] sm:max-w-md"
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-sans tracking-[0.3em] uppercase text-neutral-300">
              On Set // Calcutta Studio
            </span>
          </div>
          <span className="font-cinzel text-base sm:text-xl md:text-2xl uppercase tracking-wider text-white drop-shadow-lg">
            Real Moments, Cinematic Magic
          </span>
          <span className="text-[9px] sm:text-[11px] font-mono tracking-widest text-neutral-400 mt-0.5">
            BTS FILM ARCHIVE / 2026
          </span>
        </div>
      </div>
    </section>
  );
}

