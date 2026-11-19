"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !leftColRef.current || !rightColRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%",
          end: "bottom bottom",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        leftColRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
      ).fromTo(
        rightColRef.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: "power2.out" },
        "-=0.8"
      );
    },
    { scope: containerRef }
  );

  // Auto-reveal real color when brother's photo enters screen center on mobile
  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkCenter = () => {
      if (!leftColRef.current) return;
      const r = leftColRef.current.getBoundingClientRect();
      const cy = window.innerHeight / 2;
      const midY = r.top + r.height / 2;
      const img = leftColRef.current.querySelector(".photo-bw-reveal");
      if (Math.abs(cy - midY) < r.height * 0.55) {
        img?.classList.add("is-in-center");
      } else {
        img?.classList.remove("is-in-center");
      }
    };

    window.addEventListener("scroll", checkCenter, { passive: true });
    window.addEventListener("resize", checkCenter, { passive: true });
    const timer = setTimeout(checkCenter, 150);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", checkCenter);
      window.removeEventListener("resize", checkCenter);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative z-10 flex min-h-screen w-full items-center overflow-hidden py-20 text-white selection:bg-red-900"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-2 md:gap-10 md:px-12 lg:gap-16 lg:px-24">
        {/* Left image column (Brother / Sinu's Photo) */}
        <div
          ref={leftColRef}
          className="relative flex aspect-[3/4] w-full items-center justify-center opacity-0 md:aspect-auto md:h-[80vh]"
        >
          <div className="group relative ml-auto mr-0 h-[90%] w-full max-w-sm overflow-hidden rounded-2xl border border-white/15 bg-[#0a0a0a] shadow-2xl md:mr-8 lg:mr-12">
            <Image
              src="/assets/images/my.jpeg"
              alt="Subham Sharma (Sinu) — Creative Director"
              fill
              priority
              className="photo-bw-reveal object-cover object-top group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

            <div className="absolute top-4 right-4 z-10">
              <span className="text-[8px] font-mono tracking-widest text-red-300 uppercase bg-black/70 px-2 py-0.5 rounded border border-white/20">
                DIRECTOR · 2014—NOW
              </span>
            </div>

            <div className="absolute bottom-5 left-5 right-5 z-10">
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-red-400">
                Lead Cinematographer
              </p>
              <p className="mt-0.5 font-cinzel text-xl font-bold text-white">
                Subham Sharma (Sinu)
              </p>
              <p className="mt-1 font-serif text-sm italic text-amber-200/90">
                &ldquo;Where sacred family heritage meets dark gothic cinema.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Right content column */}
        <div
          ref={rightColRef}
          className="flex flex-col justify-center space-y-7 py-8 md:py-24 md:pr-4 lg:pr-12"
        >
          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-red-500">
              A TALE OF TWO GENERATIONS
            </p>

            <h2 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-wide text-neutral-100 uppercase">
              Rooted in Devotion.<br />
              <span className="font-serif italic font-light text-amber-200/95">
                Reimagined in Cinema.
              </span>
            </h2>

            <div className="h-[2px] w-20 bg-[#8a0303]" />
          </div>

          <div className="space-y-5 text-sm sm:text-base leading-relaxed text-neutral-300 font-sans">
            <p>
              Calcutta Studio was founded in 1998 by our father, Shri Vijay Nandan Sharma, built on artisan portraiture, sacred temple ceremonies, and steadfast trust.
            </p>

            <p>
              In 2014, Papa transitioned to our family jewellery business, handing studio leadership over to his elder son, Subham Sharma (Sinu). Under Subham&apos;s creative direction, we elevated the craft into dark gothic luxury wedding cinema and high-fashion couture bridal films.
            </p>

            <p className="font-serif italic text-base sm:text-lg text-neutral-200 border-l-2 border-red-600 pl-4 py-1">
              &ldquo;Master the light as an artist, and protect every client&apos;s trust like family gold.&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 text-center">
            <div>
              <p className="font-cinzel text-lg sm:text-xl text-white font-bold">1998</p>
              <p className="text-[9px] font-mono text-neutral-400 uppercase mt-0.5">Founded by Papa</p>
            </div>
            <div className="border-x border-white/10">
              <p className="font-cinzel text-lg sm:text-xl text-amber-200 font-bold">2014</p>
              <p className="text-[9px] font-mono text-neutral-400 uppercase mt-0.5">Torch to Sinu</p>
            </div>
            <div>
              <p className="font-cinzel text-lg sm:text-xl text-red-500 font-bold">TODAY</p>
              <p className="text-[9px] font-mono text-neutral-400 uppercase mt-0.5">Cinematic Atelier</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
