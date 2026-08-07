'use client'

import { ChevronRight, ArrowRight } from 'lucide-react'

const FATES = [
  {
    title: 'Saju Analysis',
    score: '9.4/10',
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_053923_22c0a6a5-313c-474c-85ff-3b50d25e944a.mp4',
    href: '/#saju-form',
    label: '정밀 사주 분석',
  },
  {
    title: 'Tarot Flow',
    score: '9.8/10',
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_054411_511c1b7a-fb2f-42ef-bf6c-32c0b1a06e79.mp4',
    href: '/free-tarot',
    label: '무료 타로 점괘',
  },
  {
    title: 'Destiny Matrix',
    score: '9.1/10',
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_055427_ac7035b5-9f3b-4289-86fc-941b2432317d.mp4',
    href: '/compatibility',
    label: '궁합 분석',
  },
]

export function CosmicLanding() {
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

        .planet-crew {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: clamp(12px, 4vw, 40px);
          margin-top: 10px;
        }
        .planet-astronaut {
          display: flex;
          width: clamp(74px, 13vw, 142px);
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: rgba(239, 244, 255, 0.8);
          font-family: monospace;
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }
        .planet-head {
          position: relative;
          display: flex;
          height: clamp(58px, 10vw, 104px);
          width: clamp(58px, 10vw, 104px);
          align-items: center;
          justify-content: center;
          border: 3px solid var(--planet-color);
          border-radius: 999px;
          background: #f8fbff;
          box-shadow: 0 0 9px var(--planet-color), 0 0 24px var(--planet-glow);
        }
        .planet-head::before {
          content: '';
          position: absolute;
          inset: 7px;
          border: 1px solid var(--planet-color);
          border-radius: inherit;
          opacity: 0.42;
        }
        .planet-face {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .planet-eyes {
          display: flex;
          gap: 14px;
        }
        .planet-eye {
          height: 6px;
          width: 6px;
          border-radius: 50%;
          background: #172033;
        }
        .planet-mouth {
          height: 2px;
          width: 18px;
          border-radius: 999px;
          background: #172033;
        }
        .planet-body {
          height: clamp(52px, 8vw, 84px);
          width: clamp(60px, 10vw, 104px);
          border: 2px solid rgba(255, 255, 255, 0.72);
          border-radius: 42% 42% 30% 30%;
          background: linear-gradient(135deg, #ffffff, #dbe5f1);
          box-shadow: inset 0 -9px 14px rgba(110, 134, 164, 0.24), 0 8px 18px rgba(0, 0, 0, 0.25);
        }
        .planet-jupiter { --planet-color: #ff9d52; --planet-glow: rgba(255, 131, 54, 0.52); }
        .planet-venus { --planet-color: #ffd36a; --planet-glow: rgba(255, 197, 60, 0.52); }
        .planet-mars { --planet-color: #ff557d; --planet-glow: rgba(255, 54, 101, 0.52); }

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
      `}</style>

      {/* SECTION 2: ABOUT / INTRO */}
      <section className="relative flex min-h-screen w-full flex-col justify-between py-24">
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
          <div className="planet-crew" aria-label="목성, 금성, 화성을 테마로 한 우주비행사 캐릭터">
            {[
              { name: 'Jupiter', className: 'planet-jupiter' },
              { name: 'Venus', className: 'planet-venus' },
              { name: 'Mars', className: 'planet-mars' },
            ].map((planet) => (
              <div key={planet.name} className={`planet-astronaut ${planet.className}`}>
                <div className="planet-head">
                  <div className="planet-face">
                    <div className="planet-eyes"><span className="planet-eye" /><span className="planet-eye" /></div>
                    <span className="planet-mouth" />
                  </div>
                </div>
                <div className="planet-body" />
                <span>{planet.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: COSMIC FATES GRID */}
      <section id="gallery" className="relative w-full bg-[#010828] py-24">
        <div className="mx-auto flex w-full max-w-[1831px] flex-col gap-12 px-6 lg:px-12">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <h2 className="font-grotesk text-[32px] leading-none text-[#EFF4FF] uppercase sm:text-[50px] lg:text-[60px]">
              Collection of <br />
              <span className="ml-12 font-condiment text-[#6FFF00] normal-case lg:ml-32">Cosmic</span> objects
            </h2>
            <a
              href="/#saju-form"
              className="liquid-glass-dark flex items-center gap-2 rounded-full px-8 py-4 font-grotesk text-xl tracking-wider text-[#6FFF00] uppercase transition-transform hover:scale-105"
            >
              See All Fates
              <ArrowRight size={18} />
            </a>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FATES.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="liquid-glass-dark flex flex-col gap-4 rounded-[32px] p-[18px] transition-transform hover:scale-[1.02]"
              >
                <div className="relative w-full overflow-hidden rounded-[24px] pb-[100%]">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                    src={item.video}
                  />
                </div>
                <div className="liquid-glass-dark flex items-center justify-between rounded-[20px] px-5 py-4">
                  <div>
                    <p className="font-mono text-[11px] text-[#EFF4FF]/70 uppercase">{item.label}</p>
                    <p className="font-grotesk text-lg text-[#EFF4FF]">{item.score}</p>
                  </div>
                  <div className="flex h-[48px] w-[48px] cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-teal-600 shadow-lg shadow-teal-500/50 transition-transform hover:scale-110">
                    <ChevronRight size={20} className="text-white" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: CTA */}
      <section id="contact" className="relative w-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="block h-auto w-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_055729_72d66327-b59e-4ae9-bb70-de6ccb5ecdb0.mp4"
        />
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
