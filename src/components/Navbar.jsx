import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'The Problem', href: '/#problem' },
  { label: "What we're Building", href: '/#building' },
  { label: 'Community', href: '/#voices' },
  { label: 'Get Involved', href: '/#get-involved' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      role='banner'
      animate={{
        boxShadow: scrolled
          ? '0 2px 20px rgba(27, 58, 45, 0.08)'
          : '0 0px 0px rgba(0,0,0,0)',
      }}
      transition={{ duration: 0.3 }}
      className='sticky top-0 z-50 px-8 md:px-12 h-[120px] flex flex-col justify-center'
      style={{ backgroundColor: '#FEFAF1' }}
      aria-label='Main navigation'>
      <div className='max-w-7xl mx-auto w-full flex items-center justify-between'>
        {/* Logo */}
        <Link
          to='/'
          onClick={close}
          className='flex items-center gap-[10px] shrink-0'>
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
              style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontSize: '20px',
                fontWeight: 700,
                color: '#547563',
                whiteSpace: 'nowrap',
                letterSpacing: '0%',
                lineHeight: '32px',
                marginRight: '45px',
              }}>
              Mindfully Aware
            </span>
          </div>
        </Link>

        {/* Desktop: nav links + // + CTA */}
        <div className='hidden lg:flex items-center gap-7'>
          {NAV_LINKS.map(({ label, href }) =>
            href.startsWith('/#') ? (
              <a
                key={label}
                href={href}
                className='whitespace-nowrap transition-opacity hover:opacity-70'
                style={{
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  fontSize: '18px',
                  fontWeight: 300,
                  color: '#7B8682',
                  lineHeight: '28px',
                  letterSpacing: '0%',
                }}>
                {label}
              </a>
            ) : (
              <Link
                key={label}
                to={href}
                className='whitespace-nowrap transition-opacity hover:opacity-70'
                style={{
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  fontSize: '18px',
                  fontWeight: 300,
                  color: '#7B8682',
                  lineHeight: '28px',
                  letterSpacing: '0%',
                }}>
                {label}
              </Link>
            ),
          )}
          {/* Decorative flourish — matching exact Figma specs */}
          <div className='hidden lg:flex items-center mx-4' aria-hidden='true'>
            <div
              style={{
                width: 72,
                height: 84,
                position: 'relative',
                color: '#547563',
                // REMOVE THIS
                // borderRight: "2px solid #4D635C",

                borderBottom: '2px solid #4D635C',
                borderBottomRightRadius: 72,
                boxSizing: 'border-box',
              }}></div>

            {/* Right */}
            <div
              style={{
                width: 72,
                height: 84,
                marginLeft: 8,
                position: 'relative',
                color: '#547563',

                // REMOVE THIS
                // borderLeft: "2px solid #4D635C",

                borderTop: '2px solid #4D635C',
                borderTopLeftRadius: 100,
                boxSizing: 'border-box',
                transform: 'scale(-1)',
                rotate: '160deg',
                marginTop: '30px',
              }}></div>
          </div>
          <a
            href='/#donate'
            className='text-sm font-semibold px-5 py-3 rounded-lg text-white whitespace-nowrap transition-opacity hover:opacity-90'
            style={{ backgroundColor: '#547563', color: '#FFFFFF' }}>
            Support Our Mission
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className='lg:hidden p-2 rounded-lg flex items-center focus:outline-none'
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}>
          {open ? (
            <svg
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              strokeWidth={2}
              strokeLinecap='round'
              strokeLinejoin='round'
              style={{ stroke: '#1B3A2D' }}>
              <line x1='18' y1='6' x2='6' y2='18' />
              <line x1='6' y1='6' x2='18' y2='18' />
            </svg>
          ) : (
            <svg
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              strokeWidth={2}
              strokeLinecap='round'
              strokeLinejoin='round'
              style={{ stroke: '#1B3A2D' }}>
              <line x1='3' y1='6' x2='21' y2='6' />
              <line x1='3' y1='12' x2='21' y2='12' />
              <line x1='3' y1='18' x2='21' y2='18' />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div
          className='lg:hidden  max-w-7xl mx-auto w-full bg-[#F9F4E3] mt-60'
          style={{ borderTop: '1px solid #E2DAC8' }}>
          {NAV_LINKS.map(({ label, href }) =>
            href.startsWith('/#') ? (
              <a
                key={label}
                href={href}
                onClick={close}
                className='block px-1 py-3 text-center'
                style={{
                  fontFamily:
                    '"Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, sans-serif',
                  fontSize: '18px',
                  fontWeight: 500,
                  lineHeight: 1.5,
                  color: '#1B3A2D',
                }}>
                {label}
              </a>
            ) : (
              <Link
                key={label}
                to={href}
                onClick={close}
                className='block px-1 py-3 text-center'
                style={{
                  fontFamily:
                    '"Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, sans-serif',
                  fontSize: '18px',
                  fontWeight: 500,
                  lineHeight: 1.5,
                  color: '#1B3A2D',
                }}>
                {label}
              </Link>
            ),
          )}
          <a
            href='/#donate'
            onClick={close}
            className='block mt-4 py-3 text-sm font-semibold  text-center text-white H-[52px]'
            style={{ backgroundColor: '#547563' }}>
            Support Our Mission
          </a>
        </div>
      )}
    </motion.header>
  );
}
