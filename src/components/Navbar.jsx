import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/images/Logo.png'

const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'The Problem', href: '/#problem' },
  { label: "What we're Building", href: '/#programs' },
  { label: 'Community', href: '/#community' },
  { label: 'Get Involved', href: '/#involved' },
  { label: 'Contact', href: '/contact' },
]

function LogoMark() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <rect width="36" height="36" rx="9" fill="#6B4E8C" />
      <circle cx="18" cy="15" r="5" stroke="white" strokeWidth="1.8" fill="none" />
      <path d="M12.5 14c-2.5 0-4 2-4 4s2 3.5 4 3.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <path d="M23.5 14c2.5 0 4 2 4 4s-2 3.5-4 3.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <line x1="15.5" y1="22" x2="15.5" y2="26" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="20.5" y1="22" x2="20.5" y2="26" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="15.5" y1="26" x2="20.5" y2="26" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="25" cy="9" r="3.5" fill="#E8C547" />
    </svg>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header
      role="banner"
      className={`sticky top-0 z-50 transition-shadow duration-200 ${scrolled ? 'shadow-sm' : ''}`}
      style={{ backgroundColor: '#F5F0E8', borderBottom: '1px solid #E2DAC8' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-3.5">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label="Mindfully Aware home">
          <LogoMark />
          <span className="font-heading font-bold text-lg leading-none" style={{ color: '#1B3A2D' }}>
            Mindfully Aware
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7" aria-label="Main navigation">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm font-medium transition-opacity duration-150 hover:opacity-60 whitespace-nowrap"
              style={{ color: '#1B3A2D' }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <button
            className="text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-opacity hover:opacity-80"
            style={{ backgroundColor: '#1E4D35' }}
          >
            Support Our Mission
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 -mr-1.5 rounded-md"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#1B3A2D" strokeWidth="1.8" strokeLinecap="round">
            {open ? (
              <>
                <line x1="17" y1="5" x2="5" y2="17" />
                <line x1="5" y1="5" x2="17" y2="17" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="19" y2="6" />
                <line x1="3" y1="11" x2="19" y2="11" />
                <line x1="3" y1="16" x2="19" y2="16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-screen' : 'max-h-0'}`}
        style={{ backgroundColor: '#F5F0E8', borderTop: open ? '1px solid #E2DAC8' : 'none' }}
        aria-hidden={!open}
      >
        <div className="px-4 py-4 space-y-0.5">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
              style={{ color: '#1B3A2D' }}
            >
              {label}
            </a>
          ))}
          <div className="pt-3 mt-1" style={{ borderTop: '1px solid #E2DAC8' }}>
            <button
              className="w-full mt-2 text-white text-sm font-semibold px-5 py-3 rounded-lg"
              style={{ backgroundColor: '#1E4D35' }}
            >
              Support Our Mission
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
