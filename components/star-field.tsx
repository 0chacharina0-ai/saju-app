'use client'

import { useEffect, useRef } from 'react'

type Star = {
  x: number
  y: number
  r: number
  baseOpacity: number
  twinkleSpeed: number
  phase: number
  color: [number, number, number]
}

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  opacity: number
  color: [number, number, number]
  life: number
  maxLife: number
}

// Muted HUD palette: soft cyan, slate blue, cool white (no neon)
const PALETTE: [number, number, number][] = [
  [120, 180, 220],
  [140, 160, 210],
  [180, 200, 230],
  [220, 230, 240],
]

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId = 0
    let stars: Star[] = []
    let particles: Particle[] = []
    let width = 0
    let height = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const spawnParticle = (): Particle => {
      const color = PALETTE[Math.floor(Math.random() * PALETTE.length)]
      return {
        x: Math.random() * width,
        y: -10,
        vx: (Math.random() - 0.5) * 0.25,
        vy: Math.random() * 0.35 + 0.12,
        r: Math.random() * 1.8 + 0.4,
        opacity: Math.random() * 0.25 + 0.08,
        color,
        life: 0,
        maxLife: Math.random() * 700 + 500,
      }
    }

    const resize = () => {
      // Use viewport dimensions so the canvas always covers the screen
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.floor((width * height) / 7000)
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.4 + 0.3,
        baseOpacity: Math.random() * 0.4 + 0.15,
        twinkleSpeed: Math.random() * 0.008 + 0.002,
        phase: Math.random() * Math.PI * 2,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      }))

      particles = Array.from({ length: 25 }, () => spawnParticle())
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      for (const s of stars) {
        s.phase += s.twinkleSpeed
        const twinkle = prefersReduced
          ? s.baseOpacity
          : s.baseOpacity + Math.sin(s.phase) * 0.3
        const opacity = Math.max(0, Math.min(1, twinkle))
        const [r, g, b] = s.color
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.shadowBlur = 5
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${opacity})`
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`
        ctx.fill()
      }

      if (!prefersReduced) {
        ctx.shadowBlur = 6
        for (const p of particles) {
          p.life += 1
          p.x += p.vx
          p.y += p.vy
          const lifeRatio = p.life / p.maxLife
          const fadeOpacity = p.opacity * Math.sin(lifeRatio * Math.PI)
          const [r, g, b] = p.color
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${fadeOpacity})`
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${fadeOpacity})`
          ctx.fill()

          if (p.life >= p.maxLife || p.y > height + 10) {
            Object.assign(p, spawnParticle())
          }
        }
        ctx.shadowBlur = 0
      }

      animationId = requestAnimationFrame(render)
    }

    resize()
    render()
    window.addEventListener('resize', resize)

    // Handle visibility change — resume animation when tab becomes visible
    const handleVisibility = () => {
      if (!document.hidden && !prefersReduced) {
        cancelAnimationFrame(animationId)
        render()
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', handleVisibility)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 h-full w-full"
    />
  )
}
