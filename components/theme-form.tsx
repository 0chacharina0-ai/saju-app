'use client'

import { useState, type FormEvent } from 'react'
import { Calendar, Clock, User as User2, Venus, Mars, MapPin, Sparkles, Coins, Briefcase, Heart, Activity, Brain, Lock, Rocket, Timer, ChevronRight, Download, RotateCcw } from 'lucide-react'
import { REGIONS } from '@/lib/saju'
import { calculateSaju, type SajuResult } from '@/lib/saju'
import { generateThemeReport, type ThemeReport, type ThemeReportSection } from '@/lib/theme-report'
import { MBTI_DATA, MBTI_LIST, type MBTIType } from '@/lib/mbti-data'
import { cleanText } from '@/lib/text-utils'
import { CosmicBackground } from './cosmic-background'

const CURRENT_YEAR = new Date().getFullYear()
const YEARS = Array.from({ length: 100 }, (_, i) => CURRENT_YEAR - i)
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1)
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1)

const HOURS: { label: string; value: number }[] = [
  { label: '자시 (23:00~00:59)', value: 0 }, { label: '축시 (01:00~02:59)', value: 2 },
  { label: '인시 (03:00~04:59)', value: 4 }, { label: '묘시 (05:00~06:59)', value: 6 },
  { label: '진시 (07:00~08:59)', value: 8 }, { label: '사시 (09:00~10:59)', value: 10 },
  { label: '오시 (11:00~12:59)', value: 12 }, { label: '미시 (13:00~14:59)', value: 14 },
  { label: '신시 (15:00~16:59)', value: 16 }, { label: '유시 (17:00~18:59)', value: 18 },
  { label: '술시 (19:00~20:59)', value: 20 }, { label: '해시 (21:00~22:59)', value: 22 },
]

const selectClass = 'cosmic-select'
const labelClass = 'cosmic-label'

const SCORE_COLORS = (s: number) => s >= 80 ? 'text-emerald-400' : s >= 65 ? 'text-amber-400' : 'text-rose-400'
const SCORE_BG = (s: number) => s >= 80 ? 'from-emerald-500 to-green-500' : s >= 65 ? 'from-amber-500 to-yellow-500' : 'from-rose-500 to-red-500'

const THEME_CONFIG: Record<ThemeReport['themeKey'], { title: string; icon: typeof Coins; desc: string }> = {
  wealth: { title: '재물 / 소득 / 자산운', icon: Coins, desc: '돈 버는 방식, 손재 위험 시기, 축재 전략, 부의 최대치' },
  career: { title: '커리어 / 이직 / 성공운', icon: Briefcase, desc: '조직 vs 사업 적성, 승진·독립 시기, 평생 업' },
  love: { title: '연애 / 이성 / 인연운', icon: Heart, desc: '끌리는 유형, 애착 패턴, 잘 맞는 인연, 위험한 사람' },
  health: { title: '건강 / 오행 체질 분석', icon: Activity, desc: '취약 신체 부위, 스트레스 경로, 건강 변곡점, 맞춤 개운' },
}

const THEME_KEY_CARDS: Record<ThemeReport['themeKey'], { title: string; items: string[] }> = {
  wealth: {
    title: '이 리포트에서 알 수 있는 핵심 3가지',
    items: [
      '타고난 재물 그릇과 평생 소득 최대치 분석',
      '손재수(돈이 새어나가는 시기)와 축적 전략',
      '나에게 맞는 부의 창출 방식 (투자 vs 사업 vs 정직한 노동)',
    ],
  },
  career: {
    title: '커리어 & 성공 로드맵에서 알 수 있는 핵심 3가지',
    items: [
      '조직 생활(직장인) vs 독립/창업 적성 정밀 진단',
      '이직, 승진, 사업 확장 변동수가 강한 타이밍',
      '내 시너지를 극대화해 줄 귀인(貴人) 성향 및 동료 케미 분석',
    ],
  },
  love: {
    title: '사주 x MBTI 결합 분석에서 알 수 있는 핵심 3가지',
    items: [
      '사주와 MBTI로 본 내 운명적 인연의 외모/성격 특징',
      '평생 운의 흐름에서 인연운(연애/결혼)이 가장 강하게 들어오는 시기',
      '반복되는 연애 패턴 분석 및 나에게 피해야 할 상극 유형 안내',
    ],
  },
  health: {
    title: '이 리포트에서 알 수 있는 핵심 3가지',
    items: [
      '사주 속 오행(목화토금수)의 불균형 및 체질 분석',
      '취약한 신체 부위와 주의해야 할 건강 고비 시기',
      '나에게 필요한 개운법 (개운 컬러, 음식, 공간 활용)',
    ],
  },
}

