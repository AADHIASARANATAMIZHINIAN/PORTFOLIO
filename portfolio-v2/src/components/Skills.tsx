import { motion } from 'framer-motion'
import SkillsWithLogos from './SkillsWithLogos'

const categories = [
  {
    title: 'Frontend Development',
    items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'JavaScript'],
  },
  {
    title: 'Backend Development',
    items: ['Node.js', 'GraphQL', 'REST APIs', 'Database Design'],
  },
  {
    title: 'AI & Data',
    items: ['Machine Learning', 'Python', 'Data Analysis', 'AI Integration'],
  },
  {
    title: 'DevOps & Cloud',
    items: ['Docker', 'AWS', 'CI/CD', 'Git', 'Kubernetes'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Label */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            [03] Expertise
          </span>
        </motion.div>

        {/* Section Title */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight max-w-4xl">
            Full-spectrum capabilities{' '}
            <span className="text-gray-500">to bring your vision to life</span>
          </h2>
        </motion.div>

        {/* Animated Skills Cards with Logos */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <h3 className="text-2xl font-bold mb-8">Technical Proficiency</h3>
          <SkillsWithLogos />
        </motion.div>

        {/* Skills Grid Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              className="space-y-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3 className="text-xl font-bold">{category.title}</h3>
              <ul className="space-y-2">
                {category.items.map((item, i) => (
                  <motion.li 
                    key={item} 
                    className="text-gray-400 flex items-center gap-2 hover:text-gray-300 transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.4, delay: index * 0.1 + i * 0.05 }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div 
          className="mt-12 md:mt-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="bg-dark-800/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-12 hover:bg-dark-800/30 transition-all duration-300"
            whileHover={{ scale: 1.01, borderColor: "rgba(255,255,255,0.2)" }}
          >
            <div className="grid md:grid-cols-3 gap-6 md:gap-8 text-center">
              {[
                { title: "Fast", description: "Quick turnaround without compromising quality" },
                { title: "Scalable", description: "Solutions built to grow with your business" },
                { title: "Responsive", description: "Seamless experiences across all devices" },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -3 }}
                >
                  <div className="text-3xl md:text-4xl font-bold mb-2">{item.title}</div>
                  <div className="text-gray-400">{item.description}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
