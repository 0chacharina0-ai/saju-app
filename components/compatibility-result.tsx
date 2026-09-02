'use client'

import { useState, useMemo, useEffect } from 'react'
import { Heart, Sparkles, Target, MessageCircle, Coins, Shield, TrendingUp, MapPin, CircleAlert as AlertCircle, Lightbulb, Palette, UtensilsCrossed, BookOpen, Download, RotateCcw, Lock, Info, ChevronRight, Rocket, Timer } from 'lucide-react'
import type { SajuResult } from '@/lib/saju'
import { ELEMENTS, type ElementKey } from '@/lib/saju'
import { generateCompatibilityReport, type CompatibilitySection } from '@/lib/compatibility-report'
import { cleanText } from '@/lib/text-utils'
import { CosmicBackground } from './cosmic-background'

const SCORE_COLORS = (score: number) =>
  score >= 80 ? 'text-emerald-400' : score >= 65 ? 'text-amber-400' : 'text-rose-400'
const SCORE_BG = (score: number) =>
  score >= 80 ? 'from-emerald-500 to-green-500' : score >= 65 ? 'from-amber-500 to-yellow-500' : 'from-rose-500 to-red-500'

const CHAPTER_ICONS = [Heart, MessageCircle, Coins, Shield, TrendingUp]

const ELEMENT_HEX: Record<ElementKey, string> = {
  wood: '#4ade80', fire: '#fb7185', earth: '#fbbf24', metal: '#e5e7eb', water: '#60a5fa',
}

const SCORE_GUIDE_TEXT = '80% 이상: 상극 없는 최고 궁합 · 65~79%: 서로 양보가 필요한 보완 관계 · 50~64%: 노력으로 키워가는 관계 · 50% 미만: 마찰이 크지만 성장의 기회'

function ScoreTooltip() {
  const [show, setShow] = useState(false)
  return (
    <div className="relative inline-block">
      <button type="button" onClick={() => setShow(!show)} className="text-muted-foreground/60 hover:text-primary" aria-label="점수 기준 안내">
        <Info className="size-3.5" />
      </button>
      {show && (
        <div className="absolute right-0 top-6 z-20 w-64 rounded-xl border border-border bg-popover p-4 text-xs leading-relaxed text-muted-foreground shadow-xl">
          <p className="mb-1 font-bold text-foreground">점수 기준 안내</p>
          <p className="break-keep">{SCORE_GUIDE_TEXT}</p>
          <button type="button" onClick={() => setShow(false)} className="mt-2 text-primary hover:underline">닫기</button>
        </div>
      )}
    </div>
  )
}

