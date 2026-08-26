import { motion, AnimatePresence } from 'framer-motion'
import { X, Github, ExternalLink } from 'lucide-react'
import { useEffect } from 'react'
import type { Project } from '../data/projects'

export default function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} aria-hidden />
          <motion.div className="fixed inset-0 z-[81] flex items-center justify-center p-4 sm:p-6" initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.97 }} transition={{ type: 'spring', stiffness: 340, damping: 30 }}>
            <div role="dialog" aria-modal="true" aria-label={project.title} className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0c0c14] border border-white/10 shadow-2xl" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(79,255,176,0.3) transparent' }}>
              <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                <X className="w-4 h-4" />
              </button>
              {project.image && (
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img src={project.image} alt={project.title} className="w-full h-auto aspect-[16/9] object-cover" loading="lazy" onError={e => ((e.target as HTMLImageElement).style.display='none')} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c14] via-transparent to-transparent pointer-events-none" />
                </div>
              )}
              <div className="p-6 sm:p-8 space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs px-2.5 py-1 rounded-lg text-white/70" style={{ background: `${project.domainColor}0.10)`, border: `1px solid ${project.domainColor}0.28)` }}>{project.domain}</span>
                  <span className="font-mono text-xs text-white/30">{project.year}</span>
                </div>
                <h3 className="font-display font-bold text-white text-2xl sm:text-3xl" style={{ letterSpacing: '0.02em' }}>{project.title}</h3>
                <p className="font-body text-white/60 text-sm leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="font-mono text-xs px-2.5 py-1 rounded-lg text-white/50" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>{tag}</span>
                  ))}
                </div>
                {project.caseStudy && (
                  <div className="grid gap-4 pt-2">
                    {[
                      { label: 'Problem', value: project.caseStudy.problem },
                      { label: 'Solution', value: project.caseStudy.solution },
                      { label: 'Impact', value: project.caseStudy.impact },
                      { label: 'Learnings', value: project.caseStudy.learnings },
                    ].map(s => (
                      <div key={s.label} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-brand/70 mb-1.5">{s.label}</p>
                        <p className="font-body text-sm text-white/70 leading-relaxed">{s.value}</p>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex gap-3 pt-2">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-body text-sm font-semibold text-black bg-brand">
                      <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                    </a>
                  )}
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-body text-sm font-medium text-white/80 hover:text-white transition-colors" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}>
                    <Github className="w-3.5 h-3.5" /> View on GitHub
                  </a>
                </div>
                <p className="font-mono text-[10px] text-white/20 text-center pt-2">Press Esc or click outside to close</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
