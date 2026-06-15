'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'

interface HeroProps {
  onNavigate: (id: string) => void
}

export default function Hero({ onNavigate }: HeroProps) {
  const headRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const pillRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', service: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    const animate = async () => {
      const { gsap } = await import('gsap')
      const tl = gsap.timeline({ delay: 0.2 })

      tl.fromTo(pillRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
        .fromTo(headRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.3')
        .fromTo(subRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
        .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
        .fromTo(statsRef.current?.children ? Array.from(statsRef.current.children) : [], 
          { opacity: 0, y: 20 }, 
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' }, 
          '-=0.2'
        )
    }
    animate()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.fullName || !formData.email || !formData.phone) return
    setStatus('sending')
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          program: formData.service,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setMsg(data.message)
        setFormData({ fullName: '', email: '', phone: '', service: '' })
      } else {
        setStatus('error')
        setMsg(data.error || 'Something went wrong.')
      }
    } catch {
      setStatus('error')
      setMsg('Failed to submit. Please try again.')
    }
  }

  const stats = [
    { value: '2,000+', label: 'Students Trained' },
    { value: '10+', label: 'Years Leading' },
    { value: '3', label: 'Continents Reached' },
    { value: '30–90', label: 'Days to Mastery' },
  ]

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center pt-24 pb-20 overflow-hidden"
    >
      {/* Radial glows */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #4c1d95 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[400px] rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #f97316 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — headline */}
          <div>
            <div ref={pillRef} className="pill pill-orange mb-8" style={{ opacity: 0 }}>
              <Sparkles size={11} />
              Asia's Leading Training Academy
            </div>

            <h1
              ref={headRef}
              style={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 900,
                fontSize: 'clamp(2.6rem, 5.5vw, 4.5rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                opacity: 0,
                color: '#fff',
              }}
            >
              Empower Your Skills with{' '}
              <span className="text-gradient">GOVA Top Talent</span>
            </h1>

            <p
              ref={subRef}
              className="mt-6 text-lg leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.6)', opacity: 0, maxWidth: '520px' }}
            >
              Through comprehensive, hands-on training in virtual assistance, customer support, and professional development — we equip you to launch and grow a world-class career.
            </p>

            <div ref={ctaRef} className="flex flex-wrap gap-4 mt-10" style={{ opacity: 0 }}>
              <button
                onClick={() => onNavigate('apply')}
                className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(249,115,22,0.5)]"
                style={{ background: 'linear-gradient(135deg, #4c1d95, #f97316)', letterSpacing: '0.02em' }}
              >
                Start Your Journey
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => onNavigate('courses')}
                className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm transition-all duration-300 hover:bg-white/10"
                style={{
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'rgba(255,255,255,0.8)',
                }}
              >
                Explore Courses
              </button>
            </div>

            {/* Stats row */}
            <div
              ref={statsRef}
              className="grid grid-cols-4 gap-4 mt-14 pt-10"
              style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
            >
              {stats.map((s, i) => (
                <div key={i} style={{ opacity: 0 }}>
                  <div
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      fontWeight: 900,
                      fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                      background: 'linear-gradient(135deg, #f97316, #f59e0b)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {s.value}
                  </div>
                  <div className="text-xs text-white/40 font-medium mt-1 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — quick apply form */}
          <div
            className="glass rounded-3xl p-8"
            style={{ boxShadow: '0 0 80px rgba(76, 29, 149, 0.25)' }}
          >
            <h3
              style={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                fontSize: '1.5rem',
                color: '#fff',
                marginBottom: '6px',
              }}
            >
              Get Started Today
            </h3>
            <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Fill this out — we'll reach out within 24hrs.
            </p>

            {status === 'success' ? (
              <div
                className="py-10 text-center rounded-xl"
                style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)' }}
              >
                <div className="text-4xl mb-4">🎉</div>
                <p className="font-bold text-white text-lg">Application Sent!</p>
                <p className="text-sm mt-2" style={{ color: 'rgba(255,255,255,0.5)' }}>{msg}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { id: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Juan dela Cruz' },
                  { id: 'email', label: 'Email Address', type: 'email', placeholder: 'juan@example.com' },
                  { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+63 912 345 6789' },
                ].map((f) => (
                  <div key={f.id}>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      required
                      placeholder={f.placeholder}
                      value={(formData as any)[f.id]}
                      onChange={(e) => setFormData({ ...formData, [f.id]: e.target.value })}
                      className="dark-input w-full px-4 py-3 rounded-xl text-sm"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Interested In
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="dark-input w-full px-4 py-3 rounded-xl text-sm"
                  >
                    <option value="">Select a program</option>
                    <option>GOVA Courses</option>
                    <option>Recruitment & Staffing</option>
                    <option>Virtual Assistant Services</option>
                    <option>HR Outsourcing</option>
                    <option>Other</option>
                  </select>
                </div>

                {status === 'error' && (
                  <p className="text-red-400 text-xs">{msg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-4 rounded-xl font-bold text-white text-sm mt-2 transition-all duration-300 hover:scale-[1.02] disabled:opacity-60"
                  style={{ background: 'linear-gradient(135deg, #4c1d95, #f97316)' }}
                >
                  {status === 'sending' ? 'Submitting…' : 'Submit Application'}
                </button>

                <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  By submitting, you agree to be contacted by GOVA Academy.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
