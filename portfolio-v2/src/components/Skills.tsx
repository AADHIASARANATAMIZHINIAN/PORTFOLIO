import { motion } from 'framer-motion'
import { Code2, Layers, Database, Brain, Wrench } from 'lucide-react'

const cats = [
  { title:'Languages', icon: Code2, items:['Python','TypeScript','JavaScript','Java','C'], accent:'rgba(123,97,255,' },
  { title:'Frontend', icon: Layers, items:['React','Tailwind CSS','Motion','Vite','HTML / CSS'], accent:'rgba(11,255,228,' },
  { title:'Backend', icon: Database, items:['Node.js','Express','Flask','Django','REST APIs','MongoDB','Firebase'], accent:'rgba(79,255,176,' },
  { title:'AI & Data', icon: Brain, items:['scikit-learn','pandas','NumPy','Matplotlib','Jupyter'], accent:'rgba(255,168,0,' },
  { title:'Tools', icon: Wrench, items:['Git','Arch Linux','Docker','Vercel','GitHub Actions'], accent:'rgba(255,45,120,' },
]
const learning = ['Systems programming in C','ML model deployment','SQL & data pipelines','Next.js App Router']

export default function Skills() {
  return (
    <section id="skills" className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative mb-10">
          <span className="section-num select-none" aria-hidden>03</span>
          <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5 }}>
            <p className="font-mono text-xs text-brand/70 tracking-[0.2em] uppercase mb-3">Stack</p>
            <motion.h2 className="font-display font-bold text-white leading-none" style={{ fontSize:'clamp(2.6rem, 6vw, 4.8rem)', letterSpacing:'-0.03em' }} initial={{ y:20, opacity:0 }} whileInView={{ y:0, opacity:1 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.08, ease:[0.16,1,0.3,1] as const }}>
              Toolkit, <span className="brand-gradient-text">sharpened.</span>
            </motion.h2>
            <p className="font-body text-white/40 text-sm mt-3 max-w-xl">Batteries-included stack for AI products — from data to deploy. Hover any pill.</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {cats.map((cat,i)=>(
            <motion.div key={cat.title} className="bento-card p-5 relative" initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.45, delay:i*0.06 }}>
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background:`linear-gradient(90deg, transparent, ${cat.accent}0.5), transparent)` }} />
              <div className="flex items-center gap-2 mb-3">
                <span className="w-7 h-7 grid place-items-center rounded-lg" style={{ background:`${cat.accent}0.10)`, border:`1px solid ${cat.accent}0.18)` }}><cat.icon className="w-3.5 h-3.5" style={{ color: cat.accent.replace('rgba','rgb').replace(',','').split('(')[1]?.split(',')[0] ? cat.accent+'0.9)' : '#fff' }} /></span>
                <h3 className="font-display text-sm font-semibold text-white/85 tracking-wide">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map(it=>(
                  <span key={it} className="font-mono text-xs px-2.5 py-1 rounded-full text-white/55 hover:text-white hover:bg-white/[0.06] transition" style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.06)' }}>{it}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="mt-6 bento-card p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4" initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5, delay:0.2 }} style={{ borderLeft:'2px solid rgba(79,255,176,0.35)' }}>
          <div className="shrink-0">
            <p className="font-mono text-xs tracking-[0.15em] uppercase text-brand/70">Currently deepening</p>
            <p className="font-body text-xs text-white/30">Next 90 days</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {learning.map(it=>(
              <span key={it} className="font-body text-xs px-3 py-1.5 rounded-full text-brand/80" style={{ background:'rgba(79,255,176,0.07)', border:'1px solid rgba(79,255,176,0.16)' }}>{it}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
