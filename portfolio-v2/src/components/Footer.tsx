import { useEffect, useState } from 'react'
import { Github, Linkedin, Mail, Heart, Instagram } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const innovativeQuotes = [
  {
    quote: "Code is poetry written in logic.",
    author: "— The Developer's Creed"
  },
  {
    quote: "Innovation distinguishes between a leader and a follower.",
    author: "— Steve Jobs"
  },
  {
    quote: "The best way to predict the future is to invent it.",
    author: "— Alan Kay"
  },
  {
    quote: "AI is not about replacing humans, it's about augmenting human capabilities.",
    author: "— Fei-Fei Li"
  },
  {
    quote: "First, solve the problem. Then, write the code.",
    author: "— John Johnson"
  },
  {
    quote: "The only way to do great work is to love what you do.",
    author: "— Steve Jobs"
  },
  {
    quote: "Every great developer you know got there by solving problems they were unqualified to solve.",
    author: "— Patrick McKenzie"
  },
  {
    quote: "Learning never exhausts the mind.",
    author: "— Leonardo da Vinci"
  },
  {
    quote: "The beautiful thing about learning is that no one can take it away from you.",
    author: "— B.B. King"
  },
  {
    quote: "Technology is best when it brings people together.",
    author: "— Matt Mullenweg"
  }
]

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % innovativeQuotes.length)
    }, 5000) // Change quote every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <footer className="relative py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Left - Branding */}
          <div className="space-y-4">
            <h3 className="text-2xl font-display font-bold">AADHIASARANA T</h3>
            <p className="text-gray-400">
              AI & Data Science student exploring AI/ML, web development, and building cool stuff! 🚀
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/AADHIASARANATAMIZHINIAN"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/aadhiasaranat"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/__aadhiasarana_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:aadhiasarana12@gmail.com"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Middle & Right - Rotating Quotes */}
          <div className="md:col-span-2 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuoteIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-4"
              >
                <p className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white leading-relaxed">
                  "{innovativeQuotes[currentQuoteIndex].quote}"
                </p>
                <p className="text-lg text-gray-400 font-light">
                  {innovativeQuotes[currentQuoteIndex].author}
                </p>
                {/* Quote indicator dots */}
                <div className="flex items-center justify-center gap-2 pt-4">
                  {innovativeQuotes.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentQuoteIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentQuoteIndex 
                          ? 'bg-white w-8' 
                          : 'bg-white/30 hover:bg-white/50'
                      }`}
                      aria-label={`Go to quote ${index + 1}`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom - Copyright */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>
              © {currentYear} AADHIASARANA T. All rights reserved.
            </p>
            <p className="flex items-center gap-2">
              Made with <Heart className="w-4 h-4 text-red-500" fill="currentColor" /> and lots of coffee
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
