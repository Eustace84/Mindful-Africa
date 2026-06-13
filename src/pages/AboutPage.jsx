import { Link } from 'react-router-dom'

const coreValues = [
  {
    title: 'Ubuntu',
    subtitle: '"I am because we are"',
    description:
      'We root our work in the African philosophy of Ubuntu — the belief that human wellbeing is fundamentally communal. No one heals alone.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'Dignity',
    subtitle: 'Judgment-free care',
    description:
      'Every person who walks through our doors — or receives our services — is treated with unconditional respect and compassion, free from stigma.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Healing',
    subtitle: 'Meeting people where they are',
    description:
      'We recognize that healing is not linear. We walk alongside individuals and communities at their own pace, honouring every step of the journey.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: 'Empowerment',
    subtitle: 'Capacity from within',
    description:
      'We invest in local communities, training counselors and health workers from within the regions we serve so that change is self-sustaining.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Inclusivity',
    subtitle: 'For everyone, without exception',
    description:
      'Mental health support must reach every African — across gender, age, ethnicity, religion, sexuality, and socioeconomic status. No one left behind.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
]

const team = [
  {
    name: 'Dr. Yemi Adeyemi',
    role: 'Founder & Chief Executive',
    bio: 'Psychiatrist with 20 years of community mental health practice across West Africa. PhD in Social Psychiatry, University of Ibadan.',
    photo: 'https://placehold.co/300x320/2d7d32/e8f5e9?text=Dr.+Yemi+A.',
  },
  {
    name: 'Dr. Fatima Bakr',
    role: 'Clinical Director',
    bio: 'Clinical psychologist specialising in trauma and post-conflict recovery. Formerly with MSF and WHO Regional Office for Africa.',
    photo: 'https://placehold.co/300x320/1b5e20/e8f5e9?text=Dr.+Fatima+B.',
  },
  {
    name: 'Emmanuel Owusu',
    role: 'Programs Manager',
    bio: 'Public health specialist with a decade of experience scaling community health interventions across Ghana, Uganda, and Zambia.',
    photo: 'https://placehold.co/300x320/154a19/e8f5e9?text=Emmanuel+O.',
  },
  {
    name: 'Amara Camara',
    role: 'Head of Communications',
    bio: 'Award-winning journalist and mental health advocate who uses storytelling to dismantle stigma in African media and public discourse.',
    photo: 'https://placehold.co/300x320/0f3612/e8f5e9?text=Amara+C.',
  },
  {
    name: 'Dr. Ngozi Eze',
    role: 'Research Director',
    bio: 'Medical researcher and epidemiologist leading our evidence-generation work on the mental health burden in sub-Saharan Africa.',
    photo: 'https://placehold.co/300x320/2d7d32/e8f5e9?text=Dr.+Ngozi+E.',
  },
  {
    name: 'Kofi Mensah',
    role: 'Community Liaison Lead',
    bio: 'Social worker and community organiser who bridges Mindful Africa\'s programs with traditional healers, faith communities, and local leaders.',
    photo: 'https://placehold.co/300x320/1b5e20/e8f5e9?text=Kofi+M.',
  },
]

const partners = [
  { name: 'World Health Organization', logo: 'https://placehold.co/160x60/f0f7f0/2d7d32?text=WHO' },
  { name: 'UNICEF', logo: 'https://placehold.co/160x60/f0f7f0/2d7d32?text=UNICEF' },
  { name: 'African Union', logo: 'https://placehold.co/160x60/f0f7f0/2d7d32?text=African+Union' },
  { name: 'Bill & Melinda Gates Foundation', logo: 'https://placehold.co/160x60/f0f7f0/2d7d32?text=Gates+Foundation' },
  { name: 'Wellcome Trust', logo: 'https://placehold.co/160x60/f0f7f0/2d7d32?text=Wellcome+Trust' },
  { name: 'Open Society Foundations', logo: 'https://placehold.co/160x60/f0f7f0/2d7d32?text=OSF' },
]

export default function AboutPage() {
  return (
    <>
      {/* ── Page Hero ── */}
      <section
        aria-labelledby="about-hero-heading"
        className="bg-gradient-to-br from-forest-900 to-forest-700 py-24 px-4 relative overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-forest-600/20 blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-earth-600/15 blur-3xl translate-y-1/3 -translate-x-1/4" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-earth-400 text-sm font-semibold uppercase tracking-widest mb-5">
            About Us
          </p>
          <h1
            id="about-hero-heading"
            className="font-heading text-4xl md:text-5xl font-bold text-white leading-tight mb-6"
          >
            Our Story &amp; Mission
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
            Born from the urgent need to address Africa's mental health crisis, we are a community of healers, advocates, and change-makers committed to lasting, culturally-rooted transformation.
          </p>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section
        aria-labelledby="story-heading"
        className="bg-cream py-20 px-4"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-earth-600 text-sm font-semibold uppercase tracking-widest mb-4">
              How It Began
            </p>
            <h2
              id="story-heading"
              className="font-heading text-3xl md:text-4xl font-bold text-bark leading-tight mb-6"
            >
              A crisis ignored for too long
            </h2>
            <div className="space-y-5 text-gray-600 leading-relaxed">
              <p>
                In 2014, Dr. Yemi Adeyemi was working in a Lagos public hospital when she noticed something that would change the course of her career — patient after patient presenting with untreated depression, psychosis, and trauma, most of whom had never once been offered mental health support.
              </p>
              <p>
                Africa carries <strong className="text-bark">14% of the world's mental health burden</strong> but has access to fewer than 2% of global mental health resources. The continent has fewer than one psychiatrist per million people in many regions.
              </p>
              <p>
                Mindful Africa was founded in 2016 to change this reality — not by importing Western models, but by building <em>from within</em> African communities, traditions, and wisdom systems. Today we operate in 12 countries, serving communities that previously had no access to any form of professional mental health support.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="bg-forest-600 hover:bg-forest-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-200 shadow-sm text-sm"
              >
                Partner With Us
              </Link>
              <Link
                to="/contact"
                className="border-2 border-forest-600 text-forest-600 hover:bg-forest-600 hover:text-white font-semibold px-6 py-3 rounded-full transition-all duration-200 text-sm"
              >
                Get Support
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://placehold.co/580x480/1b5e20/e8f5e9?text=Our+Founding+Story"
                alt="Mindful Africa team members meeting with community health workers in the field"
                className="w-full h-auto object-cover"
                width={580}
                height={480}
              />
            </div>
            {/* Years badge */}
            <div className="absolute -bottom-5 -right-5 bg-earth-600 text-white rounded-2xl p-5 shadow-xl text-center">
              <p className="font-heading text-3xl font-bold">9+</p>
              <p className="text-amber-200 text-xs mt-1">Years of Impact</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Vision & Mission ── */}
      <section
        aria-labelledby="vision-heading"
        className="bg-white py-20 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-earth-600 text-sm font-semibold uppercase tracking-widest mb-4">
              What We Stand For
            </p>
            <h2
              id="vision-heading"
              className="font-heading text-3xl md:text-4xl font-bold text-bark"
            >
              Vision &amp; Mission
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="bg-forest-800 rounded-2xl p-10 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-forest-700/50 blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" aria-hidden="true" />
              <div className="w-12 h-12 rounded-xl bg-forest-700 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-earth-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <p className="text-earth-400 text-xs font-semibold uppercase tracking-widest mb-3">Our Vision</p>
              <h3 className="font-heading text-2xl font-bold text-white mb-4 leading-snug">
                An Africa where mental health is celebrated, not silenced
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                We envision a continent where mental wellness is woven into the fabric of every community — where seeking help is a sign of strength, where healers are honoured alongside physicians, and where no African suffers alone.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-10 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-orange-100 blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none" aria-hidden="true" />
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-earth-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-earth-600 text-xs font-semibold uppercase tracking-widest mb-3">Our Mission</p>
              <h3 className="font-heading text-2xl font-bold text-bark mb-4 leading-snug">
                Delivering accessible, culturally-rooted mental health care
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                To reduce the mental health treatment gap across Africa by building community-based programs, training local counselors, advocating for policy change, and ensuring that every person — regardless of background — has access to quality psychological support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section
        aria-labelledby="values-heading"
        className="bg-green-50 py-20 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-earth-600 text-sm font-semibold uppercase tracking-widest mb-4">
              What Guides Us
            </p>
            <h2
              id="values-heading"
              className="font-heading text-3xl md:text-4xl font-bold text-bark"
            >
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {coreValues.map(({ title, subtitle, description, icon }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-7 border border-green-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-green-50 text-forest-600 flex items-center justify-center mb-5">
                  {icon}
                </div>
                <h3 className="font-heading text-lg font-bold text-bark mb-1">{title}</h3>
                <p className="text-earth-600 text-xs font-medium mb-3">{subtitle}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section
        aria-labelledby="team-heading"
        className="bg-white py-20 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-earth-600 text-sm font-semibold uppercase tracking-widest mb-4">
              The People Behind the Work
            </p>
            <h2
              id="team-heading"
              className="font-heading text-3xl md:text-4xl font-bold text-bark mb-5"
            >
              Meet Our Team
            </h2>
            <p className="text-gray-600 text-base max-w-2xl mx-auto">
              A diverse group of clinicians, researchers, community builders, and advocates united by a single belief: that mental health is a right, not a privilege.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map(({ name, role, bio, photo }) => (
              <article
                key={name}
                className="group text-center"
              >
                <div className="relative inline-block mb-5">
                  <div className="w-full overflow-hidden rounded-2xl">
                    <img
                      src={photo}
                      alt={`Portrait of ${name}, ${role} at Mindful Africa`}
                      width={300}
                      height={320}
                      className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-earth-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full whitespace-nowrap">
                    {role}
                  </div>
                </div>
                <div className="pt-4">
                  <h3 className="font-heading text-lg font-bold text-bark mb-2">{name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">{bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partners ── */}
      <section
        aria-labelledby="partners-heading"
        className="bg-cream py-20 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-earth-600 text-sm font-semibold uppercase tracking-widest mb-4">
              In Partnership With
            </p>
            <h2
              id="partners-heading"
              className="font-heading text-3xl md:text-4xl font-bold text-bark mb-5"
            >
              Trusted by world-leading organizations
            </h2>
            <p className="text-gray-600 text-base max-w-xl mx-auto">
              We collaborate with international bodies, governments, and foundations to amplify our reach and deepen our impact.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6">
            {partners.map(({ name, logo }) => (
              <div
                key={name}
                className="bg-white border border-stone-200 rounded-xl px-6 py-4 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
              >
                <img
                  src={logo}
                  alt={`${name} logo`}
                  width={160}
                  height={60}
                  className="h-10 w-auto object-contain"
                />
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 bg-forest-800 rounded-2xl p-10 md:p-14 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <div className="absolute top-0 right-0 w-56 h-56 rounded-full bg-forest-700/40 blur-3xl -translate-y-1/2 translate-x-1/3" />
            </div>
            <p className="text-earth-400 text-sm font-semibold uppercase tracking-widest mb-5 relative z-10">
              Join the Movement
            </p>
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-5 relative z-10">
              Become a partner or supporter
            </h3>
            <p className="text-white/70 text-base leading-relaxed max-w-2xl mx-auto mb-8 relative z-10">
              Whether you are a foundation, a government agency, a corporate organisation, or an individual, there is a meaningful way for you to join us.
            </p>
            <Link
              to="/contact"
              className="bg-earth-600 hover:bg-earth-400 text-white font-bold px-8 py-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl relative z-10 inline-block"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
