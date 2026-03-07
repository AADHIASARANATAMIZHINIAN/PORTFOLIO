import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Skip smooth scroll on mobile for performance
    const isMobile = window.innerWidth < 768
    if (isMobile) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      infinite: false,
      syncTouch: false,
      prevent: (node) => node.classList.contains('no-smooth-scroll'),
    })

    // Expose lenis globally so other components can call lenis.scrollTo()
    ;(window as any).__lenis = lenis

    // Dispatch custom scroll events so nav + other components can track scroll position
    lenis.on('scroll', ({ scroll }: { scroll: number }) => {
      window.dispatchEvent(new CustomEvent('lenis-scroll', { detail: { scroll } }))
    })

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      ;(window as any).__lenis = null
    }
  }, [])

  return <>{children}</>
}
