import { motion } from 'framer-motion'
import { Quote, ArrowRight } from 'lucide-react'
import { scrollToSection } from '../utils/scroll'

export default function About() {
  return (
    <section id="about" className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative mb-14">
          <span className="section-num select-none" aria-hidden>01</span>
          <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:0.2 }} transition={{ duration:0.55 }}>
            <p className="font-mono text-xs text-brand/70 tracking-[0.2em] uppercase mb-3">About</p>
            <div style={{ overflow:'hidden' }}>
              <motion.h2 className="font-display font-bold leading-none" style={{ fontSize:'clamp(2.6rem, 6vw, 4.8rem)', letterSpacing:'-0.03em' }} initial={{ y:24, opacity:0 }} whileInView={{ y:0, opacity:1 }} viewport={{ once:true }} transition={{ duration:0.65, delay:0.08, ease:[0.16,1,0.3,1] as const }}>
                <span className="text-white">Code with</span> <span className="brand-gradient-text">intent.</span>
              </motion.h2>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <motion.div className="lg:col-span-7 space-y-6" initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:0.15 }} transition={{ duration:0.6 }}>
            <div className="bento-card p-7 sm:p-8 relative overflow-hidden">
              <Quote className="absolute top-6 right-6 w-8 h-8 text-white/[0.06]" />
              <p className="font-body text-white/70 text-lg leading-relaxed">
                I’m <span className="text-white font-semibold">AADHIASARANA T</span> — B.Tech AI &amp; Data Science @ <span className="text-white/90">M. Kumarasamy College of Engineering</span> (’28). I work where product meets intelligence: full-stack systems with ML baked in, not bolted on.
              </p>
              <p className="font-body text-white/50 text-base leading-relaxed mt-4">
                Arch Linux daily driver, automation obsessive, and perpetual builder. I learn by shipping — 7 repos live on GitHub, each a working product with auth, data, and deployment.
              </p>
              <p className="font-body text-white/50 text-base leading-relaxed">
                Off-screen I’m studying Japanese <span className="text-white/70">— JLPT N5, A Grade, now N5+ —</span> because language and code are the same game: systems, patterns, mastery.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-5">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs text-brand" style={{ background:'rgba(79,255,176,0.08)', border:'1px solid rgba(79,255,176,0.18)' }}><span className="w-2 h-2 rounded-full bg-brand animate-pulse" />Open to internships</span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs text-white/60" style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)' }}>Arch Linux · Vercel · Docker</span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs" style={{ background:'rgba(123,97,255,0.08)', border:'1px solid rgba(123,97,255,0.18)', color:'#a78bfa' }}>JLPT N5 · A Grade</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={()=>scrollToSection('projects')} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-body text-sm font-medium text-white/70 hover:text-white bg-white/[0.04] hover:bg-white/[0.06] border border-white/10 transition">Explore work <ArrowRight className="w-3.5 h-3.5" /></button>
              <button onClick={()=>scrollToSection('contact')} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-body text-sm font-semibold text-black bg-brand">Let’s talk →</button>
            </div>
          </motion.div>

          <motion.div className="lg:col-span-5 grid grid-cols-3 lg:grid-cols-1 gap-4" initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.12 }}>
            {[
              { n:'7', label:'Products shipped', sub:'GitHub · production-grade' },
              { n:'2', label:'Internships', sub:'Unified Mentor · Cognifz' },
              { n:'2028', label:'Graduating', sub:'AI & DS · MKCE' },
            ].map((s,i)=>(
              <div key={s.label} className="bento-card p-6 text-center lg:text-left">
                <div className="font-display text-4xl leading-none brand-gradient-text" style={{ letterSpacing:'-0.02em' }}>{s.n}{i===0?' +':''}</div>
                <div className="font-body text-sm font-semibold text-white/85 mt-1">{s.label}</div>
                <div className="font-mono text-xs text-white/35">{s.sub}</div>
              </div>
            ))}
            <div className="col-span-3 lg:col-span-1 bento-card p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl grid place-items-center shrink-0" style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.06)' }}>🇯🇵</div>
              <div>
                <div className="font-body text-sm font-medium text-white">Learning Japanese</div>
                <div className="font-mono text-xs text-white/40">N5+ in progress · kanji · conversation</div>
              </div>
              <span className="ml-auto font-mono text-xs text-brand/60 hidden sm:block">継続 →</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
