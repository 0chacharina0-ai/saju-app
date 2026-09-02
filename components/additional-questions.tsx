'use client'

import { useState } from 'react'
import { Heart, Briefcase, Coins, Sparkles, ArrowRight, ArrowLeft, MessageCircleQuestionMark as MessageCircleQuestion } from 'lucide-react'

export type AdditionalAnswers = {
  concernAreas: string[]
  loveStatus: string
  freeQuestion: string
  currentConcern: string
}

const CONCERN_AREAS = [
  { id: '연애/운명의 짝', label: '연애 / 운명의 짝', icon: Heart },
  { id: '재물/자산', label: '재물 / 자산', icon: Coins },
  { id: '이직/커리어', label: '이직 / 커리어', icon: Briefcase },
  { id: '종합 운세', label: '종합 운세', icon: Sparkles },
]

const LOVE_STATUS = [
  { id: '솔로', label: '솔로' },
  { id: '연애 중', label: '연애 중' },
  { id: '썸·애매한 관계', label: '썸·애매한 관계' },
  { id: '재회 고민', label: '재회 고민' },
  { id: '이혼·사별', label: '이혼·사별' },
  { id: '복잡한 애증 관계', label: '복잡한 애증 관계' },
]

const MAX_CONCERNS = 2

const optionBtn = 'flex items-center gap-2 rounded-2xl border-2 px-5 py-4 text-base font-medium transition-all'

export function AdditionalQuestions({
  onComplete,
  onBack,
}: {
  onComplete: (answers: AdditionalAnswers) => void
  onBack: () => void
}) {
  const [concernAreas, setConcernAreas] = useState<string[]>([])
  const [loveStatus, setLoveStatus] = useState('')
  const [freeQuestion, setFreeQuestion] = useState('')

  const toggleConcern = (id: string) => {
    setConcernAreas((prev) => {
      if (prev.includes(id)) return prev.filter((c) => c !== id)
      if (prev.length >= MAX_CONCERNS) return prev
      return [...prev, id]
    })
  }

  const canProceed = concernAreas.length > 0 && loveStatus

  return (
    <section id="additional-questions" className="relative mx-auto max-w-2xl scroll-mt-20 px-5 py-20 sm:px-6">
      <div className="mb-8 text-center">
        <p className="font-display text-xs font-semibold tracking-[0.35em] text-primary uppercase">
          Deep Space Probe
        </p>
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">맞춤형 탐사 정보 입력</h2>
        <p className="mt-3 break-keep text-base text-muted-foreground">
          당신의 고민과 상황을 알려주시면, 더 정밀한 코스믹 스타맵을 그려드립니다.
        </p>
      </div>

      <div className="glass rounded-3xl p-6 sm:p-8">
        {/* Q1: concern area — 복수 선택 (최대 2개) */}
        <div className="mb-8">
          <div className="mb-3 flex items-center justify-between">
            <label className="block text-base font-medium text-muted-foreground">
              현재 고민 및 관심사 (최대 {MAX_CONCERNS}개 선택)
            </label>
            <span className="text-xs font-semibold text-primary">{concernAreas.length}/{MAX_CONCERNS}</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {CONCERN_AREAS.map((c) => {
              const Icon = c.icon
              const selected = concernAreas.includes(c.id)
              return (
                <button key={c.id} type="button" onClick={() => toggleConcern(c.id)} aria-pressed={selected}
                  className={`${optionBtn} ${selected ? 'border-primary bg-primary/15 text-primary' : 'border-border bg-secondary/30 text-muted-foreground hover:text-foreground'}`}>
                  <Icon className="size-5" /> {c.label}
                  {selected && <span className="ml-auto text-primary">✓</span>}
                </button>
              )
            })}
          </div>
          <p className="mt-2 text-xs text-muted-foreground/70">여러 고민이 겹칠수록 입체적으로 분석합니다. 원하는 것만 골라주세요.</p>
        </div>

        {/* Q2: love status — 단일 선택 */}
        <div className="mb-8">
          <label className="mb-3 block text-base font-medium text-muted-foreground">
            시차 보정용 질문 — 현재 연애 상태 (1개 선택)
          </label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {LOVE_STATUS.map((s) => (
              <button key={s.id} type="button" onClick={() => setLoveStatus(s.id)} aria-pressed={loveStatus === s.id}
                className={`${optionBtn} justify-center ${loveStatus === s.id ? 'border-primary bg-primary/15 text-primary' : 'border-border bg-secondary/30 text-muted-foreground hover:text-foreground'}`}>
                {s.label}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground/70">이 질문은 시차 보정 정확도에 직결되므로 하나만 선택합니다.</p>
        </div>

        {/* Q3: free question */}
        <div className="mb-8">
          <label htmlFor="freeq" className="mb-3 flex items-center gap-1.5 text-base font-medium text-muted-foreground">
            <MessageCircleQuestion className="size-5" /> 특별히 궁금한 사연 (선택)
          </label>
          <textarea id="freeq" value={freeQuestion} onChange={(e) => setFreeQuestion(e.target.value.slice(0, 200))}
            placeholder="특별히 궁금한 사연이 있다면 남겨주세요 (최대 200자)"
            className="h-24 w-full resize-none rounded-lg border border-border bg-[#1e1e2e] px-3 py-2.5 text-base text-white outline-none transition-colors placeholder:text-white/40 focus:border-primary/60 focus:ring-2 focus:ring-ring/40" />
          <p className="mt-1 text-right text-sm text-muted-foreground/60">{freeQuestion.length}/200자</p>
        </div>

        {/* nav */}
        <div className="flex items-center justify-between">
          <button type="button" onClick={onBack}
            className="flex items-center gap-1.5 rounded-xl border border-border bg-secondary/40 px-5 py-3 text-base font-medium text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="size-5" /> 이전
          </button>
          <button type="button" onClick={() => onComplete({ concernAreas, loveStatus, freeQuestion, currentConcern: '' })} disabled={!canProceed}
            className="flex items-center gap-1.5 rounded-xl bg-primary px-6 py-3 text-base font-bold text-primary-foreground transition-colors hover:bg-primary/80 disabled:opacity-40">
            코스믹 스타맵 확인하기 <ArrowRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
