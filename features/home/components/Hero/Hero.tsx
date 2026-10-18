
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
                className="relative z-20 flex flex-col w-full max-w-7xl mx-auto px-8 md:px-16 pointer-events-none select-none -mt-4 md:-mt-8"
            >
                {/* Line 1: ART (Top Left) */}
                <div className="w-full flex justify-start pl-[2vw] md:pl-[6vw] lg:pl-[10vw]">
                    <span className="font-cinzel text-white text-7xl sm:text-8xl md:text-[9vw] lg:text-[10vw] font-normal uppercase tracking-tight leading-none drop-shadow-2xl">
                        ART
                    </span>
                </div>

                {/* Line 2: & (Center) */}
                <div className="w-full flex justify-center -my-3 sm:-my-6 md:-my-8 lg:-my-10">
                    <span className="font-serif italic text-white/95 text-5xl sm:text-7xl md:text-[6.5vw] lg:text-[7vw] leading-none drop-shadow-xl select-none">
                        {"&"}
                    </span>
                </div>

                {/* Line 3: SOUL (Bottom Right) */}
                <div className="w-full flex justify-end pr-[2vw] md:pr-[6vw] lg:pr-[8vw]">
                    <span
                        className="font-cinzel italic font-black uppercase text-transparent text-7xl sm:text-8xl md:text-[9.5vw] lg:text-[11vw] tracking-tight leading-none"
                        style={{
                            WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.9)",
                            filter: "drop-shadow(0 0 25px rgba(255, 255, 255, 0.1))",
                        }}
                    >
                        SOUL
                    </span>
                </div>
            </div>

            {/* Artist Information */}
            <div className="absolute inset-x-8 md:inset-x-16 bottom-8 md:bottom-12 flex flex-row justify-between items-end pointer-events-none z-30 opacity-70">
                <div className="flex flex-col space-y-1">
                    <span className="text-xs uppercase tracking-[0.5em] font-sans text-neutral-400">
                        Digital Artist
                    </span>

                    <span className="font-serif text-sm italic text-red-800">
                        Est. 2026
                    </span>
                </div>

                <p className="text-right text-neutral-500 font-serif tracking-[0.25em] text-xs md:text-sm uppercase max-w-[240px] md:max-w-xs leading-relaxed">
                    &quot;Draw first for yourself,
                    <br />
                    for half of your soul.&quot;
                </p>
            </div>
        </section>
    );
}
