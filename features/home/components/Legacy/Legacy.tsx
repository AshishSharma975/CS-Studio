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

      /* ── Main horizontal scrub pin ── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScroll * 1.1}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(track, { x: () => -totalScroll, ease: "none" }, 0);

      /* ── Parallax layers ── */
      // Photo cards move slower than the giant text (they "float" forward)
      tl.to(".lc-card", { x: -120, ease: "none" }, 0);
      // Annotations at a slightly different speed for depth
      tl.to(".lc-annot", { x: -60, ease: "none" }, 0);
      // Arrows at yet another speed
      tl.to(".lc-arrow", { x: -40, ease: "none" }, 0);
      // Number badges barely move (hang in viewport)
      tl.to(".lc-badge", { x: 30, ease: "none" }, 0);
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="legacy"
      className="relative w-full overflow-hidden bg-[#050505]"
    >
      {/* ── Pinned horizontal track ── */}
      <div
        ref={trackRef}
        className="flex h-screen items-center will-change-transform"
        style={{ width: "max-content" }}
      >
        {/* ════════════════════════════════════════════
            WORD 1  —  "ROOTED"
        ════════════════════════════════════════════ */}
        <div className="relative flex h-screen items-center pl-24 pr-10 shrink-0">
          {/* giant word */}
          <span className="select-none font-cinzel font-black text-[22vw] leading-none tracking-tighter text-white/[0.07] uppercase whitespace-nowrap">
            ROOTED
          </span>

          {/* ── Floating Photo Card: Papa ── */}
          <div
            className="lc-card absolute left-[18vw] top-1/2 -translate-y-[60%] w-[260px] sm:w-[300px] rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-[0_24px_64px_rgba(0,0,0,0.9)] -rotate-2"
            style={{ zIndex: 10 }}
          >
            {/* washi-tape strip */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-amber-100/20 border border-white/20 backdrop-blur-md rounded-sm flex items-center justify-center rotate-[-1deg] pointer-events-none z-20">
              <span className="text-[8px] font-mono tracking-widest text-white/80 uppercase">FOUNDER · 1998</span>
            </div>

            <div className="relative w-full aspect-[3/4]">
              <Image
                src="/assets/images/father-vijay-nandan-sharma.jpg"
                alt="Shri Vijay Nandan Sharma — Founder"
                fill
                className="object-cover grayscale contrast-105"
                sizes="320px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
            </div>

            <div className="p-4">
              <p className="font-cinzel text-sm text-white tracking-wide leading-snug">
                Shri Vijay Nandan Sharma
              </p>
              <p className="mt-1 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                Calcutta Studio — Founder
              </p>
              {/* Signature */}
              <svg
                viewBox="0 0 200 48"
                className="mt-3 w-36 h-auto fill-none stroke-amber-200/80"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 36 C14 16 20 10 30 16 C36 20 22 44 20 46 M26 28 C32 26 40 27 44 31 M40 20 L40 22 M50 30 C54 25 60 23 64 27 C67 30 64 40 60 48 C57 54 48 52 52 44 M68 28 C72 22 80 22 84 27 C88 32 85 42 88 42 C94 42 100 28 104 28 C110 28 112 36 116 36 M4 44 C50 42 120 44 196 40" />
              </svg>
              <p className="text-[9px] font-mono text-neutral-500 mt-0.5">Vijay Nandan Sharma — Founder</p>
            </div>
          </div>

          {/* ── Hand-drawn annotation #1 ── */}
          <div className="lc-annot absolute bottom-[22%] left-[8vw] flex items-start gap-2 pointer-events-none">
            <span className="text-neutral-400/80 font-mono text-xs leading-none mt-0.5">+</span>
            <span className="font-serif italic text-neutral-300/70 text-sm leading-snug max-w-[180px]">
              where the lens<br />first caught light
            </span>
          </div>

          {/* ── Curved arrow down-right ── */}
          <svg
            className="lc-arrow absolute bottom-[18%] left-[22vw] w-24 h-16 fill-none stroke-neutral-500/60"
            viewBox="0 0 96 64"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M 8 8 Q 48 4, 88 48 M 76 42 L 88 48 L 80 60" />
          </svg>
        </div>

        {/* ════════════════════════════════════════════
            WORD 2  —  "IN"
        ════════════════════════════════════════════ */}
        <div className="relative flex h-screen items-center px-6 shrink-0">
          <span className="select-none font-cinzel font-black text-[22vw] leading-none tracking-tighter text-white/[0.07] uppercase whitespace-nowrap">
            IN
          </span>

          {/* ── Number badge ① ── */}
          <div className="lc-badge absolute right-6 top-1/3 w-12 h-12 rounded-full border border-amber-300/40 bg-[#111] flex items-center justify-center font-mono text-lg text-amber-200/80 shadow-2xl">
            ①
          </div>
        </div>

        {/* ════════════════════════════════════════════
            WORD 3  —  "DEVOTION."
        ════════════════════════════════════════════ */}
        <div className="relative flex h-screen items-center px-10 shrink-0">
          <span className="select-none font-cinzel font-black text-[22vw] leading-none tracking-tighter text-white/[0.07] uppercase whitespace-nowrap">
            DEVOTION.
          </span>

          {/* ── Info card: origin story ── */}
          <div
            className="lc-card absolute left-[25vw] top-1/2 -translate-y-1/2 w-[280px] rounded-xl border border-white/10 bg-[#0d0d0d]/90 backdrop-blur-md p-6 shadow-2xl rotate-1"
            style={{ zIndex: 10 }}
          >
            <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#ff2a2a]">
              Est. 1998 — Korba, CG
            </span>
            <h3 className="mt-2 font-cinzel text-xl text-white leading-snug">
              A Studio Born<br />From Passion.
            </h3>
            <p className="mt-3 text-[11px] font-sans text-neutral-400 leading-relaxed">
              Papa started Calcutta Studio with an artisan&apos;s devotion to portraiture — 
              freezing timeless moments in every frame.
            </p>
            <div className="mt-4 flex items-center gap-3 text-[10px] font-mono text-neutral-500">
              <span className="text-amber-400">1998</span>
              <span className="text-neutral-700">—</span>
              <span>Studio Founded</span>
            </div>
          </div>

          {/* ── Annotation #2 ── */}
          <div className="lc-annot absolute bottom-[20%] right-[12vw] flex items-start gap-2 pointer-events-none">
            <span className="text-neutral-400/80 font-mono text-xs mt-0.5">+</span>
            <span className="font-serif italic text-neutral-300/70 text-sm leading-snug max-w-[160px]">
              every masterpiece<br />starts held in place
            </span>
          </div>

          {/* ── Straight arrow right ── */}
          <svg
            className="lc-arrow absolute bottom-[24%] left-[12vw] w-20 h-10 fill-none stroke-neutral-500/50"
            viewBox="0 0 80 40"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M 4 30 Q 40 10, 72 20 M 62 14 L 72 20 L 62 26" />
          </svg>
        </div>

        {/* ════════════════════════════════════════════
            WORD 4  —  "REIMAGINED"
        ════════════════════════════════════════════ */}
        <div className="relative flex h-screen items-center pl-20 pr-10 shrink-0">
          <span className="select-none font-cinzel font-black italic text-[22vw] leading-none tracking-tighter text-white/[0.07] uppercase whitespace-nowrap">
            REIMAGINED
          </span>

          {/* ── Number badge ② ── */}
          <div className="lc-badge absolute left-8 top-1/3 w-12 h-12 rounded-full border border-red-500/40 bg-[#111] flex items-center justify-center font-mono text-lg text-red-400/80 shadow-2xl">
            ②
          </div>

          {/* ── The 2014 card ── */}
          <div
            className="lc-card absolute right-[8vw] top-1/2 -translate-y-[55%] w-[290px] rounded-xl border border-red-900/40 bg-[#0d0d0d]/90 backdrop-blur-md p-6 shadow-2xl -rotate-1"
            style={{ zIndex: 10 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-red-600" />
              <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#ff2a2a]">
                The 2014 Transition
              </span>
            </div>
            <h3 className="font-cinzel text-lg text-white leading-snug">
              FROM THE LENS<br />TO GOLD CRAFT.
            </h3>
            <blockquote className="mt-3 border-l-2 border-amber-500/50 pl-3 font-serif italic text-xs text-neutral-300/90 leading-relaxed">
              &ldquo;Master the light as an artist, and protect every client&apos;s trust like family gold.&rdquo;
            </blockquote>
            <p className="mt-3 text-[10px] font-mono text-neutral-500">— Shri Vijay Nandan Sharma</p>
          </div>

          {/* ── Annotation #3 ── */}
          <div className="lc-annot absolute bottom-[22%] left-[30vw] flex items-start gap-2 pointer-events-none">
            <span className="text-neutral-400/80 font-mono text-xs mt-0.5">+</span>
            <span className="font-serif italic text-neutral-300/70 text-sm leading-snug max-w-[200px]">
              from our hands to theirs,<br />arriving whole
            </span>
          </div>

          {/* ── Down-curved arrow ── */}
          <svg
            className="lc-arrow absolute bottom-[16%] right-[25vw] w-20 h-16 fill-none stroke-neutral-500/50"
            viewBox="0 0 80 64"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M 72 8 Q 76 40, 44 56 M 50 62 L 44 56 L 56 54" />
          </svg>
        </div>

        {/* ════════════════════════════════════════════
            WORD 5  —  "IN CINEMA."
        ════════════════════════════════════════════ */}
        <div className="relative flex h-screen items-center pl-10 pr-20 shrink-0">
          <span className="select-none font-cinzel font-black text-[22vw] leading-none tracking-tighter text-white/[0.07] uppercase whitespace-nowrap">
            IN CINEMA.
          </span>

          {/* ── Floating Photo Card: Sinu ── */}
          <div
            className="lc-card absolute left-[22vw] top-1/2 -translate-y-[55%] w-[260px] sm:w-[300px] rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-[0_24px_64px_rgba(138,3,3,0.4)] rotate-1"
            style={{ zIndex: 10 }}
          >
            {/* red washi-tape strip */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-red-950/50 border border-red-700/40 backdrop-blur-md rounded-sm flex items-center justify-center rotate-[1deg] pointer-events-none z-20">
              <span className="text-[8px] font-mono tracking-widest text-red-300 uppercase">DIRECTOR · 2014</span>
            </div>

            <div className="relative w-full aspect-[3/4]">
              <Image
                src="/assets/images/my.jpeg"
                alt="Subham Sharma (Sinu) — Creative Director"
                fill
                className="object-cover object-top grayscale"
                sizes="320px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                <span className="text-[9px] font-mono tracking-widest text-white/80 uppercase bg-black/60 px-2 py-0.5 rounded">Lead Cinematographer</span>
                <span className="text-[9px] font-mono text-red-400">2014—Now</span>
              </div>
            </div>

            <div className="p-4">
              <p className="font-cinzel text-sm text-white tracking-wide">Subham Sharma (Sinu)</p>
              <p className="mt-1 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                Creative Director & Elder Son
              </p>
              <p className="mt-2 text-[11px] font-sans text-neutral-400 leading-relaxed">
                Elevated Calcutta Studio into dark gothic bridal cinema, sacred temple films & high-fashion couture.
              </p>
            </div>
          </div>

          {/* ── Number badge ③ ── */}
          <div className="lc-badge absolute right-[14vw] top-1/3 w-12 h-12 rounded-full border border-red-500/50 bg-[#111] flex items-center justify-center font-mono text-lg text-red-400/80 shadow-2xl">
            ③
          </div>

          {/* ── Annotation #4 ── */}
          <div className="lc-annot absolute bottom-[22%] right-[16vw] flex items-start gap-2 pointer-events-none">
            <span className="text-neutral-400/80 font-mono text-xs mt-0.5">+</span>
            <span className="font-serif italic text-neutral-300/70 text-sm leading-snug max-w-[180px]">
              reinventing bridal<br />couture cinema
            </span>
          </div>

          {/* ── Up-curved arrow ── */}
          <svg
            className="lc-arrow absolute bottom-[20%] left-[14vw] w-24 h-16 fill-none stroke-neutral-500/50"
            viewBox="0 0 96 64"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M 8 56 Q 48 60, 88 16 M 78 10 L 88 16 L 82 28" />
          </svg>
        </div>

        {/* ════════════════════════════════════════════
            CLOSING PANEL — CTA & Grand Seal
        ════════════════════════════════════════════ */}
        <div className="relative flex h-screen shrink-0 items-center px-20 min-w-[600px]">
          <div className="max-w-md space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-6 h-[1px] bg-red-600" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#ff2a2a]">
                Unbroken Lineage
              </span>
            </div>

            <h2 className="font-cinzel text-4xl lg:text-5xl text-white leading-[1.1] tracking-tight">
              TWO GENERATIONS.<br />
              <span className="font-serif italic font-light text-amber-200/90">
                One Legacy.
              </span>
            </h2>

            <p className="text-sm font-sans text-neutral-400 leading-relaxed">
              Every frame we capture honors the foundation built by our father in 1998, 
              seamlessly blended with contemporary cinematic vision.
            </p>

            <div className="flex items-center gap-6 pt-2">
              <div className="text-center">
                <p className="font-cinzel text-2xl text-white">1998</p>
                <p className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">Founded</p>
              </div>
              <span className="text-neutral-700 text-xl">→</span>
              <div className="text-center">
                <p className="font-cinzel text-2xl text-amber-200">2014</p>
                <p className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">Torch Passed</p>
              </div>
              <span className="text-neutral-700 text-xl">→</span>
              <div className="text-center">
                <p className="font-cinzel text-2xl text-red-500">TODAY</p>
                <p className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">Cinema Atelier</p>
              </div>
            </div>

            <Link
              href="/works"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-xs font-sans font-semibold tracking-wider uppercase hover:bg-neutral-200 transition-colors"
            >
              <span>View Our Works Archive</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── MOBILE: simple vertical stack (no pin) ── */}
      <style>{`
        @media (max-width: 767px) {
          #legacy > div:first-child { display: none !important; }
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
              Papa started Calcutta Studio in 1998. In 2014, he transitioned to our family jewellery business, passing the studio reins to his elder son.
            </p>
            <svg viewBox="0 0 200 48" className="w-32 h-auto fill-none stroke-amber-200/80" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 36 C14 16 20 10 30 16 C36 20 22 44 20 46 M26 28 C32 26 40 27 44 31 M40 20 L40 22 M50 30 C54 25 60 23 64 27 C67 30 64 40 60 48 C57 54 48 52 52 44 M68 28 C72 22 80 22 84 27 C88 32 85 42 88 42 C94 42 100 28 104 28 C110 28 112 36 116 36 M4 44 C50 42 120 44 196 40" />
            </svg>
          </div>
        </div>

        {/* 2014 Bridge Mobile */}
        <div className="rounded-xl border border-white/10 bg-[#0e0e0e] p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-xs text-red-400">②</span>
            <span className="text-[9px] font-mono tracking-widest text-red-400 uppercase">The 2014 Shift</span>
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
              <span className="text-[9px] font-mono tracking-widest text-red-400 uppercase">Director · 2014–Present</span>
            </div>
            <h3 className="font-cinzel text-lg text-white mb-2">Subham Sharma (Sinu)</h3>
            <p className="text-xs font-sans text-neutral-400 leading-relaxed">
              Stepping in at 2014, Subham elevated Calcutta Studio into dark gothic luxury bridal cinema and couture wedding films.
            </p>
          </div>
        </div>

        <Link href="/works" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-xs font-semibold tracking-wider uppercase">
          View Our Works →
        </Link>
      </div>
    </section>
  );
}
