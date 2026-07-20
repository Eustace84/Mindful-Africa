import { useState, useRef } from 'react'
// import { useForm, ValidationError } from '@formspree/react'

import { motion, useInView } from 'framer-motion';

// // ── FAQ data ────────────────────────────────────────────────────────────────
// const FAQS = [
//   {
//     q: 'How can I access mental health support through Mindfully Aware?',
//     a: 'You can reach us via our contact form, email, or phone. We offer direct referrals to trained counsellors and peer support coordinators in your region. If you are in crisis, please use our crisis line listed below.',
//   },
//   {
//     q: 'Is your support free?',
//     a: 'Yes. All of our peer support services, educational resources, and community circles are free to access. We are a nonprofit funded by donations and grants.',
//   },
//   {
//     q: 'Which African countries do you currently operate in?',
//     a: 'We currently have active programs in Nigeria, Ghana, Kenya, South Africa, Uganda, Tanzania, Senegal, Ethiopia, Rwanda, Zambia, Zimbabwe, and Cameroon — with more being added as we grow.',
//   },
//   {
//     q: 'How can I volunteer or partner with Mindfully Aware?',
//     a: 'Use the contact form and select "Partnerships & Collaboration" as the subject. We welcome mental health professionals, community organisations, corporates, and individual volunteers.',
//   },
//   {
//     q: 'I am a mental health professional. Can I contribute?',
//     a: 'Absolutely. We partner with licensed psychologists, psychiatrists, counsellors, and community health workers. Please reach out via the form or email us directly.',
//   },
//   {
//     q: 'How is my donation used?',
//     a: 'Donations fund our community support circles, training of local advocates, crisis support lines, and awareness campaigns. We publish annual impact reports on our website.',
//   },
// ]

// // ── Contact form ────────────────────────────────────────────────────────────
// const SUBJECTS = [
//   'General Enquiry',
//   'Request Mental Health Support',
//   'Partnerships & Collaboration',
//   'Donations & Funding',
//   'Volunteering',
//   'Press & Media',
// ]

// function ContactFormFields({ onReset }) {
//   const [state, formspreeSubmit] = useForm('xjgqwkpr');
//   const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
//   const [errors, setErrors] = useState({})

//   const validate = () => {
//     const e = {}
//     if (!form.name.trim()) e.name = 'Please enter your name.'
//     if (!form.email.trim()) {
//       e.email = 'Please enter your email.'
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
//       e.email = 'Please enter a valid email address.'
//     }
//     if (!form.subject) e.subject = 'Please select a subject.'
//     if (!form.message.trim()) e.message = 'Please enter your message.'
//     else if (form.message.trim().length < 20) e.message = 'Message must be at least 20 characters.'
//     return e
//   }

//   const handleChange = (field) => (e) => {
//     setForm((f) => ({ ...f, [field]: e.target.value }))
//     if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }))
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     const e2 = validate()
//     if (Object.keys(e2).length) { setErrors(e2); return }
//     setErrors({})
//     formspreeSubmit(e)
//   }

//   if (state.succeeded) {
//     return (
//       <div className="flex flex-col items-center justify-center text-center py-20 px-6">
//         <div
//           className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
//           style={{ backgroundColor: '#EFF7F2' }}
//         >
//           <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2D7A5F" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
//             <path d="M20 6L9 17l-5-5" />
//           </svg>
//         </div>
//         <h3 className="font-heading text-2xl font-extrabold mb-3" style={{ color: '#1B3A2D' }}>
//           Message sent!
//         </h3>
//         <p className="text-sm leading-relaxed mb-8" style={{ color: '#4A6358' }}>
//           Thank you for reaching out. Our team will get back to you within 2–3 business days.
//         </p>
//         <button
//           onClick={onReset}
//           className="text-sm font-semibold px-6 py-3 rounded-full transition-opacity hover:opacity-80"
//           style={{ backgroundColor: '#2D5A3D', color: '#fff' }}
//         >
//           Send another message
//         </button>
//       </div>
//     )
//   }

//   const fieldClass = (field) =>
//     `w-full rounded-lg px-4 py-3 text-sm outline-none border transition-colors focus:ring-2 ${
//       errors[field] ? 'border-red-400 focus:ring-red-200' : 'focus:ring-2 focus:ring-green-200'
//     }`

