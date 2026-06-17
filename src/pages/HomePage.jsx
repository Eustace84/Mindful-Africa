import { useState, useEffect, useRef } from 'react'
import heroImg from '../assets/images/hero-page-girl.png'
import communityGirl from '../assets/images/community-girl.png'

/* ═══════════════════════════════════════════════════════════════════════════
   SHARED ICON COMPONENTS
   Defined once, reused across sections to ensure visual consistency.
   All icons: minimalist line style, 1.5–2px stroke, currentColor unless noted.
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
   LOGO MARK — used in Navbar + Footer
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
      <p className="font-heading text-4xl font-extrabold mb-2" style={{ color: '#2D7A5F' }}>
        {prefix}{count}{suffix}
      </p>
      <p className="text-sm leading-snug max-w-[160px] mx-auto" style={{ color: '#5A7068' }}>
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
  { label: 'Volunteer Sign-Up',     fieldLabel: 'Why would you like to volunteer?'      },
  { label: 'Partner Sign-Up',       fieldLabel: 'How would you like to partner?'        },
  { label: 'Collaboration Sign-Up', fieldLabel: 'What would you like to collaborate on?' },
]

const EMPTY_INVOLVE_FORM = { name: '', email: '', city: '', message: '' }

const DONATE_AMOUNTS = ['$10', '$25', '$50', '$100']

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
  const close = () => setOpen(false)

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-8 md:px-12 min-h-[138px] flex flex-col justify-center"
      style={{ backgroundColor: '#FEFAF1' }}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <a href="#" onClick={close} className="flex items-center gap-[10px] shrink-0">
          <LogoMark size={28} />
          <span className="font-heading font-semibold text-lg" style={{ color: '#1B3A2D' }}>
            Mindfully Aware
          </span>
        </a>

        {/* Desktop: nav links + // + CTA */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm font-medium whitespace-nowrap transition-opacity hover:opacity-70"
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
              className="block px-1 py-3 text-sm font-medium transition-opacity hover:opacity-60"
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
    </nav>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION: HERO
   ═══════════════════════════════════════════════════════════════════════════ */

