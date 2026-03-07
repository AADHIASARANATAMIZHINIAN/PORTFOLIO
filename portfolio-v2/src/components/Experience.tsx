import { motion } from 'framer-motion'
import { FileDown } from 'lucide-react'

const timeline = [
  {
    role: 'AI & Data Science Student',
    company: 'M. Kumarasamy College of Engineering',
    duration: '2024 — 2028',
    type: 'Education',
    description: 'B.Tech in Artificial Intelligence and Data Science. CGPA: 7.98 (till 2nd sem). Coursework in machine learning, deep learning, statistics, and data engineering — balanced with real-world project building.',
    tags: ['Machine Learning', 'Data Science', 'Python', 'AI Systems'],
  },
  {
    role: 'MERN Stack Intern',
    company: 'Unified Mentor',
    duration: '2025',
    type: 'Internship',
    description: 'Full Stack Developer role. Mastered real-time database integration and CRUD operations using Firebase. Developed skills in System Architecture and Low-Level Design (LLD) for modular, scalable applications.',
    tags: ['MERN Stack', 'Firebase', 'System Architecture', 'LLD'],
  },
  {
    role: 'Web Development Intern',
    company: 'Cognifz',
    duration: '2025',
    type: 'Internship',
    description: 'Frontend Developer role. Built responsive, mobile-first interfaces using HTML, CSS, and JavaScript. Improved UI/UX design skills and cross-browser debugging techniques.',
    tags: ['HTML', 'CSS', 'JavaScript', 'UI/UX', 'Responsive Design'],
  },
]

const certifications = [
  { name: 'IOT for Industries', issuer: 'NPTEL', year: '2025' },
  { name: 'JLPT N5', issuer: 'JLPT Official', year: '2026', badge: 'A Grade' },
]

const activities = [
  { title: 'Hackathon Participant', desc: 'Developed AI and web solutions under tight deadlines at college-level and external hackathons.' },
  { title: 'Campus Ambassador', desc: 'Served as Campus Ambassador for Eduveda Academy, promoting technical opportunities among students.' },
]

export default function Experience() {
  return (
    <section id="experience" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section header */}
        <div className="relative mb-20">
          <span className="section-num select-none" aria-hidden="true">04</span>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.55 }}
          >
            <p className="font-mono text-xs text-brand/70 tracking-[0.2em] uppercase mb-3">Background</p>
            <div style={{ overflow: 'hidden' }}>
              <motion.h2
                className="font-display font-bold text-white"
                style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)', letterSpacing: '0.02em', lineHeight: 0.95 }}
                initial={{ clipPath: 'inset(100% 0 0 0)', y: 20 }}
                whileInView={{ clipPath: 'inset(0% 0 0 0)', y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                How I got{' '}
                <span className="brand-gradient-text">here</span>
              </motion.h2>
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="relative mb-16">
          <div
            className="absolute left-0 top-0 bottom-0 w-px hidden md:block"
            style={{ background: 'linear-gradient(to bottom, rgba(79,255,176,0.4), rgba(79,255,176,0.05))' }}
          />
          <div className="space-y-6 md:pl-10">
            {timeline.map((item, i) => (
              <motion.div
                key={item.role}
                className="glass glass-hover p-7 relative"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div
                  className="hidden md:block absolute -left-[2.875rem] top-7 w-2.5 h-2.5 rounded-full bg-brand"
                  style={{ boxShadow: '0 0 8px rgba(79,255,176,0.6)' }}
                />
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div>
                    <span
                      className="font-mono text-[10px] px-2 py-0.5 rounded-md text-brand/75 mb-2 inline-block"
                      style={{ background: 'rgba(79,255,176,0.08)', border: '1px solid rgba(79,255,176,0.20)' }}
                    >
                      {item.type}
                    </span>
                    <h3 className="font-display text-white text-xl mt-1" style={{ letterSpacing: '0.02em' }}>
                      {item.role}
                    </h3>
                    <p className="font-body text-white/55 text-sm mt-0.5">{item.company}</p>
                  </div>
                  <span className="font-mono text-xs text-white/35 shrink-0 mt-1">{item.duration}</span>
                </div>
                <p className="font-body text-white/65 text-sm leading-relaxed mb-4">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] px-2.5 py-1 rounded-lg text-white/45"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.55 }}
        >
          <p className="font-mono text-xs text-brand/70 tracking-[0.2em] uppercase mb-4">Certifications</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="glass p-5 flex items-center gap-4"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-mono text-xs text-brand font-bold"
                  style={{ background: 'rgba(79,255,176,0.08)', border: '1px solid rgba(79,255,176,0.22)' }}
                >
                  {cert.year.slice(2)}
                </div>
                <div className="min-w-0">
                  <p className="font-body font-semibold text-white/85 text-sm">{cert.name}</p>
                  <p className="font-mono text-[10px] text-white/40">{cert.issuer}{cert.badge ? ` · ${cert.badge}` : ''}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Co-curricular */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <p className="font-mono text-xs text-brand/70 tracking-[0.2em] uppercase mb-4">Co-Curricular</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {activities.map((a) => (
              <div key={a.title} className="glass p-5">
                <p className="font-display text-white text-base mb-1" style={{ letterSpacing: '0.02em' }}>{a.title}</p>
                <p className="font-body text-white/55 text-sm leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Resume CTA */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.a
            href="/AADHI_RESUME.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-body text-sm font-semibold text-brand brand-glow-btn"
            style={{ background: 'rgba(79,255,176,0.08)', border: '1px solid rgba(79,255,176,0.25)' }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <FileDown className="w-4 h-4" />
            Download Resume
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
