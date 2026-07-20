import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
// import { Link } from 'react-router-dom'
import communityGirl from '../images/community-girl.png';


// ── Section: Page Hero ──────────────────────────────────────────────────────
// function PageHero() {
//   return (
//     <section
//       aria-labelledby="about-heading"
//       style={{ backgroundColor: '#F5F0E8' }}
//       className="pt-16 pb-20 px-4"
//     >
//       <div className="max-w-7xl mx-auto text-center">
//         <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: '#2D7A5F' }}>
//           About Us
//         </p>
//         <h1
//           id="about-heading"
//           className="font-heading text-4xl md:text-5xl font-extrabold leading-tight mb-6 max-w-3xl mx-auto"
//           style={{ color: '#1B3A2D' }}
//         >
//           We exist so that no African has to{' '}
//           <em style={{ color: '#2D7A5F', fontStyle: 'italic' }}>heal</em> alone
//         </h1>
//         <p className="text-base leading-relaxed max-w-2xl mx-auto mb-12" style={{ color: '#4A6358' }}>
//           Mindfully Aware is a registered African nonprofit dedicated to making mental health care
//           accessible, culturally relevant, and stigma-free for every community on the continent.
//         </p>

//         {/* Stats row */}
//         <div className="inline-grid grid-cols-3 rounded-2xl border overflow-hidden" style={{ borderColor: '#E2DAC8' }}>
//           {[
//             { value: '2022', label: 'Founded' },
//             { value: '12+', label: 'Countries' },
//             { value: '50,000+', label: 'Lives Touched' },
//           ].map(({ value, label }, i) => (
//             <div
//               key={label}
//               className="px-8 py-6 text-center"
//               style={{ borderRight: i < 2 ? '1px solid #E2DAC8' : 'none' }}
//             >
//               <p className="font-heading text-3xl font-extrabold mb-1" style={{ color: '#2D7A5F' }}>
//                 {value}
//               </p>
//               <p className="text-xs uppercase tracking-wide" style={{ color: '#4A6358' }}>
//                 {label}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

// // ── Section: Our Story ──────────────────────────────────────────────────────
// function OurStory() {
//   return (
//     <section
//       aria-labelledby="story-heading"
//       style={{ backgroundColor: '#fff' }}
//       className="py-20 px-4"
//     >
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
//         {/* Stacked images */}
//         <div className="grid grid-cols-2 gap-4">
//           <div className="col-span-2 rounded-2xl overflow-hidden shadow-md" style={{ aspectRatio: '16/9' }}>
//             <img
//               src="https://placehold.co/600x340/2D5A3D/A8C4B8?text=Founders+in+community+meeting"
//               alt="Mindfully Aware founders in a community meeting"
//               className="w-full h-full object-cover"
//               width={600}
//               height={340}
//             />
//           </div>
//           <div className="rounded-xl overflow-hidden shadow-sm">
//             <img
//               src="https://placehold.co/280x200/EFF7F2/2D7A5F?text=Workshop+participants"
//               alt="Workshop participants in a mental health session"
//               className="w-full h-full object-cover"
//               width={280}
//               height={200}
//             />
//           </div>
//           <div className="rounded-xl overflow-hidden shadow-sm">
//             <img
//               src="https://placehold.co/280x200/F5F0E8/C9784A?text=Community+members"
//               alt="Community members at an awareness event"
//               className="w-full h-full object-cover"
//               width={280}
//               height={200}
//             />
//           </div>
//         </div>

