import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import { Keyboard3D } from './keyboard-3d'

export default function ContactKeyboard() {
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set())
  const [capsLock, setCapsLock] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setActiveKeys((prev) => new Set(prev).add(e.code))
      if (e.code === 'CapsLock' && !e.repeat) setCapsLock((prev) => !prev)
    }
    const handleKeyUp = (e: KeyboardEvent) => {
      setActiveKeys((prev) => {
        const next = new Set(prev)
        next.delete(e.code)
        return next
      })
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return (
    <div
      className="w-full rounded-2xl overflow-hidden"
      style={{
        height: '280px',
        background: 'rgba(5,5,8,0.95)',
        border: '1px solid rgba(79,255,176,0.15)',
        boxShadow: '0 0 40px rgba(79,255,176,0.05), inset 0 1px 0 rgba(255,255,255,0.04)',
      }}
    >
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [0, 8, 12], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={['#050508']} />

        {/* Lighting for dark portfolio aesthetic */}
        <ambientLight intensity={0.3} />
        <spotLight
          position={[0, 12, 6]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        {/* Brand teal fill light */}
        <pointLight position={[0, 4, 8]} color="#0BFFE4" intensity={0.4} />
        {/* Brand mint backlight */}
        <pointLight position={[0, 2, -6]} color="#4FFFB0" intensity={0.3} />
        {/* Subtle purple rim */}
        <pointLight position={[-10, 3, 0]} color="#7B61FF" intensity={0.2} />

        <Suspense fallback={null}>
          <Environment preset="city" />
          <Keyboard3D activeKeys={activeKeys} capsLock={capsLock} />
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.5}
            scale={30}
            blur={2.5}
            far={4}
            color="#4FFFB0"
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
