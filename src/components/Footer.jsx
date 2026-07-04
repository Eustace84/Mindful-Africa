import logo from '../images/logo.png'

const COLS = [
  {
    title: 'Explore',
    links: [
      { label: 'About', href: '/about' },
      { label: "What we're building", href: '/#programs' },
      { label: 'Get involved', href: '/#involved' },
      { label: 'Donate', href: '/#donate' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Instagram', href: 'https://instagram.com/mindfullyaware' },
      { label: 'Twitter / X', href: 'https://x.com/mindfullyaware' },
      { label: 'LinkedIn', href: 'https://linkedin.com/company/mindfullyaware' },
      { label: 'hello@mindfullyaware.org', href: 'mailto:hello@mindfullyaware.org' },
    ],
  },
]

export default function Footer() {
  return (
    <footer
      role='contentinfo'
      style={{ backgroundColor: '#FEFAF1', borderTop: '1px solid #E2DAC8' }}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] gap-10 mb-14'>
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
            <p className='text-base leading-relaxed' style={{ color: 'black' }}>
            A registered Africa nonProfit building safe, accessible mental health support systems for our communities. You are not alone
            </p>
          </div>

          {/* Link columns */}
          {COLS.map((col) => (
            <div key={col.title}>
              <h3
                className='mb-5'
                style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#2D7A5F',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}>
                {col.title}
              </h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px' }} role='list'>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className='transition-colors duration-150'
                      style={{ fontSize: '15px', color: '#5A7068' }}
                      onMouseEnter={e => e.target.style.color = '#1B3A2D'}
                      onMouseLeave={e => e.target.style.color = '#5A7068'}>
                      {link.label}
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
          <p className='text-base' style={{ color: '#8A9A8E' }}>
            © {new Date().getFullYear()} Mindfully Aware. Made with care across Africa.
          </p>

          <p className='text-base' style={{ color: '#8A9A8E' }}>
            "Healing is a community we build together".
          </p>
        </div>
      </div>
    </footer>
  );
}
