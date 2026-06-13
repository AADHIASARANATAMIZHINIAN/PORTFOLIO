import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from './components/Navigation.tsx'
import Hero from './components/Hero.tsx'
import About from './components/About.tsx'
import Projects from './components/Projects.tsx'
import Skills from './components/Skills.tsx'
import Experience from './components/Experience.tsx'
import CurrentlyBuilding from './components/CurrentlyBuilding.tsx'
import Contact from './components/Contact.tsx'
import Footer from './components/Footer.tsx'
import SmoothScroll from './components/SmoothScroll.tsx'

// Aurora background blobs — fixed, slowly drifting
const auroraBlobs = [
  {
    color: 'radial-gradient(ellipse, rgba(123,97,255,0.18) 0%, transparent 70%)',
    size: '700px',
    initial: { x: '-10%', y: '5%' },
    animate: { x: ['−10%', '5%', '−8%'], y: ['5%', '20%', '5%'] },
    duration: 22,
  },
  {
    color: 'radial-gradient(ellipse, rgba(11,255,228,0.13) 0%, transparent 70%)',
    size: '600px',
    initial: { x: '60%', y: '60%' },
    animate: { x: ['60%', '70%', '55%'], y: ['60%', '45%', '60%'] },
    duration: 18,
  },
  {
    color: 'radial-gradient(ellipse, rgba(255,45,120,0.10) 0%, transparent 70%)',
    size: '500px',
    initial: { x: '75%', y: '10%' },
    animate: { x: ['75%', '65%', '78%'], y: ['10%', '25%', '10%'] },
    duration: 26,
  },
  {
    color: 'radial-gradient(ellipse, rgba(79,255,176,0.09) 0%, transparent 70%)',
    size: '450px',
    initial: { x: '20%', y: '70%' },
    animate: { x: ['20%', '30%', '18%'], y: ['70%', '80%', '70%'] },
    duration: 20,
  },
]

function App() {
  const [activeSection, setActiveSection] = useState('hero')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)

    // IntersectionObserver for active nav section (works with Lenis)
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.getAttribute('id') || 'hero')
          }
        })
      },
      { threshold: 0.15, rootMargin: '-5% 0px -35% 0px' }
    )
    const sectionEls = document.querySelectorAll('section[id]')
    sectionEls.forEach((el) => sectionObserver.observe(el))

    return () => {
      window.removeEventListener('resize', checkMobile)
      sectionEls.forEach((el) => sectionObserver.unobserve(el))
    }
  }, [])

  const content = (
    <div className="relative min-h-screen text-white bg-[#050508]">
      {/* Aurora background layer */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {auroraBlobs.map((blob, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: blob.size,
              height: blob.size,
              background: blob.color,
              filter: 'blur(80px)',
              left: blob.initial.x,
              top: blob.initial.y,
              transform: 'translate(-50%,-50%)',
            }}
            animate={{
              x: blob.animate.x,
              y: blob.animate.y,
            }}
            transition={{
              duration: blob.duration,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Floating kanji — global, fixed layer */}
        {[
          { char: '技', x: '5%',  dur: 18, delay: 0   },
          { char: '未', x: '14%', dur: 15, delay: 3   },
          { char: '来', x: '24%', dur: 21, delay: 6.5 },
          { char: '創', x: '33%', dur: 16, delay: 1.5 },
          { char: '知', x: '42%', dur: 23, delay: 9   },
          { char: '学', x: '52%', dur: 17, delay: 4   },
          { char: '道', x: '61%', dur: 20, delay: 7.5 },
          { char: '夢', x: '70%', dur: 14, delay: 2   },
          { char: '力', x: '79%', dur: 19, delay: 5.5 },
          { char: '心', x: '88%', dur: 22, delay: 11  },
          { char: '革', x: '9%',  dur: 25, delay: 13  },
          { char: '新', x: '47%', dur: 13, delay: 8   },
          { char: '知', x: '95%', dur: 18, delay: 15  },
          { char: '速', x: '57%', dur: 16, delay: 10  },
          { char: '光', x: '76%', dur: 24, delay: 17  },
        ].map(({ char, x, dur, delay }) => (
          <span
            key={`${char}-${x}`}
            className="kanji-char absolute bottom-0 font-display text-5xl text-white"
            style={{
              left: x,
              animationDuration: `${dur}s`,
              animationDelay: `${delay}s`,
              opacity: 0,
            }}
          >
            {char}
          </span>
        ))}
      </div>

      <div className="relative z-10">
        <Navigation activeSection={activeSection} />
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Experience />
          <CurrentlyBuilding />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )

  return isMobile ? content : <SmoothScroll>{content}</SmoothScroll>
}

export default App
