'use client'

import { useEffect, useRef, useState } from 'react'
import { Star, CheckCircle, ArrowRight } from 'lucide-react'

const COURSES = [
  { title: 'Executive Assistant', category: 'Core', description: 'Master calendar management, email correspondence, and executive support to become an indispensable right-hand partner to global leaders.' },
  { title: 'Creatives and Branding', category: 'Design', description: 'Unlock your creative potential. Learn graphic design principles, social media aesthetics, and brand identity creation using industry-standard tools.' },
  { title: '0-to-One', category: 'Business', description: 'The ultimate starter guide for aspiring VAs. We take you from zero experience to landing your first client with confidence and skill.' },
  { title: 'Customer Service & Lead Gen', category: 'Support', description: 'Develop empathy-driven communication skills and master lead generation strategies to drive revenue and customer satisfaction.' },
  { title: 'Professional Branding', category: 'Marketing', description: 'Learn how to position yourself as an authority. Build a compelling personal brand that attracts premium clients and opportunities.' },
  { title: 'Trainers', category: 'Education', description: 'Train the trainer. A specialized program for experienced VAs who want to teach, mentor, and lead the next generation of talent.' },
  { title: 'Human Resources & Payroll', category: 'HR', description: 'Dive into global HR practices. Understand recruitment lifecycles, employee relations, and international payroll compliance.' },
  { title: 'Business English', category: 'Communication', description: 'Polish your professional communication. Enhance your written and spoken English for high-stakes business environments.' },
  { title: 'Affiliates', category: 'Marketing', description: 'Master the art of affiliate marketing. Learn strategies to generate passive income and build profitable partnerships.' },
  { title: 'AI Courses', category: 'Coming Soon', description: 'Future-proof your career. Get hands-on training with the latest AI tools, prompt engineering, and automation workflows.' },
]

const categoryColors: Record<string, string> = {
  Core: '#a78bfa',
  Design: '#f97316',
  Business: '#34d399',
  Support: '#60a5fa',
  Marketing: '#f59e0b',
  Education: '#e879f9',
  HR: '#a78bfa',
  Communication: '#38bdf8',
  'Coming Soon': '#6b7280',
}

export default function Courses() {
  const sectionRef = useRef<HTMLElement>(null)
  const [expanded, setExpanded] = useState<number | null>(null)

  useEffect(() => {
    const animate = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.fromTo(
        sectionRef.current?.querySelectorAll('.course-card') || [],
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      )
    }
    animate()
  }, [])

  return (
    <section id="courses" ref={sectionRef} className="py-28 relative">
      <div className="divider mb-16 mx-auto max-w-7xl" />

      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="pill pill-orange mb-6 inline-flex">
            <Star size={10} className="fill-current" />
            Signature Programs
          </div>
          <h2
            style={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 900,
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              letterSpacing: '-0.02em',
              color: '#fff',
            }}
          >
            GOVA Courses —{' '}
            <span className="text-gradient">30·60·90 Day</span>
          </h2>
          <p className="mt-4 text-base max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Structured learning paths designed with our proven methodology for maximum career transformation.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {COURSES.map((c, i) => {
            const isOpen = expanded === i
            const isComingSoon = c.category === 'Coming Soon'
            const color = categoryColors[c.category] || '#a78bfa'

            return (
              <div
                key={i}
                onClick={() => setExpanded(isOpen ? null : i)}
                className="course-card glass rounded-2xl p-6 cursor-pointer group relative overflow-hidden"
                style={{
                  opacity: 0,
                  border: isOpen ? `1px solid ${color}40` : '1px solid rgba(255,255,255,0.06)',
                  boxShadow: isOpen ? `0 0 40px ${color}20` : 'none',
                  transition: 'all 0.35s ease',
                }}
              >
                {/* Subtle bg gradient on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 30% 30%, ${color}10, transparent 70%)` }}
                />

                <div className="relative z-10">
                  {/* Top row */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ background: `${color}18`, border: `1px solid ${color}30` }}
                    >
                      <CheckCircle size={16} style={{ color }} />
                    </div>
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                      style={{
                        background: `${color}15`,
                        color,
                        border: `1px solid ${color}25`,
                      }}
                    >
                      {c.category}
                    </span>
                  </div>

                  <h4
                    className="font-bold text-white mb-1 text-base leading-snug group-hover:text-gradient transition-all"
                    style={{ fontFamily: '"Playfair Display", serif', letterSpacing: '-0.01em' }}
                  >
                    {c.title}
                  </h4>

                  {/* Expandable description */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateRows: isOpen ? '1fr' : '0fr',
                      transition: 'grid-template-rows 0.4s ease',
                    }}
                  >
                    <div style={{ overflow: 'hidden' }}>
                      <p
                        className="text-sm mt-4 leading-relaxed"
                        style={{
                          color: 'rgba(255,255,255,0.55)',
                          borderTop: '1px solid rgba(255,255,255,0.07)',
                          paddingTop: '12px',
                        }}
                      >
                        {c.description}
                      </p>
                      {!isComingSoon && (
                        <button
                          className="flex items-center gap-1.5 mt-4 text-xs font-bold uppercase tracking-wider transition-colors"
                          style={{ color }}
                        >
                          View Curriculum <ArrowRight size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
