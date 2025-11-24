import { useEffect } from 'react'
import { motion } from 'framer-motion'

interface SplashScreenProps {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 3500) // Reduced from 4500ms

    return () => clearTimeout(timer)
  }, [onComplete])

  const letters = ['A', 'A', 'D', 'H', 'I', 'A', 'S', 'A', 'R', 'A', 'N', 'A']

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 2.8 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden touch-none"
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      {/* Pure black background */}
      <div className="absolute inset-0 bg-black" />

      {/* Main text container */}
      <div className="relative flex items-center justify-center gap-0.5 sm:gap-1 md:gap-2 px-4">
        {/* Letter animations */}
        {letters.map((letter, index) => (
          <motion.div
            key={index}
            initial={{ 
              opacity: 0,
              x: index % 2 === 0 ? -50 - (index * 10) : 50 + (index * 10),
              y: index % 3 === 0 ? -40 : index % 3 === 1 ? 40 : 0,
              rotate: index % 2 === 0 ? -90 : 90,
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
              duration: 0.8,
              delay: index * 0.08,
              ease: [0.6, 0.05, 0.01, 0.9]
            }}
          >
            <motion.span
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black text-white block"
              style={{
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                WebkitFontSmoothing: 'antialiased',
              }}
            >
              {letter}
            </motion.span>
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
          duration: 1.2,
          delay: 1.5,
          ease: [0.6, 0.05, 0.01, 0.9]
        }}
        className="absolute top-1/2 left-1/2 w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32"
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
          className="w-full h-full border-2 sm:border-3 md:border-4 border-white"
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
          duration: 1.2,
          delay: 1.7,
          ease: [0.6, 0.05, 0.01, 0.9]
        }}
        className="absolute top-1/2 left-1/2 w-14 sm:w-16 md:w-20 h-14 sm:h-16 md:h-20"
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
          className="w-full h-full border sm:border-2 border-white opacity-50"
          style={{ 
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
          }}
        />
      </motion.div>
      
      {/* Expanding ring */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: [0, 60],
          opacity: [0.5, 0]
        }}
        transition={{
          duration: 2,
          delay: 2.5,
          ease: [0.65, 0, 0.35, 1]
        }}
        className="absolute top-1/2 left-1/2 w-8 h-8 rounded-full border border-white"
        style={{ 
          transform: 'translate(-50%, -50%)',
        }}
      />
    </motion.div>
  )
}




