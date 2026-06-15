'use client'

import { useEffect, useRef } from 'react'
import { MapPin } from 'lucide-react'

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const animate = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.fromTo(
        sectionRef.current?.querySelectorAll('.reveal-up') || [],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      )

      // Counter animation — using a proxy object with gsap.to (not fromTo)
      const counters = sectionRef.current?.querySelectorAll('.counter-num') || []
      counters.forEach((el) => {
        const target = parseInt(el.getAttribute('data-target') || '0')
        if (!target) return
        const suffix = el.getAttribute('data-suffix') || ''
        const proxy = { val: 0 }
        gsap.to(proxy, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = Math.round(proxy.val).toLocaleString() + suffix
          },
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
        })
      })
    }
    animate()
  }, [])

  const methodology = [
    {
      day: '30',
      title: 'Foundation',
      desc: 'Master the fundamentals through hands-on training, mentorship, and practical exercises. Build your core skills and confidence.',
      color: '#a78bfa',
    },
    {
      day: '60',
      title: 'Application',
      desc: 'Apply your knowledge in real-world scenarios with guided practice, shadowing opportunities, and personalized feedback.',
      color: '#f97316',
    },
    {
      day: '90',
      title: 'Mastery',
      desc: 'Achieve professional mastery with career guidance, client acquisition support, and ongoing mentorship to ensure long-term success.',
      color: '#34d399',
    },
  ]

  const locations = [
    { name: 'Philippines', sub: 'Our largest community', count: '1,500+', color: '#a78bfa' },
    { name: 'Middle East', sub: 'UAE, Saudi Arabia', count: '300+', color: '#f97316' },
    { name: 'Global Reach', sub: 'Across continents', count: '200+', color: '#34d399' },
  ]

  return (
    <section id="about" ref={sectionRef} className="py-28 relative">
      <div className="divider mb-16 mx-auto max-w-7xl" />

      <div className="max-w-7xl mx-auto px-5 lg:px-8 space-y-28">

        {/* About GOVA */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="reveal-up">
            <div className="pill pill-violet mb-6">Who We Are</div>
            <h2
              style={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 900,
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                letterSpacing: '-0.02em',
                color: '#fff',
                lineHeight: 1.15,
              }}
            >
              More Than a Recruitment Agency —{' '}
              <span className="text-gradient-violet">Global Talent Architects</span>
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
              <p>
                We are <strong className="text-white">global talent acquisition specialists</strong> committed to helping businesses scale through top-tier outsourcing solutions and virtual assistant training.
              </p>
              <p>
                As an international outsourcing partner and professional training academy, we don't just connect companies with skilled remote professionals —{' '}
                <strong className="text-white">we develop them.</strong>
              </p>
              <p>
                Whether you need a reliable virtual assistant, a remote team member, or a strategic staffing partner, GOVA delivers talent that's{' '}
                <strong className="text-white">well-trained, culturally aligned, and ready to make an impact from day one.</strong>
              </p>
            </div>
          </div>

          {/* Stats cards */}
          <div className="reveal-up grid grid-cols-3 gap-4">
            {locations.map((l, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-6 text-center group hover:scale-105 transition-all duration-300"
                style={{ borderColor: `${l.color}20` }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: `${l.color}15`, border: `1px solid ${l.color}25` }}
                >
                  <MapPin size={18} style={{ color: l.color }} />
                </div>
                <div
                  className="font-bold text-white text-lg mb-1"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  {l.name}
                </div>
                <div className="text-xs mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>{l.sub}</div>
                <div
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 900,
                    fontSize: '1.4rem',
                    color: l.color,
                  }}
                >
                  {l.count}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  Aspirants
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Methodology */}
        <div className="reveal-up">
          <div className="text-center mb-14">
            <div className="pill pill-orange mb-6 inline-flex">Our Process</div>
            <h2
              style={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 900,
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                letterSpacing: '-0.02em',
                color: '#fff',
              }}
            >
              The 30-60-90 Day Methodology
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-base" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Transform your career with our structured learning path — designed for maximum results.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {methodology.map((step, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-8 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300"
              >
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity"
                  style={{ background: step.color }}
                />
                <div
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 900,
                    fontSize: '4rem',
                    lineHeight: 1,
                    background: `linear-gradient(135deg, ${step.color}, ${step.color}88)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '1.5rem',
                  }}
                >
                  {step.day}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: step.color }}>
                  Day {step.day}
                </div>
                <h4
                  className="text-xl font-bold text-white mb-3"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  {step.title}
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Sponsorship note */}
          <div
            className="mt-8 p-6 rounded-2xl flex items-start gap-4"
            style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)' }}
          >
            <span className="text-2xl">💛</span>
            <div>
              <h4 className="font-bold text-white mb-1">GOVA Sponsorship Program</h4>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                We believe everyone deserves the opportunity to build a better future. Financial constraints shouldn't hold you back.{' '}
                <button className="text-orange-400 font-semibold hover:text-orange-300 transition-colors underline underline-offset-2">
                  Learn More About Sponsorship
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* CEO Section */}
        <div className="reveal-up">
          <div
            className="glass rounded-3xl p-8 lg:p-14 relative overflow-hidden"
            style={{ boxShadow: '0 0 80px rgba(76, 29, 149, 0.2)' }}
          >
            <div
              className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.08), transparent 70%)' }}
            />

            <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <div className="pill pill-orange mb-6">Meet Our Founder & CEO</div>
                <h2
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 900,
                    fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                    letterSpacing: '-0.02em',
                    color: '#fff',
                    lineHeight: 1.2,
                  }}
                >
                  Mrs. Wells Fisher
                </h2>
                <blockquote
                  className="mt-6 text-lg italic leading-relaxed"
                  style={{
                    color: 'rgba(255,255,255,0.7)',
                    borderLeft: '3px solid #f97316',
                    paddingLeft: '20px',
                  }}
                >
                  "At GOVA, we believe learning should be hands-on. Our approach combines coaching, real-world shadowing, and guided practice — helping you build a professional brand that attracts clients."
                </blockquote>
                <p className="mt-4 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  With over a decade of experience in HR and professional development, Mrs. Fisher has transformed the lives of thousands of aspiring virtual assistants across Asia.
                </p>

                <div className="flex gap-10 mt-8 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  <div>
                    <div
                      className="counter-num"
                      data-target="2000"
                      data-suffix="+"
                      style={{
                        fontFamily: '"Playfair Display", serif',
                        fontWeight: 900,
                        fontSize: '2.5rem',
                        background: 'linear-gradient(135deg, #f97316, #f59e0b)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      2,000+
                    </div>
                    <div className="text-xs font-bold uppercase tracking-wider mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      Students Trained
                    </div>
                  </div>
                  <div>
                    <div
                      className="counter-num"
                      data-target="10"
                      data-suffix="+"
                      style={{
                        fontFamily: '"Playfair Display", serif',
                        fontWeight: 900,
                        fontSize: '2.5rem',
                        background: 'linear-gradient(135deg, #f97316, #f59e0b)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      10+
                    </div>
                    <div className="text-xs font-bold uppercase tracking-wider mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      Years Leading
                    </div>
                  </div>
                </div>
              </div>

              {/* CEO image */}
              <div
                className="aspect-[4/5] rounded-2xl overflow-hidden relative"
                style={{ background: 'linear-gradient(135deg, #2d0060, #4c1d95)' }}
              >
                <img
                  src="/Mrs_Wells_Fisher.png"
                  alt="Mrs. Wells Fisher"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #2d006088, #4c1d9588)' }}
                >
                  <div
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      fontSize: '5rem',
                      fontWeight: 900,
                      color: 'rgba(249,115,22,0.3)',
                      lineHeight: 1,
                    }}
                  >
                    WF
                  </div>
                  <p className="text-xs mt-4 font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    Mrs. Wells Fisher
                  </p>
                </div>
                <div
                  className="absolute bottom-0 left-0 right-0 p-6"
                  style={{ background: 'linear-gradient(to top, rgba(10,6,18,0.9), transparent)' }}
                >
                  <p className="text-sm italic text-white/80 leading-relaxed">
                    "The world equally distributes talents, but not opportunities."
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'rgba(249,115,22,0.8)' }}>— Mrs. Wells Fisher</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
