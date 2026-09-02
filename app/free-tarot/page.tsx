'use client'

import { useState } from 'react'
import { Sparkles, RotateCcw, ArrowRight, Check, Heart, Briefcase, Coins, HelpCircle } from 'lucide-react'
import { CosmicBackground } from '@/components/cosmic-background'
import { TAROT_DECK, TarotCardBack, TarotCardFront, TarotCardFlip, type TarotCardData } from '@/components/tarot-card'

export type TarotTheme = {
  id: string
  title: string
  subtitle: string
  count: number
  icon: React.ElementType
  guideQuestions: string[]
  positions: string[]
}

const TAROT_THEMES: TarotTheme[] = [
  {
    id: 'daily',
    title: '오늘의 우주 기운',
    subtitle: '오늘 나에게 필요한 기운과 찰나의 메시지 (1장)',
    count: 1,
    icon: Sparkles,
    guideQuestions: ['"오늘 나에게 필요한 주도적인 마음가짐은?"', '"오늘 어떤 직관을 믿어야 할까?"'],
    positions: ['오늘의 메시지'],
  },
  {
    id: 'love',
    title: '연애 & 인연의 궤도',
    subtitle: '그 사람의 속마음과 우리 관계의 미래 흐름 (3장)',
    count: 3,
    icon: Heart,
    guideQuestions: ['"그 사람은 나를 어떻게 생각하고 있을까?"', '"우리의 과거, 현재, 그리고 미래 흐름은?"'],
    positions: ['과거의 흐름', '현재의 마음', '미래의 궤도'],
  },
  {
    id: 'career',
    title: '커리어 & 성공의 도약',
    subtitle: '이직, 직장 고민, 그리고 성취의 가능성 (3장)',
    count: 3,
    icon: Briefcase,
    guideQuestions: ['"지금 이직이나 선택을 해도 괜찮을까?"', '"내가 직면한 장애물과 해결 결과는?"'],
    positions: ['현재 상황', '장애물/변수', '최종 결과'],
  },
  {
    id: 'wealth',
    title: '재물 & 운명의 오디세이',
    subtitle: '막힌 상황을 뚫어줄 5장의 심층 우주 리포트 (5장)',
    count: 5,
    icon: Coins,
    guideQuestions: ['"재물운의 흐름과 해결 방향이 궁금할 때"', '"복잡하게 꼬인 문제를 근본적으로 풀고 싶을 때"'],
    positions: ['현재 상황', '핵심 원인', '외부 영향', '해결 방향', '최종 조언'],
  },
]

