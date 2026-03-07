import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail, Instagram } from 'lucide-react'
import { scrollToSection } from '../utils/scroll'

const roles = [
  'Full-Stack Developer',
  'AI & ML Engineer',
  'Data Science Student',
  'UI/UX Enthusiast',
]

const socials = [
  { icon: Github,    href: 'https://github.com/AADHIASARANATAMIZHINIAN',           label: 'GitHub' },
  { icon: Linkedin,  href: 'https://www.linkedin.com/in/aadhiasarana-t-529641328', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/__aadhiasarana_',            label: 'Instagram' },
  { icon: Mail,      href: 'mailto:aadhiasarana12@gmail.com',                      label: 'Email' },
]

const wordVariant = {
  hidden: { clipPath: 'inset(100% 0 0 0)', y: 20 },
  visible: (i: number) => ({
    clipPath: 'inset(0% 0 0 0)',
    y: 0,
    transition: { duration: 0.85, delay: 0.35 + i * 0.09, ease: [0.16, 1, 0.3, 1] },
  }),
}

const nameWords = ['AADHIASARANA', 'T']

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const current = roles[roleIndex]
    const speed = isDeleting ? 38 : 75
    if (!isDeleting && displayText === current) {
      timerRef.current = setTimeout(() => setIsDeleting(true), 2200)
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false)
      setRoleIndex((i) => (i + 1) % roles.length)
    } else {
      timerRef.current = setTimeout(() => {
        setDisplayText(isDeleting
          ? current.slice(0, displayText.length - 1)
          : current.slice(0, displayText.length + 1)
        )
      }, speed)
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [displayText, isDeleting, roleIndex])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 sm:px-8 lg:px-12 py-24 overflow-hidden"
    >
      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl w-full mx-auto gap-8">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-3"
        >
          <span className="h-px w-8 bg-brand" />
          <span className="font-mono text-xs text-white/45 tracking-[0.2em] uppercase">
            AI & Data Science · Full-Stack · Tiruppur, TN
          </span>
          <span className="h-px w-8 bg-brand" />
        </motion.div>

        {/* Name — clip-path wipe-up per word */}
        <div className="flex flex-wrap items-baseline justify-center gap-x-5 gap-y-2">
          {nameWords.map((word, i) => (
            <div key={word} style={{ overflow: 'hidden' }}>
              <motion.span
                className="font-display font-bold text-white inline-block leading-none"
                style={{
                  fontSize: 'clamp(3.5rem, 13vw, 10rem)',
                  letterSpacing: '0.02em',
                  lineHeight: 0.9,
                }}
                variants={wordVariant}
                initial="hidden"
                animate="visible"
                custom={i}
              >
                {word}
              </motion.span>
            </div>
          ))}
        </div>

        {/* Typing role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="flex items-center gap-2 h-9"
        >
          <span
            className="font-display text-3xl md:text-4xl brand-gradient-text"
            style={{ minWidth: '1ch', letterSpacing: '0.04em' }}
          >
            {displayText}
          </span>
          <motion.span
            className="inline-block w-0.5 h-8 bg-brand"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
          />
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6 }}
          className="font-body text-white/60 text-base md:text-lg max-w-xl leading-relaxed"
        >
          B.Tech AI & DS student at M. Kumarasamy College of Engineering.
          Building intelligent full-stack systems, experimenting with ML, and shipping real projects.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <motion.button
            onClick={() => scrollToSection('projects')}
            className="group relative px-7 py-3.5 rounded-xl font-body font-semibold text-sm text-white overflow-hidden brand-glow-btn"
            style={{ background: 'rgba(79,255,176,0.10)', border: '1px solid rgba(79,255,176,0.35)' }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              View Work
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
            </span>
          </motion.button>

          <motion.a
            href="/AADHI_RESUME.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 rounded-xl font-body font-semibold text-sm text-white/60 hover:text-white transition-colors duration-200"
            style={{ border: '1px solid rgba(255,255,255,0.12)' }}
            whileHover={{ scale: 1.04, borderColor: 'rgba(255,255,255,0.25)' }}
            whileTap={{ scale: 0.97 }}
          >
            Open Resume
          </motion.a>
        </motion.div>

        {/* Social icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.5 }}
          className="flex items-center gap-4"
        >
          {socials.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target={s.label !== 'Email' ? '_blank' : undefined}
              rel={s.label !== 'Email' ? 'noopener noreferrer' : undefined}
              aria-label={s.label}
              className="p-2.5 rounded-lg text-white/30 hover:text-brand transition-colors duration-200"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
              whileHover={{ scale: 1.15, borderColor: 'rgba(79,255,176,0.3)' }}
              whileTap={{ scale: 0.9 }}
            >
              <s.icon className="w-4 h-4" />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollToSection('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer"
        aria-label="Scroll to about section"
      >
        <span className="font-mono text-[10px] text-white/25 tracking-widest uppercase">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-3.5 h-3.5 text-white/25" />
        </motion.div>
      </motion.button>
    </section>
  )
}
