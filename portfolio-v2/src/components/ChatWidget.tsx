import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { streamAnswer } from '../utils/offlineChat'

// ── Types ─────────────────────────────────────────────────────────────────────
interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

// ── Tiny ID helper ────────────────────────────────────────────────────────────
function uid() {
  return Math.random().toString(36).slice(2, 9)
}

// ── Suggestion chips ──────────────────────────────────────────────────────────
const SUGGESTIONS = [
  "Tell me about ZYCARE",
  "What are all his projects?",
  "What's his tech stack?",
  "What internships has he done?",
]

// ── SVG Icons ─────────────────────────────────────────────────────────────────
const ChatIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const SendIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
)

const BotIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4" />
    <line x1="8" y1="16" x2="8" y2="16" strokeWidth="3" />
    <line x1="12" y1="16" x2="12" y2="16" strokeWidth="3" />
    <line x1="16" y1="16" x2="16" y2="16" strokeWidth="3" />
  </svg>
)

// ── Main Component ─────────────────────────────────────────────────────────────
export default function ChatWidget() {
  const [isOpen, setIsOpen]       = useState(false)
  const [messages, setMessages]   = useState<Message[]>([])
  const [input, setInput]         = useState('')
  const [loading, setLoading]     = useState(false)
  const [showDot, setShowDot]     = useState(true)

  const bodyRef   = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLTextAreaElement>(null)
  const abortRef  = useRef<boolean>(false)

  // Init greeting
  useEffect(() => {
    setMessages([{
      id: uid(),
      role: 'assistant',
      content: "Hi! I'm AADHI — Aadhiasarana's AI assistant. I run completely offline, so I'm always instant. Ask me anything about his work, skills, or projects! 🚀",
    }])
  }, [])

  // Auto-scroll
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [messages])

  // Focus on open
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 120)
  }, [isOpen])

  const sendMessage = useCallback(async (text?: string) => {
    const userText = (text ?? input).trim()
    if (!userText || loading) return

    setShowDot(false)
    setInput('')
    setLoading(true)
    abortRef.current = false

    const userMsg: Message = { id: uid(), role: 'user', content: userText }
    const assistantId = uid()

    setMessages(prev => [
      ...prev,
      userMsg,
      { id: assistantId, role: 'assistant', content: '' },
    ])

    let fullText = ''
    for await (const chunk of streamAnswer(userText)) {
      if (abortRef.current) break
      fullText += chunk
      setMessages(prev =>
        prev.map(m => m.id === assistantId ? { ...m, content: fullText } : m)
      )
      if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }

    setLoading(false)
    inputRef.current?.focus()
  }, [input, loading])

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value)
    const ta = e.target
    ta.style.height = 'auto'
    ta.style.height = Math.min(ta.scrollHeight, 90) + 'px'
  }

  const canSend = input.trim().length > 0 && !loading
  const showSuggestions = messages.length <= 1 && !loading

  return (
    <>
      {/* ── Launcher ── */}
      <motion.button
        id="chat-launcher"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        onClick={() => setIsOpen(o => !o)}
        className="fixed bottom-6 right-6 z-[9999] flex items-center justify-center w-14 h-14 rounded-full text-[#050508] focus:outline-none"
        style={{
          background: 'linear-gradient(135deg, #4FFFB0 0%, #0BFFE4 100%)',
          boxShadow: '0 8px 32px rgba(79,255,176,0.45), 0 2px 8px rgba(0,0,0,0.4)',
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span key="close"
              initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <CloseIcon />
            </motion.span>
          ) : (
            <motion.span key="chat"
              initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <ChatIcon />
            </motion.span>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showDot && !isOpen && (
            <motion.span key="dot"
              initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
              className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2"
              style={{ background: '#FF2D78', borderColor: '#050508' }}
            />
          )}
        </AnimatePresence>
      </motion.button>

      {/* ── Panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chat-panel"
            key="panel"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="fixed bottom-24 right-6 z-[9998] flex flex-col rounded-2xl overflow-hidden"
            style={{
              width: 'min(380px, calc(100vw - 24px))',
              height: 'min(560px, calc(100vh - 110px))',
              background: 'rgba(8,8,14,0.93)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              border: '1px solid rgba(79,255,176,0.18)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)',
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex items-center justify-center w-9 h-9 rounded-xl flex-shrink-0 text-[#050508]"
                style={{ background: 'linear-gradient(135deg, #4FFFB0 0%, #0BFFE4 100%)' }}>
                <BotIcon size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-mono text-[13px] font-semibold text-white leading-none">AADHI</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#4FFFB0' }} />
                  <span className="font-body text-[11px]" style={{ color: '#4FFFB0' }}>
                    Portfolio Assistant · Offline
                  </span>
                </div>
              </div>
              {/* Offline badge */}
              <span className="font-mono text-[10px] px-2 py-1 rounded-md"
                style={{ background: 'rgba(79,255,176,0.08)', border: '1px solid rgba(79,255,176,0.2)', color: '#4FFFB0' }}>
                ⚡ instant
              </span>
            </div>

            {/* Messages */}
            <div ref={bodyRef}
              className="flex-1 overflow-y-scroll flex flex-col gap-3 px-4 py-4"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(79,255,176,0.35) rgba(255,255,255,0.04)',
                minHeight: 0,
              }}>

              {messages.map(msg => (
                <motion.div key={msg.id}
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                  className={`flex gap-2 items-end ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>

                  {msg.role === 'assistant' && (
                    <div className="flex items-center justify-center w-6 h-6 rounded-lg flex-shrink-0 mb-0.5 text-[#050508]"
                      style={{ background: 'linear-gradient(135deg, #4FFFB0 0%, #0BFFE4 100%)' }}>
                      <BotIcon size={12} />
                    </div>
                  )}

                  <div className="max-w-[78%] px-3 py-2 font-body text-[13.5px] leading-relaxed"
                    style={msg.role === 'user' ? {
                      background: 'linear-gradient(135deg, rgba(79,255,176,0.18) 0%, rgba(11,255,228,0.14) 100%)',
                      border: '1px solid rgba(79,255,176,0.28)',
                      color: 'rgba(255,255,255,0.92)',
                      borderRadius: '18px 18px 4px 18px',
                    } : {
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'rgba(255,255,255,0.88)',
                      borderRadius: '4px 18px 18px 18px',
                    }}>
                    {msg.content === '' ? (
                      <span className="inline-block w-0.5 h-3.5 rounded-full animate-pulse"
                        style={{ background: '#4FFFB0', verticalAlign: 'middle' }} />
                    ) : (
                      <span style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</span>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing dots — only while waiting for first char */}
              {loading && messages[messages.length - 1]?.content === '' && (
                <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2 items-end">
                  <div className="flex items-center justify-center w-6 h-6 rounded-lg flex-shrink-0 text-[#050508]"
                    style={{ background: 'linear-gradient(135deg, #4FFFB0 0%, #0BFFE4 100%)' }}>
                    <BotIcon size={12} />
                  </div>
                  <div className="flex items-center gap-1 px-3 py-2.5"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px 18px 18px 18px' }}>
                    {[0,1,2].map(i => (
                      <span key={i} className="w-1.5 h-1.5 rounded-full"
                        style={{ background: 'rgba(79,255,176,0.7)', animation: `bounce 1.2s ease-in-out ${i*0.18}s infinite` }} />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Suggestions */}
              {showSuggestions && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }} className="flex flex-wrap gap-2 mt-1">
                  {SUGGESTIONS.map(s => (
                    <button key={s} onClick={() => sendMessage(s)}
                      className="font-body text-[12px] px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-[1.03]"
                      style={{ background: 'rgba(79,255,176,0.07)', border: '1px solid rgba(79,255,176,0.22)', color: '#4FFFB0' }}>
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="flex items-end gap-2 px-3 py-3 flex-shrink-0"
              style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <textarea
                ref={inputRef} id="chat-input" rows={1} value={input}
                onChange={handleInput} onKeyDown={handleKeyDown}
                placeholder="Ask me anything…" disabled={loading}
                className="flex-1 resize-none font-body text-[13.5px] rounded-xl px-3 py-2 focus:outline-none leading-relaxed"
                style={{
                  background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.10)',
                  color: 'rgba(255,255,255,0.9)', maxHeight: 90, caretColor: '#4FFFB0',
                }}
                onFocus={e => { e.target.style.borderColor = 'rgba(79,255,176,0.45)' }}
                onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.10)' }}
              />
              <motion.button id="chat-send" aria-label="Send message"
                disabled={!canSend} onClick={() => sendMessage()}
                className="flex items-center justify-center w-9 h-9 rounded-xl flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: canSend ? 'linear-gradient(135deg, #4FFFB0 0%, #0BFFE4 100%)' : 'rgba(255,255,255,0.08)',
                  color: canSend ? '#050508' : 'rgba(255,255,255,0.4)',
                }}
                whileHover={canSend ? { scale: 1.08 } : {}}
                whileTap={canSend ? { scale: 0.92 } : {}}>
                <SendIcon />
              </motion.button>
            </div>

            <div className="text-center font-body text-[10.5px] pb-2" style={{ color: 'rgba(255,255,255,0.20)' }}>
              Offline AI · Built by Aadhiasarana T
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
