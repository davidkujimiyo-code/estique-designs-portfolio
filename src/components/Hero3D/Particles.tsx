import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticlesProps {
  isMobile: boolean;
}

export const Particles: React.FC<ParticlesProps> = ({ isMobile }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = isMobile ? 12 : 30;

  // Generate positions and speeds
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const spd = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
      spd[i] = 0.03 + Math.random() * 0.08;
    }
    return [pos, spd];
  }, [particleCount]);

  // Generate dynamic vertex colors (70% gold, 30% emerald)
  const colors = useMemo(() => {
    const col = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      if (Math.random() > 0.3) {
        // Champagne Gold (#D4B895)
        col[i * 3] = 0.83;
        col[i * 3 + 1] = 0.72;
        col[i * 3 + 2] = 0.58;
      } else {
        // Emerald Green (#10B981)
        col[i * 3] = 0.06;
        col[i * 3 + 1] = 0.72;
        col[i * 3 + 2] = 0.5;
      }
    }
    return col;
  }, [particleCount]);

  useFrame((_state, delta) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const posArr = geo.attributes.position.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      posArr[i * 3 + 1] += speeds[i] * delta;
      if (posArr[i * 3 + 1] > 2.5) {
        posArr[i * 3 + 1] = -2.5;
        posArr[i * 3] = (Math.random() - 0.5) * 5;
        posArr[i * 3 + 2] = (Math.random() - 0.5) * 5;
      }
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={0.035}
        transparent
        opacity={0.45}
        sizeAttenuation
      />
    </points>
  );
};
export default Particles;
