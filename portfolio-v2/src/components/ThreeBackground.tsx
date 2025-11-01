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

// Morphing Organic Shape - transitions between different geometric forms
function OrganicSphere({ mouse }: { mouse: { x: number; y: number } }) {
  const sphereRef = useRef<THREE.Points>(null!)
  const noise3D = useMemo(() => createNoise3D(), [])
  const [currentShape, setCurrentShape] = useState(0)

  const particles = useMemo(() => {
    // Create particles in a spherical distribution
    const count = isMobile ? 8000 : 20000
    const temp = []
    const radius = 8

    for (let i = 0; i < count; i++) {
      // Fibonacci sphere distribution for even particle placement
      const phi = Math.acos(-1 + (2 * i) / count)
      const theta = Math.sqrt(count * Math.PI) * phi
      
      const x = radius * Math.cos(theta) * Math.sin(phi)
      const y = radius * Math.sin(theta) * Math.sin(phi)
      const z = radius * Math.cos(phi)
      
      temp.push(x, y, z)
    }
    return new Float32Array(temp)
  }, [])

  // Shape morphing functions
  const getShapePosition = (x: number, y: number, z: number, shapeType: number, progress: number) => {
    const distance = Math.sqrt(x * x + y * y + z * z)
    const normalizedX = x / distance
    const normalizedY = y / distance
    const normalizedZ = z / distance
    
    // Smooth transition factor
    const t = (Math.sin(progress * Math.PI * 2) + 1) / 2
    
    switch(shapeType) {
      case 0: // Sphere (base)
        return { x: normalizedX, y: normalizedY, z: normalizedZ }
      
      case 1: // Cube
        const cubeX = Math.sign(normalizedX) * Math.pow(Math.abs(normalizedX), 0.5)
        const cubeY = Math.sign(normalizedY) * Math.pow(Math.abs(normalizedY), 0.5)
        const cubeZ = Math.sign(normalizedZ) * Math.pow(Math.abs(normalizedZ), 0.5)
        return { 
          x: normalizedX * (1 - t) + cubeX * t,
          y: normalizedY * (1 - t) + cubeY * t,
          z: normalizedZ * (1 - t) + cubeZ * t
        }
      
      case 2: // Torus
        const torusR = 1.0
        const torusRad = Math.sqrt(normalizedX * normalizedX + normalizedZ * normalizedZ)
        const torusX = normalizedX * (1 + torusR / torusRad)
        const torusZ = normalizedZ * (1 + torusR / torusRad)
        return {
          x: normalizedX * (1 - t) + torusX * t * 0.7,
          y: normalizedY,
          z: normalizedZ * (1 - t) + torusZ * t * 0.7
        }
      
      case 3: // Octahedron/Diamond
        const octaX = Math.sign(normalizedX) * Math.abs(normalizedX)
        const octaY = Math.sign(normalizedY) * Math.abs(normalizedY) * 1.3
        const octaZ = Math.sign(normalizedZ) * Math.abs(normalizedZ)
        return {
          x: normalizedX * (1 - t) + octaX * t,
          y: normalizedY * (1 - t) + octaY * t,
          z: normalizedZ * (1 - t) + octaZ * t
        }
      
      case 4: // Twisted shape
        const twist = Math.atan2(normalizedY, normalizedX) * 2
        const twistedX = normalizedX * Math.cos(twist) - normalizedZ * Math.sin(twist)
        const twistedZ = normalizedX * Math.sin(twist) + normalizedZ * Math.cos(twist)
        return {
          x: normalizedX * (1 - t) + twistedX * t,
          y: normalizedY,
          z: normalizedZ * (1 - t) + twistedZ * t
        }
      
      default:
        return { x: normalizedX, y: normalizedY, z: normalizedZ }
    }
  }

  useFrame((state) => {
    if (sphereRef.current) {
      const time = state.clock.getElapsedTime()
      const positions = sphereRef.current.geometry.attributes.position.array as Float32Array
      
      // Change shape every 8 seconds
      const shapeIndex = Math.floor(time / 8) % 5
      const shapeProgress = (time % 8) / 8
      
      if (shapeIndex !== currentShape) {
        setCurrentShape(shapeIndex)
      }

      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i]
        const y = positions[i + 1]
        const z = positions[i + 2]
        
        // Calculate distance from center for radial effects
        const distance = Math.sqrt(x * x + y * y + z * z)
        
        // Mouse interaction - particles react to mouse position
        const dx = x - mouse.x * 15
        const dy = y - mouse.y * 15
        const dz = z
        const mouseDistance = Math.sqrt(dx * dx + dy * dy + dz * dz)
        const mouseInfluence = Math.max(0, 1 - mouseDistance / 20) * 3
        
        // Create organic breathing effect with multiple noise layers
        const noise1 = noise3D(x * 0.2, y * 0.2, time * 0.4)
        const noise2 = noise3D(x * 0.1, y * 0.1, time * 0.2)
        const noise3Val = noise3D(x * 0.05, y * 0.05, time * 0.6)
        
        // Combine noises for complex organic motion
        const displacement = (noise1 * 1.5 + noise2 * 0.8 + noise3Val * 0.5) * 1.2
        
        // Breathing/pulsating effect
        const pulse = Math.sin(time * 0.8) * 0.3 + Math.cos(time * 1.2) * 0.2
        
        // Get morphed shape position
        const shapePos = getShapePosition(x, y, z, shapeIndex, shapeProgress)
        
        // Apply displacement along the morphed normal
        const scale = 1 + displacement + pulse + mouseInfluence * 0.3
        
        positions[i] = shapePos.x * distance * scale
        positions[i + 1] = shapePos.y * distance * scale
        positions[i + 2] = shapePos.z * distance * scale
      }

      sphereRef.current.geometry.attributes.position.needsUpdate = true
      
      // Slow rotation for dynamic feel
      sphereRef.current.rotation.y = time * 0.15
      sphereRef.current.rotation.x = Math.sin(time * 0.3) * 0.2
    }
  })

  return (
    <points ref={sphereRef} position={[0, 0, -15]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.08 : 0.06}
        color="#10b981"
        transparent
        opacity={0.7}
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
