"use client";

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from './ThemeProvider';

function AnimatedSphere({ theme }: { theme: string }) {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state, delta) => {
        meshRef.current.rotation.x += delta * 0.1;
        meshRef.current.rotation.y += delta * 0.15;
    });

    const color = theme === 'day' ? "#2A9D8F" : "#E0AAFF";
    const wireframe = theme === 'void';

    return (
        <Sphere args={[1, 64, 64]} ref={meshRef} scale={2.5}>
            <MeshDistortMaterial
                color={color}
                attach="material"
                distort={0.4}
                speed={1.5}
                wireframe={wireframe}
                transparent
                opacity={0.8}
            />
        </Sphere>
    );
}

export function HeroScene() {
    const { theme } = useTheme();

    return (
        <div className="w-full h-full absolute inset-0 -z-10">
            <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <AnimatedSphere theme={theme} />

                {theme === 'void' && (
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                )}
            </Canvas>
        </div>
    );
}
