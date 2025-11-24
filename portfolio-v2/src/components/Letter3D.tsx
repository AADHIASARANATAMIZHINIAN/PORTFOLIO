import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Letter3D() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    })

    const size = containerRef.current.clientWidth
    renderer.setSize(size, size)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Neural network nodes forming an "A" shape
    const nodes: THREE.Mesh[] = []
    const connections: THREE.Line[] = []
    
    // Node positions forming "A"
    const nodePositions = [
      // Top point
      { x: 0, y: 1, z: 0 },
      // Left side
      { x: -0.8, y: -0.8, z: 0 },
      { x: -0.6, y: -0.2, z: 0 },
      { x: -0.4, y: 0.4, z: 0.2 },
      // Right side
      { x: 0.8, y: -0.8, z: 0 },
      { x: 0.6, y: -0.2, z: 0 },
      { x: 0.4, y: 0.4, z: -0.2 },
      // Crossbar
      { x: -0.3, y: 0, z: 0.1 },
      { x: 0, y: 0, z: -0.1 },
      { x: 0.3, y: 0, z: 0.1 },
      // Additional depth nodes
      { x: 0, y: 0.6, z: 0.3 },
      { x: -0.5, y: -0.5, z: 0.3 },
      { x: 0.5, y: -0.5, z: -0.3 },
    ]

    // Create nodes
    const nodeGeometry = new THREE.SphereGeometry(0.08, 16, 16)
    const nodeMaterial = new THREE.MeshStandardMaterial({
      color: 0x9c43ff,
      emissive: 0x6633ff,
      emissiveIntensity: 0.5,
      metalness: 0.8,
      roughness: 0.2
    })

    nodePositions.forEach((pos) => {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial.clone())
      node.position.set(pos.x, pos.y, pos.z)
      nodes.push(node)
      scene.add(node)
    })

    // Create connections between nodes
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x4cc9f0,
      transparent: true,
      opacity: 0.6,
      linewidth: 2
    })

    // Connect nearby nodes
    const connectionPairs = [
      [0, 3], [0, 6], [0, 10], // Top to upper nodes
      [3, 2], [2, 1], // Left side
      [6, 5], [5, 4], // Right side
      [2, 7], [7, 8], [8, 5], // Crossbar
      [3, 7], [6, 9], // Cross connections
      [1, 11], [4, 12], // Bottom depth
      [10, 3], [10, 6], // Top depth
      [11, 2], [12, 5], // Side depth
      [7, 9], [8, 11], [8, 12] // Additional connections
    ]

    connectionPairs.forEach(([i, j]) => {
      const points = [
        nodes[i].position,
        nodes[j].position
      ]
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const line = new THREE.Line(geometry, lineMaterial)
      connections.push(line)
      scene.add(line)
    })

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1.5)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(0x9c43ff, 2, 100)
    pointLight1.position.set(2, 2, 2)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x4cc9f0, 1.5, 100)
    pointLight2.position.set(-2, -1, 3)
    scene.add(pointLight2)

    const group = new THREE.Group()
    nodes.forEach(node => group.add(node))
    connections.forEach(conn => group.add(conn))
    scene.add(group)

    camera.position.z = 3
    camera.position.y = 0

    // Animation
    let animationId: number
    let time = 0
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      time += 0.01
      
      // Rotate the entire neural network
      group.rotation.y = time * 0.3
      group.rotation.x = Math.sin(time * 0.5) * 0.2
      
      // Pulse effect on nodes
      nodes.forEach((node, i) => {
        const pulse = Math.sin(time * 2 + i * 0.5) * 0.02 + 1
        node.scale.set(pulse, pulse, pulse)
        
        // Update node emissive intensity
        if (node.material instanceof THREE.MeshStandardMaterial) {
          node.material.emissiveIntensity = 0.3 + Math.sin(time * 3 + i) * 0.2
        }
      })

      // Pulse effect on connections
      connections.forEach((conn, i) => {
        if (conn.material instanceof THREE.LineBasicMaterial) {
          conn.material.opacity = 0.4 + Math.sin(time * 2 + i * 0.3) * 0.3
        }
      })
      
      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return
      const newSize = containerRef.current.clientWidth
      renderer.setSize(newSize, newSize)
      camera.aspect = 1
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }
      nodeGeometry.dispose()
      nodeMaterial.dispose()
      lineMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} className="w-full h-full flex items-center justify-center" />
}
