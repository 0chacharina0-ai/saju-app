'use client'

import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { NineCosmicGuardians } from './nine-cosmic-guardians'

const ROBOT_VIDEO_WIDTH = 1784
const ROBOT_VIDEO_HEIGHT = 1024
const ROBOT_OVERLAY_WIDTH = ROBOT_VIDEO_WIDTH * 0.179
const ROBOT_OVERLAY_HEIGHT = ROBOT_VIDEO_HEIGHT * 0.178

const ROBOT_TRACK_POINTS = [
  [0, 0, 0, 1],
  [-7, -0.5, -0.6, 1.005],
  [-7, -0.5, -0.6, 1.005],
  [0, 0, 0, 1],
  [10, 0.5, 0.5, 0.998],
  [18, 1, 0.9, 0.996],
  [24, 1.5, 1.2, 0.994],
  [28, 1.5, 1.4, 0.993],
  [36, 1.5, 1.7, 0.992],
  [40, 1, 1.9, 0.992],
  [43, 0.5, 2, 0.992],
]

const ROBOT_PLANETS = [
  { name: 'Mercury', color: '#FFD39A', radius: 9, size: 1.4, duration: 8, delay: -1.2 },
  { name: 'Venus', color: '#FFB6C8', radius: 12, size: 1.7, duration: 10, delay: -5.4 },
  { name: 'Earth', color: '#69D9E8', radius: 15, size: 1.8, duration: 12, delay: -2.7 },
  { name: 'Mars', color: '#FF8D7B', radius: 18, size: 1.5, duration: 14, delay: -8.1 },
  { name: 'Jupiter', color: '#FFE1A6', radius: 21, size: 2.3, duration: 16, delay: -3.6 },
  { name: 'Saturn', color: '#D4B8F2', radius: 24, size: 2, duration: 18, delay: -11.5 },
  { name: 'Uranus', color: '#9DEBD9', radius: 27, size: 1.9, duration: 20, delay: -6.2 },
  { name: 'Neptune', color: '#82B9FF', radius: 30, size: 2, duration: 22, delay: -15.8 },
  { name: 'Pluto', color: '#C7A5E8', radius: 33, size: 1.2, duration: 24, delay: -9.3 },
]

function RobotOrbitOverlay({ videoRef }: { videoRef: RefObject<HTMLVideoElement | null> }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const screenRef = useRef<HTMLDivElement>(null)
  const isVisible = useInView(screenRef, { amount: 0.1 })
  const prefersReducedMotion = useReducedMotion()
  const isStatic = prefersReducedMotion || !isVisible

  useEffect(() => {
    let animationFrame = 0
    let targetX = 0, targetY = 0, targetRot = 0, targetScale = 1
    let currentX = 0, currentY = 0, currentRot = 0, currentScale = 1

    const syncWithRobot = () => {
      const track = trackRef.current
      const video = videoRef.current
      if (track && video && video.readyState >= 2) {
        const time = video.currentTime % 10
        const index = Math.min(Math.floor(time), ROBOT_TRACK_POINTS.length - 2)
        const progress = time - index
        const [x0, y0, r0, s0] = ROBOT_TRACK_POINTS[index]
        const [x1, y1, r1, s1] = ROBOT_TRACK_POINTS[index + 1]
        const e = progress * progress * (3 - 2 * progress)
        targetX = x0 + (x1 - x0) * e
        targetY = y0 + (y1 - y0) * e
        targetRot = r0 + (r1 - r0) * e
        targetScale = s0 + (s1 - s0) * e

        currentX += (targetX - currentX) * 0.35
        currentY += (targetY - currentY) * 0.35
        currentRot += (targetRot - currentRot) * 0.3
        currentScale += (targetScale - currentScale) * 0.3

        track.style.transform =
          `translate(${currentX / ROBOT_OVERLAY_WIDTH * 100}%, ${currentY / ROBOT_OVERLAY_HEIGHT * 100}%) ` +
          `rotate(${currentRot.toFixed(2)}deg) scale(${currentScale.toFixed(4)})`
      }
      animationFrame = requestAnimationFrame(syncWithRobot)
    }

    animationFrame = requestAnimationFrame(syncWithRobot)
    return () => cancelAnimationFrame(animationFrame)
  }, [videoRef])

  return (
    <div
      ref={screenRef}
      aria-hidden="true"
      className="robot-orbit-stage"
    >
      <div ref={trackRef} className="robot-orbit-track">
        <div
          className={`robot-orbit-screen ${prefersReducedMotion ? 'robot-orbit-static' : ''} ${!isVisible ? 'robot-orbit-paused' : ''}`}
          style={{ animationPlayState: isVisible ? 'running' : 'paused' }}
        >
          <svg viewBox="0 0 100 64" className="robot-orbit-svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="robot-screen-glow" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor="#123b53" stopOpacity="0.96" />
                <stop offset="100%" stopColor="#061522" stopOpacity="0.99" />
              </radialGradient>
              <filter id="robot-star-blur" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="1.8" />
              </filter>
            </defs>
            <rect width="100" height="64" fill="url(#robot-screen-glow)" />
            <g className="robot-orbit-rings" fill="none" stroke="#8dd9e5" strokeOpacity="0.22" strokeWidth="0.25">
              {ROBOT_PLANETS.map((planet) => (
                <ellipse key={`${planet.name}-ring`} cx="50" cy="32" rx={planet.radius} ry={planet.radius * 0.62} />
              ))}
            </g>
            <g className="robot-orbit-particles" fill="#dffcff">
              <circle cx="16" cy="21" r="0.35" />
              <circle cx="81" cy="16" r="0.25" />
              <circle cx="76" cy="51" r="0.3" />
              <circle cx="27" cy="49" r="0.22" />
              <circle cx="63" cy="8" r="0.18" />
            </g>
            <circle className="robot-orbit-star-glow" cx="50" cy="32" r="5" fill="#ffd87e" opacity="0.38" filter="url(#robot-star-blur)" />
            <circle className="robot-orbit-star" cx="50" cy="32" r="2.6" fill="#fff1b3" />
            <circle cx="49.2" cy="31.2" r="0.65" fill="#ffffff" opacity="0.9" />
            {ROBOT_PLANETS.map((planet) => (
              <g
                key={planet.name}
                className="robot-orbit-planet"
                style={{
                  transformOrigin: '50px 32px',
                  animationDuration: `${planet.duration}s`,
                  animationDelay: `${planet.delay}s`,
                  animationPlayState: isStatic ? 'paused' : 'running',
                }}
              >
                {planet.name === 'Saturn' && (
                  <ellipse cx={50 + planet.radius} cy="32" rx="3.1" ry="1" fill="none" stroke={planet.color} strokeOpacity="0.7" strokeWidth="0.45" transform={`rotate(-15 ${50 + planet.radius} 32)`} />
                )}
                <circle cx={50 + planet.radius} cy="32" r={planet.size} fill={planet.color} opacity="0.95" />
                <circle cx={50 + planet.radius - planet.size * 0.35} cy={32 - planet.size * 0.35} r={planet.size * 0.3} fill="#ffffff" opacity="0.5" />
              </g>
            ))}
          </svg>
          <div className="robot-orbit-scanlines" />
          <div className="robot-orbit-scanline-moving" />
          <div className="robot-orbit-vignette" />
          <div className="robot-orbit-glare" />
          <div className="robot-orbit-bloom" />
          <div className="robot-orbit-bezel" />
        </div>
      </div>
    </div>
  )
}

