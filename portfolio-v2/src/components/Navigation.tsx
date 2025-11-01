import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface NavigationProps {
  activeSection: string
}

export default function Navigation({ activeSection }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ]

  const handleMenuClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/40 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#hero"
            className="text-lg md:text-xl font-display font-bold tracking-tight hover:opacity-80 transition-opacity relative z-50"
            onClick={handleMenuClick}
          >
            AADHIASARANA T
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  activeSection === item.id
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://drive.google.com/file/d/YOUR_RESUME_ID/view"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-6 py-2 bg-white text-black text-sm font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300"
            >
              Resume
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            type="button"
            title="Toggle mobile menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors relative z-50"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
    </nav>

    {/* Mobile Menu Overlay */}
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed inset-0 z-40 md:hidden bg-dark-900/95 backdrop-blur-lg"
        >
          <div className="flex flex-col items-center justify-center h-full space-y-8 px-6">
            {navItems.map((item, index) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                onClick={handleMenuClick}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`text-2xl font-display font-bold tracking-tight transition-colors ${
                  activeSection === item.id
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.label}
              </motion.a>
            ))}
            
            <motion.a
              href="https://drive.google.com/file/d/YOUR_RESUME_ID/view"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleMenuClick}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navItems.length * 0.1 }}
              className="mt-8 px-8 py-3 bg-white text-black text-lg font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300"
            >
              View Resume
            </motion.a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}
