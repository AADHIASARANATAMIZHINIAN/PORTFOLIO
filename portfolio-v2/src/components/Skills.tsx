import { motion } from 'framer-motion'

const categories = [
  {
    title: 'Frontend',
    items: ['React', 'TypeScript', 'JavaScript'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'REST APIs', 'Databases'],
  },
  {
    title: 'AI & Data',
    items: ['Python', 'Machine Learning', 'Data Analysis'],
  },
  {
    title: 'Tools',
    items: ['Git', 'Docker', 'AWS'],
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight max-w-4xl text-white">
            Expertise
          </h2>
        </motion.div>

        {/* Skills Grid Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              className="group space-y-3 p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/8 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -3 }}
            >
              <h3 className="text-lg font-bold text-white">
                {category.title}
              </h3>
              <ul className="space-y-2">
                {category.items.map((item, i) => (
                  <motion.li 
                    key={item} 
                    className="text-gray-400 flex items-center gap-2 text-sm"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.4, delay: index * 0.1 + i * 0.05 }}
                  >
                    <span className="w-1 h-1 rounded-full bg-white"></span>
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
            className="bg-gradient-to-br from-white/5 via-white/2 to-gray-300/5 backdrop-blur-xl border border-white/15 rounded-3xl p-6 md:p-12 hover:border-white/30 transition-all duration-300 shadow-2xl"
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
                  <div className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent group-hover:from-white group-hover:to-gray-300 transition-all">
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
