"use client";

import React, { useRef } from "react";
import Image from "next/image";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Project, projects } from "@/shared/data/projects";
import { section } from "framer-motion/client";

gsap.registerPlugin(ScrollTrigger);

const desGothicProjects = projects.filter((p) => p.category === "des-gothic")
const monsterProjects = projects.filter((p) => p.category === "monster")
const visualCharProjects = projects.filter((p) => p.category === "visual-char")


interface GalleryRowProps {
    title: string;
    subtitle: string;
    items: Project[];
    isReverse?: boolean;
}

function GalleryRow({
    title,
    subtitle,
    items,
    isReverse = false,
}: GalleryRowProps) {
    const selectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [hasMounted , setHasMounted] = React.useState(false);
    const [isMobile , setisMobile] = React.useState(false);




    React.useEffect(()=>{
        setHasMounted(true);
        const handleResize =()=>{
            setisMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useGSAP(
        () => {
            if (!selectionRef.current || !trackRef.current || isMobile || !hasMounted) {
                return;
            }

            const getScrollWidth = () =>
                Math.max(0, trackRef.current!.scrollWidth - window.innerWidth);

            if (isReverse) {
                gsap.fromTo(
                    trackRef.current,
                    { x: getScrollWidth() },
                    {
                        x: 0,
                        ease: "none",
                        scrollTrigger: {
                            trigger: selectionRef.current,
                            start: "top top",
                            end: () => `+=${window.innerHeight * 3}`,
                            pin: true,
                            anticipatePin: 1,
                            scrub: 1,
                            invalidateOnRefresh: true,
                        },
                    }
                );
            } else {
                gsap.fromTo(
                    trackRef.current,
                    { x: 0 },
                    {
                        x: () => -getScrollWidth(),
                        ease: "none",
                        scrollTrigger: {
                            trigger: selectionRef.current,
                            start: "top top",
                            end: () => `+=${window.innerHeight * 3}`,
                            pin: true,
                            anticipatePin: 1,
                            scrub: 1,
                            invalidateOnRefresh: true,
                        },
                    }
                );
            }
        },
        { scope: selectionRef, dependencies: [hasMounted, isMobile] }
    );

    

}