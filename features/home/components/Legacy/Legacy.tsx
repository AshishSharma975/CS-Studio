"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/* Handcrafted Signature Component for Shri Vijay Nandan Sharma */
function FatherSignature() {
  return (
    <div className="flex flex-col items-start gap-1 select-none">
      <svg
        viewBox="0 0 260 70"
        className="w-44 sm:w-52 h-auto text-amber-200/90 fill-none stroke-current"
        style={{ filter: "drop-shadow(0 0 6px rgba(212,175,55,0.3))" }}
      >
        {/* Artistic Cursive Handwriting Path for 'Vijay Nandan Sharma' */}
        <path
          d="M 15 45 C 22 20, 28 12, 38 18 C 45 23, 30 52, 28 55 M 34 32 C 40 30, 48 31, 52 35 M 48 24 L 48 26 M 58 35 C 62 30, 68 28, 72 32 C 75 35, 72 45, 68 56 C 65 64, 55 62, 60 52 M 78 34 C 82 28, 90 28, 94 33 C 98 38, 95 48, 98 48 C 104 48, 110 32, 115 32 C 120 32, 122 42, 126 42 M 138 20 C 142 32, 145 46, 146 50 M 138 20 C 145 18, 155 18, 158 24 C 160 30, 154 36, 146 36 M 150 36 C 158 36, 168 46, 172 50 M 178 32 C 182 28, 192 28, 195 35 C 196 42, 198 48, 204 48 M 210 32 C 218 28, 225 35, 230 42 C 235 48, 242 46, 248 42 M 20 62 C 60 58, 140 60, 240 54"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400 pl-2">
        Vijay Nandan Sharma — Founder
      </span>
    </div>
  );
}

