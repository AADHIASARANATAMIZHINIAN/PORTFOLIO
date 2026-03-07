/**
 * Lenis-aware smooth scroll utility.
 * Uses lenis.scrollTo() when available, falls back to scrollIntoView.
 */
export function scrollToSection(id: string, offset = -80) {
  const el = document.getElementById(id)
  if (!el) return

  const lenis = (window as any).__lenis
  if (lenis) {
    lenis.scrollTo(el, {
      offset,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
