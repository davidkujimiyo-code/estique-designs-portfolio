import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface SculptureProps {
  isDark: boolean;
}

export const LuxurySculpture: React.FC<SculptureProps> = ({ isDark }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Element refs for kinetic parts
  const coreRef = useRef<THREE.Mesh>(null);
  
  // 6 Face panels
  const panelFrontRef = useRef<THREE.Mesh>(null);
  const panelBackRef = useRef<THREE.Mesh>(null);
  const panelLeftRef = useRef<THREE.Mesh>(null);
  const panelRightRef = useRef<THREE.Mesh>(null);
  const panelTopRef = useRef<THREE.Mesh>(null);
  const panelBottomRef = useRef<THREE.Mesh>(null);

  // Frames & Accents
  const frameXRef = useRef<THREE.Mesh>(null);
  const frameYRef = useRef<THREE.Mesh>(null);
  const emeraldCoreRef = useRef<THREE.Mesh>(null);
  const tile1Ref = useRef<THREE.Mesh>(null);
  const tile2Ref = useRef<THREE.Mesh>(null);
  const baseRef = useRef<THREE.Mesh>(null);
  const shadowRef = useRef<THREE.Mesh>(null);

  const { pointer } = useThree();
  const assemblyProgress = useRef(0);

  // Theme-aware material settings
  // Graphite Ceramic (Dark Mode) vs Pearl Ivory Ceramic (Light Mode)
  const primaryColor = isDark ? "#2C2C2C" : "#F7F5F0";
  const primaryRoughness = isDark ? 0.38 : 0.32; // Slightly lower roughness to catch highlights better
  const primaryMetalness = isDark ? 0.15 : 0.08;

  // Champagne Gold Accent (Richer metalness/roughness balance for reflections)
  const goldColor = "#D4B895";
  const goldRoughness = 0.22;
  const goldMetalness = 0.98;

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime();

    // 1. Slow weightless float & subtle mouse follow parallax (barely rotates, yaw = 2.8 degrees max = 0.05 rad)
    if (groupRef.current) {
      const targetRotY = pointer.x * 0.05;
      const targetRotX = -pointer.y * 0.05;

      // Slowed rotations to look steady and cinematic
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY + elapsed * 0.012, 0.03);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.03);
      
      // Floating vertical translation slowed down by ~50%
      groupRef.current.position.y = 0.2 + Math.sin(elapsed * 0.12) * 0.02;
    }

    // 2. Linear assembly progression
    if (assemblyProgress.current < 1) {
      assemblyProgress.current = Math.min(assemblyProgress.current + delta * 0.45, 1);
    }
    const t = assemblyProgress.current;

    // Spacing between panels increased by ~8% (baseOffset: 0.74, dynamicOffset: 0.74 + breathing amplitude)
    const baseOffset = 0.74; 
    const dynamicOffset = baseOffset + Math.sin(elapsed * 0.28) * 0.04;
    const currentOffset = THREE.MathUtils.lerp(1.6, dynamicOffset, t);

    // Apply offset positions to panels
    if (panelFrontRef.current) panelFrontRef.current.position.z = currentOffset;
    if (panelBackRef.current) panelBackRef.current.position.z = -currentOffset;
    if (panelLeftRef.current) panelLeftRef.current.position.x = -currentOffset;
    if (panelRightRef.current) panelRightRef.current.position.x = currentOffset;
    if (panelTopRef.current) panelTopRef.current.position.y = currentOffset;
    if (panelBottomRef.current) panelBottomRef.current.position.y = -currentOffset;

    // Animate central core scale on load
    if (coreRef.current) {
      coreRef.current.scale.setScalar(THREE.MathUtils.lerp(0.01, 1.0, t));
    }

    // Independent frame movements (Slowed by 50%)
    if (frameXRef.current) {
      frameXRef.current.rotation.x = elapsed * 0.035;
      frameXRef.current.scale.setScalar(THREE.MathUtils.lerp(0.01, 1.0, t));
    }
    if (frameYRef.current) {
      frameYRef.current.rotation.y = -elapsed * 0.025;
      frameYRef.current.scale.setScalar(THREE.MathUtils.lerp(0.01, 1.0, t));
    }

    // Emerald core glow pulse (Slowed breathing)
    if (emeraldCoreRef.current) {
      const pulse = 1.0 + Math.sin(elapsed * 1.0) * 0.10;
      emeraldCoreRef.current.scale.setScalar(THREE.MathUtils.lerp(0.01, pulse, t));
    }

    // Orbiting gold tiles
    if (tile1Ref.current) {
      tile1Ref.current.position.x = Math.sin(elapsed * 0.2) * 1.8;
      tile1Ref.current.position.z = Math.cos(elapsed * 0.2) * 1.8;
      tile1Ref.current.scale.setScalar(THREE.MathUtils.lerp(0.01, 1.0, t));
    }
    if (tile2Ref.current) {
      tile2Ref.current.position.x = -Math.sin(elapsed * 0.2) * 1.8;
      tile2Ref.current.position.z = -Math.cos(elapsed * 0.2) * 1.8;
      tile2Ref.current.scale.setScalar(THREE.MathUtils.lerp(0.01, 1.0, t));
    }

    // Pedestal and Ground shadow scaling
    if (baseRef.current) {
      baseRef.current.position.y = THREE.MathUtils.lerp(-4.0, -2.2, t);
      baseRef.current.scale.setScalar(THREE.MathUtils.lerp(0.01, 1.0, t));
    }
    if (shadowRef.current) {
      shadowRef.current.scale.setScalar(THREE.MathUtils.lerp(0.01, 1.0, t));
    }
  });

  return (
    // Editorial composition shift (Right: 0.06, Up: 0.14) & 7% Scale Increase (scale={1.07})
    <group ref={groupRef} position={[0.06, 0.14, 0]} scale={1.07}>
      
      {/* A. Central Base Pedestal */}
      <mesh ref={baseRef} position={[0, -2.2, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.35, 32]} />
        <meshStandardMaterial
          color={isDark ? "#161616" : "#E2DFD8"}
          roughness={primaryRoughness}
          metalness={primaryMetalness}
        />
      </mesh>

      {/* B. Ground Shadow Circle */}
      <mesh ref={shadowRef} position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0, 1.7, 32]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={isDark ? 0.16 : 0.08}
          depthWrite={false}
        />
      </mesh>

      {/* C. Central Ceramic Core Cube */}
      <mesh ref={coreRef}>
        <boxGeometry args={[1.1, 1.1, 1.1]} />
        <meshStandardMaterial
          color={primaryColor}
          roughness={primaryRoughness}
          metalness={primaryMetalness}
        />
      </mesh>

      {/* D. Precision Emerald Octahedron Prism (Signature Estique Detail with internal light glow) */}
      <mesh ref={emeraldCoreRef}>
        <octahedronGeometry args={[0.34, 0]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={isDark ? 1.2 : 0.7}
          roughness={0.15}
          metalness={0.1}
        />
        {/* Localized gemstone pointLight to illuminate inner faces of the ceramic panels */}
        <pointLight
          intensity={isDark ? 4.0 : 2.0}
          color="#10b981"
          distance={2.5}
          decay={1.8}
        />
      </mesh>

      {/* E. 6 Floating Face Panels */}
      {/* Front Face */}
      <mesh ref={panelFrontRef} position={[0, 0, 0.74]}>
        <boxGeometry args={[0.86, 0.86, 0.08]} />
        <meshStandardMaterial color={primaryColor} roughness={primaryRoughness} metalness={primaryMetalness} />
      </mesh>
      {/* Back Face */}
      <mesh ref={panelBackRef} position={[0, 0, -0.74]}>
        <boxGeometry args={[0.86, 0.86, 0.08]} />
        <meshStandardMaterial color={primaryColor} roughness={primaryRoughness} metalness={primaryMetalness} />
      </mesh>
      {/* Left Face */}
      <mesh ref={panelLeftRef} position={[-0.74, 0, 0]}>
        <boxGeometry args={[0.08, 0.86, 0.86]} />
        <meshStandardMaterial color={primaryColor} roughness={primaryRoughness} metalness={primaryMetalness} />
      </mesh>
      {/* Right Face */}
      <mesh ref={panelRightRef} position={[0.74, 0, 0]}>
        <boxGeometry args={[0.08, 0.86, 0.86]} />
        <meshStandardMaterial color={primaryColor} roughness={primaryRoughness} metalness={primaryMetalness} />
      </mesh>
      {/* Top Face */}
      <mesh ref={panelTopRef} position={[0, 0.74, 0]}>
        <boxGeometry args={[0.86, 0.08, 0.86]} />
        <meshStandardMaterial color={primaryColor} roughness={primaryRoughness} metalness={primaryMetalness} />
      </mesh>
      {/* Bottom Face */}
      <mesh ref={panelBottomRef} position={[0, -0.74, 0]}>
        <boxGeometry args={[0.86, 0.08, 0.86]} />
        <meshStandardMaterial color={primaryColor} roughness={primaryRoughness} metalness={primaryMetalness} />
      </mesh>

      {/* F. Independent Thin Gold Frame Rings */}
      <mesh ref={frameXRef} rotation={[0, 0.8, 0]}>
        <torusGeometry args={[1.9, 0.02, 16, 90]} />
        <meshStandardMaterial color={goldColor} roughness={goldRoughness} metalness={goldMetalness} />
      </mesh>
      <mesh ref={frameYRef} rotation={[0.85, 0, 0.4]}>
        <torusGeometry args={[1.75, 0.015, 16, 80]} />
        <meshStandardMaterial color={goldColor} roughness={goldRoughness} metalness={goldMetalness} />
      </mesh>

      {/* G. Orbiting Gold Tiles */}
      <mesh ref={tile1Ref} position={[1.1, 1.1, -1.1]}>
        <boxGeometry args={[0.15, 0.15, 0.15]} />
        <meshStandardMaterial color={goldColor} roughness={goldRoughness} metalness={goldMetalness} />
      </mesh>
      <mesh ref={tile2Ref} position={[-1.1, -1.1, 1.1]}>
        <boxGeometry args={[0.12, 0.12, 0.12]} />
        <meshStandardMaterial color={goldColor} roughness={goldRoughness} metalness={goldMetalness} />
      </mesh>

    </group>
  );
};
