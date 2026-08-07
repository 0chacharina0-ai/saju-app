'use client'

import { useState } from 'react'
import { Sparkles, RotateCcw, ArrowRight } from 'lucide-react'

type TarotCard = {
  id: number
  name: string
  nameEn: string
  meaning: string
  emoji: string
}

const TAROT_DECK: TarotCard[] = [
  { id: 0, name: '바보', nameEn: 'The Fool', meaning: '새로운 시작과 순수한 도약. 두려움 없이 내딛는 첫걸음이 당신을 더 넓은 세계로 이끕니다. 예상치 못한 기회가 찾아오니 마음을 열고 받아들이세요.', emoji: '🌟' },
  { id: 1, name: '마법사', nameEn: 'The Magician', meaning: '당신에게는 이미 필요한 모든 도구가 갖춰져 있습니다. 의지와 행동이 하나가 되면 원하는 것을 현실로 만들 수 있는 강력한 시기입니다. 주도권을 쥐세요.', emoji: '✨' },
  { id: 2, name: '여사제', nameEn: 'The High Priestess', meaning: '내면의 직관이 당신을 안내합니다. 표면적으로 보이는 것 너머의 진실을 느끼는 시기입니다. 침묵 속에서 답이 들려옵니다.', emoji: '🌙' },
  { id: 3, name: '여황', nameEn: 'The Empress', meaning: '풍요와 창조의 기운이 가득합니다. 자신을 가꾸고 주변을 풍요롭게 만드는 시기입니다. 새로운 아이디어나 관계가 열매를 맺습니다.', emoji: '🌸' },
  { id: 4, name: '황제', nameEn: 'The Emperor', meaning: '안정과 구조가 필요한 시기입니다. 규칙을 세우고 책임을 지면 원하는 것을 이룰 수 있습니다. 리더십을 발휘하세요.', emoji: '👑' },
  { id: 5, name: '교황', nameEn: 'The Hierophant', meaning: '전통과 가르침이 당신을 돕습니다. 멘토나 선배의 조언이 귀중한 열쇠가 됩니다. 배움의 자세를 가지세요.', emoji: '📖' },
  { id: 6, name: '연인', nameEn: 'The Lovers', meaning: '선택과 끌림의 카드. 중요한 관계의 갈림길에 서 있습니다. 마음이 가는 쪽으로 진실하게 선택하세요. 진심이 닿는 인연이 가까워집니다.', emoji: '💕' },
  { id: 7, name: '전차', nameEn: 'The Chariot', meaning: '강한 추진력과 승리의 기운. 장애물을 돌파할 힘이 있습니다. 방향을 정하고 밀고 나가면 반드시 결과가 따라옵니다.', emoji: '🏆' },
  { id: 8, name: '힘', nameEn: 'Strength', meaning: '부드러운 힘이 강한 힘을 이깁니다. 인내와 자제력이 상황을 유리하게 바꿉니다. 감정을 다스리면 승리합니다.', emoji: '🦁' },
  { id: 9, name: '은둔자', nameEn: 'The Hermit', meaning: '혼자만의 시간이 답을 가져다줍니다. 외부의 소음에서 벗어나 내면의 등불을 켜는 시기입니다. 깊은 성찰이 깨달음으로 이어집니다.', emoji: '🏮' },
  { id: 10, name: '운명의 수레바퀴', nameEn: 'Wheel of Fortune', meaning: '변화의 바퀴가 돌아갑니다. 기다리던 전환점이 찾아오니 흐름에 몸을 맡기되 준비된 상태로 맞이하세요. 행운이 당신 편입니다.', emoji: '🎡' },
  { id: 11, name: '정의', nameEn: 'Justice', meaning: '공정과 균형의 카드. 노력한 만큼 결과가 따라옵니다. 정직한 선택이 장기적으로 가장 유리합니다. 마음의 저울을 신뢰하세요.', emoji: '⚖️' },
  { id: 12, name: '매달린 사람', nameEn: 'The Hanged Man', meaning: '잠시 멈춤이 필요한 시기. 관점을 바꾸면 답이 보입니다. 기다림이 허비가 아니라 준비의 시간임을 기억하세요.', emoji: '🔄' },
  { id: 13, name: '죽음', nameEn: 'Death', meaning: '끝이 아닌 변화의 카드. 낡은 것을 놓아야 새것이 들어옵니다. 두려워 말고 변화를 받아들이면 새로운 문이 열립니다.', emoji: '🦋' },
  { id: 14, name: '절제', nameEn: 'Temperance', meaning: '조화와 균형의 시기. 극단을 피하고 중도를 지키면 최선의 결과가 나옵니다. 천천히 섞어가며 완성하세요.', emoji: '🕊️' },
  { id: 15, name: '악마', nameEn: 'The Devil', meaning: '집착이나 유혹에 주의. 무엇에 매여 있는지 돌아보세요. 자유의지를 되찾으면 굴레를 벗어날 수 있습니다. 솔직한 자기 점검이 필요합니다.', emoji: '🔗' },
  { id: 16, name: '탑', nameEn: 'The Tower', meaning: '갑작스러운 변화. 견고하던 것이 흔들릴 수 있지만 이는 더 나은 토대를 세우기 위한 정리입니다. 충격 뒤에 해방이 옵니다.', emoji: '🗼' },
  { id: 17, name: '별', nameEn: 'The Star', meaning: '희망과 영감의 카드. 어둠 속에서도 빛은 존재합니다. 마음을 열면 치유와 방향이 보입니다. 소망을 잃지 마세요.', emoji: '⭐' },
  { id: 18, name: '달', nameEn: 'The Moon', meaning: '불확실과 환상의 시기. 감정이 출렁이니 충동적 결정을 피하세요. 시간이 지나면 진실이 드러납니다. 직관과 이성의 균형이 필요합니다.', emoji: '🌕' },
  { id: 19, name: '태양', nameEn: 'The Sun', meaning: '기쁨과 성공의 카드. 빛이 가득하고 모든 것이 순조롭게 흘러갑니다. 자신감을 가지고 앞으로 나아가세요. 환하게 웃을 수 있는 날입니다.', emoji: '☀️' },
  { id: 20, name: '심판', nameEn: 'Judgement', meaning: '새로운 각성과 부활의 카드. 과거를 정리하고 새로운 단계로 올라서는 시기입니다. 내면의 부름에 응답하세요.', emoji: '📯' },
  { id: 21, name: '세계', nameEn: 'The World', meaning: '완성과 성취의 카드. 한 단계의 여정이 원만히 마무리됩니다. 충만한 기쁨과 함께 다음 여정의 문이 열립니다. 축하받을 시기입니다.', emoji: '🌍' },
]

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

