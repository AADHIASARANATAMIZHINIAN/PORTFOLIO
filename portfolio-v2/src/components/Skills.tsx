import { motion } from 'framer-motion'

const categories = [
  {
    title: 'Languages',
    items: ['Python', 'TypeScript', 'JavaScript', 'Java', 'C'],
    accent: 'rgba(123,97,255,',
  },
  {
    title: 'Frontend',
    items: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite', 'HTML / CSS'],
    accent: 'rgba(11,255,228,',
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Express', 'Flask', 'Django', 'REST APIs', 'MongoDB', 'Firebase'],
    accent: 'rgba(79,255,176,',
  },
  {
    title: 'AI & Data',
    items: ['scikit-learn', 'pandas', 'NumPy', 'Matplotlib', 'Jupyter'],
    accent: 'rgba(255,168,0,',
  },
  {
    title: 'Tools',
    items: ['Git', 'Arch Linux', 'Docker', 'Vercel', 'GitHub Actions'],
    accent: 'rgba(255,45,120,',
  },
]

const learning = [
  'Systems programming in C',
  'ML model deployment',
  'SQL & data pipelines',
  'Next.js App Router',
]

export default function Skills() {
  return (
    <section id="skills" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section header */}
        <div className="relative mb-20">
          <span className="section-num select-none" aria-hidden="true">03</span>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.55 }}
          >
            <p className="font-mono text-xs text-brand/70 tracking-[0.2em] uppercase mb-3">Tech Stack</p>
            <div style={{ overflow: 'hidden' }}>
              <motion.h2
                className="font-display font-bold text-white"
                style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)', letterSpacing: '0.02em', lineHeight: 0.95 }}
                initial={{ clipPath: 'inset(100% 0 0 0)', y: 20 }}
                whileInView={{ clipPath: 'inset(0% 0 0 0)', y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                My{' '}
                <span className="brand-gradient-text">toolkit</span>
              </motion.h2>
            </div>
          </motion.div>
        </div>

        {/* Category cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              className="glass glass-hover p-5 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -4 }}
            >
              {/* Accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${cat.accent}0.6), transparent)` }}
              />
              <h3 className="font-display font-semibold text-white/90 text-sm mb-4 tracking-wide">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="font-body text-xs px-2.5 py-1 rounded-lg text-white/60 hover:text-white/90 transition-colors duration-200"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Currently learning */}
        <motion.div
          className="mt-8 glass p-6"
          style={{ borderLeft: '2px solid rgba(79,255,176,0.4)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.3 }}
        >
          <p className="font-body text-white/50 text-sm mb-4">Currently deepening —</p>
          <div className="flex flex-wrap gap-2.5">
            {learning.map((item) => (
              <span
                key={item}
                className="font-body text-sm px-3.5 py-1.5 rounded-xl text-brand/80 hover:text-brand transition-colors duration-200"
                style={{ background: 'rgba(79,255,176,0.07)', border: '1px solid rgba(79,255,176,0.20)' }}
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
