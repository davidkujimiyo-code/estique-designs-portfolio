import React from 'react';
import { useFrame } from '@react-three/fiber';

export const CameraRig: React.FC = () => {
  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    // Slow cinematic drift (circle around center)
    state.camera.position.x = Math.sin(elapsed * 0.15) * 0.3;
    state.camera.position.y = Math.cos(elapsed * 0.1) * 0.2;
    state.camera.lookAt(0, 0, 0);
  });

  return null;
};