const KEYWORD_COLORS = ['bg-amber-500/15 text-amber-400 border-amber-500/30', 'bg-sky-500/15 text-sky-400 border-sky-500/30', 'bg-rose-500/15 text-rose-400 border-rose-500/30']

function ThemeSection({ section, index, blurred }: { section: ThemeReportSection; index: number; blurred?: boolean }) {
  return (
    <div className={`relative mt-8 rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent p-6 sm:p-8 ${blurred ? 'select-none' : ''}`}>
      <div className={`mb-5 flex items-center gap-3 border-b border-border pb-4 ${blurred ? 'blur-sm' : ''}`}>
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 font-serif text-lg font-bold text-primary">{index + 1}</div>
        <h4 className="break-keep flex-1 font-serif text-lg font-bold">{section.title}</h4>
      </div>

      <div className={blurred ? 'blur-sm' : ''}>
        {section.keywords.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {section.keywords.map((kw, i) => (
              <span key={i} className={`break-keep rounded-full border px-3 py-1 text-xs font-bold ${KEYWORD_COLORS[i % KEYWORD_COLORS.length]}`}>{kw}</span>
            ))}
          </div>
        )}

        <div className="space-y-4">
          {section.paragraphs.map((para, i) => (
            <p key={i} className="break-keep text-sm leading-relaxed text-foreground/85 whitespace-pre-line">{cleanText(para)}</p>
          ))}
        </div>

        <p className="break-keep mt-5 border-t border-border pt-4 text-sm italic leading-relaxed text-muted-foreground/80">{cleanText(section.closing)}</p>
      </div>

      {blurred && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-2 rounded-full border border-primary/40 bg-background/90 px-6 py-3 text-sm font-bold text-primary backdrop-blur-md">
            <Lock className="size-4" /> 결제 후 열람
          </div>
        </div>
      )}
    </div>
  )
}

function ThemeCountdownTimer() {
  const [seconds, setSeconds] = useState(599)
  useState(() => {
    const interval = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 599))
    }, 1000)
    return () => clearInterval(interval)
  })
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return (
    <div className="flex items-center gap-1.5 text-sm font-bold text-yellow-400">
      <Timer className="size-4" />
      <span className="tabular-nums text-yellow-300">{String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}</span>
    </div>
  )
}

