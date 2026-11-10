"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const tiers = [
  {
    id: "sketch-monster",
    name: "Sketch Design Monster",
    category: "monster",
    description:
      "Exclusive to demons and monsters. A clean full-body sketch featuring",
    features: [
      "Clean & polished digital sketch",
      "Full-body character subject",
      "2 Full-demo revisions included",
      "Choice of: Semi-Human OR Non-Human",
      "Price adjusts based on detail level",
    ],
    price: "700k VND",
    image: "/assets/projects/monsters/asaktra.png",
  },
  {
    id: "sketch-gothic",
    name: "Sketch Design Gothic",
    category: "des-gothic",
    description:
      "Specialized in gothic dress designs for your character or OC.",
    features: [
      "Clean & polished digital sketch",
      "Full-body character/OC subject",
      "2 Full-demo revisions included",
      "Custom gothic outfit design",
      "Price adjusts based on detail level",
    ],
    price: "700k VND",
    image: "/assets/projects/des-gothic/dg6.png",
  },
  {
    id: "illustration",
    name: "Illustration",
    category: "visual-char",
    description:
      "A fully realized summoning. Available in both Traditional (A4) and",
    features: [
      "Waist-up: 460k (Tradi) / 460k (Digi)",
      "Halfbody: 550k (Tradi) / 550k (Digi)",
      "Fullbody: 650k (Tradi) / 650k (Digi)",
      "Highly detailed & atmospheric rendering",
      "Custom backgrounds & complex lighting",
    ],
    price: "From 460k VND",
    image: "/assets/projects/visuals/kantel-board.png",
  },
];

export default function Pact() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.fromTo(
        cardsRef.current,
        {
          y: 60,
          opacity: 0,
          scale: 0.96,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="pact"
      className="relative min-h-screen w-full bg-transparent py-16 md:py-32 px-6 md:px-16 flex flex-col items-center justify-center"
    >
      <div className="text-center mb-12 md:mb-24 max-w-2xl relative z-10 pointer-events-none">
        <h2 className="text-sm font-sans tracking-[0.4em] text-[#8a0303] uppercase mb-4 md:mb-6">
          The Pact
        </h2>
        <h3 className="text-4xl md:text-7xl font-cinzel text-neutral-200 uppercase tracking-widest drop-shadow-2xl mb-6 md:mb-8">
          Commissions
        </h3>
        <p className="text-neutral-400 font-sans text-xs md:text-sm leading-relaxed tracking-widest px-4 md:px-0">
          Bind your vision to the canvas. Select a tier of manifestation and let
          the nightmare take form.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 w-full max-w-7xl relative z-10">
        {tiers.map((tier, index) => (
          <div
            key={tier.id}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            className="group relative flex flex-col bg-[#080808]/90 border border-neutral-900 overflow-hidden transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-2 hover:border-[#8a0303]/60 hover:shadow-[0_0_35px_rgba(138,3,3,0.18)] will-change-transform rounded-xs"
          >
            <div className="h-48 md:h-64 w-full relative overflow-hidden border-b border-neutral-900/80 grayscale group-hover:grayscale-0 transition-[filter] duration-700">
              <Image
                src={tier.image}
                alt={tier.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-top opacity-55 group-hover:opacity-85 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent pointer-events-none"></div>
            </div>

            <div className="flex flex-col grow p-6 md:p-8">
              <h4 className="font-cinzel text-xl md:text-2xl text-neutral-200 mb-2 uppercase">
                {tier.name}
              </h4>
              <p className="font-sans text-[#8a0303] text-base md:text-lg tracking-widest mb-4 md:mb-6 border-b border-neutral-900 pb-4 md:pb-6">
                {tier.price}
              </p>

              <p className="text-neutral-500 font-sans text-[10px] md:text-xs leading-relaxed tracking-widest mb-6 md:mb-8 min-h-12 md:min-h-16">
                {tier.description}
              </p>

              <ul className="flex flex-col gap-2 md:gap-3 font-sans text-[10px] md:text-xs tracking-widest text-neutral-400 uppercase mb-8 md:mb-12 grow">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 md:gap-3">
                    <span className="text-[#8a0303] mt-px">+</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/works?category=${tier.category}`}
                className="w-full py-3 md:py-4 border border-neutral-800 text-center font-sans tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs uppercase text-neutral-400 hover:text-white hover:border-[#8a0303] hover:bg-[#8a0303]/10 transition-all duration-300 block"
              >
                Summon
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
