import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const RING_STAGES = {
  HERO: {
    X: 0,
    Y: -0.45,
    Z: 0,
    SCALE: 0.36,
    ROT_X: 0,
    ROT_Y: Math.PI,
    ROT_Z: 0,
    OPACITY: 1.0,
  },
  ABOUT: {
    X: -1.3,
    Y: -0.15,
    Z: -0.5,
    SCALE: 0.62,
    ROT_X: 0.04,
    ROT_Y: 0,
    ROT_Z: 0,
    OPACITY: 0.45,
  },
  GALLERY_BASE: {
    Y: 0.35,
    Z: -3.5,
    SCALE: 0.50,
    ROT_Z: Math.PI / 8,
    OPACITY: 0.50,
  },
  GALLERY_ROW_1_LEFT: {
    X: -1.8,
    Z: -3.5,
  },
  GALLERY_ROW_1_RIGHT: {
    X: 1.8,
    Z: -3.8,
  },
  GALLERY_ROW_2_LEFT: {
    X: -1.8,
    Z: -3.5,
  },
  GALLERY_ROW_2_RIGHT: {
    X: 1.8,
    Z: -3.8,
  },
  GALLERY_ROW_3_START: {
    X: -1.8,
    Z: -3.5,
  },
  GALLERY_ROW_3_END: {
    X: 0,
    Z: -3.0,
  },
  PACT: {
    X: 0,
    Y: 0.05,
    Z: -2.8,
    SCALE: 0.85,
    ROT_X: Math.PI / 12,
    ROT_Z: 0,
    OPACITY: 0.85,
  },
};

export const SCROLL_MARKERS = {
  HERO_END: 0.166,
  ABOUT_END: 0.333,
  GALLERY_ROW_1_END: 0.5,
  GALLERY_ROW_2_END: 0.666,
  GALLERY_ROW_3_END: 0.833,
  GALLERY_R1_START_SWEEP: 0.4,
  GALLERY_R2_START_SWEEP: 0.55,
  GALLERY_R3_START_SWEEP: 0.7,
} as const;

