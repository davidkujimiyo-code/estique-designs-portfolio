import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

interface RenderNotifierProps {
  onLoaded: () => void;
}

export const RenderNotifier: React.FC<RenderNotifierProps> = ({ onLoaded }) => {
  const hasRendered = useRef(false);

  useFrame(() => {
    if (!hasRendered.current) {
      hasRendered.current = true;
      // Delay call by one frame to guarantee full rendering buffer swap
      requestAnimationFrame(() => {
        onLoaded();
      });
    }
  });

  return null;
};
