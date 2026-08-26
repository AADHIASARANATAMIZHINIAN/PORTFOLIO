import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Github, Linkedin, Mail, Instagram, MapPin, Sparkles, ArrowDown } from 'lucide-react'
import { scrollToSection } from '../utils/scroll'

const roles = ['Full-Stack Developer','AI & ML Engineer','Data Science Student','UI/UX Enthusiast']
const socials = [
  { icon: Github,    href: 'https://github.com/AADHIASARANATAMIZHINIAN', label: 'GitHub' },
  { icon: Linkedin,  href: 'https://www.linkedin.com/in/aadhiasarana-t-529641328', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/__aadhiasarana_', label: 'Instagram' },
  { icon: Mail,      href: 'mailto:aadhiasarana12@gmail.com', label: 'Email' },
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const current = roles[roleIndex]
    const speed = isDeleting ? 32 : 68
    if (!isDeleting && displayText === current) timerRef.current = setTimeout(() => setIsDeleting(true), 2000)
    else if (isDeleting && displayText === '') { setIsDeleting(false); setRoleIndex(i => (i+1)%roles.length) }
    else timerRef.current = setTimeout(() => setDisplayText(isDeleting ? current.slice(0, displayText.length-1) : current.slice(0, displayText.length+1)), speed)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [displayText, isDeleting, roleIndex])

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)`, backgroundSize: '48px 48px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full opacity-20" style={{ background: 'radial-gradient(ellipse, rgba(79,255,176,0.18) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-8 py-28 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          <div className="lg:col-span-7 space-y-7">
            <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.1 }} className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full" style={{ background:'rgba(79,255,176,0.07)', border:'1px solid rgba(79,255,176,0.18)' }}>
              <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
              <span className="font-mono text-xs text-brand/90 tracking-wide">Available for internships · Q1 2026</span>
              <span className="hidden sm:inline-flex items-center gap-1 font-mono text-xs text-white/35 ml-2 pl-2" style={{ borderLeft:'1px solid rgba(255,255,255,0.08)' }}><MapPin className="w-3 h-3" />Tiruppur, TN</span>
            </motion.div>

            <div className="space-y-3">
              <motion.p initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55, delay:0.18 }} className="font-mono text-xs tracking-[0.2em] uppercase text-white/35">Portfolio · 2025 — 2026</motion.p>
              <div className="overflow-hidden">
                <motion.h1 className="font-display font-bold text-white leading-none" style={{ fontSize:'clamp(2.8rem, 8vw, 5.6rem)', letterSpacing:'-0.03em', lineHeight:0.9 }} initial={{ y:40, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ duration:0.75, delay:0.22, ease:[0.16,1,0.3,1] as const }}>
                  AADHIASARANA<br />
                  <span className="brand-gradient-text">T.</span>
                </motion.h1>
              </div>
              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.55, duration:0.5 }} className="flex items-center gap-2 h-8">
                <span className="font-mono text-sm tracking-wide text-white/70 min-w-[1ch]">{displayText}</span>
                <motion.span className="inline-block w-px h-5 bg-brand" animate={{ opacity:[1,0] }} transition={{ duration:0.7, repeat:Infinity, repeatType:'reverse' }} />
              </motion.div>
            </div>

            <motion.p initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.65, duration:0.5 }} className="font-body text-white/55 text-base lg:text-lg leading-relaxed max-w-xl">
              B.Tech AI &amp; DS @ MKCE · I build intelligent full-stack systems where AI meets product. 7 shipped repos, 2 internships — now exploring ML pipelines &amp; healthcare robotics.
            </motion.p>

            <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.75, duration:0.5 }} className="flex flex-wrap items-center gap-3">
              <button onClick={() => scrollToSection('projects')} className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-body font-semibold text-sm text-black bg-brand brand-glow-btn hover:brightness-105 transition">
                View selected work <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <a href="/AADHI_RESUME.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-body font-medium text-sm text-white/70 hover:text-white transition" style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.10)' }}>
                Download CV
              </a>
              <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs text-white/30 ml-1"><Sparkles className="w-3 h-3 text-brand/60" />Press <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-white/50">/</kbd> to search</span>
            </motion.div>

            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.9, duration:0.5 }} className="flex items-center gap-3 pt-2">
              <span className="font-mono text-xs text-white/25 tracking-wide hidden sm:block">Connect —</span>
              <div className="flex items-center gap-2">
                {socials.map(s => (
                  <a key={s.label} href={s.href} target={s.label!=='Email' ? '_blank' : undefined} rel={s.label!=='Email' ? 'noopener noreferrer' : undefined} aria-label={s.label} className="w-9 h-9 grid place-items-center rounded-xl text-white/35 hover:text-white hover:bg-white/5 border border-white/5 hover:border-white/10 transition">
                    <s.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
              <span className="h-4 w-px bg-white/10 hidden sm:block" />
              <span className="font-body text-xs text-white/30 hidden sm:block">aadhiasarana12@gmail.com</span>
            </motion.div>
          </div>

          <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.35, ease:[0.16,1,0.3,1] as const }} className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden" style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', backdropFilter:'blur(20px)' }}>
              <div className="browser-bar">
                <span className="browser-dot" style={{ background:'#ff5f57' }} />
                <span className="browser-dot" style={{ background:'#ffbd2e' }} />
                <span className="browser-dot" style={{ background:'#28c840' }} />
                <span className="ml-3 font-mono text-xs text-white/30 hidden sm:block">aadhiasarana.dev — portfolio.v2</span>
                <span className="ml-auto font-mono text-[10px] px-2 py-0.5 rounded-full text-brand" style={{ background:'rgba(79,255,176,0.10)', border:'1px solid rgba(79,255,176,0.18)' }}>● live</span>
              </div>
              <div className="p-5 sm:p-6 space-y-4">
                <div className="rounded-xl p-4 font-mono text-xs leading-relaxed overflow-hidden" style={{ background:'#0a0a12', border:'1px solid rgba(255,255,255,0.06)' }}>
                  <div className="text-white/25 mb-2">// currently_building.ts</div>
                  <div><span className="text-[#ff7ab2]">const</span> <span className="text-white">focus</span> <span className="text-white/40">=</span> <span className="text-[#4FFFB0]">{"["}</span></div>
                  <div className="pl-4 text-white/70">“ML Pipeline — training → eval → deploy”,</div>
                  <div className="pl-4 text-white/70">“ZYROVER — autonomous healthcare rover”,</div>
                  <div className="pl-4 text-white/40">“JLPT N5+ — 漢字 master”</div>
                  <div><span className="text-[#4FFFB0]">{"]"}</span><span className="text-white/40">;</span></div>
                  <div className="mt-3 flex items-center gap-2 text-white/30"><span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" /> 2 active · 1 learning</div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { k:'Projects', v:'7', sub:'shipped' },
                    { k:'Internships', v:'2', sub:'2025' },
                    { k:'CGPA', v:'7.98', sub:'B.Tech' },
                  ].map(s => (
                    <div key={s.k} className="rounded-xl p-3 text-center" style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)' }}>
                      <div className="font-display text-xl leading-none text-white" style={{ letterSpacing:'0.02em' }}>{s.v}</div>
                      <div className="font-mono text-[10px] tracking-wide text-white/35 uppercase">{s.k}</div>
                      <div className="font-mono text-[10px] text-white/25">{s.sub}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-mono text-xs text-white/30">Stack — React · Python · Node · ML</span>
                  <button onClick={() => scrollToSection('contact')} className="font-mono text-xs text-brand hover:underline">Hire me →</button>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full opacity-20 pointer-events-none" style={{ background:'radial-gradient(circle, #4FFFB0 0%, transparent 70%)', filter:'blur(20px)' }} />
            </div>
            <p className="font-mono text-[10px] text-white/20 text-center mt-3 tracking-wide">Interactive preview · press ⌘K for command palette</p>
          </motion.div>
        </div>
      </div>

      <button onClick={() => scrollToSection('about')} aria-label="Scroll to about" className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-1.5 group">
        <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/25 group-hover:text-white/40 transition">Scroll</span>
        <motion.span animate={{ y:[0,5,0] }} transition={{ duration:1.6, repeat:Infinity, ease:'easeInOut' }}><ArrowDown className="w-3.5 h-3.5 text-white/25 group-hover:text-white/40 transition" /></motion.span>
      </button>
    </section>
  )
}
