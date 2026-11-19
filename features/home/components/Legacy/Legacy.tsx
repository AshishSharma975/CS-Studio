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
  const canvasRef = useRef<HTMLDivElement>(null);

  const titleRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const closingCardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const canvas = canvasRef.current;
      const title = titleRef.current;
      const card1 = card1Ref.current;
      const card2 = card2Ref.current;
      const card3 = card3Ref.current;
      const closingCard = closingCardRef.current;

      if (!section || !canvas || !title || !card1 || !card2 || !card3 || !closingCard) return;

      /* ── Dynamic SVG stroke lengths for accurate scroll drawing ── */
      const sigPaths = gsap.utils.toArray<SVGPathElement>(".lc-sig-path");
      sigPaths.forEach((p) => {
        const len = p.getTotalLength ? p.getTotalLength() : 750;
        gsap.set(p, { strokeDasharray: len + 2, strokeDashoffset: len + 2 });
      });

      const arrowPaths = gsap.utils.toArray<SVGPathElement>(".arrow-path");
      arrowPaths.forEach((p) => {
        const len = p.getTotalLength ? p.getTotalLength() : 350;
        gsap.set(p, { strokeDasharray: len + 2, strokeDashoffset: len + 2 });
      });

      /* ── Accurate Camera Centering on Element (Desktop & Mobile Unified) ── */
      const getTargetPos = (el: HTMLElement | null) => {
        if (!el || !canvas) return { x: 0, y: 0 };
        let cur: HTMLElement | null = el;
        let top = 0;
        let left = 0;
        while (cur && cur !== canvas) {
          left += cur.offsetLeft;
          top += cur.offsetTop;
          cur = cur.offsetParent as HTMLElement | null;
        }
        const cx = left + el.offsetWidth / 2;
        const cy = top + el.offsetHeight / 2;
        return {
          x: window.innerWidth / 2 - cx,
          y: window.innerHeight / 2 - cy,
        };
      };

      // Set initial camera view centered on the Intro Title
      const pTitle = getTargetPos(title);
      gsap.set(canvas, { x: pTitle.x, y: pTitle.y });

      /* ── Main GSAP 2D Canvas Scrub Timeline ── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => (window.innerWidth < 768 ? "+=2600" : "+=4200"),
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (window.innerWidth >= 1024) return;
            const p = self.progress;
            const isPapa = p >= 0.07 && p <= 0.24;
            const isSinu = p >= 0.46 && p <= 0.74;

            const papaImg = card1?.querySelector<HTMLElement>(".photo-bw-reveal");
            const papaBadge = card1?.querySelector<HTMLElement>(".lc-badge");
            papaImg?.classList.toggle("is-in-center", isPapa);
            papaBadge?.classList.toggle("is-badge-active", isPapa);

            const sinuImg = card3?.querySelector<HTMLElement>(".photo-bw-reveal");
            const sinuBadge = card3?.querySelector<HTMLElement>(".lc-badge");
            sinuImg?.classList.toggle("is-in-center", isSinu);
            sinuBadge?.classList.toggle("is-badge-active", isSinu);
          },
        },
      });

      // Title fades/slides up quickly as soon as user begins scrolling
      tl.to(title, { opacity: 0, y: -40, ease: "power1.out", duration: 1 }, 0);

      // Step 1: Snappy pan to Card 1 (Papa)
      tl.to(
        canvas,
        {
          x: () => getTargetPos(card1).x,
          y: () => getTargetPos(card1).y,
          ease: "power1.inOut",
          duration: 1.2,
        },
        0
      );

      // Papa's signature draws during Card 1 view
      tl.to(".lc-sig-path", { strokeDashoffset: 0, ease: "power1.inOut", duration: 1.5 }, 0.4);

      // Arrow 1 draws as we transition toward Card 2
      tl.to(".arrow-1-path", { strokeDashoffset: 0, ease: "power1.out", duration: 1.5 }, 1.5);

      // Step 2: Diagonal swoosh down along Arrow to Card 2 (HERITAGE)
      tl.to(
        canvas,
        {
          x: () => getTargetPos(card2).x,
          y: () => getTargetPos(card2).y,
          ease: "power2.inOut",
          duration: 2.6,
        },
        2.2
      );

      // Arrow 2 draws as we transition toward Card 3
      tl.to(".arrow-2-path", { strokeDashoffset: 0, ease: "power1.out", duration: 1.5 }, 4.5);

      // Step 3: Diagonal swoosh up along Arrow to Card 3 (CINEMA)
      tl.to(
        canvas,
        {
          x: () => getTargetPos(card3).x,
          y: () => getTargetPos(card3).y,
          ease: "power2.inOut",
          duration: 2.6,
        },
        5.1
      );

      // Step 4: Glide to Closing Panel
      tl.to(
        canvas,
        {
          x: () => getTargetPos(closingCard).x,
          y: () => getTargetPos(closingCard).y,
          ease: "power1.out",
          duration: 2.2,
        },
        8.0
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="legacy"
      className="relative w-full h-screen overflow-hidden bg-[#050505] text-white select-none"
    >
      {/* ── Fixed Top Architectural Navigation Bar (Safe under mobile header) ── */}
      <div className="absolute top-20 md:top-6 left-6 right-6 md:left-8 md:right-8 z-30 flex items-center justify-between pointer-events-none border-b border-white/10 pb-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.25em] sm:tracking-[0.35em] text-neutral-400">
            A Tale of Two Generations // 1998 — Present
          </span>
        </div>
        <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-neutral-500 uppercase">
          [ SCROLL TO EXPLORE ]
        </span>
      </div>

      {/* ── 2D Camera Canvas (Shared on both Desktop & Mobile) ── */}
      <div
        ref={canvasRef}
        className="giant-canvas will-change-transform absolute top-0 left-0"
        style={{ width: "9500px", height: "2400px" }}
      >
        {/* INTRO TITLE: "WHY WE EXIST" */}
        <div
          ref={titleRef}
          className="absolute z-10 flex flex-col items-center justify-center text-center px-4 w-[90vw] max-w-[850px]"
          style={{ left: "200px", top: "150px" }}
        >
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.45em] text-red-500 mb-2">
            WHY WE EXIST
          </span>
          <h2 className="font-cinzel font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.08] uppercase">
            WE&apos;RE HERE FOR THE SACRED MOMENTS.
          </h2>
          <p className="font-serif italic text-neutral-400 text-xs sm:text-sm md:text-base mt-3 max-w-lg">
            Preserving timeless love through devotion, cinema, and unbroken family craft.
          </p>
          <div className="flex items-center gap-2 mt-4 text-neutral-500 text-[10px] font-mono tracking-widest uppercase">
            <span className="animate-pulse">Scroll to explore</span>
            <span>↓</span>
          </div>
        </div>

        {/* ROW 1: "TO [Papa's Card] DEVOTION" (HIGH) */}
        <div
          className="absolute flex items-center whitespace-nowrap"
          style={{ left: "300px", top: "450px" }}
        >
          <div className="flex items-center font-cinzel font-black text-[clamp(90px,16vw,260px)] leading-[0.82] tracking-tighter text-white">
            <span className="self-start text-[0.14em] font-mono text-amber-300 border border-amber-400/40 rounded-full w-[0.24em] h-[0.24em] flex items-center justify-center mr-[0.1em] mt-[0.06em] shadow-[0_0_30px_rgba(251,191,36,0.3)]">
              1
            </span>

            <span>TO</span>

            {/* Embedded Photo Card: Papa */}
            <div
              ref={card1Ref}
              className="group relative mx-4 sm:mx-10 shrink-0 overflow-hidden rounded-2xl border border-white/20 bg-[#0a0a0a] shadow-[0_30px_90px_rgba(0,0,0,0.95)] whitespace-normal font-sans tracking-normal leading-normal cursor-pointer select-none w-[290px] sm:w-[320px] h-[410px] sm:h-[440px]"
              style={{
                transform: "rotate(2deg)",
              }}
            >
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-32 h-6 bg-amber-100/25 border border-white/30 backdrop-blur-md rounded-sm flex items-center justify-center rotate-[-1deg] z-20 pointer-events-none shadow-md">
                <span className="text-[8px] font-mono tracking-widest text-white/90 uppercase">
                  FOUNDER · 1998
                </span>
              </div>

              <div className="relative w-full h-[62%] overflow-hidden bg-neutral-900">
                <Image
                  src="/assets/images/father-vijay-nandan-sharma.jpg"
                  alt="Shri Vijay Nandan Sharma — Founder"
                  fill
                  className="photo-bw-reveal object-cover group-hover:scale-105"
                  sizes="360px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute top-3 right-3 z-10">
                  <span className="lc-badge text-[8px] font-mono px-2 py-0.5 rounded border bg-black/70 border-white/20 text-amber-200">
                    REAL COLOR
                  </span>
                </div>
              </div>

              <div className="p-4 bg-[#0a0a0a] text-left">
                <p className="font-cinzel text-sm sm:text-base text-white font-bold leading-tight">
                  Shri Vijay Nandan Sharma
                </p>
                <p className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest mt-0.5">
                  Calcutta Studio — Founder
                </p>

                <div className="mt-2 pt-2 border-t border-white/10">
                  <svg
                    viewBox="0 0 240 60"
                    className="w-48 sm:w-52 h-auto fill-none stroke-amber-300 drop-shadow-[0_2px_8px_rgba(251,191,36,0.3)]"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path
                      className="lc-sig-path"
                      d="M 12 38 C 18 18, 24 12, 32 18 C 38 24, 28 46, 26 48 C 32 30, 42 28, 48 34 C 54 40, 52 46, 56 46 M 46 22 L 46 24 M 64 34 C 68 28, 74 26, 78 30 C 82 34, 78 44, 74 52 C 70 58, 62 56, 66 48 M 84 32 C 88 26, 96 26, 100 30 C 104 34, 100 44, 104 44 C 110 44, 116 32, 120 32 C 126 32, 128 38, 132 38 M 140 28 C 146 16, 154 14, 160 18 C 166 22, 158 36, 154 40 C 158 34, 168 32, 174 36 C 178 38, 176 46, 182 46 C 188 46, 194 36, 198 36 C 204 36, 206 42, 212 42 M 8 50 C 60 46, 140 48, 228 44"
                    />
                  </svg>
                  <p className="font-serif italic text-[11px] text-amber-200/90 tracking-wide mt-1">
                    Vijay Nandan Sharma
                  </p>
                </div>
              </div>
            </div>

            <span>DEVOTION</span>
          </div>

          <div
            className="absolute flex items-start gap-2.5 pointer-events-none"
            style={{ left: "28%", top: "85%" }}
          >
            <div className="relative w-8 h-12 shrink-0">
              <svg className="w-8 h-12 overflow-visible" viewBox="0 0 40 60" fill="none">
                <path d="M 0 12 C 12 11 28 13 40 12" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M 12 0 C 11 20 13 40 12 60" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="font-serif italic text-neutral-300 text-sm leading-tight tracking-wide">
              <p>where the lens</p>
              <p>first caught</p>
              <p>sacred light.</p>
            </div>
          </div>
        </div>

        {/* DIAGONAL DOWN ARROW */}
        <div
          className="absolute pointer-events-none"
          style={{ left: "2450px", top: "720px", width: "420px", height: "300px" }}
        >
          <svg viewBox="0 0 150 100" fill="none" className="w-full h-full overflow-visible">
            <path
              className="arrow-path arrow-1-path stroke-red-500"
              strokeWidth="2.2"
              strokeLinecap="round"
              d="M4 8 C 46 14 100 42 132 84"
            />
            <path
              className="arrow-path arrow-1-path stroke-red-500"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M111 80 L132 84 L123 65"
            />
          </svg>
        </div>

        {/* ROW 2: "TO [Transition Card] HERITAGE" (LOW) */}
        <div
          className="absolute flex items-center whitespace-nowrap"
          style={{ left: "3000px", top: "1250px" }}
        >
          <div className="flex items-center font-cinzel font-black text-[clamp(90px,16vw,260px)] leading-[0.82] tracking-tighter text-white">
            <span className="self-start text-[0.14em] font-mono text-red-400 border border-red-500/40 rounded-full w-[0.24em] h-[0.24em] flex items-center justify-center mr-[0.1em] mt-[0.06em] shadow-[0_0_30px_rgba(239,68,68,0.3)]">
              2
            </span>

            <span>TO</span>

            <div
              ref={card2Ref}
              className="relative mx-4 sm:mx-10 shrink-0 overflow-hidden rounded-2xl border border-red-900/50 bg-[#0d0d0d] p-5 sm:p-6 shadow-[0_30px_90px_rgba(138,3,3,0.5)] whitespace-normal font-sans tracking-normal leading-normal w-[290px] sm:w-[340px] h-[410px] sm:h-[440px]"
              style={{
                transform: "rotate(-2deg)",
              }}
            >
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-32 h-6 bg-red-950/60 border border-red-600/40 backdrop-blur-md rounded-sm flex items-center justify-center rotate-[1deg] z-20 pointer-events-none">
                <span className="text-[8px] font-mono tracking-widest text-red-300 uppercase">
                  THE 2014 SHIFT
                </span>
              </div>

              <div className="flex items-center gap-2 mb-3 mt-4">
                <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#ff2a2a]">
                  TORCH PASSED
                </span>
              </div>

              <h4 className="font-cinzel text-base sm:text-xl text-white leading-snug font-bold">
                FROM THE LENS<br />TO JEWELLERY CRAFT.
              </h4>

              <blockquote className="mt-3 sm:mt-4 border-l-2 border-amber-500/60 pl-3 font-serif italic text-xs sm:text-sm text-neutral-200 leading-relaxed">
                &ldquo;Master the light as an artist, and protect every client&apos;s trust like family gold.&rdquo;
              </blockquote>

              <p className="mt-2.5 sm:mt-3 text-[10px] font-mono text-neutral-400">
                — Shri Vijay Nandan Sharma
              </p>

              <div className="mt-4 sm:mt-5 pt-3 border-t border-white/10">
                <p className="text-[11px] font-sans text-neutral-300 leading-relaxed">
                  In 2014, Shri Vijay Nandan Sharma transitioned to our family jewellery business, passing studio leadership over to his elder son.
                </p>
              </div>
            </div>

            <span>HERITAGE</span>
          </div>

          <div
            className="absolute flex items-start gap-2.5 pointer-events-none"
            style={{ left: "24%", top: "-18%" }}
          >
            <div className="relative w-8 h-12 shrink-0">
              <svg className="w-8 h-12 overflow-visible" viewBox="0 0 40 60" fill="none">
                <path d="M 0 12 C 12 11 28 13 40 12" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M 12 0 C 11 20 13 40 12 60" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="font-serif italic text-neutral-300 text-sm leading-tight tracking-wide">
              <p>master the light,</p>
              <p>protect trust</p>
              <p>like family gold.</p>
            </div>
          </div>
        </div>

        {/* DIAGONAL UP ARROW */}
        <div
          className="absolute pointer-events-none"
          style={{ left: "5050px", top: "850px", width: "420px", height: "300px" }}
        >
          <svg viewBox="0 0 150 100" fill="none" className="w-full h-full overflow-visible">
            <path
              className="arrow-path arrow-2-path stroke-amber-400"
              strokeWidth="2.2"
              strokeLinecap="round"
              d="M4 92 C 46 86 100 58 132 16"
            />
            <path
              className="arrow-path arrow-2-path stroke-amber-400"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M111 20 L132 16 L123 35"
            />
          </svg>
        </div>

        {/* ROW 3: "TO [Sinu's Card] CINEMA" (HIGH) */}
        <div
          className="absolute flex items-center whitespace-nowrap"
          style={{ left: "5600px", top: "480px" }}
        >
          <div className="flex items-center font-cinzel font-black text-[clamp(90px,16vw,260px)] leading-[0.82] tracking-tighter text-white">
            <span className="self-start text-[0.14em] font-mono text-red-500 border border-red-500/40 rounded-full w-[0.24em] h-[0.24em] flex items-center justify-center mr-[0.1em] mt-[0.06em] shadow-[0_0_30px_rgba(239,68,68,0.3)]">
              3
            </span>

            <span>TO</span>

            <div
              ref={card3Ref}
              className="group relative mx-4 sm:mx-10 shrink-0 overflow-hidden rounded-2xl border border-white/20 bg-[#0a0a0a] shadow-[0_30px_90px_rgba(138,3,3,0.5)] whitespace-normal font-sans tracking-normal leading-normal cursor-pointer select-none w-[290px] sm:w-[320px] h-[410px] sm:h-[440px]"
              style={{
                transform: "rotate(2deg)",
              }}
            >
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-32 h-6 bg-red-950/70 border border-red-700/50 backdrop-blur-md rounded-sm flex items-center justify-center rotate-[1deg] z-20 pointer-events-none shadow-md">
                <span className="text-[8px] font-mono tracking-widest text-red-300 uppercase">
                  DIRECTOR · 2014—NOW
                </span>
              </div>

              <div className="relative w-full h-[62%] overflow-hidden bg-neutral-900">
                <Image
                  src="/assets/images/my.jpeg"
                  alt="Subham Sharma (Sinu) — Creative Director"
                  fill
                  className="photo-bw-reveal object-cover object-top group-hover:scale-105"
                  sizes="360px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute top-3 right-3 z-10">
                  <span className="lc-badge lc-badge-sinu text-[8px] font-mono px-2 py-0.5 rounded border bg-black/70 border-white/20 text-red-300">
                    REAL COLOR
                  </span>
                </div>
                <div className="absolute bottom-2 left-3 right-3 flex justify-between items-center">
                  <span className="text-[8px] font-mono tracking-widest text-white/90 uppercase bg-black/70 px-2 py-0.5 rounded border border-white/10">
                    Lead Cinematographer
                  </span>
                  <span className="text-[8px] font-mono text-red-400 font-semibold">2014—Today</span>
                </div>
              </div>

              <div className="p-4 bg-[#0a0a0a] text-left">
                <p className="font-cinzel text-sm sm:text-base text-white font-bold leading-tight">
                  Subham Sharma (Sinu)
                </p>
                <p className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest mt-0.5">
                  Elder Son & Creative Director
                </p>
                <p className="mt-2 text-[11px] font-sans text-neutral-300 leading-relaxed">
                  Elevated Calcutta Studio into dark gothic luxury wedding cinema and high-fashion couture bridal films.
                </p>
              </div>
            </div>

            <span>CINEMA</span>
          </div>

          <div
            className="absolute flex items-start gap-2.5 pointer-events-none"
            style={{ left: "28%", top: "85%" }}
          >
            <div className="relative w-8 h-12 shrink-0">
              <svg className="w-8 h-12 overflow-visible" viewBox="0 0 40 60" fill="none">
                <path d="M 0 12 C 12 11 28 13 40 12" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M 12 0 C 11 20 13 40 12 60" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="font-serif italic text-neutral-300 text-sm leading-tight tracking-wide">
              <p>reinventing</p>
              <p>sacred bridal</p>
              <p>couture cinema.</p>
            </div>
          </div>
        </div>

        {/* CLOSING PANEL */}
        <div
          className="absolute flex items-center shrink-0"
          style={{ left: "7800px", top: "420px" }}
        >
          <div
            ref={closingCardRef}
            className="w-[90vw] max-w-xl space-y-5 sm:space-y-6 bg-[#0a0a0a]/95 backdrop-blur-xl p-6 sm:p-10 rounded-3xl border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.95)] whitespace-normal font-sans"
          >
            <div className="flex items-center gap-2">
              <span className="w-8 h-[1px] bg-red-600" />
              <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#ff2a2a]">
                Unbroken Lineage
              </span>
            </div>

            <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.1] tracking-tight">
              TWO GENERATIONS.<br />
              <span className="font-serif italic font-light text-amber-200/95">
                One Undying Legacy.
              </span>
            </h2>

            <p className="text-xs sm:text-sm font-sans text-neutral-300 leading-relaxed">
              Every frame we craft today honors the foundation built by our Founder in 1998, 
              seamlessly reimagined through modern dark gothic couture cinema.
            </p>

            <div className="grid grid-cols-3 gap-2 sm:gap-4 py-4 border-y border-white/10 text-center">
              <div>
                <p className="font-cinzel text-base sm:text-xl text-white font-bold">1998</p>
                <p className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest mt-1">Founder Era</p>
              </div>
              <div className="border-x border-white/10">
                <p className="font-cinzel text-base sm:text-xl text-amber-200 font-bold">2014</p>
                <p className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest mt-1">Torch Passed</p>
              </div>
              <div>
                <p className="font-cinzel text-base sm:text-xl text-red-500 font-bold">TODAY</p>
                <p className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest mt-1">Modern Cinema</p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/works"
                className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-black text-xs font-sans font-bold tracking-wider uppercase hover:bg-neutral-200 active:scale-95 transition-all shadow-2xl"
              >
                Explore Full Works Archive →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