/** Fisher–Yates shuffle returning a new array */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function FreeTarotPage() {
  const [phase, setPhase] = useState<'spread-select' | 'intro' | 'selecting' | 'result'>('spread-select')
  const [selectedTheme, setSelectedTheme] = useState<TarotTheme | null>(null)
  const [question, setQuestion] = useState('')
  const [gridCards, setGridCards] = useState<TarotCardData[]>([])
  const [selectedIndices, setSelectedIndices] = useState<number[]>([])

  const pickTheme = (theme: TarotTheme) => {
    setSelectedTheme(theme)
    setPhase('intro')
  }

  const startSelection = () => {
    if (!selectedTheme) return
    // Shuffle the full 22-card deck and show 9 face-down cards
    const shuffled = shuffle(TAROT_DECK).slice(0, 9)
    setGridCards(shuffled)
    setSelectedIndices([])
    setPhase('selecting')
  }

  const toggleCard = (index: number) => {
    if (!selectedTheme) return
    setSelectedIndices((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index)
      }
      if (prev.length >= selectedTheme.count) {
        return prev
      }
      return [...prev, index]
    })
  }

  const revealResult = () => {
    setPhase('result')
  }

  const reset = () => {
    setPhase('spread-select')
    setSelectedTheme(null)
    setQuestion('')
    setGridCards([])
    setSelectedIndices([])
  }

  return (
    <main className="cosmic-bg">
      <CosmicBackground />

      <section className="cosmic-section mx-auto max-w-3xl scroll-mt-20">
        <div className="cosmic-header cosmic-anim mb-12">
          <Sparkles className="cosmic-icon text-primary" />
          <span className="cosmic-eyebrow">Free Tarot Reading</span>
          <h2 className="cosmic-title">무료 타로 — 마음의 거울</h2>
          <p className="cosmic-subtitle">
            마음속 고민 테마를 선택하고 운명의 카드를 직접 골라보세요. 타로는 거울처럼 내 마음의 답을 비춰주는 도구예요.
          </p>
          <div className="cosmic-result-section mt-6 text-left">
            <p className="break-keep text-sm leading-relaxed text-primary/90">
              근미래(3개월 이내)의 구체적인 고민을 떠올릴 때 가장 잘 답해줘요. &ldquo;이직할까?&rdquo; &ldquo;그 사람 속마음은?&rdquo; 같은 질문이 좋아요.
            </p>
          </div>
        </div>

        {/* ===== Phase 1: Theme selection ===== */}
        {phase === 'spread-select' && (
          <div className="space-y-4 cosmic-anim cosmic-anim-1">
            {TAROT_THEMES.map((theme) => {
              const IconComponent = theme.icon
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => pickTheme(theme)}
                  className="cosmic-card flex w-full items-center gap-4 p-5 text-left transition-all hover:border-primary/40"
                >
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                    <IconComponent className="size-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-base font-bold text-foreground">{theme.title}</p>
                      <span className="cosmic-badge" style={{ fontSize: '0.65rem' }}>
                        {theme.count}장 뽑기
                      </span>
                    </div>
                    <p className="mt-1 break-keep text-sm text-muted-foreground">{theme.subtitle}</p>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {theme.positions.map((pos) => (
                        <span key={pos} className="cosmic-badge bg-secondary/60 text-muted-foreground" style={{ fontSize: '0.7rem' }}>
                          {pos}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowRight className="size-5 shrink-0 text-muted-foreground/50" />
                </button>
              )
            })}
          </div>
        )}

        {/* ===== Phase 2: Intro (question input & recommendation) ===== */}
        {phase === 'intro' && selectedTheme && (
          <div className="cosmic-card cosmic-anim p-6 sm:p-8 text-center">
            <div className="cosmic-result-section mb-6 text-center" style={{ marginTop: 0 }}>
              <p className="text-sm font-bold text-primary">{selectedTheme.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{selectedTheme.subtitle}</p>
            </div>

            {/* 추천 질문 가이드 */}
            <div className="mb-6 rounded-xl border border-primary/20 bg-primary/5 p-4 text-left">
              <div className="flex items-center gap-2 text-xs font-bold text-primary">
                <HelpCircle className="size-4" />
                <span>추천 질문 가이드</span>
              </div>
              <div className="mt-2 flex flex-col gap-1.5 text-xs text-muted-foreground">
                {selectedTheme.guideQuestions.map((gq, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setQuestion(gq.replace(/"/g, ''))}
                    className="text-left hover:text-primary transition-colors cursor-pointer"
                  >
                    • {gq} <span className="text-[10px] text-primary/70">(클릭해서 입력)</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6 space-y-4">
              <label className="cosmic-label justify-center">궁금한 질문을 떠올려 보세요 (선택)</label>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="예: 그 사람의 요즘 속마음은? / 3개월 안에 이직할 수 있을까요?"
                className="cosmic-input"
              />
            </div>

            {/* Preview of card back */}
            <div className="mx-auto mb-6 aspect-[2/3] w-28">
              <TarotCardBack />
            </div>

            <p className="mb-6 break-keep text-sm text-muted-foreground">
              마음을 가라앉히고 질문에 집중한 뒤 카드를 섞어 보세요.
            </p>
            <button type="button" onClick={startSelection} className="cosmic-btn">
              <Sparkles className="size-5" /> 카드 섞기
            </button>
          </div>
        )}

        {/* ===== Phase 3: Card selection (9-card grid) ===== */}
        {phase === 'selecting' && selectedTheme && gridCards.length === 9 && (
          <div className="cosmic-card cosmic-anim p-5 sm:p-8">
            {/* Progress + instructions */}
            <div className="mb-6 text-center">
              <p className="break-keep text-sm font-medium text-foreground">
                9장의 카드 중 <span className="text-primary font-bold">{selectedTheme.count}장</span>을 선택하세요
              </p>
              <div className="mt-3 flex items-center justify-center gap-2">
                {Array.from({ length: selectedTheme.count }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-bold transition-all ${
                      i < selectedIndices.length
                        ? 'border-primary bg-primary/20 text-primary'
                        : 'border-border bg-secondary/30 text-muted-foreground/40'
                    }`}
                  >
                    {i < selectedIndices.length ? <Check className="size-3.5" /> : i + 1}
                  </div>
                ))}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {selectedIndices.length < selectedTheme.count
                  ? `${selectedTheme.count - selectedIndices.length}장 더 선택할 수 있어요`
                  : '모든 카드를 선택했습니다. 결과를 확인하세요'}
              </p>
            </div>

            {/* 3×3 grid of face-down cards */}
            <div className="mx-auto grid max-w-lg grid-cols-3 gap-3 sm:gap-4">
              {gridCards.map((card, i) => {
                const isSelected = selectedIndices.includes(i)
                const maxReached = selectedIndices.length >= selectedTheme.count
                return (
                  <div key={i} className="relative">
                    {/* Selection order badge */}
                    {isSelected && (
                      <div className="absolute -top-2 -right-2 z-20 flex size-6 items-center justify-center rounded-full border-2 border-[#030307] bg-primary text-xs font-bold text-primary-foreground shadow-lg">
                        {selectedIndices.indexOf(i) + 1}
                      </div>
                    )}
                    <TarotCardFlip
                      card={card}
                      selected={isSelected}
                      disabled={maxReached && !isSelected}
                      onClick={() => toggleCard(i)}
                    />
                  </div>
                )
              })}
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button type="button" onClick={() => setSelectedIndices([])} className="cosmic-btn-secondary">
                <RotateCcw className="size-4" /> 선택 초기화
              </button>
              <button
                type="button"
                onClick={revealResult}
                disabled={selectedIndices.length < selectedTheme.count}
                className="cosmic-btn disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Sparkles className="size-5" /> 결과 보기
              </button>
            </div>
          </div>
        )}

        {/* ===== Phase 4: Results ===== */}
        {phase === 'result' && selectedTheme && gridCards.length === 9 && (
          <div className="space-y-6 cosmic-anim">
            {question && (
              <div className="cosmic-card p-4 text-center">
                <p className="text-xs text-muted-foreground">질문 ({selectedTheme.title})</p>
                <p className="mt-1 text-sm font-medium text-foreground">{question}</p>
              </div>
            )}

            {selectedIndices.map((gridIdx, i) => {
              const card = gridCards[gridIdx]
              if (!card) return null
              return (
                <div key={i} className="cosmic-card overflow-hidden">
                  {/* Card visual + meaning */}
                  <div className="flex flex-col sm:flex-row">
                    {/* Card front illustration */}
                    <div className="mx-auto aspect-[2/3] w-32 shrink-0 p-4 sm:w-36 sm:p-6">
                      <TarotCardFront card={card} position={selectedTheme.positions[i]} />
                    </div>
                    {/* Meaning text */}
                    <div className="flex flex-1 flex-col justify-center p-4 sm:p-6 sm:pl-2">
                      <div className="mb-3 flex items-center gap-2">
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 text-xs font-bold text-primary">
                          {i + 1}
                        </span>
                        <div>
                          <p className="text-sm font-bold text-foreground">
                            {card.name} ({card.nameEn})
                          </p>
                          <p className="text-xs text-muted-foreground">{selectedTheme.positions[i]}</p>
                        </div>
                      </div>
                      <p className="break-keep text-sm leading-relaxed text-foreground/85">{card.meaning}</p>
                    </div>
                  </div>
                </div>
              )
            })}

            <div className="cosmic-card p-5 text-center">
              <p className="break-keep text-sm leading-relaxed text-muted-foreground">
                타로는 마음의 거울이에요. 결과에 얽매이기보다 카드가 비춰준 통찰을 삶의 나침반으로 활용해 보세요. 더 깊은 인생의 흐름이 궁금하다면 정밀 사주 분석에서 만나볼 수 있어요.
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button type="button" onClick={reset} className="cosmic-btn-secondary">
                  <RotateCcw className="size-4" /> 다시 뽑기
                </button>
                <a href="/#saju-form" className="cosmic-btn">
                  정밀 사주 분석하기 <ArrowRight className="size-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}