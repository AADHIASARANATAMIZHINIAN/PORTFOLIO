import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'

interface FlipCardProps {
  title: string
  description: string
  tags: string[]
  image: string
  githubUrl: string
  liveUrl: string
  year: string
}

export const FlipCard = ({
  title,
  description,
  tags,
  image,
  githubUrl,
  liveUrl,
  year,
}: FlipCardProps) => {
  return (
    <motion.div
      className="relative h-96 cursor-pointer perspective group"
      style={{ perspective: '1200px' }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="relative w-full h-full"
        initial={{ rotateY: 0 }}
        whileHover={{ rotateY: 180 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of card */}
        <div
          className="absolute inset-0 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-neutral-800/50 to-transparent backdrop-blur-sm border border-white/20 hover:border-white/40 overflow-hidden group-hover:border-white/50 transition-all duration-300"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Project Image Background */}
          <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col justify-between z-10">
            <div>
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg md:text-xl font-bold leading-tight flex-1 pr-4">{title}</h3>
                <span className="text-xs md:text-sm text-gray-400 font-semibold whitespace-nowrap">{year}</span>
              </div>
              <p className="text-sm md:text-base text-gray-400 line-clamp-3 leading-relaxed">
                {description}
              </p>
            </div>

            {/* Tags Preview */}
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/30 text-white/80 whitespace-nowrap"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="text-xs px-2 py-1 text-gray-400">+{tags.length - 3}</span>
              )}
            </div>
          </div>

          {/* Hover indicator */}
          <div className="absolute bottom-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <motion.div animate={{ rotate: [0, 180] }} transition={{ duration: 2, repeat: Infinity }}>
              <ExternalLink className="w-5 h-5" />
            </motion.div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-neutral-800/50 to-transparent backdrop-blur-sm border border-white/20 overflow-hidden flex flex-col justify-between"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div>
            <h4 className="text-sm font-semibold text-white/80 uppercase tracking-widest mb-4">
              Tech Stack
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {tags.map((tag, i) => (
                <div
                  key={i}
                  className="text-xs md:text-sm px-3 py-2 rounded-lg bg-white/10 border border-white/20 hover:border-white/40 hover:bg-white/15 transition-all text-gray-300 hover:text-white"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-3 pt-6 border-t border-white/10">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all text-sm font-semibold hover:text-white"
            >
              <Github className="w-4 h-4" />
              Code
            </a>
            {liveUrl !== '#' && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all text-sm font-semibold hover:text-white"
              >
                <ExternalLink className="w-4 h-4" />
                Live
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
