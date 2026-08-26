import { useState, useEffect } from 'react'
import { scrollToSection } from '../utils/scroll'

interface NavigationProps { activeSection: string }
const links = [
  { id: 'about', label: 'About' }, { id: 'projects', label: 'Work' }, { id: 'skills', label: 'Stack' },
  { id: 'github-stats', label: 'Source' }, { id: 'experience', label: 'Journey' }, { id: 'contact', label: 'Contact' },
]

export default function Navigation({ activeSection }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    const onLenis = (e: Event) => setScrolled((e as CustomEvent<{ scroll: number }>).detail.scroll > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('lenis-scroll', onLenis)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('lenis-scroll', onLenis) }
  }, [])
  const go = (id: string) => { scrollToSection(id); setMenuOpen(false) }
  return (
    <>
      <nav style={{
        position:'fixed', top:0, left:0, right:0, zIndex:50, height:'64px', display:'flex', alignItems:'center', padding:'0 20px',
        background: scrolled ? 'rgba(5,5,8,0.78)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(1.2)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        transition:'background 0.3s, border-color 0.3s', boxSizing:'border-box',
      }}>
        <button onClick={()=>go('hero')} style={{ fontFamily:'Bebas Neue, sans-serif', fontWeight:700, fontSize:'20px', color:'#fff', letterSpacing:'-0.03em', background:'none', border:'none', cursor:'pointer', padding:0, marginRight:'auto', display:'flex', alignItems:'center', gap:'8px' }} onMouseEnter={e=>(e.currentTarget.style.color='#4FFFB0')} onMouseLeave={e=>(e.currentTarget.style.color='#fff')}>
          AT <span className="hidden sm:inline font-mono text-xs font-normal tracking-[0.14em] uppercase text-white/30" style={{ letterSpacing:'0.12em' }}>AADHIASARANA</span>
        </button>
        <ul style={{ display:'none', alignItems:'center', gap:'2px', listStyle:'none', margin:0, padding:0 }} className="md-flex">
          {links.map(link => {
            const active = activeSection===link.id
            const hover = hovered===link.id
            return (
              <li key={link.id}><button onClick={()=>go(link.id)} onMouseEnter={()=>setHovered(link.id)} onMouseLeave={()=>setHovered(null)} style={{
                position:'relative', padding:'7px 14px', background: hover ? 'rgba(255,255,255,0.06)' : 'transparent',
                border:`1px solid ${hover ? 'rgba(255,255,255,0.08)' : 'transparent'}`, borderRadius:'999px', cursor:'pointer',
                fontFamily:'DM Sans, sans-serif', fontSize:'13px', fontWeight: active ? 600 : 400,
                color: active ? '#4FFFB0' : hover ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.45)', transition:'all 0.2s',
              }}>{link.label}{active && <span style={{ position:'absolute', bottom:'-6px', left:'50%', transform:'translateX(-50%)', width:'4px', height:'4px', borderRadius:'50%', background:'#4FFFB0' }} />}</button></li>
            )
          })}
        </ul>
        <button onClick={()=>go('contact')} className="md-hire" style={{ marginLeft:'12px', padding:'8px 16px', borderRadius:'999px', fontFamily:'DM Sans, sans-serif', fontSize:'13px', fontWeight:600, color:'#050508', background:'#4FFFB0', border:'1px solid rgba(79,255,176,0.3)', cursor:'pointer', display:'none' }}>Hire me</button>
        <button onClick={()=>setMenuOpen(p=>!p)} className="md-hide" aria-label="Menu" style={{ background:'none', border:'none', cursor:'pointer', padding:'6px', display:'flex', flexDirection:'column', gap:'5px', marginLeft:'auto' }}>
          {[0,1,2].map(i=>(<span key={i} style={{ display:'block', width:'22px', height:'2px', background:'rgba(255,255,255,0.7)', borderRadius:'2px', transition:'transform 0.25s, opacity 0.25s', transform: menuOpen && i===0 ? 'rotate(45deg) translate(5px,5px)' : menuOpen && i===2 ? 'rotate(-45deg) translate(5px,-5px)' : 'none', opacity: menuOpen && i===1 ? 0 : 1 }} />))}
        </button>
      </nav>
      <div style={{ position:'fixed', top:'64px', left:'12px', right:'12px', zIndex:49, background:'rgba(8,8,14,0.96)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'16px', padding:'12px', display: menuOpen ? 'block' : 'none' }} className="md-hide">
        {links.map(link=>(
          <button key={link.id} onClick={()=>go(link.id)} style={{ display:'block', width:'100%', textAlign:'left', padding:'12px 14px', borderRadius:'10px', background: activeSection===link.id ? 'rgba(79,255,176,0.08)' : 'transparent', border:'none', cursor:'pointer', fontFamily:'DM Sans, sans-serif', fontSize:'15px', color: activeSection===link.id ? '#4FFFB0' : 'rgba(255,255,255,0.6)', marginBottom:'2px' }}>{link.label}</button>
        ))}
        <div style={{ borderTop:'1px solid rgba(255,255,255,0.06)', marginTop:'8px', paddingTop:'10px' }}>
          <button onClick={()=>go('contact')} style={{ display:'block', width:'100%', padding:'12px 16px', borderRadius:'999px', fontFamily:'DM Sans, sans-serif', fontSize:'14px', fontWeight:600, color:'#050508', background:'#4FFFB0', border:'none', cursor:'pointer' }}>Hire me — available now</button>
          <p className="font-mono text-xs text-white/30 text-center mt-2">Press <span className="text-white/50">/</span> or <span className="text-white/50">⌘K</span> for palette</p>
        </div>
      </div>
      <style>{`@media (min-width: 880px) { .md-flex{ display:flex !important; } .md-hire{ display:block !important; } .md-hide{ display:none !important; } }`}</style>
    </>
  )
}
