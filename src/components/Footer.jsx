import { Link } from 'react-router-dom'

const COLS = [
  {
    title: 'Organisation',
    links: ['About Us', 'Our Team', 'Our Impact', 'Press & Media'],
  },
  {
    title: 'Programs',
    links: ['Mental Health Education', 'Community Support', 'Crisis Assistance', 'Research & Data'],
  },
  {
    title: 'Get Involved',
    links: ['Volunteer', 'Donate', 'Partner With Us', 'Careers'],
  },
]

export default function Footer() {
  return (
    <footer role="contentinfo" style={{ backgroundColor: '#0F2419' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: '#6B4E8C' }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="7.5" r="3" stroke="white" strokeWidth="1.4" fill="none" />
                  <line x1="7.5" y1="11" x2="7.5" y2="14" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
                  <line x1="10.5" y1="11" x2="10.5" y2="14" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
                  <line x1="7.5" y1="14" x2="10.5" y2="14" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
                  <circle cx="13" cy="4" r="2" fill="#E8C547" />
                </svg>
              </div>
              <span className="font-heading font-bold text-base text-white">Mindfully Aware</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#6B8E7E' }}>
              Building accessible, culturally-rooted mental health support for African communities — one conversation at a time.
            </p>
          </div>

          {/* Link columns */}
          {COLS.map(({ title, links }) => (
            <div key={title}>
              <h3
                className="text-xs font-bold uppercase tracking-widest mb-5"
                style={{ color: '#E8C547' }}
              >
                {title}
              </h3>
              <ul className="space-y-3.5" role="list">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm transition-colors duration-150 hover:text-white"
                      style={{ color: '#6B8E7E' }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid #1E4D35' }}
        >
          <p className="text-xs" style={{ color: '#4A6358' }}>
            © {new Date().getFullYear()} Mindfully Aware. All rights reserved.
          </p>

          <p className='text-gray-300 '>Developed by EusTech</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs transition-colors hover:text-white" style={{ color: '#4A6358' }}>
              Privacy Policy
            </a>
            <a href="#" className="text-xs transition-colors hover:text-white" style={{ color: '#4A6358' }}>
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
