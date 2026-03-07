import { Github, Linkedin, Mail, Instagram } from 'lucide-react'
import { motion } from 'framer-motion'
import { scrollToSection } from '../utils/scroll'

const navLinks = [
  { label: 'About',    id: 'about'      },
  { label: 'Work',     id: 'projects'   },
  { label: 'Stack',    id: 'skills'     },
  { label: 'Journey',  id: 'experience' },
  { label: 'Contact',  id: 'contact'    },
]

const socials = [
  { icon: Github,    href: 'https://github.com/AADHIASARANATAMIZHINIAN',           label: 'GitHub'    },
  { icon: Linkedin,  href: 'https://www.linkedin.com/in/aadhiasarana-t-529641328', label: 'LinkedIn'  },
  { icon: Instagram, href: 'https://www.instagram.com/__aadhiasarana_',            label: 'Instagram' },
  { icon: Mail,      href: 'mailto:aadhiasarana12@gmail.com',                      label: 'Email'     },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.55 }}
        >
          {/* Brand */}
          <div className="space-y-3">
            <span
              className="font-display font-bold text-white text-2xl block"
              style={{ letterSpacing: '0.02em' }}
            >
              AT
            </span>
            <p className="font-body text-white/40 text-sm leading-relaxed max-w-xs">
              AI & Data Science undergraduate. Building things that matter.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <p className="font-mono text-[10px] text-white/25 tracking-[0.2em] uppercase mb-4">Navigation</p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="font-body text-sm text-white/45 hover:text-white/80 transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="font-mono text-[10px] text-white/25 tracking-[0.2em] uppercase mb-4">Connect</p>
            <div className="flex flex-wrap gap-2">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.label !== 'Email' ? '_blank' : undefined}
                  rel={s.label !== 'Email' ? 'noopener noreferrer' : undefined}
                  aria-label={s.label}
                  className="p-2.5 rounded-xl text-white/35 hover:text-brand transition-colors duration-200"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                  whileHover={{ scale: 1.15, borderColor: 'rgba(79,255,176,0.30)' }}
                  whileTap={{ scale: 0.9 }}
                >
                  <s.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom rule */}
        <motion.div
          className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="font-body text-xs text-white/25">
            © {year} AADHIASARANA T
          </p>
          <p className="font-body text-xs text-white/20">
            Built with React · Tailwind · Framer Motion
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
