'use client'

import { useState, useMemo, useRef, useCallback } from 'react'
import { Download, RotateCcw, Sparkles, Compass, Anchor, Save as Waves, BookOpen, Circle as HelpCircle, Heart, Users, Calendar, CircleCheck as CheckCircle2, Bell, PenLine, Link2, Hop as Home, Share2, Printer, ChevronRight, Brain } from 'lucide-react'
import type { SajuFormValues } from '@/components/saju-form'
import type { AdditionalAnswers } from '@/components/additional-questions'
import { ELEMENTS, type ElementKey, type SajuResult } from '@/lib/saju'
import { generateDeepReport, generateQASection, generateIntegratedSolution, type ReportSection, type IntegratedSolution } from '@/lib/report-generator'
import { cleanText } from '@/lib/text-utils'

const ELEMENT_STYLES: Record<ElementKey, { text: string; bg: string; border: string; bar: string; glow: string; hex: string }> = {
  wood: { text: 'text-wood', bg: 'bg-wood/10', border: 'border-wood/40', bar: 'bg-wood', glow: 'shadow-[0_0_20px_-4px_var(--wood)]', hex: '#4ade80' },
  fire: { text: 'text-fire', bg: 'bg-fire/10', border: 'border-fire/40', bar: 'bg-fire', glow: 'shadow-[0_0_20px_-4px_var(--fire)]', hex: '#fb7185' },
  earth: { text: 'text-earth', bg: 'bg-earth/10', border: 'border-earth/40', bar: 'bg-earth', glow: 'shadow-[0_0_20px_-4px_var(--earth)]', hex: '#fbbf24' },
  metal: { text: 'text-metal', bg: 'bg-metal/10', border: 'border-metal/40', bar: 'bg-metal', glow: 'shadow-[0_0_20px_-4px_var(--metal)]', hex: '#e5e7eb' },
  water: { text: 'text-water', bg: 'bg-water/10', border: 'border-water/40', bar: 'bg-water', glow: 'shadow-[0_0_20px_-4px_var(--water)]', hex: '#60a5fa' },
}

const ELEMENT_ICONS: Record<ElementKey, string> = { wood: '木', fire: '火', earth: '土', metal: '金', water: '水' }
const ELEMENT_KR: Record<ElementKey, string> = { wood: '목', fire: '화', earth: '토', metal: '금', water: '수' }

const INTERACTION_TABS = [
  { key: '천간합', label: '천간합' },
  { key: '천간충', label: '천간충' },
  { key: '지지육합', label: '지지육합' },
  { key: '지지삼합', label: '지지삼합' },
  { key: '지지충', label: '지지충' },
  { key: '지지형', label: '지지형' },
  { key: '지지해', label: '지지해' },
  { key: '원진', label: '원진' },
  { key: '귀문관', label: '귀문관' },
] as const

const SHENG_MAP: Record<ElementKey, ElementKey> = { wood: 'fire', fire: 'earth', earth: 'metal', metal: 'water', water: 'wood' }
const KE_MAP: Record<ElementKey, ElementKey> = { wood: 'earth', earth: 'water', water: 'fire', fire: 'metal', metal: 'wood' }

const STRENGTH_LABELS = ['극약', '신약', '중화', '신강', '극왕']

const SCORE_GUIDE = '※ 해당 지수는 타고난 기운의 활성화 정도(100% 기준)를 나타내며 60% 이상일 때 해당 운의 흐름이 강하게 작용함을 의미합니다.'