export default function FreeTarotPage() {
  const [phase, setPhase] = useState<'spread-select' | 'intro' | 'revealing' | 'result'>('spread-select')
  const [selectedSpread, setSelectedSpread] = useState<SpreadConfig | null>(null)
  const [question, setQuestion] = useState('')
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([])
  const [flippedIndices, setFlippedIndices] = useState<number[]>([])

  const pickSpread = (spread: SpreadConfig) => {
    setSelectedSpread(spread)
    setPhase('intro')
  }

  const shuffleAndDraw = () => {
    if (!selectedSpread) return
    const shuffled = [...TAROT_DECK].sort(() => Math.random() - 0.5)
    const drawn = shuffled.slice(0, selectedSpread.count)
    setSelectedCards(drawn)
    setFlippedIndices([])
    setPhase('revealing')
  }

  const flipCard = (index: number) => {
    if (!flippedIndices.includes(index)) {
      const newFlipped = [...flippedIndices, index]
      setFlippedIndices(newFlipped)
      if (newFlipped.length >= (selectedSpread?.count ?? 3)) {
        setTimeout(() => setPhase('result'), 600)
      }
    }
  }

  const reset = () => {
    setPhase('spread-select')
    setSelectedSpread(null)
    setQuestion('')
    setSelectedCards([])
    setFlippedIndices([])
  }

  return (
    <main className="relative min-h-screen">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 opacity-40 [background:radial-gradient(ellipse_at_top_left,var(--primary)_0%,transparent_45%),radial-gradient(ellipse_at_bottom_right,var(--accent)_0%,transparent_50%)]" />

      <section className="mx-auto max-w-2xl scroll-mt-20 px-6 py-20 pt-4">
        <div className="mb-8 text-center">
          <Sparkles className="mx-auto size-10 text-primary" />
          <p className="mt-2 font-display text-xs font-semibold tracking-[0.35em] text-primary uppercase">Free Tarot Reading</p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">무료 타로 — 마음의 거울</h2>
          <p className="mt-3 break-keep text-sm text-muted-foreground">마음속에 떠오르는 질문을 가만히 떠올리며, 카드를 한 장씩 뒤집어보세요. 타로는 맞춤보다 거울처럼 내 마음을 비춰주는 도구예요.</p>
          <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-3 text-left">
            <p className="break-keep text-xs leading-relaxed text-primary/90">근미래(3개월 이내)의 구체적인 고민을 떠올릴 때 가장 잘 답해줘요. "이직할까?" "그 사람 속마음은?" 같은 질문이 좋아요.</p>
          </div>
        </div>

        {phase === 'spread-select' && (
          <div className="space-y-4">
            {SPREADS.map((spread) => (
              <button
                key={spread.type}
                type="button"
                onClick={() => pickSpread(spread)}
                className="glass flex w-full items-center gap-4 rounded-2xl p-5 text-left transition-all hover:border-primary/40 hover:bg-primary/5"
              >
                <div className="flex size-14 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10">
                  <span className="text-2xl font-bold text-primary">{spread.count}</span>
                </div>
                <div className="flex-1">
                  <p className="text-base font-bold text-foreground">{spread.label}</p>
                  <p className="mt-0.5 break-keep text-sm text-muted-foreground">{spread.desc}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {spread.positions.map((pos) => (
                      <span key={pos} className="rounded-full border border-border bg-secondary/30 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">{pos}</span>
                    ))}
                  </div>
                </div>
                <ArrowRight className="size-5 shrink-0 text-muted-foreground/50" />
              </button>
            ))}
          </div>
        )}

        {phase === 'intro' && selectedSpread && (
          <div className="glass rounded-3xl p-6 sm:p-8 text-center">
            <div className="mb-4 rounded-xl border border-primary/20 bg-primary/5 p-3">
              <p className="text-sm font-bold text-primary">{selectedSpread.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{selectedSpread.desc}</p>
            </div>
            <div className="mb-6 space-y-4">
              <label className="block text-sm font-medium text-muted-foreground">궁금한 질문을 떠올려보세요 (선택)</label>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="예: 3개월 안에 이직할 수 있을까요? / 그 사람의 요즘 속마음은?"
                className="w-full rounded-lg border border-border bg-[#1e1e2e] px-3 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/40 focus:border-primary/60 focus:ring-2 focus:ring-ring/40"
              />
            </div>
            <div className="mb-6 text-6xl">🃏</div>
            <p className="mb-6 break-keep text-sm text-muted-foreground">마음을 가라앉히고 질문에 집중한 뒤 카드를 섞어보세요.</p>
            <button
              type="button"
              onClick={shuffleAndDraw}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground transition-all hover:bg-primary/80 hover:shadow-lg"
            >
              <Sparkles className="size-5" /> 카드 섞기
            </button>
          </div>
        )}

        {phase === 'revealing' && selectedSpread && (
          <div className="glass rounded-3xl p-6 sm:p-8">
            <p className="mb-6 text-center text-sm font-medium text-muted-foreground">카드를 한 장씩 뒤집어보세요 ({flippedIndices.length}/{selectedSpread.count})</p>
            <div className={`grid gap-4 sm:gap-6 ${selectedSpread.count === 1 ? 'grid-cols-1 max-w-xs mx-auto' : selectedSpread.count === 3 ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'}`}>
              {selectedCards.map((card, i) => {
                const isFlipped = flippedIndices.includes(i)
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => flipCard(i)}
                    disabled={isFlipped}
                    className="group relative aspect-[2/3] [perspective:1000px]"
                  >
                    <div
                      className={`relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center rounded-2xl border-2 border-primary/40 bg-gradient-to-br from-primary/20 via-accent/10 to-background [backface-visibility:hidden]">
                        <span className="font-serif text-4xl text-primary/60">별</span>
                      </div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border-2 border-primary/60 bg-gradient-to-br from-primary/10 to-accent/5 p-4 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                        <span className="text-4xl">{card.emoji}</span>
                        <p className="mt-2 text-sm font-bold text-foreground">{card.name}</p>
                        <p className="text-xs text-muted-foreground">{selectedSpread.positions[i]}</p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {phase === 'result' && selectedSpread && selectedCards.length === selectedSpread.count && (
          <div className="space-y-6">
            {question && (
              <div className="glass rounded-2xl p-4 text-center">
                <p className="text-xs text-muted-foreground">질문</p>
                <p className="mt-1 text-sm font-medium text-foreground">{question}</p>
              </div>
            )}

            {selectedCards.map((card, i) => (
              <div key={i} className="glass rounded-3xl p-6 sm:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 text-sm font-bold text-primary">{selectedSpread.positions[i]}</span>
                  <div>
                    <p className="text-sm font-bold text-foreground">{card.name} ({card.nameEn})</p>
                    <p className="text-xs text-muted-foreground">{card.emoji}</p>
                  </div>
                </div>
                <p className="break-keep text-base leading-relaxed text-slate-200">{card.meaning}</p>
              </div>
            ))}

            <div className="glass rounded-2xl p-5 text-center">
              <p className="break-keep text-sm leading-relaxed text-muted-foreground">
                타로는 마음의 거울이에요. 결과에 얽매이기보다, 카드가 비춰준 통찰을 삶의 나침반으로 활용해보세요. 더 깊은 인생의 흐름이 궁금하다면, 정밀 사주 분석에서 만나볼 수 있어요.
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button type="button" onClick={reset} className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/50 bg-primary/10 px-6 py-3 text-sm font-semibold transition-colors hover:bg-primary/20">
                  <RotateCcw className="size-4" /> 다시 뽑기
                </button>
                <a href="/#saju-form" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/80">
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
