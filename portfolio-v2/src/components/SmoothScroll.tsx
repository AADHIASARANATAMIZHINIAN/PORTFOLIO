import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Disable smooth scroll on mobile for better performance
    const isMobile = window.innerWidth < 768
    
    if (isMobile) {
      return // Skip smooth scroll on mobile
    }
    
    const lenis = new Lenis({
      wrapper: wrapperRef.current!,
      content: wrapperRef.current!,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      infinite: false,
      syncTouch: false,
      prevent: (node) => node.classList.contains('no-smooth-scroll')
    })

    lenisRef.current = lenis

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return <div ref={wrapperRef} style={{ height: '100vh', overflow: 'hidden' }}>{children}</div>
}