//   const fieldStyle = (field) => ({
//     borderColor: errors[field] ? '#f87171' : '#E2DAC8',
//     color: '#1B3A2D',
//     backgroundColor: '#FAFAF8',
//   })

//   return (
//     <form onSubmit={handleSubmit} noValidate className="space-y-5">
//       {/* Name */}
//       <div>
//         <label className="block text-sm font-medium mb-1.5" style={{ color: '#1B3A2D' }} htmlFor="cf-name">
//           Full Name <span aria-hidden="true" style={{ color: '#e05a5a' }}>*</span>
//         </label>
//         <input
//           id="cf-name"
//           type="text"
//           name="name"
//           autoComplete="name"
//           placeholder="Your name"
//           value={form.name}
//           onChange={handleChange('name')}
//           className={fieldClass('name')}
//           style={fieldStyle('name')}
//           aria-describedby={errors.name ? 'cf-name-err' : undefined}
//         />
//         {errors.name && <p id="cf-name-err" className="mt-1 text-xs text-red-500">{errors.name}</p>}
//         <ValidationError prefix="Name" field="name" errors={state.errors} className="mt-1 text-xs text-red-500" />
//       </div>

//       {/* Email */}
//       <div>
//         <label className="block text-sm font-medium mb-1.5" style={{ color: '#1B3A2D' }} htmlFor="cf-email">
//           Email Address <span aria-hidden="true" style={{ color: '#e05a5a' }}>*</span>
//         </label>
//         <input
//           id="cf-email"
//           type="email"
//           name="email"
//           autoComplete="email"
//           placeholder="you@example.com"
//           value={form.email}
//           onChange={handleChange('email')}
//           className={fieldClass('email')}
//           style={fieldStyle('email')}
//           aria-describedby={errors.email ? 'cf-email-err' : undefined}
//         />
//         {errors.email && <p id="cf-email-err" className="mt-1 text-xs text-red-500">{errors.email}</p>}
//         <ValidationError prefix="Email" field="email" errors={state.errors} className="mt-1 text-xs text-red-500" />
//       </div>

//       {/* Subject */}
//       <div>
//         <label className="block text-sm font-medium mb-1.5" style={{ color: '#1B3A2D' }} htmlFor="cf-subject">
//           Subject <span aria-hidden="true" style={{ color: '#e05a5a' }}>*</span>
//         </label>
//         <select
//           id="cf-subject"
//           name="subject"
//           value={form.subject}
//           onChange={handleChange('subject')}
//           className={fieldClass('subject')}
//           style={{ ...fieldStyle('subject'), appearance: 'none' }}
//           aria-describedby={errors.subject ? 'cf-subject-err' : undefined}
//         >
//           <option value="">Select a subject…</option>
//           {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
//         </select>
//         {errors.subject && <p id="cf-subject-err" className="mt-1 text-xs text-red-500">{errors.subject}</p>}
//         <ValidationError prefix="Subject" field="subject" errors={state.errors} className="mt-1 text-xs text-red-500" />
//       </div>

//       {/* Message */}
//       <div>
//         <label className="block text-sm font-medium mb-1.5" style={{ color: '#1B3A2D' }} htmlFor="cf-message">
//           Message <span aria-hidden="true" style={{ color: '#e05a5a' }}>*</span>
//         </label>
//         <textarea
//           id="cf-message"
//           name="message"
//           rows={5}
//           placeholder="Tell us how we can help…"
//           value={form.message}
//           onChange={handleChange('message')}
//           className={fieldClass('message')}
//           style={{ ...fieldStyle('message'), resize: 'vertical' }}
//           aria-describedby={errors.message ? 'cf-message-err' : undefined}
//         />
//         {errors.message && <p id="cf-message-err" className="mt-1 text-xs text-red-500">{errors.message}</p>}
//         <ValidationError prefix="Message" field="message" errors={state.errors} className="mt-1 text-xs text-red-500" />
//       </div>

//       <button
//         type="submit"
//         disabled={state.submitting}
//         className="w-full py-3.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-85 disabled:opacity-60"
//         style={{ backgroundColor: '#2D5A3D' }}
//       >
//         {state.submitting ? 'Sending…' : 'Send Message'}
//       </button>
//     </form>
//   )
// }

// function ContactForm() {
//   const [resetKey, setResetKey] = useState(0)
//   return <ContactFormFields key={resetKey} onReset={() => setResetKey((k) => k + 1)} />
// }

