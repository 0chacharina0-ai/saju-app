'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, ChevronRight } from 'lucide-react'

type Guardian = {
  id: string
  number: string
  name: string
  korean: string
  service: string
  description: string
  href: string
  image: string
  accent: string
  glow: string
  expression: string
}

type IdleMotion = {
  y?: number[]
  x?: number[]
  rotate?: number[]
  scale?: number[]
  duration: number
}

const IDLE_MOTIONS: Record<string, IdleMotion> = {
  mercury: { y: [0, -10, 0], scale: [1, 0.96, 1], duration: 1.4 },
  venus: { x: [0, -6, 6, 0], rotate: [0, -3, 3, 0], duration: 4.5 },
  earth: { y: [0, -5, 0], rotate: [0, -2, 2, 0], duration: 4 },
  mars: { y: [0, 0, -16, -16, 0], scale: [1, 1, 0.93, 0.93, 1], duration: 1.8 },
  jupiter: { y: [0, -8, 0], scale: [1, 1.04, 1], duration: 3 },
  saturn: { rotate: [0, -4, 4, 0], y: [0, -5, 0], duration: 5 },
  uranus: { x: [0, 8, 8, -3, 0], rotate: [0, 5, -3, 1, 0], duration: 3.2 },
  neptune: { y: [0, -10, -7, -10, 0], scale: [1, 1.03, 1.01, 1.03, 1], duration: 3.5 },
  pluto: { rotate: [0, -5, -7, 2, 0], x: [0, -5, -6, 2, 0], duration: 4 },
}

const GUARDIANS: Guardian[] = [
  {
    id: 'mercury',
    number: '01',
    name: 'MERCURY',
    korean: '수성',
    service: '오늘의 운세',
    description: '오늘의 흐름을 미리 만나보세요.',
    href: '/daily-fortune',
    image: '/mercury.webp',
    accent: '#FFA94D',
    glow: 'rgba(255,169,77,0.35)',
    expression: 'curious',
  },
  {
    id: 'venus',
    number: '02',
    name: 'VENUS',
    korean: '금성',
    service: '연애 / 이성 / 인연운',
    description: '당신의 인연을 우주에서 찾아보세요.',
    href: '/theme/love',
    image: '/venus.webp',
    accent: '#FF8FB3',
    glow: 'rgba(255,143,179,0.35)',
    expression: 'shy',
  },
  {
    id: 'earth',
    number: '03',
    name: 'EARTH',
    korean: '지구',
    service: '1:1 정밀사주',
    description: '생년월시로 정밀하게 풀어내는 사주.',
    href: '/#saju-form',
    image: '/earth.webp',
    accent: '#5BB8FF',
    glow: 'rgba(91,184,255,0.35)',
    expression: 'calm',
  },
  {
    id: 'mars',
    number: '04',
    name: 'MARS',
    korean: '화성',
    service: '커리어 / 이직 / 성공운',
    description: '커리어의 방향과 성공의 시기를 확인하세요.',
    href: '/theme/career',
    image: '/mars.webp',
    accent: '#FF6B5C',
    glow: 'rgba(255,107,92,0.35)',
    expression: 'confident',
  },
  {
    id: 'jupiter',
    number: '05',
    name: 'JUPITER',
    korean: '목성',
    service: '재물 / 자산',
    description: '재물의 흐름과 자산의 운을 읽어보세요.',
    href: '/theme/wealth',
    image: '/jupiter.webp',
    accent: '#E8C97A',
    glow: 'rgba(232,201,122,0.35)',
    expression: 'abundant',
  },
  {
    id: 'saturn',
    number: '06',
    name: 'SATURN',
    korean: '토성',
    service: '2027 신년사주',
    description: '2027년, 새로운 국면의 운세를 준비하세요.',
    href: '/newyear-2027',
    image: '/saturn.webp',
    accent: '#B8A6E0',
    glow: 'rgba(184,166,224,0.35)',
    expression: 'thoughtful',
  },
  {
    id: 'uranus',
    number: '07',
    name: 'URANUS',
    korean: '천왕성',
    service: '무료 타로',
    description: '무료 타로 한 장으로 오늘의 답을 얻으세요.',
    href: '/free-tarot',
    image: '/uranus.webp',
    accent: '#5BE8D0',
    glow: 'rgba(91,232,208,0.35)',
    expression: 'playful',
  },
  {
    id: 'neptune',
    number: '08',
    name: 'NEPTUNE',
    korean: '해왕성',
    service: '건강운',
    description: '몸과 마음의 균형을 찾는 건강운.',
    href: '/theme/health',
    image: '/neptune.webp',
    accent: '#4DA8E8',
    glow: 'rgba(77,168,232,0.35)',
    expression: 'calm',
  },
  {
    id: 'pluto',
    number: '09',
    name: 'PLUTO',
    korean: '명왕성',
    service: '심층 궁합보고서',
    description: '두 사람의 깊은 궁합을 심층 분석합니다.',
    href: '/compatibility',
    image: '/pluto.webp',
    accent: '#9B8FE0',
    glow: 'rgba(155,143,224,0.35)',
    expression: 'shy',
  },
]

