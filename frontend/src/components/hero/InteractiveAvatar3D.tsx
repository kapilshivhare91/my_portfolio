import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// 1. The Avatar Mesh that reacts to cursor
function AvatarMesh({ textureUrl }: { textureUrl: string }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const texture = useTexture(textureUrl);

    // Smooth dampening factor for rotation
    const dampening = 0.05;

    useFrame((state) => {
        if (!meshRef.current) return;

        // Get normalized mouse coordinates (-1 to 1) from state 
        // State.pointer is provided automatically by Canvas
        const targetX = (state.pointer.x * Math.PI) / 8; // Max rotation angle X
        const targetY = (state.pointer.y * Math.PI) / 8; // Max rotation angle Y

        // Smoothly interpolate current rotation towards target
        // Note: Mouse X maps to Rotation Y (looking left/right)
        //       Mouse Y maps to Rotation X (looking up/down)
        meshRef.current.rotation.y += (targetX - meshRef.current.rotation.y) * dampening;
        // Invert the Y target because ThreeJS Y goes up, but DOM Y goes down
        meshRef.current.rotation.x += (-targetY - meshRef.current.rotation.x) * dampening;
    });

    return (
        <mesh ref={meshRef}>
            {/* A flat plane instead of a box because photos are 2D */}
            <planeGeometry args={[4, 5]} />
            <meshBasicMaterial
                map={texture}
                transparent={true}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}

// 2. The main Container
interface InteractiveAvatarProps {
    // Pass your image path (e.g. '/my-photo.jpg' from public directory)
    imagePath?: string;
}

const InteractiveAvatar3D: React.FC<InteractiveAvatarProps> = ({
    // High quality placeholder to show off the premium realistic vibe
    imagePath = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop"
}) => {
    return (
        <div className="w-full h-[500px] relative rounded-2xl overflow-hidden shadow-2xl border border-orange-500/20 bg-[#111827]">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-transparent to-amber-300/10 mix-blend-screen pointer-events-none" />

            {/* Warning: Canvas must have a defined height explicitly! */}
            <Canvas
                camera={{ position: [0, 0, 6], fov: 45 }}
                className="cursor-crosshair active:cursor-grabbing"
            >
                <ambientLight intensity={1} />
                {/* We use React Suspense to wait for the texture to load */}
                <React.Suspense fallback={null}>
                    <AvatarMesh textureUrl={imagePath} />
                </React.Suspense>
            </Canvas>

            {/* Overlay to deepen the contrast */}
            <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(17,24,39,1)] pointer-events-none rounded-2xl" />
        </div>
    );
};

export default InteractiveAvatar3D;
