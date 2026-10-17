
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const textTitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const title = textTitleRef.current;
    const container = containerRef.current;

    if (!title || !container) return;

    // Initial heading animation
    const tl = gsap.timeline();

    tl.fromTo(
      title,
      {
        opacity: 0,
        scale: 0.9,
        filter: "blur(10px)",
      },
      {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 2,
        ease: "power3.out",
      }
    );

    // Smooth 3D mouse movement
    const qX = gsap.quickTo(title, "x", {
      ease: "power2.out",
      duration: 1,
    });

    const qY = gsap.quickTo(title, "y", {
      ease: "power2.out",
      duration: 1,
    });

    const qRotY = gsap.quickTo(title, "rotationY", {
      ease: "power2.out",
      duration: 1,
    });

    const qRotX = gsap.quickTo(title, "rotationX", {
      ease: "power2.out",
      duration: 1,
    });

    const handleMouseMove = (e: MouseEvent) => {
      const xPos = (e.clientX / window.innerWidth - 0.5) * 2;
      const yPos = (e.clientY / window.innerHeight - 0.5) * 2;

      qX(xPos * -10);
      qY(yPos * -20);
      qRotX(yPos * -5);
      qRotY(xPos * 5);
    };

    const handleMouseLeave = () => {
      qX(0);
      qY(0);
      qRotX(0);
      qRotY(0);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      tl.kill();
      gsap.killTweensOf(title);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden text-white z-10 selection:bg-red-900"
      style={{ perspective: "1000px" }}
    >
      {/* Main Heading */}
      <div
        ref={textTitleRef}
        className="relative z-20 flex flex-col w-full max-w-7xl mx-auto px-8 md:px-16 mt-[-20vh] md:mt-[30vh] pointer-events-none"
        style={{ mixBlendMode: "difference" }}
      >
        <span className="text-7xl font-cinzel uppercase tracking-tighter text-white drop-shadow-2xl leading-[0.8] sm:text-8xl md:text-[12vw]">
          ART
        </span>

        <span className="mt-3 text-6xl font-serif italic lowercase tracking-widest text-white/90 drop-shadow-xl sm:text-7xl md:text-[8vw]">
          IS
        </span>

        <span
          className="text-8xl font-cinzel font-black italic uppercase tracking-tight text-transparent leading-[0.8] sm:text-9xl md:text-[12vw]"
          style={{
            WebkitTextStroke: "2px rgba(255,255,255,0.9)",
            filter: "drop-shadow(0 0 20px rgba(200,0,0,0.3))",
          }}
        >
          SOUL
        </span>
      </div>

      {/* Artist Information */}
      <div className="absolute inset-x-8 bottom-8 md:bottom-12 flex flex-row justify-between items-end pointer-events-none z-30 opacity-70">
        <div className="flex flex-col space-y-2">
          <span className="text-xs uppercase tracking-[0.5em] font-sans text-neutral-400">
            Digital Artist
          </span>

          <span className="font-serif text-sm italic text-red-800">
            Est. 2026
          </span>
        </div>

        <p className="text-right text-neutral-500 font-serif tracking-[10px] md:text-sm uppercase max-w-[200px] md:max-w-xs leading-relaxed">
          &quot;Draw first for yourself,
          <br />
          for half of your soul.&quot;
        </p>
      </div>
    </section>
  );
}
