'use client'

import { useState, useEffect } from 'react'
import { Lock, Rocket, Timer, Quote, ArrowLeft, ArrowRight, CircleCheck as CheckCircle2, FileText, Sparkles, Moon, Star, Eye, Zap, Compass, Heart } from 'lucide-react'
import { ELEMENTS, type ElementKey, type SajuResult } from '@/lib/saju'
import type { SajuFormValues } from '@/components/saju-form'
import type { AdditionalAnswers } from '@/components/additional-questions'

const ELEMENT_STYLES: Record<ElementKey, { text: string; bg: string; border: string; bar: string; glow: string; hex: string }> = {
  wood: { text: 'text-wood', bg: 'bg-wood/10', border: 'border-wood/40', bar: 'bg-wood', glow: 'shadow-[0_0_20px_-4px_var(--wood)]', hex: '#4ade80' },
  fire: { text: 'text-fire', bg: 'bg-fire/10', border: 'border-fire/40', bar: 'bg-fire', glow: 'shadow-[0_0_20px_-4px_var(--fire)]', hex: '#fb7185' },
  earth: { text: 'text-earth', bg: 'bg-earth/10', border: 'border-earth/40', bar: 'bg-earth', glow: 'shadow-[0_0_20px_-4px_var(--earth)]', hex: '#fbbf24' },
  metal: { text: 'text-metal', bg: 'bg-metal/10', border: 'border-metal/40', bar: 'bg-metal', glow: 'shadow-[0_0_20px_-4px_var(--metal)]', hex: '#e5e7eb' },
  water: { text: 'text-water', bg: 'bg-water/10', border: 'border-water/40', bar: 'bg-water', glow: 'shadow-[0_0_20px_-4px_var(--water)]', hex: '#60a5fa' },
}

const ELEMENT_ICONS: Record<ElementKey, string> = {
  wood: '木',
  fire: '火',
  earth: '土',
  metal: '金',
  water: '水',
}

const REVIEWS = [
  { text: '시간 경계선이라 사주가 매번 달랐는데, 지방시 보정으로 드디어 제 진짜 사주를 찾았어요. 대운 흐름이 제 인생과 정확히 맞아떨어졌습니다.', author: '김**연 (32세, 서울)' },
  { text: '다른 사주 앱들은 다 뻔한 해석뿐이었는데, 여기는 합충과 12운성까지 깊게 분석해줘서 감동이었습니다. 2026년 대운 상승월 풀이가 소름이더라고요.', author: '이**호 (29세, 부산)' },
  { text: '연애 사주만 5번째 보는 건데 여기서 드디어 관계가 풀리는 키를 찾았어요. 편관과 정관 해석이 달랐던 거였죠. 정말 추천합니다.', author: '박**아 (35세, 순천)' },
]

const REPORT_TOC = [
  { icon: Star, title: '만세력 판독 & 원국 핵심 구조 분석', hint: '일간 기질과 신강/신약 판별로 짚어내는 나의 본질' },
  { icon: FileText, title: '재물운 & 평생 금전 흐름 분석', hint: '돈 버는 방식과 손재 위험 시기 그리고 축재 전략까지' },
  { icon: Eye, title: '직장·커리어·사업운 적성 풀이', hint: '조직과 사업 중 어디가 맞는지 평생 업의 방향까지' },
  { icon: Zap, title: '연애·결혼운 & 인연 진입 시기', hint: '끌리는 유형과 실패 패턴 그리고 진짜 잘 맞는 타입' },
  { icon: Moon, title: '건강운 & 인간관계·가족운 풀이', hint: '취약 신체 부위와 부모·가족 인연 그리고 귀인 패턴까지' },
  { icon: Sparkles, title: '합·충·형·해 신살 사주 영향 상세 풀이', hint: '각 신살이 당신의 삶에 미치는 구체적 영향과 대응' },
  { icon: Compass, title: '10년 대운 & 연도별 세운 상세 분석', hint: '대운별 변곡점과 인생이 열리는 해 함정의 해까지' },
  { icon: Heart, title: '현실 조언·총평 & 종합 맞춤 개운 솔루션', hint: '고쳐야 할 것과 붙잡을 강점 그리고 생활밀착형 처방' },
]

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
      <span>연료 할인 마감까지</span>
      <span className="tabular-nums text-yellow-300">{String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}</span>
    </div>
  )
}

