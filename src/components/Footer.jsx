import logo from '../images/logo.png'

const COLS = [
  {
    title: 'Organization',
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
    <footer
      role='contentinfo'
      style={{ backgroundColor: '#FEFAF1', borderTop: '1px solid #E2DAC8' }}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14'>
          {/* Brand */}
          <div>
            <div className='flex items-center gap-2.5 mb-5'>
              {/* Logo */}
              <div className='flex items-center gap-2'>
                <img
                  src={logo}
                  alt='Mindfully Aware logo'
                  style={{
                    height: '48px',
                    width: 'auto',
                    objectFit: 'contain',
                  }}
                />
                <span
                  className='font-semibold text-lg'
                  style={{
                    color: '#1B3A2D',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}>
                  Mindfully Aware
                </span>
              </div>
            </div>
            <p className='text-sm leading-relaxed' style={{ color: '#5A7068' }}>
              Building accessible, culturally-rooted mental health support for
              African communities — one conversation at a time.
            </p>
          </div>

          {/* Link columns */}
          {COLS.map(({ title, links }) => (
            <div key={title}>
              <h3
                className='text-xs font-bold uppercase tracking-widest mb-5'
                style={{ color: '#2D7A5F' }}>
                {title}
              </h3>
              <ul className='space-y-3.5' role='list'>
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href='#'
                      className='text-sm transition-colors duration-150 hover:text-[#1B3A2D]'
                      style={{ color: '#5A7068' }}>
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
          className='flex flex-col sm:flex-row items-center justify-between gap-4 pt-8'
          style={{ borderTop: '1px solid #E2DAC8' }}>
          <p className='text-xs' style={{ color: '#8A9A8E' }}>
            © {new Date().getFullYear()} Mindfully Aware. All rights reserved.
          </p>

          <p className='text-xs' style={{ color: '#8A9A8E' }}>
            Developed by{' '}
            <span style={{ color: '#2D7A5F', fontWeight: 600 }}>EusTech</span>
          </p>

          <div className='flex gap-6'>
            <a
              href='#'
              className='text-xs transition-colors hover:text-[#1B3A2D]'
              style={{ color: '#8A9A8E' }}>
              Privacy Policy
            </a>
            <a
              href='#'
              className='text-xs transition-colors hover:text-[#1B3A2D]'
              style={{ color: '#8A9A8E' }}>
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
