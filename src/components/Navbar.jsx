import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
  const menuRef = useRef(null);

  const close = () => setOpen(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        close();
      }
    };

    if (open) {
      const timer = setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 0);

      return () => {
        clearTimeout(timer);
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [open]);

  // Scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <motion.header
      role='banner'
      animate={{
        boxShadow: scrolled
          ? '0 2px 20px rgba(27, 58, 45, 0.08)'
          : '0 0px 0px rgba(0,0,0,0)',
      }}
      transition={{ duration: 0.3 }}
      className='sticky top-0 z-50 px-5 sm:px-8 md:px-10 lg:px-12 h-[100px] lg:h-[120px] flex flex-col justify-center'
      style={{ backgroundColor: '#FEFAF1' }}
      aria-label='Main navigation'>
      <div className='max-w-7xl mx-auto w-full flex items-center justify-between gap-4'>
        {/* Logo - always visible */}
        <Link
          to='/'
          onClick={close}
          className='flex items-center gap-2 shrink-0 min-w-0'>
          <img
            src={logo}
            alt='Mindfully Aware logo'
            className='h-10 sm:h-12 w-auto object-contain'
          />
          <span
            className='hidden sm:inline whitespace-nowrap'
            style={{
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              fontSize: 'clamp(16px, 2.2vw, 20px)',
              fontWeight: 700,
              color: '#547563',
              lineHeight: '32px',
            }}>
            Mindfully Aware
          </span>
        </Link>

        {/* Desktop Nav - improved for Nest Hub (1024px) and Nest Hub Max */}
        <div className='hidden lg:flex items-center gap-5 xl:gap-8 2xl:gap-10'>
          {NAV_LINKS.map(({ label, href }) =>
            href.startsWith('/#') ? (
              <a
                key={label}
                href={href}
                className='whitespace-nowrap transition-opacity hover:opacity-70 text-[15px] xl:text-[17px] 2xl:text-[18px]'
                style={{
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  fontWeight: 300,
                  color: '#7B8682',
                  lineHeight: '28px',
                }}>
                {label}
              </a>
            ) : (
              <Link
                key={label}
                to={href}
                className='whitespace-nowrap transition-opacity hover:opacity-70 text-[15px] xl:text-[17px] 2xl:text-[18px]'
                style={{
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  fontWeight: 300,
                  color: '#7B8682',
                  lineHeight: '28px',
                }}>
                {label}
              </Link>
            ),
          )}

          {/* Decorative flourish - only show on larger screens */}
          <div
            className='hidden xl:flex items-center mx-2 justify-center'
            aria-hidden='true'>
            <div
              style={{
                width: 56,
                height: 68,
                position: 'relative',
                color: '#547563',
                borderBottom: '2px solid #4D635C',
                borderBottomRightRadius: 56,
                boxSizing: 'border-box',
                transform: 'scaleY(-1) rotate(260deg)',
              }}
            />
            <div
              style={{
                width: 56,
                height: 68,
                marginLeft: 10,
                position: 'relative',
                color: '#547563',
                borderTop: '2px solid #4D635C',
                borderTopLeftRadius: 80,
                boxSizing: 'border-box',
                transform: 'scale(-1) scaleY(-1) rotate(90deg)',
              }}
            />
          </div>

          <a
            href='/#donate'
            className='text-sm font-semibold px-4 py-2.5 xl:px-5 xl:py-3 rounded-lg text-white whitespace-nowrap transition-opacity hover:opacity-90 ml-2'
            style={{ backgroundColor: '#547563', color: '#FFFFFF' }}>
            Support Our Mission
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className='lg:hidden p-2 rounded-lg flex items-center focus:outline-none shrink-0'
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className='lg:hidden fixed top-[100px] left-0 right-0 z-40 bg-[#F9F4E3] shadow-lg'
            style={{ borderTop: '1px solid #E2DAC8' }}>
            <div className='max-w-7xl mx-auto px-6 py-6 flex flex-col'>
              {NAV_LINKS.map(({ label, href }) =>
                href.startsWith('/#') ? (
                  <a
                    key={label}
                    href={href}
                    onClick={close}
                    className='block py-3 text-center'
                    style={{
                      fontFamily:
                        '"Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, sans-serif',
                      fontSize: '17px',
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
                    className='block py-3 text-center'
                    style={{
                      fontFamily:
                        '"Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, sans-serif',
                      fontSize: '17px',
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
                className='block mt-4 py-3 text-sm font-semibold text-center text-white rounded-lg'
                style={{ backgroundColor: '#547563' }}>
                Support Our Mission
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}