export function NineCosmicGuardians() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      ref={sectionRef}
      id="guardians"
      className="relative w-full bg-[#010828] py-24"
    >
      {/* Section header */}
      <div className="mx-auto flex w-full max-w-[1831px] flex-col gap-12 px-6 lg:px-12">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <h2 className="font-grotesk text-[32px] leading-none text-[#EFF4FF] uppercase sm:text-[50px] lg:text-[60px]">
            Meet the <br />
            <span className="ml-12 font-condiment text-[#6FFF00] normal-case lg:ml-32">
              Nine
            </span>{' '}
            Cosmic Guardians
          </h2>
          <p className="max-w-[320px] font-mono text-sm leading-relaxed text-[#EFF4FF]/70 sm:text-base">
            아홉 개의 행성, 아홉 개의 운명.<br />
            같은 우주를 유영하는 귀여운 우주인 가족.
          </p>
        </div>

        {/* Guardian grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GUARDIANS.map((g, i) => {
            const idle = IDLE_MOTIONS[g.id]
            return (
              <motion.a
                key={g.id}
                href={g.href}
                data-guardian={g.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.06,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="guardian-card liquid-glass-dark group relative flex flex-col gap-4 rounded-[32px] p-[18px] transition-transform duration-300 hover:scale-[1.03]"
                style={
                  {
                    '--accent': g.accent,
                    '--glow': g.glow,
                  } as React.CSSProperties
                }
              >
                {/* Character display area */}
                <div className="relative w-full overflow-hidden rounded-[24px] pb-[100%]">
                  {/* Cosmic playground backdrop */}
                  <div
                    className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(ellipse 80% 70% at 50% 45%, ${g.glow} 0%, transparent 65%), linear-gradient(160deg, #050d2e 0%, #0a1340 40%, #050b2a 100%)`,
                    }}
                  />
                  {/* Floating tiny stars / particles */}
                  <div className="pointer-events-none absolute inset-0 opacity-70">
                    <span className="absolute left-[18%] top-[22%] h-[3px] w-[3px] animate-twinkle rounded-full bg-white/80" />
                    <span className="absolute left-[78%] top-[18%] h-[2px] w-[2px] animate-twinkle rounded-full bg-white/60" style={{ animationDelay: '1s' }} />
                    <span className="absolute left-[88%] top-[55%] h-[2px] w-[2px] animate-twinkle rounded-full bg-white/50" style={{ animationDelay: '2s' }} />
                    <span className="absolute left-[10%] top-[68%] h-[3px] w-[3px] animate-twinkle rounded-full bg-white/70" style={{ animationDelay: '0.5s' }} />
                    <span className="absolute left-[65%] top-[80%] h-[2px] w-[2px] animate-twinkle rounded-full bg-white/50" style={{ animationDelay: '1.5s' }} />
                    <span className="absolute left-[30%] top-[85%] h-[2px] w-[2px] animate-twinkle rounded-full" style={{ backgroundColor: g.accent, animationDelay: '2.5s' }} />
                  </div>
                  {/* Soft planet orb in background */}
                  <div
                    className="pointer-events-none absolute -right-8 top-6 h-20 w-20 rounded-full opacity-25 blur-[2px] transition-all duration-500 group-hover:opacity-40 group-hover:scale-110"
                    style={{ background: `radial-gradient(circle at 35% 35%, ${g.accent}, transparent 75%)` }}
                  />
                  {/* The astronaut character */}
                  <motion.img
                    src={g.image}
                    alt={`${g.name} - ${g.korean} guardian`}
                    className="absolute inset-0 h-full w-full object-cover"
                    animate={
                      prefersReducedMotion || !isInView
                        ? undefined
                        : {
                            x: idle.x,
                            y: idle.y,
                            rotate: idle.rotate,
                            scale: idle.scale,
                          }
                    }
                    transition={
                      prefersReducedMotion || !isInView
                        ? undefined
                        : {
                            duration: idle.duration,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }
                    }
                    loading="lazy"
                  />
                  {/* Planet identity — top-left corner */}
                  <div
                    className="absolute left-4 top-4 z-10 flex flex-col gap-1"
                    style={{ textShadow: '0 2px 10px rgba(1, 8, 40, 0.9)' }}
                  >
                    <span className="font-mono text-[14px] font-semibold leading-none tracking-[0.2em] text-[#EFF4FF]">
                      {g.number}
                    </span>
                    <span className="font-grotesk text-[21px] font-bold leading-tight tracking-wide text-[#EFF4FF] uppercase">
                      {g.name}
                    </span>
                    <span className="font-mono text-[14px] font-semibold leading-tight text-[#EFF4FF]">
                      {g.korean}
                    </span>
                  </div>
                  {/* Hover CTA — bottom-right of image */}
                  <div
                    className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 rounded-full bg-[#010828]/70 px-3.5 py-2 backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  >
                    <span className="font-grotesk text-sm uppercase tracking-wider" style={{ color: g.accent }}>
                      Discover
                    </span>
                    <ArrowRight size={14} style={{ color: g.accent }} />
                  </div>
                </div>

                {/* Card footer — service information */}
                <div className="flex items-start justify-between gap-4 rounded-[20px] px-5 py-4">
                  <div className="flex min-w-0 flex-col gap-2">
                    <p className="font-grotesk text-[20px] font-bold leading-tight tracking-wide text-[#EFF4FF]">
                      {g.service}
                    </p>
                    <p className="font-mono text-[13px] font-medium leading-relaxed text-[#EFF4FF]/85">
                      {g.description}
                    </p>
                  </div>
                  <div
                    className="mt-0.5 flex h-[48px] w-[48px] shrink-0 cursor-pointer items-center justify-center rounded-full shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
                    style={{
                      background: `linear-gradient(135deg, ${g.accent}, ${g.accent}99)`,
                      boxShadow: `0 4px 20px ${g.glow}`,
                    }}
                  >
                    <ChevronRight size={20} className="text-white" />
                  </div>
                </div>

                {/* Accent line on hover */}
                <div
                  className="pointer-events-none absolute inset-x-[18px] bottom-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: `linear-gradient(90deg, transparent, ${g.accent}, transparent)` }}
                />
              </motion.a>
            )
          })}
        </div>

        {/* Bottom hint */}
        <div className="flex justify-center pt-4">
          <p className="font-mono text-xs tracking-[0.2em] text-[#EFF4FF]/50 uppercase">
            One astronaut family · Nine cosmic worlds
          </p>
        </div>
      </div>

      <style>{`
        .guardian-card {
          will-change: transform;
        }
      `}</style>
    </section>
  )
}
