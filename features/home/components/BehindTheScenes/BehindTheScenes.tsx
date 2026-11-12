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
  const ambientVideoRef = useRef<HTMLVideoElement>(null);
  const cinemaBadgeRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasSoundPrompt, setHasSoundPrompt] = useState(false);

  const playVideo = async () => {
    const video = videoRef.current;
    const ambient = ambientVideoRef.current;
    if (!video) return;

    try {
      // Attempt unmuted play first as requested
      video.muted = isMuted;
      video.volume = 1;
      await video.play();
      setIsPlaying(true);
      if (ambient) {
        ambient.currentTime = video.currentTime;
        ambient.play().catch(() => {});
      }
    } catch {
      // Browser autoplay policy might block unmuted audio without prior direct click
      // Gracefully fallback to muted and surface sound toggle indicator
      video.muted = true;
      setIsMuted(true);
      setHasSoundPrompt(true);
      try {
        await video.play();
        setIsPlaying(true);
        if (ambient) {
          ambient.currentTime = video.currentTime;
          ambient.play().catch(() => {});
        }
      } catch {
        // Handled
      }
    }
  };

  const pauseVideo = () => {
    const video = videoRef.current;
    const ambient = ambientVideoRef.current;
    if (video) {
      video.pause();
      setIsPlaying(false);
    }
    if (ambient) {
      ambient.pause();
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

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 1.8}`,
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
            y: -40,
            ease: "power2.out",
            duration: 0.35,
          },
          0
        );
      }

      // 2. Video container expands from compact preview card to 100vw x 100vh full-screen bleed
      tl.to(
        videoContainerRef.current,
        {
          width: "100vw",
          height: "100vh",
          maxWidth: "100vw",
          maxHeight: "100vh",
          borderRadius: "0px",
          ease: "power2.inOut",
          duration: 1,
        },
        0
      );

      // 3. Border, shadows and frame morph seamlessly into immersive cinema
      if (videoFrameRef.current) {
        tl.to(
          videoFrameRef.current,
          {
            borderRadius: "0px",
            borderColor: "transparent",
            boxShadow: "none",
            ease: "power2.inOut",
            duration: 0.8,
          },
          0.15
        );
      }

      // 4. Cinema watermark overlay fades in once full-screen
      if (cinemaBadgeRef.current) {
        tl.fromTo(
          cinemaBadgeRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, ease: "power2.out", duration: 0.35 },
          0.7
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
      {/* ============================================================== */}
      {/* 1. AMBIENT BLURRED BACKDROP (Awwwards Cinema Glow)              */}
      {/* ============================================================== */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <video
          ref={ambientVideoRef}
          src="/assets/videos/bts-reel.mp4"
          playsInline
          muted
          loop
          className="w-full h-full object-cover opacity-20 blur-3xl scale-125 transform-gpu"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#050505]/70 to-[#050505]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(180,10,10,0.12)_0%,transparent_70%)]" />
      </div>

      {/* ============================================================== */}
      {/* 2. SECTION HEADER (Visible on initial arrival, fades on scroll) */}
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
      {/* 3. EXPANDING VIDEO CARD CONTAINER                               */}
      {/* ============================================================== */}
      <div
        ref={videoContainerRef}
        onClick={togglePlayPause}
        className="relative z-20 flex items-center justify-center overflow-hidden cursor-pointer group w-[85vw] sm:w-[65vw] md:w-[48vw] lg:w-[40vw] max-w-4xl h-[55vh] sm:h-[62vh] md:h-[68vh] rounded-2xl md:rounded-3xl"
        style={{
          boxShadow: "0 0 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(180, 20, 20, 0.25)",
        }}
      >
        {/* Frame Border with subtle hover glow */}
        <div
          ref={videoFrameRef}
          className="absolute inset-0 z-20 border border-neutral-800/80 rounded-2xl md:rounded-3xl pointer-events-none group-hover:border-[#8a0303]/60 transition-colors duration-500"
        />

        {/* Video Element */}
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
          className="absolute bottom-6 sm:bottom-10 left-6 sm:left-12 z-30 flex flex-col pointer-events-none"
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-sans tracking-[0.3em] uppercase text-neutral-300">
              On Set // Calcutta Studio
            </span>
          </div>
          <span className="font-cinzel text-lg sm:text-2xl md:text-3xl uppercase tracking-wider text-white drop-shadow-lg">
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

