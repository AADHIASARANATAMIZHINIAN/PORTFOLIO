import { useEffect, useState } from 'react'
import Navigation from './components/Navigation.tsx'
import Hero from './components/Hero.tsx'
import About from './components/About.tsx'
import Projects from './components/Projects.tsx'
import Skills from './components/Skills.tsx'
import Experience from './components/Experience.tsx'
import Contact from './components/Contact.tsx'
import Footer from './components/Footer.tsx'
import Particles from './components/Particles.tsx'
import SmoothScroll from './components/SmoothScroll.tsx'
import SplashScreen from './components/SplashScreen.tsx'

function App() {
  const [activeSection, setActiveSection] = useState('hero')
  const [showSplash, setShowSplash] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detect mobile devices
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]')
      const scrollY = window.scrollY

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 100
        const sectionHeight = (section as HTMLElement).offsetHeight
        const sectionId = section.getAttribute('id') || ''

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          setActiveSection(sectionId)
        }
      })
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        } else {
          entry.target.classList.remove('visible')
        }
      })
    }, observerOptions)

    const animatedElements = document.querySelectorAll('.animate-on-scroll')
    animatedElements.forEach((el) => observer.observe(el))

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', checkMobile)
      animatedElements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  const handleSplashComplete = () => {
    setShowSplash(false)
  }

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      
      <SmoothScroll>
        <div className="relative min-h-screen text-white font-body bg-[#0a0a0a]">
          {/* Particle background - optimized for mobile */}
          <div className="fixed inset-0 z-0 w-full h-full pointer-events-none">
            <Particles 
              particleCount={isMobile ? 150 : 300}
              particleColors={['#9c43ff', '#4cc9f0', '#ffffff']}
              particleSpread={10}
              speed={isMobile ? 0.3 : 0.5}
              alphaParticles={true}
              particleBaseSize={isMobile ? 60 : 80}
              sizeRandomness={1}
              cameraDistance={20}
              disableRotation={isMobile}
              className=""
            />
          </div>
          <div className="relative z-10">
            <Navigation activeSection={activeSection} />
            <main>
              <Hero />
              <About />
              <Projects />
              <Skills />
              <Experience />
              <Contact />
            </main>
            <Footer />
          </div>
        </div>
      </SmoothScroll>
    </>
  )
}

export default App
