import dynamic from 'next/dynamic'

// Dynamic import for client components with Three.js / GSAP
const GovaApp = dynamic(() => import('@/components/GovaApp'), { ssr: false })

export default function Home() {
  return <GovaApp />
}
