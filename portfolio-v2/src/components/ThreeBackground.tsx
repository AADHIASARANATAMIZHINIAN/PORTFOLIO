import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { createNoise3D } from 'simplex-noise'

// Starfield component
function Starfield() {
  const starsRef = useRef<THREE.Points>(null!)
  
  const starPositions = useMemo(() => {
    const positions = new Float32Array(2000 * 3)
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100
    }
    return positions
  }, [])

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02
    }
  })

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={2000}
          array={starPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.6} />
    </points>
  )
}

// Particle Wave component (centered, responds to mouse and touch)
function ParticleWave({ mouse }: { mouse: { x: number; y: number } }) {
  const pointsRef = useRef<THREE.Points>(null!)
  const noise3D = useMemo(() => createNoise3D(), [])

  const particles = useMemo(() => {
    const count = 15000
    const temp = []
    const width = 40
    const height = 30

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * width
      const y = (Math.random() - 0.5) * height
      const z = 0
      temp.push(x, y, z)
    }
    return new Float32Array(temp)
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime()
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array

      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i]
        const y = positions[i + 1]
        
        // Mouse/Touch influence - slightly reduced for subtle touch response
        const dx = x - mouse.x * 20
        const dy = y - mouse.y * 15
        const mouseDistance = Math.sqrt(dx * dx + dy * dy)
        const mouseInfluence = Math.max(0, 1 - mouseDistance / 15) * 2.5
        
        // Create wave with noise
        const noise = noise3D(x * 0.08, y * 0.08, time * 0.3)
        const noise2 = noise3D(x * 0.15, y * 0.15, time * 0.15)
        
        positions[i + 2] = noise * 4.0 + noise2 * 2.0 + mouseInfluence
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true
      pointsRef.current.rotation.z = Math.sin(time * 0.2) * 0.1
    }
  })

  return (
    <points ref={pointsRef} position={[0, 0, -5]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#d1d5db"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Mouse and Touch tracker
function Scene() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const { viewport } = useThree()

  useFrame((state) => {
    const x = (state.mouse.x * viewport.width) / 2
    const y = (state.mouse.y * viewport.height) / 2
    setMouse({ x, y })
  })

  return (
    <>
      <Starfield />
      <ParticleWave mouse={mouse} />
    </>
  )
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0 touch-none">
      <Canvas
        camera={{ position: [0, 0, 30], fov: 75 }}
        style={{ background: 'transparent', touchAction: 'none' }}
      >
        <ambientLight intensity={0.5} />
        <Scene />
      </Canvas>
    </div>
  )
}
