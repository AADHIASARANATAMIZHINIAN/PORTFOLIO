import { useEffect, useState, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ArrowUpRight, Mail, Github, Linkedin, FileDown, Command } from 'lucide-react'
import { scrollToSection } from '../utils/scroll'
import { projects } from '../data/projects'

interface Cmd {
  id: string
  label: string
  desc: string
  keywords: string
  icon?: React.ReactNode
  action: () => void
}

function useCmds(onClose: () => void): Cmd[] {
  return useMemo(() => [
    { id: 'about', label: 'Go to About', desc: 'Code meets purpose', keywords: 'about bio', action: () => { onClose(); scrollToSection('about') } },
    { id: 'projects', label: 'Go to Work', desc: 'Selected projects', keywords: 'work projects portfolio', action: () => { onClose(); scrollToSection('projects') } },
    { id: 'skills', label: 'Go to Stack', desc: 'Tech toolkit', keywords: 'skills stack tech toolkit', action: () => { onClose(); scrollToSection('skills') } },
    { id: 'stats', label: 'Go to GitHub Stats', desc: 'Live GitHub activity', keywords: 'github stats contributions', action: () => { onClose(); scrollToSection('github-stats') } },
    { id: 'experience', label: 'Go to Journey', desc: 'Background & experience', keywords: 'experience journey timeline education internship', action: () => { onClose(); scrollToSection('experience') } },
    { id: 'building', label: 'Go to In the lab', desc: 'Currently building', keywords: 'building lab wip currently', action: () => { onClose(); scrollToSection('building') } },
    { id: 'contact', label: 'Go to Contact', desc: `Let's build together`, keywords: 'contact hire email message', action: () => { onClose(); scrollToSection('contact') } },
    ...projects.map(p => ({
      id: `proj-${p.id}`, label: p.title, desc: `${p.domain} · ${p.tags.slice(0,2).join(', ')}`, keywords: `${p.title} ${p.domain} ${p.tags.join(' ')} project`, action: () => { onClose(); scrollToSection('projects') }
    })),
    { id: 'email', label: 'Copy email', desc: 'aadhiasarana12@gmail.com', keywords: 'email copy contact', icon: <Mail className="w-3.5 h-3.5" />, action: () => { navigator.clipboard.writeText('aadhiasarana12@gmail.com'); onClose() } },
    { id: 'github', label: 'Open GitHub', desc: 'github.com/AADHIASARANATAMIZHINIAN', keywords: 'github open', icon: <Github className="w-3.5 h-3.5" />, action: () => { window.open('https://github.com/AADHIASARANATAMIZHINIAN','_blank'); onClose() } },
    { id: 'linkedin', label: 'Open LinkedIn', desc: 'linkedin.com/in/aadhiasarana-t', keywords: 'linkedin open', icon: <Linkedin className="w-3.5 h-3.5" />, action: () => { window.open('https://www.linkedin.com/in/aadhiasarana-t-529641328','_blank'); onClose() } },
    { id: 'resume', label: 'Open Resume', desc: 'AADHI_RESUME.pdf', keywords: 'resume cv pdf download', icon: <FileDown className="w-3.5 h-3.5" />, action: () => { window.open('/AADHI_RESUME.pdf','_blank'); onClose() } },
  ], [onClose])
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [sel, setSel] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const cmds = useCmds(() => setOpen(false))

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen(o => !o) }
      if (e.key === '/' && !open && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) { e.preventDefault(); setOpen(true) }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [open])

  useEffect(() => { if (open) { setQ(''); setSel(0); setTimeout(()=>inputRef.current?.focus(), 30); document.body.style.overflow='hidden' } else document.body.style.overflow='' }, [open])

  const filtered = useMemo(() => {
    if (!q.trim()) return cmds
    const t = q.toLowerCase()
    return cmds.filter(c => `${c.label} ${c.desc} ${c.keywords}`.toLowerCase().includes(t)).slice(0, 8)
  }, [q, cmds])

  useEffect(() => setSel(0), [q])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSel(s => Math.min(s+1, filtered.length-1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSel(s => Math.max(s-1, 0)) }
    else if (e.key === 'Enter') { e.preventDefault(); filtered[sel]?.action() }
  }

  return (
    <>
      <button onClick={() => setOpen(true)} aria-label="Open command palette (Ctrl+K)" className="fixed bottom-6 left-6 z-[40] hidden md:flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono text-white/40 hover:text-white/70 transition-colors" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}>
        <Command className="w-3 h-3" /> <span>⌘K</span>
      </button>
      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            <motion.div className="fixed inset-0 z-[91] flex items-start justify-center pt-[20vh] p-4" initial={{ opacity: 0, y: 12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.98 }} transition={{ type: 'spring', stiffness: 400, damping: 30 }}>
              <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl" style={{ background: 'rgba(12,12,20,0.96)', border: '1px solid rgba(255,255,255,0.10)', backdropFilter: 'blur(24px)' }}>
                <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  <Search className="w-4 h-4 text-white/30 shrink-0" />
                  <input ref={inputRef} value={q} onChange={e=>setQ(e.target.value)} onKeyDown={onKeyDown} placeholder="Search sections, projects, actions…" className="flex-1 bg-transparent outline-none font-body text-sm text-white placeholder:text-white/30" />
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-white/30 hidden sm:block">ESC</span>
                </div>
                <div className="max-h-[320px] overflow-y-auto p-2" style={{ scrollbarWidth:'thin', scrollbarColor:'rgba(79,255,176,0.25) transparent' }}>
                  {filtered.length===0 ? <p className="font-body text-sm text-white/30 text-center py-8">No results for “{q}”</p> : filtered.map((c,i)=>(
                    <button key={c.id} onClick={()=>c.action()} onMouseEnter={()=>setSel(i)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${i===sel ? 'text-white' : 'text-white/60 hover:text-white/80'}`} style={{ background: i===sel ? 'rgba(79,255,176,0.08)' : 'transparent', border: `1px solid ${i===sel ? 'rgba(79,255,176,0.18)' : 'transparent'}` }}>
                      <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: i===sel ? 'rgba(79,255,176,0.14)' : 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', color: i===sel ? '#4FFFB0' : 'rgba(255,255,255,0.35)' }}>{c.icon ?? <ArrowUpRight className="w-3.5 h-3.5" />}</span>
                      <span className="flex-1 min-w-0"><span className="font-body text-sm font-medium block leading-none">{c.label}</span><span className="font-mono text-xs text-white/35 block truncate">{c.desc}</span></span>
                      {i===sel && <span className="font-mono text-[10px] text-white/25 hidden sm:block">↵</span>}
                    </button>
                  ))}
                </div>
                <div className="px-3 py-2 flex items-center justify-between" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <span className="font-mono text-[10px] text-white/20">↑↓ navigate · ↵ select · esc close</span>
                  <span className="font-mono text-[10px] text-white/20">Press <span className="text-white/40">/</span> to open</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