export function useGothicRingAnimation(
  gothicCompRef: React.RefObject<THREE.Group<THREE.Object3DEventMap> | null>,
) {
  const scrollYRef = useRef(0);

  useEffect(() => {
    const updateScroll = () => {
      scrollYRef.current = window.scrollY || window.pageYOffset || 0;
    };
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);
    updateScroll();
    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, []);

  useFrame((state) => {
    if (!gothicCompRef.current) return;

    const scrollY = scrollYRef.current;
    const width = typeof window !== "undefined" ? window.innerWidth : 1200;
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const vh = typeof window !== "undefined" ? window.innerHeight || 1 : 1;

    // Idle organic breathing floating effect
    const idleY = Math.sin(state.clock.elapsedTime * 0.8) * 0.03;
    const idleRotX = Math.sin(state.clock.elapsedTime * 0.5) * 0.04;
    const idleSpin = state.clock.elapsedTime * 0.2;

    // Responsive stage targets
    const heroX = RING_STAGES.HERO.X;
    const heroY = (isMobile ? -0.3 : isTablet ? -0.38 : RING_STAGES.HERO.Y) + idleY;
    const heroScale = isMobile ? 0.25 : isTablet ? 0.30 : RING_STAGES.HERO.SCALE;
    const heroRotX = RING_STAGES.HERO.ROT_X + idleRotX;
    const heroRotY = RING_STAGES.HERO.ROT_Y;
    const heroRotZ = RING_STAGES.HERO.ROT_Z;
    const heroOpacity = RING_STAGES.HERO.OPACITY;

    const aboutX = isMobile ? 0 : isTablet ? -0.8 : RING_STAGES.ABOUT.X;
    const aboutY = (isMobile ? -0.2 : RING_STAGES.ABOUT.Y) + idleY;
    const aboutZ = RING_STAGES.ABOUT.Z;
    const aboutScale = isMobile ? 0.38 : isTablet ? 0.50 : RING_STAGES.ABOUT.SCALE;
    const aboutRotX = RING_STAGES.ABOUT.ROT_X + idleRotX;
    const aboutRotY = RING_STAGES.ABOUT.ROT_Y;
    const aboutRotZ = RING_STAGES.ABOUT.ROT_Z;
    const aboutOpacity = RING_STAGES.ABOUT.OPACITY;

    // Base Gallery values
    const galY = (isMobile ? 0.15 : isTablet ? 0.25 : RING_STAGES.GALLERY_BASE.Y) + idleY;
    const galZ = RING_STAGES.GALLERY_BASE.Z;
    const galScale = isMobile ? 0.32 : isTablet ? 0.42 : RING_STAGES.GALLERY_BASE.SCALE;

    // Pact values
    const pactScale = isMobile ? 0.55 : isTablet ? 0.70 : RING_STAGES.PACT.SCALE;
    const pactY = (isMobile ? -0.1 : RING_STAGES.PACT.Y) + idleY;

    // Retrieve live DOM element positions
    const aboutEl = typeof document !== "undefined" ? document.getElementById("about") : null;
    const row1El = typeof document !== "undefined" ? document.getElementById("gallery-row-1") : null;
    const row2El = typeof document !== "undefined" ? document.getElementById("gallery-row-2") : null;
    const row3El = typeof document !== "undefined" ? document.getElementById("gallery-row-3") : null;
    const pactEl = typeof document !== "undefined" ? document.getElementById("pact") : null;

    // Helper to evaluate GSAP pinned / spacer rects
    const getRect = (el: HTMLElement | null) => {
      if (!el) return null;
      const spacer = (el.closest(".pin-spacer") as HTMLElement) || el;
      return spacer.getBoundingClientRect();
    };

    const rectAbout = aboutEl ? aboutEl.getBoundingClientRect() : null;
    const rect1 = getRect(row1El);
    const rect2 = getRect(row2El);
    const rect3 = getRect(row3El);
    const rectPact = pactEl ? pactEl.getBoundingClientRect() : null;

    let targetX = heroX;
    let targetY = heroY;
    let targetZ = RING_STAGES.HERO.Z;
    let targetScale = heroScale;
    let targetRotX = heroRotX;
    let targetRotY = heroRotY;
    let targetRotZ = heroRotZ;
    let targetOpacity = heroOpacity;

    // Progression values:
    const aboutEnterP = rectAbout
      ? THREE.MathUtils.clamp(1 - rectAbout.top / vh, 0, 1)
      : THREE.MathUtils.clamp(scrollY / vh, 0, 1);

    const row1EnterP = rect1
      ? THREE.MathUtils.clamp(1 - rect1.top / vh, 0, 1)
      : THREE.MathUtils.clamp((scrollY - vh) / vh, 0, 1);
    const row1PinP = rect1
      ? THREE.MathUtils.clamp(-rect1.top / (3 * vh), 0, 1)
      : THREE.MathUtils.clamp((scrollY - 2 * vh) / (3 * vh), 0, 1);

    const row2PinP = rect2
      ? THREE.MathUtils.clamp(-rect2.top / (3 * vh), 0, 1)
      : THREE.MathUtils.clamp((scrollY - 5 * vh) / (3 * vh), 0, 1);

    const row3PinP = rect3
      ? THREE.MathUtils.clamp(-rect3.top / (3 * vh), 0, 1)
      : THREE.MathUtils.clamp((scrollY - 8 * vh) / (3 * vh), 0, 1);

    const pactEnterP = rectPact
      ? THREE.MathUtils.clamp(1 - rectPact.top / vh, 0, 1)
      : THREE.MathUtils.clamp((scrollY - 11 * vh) / vh, 0, 1);

    const isRow1Pinned =
      (rect1 && rect1.top <= 0 && rect1.top > -3 * vh) ||
      (!rect1 && scrollY >= 2 * vh && scrollY < 5 * vh);

    const isRow2Pinned =
      (rect2 && rect2.top <= 0 && rect2.top > -3 * vh) ||
      (!rect2 && scrollY >= 5 * vh && scrollY < 8 * vh);

    const isRow3Pinned =
      (rect3 && rect3.top <= 0 && rect3.top > -3 * vh) ||
      (!rect3 && scrollY >= 8 * vh && scrollY < 11 * vh);

    const isPactActive =
      (rectPact && rectPact.top <= vh * 0.5) ||
      (!rectPact && scrollY >= 11 * vh);

    const r1StartX = isMobile ? -0.6 : -1.8;
    const r1EndX = isMobile ? 0.6 : 1.8;

    if (isPactActive || pactEnterP > 0.5) {
      // -------------------------------------------------------------
      // STAGE 5: THE PACT (Commissions Centerpiece)
      // -------------------------------------------------------------
      const p = THREE.MathUtils.clamp((pactEnterP - 0.2) / 0.8, 0, 1);
      const smoothP = THREE.MathUtils.smoothstep(p, 0, 1);

      targetX = 0;
      targetY = THREE.MathUtils.lerp(galY * 0.5, pactY, smoothP);
      targetZ = THREE.MathUtils.lerp(-3.2, RING_STAGES.PACT.Z, smoothP);
      targetScale = THREE.MathUtils.lerp(galScale * 1.15, pactScale, smoothP);
      targetRotX =
        THREE.MathUtils.lerp(0, RING_STAGES.PACT.ROT_X, smoothP) + idleRotX;
      targetRotZ = 0;
      targetOpacity = THREE.MathUtils.lerp(0.65, RING_STAGES.PACT.OPACITY, smoothP);

    } else if (isRow3Pinned || (rect2 && rect2.top <= -3 * vh && !isPactActive)) {
      // -------------------------------------------------------------
      // STAGE 4: GALLERY ROW 3 (Visuals & Char - Chapter III)
      // -------------------------------------------------------------
      const p = THREE.MathUtils.smoothstep(row3PinP, 0, 1);

      targetX = THREE.MathUtils.lerp(r1StartX, 0, p);
      targetY = THREE.MathUtils.lerp(galY, galY * 0.7, p);
      targetZ = THREE.MathUtils.lerp(-3.8, -3.2, p);
      targetScale = THREE.MathUtils.lerp(galScale, galScale * 1.15, p);
      targetRotX = THREE.MathUtils.lerp(idleRotX, Math.PI / 16, p);
      targetRotY = Math.PI + p * Math.PI + idleSpin;
      targetRotZ = THREE.MathUtils.lerp(-Math.PI / 8, 0, p);
      targetOpacity = THREE.MathUtils.lerp(0.50, 0.70, p);

    } else if (isRow2Pinned || (rect1 && rect1.top <= -3 * vh && rect2 && rect2.top > 0)) {
      // -------------------------------------------------------------
      // STAGE 3: GALLERY ROW 2 (Monsters - Chapter II [REVERSE])
      // -------------------------------------------------------------
      const p = THREE.MathUtils.smoothstep(row2PinP, 0, 1);

      // Sweeps back from right to left in sync with reverse card scroll
      targetX = THREE.MathUtils.lerp(r1EndX, r1StartX, p);
      targetY = galY;
      targetZ = THREE.MathUtils.lerp(-3.8, -3.5, p);
      targetScale = galScale;
      targetRotX = idleRotX;
      targetRotY = Math.PI * 2.2 - p * Math.PI * 1.2 + idleSpin;
      targetRotZ = -Math.PI / 8;
      targetOpacity = RING_STAGES.GALLERY_BASE.OPACITY;

    } else if (isRow1Pinned) {
      // -------------------------------------------------------------
      // STAGE 2: GALLERY ROW 1 (Des Gothic - Chapter I)
      // -------------------------------------------------------------
      const p = THREE.MathUtils.smoothstep(row1PinP, 0, 1);

      // Sweeps across from left to right as cards move left
      targetX = THREE.MathUtils.lerp(r1StartX, r1EndX, p);
      targetY = galY;
      targetZ = THREE.MathUtils.lerp(-3.5, -3.8, p);
      targetScale = galScale;
      targetRotX = idleRotX;
      targetRotY = Math.PI + p * Math.PI * 1.2 + idleSpin;
      targetRotZ = Math.PI / 8;
      targetOpacity = RING_STAGES.GALLERY_BASE.OPACITY;

    } else if (rect1 && rect1.top > 0 && rect1.top < vh) {
      // -------------------------------------------------------------
      // STAGE 1.5: TRANSITION FROM ABOUT TO GALLERY ROW 1
      // -------------------------------------------------------------
      const p = THREE.MathUtils.smoothstep(row1EnterP, 0, 1);

      targetX = THREE.MathUtils.lerp(aboutX, r1StartX, p);
      targetY = THREE.MathUtils.lerp(aboutY, galY, p);
      targetZ = THREE.MathUtils.lerp(aboutZ, galZ, p);
      targetScale = THREE.MathUtils.lerp(aboutScale, galScale, p);
      targetRotX = THREE.MathUtils.lerp(aboutRotX, idleRotX, p);
      targetRotY = THREE.MathUtils.lerp(aboutRotY, Math.PI, p);
      targetRotZ = THREE.MathUtils.lerp(aboutRotZ, Math.PI / 8, p);
      targetOpacity = THREE.MathUtils.lerp(
        aboutOpacity,
        RING_STAGES.GALLERY_BASE.OPACITY,
        p,
      );

    } else if (rectAbout && rectAbout.top <= 0) {
      // -------------------------------------------------------------
      // STAGE 1.2: INSIDE ABOUT SECTION
      // -------------------------------------------------------------
      targetX = aboutX;
      targetY = aboutY;
      targetZ = aboutZ;
      targetScale = aboutScale;
      targetRotX = aboutRotX;
      targetRotY = aboutRotY;
      targetRotZ = aboutRotZ;
      targetOpacity = aboutOpacity;

    } else {
      // -------------------------------------------------------------
      // STAGE 1: HERO -> ABOUT
      // -------------------------------------------------------------
      const smoothP = THREE.MathUtils.smoothstep(aboutEnterP, 0, 1);

      targetX = THREE.MathUtils.lerp(heroX, aboutX, smoothP);
      targetY = THREE.MathUtils.lerp(heroY, aboutY, smoothP);
      targetScale = THREE.MathUtils.lerp(heroScale, aboutScale, smoothP);
      targetRotX = THREE.MathUtils.lerp(heroRotX, aboutRotX, smoothP);
      targetRotY = THREE.MathUtils.lerp(heroRotY, aboutRotY, smoothP);
      targetRotZ = THREE.MathUtils.lerp(heroRotZ, aboutRotZ, smoothP);
      targetOpacity = THREE.MathUtils.lerp(heroOpacity, aboutOpacity, smoothP);
    }

    // High performance responsive damping (fast & snappy, eliminating lag)
    const posDamping = 0.15;
    const rotDamping = 0.14;
    const scaleDamping = 0.12;

    gothicCompRef.current.position.x = THREE.MathUtils.lerp(
      gothicCompRef.current.position.x,
      targetX,
      posDamping,
    );
    gothicCompRef.current.position.y = THREE.MathUtils.lerp(
      gothicCompRef.current.position.y,
      targetY,
      posDamping,
    );
    gothicCompRef.current.position.z = THREE.MathUtils.lerp(
      gothicCompRef.current.position.z,
      targetZ,
      posDamping,
    );
    gothicCompRef.current.scale.setScalar(
      THREE.MathUtils.lerp(
        gothicCompRef.current.scale.x,
        targetScale,
        scaleDamping,
      ),
    );
    gothicCompRef.current.rotation.x = THREE.MathUtils.lerp(
      gothicCompRef.current.rotation.x,
      targetRotX,
      rotDamping,
    );

    if (isPactActive) {
      gothicCompRef.current.rotation.y += 0.008; // smooth continuous 360-degree spin in Pact
    } else {
      gothicCompRef.current.rotation.y = THREE.MathUtils.lerp(
        gothicCompRef.current.rotation.y,
        targetRotY,
        rotDamping,
      );
    }

    gothicCompRef.current.rotation.z = THREE.MathUtils.lerp(
      gothicCompRef.current.rotation.z,
      targetRotZ,
      rotDamping,
    );

    // Smooth material opacity transition
    gothicCompRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh && (child as THREE.Mesh).material) {
        const mat = (child as THREE.Mesh).material as THREE.Material;
        mat.transparent = true;
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, 0.12);
      }
    });
  });
}