//         {/* Text */}
//         <div>
//           <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#2D7A5F' }}>
//             Our Story
//           </p>
//           <h2
//             id="story-heading"
//             className="font-heading text-3xl md:text-4xl font-extrabold mb-6 leading-tight"
//             style={{ color: '#1B3A2D' }}
//           >
//             Born from personal experience, built for collective healing
//           </h2>
//           <div className="space-y-4 text-sm leading-relaxed" style={{ color: '#4A6358' }}>
//             <p>
//               Mindfully Aware was founded in 2022 by a group of African mental health advocates who had
//               each struggled in silence — and survived. What brought them together was a shared
//               conviction: that the culture of silence around mental health in Africa is not a cultural
//               value to be preserved, but a harmful gap to be filled.
//             </p>
//             <p>
//               What began as a WhatsApp support group of 12 people in Lagos quickly grew into a
//               continent-spanning movement. Today we operate peer-support circles, run public awareness
//               campaigns, train community health workers, and advocate for policy change — always guided
//               by the communities we serve.
//             </p>
//             <p>
//               We centre African voices, African contexts, and African-led solutions. Mental health care
//               cannot be imported wholesale from the West — it must be built from the inside out.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// // ── Section: Vision & Mission ───────────────────────────────────────────────
// function VisionMission() {
//   return (
//     <section aria-label="Vision and Mission" style={{ backgroundColor: '#F5F0E8' }} className="py-20 px-4">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Vision — dark */}
//         <div className="rounded-2xl p-10 text-white" style={{ backgroundColor: '#1B3A2D' }}>
//           <div
//             className="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-6"
//             style={{ backgroundColor: '#2D5A3D' }}
//           >
//             <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E8C547" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
//               <circle cx="12" cy="12" r="10" />
//               <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
//               <circle cx="12" cy="12" r="3" fill="#E8C547" stroke="none" />
//             </svg>
//           </div>
//           <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#E8C547' }}>
//             Our Vision
//           </p>
//           <h3 className="font-heading text-2xl font-extrabold mb-4 leading-tight">
//             An Africa where mental health is understood, valued, and accessible to all
//           </h3>
//           <p className="text-sm leading-relaxed" style={{ color: '#7AAA8E' }}>
//             We envision a continent where every person — regardless of geography, income, or cultural
//             background — can access quality mental health support and live free from stigma.
//           </p>
//         </div>

//         {/* Mission — light */}
//         <div className="rounded-2xl p-10 border" style={{ backgroundColor: '#ffffff', borderColor: '#E2DAC8' }}>
//           <div
//             className="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-6"
//             style={{ backgroundColor: '#EFF7F2' }}
//           >
//             <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2D7A5F" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
//               <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
//             </svg>
//           </div>
//           <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#2D7A5F' }}>
//             Our Mission
//           </p>
//           <h3
//             className="font-heading text-2xl font-extrabold mb-4 leading-tight"
//             style={{ color: '#1B3A2D' }}
//           >
//             To provide culturally-rooted mental health education, support and advocacy
//           </h3>
//           <p className="text-sm leading-relaxed" style={{ color: '#4A6358' }}>
//             We achieve this through community-centred programs, training local advocates,
//             influencing policy, and fostering safe spaces where people can speak honestly about
//             their mental wellbeing.
//           </p>
//         </div>
//       </div>
//     </section>
//   )
// }

// // ── Section: Core Values ────────────────────────────────────────────────────
// const VALUES = [
//   {
//     title: 'Compassion',
//     body: 'We lead with empathy in everything we do — in how we listen, how we speak, and how we design our programs.',
//     icon: (
//       <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
//         <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//       </svg>
//     ),
//   },
//   {
//     title: 'Accessibility',
//     body: 'Mental health support must be reachable regardless of location, language, economic status, or digital access.',
//     icon: (
//       <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
//         <circle cx="12" cy="12" r="10" />
//         <line x1="2" y1="12" x2="22" y2="12" />
//         <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
//       </svg>
//     ),
//   },
//   {
//     title: 'Community',
//     body: 'Healing happens in relationship. We build belonging as much as we build programs, because people need people.',
//     icon: (
//       <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
//         <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
//       </svg>
//     ),
//   },
//   {
//     title: 'Integrity',
//     body: 'We are transparent about our work, our finances, our results, and our limitations. Trust must be earned.',
//     icon: (
//       <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
//         <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
//         <path d="M9 12l2 2 4-4" />
//       </svg>
//     ),
//   },
//   {
//     title: 'Empowerment',
//     body: 'We build capacity in individuals and communities to sustain their own mental health journeys long after we leave.',
//     icon: (
//       <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
//         <path d="M13 10V3L4 14h7v7l9-11h-7z" />
//       </svg>
//     ),
//   },
//   {
//     title: 'Cultural Sensitivity',
//     body: 'We honour diverse African traditions while challenging harmful norms around mental health that keep people silent.',
//     icon: (
//       <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
//         <circle cx="12" cy="12" r="10" />
//         <path d="M8 14s1.5 2 4 2 4-2 4-2" />
//         <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth={2.5} />
//         <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth={2.5} />
//       </svg>
//     ),
//   },
// ]

