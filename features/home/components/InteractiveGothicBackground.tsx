
"use client";

import { useEffect, useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const fragmentShader = `
uniform sampler2D uTexture;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform float uScroll;
varying vec2 vUv;

void main() {
    vec4 texColor = texture2D(uTexture, vUv);

    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    float dist = distance(vUv * aspect, uMouse * aspect);
    float mask = smoothstep(0.15, 0.4, dist);

    float gray = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));

    vec3 bgColor = vec3(0.02, 0.02, 0.02);
    vec3 horrorTex = vec3(gray) * 0.4;

    float fade = smoothstep(0.0, 0.166, uScroll);

    vec3 finalColor = mix(horrorTex, bgColor, mask);

    gl_FragColor = vec4(finalColor, 1.0 - fade);
}
`;

const vertexShader = `
varying vec2 vUv;

void main() {
    vUv = uv;

    gl_Position = vec4(position.x, position.y, 0.999, 1.0);
}
`;

export const InteractiveGothicBackground = () => {
    const shaderRef = useRef<THREE.ShaderMaterial>(null);
    const { size } = useThree();

    const texture = useTexture(
        "/assets/images/gothic_background.jpg"
    );

    const initialProgress =
        typeof window !== "undefined"
            ? (() => {
                const maxScroll =
                    document.documentElement.scrollHeight -
                    window.innerHeight;

                if (maxScroll <= 0) return 0;

                return Math.min(
                    Math.max(window.scrollY / maxScroll, 0),
                    1
                );
            })()
            : 0;

    const scrollProgress = useRef(initialProgress || 0);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const trigger = ScrollTrigger.create({
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
                scrollProgress.current = self.progress;
            },
        });

        return () => {
            trigger.kill();
        };
    }, []);

    const uniforms = useMemo(
        () => ({
            uTexture: { value: texture },
            uMouse: {
                value: new THREE.Vector2(0.5, 0.5),
            },
            uResolution: {
                value: new THREE.Vector2(
                    size.width,
                    size.height
                ),
            },
            uScroll: {
                value: initialProgress || 0,
            },
        }),
        [texture, size.width, size.height]
    );

    const currentMouse = useRef(
        new THREE.Vector2(0.5, 0.5)
    );

    useFrame((state) => {
        if (!shaderRef.current) return;

        const isMobile =
            typeof window !== "undefined" &&
            window.innerWidth < 768;

        let targetX: number;
        let targetY: number;

        if (isMobile) {
            // Auto-floating effect for mobile
            const time = state.clock.elapsedTime * 0.5;

            targetX = 0.5 + Math.cos(time) * 0.2;
            targetY = 0.5 + Math.sin(time * 0.8) * 0.2;

            // Override with active touch/pointer
            if (
                state.pointer.x !== 0 ||
                state.pointer.y !== 0
            ) {
                targetX = (state.pointer.x + 1.0) / 2.0;
                targetY = (state.pointer.y + 1.0) / 2.0;
            }
        } else {
            targetX = (state.pointer.x + 1.0) / 2.0;
            targetY = (state.pointer.y + 1.0) / 2.0;
        }

        currentMouse.current.lerpVectors(
            currentMouse.current,
            new THREE.Vector2(targetX, targetY),
            isMobile ? 0.03 : 0.05
        );

        shaderRef.current.uniforms.uMouse.value.copy(
            currentMouse.current
        );

        shaderRef.current.uniforms.uResolution.value.set(
            size.width,
            size.height
        );

        shaderRef.current.uniforms.uScroll.value =
            scrollProgress.current;
    });

    return (
        <mesh renderOrder={-1}>
            <planeGeometry args={[2, 2]} />

            <shaderMaterial
                ref={shaderRef}
                fragmentShader={fragmentShader}
                vertexShader={vertexShader}
                uniforms={uniforms}
                transparent={true}
                depthWrite={false}
                depthTest={true}
            />
        </mesh>
    );
};
