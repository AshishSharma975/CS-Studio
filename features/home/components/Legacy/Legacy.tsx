"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Legacy() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const totalScroll = track.scrollWidth - window.innerWidth;

      /* ── Setup SVG stroke lengths dynamically for 100% accurate draw-in ── */
      const sigPaths = gsap.utils.toArray<SVGPathElement>(".lc-sig-path");
      sigPaths.forEach((p) => {
        try {
          const len = p.getTotalLength ? p.getTotalLength() : 700;
          gsap.set(p, { strokeDasharray: len + 1, strokeDashoffset: len + 1 });
        } catch {
          gsap.set(p, { strokeDasharray: 700, strokeDashoffset: 700 });
        }
      });

      const arrowPaths = gsap.utils.toArray<SVGPathElement>(".lc-arr-path");
      arrowPaths.forEach((p) => {
        try {
          const len = p.getTotalLength ? p.getTotalLength() : 250;
          gsap.set(p, { strokeDasharray: len + 1, strokeDashoffset: len + 1 });
        } catch {
          gsap.set(p, { strokeDasharray: 250, strokeDashoffset: 250 });
        }
      });

      /* ── Main horizontal scrub timeline (normalized to duration 12) ── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScroll * 1.2}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Horizontal Track Translation
      tl.to(track, { x: () => -totalScroll, ease: "none", duration: 12 }, 0);

      // 2. "Upar-Neeche" Parallax (staggered floating motion while scrolling)
      tl.to(".lc-float-up", { y: -50, ease: "sine.inOut", duration: 12 }, 0);
      tl.to(".lc-float-down", { y: 60, ease: "sine.inOut", duration: 12 }, 0);
      tl.to(".lc-annot", { y: -30, ease: "sine.inOut", duration: 12 }, 0);
      tl.to(".lc-badge", { x: 40, rotation: 15, ease: "none", duration: 12 }, 0);

      // 3. Papa's Signature Animation (writes when Panel 1 is in view)
      tl.to(".lc-sig-path", { strokeDashoffset: 0, ease: "power1.inOut", duration: 1.8 }, 0.2);

      // 4. Staggered Arrow Drawings (each draws exactly when its panel enters)
      tl.to(".lc-arr-1", { strokeDashoffset: 0, ease: "power1.out", duration: 1.2 }, 0.8);
      tl.to(".lc-arr-2", { strokeDashoffset: 0, ease: "power1.out", duration: 1.2 }, 3.5);
      tl.to(".lc-arr-3", { strokeDashoffset: 0, ease: "power1.out", duration: 1.2 }, 6.2);
      tl.to(".lc-arr-4", { strokeDashoffset: 0, ease: "power1.out", duration: 1.2 }, 8.8);
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="legacy"
      className="relative w-full overflow-hidden bg-[#050505]"
    >
      {/* ── Top Architectural Header Bar ── */}
      <div className="absolute top-6 left-12 right-12 z-30 flex items-center justify-between pointer-events-none border-b border-white/5 pb-3">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-neutral-400">
            A Tale of Two Generations // 1998 — Present
          </span>
        </div>
        <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase">
          [ SCROLL TO EXPLORE ARCHIVE ]
        </span>
      </div>

      {/* ── Pinned horizontal track ── */}
      <div
        ref={trackRef}
        className="flex h-screen items-center will-change-transform"
        style={{ width: "max-content" }}
      >
        {/* ════════════════════════════════════════════
            WORD 1  —  "ROOTED"
        ════════════════════════════════════════════ */}
        <div className="relative flex h-screen items-center pl-20 pr-12 shrink-0">
          {/* Giant high-visibility background word */}
          <span className="select-none font-cinzel font-black text-[25vw] leading-none tracking-tighter text-white/[0.22] uppercase whitespace-nowrap">
            ROOTED
          </span>

          {/* ── Floating Photo Card: Papa (Positioned High) ── */}
          <div
            className="lc-card lc-float-up absolute left-[16vw] top-[14%] w-[270px] sm:w-[310px] rounded-2xl overflow-hidden border border-white/15 bg-[#0a0a0a] shadow-[0_30px_80px_rgba(0,0,0,0.95)] -rotate-2"
            style={{ zIndex: 10 }}
          >
            {/* washi-tape strip */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-amber-100/20 border border-white/20 backdrop-blur-md rounded-sm flex items-center justify-center rotate-[-1deg] pointer-events-none z-20">
              <span className="text-[8px] font-mono tracking-widest text-white/90 uppercase">FOUNDER · 1998</span>
            </div>

            <div className="relative w-full aspect-[3/4]">
              <Image
                src="/assets/images/father-vijay-nandan-sharma.jpg"
                alt="Shri Vijay Nandan Sharma — Founder"
                fill
                className="object-cover grayscale contrast-105"
                sizes="340px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent" />
            </div>

            <div className="p-4 bg-[#0a0a0a]">
              <p className="font-cinzel text-sm text-white tracking-wide leading-snug">
                Shri Vijay Nandan Sharma
              </p>
              <p className="mt-1 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                Calcutta Studio — Founder
              </p>

              {/* Hand-drawn Signature with Scroll-sync Draw */}
              <div className="mt-3 pt-2 border-t border-white/5">
                <svg
                  viewBox="0 0 200 48"
                  className="w-40 h-auto fill-none stroke-amber-300/90"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    className="lc-sig-path"
                    d="M8 36 C14 16 20 10 30 16 C36 20 22 44 20 46 M26 28 C32 26 40 27 44 31 M40 20 L40 22 M50 30 C54 25 60 23 64 27 C67 30 64 40 60 48 C57 54 48 52 52 44 M68 28 C72 22 80 22 84 27 C88 32 85 42 88 42 C94 42 100 28 104 28 C110 28 112 36 116 36 M4 44 C50 42 120 44 196 40"
                  />
                </svg>
                <p className="text-[8px] font-mono text-neutral-500 mt-1 uppercase tracking-wider">
                  Vijay Nandan Sharma
                </p>
              </div>
            </div>
          </div>

          {/* ── Drafting Crosshair Annotation #1 (Positioned Low) ── */}
          <div className="lc-annot absolute bottom-[16%] left-[6vw] flex items-start gap-3 pointer-events-none">
            <div className="relative w-7 h-12 shrink-0">
              <div className="absolute left-3 top-0 bottom-0 w-[1px] bg-neutral-500/80" />
              <div className="absolute top-3 left-0 right-0 h-[1px] bg-neutral-500/80" />
            </div>
            <div className="font-serif italic text-neutral-300 text-xs sm:text-sm leading-tight tracking-wide">
              <p>where the lens</p>
              <p>first caught</p>
              <p>sacred light.</p>
            </div>
          </div>

          {/* ── Curved Arrow 1: Swooping down-right towards Panel 2/3 ── */}
          <svg
            className="lc-arrow absolute bottom-[12%] left-[24vw] w-32 h-20 fill-none stroke-neutral-400/70"
            viewBox="0 0 120 70"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path
              className="lc-arr-path lc-arr-1"
              d="M 10 10 Q 60 8, 108 55 M 95 48 L 108 55 L 100 68"
            />
          </svg>
        </div>

        {/* ════════════════════════════════════════════
            WORD 2  —  "IN"
        ════════════════════════════════════════════ */}
        <div className="relative flex h-screen items-center px-10 shrink-0">
          <span className="select-none font-cinzel font-black text-[25vw] leading-none tracking-tighter text-white/[0.22] uppercase whitespace-nowrap">
            IN
          </span>

          {/* ── Floating Number badge ① (High) ── */}
          <div className="lc-badge absolute right-8 top-[24%] w-14 h-14 rounded-full border border-amber-300/40 bg-[#111] flex items-center justify-center font-mono text-xl text-amber-200/90 shadow-[0_10px_30px_rgba(251,191,36,0.15)]">
            ①
          </div>

          {/* ── Circular Emblem: Studio Origins (Low) ── */}
          <div className="lc-float-down absolute left-4 bottom-[20%] w-36 h-36 rounded-full border border-white/10 bg-[#0f0f0f]/90 backdrop-blur-md flex flex-col items-center justify-center p-3 text-center shadow-2xl rotate-6">
            <span className="text-[8px] font-mono uppercase tracking-[0.25em] text-amber-400">FOUNDED</span>
            <span className="font-cinzel text-xl text-white font-bold my-0.5">1998</span>
            <span className="text-[7.5px] font-sans text-neutral-400 uppercase tracking-widest leading-none">Korba, CG</span>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            WORD 3  —  "DEVOTION."
        ════════════════════════════════════════════ */}
        <div className="relative flex h-screen items-center px-12 shrink-0">
          <span className="select-none font-cinzel font-black text-[25vw] leading-none tracking-tighter text-white/[0.22] uppercase whitespace-nowrap">
            DEVOTION.
          </span>

          {/* ── Origin Story Card (Positioned Low) ── */}
          <div
            className="lc-card lc-float-down absolute left-[22vw] bottom-[16%] w-[290px] rounded-xl border border-white/15 bg-[#0d0d0d]/95 backdrop-blur-md p-6 shadow-2xl rotate-1"
            style={{ zIndex: 10 }}
          >
            <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#ff2a2a]">
              Artisan Discipline
            </span>
            <h3 className="mt-2 font-cinzel text-xl text-white leading-snug">
              Every Masterpiece<br />Starts With Devotion.
            </h3>
            <p className="mt-3 text-[11px] font-sans text-neutral-400 leading-relaxed">
              Papa built Calcutta Studio on the principle of treating each wedding not as a booking, 
              but as a family sacred trust captured for generations.
            </p>
            <div className="mt-4 flex items-center gap-3 text-[10px] font-mono text-neutral-500 pt-2 border-t border-white/5">
              <span className="text-amber-400">1998</span>
              <span className="text-neutral-700">—</span>
              <span>16 Years of Pure Craft</span>
            </div>
          </div>

          {/* ── Drafting Crosshair Annotation #2 (Positioned High) ── */}
          <div className="lc-annot absolute top-[20%] left-[8vw] flex items-start gap-3 pointer-events-none">
            <div className="relative w-7 h-12 shrink-0">
              <div className="absolute left-3 top-0 bottom-0 w-[1px] bg-neutral-500/80" />
              <div className="absolute top-3 left-0 right-0 h-[1px] bg-neutral-500/80" />
            </div>
            <div className="font-serif italic text-neutral-300 text-xs sm:text-sm leading-tight tracking-wide">
              <p>every masterpiece</p>
              <p>starts held</p>
              <p>in place.</p>
            </div>
          </div>

          {/* ── Curved Arrow 2: Swooping UP-RIGHT from Low to High ── */}
          <svg
            className="lc-arrow absolute top-[30%] right-[6vw] w-28 h-20 fill-none stroke-neutral-400/70"
            viewBox="0 0 110 70"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path
              className="lc-arr-path lc-arr-2"
              d="M 10 60 Q 55 50, 98 15 M 84 12 L 98 15 L 94 28"
            />
          </svg>
        </div>

        {/* ════════════════════════════════════════════
            WORD 4  —  "REIMAGINED"
        ════════════════════════════════════════════ */}
        <div className="relative flex h-screen items-center pl-16 pr-12 shrink-0">
          <span className="select-none font-cinzel font-black italic text-[25vw] leading-none tracking-tighter text-white/[0.22] uppercase whitespace-nowrap">
            REIMAGINED
          </span>

          {/* ── Number badge ② (Low) ── */}
          <div className="lc-badge absolute left-6 bottom-[22%] w-14 h-14 rounded-full border border-red-500/40 bg-[#111] flex items-center justify-center font-mono text-xl text-red-400/90 shadow-[0_10px_30px_rgba(239,68,68,0.2)]">
            ②
          </div>

          {/* ── The 2014 Transition Card (Positioned High) ── */}
          <div
            className="lc-card lc-float-up absolute right-[10vw] top-[14%] w-[310px] rounded-xl border border-red-900/50 bg-[#0d0d0d]/95 backdrop-blur-md p-6 shadow-2xl -rotate-1"
            style={{ zIndex: 10 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#ff2a2a]">
                The 2014 Transition
              </span>
            </div>
            <h3 className="font-cinzel text-lg text-white leading-snug">
              FROM THE LENS<br />TO JEWELLERY CRAFT.
            </h3>
            <blockquote className="mt-3 border-l-2 border-amber-500/60 pl-3 font-serif italic text-xs text-neutral-300 leading-relaxed">
              &ldquo;Master the light as an artist, and protect every client&apos;s trust like family gold.&rdquo;
            </blockquote>
            <p className="mt-3 text-[10px] font-mono text-neutral-500">
              — Shri Vijay Nandan Sharma
            </p>
            <p className="mt-2 text-[11px] font-sans text-neutral-400 leading-relaxed pt-2 border-t border-white/5">
              Papa shifted his focus to the family jewellery business in 2014, passing the creative studio torch to his elder son.
            </p>
          </div>

          {/* ── Drafting Crosshair Annotation #3 (Positioned Low) ── */}
          <div className="lc-annot absolute bottom-[16%] left-[28vw] flex items-start gap-3 pointer-events-none">
            <div className="relative w-7 h-12 shrink-0">
              <div className="absolute left-3 top-0 bottom-0 w-[1px] bg-neutral-500/80" />
              <div className="absolute top-3 left-0 right-0 h-[1px] bg-neutral-500/80" />
            </div>
            <div className="font-serif italic text-neutral-300 text-xs sm:text-sm leading-tight tracking-wide">
              <p>from our hands</p>
              <p>to theirs,</p>
              <p>arriving whole.</p>
            </div>
          </div>

          {/* ── Curved Arrow 3: Swooping DOWN-RIGHT towards Sinu ── */}
          <svg
            className="lc-arrow absolute bottom-[14%] right-[22vw] w-28 h-20 fill-none stroke-neutral-400/70"
            viewBox="0 0 110 70"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path
              className="lc-arr-path lc-arr-3"
              d="M 10 15 Q 60 10, 100 55 M 88 50 L 100 55 L 94 66"
            />
          </svg>
        </div>

        {/* ════════════════════════════════════════════
            WORD 5  —  "IN CINEMA."
        ════════════════════════════════════════════ */}
        <div className="relative flex h-screen items-center pl-10 pr-20 shrink-0">
          <span className="select-none font-cinzel font-black text-[25vw] leading-none tracking-tighter text-white/[0.22] uppercase whitespace-nowrap">
            IN CINEMA.
          </span>

          {/* ── Floating Photo Card: Sinu (Positioned Low) ── */}
          <div
            className="lc-card lc-float-down absolute left-[18vw] bottom-[14%] w-[270px] sm:w-[310px] rounded-2xl overflow-hidden border border-white/15 bg-[#0a0a0a] shadow-[0_30px_80px_rgba(138,3,3,0.5)] rotate-1"
            style={{ zIndex: 10 }}
          >
            {/* red washi-tape strip */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-red-950/60 border border-red-700/50 backdrop-blur-md rounded-sm flex items-center justify-center rotate-[1deg] pointer-events-none z-20">
              <span className="text-[8px] font-mono tracking-widest text-red-300 uppercase">DIRECTOR · 2014—NOW</span>
            </div>

            <div className="relative w-full aspect-[3/4]">
              <Image
                src="/assets/images/my.jpeg"
                alt="Subham Sharma (Sinu) — Creative Director"
                fill
                className="object-cover object-top grayscale"
                sizes="340px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                <span className="text-[9px] font-mono tracking-widest text-white/90 uppercase bg-black/70 px-2 py-0.5 rounded border border-white/10">
                  Creative Director
                </span>
                <span className="text-[9px] font-mono text-red-400 font-semibold">2014—Today</span>
              </div>
            </div>

            <div className="p-4 bg-[#0a0a0a]">
              <p className="font-cinzel text-sm text-white tracking-wide">Subham Sharma (Sinu)</p>
              <p className="mt-1 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                Elder Son & Creative Director
              </p>
              <p className="mt-2 text-[11px] font-sans text-neutral-400 leading-relaxed">
                Elevated Calcutta Studio into high-fashion couture wedding cinema, dark gothic bridal films & sacred rituals.
              </p>
            </div>
          </div>

          {/* ── Number badge ③ (High) ── */}
          <div className="lc-badge absolute right-[16vw] top-[20%] w-14 h-14 rounded-full border border-red-500/50 bg-[#111] flex items-center justify-center font-mono text-xl text-red-400/90 shadow-[0_10px_30px_rgba(239,68,68,0.25)]">
            ③
          </div>

          {/* ── Drafting Crosshair Annotation #4 (Positioned High) ── */}
          <div className="lc-annot absolute top-[22%] right-[20vw] flex items-start gap-3 pointer-events-none">
            <div className="relative w-7 h-12 shrink-0">
              <div className="absolute left-3 top-0 bottom-0 w-[1px] bg-neutral-500/80" />
              <div className="absolute top-3 left-0 right-0 h-[1px] bg-neutral-500/80" />
            </div>
            <div className="font-serif italic text-neutral-300 text-xs sm:text-sm leading-tight tracking-wide">
              <p>reinventing</p>
              <p>sacred bridal</p>
              <p>couture cinema.</p>
            </div>
          </div>

          {/* ── Curved Arrow 4: Swooping UP-RIGHT towards Closing Seal ── */}
          <svg
            className="lc-arrow absolute top-[36%] left-[10vw] w-28 h-20 fill-none stroke-neutral-400/70"
            viewBox="0 0 110 70"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path
              className="lc-arr-path lc-arr-4"
              d="M 10 60 Q 55 55, 95 18 M 82 14 L 95 18 L 92 30"
            />
          </svg>
        </div>

        {/* ════════════════════════════════════════════
            CLOSING PANEL — Grand Seal & Works Link
        ════════════════════════════════════════════ */}
        <div className="relative flex h-screen shrink-0 items-center px-24 min-w-[640px]">
          <div className="max-w-lg space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-8 h-[1px] bg-red-600" />
              <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#ff2a2a]">
                Unbroken Lineage
              </span>
            </div>

            <h2 className="font-cinzel text-4xl lg:text-5xl text-white leading-[1.1] tracking-tight">
              TWO GENERATIONS.<br />
              <span className="font-serif italic font-light text-amber-200/95">
                One Undying Legacy.
              </span>
            </h2>

            <p className="text-sm font-sans text-neutral-400 leading-relaxed">
              Every frame we craft today honors the foundation built by our father in 1998, 
              seamlessly reimagined through modern cinematic artistry.
            </p>

            <div className="flex items-center gap-8 py-3">
              <div className="text-center">
                <p className="font-cinzel text-2xl text-white font-bold">1998</p>
                <p className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest mt-1">Founded by Papa</p>
              </div>
              <span className="text-neutral-700 text-2xl">→</span>
              <div className="text-center">
                <p className="font-cinzel text-2xl text-amber-200 font-bold">2014</p>
                <p className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest mt-1">Torch to Sinu</p>
              </div>
              <span className="text-neutral-700 text-2xl">→</span>
              <div className="text-center">
                <p className="font-cinzel text-2xl text-red-500 font-bold">TODAY</p>
                <p className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest mt-1">Cinematic Atelier</p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/works"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black text-xs font-sans font-bold tracking-wider uppercase hover:bg-neutral-200 transition-all hover:scale-105 shadow-2xl"
              >
                <span>Explore Full Works Archive</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE: vertical stack fallback ── */}
      <style>{`
        @media (max-width: 767px) {
          #legacy > div:first-of-type { display: none !important; }
          #legacy > div:nth-of-type(2) { display: none !important; }
          #legacy-mobile { display: flex !important; }
        }
      `}</style>

      <div
        id="legacy-mobile"
        className="hidden flex-col gap-10 px-6 py-16 bg-[#050505]"
      >
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#ff2a2a]">A Tale of Two Generations</span>
          <h2 className="mt-2 font-cinzel text-3xl text-white leading-tight">
            ROOTED IN DEVOTION.<br />
            <span className="italic font-serif font-light text-amber-200/90">Reimagined</span> IN CINEMA.
          </h2>
        </div>

        {/* Papa Mobile Card */}
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl">
          <div className="relative w-full aspect-[4/3]">
            <Image src="/assets/images/father-vijay-nandan-sharma.jpg" alt="Shri Vijay Nandan Sharma" fill className="object-cover grayscale" />
          </div>
          <div className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs text-amber-200">①</span>
              <span className="text-[9px] font-mono tracking-widest text-amber-300 uppercase">Founder · 1998</span>
            </div>
            <h3 className="font-cinzel text-lg text-white mb-2">Shri Vijay Nandan Sharma</h3>
            <p className="text-xs font-sans text-neutral-400 leading-relaxed mb-3">
              Papa founded Calcutta Studio in 1998. In 2014, he transitioned to our family jewellery business, handing the studio over to his elder son.
            </p>
            <svg viewBox="0 0 200 48" className="w-36 h-auto fill-none stroke-amber-200/90" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 36 C14 16 20 10 30 16 C36 20 22 44 20 46 M26 28 C32 26 40 27 44 31 M40 20 L40 22 M50 30 C54 25 60 23 64 27 C67 30 64 40 60 48 C57 54 48 52 52 44 M68 28 C72 22 80 22 84 27 C88 32 85 42 88 42 C94 42 100 28 104 28 C110 28 112 36 116 36 M4 44 C50 42 120 44 196 40" />
            </svg>
          </div>
        </div>

        {/* 2014 Transition Mobile */}
        <div className="rounded-xl border border-red-950/40 bg-[#0e0e0e] p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-xs text-red-400">②</span>
            <span className="text-[9px] font-mono tracking-widest text-red-400 uppercase">The 2014 Transition</span>
          </div>
          <blockquote className="border-l-2 border-amber-400/60 pl-3 font-serif italic text-sm text-neutral-200">
            &ldquo;Master the light as an artist, and protect every client&apos;s trust like family gold.&rdquo;
          </blockquote>
          <p className="mt-2 text-[10px] font-mono text-neutral-500">— Shri Vijay Nandan Sharma</p>
        </div>

        {/* Sinu Mobile Card */}
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl">
          <div className="relative w-full aspect-[4/3]">
            <Image src="/assets/images/my.jpeg" alt="Subham Sharma (Sinu)" fill className="object-cover object-top grayscale" />
          </div>
          <div className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs text-red-400">③</span>
              <span className="text-[9px] font-mono tracking-widest text-red-400 uppercase">Director · 2014—Present</span>
            </div>
            <h3 className="font-cinzel text-lg text-white mb-2">Subham Sharma (Sinu)</h3>
            <p className="text-xs font-sans text-neutral-400 leading-relaxed">
              Stepping up in 2014, Subham elevated Calcutta Studio into high-fashion couture cinema and sacred bridal films.
            </p>
          </div>
        </div>

        <Link href="/works" className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white text-black text-xs font-bold tracking-wider uppercase">
          Explore Works Archive →
        </Link>
      </div>
    </section>
  );
}
