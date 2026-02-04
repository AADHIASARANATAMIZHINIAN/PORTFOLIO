import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface OrbitItem {
  id: number
  name: string
  src: string
}

interface RadialIntroProps {
  orbitItems: OrbitItem[]
}

export const RadialIntro = ({ orbitItems }: RadialIntroProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const centerX = isMobile ? 200 : 300
  const centerY = isMobile ? 200 : 300
  const orbitRadius = isMobile ? 120 : 200

  return (
    <div className="w-full min-h-96 md:min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      {/* Background Glow */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neutral-700/30 rounded-full blur-3xl"></div>
      </div>

      <div
        ref={containerRef}
        className="relative w-full max-w-3xl aspect-square flex items-center justify-center"
      >
        {/* Central Circle */}
        <motion.div
          className="absolute w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/30 flex items-center justify-center backdrop-blur-sm"
          animate={{
            boxShadow: [
              '0 0 20px rgba(255, 255, 255, 0.2)',
              '0 0 40px rgba(255, 255, 255, 0.3)',
              '0 0 20px rgba(255, 255, 255, 0.2)',
            ],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className="text-center">
            <h3 className="text-lg md:text-2xl font-bold text-white mb-2">Skills</h3>
            <p className="text-xs md:text-sm text-gray-400">Tech Stack</p>
          </div>
        </motion.div>

        {/* Orbiting Items */}
        {orbitItems.map((item, index) => {
          const angle = (index / orbitItems.length) * Math.PI * 2
          const x = Math.cos(angle) * orbitRadius
          const y = Math.sin(angle) * orbitRadius

          return (
            <motion.div
              key={item.id}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                translateX: '-50%',
                translateY: '-50%',
              }}
              animate={{
                x: [x * 0.9, x, x * 1.1],
                y: [y * 0.9, y, y * 1.1],
              }}
              transition={{
                duration: 3 + index * 0.2,
                repeat: Infinity,
                type: 'sine',
              }}
            >
              <motion.div
                className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/30 hover:border-white/60 flex items-center justify-center cursor-pointer transition-all duration-300 backdrop-blur-sm group hover:shadow-lg hover:shadow-white/30"
                whileHover={{
                  scale: 1.2,
                  borderColor: 'rgba(255, 255, 255, 1)',
                  boxShadow: '0 0 30px rgba(255, 255, 255, 0.4)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={item.src}
                  alt={item.name}
                  className="w-10 h-10 md:w-12 md:h-12 object-contain filter brightness-90 group-hover:brightness-110 transition-all"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </motion.div>

              {/* Label */}
              <motion.div
                className="absolute top-full mt-2 text-center text-xs md:text-sm font-medium text-gray-400 whitespace-nowrap pointer-events-none group-hover:text-white"
                style={{ left: '50%', translateX: '-50%' }}
              >
                {item.name}
              </motion.div>
            </motion.div>
          )
        })}

        {/* Orbit Lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
          viewBox={`0 0 ${centerX * 2} ${centerY * 2}`}
        >
          <circle
            cx={centerX}
            cy={centerY}
            r={orbitRadius * 0.9}
            fill="none"
            stroke="url(#orbitGradient)"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
          <circle
            cx={centerX}
            cy={centerY}
            r={orbitRadius}
            fill="none"
            stroke="url(#orbitGradient)"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
          <defs>
            <linearGradient
              id="orbitGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: '#888888', stopOpacity: 0.3 }} />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Bottom Text */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-xs md:text-sm text-gray-500">Hover over technologies to explore</p>
      </div>
    </div>
  )
}