export function ThemeForm({ themeKey }: { themeKey: ThemeReport['themeKey'] }) {
  const config = THEME_CONFIG[themeKey]
  const Icon = config.icon

  const [name, setName] = useState('')
  const [year, setYear] = useState(1995)
  const [month, setMonth] = useState(1)
  const [day, setDay] = useState(1)
  const [hour, setHour] = useState(12)
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [regionIndex, setRegionIndex] = useState(0)
  const [mbti, setMbti] = useState<MBTIType | ''>('')
  const [reportState, setReportState] = useState<{ report: ThemeReport; name: string } | null>(null)
  const [paid, setPaid] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const region = REGIONS[regionIndex]
    const result = calculateSaju({ year, month, day, hour, calendar: 'solar', cityOffsetMin: region.offsetMin, gender })
    const r = generateThemeReport(themeKey, name.trim() || '무명', result, themeKey === 'love' ? (mbti || null) : null)
    setReportState({ report: r, name: name.trim() || '무명' })
  }

  if (reportState) {
    const halfSections = Math.ceil(reportState.report.sections.length / 2)
    return (
      <main className="cosmic-bg">
        <CosmicBackground />
        <section className="mx-auto max-w-4xl px-6 pb-28 pt-4 sm:px-8">
        <div className="cosmic-card cosmic-card-lg cosmic-anim p-6 sm:p-10">
          <header className="mb-8 border-b border-border pb-6 text-center">
            <Icon className="cosmic-icon text-primary" style={{ width: '3rem', height: '3rem' }} />
            <p className="mt-2 font-display text-xs font-semibold tracking-[0.35em] text-gradient uppercase">Theme Report</p>
            <h2 className="cosmic-title mt-2">{reportState.name}님의 {config.title}</h2>
          </header>

          {/* Total score - always visible */}
          <div className="cosmic-result-section mb-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">종합 점수</p>
            <p className={`mt-2 text-4xl font-bold ${SCORE_COLORS(reportState.report.totalScore)}`}>{reportState.report.totalScore}<span className="text-xl">점</span></p>
          </div>

          {/* MBTI x Saju visual card (love theme only) - always visible */}
          {themeKey === 'love' && reportState.report.mbti && reportState.report.dayMasterStemKr && (
            <div className="cosmic-result-section mb-6" style={{ borderColor: 'oklch(0.65 0.18 25 / 30%)' }}>
              <div className="mb-3 flex items-center gap-2">
                <Brain className="size-5 text-rose-400" />
                <p className="text-xs font-bold uppercase tracking-wider text-rose-400">사주 x MBTI 애정 성향 분석</p>
              </div>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-stretch">
                <div className="flex flex-1 items-center gap-3 rounded-xl border border-primary/30 bg-primary/10 p-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-primary/40 bg-primary/15 font-serif text-xl font-bold text-primary">{reportState.report.dayMasterStemKr.charAt(0)}</div>
                  <div>
                    <p className="text-xs text-muted-foreground">내 사주 일간 캐릭터</p>
                    <p className="text-sm font-bold text-foreground">{reportState.report.dayMasterStemKr}</p>
                  </div>
                </div>
                <div className="flex items-center justify-center text-2xl font-bold text-primary/50">×</div>
                <div className="flex flex-1 items-center gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-rose-500/40 bg-rose-500/15 font-display text-sm font-bold text-rose-400">{reportState.report.mbti}</div>
                  <div>
                    <p className="text-xs text-muted-foreground">내 MBTI</p>
                    <p className="text-sm font-bold text-foreground">{MBTI_DATA[reportState.report.mbti].label}</p>
                  </div>
                </div>
              </div>
              <p className="mt-3 break-keep text-center text-xs text-muted-foreground">{reportState.report.dayMasterStemKr} 일간의 본질 기운 × {reportState.report.mbti} 표현 방식 = 당신만의 애착 체질</p>
            </div>
          )}

          {/* First section as preview - always visible */}
          <ThemeSection section={reportState.report.sections[0]} index={0} />

          {!paid ? (
            <>
              {/* Blurred remaining sections */}
              <div className="relative space-y-4">
                {reportState.report.sections.slice(1).map((s, i) => (
                  <ThemeSection key={i + 1} section={s} index={i + 1} blurred />
                ))}
              </div>

              {/* Paywall CTA */}
              <div className="cosmic-paywall">
                <div className="mb-2 flex items-center justify-center gap-3">
                  <span className="text-lg text-muted-foreground/50 line-through">19,800원</span>
                  <span className="rounded-full bg-yellow-500/20 px-2 py-0.5 text-xs font-bold text-yellow-400">50% 할인</span>
                </div>
                <p className="mb-1 text-3xl font-bold text-gradient">9,900원</p>
                <p className="mb-1 text-xs text-muted-foreground">{config.title} 심층 리포트 · 전체 풀이 열람</p>
                <p className="mb-4 text-xs font-medium text-primary">상세 풀이 + 실천 솔루션 + 연도별 흐름 포함</p>

                <div className="mb-4 flex items-center justify-center">
                  <ThemeCountdownTimer />
                </div>

                <button type="button" onClick={() => setPaid(true)}
                  className="cosmic-btn w-full sm:w-auto">
                  <Rocket className="size-5" />
                  9,900원에 전체 리포트 열기
                </button>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground/70">
                  <span>테스트 결제</span>
                  <span>즉시 열람</span>
                  <span>환불 가능</span>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Paid: full content */}
              <div className="mb-6 flex items-center justify-center gap-2 rounded-full border border-green-500/40 bg-green-500/10 px-4 py-2 text-center text-sm font-medium text-green-400">
                전체 리포트가 열렸습니다.
              </div>

              {/* Remaining sections */}
              {reportState.report.sections.slice(1).map((s, i) => (
                <ThemeSection key={i + 1} section={s} index={i + 1} />
              ))}

              {/* Action guide */}
              <div className="cosmic-result-section mt-8" style={{ borderColor: 'oklch(0.75 0.12 85 / 30%)' }}>
                <p className="mb-4 text-sm font-bold text-amber-400">실전 행동 가이드</p>
                <div className="space-y-3">
                  {reportState.report.actionGuide.map((guide, i) => (
                    <div key={i} className="rounded-xl border border-border bg-secondary/20 p-4">
                      <p className="mb-2 text-sm font-bold text-foreground">{guide.label}</p>
                      <div className="flex flex-wrap gap-2">
                        {guide.items.map((item, j) => (
                          <span key={j} className="break-keep rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{item}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p className="break-keep mt-6 text-sm leading-relaxed text-muted-foreground">{cleanText(reportState.report.closing)}</p>

              <div className="no-print mt-8 flex flex-col gap-3 sm:flex-row">
                <button onClick={() => window.print()} className="cosmic-btn-secondary">
                  <Download className="size-4" /> PDF로 저장
                </button>
                <button onClick={() => { setReportState(null); setPaid(false) }} className="cosmic-btn-secondary">
                  <RotateCcw className="size-4" /> 다시 분석하기
                </button>
              </div>
            </>
          )}
        </div>
        </section>
      </main>
    )
  }

  return (
    <main className="cosmic-bg">
      <CosmicBackground />
      <section className="cosmic-section mx-auto max-w-2xl scroll-mt-20">
      <div className="cosmic-header cosmic-anim mb-12">
        <Icon className="cosmic-icon text-primary" />
        <span className="cosmic-eyebrow">Theme Report</span>
        <h2 className="cosmic-title">{config.title}</h2>
        <p className="cosmic-subtitle">{config.desc}</p>
      </div>

      <form onSubmit={handleSubmit} className="cosmic-card cosmic-anim cosmic-anim-1 p-6 sm:p-8">
        <div className="mb-6">
          <label className={labelClass}><User2 className="size-4" /> 이름</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="이름"
            className="cosmic-input" />
        </div>

        <div className="mb-6">
          <span className={labelClass}><Calendar className="size-4" /> 생년월일 (양력)</span>
          <div className="grid grid-cols-3 gap-3">
            <select aria-label="연도" value={year} onChange={(e) => setYear(Number(e.target.value))} className={selectClass}>{YEARS.map((y) => <option key={y} value={y}>{y}년</option>)}</select>
            <select aria-label="월" value={month} onChange={(e) => setMonth(Number(e.target.value))} className={selectClass}>{MONTHS.map((m) => <option key={m} value={m}>{m}월</option>)}</select>
            <select aria-label="일" value={day} onChange={(e) => setDay(Number(e.target.value))} className={selectClass}>{DAYS.map((d) => <option key={d} value={d}>{d}일</option>)}</select>
          </div>
        </div>

        <div className="mb-6">
          <label className={labelClass}><Clock className="size-4" /> 출생 시간</label>
          <select value={hour} onChange={(e) => setHour(Number(e.target.value))} className={selectClass}>{HOURS.map((h) => <option key={h.value} value={h.value}>{h.label}</option>)}</select>
        </div>

        <div className="mb-6">
          <span className={labelClass}>성별</span>
          <div className="grid grid-cols-2 gap-3">
            <button type="button" onClick={() => setGender('male')} aria-pressed={gender === 'male'} data-active={gender === 'male'} className="cosmic-toggle"><Mars className="size-4" /> 남성</button>
            <button type="button" onClick={() => setGender('female')} aria-pressed={gender === 'female'} data-active={gender === 'female'} className="cosmic-toggle"><Venus className="size-4" /> 여성</button>
          </div>
        </div>

        <div className="mb-8">
          <label className={labelClass}><MapPin className="size-4" /> 출생 권역</label>
          <select value={regionIndex} onChange={(e) => setRegionIndex(Number(e.target.value))} className={selectClass}>{REGIONS.map((r, i) => <option key={r.name} value={i}>{r.name}</option>)}</select>
        </div>

        {themeKey === 'love' && (
          <div className="mb-8 rounded-xl border p-4" style={{ borderColor: 'oklch(0.65 0.18 25 / 25%)', background: 'oklch(0.65 0.18 25 / 5%)' }}>
            <label className={labelClass}><Brain className="size-4 text-rose-400" /> 내 MBTI <span className="text-xs font-normal text-muted-foreground/60">(사주 x MBTI 결합 분석에 사용)</span></label>
            <select value={mbti} onChange={(e) => setMbti(e.target.value as MBTIType | '')} className={selectClass}>
              <option value="">MBTI 선택 (선택)</option>
              {MBTI_LIST.map((t) => <option key={t} value={t}>{t} — {MBTI_DATA[t].label}</option>)}
            </select>
            {mbti && (
              <p className="mt-2 break-keep text-xs text-muted-foreground">{MBTI_DATA[mbti].nickname} · {MBTI_DATA[mbti].loveStyle.split('.')[0]}</p>
            )}
          </div>
        )}

        <div className="cosmic-result-section mb-8">
          <p className="mb-4 flex items-center gap-2 text-sm font-bold text-foreground">
            <Sparkles className="size-4 text-primary" />
            {THEME_KEY_CARDS[themeKey].title}
          </p>
          <div className="space-y-3">
            {THEME_KEY_CARDS[themeKey].items.map((item, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-border/50 bg-background/30 p-4">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">{i + 1}</span>
                <p className="break-keep text-sm leading-relaxed text-foreground/80">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="cosmic-btn w-full">
          <Sparkles className="size-5 text-primary" /> {config.title} 리포트 보기
        </button>
      </form>
      </section>
    </main>
  )
}
