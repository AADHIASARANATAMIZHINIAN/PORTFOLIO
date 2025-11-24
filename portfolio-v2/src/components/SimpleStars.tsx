import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function SimpleStars() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ 
      antialias: false, 
      alpha: true,
      powerPreference: 'low-power'
    })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(1) // Fixed pixel ratio for performance
    containerRef.current.appendChild(renderer.domElement)

    // Create stars
    const starGeometry = new THREE.BufferGeometry()
    const starCount = 200 // Very few stars for performance
    const positions = new Float32Array(starCount * 3)
    const colors = new Float32Array(starCount * 3)

    for (let i = 0; i < starCount * 3; i += 3) {
      // Position
      positions[i] = (Math.random() - 0.5) * 100
      positions[i + 1] = (Math.random() - 0.5) * 100
      positions[i + 2] = (Math.random() - 0.5) * 50
      
      // Color (purple to cyan)
      const isPurple = Math.random() > 0.5
      if (isPurple) {
        colors[i] = 0.6 + Math.random() * 0.4     // R
        colors[i + 1] = 0.2 + Math.random() * 0.3 // G
        colors[i + 2] = 1                         // B
      } else {
        colors[i] = 0.3                           // R
        colors[i + 1] = 0.8 + Math.random() * 0.2 // G
        colors[i + 2] = 0.9 + Math.random() * 0.1 // B
      }
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const starMaterial = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    })

    const stars = new THREE.Points(starGeometry, starMaterial)
    scene.add(stars)

    camera.position.z = 5

    // Very simple, slow rotation - no flashing
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      
      // Extremely slow rotation to avoid flashing
      stars.rotation.y += 0.0001
      stars.rotation.x += 0.00005
      
      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }
      starGeometry.dispose()
      starMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} className="w-full h-full" />
}
