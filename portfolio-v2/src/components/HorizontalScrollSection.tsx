import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface Project {
  title: string
  description: string
  image: string
  year: string
  tags: string[]
  link?: string
}

interface HorizontalScrollSectionProps {
  projects: Project[]
}

export default function HorizontalScrollSection({ projects }: HorizontalScrollSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-50%'])

  return (
    <div ref={containerRef} className="relative py-32">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div 
          style={{ x }}
          className="flex gap-8 px-6 lg:px-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="group min-w-[85vw] md:min-w-[600px] lg:min-w-[700px]"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative overflow-hidden rounded-3xl bg-dark-900/30 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-700 h-[600px]">
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
                    transition={{ delay: 0.2 }}
                  >
                    {project.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-gray-400 line-clamp-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {project.description}
                  </motion.p>

                  {/* Tags */}
                  <motion.div 
                    className="flex flex-wrap gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium bg-white/5 rounded-full border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </motion.div>

                  {/* View Project Button */}
                  {project.link && (
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full font-semibold transition-all duration-300 group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Project
                      <svg 
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
