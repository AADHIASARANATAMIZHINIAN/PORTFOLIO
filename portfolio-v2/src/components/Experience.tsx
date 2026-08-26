import { motion } from 'framer-motion'
import { FileDown, GraduationCap, Briefcase } from 'lucide-react'

const timeline = [
  { role:'AI & Data Science Student', company:'M. Kumarasamy College of Engineering', duration:'2024 — 2028', type:'Education', icon: GraduationCap, description:'B.Tech AI & Data Science — CGPA 7.98. ML, deep learning, stats & data engineering, balanced with real product shipping.', tags:['Machine Learning','Data Science','Python','AI Systems'] },
  { role:'MERN Stack Intern', company:'Unified Mentor', duration:'2025', type:'Internship', icon: Briefcase, description:'Built real-time Firebase CRUD, system architecture & LLD for scalable modular apps.', tags:['MERN','Firebase','System Design','LLD'] },
  { role:'Web Development Intern', company:'Cognifz', duration:'2025', type:'Internship', icon: Briefcase, description:'Mobile-first responsive UIs, cross-browser debugging, UI/UX polish.', tags:['HTML','CSS','JavaScript','UI/UX'] },
]
const certs = [{ name:'IOT for Industries', issuer:'NPTEL', year:'2025' }, { name:'JLPT N5', issuer:'JLPT Official', year:'2026', badge:'A Grade' }]
const activities = [{ title:'Hackathon Participant', desc:'AI + web solutions under tight deadlines — college & external.' }, { title:'Campus Ambassador', desc:'Eduveda Academy — promoted tech opportunities on campus.' }]

export default function Experience() {
  return (
    <section id="experience" className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative mb-10">
          <span className="section-num select-none" aria-hidden>04</span>
          <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5 }}>
            <p className="font-mono text-xs text-brand/70 tracking-[0.2em] uppercase mb-3">Journey</p>
            <motion.h2 className="font-display font-bold text-white leading-none" style={{ fontSize:'clamp(2.6rem, 6vw, 4.8rem)', letterSpacing:'-0.03em' }} initial={{ y:20, opacity:0 }} whileInView={{ y:0, opacity:1 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.08, ease:[0.16,1,0.3,1] as const }}>
              Path <span className="brand-gradient-text">so far.</span>
            </motion.h2>
          </motion.div>
        </div>

        <div className="relative mb-12">
          <div className="absolute left-0 top-0 bottom-0 w-px hidden md:block" style={{ background:'linear-gradient(to bottom, rgba(79,255,176,0.32), rgba(79,255,176,0.04))' }} />
          <div className="space-y-5 md:pl-10">
            {timeline.map((item,i)=>(
              <motion.div key={item.role} className="bento-card p-6 sm:p-7 relative" initial={{ opacity:0, x:-12 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.08 }}>
                <span className="hidden md:grid absolute -left-[2.7rem] top-7 w-6 h-6 place-items-center rounded-full bg-brand text-black" style={{ boxShadow:'0 0 12px rgba(79,255,176,0.45)' }}><item.icon className="w-3 h-3" /></span>
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="font-mono text-[10px] px-2 py-1 rounded-full text-brand" style={{ background:'rgba(79,255,176,0.08)', border:'1px solid rgba(79,255,176,0.18)' }}>{item.type}</span>
                    <h3 className="font-display text-white text-lg mt-2" style={{ letterSpacing:'-0.02em' }}>{item.role}</h3>
                    <p className="font-body text-white/45 text-sm">{item.company}</p>
                  </div>
                  <span className="font-mono text-xs px-2.5 py-1 rounded-full text-white/40" style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.06)' }}>{item.duration}</span>
                </div>
                <p className="font-body text-white/55 text-sm leading-relaxed mb-3">{item.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map(t=> <span key={t} className="font-mono text-[10px] px-2.5 py-1 rounded-full text-white/40" style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)' }}>{t}</span>)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          <div>
            <p className="font-mono text-xs tracking-[0.15em] uppercase text-white/30 mb-3">Certifications</p>
            <div className="grid gap-3">
              {certs.map(c=>(
                <div key={c.name} className="bento-card p-4 flex items-center gap-3">
                  <span className="w-10 h-10 grid place-items-center rounded-xl font-mono text-xs font-bold text-brand shrink-0" style={{ background:'rgba(79,255,176,0.08)', border:'1px solid rgba(79,255,176,0.18)' }}>{c.year.slice(2)}</span>
                  <div><p className="font-body text-sm font-semibold text-white/85">{c.name}</p><p className="font-mono text-xs text-white/35">{c.issuer}{c.badge?` · ${c.badge}`:''}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="font-mono text-xs tracking-[0.15em] uppercase text-white/30 mb-3">Co-curricular</p>
            <div className="grid gap-3">
              {activities.map(a=>(
                <div key={a.title} className="bento-card p-4">
                  <p className="font-display text-sm font-semibold text-white" style={{ letterSpacing:'-0.01em' }}>{a.title}</p>
                  <p className="font-body text-xs text-white/45 leading-relaxed mt-1">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <a href="/AADHI_RESUME.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-body text-sm font-semibold text-brand" style={{ background:'rgba(79,255,176,0.08)', border:'1px solid rgba(79,255,176,0.18)' }}><FileDown className="w-4 h-4" /> Download Resume</a>
        </div>
      </div>
    </section>
  )
}
