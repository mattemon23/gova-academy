'use client'

import { useEffect, useRef } from 'react'
import { Users, Headphones, Briefcase, BookOpen, Target, Globe } from 'lucide-react'

const SERVICES = [
  {
    icon: Users,
    title: 'Recruitment & Staffing',
    description: 'End-to-end recruitment solutions to find the perfect talent for your organization. We handle sourcing, screening, and placement.',
    accent: '#a78bfa',
  },
  {
    icon: Headphones,
    title: 'Virtual Assistant Services',
    description: 'Highly skilled virtual assistants for administrative tasks, customer support, data entry, and more. Available 24/7.',
    accent: '#f97316',
  },
  {
    icon: Briefcase,
    title: 'HR Outsourcing',
    description: 'Complete HR management solutions including payroll, compliance, benefits administration, and employee relations.',
    accent: '#a78bfa',
  },
  {
    icon: BookOpen,
    title: 'Training & Development',
    description: 'Comprehensive training programs to upskill your team. Customized courses in communication, technology, and leadership.',
    accent: '#f97316',
  },
  {
    icon: Target,
    title: 'Project Management',
    description: 'Dedicated project managers to oversee your initiatives, ensure timelines are met, and deliver quality results.',
    accent: '#a78bfa',
  },
  {
    icon: Globe,
    title: 'Global Talent Pool',
    description: 'Access to skilled professionals across Asia. We connect you with top talent in Philippines, India, Vietnam, and beyond.',
    accent: '#f97316',
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const animate = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.fromTo(
        sectionRef.current?.querySelectorAll('.service-card') || [],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      )
    }
    animate()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-28 relative">
      {/* Top divider */}
      <div className="divider mb-16 mx-auto max-w-7xl" />

      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center mb-16">
          <div className="pill pill-violet mb-6 inline-flex">Our Solutions</div>
          <h2
            style={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 900,
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              letterSpacing: '-0.02em',
              color: '#fff',
            }}
          >
            Services Built to{' '}
            <span className="text-gradient">Scale You</span>
          </h2>
          <p className="mt-4 text-base max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Comprehensive HR and VA solutions tailored to your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => {
            const Icon = s.icon
            return (
              <div
                key={i}
                className="service-card glass rounded-2xl p-8 group cursor-default transition-all duration-300 hover:scale-[1.02]"
                style={{ opacity: 0 }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `${s.accent}18`,
                    border: `1px solid ${s.accent}30`,
                  }}
                >
                  <Icon size={22} style={{ color: s.accent }} />
                </div>
                <h3
                  className="font-bold mb-3 text-white"
                  style={{ fontSize: '1.05rem', letterSpacing: '-0.01em' }}
                >
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {s.description}
                </p>
                <div
                  className="mt-6 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  style={{ color: s.accent }}
                >
                  Learn More
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
