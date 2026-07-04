import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useForm, ValidationError } from '@formspree/react'
import { usePaystackPayment } from 'react-paystack'
import heroImg from '../images/hero-page-girl.png'
import communityGirl from '../images/community-girl.png'
import logo from '../images/logo.png';

/* ═══════════════════════════════════════════════════════════════════════════
   SHARED ICON COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */

function IcoHeart({ size = 15, filled = false }) {
  const d = 'M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z'
  return filled
    ? <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><path d={d} /></svg>
    : <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
}

function IcoSend({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}

function IcoCheck({ size = 16, color = '#E8C547' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ stroke: color }} aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function IcoArrowRight({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

function IcoEnvelope({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

function IcoFacebook({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  )
}

function IcoLinkedIn({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function IcoInstagram({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function IcoTwitterX({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4l16 16M20 4L4 20" />
    </svg>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   LOGO MARK
   ═══════════════════════════════════════════════════════════════════════════ */

function LogoMark({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" fill="none" aria-hidden="true">
      <path d="M7 15C7 9 12 5 17 7C13 9 11 13 13 19C9 19 7 17 7 15Z" fill="#7C3AED" />
      <path d="M23 15C23 21 18 25 13 23C17 21 19 17 17 11C21 11 23 13 23 15Z" fill="#2D7A5F" />
    </svg>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   REUSABLE SCROLL REVEAL WRAPPER
   ═══════════════════════════════════════════════════════════════════════════ */

function RevealOnScroll({ children, delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay }}
    >
      {children}
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   ANIMATED COUNTER HOOK + STAT COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

function useCountUp(from = 0, to, duration = 1800) {
  const [count, setCount] = useState(from)
  const ref = useRef(null)
  const fired = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true
          observer.disconnect()
          const start = performance.now()
          const range = to - from
          const tick = (now) => {
            const p = Math.min((now - start) / duration, 1)
            const ease = 1 - Math.pow(1 - p, 3)
            setCount(Math.round(from + ease * range))
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [from, to, duration])

  return [count, ref]
}

function StatCounter({ prefix = '', from = 0, to, suffix = '', label }) {
  const [count, ref] = useCountUp(from, to)
  return (
    <div ref={ref} className="text-center py-10 px-6">
      <p className="font-heading mb-2" style={{ color: '#2D7A5F', fontSize: '56px', fontWeight: 700 }}>
        {prefix}{count}{suffix}
      </p>
      <p className="leading-snug max-w-[160px] mx-auto" style={{ color: '#4A6358', fontSize: '16px' }}>
        {label}
      </p>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   NAVBAR DATA
   ═══════════════════════════════════════════════════════════════════════════ */

const NAV_LINKS = [
  { label: 'About',               href: '#our-story'     },
  { label: 'The Problem',         href: '#problem'       },
  { label: "What we're Building", href: '#building'      },
  { label: 'Community',           href: '#voices'        },
  { label: 'Get Involved',        href: '#get-involved'  },
  { label: 'Contact',             href: '#contact'       },
]

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION DATA CONSTANTS
   ═══════════════════════════════════════════════════════════════════════════ */

const PROBLEM_CARDS = [
  {
    title: 'Mental Health Stigma',
    body: 'Silence is taught early. Asking for help is mistaken for weakness.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'Burnout & Urban Stress',
    body: 'Hustle culture demands more than minds and bodies can give.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    title: 'Financial Barriers',
    body: 'Therapy is often inaccessible to those who need it most.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v2m0 8v2m-2.5-6.5c.5-1.5 1.5-2 2.5-2s2.5.7 2.5 2c0 2-2.5 2-2.5 4" />
      </svg>
    ),
  },
  {
    title: 'Lack of Awareness',
    body: "Many do not have the language to name what they're feeling.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </svg>
    ),
  },
  {
    title: 'Fear of Judgment',
    body: 'From family, religious spaces, to workplaces, the cost of speaking up feels too high.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: 'Silent Emotional Struggles',
    body: 'Functioning well is not the same as feeling well.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
]

const ALONE_QUOTES = [
  'Healing begins when people feel safe enough to be seen.',
  "Your feelings are valid, even the ones you can't name yet.",
  'Small steps still count. Showing up is enough today.',
]

const BUILDING_CARDS = [
  {
    title: 'Mental Health Awareness',
    body: 'Stories, campaigns and education that normalize the conversation.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 11l19-9-9 19-2-8-8-2z" />
      </svg>
    ),
  },
  {
    title: 'Peer Support Communities',
    body: 'Small, safe circles where lived experience meets compassion.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: 'Safe Conversations',
    body: 'Moderated spaces to be heard without judgment.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    title: 'Volunteer Network',
    body: 'Trained community members supporting outreach, content and events.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
        <path d="M16 3.5a2.5 2.5 0 010 5" />
      </svg>
    ),
  },
  {
    title: 'Mental Health Resources',
    body: 'Accessible guides, toolkits and signposting in plain, kind language.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5v-15A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5z" />
      </svg>
    ),
  },
  {
    title: 'Future Therapist Partnerships',
    body: "We're building a network to make affordable professional care possible.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
]

const CAROUSEL_TESTIMONIALS = [
  {
    quote: "Therapy felt like a luxury I couldn't justify. Finding this community reminded me I'm not weak for needing help.",
    attribution: 'Anonymous, 24',
  },
  {
    quote: 'For the first time, someone asked me how I was doing and actually waited for the answer.',
    attribution: 'Anonymous, 31',
  },
  {
    quote: "I didn't know healing could feel like coming home. This space gave me that.",
    attribution: 'Anonymous, 27',
  },
]

const SOCIAL_PLATFORMS = [
  { label: 'Facebook',   icon: <IcoFacebook /> },
  { label: 'LinkedIn',   icon: <IcoLinkedIn /> },
  { label: 'Instagram',  icon: <IcoInstagram /> },
  { label: 'Twitter / X', icon: <IcoTwitterX /> },
]

const SOCIAL_POSTS = [
  { platform: 'Instagram', text: "It's okay to outgrow rooms that no longer feel safe. Healing is allowed to be quiet.", count: '1,284' },
  { platform: 'Instagram', text: "It's okay to outgrow rooms that no longer feel safe. Healing is allowed to be quiet.", count: '892'   },
  { platform: 'Instagram', text: "It's okay to outgrow rooms that no longer feel safe. Healing is allowed to be quiet.", count: '2,107' },
]

const INVOLVE_CARDS = [
  {
    title: 'Volunteer',
    body: 'Lend your time, skill or empathy.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
      </svg>
    ),
  },
  {
    title: 'Become a Partner',
    body: "Brands, NGO's, Faith & academic institutions.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    title: 'Collaborate With Us',
    body: 'Creators, therapists & educators.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: 'Donate',
    body: 'Fund safer spaces and outreach programs.',
    icon: <IcoHeart size={16} />,
  },
  {
    title: 'Join Future Programs',
    body: 'Be the first to know about pilots & circles.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
]

const FORM_TABS = [
  { key: 'volunteer',     label: 'Volunteer Sign-Up'     },
  { key: 'partner',       label: 'Partner Sign-Up'       },
  { key: 'collaboration', label: 'Collaboration Sign-Up' },
]

const FORM_ENDPOINTS = {
  volunteer: 'xeebgolb',
  partner: 'mqevqayw',
  collaboration: 'mwvdopwp',
};

const BLOG_POSTS = [
  {
    category: 'Awareness',
    title: 'What burnout looks like in young African professionals.',
    readTime: '5 min read',
    imgSrc: 'https://placehold.co/560x315/2D5A3D/A8C4B8?text=Young+professional+at+desk',
    imgAlt: 'Young professional at a desk looking exhausted',
  },
  {
    category: 'Resource',
    title: 'How to talk to family about therapy (without losing them)',
    readTime: '5 min read',
    imgSrc: 'https://placehold.co/560x315/4F6F5C/D4DECE?text=Family+conversation+about+mental+health',
    imgAlt: 'Family having a meaningful conversation about mental health',
  },
  {
    category: 'Story',
    title: "I thought I was just tired until I wasn't",
    readTime: '5 min read',
    imgSrc: 'https://placehold.co/560x315/3A5547/B8CFC4?text=Person+reflecting+by+window',
    imgAlt: 'Person sitting quietly by a window, reflecting',
  },
]

const BLOG_CATEGORY_COLOR = {
  Awareness: '#2D7A5F',
  Resource:  '#C9784A',
  Story:     '#7C3AED',
}

const EMPTY_CONTACT_FORM = { name: '', email: '', message: '' }

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION: NAVBAR
   ═══════════════════════════════════════════════════════════════════════════ */

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const close = () => setOpen(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      animate={{
        boxShadow: scrolled
          ? '0 2px 20px rgba(27, 58, 45, 0.08)'
          : '0 0px 0px rgba(0,0,0,0)',
      }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 px-8 md:px-12 min-h-[138px] flex flex-col justify-center"
      style={{ backgroundColor: '#FEFAF1' }}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <a href="#" onClick={close} className="flex items-center gap-[10px] shrink-0">
          <img
            className='mr-4'
                           src={logo}
                           alt='Mindfully Aware logo'
                           style={{
                             height: '48px',
                             width: 'auto',
                             objectFit: 'contain',
                           }}
                         />
        </a>

        {/* Desktop: nav links + // + CTA */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="whitespace-nowrap transition-opacity hover:opacity-70"
              style={{ color: '#3A5446' }}
            >
              {label}
            </a>
          ))}
          <span
            aria-hidden="true"
            className="select-none"
            style={{ color: '#A0B0A8', fontStyle: 'italic', fontWeight: 300, fontSize: '1.2rem', letterSpacing: '0.06em' }}
          >
            //
          </span>
          <a
            href="#donate"
            className="text-sm font-semibold px-5 py-3 rounded-lg text-white whitespace-nowrap transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#2D5A3D' }}
          >
            Support Our Mission
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg focus:outline-none"
          onClick={() => setOpen(prev => !prev)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ stroke: '#1B3A2D' }}>
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ stroke: '#1B3A2D' }}>
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden py-3" style={{ borderTop: '1px solid #E2DAC8' }}>
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={close}
              className="block px-1 py-3 transition-opacity hover:opacity-60"
              style={{ color: '#1B3A2D', borderBottom: '1px solid #F0EBE0' }}
            >
              {label}
            </a>
          ))}
          <a
            href="#donate"
            onClick={close}
            className="block mt-4 py-3 text-sm font-semibold rounded-lg text-center text-white"
            style={{ backgroundColor: '#2D5A3D' }}
          >
            Support Our Mission
          </a>
        </div>
      )}
    </motion.nav>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION: HERO
   ═══════════════════════════════════════════════════════════════════════════ */

function HeroQuoteCard() {
  return (
    <div
      className="bg-white rounded-xl shadow-lg px-5 py-4"
      style={{ maxWidth: '260px' }}
    >
      <p className="text-sm font-medium mb-3" style={{ color: '#1B3A2D' }}>
        "Healing starts with being heard."
      </p>
      <div className="flex items-center gap-2">
        <div className="flex -space-x-1.5" aria-hidden="true">
          {['#2D7A5F', '#E8C547', '#C17A4A'].map(bg => (
            <div key={bg} className="w-6 h-6 rounded-full border-2 border-white" style={{ backgroundColor: bg }} />
          ))}
        </div>
        <span className="text-xs" style={{ color: '#6B8A7A' }}>community voices</span>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      style={{ backgroundColor: '#FEFAF1' }}
      className="pt-12 pb-12 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* Left column */}
        <div>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 border"
            style={{ borderColor: '#C8BDAA' }}
          >
            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: '#2D7A5F' }} aria-hidden="true" />
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8A9A8E" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="text-sm font-medium" style={{ color: '#3A5446' }}>
              A registered African mental health nonprofit
            </span>
          </motion.div>

          {/* Headline — each line slides up independently */}
          <h1
            id="hero-heading"
            className="font-heading mb-8"
            style={{ color: '#1B3A2D', fontSize: '72px', fontWeight: 800, lineHeight: 1.08 }}
          >
            <motion.span
              style={{ display: 'block' }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            >
              Because struggling
            </motion.span>
            <motion.span
              style={{ display: 'block' }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.25 }}
            >
              <span style={{ position: 'relative', display: 'inline-block' }}>
                <span style={{ position: 'relative', zIndex: 1 }}>in silence</span>
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute', bottom: '4px', left: 0, right: 0,
                    height: '8px', backgroundColor: '#E8C547', zIndex: 0, borderRadius: '3px',
                  }}
                />
              </span>
            </motion.span>
            <motion.span
              style={{ display: 'block' }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.35 }}
            >
              shouldn't be{' '}
              <em style={{ color: '#2D7A5F', fontStyle: 'italic', fontWeight: 800 }}>normal</em>
            </motion.span>
          </h1>

          {/* Body copy */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
            className="mb-10 text-justify"
            style={{ color: '#4A6358', maxWidth: '480px', lineHeight: '1.7', fontSize: '18px' }}
          >
            Mindfully Aware is building safe, accessible mental health support systems for African
            communities through awareness, education, community support, and meaningful conversations
            around mental wellbeing.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.65 }}
            className="flex flex-wrap gap-4"
          >
            <motion.a
              href="#community-social"
              className="inline-flex items-center gap-2 text-white font-semibold rounded-full"
              style={{ backgroundColor: '#2D5A3D', fontSize: '16px', padding: '14px 32px' }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
              </svg>
              Join Our Community
            </motion.a>
            <motion.a
              href="#donate"
              className="inline-flex items-center gap-2 font-semibold rounded-full border-2"
              style={{ color: '#2D5A3D', borderColor: '#2D5A3D', fontSize: '16px', padding: '14px 32px' }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#2D5A3D" stroke="none" aria-hidden="true">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
              Support Us
            </motion.a>
          </motion.div>
        </div>

        {/* Right column — image + floating quote card */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="rounded-2xl overflow-hidden"
            style={{ aspectRatio: '4/3' }}
          >
            <motion.img
              src={heroImg}
              alt="Smiling African woman with community members in background"
              className="w-full h-full object-cover"
              width={600}
              height={450}
              loading="eager"
              decoding="sync"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </motion.div>

          {/* Desktop: float outside bottom-right of image */}
          <motion.div
            className="hidden md:block absolute"
            style={{ bottom: '-24px', right: '16px' }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.8 }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
            >
              <HeroQuoteCard />
            </motion.div>
          </motion.div>

          {/* Mobile: stacks below image */}
          <div className="md:hidden mt-4">
            <HeroQuoteCard />
          </div>
        </div>

      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION: STATS BAR
   ═══════════════════════════════════════════════════════════════════════════ */

function StatsBar() {
  const stats = [
    { prefix: '1 in ', from: 1, to: 4,   suffix: '',  label: 'Africans face mental health challenges' },
    { prefix: '< ',   from: 1, to: 4,   suffix: '%', label: 'Have access to professional care'       },
    { prefix: '',     from: 0, to: 100, suffix: '%', label: 'Deserve to be heard'                    },
  ]
  return (
    <div style={{ borderTop: '1px solid #D4CAB8', borderBottom: '1px solid #D4CAB8', backgroundColor: '#FEFAF1' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={i < 2 ? 'border-b md:border-b-0 md:border-r' : ''}
            style={{ borderColor: '#E2DAC8' }}
          >
            <RevealOnScroll delay={i * 0.15}>
              <StatCounter {...s} />
            </RevealOnScroll>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION: OUR STORY
   ═══════════════════════════════════════════════════════════════════════════ */

function OurStory() {
  return (
    <section
      id="our-story"
      aria-labelledby="story-heading"
      style={{ backgroundColor: '#FEFAF1' }}
      className="py-20 px-4"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left — image + floating quote card */}
        <RevealOnScroll>
          <div className="relative pb-16">
            <div className="rounded-3xl overflow-hidden shadow-lg" style={{ height: '440px' }}>
              <motion.img
                src={communityGirl}
                alt="Smiling African woman, portrait photo representing the Mindfully Aware community story"
                className="w-full h-full object-cover"
                width={580}
                height={720}
                loading="lazy"
                decoding="async"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
            <div
              className="absolute right-4 bottom-4 z-10 bg-white rounded-xl shadow-lg p-5"
              style={{ maxWidth: '270px' }}
            >
              <p className="text-sm leading-relaxed" style={{ color: '#1B3A2D' }}>
                "The first time someone said 'me too' I finally exhaled."
              </p>
            </div>
          </div>
        </RevealOnScroll>

        {/* Right — text content */}
        <RevealOnScroll delay={0.15}>
          <div>
            <p className="uppercase mb-5" style={{ color: '#2D7A5F', fontSize: '12px', fontWeight: 600, letterSpacing: '0.15em' }}>
              Our Story
            </p>
            <h2
              id="story-heading"
              className="font-heading mb-8"
              style={{ color: '#1B3A2D', fontSize: '52px', fontWeight: 800, lineHeight: 1.1 }}
            >
              Born from our own<br />journey to freedom.
            </h2>
            <div className="space-y-5 mb-10">
              {[
                'Mindfully Aware was born from a journey to freedom. A freedom that revealed just how heavy the pain we had been carrying truly was.',
                'The thought of others carrying that same weight alone, without support or safe spaces to be heard, became the motivation behind this journey.',
                'We believe that letting go creates room for healing, growth, and freedom. Through Mindfully Aware, we hope to be part of that journey for others too.',
              ].map(para => (
                <p key={para.slice(0, 20)} className="leading-relaxed text-justify" style={{ color: '#5A7068', fontSize: '17px' }}>
                  {para}
                </p>
              ))}
            </div>
            <p className="text-base font-bold" style={{ color: '#1B3A2D' }}>
              We are building the support we wish we had together.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION: THE PROBLEM
   ═══════════════════════════════════════════════════════════════════════════ */

function ProblemSection() {
  return (
    <section
      id="problem"
      aria-labelledby="problem-heading"
      style={{ backgroundColor: '#F9F4E3' }}
      className="py-20 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <div className="mb-12">
            <p className="uppercase mb-4" style={{ color: '#8A9A8E', fontSize: '12px', fontWeight: 600, letterSpacing: '0.15em' }}>
              What We're Up Against
            </p>
            <h2
              id="problem-heading"
              className="font-heading mb-5"
              style={{ color: '#1B3A2D', fontSize: '52px', fontWeight: 800, lineHeight: 1.1 }}
            >
              The weight too many<br />carry quietly.
            </h2>
            <p className="leading-relaxed max-w-xs" style={{ color: '#5A7068', fontSize: '17px' }}>
              Mental health challenges across Africa are real, common and largely unsupported.
              Naming them is the first step to changing them.
            </p>
          </div>
        </RevealOnScroll>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROBLEM_CARDS.map(({ title, body, icon }, index) => (
            <RevealOnScroll key={title} delay={index * 0.1}>
              <motion.article
                className="bg-white rounded-xl p-5 border"
                style={{ borderColor: '#E2DAC8' }}
                whileHover={{
                  y: -6,
                  boxShadow: '0 16px 40px rgba(27, 58, 45, 0.12)',
                  transition: { duration: 0.25, ease: 'easeOut' },
                }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center mb-4 shrink-0"
                  style={{ backgroundColor: '#EDEAE4', color: '#5A7068' }}
                >
                  {icon}
                </div>
                <h3 className="font-heading mb-1.5" style={{ color: '#1B3A2D', fontSize: '17px', fontWeight: 700 }}>{title}</h3>
                <p className="leading-relaxed" style={{ color: '#5A7068', fontSize: '14px', lineHeight: 1.6 }}>{body}</p>
              </motion.article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION: YOU ARE NOT ALONE
   ═══════════════════════════════════════════════════════════════════════════ */

function NotAloneSection() {
  return (
    <section
      id="not-alone"
      aria-labelledby="not-alone-heading"
      style={{ backgroundColor: '#FEFAF1' }}
      className="py-28 px-4"
    >
      <div className="max-w-3xl mx-auto text-center">
        <RevealOnScroll>
          <div>
            <div className="flex justify-center mb-8" aria-hidden="true">
              <svg width="48" height="56" viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 52C24 52 4 40 4 22C4 11.5 13 3 24 3C35 3 44 11.5 44 22C44 40 24 52 24 52Z" stroke="#8A9A8E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M24 52V22" stroke="#8A9A8E" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M24 30C24 30 14 26 12 18" stroke="#8A9A8E" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <h2
              id="not-alone-heading"
              className="font-heading mb-12"
              style={{ color: '#1B3A2D', fontSize: '64px', fontWeight: 800, lineHeight: 1.1 }}
            >
              You do not have to carry
              <br />
              <em style={{ color: '#2D7A5F', fontStyle: 'italic', fontWeight: 800 }}>everything</em>
              {' '}
              <span style={{ color: '#1B3A2D' }}>alone.</span>
            </h2>
          </div>
        </RevealOnScroll>

        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 items-stretch">
            {ALONE_QUOTES.map((quote, i) => (
              <RevealOnScroll key={i} delay={i * 0.1}>
                <div
                  className="bg-white rounded-xl border px-6 py-6 flex items-center justify-center"
                  style={{ borderColor: '#E2DAC8' }}
                >
                  <p className="text-sm italic leading-relaxed text-center" style={{ color: '#4A6358' }}>
                    "{quote}"
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION: WHAT WE'RE BUILDING
   ═══════════════════════════════════════════════════════════════════════════ */

function BuildingSection() {
  return (
    <section
      id="building"
      aria-labelledby="building-heading"
      style={{ backgroundColor: '#F9F4E3' }}
      className="py-20 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <div className="mb-12">
            <p className="uppercase mb-4" style={{ color: '#8A9A8E', fontSize: '12px', fontWeight: 600, letterSpacing: '0.15em' }}>
              What We're Building
            </p>
            <h2
              id="building-heading"
              className="font-heading mb-5"
              style={{ color: '#1B3A2D', fontSize: '52px', fontWeight: 800, lineHeight: 1.1 }}
            >
              Support systems,<br />rooted in community.
            </h2>
            <p className="leading-relaxed max-w-xs" style={{ color: '#5A7068', fontSize: '17px' }}>
              We're early and growing. Here's what's taking shape with our community, volunteers and partners.
            </p>
          </div>
        </RevealOnScroll>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BUILDING_CARDS.map(({ title, body, icon }, index) => (
            <RevealOnScroll key={title} delay={index * 0.1}>
              <motion.article
                className="bg-white rounded-xl p-5 border flex flex-col"
                style={{ borderColor: '#E2DAC8' }}
                whileHover={{
                  y: -6,
                  boxShadow: '0 16px 40px rgba(27, 58, 45, 0.12)',
                  transition: { duration: 0.25, ease: 'easeOut' },
                }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-4 shrink-0"
                  style={{ backgroundColor: '#F5E6A8', color: '#1B3A2D' }}
                >
                  {icon}
                </div>
                <h3 className="font-heading mb-1.5" style={{ color: '#1B3A2D', fontSize: '17px', fontWeight: 700 }}>{title}</h3>
                <p className="leading-relaxed mb-4 flex-1" style={{ color: '#5A7068', fontSize: '14px', lineHeight: 1.6 }}>{body}</p>
                <div className="flex items-center gap-1.5 mt-auto">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: '#2D7A5F' }} aria-hidden="true" />
                  <span className="text-xs font-medium" style={{ color: '#2D7A5F' }}>Actively growing</span>
                </div>
              </motion.article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION: VOICES FROM OUR COMMUNITY
   ═══════════════════════════════════════════════════════════════════════════ */

function VoicesBanner() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setActive(prev => (prev + 1) % CAROUSEL_TESTIMONIALS.length), 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section
      id="voices"
      aria-labelledby="voices-heading"
      style={{ backgroundColor: '#547563' }}
      className="py-20 px-4"
    >
      <div className="max-w-2xl mx-auto text-center">
        <RevealOnScroll>
          <div>
            <p className="uppercase mb-6" style={{ color: '#E8C547', fontSize: '12px', fontWeight: 600, letterSpacing: '0.15em' }}>
              Dear Anonymous
            </p>
            <h2
              id="voices-heading"
              className="font-heading text-white mb-3"
              style={{ fontSize: '52px', fontWeight: 800, lineHeight: 1.1 }}
            >
              Voices from our community.
            </h2>
            <p className="text-sm mb-10" style={{ color: '#D4DECE' }}>
              Stories shared with permission, names withheld with care.
            </p>
          </div>
        </RevealOnScroll>

        <div
          className="font-heading font-extrabold leading-none mb-3 select-none"
          style={{ color: '#E8C547', fontSize: '4rem' }}
          aria-hidden="true"
        >
          &#8220;
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <blockquote
              className="italic leading-relaxed text-white mb-5 mx-auto text-center"
              style={{ maxWidth: '560px', fontSize: '22px' }}
            >
              {CAROUSEL_TESTIMONIALS[active].quote}
            </blockquote>
            <p className="text-sm mb-10" style={{ color: '#D4DECE' }}>
              {CAROUSEL_TESTIMONIALS[active].attribution}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-2.5" role="tablist" aria-label="Testimonials">
          {CAROUSEL_TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={active === i}
              aria-label={`Testimonial ${i + 1}`}
              onClick={() => setActive(i)}
              className="w-2 h-2 rounded-full transition-opacity duration-300 focus:outline-none"
              style={{ backgroundColor: '#FFFFFF', opacity: active === i ? 1 : 0.35 }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION: COMMUNITY & SOCIAL
   ═══════════════════════════════════════════════════════════════════════════ */

function CommunityAndSocial() {
  return (
    <section
      id="community-social"
      aria-labelledby="social-heading"
      style={{ backgroundColor: '#FEFAF1' }}
      className="py-20 px-4"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left */}
        <RevealOnScroll>
          <div>
            <p className="uppercase mb-4" style={{ color: '#8A9A8E', fontSize: '12px', fontWeight: 600, letterSpacing: '0.15em' }}>
              Community &amp; Social
            </p>
            <h2
              id="social-heading"
              className="font-heading mb-5"
              style={{ color: '#1B3A2D', fontSize: '52px', fontWeight: 800, lineHeight: 1.1 }}
            >
              The conversation is<br />already happening.
            </h2>
            <p className="leading-relaxed mb-8" style={{ color: '#5A7068', maxWidth: '380px', fontSize: '17px' }}>
              Follow along, share your story, or just lurk quietly, that's okay too.
              Every voice helps soften the silence.
            </p>
            <div className="flex flex-wrap gap-2">
              {SOCIAL_PLATFORMS.map(({ label, icon }) => (
                <motion.button
                  key={label}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-medium focus:outline-none"
                  style={{ borderColor: '#E2DAC8', color: '#1B3A2D', backgroundColor: '#FFFFFF' }}
                  whileHover={{ scale: 1.05, backgroundColor: '#E8F5EE' }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                >
                  {icon}
                  {label}
                </motion.button>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Right — stacked social post cards */}
        <div className="flex flex-col gap-3">
          {SOCIAL_POSTS.map(({ platform, text, count }, i) => (
            <RevealOnScroll key={i} delay={i * 0.1}>
              <article className="bg-white rounded-xl border p-4" style={{ borderColor: '#E2DAC8' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full shrink-0" style={{ backgroundColor: '#4F6F5C' }} aria-hidden="true" />
                  <div>
                    <p className="text-xs font-bold leading-tight" style={{ color: '#1B3A2D' }}>@mindfullyaware</p>
                    <p className="text-xs" style={{ color: '#8A9A8E' }}>{platform}</p>
                  </div>
                </div>
                <p className="text-xs leading-relaxed mb-3" style={{ color: '#1B3A2D' }}>{text}</p>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1.5" aria-hidden="true">
                    <div className="w-5 h-5 rounded-full border-2 border-white" style={{ backgroundColor: '#2D7A5F' }} />
                    <div className="w-5 h-5 rounded-full border-2 border-white" style={{ backgroundColor: '#E8C547' }} />
                  </div>
                  <span className="text-xs font-bold" style={{ color: '#1B3A2D' }}>{count}</span>
                  <span className="text-xs" style={{ color: '#8A9A8E' }}>community voices</span>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SIGN-UP FORM (Formspree)
   ═══════════════════════════════════════════════════════════════════════════ */

function SignUpForm({ endpointId, tabLabel }) {
  const [state, handleSubmit] = useForm(endpointId)

  if (state.succeeded) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 px-8"
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: '#EFF7F2' }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M6 16l7 7 13-13" stroke="#2D7A5F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3
          className="font-bold mb-2"
          style={{ fontSize: '20px', color: '#1B3A2D', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Thank you for signing up!
        </h3>
        <p style={{ fontSize: '15px', color: '#5A7068' }}>
          We've received your {tabLabel} application. We'll be in touch within 48 hours.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="inv-name" className="block text-sm font-medium mb-1.5" style={{ color: '#1B3A2D' }}>
            Full Name
          </label>
          <input
            id="inv-name"
            type="text"
            name="name"
            required
            placeholder="Your full name"
            className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-shadow"
            style={{ border: '1px solid #C8BDAA', backgroundColor: 'white', color: '#1B3A2D', fontSize: '15px' }}
            onFocus={e => { e.target.style.boxShadow = '0 0 0 3px rgba(45,122,95,0.15)' }}
            onBlur={e => { e.target.style.boxShadow = 'none' }}
          />
          <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-xs mt-1" />
        </div>
        <div>
          <label htmlFor="inv-email" className="block text-sm font-medium mb-1.5" style={{ color: '#1B3A2D' }}>
            Email Address
          </label>
          <input
            id="inv-email"
            type="email"
            name="email"
            required
            placeholder="your@email.com"
            className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-shadow"
            style={{ border: '1px solid #C8BDAA', backgroundColor: 'white', color: '#1B3A2D', fontSize: '15px' }}
            onFocus={e => { e.target.style.boxShadow = '0 0 0 3px rgba(45,122,95,0.15)' }}
            onBlur={e => { e.target.style.boxShadow = 'none' }}
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs mt-1" />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="inv-city" className="block text-sm font-medium mb-1.5" style={{ color: '#1B3A2D' }}>
          City / Country
        </label>
        <input
          id="inv-city"
          type="text"
          name="city"
          placeholder="e.g. Lagos, Nigeria"
          className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-shadow"
          style={{ border: '1px solid #C8BDAA', backgroundColor: 'white', color: '#1B3A2D', fontSize: '15px' }}
          onFocus={e => { e.target.style.boxShadow = '0 0 0 3px rgba(45,122,95,0.15)' }}
          onBlur={e => { e.target.style.boxShadow = 'none' }}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="inv-message" className="block text-sm font-medium mb-1.5" style={{ color: '#1B3A2D' }}>
          {tabLabel === 'Volunteer'
            ? 'Why would you like to volunteer?'
            : tabLabel === 'Partner'
            ? 'How would you like to partner with us?'
            : 'What would you like to collaborate on?'}
        </label>
        <textarea
          id="inv-message"
          name="message"
          rows={4}
          required
          placeholder="Tell us a little about yourself and your interest..."
          className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-shadow resize-none"
          style={{ border: '1px solid #C8BDAA', backgroundColor: 'white', color: '#1B3A2D', fontSize: '15px' }}
          onFocus={e => { e.target.style.boxShadow = '0 0 0 3px rgba(45,122,95,0.15)' }}
          onBlur={e => { e.target.style.boxShadow = 'none' }}
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-xs mt-1" />
      </div>

      <input type="hidden" name="form_type" value={tabLabel} />

      <motion.button
        type="submit"
        disabled={state.submitting}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white transition-opacity"
        style={{
          backgroundColor: state.submitting ? '#547563' : '#2D5A3D',
          fontSize: '15px',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          cursor: state.submitting ? 'not-allowed' : 'pointer',
        }}
      >
        {state.submitting ? (
          <>
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeDasharray="30 70" />
            </svg>
            Sending...
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            Send Message
          </>
        )}
      </motion.button>
    </form>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION: GET INVOLVED
   ═══════════════════════════════════════════════════════════════════════════ */

const TAB_LABEL = { volunteer: 'Volunteer', partner: 'Partner', collaboration: 'Collaboration' }

function GetInvolvedSection() {
  const [activeTab, setActiveTab] = useState('volunteer')

  return (
    <section
      id="get-involved"
      aria-labelledby="involved-heading"
      style={{ backgroundColor: '#F9F4E3' }}
      className="py-20 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <div className="mb-10">
            <p className="uppercase mb-4" style={{ color: '#8A9A8E', fontSize: '12px', fontWeight: 600, letterSpacing: '0.15em' }}>
              Get Involved
            </p>
            <h2
              id="involved-heading"
              className="font-heading mb-3"
              style={{ color: '#1B3A2D', fontSize: '52px', fontWeight: 800, lineHeight: 1.1 }}
            >
              Build this with us
            </h2>
            <p style={{ color: '#5A7068', fontSize: '17px' }}>
              We grow stronger with every voice, hand and partnership.
            </p>
          </div>
        </RevealOnScroll>

        {/* 5-card horizontal grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          {INVOLVE_CARDS.map(({ title, body, icon }, index) => (
            <RevealOnScroll key={title} delay={index * 0.1}>
              <motion.article
                className="bg-white rounded-xl p-4 border"
                style={{ borderColor: '#E2DAC8' }}
                whileHover={{
                  y: -4,
                  scale: 1.02,
                  boxShadow: '0 12px 32px rgba(27, 58, 45, 0.10)',
                  transition: { duration: 0.2 },
                }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center mb-3 shrink-0"
                  style={{ backgroundColor: '#EDEAE4', color: '#5A7068' }}
                >
                  {icon}
                </div>
                <h3 className="font-heading mb-1 leading-tight" style={{ color: '#1B3A2D', fontSize: '17px', fontWeight: 700 }}>{title}</h3>
                <p className="leading-relaxed" style={{ color: '#5A7068', fontSize: '14px', lineHeight: 1.6 }}>{body}</p>
              </motion.article>
            </RevealOnScroll>
          ))}
        </div>

        {/* Tabbed form */}
        <RevealOnScroll delay={0.2}>
          <div
            className="bg-white rounded-2xl border p-8"
            style={{ borderColor: '#E2DAC8', maxWidth: '480px', margin: '0 auto' }}
          >
            <div className="flex flex-wrap gap-2 mb-7">
              {FORM_TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className="text-xs font-semibold px-4 py-1.5 rounded-full transition-colors focus:outline-none"
                  style={
                    activeTab === tab.key
                      ? { backgroundColor: '#2D5A3D', color: '#FFFFFF' }
                      : { backgroundColor: 'transparent', color: '#5A7068', border: '1px solid #E2DAC8' }
                  }
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <SignUpForm
              key={activeTab}
              endpointId={FORM_ENDPOINTS[activeTab]}
              tabLabel={TAB_LABEL[activeTab]}
            />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION: SUPPORT OUR MISSION
   ═══════════════════════════════════════════════════════════════════════════ */

const PAYSTACK_PUBLIC_KEY = 'pk_test_57fb9ad42a73e764aed9dc3e155572681819f3d8';
const NONPROFIT_EMAIL = 'hello@mindfullyaware.org'

const PRESET_AMOUNTS = [
  { label: '$10', value: 10, naira: 15000 },
  { label: '$25', value: 25, naira: 37500 },
  { label: '$50', value: 50, naira: 75000 },
  { label: '$100', value: 100, naira: 150000 },
]

function DonationWidget() {
  const [selectedAmount, setSelectedAmount] = useState(25)
  const [customAmount, setCustomAmount] = useState('')
  const [showCustom, setShowCustom] = useState(false)
  const [donorEmail, setDonorEmail] = useState('')
  const [donorName, setDonorName] = useState('')
  const [success, setSuccess] = useState(false)
  const [emailError, setEmailError] = useState('')

  // Amount in kobo (Paystack uses smallest currency unit)
  const amountInKobo = showCustom && customAmount
    ? Math.round(parseFloat(customAmount) * 100)
    : (PRESET_AMOUNTS.find(a => a.value === selectedAmount)?.naira || 0) * 100

  const config = {
    email: donorEmail || NONPROFIT_EMAIL,
    amount: amountInKobo,
    publicKey: PAYSTACK_PUBLIC_KEY,
    metadata: {
      custom_fields: [
        { display_name: 'Donor Name', variable_name: 'donor_name', value: donorName },
        { display_name: 'Organization', variable_name: 'org', value: 'Mindfully Aware' },
      ]
    }
  }

  const initializePayment = usePaystackPayment(config)

  const onSuccess = (reference) => {
    console.log('Payment successful:', reference)
    setSuccess(true)
  }

  const onClose = () => {
    console.log('Payment modal closed')
  }

  const handleDonate = () => {
    if (!donorEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donorEmail)) {
      setEmailError('Please enter a valid email address')
      return
    }
    setEmailError('')
    initializePayment({ onSuccess, onClose, config: { reference: `mindfully_${Date.now()}` } })
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-10 px-6"
        style={{ backgroundColor: 'white', borderRadius: '16px' }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: '#EFF7F2' }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M6 16l7 7 13-13" stroke="#2D7A5F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3
          className="font-bold mb-2"
          style={{ fontSize: '20px', color: '#1B3A2D', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Thank you for your donation!
        </h3>
        <p style={{ fontSize: '15px', color: '#5A7068', lineHeight: 1.6 }}>
          Your contribution helps build safer mental health support systems across Africa. A receipt has been sent to {donorEmail}.
        </p>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => { setSuccess(false); setDonorEmail(''); setDonorName('') }}
          className="mt-6 px-6 py-2.5 rounded-full text-sm font-semibold"
          style={{ backgroundColor: '#EFF7F2', color: '#2D5A3D' }}
        >
          Donate Again
        </motion.button>
      </motion.div>
    )
  }

  return (
    <div
      className="p-7"
      style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 8px 32px rgba(27,58,45,0.12)' }}
    >
      {/* Amount label */}
      <p
        className="font-semibold mb-4"
        style={{ fontSize: '15px', color: '#1B3A2D', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        Choose an amount
      </p>

      {/* Preset amount pills */}
      <div className="grid grid-cols-4 gap-2 mb-3">
        {PRESET_AMOUNTS.map(({ label, value }) => (
          <motion.button
            key={value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => { setSelectedAmount(value); setShowCustom(false) }}
            className="py-2.5 rounded-lg text-sm font-semibold transition-colors"
            style={{
              backgroundColor: selectedAmount === value && !showCustom ? '#2D5A3D' : '#F5F0E8',
              color: selectedAmount === value && !showCustom ? 'white' : '#1B3A2D',
              fontSize: '14px',
            }}
          >
            {label}
          </motion.button>
        ))}
      </div>

      {/* Custom amount toggle */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        onClick={() => { setShowCustom(!showCustom); setSelectedAmount(null) }}
        className="w-full py-2.5 rounded-lg text-sm font-medium mb-4"
        style={{
          backgroundColor: showCustom ? '#EFF7F2' : '#F5F0E8',
          color: '#2D5A3D',
          border: showCustom ? '1px solid #2D7A5F' : '1px solid transparent',
          fontSize: '14px',
        }}
      >
        Other Amount (USD)
      </motion.button>

      {/* Custom amount input */}
      {showCustom && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-4"
        >
          <input
            type="number"
            min="1"
            placeholder="Enter amount in USD"
            value={customAmount}
            onChange={e => setCustomAmount(e.target.value)}
            className="w-full rounded-lg px-4 py-3 text-sm outline-none"
            style={{
              border: '1px solid #C8BDAA',
              backgroundColor: 'white',
              color: '#1B3A2D',
              fontSize: '15px',
            }}
            onFocus={e => e.target.style.boxShadow = '0 0 0 3px rgba(45,122,95,0.15)'}
            onBlur={e => e.target.style.boxShadow = 'none'}
          />
        </motion.div>
      )}

      {/* Donor name */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Your name (optional)"
          value={donorName}
          onChange={e => setDonorName(e.target.value)}
          className="w-full rounded-lg px-4 py-3 text-sm outline-none"
          style={{
            border: '1px solid #C8BDAA',
            backgroundColor: 'white',
            color: '#1B3A2D',
            fontSize: '15px',
          }}
          onFocus={e => e.target.style.boxShadow = '0 0 0 3px rgba(45,122,95,0.15)'}
          onBlur={e => e.target.style.boxShadow = 'none'}
        />
      </div>

      {/* Donor email — required for Paystack */}
      <div className="mb-5">
        <input
          type="email"
          placeholder="Your email address *"
          value={donorEmail}
          onChange={e => { setDonorEmail(e.target.value); setEmailError('') }}
          className="w-full rounded-lg px-4 py-3 text-sm outline-none"
          style={{
            border: emailError ? '1px solid #DC2626' : '1px solid #C8BDAA',
            backgroundColor: 'white',
            color: '#1B3A2D',
            fontSize: '15px',
          }}
          onFocus={e => e.target.style.boxShadow = '0 0 0 3px rgba(45,122,95,0.15)'}
          onBlur={e => e.target.style.boxShadow = 'none'}
        />
        {emailError && (
          <p className="text-xs mt-1" style={{ color: '#DC2626' }}>{emailError}</p>
        )}
      </div>

      {/* Donate button */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleDonate}
        disabled={!amountInKobo}
        className="w-full py-3.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2"
        style={{
          backgroundColor: '#E8C547',
          color: '#1B3A2D',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '15px',
          opacity: !amountInKobo ? 0.6 : 1,
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
        </svg>
        Donate Now
      </motion.button>

      {/* Trust badges */}
      <div className="mt-5 space-y-2">
        {[
          'Registered nonprofit — your gift is purpose-driven',
          '100% of donations go to programs & community',
          'Secured by Paystack — bank-level encryption',
        ].map(item => (
          <div key={item} className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2D7A5F" strokeWidth="2.5" strokeLinecap="round">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
            <span style={{ fontSize: '12px', color: '#5A7068' }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function DonateMission() {
  return (
    <section
      id="donate"
      aria-labelledby="donate-heading"
      style={{ backgroundColor: '#F9F4E3' }}
      className="py-20 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <div className="relative">
            {/* Dark gradient card */}
            <div
              className="rounded-2xl p-10 lg:p-14"
              style={{ background: 'linear-gradient(135deg, #4F6F5C 0%, #3A5547 100%)' }}
            >
              <div className="lg:max-w-[57%]">
                <p className="uppercase mb-5" style={{ color: '#E8C547', fontSize: '12px', fontWeight: 600, letterSpacing: '0.15em' }}>
                  Support our mission
                </p>
                <h2
                  id="donate-heading"
                  className="font-heading text-white leading-[1.1] mb-6"
                  style={{ fontSize: '44px', fontWeight: 700 }}
                >
                  Help us create safer mental health support systems for underserved communities.
                </h2>
                <p className="leading-relaxed mb-8" style={{ color: '#D4DECE', fontSize: '17px' }}>
                  Every contribution funds peer-support circles, awareness campaigns, mental health
                  resources, and the long road toward affordable professional care. We publish how
                  every naira and dollar is used, transparency is part of the trust.
                </p>
                <ul className="space-y-3">
                  {[
                    'Registered nonprofit, your gift is purpose-driven',
                    '100% of donations go to programs & community',
                    'Quarterly impact reports shared publicly',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2.5">
                      <IcoCheck size={16} color="#E8C547" />
                      <span className="text-sm" style={{ color: '#D4DECE' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Floating donate widget */}
            <div className="w-full mt-6 lg:mt-0 lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:right-10 lg:w-80">
              <DonationWidget />
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION: BLOG & RESOURCES
   ═══════════════════════════════════════════════════════════════════════════ */

function BlogResources() {
  return (
    <section
      id="blog"
      aria-labelledby="blog-heading"
      style={{ backgroundColor: '#F9F4E3' }}
      className="py-20 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div>
              <p className="uppercase mb-4" style={{ color: '#8A9A8E', fontSize: '12px', fontWeight: 600, letterSpacing: '0.15em' }}>
                Blog &amp; Resources
              </p>
              <h2
                id="blog-heading"
                className="font-heading leading-[1.1]"
                style={{ color: '#1B3A2D', fontSize: '52px', fontWeight: 800 }}
              >
                Read, breathe, share.
              </h2>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-75"
              style={{ color: '#2D7A5F' }}
            >
              All Resources
              <IcoArrowRight size={14} />
            </a>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map(({ category, title, readTime, imgSrc, imgAlt }, index) => (
            <RevealOnScroll key={title} delay={index * 0.1}>
              <motion.article
                className="bg-white rounded-xl border overflow-hidden cursor-pointer"
                style={{ borderColor: '#E2DAC8' }}
                whileHover={{
                  y: -6,
                  boxShadow: '0 16px 40px rgba(27, 58, 45, 0.12)',
                  transition: { duration: 0.25, ease: 'easeOut' },
                }}
              >
                <div className="aspect-video overflow-hidden">
                  <motion.img
                    src={imgSrc}
                    alt={imgAlt}
                    className="w-full h-full object-cover"
                    width={560}
                    height={315}
                    loading="lazy"
                    decoding="async"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
                <div className="p-5">
                  <p
                    className="text-[10px] font-bold uppercase tracking-widest mb-3"
                    style={{ color: BLOG_CATEGORY_COLOR[category] ?? '#5A7068' }}
                  >
                    {category}
                  </p>
                  <h3 className="font-heading leading-snug mb-4" style={{ color: '#1B3A2D', fontSize: '17px', fontWeight: 700 }}>
                    {title}
                  </h3>
                  <p className="text-xs" style={{ color: '#8A9A8E' }}>{readTime}</p>
                </div>
              </motion.article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION: CONTACT
   ═══════════════════════════════════════════════════════════════════════════ */

function ContactSection() {
  const [form, setForm] = useState(EMPTY_CONTACT_FORM)
  const [submitted, setSubmitted] = useState(false)
  const [newsEmail, setNewsEmail] = useState('')
  const [newsSubscribed, setNewsSubscribed] = useState(false)

  function handleChange(e) { setForm(prev => ({ ...prev, [e.target.name]: e.target.value })) }
  function handleSubmit(e) { e.preventDefault(); console.log('Contact:', form); setSubmitted(true) }
  function handleNewsSubmit(e) { e.preventDefault(); console.log('Newsletter:', newsEmail); setNewsSubscribed(true) }

  const iStyle = { border: '1px solid #C8BDAA', backgroundColor: '#FFFFFF', color: '#1B3A2D' }
  const iClass = 'w-full rounded-lg px-3 py-2.5 text-sm outline-none transition-colors'

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      style={{ backgroundColor: '#FEFAF1' }}
      className="py-20 px-4"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* Left info column */}
        <RevealOnScroll>
          <div>
            <p className="uppercase mb-4" style={{ color: '#8A9A8E', fontSize: '12px', fontWeight: 600, letterSpacing: '0.15em' }}>
              Contact
            </p>
            <h2
              id="contact-heading"
              className="font-heading leading-[1.1] mb-5"
              style={{ color: '#1B3A2D', fontSize: '44px', fontWeight: 700 }}
            >
              Please reach out, we read every message.
            </h2>
            <p className="leading-relaxed mb-8" style={{ color: '#5A7068', maxWidth: '380px', fontSize: '17px' }}>
              Whether it's a question, an idea, or just hello, we're glad you're here.
            </p>

            <a
              href="mailto:hello@mindfullyaware.org"
              className="inline-flex items-center gap-2.5 text-sm font-medium mb-8 hover:opacity-70 transition-opacity"
              style={{ color: '#1B3A2D' }}
            >
              <IcoEnvelope size={16} />
              hello@mindfullyaware.org
            </a>

            <div className="flex gap-2 mb-10">
              {SOCIAL_PLATFORMS.map(({ label, icon }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-shadow hover:shadow-sm focus:outline-none"
                  style={{ backgroundColor: '#EDE9E0', color: '#5A7068' }}
                >
                  {icon}
                </button>
              ))}
            </div>

            {/* Newsletter card */}
            <div className="rounded-xl border p-5" style={{ backgroundColor: '#F5EFE3', borderColor: '#E2DAC8' }}>
              <p className="font-bold text-sm mb-1" style={{ color: '#1B3A2D' }}>Stay in the loop</p>
              <p className="text-xs leading-relaxed mb-4" style={{ color: '#5A7068' }}>
                Quiet, monthly notes. No noise, just stories and updates.
              </p>
              {newsSubscribed ? (
                <p className="text-xs font-semibold" style={{ color: '#2D7A5F' }}>✓ You're subscribed. Thank you!</p>
              ) : (
                <form onSubmit={handleNewsSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={newsEmail}
                    onChange={e => setNewsEmail(e.target.value)}
                    required
                    placeholder="your@email.com"
                    className="flex-1 min-w-0 rounded-full px-4 py-2 text-xs outline-none"
                    style={{ border: '1px solid #C8BDAA', backgroundColor: '#FFFFFF', color: '#1B3A2D' }}
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white shrink-0 transition-opacity hover:opacity-85 focus:outline-none"
                    style={{ backgroundColor: '#2D5A3D' }}
                  >
                    <IcoSend size={12} />
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </RevealOnScroll>

        {/* Right — contact form card */}
        <RevealOnScroll delay={0.15}>
          <div className="bg-white rounded-2xl border p-8" style={{ borderColor: '#E2DAC8' }}>
            {submitted ? (
              <div className="py-10 text-center">
                <p className="font-heading font-bold text-xl mb-2" style={{ color: '#1B3A2D' }}>Message sent!</p>
                <p className="text-sm mb-6" style={{ color: '#5A7068' }}>
                  Thank you for reaching out. We'll get back to you soon.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm(EMPTY_CONTACT_FORM) }}
                  className="text-xs font-semibold underline focus:outline-none"
                  style={{ color: '#2D7A5F' }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="ct-name" className="block text-xs font-medium mb-1.5" style={{ color: '#1B3A2D' }}>Full Name</label>
                  <input id="ct-name" type="text" name="name" value={form.name} onChange={handleChange} required className={iClass} style={iStyle} />
                </div>
                <div>
                  <label htmlFor="ct-email" className="block text-xs font-medium mb-1.5" style={{ color: '#1B3A2D' }}>Email</label>
                  <input id="ct-email" type="email" name="email" value={form.email} onChange={handleChange} required className={iClass} style={iStyle} />
                </div>
                <div>
                  <label htmlFor="ct-message" className="block text-xs font-medium mb-1.5" style={{ color: '#1B3A2D' }}>Message</label>
                  <textarea id="ct-message" name="message" value={form.message} onChange={handleChange} rows={4} required className={`${iClass} resize-none`} style={iStyle} />
                </div>
                <motion.button
                  type="submit"
                  className="w-full py-3 rounded-full text-sm font-bold text-white focus:outline-none"
                  style={{ backgroundColor: '#2D5A3D' }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                >
                  Send Message
                </motion.button>
              </form>
            )}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════════════════ */

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="pt-[138px]">
        <Hero />
        <StatsBar />
        <OurStory />
        <ProblemSection />
        <NotAloneSection />
        <BuildingSection />
        <VoicesBanner />
        <CommunityAndSocial />
        <GetInvolvedSection />
        <DonateMission />
        <BlogResources />
        <ContactSection />
      </main>
    </>
  )
}
