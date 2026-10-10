"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, Torus, Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Rig() {
  const g = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (g.current) {
      g.current.rotation.y = s.clock.elapsedTime * 0.15;
      g.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.3) * 0.15;
    }
  });
  return (
    <group ref={g}>
      <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
        <Torus args={[1.6, 0.35, 24, 64]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#168BFF" emissive="#168BFF" emissiveIntensity={0.6} metalness={0.7} roughness={0.2} />
        </Torus>
      </Float>
      <Float speed={3} floatIntensity={2}>
        <Sphere args={[0.45, 32, 32]} position={[1.8, 0.9, 0.4]}>
          <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={0.9} />
        </Sphere>
      </Float>
      <Float speed={2.4} floatIntensity={1.6}>
        <Sphere args={[0.28, 32, 32]} position={[-1.9, -0.7, 0.6]}>
          <meshStandardMaterial color="#7C3AED" emissive="#7C3AED" emissiveIntensity={0.9} />
        </Sphere>
      </Float>
      <mesh position={[0, 0, -1.5]}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial color="#0A1224" wireframe transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

export default function Hero3D() {
  if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
    return <div className="h-full w-full rounded-3xl bg-gradient-to-br from-electric/30 to-violetx/30" />;
  }
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6], fov: 50 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.7} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#00D4FF" />
      <pointLight position={[-5, -3, 3]} intensity={0.8} color="#168BFF" />
      <Stars radius={30} depth={20} count={1200} factor={3} fade speed={0.6} />
      <Rig />
    </Canvas>
  );
}