// function CoreValues() {
//   return (
//     <section aria-labelledby="values-heading" style={{ backgroundColor: '#fff' }} className="py-20 px-4">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-14">
//           <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#2D7A5F' }}>
//             Core Values
//           </p>
//           <h2
//             id="values-heading"
//             className="font-heading text-3xl md:text-4xl font-extrabold"
//             style={{ color: '#1B3A2D' }}
//           >
//             What we stand for
//           </h2>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {VALUES.map(({ title, body, icon }) => (
//             <div key={title} className="p-8 rounded-2xl border" style={{ borderColor: '#E2DAC8' }}>
//               <div
//                 className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
//                 style={{ backgroundColor: '#EFF7F2', color: '#2D7A5F' }}
//               >
//                 {icon}
//               </div>
//               <h3 className="font-heading text-lg font-bold mb-3" style={{ color: '#1B3A2D' }}>
//                 {title}
//               </h3>
//               <p className="text-sm leading-relaxed" style={{ color: '#4A6358' }}>
//                 {body}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

// // ── Section: Team ───────────────────────────────────────────────────────────
// const TEAM = [
//   { name: 'Adaeze Okonkwo', role: 'Co-Founder & Executive Director', initial: 'A', color: '#2D7A5F' },
//   { name: 'Kwame Asante', role: 'Co-Founder & Head of Programs', initial: 'K', color: '#C9784A' },
//   { name: 'Fatima Al-Rashid', role: 'Head of Community & Partnerships', initial: 'F', color: '#6B4E8C' },
//   { name: 'Tendai Moyo', role: 'Head of Research & Advocacy', initial: 'T', color: '#1B3A2D' },
// ]

// function Team() {
//   return (
//     <section aria-labelledby="team-heading" style={{ backgroundColor: '#F5F0E8' }} className="py-20 px-4">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-14">
//           <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#2D7A5F' }}>
//             Our Team
//           </p>
//           <h2
//             id="team-heading"
//             className="font-heading text-3xl md:text-4xl font-extrabold"
//             style={{ color: '#1B3A2D' }}
//           >
//             Africans leading the way
//           </h2>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {TEAM.map(({ name, role, initial, color }) => (
//             <div key={name} className="text-center">
//               <div
//                 className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-extrabold text-white mx-auto mb-4 shadow-md"
//                 style={{ backgroundColor: color }}
//                 aria-hidden="true"
//               >
//                 {initial}
//               </div>
//               <h3 className="font-heading text-base font-bold mb-1" style={{ color: '#1B3A2D' }}>
//                 {name}
//               </h3>
//               <p className="text-sm" style={{ color: '#4A6358' }}>{role}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

// // ── Section: Partners ───────────────────────────────────────────────────────
// const PARTNERS = [
//   'WHO Africa', 'AfDB Foundation', 'Gates Foundation', 'Pan-African Health', 'Ubuntu Fund', 'AU Commission',
// ]

// function Partners() {
//   return (
//     <section aria-label="Our partners" style={{ backgroundColor: '#fff' }} className="py-16 px-4">
//       <div className="max-w-5xl mx-auto text-center">
//         <p className="text-xs font-bold uppercase tracking-widest mb-10" style={{ color: '#4A6358' }}>
//           Trusted Partners &amp; Supporters
//         </p>
//         <div className="flex flex-wrap justify-center items-center gap-5">
//           {PARTNERS.map((p) => (
//             <div
//               key={p}
//               className="rounded-lg px-6 py-4 border text-sm font-semibold"
//               style={{ borderColor: '#E2DAC8', color: '#4A6358', backgroundColor: '#F5F0E8' }}
//             >
//               {p}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

