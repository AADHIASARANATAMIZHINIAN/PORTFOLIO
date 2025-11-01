import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Label */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            [01] About Me
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h2 
              className="text-2xl xs:text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight shine-effect"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              Traditional students learn from books.{' '}
              <span className="text-gray-500">I learn by building and breaking things.</span>
            </motion.h2>
          </motion.div>

          {/* Right Content - Text */}
          <motion.div 
            className="space-y-6 text-lg text-gray-400 leading-relaxed"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.p 
              className="hover:text-gray-300 transition-colors duration-300"
              whileHover={{ x: 5 }}
            >
              Hey there! 👋 I'm <span className="text-white font-semibold shine-effect">AADHIASARANA T</span>, an AI & Data Science student 
              on a mission to explore the intersection of technology and creativity. My journey into tech started 
              with curiosity, and it's now fueled by passion for building things that matter.
            </motion.p>

            <motion.p 
              className="hover:text-gray-300 transition-colors duration-300"
              whileHover={{ x: 5 }}
            >
              Currently diving deep into <span className="text-white font-semibold">Python, C, and JavaScript</span>, while 
              building projects with <span className="text-white font-semibold">React, Node.js, Flask, and Django</span>. 
              I'm fascinated by AI/ML applications and love creating web and mobile experiences that are both 
              functional and beautiful. Oh, and I'm also learning Japanese (日本語) on the side! 🇯🇵
            </motion.p>

            <motion.p 
              className="hover:text-gray-300 transition-colors duration-300"
              whileHover={{ x: 5 }}
            >
              My goal? Build elegant applications, contribute to open source, and level up every single day. 
              When I'm not coding, you'll find me experimenting with new tech stacks, working on personal projects, 
              or exploring how tech can solve real-world problems.
            </motion.p>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-3 gap-8 mt-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[
            { value: "AI & DS", label: "Student" },
            { value: "15+", label: "Projects Built" },
            { value: "7+", label: "Repositories" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="group"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.1, y: -5 }}
            >
              <div className="text-3xl xs:text-4xl md:text-5xl font-display font-bold shine-effect">{stat.value}</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider mt-2 group-hover:text-gray-400 transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Available for Work Badge */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full px-6 py-3"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.2)" }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="w-3 h-3 rounded-full bg-green-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="font-semibold">Open to Internships & Collaborations</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
