import { useState } from 'react'

// ── FAQ data ────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'How can I access mental health support through Mindfully Aware?',
    a: 'You can reach us via our contact form, email, or phone. We offer direct referrals to trained counsellors and peer support coordinators in your region. If you are in crisis, please use our crisis line listed below.',
  },
  {
    q: 'Is your support free?',
    a: 'Yes. All of our peer support services, educational resources, and community circles are free to access. We are a nonprofit funded by donations and grants.',
  },
  {
    q: 'Which African countries do you currently operate in?',
    a: 'We currently have active programs in Nigeria, Ghana, Kenya, South Africa, Uganda, Tanzania, Senegal, Ethiopia, Rwanda, Zambia, Zimbabwe, and Cameroon — with more being added as we grow.',
  },
  {
    q: 'How can I volunteer or partner with Mindfully Aware?',
    a: 'Use the contact form and select "Partnerships & Collaboration" as the subject. We welcome mental health professionals, community organisations, corporates, and individual volunteers.',
  },
  {
    q: 'I am a mental health professional. Can I contribute?',
    a: 'Absolutely. We partner with licensed psychologists, psychiatrists, counsellors, and community health workers. Please reach out via the form or email us directly.',
  },
  {
    q: 'How is my donation used?',
    a: 'Donations fund our community support circles, training of local advocates, crisis support lines, and awareness campaigns. We publish annual impact reports on our website.',
  },
]