// // ── Section: Join Us CTA ────────────────────────────────────────────────────
// function JoinCTA() {
//   return (
//     <section aria-labelledby="join-heading" style={{ backgroundColor: '#F5F0E8' }} className="py-16 px-4">
//       <div className="max-w-7xl mx-auto">
//         <div
//           className="rounded-3xl py-16 px-8 md:px-16 text-center"
//           style={{ backgroundColor: '#1B3A2D' }}
//         >
//           <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: '#E8C547' }}>
//             Get Involved
//           </p>
//           <h2
//             id="join-heading"
//             className="font-heading text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-5"
//           >
//             Ready to be part of the change?
//           </h2>
//           <p className="text-base leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: '#7AAA8E' }}>
//             Support our mission financially, volunteer your time, or partner with us to expand
//             mental health access across Africa.
//           </p>
//           <div className="flex flex-wrap gap-4 justify-center">
//             <button
//               className="font-bold text-sm px-8 py-3.5 rounded-full transition-opacity hover:opacity-85"
//               style={{ backgroundColor: '#E8C547', color: '#1B3A2D' }}
//             >
//               Donate Now
//             </button>
//             <button className="font-bold text-sm px-8 py-3.5 rounded-full border-2 border-white text-white transition-colors hover:bg-white/10">
//               Volunteer
//             </button>
//           </div>
//         </div>
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

function OurStory() {
  return (
    <section
      id='our-story'
      aria-labelledby='story-heading'
      style={{ backgroundColor: '#FEFAF1' }}
      className='py-20 px-4'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start'>
        {/* Left — image + floating quote card */}
        <RevealOnScroll>
          <div className='relative pb-16'>
            <div
              className='rounded-3xl overflow-hidden shadow-2xl'
              style={{ height: '440px' }}>
              <motion.img
                src={communityGirl}
                alt='Smiling African woman, portrait photo representing the Mindfully Aware community story'
                className='w-full h-full object-cover'
                width={580}
                height={720}
                loading='lazy'
                decoding='async'
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
            <div
              className='absolute right-4 bottom-4 z-10 bg-white rounded-xl shadow-lg p-5'
              style={{ maxWidth: '270px' }}>
              <p
                className='text-sm leading-relaxed'
                style={{ color: '#1B3A2D' }}>
                "The first time someone said 'me too' I finally exhaled."
              </p>
            </div>
          </div>
        </RevealOnScroll>

        {/* Right — text content */}
        <RevealOnScroll delay={0.15}>
          <div className=' w-[100%]' style={{ marginRight: '100px' }}>
            <p
              className='uppercase mb-5 font-semibold'
              style={{
                fontFamily: 'Crimson Text',
                color: '#547563',
                fontSize: '18px',
                fontWeight: 600,
                letterSpacing: '0.5px',
                lineHeight: '24px',
              }}>
              Our Story
            </p>
            <h2
              id='story-heading'
              className='font-heading mb-8'
              style={{
                fontFamily: 'Crimson Pro',
                color: '#1D2825',
                fontSize: '54px',
                fontWeight: 600,
                lineHeight: '56px',
                letterSpacing: '0.5px',
              }}>
              Born from our own journey
              <br /> to freedom.
            </h2>
            <div className='space-y-5 mb-10'>
              {[
                'Mindfully Aware was born from a journey to freedom. A freedom that revealed just how heavy the pain we had been carrying truly was.',
                'The thought of others carrying that same weight alone, without support or safe spaces to be heard, became the motivation behind this journey.',
                'We believe that letting go creates room for healing, growth, and freedom. Through Mindfully Aware, we hope to be part of that journey for others too.',
              ].map((para) => (
                <p
                  key={para.slice(0, 20)}
                  className='leading-relaxed text-justify'
                  style={{
                    color: '#5D665B',
                    fontFamily: 'roboto',
                    fontSize: '20px',
                    lineHeight: '27px',
                    letterSpacing: '0.5px',
                    fontWeight: 400,
                  }}>
                  {para}
                </p>
              ))}
            </div>
            <p
              className='text-base font-bold'
              style={{
                color: '#5D665B',
                fontFamily: 'Crimson Pro',
                fontSize: '18px',
                lineHeight: '27px',
                letterSpacing: '0.5px',
              }}>
              We are building the support we wish we had together.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <>
      {/* <PageHero /> */}
      <OurStory />
      {/* <VisionMission />
      <CoreValues />
      <Team />
      <Partners />
      <JoinCTA /> */}
    </>
  )
}