function HeroQuoteCard({ className = '', style = {} }) {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg px-5 py-4 ${className}`}
      style={{ maxWidth: '260px', ...style }}
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
          <div
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
          </div>

          {/* Headline */}
          <h1
            id="hero-heading"
            className="font-heading font-extrabold leading-[1.1] mb-8 text-4xl md:text-5xl lg:text-6xl"
            style={{ color: '#1B3A2D' }}
          >
            Because struggling
            <br />
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
            <br />
            shouldn't be{' '}
            <em style={{ color: '#2D7A5F', fontStyle: 'italic', fontWeight: 800 }}>normal</em>
          </h1>

          {/* Body copy */}
          <p
            className="text-base mb-10 text-justify"
            style={{ color: '#4A6358', maxWidth: '480px', lineHeight: '1.7' }}
          >
            Mindfully Aware is building safe, accessible mental health support systems for African
            communities through awareness, education, community support, and meaningful conversations
            around mental wellbeing.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#community-social"
              className="inline-flex items-center gap-2 text-white text-sm font-semibold px-6 py-3.5 rounded-full transition-opacity hover:opacity-85"
              style={{ backgroundColor: '#2D5A3D' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
              </svg>
              Join Our Community
            </a>
            <a
              href="#donate"
              className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3.5 rounded-full border-2 transition-opacity hover:opacity-80"
              style={{ color: '#2D5A3D', borderColor: '#2D5A3D' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#2D5A3D" stroke="none" aria-hidden="true">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
              Support Us
            </a>
          </div>
        </div>

        {/* Right column — image + floating quote card */}
        <div className="relative">
          <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
            <img
              src={heroImg}
              alt="Smiling African woman with community members in background"
              className="w-full h-full object-cover"
              width={600}
              height={450}
            />
          </div>
          {/* Desktop: card floats outside bottom-right of image */}
          <HeroQuoteCard
            className="hidden md:block absolute"
            style={{ bottom: 0, right: 0, transform: 'translate(-16px, 24px)' }}
          />
          {/* Mobile: card stacks below image */}
          <HeroQuoteCard className="md:hidden mt-4" />
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
            <StatCounter {...s} />
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
        <div className="relative pb-16">
          <div className="rounded-3xl overflow-hidden shadow-lg" style={{ height: '440px' }}>
            <img
              src={communityGirl}
              alt="Smiling African woman, portrait photo representing the Mindfully Aware community story"
              className="w-full h-full object-cover"
              width={580}
              height={720}
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

        {/* Right — text content */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: '#2D7A5F' }}>
            Our Story
          </p>
          <h2
            id="story-heading"
            className="font-heading font-extrabold leading-[1.1] mb-8"
            style={{ color: '#1B3A2D', fontSize: 'clamp(2.25rem, 4vw, 3.5rem)' }}
          >
            Born from our own<br />journey to freedom.
          </h2>
          <div className="space-y-5 mb-10">
            {[
              'Mindfully Aware was born from a journey to freedom. A freedom that revealed just how heavy the pain we had been carrying truly was.',
              'The thought of others carrying that same weight alone, without support or safe spaces to be heard, became the motivation behind this journey.',
              'We believe that letting go creates room for healing, growth, and freedom. Through Mindfully Aware, we hope to be part of that journey for others too.',
            ].map(para => (
              <p key={para.slice(0, 20)} className="text-base leading-relaxed text-justify" style={{ color: '#5A7068' }}>
                {para}
              </p>
            ))}
          </div>
          <p className="text-base font-bold" style={{ color: '#1B3A2D' }}>
            We are building the support we wish we had together.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION: THE PROBLEM — "What We're Up Against"
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
        <div className="mb-12">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#8A9A8E' }}>
            What We're Up Against
          </p>
          <h2
            id="problem-heading"
            className="font-heading font-extrabold leading-[1.1] mb-5"
            style={{ color: '#1B3A2D', fontSize: 'clamp(1.9rem, 3.5vw, 2.75rem)' }}
          >
            The weight too many<br />carry quietly.
          </h2>
          <p className="text-sm leading-relaxed max-w-xs" style={{ color: '#5A7068' }}>
            Mental health challenges across Africa are real, common and largely unsupported.
            Naming them is the first step to changing them.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROBLEM_CARDS.map(({ title, body, icon }) => (
            <article key={title} className="bg-white rounded-xl p-5 border" style={{ borderColor: '#E2DAC8' }}>
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center mb-4 shrink-0"
                style={{ backgroundColor: '#EDEAE4', color: '#5A7068' }}
              >
                {icon}
              </div>
              <h3 className="font-heading text-sm font-bold mb-1.5" style={{ color: '#1B3A2D' }}>{title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: '#5A7068' }}>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION: YOU ARE NOT ALONE — centered quote banner
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
        {/* Leaf icon */}
        <div className="flex justify-center mb-8" aria-hidden="true">
          <svg width="48" height="56" viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M24 52C24 52 4 40 4 22C4 11.5 13 3 24 3C35 3 44 11.5 44 22C44 40 24 52 24 52Z"
              stroke="#8A9A8E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M24 52V22"
              stroke="#8A9A8E"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M24 30C24 30 14 26 12 18"
              stroke="#8A9A8E"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Headline */}
        <h2
          id="not-alone-heading"
          className="font-heading font-extrabold leading-[1.1] mb-12 text-4xl md:text-5xl lg:text-6xl"
          style={{ color: '#1B3A2D' }}
        >
          You do not have to carry
          <br />
          <em style={{ color: '#2D7A5F', fontStyle: 'italic', fontWeight: 800 }}>everything</em>
          {' '}
          <span style={{ color: '#1B3A2D' }}>alone.</span>
        </h2>

        {/* Affirmation cards */}
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 items-stretch">
            {ALONE_QUOTES.map((quote, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border px-6 py-6 flex items-center justify-center"
                style={{ borderColor: '#E2DAC8' }}
              >
                <p className="text-sm italic leading-relaxed text-center" style={{ color: '#4A6358' }}>
                  "{quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION: WHAT WE'RE BUILDING — 6-card grid
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
        <div className="mb-12">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#8A9A8E' }}>
            What We're Building
          </p>
          <h2
            id="building-heading"
            className="font-heading font-extrabold leading-[1.1] mb-5"
            style={{ color: '#1B3A2D', fontSize: 'clamp(1.9rem, 3.5vw, 2.75rem)' }}
          >
            Support systems,<br />rooted in community.
          </h2>
          <p className="text-sm leading-relaxed max-w-xs" style={{ color: '#5A7068' }}>
            We're early and growing. Here's what's taking shape with our community, volunteers and partners.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BUILDING_CARDS.map(({ title, body, icon }) => (
            <article
              key={title}
              className="bg-white rounded-xl p-5 border flex flex-col"
              style={{ borderColor: '#E2DAC8' }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center mb-4 shrink-0"
                style={{ backgroundColor: '#F5E6A8', color: '#1B3A2D' }}
              >
                {icon}
              </div>
              <h3 className="font-heading text-sm font-bold mb-1.5" style={{ color: '#1B3A2D' }}>{title}</h3>
              <p className="text-xs leading-relaxed mb-4 flex-1" style={{ color: '#5A7068' }}>{body}</p>
              <div className="flex items-center gap-1.5 mt-auto">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: '#2D7A5F' }} aria-hidden="true" />
                <span className="text-xs font-medium" style={{ color: '#2D7A5F' }}>Actively growing</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION: VOICES FROM OUR COMMUNITY — auto-rotating testimonial carousel
   ═══════════════════════════════════════════════════════════════════════════ */

function VoicesBanner() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setActive(prev => (prev + 1) % CAROUSEL_TESTIMONIALS.length), 5000)
    return () => clearInterval(timer)
  }, [])

  const { quote, attribution } = CAROUSEL_TESTIMONIALS[active]

  return (
    <section
      id="voices"
      aria-labelledby="voices-heading"
      style={{ backgroundColor: '#547563' }}
      className="py-20 px-4"
    >
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: '#E8C547' }}>
          Dear Anonymous
        </p>
        <h2
          id="voices-heading"
          className="font-heading font-extrabold text-white mb-3"
          style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.25rem)' }}
        >
          Voices from our community.
        </h2>
        <p className="text-sm mb-10" style={{ color: '#D4DECE' }}>
          Stories shared with permission, names withheld with care.
        </p>
        <div
          className="font-heading font-extrabold leading-none mb-3 select-none"
          style={{ color: '#E8C547', fontSize: '4rem' }}
          aria-hidden="true"
        >
          &#8220;
        </div>
        <blockquote
          key={active}
          className="text-base md:text-lg italic leading-relaxed text-white mb-5 mx-auto"
          style={{ maxWidth: '560px' }}
        >
          {quote}
        </blockquote>
        <p className="text-sm mb-10" style={{ color: '#D4DECE' }}>
          {attribution}
        </p>
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
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#8A9A8E' }}>
            Community &amp; Social
          </p>
          <h2
            id="social-heading"
            className="font-heading font-extrabold leading-[1.1] mb-5"
            style={{ color: '#1B3A2D', fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
          >
            The conversation is<br />already happening.
          </h2>
          <p className="text-sm leading-relaxed mb-8" style={{ color: '#5A7068', maxWidth: '380px' }}>
            Follow along, share your story, or just lurk quietly, that's okay too.
            Every voice helps soften the silence.
          </p>
          <div className="flex flex-wrap gap-2">
            {SOCIAL_PLATFORMS.map(({ label, icon }) => (
              <button
                key={label}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border text-xs font-medium transition-shadow hover:shadow-sm focus:outline-none"
                style={{ borderColor: '#E2DAC8', color: '#1B3A2D' }}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Right — stacked social post cards */}
        <div className="flex flex-col gap-3">
          {SOCIAL_POSTS.map(({ platform, text, count }, i) => (
            <article key={i} className="bg-white rounded-xl border p-4" style={{ borderColor: '#E2DAC8' }}>
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
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION: GET INVOLVED — 5-card grid + tabbed sign-up form
   ═══════════════════════════════════════════════════════════════════════════ */

function GetInvolvedSection() {
  const [activeTab, setActiveTab] = useState(0)
  const [form, setForm] = useState(EMPTY_INVOLVE_FORM)
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) { setForm(prev => ({ ...prev, [e.target.name]: e.target.value })) }
  function handleTabChange(i) { setActiveTab(i); setSubmitted(false) }
  function handleSubmit(e) { e.preventDefault(); console.log({ tab: FORM_TABS[activeTab].label, ...form }); setSubmitted(true) }
  function handleReset() { setSubmitted(false); setForm(EMPTY_INVOLVE_FORM) }

  const iStyle = { border: '1px solid #C8BDAA', backgroundColor: '#FFFFFF', color: '#1B3A2D' }
  const iClass = 'w-full rounded-lg px-3 py-2.5 text-sm outline-none transition-colors'

  return (
    <section
      id="get-involved"
      aria-labelledby="involved-heading"
      style={{ backgroundColor: '#F9F4E3' }}
      className="py-20 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#8A9A8E' }}>
            Get Involved
          </p>
          <h2
            id="involved-heading"
            className="font-heading font-extrabold leading-tight mb-3"
            style={{ color: '#1B3A2D', fontSize: 'clamp(1.9rem, 3.5vw, 2.75rem)' }}
          >
            Build this with us
          </h2>
          <p className="text-sm" style={{ color: '#5A7068' }}>
            We grow stronger with every voice, hand and partnership.
          </p>
        </div>

        {/* 5-card horizontal grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          {INVOLVE_CARDS.map(({ title, body, icon }) => (
            <article key={title} className="bg-white rounded-xl p-4 border" style={{ borderColor: '#E2DAC8' }}>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center mb-3 shrink-0"
                style={{ backgroundColor: '#EDEAE4', color: '#5A7068' }}
              >
                {icon}
              </div>
              <h3 className="font-heading text-xs font-bold mb-1 leading-tight" style={{ color: '#1B3A2D' }}>{title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: '#5A7068' }}>{body}</p>
            </article>
          ))}
        </div>

        {/* Tabbed form */}
        <div
          className="bg-white rounded-2xl border p-8"
          style={{ borderColor: '#E2DAC8', maxWidth: '480px', margin: '0 auto' }}
        >
          <div className="flex flex-wrap gap-2 mb-7">
            {FORM_TABS.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => handleTabChange(i)}
                className="text-xs font-semibold px-4 py-1.5 rounded-full transition-colors focus:outline-none"
                style={
                  activeTab === i
                    ? { backgroundColor: '#2D5A3D', color: '#FFFFFF' }
                    : { backgroundColor: 'transparent', color: '#5A7068', border: '1px solid #E2DAC8' }
                }
              >
                {tab.label}
              </button>
            ))}
          </div>

          {submitted ? (
            <div className="py-10 text-center">
              <p className="font-heading font-bold text-lg mb-2" style={{ color: '#1B3A2D' }}>Thank you!</p>
              <p className="text-sm mb-6" style={{ color: '#5A7068' }}>We'll be in touch soon.</p>
              <button onClick={handleReset} className="text-xs font-semibold underline focus:outline-none" style={{ color: '#2D7A5F' }}>
                Submit another response
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="inv-name" className="block text-xs font-medium mb-1.5" style={{ color: '#1B3A2D' }}>Full Name</label>
                  <input id="inv-name" type="text" name="name" value={form.name} onChange={handleChange} required className={iClass} style={iStyle} />
                </div>
                <div>
                  <label htmlFor="inv-email" className="block text-xs font-medium mb-1.5" style={{ color: '#1B3A2D' }}>Email</label>
                  <input id="inv-email" type="email" name="email" value={form.email} onChange={handleChange} required className={iClass} style={iStyle} />
                </div>
              </div>
              <div>
                <label htmlFor="inv-city" className="block text-xs font-medium mb-1.5" style={{ color: '#1B3A2D' }}>City</label>
                <input id="inv-city" type="text" name="city" value={form.city} onChange={handleChange} className={iClass} style={iStyle} />
              </div>
              <div>
                <label htmlFor="inv-message" className="block text-xs font-medium mb-1.5" style={{ color: '#1B3A2D' }}>
                  {FORM_TABS[activeTab].fieldLabel}
                </label>
                <textarea id="inv-message" name="message" value={form.message} onChange={handleChange} rows={3} className={`${iClass} resize-none`} style={iStyle} />
              </div>
              <button
                type="submit"
                className="text-sm font-bold px-6 py-2.5 rounded-full transition-opacity hover:opacity-85 focus:outline-none"
                style={{ backgroundColor: '#2D5A3D', color: '#FFFFFF' }}
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION: SUPPORT OUR MISSION — gradient donate card + amount widget
   ═══════════════════════════════════════════════════════════════════════════ */

function DonateMission() {
  const [amount, setAmount] = useState('$25')

  return (
    <section
      id="donate"
      aria-labelledby="donate-heading"
      style={{ backgroundColor: '#F9F4E3' }}
      className="py-20 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          {/* Dark gradient card */}
          <div
            className="rounded-2xl p-10 lg:p-14"
            style={{ background: 'linear-gradient(135deg, #4F6F5C 0%, #3A5547 100%)' }}
          >
            <div className="lg:max-w-[57%]">
              <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: '#E8C547' }}>
                Support our mission
              </p>
              <h2
                id="donate-heading"
                className="font-heading font-extrabold text-white leading-[1.1] mb-6"
                style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
              >
                Help us create safer mental health support systems for underserved communities.
              </h2>
              <p className="text-sm leading-relaxed mb-8" style={{ color: '#D4DECE' }}>
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

          {/* Floating donate widget — absolute on desktop, stacks below on mobile */}
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full mt-6 lg:mt-0 lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:right-10 lg:w-72">
            <p className="text-sm font-bold mb-4" style={{ color: '#1B3A2D' }}>
              Choose an amount
            </p>
            <div className="grid grid-cols-4 gap-2 mb-3">
              {DONATE_AMOUNTS.map(a => (
                <button
                  key={a}
                  onClick={() => setAmount(a)}
                  className="py-2 rounded-lg text-xs font-semibold transition-colors focus:outline-none"
                  style={
                    amount === a
                      ? { backgroundColor: '#2D5A3D', color: '#FFFFFF' }
                      : { backgroundColor: '#FEFAF1', color: '#1B3A2D' }
                  }
                >
                  {a}
                </button>
              ))}
            </div>
            <button
              onClick={() => setAmount('other')}
              className="w-full py-2.5 rounded-lg text-sm font-medium mb-3 transition-colors focus:outline-none"
              style={
                amount === 'other'
                  ? { backgroundColor: '#2D5A3D', color: '#FFFFFF' }
                  : { backgroundColor: '#FEFAF1', color: '#1B3A2D' }
              }
            >
              Other Amount
            </button>
            <button
              onClick={() => console.log('Donate:', amount)}
              className="w-full py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-opacity hover:opacity-85 focus:outline-none"
              style={{ backgroundColor: '#E8C547', color: '#1B3A2D' }}
            >
              <IcoHeart size={15} filled />
              Donate Now
            </button>
          </div>
        </div>
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
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#8A9A8E' }}>
              Blog &amp; Resources
            </p>
            <h2
              id="blog-heading"
              className="font-heading font-extrabold leading-[1.1]"
              style={{ color: '#1B3A2D', fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map(({ category, title, readTime, imgSrc, imgAlt }) => (
            <article
              key={title}
              className="bg-white rounded-xl border overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
              style={{ borderColor: '#E2DAC8' }}
            >
              <div className="aspect-video overflow-hidden">
                <img src={imgSrc} alt={imgAlt} className="w-full h-full object-cover" width={560} height={315} />
              </div>
              <div className="p-5">
                <p
                  className="text-[10px] font-bold uppercase tracking-widest mb-3"
                  style={{ color: BLOG_CATEGORY_COLOR[category] ?? '#5A7068' }}
                >
                  {category}
                </p>
                <h3 className="font-heading font-bold leading-snug mb-4" style={{ color: '#1B3A2D', fontSize: '0.9rem' }}>
                  {title}
                </h3>
                <p className="text-xs" style={{ color: '#8A9A8E' }}>{readTime}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION: CONTACT — form + info column + newsletter
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
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#8A9A8E' }}>
            Contact
          </p>
          <h2
            id="contact-heading"
            className="font-heading font-extrabold leading-[1.1] mb-5"
            style={{ color: '#1B3A2D', fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
          >
            Please reach out, we read every message.
          </h2>
          <p className="text-sm leading-relaxed mb-8" style={{ color: '#5A7068', maxWidth: '380px' }}>
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

        {/* Right — contact form card */}
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
              <button
                type="submit"
                className="w-full py-3 rounded-full text-sm font-bold text-white transition-opacity hover:opacity-85 focus:outline-none"
                style={{ backgroundColor: '#2D5A3D' }}
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE — assembles all 14 sections in order
   ═══════════════════════════════════════════════════════════════════════════ */

export default function HomePage() {
  return (
    <>
      {/* ── 1. Navbar ── */}
      <Navbar />
      <main className="pt-[138px]">
      {/* ── 2. Hero ── */}
      <Hero />
      {/* ── 3. Stats Bar ── */}
      <StatsBar />
      {/* ── 4. Our Story ── */}
      <OurStory />
      {/* ── 5. The Problem ── */}
      <ProblemSection />
      {/* ── 6. You Are Not Alone ── */}
      <NotAloneSection />
      {/* ── 7. What We're Building ── */}
      <BuildingSection />
      {/* ── 8. Voices from our Community ── */}
      <VoicesBanner />
      {/* ── 9. Community & Social ── */}
      <CommunityAndSocial />
      {/* ── 10. Get Involved ── */}
      <GetInvolvedSection />
      {/* ── 11. Support Our Mission ── */}
      <DonateMission />
      {/* ── 12. Blog & Resources ── */}
      <BlogResources />
      {/* ── 13. Contact ── */}
      <ContactSection />
</main>
    </>
  )
}
