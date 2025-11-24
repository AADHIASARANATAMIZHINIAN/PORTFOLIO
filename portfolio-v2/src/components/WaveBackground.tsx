import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function WaveBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'low-power'
    })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Create wave geometry
    const geometry = new THREE.PlaneGeometry(50, 50, 50, 50)

    // Create gradient material with purple to cyan
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        colorA: { value: new THREE.Color('#9c43ff') }, // Purple
        colorB: { value: new THREE.Color('#4cc9f0') }, // Cyan
      },
      vertexShader: `
        uniform float time;
        varying vec2 vUv;
        varying float vElevation;
        
        void main() {
          vUv = uv;
          
          vec3 pos = position;
          
          // Create wave patterns
          float wave1 = sin(pos.x * 0.3 + time * 0.5) * 2.0;
          float wave2 = sin(pos.y * 0.4 + time * 0.3) * 1.5;
          float wave3 = sin((pos.x + pos.y) * 0.2 + time * 0.4) * 1.0;
          
          pos.z = wave1 + wave2 + wave3;
          vElevation = pos.z;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 colorA;
        uniform vec3 colorB;
        varying vec2 vUv;
        varying float vElevation;
        
        void main() {
          // Create gradient based on elevation and position
          float mixStrength = (vElevation + 3.0) / 6.0;
          vec3 color = mix(colorA, colorB, mixStrength * vUv.y);
          
          // Add some transparency
          float alpha = 0.3 + (mixStrength * 0.3);
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      wireframe: false,
    })

    const plane = new THREE.Mesh(geometry, material)
    plane.rotation.x = -Math.PI * 0.35
    scene.add(plane)

    // Add particles for galaxy effect
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 500
    const particlesPositions = new Float32Array(particlesCount * 3)
    const particlesColors = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i += 3) {
      particlesPositions[i] = (Math.random() - 0.5) * 80
      particlesPositions[i + 1] = (Math.random() - 0.5) * 80
      particlesPositions[i + 2] = (Math.random() - 0.5) * 30
      
      const isPurple = Math.random() > 0.5
      if (isPurple) {
        particlesColors[i] = 0.6 + Math.random() * 0.4
        particlesColors[i + 1] = 0.2 + Math.random() * 0.3
        particlesColors[i + 2] = 1
      } else {
        particlesColors[i] = 0.3
        particlesColors[i + 1] = 0.8 + Math.random() * 0.2
        particlesColors[i + 2] = 0.9 + Math.random() * 0.1
      }
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlesPositions, 3))
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(particlesColors, 3))

    const particlesMaterial = new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    camera.position.z = 20
    camera.position.y = 5

    // Animation
    let animationId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animationId = requestAnimationFrame(animate)
      
      const elapsedTime = clock.getElapsedTime()
      
      // Update wave
      material.uniforms.time.value = elapsedTime
      
      // Slow rotation for particles
      particles.rotation.y = elapsedTime * 0.05
      particles.rotation.x = elapsedTime * 0.02
      
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
      geometry.dispose()
      material.dispose()
      particlesGeometry.dispose()
      particlesMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} className="w-full h-full" />
}
