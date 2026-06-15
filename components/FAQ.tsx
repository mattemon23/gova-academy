'use client'

import { useState, useEffect, useRef } from 'react'
import { Plus, Minus } from 'lucide-react'

const FAQS = [
  { q: "What if I don't have VA experience?", a: "No experience? No problem! Our 0-to-One program is specifically designed to take you from zero experience to landing your first client. We teach you the foundational skills you need." },
  { q: "How long before I start seeing results?", a: "Many of our students land their first client within 30–60 days of starting our program, provided they consistently apply the strategies we teach." },
  { q: "Is this really free? What's the catch?", a: "We offer free introductory resources and webinars. Our comprehensive training programs and mentorship are paid investments in your career, designed to provide high-value returns." },
  { q: "What services should I offer as a VA?", a: "We help you identify your strengths and match them with high-demand services. Common starting points include email management, social media support, and data entry." },
  { q: "How do I stand out when there are so many VAs out there?", a: "We focus on building your unique personal brand and specializing in high-value niches. You won't just be another VA; you'll be a specialized solution provider." },
  { q: "What if I don't know how to market myself?", a: "Marketing is a core part of our curriculum. We teach you how to optimize your profile, network effectively, and attract clients without being 'salesy'." },
  { q: "Do I need special certifications to become a VA?", a: "While not strictly mandatory, our Verified Certification gives you a significant competitive edge and builds trust with potential clients." },
  { q: "Can I work as a VA part-time while keeping my current job?", a: "Absolutely! Many of our successful graduates started part-time. The flexibility of VA work allows you to build your business alongside your current job." },
  { q: "How do I find my first client?", a: "We teach proven client acquisition strategies, including where to look, how to pitch, and how to leverage our Global Talent Pool network." },
  { q: "How do I price my services as a new VA?", a: "We provide pricing templates and strategies to help you set competitive rates that reflect your value, ensuring you don't underprice your services." },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const animate = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.fromTo(
        sectionRef.current?.querySelectorAll('.faq-item') || [],
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      )
    }
    animate()
  }, [])

  return (
    <section id="faq" ref={sectionRef} className="py-28 relative">
      <div className="divider mb-16 mx-auto max-w-7xl" />

      <div className="max-w-4xl mx-auto px-5 lg:px-8">
        <div className="text-center mb-16">
          <div className="pill pill-violet mb-6 inline-flex">FAQ</div>
          <h2
            style={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 900,
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              letterSpacing: '-0.02em',
              color: '#fff',
            }}
          >
            Still Have Questions?
          </h2>
          <p className="mt-4 text-base" style={{ color: 'rgba(255,255,255,0.5)' }}>
            We've got you covered.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = open === i
            return (
              <div
                key={i}
                className="faq-item glass rounded-xl overflow-hidden cursor-pointer group"
                style={{
                  opacity: 0,
                  border: isOpen ? '1px solid rgba(124,58,237,0.3)' : '1px solid rgba(255,255,255,0.06)',
                  transition: 'border-color 0.3s ease',
                }}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <div className="flex items-center justify-between p-6 gap-4">
                  <h4
                    className="font-semibold text-base leading-snug"
                    style={{ color: isOpen ? '#a78bfa' : 'rgba(255,255,255,0.85)' }}
                  >
                    {faq.q}
                  </h4>
                  <div
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      background: isOpen ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.05)',
                      color: isOpen ? '#a78bfa' : 'rgba(255,255,255,0.4)',
                    }}
                  >
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    transition: 'grid-template-rows 0.35s ease',
                  }}
                >
                  <div style={{ overflow: 'hidden' }}>
                    <p
                      className="px-6 pb-6 text-sm leading-relaxed"
                      style={{ color: 'rgba(255,255,255,0.55)' }}
                    >
                      {faq.a}
                    </p>
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