// // ── Section: Page Hero ──────────────────────────────────────────────────────
// function PageHero() {
//   return (
//     <section aria-labelledby="contact-heading" style={{ backgroundColor: '#F5F0E8' }} className="pt-16 pb-20 px-4">
//       <div className="max-w-7xl mx-auto text-center">
//         <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: '#2D7A5F' }}>
//           Contact Us
//         </p>
//         <h1
//           id="contact-heading"
//           className="font-heading text-4xl md:text-5xl font-extrabold leading-tight mb-5 max-w-2xl mx-auto"
//           style={{ color: '#1B3A2D' }}
//         >
//           We'd love to hear from you
//         </h1>
//         <p className="text-base leading-relaxed max-w-xl mx-auto" style={{ color: '#4A6358' }}>
//           Whether you need support, want to collaborate, or simply have a question — our team is
//           here and ready to respond.
//         </p>
//       </div>
//     </section>
//   )
// }

// // ── Section: Contact Layout ─────────────────────────────────────────────────
// const INFO_CARDS = [
//   {
//     label: 'Our Address',
//     value: '14 Wellness Avenue, Victoria Island, Lagos, Nigeria',
//     icon: (
//       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
//         <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
//         <circle cx="12" cy="10" r="3" />
//       </svg>
//     ),
//   },
//   {
//     label: 'Email Us',
//     value: 'hello@mindfullyaware.org',
//     icon: (
//       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
//         <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
//         <polyline points="22,6 12,13 2,6" />
//       </svg>
//     ),
//   },
//   {
//     label: 'Call Us',
//     value: '+234 800 MINDFUL\n+234 800 646 3385',
//     icon: (
//       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
//         <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
//       </svg>
//     ),
//   },
// ]

// function ContactLayout() {
//   return (
//     <section aria-label="Contact form and information" style={{ backgroundColor: '#F5F0E8' }} className="pb-20 px-4">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
//         {/* Form card */}
//         <div
//           className="lg:col-span-3 bg-white rounded-2xl border p-8 md:p-10 shadow-sm"
//           style={{ borderColor: '#E2DAC8' }}
//         >
//           <h2 className="font-heading text-2xl font-extrabold mb-1" style={{ color: '#1B3A2D' }}>
//             Send us a message
//           </h2>
//           <p className="text-sm mb-7" style={{ color: '#4A6358' }}>
//             We aim to reply within 2–3 business days.
//           </p>
//           <ContactForm />
//         </div>

//         {/* Info cards */}
//         <div className="lg:col-span-2 space-y-4">
//           {INFO_CARDS.map(({ label, value, icon }) => (
//             <div
//               key={label}
//               className="bg-white rounded-2xl border p-6 flex gap-4 items-start shadow-sm"
//               style={{ borderColor: '#E2DAC8' }}
//             >
//               <div
//                 className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
//                 style={{ backgroundColor: '#EFF7F2', color: '#2D7A5F' }}
//               >
//                 {icon}
//               </div>
//               <div>
//                 <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#2D7A5F' }}>
//                   {label}
//                 </p>
//                 <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: '#1B3A2D' }}>
//                   {value}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

// // ── Section: Map placeholder ────────────────────────────────────────────────
// function MapPlaceholder() {
//   return (
//     <section aria-label="Office location map" style={{ backgroundColor: '#EFF7F2' }} className="px-4 py-4">
//       <div className="max-w-7xl mx-auto">
//         <div
//           className="rounded-2xl flex items-center justify-center"
//           style={{ height: '300px', backgroundColor: '#D9EDE5' }}
//         >
//           <div className="text-center">
//             <svg
//               className="w-10 h-10 mx-auto mb-3"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="#2D7A5F"
//               strokeWidth={1.6}
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               aria-hidden="true"
//             >
//               <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
//               <circle cx="12" cy="10" r="3" />
//             </svg>
//             <p className="text-sm font-medium" style={{ color: '#2D7A5F' }}>
//               14 Wellness Avenue, Victoria Island, Lagos
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// // ── Section: Crisis Support Banner ─────────────────────────────────────────
// function CrisisBanner() {
//   return (
//     <section aria-labelledby="crisis-heading" style={{ backgroundColor: '#F5F0E8' }} className="py-8 px-4">
//       <div className="max-w-7xl mx-auto">
//         <div
//           className="rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
//           style={{ backgroundColor: '#1B3A2D' }}
//         >
//           <div className="flex gap-4 items-start">
//             <div
//               className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
//               style={{ backgroundColor: '#E8C547' }}
//             >
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B3A2D" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
//                 <line x1="12" y1="9" x2="12" y2="13" />
//                 <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth={2.8} />
//               </svg>
//             </div>
//             <div>
//               <h2 id="crisis-heading" className="font-heading text-xl font-extrabold text-white mb-2">
//                 Are you in crisis right now?
//               </h2>
//               <p className="text-sm leading-relaxed" style={{ color: '#7AAA8E' }}>
//                 If you or someone you know is in immediate danger, please call your local emergency services.
//                 Our trained crisis support team is available 24/7 on the number below.
//               </p>
//             </div>
//           </div>
//           <a
//             href="tel:+2348006463385"
//             className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded-full whitespace-nowrap transition-opacity hover:opacity-85 shrink-0"
//             style={{ backgroundColor: '#E8C547', color: '#1B3A2D' }}
//           >
//             <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
//               <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
//             </svg>
//             Call Crisis Line
//           </a>
//         </div>
//       </div>
//     </section>
//   )
// }

