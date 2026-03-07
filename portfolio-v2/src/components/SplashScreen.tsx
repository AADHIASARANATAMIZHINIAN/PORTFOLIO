import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SplashScreenProps {
  onComplete: () => void
}

// Shared name content — rendered twice (top + bottom clip)
function NameBlock() {
  return (
    <div style={{
      position:       'absolute',
      inset:          0,
      display:        'flex',
      flexDirection:  'column',
      alignItems:     'center',
      justifyContent: 'center',
      textAlign:      'center',
    }}>
      <div style={{
        fontFamily:    'Clash Display, sans-serif',
        fontWeight:    700,
        fontSize:      'clamp(2rem, 7vw, 5.2rem)',
        color:         '#ffffff',
        letterSpacing: '0.07em',
        lineHeight:    1,
        textShadow:    '0 0 60px rgba(255,255,255,0.18)',
        position:      'relative',
        zIndex:        1,
      }}>AADHIASARANA</div>

      <div style={{
        fontFamily:    'Clash Display, sans-serif',
        fontWeight:    700,
        fontSize:      'clamp(0.9rem, 2.8vw, 2rem)',
        color:         'rgba(255,255,255,0.38)',
        letterSpacing: '0.5em',
        marginTop:     '5px',
        position:      'relative',
        zIndex:        1,
      }}>T</div>

      <div style={{
        marginTop:     '18px',
        fontFamily:    'JetBrains Mono, monospace',
        fontSize:      'clamp(8px, 1vw, 10px)',
        letterSpacing: '0.32em',
        color:         'rgba(255,255,255,0.18)',
        textTransform: 'uppercase',
        position:      'relative',
        zIndex:        1,
      }}>AI · Full-Stack · Data Science</div>
    </div>
  )
}

// Three slashes at ~60° (\ direction, steep diagonal)
const SLASHES = [
  { angle: '62deg',  top: '48%', delay: 0,    h: 3,   bright: '#ffffff',              glow: 'rgba(255,255,255,0.90)' },
  { angle: '58deg',  top: '42%', delay: 0.07, h: 1.5, bright: 'rgba(220,240,255,0.75)', glow: 'rgba(200,230,255,0.60)' },
  { angle: '66deg',  top: '54%', delay: 0.13, h: 1,   bright: 'rgba(255,255,255,0.55)', glow: 'rgba(255,255,255,0.40)' },
] as const

