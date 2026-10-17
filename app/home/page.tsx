import React from "react"
import { GlobalCanvas } from "@/features/home/components/GlobalCanvas/GlobalCanvas"
import Hero from "@/features/home/components/Hero/Hero"
import About from "@/features/home/components/About/About"

export default function HomePage() {
  return (
    <div className="relative h-screen">
      <GlobalCanvas />
      <div className="relative z-10 w-full">
        <Hero />
        <About />
      </div>
    </div>
  );
} 