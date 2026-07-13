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
      {
        label: 'LinkedIn',
        href: 'https://linkedin.com/company/mindfullyaware',
      },
      {
        label: 'minddfulafrica@gmail.com',
        href: 'mailto:minddfulafrica@gmail.com',
      },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className='mr-6 ml-6'
      role='contentinfo'
      style={{ backgroundColor: '#F9F4E3', borderTop: '1px solid #D5D1C3' }}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8'>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-[2fr_1fr_1fr] gap-10 mb-14 '>
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
                    color: '#547563',
                    fontFamily: "'Helvetica Neue', sans-serif",
                    fontWeight: 700,
                    fontSize: '20px',
                    lineHeight: '32px',
                    letterSpacing: '0%',
                  }}>
                  Mindfully Aware
                </span>
              </div>
            </div>
            <p
              className='text-base leading-relaxed'
              style={{
                color: '#5D665B',
                fontFamily: 'Inria Serif',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '27px',
                letterSpacing: '0.5px',
              }}>
              A registered Africa nonProfit building safe, accessible <br />{' '}
              mental health support systems for our communities. You <br /> are
              not alone
            </p>
          </div>

          {/* Link columns */}
          {COLS.map((col) => (
            <div key={col.title}>
              <h3
                className='mb-5'
                style={{
                  fontFamily: 'Inria Serif',
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#1D2825',
                  lineHeight: '27px',
                  letterSpacing: '0.5px',
                }}>
                {col.title}
              </h3>
              <ul
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}
                role='list'>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className='transition-colors duration-150'
                      style={{
                        fontFamily: 'Inria Serif',
                        fontWeight: 400,
                        fontSize: '16px',
                        color: '#5D665B',
                        lineHeight: '27px',
                        letterSpacing: '0.5',
                      }}
                      onMouseEnter={(e) => (e.target.style.color = '#1B3A2D')}
                      onMouseLeave={(e) => (e.target.style.color = '#5A7068')}>
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
          <p
            className='text-base'
            style={{
              fontFamily: 'Inria Serif',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '27px',
              letterSpacing: '0.5px',
              color: '#000000',
            }}>
            © {new Date().getFullYear()} Mindfully Aware. Made with care across
            Africa.
          </p>

          <p>
            Developed by{' '}
            <span style={{ color: '#2d7a5f', fontWeight: 'bold' }}>
              EusTech
            </span>
          </p>

          <p
            className='text-base'
            style={{
              fontFamily: 'Inria Serif',
              color: '#000000',
              fontSize: '14px',
              lineHeight: '27px',
              letterSpacing: '0.5px',
            }}>
            "Healing is a community we build together".
          </p>
        </div>
      </div>
    </footer>
  );
}
