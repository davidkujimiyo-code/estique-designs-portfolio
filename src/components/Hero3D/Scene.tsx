import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Lights } from './Lights';
import { Particles } from './Particles';
import { CameraRig } from './CameraRig';
import { LuxurySculpture } from './LuxurySculpture';
import { RenderNotifier } from './RenderNotifier';

interface SceneProps {
  onLoaded: () => void;
}

export const Scene: React.FC<SceneProps> = ({ onLoaded }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // 1. Check screen resize
    const checkSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkSize();
    window.addEventListener('resize', checkSize);

    // 2. Track theme switches dynamically using a MutationObserver
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      window.removeEventListener('resize', checkSize);
      observer.disconnect();
    };
  }, []);

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      }}
      camera={{ position: [0, 0, 4.8], fov: 45 }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <Lights isDark={isDark} />
      <Particles isMobile={isMobile} />
      <LuxurySculpture isDark={isDark} />
      <CameraRig />
      <RenderNotifier onLoaded={onLoaded} />
    </Canvas>
  );
};
export default Scene;
