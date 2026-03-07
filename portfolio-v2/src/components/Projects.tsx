import { ExternalLink, Github, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'

const projects = [
  {
    id: 1,
    title: 'ZYCARE',
    description: 'Full-stack healthcare management system with role-based access control for admins, doctors, and patients. Built to replace fragmented clinic workflows with a single, real-time platform.',
    tags: ['TypeScript', 'React', 'Node.js', 'MongoDB'],
    domain: 'Healthcare',
    domainColor: 'rgba(59,130,246,',
    liveUrl: '',
    githubUrl: 'https://github.com/AADHIASARANATAMIZHINIAN/ZYCARE',
    year: '2025',
    featured: true,
  },
  {
    id: 2,
    title: 'FARMER-SCHEMES',
    description: 'Agricultural access platform aggregating government subsidy schemes for small-scale farmers. Filters by eligibility, integrates Firebase for real-time data, and links directly to application portals.',
    tags: ['JavaScript', 'Node.js', 'Firebase', 'REST APIs'],
    domain: 'AgriTech',
    domainColor: 'rgba(34,197,94,',
    liveUrl: '',
    githubUrl: 'https://github.com/AADHIASARANATAMIZHINIAN/FARMER-SCHEMES',
    year: '2025',
  },
  {
    id: 3,
    title: 'MERN LINKOVA',
    description: 'Production-grade LinkedIn clone on the MERN stack. JWT auth with refresh tokens, real-time notifications via Socket.io, and a full social feed with media uploads.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'Socket.io'],
    domain: 'Social Platform',
    domainColor: 'rgba(168,85,247,',
    liveUrl: '',
    githubUrl: 'https://github.com/AADHIASARANATAMIZHINIAN/MERN_LINKOVA',
    year: '2025',
  },
  {
    id: 4,
    title: 'Predictive Analysis System',
    description: 'Machine learning pipeline for multi-class predictive analysis. Logistic regression model trained on real datasets with scikit-learn — includes preprocessing, evaluation metrics, and result visualisation.',
    tags: ['Python', 'scikit-learn', 'pandas', 'Matplotlib'],
    domain: 'AI / ML',
    domainColor: 'rgba(123,97,255,',
    liveUrl: '',
    githubUrl: 'https://github.com/AADHIASARANATAMIZHINIAN',
    year: '2025',
  },
  {
    id: 5,
    title: 'Digital Queue Management',
    description: 'Citizen services queue system for government offices. Digital tokens, real-time tracking, and an admin dashboard for multi-counter management.',
    tags: ['JavaScript', 'Node.js', 'Express', 'MongoDB'],
    domain: 'Civic Tech',
    domainColor: 'rgba(234,179,8,',
    liveUrl: '',
    githubUrl: 'https://github.com/AADHIASARANATAMIZHINIAN/Digital-Queue-Management',
    year: '2025',
  },
  {
    id: 6,
    title: 'SECURE VOTING SYSTEM',
    description: 'Cryptographic voting infrastructure in Java. RSA/AES encrypted ballots, voter privacy, and an immutable audit trail for post-election verification.',
    tags: ['Java', 'Cryptography', 'RSA/AES'],
    domain: 'Security',
    domainColor: 'rgba(239,68,68,',
    liveUrl: '',
    githubUrl: 'https://github.com/AADHIASARANATAMIZHINIAN/SECURE-VOTING-SYSTEM',
    year: '2025',
  },
  {
    id: 7,
    title: 'GYM MANAGEMENT',
    description: 'Operations platform for fitness centers. Member lifecycle tracking, class scheduling, payment records with overdue alerts, and a retention analytics dashboard.',
    tags: ['JavaScript', 'Node.js', 'MongoDB'],
    domain: 'Operations',
    domainColor: 'rgba(249,115,22,',
    liveUrl: '',
    githubUrl: 'https://github.com/AADHIASARANATAMIZHINIAN/GYM-MANAGEMENT',
    year: '2025',
  },
]

export default function Projects() {
  const featured = projects[0]
  const rest = projects.slice(1)

  return (
    <section id="projects" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section header */}
        <div className="relative mb-20">
          <span className="section-num select-none" aria-hidden="true">02</span>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.55 }}
          >
            <p className="font-mono text-xs text-brand/70 tracking-[0.2em] uppercase mb-3">Selected Work</p>
            <div style={{ overflow: 'hidden' }}>
              <motion.h2
                className="font-display font-bold text-white"
                style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)', letterSpacing: '0.02em', lineHeight: 0.95 }}
                initial={{ clipPath: 'inset(100% 0 0 0)', y: 20 }}
                whileInView={{ clipPath: 'inset(0% 0 0 0)', y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                The{' '}
                <span className="brand-gradient-text">work</span>
              </motion.h2>
            </div>
          </motion.div>
        </div>

        {/* Featured project */}
        <motion.div
          className="glass glass-hover mb-6 p-8 md:p-10 relative overflow-hidden"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.65 }}
          whileHover={{ y: -3 }}
        >
          <div
            className="absolute top-0 right-0 w-80 h-80 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at top right, ${featured.domainColor}0.12) 0%, transparent 70%)`,
              filter: 'blur(50px)',
            }}
          />
          <div className="relative space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="font-mono text-xs px-2.5 py-1 rounded-lg"
                style={{
                  background: `${featured.domainColor}0.10)`,
                  border: `1px solid ${featured.domainColor}0.28)`,
                  color: '#93c5fd',
                }}
              >
                {featured.domain}
              </span>
              <span className="font-mono text-xs text-white/30">{featured.year}</span>
              <span
                className="font-mono text-xs px-2.5 py-1 rounded-lg text-brand"
                style={{ background: 'rgba(79,255,176,0.08)', border: '1px solid rgba(79,255,176,0.22)' }}
              >
                Featured
              </span>
            </div>

            <h3
              className="font-display font-bold text-white"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', letterSpacing: '0.02em' }}
            >
              {featured.title}
            </h3>

            <p className="font-body text-white/60 text-base leading-relaxed max-w-2xl">
              {featured.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {featured.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs px-2.5 py-1 rounded-lg text-white/45"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-3 pt-1">
              {featured.liveUrl && (
                <motion.a
                  href={featured.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-body text-sm font-semibold text-black bg-brand brand-glow-btn"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Live Demo
                </motion.a>
              )}
              <motion.a
                href={featured.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-body text-sm font-medium text-white/65 hover:text-white transition-colors"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <Github className="w-3.5 h-3.5" />
                View on GitHub
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {rest.map((project, index) => (
            <motion.div
              key={project.id}
              className="glass glass-hover p-6 relative overflow-hidden group"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              whileHover={{ y: -4 }}
            >
              <div
                className="absolute top-0 right-0 w-36 h-36 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(ellipse at top right, ${project.domainColor}0.10) 0%, transparent 70%)`,
                  filter: 'blur(24px)',
                }}
              />
              <div className="relative space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className="font-mono text-[10px] px-2 py-0.5 rounded-md text-white/60"
                    style={{
                      background: `${project.domainColor}0.08)`,
                      border: `1px solid ${project.domainColor}0.22)`,
                    }}
                  >
                    {project.domain}
                  </span>
                  <span className="font-mono text-[10px] text-white/25">{project.year}</span>
                </div>

                <h3
                  className="font-display font-bold text-white text-lg"
                  style={{ letterSpacing: '0.02em' }}
                >
                  {project.title}
                </h3>

                <p className="font-body text-white/55 text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] px-2 py-0.5 rounded-md text-white/38"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2.5 pt-2">
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-body text-xs font-semibold text-black bg-brand"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="w-3 h-3" /> Live
                    </motion.a>
                  )}
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-body text-xs text-white/50 hover:text-white/80 transition-colors"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="w-3 h-3" /> GitHub
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.a
            href="https://github.com/AADHIASARANATAMIZHINIAN"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body text-sm text-white/40 hover:text-brand transition-colors duration-200"
            whileHover={{ x: 4 }}
          >
            View all repositories on GitHub
            <ArrowUpRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
