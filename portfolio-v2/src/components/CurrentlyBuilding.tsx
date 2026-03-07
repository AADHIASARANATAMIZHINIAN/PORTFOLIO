import { motion } from 'framer-motion'

const items = [
  {
    title: 'ML Pipeline',
    description: 'End-to-end machine learning pipeline for model training, evaluation, and deployment with automated monitoring.',
    status: 'In Progress',
    statusColor: 'rgba(79,255,176,',
    domain: 'AI / ML',
    domainColor: 'rgba(123,97,255,',
  },
  {
    title: 'ZYROVER Deployment',
    description: 'Developing a ZYROVER for healthcare industries to have advanced rovers for maintaining clean and safe environments with CI/CD pipelines.',
    status: 'In Progress',
    statusColor: 'rgba(79,255,176,',
    domain: 'Healthcare',
    domainColor: 'rgba(59,130,246,',
  },
  {
    title: 'JLPT N5+ Prep',
    description: 'Advancing Japanese language skills beyond N5 — building vocabulary, kanji recognition, and conversational fluency.',
    status: 'Learning',
    statusColor: 'rgba(234,179,8,',
    domain: 'Language',
    domainColor: 'rgba(249,115,22,',
  },
]

export default function CurrentlyBuilding() {
  return (
    <section id="building" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section header */}
        <div className="relative mb-20">
          <span className="section-num select-none" aria-hidden="true">05</span>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.55 }}
          >
            <p className="font-mono text-xs text-brand/70 tracking-[0.2em] uppercase mb-3">Currently Building</p>
            <div style={{ overflow: 'hidden' }}>
              <motion.h2
                className="font-display font-bold text-white"
                style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)', letterSpacing: '0.02em', lineHeight: 0.95 }}
                initial={{ clipPath: 'inset(100% 0 0 0)', y: 20 }}
                whileInView={{ clipPath: 'inset(0% 0 0 0)', y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                In the{' '}
                <span className="brand-gradient-text">lab</span>
              </motion.h2>
            </div>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              className="glass glass-hover p-6 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              {/* Domain accent glow */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${item.domainColor}0.5), transparent)` }}
              />

              <div className="flex items-center justify-between mb-4">
                <span
                  className="font-mono text-[10px] px-2 py-0.5 rounded-md"
                  style={{
                    background: `${item.statusColor}0.08)`,
                    border: `1px solid ${item.statusColor}0.25)`,
                    color: `${item.statusColor}0.9)`,
                  }}
                >
                  {item.status}
                </span>
                <span
                  className="font-mono text-[10px] px-2 py-0.5 rounded-md text-white/45"
                  style={{
                    background: `${item.domainColor}0.06)`,
                    border: `1px solid ${item.domainColor}0.18)`,
                  }}
                >
                  {item.domain}
                </span>
              </div>

              <h3
                className="font-display font-bold text-white text-lg mb-3"
                style={{ letterSpacing: '0.02em' }}
              >
                {item.title}
              </h3>

              <p className="font-body text-white/60 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
