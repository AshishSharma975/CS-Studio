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

export function useGothicRingAnimation(
  gothicCompRef: React.RefObject<THREE.Group<THREE.Object3DEventMap> | null>,
) {
  const scrollMetricsRef = useRef({
    scrollY: 0,
    vh: 1000,
    width: 1200,
    aboutTop: 1000,
    row1Top: 2000,
    row2Top: 5000,
    row3Top: 8000,
    pactTop: 11000,
  });

  useEffect(() => {
    let aboutEl: HTMLElement | null = null;
    let row1El: HTMLElement | null = null;
    let row2El: HTMLElement | null = null;
    let row3El: HTMLElement | null = null;
    let pactEl: HTMLElement | null = null;

    const queryElements = () => {
      aboutEl = document.getElementById("about");
      row1El = document.getElementById("gallery-row-1");
      row2El = document.getElementById("gallery-row-2");
      row3El = document.getElementById("gallery-row-3");
      pactEl = document.getElementById("pact");
    };

    queryElements();

    const getSpacerRect = (el: HTMLElement | null) => {
      if (!el) return null;
      const spacer = (el.closest(".pin-spacer") as HTMLElement) || el;
      return spacer.getBoundingClientRect();
    };

    const updateMetrics = () => {
      const vh = window.innerHeight || 1;
      const width = window.innerWidth || 1200;
      const scrollY = window.scrollY || window.pageYOffset || 0;

      const rAbout = aboutEl ? aboutEl.getBoundingClientRect() : null;
      const r1 = getSpacerRect(row1El);
      const r2 = getSpacerRect(row2El);
      const r3 = getSpacerRect(row3El);
      const rPact = pactEl ? pactEl.getBoundingClientRect() : null;

      scrollMetricsRef.current = {
        scrollY,
        vh,
        width,
        aboutTop: rAbout ? rAbout.top : vh - scrollY,
        row1Top: r1 ? r1.top : 2 * vh - scrollY,
        row2Top: r2 ? r2.top : 5 * vh - scrollY,
        row3Top: r3 ? r3.top : 8 * vh - scrollY,
        pactTop: rPact ? rPact.top : 11 * vh - scrollY,
      };
    };

    updateMetrics();

    window.addEventListener("scroll", updateMetrics, { passive: true });
    window.addEventListener("resize", () => {
      queryElements();
      updateMetrics();
    });

    return () => {
      window.removeEventListener("scroll", updateMetrics);
      window.removeEventListener("resize", updateMetrics);
    };
  }, []);

  useFrame((state, delta) => {
    if (!gothicCompRef.current) return;

    const { width, vh, aboutTop, row1Top, row2Top, row3Top, pactTop } =
      scrollMetricsRef.current;

    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;

    // Gentle organic breathing floating effect
    const idleY = Math.sin(state.clock.elapsedTime * 0.8) * 0.025;
    const idleRotX = Math.sin(state.clock.elapsedTime * 0.5) * 0.035;
    const idleSpin = state.clock.elapsedTime * 0.15;

    // Responsive targets
    const heroX = RING_STAGES.HERO.X;
    const heroY = (isMobile ? -0.28 : isTablet ? -0.36 : RING_STAGES.HERO.Y) + idleY;
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

    const galY = (isMobile ? 0.15 : isTablet ? 0.25 : RING_STAGES.GALLERY_BASE.Y) + idleY;
    const galZ = RING_STAGES.GALLERY_BASE.Z;
    const galScale = isMobile ? 0.32 : isTablet ? 0.42 : RING_STAGES.GALLERY_BASE.SCALE;

    const pactScale = isMobile ? 0.55 : isTablet ? 0.70 : RING_STAGES.PACT.SCALE;
    const pactY = (isMobile ? -0.08 : RING_STAGES.PACT.Y) + idleY;

    // Stage progression factors
    const aboutEnterP = THREE.MathUtils.clamp(1 - aboutTop / vh, 0, 1);
    const row1EnterP = THREE.MathUtils.clamp(1 - row1Top / vh, 0, 1);
    const row1PinP = THREE.MathUtils.clamp(-row1Top / (3 * vh), 0, 1);
    const row2PinP = THREE.MathUtils.clamp(-row2Top / (3 * vh), 0, 1);
    const row3PinP = THREE.MathUtils.clamp(-row3Top / (3 * vh), 0, 1);
    const pactEnterP = THREE.MathUtils.clamp(1 - pactTop / vh, 0, 1);

    const isRow1Pinned = row1Top <= 0 && row1Top > -3 * vh;
    const isRow2Pinned = row2Top <= 0 && row2Top > -3 * vh;
    const isRow3Pinned = row3Top <= 0 && row3Top > -3 * vh;
    const isPactActive = pactTop <= vh * 0.45;

    const r1StartX = isMobile ? -0.5 : -1.8;
    const r1EndX = isMobile ? 0.5 : 1.8;

    let targetX = heroX;
    let targetY = heroY;
    let targetZ = RING_STAGES.HERO.Z;
    let targetScale = heroScale;
    let targetRotX = heroRotX;
    let targetRotY = heroRotY;
    let targetRotZ = heroRotZ;
    let targetOpacity = heroOpacity;

    if (isPactActive || pactEnterP > 0.4) {
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
      targetRotY = Math.PI * 2 + state.clock.elapsedTime * 0.15;
      targetRotZ = 0;
      targetOpacity = THREE.MathUtils.lerp(0.65, RING_STAGES.PACT.OPACITY, smoothP);
    } else if (isRow3Pinned || row3Top <= 0) {
      // -------------------------------------------------------------
      // STAGE 4: GALLERY ROW 3 (Visuals & Char)
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
    } else if (isRow2Pinned || row2Top <= 0) {
      // -------------------------------------------------------------
      // STAGE 3: GALLERY ROW 2 (Monsters [REVERSE])
      // -------------------------------------------------------------
      const p = THREE.MathUtils.smoothstep(row2PinP, 0, 1);

      targetX = THREE.MathUtils.lerp(r1EndX, r1StartX, p);
      targetY = galY;
      targetZ = THREE.MathUtils.lerp(-3.8, -3.5, p);
      targetScale = galScale;
      targetRotX = idleRotX;
      targetRotY = Math.PI * 2.2 - p * Math.PI * 1.2 + idleSpin;
      targetRotZ = -Math.PI / 8;
      targetOpacity = RING_STAGES.GALLERY_BASE.OPACITY;
    } else if (isRow1Pinned || row1Top <= 0) {
      // -------------------------------------------------------------
      // STAGE 2: GALLERY ROW 1 (Des Gothic)
      // -------------------------------------------------------------
      const p = THREE.MathUtils.smoothstep(row1PinP, 0, 1);

      targetX = THREE.MathUtils.lerp(r1StartX, r1EndX, p);
      targetY = galY;
      targetZ = THREE.MathUtils.lerp(-3.5, -3.8, p);
      targetScale = galScale;
      targetRotX = idleRotX;
      targetRotY = Math.PI + p * Math.PI * 1.2 + idleSpin;
      targetRotZ = Math.PI / 8;
      targetOpacity = RING_STAGES.GALLERY_BASE.OPACITY;
    } else if (row1Top > 0 && row1Top < vh) {
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
    } else if (aboutTop <= 0) {
      // -------------------------------------------------------------
      // STAGE 1.2: INSIDE ABOUT
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

    // High performance responsive damping for butter-smooth 60-120fps
    const damping = Math.min(delta * 8, 0.2);

    gothicCompRef.current.position.x = THREE.MathUtils.lerp(
      gothicCompRef.current.position.x,
      targetX,
      damping,
    );
    gothicCompRef.current.position.y = THREE.MathUtils.lerp(
      gothicCompRef.current.position.y,
      targetY,
      damping,
    );
    gothicCompRef.current.position.z = THREE.MathUtils.lerp(
      gothicCompRef.current.position.z,
      targetZ,
      damping,
    );
    gothicCompRef.current.scale.setScalar(
      THREE.MathUtils.lerp(
        gothicCompRef.current.scale.x,
        targetScale,
        damping,
      ),
    );
    gothicCompRef.current.rotation.x = THREE.MathUtils.lerp(
      gothicCompRef.current.rotation.x,
      targetRotX,
      damping,
    );
    gothicCompRef.current.rotation.y = THREE.MathUtils.lerp(
      gothicCompRef.current.rotation.y,
      targetRotY,
      damping,
    );
    gothicCompRef.current.rotation.z = THREE.MathUtils.lerp(
      gothicCompRef.current.rotation.z,
      targetRotZ,
      damping,
    );

    // Smooth material opacity transition
    gothicCompRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh && (child as THREE.Mesh).material) {
        const mat = (child as THREE.Mesh).material as THREE.Material;
        mat.transparent = true;
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, damping);
      }
    });
  });
}
