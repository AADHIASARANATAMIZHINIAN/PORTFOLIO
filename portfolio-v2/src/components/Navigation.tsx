import { useState, useEffect } from 'react'
import { scrollToSection } from '../utils/scroll'

interface NavigationProps {
  activeSection: string
}

const links = [
  { id: 'about',      label: 'About'   },
  { id: 'projects',   label: 'Work'    },
  { id: 'skills',     label: 'Stack'   },
  { id: 'experience', label: 'Journey' },
  { id: 'contact',    label: 'Contact' },
]

export default function Navigation({ activeSection }: NavigationProps) {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [hovered, setHovered]     = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    const onLenis  = (e: Event) =>
      setScrolled((e as CustomEvent<{ scroll: number }>).detail.scroll > 40)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('lenis-scroll', onLenis)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('lenis-scroll', onLenis)
    }
  }, [])

  const go = (id: string) => {
    scrollToSection(id)
    setMenuOpen(false)
  }

  return (
    <>
      {/* ── Top bar ── */}
      <nav style={{
        position:       'fixed',
        top: 0, left: 0, right: 0,
        zIndex:         50,
        height:         '64px',
        display:        'flex',
        alignItems:     'center',
        padding:        '0 32px',
        background:     scrolled ? 'rgba(5,5,8,0.82)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)'        : 'none',
        borderBottom:   scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
        transition:     'background 0.3s, border-color 0.3s',
        boxSizing:      'border-box',
      }}>

        {/* Logo */}
        <button
          onClick={() => go('hero')}
          style={{
            fontFamily:  'Clash Display, sans-serif',
            fontWeight:  700,
            fontSize:    '20px',
            color:       '#ffffff',
            letterSpacing: '-0.04em',
            background:  'none',
            border:      'none',
            cursor:      'pointer',
            padding:     0,
            marginRight: 'auto',
            transition:  'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#4FFFB0')}
          onMouseLeave={e => (e.currentTarget.style.color = '#ffffff')}
        >
          AT
        </button>

        {/* Desktop links */}
        <ul style={{
          display:    'none',
          alignItems: 'center',
          gap:        '4px',
          listStyle:  'none',
          margin:     0,
          padding:    0,
        }} className="md-flex">
          {links.map(link => {
            const active = activeSection === link.id
            const hover  = hovered === link.id
            return (
              <li key={link.id}>
                <button
                  onClick={() => go(link.id)}
                  onMouseEnter={() => setHovered(link.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    position:    'relative',
                    padding:     '8px 18px',
                    background:  hover ? 'rgba(79,255,176,0.10)' : 'transparent',
                    border:      hover ? '1px solid rgba(79,255,176,0.22)' : '1px solid transparent',
                    borderRadius: '8px',
                    cursor:      'pointer',
                    fontFamily:  'DM Sans, sans-serif',
                    fontSize:    '14px',
                    color:       active ? '#4FFFB0' : hover ? '#4FFFB0' : 'rgba(255,255,255,0.5)',
                    transition:  'background 0.2s, border-color 0.2s, color 0.2s',
                  }}
                >
                  {link.label}
                  {active && (
                    <span style={{
                      position:    'absolute',
                      bottom:      '2px',
                      left:        '50%',
                      transform:   'translateX(-50%)',
                      width:       '4px',
                      height:      '4px',
                      borderRadius: '50%',
                      background:  '#4FFFB0',
                    }} />
                  )}
                </button>
              </li>
            )
          })}
        </ul>

        {/* Hire me */}
        <button
          onClick={() => go('contact')}
          className="md-hire"
          style={{
            marginLeft:   '16px',
            padding:      '8px 16px',
            borderRadius: '8px',
            fontFamily:   'DM Sans, sans-serif',
            fontSize:     '14px',
            fontWeight:   500,
            color:        '#4FFFB0',
            background:   'rgba(79,255,176,0.08)',
            border:       '1px solid rgba(79,255,176,0.30)',
            cursor:       'pointer',
            display:      'none',
            transition:   'box-shadow 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 20px rgba(79,255,176,0.35)')}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
        >
          Hire me
        </button>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(p => !p)}
          className="md-hide"
          aria-label="Menu"
          style={{
            background: 'none',
            border:     'none',
            cursor:     'pointer',
            padding:    '6px',
            display:    'flex',
            flexDirection: 'column',
            gap:        '5px',
            marginLeft: 'auto',
          }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display:      'block',
              width:        '22px',
              height:       '2px',
              background:   'rgba(255,255,255,0.7)',
              borderRadius: '2px',
              transition:   'transform 0.25s, opacity 0.25s',
              transform:
                menuOpen && i === 0 ? 'rotate(45deg) translate(5px,5px)'  :
                menuOpen && i === 2 ? 'rotate(-45deg) translate(5px,-5px)' : 'none',
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* ── Mobile dropdown ── */}
      <div style={{
        position:       'fixed',
        top:            '68px',
        left:           '16px',
        right:          '16px',
        zIndex:         49,
        background:     'rgba(5,5,8,0.90)',
        backdropFilter: 'blur(24px)',
        border:         '1px solid rgba(255,255,255,0.09)',
        borderRadius:   '16px',
        padding:        '16px',
        display:        menuOpen ? 'block' : 'none',
      }} className="md-hide">
        {links.map(link => (
          <button
            key={link.id}
            onClick={() => go(link.id)}
            style={{
              display:      'block',
              width:        '100%',
              textAlign:    'left',
              padding:      '12px 16px',
              borderRadius: '10px',
              background:   activeSection === link.id ? 'rgba(79,255,176,0.10)' : 'transparent',
              border:       'none',
              cursor:       'pointer',
              fontFamily:   'DM Sans, sans-serif',
              fontSize:     '16px',
              color:        activeSection === link.id ? '#4FFFB0' : 'rgba(255,255,255,0.6)',
              marginBottom: '2px',
            }}
          >
            {link.label}
          </button>
        ))}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '8px', paddingTop: '8px' }}>
          <button
            onClick={() => go('contact')}
            style={{
              display:      'block',
              width:        '100%',
              padding:      '12px 16px',
              borderRadius: '10px',
              fontFamily:   'DM Sans, sans-serif',
              fontSize:     '14px',
              fontWeight:   600,
              color:        '#4FFFB0',
              background:   'rgba(79,255,176,0.10)',
              border:       '1px solid rgba(79,255,176,0.28)',
              cursor:       'pointer',
            }}
          >
            Hire me
          </button>
        </div>
      </div>

      {/* Inject nav-specific CSS once */}
      <style>{`
        @media (min-width: 768px) {
          .md-flex  { display: flex !important; }
          .md-hire  { display: block !important; }
          .md-hide  { display: none !important; }
        }
      `}</style>
    </>
  )
}
