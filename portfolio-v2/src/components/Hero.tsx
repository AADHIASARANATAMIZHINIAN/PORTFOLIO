import { useEffect, useState, lazy, Suspense } from 'react'
import { Github, Linkedin, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import Orb from './Orb'

const Letter3D = lazy(() => import('./Letter3D'))

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
      className="min-h-[100dvh] flex items-center justify-center relative overflow-hidden pt-16 px-4 sm:px-6"
    >
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto w-full py-12 sm:py-16 md:py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10 lg:gap-16">
          {/* Left side - Orb Profile */}
          <motion.div 
            className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-96 lg:h-96 flex-shrink-0"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            {/* Orb Background */}
            <div className="absolute inset-0 z-0">
              <Orb 
                hue={0} 
                hoverIntensity={0.2} 
                rotateOnHover={true}
              />
            </div>
            
            {/* 3D Neural Network */}
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="w-full h-full">
                <Suspense fallback={<div className="w-full h-full bg-transparent" />}>
                  <Letter3D />
                </Suspense>
              </div>
            </div>
          </motion.div>

          {/* Right side - Content */}
          <div className="text-center lg:text-left space-y-6 sm:space-y-8 flex-1 w-full">
            {/* Name with shine effect */}
            <motion.div className="mb-4 sm:mb-6" variants={itemVariants}>
              <motion.p 
                className="text-xs sm:text-sm md:text-base font-medium text-gray-400 uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Portfolio of
              </motion.p>
              <motion.h2 
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-display font-bold tracking-tight text-white relative inline-block shine-effect"
                variants={titleVariants}
              >
                AADHIASARANA T
              </motion.h2>
            </motion.div>

          {/* Main Title with shimmer effect */}
          <motion.h1 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold tracking-tight leading-[1.1]"
            variants={itemVariants}
          >
            <motion.span 
              className="block mb-2 sm:mb-3 text-white shine-effect"
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
            className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-light text-gray-300 min-h-[2.5rem] sm:min-h-[3rem] flex items-center justify-center lg:justify-start"
            variants={itemVariants}
          >
            <span className="font-mono shine-effect break-words">{displayText}</span>
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
            className="flex items-center justify-center lg:justify-start gap-6 pt-12"
            variants={itemVariants}
          >
            {[
              { href: "https://github.com/AADHIASARANATAMIZHINIAN", icon: Github, label: "GitHub" },
              { href: "https://www.linkedin.com/in/aadhiasarana-t-529641328", icon: Linkedin, label: "LinkedIn" },
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
        </div>
      </motion.div>
    </section>
  )
}
