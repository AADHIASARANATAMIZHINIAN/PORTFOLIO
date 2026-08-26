import { ExternalLink, Github, ArrowUpRight, Layers, Filter } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useMemo } from 'react'
import { projects } from '../data/projects'
import type { Project } from '../data/projects'
import ProjectModal from './ProjectModal'

const filters = ['All','Healthcare','AgriTech','Social Platform','AI / ML','Civic Tech','Security','Operations'] as const

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null)
  const [filter, setFilter] = useState<string>('All')
  const filtered = useMemo(() => filter==='All' ? projects : projects.filter(p=>p.domain===filter), [filter])

  return (
    <section id="projects" className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative mb-10">
          <span className="section-num select-none" aria-hidden>02</span>
          <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:0.2 }} transition={{ duration:0.55 }}>
            <div className="inline-flex items-center gap-2 mb-3">
              <Layers className="w-3.5 h-3.5 text-brand/60" />
              <p className="font-mono text-xs text-brand/70 tracking-[0.2em] uppercase">Selected Work</p>
              <span className="font-mono text-xs text-white/20">· 7 shipped</span>
            </div>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div style={{ overflow:'hidden' }}>
                <motion.h2 className="font-display font-bold text-white leading-none" style={{ fontSize:'clamp(2.6rem, 6vw, 4.8rem)', letterSpacing:'-0.03em' }} initial={{ y:24, opacity:0 }} whileInView={{ y:0, opacity:1 }} viewport={{ once:true }} transition={{ duration:0.65, delay:0.1, ease:[0.16,1,0.3,1] as const }}>
                  Work that <span className="brand-gradient-text">ships.</span>
                </motion.h2>
                <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ delay:0.25, duration:0.5 }} className="font-body text-white/45 text-sm lg:text-base mt-3 max-w-xl leading-relaxed">
                  Production-grade builds — not demos. Each card is a real repo with architecture, auth, and data. Click for case study.
                </motion.p>
              </div>
              <a href="https://github.com/AADHIASARANATAMIZHINIAN" target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs text-white/40 hover:text-brand transition">
                github.com/AADHIASARANATAMIZHINIAN <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        </div>

        <div className="flex items-center gap-2 mb-8 overflow-x-auto scrollbar-hide pb-1">
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-white/25 mr-1 shrink-0"><Filter className="w-3 h-3" /> Filter</span>
          {filters.map(f => (
            <button key={f} onClick={()=>setFilter(f)} className={`shrink-0 px-3.5 py-1.5 rounded-full font-mono text-xs tracking-wide transition ${filter===f ? 'text-black bg-brand border border-brand' : 'text-white/50 hover:text-white bg-white/[0.04] border border-white/10 hover:border-white/15'}`}>
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-6 gap-5">
          <AnimatePresence mode="popLayout">
          {filtered.map((project, idx) => {
            const isFeatured = idx===0 && filter==='All'
            return (
              <motion.div layout key={project.id} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, scale:0.96 }} transition={{ duration:0.4, delay: idx*0.04 }} className={`bento-card group cursor-pointer shimmer ${isFeatured ? 'md:col-span-6' : 'md:col-span-3 lg:col-span-3'} ${filtered.length===1 ? 'md:col-span-6' : ''}`} onClick={()=>setActive(project)} role="button" tabIndex={0} onKeyDown={(e: React.KeyboardEvent)=>e.key==='Enter'&&setActive(project)} aria-label={`Open ${project.title}`}>
                <div className={`relative overflow-hidden bg-[#08080e] ${isFeatured ? 'aspect-[16/7] sm:aspect-[16/6]' : 'aspect-[16/9]'}`}>
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" loading="lazy" onError={e=>((e.target as HTMLImageElement).style.display='none')} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="font-mono text-[10px] px-2 py-1 rounded-full backdrop-blur" style={{ background:`${project.domainColor}0.14)`, border:`1px solid ${project.domainColor}0.24)`, color: 'white' }}>{project.domain}</span>
                    {isFeatured && <span className="font-mono text-[10px] px-2 py-1 rounded-full bg-brand text-black font-semibold">Featured</span>}
                  </div>
                  <span className="absolute bottom-3 right-3 font-mono text-[10px] px-2 py-1 rounded-full bg-black/55 border border-white/10 text-white/70 backdrop-blur opacity-0 group-hover:opacity-100 transition">View case study →</span>
                </div>
                <div className="p-5 sm:p-6 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display font-bold text-white leading-none" style={{ fontSize: isFeatured ? 'clamp(1.4rem, 2.5vw, 2rem)' : '1.15rem', letterSpacing:'-0.02em' }}>{project.title}</h3>
                    <span className="font-mono text-[10px] text-white/25 shrink-0 mt-1">{project.year}</span>
                  </div>
                  <p className="font-body text-white/50 text-sm leading-relaxed line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0,4).map(tag => <span key={tag} className="font-mono text-[10px] px-2 py-1 rounded-full text-white/45" style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.06)' }}>{tag}</span>)}
                  </div>
                  <div className="flex gap-2 pt-1" onClick={e=>e.stopPropagation()}>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs text-white/60 hover:text-white bg-white/[0.04] hover:bg-white/[0.07] border border-white/5 transition"><Github className="w-3 h-3" /> Code</a>
                    {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs font-medium text-black bg-brand"><ExternalLink className="w-3 h-3" /> Live</a>}
                  </div>
                </div>
              </motion.div>
            )
          })}
          </AnimatePresence>
        </motion.div>

        {filtered.length===0 && (
          <div className="text-center py-16 glass">
            <p className="font-body text-sm text-white/40">No projects in this filter.</p>
            <button onClick={()=>setFilter('All')} className="mt-3 font-mono text-xs text-brand hover:underline">Show all →</button>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 mt-10 pt-6" style={{ borderTop:'1px solid rgba(255,255,255,0.06)' }}>
          <p className="font-mono text-xs text-white/30">Images are browser mockups of each product. Replace <span className="text-white/50">public/projects/*.svg</span> with screenshots anytime.</p>
          <a href="https://github.com/AADHIASARANATAMIZHINIAN?tab=repositories" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-body text-sm text-white/50 hover:text-white transition">View all repos <ArrowUpRight className="w-4 h-4" /></a>
        </div>
      </div>
      <ProjectModal project={active} onClose={()=>setActive(null)} />
    </section>
  )
}
