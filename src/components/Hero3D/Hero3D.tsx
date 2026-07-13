import React from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { Scene } from './Scene';

interface Hero3DProps {
  onLoaded: () => void;
  fallback: React.ReactNode;
}

export const Hero3D: React.FC<Hero3DProps> = ({ onLoaded, fallback }) => {
  return (
    <ErrorBoundary fallback={fallback}>
      <Scene onLoaded={onLoaded} />
    </ErrorBoundary>
  );
};
export default Hero3D;
