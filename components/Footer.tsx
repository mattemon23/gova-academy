'use client'

interface FooterProps {
  onNavigate: (id: string) => void
}

const links = [
  { label: 'Home', id: 'home' },
  { label: 'Services', id: 'services' },
  { label: 'Courses', id: 'courses' },
  { label: 'About', id: 'about' },
  { label: 'FAQ', id: 'faq' },
  { label: 'Apply', id: 'apply' },
]

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer
      className="relative py-16"
      style={{
        background: 'rgba(10, 6, 18, 0.95)',
        borderTop: '1px solid rgba(124, 58, 237, 0.15)',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-1 group mb-5"
            >
              <span
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 900,
                  fontSize: '1.8rem',
                  color: '#a78bfa',
                  letterSpacing: '-0.04em',
                }}
              >
                G
              </span>
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 mx-0.5">
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
                  fontSize: '1.8rem',
                  color: '#a78bfa',
                  letterSpacing: '-0.04em',
                }}
              >
                VA
              </span>
            </button>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Your trusted partner for professional HR and virtual assistant training across Asia. Empowering careers, one student at a time.
            </p>
            <p className="mt-4 text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
              📍 Manila, Philippines · info@govaacademy.com
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {links.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => onNavigate(l.id)}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.45)' }}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Legal
            </h4>
            <ul className="space-y-2.5">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.45)' }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            © {new Date().getFullYear()} GOVA Academy. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
            Built for Asia's next generation of virtual professionals.
          </p>
        </div>
      </div>
    </footer>
  )
}
