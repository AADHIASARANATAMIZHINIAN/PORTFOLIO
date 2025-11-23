import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text3D, Center } from '@react-three/drei'
import * as THREE from 'three'

interface SkillLogo3DProps {
  name: string
  position: [number, number, number]
  color: string
}

export default function SkillLogo3D({ name, position, color }: SkillLogo3DProps) {
  const meshRef = useRef<THREE.Group>(null!)
  const glowRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.1
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2
    }
    
    if (glowRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
      glowRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <group ref={meshRef} position={position}>
      {/* Glow effect */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.1} />
      </mesh>

      {/* Main logo container */}
      <mesh castShadow>
        <boxGeometry args={[2, 2, 0.3]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Logo text */}
      <Center position={[0, 0, 0.2]}>
        <Text3D
          font="/fonts/inter_bold.json"
          size={0.4}
          height={0.1}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.01}
          bevelOffset={0}
          bevelSegments={5}
        >
          {name.substring(0, 2).toUpperCase()}
          <meshStandardMaterial
            color={color}
            metalness={0.5}
            roughness={0.3}
            emissive={color}
            emissiveIntensity={0.5}
          />
        </Text3D>
      </Center>

      {/* Border glow */}
      <mesh position={[0, 0, -0.16]}>
        <boxGeometry args={[2.1, 2.1, 0.02]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  )
}
