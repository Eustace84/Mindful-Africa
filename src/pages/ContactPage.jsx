import { useState } from 'react'

const subjects = [
  'General Enquiry',
  'Request Mental Health Support',
  'Partnership & Collaboration',
  'Donation & Funding',
  'Media & Press',
  'Volunteer Opportunities',
  'Other',
]

const officeInfo = [
  {
    label: 'Head Office',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    lines: ['3rd Floor, Wellness House', 'Musa Gitau Road, Westlands', 'Nairobi, Kenya — 00100'],
  },
  {
    label: 'Phone',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    lines: ['+254 (0) 700 123 456', '+234 (0) 801 234 5678', 'Crisis Line: 0800 MINDFUL (toll-free)'],
  },
  {
    label: 'Email',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    lines: ['hello@mindfulafrica.org', 'support@mindfulafrica.org', 'press@mindfulafrica.org'],
  },
  {
    label: 'Office Hours',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    lines: ['Monday – Friday: 8:00 AM – 6:00 PM EAT', 'Saturday: 9:00 AM – 1:00 PM EAT', 'Crisis support: 24 hours, 7 days'],
  },
]

const socialLinks = [
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
]

function InputField({ label, id, type = 'text', placeholder, value, onChange, required }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-bark">
        {label}
        {required && <span className="text-earth-600 ml-0.5" aria-hidden="true">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        aria-required={required}
        className="bg-white border border-stone-200 text-bark placeholder-gray-400 text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-600 focus:border-transparent transition-all"
      />
    </div>
  )
}

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 1200)
  }

  return (
    <>
      {/* ── Page Hero ── */}
      <section
        aria-labelledby="contact-hero-heading"
        className="bg-gradient-to-br from-forest-900 to-forest-700 py-24 px-4 relative overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-forest-600/20 blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-earth-600/15 blur-3xl translate-y-1/3 -translate-x-1/4" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-earth-400 text-sm font-semibold uppercase tracking-widest mb-5">
            Get In Touch
          </p>
          <h1
            id="contact-hero-heading"
            className="font-heading text-4xl md:text-5xl font-bold text-white leading-tight mb-6"
          >
            We'd love to hear from you
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
            Whether you need support, want to partner with us, or simply have a question — our team is ready to listen. Reach out and let's start a conversation.
          </p>
        </div>
      </section>

      {/* ── Contact Section ── */}
      <section
        aria-labelledby="contact-form-heading"
        className="bg-cream py-20 px-4"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* ── Left: Info + Map ── */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <p className="text-earth-600 text-sm font-semibold uppercase tracking-widest mb-2">
                Contact Information
              </p>
              <h2
                id="contact-form-heading"
                className="font-heading text-2xl font-bold text-bark mb-6"
              >
                Find us. Reach us. Connect.
              </h2>
            </div>

            <div className="space-y-6">
              {officeInfo.map(({ label, icon, lines }) => (
                <div key={label} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-50 text-forest-600 flex items-center justify-center shrink-0 mt-0.5">
                    {icon}
                  </div>
                  <div>
                    <p className="font-semibold text-bark text-sm mb-1">{label}</p>
                    {lines.map((line) => (
                      <p key={line} className="text-gray-600 text-sm leading-relaxed">{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div>
              <p className="font-semibold text-bark text-sm mb-4">Follow Us</p>
              <div className="flex gap-3" role="list" aria-label="Social media links">
                {socialLinks.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    role="listitem"
                    className="w-10 h-10 rounded-full bg-green-50 hover:bg-forest-600 text-forest-600 hover:text-white flex items-center justify-center transition-all duration-200"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div
              className="rounded-2xl overflow-hidden border border-stone-200 shadow-sm"
              role="img"
              aria-label="Map showing Mindful Africa office location in Nairobi, Kenya"
            >
              <div className="bg-green-50 h-56 flex flex-col items-center justify-center text-center gap-3 p-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-forest-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="font-heading font-semibold text-bark text-sm">Mindful Africa HQ</p>
                <p className="text-gray-500 text-xs">Wellness House, Westlands, Nairobi</p>
                <a
                  href="https://maps.google.com/?q=Westlands+Nairobi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-forest-600 hover:text-forest-800 text-xs font-semibold underline transition-colors"
                >
                  Open in Google Maps ↗
                </a>
              </div>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-8 md:p-10">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-12 gap-5">
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
                    <svg className="w-8 h-8 text-forest-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-bark">Message Received!</h3>
                  <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
                    Thank you for reaching out, <strong>{form.name}</strong>. Our team will get back to you at <strong>{form.email}</strong> within 1–2 business days.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setForm({ name: '', email: '', subject: '', message: '' })
                    }}
                    className="mt-2 text-forest-600 hover:text-forest-800 text-sm font-semibold underline transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-heading text-2xl font-bold text-bark mb-2">Send us a message</h2>
                  <p className="text-gray-500 text-sm mb-8">
                    Fields marked with <span className="text-earth-600">*</span> are required.
                  </p>

                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-5"
                    aria-label="Contact form"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <InputField
                        label="Full Name"
                        id="name"
                        placeholder="e.g. Amara Diallo"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                      <InputField
                        label="Email Address"
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="subject" className="text-sm font-semibold text-bark">
                        Subject <span className="text-earth-600" aria-hidden="true">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        className="bg-white border border-stone-200 text-bark text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-600 focus:border-transparent transition-all appearance-none cursor-pointer"
                      >
                        <option value="" disabled>Select a subject…</option>
                        {subjects.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="text-sm font-semibold text-bark">
                        Message <span className="text-earth-600" aria-hidden="true">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        placeholder="Tell us how we can help you…"
                        value={form.message}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        className="bg-white border border-stone-200 text-bark placeholder-gray-400 text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-600 focus:border-transparent transition-all resize-none"
                      />
                      <p className="text-gray-400 text-xs text-right">
                        {form.message.length} / 1000 characters
                      </p>
                    </div>

                    {/* Consent */}
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="consent"
                        required
                        aria-required="true"
                        className="mt-0.5 w-4 h-4 accent-forest-600 cursor-pointer shrink-0"
                      />
                      <label htmlFor="consent" className="text-gray-600 text-xs leading-relaxed cursor-pointer">
                        I agree to Mindful Africa's{' '}
                        <a href="#" className="text-forest-600 underline hover:text-forest-800">Privacy Policy</a>
                        {' '}and consent to being contacted regarding my enquiry.
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-forest-600 hover:bg-forest-700 disabled:opacity-60 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Crisis Banner ── */}
      <section
        aria-labelledby="crisis-heading"
        className="bg-earth-700 py-14 px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-12 h-12 rounded-full bg-earth-600 flex items-center justify-center mx-auto mb-5">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <h2
            id="crisis-heading"
            className="font-heading text-2xl md:text-3xl font-bold text-white mb-4"
          >
            In crisis? You don't have to wait.
          </h2>
          <p className="text-amber-200 text-base leading-relaxed mb-6 max-w-xl mx-auto">
            Our crisis line is available 24 hours a day, 7 days a week. You are not alone. Help is one call away.
          </p>
          <a
            href="tel:0800646338"
            className="inline-flex items-center gap-2 bg-white text-earth-700 font-bold px-8 py-4 rounded-full text-base hover:bg-cream transition-all duration-200 shadow-lg hover:shadow-xl"
            aria-label="Call our 24/7 mental health crisis helpline"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call 0800 MINDFUL (Free)
          </a>
        </div>
      </section>
    </>
  )
}
