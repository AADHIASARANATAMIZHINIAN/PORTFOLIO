import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { createNoise3D } from 'simplex-noise'

// Detect mobile device
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

// Animated gradient orbs for depth and atmosphere
function GradientOrbs() {
  const orb1Ref = useRef<THREE.Mesh>(null!)
  const orb2Ref = useRef<THREE.Mesh>(null!)
  const orb3Ref = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    // Orb 1 - Purple/Blue
    if (orb1Ref.current) {
      orb1Ref.current.position.x = Math.sin(time * 0.2) * 15
      orb1Ref.current.position.y = Math.cos(time * 0.15) * 10
      orb1Ref.current.position.z = -30 + Math.sin(time * 0.1) * 5
    }
    
    // Orb 2 - Cyan/Teal
    if (orb2Ref.current) {
      orb2Ref.current.position.x = Math.cos(time * 0.25) * 20
      orb2Ref.current.position.y = Math.sin(time * 0.2) * 15
      orb2Ref.current.position.z = -25 + Math.cos(time * 0.12) * 5
    }
    
    // Orb 3 - Blue/Indigo (only on desktop)
    if (orb3Ref.current && !isMobile) {
      orb3Ref.current.position.x = Math.sin(time * 0.18) * 18
      orb3Ref.current.position.y = Math.cos(time * 0.22) * 12
      orb3Ref.current.position.z = -35 + Math.sin(time * 0.15) * 5
    }
  })

  return (
    <group>
      {/* Orb 1 - Purple/Blue gradient */}
      <mesh ref={orb1Ref}>
        <sphereGeometry args={[8, 32, 32]} />
        <meshBasicMaterial 
          color="#6366f1" 
          transparent 
          opacity={0.08}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Orb 2 - Cyan/Teal gradient */}
      <mesh ref={orb2Ref}>
        <sphereGeometry args={[10, 32, 32]} />
        <meshBasicMaterial 
          color="#06b6d4" 
          transparent 
          opacity={0.06}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Orb 3 - Blue/Indigo (desktop only) */}
      {!isMobile && (
        <mesh ref={orb3Ref}>
          <sphereGeometry args={[7, 32, 32]} />
          <meshBasicMaterial 
            color="#4f46e5" 
            transparent 
            opacity={0.07}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}
    </group>
  )
}

// Starfield component - optimized for mobile
function Starfield() {
  const starsRef = useRef<THREE.Points>(null!)
  
  const starPositions = useMemo(() => {
    // Reduce star count on mobile
    const starCount = isMobile ? 800 : 2000
    const positions = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100
    }
    return positions
  }, [])

  useFrame((state) => {
    if (starsRef.current) {
      // Slower rotation on mobile for performance
      starsRef.current.rotation.y = state.clock.getElapsedTime() * (isMobile ? 0.01 : 0.02)
    }
  })

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={isMobile ? 800 : 2000}
          array={starPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={isMobile ? 0.08 : 0.05} 
        color="#ffffff" 
        transparent 
        opacity={0.6} 
      />
    </points>
  )
}

