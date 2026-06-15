'use client'

import dynamic from 'next/dynamic'
import Navbar from './Navbar'
import Hero from './Hero'
import Services from './Services'
import Courses from './Courses'
import About from './About'
import Testimonials from './Testimonials'
import FAQ from './FAQ'
import Apply from './Apply'
import Footer from './Footer'

// Three.js background only renders client-side
const ThreeBackground = dynamic(() => import('./ThreeBackground'), { ssr: false })

export default function GovaApp() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen" style={{ background: '#0a0612' }}>
      {/* Three.js animated background */}
      <ThreeBackground />

      {/* Navigation */}
      <Navbar onNavigate={scrollTo} />

      {/* Main content */}
      <main>
        <Hero onNavigate={scrollTo} />
        <Services />
        <Courses />
        <About />
        <Testimonials />
        <FAQ />
        <Apply />
      </main>

      <Footer onNavigate={scrollTo} />
    </div>
  )
}
