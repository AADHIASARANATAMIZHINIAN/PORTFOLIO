import { ExternalLink, Github } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['5%', '-25%'])

  return (
    <section id="projects" className="py-32 relative overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-20">
        {/* Section Label */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight max-w-4xl shine-effect">
            Featured projects that showcase my expertise in building{' '}
            <span className="text-gray-500">exceptional digital experiences</span>
          </h2>
        </motion.div>
      </div>

      {/* Horizontal Scrolling Projects */}
      <div className="relative">
        <motion.div 
          style={{ x }}
          className="flex gap-8 px-6 lg:px-8 pb-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group min-w-[85vw] md:min-w-[600px] lg:min-w-[700px]"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <motion.div 
                className="relative overflow-hidden rounded-3xl bg-dark-900/30 backdrop-blur-sm border border-white/10 h-[600px]"
                whileHover={{ 
                  borderColor: "rgba(255,255,255,0.3)",
                  scale: 1.02,
                }}
                transition={{ duration: 0.4 }}
              >
                {/* Project Image */}
                <div className="relative h-[350px] overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/40 to-transparent" />
                  
                  {/* Year Badge */}
                  <motion.div 
                    className="absolute top-6 right-6 bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full text-sm font-semibold"
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
                  >
                    {project.year}
                  </motion.div>
                </div>

                {/* Project Content */}
                <div className="p-8 space-y-4">
                  <motion.h3 
                    className="text-3xl font-bold"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    {project.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-gray-400 line-clamp-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    {project.description}
                  </motion.p>

                  {/* Tags */}
                  <motion.div 
                    className="flex flex-wrap gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    {project.tags.map((tag) => (
                      <motion.span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium bg-white/5 rounded-full border border-white/10"
                        whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)', scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 rounded-full font-semibold group"
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>View Live</span>
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full font-semibold group"
                      whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.4)', backgroundColor: 'rgba(255,255,255,0.05)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                      <span>Code</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
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
