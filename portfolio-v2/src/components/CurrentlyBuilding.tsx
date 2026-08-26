import { motion } from 'framer-motion'

const items = [
  { title:'ML Pipeline', desc:'End-to-end training → evaluation → deployment with automated monitoring. Metrics, drift checks, CI.', status:'In Progress', domain:'AI / ML', progress: 62 },
  { title:'ZYROVER Deployment', desc:'Healthcare rover for hospital hygiene — autonomous navigation + CI/CD for fleet updates.', status:'In Progress', domain:'Healthcare', progress: 48 },
  { title:'JLPT N5+ Prep', desc:'Beyond N5: vocabulary, kanji, conversation — daily SRS + immersion.', status:'Learning', domain:'Language', progress: 34 },
]

export default function CurrentlyBuilding() {
  return (
    <section id="building" className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative mb-10">
          <span className="section-num select-none" aria-hidden>05</span>
          <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5 }}>
            <p className="font-mono text-xs text-brand/70 tracking-[0.2em] uppercase mb-3">Lab</p>
            <motion.h2 className="font-display font-bold text-white leading-none" style={{ fontSize:'clamp(2.6rem, 6vw, 4.8rem)', letterSpacing:'-0.03em' }} initial={{ y:20, opacity:0 }} whileInView={{ y:0, opacity:1 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.08, ease:[0.16,1,0.3,1] as const }}>
              In the <span className="brand-gradient-text">lab.</span>
            </motion.h2>
            <p className="font-body text-white/40 text-sm mt-3">What’s cooking — progress tracked live.</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((it,i)=>(
            <motion.div key={it.title} className="bento-card p-6 flex flex-col" initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.45, delay:i*0.08 }}>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] px-2 py-1 rounded-full" style={{ background: it.status==='Learning' ? 'rgba(234,179,8,0.08)' : 'rgba(79,255,176,0.08)', border: `1px solid ${it.status==='Learning' ? 'rgba(234,179,8,0.18)' : 'rgba(79,255,176,0.18)'}`, color: it.status==='Learning' ? '#eab308' : '#4FFFB0' }}>{it.status}</span>
                <span className="font-mono text-[10px] px-2 py-1 rounded-full text-white/40" style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.06)' }}>{it.domain}</span>
              </div>
              <h3 className="font-display font-bold text-white text-lg" style={{ letterSpacing:'-0.02em' }}>{it.title}</h3>
              <p className="font-body text-white/50 text-sm leading-relaxed mt-2 flex-1">{it.desc}</p>
              <div className="mt-5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-xs text-white/30">Progress</span>
                  <span className="font-mono text-xs text-white/60">{it.progress}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background:'rgba(255,255,255,0.06)' }}>
                  <motion.div className="h-full rounded-full" style={{ background: it.status==='Learning' ? '#eab308' : 'linear-gradient(90deg, #4FFFB0, #0BFFE4)' }} initial={{ width:0 }} whileInView={{ width: `${it.progress}%` }} viewport={{ once:true }} transition={{ duration:0.9, delay:0.2+i*0.1, ease:[0.16,1,0.3,1] as const }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