// Clip polygons matching the ~62° \ diagonal through the name container.
// Container ~720 wide × 220 tall, slash through centre:
//   top entry  ≈ 44% from left  (y = 0)
//   btm exit   ≈ 56% from left  (y = 100%)
const TOP_CLIP = 'polygon(0 0, 44% 0, 56% 100%, 0 100%)'   // left trapezoid
const BTM_CLIP = 'polygon(44% 0, 100% 0, 100% 100%, 56% 100%)' // right trapezoid

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  // 0=black 1=name 2=slashes 3=cut+freeze 4=tbc 5=exit
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1),  130),
      setTimeout(() => setPhase(2),  460),
      setTimeout(() => setPhase(3),  760),
      setTimeout(() => setPhase(4), 1580),
      setTimeout(() => { setPhase(5); setTimeout(onComplete, 400) }, 2500),
    ]
    return () => t.forEach(clearTimeout)
  }, [onComplete])

  const cut = phase >= 3

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeIn' }}
      style={{
        position:       'fixed',
        inset:          0,
        zIndex:         9999,
        background:     '#000000',
        overflow:       'hidden',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
      }}
    >

      {/* ── Name (two clipped halves that drift apart) ── */}
      <AnimatePresence>
        {phase >= 1 && phase < 5 && (
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              zIndex:   10,
              width:    'min(720px, 90vw)',
              height:   'clamp(160px, 26vw, 240px)',
            }}
          >
            {/* LEFT half — drifts left + up after cut */}
            <motion.div
              animate={{ x: cut ? -10 : 0, y: cut ? -8 : 0 }}
              transition={{ duration: 0.30, ease: [0.16, 1, 0.3, 1], delay: 0.04 }}
              style={{ position: 'absolute', inset: 0, clipPath: TOP_CLIP, overflow: 'hidden' }}
            >
              <NameBlock />
            </motion.div>

            {/* RIGHT half — drifts right + down after cut */}
            <motion.div
              animate={{ x: cut ? 10 : 0, y: cut ? 8 : 0 }}
              transition={{ duration: 0.30, ease: [0.16, 1, 0.3, 1], delay: 0.04 }}
              style={{ position: 'absolute', inset: 0, clipPath: BTM_CLIP, overflow: 'hidden' }}
            >
              <NameBlock />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Three diagonal sword slashes ── */}
      {SLASHES.map((s, i) => (
        <AnimatePresence key={i}>
          {phase >= 2 && phase < 5 && (
            <motion.div
              initial={{ scaleX: 0, opacity: 1 }}
              animate={{ scaleX: 1, opacity: cut ? 0 : 1 }}
              transition={{
                scaleX:  { duration: 0.18, delay: s.delay, ease: [0.2, 1, 0.2, 1] },
                opacity: { duration: 0.38, delay: s.delay + 0.16 },
              }}
              style={{
                position:        'absolute',
                top:             s.top,
                left:            '-6%',
                width:           '112%',
                height:          `${s.h}px`,
                background:      `linear-gradient(90deg, transparent 0%, ${s.glow} 12%, ${s.bright} 50%, ${s.glow} 88%, transparent 100%)`,
                transform:       `rotate(${s.angle}) translateY(-50%)`,
                transformOrigin: 'left center',
                boxShadow:       `0 0 22px 8px ${s.glow}, 0 0 80px 24px rgba(200,235,255,0.12)`,
                pointerEvents:   'none',
              }}
            />
          )}
        </AnimatePresence>
      ))}

      {/* ── Impact flash ── */}
      <AnimatePresence>
        {phase === 2 && (
          <motion.div
            initial={{ opacity: 0.70 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.28, delay: 0.13 }}
            style={{
              position:      'absolute',
              inset:         0,
              background:    'rgba(255,255,255,0.22)',
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Freeze-frame sepia wash ── */}
      <AnimatePresence>
        {phase >= 3 && phase < 5 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.15, 0.08] }}
            transition={{ duration: 0.40, times: [0, 0.25, 1] }}
            style={{
              position:     'absolute',
              inset:        0,
              background:   'rgba(230,155,40,0.22)',
              mixBlendMode: 'multiply' as const,
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>

      {/* ── "To Be Continued ►" ── */}
      <AnimatePresence>
        {phase >= 4 && phase < 5 && (
          <motion.div
            initial={{ opacity: 0, x: 55 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{
              position:   'absolute',
              bottom:     '52px',
              right:      '44px',
              display:    'flex',
              alignItems: 'center',
              gap:        '11px',
            }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width:           '32px',
                height:          '2px',
                background:      '#e8a820',
                transformOrigin: 'left',
                flexShrink:      0,
              }}
            />
            <span style={{
              fontFamily:    'Clash Display, sans-serif',
              fontWeight:    700,
              fontSize:      'clamp(10px, 1.3vw, 13px)',
              letterSpacing: '0.20em',
              color:         '#e8a820',
              textTransform: 'uppercase' as const,
              whiteSpace:    'nowrap',
            }}>
              To Be Continued
            </span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 20 C4 8, 14 3, 20 8" stroke="#e8a820" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              <polygon points="20,8 15,5.5 15.5,11" fill="#e8a820" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Vignette ── */}
      <div
        aria-hidden
        style={{
          position:      'absolute',
          inset:         0,
          background:    'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 38%, rgba(0,0,0,0.85) 100%)',
          pointerEvents: 'none',
        }}
      />
    </motion.div>
  )
}