export function CosmicLanding() {
  const robotVideoRef = useRef<HTMLVideoElement>(null)
  return (
    <div className="relative w-full overflow-x-hidden bg-[#010828] font-mono text-[#EFF4FF] antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Condiment&display=swap');

        .font-grotesk {
          font-family: 'Anton', sans-serif;
        }
        .font-condiment {
          font-family: 'Condiment', cursive;
        }

        .liquid-glass-dark {
          background: rgba(255, 255, 255, 0.01);
          background-blend-mode: luminosity;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          border: none;
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }
        .liquid-glass-dark::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1.4px;
          background: linear-gradient(180deg,
            rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 20%,
            rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%,
            rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.45) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
        .liquid-glass-dark:hover {
          background: rgba(255, 255, 255, 0.04);
          box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.15);
        }

        /* 로봇 모니터 오버레이 정밀 레이아웃 정돈 */
        .robot-orbit-stage {
          position: absolute;
          left: 23.5%;
          top: 31.8%;
          width: 44.5%;
          height: 33.5%;
          z-index: 2;
          pointer-events: none;
          overflow: hidden;
        }
        .robot-orbit-track {
          position: absolute;
          inset: 0;
          will-change: transform;
          transform-origin: 50% 50%;
        }
        .robot-orbit-screen {
          position: absolute;
          inset: 0;
          overflow: hidden;
          border-radius: 10% / 14%;
          background: #061522;
          box-shadow: inset 0 0 12px rgba(119, 229, 238, 0.24), 0 0 12px rgba(102, 218, 229, 0.13);
          isolation: isolate;
        }
        .robot-orbit-svg {
          display: block;
          width: 100%;
          height: 100%;
          opacity: 0.94;
          object-fit: cover;
        }
        .robot-orbit-planet {
          animation: robot-orbit-spin linear infinite;
          transform-box: view-box;
        }
        .robot-orbit-star,
        .robot-orbit-star-glow {
          transform-box: fill-box;
          transform-origin: center;
          animation: robot-orbit-pulse 2.6s ease-in-out infinite;
        }
        .robot-orbit-star-glow {
          animation-delay: -1.1s;
        }
        .robot-orbit-scanlines {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: repeating-linear-gradient(180deg, rgba(183, 244, 244, 0.04) 0, rgba(183, 244, 244, 0.04) 1px, transparent 1px, transparent 3px);
          mix-blend-mode: screen;
          opacity: 0.4;
        }
        .robot-orbit-scanline-moving {
          position: absolute;
          left: 0;
          right: 0;
          height: 14%;
          pointer-events: none;
          background: linear-gradient(180deg, transparent, rgba(183, 244, 244, 0.05) 50%, transparent);
          mix-blend-mode: screen;
          animation: robot-scanline-roll 6s linear infinite;
        }
        .robot-orbit-vignette {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(ellipse 95% 90% at 50% 50%, transparent 55%, rgba(2, 8, 20, 0.55) 100%);
          mix-blend-mode: multiply;
          opacity: 0.85;
          border-radius: inherit;
        }
        .robot-orbit-glare {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.03) 18%, transparent 40%, transparent 70%, rgba(255, 255, 255, 0.02) 88%, rgba(255, 255, 255, 0.06) 100%);
          mix-blend-mode: screen;
          border-radius: inherit;
        }
        .robot-orbit-bloom {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(ellipse 60% 55% at 50% 48%, rgba(77, 184, 255, 0.08) 0%, transparent 70%);
          mix-blend-mode: screen;
          border-radius: inherit;
        }
        .robot-orbit-bezel {
          position: absolute;
          inset: 0;
          pointer-events: none;
          box-shadow: inset 0 0 6px 2px rgba(2, 8, 20, 0.5), inset 0 0 1px rgba(183, 244, 244, 0.3);
          border-radius: inherit;
        }
        .robot-orbit-static .robot-orbit-planet {
          animation: none;
        }
        .robot-orbit-static .robot-orbit-star,
        .robot-orbit-static .robot-orbit-star-glow {
          animation-duration: 4s;
        }
        .robot-orbit-paused .robot-orbit-star,
        .robot-orbit-paused .robot-orbit-star-glow {
          animation-play-state: paused;
        }
        .robot-orbit-paused .robot-orbit-scanline-moving {
          animation-play-state: paused;
        }
        @keyframes robot-orbit-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes robot-orbit-pulse {
          0%, 100% { opacity: 0.72; transform: scale(0.94); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes robot-scanline-roll {
          0% { top: -14%; }
          100% { top: 100%; }
        }
      `}</style>

      {/* SECTION 2: ABOUT / INTRO */}
      <section className="relative flex min-h-screen w-full flex-col justify-start py-24">
        <div className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_151551_992053d1-3d3e-4b8c-abac-45f22158f411.mp4"
          />
          <div className="absolute inset-0 bg-[#010828]/60" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[1831px] flex-col gap-16 px-6 lg:px-12">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-start">
            <div className="relative">
              <h2 className="font-grotesk text-[32px] leading-none text-[#EFF4FF] uppercase sm:text-[50px] lg:text-[60px]">
                Hello! <br />
                I&apos;m Unciel
              </h2>
              <span className="absolute bottom-0 right-0 translate-x-1/4 -rotate-2 select-none whitespace-nowrap font-condiment text-[36px] text-[#6FFF00] mix-blend-exclusion sm:text-[50px] lg:text-[68px]">
                Unciel
              </span>
            </div>
            <p className="max-w-[300px] font-mono text-sm leading-relaxed text-[#EFF4FF] sm:text-base">
              시간과 공간을 넘어선 우주의 거울.<br />
              운명과 에너지, 고요한 우주를 탐험합니다.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: NINE COSMIC GUARDIANS */}
      <NineCosmicGuardians />

      {/* SECTION 4: CTA */}
      <section id="contact" className="relative w-full overflow-hidden">
        {/* 로봇 비디오 컨테이너에 relative 배치 처리 */}
        <div className="relative w-full">
          <video
            ref={robotVideoRef}
            autoPlay
            muted
            loop
            playsInline
            className="block h-auto w-full object-cover"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_055729_72d66327-b59e-4ae9-bb70-de6ccb5ecdb0.mp4"
          />
          <RobotOrbitOverlay videoRef={robotVideoRef} />
        </div>

        <div className="absolute inset-0 flex items-center justify-end px-6 lg:pl-[15%] lg:pr-[20%]">
          <div className="relative flex flex-col text-right">
            <span className="absolute -top-10 left-0 font-condiment text-[32px] text-[#6FFF00] mix-blend-exclusion sm:text-[50px]">
              Go beyond
            </span>
            <h2 className="font-grotesk text-[24px] leading-none text-[#EFF4FF] uppercase sm:text-[40px] lg:text-[60px]">
              JOIN UNCIEL. <br />
              REVEAL WHAT&apos;S HIDDEN. <br />
              DEFINE WHAT&apos;S NEXT. <br />
              FOLLOW THE FLOW.
            </h2>
          </div>
        </div>
      </section>
    </div>
  )
}