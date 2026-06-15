'use client'

import { useEffect, useRef } from 'react'

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let animationId: number
    let scene: any, camera: any, renderer: any
    let particles: any, lines: any[] = []
    let mouseX = 0, mouseY = 0

    const init = async () => {
      const THREE = await import('three')

      scene = new THREE.Scene()

      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.z = 5

      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current!,
        alpha: true,
        antialias: true,
      })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)

      // ── Particle field ──
      const count = 1200
      const positions = new Float32Array(count * 3)
      const colors = new Float32Array(count * 3)
      const sizes = new Float32Array(count)

      const palette = [
        new THREE.Color('#4c1d95'),
        new THREE.Color('#7c3aed'),
        new THREE.Color('#f97316'),
        new THREE.Color('#a78bfa'),
        new THREE.Color('#2d0060'),
      ]

      for (let i = 0; i < count; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * 20
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10

        const c = palette[Math.floor(Math.random() * palette.length)]
        colors[i * 3]     = c.r
        colors[i * 3 + 1] = c.g
        colors[i * 3 + 2] = c.b

        sizes[i] = Math.random() * 3 + 0.5
      }

      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
      geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

      const mat = new THREE.PointsMaterial({
        size: 0.04,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        sizeAttenuation: true,
      })

      particles = new THREE.Points(geo, mat)
      scene.add(particles)

      // ── Floating geometric shapes ──
      const addShape = (geo: any, color: string, x: number, y: number, z: number) => {
        const mat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(color),
          wireframe: true,
          transparent: true,
          opacity: 0.12,
        })
        const mesh = new THREE.Mesh(geo, mat)
        mesh.position.set(x, y, z)
        scene.add(mesh)
        return mesh
      }

      const shapes: any[] = [
        addShape(new THREE.IcosahedronGeometry(1.4, 1), '#4c1d95', -3.5, 1.5, -2),
        addShape(new THREE.OctahedronGeometry(0.9), '#f97316', 3.2, -1.2, -1),
        addShape(new THREE.TorusGeometry(1.1, 0.3, 8, 20), '#7c3aed', 0, -2.5, -3),
        addShape(new THREE.TetrahedronGeometry(0.8), '#a78bfa', 2.5, 2.2, -2),
        addShape(new THREE.IcosahedronGeometry(0.6, 0), '#f97316', -2.2, -1.8, -1),
      ]

      // ── Connection lines between random particles ──
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x4c1d95,
        transparent: true,
        opacity: 0.15,
      })
      for (let i = 0; i < 30; i++) {
        const pts = [
          new THREE.Vector3(
            (Math.random() - 0.5) * 16,
            (Math.random() - 0.5) * 16,
            (Math.random() - 0.5) * 6
          ),
          new THREE.Vector3(
            (Math.random() - 0.5) * 16,
            (Math.random() - 0.5) * 16,
            (Math.random() - 0.5) * 6
          ),
        ]
        const lineGeo = new THREE.BufferGeometry().setFromPoints(pts)
        const line = new THREE.Line(lineGeo, lineMat)
        scene.add(line)
        lines.push(line)
      }

      // ── Mouse tracking ──
      const onMouse = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2
        mouseY = -(e.clientY / window.innerHeight - 0.5) * 2
      }
      window.addEventListener('mousemove', onMouse)

      // ── Resize ──
      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }
      window.addEventListener('resize', onResize)

      let time = 0
      const animate = () => {
        animationId = requestAnimationFrame(animate)
        time += 0.003

        // Rotate particles slowly
        particles.rotation.x = time * 0.05 + mouseY * 0.05
        particles.rotation.y = time * 0.08 + mouseX * 0.05

        // Animate shapes
        shapes.forEach((mesh, i) => {
          mesh.rotation.x = time * (0.2 + i * 0.05)
          mesh.rotation.y = time * (0.15 + i * 0.04)
          mesh.position.y += Math.sin(time + i) * 0.002
        })

        // Pulse lines
        lines.forEach((line, i) => {
          line.material.opacity = 0.05 + Math.sin(time * 2 + i) * 0.1
        })

        // Camera follows mouse slightly
        camera.position.x += (mouseX * 0.3 - camera.position.x) * 0.02
        camera.position.y += (mouseY * 0.3 - camera.position.y) * 0.02
        camera.lookAt(scene.position)

        renderer.render(scene, camera)
      }

      animate()

      return () => {
        window.removeEventListener('mousemove', onMouse)
        window.removeEventListener('resize', onResize)
      }
    }

    init()

    return () => {
      cancelAnimationFrame(animationId)
      if (renderer) renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="three-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
