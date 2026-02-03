import { useState } from 'react'
import { Mail, Linkedin, Github, Send } from 'lucide-react'
import emailjs from '@emailjs/browser'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      // EmailJS configuration
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'aadhiasarana12@gmail.com',
      }

      await emailjs.send(
        'service_yr9d955',      // Your Service ID
        'template_fekvnvc',      // Your Template ID
        templateParams,
        'mPg_S69Pd9pdjx4vp'      // Your Public Key
      )

      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      console.error('Email sending error:', error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Label */}
        <div className="animate-on-scroll mb-16">
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            [05] Let's Connect
          </span>
        </div>

        {/* Section Title */}
        <div className="animate-on-scroll mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight max-w-4xl">
            Let's collaborate on{' '}
            <span className="text-gray-500">something amazing</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column - Contact Info */}
          <div className="animate-on-scroll space-y-12">
            <div>
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                Interested in collaborating on a project or just want to chat about tech and AI? 
                Drop me a message—I'd love to connect! 🚀
              </p>

              <div className="space-y-6">
                <a
                  href="mailto:aadhiasarana12@gmail.com"
                  className="flex items-center gap-4 text-lg hover:text-cyan-300 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center group-hover:from-cyan-500/40 group-hover:to-purple-500/40 transition-all border border-cyan-500/30 group-hover:border-purple-500/50">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span>aadhiasarana12@gmail.com</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/aadhiasarana-t-529641328"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-lg hover:text-cyan-300 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center group-hover:from-cyan-500/40 group-hover:to-purple-500/40 transition-all border border-cyan-500/30 group-hover:border-purple-500/50">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <span>LinkedIn Profile</span>
                </a>

                <a
                  href="https://github.com/AADHIASARANATAMIZHINIAN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-lg hover:text-cyan-300 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center group-hover:from-cyan-500/40 group-hover:to-purple-500/40 transition-all border border-cyan-500/30 group-hover:border-purple-500/50">
                    <Github className="w-5 h-5" />
                  </div>
                  <span>GitHub Profile</span>
                </a>
              </div>
            </div>

            {/* Availability Badge */}
            <div className="bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-transparent backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-8 hover:border-purple-500/50 transition-all shadow-lg group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-green-400 animate-pulse"></div>
                <span className="font-semibold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent group-hover:from-cyan-200 group-hover:to-purple-200">
                  Available for Work
                </span>
              </div>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                I'm currently open to new opportunities and exciting projects. Let's
                build something amazing together!
              </p>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="animate-on-scroll">
            {status === 'success' ? (
              <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-8 text-center">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-gray-400">
                  Thank you for reaching out. I'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 text-base bg-dark-800/20 backdrop-blur-sm border border-white/10 rounded-lg focus:outline-none focus:border-white/30 focus:bg-dark-800/30 transition-colors"
                    placeholder="John Doe"
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 text-base bg-dark-800/20 backdrop-blur-sm border border-white/10 rounded-lg focus:outline-none focus:border-white/30 focus:bg-dark-800/30 transition-colors"
                    placeholder="john@example.com"
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 text-base bg-dark-800/20 backdrop-blur-sm border border-white/10 rounded-lg focus:outline-none focus:border-white/30 focus:bg-dark-800/30 transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full px-8 py-4 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                >
                  <span>
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                  </span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
