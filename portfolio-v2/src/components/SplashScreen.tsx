import { useEffect } from 'react'
import { motion } from 'framer-motion'

interface SplashScreenProps {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 4500)

    return () => clearTimeout(timer)
  }, [onComplete])

  const letters = ['A', 'A', 'D', 'H', 'I', 'A', 'S', 'A', 'R', 'A', 'N', 'A']

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, delay: 3.8 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden"
    >
      {/* Pure black background */}
      <div className="absolute inset-0 bg-black" />

      {/* Main text container */}
      <div className="relative flex items-center justify-center gap-1 md:gap-2">
        {/* Letter animations - coming from different directions and joining */}
        {letters.map((letter, index) => (
          <motion.div
            key={index}
            initial={{ 
              opacity: 0,
              x: index % 2 === 0 ? -100 - (index * 20) : 100 + (index * 20),
              y: index % 3 === 0 ? -80 : index % 3 === 1 ? 80 : 0,
              rotate: index % 2 === 0 ? -180 : 180,
              scale: 0
            }}
            animate={{ 
              opacity: 1,
              x: 0,
              y: 0,
              rotate: 0,
              scale: 1
            }}
            transition={{
              duration: 1.2,
              delay: index * 0.12,
              ease: [0.6, 0.05, 0.01, 0.9]
            }}
            className="relative"
          >
            {/* Pixel-style letter with geometric shapes */}
            <motion.div
              initial={{ filter: 'blur(10px)' }}
              animate={{ filter: 'blur(0px)' }}
              transition={{
                duration: 0.8,
                delay: index * 0.12 + 0.4,
              }}
            >
              <motion.span
                animate={{
                  textShadow: [
                    '0 0 20px rgba(255, 255, 255, 0)',
                    '0 0 40px rgba(255, 255, 255, 0.6)',
                    '0 0 20px rgba(255, 255, 255, 0)'
                  ]
                }}
                transition={{
                  duration: 2,
                  delay: index * 0.12 + 1.5,
                  repeat: Infinity,
                  repeatDelay: 0.5
                }}
                className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white"
                style={{
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.02em',
                  textRendering: 'geometricPrecision',
                  WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)',
                }}
              >
                {letter}
              </motion.span>

              {/* Connecting line animation between letters */}
              {index < letters.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 0.3 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.12 + 0.8,
                    ease: 'easeOut'
                  }}
                  className="absolute top-1/2 -right-1 md:-right-2 w-1 md:w-2 h-[2px] bg-white origin-left"
                  style={{ transform: 'translateY(-50%)' }}
                />
              )}
            </motion.div>

            {/* Geometric pixel decorations */}
            <motion.div
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: [0, 1.5, 1], rotate: 360 }}
              transition={{
                duration: 0.8,
                delay: index * 0.12 + 0.3,
                ease: 'backOut'
              }}
              className="absolute -top-1 -right-1 w-1 h-1 bg-white opacity-50"
              style={{
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Rotating hexagon loader */}
      <motion.div
        initial={{ scale: 0, rotate: 0, opacity: 0 }}
        animate={{ 
          scale: [0, 1.2, 1],
          rotate: 360,
          opacity: [0, 1, 1]
        }}
        transition={{
          duration: 1.5,
          delay: 2,
          ease: [0.6, 0.05, 0.01, 0.9]
        }}
        className="absolute top-1/2 left-1/2 w-32 h-32"
        style={{ 
          transform: 'translate(-50%, -50%)',
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="w-full h-full border-4 border-white"
          style={{ 
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
          }}
        />
      </motion.div>
      
      {/* Inner rotating hexagon */}
      <motion.div
        initial={{ scale: 0, rotate: 0, opacity: 0 }}
        animate={{ 
          scale: [0, 1.2, 1],
          rotate: -360,
          opacity: [0, 1, 1]
        }}
        transition={{
          duration: 1.5,
          delay: 2.2,
          ease: [0.6, 0.05, 0.01, 0.9]
        }}
        className="absolute top-1/2 left-1/2 w-20 h-20"
        style={{ 
          transform: 'translate(-50%, -50%)',
        }}
      >
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="w-full h-full border-2 border-white opacity-50"
          style={{ 
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
          }}
        />
      </motion.div>
      
      {/* Pulsing corner accents */}
      {[0, 90, 180, 270].map((rotation, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1, 1, 0],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 2,
            delay: 2.5 + (i * 0.1),
            ease: 'easeInOut'
          }}
          className="absolute top-1/2 left-1/2"
          style={{ 
            transform: `translate(-50%, -50%) rotate(${rotation}deg) translateY(-80px)`,
          }}
        >
          <div className="w-3 h-3 bg-white" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }} />
        </motion.div>
      ))}
      
      {/* Expanding ring */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: [0, 80],
          opacity: [0.5, 0]
        }}
        transition={{
          duration: 2.5,
          delay: 3,
          ease: [0.65, 0, 0.35, 1]
        }}
        className="absolute top-1/2 left-1/2 w-8 h-8 rounded-full border border-white"
        style={{ 
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Subtle scanline effect */}
      <motion.div
        initial={{ y: '-100%' }}
        animate={{ y: '100%' }}
        transition={{
          duration: 2,
          delay: 0.5,
          repeat: 1,
          ease: 'linear'
        }}
        className="absolute left-0 w-full h-1 bg-gradient-to-b from-transparent via-white to-transparent opacity-10"
      />

      {/* Pixel grid overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
            backgroundSize: '8px 8px'
          }}
        />
      </div>
    </motion.div>
  )
}





