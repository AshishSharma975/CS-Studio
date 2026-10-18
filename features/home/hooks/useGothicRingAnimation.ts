import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const mapRange = (
  val: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) => {
  if (inMin === inMax) return outMin;
  return ((val - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

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
    X: -0.85,
    Y: -1.35,
    Z: 0,
    SCALE: 0.52,
    ROT_X: 0.04,
    ROT_Y: 0,
    ROT_Z: 0,
    OPACITY: 0.48,
  },
  GALLERY_BASE: {
    Y: 2,
    Z: -4,
    SCALE: 0.6,
    ROT_Z: Math.PI / 6,
  },
  GALLERY_ROW_1_LEFT: {
    X: -2.5,
    Z: -3,
  },
  GALLERY_ROW_1_RIGHT: {
    X: 3.5,
    Z: -5,
  },
  GALLERY_ROW_2_LEFT: {
    X: -3.5,
    Z: -5,
  },
  GALLERY_ROW_3_LEFT: {
    X: -3.5,
    Z: -5,
  },
  GALLERY_ROW_3_CENTER: {
    X: -2,
    Z: -3,
  },
  PACT: {
    X: 0,
    Y: 0,
    Z: -3,
    SCALE: 1.0,
    ROT_X: Math.PI / 12,
    ROT_Z: 0,
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

    // Idle breathing floating effect
    const idleY = Math.sin(state.clock.elapsedTime * 0.8) * 0.04;
    const idleRotX = Math.sin(state.clock.elapsedTime * 0.5) * 0.06;

    // Responsive stage targets (well-balanced scale for all screen sizes)
    const heroX = RING_STAGES.HERO.X;
    const heroY = (isMobile ? -0.3 : isTablet ? -0.38 : RING_STAGES.HERO.Y) + idleY;
    const heroScale = isMobile ? 0.25 : isTablet ? 0.30 : RING_STAGES.HERO.SCALE;
    const heroRotX = RING_STAGES.HERO.ROT_X + idleRotX;
    const heroRotY = RING_STAGES.HERO.ROT_Y;
    const heroRotZ = RING_STAGES.HERO.ROT_Z;
    const heroOpacity = RING_STAGES.HERO.OPACITY;

    // In About: prominent yet subtle background presence behind photo & text
    const aboutX = isMobile ? 0 : isTablet ? -0.65 : RING_STAGES.ABOUT.X;
    const aboutY = (isMobile ? -0.7 : isTablet ? -1.15 : RING_STAGES.ABOUT.Y) + idleY;
    const aboutScale = isMobile ? 0.36 : isTablet ? 0.44 : RING_STAGES.ABOUT.SCALE;
    const aboutRotX = RING_STAGES.ABOUT.ROT_X + idleRotX;
    const aboutRotY = RING_STAGES.ABOUT.ROT_Y;
    const aboutRotZ = RING_STAGES.ABOUT.ROT_Z;
    const aboutOpacity = RING_STAGES.ABOUT.OPACITY;

    let targetX = heroX;
    let targetY = heroY;
    let targetZ = RING_STAGES.HERO.Z;
    let targetScale = heroScale;
    let targetRotX = heroRotX;
    let targetRotY = heroRotY;
    let targetRotZ = heroRotZ;
    let targetOpacity = heroOpacity;

    // Smooth transition from Hero down to About (scrollY: 0 -> vh)
    if (scrollY <= vh) {
      const p = THREE.MathUtils.clamp(scrollY / vh, 0, 1);
      const smoothP = THREE.MathUtils.smoothstep(p, 0, 1);

      targetX = THREE.MathUtils.lerp(heroX, aboutX, smoothP);
      targetY = THREE.MathUtils.lerp(heroY, aboutY, smoothP);
      targetScale = THREE.MathUtils.lerp(heroScale, aboutScale, smoothP);
      targetRotX = THREE.MathUtils.lerp(heroRotX, aboutRotX, smoothP);
      targetRotY = THREE.MathUtils.lerp(heroRotY, aboutRotY, smoothP);
      targetRotZ = THREE.MathUtils.lerp(heroRotZ, aboutRotZ, smoothP);
      targetOpacity = THREE.MathUtils.lerp(heroOpacity, aboutOpacity, smoothP);
    } else {
      // In About: maintain subtle transparent background presence
      targetX = aboutX;
      targetY = aboutY;
      targetScale = aboutScale;
      targetRotX = aboutRotX;
      targetRotY = aboutRotY;
      targetRotZ = aboutRotZ;
      targetOpacity = aboutOpacity;
    }

    // High precision lerping for silky smooth 60fps animation
    gothicCompRef.current.position.x = THREE.MathUtils.lerp(
      gothicCompRef.current.position.x,
      targetX,
      0.06,
    );
    gothicCompRef.current.position.y = THREE.MathUtils.lerp(
      gothicCompRef.current.position.y,
      targetY,
      0.06,
    );
    gothicCompRef.current.position.z = THREE.MathUtils.lerp(
      gothicCompRef.current.position.z,
      targetZ,
      0.06,
    );
    gothicCompRef.current.scale.setScalar(
      THREE.MathUtils.lerp(gothicCompRef.current.scale.x, targetScale, 0.05),
    );
    gothicCompRef.current.rotation.x = THREE.MathUtils.lerp(
      gothicCompRef.current.rotation.x,
      targetRotX,
      0.06,
    );
    gothicCompRef.current.rotation.y = THREE.MathUtils.lerp(
      gothicCompRef.current.rotation.y,
      targetRotY,
      0.06,
    );
    gothicCompRef.current.rotation.z = THREE.MathUtils.lerp(
      gothicCompRef.current.rotation.z,
      targetRotZ,
      0.06,
    );

    // Smooth material opacity transition
    gothicCompRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh && (child as THREE.Mesh).material) {
        const mat = (child as THREE.Mesh).material as THREE.Material;
        mat.transparent = true;
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, 0.08);
      }
    });
  });
}