// Organic Living Sphere - Gradually evolves between shapes
function OrganicSphere({ mouse }: { mouse: { x: number; y: number } }) {
  const sphereRef = useRef<THREE.Points>(null!)
  const noise3D = useMemo(() => createNoise3D(), [])

  const particles = useMemo(() => {
    const count = isMobile ? 10000 : 25000
    const positions = new Float32Array(count * 3)
    const radius = 10
    
    for (let i = 0; i < count; i++) {
      // Fibonacci sphere for even distribution
      const phi = Math.acos(-1 + (2 * i) / count)
      const theta = Math.sqrt(count * Math.PI) * phi
      
      const x = radius * Math.cos(theta) * Math.sin(phi)
      const y = radius * Math.sin(theta) * Math.sin(phi)
      const z = radius * Math.cos(phi)
      
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
    }
    return positions
  }, [])

  useFrame((state) => {
    if (!sphereRef.current) return
    
    const time = state.clock.getElapsedTime()
    const positions = sphereRef.current.geometry.attributes.position.array as Float32Array

    // Slow shape evolution - 20 seconds per cycle through 3 forms
    const evolutionCycle = 20
    const evolutionTime = (time % (evolutionCycle * 3)) / evolutionCycle
    
    // Determine current shape blend (0=sphere, 1=torus, 2=blob)
    const shapePhase = time % (evolutionCycle * 3)
    let torusBlend = 0, blobBlend = 0
    
    if (shapePhase < evolutionCycle) {
      // Sphere to Torus
      torusBlend = Math.sin((shapePhase / evolutionCycle) * Math.PI / 2)
    } else if (shapePhase < evolutionCycle * 2) {
      // Torus to Blob
      torusBlend = Math.cos(((shapePhase - evolutionCycle) / evolutionCycle) * Math.PI / 2)
      blobBlend = Math.sin(((shapePhase - evolutionCycle) / evolutionCycle) * Math.PI / 2)
    } else {
      // Blob back to Sphere
      blobBlend = Math.cos(((shapePhase - evolutionCycle * 2) / evolutionCycle) * Math.PI / 2)
    }

    for (let i = 0; i < positions.length; i += 3) {
      // Get base position (never changes)
      const baseX = particles[i]
      const baseY = particles[i + 1]
      const baseZ = particles[i + 2]
      
      // Normalize
      const length = Math.sqrt(baseX * baseX + baseY * baseY + baseZ * baseZ)
      const nx = baseX / length
      const ny = baseY / length
      const nz = baseZ / length
      
      // Shape transformations
      let shapeX = nx, shapeY = ny, shapeZ = nz
      
      // Torus shape
      if (torusBlend > 0) {
        const ringRadius = Math.sqrt(nx * nx + nz * nz)
        if (ringRadius > 0.01) {
          const torusX = nx * (1 + 0.5 / ringRadius)
          const torusZ = nz * (1 + 0.5 / ringRadius)
          const torusY = ny * 0.6
          
          shapeX = nx * (1 - torusBlend) + torusX * torusBlend * 0.85
          shapeY = ny * (1 - torusBlend) + torusY * torusBlend
          shapeZ = nz * (1 - torusBlend) + torusZ * torusBlend * 0.85
        }
      }
      
      // Blob/organic deformation
      if (blobBlend > 0) {
        const blobX = nx * (1 + Math.sin(ny * 3) * 0.3 * blobBlend)
        const blobY = ny * (1 + Math.cos(nz * 3) * 0.3 * blobBlend)
        const blobZ = nz * (1 + Math.sin(nx * 3) * 0.3 * blobBlend)
        
        shapeX = shapeX * (1 - blobBlend) + blobX * blobBlend
        shapeY = shapeY * (1 - blobBlend) + blobY * blobBlend
        shapeZ = shapeZ * (1 - blobBlend) + blobZ * blobBlend
      }
      
      // Layered noise for organic movement
      const n1 = noise3D(shapeX * 2 + time * 0.3, shapeY * 2 + time * 0.3, shapeZ * 2 + time * 0.3)
      const n2 = noise3D(shapeX * 4 + time * 0.15, shapeY * 4 + time * 0.15, shapeZ * 4 + time * 0.15)
      const n3 = noise3D(shapeX * 8 + time * 0.5, shapeY * 8 + time * 0.5, shapeZ * 8 + time * 0.5)
      
      // Combine noise layers
      const noiseDisplacement = (n1 * 1.5 + n2 * 0.8 + n3 * 0.4) * 1.2
      
      // Breathing/pulsating
      const pulse = Math.sin(time * 0.5) * 0.4 + Math.sin(time * 0.8) * 0.2
      
      // Mouse interaction
      const dx = baseX - mouse.x * 10
      const dy = baseY - mouse.y * 10
      const dist = Math.sqrt(dx * dx + dy * dy + baseZ * baseZ)
      const mouseEffect = Math.max(0, 1 - dist / 20) * 3
      
      // Final radius with all effects
      const finalRadius = length + noiseDisplacement + pulse + mouseEffect
      
      // Set position (always visible, always positive radius)
      positions[i] = shapeX * finalRadius
      positions[i + 1] = shapeY * finalRadius
      positions[i + 2] = shapeZ * finalRadius
    }

    sphereRef.current.geometry.attributes.position.needsUpdate = true
    
    // Gentle rotation
    sphereRef.current.rotation.y = time * 0.08
    sphereRef.current.rotation.x = Math.sin(time * 0.2) * 0.1
  })

  return (
    <points ref={sphereRef} position={[0, 0, -20]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.05 : 0.04}
        color="#10b981"
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Floating geometric shapes
function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Torus */}
      <mesh position={[-15, 10, -20]} rotation={[0, 0, 0]}>
        <torusGeometry args={[2, 0.3, 16, 32]} />
        <meshStandardMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.05} 
          wireframe 
        />
      </mesh>
      
      {/* Octahedron */}
      <mesh position={[18, -8, -15]} rotation={[0.5, 0.5, 0]}>
        <octahedronGeometry args={[2, 0]} />
        <meshStandardMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.04} 
          wireframe 
        />
      </mesh>
      
      {/* Icosahedron */}
      <mesh position={[-12, -12, -18]} rotation={[0, 0, 0]}>
        <icosahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.06} 
          wireframe 
        />
      </mesh>

      {/* Box (only on desktop for performance) */}
      {!isMobile && (
        <mesh position={[15, 15, -25]} rotation={[0.3, 0.3, 0]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.03} 
            wireframe 
          />
        </mesh>
      )}
    </group>
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
      <GradientOrbs />
      <Starfield />
      <OrganicSphere mouse={mouse} />
      <FloatingShapes />
    </>
  )
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0 touch-none">
      <Canvas
        camera={{ position: [0, 0, 30], fov: 75 }}
        style={{ background: 'transparent', touchAction: 'none' }}
        dpr={isMobile ? [1, 1.5] : [1, 2]} // Lower pixel ratio on mobile
        performance={{ min: 0.5 }} // Allow lower FPS on mobile for battery
        gl={{ 
          antialias: !isMobile, // Disable antialiasing on mobile for performance
          alpha: true,
          powerPreference: isMobile ? 'low-power' : 'high-performance'
        }}
      >
        <ambientLight intensity={0.5} />
        <fog attach="fog" args={['#0a0a0a', 20, 60]} />
        <Scene />
      </Canvas>
    </div>
  )
}
