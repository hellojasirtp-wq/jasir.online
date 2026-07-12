import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const RotatingPlanet: React.FC = () => {
  const planetRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (planetRef.current) {
      planetRef.current.rotation.y = time * 0.15;
      planetRef.current.rotation.x = Math.sin(time * 0.05) * 0.2;
    }

    if (ringRef1.current) {
      ringRef1.current.rotation.z = -time * 0.08;
      ringRef1.current.rotation.y = Math.sin(time * 0.1) * 0.1;
    }

    if (ringRef2.current) {
      ringRef2.current.rotation.z = time * 0.12;
      ringRef2.current.rotation.x = Math.cos(time * 0.1) * 0.1;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Ambient and point lights for cinematic illumination */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#6C63FF" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#00D4FF" />
      <spotLight position={[0, 5, 2]} intensity={2} angle={0.6} penumbra={1} color="#FF4D8D" />

      {/* Main wireframe planet */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color="#6C63FF"
          wireframe
          transparent
          opacity={0.3}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Inner glowing core */}
      <mesh>
        <sphereGeometry args={[1.2, 16, 16]} />
        <meshStandardMaterial
          color="#00D4FF"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Outer Orbit Ring 1 */}
      <mesh ref={ringRef1} rotation={[Math.PI / 2.5, 0.2, 0]}>
        <torusGeometry args={[2.2, 0.02, 16, 100]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.4} />
      </mesh>

      {/* Outer Orbit Ring 2 */}
      <mesh ref={ringRef2} rotation={[Math.PI / -3, -0.4, 0.2]}>
        <torusGeometry args={[2.5, 0.015, 8, 100]} />
        <meshBasicMaterial color="#FF4D8D" transparent opacity={0.3} />
      </mesh>
    </group>
  );
};