// // ── Section: FAQ Accordion ──────────────────────────────────────────────────
// function FAQ() {
//   const [openIdx, setOpenIdx] = useState(null)

//   const toggle = (i) => setOpenIdx((prev) => (prev === i ? null : i))

//   return (
//     <section aria-labelledby="faq-heading" style={{ backgroundColor: '#F5F0E8' }} className="py-20 px-4">
//       <div className="max-w-3xl mx-auto">
//         <div className="text-center mb-12">
//           <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#2D7A5F' }}>
//             FAQ
//           </p>
//           <h2
//             id="faq-heading"
//             className="font-heading text-3xl md:text-4xl font-extrabold"
//             style={{ color: '#1B3A2D' }}
//           >
//             Frequently asked questions
//           </h2>
//         </div>

//         <dl className="space-y-3">
//           {FAQS.map(({ q, a }, i) => {
//             const isOpen = openIdx === i
//             return (
//               <div
//                 key={q}
//                 className="bg-white rounded-2xl border overflow-hidden"
//                 style={{ borderColor: '#E2DAC8' }}
//               >
//                 <dt>
//                   <button
//                     type="button"
//                     onClick={() => toggle(i)}
//                     aria-expanded={isOpen}
//                     className="w-full flex items-center justify-between px-7 py-5 text-left"
//                   >
//                     <span className="font-heading text-sm font-bold pr-4" style={{ color: '#1B3A2D' }}>
//                       {q}
//                     </span>
//                     <span
//                       className="text-xl font-bold leading-none shrink-0 transition-transform duration-200"
//                       style={{
//                         color: '#2D7A5F',
//                         transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
//                         display: 'inline-block',
//                       }}
//                       aria-hidden="true"
//                     >
//                       +
//                     </span>
//                   </button>
//                 </dt>
//                 <dd
//                   style={{
//                     maxHeight: isOpen ? '600px' : '0',
//                     overflow: 'hidden',
//                     transition: 'max-height 0.3s ease',
//                   }}
//                 >
//                   <p
//                     className="px-7 pb-6 text-sm leading-relaxed"
//                     style={{ color: '#4A6358' }}
//                   >
//                     {a}
//                   </p>
//                 </dd>
//               </div>
//             )
//           })}
//         </dl>
//       </div>
//     </section>
//   )
// }



function RevealOnScroll({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay }}>
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SHARED ICON COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */

function IcoSend({ size = 12 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'>
      <line x1='22' y1='2' x2='11' y2='13' />
      <polygon points='22 2 15 22 11 13 2 9 22 2' />
    </svg>
  );
}



function IcoEnvelope({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'>
      <path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' />
      <polyline points='22,6 12,13 2,6' />
    </svg>
  );
}

const EMPTY_CONTACT_FORM = { name: '', email: '', message: '' };

/* ═══════════════════════════════════════════════════════════════════════════
   SHARED ICON COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */


function IcoFacebook({ size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'>
      <path d='M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' />
    </svg>
  );
}

function IcoLinkedIn({ size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'>
      <path d='M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z' />
      <circle cx='4' cy='4' r='2' />
    </svg>
  );
}

function IcoInstagram({ size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'>
      <rect x='2' y='2' width='20' height='20' rx='5' ry='5' />
      <path d='M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z' />
      <line x1='17.5' y1='6.5' x2='17.51' y2='6.5' />
    </svg>
  );
}

