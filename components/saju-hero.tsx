'use client'

import React from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { StarField } from './star-field'

interface StaggeredFadeProps {
  text: string
  delay?: number
}

const StaggeredFade: React.FC<StaggeredFadeProps> = ({ text, delay = 0 }) => {
  const ref = React.useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const words = text.split(' ')
  let charIndex = 0

  return (
    <span ref={ref} className="inline">
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split('').map((char) => {
            const idx = charIndex++
            return (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{
                  duration: 0.4,
                  delay: delay + idx * 0.07,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            )
          })}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  )
}

export function SajuHero({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative min-h-screen w-full overflow-x-hidden bg-[#030307] text-white">
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* BACKGROUND: DEEP SPACE + GALAXY + CENTRAL ORB + FLYING BUTTERFLIES */}
      <div className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden">
        <StarField />
        <video
          autoPlay
          muted
          loop
          playsInline
          className="motion-orb absolute left-1/2 top-[52%] h-[78vh] w-screen -translate-x-1/2 -translate-y-1/2 object-cover opacity-55"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030307]/55 via-transparent to-[#030307]" />
      </div>

      {/* HERO CONTENT */}
      <main className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-5 pt-16 pb-20 text-center sm:px-8 sm:pt-20 md:pt-24">
        {/* 상단 태그 */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs tracking-[0.25em] text-teal-200/80 uppercase backdrop-blur-md"
        >
          <span>운명의 궤도를 읽는 시간</span>
        </motion.div>

        {/* 메인 헤딩 */}
        <h1 
          className="mb-6 flex w-full max-w-[calc(100vw-2rem)] flex-col items-center font-serif font-normal leading-[1.08] text-white sm:max-w-5xl sm:leading-[1.12]" 
          style={{ fontFamily: "'Cinzel', 'Garamond', 'Nanum Myeongjo', serif", letterSpacing: '0.04em' }}
        >
          <span className="block text-[clamp(1.55rem,9.2vw,5.5rem)] [word-break:keep-all] sm:whitespace-nowrap sm:text-5xl md:text-6xl lg:text-7xl">
            <StaggeredFade text="BEYOND THE STARS," />
          </span>
          <span className="block text-[clamp(1.55rem,9.2vw,5.5rem)] [word-break:keep-all] text-teal-100/90 sm:whitespace-nowrap sm:text-5xl md:text-6xl lg:text-7xl">
            <StaggeredFade text="DESTINATION AWAITS" delay={0.5} />
          </span>
        </h1>

        {/* 서브타이틀 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-10 max-w-xs font-light leading-relaxed text-sm text-white/70 sm:mb-12 sm:max-w-lg sm:text-base md:text-lg"
        >
          우주를 유영하는 나비의 날갯짓처럼
          <br className="hidden sm:inline" />
          당신의 일상에 찾아올 찬란한 기적을 마주하세요.
        </motion.p>

        {/* CTA BUTTON */}
        <motion.button
          type="button"
          onClick={onStart}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="liquid-glass group flex cursor-pointer items-center gap-3 rounded-full px-8 py-4 text-xs font-light tracking-[0.2em] text-white/95 uppercase transition-all sm:px-11 sm:text-sm"
        >
          <span>운명의 흐름 읽기</span>
          <ArrowRight size={14} className="text-teal-300 transition-transform duration-300 group-hover:translate-x-1" />
        </motion.button>
      </main>

      <style>{`
        .motion-orb {
          filter: saturate(0.68) brightness(0.68) contrast(1.02);
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 18%, #000 82%, transparent 100%);
          mask-image: linear-gradient(90deg, transparent 0%, #000 18%, #000 82%, transparent 100%);
        }

        @media (prefers-reduced-motion: reduce) {
          .motion-orb { animation: none; }
        }

        .liquid-glass {
          background: rgba(255, 255, 255, 0.03);
          background-blend-mode: luminosity;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: none;
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.2), 0 10px 30px rgba(0, 0, 0, 0.5);
          position: relative;
          overflow: hidden;
        }

        .liquid-glass::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1.4px;
          background: linear-gradient(180deg,
            rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.2) 20%,
            rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%,
            rgba(255,255,255,0.2) 80%, rgba(255,255,255,0.6) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .liquid-glass:hover {
          background: rgba(255, 255, 255, 0.07);
          box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.3), 0 15px 40px rgba(45,212,191,0.15);
        }

        .liquid-glass:active {
          transform: scale(0.98);
        }
      `}</style>
    </section>
  )
}