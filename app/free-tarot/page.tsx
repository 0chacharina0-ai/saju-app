'use client'

import { useState } from 'react'
import { Sparkles, RotateCcw, ArrowRight, Check } from 'lucide-react'
import { CosmicBackground } from '@/components/cosmic-background'
import { TAROT_DECK, TarotCardBack, TarotCardFront, TarotCardFlip, type TarotCardData } from '@/components/tarot-card'

type SpreadType = 'single' | 'three' | 'five'

type SpreadConfig = {
  type: SpreadType
  count: number
  label: string
  desc: string
  positions: string[]
}

const SPREADS: SpreadConfig[] = [
  { type: 'single', count: 1, label: '1장 뽑기', desc: '오늘의 운세 · Yes or No', positions: ['오늘의 기운'] },
  { type: 'three', count: 3, label: '3장 뽑기', desc: '과거 · 현재 · 미래', positions: ['과거', '현재', '미래'] },
  { type: 'five', count: 5, label: '5장 뽑기', desc: '깊은 고민 해결 & 조언', positions: ['현재 상황', '핵심 원인', '외부 영향', '해결 방향', '최종 조언'] },
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
  const [selectedSpread, setSelectedSpread] = useState<SpreadConfig | null>(null)
  const [question, setQuestion] = useState('')
  const [gridCards, setGridCards] = useState<TarotCardData[]>([])
  const [selectedIndices, setSelectedIndices] = useState<number[]>([])

  const pickSpread = (spread: SpreadConfig) => {
    setSelectedSpread(spread)
    setPhase('intro')
  }

  const startSelection = () => {
    if (!selectedSpread) return
    // Shuffle the full 22-card deck and show 9 face-down cards
    const shuffled = shuffle(TAROT_DECK).slice(0, 9)
    setGridCards(shuffled)
    setSelectedIndices([])
    setPhase('selecting')
  }

  const toggleCard = (index: number) => {
    if (!selectedSpread) return
    setSelectedIndices((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index)
      }
      if (prev.length >= selectedSpread.count) {
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
    setSelectedSpread(null)
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
          <p className="cosmic-subtitle">마음속에 떠오르는 질문을 가만히 떠올리며 9장의 카드 중 운명의 카드를 직접 골라보세요. 타로는 맞춤보다 거울처럼 내 마음을 비춰주는 도구예요.</p>
          <div className="cosmic-result-section mt-6 text-left">
            <p className="break-keep text-sm leading-relaxed text-primary/90">근미래(3개월 이내)의 구체적인 고민을 떠올릴 때 가장 잘 답해줘요. &ldquo;이직할까?&rdquo; &ldquo;그 사람 속마음은?&rdquo; 같은 질문이 좋아요.</p>
          </div>
        </div>

        {/* ===== Phase 1: Spread selection ===== */}
        {phase === 'spread-select' && (
          <div className="space-y-4 cosmic-anim cosmic-anim-1">
            {SPREADS.map((spread) => (
              <button
                key={spread.type}
                type="button"
                onClick={() => pickSpread(spread)}
                className="cosmic-card flex w-full items-center gap-4 p-5 text-left transition-all hover:border-primary/40"
              >
                <div className="flex size-14 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10">
                  <span className="text-2xl font-bold text-primary">{spread.count}</span>
                </div>
                <div className="flex-1">
                  <p className="text-base font-bold text-foreground">{spread.label}</p>
                  <p className="mt-0.5 break-keep text-sm text-muted-foreground">{spread.desc}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {spread.positions.map((pos) => (
                      <span key={pos} className="cosmic-badge" style={{ fontSize: '0.7rem' }}>{pos}</span>
                    ))}
                  </div>
                </div>
                <ArrowRight className="size-5 shrink-0 text-muted-foreground/50" />
              </button>
            ))}
          </div>
        )}

        {/* ===== Phase 2: Intro (question input) ===== */}
        {phase === 'intro' && selectedSpread && (
          <div className="cosmic-card cosmic-anim p-6 sm:p-8 text-center">
            <div className="cosmic-result-section mb-6 text-center" style={{ marginTop: 0 }}>
              <p className="text-sm font-bold text-primary">{selectedSpread.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{selectedSpread.desc}</p>
            </div>
            <div className="mb-6 space-y-4">
              <label className="cosmic-label justify-center">궁금한 질문을 떠올려 보세요 (선택)</label>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="예: 3개월 안에 이직할 수 있을까요? / 그 사람의 요즘 속마음은?"
                className="cosmic-input"
              />
            </div>

            {/* Preview of card back */}
            <div className="mx-auto mb-6 aspect-[2/3] w-28">
              <TarotCardBack />
            </div>

            <p className="mb-6 break-keep text-sm text-muted-foreground">마음을 가라앉히고 질문에 집중한 뒤 카드를 섞어 보세요.</p>
            <button type="button" onClick={startSelection} className="cosmic-btn">
              <Sparkles className="size-5" /> 카드 섞기
            </button>
          </div>
        )}

        {/* ===== Phase 3: Card selection (9-card grid) ===== */}
        {phase === 'selecting' && selectedSpread && gridCards.length === 9 && (
          <div className="cosmic-card cosmic-anim p-5 sm:p-8">
            {/* Progress + instructions */}
            <div className="mb-6 text-center">
              <p className="break-keep text-sm font-medium text-foreground">
                9장의 카드 중 <span className="text-primary font-bold">{selectedSpread.count}장</span>을 선택하세요
              </p>
              <div className="mt-3 flex items-center justify-center gap-2">
                {Array.from({ length: selectedSpread.count }).map((_, i) => (
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
                {selectedIndices.length < selectedSpread.count
                  ? `${selectedSpread.count - selectedIndices.length}장 더 선택할 수 있어요`
                  : '모든 카드를 선택했습니다. 결과를 확인하세요'}
              </p>
            </div>

            {/* 3×3 grid of face-down cards */}
            <div className="mx-auto grid max-w-lg grid-cols-3 gap-3 sm:gap-4">
              {gridCards.map((card, i) => {
                const isSelected = selectedIndices.includes(i)
                const maxReached = selectedIndices.length >= selectedSpread.count
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
              <button type="button" onClick={() => { setSelectedIndices([]) }} className="cosmic-btn-secondary">
                <RotateCcw className="size-4" /> 선택 초기화
              </button>
              <button
                type="button"
                onClick={revealResult}
                disabled={selectedIndices.length < selectedSpread.count}
                className="cosmic-btn disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Sparkles className="size-5" /> 결과 보기
              </button>
            </div>
          </div>
        )}

        {/* ===== Phase 4: Results ===== */}
        {phase === 'result' && selectedSpread && gridCards.length === 9 && (
          <div className="space-y-6 cosmic-anim">
            {question && (
              <div className="cosmic-card p-4 text-center">
                <p className="text-xs text-muted-foreground">질문</p>
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
                      <TarotCardFront card={card} position={selectedSpread.positions[i]} />
                    </div>
                    {/* Meaning text */}
                    <div className="flex flex-1 flex-col justify-center p-4 sm:p-6 sm:pl-2">
                      <div className="mb-3 flex items-center gap-2">
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 text-xs font-bold text-primary">
                          {i + 1}
                        </span>
                        <div>
                          <p className="text-sm font-bold text-foreground">{card.name} ({card.nameEn})</p>
                          <p className="text-xs text-muted-foreground">{selectedSpread.positions[i]}</p>
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
