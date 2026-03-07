import { lazy, Suspense, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Linkedin, Github, Send, CheckCircle, AlertCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'

const ContactKeyboard = lazy(() => import('./keyboard/ContactKeyboard'))

const contactLinks = [
  {
    icon: Mail,
    label: 'Email',
    value: 'aadhiasarana12@gmail.com',
    href: 'mailto:aadhiasarana12@gmail.com',
    color: 'rgba(79,255,176,',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: '/in/aadhiasarana-t',
    href: 'https://www.linkedin.com/in/aadhiasarana-t-529641328',
    color: 'rgba(11,255,228,',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: '@AADHIASARANATAMIZHINIAN',
    href: 'https://github.com/AADHIASARANATAMIZHINIAN',
    color: 'rgba(123,97,255,',
  },
]

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [focused, setFocused] = useState<string | null>(null)
  const [showKeyboard, setShowKeyboard] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return
    setStatus('sending')
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const inputClass = (field: string) =>
    `w-full bg-white/[0.04] text-white placeholder-white/30 font-body text-sm rounded-xl px-4 py-3.5 outline-none transition-all duration-200 ${
      focused === field
        ? 'border border-brand/50 shadow-[0_0_0_3px_rgba(79,255,176,0.08)]'
        : 'border border-white/10 hover:border-white/20'
    }`

  return (
    <section id="contact" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section header */}
        <div className="relative mb-20">
          <span className="section-num select-none" aria-hidden="true">06</span>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.55 }}
          >
            <p className="font-mono text-xs text-brand/70 tracking-[0.2em] uppercase mb-3">Contact</p>
            <div style={{ overflow: 'hidden' }}>
              <motion.h2
                className="font-display font-bold text-white"
                style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)', letterSpacing: '0.02em', lineHeight: 0.95 }}
                initial={{ clipPath: 'inset(100% 0 0 0)', y: 20 }}
                whileInView={{ clipPath: 'inset(0% 0 0 0)', y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                Let's{' '}
                <span className="brand-gradient-text">build</span>{' '}
                together
              </motion.h2>
            </div>
            <motion.p
              className="font-body text-white/55 text-base mt-4 max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              Open to internship opportunities in AI/ML engineering, full-stack development,
              or data science roles. Response within 24 hours.
            </motion.p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">

          {/* Left — contact links */}
          <motion.div
            className="lg:col-span-2 space-y-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {contactLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.label !== 'Email' ? '_blank' : undefined}
                rel={link.label !== 'Email' ? 'noopener noreferrer' : undefined}
                className="glass glass-hover flex items-center gap-4 p-5 group"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.1 }}
                whileHover={{ x: 4 }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: `${link.color}0.10)`,
                    border: `1px solid ${link.color}0.25)`,
                  }}
                >
                  <link.icon className="w-4 h-4" style={{ color: `${link.color}0.9)` }} />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-xs text-white/40 mb-0.5">{link.label}</p>
                  <p className="font-body text-sm text-white/80 group-hover:text-white transition-colors truncate">
                    {link.value}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Right — form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass p-7 md:p-8">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="flex flex-col items-center justify-center py-12 gap-4 text-center"
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ background: 'rgba(79,255,176,0.10)', border: '1px solid rgba(79,255,176,0.25)' }}
                    >
                      <CheckCircle className="w-6 h-6 text-brand" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-white text-xl mb-2" style={{ letterSpacing: '0.02em' }}>
                        Message sent!
                      </h3>
                      <p className="font-body text-white/55 text-sm">
                        I'll get back to you within 24 hours.
                      </p>
                    </div>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-2 font-body text-sm text-brand/70 hover:text-brand transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    ref={formRef}
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-mono text-xs text-white/45 mb-1.5 block tracking-wide">YOUR NAME</label>
                        <input
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => { setFocused('name'); setShowKeyboard(true) }}
                          onBlur={() => setFocused(null)}
                          placeholder="John Smith"
                          className={inputClass('name')}
                        />
                      </div>
                      <div>
                        <label className="font-mono text-xs text-white/45 mb-1.5 block tracking-wide">EMAIL</label>
                        <input
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => { setFocused('email'); setShowKeyboard(true) }}
                          onBlur={() => setFocused(null)}
                          placeholder="john@example.com"
                          className={inputClass('email')}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-mono text-xs text-white/45 mb-1.5 block tracking-wide">MESSAGE</label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => { setFocused('message'); setShowKeyboard(true) }}
                        onBlur={() => setFocused(null)}
                        placeholder="Tell me about the opportunity..."
                        className={`${inputClass('message')} resize-none`}
                      />
                    </div>

                    {status === 'error' && (
                      <div
                        className="flex items-center gap-2 px-4 py-3 rounded-xl text-red-400 text-sm font-body"
                        style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.20)' }}
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        Something went wrong. Email me directly at aadhiasarana12@gmail.com
                      </div>
                    )}

                    <motion.button
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-body text-sm font-semibold text-black bg-brand brand-glow-btn disabled:opacity-60 disabled:cursor-not-allowed"
                      whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
                      whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
                    >
                      {status === 'sending' ? (
                        <>
                          <motion.div
                            className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* 3D Keyboard — appears when any input is focused */}
        <AnimatePresence>
          {showKeyboard && (
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 32, scale: 0.97 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8"
            >
              <Suspense
                fallback={
                  <div
                    className="w-full h-[280px] rounded-2xl flex items-center justify-center"
                    style={{ background: 'rgba(5,5,8,0.95)', border: '1px solid rgba(79,255,176,0.15)' }}
                  >
                    <span className="font-mono text-xs text-white/25 tracking-widest uppercase animate-pulse">
                      Loading 3D scene...
                    </span>
                  </div>
                }
              >
                <ContactKeyboard />
              </Suspense>
              <p className="text-center font-mono text-[10px] text-white/20 tracking-[0.2em] uppercase mt-4">
                Type in the form above · keys light up in real-time · click keys to type
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}
