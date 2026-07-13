import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface LightsProps {
  isDark: boolean;
}

export const Lights: React.FC<LightsProps> = ({ isDark }) => {
  const ambientLightRef = useRef<THREE.AmbientLight>(null);
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const rimLightRef = useRef<THREE.DirectionalLight>(null);
  const { pointer } = useThree();

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();

    // 1. Slow breathing of ambient light to make environment feel alive
    if (ambientLightRef.current) {
      const baseIntensity = isDark ? 0.42 : 0.82;
      ambientLightRef.current.intensity = baseIntensity + Math.sin(elapsed * 0.35) * 0.05;
    }

    // 2. Move Key Light position dynamically to slide reflections
    if (keyLightRef.current) {
      keyLightRef.current.position.x = THREE.MathUtils.lerp(keyLightRef.current.position.x, 5 + pointer.x * 2.0, 0.05);
      keyLightRef.current.position.y = THREE.MathUtils.lerp(keyLightRef.current.position.y, 8 - pointer.y * 1.5, 0.05);
    }
    
    // 3. Move Rim Light inversely to catch clean contours
    if (rimLightRef.current) {
      rimLightRef.current.position.x = THREE.MathUtils.lerp(rimLightRef.current.position.x, -6 - pointer.x * 1.5, 0.05);
      rimLightRef.current.position.y = THREE.MathUtils.lerp(rimLightRef.current.position.y, 4 + pointer.y * 1.0, 0.05);
    }
  });

  return (
    <>
      {/* Soft breathing ambient baseline */}
      <ambientLight ref={ambientLightRef} intensity={isDark ? 0.45 : 0.85} />
      
      {/* Warm Golden Key Light (Glides with pointer) */}
      <directionalLight
        ref={keyLightRef}
        position={[5, 8, 4]}
        intensity={isDark ? 3.2 : 3.6}
        color={isDark ? "#FFE9BD" : "#FFFFFF"}
      />

      {/* Strong Rim Light (Glides inversely to capture contours) */}
      <directionalLight
        ref={rimLightRef}
        position={[-6, 4, -5]}
        intensity={isDark ? 2.6 : 1.8}
        color={isDark ? "#A3C5FF" : "#FFF7EB"}
      />

      {/* Soft Emerald highlight light source */}
      <pointLight
        position={[-1.0, 0.5, 1.2]}
        intensity={isDark ? 1.5 : 0.8}
        color="#10b981"
        distance={4.0}
        decay={2.0}
      />
    </>
  );
};
export default Lights;
