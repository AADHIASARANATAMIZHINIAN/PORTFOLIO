import { motion } from 'framer-motion'

const experiences = [
  {
    company: 'AI & Data Science Program',
    role: 'Undergraduate Student',
    duration: '2024 - Present',
    description: 'Pursuing Bachelor\'s degree with focus on ML algorithms and modern web technologies.',
  },
  {
    company: 'Self-Learning & Projects',
    role: 'Independent Developer',
    duration: '2023 - Present',
    description: 'Built full-stack applications including LINKOVA, data dashboards, and portfolio projects.',
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Label */}
        <div className="animate-on-scroll mb-16">
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            [04] Journey
          </span>
        </div>

        {/* Section Title */}
        <div className="animate-on-scroll mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight max-w-4xl text-white">
            Journey
          </h2>
        </div>

        {/* Simple Timeline */}
        <div className="space-y-6 max-w-3xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Connector line */}
              {index < experiences.length - 1 && (
                <div className="absolute left-6 top-20 h-12 w-0.5 bg-white/10 -z-10"></div>
              )}
              
              {/* Card */}
              <div className="flex gap-6 pb-4">
                {/* Timeline dot */}
                <div className="flex flex-col items-center pt-1">
                  <div className="w-12 h-12 rounded-full border-2 border-white/20 bg-black/40 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-white"></div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 pt-1 pb-6 border-l border-white/10 pl-6">
                  <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">
                    {exp.duration}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-0.5">
                    {exp.role}
                  </h3>
                  <div className="text-sm text-gray-400 mb-3">{exp.company}</div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20 animate-on-scroll">
          <a
            href="/AADHI_RESUME.pdf"
            download="AADHI_RESUME.pdf"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 hover:scale-105"
          >
            <span>Download Resume</span>
            <span>↓</span>
          </a>
        </div>
      </div>
    </section>
  )
}
