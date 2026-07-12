import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Starfield } from './Starfield';
import { RotatingPlanet } from './RotatingPlanet';

export const LandingCanvas: React.FC = () => {
  return (
    <Canvas camera={{ position: [0, 0, 4.5], fov: 60 }}>
      <Starfield />
      <RotatingPlanet />
    </Canvas>
  );
};

export default LandingCanvas;
