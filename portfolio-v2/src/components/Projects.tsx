import { ExternalLink, Github } from 'lucide-react'
import { motion } from 'framer-motion'
import { useRef } from 'react'

const projects = [
  {
    id: 1,
    title: 'ZYCARE',
    description:
      'A TypeScript-based healthcare management system. Modern full-stack application with integrated healthcare features and real-time capabilities.',
    image: 'https://images.unsplash.com/photo-1576091160550-112173e7d7cb?w=800&h=600&fit=crop',
    tags: ['TypeScript', 'Healthcare', 'Full-Stack'],
    liveUrl: '#',
    githubUrl: 'https://github.com/AADHIASARANATAMIZHINIAN/ZYCARE',
    year: '2025',
  },
  {
    id: 2,
    title: 'FARMER-SCHEMES',
    description:
      'A comprehensive platform connecting farmers with government schemes and agricultural resources. Built with JavaScript for seamless user experience.',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=600&fit=crop',
    tags: ['JavaScript', 'Web App', 'Agriculture'],
    liveUrl: '#',
    githubUrl: 'https://github.com/AADHIASARANATAMIZHINIAN/FARMER-SCHEMES',
    year: '2025',
  },
  {
    id: 3,
    title: 'MERN_LINKOVA',
    description:
      'A full-featured LinkedIn clone built with MERN stack featuring real-time updates, authentication, user profiles, and post management system.',
    image: 'https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=800&h=600&fit=crop',
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    liveUrl: '#',
    githubUrl: 'https://github.com/AADHIASARANATAMIZHINIAN/MERN_LINKOVA',
    year: '2025',
  },
  {
    id: 4,
    title: 'Digital Queue Management',
    description:
      'A government queue management system for efficiently managing citizen services. Built with JavaScript for reliability and ease of use.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    tags: ['JavaScript', 'Queue System', 'Admin Panel'],
    liveUrl: '#',
    githubUrl: 'https://github.com/AADHIASARANATAMIZHINIAN/Digital-Queue-Management',
    year: '2025',
  },
  {
    id: 5,
    title: 'SECURE-VOTING-SYSTEM',
    description:
      'A secure voting system built with Java. Implements cryptographic voting mechanisms and audit trails for transparent elections.',
    image: 'https://images.unsplash.com/photo-1579389334228-c0fa7d8eba90?w=800&h=600&fit=crop',
    tags: ['Java', 'Security', 'Cryptography'],
    liveUrl: '#',
    githubUrl: 'https://github.com/AADHIASARANATAMIZHINIAN/SECURE-VOTING-SYSTEM',
    year: '2025',
  },
  {
    id: 6,
    title: 'GYM-MANAGEMENT',
    description:
      'A comprehensive gym management system with membership tracking, class scheduling, and member analytics. Built for fitness industry operations.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop',
    tags: ['JavaScript', 'Management System', 'Database'],
    liveUrl: '#',
    githubUrl: 'https://github.com/AADHIASARANATAMIZHINIAN/GYM-MANAGEMENT',
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight max-w-4xl text-white">
            Featured Projects
          </h2>
          <p className="text-gray-400 mt-4 text-sm md:text-base">
            A selection of my recent work
          </p>
        </motion.div>
      </div>

      {/* Projects Grid - Responsive Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-6 lg:px-8 max-w-5xl mx-auto">
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
                className="relative overflow-hidden rounded-2xl bg-black/40 backdrop-blur border border-white/10 h-full shadow-lg hover:border-white/30 transition-all duration-300"
                whileHover={{ 
                  scale: 1.05,
                  y: -4,
                  boxShadow: "0 15px 40px rgba(255,255,255,0.1)"
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Project Image */}
                <div className="relative h-[200px] md:h-[220px] overflow-hidden">
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
                    className="absolute top-3 right-3 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.3)' }}
                  >
                    {project.year}
                  </motion.div>
                </div>

                {/* Project Content */}
                <div className="p-5 md:p-6 space-y-3">
                  <motion.h3 
                    className="text-xl md:text-2xl font-bold leading-tight text-white"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    {project.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-gray-400 leading-relaxed text-xs md:text-sm min-h-[60px] line-clamp-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    {project.description}
                  </motion.p>

                  {/* Tags */}
                  <motion.div 
                    className="flex flex-wrap gap-1.5 pt-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    {project.tags.slice(0, 3).map((tag) => (
                      <motion.span
                        key={tag}
                        className="px-2 py-0.5 rounded-full text-xs font-medium bg-white/10 text-gray-300 border border-white/10 hover:bg-white/15 transition-colors"
                        whileHover={{ backgroundColor: 'rgba(255,255,255,0.2)', borderColor: 'rgba(255,255,255,0.3)', scale: 1.05, y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-3">
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-1 px-3 py-1.5 bg-white text-black rounded-lg text-xs font-semibold hover:bg-gray-200 transition-all duration-300 ${project.liveUrl === '#' ? 'opacity-30 cursor-not-allowed pointer-events-none' : ''} group`}
                      whileHover={project.liveUrl !== '#' ? { scale: 1.05 } : {}}
                      whileTap={project.liveUrl !== '#' ? { scale: 0.95 } : {}}
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Live</span>
                    </motion.a>
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-1.5 border border-white text-white rounded-lg text-xs font-semibold hover:bg-white hover:text-black transition-all duration-300 group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="w-3 h-3" />
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