function IcoTwitterX({ size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={1.8}
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'>
      <path d='M4 4l16 16M20 4L4 20' />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 
   ═══════════════════════════════════════════════════════════════════════════ */


const SOCIAL_PLATFORMS = [
  { label: 'Facebook', icon: <IcoFacebook /> },
  { label: 'LinkedIn', icon: <IcoLinkedIn /> },
  { label: 'Instagram', icon: <IcoInstagram /> },
  { label: 'Twitter / X', icon: <IcoTwitterX /> },
];
/* ═══════════════════════════════════════════════════════════════════════════
  
   ═══════════════════════════════════════════════════════════════════════════ */


function ContactSection() {
  const [form, setForm] = useState(EMPTY_CONTACT_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [newsEmail, setNewsEmail] = useState('');
  const [newsSubscribed, setNewsSubscribed] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log('Contact:', form);
    setSubmitted(true);
  }
  function handleNewsSubmit(e) {
    e.preventDefault();
    console.log('Newsletter:', newsEmail);
    setNewsSubscribed(true);
  }

  const iStyle = {
    border: '1px solid #C8BDAA',
    backgroundColor: '#FDFAF2',
    color: '#1B3A2D',
  };
  const iClass =
    'w-full rounded-lg px-3 py-2.5 text-sm outline-none transition-colors';

  return (
    <section
      id='contact'
      aria-labelledby='contact-heading'
      style={{ backgroundColor: '#FEFAF1' }}
      className='py-20 px-4 mr-2 ml-2'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start'>
        {/* Left info column */}
        <RevealOnScroll>
          <div>
            <p
              className='uppercase mb-4'
              style={{
                fontFamily: 'Crimson Text',
                color: '#547563',
                fontSize: '18px',
                fontWeight: 600,
                letterSpacing: '0.5px',
                lineHeight: '24px',
              }}>
              Contact
            </p>
            <h2
              id='contact-heading'
              className='font-heading leading-[1.1] mb-5'
              style={{
                fontFamily: 'Crimson Pro',
                color: '#1D2825',
                fontSize: '54px',
                fontWeight: 600,
                lineHeight: '56px',
                letterSpacing: '0.5px',
              }}>
              Please reach out, we read every message.
            </h2>
            <p
              className='leading-relaxed mb-8'
              style={{
                color: '#5D665B',
                maxWidth: '560px',
                fontSize: '20px',
                lineHeight: '27px',
                letterSpacing: '0.5px',
                fontWeight: 400,
              }}>
              Whether it's a question, an idea, or just hello, we're glad you're
              here.
            </p>

            <a
              href='mailto:minddfulafrica@gmail.com
'
              className='inline-flex items-center gap-2.5 text-sm font-medium mb-8 hover:opacity-70 transition-opacity'
              style={{
                color: '#5D665B',
                fontFamily: 'Inria Serif',
                fontWeight: '400',
                fontSize: '18px',
                lineHeight: '27px',
                letterSpacing: '0.5px',
              }}>
              <IcoEnvelope size={16} />
              minddfulafrica@gmail.com
            </a>

            <div className='flex gap-2 mb-10'>
              {SOCIAL_PLATFORMS.map(({ label, icon }) => (
                <button
                  key={label}
                  aria-label={label}
                  className='w-9 h-9 rounded-full flex items-center justify-center transition-shadow hover:shadow-sm focus:outline-none'
                  style={{ backgroundColor: '#F9F4E3', color: '#1D2825' }}>
                  {icon}
                </button>
              ))}
            </div>

            {/* Newsletter card */}
            <div
              className='rounded-xl border p-5'
              style={{ backgroundColor: '##F9F4E3', borderColor: '#D5D1C3' }}>
              <p
                className='font-bold text-sm mb-1'
                style={{
                  fontFamily: 'Crimson Pro',
                  color: '#1D2825',
                  fontWeight: 500,
                  fontSize: '18px',
                  lineHeight: '27px',
                  letterSpacing: '0.5px',
                }}>
                Stay in the loop
              </p>
              <p
                className='text-xs leading-relaxed mb-4'
                style={{
                  fontFamily: 'Crimson Pro',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '27px',
                  letterSpacing: '0.5px',
                }}>
                Quiet, monthly notes. No noise, just stories and updates.
              </p>
              {newsSubscribed ? (
                <p
                  className='text-xs font-semibold'
                  style={{ color: '#2D7A5F' }}>
                  ✓ You're subscribed. Thank you!
                </p>
              ) : (
                <form onSubmit={handleNewsSubmit} className='flex gap-2'>
                  <input
                    type='email'
                    value={newsEmail}
                    onChange={(e) => setNewsEmail(e.target.value)}
                    required
                    placeholder='your@email.com'
                    className='flex-1 min-w-0 rounded-full px-4 py-2 text-xs outline-none'
                    style={{
                      border: '1px solid #C8BDAA',
                      backgroundColor: '#FFFFFF',
                      color: '#1B3A2D',
                    }}
                  />
                  <button
                    type='submit'
                    className='inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white shrink-0 transition-opacity hover:opacity-85 focus:outline-none'
                    style={{
                      backgroundColor: '#547563',
                      color: '#FFFFFF',
                      fontFamily: 'Crimson Pro',
                      size: '18px',
                      lineHeight: '27px',
                      letterSpacing: '0.5px',
                      fontWeight: 500,
                    }}>
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
          <div
            className='bg-[#FFFDF9] rounded-2xl border p-8'
            style={{ borderColor: '#D5D1C3' }}>
            {submitted ? (
              <div className='py-10 text-center'>
                <p
                  className='font-heading font-bold text-xl mb-2'
                  style={{ color: '#1B3A2D' }}>
                  Message sent!
                </p>
                <p className='text-sm mb-6' style={{ color: '#5A7068' }}>
                  Thank you for reaching out. We'll get back to you soon.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm(EMPTY_CONTACT_FORM);
                  }}
                  className='text-xs font-semibold underline focus:outline-none'
                  style={{
                    color: '#547563',
                    fontFamily: 'Crimson Pro',
                    fontWeight: 500,
                    fontSize: '18px',
                    lineHeight: '27px',
                    letterSpacing: '0.5px',
                  }}>
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className='space-y-5'>
                <div>
                  <label
                    htmlFor='ct-name'
                    className='block text-xs font-medium mb-1.5'
                    style={{
                      fontFamily: 'Crimson Pro',
                      color: '#000000',
                      fontWeight: 500,
                      fontSize: '18px',
                      lineHeight: '27px',
                      letterSpacing: '0.5px',
                    }}>
                    Full Name
                  </label>
                  <input
                    id='ct-name'
                    type='text'
                    name='name'
                    value={form.name}
                    onChange={handleChange}
                    required
                    className={iClass}
                    style={iStyle}
                  />
                </div>
                <div>
                  <label
                    htmlFor='ct-email'
                    className='block text-xs font-medium mb-1.5'
                    style={{
                      fontFamily: 'Crimson Pro',
                      color: '#000000',
                      fontWeight: 500,
                      fontSize: '18px',
                      lineHeight: '27px',
                      letterSpacing: '0.5px',
                    }}>
                    Email
                  </label>
                  <input
                    id='ct-email'
                    type='email'
                    name='email'
                    value={form.email}
                    onChange={handleChange}
                    required
                    className={iClass}
                    style={iStyle}
                  />
                </div>
                <div>
                  <label
                    htmlFor='ct-message'
                    className='block text-xs font-medium mb-1.5'
                    style={{
                      fontFamily: 'Crimson Pro',
                      color: '#000000',
                      fontWeight: 500,
                      fontSize: '18px',
                      lineHeight: '27px',
                      letterSpacing: '0.5px',
                    }}>
                    Message
                  </label>
                  <textarea
                    id='ct-message'
                    name='message'
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    required
                    className={`${iClass} resize-none`}
                    style={iStyle}
                  />
                </div>
                <motion.button
                  type='submit'
                  className='w-full py-3 rounded-full text-sm font-bold text-white focus:outline-none'
                  style={{
                    backgroundColor: '#547563',
                    fontFamily: 'Crimson Pro',
                    fontWeight: 500,
                    lineHeight: '27px',
                    fontSize: '18px',
                    letterSpacing: '0.5px',
                    color: '#FFFFFF',
                  }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.15 }}>
                  Send Message
                </motion.button>
              </form>
            )}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  return (
    <>
      <ContactSection/>
      {/* <PageHero />
      <ContactLayout />
      <MapPlaceholder />
      <CrisisBanner />
      <FAQ /> */}
    </>
  )
}
