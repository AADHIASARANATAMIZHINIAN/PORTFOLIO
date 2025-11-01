import { useEffect, useState } from 'react'
import { Github, Linkedin, Mail } from 'lucide-react'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
  },
}

const titleVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
  },
}

export default function Hero() {
  const [displayText, setDisplayText] = useState('')
  const roles = [
    'AI & Data Science Student',
    'Full Stack Developer',
    'AI/ML Enthusiast',
    'Open Source Contributor',
    'Creative Technologist',
  ]
  const [roleIndex, setRoleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentRole = roles[roleIndex]
    const updateText = () => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1))
        if (displayText === currentRole) {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1))
        if (displayText === '') {
          setIsDeleting(false)
          setRoleIndex((prev) => (prev + 1) % roles.length)
        }
      }
    }

    const timeout = setTimeout(updateText, isDeleting ? 50 : 100)
    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, roleIndex])

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
    >
      {/* Subtle Gradient Overlay - Very transparent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-transparent"></div>
      
      {/* Animated Grid - Very subtle */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:100px_100px]"></div>

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center space-y-8">
          {/* Name with shine effect */}
          <motion.div className="mb-6" variants={itemVariants}>
            <motion.p 
              className="text-sm md:text-base font-medium text-gray-400 uppercase tracking-[0.3em] mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Portfolio of
            </motion.p>
            <motion.h2 
              className="text-2xl xs:text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-white relative inline-block shine-effect"
              variants={titleVariants}
            >
              AADHIASARANA T
            </motion.h2>
          </motion.div>

          {/* Main Title with shimmer effect */}
          <motion.h1 
            className="text-3xl xs:text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight leading-[1.1]"
            variants={itemVariants}
          >
            <motion.span 
              className="block mb-3 text-white shine-effect"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Building the future
            </motion.span>
            <motion.span 
              className="block text-gray-300 shine-effect"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              with innovative solutions
            </motion.span>
          </motion.h1>

          {/* Subtitle with Typing Effect */}
          <motion.div 
            className="text-xl xs:text-2xl md:text-3xl lg:text-4xl font-light text-gray-300 h-12 flex items-center justify-center"
            variants={itemVariants}
          >
            <span className="font-mono shine-effect">{displayText}</span>
            <motion.span 
              className="ml-1"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
            >
              |
            </motion.span>
          </motion.div>

          {/* Description */}
          <motion.p 
            className="text-base xs:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed hover:text-gray-300 transition-colors duration-300"
            variants={itemVariants}
          >
            AI & Data Science student passionate about building exceptional digital experiences. 
            Currently exploring AI/ML, web development, and mobile apps while learning Python, C, JavaScript, 
            React, Node.js, and Flask. Building elegant applications one commit at a time.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
            variants={itemVariants}
          >
            <motion.a
              href="#projects"
              className="group px-8 py-4 bg-white text-black rounded-lg font-semibold"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              View My Work
              <motion.span 
                className="inline-block ml-2"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
              >
                →
              </motion.span>
            </motion.a>
            <motion.a
              href="#contact"
              className="px-8 py-4 border border-white/20 rounded-lg font-semibold backdrop-blur-sm"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.4)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Get In Touch
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="flex items-center justify-center gap-6 pt-12"
            variants={itemVariants}
          >
            {[
              { href: "https://github.com/AADHIASARANATAMIZHINIAN", icon: Github, label: "GitHub" },
              { href: "https://www.linkedin.com/in/aadhiasaranat", icon: Linkedin, label: "LinkedIn" },
              { href: "mailto:aadhiasarana12@gmail.com", icon: Mail, label: "Email" },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.label !== "Email" ? "_blank" : undefined}
                rel={social.label !== "Email" ? "noopener noreferrer" : undefined}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label={social.label}
                whileHover={{ 
                  scale: 1.25,
                  filter: "drop-shadow(0 0 8px rgba(255,255,255,0.5))",
                }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
              >
                <social.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