export function SajuTeaser({
  values,
  result,
  additional,
  onPay,
  onBack,
  onStartPrecision,
  isFreePreview,
}: {
  values: SajuFormValues
  result: SajuResult
  additional: AdditionalAnswers
  onPay: () => void
  onBack: () => void
  isFreePreview?: boolean
}) {
  const [activeInteraction, setActiveInteraction] = useState('천간합')
  const maxCount = Math.max(...Object.values(result.elementCounts))

  const interactionsByType = result.interactions.reduce<Record<string, typeof result.interactions>>((acc, item) => {
    if (!acc[item.type]) acc[item.type] = []
    acc[item.type].push(item)
    return acc
  }, {})

  const interactionTabs = ['천간합', '천간충', '지지육합', '지지삼합', '지지충', '지지형', '지지해', '원진', '귀문관']

  return (
    <section id="saju-teaser" className="relative mx-auto max-w-4xl scroll-mt-20 px-6 py-20">
      <div className="mb-8 text-center">
        <p className="font-display text-xs font-semibold tracking-[0.35em] text-primary uppercase">
          Your Cosmic Star Map — Preview
        </p>
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">나만의 코스믹 스타맵</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          무료 만세력 결과를 확인하고, 명리 운명 리포트를 열면 완전한 심층 보고서를 받아보세요.
        </p>
      </div>

      {/* free preview: basic saju table — upgraded cosmic glass cards */}
      <div className="glass mb-6 rounded-3xl p-6 sm:p-8">
        <h3 className="break-keep mb-4 font-serif text-xl font-semibold">사주팔자 — 무료 미리보기</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {result.pillars.map((p) => {
            const stemStyle = ELEMENT_STYLES[p.stemElement.key]
            const branchStyle = ELEMENT_STYLES[p.branchElement.key]
            return (
              <div key={p.key} className="relative overflow-hidden rounded-2xl bg-secondary/10">
                <div className="relative border-b border-border/30 py-2 text-center text-base font-medium text-muted-foreground">{p.name}</div>
                <div className="relative flex flex-col items-center gap-1 py-4">
                  <span className={`font-serif text-4xl font-bold ${stemStyle.text}`}>{p.stemHanja}</span>
                  <span className="text-sm text-muted-foreground">{p.stemKr} · {p.stemElement.kr}</span>
                  <span className="mt-1 rounded-full bg-secondary/30 px-2 py-0.5 text-sm font-medium">{p.shiShenGan}</span>
                </div>
                <div className="relative flex flex-col items-center gap-1 py-4">
                  <span className={`font-serif text-4xl font-bold ${branchStyle.text}`}>{p.branchHanja}</span>
                  <span className="text-sm text-muted-foreground">{p.branchKr} · {p.animal}띠</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* 오행 차트 — upgraded with element icons */}
        <div className="mt-6">
          <h4 className="break-keep mb-3 text-base font-semibold text-muted-foreground">오행 분포</h4>
          <div className="space-y-2">
            {(Object.keys(result.elementCounts) as ElementKey[]).map((key) => {
              const count = result.elementCounts[key]
              const style = ELEMENT_STYLES[key]
              const info = ELEMENTS[key]
              const pct = maxCount > 0 ? (count / maxCount) * 100 : 0
              return (
                <div key={key} className="flex items-center gap-3">
                  <span className={`flex size-8 items-center justify-center rounded-lg border ${style.border} ${style.bg} font-serif text-sm font-bold ${style.text}`}>{ELEMENT_ICONS[key]}</span>
                  <span className={`w-14 text-sm font-medium ${style.text}`}>{info.hanja} {info.kr}</span>
                  <div className="h-6 flex-1 overflow-hidden rounded-full bg-secondary/40">
                    <div className={`h-full rounded-full ${count > 0 ? style.bar : 'bg-transparent'} transition-all`} style={{ width: `${pct}%` }} />
                  </div>
                  <span className="w-8 text-right text-base font-semibold">{count}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* 오행 도넛 차트 */}
        <div className="mt-6 rounded-xl border border-border bg-secondary/20 p-5">
          <p className="mb-4 text-center text-sm font-semibold text-muted-foreground/70">오행 분포 (도넛 차트)</p>
          <TeaserDonutChart counts={result.elementCounts} />
        </div>

        {/* 음력 표기 (아라비아 숫자) */}
        <div className="mt-4 rounded-xl border border-border bg-secondary/30 p-3 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">음력:</span> {result.lunarDisplay}
        </div>

        {/* 대운 표 — 무료 공개 */}
        <div className="mt-6">
          <h4 className="break-keep mb-3 text-base font-semibold text-muted-foreground">대운 표 (10년 주기 운의 흐름)</h4>
          <div className="overflow-x-auto rounded-xl border border-border bg-secondary/20">
            <table className="w-full text-center text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="py-2 px-2">순번</th>
                  <th className="py-2 px-2">대운</th>
                  <th className="py-2 px-2">천간</th>
                  <th className="py-2 px-2">지지</th>
                  <th className="py-2 px-2">시작 나이</th>
                  <th className="py-2 px-2">시작 연도</th>
                </tr>
              </thead>
              <tbody>
                {result.daYun.map((dy, i) => {
                  const isCurrent = i === result.currentDaYunIndex
                  return (
                    <tr key={i} className={`border-b border-border/40 ${isCurrent ? 'bg-primary/10 font-semibold text-primary' : 'text-foreground/80'}`}>
                      <td className="py-2 px-2">{i + 1}</td>
                      <td className="py-2 px-2 font-mono">{dy.ganZhi}</td>
                      <td className="py-2 px-2">{dy.stemHanja} ({dy.stemKr})</td>
                      <td className="py-2 px-2">{dy.branchHanja} ({dy.branchKr})</td>
                      <td className="py-2 px-2">{dy.startAge}세</td>
                      <td className="py-2 px-2">{dy.startYear}년</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {result.currentDaYunIndex >= 0 && result.daYun[result.currentDaYunIndex] && (
            <p className="mt-2 text-xs text-primary">
              현재 대운: {result.daYun[result.currentDaYunIndex].ganZhi} ({result.daYun[result.currentDaYunIndex].startAge}세 ~ {result.daYun[result.currentDaYunIndex].startAge + 9}세)
            </p>
          )}
        </div>

        {/* 천간/지지 오행 분포 상세 */}
        <div className="mt-6">
          <h4 className="break-keep mb-3 text-base font-semibold text-muted-foreground">천간·지지 오행 구성</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-secondary/20 p-3">
              <p className="mb-2 text-xs font-medium text-muted-foreground">천간 (연/월/일/시)</p>
              <div className="space-y-1">
                {result.pillars.map(p => (
                  <div key={p.key} className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{p.name}</span>
                    <span className={`font-medium ${ELEMENT_STYLES[p.stemElement.key].text}`}>{p.stemHanja} · {p.stemElement.kr}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-secondary/20 p-3">
              <p className="mb-2 text-xs font-medium text-muted-foreground">지지 (연/월/일/시)</p>
              <div className="space-y-1">
                {result.pillars.map(p => (
                  <div key={p.key} className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{p.name}</span>
                    <span className={`font-medium ${ELEMENT_STYLES[p.branchElement.key].text}`}>{p.branchHanja} · {p.branchElement.kr}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 합충 (신살) — 무료 공개 */}
      <div className="glass mb-6 rounded-3xl p-6 sm:p-8">
        <h3 className="mb-4 font-serif text-xl font-semibold">합 · 충 (신살) 미리보기</h3>
        <div className="mb-4 flex flex-wrap gap-2">
          {interactionTabs.map((tab) => {
            const count = interactionsByType[tab]?.length ?? 0
            return (
              <button key={tab} type="button" onClick={() => setActiveInteraction(tab)} aria-pressed={activeInteraction === tab}
                className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-all ${activeInteraction === tab ? 'border-primary bg-primary/15 text-primary' : 'border-border bg-secondary/30 text-muted-foreground hover:text-foreground'}`}>
                {tab}{count > 0 && <span className="ml-1 rounded-full bg-primary/20 px-1.5 text-[0.6rem]">{count}</span>}
              </button>
            )
          })}
        </div>
        <div className="rounded-xl border border-border bg-secondary/30 p-4">
          {interactionsByType[activeInteraction] && interactionsByType[activeInteraction].length > 0 ? (
            <ul className="space-y-2">
              {interactionsByType[activeInteraction].map((item, i) => (
                <li key={i} className="flex items-start gap-3 rounded-lg border border-border/50 bg-background/40 p-3">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">{i + 1}</span>
                  <div>
                    <p className="text-base font-medium">{item.desc}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">관련 주: {item.pillars.join(', ')}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="py-4 text-center text-base text-muted-foreground">해당하는 {activeInteraction} 관계가 사주 내에 존재하지 않습니다.</p>
          )}
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground/60">※ 각 합충이 사주에 미치는 상세 영향 풀이는 유료 보고서에서 확인할 수 있습니다.</p>
      </div>

      {/* BRIDGE SECTION: 숨겨진 이야기 연출 */}
      <div className="mb-6 overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent p-8 text-center">
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full border border-primary/40 bg-primary/10">
          <Sparkles className="size-8 text-primary" />
        </div>
        <h3 className="mb-3 text-xl font-bold sm:text-2xl">생체시계 보정으로 밝혀진 숨겨진 사주 비밀</h3>
        <p className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground">
          지구의 표준시(GMT+9)는 인공적인 선 하나로 당신의 진짜 궤도를 가두어 두었습니다.
          <br />
          지금까지 본 사주가 맞지 않았다면, 그것은 당신의 잘못이 아닙니다.
          <br />
          <span className="font-semibold text-foreground">생체 자전 궤도 보정</span>으로 찾아낸 진짜 사주에는,
          <br />
          표준시 사주에서는 절대 볼 수 없었던 비밀이 숨겨져 있습니다.
        </p>
      </div>

      {/* 블러 처리된 티저 카드 — 리포트 목차 + 힌트 */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div className="glass relative overflow-hidden rounded-2xl p-5">
          <div className="mb-3 flex items-center gap-2">
            <Lock className="size-4 text-primary" />
            <h4 className="text-base font-semibold">2026년 찾아올 위기 요소</h4>
          </div>
          <div className="space-y-2 blur-sm select-none">
            <p className="text-sm text-muted-foreground">대운 {result.daYun[Math.min(3, result.daYun.length - 1)]?.ganZhi}와 충을 이루는...</p>
            <p className="text-sm text-muted-foreground">연운 {result.daYun[result.currentDaYunIndex]?.liuNian[result.currentLiuNianIndex]?.ganZhi}가 일주와 형을...</p>
            <p className="text-sm text-muted-foreground">주의해야 할 월운: 7월 ~ 9월 구간...</p>
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-background/80 to-transparent">
            <div className="flex items-center gap-2 rounded-full border border-primary/40 bg-background/80 px-4 py-2 text-sm font-medium text-primary">
              <Lock className="size-4" /> 연료 충전 후 열람
            </div>
          </div>
        </div>

        <div className="glass relative overflow-hidden rounded-2xl p-5">
          <div className="mb-3 flex items-center gap-2">
            <Lock className="size-4 text-primary" />
            <h4 className="text-base font-semibold">운명의 짝 핵심 키워드</h4>
          </div>
          <div className="space-y-2 blur-sm select-none">
            <p className="text-sm text-muted-foreground">당신의 일간 {result.dayMasterStem}과 가장 잘 맞는...</p>
            <p className="text-sm text-muted-foreground">지지합으로 이어지는 인연의 시기...</p>
            <p className="text-sm text-muted-foreground">2026~2027년 대운 상승월: [🔒 블러]</p>
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-background/80 to-transparent">
            <div className="flex items-center gap-2 rounded-full border border-primary/40 bg-background/80 px-4 py-2 text-sm font-medium text-primary">
              <Lock className="size-4" /> 연료 충전 후 열람
            </div>
          </div>
        </div>
      </div>

      {/* 리포트 목차 (잠금 상태) */}
      <div className="glass mb-6 rounded-3xl p-6 sm:p-8">
        <div className="mb-4 flex items-center gap-2">
          <FileText className="size-5 text-primary" />
          <h3 className="font-serif text-xl font-semibold">명리 운명 리포트 — 목차</h3>
          <span className="ml-auto flex items-center gap-1 rounded-full border border-primary/40 bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
            <Lock className="size-3" /> 잠김
          </span>
        </div>
        <div className="space-y-2">
          {REPORT_TOC.map((item, i) => {
            const Icon = item.icon
            return (
              <div key={i} className="relative flex items-start gap-3 overflow-hidden rounded-xl border border-border/60 bg-secondary/20 p-4">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
                  <Icon className="size-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-base font-semibold text-foreground">{item.title}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{item.hint}</p>
                </div>
                <Lock className="mt-1 size-4 shrink-0 text-muted-foreground/50" />
                {/* subtle blur overlay on hint text */}
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background/60 to-transparent" />
              </div>
            )
          })}
        </div>
        <p className="mt-4 text-center text-sm font-medium text-primary">
          총 8개 핵심 챕터 · 원고지 분량의 심층 보고서 제공
        </p>
      </div>

      {/* 3대 차별점 USP 카드 */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {[
          { icon: Compass, title: '지방시 보정', subtitle: '표준시 오차 60%를 잡다', desc: '출생 도시 경도에 따라 분 단위 시차를 보정합니다. 같은 시각에 태어나도 서울과 울릉도는 다른 사주입니다.' },
          { icon: FileText, title: '원고지 분량의 심층 서사', subtitle: '뻔한 템플릿이 아니다', desc: '8개 챕터에 걸쳐 당신의 사주팔자를 입체적으로 풀어냅니다. 단순 키워드가 아닌, 인생 궤도를 읽어주는 방대한 서사.' },
          { icon: Sparkles, title: '현대 심리 기반 AI 분석', subtitle: '마음을 읽어주는 통찰', desc: '명리학의 고전적 지혜를 현대 심리학과 융합하여 해석합니다. 전문 용어가 아닌, 무릎을 탁 치게 만드는 감성적 서사로 풀어줍니다.' },
        ].map((card) => {
          const Icon = card.icon
          return (
            <div key={card.title} className="glass rounded-2xl p-5">
              <Icon className="size-7 text-primary" />
              <p className="mt-3 text-base font-bold text-foreground">{card.title}</p>
              <p className="mt-1 text-sm font-semibold text-primary">{card.subtitle}</p>
              <p className="mt-2 break-keep text-sm leading-relaxed text-muted-foreground">{card.desc}</p>
            </div>
          )
        })}
      </div>

      {/* 설득 섹션 */}
      <div className="glass mb-6 rounded-3xl p-6 sm:p-8">
        <div className="mb-6 space-y-4">
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
            <p className="text-base font-semibold text-primary">기존 표준시 사주는 오차가 60% 이상입니다.</p>
            <p className="mt-1 text-base text-muted-foreground">뻔한 해석에 실망하셨나요? 지방시 보정으로 찾아낸 진짜 사주를 확인하세요.</p>
          </div>
          <div className="rounded-xl border border-border bg-secondary/30 p-4">
            <p className="text-sm text-muted-foreground">
              지방시 보정으로 찾아낸 <span className="font-semibold text-foreground">2026년 대운 상승월</span>:{' '}
              <span className="inline-block rounded bg-background/60 px-2 py-0.5 font-mono text-sm blur-sm select-none">[🔒 블러]</span>
            </p>
          </div>
        </div>

        {/* 리뷰 카드 */}
        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <div key={i} className="rounded-xl border border-border bg-secondary/30 p-4">
              <Quote className="mb-2 size-4 text-primary/60" />
              <p className="text-sm leading-relaxed text-muted-foreground">{r.text}</p>
              <p className="mt-2 text-sm font-medium text-foreground/70">— {r.author}</p>
            </div>
          ))}
        </div>

        {/* 결제 UI */}
        <div className="rounded-2xl border-2 border-primary/40 bg-primary/5 p-6 text-center">
          <div className="mb-2 flex items-center justify-center gap-3">
            <span className="text-lg text-muted-foreground/50 line-through">49,800원</span>
            <span className="rounded-full bg-yellow-500/20 px-2 py-0.5 text-xs font-bold text-yellow-400">50% 얼리버드 할인</span>
          </div>
          <p className="mb-1 text-3xl font-bold text-gradient">24,900원</p>
          <p className="mb-1 text-xs text-muted-foreground">명리 운명 리포트 1회 · 완전한 심층 보고서</p>
          <p className="mb-4 text-xs font-medium text-primary">원고지 분량의 심층 보고서 제공</p>

          <div className="mb-4 flex items-center justify-center">
            <CountdownTimer />
          </div>

          <button type="button" onClick={onPay}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-base font-bold text-primary-foreground transition-all hover:bg-primary/80 hover:neon-glow focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none sm:w-auto">
            <Rocket className="size-5" />
            24,900원에 원고지 분량 심층 사주 전체 보기
          </button>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground/70">
            <span className="flex items-center gap-1"><CheckCircle2 className="size-3 text-green-500" /> 테스트 결제</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="size-3 text-green-500" /> 즉시 열람</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="size-3 text-green-500" /> 환불 가능</span>
          </div>
        </div>
      </div>

      {isFreePreview && (
        <div className="glass mb-6 rounded-3xl p-6 sm:p-8 text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full border border-primary/40 bg-primary/10">
            <Sparkles className="size-7 text-primary" />
          </div>
          <h3 className="mb-2 text-lg font-bold sm:text-xl">더 깊은 정밀 사주 분석을 원하시나요?</h3>
          <p className="mx-auto mb-5 max-w-md break-keep text-sm text-muted-foreground">
            결제 후 7가지 성향 질문과 시차 보정을 거치면 용신·대운·연운까지 포함한 원고지 분량의 심층 보고서를 받을 수 있습니다.
          </p>
          <button type="button" onClick={onPay} className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground transition-all hover:bg-primary/80 hover:shadow-lg">
            24,900원에 원고지 분량 심층 사주 전체 보기 <ArrowRight className="size-4" />
          </button>
        </div>
      )}

      <button type="button" onClick={onBack} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> 생년월일 다시 입력
      </button>
    </section>
  )
}

function TeaserDonutChart({ counts }: { counts: Record<ElementKey, number> }) {
  const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1
  const keys = Object.keys(counts) as ElementKey[]
  let cumulative = 0
  const segments = keys.map((key) => {
    const value = counts[key]
    const startAngle = (cumulative / total) * 360
    cumulative += value
    const endAngle = (cumulative / total) * 360
    return { key, pct: (value / total) * 100, startAngle, endAngle }
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
            <path
              key={seg.key}
              d={arcPath(seg.startAngle, seg.endAngle)}
              fill="none"
              stroke={style.hex}
              strokeWidth="22"
              strokeLinecap="round"
            />
          )
        })}
        <text x={cx} y={cy - 5} textAnchor="middle" className="fill-foreground text-lg font-bold">오행</text>
        <text x={cx} y={cy + 15} textAnchor="middle" className="fill-muted-foreground text-xs">총 {total}개</text>
      </svg>
      <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-1">
        {keys.map((key) => {
          const style = ELEMENT_STYLES[key]
          const pct = ((counts[key] / total) * 100).toFixed(0)
          const status = counts[key] === 0 ? '결여' : counts[key] >= 3 ? '과다' : counts[key] >= 2 ? '발달' : '적정'
          return (
            <div key={key} className="flex items-center gap-2 text-xs">
              <span className="size-3 shrink-0 rounded-full" style={{ backgroundColor: style.hex }} />
              <span className={`font-medium ${style.text}`}>{ELEMENTS[key].hanja} {ELEMENTS[key].label}</span>
              <span className="text-muted-foreground">{counts[key]}개 · {pct}%</span>
              <span className={`ml-auto rounded-full px-2 py-0.5 text-[0.6rem] font-semibold ${counts[key] === 0 ? 'bg-red-500/20 text-red-400' : counts[key] >= 3 ? 'bg-orange-500/20 text-orange-400' : counts[key] >= 2 ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>{status}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
