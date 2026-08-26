import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100
      setP(scrolled)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div className="fixed top-0 left-0 h-px z-[60] pointer-events-none" style={{ width: `${p}%`, background: 'linear-gradient(90deg, #4FFFB0, #0BFFE4)', boxShadow: '0 0 8px rgba(79,255,176,0.5)' }} aria-hidden />
}