// ── Contact form ────────────────────────────────────────────────────────────
const SUBJECTS = [
  'General Enquiry',
  'Request Mental Health Support',
  'Partnerships & Collaboration',
  'Donations & Funding',
  'Volunteering',
  'Press & Media',
]

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Please enter your name.'
    if (!form.email.trim()) {
      e.email = 'Please enter your email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Please enter a valid email address.'
    }
    if (!form.subject) e.subject = 'Please select a subject.'
    if (!form.message.trim()) e.message = 'Please enter your message.'
    else if (form.message.trim().length < 20) e.message = 'Message must be at least 20 characters.'
    return e
  }

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length) { setErrors(e2); return }
    setStatus('loading')
    setTimeout(() => setStatus('success'), 1600)
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 px-6">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
          style={{ backgroundColor: '#EFF7F2' }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2D7A5F" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 className="font-heading text-2xl font-extrabold mb-3" style={{ color: '#1B3A2D' }}>
          Message sent!
        </h3>
        <p className="text-sm leading-relaxed mb-8" style={{ color: '#4A6358' }}>
          Thank you for reaching out. Our team will get back to you within 2–3 business days.
        </p>
        <button
          onClick={() => { setForm({ name: '', email: '', subject: '', message: '' }); setStatus('idle') }}
          className="text-sm font-semibold px-6 py-3 rounded-full transition-opacity hover:opacity-80"
          style={{ backgroundColor: '#2D5A3D', color: '#fff' }}
        >
          Send another message
        </button>
      </div>
    )
  }

  const fieldClass = (field) =>
    `w-full rounded-lg px-4 py-3 text-sm outline-none border transition-colors focus:ring-2 ${
      errors[field]
        ? 'border-red-400 focus:ring-red-200'
        : 'focus:ring-2 focus:ring-green-200'
    }`

  const fieldStyle = (field) => ({
    borderColor: errors[field] ? '#f87171' : '#E2DAC8',
    color: '#1B3A2D',
    backgroundColor: '#FAFAF8',
  })

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium mb-1.5" style={{ color: '#1B3A2D' }} htmlFor="cf-name">
          Full Name <span aria-hidden="true" style={{ color: '#e05a5a' }}>*</span>
        </label>
        <input
          id="cf-name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange('name')}
          className={fieldClass('name')}
          style={fieldStyle('name')}
          aria-describedby={errors.name ? 'cf-name-err' : undefined}
        />
        {errors.name && <p id="cf-name-err" className="mt-1 text-xs text-red-500">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-1.5" style={{ color: '#1B3A2D' }} htmlFor="cf-email">
          Email Address <span aria-hidden="true" style={{ color: '#e05a5a' }}>*</span>
        </label>
        <input
          id="cf-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange('email')}
          className={fieldClass('email')}
          style={fieldStyle('email')}
          aria-describedby={errors.email ? 'cf-email-err' : undefined}
        />
        {errors.email && <p id="cf-email-err" className="mt-1 text-xs text-red-500">{errors.email}</p>}
      </div>

      {/* Subject */}
      <div>
        <label className="block text-sm font-medium mb-1.5" style={{ color: '#1B3A2D' }} htmlFor="cf-subject">
          Subject <span aria-hidden="true" style={{ color: '#e05a5a' }}>*</span>
        </label>
        <select
          id="cf-subject"
          value={form.subject}
          onChange={handleChange('subject')}
          className={fieldClass('subject')}
          style={{ ...fieldStyle('subject'), appearance: 'none' }}
          aria-describedby={errors.subject ? 'cf-subject-err' : undefined}
        >
          <option value="">Select a subject…</option>
          {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        {errors.subject && <p id="cf-subject-err" className="mt-1 text-xs text-red-500">{errors.subject}</p>}
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium mb-1.5" style={{ color: '#1B3A2D' }} htmlFor="cf-message">
          Message <span aria-hidden="true" style={{ color: '#e05a5a' }}>*</span>
        </label>
        <textarea
          id="cf-message"
          rows={5}
          placeholder="Tell us how we can help…"
          value={form.message}
          onChange={handleChange('message')}
          className={fieldClass('message')}
          style={{ ...fieldStyle('message'), resize: 'vertical' }}
          aria-describedby={errors.message ? 'cf-message-err' : undefined}
        />
        {errors.message && <p id="cf-message-err" className="mt-1 text-xs text-red-500">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-3.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-85 disabled:opacity-60"
        style={{ backgroundColor: '#2D5A3D' }}
      >
        {status === 'loading' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}

// ── Section: Page Hero ──────────────────────────────────────────────────────
function PageHero() {
  return (
    <section aria-labelledby="contact-heading" style={{ backgroundColor: '#F5F0E8' }} className="pt-16 pb-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: '#2D7A5F' }}>
          Contact Us
        </p>
        <h1
          id="contact-heading"
          className="font-heading text-4xl md:text-5xl font-extrabold leading-tight mb-5 max-w-2xl mx-auto"
          style={{ color: '#1B3A2D' }}
        >
          We'd love to hear from you
        </h1>
        <p className="text-base leading-relaxed max-w-xl mx-auto" style={{ color: '#4A6358' }}>
          Whether you need support, want to collaborate, or simply have a question — our team is
          here and ready to respond.
        </p>
      </div>
    </section>
  )
}

// ── Section: Contact Layout ─────────────────────────────────────────────────
const INFO_CARDS = [
  {
    label: 'Our Address',
    value: '14 Wellness Avenue, Victoria Island, Lagos, Nigeria',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    label: 'Email Us',
    value: 'hello@mindfullyaware.org',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: 'Call Us',
    value: '+234 800 MINDFUL\n+234 800 646 3385',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
]

function ContactLayout() {
  return (
    <section aria-label="Contact form and information" style={{ backgroundColor: '#F5F0E8' }} className="pb-20 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
        {/* Form card */}
        <div
          className="lg:col-span-3 bg-white rounded-2xl border p-8 md:p-10 shadow-sm"
          style={{ borderColor: '#E2DAC8' }}
        >
          <h2 className="font-heading text-2xl font-extrabold mb-1" style={{ color: '#1B3A2D' }}>
            Send us a message
          </h2>
          <p className="text-sm mb-7" style={{ color: '#4A6358' }}>
            We aim to reply within 2–3 business days.
          </p>
          <ContactForm />
        </div>

        {/* Info cards */}
        <div className="lg:col-span-2 space-y-4">
          {INFO_CARDS.map(({ label, value, icon }) => (
            <div
              key={label}
              className="bg-white rounded-2xl border p-6 flex gap-4 items-start shadow-sm"
              style={{ borderColor: '#E2DAC8' }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: '#EFF7F2', color: '#2D7A5F' }}
              >
                {icon}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#2D7A5F' }}>
                  {label}
                </p>
                <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: '#1B3A2D' }}>
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Section: Map placeholder ────────────────────────────────────────────────
function MapPlaceholder() {
  return (
    <section aria-label="Office location map" style={{ backgroundColor: '#EFF7F2' }} className="px-4 py-4">
      <div className="max-w-7xl mx-auto">
        <div
          className="rounded-2xl flex items-center justify-center"
          style={{ height: '300px', backgroundColor: '#D9EDE5' }}
        >
          <div className="text-center">
            <svg
              className="w-10 h-10 mx-auto mb-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2D7A5F"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <p className="text-sm font-medium" style={{ color: '#2D7A5F' }}>
              14 Wellness Avenue, Victoria Island, Lagos
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Section: Crisis Support Banner ─────────────────────────────────────────
function CrisisBanner() {
  return (
    <section aria-labelledby="crisis-heading" style={{ backgroundColor: '#F5F0E8' }} className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div
          className="rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          style={{ backgroundColor: '#1B3A2D' }}
        >
          <div className="flex gap-4 items-start">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
              style={{ backgroundColor: '#E8C547' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B3A2D" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth={2.8} />
              </svg>
            </div>
            <div>
              <h2 id="crisis-heading" className="font-heading text-xl font-extrabold text-white mb-2">
                Are you in crisis right now?
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: '#7AAA8E' }}>
                If you or someone you know is in immediate danger, please call your local emergency services.
                Our trained crisis support team is available 24/7 on the number below.
              </p>
            </div>
          </div>
          <a
            href="tel:+2348006463385"
            className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded-full whitespace-nowrap transition-opacity hover:opacity-85 shrink-0"
            style={{ backgroundColor: '#E8C547', color: '#1B3A2D' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            Call Crisis Line
          </a>
        </div>
      </div>
    </section>
  )
}

// ── Section: FAQ Accordion ──────────────────────────────────────────────────
function FAQ() {
  const [openIdx, setOpenIdx] = useState(null)

  const toggle = (i) => setOpenIdx((prev) => (prev === i ? null : i))

  return (
    <section aria-labelledby="faq-heading" style={{ backgroundColor: '#F5F0E8' }} className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#2D7A5F' }}>
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="font-heading text-3xl md:text-4xl font-extrabold"
            style={{ color: '#1B3A2D' }}
          >
            Frequently asked questions
          </h2>
        </div>

        <dl className="space-y-3">
          {FAQS.map(({ q, a }, i) => {
            const isOpen = openIdx === i
            return (
              <div
                key={q}
                className="bg-white rounded-2xl border overflow-hidden"
                style={{ borderColor: '#E2DAC8' }}
              >
                <dt>
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between px-7 py-5 text-left"
                  >
                    <span className="font-heading text-sm font-bold pr-4" style={{ color: '#1B3A2D' }}>
                      {q}
                    </span>
                    <span
                      className="text-xl font-bold leading-none shrink-0 transition-transform duration-200"
                      style={{
                        color: '#2D7A5F',
                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                        display: 'inline-block',
                      }}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                </dt>
                <dd
                  style={{
                    maxHeight: isOpen ? '600px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease',
                  }}
                >
                  <p
                    className="px-7 pb-6 text-sm leading-relaxed"
                    style={{ color: '#4A6358' }}
                  >
                    {a}
                  </p>
                </dd>
              </div>
            )
          })}
        </dl>
      </div>
    </section>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  return (
    <>
      <PageHero />
      <ContactLayout />
      <MapPlaceholder />
      <CrisisBanner />
      <FAQ />
    </>
  )
}
