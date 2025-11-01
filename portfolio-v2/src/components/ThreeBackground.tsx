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

  // Shape morphing functions - smooth interpolation between shapes
  const getShapePosition = (x: number, y: number, z: number, currentShape: number, nextShape: number, blendFactor: number) => {
    const distance = Math.sqrt(x * x + y * y + z * z)
    if (distance === 0) return { x: 0, y: 0, z: 0 }
    
    const normalizedX = x / distance
    const normalizedY = y / distance
    const normalizedZ = z / distance
    
    // Get positions for both current and next shape
    const getCurrentShape = (type: number) => {
      switch(type) {
        case 0: // Sphere
          return { x: normalizedX, y: normalizedY, z: normalizedZ }
        
        case 1: // Cube
          const cubeX = Math.sign(normalizedX) * Math.pow(Math.abs(normalizedX), 0.4)
          const cubeY = Math.sign(normalizedY) * Math.pow(Math.abs(normalizedY), 0.4)
          const cubeZ = Math.sign(normalizedZ) * Math.pow(Math.abs(normalizedZ), 0.4)
          return { x: cubeX, y: cubeY, z: cubeZ }
        
        case 2: // Torus
          const torusRad = Math.sqrt(normalizedX * normalizedX + normalizedZ * normalizedZ)
          if (torusRad === 0) return { x: normalizedX, y: normalizedY, z: normalizedZ }
          const torusX = normalizedX * (1 + 0.5 / torusRad) * 0.8
          const torusZ = normalizedZ * (1 + 0.5 / torusRad) * 0.8
          return { x: torusX, y: normalizedY * 0.6, z: torusZ }
        
        case 3: // Octahedron
          return {
            x: normalizedX * 1.1,
            y: normalizedY * 1.4,
            z: normalizedZ * 1.1
          }
        
        case 4: // Twisted
          const angle = Math.atan2(normalizedY, normalizedX) * 1.5
          const twistedX = normalizedX * Math.cos(angle) - normalizedZ * Math.sin(angle)
          const twistedZ = normalizedX * Math.sin(angle) + normalizedZ * Math.cos(angle)
          return { x: twistedX * 0.9, y: normalizedY, z: twistedZ * 0.9 }
        
        default:
          return { x: normalizedX, y: normalizedY, z: normalizedZ }
      }
    }
    
    const current = getCurrentShape(currentShape)
    const next = getCurrentShape(nextShape)
    
    // Smooth interpolation between shapes
    return {
      x: current.x * (1 - blendFactor) + next.x * blendFactor,
      y: current.y * (1 - blendFactor) + next.y * blendFactor,
      z: current.z * (1 - blendFactor) + next.z * blendFactor
    }
  }

  useFrame((state) => {
    if (sphereRef.current) {
      const time = state.clock.getElapsedTime()
      const positions = sphereRef.current.geometry.attributes.position.array as Float32Array
      
      // Shape morphing system - changes every 10 seconds with 2-second transition
      const cycleDuration = 10
      const transitionDuration = 2
      const totalCycle = cycleDuration + transitionDuration
      const timeInCycle = time % (totalCycle * 5) // 5 shapes
      
      const currentShapeIndex = Math.floor(timeInCycle / totalCycle) % 5
      const nextShapeIndex = (currentShapeIndex + 1) % 5
      const timeInCurrentShape = timeInCycle % totalCycle
      
      // Smooth blend factor for transitions
      let blendFactor = 0
      if (timeInCurrentShape > cycleDuration) {
        // In transition phase
        blendFactor = (timeInCurrentShape - cycleDuration) / transitionDuration
        blendFactor = Math.sin(blendFactor * Math.PI / 2) // Ease-in-out
      }
      
      if (currentShapeIndex !== currentShape) {
        setCurrentShape(currentShapeIndex)
      }

      for (let i = 0; i < positions.length; i += 3) {
        const baseX = particles[i]
        const baseY = particles[i + 1]
        const baseZ = particles[i + 2]
        
        // Calculate distance from center for radial effects
        const distance = Math.sqrt(baseX * baseX + baseY * baseY + baseZ * baseZ)
        if (distance === 0) continue
        
        // Mouse interaction - particles react to mouse position
        const dx = baseX - mouse.x * 15
        const dy = baseY - mouse.y * 15
        const dz = baseZ
        const mouseDistance = Math.sqrt(dx * dx + dy * dy + dz * dz)
        const mouseInfluence = Math.max(0, 1 - mouseDistance / 20) * 2.5
        
        // Create organic breathing effect with multiple noise layers
        const noise1 = noise3D(baseX * 0.2, baseY * 0.2, time * 0.4)
        const noise2 = noise3D(baseX * 0.1, baseY * 0.1, time * 0.2)
        const noise3Val = noise3D(baseX * 0.05, baseY * 0.05, time * 0.6)
        
        // Combine noises for complex organic motion
        const displacement = (noise1 * 1.2 + noise2 * 0.6 + noise3Val * 0.4) * 1.0
        
        // Breathing/pulsating effect
        const pulse = Math.sin(time * 0.8) * 0.25 + Math.cos(time * 1.2) * 0.15
        
        // Get morphed shape position
        const shapePos = getShapePosition(baseX, baseY, baseZ, currentShapeIndex, nextShapeIndex, blendFactor)
        
        // Apply displacement and effects
        const scale = 8 * (1 + displacement + pulse + mouseInfluence * 0.2)
        
        positions[i] = shapePos.x * scale
        positions[i + 1] = shapePos.y * scale
        positions[i + 2] = shapePos.z * scale
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
