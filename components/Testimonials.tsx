'use client'

import { useEffect, useRef } from 'react'

const TESTIMONIALS = [
  {
    name: 'Angela',
    role: 'GOVA Graduate',
    quote: 'GOVA helped me land my first client within 30 days! I went from zero to earning confidently online.',
    initial: 'A',
    color: '#a78bfa',
  },
  {
    name: 'Marco',
    role: 'Full-time Executive Assistant',
    quote: 'The 90-Day Coaching Program gave me structure and confidence. Now I\'m a full-time Executive Assistant.',
    initial: 'M',
    color: '#f97316',
  },
  {
    name: 'Dante Bitayo',
    role: 'Batch 2 Psalms HR Apprentice',
    location: 'Bukidnon',
    quote: 'Landing my client wasn\'t just luck — it was the outcome of growth, guidance, and showing up prepared. GOVA helped me show up with confidence.',
    initial: 'D',
    color: '#34d399',
  },
  {
    name: 'Mary Ann Crame',
    role: 'Batch 1 Genesis EA Apprentice',
    location: 'Valenzuela City',
    quote: 'Ms. Wells always holds your right hand to walk you through and teach her best techniques for marketing and internship program.',
    initial: 'M',
    color: '#60a5fa',
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const animate = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.fromTo(
        sectionRef.current?.querySelectorAll('.testimonial-card') || [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      )
    }
    animate()
  }, [])

  return (
    <section ref={sectionRef} className="py-28 relative">
      <div className="divider mb-16 mx-auto max-w-7xl" />

      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center mb-16">
          <div className="pill pill-violet mb-6 inline-flex">Student Success</div>
          <h2
            style={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 900,
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              letterSpacing: '-0.02em',
              color: '#fff',
            }}
          >
            Real <span className="text-gradient">Transformations</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="testimonial-card glass rounded-2xl p-7 group hover:scale-[1.02] transition-all duration-300 relative overflow-hidden"
              style={{ opacity: 0 }}
            >
              {/* Quote mark */}
              <div
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '4rem',
                  lineHeight: 1,
                  color: `${t.color}25`,
                  marginBottom: '-1.2rem',
                  display: 'block',
                  fontStyle: 'italic',
                }}
              >
                "
              </div>

              <p className="text-sm leading-relaxed mb-6 relative z-10" style={{ color: 'rgba(255,255,255,0.65)' }}>
                {t.quote}
              </p>

              <div className="flex items-center gap-3 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                  style={{
                    background: `${t.color}20`,
                    border: `1px solid ${t.color}30`,
                    color: t.color,
                    fontFamily: '"Playfair Display", serif',
                  }}
                >
                  {t.initial}
                </div>
                <div>
                  <div className="font-bold text-white text-sm">{t.name}</div>
                  <div className="text-xs" style={{ color: t.color }}>{t.role}</div>
                  {t.location && (
                    <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{t.location}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div
          className="mt-12 rounded-3xl p-10 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #2d0060, #4c1d95)' }}
        >
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ background: 'radial-gradient(circle at 50% 50%, #f97316, transparent 60%)' }}
          />
          <h3
            className="relative text-2xl font-bold text-white mb-4"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Ready to write your own success story?
          </h3>
          <button
            className="relative px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #f97316, #f59e0b)', color: 'white' }}
          >
            Join GOVA Today
          </button>
        </div>
      </div>
    </section>
  )
}
