"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, ContactShadows } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

/* ---------- 3D MODEL ---------- */
function MonitorWithMouse() {
  const group = useRef();
  const mouseRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        Math.sin(t / 3) * 0.04,
        0.05
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        Math.cos(t / 4) * 0.02,
        0.05
      );
    }

    if (mouseRef.current) {
      mouseRef.current.position.x = 1.6 + Math.sin(t * 1.5) * 0.05;
    }
  });

  const screenTexture = useMemo(() => {
    if (typeof document === "undefined") return null;

    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 600;
    const ctx = canvas.getContext("2d");

    const grd = ctx.createLinearGradient(0, 0, 1024, 600);
    grd.addColorStop(0, "#4f46e5");
    grd.addColorStop(1, "#9333ea");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 1024, 600);

    ctx.fillStyle = "white";
    ctx.font = "bold 64px Arial";
    ctx.fillText("DHEENEX", 60, 120);
    ctx.font = "30px Arial";
    ctx.fillText("Technologies", 60, 170);

    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <group ref={group} position={[0, -0.6, 0]}>
      <mesh>
        <boxGeometry args={[3.4, 2, 0.15]} />
        <meshStandardMaterial color="#0f172a" metalness={0.6} roughness={0.3} />
      </mesh>

      <mesh position={[0, 0, 0.085]}>
        <planeGeometry args={[3.1, 1.75]} />
        {screenTexture ? (
          <meshBasicMaterial map={screenTexture} />
        ) : (
          <meshStandardMaterial color="#4f46e5" />
        )}
      </mesh>

      <mesh position={[0, -1.2, 0]}>
        <boxGeometry args={[0.25, 0.8, 0.2]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>

      <mesh position={[0, -1.7, 0.1]}>
        <boxGeometry args={[1.4, 0.15, 0.8]} />
        <meshStandardMaterial color="#111827" />
      </mesh>

      <mesh ref={mouseRef} position={[1.6, -1.75, 0.4]}>
        <boxGeometry args={[0.35, 0.15, 0.55]} />
        <meshStandardMaterial color="#1f2937" metalness={0.4} roughness={0.4} />
      </mesh>
    </group>
  );
}

/** Monitor scene for the Contact section (loaded only on tablets/computers, see Lazy3D). */
export default function CallToAction3D() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
      <ambientLight intensity={1.2} />
      <directionalLight position={[10, 10, 5]} intensity={2} />
      <directionalLight position={[-10, 10, -5]} intensity={1} color="#9333ea" />

      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.4}>
        <MonitorWithMouse />
      </Float>

      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.4}
        scale={8}
        blur={2}
        far={4}
      />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}
