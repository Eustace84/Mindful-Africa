import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

// ── Animated counter ────────────────────────────────────────────────────────
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

function Stat({ prefix = '', from = 0, to, suffix = '', label }) {
  const [count, ref] = useCountUp(from, to)
  return (
    <div ref={ref} className="text-center py-10 px-6">
      <p className="font-heading text-4xl font-extrabold mb-2" style={{ color: '#2D7A5F' }}>
        {prefix}{count}{suffix}
      </p>
      <p className="text-sm leading-snug max-w-[160px] mx-auto" style={{ color: '#4A6358' }}>
        {label}
      </p>
    </div>
  )
}

// ── Section: Hero ───────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      style={{ backgroundColor: '#F5F0E8' }}
      className="pt-14 pb-20 px-4"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        {/* Left */}
        <div>
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 border"
            style={{ borderColor: '#E2DAC8' }}
          >
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#2D7A5F' }} aria-hidden="true" />
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#E8C547' }} aria-hidden="true" />
            <span className="text-sm font-medium" style={{ color: '#4A6358' }}>
              A registered African mental health nonprofit
            </span>
          </div>

          {/* Headline */}
          <h1
            id="hero-heading"
            className="font-heading text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6"
            style={{ color: '#1B3A2D' }}
          >
            Because struggling
            <br />
            <span style={{ position: 'relative', display: 'inline-block' }}>
              <span style={{ position: 'relative', zIndex: 1 }}>in silence</span>
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  bottom: '6px',
                  left: '-2px',
                  right: '-2px',
                  height: '10px',
                  backgroundColor: '#E8C547',
                  zIndex: 0,
                  borderRadius: '3px',
                }}
              />
            </span>
            <br />
            shouldn't be{' '}
            <em style={{ color: '#2D7A5F', fontStyle: 'italic', fontWeight: 800 }}>normal</em>
          </h1>

          {/* Body */}
          <p
            className="text-base leading-relaxed mb-8 text-justify"
            style={{ color: '#4A6358', maxWidth: '520px' }}
          >
            Mindfully Aware is building safe, accessible mental health support systems for African
            communities through awareness, education, community support, and meaningful conversations
            around mental wellbeing.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <button
              className="inline-flex items-center gap-2 text-white text-sm font-semibold px-6 py-3 rounded-full transition-opacity hover:opacity-85"
              style={{ backgroundColor: '#2D5A3D' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Join Our Community
            </button>
            <button
              className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-full border-2 transition-all hover:opacity-80"
              style={{ color: '#2D5A3D', borderColor: '#2D5A3D' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Support Us
            </button>
          </div>
        </div>

        {/* Right — image + floating card */}
        <div className="relative">
          <div className="rounded-2xl overflow-hidden shadow-lg" style={{ aspectRatio: '4/3' }}>
            <img
              src="https://placehold.co/600x450/2D5A3D/F5F0E8?text=Smiling+African+woman+with+community+members+in+background"
              alt="Smiling African woman with community members in background"
              className="w-full h-full object-cover"
              width={600}
              height={450}
            />
          </div>

          {/* Floating testimonial card */}
          <div
            className="absolute bottom-5 right-5 bg-white rounded-xl shadow-xl p-4"
            style={{ maxWidth: '230px' }}
          >
            <p className="text-sm font-medium italic mb-3" style={{ color: '#1B3A2D' }}>
              "Healing starts with being heard."
            </p>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2" aria-hidden="true">
                {[['#2D7A5F', 'A'], ['#E8C547', 'K'], ['#C9784A', 'F']].map(([bg, initial]) => (
                  <div
                    key={initial}
                    className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: bg }}
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <span className="text-xs font-medium" style={{ color: '#4A6358' }}>community voices</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Section: Stats ──────────────────────────────────────────────────────────
function Stats() {
  return (
    <div style={{ borderTop: '1px solid #D4CAB8', borderBottom: '1px solid #D4CAB8', backgroundColor: '#F5F0E8' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3">
        {[
          { prefix: '1 in ', from: 1, to: 4, suffix: '', label: 'Africans face mental health challenges' },
          { prefix: '< ', from: 1, to: 4, suffix: '%', label: 'Have access to professional care' },
          { prefix: '', from: 0, to: 100, suffix: '%', label: 'Deserve to be heard' },
        ].map((s, i) => (
          <div
            key={s.label}
            className={i < 2 ? 'border-b md:border-b-0 md:border-r' : ''}
            style={{ borderColor: '#E2DAC8' }}
          >
            <Stat {...s} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Section: The Problem ────────────────────────────────────────────────────
function TheProblem() {
  return (
    <section
      id="problem"
      aria-labelledby="problem-heading"
      style={{ backgroundColor: '#F5F0E8' }}
      className="py-16 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className="rounded-3xl p-10 lg:p-14 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          style={{ backgroundColor: '#2D5A3D' }}
        >
          {/* Left */}
          <div>
            <p
              className="text-xs font-bold uppercase tracking-widest mb-5"
              style={{ color: '#E8C547' }}
            >
              The Problem
            </p>
            <h2
              id="problem-heading"
              className="font-heading text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-6"
            >
              Mental health remains a{' '}
              <em style={{ color: '#E8C547', fontStyle: 'italic' }}>silent crisis</em>{' '}
              across Africa
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: '#A8C4B8' }}>
              Stigma, cultural barriers, and a severe shortage of mental health professionals mean that
              millions of Africans suffer alone. Africa carries 14% of the world's mental health
              burden but has access to fewer than 2% of global resources. The treatment gap is
              staggering — and widening.
            </p>
            <button
              className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-full transition-opacity hover:opacity-80"
              style={{ backgroundColor: '#E8C547', color: '#1B3A2D' }}
            >
              Learn about the crisis
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Right */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://placehold.co/540x380/1B3A2D/A8C4B8?text=Community+members+discussing+mental+health"
              alt="Community members discussing mental health challenges in Africa"
              className="w-full h-full object-cover"
              width={540}
              height={380}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Section: What We're Building ───────────────────────────────────────────
const PROGRAMS = [
  {
    title: 'Mental Health Education',
    body: 'Culturally-relevant mental health literacy programs that help communities recognise, understand, and talk openly about mental wellbeing.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.5 2A2.5 2.5 0 017 4.5v0A2.5 2.5 0 019.5 7h5A2.5 2.5 0 0117 4.5v0A2.5 2.5 0 0014.5 2h-5z" />
        <path d="M12 7v4m0 0v2m0-2h2m-2 0H10" />
        <path d="M6.5 10c-1.5 0-3 1-3 3s1 3.5 2.5 4L6 20h12l-.5-3c1.5-.5 2.5-2 2.5-4s-1.5-3-3-3" />
      </svg>
    ),
  },
  {
    title: 'Community Support',
    body: 'Peer support circles, trained community advocates, and safe spaces where people can share and be heard without judgement.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Crisis Assistance',
    body: '24/7 accessible support lines and rapid-response crisis teams for individuals experiencing acute psychological distress across Africa.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
]

function WhatWereBuilding() {
  return (
    <section
      id="programs"
      aria-labelledby="programs-heading"
      style={{ backgroundColor: '#F5F0E8' }}
      className="py-20 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#2D7A5F' }}>
            What We're Building
          </p>
          <h2
            id="programs-heading"
            className="font-heading text-3xl md:text-4xl font-extrabold"
            style={{ color: '#1B3A2D' }}
          >
            Programs built for Africa, by Africans
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROGRAMS.map(({ title, body, icon }) => (
            <article
              key={title}
              className="bg-white rounded-2xl p-8 border hover:shadow-md transition-shadow duration-200"
              style={{ borderColor: '#E2DAC8' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: '#EFF7F2', color: '#2D7A5F' }}
              >
                {icon}
              </div>
              <h3 className="font-heading text-lg font-bold mb-3" style={{ color: '#1B3A2D' }}>
                {title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#4A6358' }}>
                {body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Section: Community Voices ───────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: 'For the first time, I felt safe enough to talk about what I was going through. This community changed my life.',
    name: 'Amara D.',
    location: 'Lagos, Nigeria',
    initial: 'A',
    color: '#2D7A5F',
  },
  {
    quote: "Growing up, mental health was never spoken about. Mindfully Aware gave me the language and courage to seek help.",
    name: 'Kofi M.',
    location: 'Accra, Ghana',
    initial: 'K',
    color: '#C9784A',
  },
]

function CommunityVoices() {
  return (
    <section
      id="community"
      aria-labelledby="voices-heading"
      style={{ backgroundColor: '#EFF7F2' }}
      className="py-20 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#2D7A5F' }}>
            Community Voices
          </p>
          <h2
            id="voices-heading"
            className="font-heading text-3xl md:text-4xl font-extrabold"
            style={{ color: '#1B3A2D' }}
          >
            Real stories, real healing
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {TESTIMONIALS.map(({ quote, name, location, initial, color }) => (
            <figure
              key={name}
              className="bg-white rounded-2xl p-8 border"
              style={{ borderColor: '#E2DAC8' }}
            >
              {/* Quote marks */}
              <svg
                className="w-8 h-8 mb-4"
                viewBox="0 0 32 32"
                fill="none"
                aria-hidden="true"
              >
                <path d="M9.333 20L12 14.667H8V9.333h6.667V14.667L13.333 20H9.333zm10.667 0L22.667 14.667H18.667V9.333h6.667V14.667L24 20H20z" fill="#E8C547" />
              </svg>
              <blockquote className="text-base italic leading-relaxed mb-6" style={{ color: '#1B3A2D' }}>
                {quote}
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                  style={{ backgroundColor: color }}
                  aria-hidden="true"
                >
                  {initial}
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: '#1B3A2D' }}>{name}</p>
                  <p className="text-xs" style={{ color: '#4A6358' }}>{location}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Section: Get Involved ───────────────────────────────────────────────────
function GetInvolved() {
  return (
    <section
      id="involved"
      aria-labelledby="involved-heading"
      style={{ backgroundColor: '#F5F0E8' }}
      className="py-16 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className="rounded-3xl py-16 px-8 md:px-16 text-center"
          style={{ backgroundColor: '#1B3A2D' }}
        >
          <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: '#E8C547' }}>
            Get Involved
          </p>
          <h2
            id="involved-heading"
            className="font-heading text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-5"
          >
            Join the movement for mental health in Africa
          </h2>
          <p className="text-base leading-relaxed mb-10 max-w-2xl mx-auto" style={{ color: '#7AAA8E' }}>
            Whether you're a mental health professional, a community leader, an advocate, or someone
            who simply cares — there's a meaningful place for you here.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              className="font-bold text-sm px-8 py-3.5 rounded-full transition-opacity hover:opacity-85"
              style={{ backgroundColor: '#E8C547', color: '#1B3A2D' }}
            >
              Join Our Community
            </button>
            <button
              className="font-bold text-sm px-8 py-3.5 rounded-full border-2 border-white text-white transition-colors hover:bg-white/10"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <TheProblem />
      <WhatWereBuilding />
      <CommunityVoices />
      <GetInvolved />
    </>
  )
}
