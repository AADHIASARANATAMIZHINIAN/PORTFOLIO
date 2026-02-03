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
              className="space-y-4 group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-purple-300 transition-all">
                {category.title}
              </h3>
              <ul className="space-y-2">
                {category.items.map((item, i) => (
                  <motion.li 
                    key={item} 
                    className="text-gray-400 flex items-center gap-2 hover:text-cyan-300 transition-colors group/item cursor-default"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.4, delay: index * 0.1 + i * 0.05 }}
                    whileHover={{ x: 5 }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 group-hover/item:scale-150 transition-transform"></span>
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
            className="bg-gradient-to-br from-white/5 via-white/2 to-purple-500/5 backdrop-blur-xl border border-white/15 rounded-3xl p-6 md:p-12 hover:border-white/30 transition-all duration-300 shadow-2xl"
            whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.3)", boxShadow: "0 20px 50px rgba(139,92,246,0.15)" }}
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
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="group cursor-default"
                >
                  <div className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-300 via-white to-purple-300 bg-clip-text text-transparent group-hover:from-cyan-200 group-hover:to-purple-200 transition-all">
                    {item.title}
                  </div>
                  <div className="text-gray-400 group-hover:text-gray-300 transition-colors">{item.description}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