function ChemistryChart({ items }: { items: { label: string; score: number }[] }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.label}>
          <div className="mb-1.5 flex items-center gap-2">
            <span className="break-keep text-sm font-medium text-foreground/90">{item.label}</span>
            <ScoreTooltip />
            <span className={`ml-auto text-sm font-bold ${SCORE_COLORS(item.score)}`}>{item.score}%</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-secondary/40">
            <div className={`h-full rounded-full bg-gradient-to-r ${SCORE_BG(item.score)} transition-all duration-700 ease-out`} style={{ width: `${item.score}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function ElementComparisonGraph({ countsA, countsB, nameA, nameB }: { countsA: Record<ElementKey, number>; countsB: Record<ElementKey, number>; nameA: string; nameB: string }) {
  const keys = Object.keys(countsA) as ElementKey[]
  const maxVal = Math.max(...Object.values(countsA), ...Object.values(countsB), 1)

  return (
    <div className="cosmic-card p-6">
      <p className="mb-4 flex items-center gap-2 text-sm font-bold text-foreground">
        <Sparkles className="size-4 text-primary" /> 두 사람의 오행(木火土金水) 1:1 비교 그래프
      </p>
      <div className="space-y-4">
        {keys.map((key) => {
          const countA = countsA[key]
          const countB = countsB[key]
          const pctA = (countA / maxVal) * 100
          const pctB = (countB / maxVal) * 100
          return (
            <div key={key}>
              <div className="mb-1 flex items-center gap-2">
                <span className="font-hanja text-sm font-bold" style={{ color: ELEMENT_HEX[key] }}>{ELEMENTS[key].hanja}</span>
                <span className="text-xs text-muted-foreground">{ELEMENTS[key].kr} {ELEMENTS[key].label}</span>
              </div>
              {/* A bar */}
              <div className="mb-1 flex items-center gap-2">
                <span className="w-12 shrink-0 text-right text-xs font-medium text-primary">{nameA}</span>
                <div className="h-5 flex-1 overflow-hidden rounded-full bg-secondary/40">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${Math.max(pctA, 3)}%`, backgroundColor: ELEMENT_HEX[key] }} />
                </div>
                <span className="w-6 text-center text-xs font-bold">{countA}</span>
              </div>
              {/* B bar */}
              <div className="flex items-center gap-2">
                <span className="w-12 shrink-0 text-right text-xs font-medium text-accent">{nameB}</span>
                <div className="h-5 flex-1 overflow-hidden rounded-full bg-secondary/40">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${Math.max(pctB, 3)}%`, backgroundColor: ELEMENT_HEX[key], opacity: 0.7 }} />
                </div>
                <span className="w-6 text-center text-xs font-bold">{countB}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function KeywordBadges({ keywords }: { keywords: string[] }) {
  const colors = ['bg-amber-500/15 text-amber-400 border-amber-500/30', 'bg-sky-500/15 text-sky-400 border-sky-500/30', 'bg-rose-500/15 text-rose-400 border-rose-500/30']
  return (
    <div className="flex flex-wrap gap-2">
      {keywords.map((kw, i) => (
        <span key={i} className={`break-keep rounded-full border px-3 py-1 text-xs font-bold ${colors[i % colors.length]}`}>{kw}</span>
      ))}
    </div>
  )
}

function ScoreBar({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-secondary/40">
        <div className={`h-full rounded-full bg-gradient-to-r ${SCORE_BG(score)} transition-all duration-700`} style={{ width: `${score}%` }} />
      </div>
      <span className={`text-sm font-bold ${SCORE_COLORS(score)}`}>{score}%</span>
    </div>
  )
}

function ReportChapter({ section, icon: Icon, blurred }: { section: CompatibilitySection; icon: typeof Heart; blurred?: boolean }) {
  return (
    <div className={`mt-8 cosmic-result-section p-6 sm:p-8 ${blurred ? 'select-none' : ''}`}>
      <div className={`mb-5 flex items-center gap-3 border-b border-border pb-4 ${blurred ? 'blur-sm' : ''}`}>
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/40 bg-primary/10">
          <Icon className="size-5 text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary/70">CHAPTER {section.chapter}</p>
          <h4 className="break-keep font-serif text-lg font-bold">{section.title}</h4>
        </div>
      </div>

      <div className={`space-y-5 ${blurred ? 'blur-sm' : ''}`}>
        <div className="space-y-3">
          <KeywordBadges keywords={section.keywords} />
          <ScoreBar score={section.score} />
        </div>

        <p className="break-keep rounded-xl border-l-4 border-primary bg-primary/8 p-4 text-sm leading-relaxed text-primary whitespace-pre-line">{cleanText(section.intro)}</p>

        <div className="space-y-4">
          {section.paragraphs.map((para, i) => (
            <p key={i} className="break-keep text-sm leading-relaxed text-foreground/85 whitespace-pre-line">{cleanText(para)}</p>
          ))}
        </div>

        <p className="break-keep border-t border-border pt-4 text-sm italic leading-relaxed text-muted-foreground/80 whitespace-pre-line">{cleanText(section.closing)}</p>
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

function ActionGuideCard({ icon: Icon, title, children }: { icon: typeof Heart; title: string; children: React.ReactNode }) {
  return (
    <div className="cosmic-card p-5">
      <p className="mb-3 flex items-center gap-2 text-sm font-bold text-foreground">
        <Icon className="size-4 text-primary" /> {title}
      </p>
      <div className="break-keep text-sm leading-relaxed text-muted-foreground">{children}</div>
    </div>
  )
}

function CountdownTimer() {
  const [seconds, setSeconds] = useState(599)
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 599))
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return (
    <div className="flex items-center gap-1.5 text-sm font-bold text-yellow-400">
      <Timer className="size-4" />
      <span className="tabular-nums text-yellow-300">{String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}</span>
    </div>
  )
}

export function CompatibilityResultView({
  personA,
  personB,
  onReset,
}: {
  personA: { name: string; result: SajuResult }
  personB: { name: string; result: SajuResult }
  onReset: () => void
}) {
  const [paid, setPaid] = useState(false)
  const report = useMemo(() => generateCompatibilityReport(personA, personB), [personA, personB])

  const handleDownload = () => { window.print() }

  return (
    <main className="cosmic-bg">
      <CosmicBackground />
      <section className="mx-auto max-w-4xl px-6 pb-28 pt-4 sm:px-8">
      <div className="cosmic-card cosmic-card-lg cosmic-anim p-6 sm:p-10">
        {/* Header */}
        <header className="mb-8 border-b border-border pb-6 text-center">
          <p className="font-display text-sm font-semibold tracking-[0.35em] text-gradient uppercase">Compatibility Report</p>
          <h2 className="break-keep mt-2 text-2xl font-bold sm:text-3xl">
            {personA.name} × {personB.name} 궁합 보고서
          </h2>
          <p className="break-keep mt-2 text-sm text-muted-foreground">
            {personA.result.dayMasterStemKr}({personA.result.dayMasterStem}) × {personB.result.dayMasterStemKr}({personB.result.dayMasterStem}) · 종합 궁합 점수
          </p>
        </header>

        {/* Total Score - always visible */}
        <div className="mb-8 cosmic-result-section text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">종합 궁합 점수</p>
            <ScoreTooltip />
          </div>
          <p className={`mt-2 text-5xl font-bold ${SCORE_COLORS(report.totalScore)}`}>{report.totalScore}<span className="text-2xl">점</span></p>
          <p className="break-keep mt-3 text-sm leading-relaxed text-muted-foreground">{cleanText(report.closing)}</p>
        </div>

        {/* Element Comparison Graph - always visible */}
        <div className="mb-8">
          <ElementComparisonGraph countsA={personA.result.elementCounts} countsB={personB.result.elementCounts} nameA={personA.name} nameB={personB.name} />
        </div>

        {/* Element Harmony Analysis - always visible */}
        <div className="mb-8 cosmic-result-section">
          <p className="mb-3 flex items-center gap-2 text-sm font-bold text-primary">
            <Sparkles className="size-4" /> 오행(木火土金水) 상성 해석
          </p>
          <p className="break-keep text-sm leading-relaxed text-foreground/85">{cleanText(report.elementHarmony.text)}</p>
          {report.elementHarmony.complementary.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-xs font-semibold text-muted-foreground">보완 기운:</span>
              {report.elementHarmony.complementary.map((c, i) => (
                <span key={i} className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400">{c}</span>
              ))}
            </div>
          )}
          {report.elementHarmony.shared.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="text-xs font-semibold text-muted-foreground">공유 기운:</span>
              {report.elementHarmony.shared.map((s, i) => (
                <span key={i} className="rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-bold text-sky-400">{s}</span>
              ))}
            </div>
          )}
        </div>

        {/* Chemistry Chart - always visible */}
        <div className="mb-8 cosmic-card p-6">
          <p className="mb-4 flex items-center gap-2 text-sm font-bold text-foreground">
            <Sparkles className="size-4 text-primary" /> 두 사람의 종합 궁합 케미 차트
          </p>
          <ChemistryChart items={report.chemistryChart} />
        </div>

        {/* Preview summary - first section intro only */}
        <div className="mb-8 cosmic-result-section">
          <p className="mb-2 flex items-center gap-2 text-sm font-bold text-primary">
            <Heart className="size-4" /> 궁합 요약 미리보기
          </p>
          <p className="break-keep text-sm leading-relaxed text-foreground/85">{cleanText(report.sections[0]?.intro)}</p>
        </div>

        {/* Paywall */}
        {!paid ? (
          <>
            {/* Blurred chapters */}
            <div className="relative space-y-4">
              {report.sections.map((section) => (
                <div key={section.chapter} className="relative">
                  <ReportChapter section={section} icon={CHAPTER_ICONS[section.chapter - 1] ?? Heart} blurred />
                </div>
              ))}
            </div>

            {/* Paywall CTA */}
            <div className="mt-8 cosmic-paywall">
              <div className="mb-2 flex items-center justify-center gap-3">
                <span className="text-lg text-muted-foreground/50 line-through">49,800원</span>
                <span className="rounded-full bg-yellow-500/20 px-2 py-0.5 text-xs font-bold text-yellow-400">50% 얼리버드</span>
              </div>
              <p className="mb-1 text-3xl font-bold text-gradient">24,900원</p>
              <p className="mb-1 text-xs text-muted-foreground">궁합 심층 리포트 1회 · A4 약 30페이지 분량</p>
              <p className="mb-4 text-xs font-medium text-primary">5개 챕터 + 실전 행동 가이드 + 오행 상성 분석 포함</p>

              <div className="mb-4 flex items-center justify-center">
                <CountdownTimer />
              </div>

              <button type="button" onClick={() => setPaid(true)}
                className="cosmic-btn w-full sm:w-auto">
                <Rocket className="size-5" />
                24,900원에 궁합 심층 리포트 열기
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

            {/* TOC */}
            <div className="mb-8 cosmic-card p-6">
              <p className="mb-4 flex items-center gap-2 text-sm font-bold text-foreground">
                <BookOpen className="size-4 text-primary" /> 목차
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {report.sections.map((s) => {
                  const Icon = CHAPTER_ICONS[s.chapter - 1] ?? Heart
                  return (
                    <div key={s.chapter} className="flex items-center gap-3 rounded-xl border border-border/40 bg-background/20 p-3">
                      <Icon className="size-4 shrink-0 text-primary/70" />
                      <span className="break-keep flex-1 text-sm font-medium text-foreground/90">CHAPTER {s.chapter}. {s.title}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Chapters */}
            {report.sections.map((section) => (
              <ReportChapter key={section.chapter} section={section} icon={CHAPTER_ICONS[section.chapter - 1] ?? Heart} />
            ))}

            {/* Action Guide */}
            <div className="mt-10 cosmic-result-section p-6 sm:p-8" style={{ borderColor: 'oklch(0.75 0.12 85 / 30%)' }}>
              <h3 className="break-keep mb-6 flex items-center gap-2 font-serif text-xl font-bold text-amber-400">
                <Target className="size-5" /> 실전 행동 가이드
              </h3>

              <div className="space-y-4">
                <ActionGuideCard icon={MapPin} title="추천 데이트·여행 장소">
                  <p className="mb-2">{report.actionGuide.recommendedPlaces}</p>
                  <p className="text-xs text-rose-400/80">피해야 할 장소: {report.actionGuide.avoidPlaces}</p>
                </ActionGuideCard>

                <ActionGuideCard icon={AlertCircle} title="다툴 때 절대 하지 말아야 할 금기 행동 3가지">
                  <ol className="list-inside list-decimal space-y-2">
                    {report.actionGuide.forbiddenActions.map((action, i) => (
                      <li key={i} className="break-keep">{action}</li>
                    ))}
                  </ol>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {report.actionGuide.forbiddenWords.map((word, i) => (
                      <span key={i} className="break-keep rounded-full border border-rose-500/30 bg-rose-500/10 px-2.5 py-1 text-xs font-bold text-rose-400">&ldquo;{word}&rdquo;</span>
                    ))}
                  </div>
                </ActionGuideCard>

                <ActionGuideCard icon={Lightbulb} title="상대방의 마음을 즉시 푸는 행동 솔루션">
                  <ul className="space-y-2">
                    {report.actionGuide.heartMeltActions.map((action, i) => (
                      <li key={i} className="break-keep flex items-start gap-2">
                        <span className="mt-1 size-1.5 shrink-0 rounded-full bg-amber-400" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </ActionGuideCard>

                <div className="grid gap-4 sm:grid-cols-2">
                  <ActionGuideCard icon={Palette} title="개운 컬러">
                    <div className="flex flex-wrap gap-2">
                      {report.actionGuide.luckyColors.map((color, i) => (
                        <span key={i} className="break-keep rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{color}</span>
                      ))}
                    </div>
                  </ActionGuideCard>
                  <ActionGuideCard icon={UtensilsCrossed} title="개운 음식">
                    <div className="flex flex-wrap gap-2">
                      {report.actionGuide.luckyFoods.map((food, i) => (
                        <span key={i} className="break-keep rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400">{food}</span>
                      ))}
                    </div>
                  </ActionGuideCard>
                </div>
              </div>
            </div>

            {/* Final CTA */}
            <div className="no-print mt-8 flex flex-col gap-3 sm:flex-row">
              <button onClick={handleDownload} className="cosmic-btn-secondary">
                <Download className="size-4" /> PDF로 저장
              </button>
              <button onClick={onReset} className="cosmic-btn-secondary">
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
