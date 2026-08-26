import { Github, Linkedin, Mail, Instagram } from 'lucide-react'
import { motion } from 'framer-motion'
import { scrollToSection } from '../utils/scroll'

const navLinks = [
  { label:'About', id:'about' }, { label:'Work', id:'projects' }, { label:'Stack', id:'skills' },
  { label:'Source', id:'github-stats' }, { label:'Journey', id:'experience' }, { label:'Contact', id:'contact' },
]
const socials = [
  { icon: Github, href:'https://github.com/AADHIASARANATAMIZHINIAN', label:'GitHub' },
  { icon: Linkedin, href:'https://www.linkedin.com/in/aadhiasarana-t-529641328', label:'LinkedIn' },
  { icon: Instagram, href:'https://www.instagram.com/__aadhiasarana_', label:'Instagram' },
  { icon: Mail, href:'mailto:aadhiasarana12@gmail.com', label:'Email' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative" style={{ borderTop:'1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div className="space-y-3">
            <span className="font-display font-bold text-white text-2xl block" style={{ letterSpacing:'-0.03em' }}>AT</span>
            <p className="font-body text-white/40 text-sm leading-relaxed max-w-xs">AI & Data Science undergrad. Building intelligent products — 7 shipped, more in the lab.</p>
            <span className="inline-flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-full text-brand" style={{ background:'rgba(79,255,176,0.06)', border:'1px solid rgba(79,255,176,0.14)' }}><span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" /> Available for internships</span>
          </div>
          <div>
            <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/25 mb-3">Navigate</p>
            <ul className="space-y-1.5">
              {navLinks.map(l=>(
                <li key={l.label}><button onClick={()=>scrollToSection(l.id)} className="font-body text-sm text-white/45 hover:text-white transition">{l.label}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/25 mb-3">Connect</p>
            <div className="flex flex-wrap gap-2">
              {socials.map(s=>(
                <motion.a key={s.label} href={s.href} target={s.label!=='Email' ? '_blank' : undefined} rel={s.label!=='Email' ? 'noopener noreferrer' : undefined} aria-label={s.label} className="w-9 h-9 grid place-items-center rounded-xl text-white/35 hover:text-white border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition" whileHover={{ y:-1 }} whileTap={{ scale:0.96 }}>
                  <s.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
            <p className="font-mono text-xs text-white/25 mt-3">aadhiasarana12@gmail.com</p>
            <p className="font-mono text-xs text-white/20">Tiruppur, TN · Remote friendly</p>
          </div>
        </div>
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop:'1px solid rgba(255,255,255,0.06)' }}>
          <p className="font-mono text-xs text-white/25">© {year} AADHIASARANA T · Crafted with care</p>
          <p className="font-mono text-xs text-white/20">React 19 · Tailwind · Motion · Three.js · Vercel</p>
        </div>
      </div>
    </footer>
  )
}
