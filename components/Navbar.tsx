'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

interface NavbarProps {
  onNavigate: (id: string) => void
}

const links = [
  { label: 'Home', id: 'home' },
  { label: 'Services', id: 'services' },
  { label: 'Courses', id: 'courses' },
  { label: 'About', id: 'about' },
  { label: 'FAQ', id: 'faq' },
  { label: 'Contact', id: 'apply' },
]

export default function Navbar({ onNavigate }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const go = (id: string) => {
    onNavigate(id)
    setOpen(false)
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(10, 6, 18, 0.92)'
          : 'rgba(10, 6, 18, 0.3)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(124, 58, 237, 0.15)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => go('home')}
            className="flex items-center gap-1 group"
          >
            <span
              style={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 900,
                fontSize: '2rem',
                color: '#a78bfa',
                letterSpacing: '-0.04em',
              }}
            >
              G
            </span>
            <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 mx-0.5 group-hover:scale-110 transition-transform">
              <path d="M3 13V9a9 9 0 0 1 18 0v4" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
              <rect x="1" y="13" width="4" height="7" rx="2" fill="#f97316" />
              <rect x="19" y="13" width="4" height="7" rx="2" fill="#f97316" />
              <path d="M21 19c0 2.5-2 3.5-5 3.5" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
              <circle cx="16" cy="22.5" r="1.5" fill="#f97316" />
            </svg>
            <span
              style={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 900,
                fontSize: '2rem',
                color: '#a78bfa',
                letterSpacing: '-0.04em',
              }}
            >
              VA
            </span>
            <span
              className="ml-2 text-[9px] font-bold uppercase tracking-[0.18em] text-white/40 hidden sm:block"
              style={{ marginTop: 2 }}
            >
              Academy
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <button key={l.id} onClick={() => go(l.id)} className="nav-link">
                {l.label}
              </button>
            ))}
            <button
              onClick={() => go('apply')}
              className="ml-2 px-6 py-2.5 rounded-lg font-bold text-sm text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(249,115,22,0.5)]"
              style={{
                background: 'linear-gradient(135deg, #4c1d95, #f97316)',
                letterSpacing: '0.02em',
              }}
            >
              Apply Now
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white/70 hover:text-white transition-colors"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden"
          style={{
            background: 'rgba(10, 6, 18, 0.98)',
            borderTop: '1px solid rgba(124, 58, 237, 0.15)',
          }}
        >
          <div className="px-5 py-6 space-y-1">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="block w-full text-left py-3 px-4 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all font-medium text-sm uppercase tracking-wider"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => go('apply')}
              className="block w-full mt-4 py-3.5 rounded-lg font-bold text-white text-center"
              style={{ background: 'linear-gradient(135deg, #4c1d95, #f97316)' }}
            >
              Apply Now
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
