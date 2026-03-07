import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const stats = [
  { value: 6, suffix: '+', label: 'Projects Built',    sublabel: 'shipped on GitHub' },
  { value: 2, suffix: '',  label: 'Internships',       sublabel: 'Unified Mentor · Cognifz' },
  { value: 2028, suffix: '', label: 'Graduating',      sublabel: 'open to opportunities' },
]

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 1200
        const steps = 40
        const increment = target / steps
        let current = 0
        const interval = setInterval(() => {
          current = Math.min(current + increment, target)
          setCount(Math.floor(current))
          if (current >= target) clearInterval(interval)
        }, duration / steps)
      }
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function About() {
  return (
    <section id="about" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section header */}
        <div className="relative mb-20">
          <span className="section-num select-none" aria-hidden>01</span>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.55 }}
          >
            <p className="font-mono text-xs text-brand/70 tracking-[0.2em] uppercase mb-3">About me</p>
            <div style={{ overflow: 'hidden' }}>
              <motion.h2
                className="font-display font-bold"
                style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)', letterSpacing: '0.02em', lineHeight: 0.95 }}
                initial={{ clipPath: 'inset(100% 0 0 0)', y: 20 }}
                whileInView={{ clipPath: 'inset(0% 0 0 0)', y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-white">Code meets</span>
                <br />
                <span className="brand-gradient-text">purpose.</span>
              </motion.h2>
            </div>
          </motion.div>
        </div>

        {/* Bio + stats */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Bio */}
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.65, delay: 0.15 }}
          >
            <p className="font-body text-white/70 text-lg leading-relaxed">
              Hi, I'm <span className="text-white font-semibold">AADHIASARANA T</span>, an AI & Data Science
              student who enjoys building intelligent systems and modern web applications.
            </p>
            <p className="font-body text-white/60 text-base leading-relaxed">
              I spend most of my time experimenting with new technologies, working in Linux environments,
              and creating projects that combine AI, software engineering, and automation.
            </p>
            <p className="font-body text-white/60 text-base leading-relaxed">
              Outside of coding, I'm also learning Japanese, which reflects my curiosity for new languages,
              cultures, and continuous learning.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-3 pt-1">
              <motion.div
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full"
                style={{ background: 'rgba(79,255,176,0.08)', border: '1px solid rgba(79,255,176,0.25)' }}
                whileHover={{ scale: 1.03 }}
              >
                <span className="w-2 h-2 rounded-full bg-brand animate-brand-pulse flex-shrink-0" />
                <span className="font-body text-sm font-semibold text-brand">Open to Internships</span>
              </motion.div>
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full"
                style={{ background: 'rgba(123,97,255,0.08)', border: '1px solid rgba(123,97,255,0.25)' }}
                whileHover={{ scale: 1.03 }}
              >
                <span className="font-body text-sm text-aurora-purple/90">JLPT N5 · A Grade</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Stat cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.65, delay: 0.25 }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="glass glass-hover p-6"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
              >
                <div
                  className="font-display brand-gradient-text mb-1"
                  style={{ fontSize: 'clamp(2rem, 5vw, 2.75rem)', letterSpacing: '0.02em' }}
                >
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="font-body font-semibold text-white/85 text-sm mb-0.5">{stat.label}</div>
                <div className="font-mono text-white/40 text-xs">{stat.sublabel}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
