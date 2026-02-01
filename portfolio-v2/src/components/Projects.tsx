import { ExternalLink, Github } from 'lucide-react'
import { motion } from 'framer-motion'
import { useRef } from 'react'

const projects = [
  {
    id: 1,
    title: 'LINKOVA - Social Media Platform',
    description:
      'A full-stack LinkedIn clone built with MERN stack featuring JWT authentication, posts with likes/comments, user profiles, real-time updates, and modern responsive UI. Deployed on Netlify (frontend) and Render (backend).',
    image: 'https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=800&h=600&fit=crop',
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'JWT', 'REST API'],
    liveUrl: 'https://linkova.netlify.app',
    githubUrl: 'https://github.com/AADHIASARANATAMIZHINIAN/MERN_LINKOVA',
    year: '2025',
  },
  {
    id: 2,
    title: 'Data Visualization Dashboard',
    description:
      'Interactive Python dashboard built with Streamlit for visualizing complex datasets. Features dynamic plots, real-time data analysis, and an intuitive interface for exploring data insights.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    tags: ['Python', 'Streamlit', 'Pandas', 'Data Visualization', 'Analytics'],
    liveUrl: '#',
    githubUrl: 'https://github.com/AADHIASARANATAMIZHINIAN/Streamlit-python---simple-',
    year: '2025',
  },
  {
    id: 3,
    title: 'Modern Portfolio Website',
    description:
      'A stunning personal portfolio built with React, TypeScript, and Three.js. Features smooth scroll animations, 3D particle backgrounds, touch-responsive elements, and mobile-first responsive design.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    tags: ['React', 'TypeScript', 'Three.js', 'Framer Motion', 'TailwindCSS', 'Vite'],
    liveUrl: '#',
    githubUrl: 'https://github.com/AADHIASARANATAMIZHINIAN/-Aadhi-s-portfolio',
    year: '2025',
  },
]

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section id="projects" className="py-32 relative overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-20">
        {/* Section Label */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            [02] Case Studies
          </span>
        </motion.div>

        {/* Section Title */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight max-w-4xl shine-effect">
            Featured projects that showcase my expertise in building{' '}
            <span className="text-gray-500">exceptional digital experiences</span>
          </h2>
          <p className="text-gray-400 mt-4 text-sm md:text-base">
            👉 Explore my featured projects below
          </p>
        </motion.div>
      </div>

      {/* Projects Grid - Responsive Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-6 lg:px-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="group w-full"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
              <motion.div 
                className="relative overflow-hidden rounded-3xl bg-dark-800/50 backdrop-blur-xl border border-white/20 h-full shadow-2xl"
                whileHover={{ 
                  borderColor: "rgba(255,255,255,0.4)",
                  scale: 1.02,
                  y: -8,
                  boxShadow: "0 25px 70px rgba(139,92,246,0.2)"
                }}
                transition={{ duration: 0.4 }}
              >
                {/* Project Image */}
                <div className="relative h-[280px] md:h-[320px] overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent" />
                  
                  {/* Year Badge */}
                  <motion.div 
                    className="absolute top-4 right-4 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.25)' }}
                  >
                    {project.year}
                  </motion.div>
                </div>

                {/* Project Content */}
                <div className="p-6 md:p-8 space-y-5">
                  <motion.h3 
                    className="text-2xl md:text-3xl font-bold leading-tight text-white"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    {project.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-gray-300 leading-relaxed text-sm md:text-base min-h-[80px]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    {project.description}
                  </motion.p>

                  {/* Tags */}
                  <motion.div 
                    className="flex flex-wrap gap-2 pt-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    {project.tags.map((tag) => (
                      <motion.span
                        key={tag}
                        className="px-4 py-1.5 text-xs md:text-sm font-semibold bg-white/10 text-white rounded-full border border-white/20 shadow-sm"
                        whileHover={{ backgroundColor: 'rgba(255,255,255,0.2)', borderColor: 'rgba(255,255,255,0.3)', scale: 1.05, y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 md:gap-4 pt-6">
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 md:px-7 py-3 md:py-3.5 bg-white text-black rounded-full font-bold text-sm md:text-base group shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>View Live</span>
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                    </motion.a>
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 md:px-7 py-3 md:py-3.5 border-2 border-white/30 rounded-full font-bold text-sm md:text-base group hover:bg-white/10"
                      whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.5)', y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Github className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                      <span>Code</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
      </div>

      {/* View All Projects Link */}
      <motion.div 
        className="text-center mt-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        <motion.a
          href="https://github.com/AADHIASARANATAMIZHINIAN"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-lg font-semibold group"
          whileHover={{ x: 5 }}
        >
          <span>View All Projects</span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </motion.a>
      </motion.div>
    </section>
  )
}