export default function Legacy() {
  const containerRef = useRef<HTMLElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Desktop horizontal scrub pin animation (Exact Awwwards reference interaction)
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        if (!containerRef.current || !horizontalTrackRef.current) return;

        const totalScroll =
          horizontalTrackRef.current.scrollWidth - window.innerWidth;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${totalScroll * 1.3}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Scrub track horizontally
        tl.to(horizontalTrackRef.current, {
          x: () => -totalScroll,
          ease: "none",
        });

        // Parallax depth on cards
        tl.to(
          ".legacy-parallax-fast",
          {
            x: -80,
            ease: "none",
          },
          0
        );

        tl.to(
          ".legacy-parallax-slow",
          {
            x: 60,
            ease: "none",
          },
          0
        );
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="legacy"
      className="relative w-full bg-[#050505] text-white overflow-hidden border-t border-white/10"
    >
      {/* Subtle Noise Texture & Dark Luxury Radial Glows */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(138,3,3,0.18)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_80%,rgba(212,175,55,0.06)_0%,transparent_50%)]" />

      {/* Persistent Section Top Bar */}
      <div className="relative z-20 w-full px-6 md:px-16 pt-12 md:pt-14 pb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
            <span className="text-[10px] font-mono tracking-[0.25em] text-neutral-300 uppercase ml-1">
              OUR HERITAGE // 1998 — PRESENT
            </span>
          </div>
          <span className="hidden sm:inline text-xs font-mono text-neutral-500">
            [ Korba, Chhattisgarh ]
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-neutral-400 tracking-widest uppercase">
            SCROLL TO EXPLORE THE HEIRLOOM →
          </span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* DESKTOP PINNED HORIZONTAL TRACK (Reference Video Style)    */}
      {/* ========================================================= */}
      <div className="hidden md:block relative z-10 h-[calc(100vh-80px)] w-full overflow-hidden">
        <div
          ref={horizontalTrackRef}
          className="flex h-full items-center pl-16 pr-32 w-max gap-20 lg:gap-32 will-change-transform"
        >
          {/* PANEL 1: Title & Introduction Header */}
          <div className="w-[420px] lg:w-[480px] shrink-0 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-[1px] bg-red-600" />
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#ff2a2a]">
                A Tale of Two Generations
              </span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-cinzel font-normal leading-[1.15] tracking-tight mb-6 text-white drop-shadow-md">
              ROOTED IN DEVOTION.
              <br />
              <span className="italic font-serif text-amber-200/90 font-light">
                Reimagined
              </span>{" "}
              IN CINEMA.
            </h2>

            <p className="text-sm font-sans text-neutral-400 leading-relaxed max-w-md">
              Calcutta Studio was born out of an artisan&apos;s hunger to freeze timeless memories. 
              From darkroom chemistry to 4K bridal cinema, our craft has evolved across two generations of the Sharma family.
            </p>

            <div className="mt-8 flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-2xl font-cinzel text-white font-semibold">1998</span>
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                  Studio Founded
                </span>
              </div>
              <span className="text-neutral-600">→</span>
              <div className="flex flex-col">
                <span className="text-2xl font-cinzel text-amber-200 font-semibold">2014</span>
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                  Torch Passed
                </span>
              </div>
              <span className="text-neutral-600">→</span>
              <div className="flex flex-col">
                <span className="text-2xl font-cinzel text-red-500 font-semibold">TODAY</span>
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                  Couture Atelier
                </span>
              </div>
            </div>
          </div>

          {/* GIANT SCROLLING BACKGROUND TYPOGRAPHY 1 */}
          <div className="shrink-0 select-none pointer-events-none -mr-16">
            <span className="text-[14vw] font-cinzel font-black tracking-tighter text-white/[0.03] uppercase whitespace-nowrap leading-none block">
              TO COMMENCE
            </span>
          </div>

          {/* PANEL 2: The Founder — Shri Vijay Nandan Sharma */}
          <div className="relative w-[520px] lg:w-[580px] shrink-0 flex flex-col justify-center">
            {/* Number 1 Circular Hand-drawn Badge */}
            <div className="absolute -top-6 -left-6 z-20 w-10 h-10 rounded-full border border-amber-300/40 bg-[#121212] flex items-center justify-center font-mono text-sm text-amber-200 shadow-xl">
              ①
            </div>

            {/* Hand-drawn SVG Arrow with Annotation */}
            <div className="absolute -top-14 right-8 z-20 flex items-center gap-2 text-amber-200/90 pointer-events-none">
              <span className="font-serif italic text-sm tracking-wide">
                Where the lens first caught light
              </span>
              <svg className="w-12 h-8 text-amber-300/70 -rotate-12 fill-none stroke-current" viewBox="0 0 50 30">
                <path d="M 5 20 Q 25 5, 45 18 M 38 12 L 45 18 L 38 24" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>

            {/* Framed Archival Photo Card */}
            <div className="relative rounded-2xl bg-[#0a0a0a] border border-white/10 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.8)] legacy-parallax-fast -rotate-1 hover:rotate-0 transition-transform duration-500">
              {/* Masking Tape Header Accent */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-7 bg-amber-100/20 backdrop-blur-md border border-white/20 shadow-md rotate-[-2deg] rounded-xs flex items-center justify-center pointer-events-none">
                <span className="text-[8px] font-mono tracking-widest text-white/80 uppercase">
                  FOUNDER • ARCHIVE
                </span>
              </div>

              {/* Father Portrait Image */}
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-neutral-900 border border-white/5 mb-5 group">
                <Image
                  src="/assets/images/father-vijay-nandan-sharma.jpg"
                  alt="Shri Vijay Nandan Sharma - Founder of Calcutta Studio"
                  fill
                  className="object-cover object-center grayscale contrast-105 group-hover:grayscale-0 transition-all duration-700"
                  sizes="(max-width: 1024px) 500px, 600px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white/90">
                  <span className="text-xs font-mono tracking-widest uppercase bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
                    With Canon Telephoto
                  </span>
                  <span className="text-[10px] font-mono text-amber-300">
                    Circa 2000s
                  </span>
                </div>
              </div>

              {/* Details & Signature */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-cinzel text-white tracking-wide">
                    Shri Vijay Nandan Sharma
                  </h3>
                  <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest px-2 py-0.5 rounded bg-red-950/40 border border-red-800/40">
                    Founder
                  </span>
                </div>

                <p className="text-xs font-sans text-neutral-300 leading-relaxed">
                  Papa laid the foundation of Calcutta Studio with an uncompromising eye for classic portraiture. 
                  In 2014, when his journey transitioned to establishing our family jewellery business, 
                  he proudly handed the camera and the legacy over to his elder son.
                </p>

                {/* Handwritten Signature */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <FatherSignature />
                  <div className="w-10 h-10 rounded-full border border-amber-400/30 bg-amber-950/20 flex items-center justify-center">
                    <span className="text-[9px] font-mono text-amber-200">1998</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PANEL 3: The 2014 Shift Bridge (Jewellery Atelier Shift) */}
          <div className="w-[380px] lg:w-[420px] shrink-0 flex flex-col justify-center legacy-parallax-slow">
            {/* Number 2 Hand-drawn Circular Badge */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-full border border-red-500/40 bg-red-950/30 flex items-center justify-center font-mono text-xs text-red-300">
                ②
              </span>
              <span className="text-xs font-mono text-[#ff2a2a] uppercase tracking-widest">
                The 2014 Sacred Transition
              </span>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0c0c0c]/80 backdrop-blur-md p-6 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

              <h4 className="text-2xl font-cinzel text-amber-100 mb-3 leading-snug">
                FROM THE LENS TO GOLD CRAFTSMANSHIP.
              </h4>

              <p className="text-xs font-sans text-neutral-300 leading-relaxed mb-4">
                In 2014, Papa expanded our family vision into the heritage jewellery craft. 
                With deep trust, he passed the darkroom keys to his elder son Subham, saying:
              </p>

              <blockquote className="border-l-2 border-amber-400/60 pl-3 italic font-serif text-sm text-neutral-200 mb-4">
                &ldquo;Master the light as an artist, and protect every client&apos;s trust like family gold.&rdquo;
              </blockquote>

              <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-[11px] font-mono uppercase text-neutral-400 tracking-wider">
                  Shree Jewellers & Calcutta Studio Heritage
                </span>
              </div>
            </div>
          </div>

          {/* GIANT SCROLLING BACKGROUND TYPOGRAPHY 2 */}
          <div className="shrink-0 select-none pointer-events-none -mr-16">
            <span className="text-[14vw] font-cinzel font-black tracking-tighter text-white/[0.03] uppercase whitespace-nowrap leading-none block">
              TO TRANSCEND
            </span>
          </div>

          {/* PANEL 4: The Elder Brother — Subham Sharma (Sinu) */}
          <div className="relative w-[520px] lg:w-[580px] shrink-0 flex flex-col justify-center">
            {/* Number 3 Circular Hand-drawn Badge */}
            <div className="absolute -top-6 -left-6 z-20 w-10 h-10 rounded-full border border-red-500/50 bg-[#121212] flex items-center justify-center font-mono text-sm text-red-400 shadow-xl">
              ③
            </div>

            {/* Hand-drawn SVG Arrow with Annotation */}
            <div className="absolute -top-14 right-8 z-20 flex items-center gap-2 text-red-300 pointer-events-none">
              <span className="font-serif italic text-sm tracking-wide">
                Reinventing bridal couture cinema
              </span>
              <svg className="w-12 h-8 text-red-400/80 -rotate-6 fill-none stroke-current" viewBox="0 0 50 30">
                <path d="M 5 15 Q 25 5, 45 15 M 38 9 L 45 15 L 38 21" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>

            {/* Framed Archival Photo Card */}
            <div className="relative rounded-2xl bg-[#0a0a0a] border border-white/10 p-5 shadow-[0_20px_60px_rgba(138,3,3,0.3)] legacy-parallax-fast rotate-1 hover:rotate-0 transition-transform duration-500">
              {/* Masking Tape Header Accent */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-32 h-7 bg-red-950/40 backdrop-blur-md border border-red-600/30 shadow-md rotate-[1.5deg] rounded-xs flex items-center justify-center pointer-events-none">
                <span className="text-[8px] font-mono tracking-widest text-red-200 uppercase">
                  DIRECTOR • SINCE 2014
                </span>
              </div>

              {/* Sinu Portrait Image */}
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-neutral-900 border border-white/5 mb-5 group">
                <Image
                  src="/assets/images/my.jpeg"
                  alt="Subham Sharma (Sinu) - Creative Director"
                  fill
                  className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700"
                  sizes="(max-width: 1024px) 500px, 600px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white/90">
                  <span className="text-xs font-mono tracking-widest uppercase bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
                    Lead Cinematographer
                  </span>
                  <span className="text-[10px] font-mono text-red-400">
                    2014 — Present
                  </span>
                </div>
              </div>

              {/* Details & Leadership */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-cinzel text-white tracking-wide">
                    Subham Sharma (Sinu)
                  </h3>
                  <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest px-2 py-0.5 rounded bg-red-950/40 border border-red-800/40">
                    Elder Brother & Director
                  </span>
                </div>

                <p className="text-xs font-sans text-neutral-300 leading-relaxed">
                  Stepping into his father&apos;s shoes in 2014, Subham elevated Calcutta Studio into 
                  a dark gothic luxury atelier. Under his vision, wedding photography evolved into 
                  cinematic royal films, sacred temple adornment, and high-fashion bridal storytelling.
                </p>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span>Subham Sharma — Creative Lead</span>
                  <span className="text-[#ff2a2a]">10+ Years at the Helm</span>
                </div>
              </div>
            </div>
          </div>

          {/* PANEL 5: The Grand Stamp & CTA */}
          <div className="w-[360px] lg:w-[400px] shrink-0 flex flex-col justify-center items-start">
            <div className="rounded-2xl border border-white/15 bg-gradient-to-b from-[#141414] to-[#070707] p-8 shadow-[0_0_50px_rgba(138,3,3,0.35)] w-full">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#ff2a2a] block mb-2">
                Unbroken Lineage
              </span>
              <h3 className="text-3xl font-cinzel text-white mb-4 leading-tight">
                TWO GENERATIONS.
                <br />
                ONE FAMILY LEGACY.
              </h3>
              <p className="text-xs font-sans text-neutral-400 leading-relaxed mb-6">
                Every frame we capture honors the foundation built by our father in 1998, 
                blended seamlessly with modern cinema.
              </p>

              <Link
                href="/works"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-xs font-sans font-medium tracking-wider uppercase hover:bg-neutral-200 transition-colors"
              >
                <span>View Our Works Archive</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MOBILE STACKED VERTICAL VIEW (< 768px)                     */}
      {/* ========================================================= */}
      <div className="md:hidden relative z-10 px-6 py-12 flex flex-col gap-12">
        {/* Intro */}
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#ff2a2a] block mb-2">
            A Tale of Two Generations
          </span>
          <h2 className="text-3xl font-cinzel font-normal leading-tight text-white mb-4">
            ROOTED IN DEVOTION.
            <br />
            <span className="italic font-serif text-amber-200/90 font-light">
              Reimagined
            </span>{" "}
            IN CINEMA.
          </h2>
          <p className="text-sm font-sans text-neutral-400 leading-relaxed">
            Calcutta Studio was founded by Shri Vijay Nandan Sharma in 1998, and carried forward with passion by his elder son Subham Sharma (Sinu) since 2014.
          </p>
        </div>

        {/* Father Card */}
        <div className="relative rounded-2xl bg-[#0a0a0a] border border-white/10 p-5 shadow-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-6 rounded-full border border-amber-300/40 bg-neutral-900 flex items-center justify-center font-mono text-xs text-amber-200">
              ①
            </span>
            <span className="text-[10px] font-mono tracking-widest text-amber-200 uppercase">
              The Founder • 1998
            </span>
          </div>

          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-neutral-900 border border-white/5 mb-4">
            <Image
              src="/assets/images/father-vijay-nandan-sharma.jpg"
              alt="Shri Vijay Nandan Sharma"
              fill
              className="object-cover"
            />
          </div>

          <h3 className="text-lg font-cinzel text-white mb-2">
            Shri Vijay Nandan Sharma
          </h3>
          <p className="text-xs font-sans text-neutral-400 leading-relaxed mb-4">
            Papa started Calcutta Studio in 1998 with deep devotion to portraiture. In 2014, he transitioned to the family jewellery business, passing the studio reigns to his elder son.
          </p>

          <FatherSignature />
        </div>

        {/* Transition Bridge */}
        <div className="rounded-xl border border-white/10 bg-[#0e0e0e] p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-full border border-red-500/40 bg-red-950/40 flex items-center justify-center font-mono text-xs text-red-300">
              ②
            </span>
            <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest">
              The 2014 Shift
            </span>
          </div>
          <p className="text-xs font-sans text-neutral-300 leading-relaxed">
            As Papa shifted focus to our family jewellery atelier, the studio vision was handed over to his elder son Subham to carry the artistic light forward.
          </p>
        </div>

        {/* Sinu Card */}
        <div className="relative rounded-2xl bg-[#0a0a0a] border border-white/10 p-5 shadow-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-6 rounded-full border border-red-500/40 bg-neutral-900 flex items-center justify-center font-mono text-xs text-red-400">
              ③
            </span>
            <span className="text-[10px] font-mono tracking-widest text-red-400 uppercase">
              Director • Since 2014
            </span>
          </div>

          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-neutral-900 border border-white/5 mb-4">
            <Image
              src="/assets/images/my.jpeg"
              alt="Subham Sharma (Sinu)"
              fill
              className="object-cover object-top"
            />
          </div>

          <h3 className="text-lg font-cinzel text-white mb-2">
            Subham Sharma (Sinu)
          </h3>
          <p className="text-xs font-sans text-neutral-400 leading-relaxed">
            Taking the helm in 2014, elder brother Subham transformed Calcutta Studio into high-fashion dark gothic bridal cinema and sacred wedding couture.
          </p>
        </div>
      </div>
    </section>
  );
}