function DonutChart({ counts }: { counts: Record<ElementKey, number> }) {
  const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1
  const keys = Object.keys(counts) as ElementKey[]
  let cumulative = 0
  const segments = keys.map((key) => {
    const value = counts[key]
    const pct = (value / total) * 100
    const startAngle = (cumulative / total) * 360
    cumulative += value
    const endAngle = (cumulative / total) * 360
    return { key, pct, startAngle, endAngle }
  })

  const radius = 70
  const cx = 90
  const cy = 90

  const arcPath = (startAngle: number, endAngle: number) => {
    const startRad = ((startAngle - 90) * Math.PI) / 180
    const endRad = ((endAngle - 90) * Math.PI) / 180
    const x1 = cx + radius * Math.cos(startRad)
    const y1 = cy + radius * Math.sin(startRad)
    const x2 = cx + radius * Math.cos(endRad)
    const y2 = cy + radius * Math.sin(endRad)
    const largeArc = endAngle - startAngle > 180 ? 1 : 0
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`
  }

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6">
      <svg viewBox="0 0 180 180" className="size-40 shrink-0">
        {segments.map((seg) => {
          if (seg.pct === 0) return null
          const style = ELEMENT_STYLES[seg.key]
          return (
            <path key={seg.key} d={arcPath(seg.startAngle, seg.endAngle)} fill="none" stroke={style.hex} strokeWidth="22" strokeLinecap="round" />
          )
        })}
        <text x={cx} y={cy - 5} textAnchor="middle" className="fill-foreground text-lg font-bold">오행</text>
        <text x={cx} y={cy + 15} textAnchor="middle" className="fill-muted-foreground text-sm">총 {total}개</text>
      </svg>
      <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-1">
        {keys.map((key) => {
          const style = ELEMENT_STYLES[key]
          const pct = ((counts[key] / total) * 100).toFixed(0)
          const status = counts[key] === 0 ? '결여' : counts[key] >= 3 ? '과다' : counts[key] >= 2 ? '발달' : '적정'
          return (
            <div key={key} className="flex items-center gap-2 text-sm">
              <span className="size-3 shrink-0 rounded-full" style={{ backgroundColor: style.hex }} />
              <span className={`font-medium ${style.text}`}>{ELEMENT_KR[key]} {ELEMENTS[key].label}</span>
              <span className="text-muted-foreground">{counts[key]}개 · {pct}%</span>
              <span className={`ml-auto rounded-full px-2 py-0.5 text-[0.6rem] font-semibold ${counts[key] === 0 ? 'bg-red-500/20 text-red-400' : counts[key] >= 3 ? 'bg-orange-500/20 text-orange-400' : counts[key] >= 2 ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>{status}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function PentagonDiagram({ dayMaster }: { dayMaster: ElementKey }) {
  const keys: ElementKey[] = ['wood', 'fire', 'earth', 'metal', 'water']
  const cx = 100
  const cy = 100
  const r = 75
  const positions = keys.map((key, i) => {
    const angle = (i * 72 - 90) * (Math.PI / 180)
    return { key, x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
  })
  const posMap = Object.fromEntries(positions.map((p) => [p.key, p])) as Record<ElementKey, { x: number; y: number }>

  return (
    <svg viewBox="0 0 200 200" className="mx-auto size-48">
      {keys.map((key) => {
        const from = posMap[key]
        const to = posMap[SHENG_MAP[key]]
        return <line key={`sheng-${key}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />
      })}
      {keys.map((key) => {
        const from = posMap[key]
        const to = posMap[KE_MAP[key]]
        return <line key={`ke-${key}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="#ef4444" strokeWidth="1.5" opacity="0.4" />
      })}
      {positions.map((p) => {
        const style = ELEMENT_STYLES[p.key]
        const isDM = p.key === dayMaster
        return (
          <g key={p.key}>
            <circle cx={p.x} cy={p.y} r={isDM ? 18 : 14} fill={style.hex} fillOpacity={isDM ? 0.3 : 0.15} stroke={style.hex} strokeWidth={isDM ? 2.5 : 1.5} />
            <text x={p.x} y={p.y + 5} textAnchor="middle" className="fill-foreground text-sm font-bold">{ELEMENT_KR[p.key]}</text>
            {isDM && <text x={p.x} y={p.y - 22} textAnchor="middle" className="fill-primary text-[0.6rem] font-bold">나의 일간</text>}
          </g>
        )
      })}
      <line x1="10" y1="190" x2="25" y2="190" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="30" y="193" className="fill-muted-foreground text-[0.5rem]">상생(생성)</text>
      <line x1="100" y1="190" x2="115" y2="190" stroke="#ef4444" strokeWidth="1.5" />
      <text x="120" y="193" className="fill-muted-foreground text-[0.5rem]">상극(극제)</text>
    </svg>
  )
}

function StrengthIndex({ index }: { index: number }) {
  return (
    <div className="space-y-2">
      <div className="relative h-8 rounded-full bg-secondary/40">
        <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-500 via-yellow-500 to-red-500 transition-all" style={{ width: `${(index / 4) * 100}%` }} />
        <div className="absolute top-1/2 -translate-y-1/2 transition-all" style={{ left: `calc(${(index / 4) * 100}% - 8px)` }}>
          <div className="size-4 rounded-full border-2 border-background bg-foreground shadow-lg" />
        </div>
      </div>
      <div className="flex justify-between text-[0.6rem] text-muted-foreground">
        {STRENGTH_LABELS.map((label, i) => (
          <span key={label} className={i === index ? 'font-bold text-foreground' : ''}>{label}</span>
        ))}
      </div>
    </div>
  )
}

function ScoreBar({ score, label }: { score: number; label?: string }) {
  const scoreColors = score >= 80 ? 'text-emerald-400' : score >= 65 ? 'text-amber-400' : 'text-rose-400'
  const scoreBg = score >= 80 ? 'from-emerald-500 to-green-500' : score >= 65 ? 'from-amber-500 to-yellow-500' : 'from-rose-500 to-red-500'
  return (
    <div className="mb-3">
      <div className="mb-1.5 flex items-center gap-3">
        {label && <span className="text-sm font-semibold text-muted-foreground/70">{label}</span>}
        <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-secondary/40">
          <div className={`h-full rounded-full bg-gradient-to-r ${scoreBg} transition-all duration-700`} style={{ width: `${score}%` }} />
        </div>
        <span className={`text-base font-bold ${scoreColors}`}>{score}%</span>
      </div>
      <p className="text-[0.65rem] leading-relaxed text-muted-foreground/60">{SCORE_GUIDE}</p>
    </div>
  )
}

function DeepReportSection({ section }: { section: ReportSection }) {
  const keywordColors = ['bg-amber-500/15 text-amber-400 border-amber-500/30', 'bg-sky-500/15 text-sky-400 border-sky-500/30', 'bg-rose-500/15 text-rose-400 border-rose-500/30']

  return (
    <div className="mt-10 rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent p-6 sm:p-8">
      <div className="mb-4 flex items-center gap-3 border-b border-border pb-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 font-serif text-lg font-bold text-primary">
          {section.step}
        </div>
        <div className="flex-1">
          <h4 className="break-keep font-serif text-lg font-bold">{section.title}</h4>
          <p className="break-keep text-base text-muted-foreground">{section.subtitle}</p>
        </div>
        <BookOpen className="size-5 shrink-0 text-primary/60" />
      </div>

      {section.keywords && section.keywords.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {section.keywords.map((kw, i) => (
            <span key={i} className={`break-keep rounded-full border px-3 py-1 text-sm font-bold ${keywordColors[i % keywordColors.length]}`}>{kw}</span>
          ))}
        </div>
      )}

      {section.score !== undefined && <ScoreBar score={section.score} label="지수" />}

      <div className="mb-5">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground/70">주요 목차</p>
        <div className="flex flex-wrap gap-2">
          {section.toc.map((item, i) => (
            <span key={i} className="break-keep rounded-full border border-border bg-secondary/40 px-3 py-1 text-sm font-medium text-muted-foreground">{item}</span>
          ))}
        </div>
      </div>

      <p className="break-keep mb-5 text-base leading-relaxed text-foreground/90 whitespace-pre-line">{cleanText(section.intro)}</p>

      <div className="mb-6 rounded-xl border-l-4 border-primary bg-primary/8 p-4">
        <p className="break-keep text-base font-semibold leading-relaxed text-primary whitespace-pre-line">{cleanText(section.highlight)}</p>
      </div>

      <div className="mb-5">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground/70">구체적 발현 형태</p>
        <div className="space-y-3">
          {section.episodes.map((ep, i) => (
            <div key={i} className="rounded-xl border border-border/60 bg-background/40 p-4">
              <p className="break-keep mb-1.5 text-base font-semibold text-foreground">{ep.label}</p>
              <p className="break-keep text-base leading-relaxed text-muted-foreground whitespace-pre-line">{cleanText(ep.text)}</p>
            </div>
          ))}
        </div>
      </div>

      {section.insights && section.insights.length > 0 && (
        <div className="mb-5 rounded-xl border border-accent/30 bg-accent/5 p-4">
          <p className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-accent">
            <Sparkles className="size-3.5" /> 핵심 통찰
          </p>
          <ul className="space-y-2.5">
            {section.insights.map((insight, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                <p className="break-keep text-base leading-relaxed text-foreground/80">{cleanText(insight)}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-secondary/20 p-4">
          <p className="mb-1 flex items-center gap-1.5 text-sm font-semibold text-muted-foreground/70">👁️ 내면의 시선 (내가 바라보는 나)</p>
          <p className="break-keep text-base leading-relaxed text-foreground/80">{cleanText(section.innerVsOuter.inner)}</p>
        </div>
        <div className="rounded-xl border border-border bg-secondary/20 p-4">
          <p className="mb-1 flex items-center gap-1.5 text-sm font-semibold text-muted-foreground/70">👥 타인의 시선 (사회적 페르소나)</p>
          <p className="break-keep text-base leading-relaxed text-foreground/80">{cleanText(section.innerVsOuter.outer)}</p>
        </div>
      </div>

      {section.innerVsOuter.gap && (
        <div className="mb-5 rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/8 to-accent/5 p-4">
          <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-primary">⚖️ 자아 갭(Gap) 해법 — 내면과 외면의 온도 차 완화</p>
          <p className="break-keep text-base leading-relaxed text-foreground/80">{cleanText(section.innerVsOuter.gap)}</p>
        </div>
      )}

      <div className="mb-5 rounded-xl border border-primary/20 bg-primary/5 p-4">
        <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-primary">
          <Sparkles className="size-3.5" /> 일상 에피소드
        </p>
        <p className="break-keep text-base leading-relaxed text-foreground/80 whitespace-pre-line">{cleanText(section.microScenario)}</p>
      </div>

      <p className="break-keep border-t border-border pt-4 text-base italic leading-relaxed text-muted-foreground/80 whitespace-pre-line">{cleanText(section.closing)}</p>
    </div>
  )
}

function GuideBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-secondary/20 p-4 text-center">
      <p className="mb-1 text-base font-semibold text-primary">{title}</p>
      <p className="break-keep text-sm leading-relaxed text-muted-foreground">{children}</p>
    </div>
  )
}

function NextStepButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      className="group mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-primary bg-primary/10 px-6 py-4 text-base font-bold text-primary transition-all hover:bg-primary/20 hover:shadow-lg">
      {label}
      <ChevronRight className="size-5 transition-transform group-hover:translate-x-1" />
    </button>
  )
}

function FinalCTAButtons({ onDownload, onShare, onReset }: { onDownload: () => void; onShare: () => void; onReset: () => void }) {
  return (
    <div className="no-print mt-8 space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <button type="button" onClick={onDownload}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-foreground bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-[6px_6px_0_0_var(--accent)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[9px_9px_0_0_var(--accent)] active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0_0_var(--accent)]">
          <Download className="size-5" /> PDF 다운로드
        </button>
        <button type="button" onClick={onShare}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-green-500 bg-green-500/10 px-6 py-4 text-base font-bold text-green-500 transition-all hover:bg-green-500/20">
          <Share2 className="size-5" /> 카카오톡 결과 공유하기
        </button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <button type="button" onClick={() => window.print()}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/50 bg-primary/10 px-6 py-3 text-base font-semibold text-foreground transition-all hover:border-primary hover:bg-primary/20">
          <Printer className="size-4" /> 리포트 저장 / 인쇄
        </button>
        <button type="button" onClick={onReset}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-secondary/30 px-6 py-3 text-base font-semibold text-foreground transition-all hover:border-primary hover:text-primary">
          <RotateCcw className="size-4" /> 새로운 분석 시작
        </button>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <a href="/theme/wealth" className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-background/40 px-4 py-2.5 text-sm font-semibold transition-all hover:border-primary hover:text-primary break-keep">
          <Sparkles className="size-4" /> 재물운 리포트
        </a>
        <a href="/theme/love" className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-background/40 px-4 py-2.5 text-sm font-semibold transition-all hover:border-primary hover:text-primary break-keep">
          <Heart className="size-4" /> 연애운 리포트
        </a>
        <a href="/compatibility" className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-background/40 px-4 py-2.5 text-sm font-semibold transition-all hover:border-primary hover:text-primary break-keep">
          <Users className="size-4" /> 궁합 분석하기
        </a>
      </div>
    </div>
  )
}

type TabKey = 'saju' | 'un' | 'interactions'

export function SajuResultView({
  values,
  result,
  additional,
  onReset,
}: {
  values: SajuFormValues
  result: SajuResult
  additional: AdditionalAnswers
  onReset: () => void
}) {
  const [activeTab, setActiveTab] = useState<TabKey>('saju')
  const [visitedTabs, setVisitedTabs] = useState<Set<TabKey>>(new Set(['saju']))
  const [activeInteraction, setActiveInteraction] = useState<string>('천간합')
  const maxCount = Math.max(...Object.values(result.elementCounts))
  const sajuTabRef = useRef<HTMLDivElement>(null)
  const unTabRef = useRef<HTMLDivElement>(null)
  const interactionsTabRef = useRef<HTMLDivElement>(null)

  const { emotionalHook: hook, sections: report } = useMemo(() => generateDeepReport(values, result, additional), [values, result, additional])
  const qaSection = useMemo(() => generateQASection(values, result, additional), [values, result, additional])

  const handleDownload = () => { window.print() }
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: `${values.name}님의 명리 운명 리포트`, text: hook, url: window.location.href }).catch(() => {})
    } else {
      navigator.clipboard?.writeText(window.location.href).catch(() => {})
    }
  }

  const currentDaYun = result.daYun[result.currentDaYunIndex]
  const currentLiuNian = currentDaYun?.liuNian[result.currentLiuNianIndex]

  const interactionsByType = result.interactions.reduce<Record<string, typeof result.interactions>>((acc, item) => {
    if (!acc[item.type]) acc[item.type] = []
    acc[item.type].push(item)
    return acc
  }, {})

  const dmCount = result.elementCounts[result.dayMaster.key]
  const totalCount = Object.values(result.elementCounts).reduce((a, b) => a + b, 0)
  const dmRatio = totalCount > 0 ? dmCount / totalCount : 0.25
  const strengthIndex = dmRatio >= 0.35 ? 4 : dmRatio >= 0.28 ? 3 : dmRatio >= 0.20 ? 2 : dmRatio >= 0.14 ? 1 : 0

  const integratedSolution = useMemo(() => generateIntegratedSolution(values, result), [values, result])

  const tabSections: Record<TabKey, number[]> = {
    saju: [1, 2, 3, 4, 5, 6, 7],
    un: [8],
    interactions: [9],
  }

  const scrollToTab = useCallback((tab: TabKey) => {
    setActiveTab(tab)
    setVisitedTabs(prev => new Set(prev).add(tab))
    const ref = tab === 'saju' ? sajuTabRef : tab === 'un' ? unTabRef : interactionsTabRef
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }, [])

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'saju', label: '사주팔자 심층' },
    { key: 'un', label: '대운 · 연운 · 월운' },
    { key: 'interactions', label: '합 · 충 (신살) 풀이' },
  ]

  const allTabsVisited = visitedTabs.has('saju') && visitedTabs.has('un') && visitedTabs.has('interactions')

  // 핵심 키워드 3가지 추출
  const coreKeywords = useMemo(() => {
    const step1 = report.find(s => s.step === 1)
    return step1?.keywords?.slice(0, 3) ?? []
  }, [report])

  // 1:1 맞춤 판독 (표준시 vs 지방시)
  const personalizedReading = useMemo(() => {
    const usedLocal = values.cityOffsetMin !== 0 && values.hour >= 0
    const timeStandard = usedLocal ? '지방시(태양시)' : '표준시'
    return {
      timeStandard,
      text: `${values.name}님의 성향 및 응답 데이터를 미루어보아, ${timeStandard} 기준의 사주 기운이 실제 내면 및 삶의 패턴과 가장 강력하게 일치합니다. 이에 따라 ${values.name}님에게 가장 부합하는 정밀 궤도로 리포트를 해석합니다.`,
    }
  }, [values])

  return (
    <section id="saju-result" className="mx-auto max-w-5xl scroll-mt-8 px-4 pb-28 sm:px-6">
      <div className="mb-6 flex items-center justify-center gap-2 rounded-full border border-green-500/40 bg-green-500/10 px-4 py-2 text-center text-sm font-medium text-green-400">
        <CheckCircle2 className="size-4 shrink-0" /> 전체 리포트가 열렸습니다.
      </div>

      <div className="glass rounded-[2rem] p-4 sm:p-6 md:p-10">
        {/* 1:1 맞춤 판독 카드 */}
        <div className="mb-6 rounded-2xl border-2 border-primary/40 bg-gradient-to-br from-primary/10 to-accent/5 p-5">
          <div className="mb-2 flex items-center gap-2">
            <Compass className="size-5 text-primary" />
            <p className="text-base font-bold text-primary">1:1 맞춤 판독 — 시주(時柱) 정밀 교차 판독</p>
          </div>
          <p className="break-keep text-base leading-relaxed text-foreground/90">{personalizedReading.text}</p>
        </div>

        {/* header */}
        <header className="mb-8 border-b border-border pb-6 text-center">
          <p className="font-display text-base font-semibold tracking-[0.35em] text-gradient uppercase">
            Myeongri Destiny Report
          </p>
          <h2 className="break-keep mt-2 text-2xl font-bold sm:text-3xl">
            {values.name}님의 명리 운명 리포트
          </h2>
          <p className="break-keep mt-2 text-base text-muted-foreground">
            {values.calendar === 'solar' ? '양력' : '음력'} {values.year}년 {values.month}월 {values.day}일{values.hour >= 0 ? ` ${values.hour}:00` : ''} · {values.gender === 'male' ? '남성' : '여성'} · {values.region}
          </p>
          <p className="mt-1 text-sm text-muted-foreground/70">
            양력 {result.solarDisplay} · 음력 {result.lunarDisplay}
          </p>
          {values.cityOffsetMin !== 0 && values.hour >= 0 && (
            <div className="mx-auto mt-3 max-w-md break-keep rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-primary/90">
              <p className="flex items-center justify-center gap-1.5 font-semibold">
                <Compass className="size-3.5" /> 지방시(LMT) 보정 적용
              </p>
              <p className="mt-1 text-muted-foreground">
                입력 시간: {String(values.hour).padStart(2, '0')}:00 → {values.region} 경도 보정 후{' '}
                <span className="font-bold text-primary">
                  {String(Math.floor(((values.hour * 60 + values.cityOffsetMin) % 1440 + 1440) % 1440 / 60)).padStart(2, '0')}:{String(Math.floor(((values.hour * 60 + values.cityOffsetMin) % 1440 + 1440) % 1440 % 60)).padStart(2, '0')}
                </span>{' '}
                ({values.cityOffsetMin > 0 ? '+' : ''}{values.cityOffsetMin}분)
              </p>
            </div>
          )}
          {additional.concernAreas?.length ? (
            <p className="break-keep mt-2 text-sm text-primary">
              관심 영역: {additional.concernAreas.join(', ')} · 관계 상태: {additional.loveStatus}
            </p>
          ) : null}
        </header>

        {/* 사주 맹신 방지 안내 */}
        <div className="mb-6 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/8 to-accent/5 p-5 text-center">
          <p className="break-keep text-sm leading-relaxed text-muted-foreground">
            <span className="font-semibold text-primary">사주는 정해진 운명이 아니라 나만의 궤도를 이해하고 더 나은 방향을 선택하기 위한 지도입니다.</span>
            {' '}운세에 삶을 맹신하기보다 삶의 주도권을 쥐고 지혜롭게 활용하세요.
          </p>
          <p className="break-keep mt-3 text-base leading-relaxed text-muted-foreground/80">
            본 사주 리포트는 자연의 시간(지방시 시차 보정)과 사회적 시간(표준시) 그리고 입력하신 내면/타인/일상의 답변을 종합적으로 계산하여 도출된 맞춤 궤도입니다.
          </p>
          <p className="break-keep mt-2 text-sm leading-relaxed text-muted-foreground/70">
            만약 풀이가 본인과 다소 다르게 느껴지신다면 출생시가 경계선에 있어 표준시의 기운을 더 강하게 받으셨거나 성장 환경과 타인의 시선에 따라 잠재된 기운이 다른 방식으로 발현된 것일 수 있습니다. 본 리포트를 통해 평소 나의 주변 환경과 내면의 소리에 다시 한번 귀 기울여보세요.
          </p>
        </div>

        {/* 감성 헌사 */}
        <div className="mb-8 rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 to-primary/5 p-5 text-center">
          <p className="break-keep text-base font-medium leading-relaxed text-foreground/90 italic">
            &ldquo;{hook}&rdquo;
          </p>
        </div>

        {/* guide boxes */}
        <div className="mb-8 grid gap-3 sm:grid-cols-2">
          <GuideBox title="사주팔자란?">
            태어난 연·월·일·시를 다섯 가지 자연의 기운으로 풀어 내 성향과 삶의 흐름을 읽는 동양의 지혜입니다.
          </GuideBox>
          <GuideBox title="오행이란?">
            목·화·토·금·수 다섯 기운의 조화로 모든 것을 설명합니다. 내 사주의 오행 분포가 나의 타고난 기질과 운의 경사를 정합니다.
          </GuideBox>
        </div>

        {/* 1:1 Q&A */}
        {qaSection && (
          <div className="mb-8 rounded-2xl border-2 border-primary/40 bg-primary/5 p-5">
            <div className="mb-3 flex items-center gap-2">
              <HelpCircle className="size-5 text-primary" />
              <h3 className="break-keep font-serif text-lg font-bold">1:1 맞춤 풀이</h3>
            </div>
            <p className="break-keep mb-3 text-base leading-relaxed text-foreground/90 whitespace-pre-line">{cleanText(qaSection.answer)}</p>
            <p className="text-sm text-muted-foreground/70">※ 이 풀이는 입력하신 관심 영역과 질문 관계 상태를 반영한 1:1 분석입니다.</p>
          </div>
        )}

        {/* segment control tabs */}
        <div className="no-print mb-8 sticky top-2 z-10">
          <div className="flex gap-1.5 rounded-2xl border border-border bg-secondary/40 p-1.5 backdrop-blur-sm">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key
              return (
                <button key={tab.key} type="button" onClick={() => scrollToTab(tab.key)} aria-pressed={isActive}
                  className={`flex-1 whitespace-nowrap rounded-xl px-3 py-3 text-base font-bold transition-all break-keep ${
                    isActive
                      ? 'border-2 border-primary bg-primary text-primary-foreground shadow-[0_0_15px_-2px_var(--primary)]'
                      : 'border border-transparent bg-secondary/30 text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                  }`}>
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* TAB 1: 사주팔자 심층 */}
        <div ref={sajuTabRef} className="scroll-mt-20">
          {activeTab === 'saju' && (
            <div className="space-y-8">
              <div>
                <h3 className="break-keep mb-4 flex items-center gap-2 font-serif text-lg font-semibold">
                  <Compass className="size-5 text-primary" /> 사주 팔자
                </h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {result.pillars.map((p) => {
                    const stemStyle = ELEMENT_STYLES[p.stemElement.key]
                    const branchStyle = ELEMENT_STYLES[p.branchElement.key]
                    return (
                      <div key={p.key} className={`relative overflow-hidden rounded-2xl border ${stemStyle.border} bg-gradient-to-br from-background/60 via-secondary/40 to-background/30`}>
                        <div aria-hidden="true" className={`pointer-events-none absolute -top-8 -right-8 size-24 rounded-full ${stemStyle.bg} blur-2xl`} />
                        <div className="relative border-b border-border/60 py-2 text-center text-base font-medium text-muted-foreground">{p.name}</div>
                        <div className={`relative flex flex-col items-center gap-1 border-b border-border/60 py-4 ${stemStyle.bg}`}>
                          <span className={`font-hanja text-4xl font-bold ${stemStyle.text} glow-${p.stemElement.key}`}>{p.stemHanja}</span>
                          <span className="text-base text-muted-foreground">{p.stemKr} · {p.stemElement.label}</span>
                          <span className="mt-1 rounded-full border border-border/60 bg-background/60 px-2 py-0.5 text-sm font-medium">{p.shiShenGan}</span>
                        </div>
                        <div className={`relative flex flex-col items-center gap-1 border-b border-border/60 py-4 ${branchStyle.bg}`}>
                          <span className={`font-hanja text-4xl font-bold ${branchStyle.text} glow-${p.branchElement.key}`}>{p.branchHanja}</span>
                          <span className="text-base text-muted-foreground">{p.branchKr} · {p.animal}띠</span>
                          <span className="mt-1 flex flex-wrap justify-center gap-1">
                            {p.shiShenZhi.map((s, i) => (<span key={i} className="rounded-full bg-background/60 px-2 py-0.5 text-sm font-medium">{s}</span>))}
                          </span>
                        </div>
                        <div className="relative space-y-1.5 px-3 py-3 text-sm">
                          <div className="flex justify-between"><span className="text-muted-foreground">지장간</span><span className="font-medium">{p.hideGan.join(' ') || '—'}</span></div>
                          <div className="flex justify-between"><span className="text-muted-foreground">12운성</span><span className="font-medium">{p.diShi}</span></div>
                          <div className="flex justify-between"><span className="text-muted-foreground">납음</span><span className="font-medium">{p.naYin}</span></div>
                          <div className="flex justify-between"><span className="text-muted-foreground">공망</span><span className="font-medium">{p.xunKong}</span></div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: '태원', value: result.taiYuan },
                  { label: '태식', value: result.taiXi },
                  { label: '명궁', value: result.mingGong },
                  { label: '신궁', value: result.shenGong },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-border bg-secondary/30 p-3 text-center">
                    <p className="text-base text-muted-foreground">{item.label}</p>
                    <p className="mt-1 font-serif text-lg font-semibold">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-primary/25 bg-primary/5 p-5 text-center">
                <p className="break-keep text-base text-muted-foreground">
                  당신의 일간 — &ldquo;나 자신&rdquo;을 상징하는 기운 — 은{' '}
                  <span className={`font-semibold ${ELEMENT_STYLES[result.dayMaster.key].text}`}>
                    {result.dayMasterStemKr}({result.dayMaster.label})
                  </span>{' '}
                  입니다.
                </p>
              </div>

              {/* 한눈에 보는 핵심 키워드 & 총평 */}
              <div className="rounded-2xl border-2 border-accent/40 bg-gradient-to-br from-accent/10 to-primary/5 p-5">
                <p className="mb-3 flex items-center gap-2 text-base font-bold text-accent">
                  <Sparkles className="size-4" /> 한눈에 보는 내 사주 핵심 키워드 3가지 &amp; 총평
                </p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {coreKeywords.map((kw, i) => (
                    <span key={i} className="break-keep rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-base font-bold text-accent">{kw}</span>
                  ))}
                </div>
                <p className="break-keep text-base leading-relaxed text-foreground/90">
                  {values.name}님의 사주는 {result.dominant.label} 기운이 주축이며 {result.weakest.label} 기운이 부족한 형태입니다. 일간 {result.dayMasterStemKr}의 본질인 &ldquo;{report.find(s => s.step === 1)?.episodes[3]?.text.split('"')[1] ?? ''}&rdquo;이 핵심 엔진이고 부족한 {result.weakest.label} 기운을 채우는 것이 개운의 방향입니다. 8개 챕터에 걸쳐 이 궤도를 단계별로 풀어드립니다.
                </p>
              </div>

              {/* 오행 분석 */}
              <div>
                <h3 className="break-keep mb-4 flex items-center gap-2 font-serif text-lg font-semibold">
                  <Waves className="size-5 text-primary" /> 오행 분석
                </h3>
                <div className="mb-6 rounded-2xl border border-border bg-secondary/20 p-5">
                  <p className="mb-4 text-center text-xs font-semibold text-muted-foreground/70">오행 분포 (도넛 차트)</p>
                  <DonutChart counts={result.elementCounts} />
                </div>
                <div className="mb-6 space-y-2">
                  <p className="mb-2 text-center text-xs font-semibold text-muted-foreground/70">오행 강약 (바 그래프)</p>
                  {(Object.keys(result.elementCounts) as ElementKey[]).map((key) => {
                    const count = result.elementCounts[key]
                    const style = ELEMENT_STYLES[key]
                    const info = ELEMENTS[key]
                    const pct = maxCount > 0 ? (count / maxCount) * 100 : 0
                    return (
                      <div key={key} className="flex items-center gap-2 sm:gap-3">
                        <span className={`flex size-8 shrink-0 items-center justify-center rounded-lg border ${style.border} ${style.bg} font-serif text-sm font-bold ${style.text}`}>{ELEMENT_ICONS[key]}</span>
                        <span className={`w-10 text-xs font-medium sm:w-12 sm:text-sm ${style.text}`}>{info.kr} {info.label}</span>
                        <div className="h-6 flex-1 overflow-hidden rounded-full bg-secondary/40">
                          <div className={`h-full rounded-full ${style.bar} transition-all`} style={{ width: `${pct}%` }} />
                        </div>
                        <span className="w-6 text-right text-sm font-semibold">{count}</span>
                      </div>
                    )
                  })}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border bg-secondary/20 p-5">
                    <p className="mb-3 text-center text-xs font-semibold text-muted-foreground/70">오행 상생상극 (나의 일간 중심)</p>
                    <PentagonDiagram dayMaster={result.dayMaster.key} />
                  </div>
                  <div className="rounded-2xl border border-border bg-secondary/20 p-5">
                    <p className="mb-3 text-center text-xs font-semibold text-muted-foreground/70">신강/신약 지수</p>
                    <StrengthIndex index={strengthIndex} />
                    <p className="break-keep mt-4 text-center text-sm leading-relaxed text-muted-foreground">
                      일간 {result.dayMasterStemKr}의 기운 비율이 {(dmRatio * 100).toFixed(0)}%로 {STRENGTH_LABELS[strengthIndex]} 구간에 해당합니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* 심층 리포트 섹션들 */}
              {tabSections.saju.map((step) => (
                <DeepReportSection key={step} section={report.find(s => s.step === step)!} />
              ))}

              <NextStepButton label="다음: 대운 · 연운 · 월운 보러 가기" onClick={() => scrollToTab('un')} />
            </div>
          )}
        </div>

        {/* TAB 2: 대운 / 연운 / 월운 */}
        <div ref={unTabRef} className="scroll-mt-20">
          {activeTab === 'un' && (
            <div className="space-y-8">
              <div>
                <h3 className="break-keep mb-4 flex items-center gap-2 font-serif text-lg font-semibold">
                  <Anchor className="size-5 text-primary" /> 대운 — 10년 주기 운의 흐름
                </h3>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                  {result.daYun.slice(result.currentDaYunIndex).map((dy) => {
                    const isCurrent = dy.index === result.currentDaYunIndex
                    return (
                      <div key={dy.index} className={`relative rounded-xl border-2 p-3 text-center transition-all ${isCurrent ? 'border-blue-400 bg-blue-500/15 shadow-[0_0_15px_-2px_var(--primary)]' : 'border-blue-400/30 bg-blue-500/5'}`}>
                        {isCurrent && (
                          <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-blue-500 px-2 py-0.5 text-[0.6rem] font-bold text-white whitespace-nowrap">현재 대운</span>
                        )}
                        <p className="text-sm font-bold text-blue-400">대운</p>
                        <p className={`text-sm font-medium ${isCurrent ? 'text-blue-400' : 'text-muted-foreground'}`}>{dy.startAge}~{dy.endAge}세</p>
                        <p className="text-sm text-muted-foreground/70">{dy.startYear}~{dy.endYear}</p>
                        <p className="mt-2 font-serif text-2xl font-bold">
                          <span className={ELEMENT_STYLES[dy.ganElement.key].text}>{dy.gan}</span>
                          <span className={ELEMENT_STYLES[dy.zhiElement.key].text}>{dy.zhi}</span>
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>

              {currentDaYun && (
                <div>
                  <h3 className="break-keep mb-4 font-serif text-lg font-semibold">
                    현재 대운의 연운 — {currentDaYun.startYear}~{currentDaYun.endYear}년
                  </h3>
                  <p className="break-keep mb-3 text-sm text-amber-400/80">연운은 1년 단위의 기운 흐름으로, 대운의 큰 방향 안에서 해마다 바뀌는 세부 기운을 보여줍니다.</p>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-10">
                    {currentDaYun.liuNian.map((ln, i) => {
                      const isCurrent = i === result.currentLiuNianIndex
                      return (
                        <div key={ln.year} className={`rounded-lg border-2 p-2 text-center ${isCurrent ? 'border-amber-400 bg-amber-500/15' : 'border-amber-400/20 bg-amber-500/5'}`}>
                          <p className="text-sm font-semibold text-amber-400">{ln.year}</p>
                          <p className={`font-serif text-lg font-bold ${isCurrent ? 'text-amber-400' : ''}`}>{ln.ganZhi}</p>
                          <p className="text-[0.6rem] text-muted-foreground/70">{ln.age}세</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {currentLiuNian && result.currentLiuYue.length > 0 && (
                <div>
                  <h3 className="break-keep mb-4 font-serif text-lg font-semibold">
                    금년 월운 — {currentLiuNian.year}년 월별 운세
                  </h3>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
                    {result.currentLiuYue.map((lm, i) => {
                      const gan = lm.ganZhi[0]
                      const zhi = lm.ganZhi[1]
                      return (
                        <div key={i} className="rounded-lg border border-border bg-secondary/30 p-2 text-center">
                          <p className="text-xs text-muted-foreground">{lm.month}</p>
                          <p className="font-serif text-lg font-bold">{gan}{zhi}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {tabSections.un.map((step) => (
                <DeepReportSection key={step} section={report.find(s => s.step === step)!} />
              ))}

              <p className="break-keep text-sm text-muted-foreground/70">※ 대운수는 생년월시와 성별에 따라 계산된 운의 시작 시점을 기준으로 합니다.</p>

              <NextStepButton label="다음: 합 · 충 (신살) 풀이 보러 가기" onClick={() => scrollToTab('interactions')} />
            </div>
          )}
        </div>

        {/* TAB 3: 합 · 충 (신살) 풀이 */}
        <div ref={interactionsTabRef} className="scroll-mt-20">
          {activeTab === 'interactions' && (
            <div className="space-y-6">
              <div>
                <h3 className="break-keep mb-2 flex items-center gap-2 font-serif text-lg font-semibold">
                  <Sparkles className="size-5 text-primary" /> 합과 충 상세 풀이
                </h3>
                <p className="break-keep mb-4 text-base text-muted-foreground">
                  사주 내에 존재하는 천간합 지지합 충 형 해 원진 귀문관 등의 관계와 그 영향을 확인합니다.
                </p>

                <div className="mb-6 flex flex-wrap gap-2">
                  {INTERACTION_TABS.map((tab) => {
                    const count = interactionsByType[tab.key]?.length ?? 0
                    return (
                      <button key={tab.key} type="button" onClick={() => setActiveInteraction(tab.key)} aria-pressed={activeInteraction === tab.key}
                        className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-all ${activeInteraction === tab.key ? 'border-primary bg-primary/15 text-primary' : 'border-border bg-secondary/30 text-muted-foreground hover:text-foreground'}`}>
                        {tab.label}{count > 0 && <span className="ml-1.5 rounded-full bg-primary/20 px-1.5 text-[0.6rem]">{count}</span>}
                      </button>
                    )
                  })}
                </div>

                <div className="rounded-2xl border border-border bg-secondary/30 p-5">
                  {interactionsByType[activeInteraction] && interactionsByType[activeInteraction].length > 0 ? (
                    <ul className="space-y-3">
                      {interactionsByType[activeInteraction].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 rounded-xl border border-border/50 bg-background/40 p-3">
                          <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">{i + 1}</span>
                          <div>
                            <p className="break-keep text-base font-medium text-foreground">{item.desc}</p>
                            <p className="break-keep mt-1 text-sm text-muted-foreground">관련 주: {item.pillars.join(', ')}</p>
                            <p className="break-keep mt-2 text-base leading-relaxed text-muted-foreground/80">
                              {getInteractionInterpretation(item.type)}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="break-keep py-6 text-center text-base text-muted-foreground">해당하는 {activeInteraction} 관계가 사주 내에 존재하지 않습니다.</p>
                  )}
                </div>
              </div>

              <div>
                <h4 className="break-keep mb-3 font-serif text-base font-semibold">전체 신살 요약</h4>
                <div className="flex flex-wrap gap-2">
                  {result.interactions.length > 0 ? (
                    result.interactions.map((item, i) => (
                      <span key={i} className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary/30 px-3 py-1 text-sm">
                        <span className="font-medium text-primary">{item.type}</span>
                        <span className="text-muted-foreground">{item.pillars.join('-')}</span>
                      </span>
                    ))
                  ) : (
                    <span className="break-keep text-base text-muted-foreground">특이한 신살 관계가 감지되지 않았습니다.</span>
                  )}
                </div>
              </div>

              {tabSections.interactions.map((step) => (
                <DeepReportSection key={step} section={report.find(s => s.step === step)!} />
              ))}

              {/* 최종 CTA — only when all tabs visited */}
              {allTabsVisited ? (
                <>
                  <div className="mt-8 rounded-2xl border-2 border-green-500/40 bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-transparent p-5 text-center">
                    <CheckCircle2 className="mx-auto mb-2 size-8 text-green-500" />
                    <p className="mb-1 text-base font-bold text-green-500">모든 풀이를 완료하셨습니다</p>
                    <p className="break-keep mb-4 text-sm text-muted-foreground">이제 리포트를 저장하거나 공유할 수 있습니다.</p>
                  </div>

              {/* 삭제: 최하단 중복 대운 섹션 제거됨 */}

                  {integratedSolution && (
                    <div className="mt-10 rounded-3xl border-2 border-green-500/40 bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-transparent p-6 sm:p-8">
                      <div className="mb-4 flex items-center gap-3 border-b border-green-500/20 pb-4">
                        <CheckCircle2 className="size-6 shrink-0 text-green-500" />
                        <div className="flex-1">
                          <h4 className="break-keep font-serif text-lg font-bold text-green-500">{integratedSolution.title}</h4>
                          <p className="break-keep text-sm text-muted-foreground">명리적 근거가 명시된 생활밀착형 처방</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {integratedSolution.items.map((item, i) => (
                          <div key={i} className="rounded-xl border border-green-500/20 bg-background/40 p-4">
                            <p className="mb-1 text-base font-semibold text-foreground">{item.category} — {item.action}</p>
                            <p className="break-keep text-base leading-relaxed text-muted-foreground">{cleanText(item.reason)}</p>
                          </div>
                        ))}
                      </div>
                      <p className="break-keep mt-4 border-t border-green-500/20 pt-4 text-base italic leading-relaxed text-muted-foreground/80">{cleanText(integratedSolution.closing)}</p>
                    </div>
                  )}

                  <FinalCTAButtons onDownload={handleDownload} onShare={handleShare} onReset={onReset} />
                </>
              ) : (
                <div className="mt-8 rounded-2xl border border-primary/30 bg-primary/5 p-5 text-center">
                  <p className="break-keep text-base text-muted-foreground">모든 탭의 풀이를 순서대로 열람하시면 최종 종합 솔루션과 다운로드가 활성화됩니다.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* PDF 인쇄 전용 전체 보고서 */}
      <div className="hidden print:block">
        <PrintReport values={values} result={result} additional={additional} report={report} qaSection={qaSection} integratedSolution={integratedSolution} hook={hook} />
      </div>
    </section>
  )
}

function PrintReport({
  values,
  result,
  report,
  qaSection,
  integratedSolution,
  hook,
}: {
  values: SajuFormValues
  result: SajuResult
  additional: AdditionalAnswers
  report: ReportSection[]
  qaSection: ReturnType<typeof generateQASection> | null
  integratedSolution: IntegratedSolution
  hook: string
}) {
  return (
    <div className="px-8 py-10 text-black">
      <h1 className="mb-2 text-2xl font-bold">{values.name}님의 명리 운명 리포트</h1>
      <p className="mb-4 text-base italic text-gray-700">&ldquo;{hook}&rdquo;</p>
      <p className="mb-6 text-sm text-gray-600">
        {values.calendar === 'solar' ? '양력' : '음력'} {values.year}년 {values.month}월 {values.day}일{values.hour >= 0 ? ` ${values.hour}:00` : ''} · {values.gender === 'male' ? '남성' : '여성'} · {values.region}
      </p>

      <div className="mb-6 border border-gray-300 p-4">
        <h2 className="mb-2 font-bold">사주 원국</h2>
        <p className="text-sm">{result.pillars.map(p => `${p.name}: ${p.stemKr}${p.branchKr}`).join('  ')}</p>
        <p className="mt-1 text-xs text-gray-600">태원 {result.taiYuan} · 태식 {result.taiXi} · 명궁 {result.mingGong} · 신궁 {result.shenGong}</p>
      </div>

      {qaSection && (
        <div className="mb-6 border-2 border-gray-800 p-4">
          <h2 className="mb-2 font-bold">1:1 맞춤 풀이</h2>
          <p className="text-sm leading-relaxed whitespace-pre-line">{qaSection.answer}</p>
        </div>
      )}

      {report.map((section) => (
        <div key={section.step} className="card card-avoid mb-6 border-t-2 border-gray-800 pt-4">
          <h2 className="mb-1 text-lg font-bold">{section.step}. {section.title}</h2>
          <p className="mb-3 text-xs text-gray-500">{section.subtitle}</p>
          <p className="mb-2 text-sm font-semibold">목차: {section.toc.join(' · ')}</p>
          <p className="mb-3 text-sm leading-relaxed whitespace-pre-line">{section.intro}</p>
          <div className="mb-3 border-l-4 border-gray-800 bg-gray-100 p-3">
            <p className="text-sm font-semibold whitespace-pre-line">{section.highlight}</p>
          </div>
          <div className="mb-3 space-y-2">
            {section.episodes.map((ep, i) => (
              <div key={i} className="border border-gray-200 p-3">
                <p className="mb-1 text-sm font-bold">{ep.label}</p>
                <p className="text-sm leading-relaxed whitespace-pre-line">{ep.text}</p>
              </div>
            ))}
          </div>
          {section.insights && section.insights.length > 0 && (
            <div className="mb-3 border border-gray-300 bg-gray-50 p-3">
              <p className="mb-1 text-xs font-bold">핵심 통찰</p>
              {section.insights.map((insight, i) => (
                <p key={i} className="text-sm text-gray-700">• {insight}</p>
              ))}
            </div>
          )}
          <div className="mb-3 grid grid-cols-2 gap-2">
            <div className="border border-gray-200 p-2">
              <p className="text-xs font-bold">👁️ 내면의 시선</p>
              <p className="text-sm">{section.innerVsOuter.inner}</p>
            </div>
            <div className="border border-gray-200 p-2">
              <p className="text-xs font-bold">👥 타인의 시선</p>
              <p className="text-sm">{section.innerVsOuter.outer}</p>
            </div>
          </div>
          {section.innerVsOuter.gap && (
            <div className="mb-3 border-2 border-primary/30 bg-primary/5 p-3">
              <p className="mb-1 text-xs font-bold text-primary">⚖️ 자아 갭(Gap) 해법</p>
              <p className="text-sm leading-relaxed">{section.innerVsOuter.gap}</p>
            </div>
          )}
          <div className="mb-3 border border-gray-300 p-3">
            <p className="mb-1 text-xs font-bold">일상 에피소드</p>
            <p className="text-sm leading-relaxed whitespace-pre-line">{section.microScenario}</p>
          </div>
          <p className="border-t border-gray-300 pt-2 text-sm italic text-gray-600 whitespace-pre-line">{section.closing}</p>
        </div>
      ))}

      {integratedSolution && (
        <div className="card card-avoid mb-6 border-2 border-green-700 p-4">
          <h2 className="mb-2 text-lg font-bold text-green-700">{integratedSolution.title}</h2>
          {integratedSolution.items.map((item, i) => (
            <div key={i} className="mb-2 border border-gray-200 p-2">
              <p className="text-sm font-bold">{item.category} — {item.action}</p>
              <p className="text-xs text-gray-600">{item.reason}</p>
            </div>
          ))}
          <p className="text-sm italic text-gray-600 whitespace-pre-line">{integratedSolution.closing}</p>
        </div>
      )}

      <p className="mt-8 border-t-2 border-gray-800 pt-4 text-xs text-gray-500">※ 본 보고서는 전통 명리학 계산에 기반한 참고용 콘텐츠입니다.</p>
      <p className="mt-3 rounded-lg border border-gray-400 bg-gray-100 px-3 py-2 text-xs text-gray-700">
        사주는 정해진 운명이 아니라 나만의 궤도를 이해하고 더 나은 방향을 선택하기 위한 지도입니다. 운세에 삶을 맹신하기보다 삶의 주도권을 쥐고 지혜롭게 활용하세요.
      </p>
    </div>
  )
}

function getInteractionInterpretation(type: string): string {
  const interpretations: Record<string, string> = {
    '천간합': '천간합은 두 기운이 융합하여 새로운 성질을 만들어내는 관계입니다. 해당 주에서 합이 일어나면 그 기운의 특성이 강화되거나 변화합니다. 합은 끌림과 융합의 기운으로 인연을 만들고 기운을 합쳐 새 결과를 내는 시기입니다. 그러나 합이 너무 많으면 자기 본질이 흐려지고 타인에게 휘말릴 수 있습니다. 합이 들어온 대운·연운에서는 새 인연이나 새 기회가 들어오지만 내 것을 지키는 감각도 잃지 않아야 합니다.',
    '천간충': '천간충은 서로 반대되는 기운이 충돌하는 관계입니다. 변화와 갈등을 의미하지만 동시에 정체된 상황을 타개하는 계기가 되기도 합니다. 충은 부딪힘의 기운으로 정체를 깨뜨리지만 동시에 관계나 계약을 깰 수도 있습니다. 충이 오는 시기에는 큰 결정을 서두르지 말고 충돌을 변화의 에너지로 쓰되 파괴의 에너지로 쓰지 않도록 주의해야 합니다.',
    '지지육합': '지지육합은 두 지지가 결합하여 새로운 오행을 형성하는 관계입니다. 조화와 협력 인연의 결합을 상징합니다. 지지육합은 깊은 인연의 기운으로 사람과 사람 사람과 일이 깊이 얽히는 시기입니다. 이 시기에 맺은 인연은 오래가며 합이 된 오행의 방향으로 일이 열립니다.',
    '지지삼합': '지지삼합은 세 지지가 모여 강력한 국을 형성하는 관계입니다. 해당 오행의 기운이 매우 강해지며 큰 변화나 성취의 기운을 뜻합니다. 삼합은 국을 이루는 강력한 기운으로 큰 조직 큰 프로젝트 큰 인연이 들어오는 시기입니다. 이 시기에 시작한 일은 큰 결실로 이어질 확률이 높습니다.',
    '지지충': '지지충은 두 지지가 정면으로 충돌하는 관계입니다. 역동적 변화 이동 갈등을 의미하며 주의가 필요한 시기일 수 있습니다. 지지충은 이동과 변동의 기운으로 이사 이직 이별 이동이 잦은 시기입니다. 충이 일지에 오면 부부 위기 연지에 오면 부모와의 변동 시지에 오면 자녀나 말년의 변동을 암시합니다. 충이 오는 해에는 큰 이동을 의도적으로 좋은 방향으로 쓰면 충의 부작용을 줄일 수 있습니다.',
    '지지형': '지지형은 지지 간의 형벌 관계로 내적 갈등이나 스트레스 법적 문제 등에 유의해야 함을 뜻합니다. 형은 내적 꼬임의 기운으로 일이 꼬이고 마음이 꼬이는 시기입니다. 이 시기에는 강제로 풀려 하지 말고 시간을 두고 푸는 것이 상책입니다. 법적 문서 계약은 이 시기에 특히 꼼꼼히 검토해야 합니다.',
    '지지해': '지지해는 서로 해치는 관계로 인간관계의 마찰이나 예상치 못한 방해에 유의해야 합니다. 해는 못 보는 곳에서의 방해로 뒤에서 오는 질투 중상 예상치 못한 손해를 암시합니다. 이 시기에는 남의 일에 깊이 관여하지 말고 특히 돈을 빌려주거나 보증을 서는 일을 피해야 합니다.',
    '원진': '원진은 깊은 원한이나 갈등의 기운입니다. 해당 주의 기운이 충돌할 때 특히 주의가 필요합니다. 원진은 반복되는 억울함의 기운으로 특정 인간관계에서 반복적으로 손해나 억울함을 겪을 수 있습니다. 원진의 지지에 해당하는 띠나 기운을 가진 사람과의 깊은 거래는 서두르지 마십시오.',
    '귀문관': '귀문관은 예민한 직관과 신비로운 기운을 뜻합니다. 종교나 영성 심리 분야에 소질이 있을 수 있습니다. 귀문관은 영감과 예민함의 기운으로 직관이 날카로워지고 예술 심리 영성 분야에서 빛을 발할 수 있습니다. 그러나 예민함이 지나치면 우울이나 불안으로 발현할 수 있으니 감정의 중심을 잡는 연습이 필요합니다.',
  }
  return interpretations[type] || '사주 내 해당 관계가 미치는 영향을 참고하시기 바랍니다.'
}
