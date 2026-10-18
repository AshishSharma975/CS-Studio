"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);
 
const TOOLS = [
  { src: "/assets/icons/medibang.svg", alt: "MediBang Paint" },
  { src: "/assets/icons/pts.svg", alt: "Photoshop" },
];

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (
        !containerRef.current ||
        !leftColRef.current ||
        !rightColRef.current
      ) {
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "bottom bottom",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        leftColRef.current,
        {
          y: 100,
          opacity: 0,
          filter: "blur(10px) grayscale(100%)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px) grayscale(0%)",
          duration: 1.5,
          ease: "power3.out",
        }
      ).fromTo(
        rightColRef.current.children,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
        },
        "-=1"
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative z-10 flex min-h-screen w-full items-center overflow-hidden py-20 text-white selection:bg-red-900"
    >
      {/* Noise texture with feathered edges */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-2 md:gap-10 md:px-12 lg:gap-16 lg:px-24">
        {/* Left image column */}
        <div
          ref={leftColRef}
          className="relative flex aspect-[3/4] w-full items-center justify-center opacity-0 md:aspect-auto md:h-[80vh]"
        >
          <div className="relative ml-auto mr-0 h-[90%] w-full max-w-sm overflow-hidden border border-neutral-800/50 shadow-2xl md:mr-8 lg:mr-12">
            <Image
              src="/assets/images/my.jpeg"
              alt="The Architect of Nightmares"
              fill
              priority
              className="object-cover object-center grayscale transition-all duration-1000 ease-in-out hover:scale-105 hover:grayscale-0"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

            <div className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-30">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage:
                    "url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')",
                }}
              />
            </div>

            <div className="absolute bottom-5 left-5 z-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-300">
                Visual Archive
              </p>
              <p className="mt-1 font-serif text-lg italic text-white">
                Beyond the ordinary.
              </p>
            </div>
          </div>
        </div>

        {/* Right text column */}
        <div
          ref={rightColRef}
          className="flex flex-col justify-center space-y-8 py-8 md:py-24 md:pr-4 lg:pr-12"
        >
          {/* Section heading */}
          <div className="space-y-3">
            <p className="font-sans text-sm uppercase tracking-[0.3em] text-neutral-500">
              The Architect of Nightmares
            </p>

            <h2 className="font-serif text-4xl font-normal leading-tight tracking-wide text-neutral-100 sm:text-5xl lg:text-6xl">
              The Architect of Nightmares
            </h2>

            <div className="h-px w-20 bg-[#8a0303]" />
          </div>

          {/* Description */}
          <div className="space-y-6 text-base leading-relaxed text-neutral-400 md:text-lg">
            <p>
              In the quietest hours of the night, when the boundary between
              realms thins, I find my canvas. I am a digital artist obsessed
              with the macabre, the forgotten, and the creatures that lurk just
              beyond the periphery of our vision.
            </p>

            <p>
              My work is an exploration of darkness, not as a void, but as a
              space rich with untold stories. Through intricate inking and
              visceral digital painting, I seek to capture the haunting beauty
              within the grotesque.
            </p>

            <p>
              Every stroke is a pact with the shadows. I do not merely draw
              monsters; I excavate them from the collective unconscious, giving
              form to our deepest, most primal fears.
            </p>
          </div>
          {/* Tools */}
          <div className="pt-2">
            <div className="mb-4 h-px w-12 bg-neutral-700" />
            <p className="mb-3 font-sans text-[10px] uppercase tracking-[0.4em] text-neutral-400">
              Tools
            </p>
            <div className="flex items-center gap-5">
              {TOOLS.map((tool) => (
                <div
                  key={tool.src}
                  className="relative h-8 w-8 opacity-70 transition-opacity duration-300 hover:opacity-100"
                >
                  <Image
                    src={tool.src}
                    alt={tool.alt}
                    fill
                    className="object-contain invert"
                    sizes="32px"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Signature */}
          <div className="border-t border-neutral-800 pt-6">
            <p className="font-serif text-2xl italic tracking-wide text-neutral-200">
              Art from the Abyss.
            </p>

            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-600">
              Independent Digital Artist.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
