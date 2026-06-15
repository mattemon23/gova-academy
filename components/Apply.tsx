'use client'

import { useState, useEffect, useRef } from 'react'
import { Mail, Phone, MapPin, Clock, CheckCircle } from 'lucide-react'

export default function Apply() {
  const sectionRef = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: '',
    experience: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    const animate = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.fromTo(
        sectionRef.current?.querySelectorAll('.reveal-up') || [],
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrMsg('')

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', phone: '', program: '', experience: '', message: '' })
      } else {
        setStatus('error')
        setErrMsg(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrMsg('Network error. Please check your connection.')
    }
  }

  const contacts = [
    { icon: Mail, label: 'Email', value: 'info@govaacademy.com', color: '#a78bfa' },
    { icon: Phone, label: 'Phone', value: '+63 XXX XXX XXXX', color: '#f97316' },
    { icon: MapPin, label: 'Office', value: 'Manila, Philippines', color: '#34d399' },
    { icon: Clock, label: 'Hours', value: 'Mon–Fri 9AM–6PM · Sat 10AM–4PM', color: '#60a5fa' },
  ]

  const programs = [
    'Executive Assistant',
    'Creatives and Branding',
    '0-to-One',
    'Customer Service & Lead Gen',
    'Professional Branding',
    'Human Resources & Payroll',
    'Business English',
    'Affiliates',
    'AI Courses',
    'Other',
  ]

  return (
    <section id="apply" ref={sectionRef} className="py-28 relative">
      <div className="divider mb-16 mx-auto max-w-7xl" />

      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center mb-16 reveal-up" style={{ opacity: 0 }}>
          <div className="pill pill-orange mb-6 inline-flex">Apply Now</div>
          <h2
            style={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 900,
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              letterSpacing: '-0.02em',
              color: '#fff',
            }}
          >
            Start Your <span className="text-gradient">GOVA Journey</span>
          </h2>
          <p className="mt-4 text-base max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Fill in your details — our team will reach out within 24 hours to guide your next step.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-4 space-y-4 reveal-up" style={{ opacity: 0 }}>
            {contacts.map((c, i) => {
              const Icon = c.icon
              return (
                <div
                  key={i}
                  className="glass rounded-2xl p-5 flex items-start gap-4 hover:scale-[1.02] transition-all duration-300"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${c.color}15`, border: `1px solid ${c.color}25` }}
                  >
                    <Icon size={18} style={{ color: c.color }} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      {c.label}
                    </div>
                    <div className="text-sm font-medium text-white">{c.value}</div>
                  </div>
                </div>
              )
            })}

            {/* Why apply box */}
            <div
              className="glass rounded-2xl p-6 mt-4"
              style={{ borderColor: 'rgba(124,58,237,0.2)', background: 'rgba(76,29,149,0.08)' }}
            >
              <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Why Apply to GOVA?</h4>
              <ul className="space-y-2.5">
                {[
                  'Structured 30-60-90 day program',
                  'Expert instructors with real-world experience',
                  'AI-powered tools & automation training',
                  'Career placement support',
                  'Verified certification recognized globally',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    <CheckCircle size={14} className="flex-shrink-0" style={{ color: '#a78bfa' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Application Form */}
          <div className="lg:col-span-8 reveal-up" style={{ opacity: 0 }}>
            <div
              className="glass rounded-3xl p-8 lg:p-10"
              style={{ boxShadow: '0 0 60px rgba(76, 29, 149, 0.2)' }}
            >
              {status === 'success' ? (
                <div className="py-16 text-center">
                  <div className="text-5xl mb-6">🎓</div>
                  <h3
                    className="text-2xl font-bold text-white mb-4"
                    style={{ fontFamily: '"Playfair Display", serif' }}
                  >
                    Application Received!
                  </h3>
                  <p className="mb-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    Thank you for applying to GOVA Academy.
                  </p>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    Check your email for a confirmation message. We'll reach out within 24–48 hours.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-8 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #4c1d95, #f97316)' }}
                  >
                    Submit Another
                  </button>
                </div>
              ) : (
                <>
                  <h3
                    className="text-xl font-bold text-white mb-6"
                    style={{ fontFamily: '"Playfair Display", serif' }}
                  >
                    Apply to GOVA Academy
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {[
                        { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Juan dela Cruz', required: true },
                        { name: 'email', label: 'Email Address', type: 'email', placeholder: 'juan@example.com', required: true },
                      ].map((f) => (
                        <div key={f.name}>
                          <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
                            {f.label} {f.required && <span style={{ color: '#f97316' }}>*</span>}
                          </label>
                          <input
                            type={f.type}
                            name={f.name}
                            required={f.required}
                            placeholder={f.placeholder}
                            value={(formData as any)[f.name]}
                            onChange={handleChange}
                            className="dark-input w-full px-4 py-3 rounded-xl text-sm"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
                          Phone Number <span style={{ color: '#f97316' }}>*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          placeholder="+63 912 345 6789"
                          value={formData.phone}
                          onChange={handleChange}
                          className="dark-input w-full px-4 py-3 rounded-xl text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
                          Program Interest <span style={{ color: '#f97316' }}>*</span>
                        </label>
                        <select
                          name="program"
                          required
                          value={formData.program}
                          onChange={handleChange}
                          className="dark-input w-full px-4 py-3 rounded-xl text-sm"
                        >
                          <option value="">Select a program</option>
                          {programs.map((p) => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        Experience Level
                      </label>
                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className="dark-input w-full px-4 py-3 rounded-xl text-sm"
                      >
                        <option value="">Select your level</option>
                        <option>Complete Beginner (0 experience)</option>
                        <option>Some Experience (1–6 months)</option>
                        <option>Experienced (6+ months)</option>
                        <option>Professional (2+ years)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        Tell us about your goals
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        placeholder="What do you hope to achieve with GOVA Academy?"
                        value={formData.message}
                        onChange={handleChange}
                        className="dark-input w-full px-4 py-3 rounded-xl text-sm resize-none"
                      />
                    </div>

                    {status === 'error' && (
                      <div
                        className="p-4 rounded-xl text-sm"
                        style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5' }}
                      >
                        {errMsg}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full py-4 rounded-xl font-bold text-white text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(249,115,22,0.4)] disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{ background: 'linear-gradient(135deg, #4c1d95, #f97316)' }}
                    >
                      {status === 'sending' ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Submitting Application…
                        </span>
                      ) : (
                        'Submit Application →'
                      )}
                    </button>

                    <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.25)' }}>
                      By submitting, you agree to be contacted by GOVA Academy. We respect your privacy.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
