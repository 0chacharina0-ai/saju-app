'use client'

import { useState, useEffect } from 'react'
import { Sun, Sparkles, RotateCcw, ArrowRight, Star, TrendingUp, Heart, Coins, Shield } from 'lucide-react'

const YEARS = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1)
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1)

type DailyFortune = {
  overall: number
  luck: string
  caution: string
  bestTime: string
  worstTime: string
  color: string
  number: number
  direction: string
  advice: string
  love: string
  wealth: string
  health: string
}

const FORTUNE_POOL: DailyFortune[] = [
  {
    overall: 85, luck: '오늘은 새로운 기운이 들어오는 날입니다. 시작하는 일이 순조롭게 흘러갑니다.',
    caution: '너무 빠른 속도에 휩쓸리지 마세요. 한 박자 쉬는 것이 더 큰 성과를 만듭니다.',
    bestTime: '오전 10시 ~ 12시', worstTime: '오후 3시 ~ 5시',
    color: '연두색', number: 3, direction: '동쪽',
    advice: '오늘은 새로운 사람에게 먼저 다가가세요. 작은 인사가 큰 인연의 시작이 됩니다.',
    love: '솔로라면 오늘 만나는 사람에게 마음을 열어보세요. 연애 중이라면 작은 이벤트가 관계를 깊게 만듭니다.',
    wealth: '작은 투자나 새로운 아이디어가 긍정적 신호를 보냅니다. 다만 큰 금액은 내일로 미루세요.',
    health: '에너지가 충만한 날입니다. 가벼운 운동이나 산책이 효과가 좋습니다.',
  },
  {
    overall: 72, luck: '안정의 기운이 흐르지만 약간의 정체감이 있을 수 있습니다. 기다림이 필요한 날입니다.',
    caution: '조급함이 가장 큰 적입니다. 서두르지 말고 한 걸음씩 나아가세요.',
    bestTime: '오후 1시 ~ 3시', worstTime: '오전 7시 ~ 9시',
    color: '네이비', number: 6, direction: '북쪽',
    advice: '오늘은 정리하는 날입니다. 책상을 정리하고 마음을 정돈하면 내일의 방향이 보입니다.',
    love: '관계에서 약간의 거리감이 있을 수 있습니다. 다급하게 다가가지 말고 자연스럽게 기다리세요.',
    wealth: '지출이 예상되는 날입니다. 충동구매를 피하고 필요한 것만 구입하세요.',
    health: '소화기가 약간 예민합니다. 자극적인 음식을 피하고 따뜻한 차를 드세요.',
  },
  {
    overall: 90, luck: '오늘은 빛이 가득한 날입니다. 기다리던 소식이나 기회가 찾아올 수 있습니다.',
    caution: '기쁨에 겨워 약속을 너무 많이 잡지 마세요. 에너지를 아껴두는 것이 중요합니다.',
    bestTime: '오전 9시 ~ 11시', worstTime: '밤 10시 이후',
    color: '주황색', number: 7, direction: '남쪽',
    advice: '오늘은 빛나야 할 자리에 가세요. 발표나 미팅이 있다면 자신감을 가지고 임하세요.',
    love: '가장 빛나는 날입니다. 솔로라면 새로운 만남의 기운이 강하고 연애 중이라면 관계가 한층 깊어집니다.',
    wealth: '재물의 기운이 강합니다. 다만 들어오는 돈보다 나가는 돈을 먼저 점검하세요.',
    health: '활기가 넘치는 날입니다. 야외 활동이나 운동이 에너지를 더해줍니다.',
  },
  {
    overall: 65, luck: '내면을 돌보는 날입니다. 바쁜 일상에서 잠시 멈춰 자신을 점검하는 시간이 필요합니다.',
    caution: '감정이 출렁일 수 있습니다. 중요한 결정은 내일로 미루는 것이 안전합니다.',
    bestTime: '저녁 7시 ~ 9시', worstTime: '오전 8시 ~ 10시',
    color: '보라색', number: 2, direction: '서쪽',
    advice: '오늘은 혼자만의 시간을 가지세요. 명상이나 독서가 마음을 안정시킵니다.',
    love: '감정이 예민한 날입니다. 다툼을 피하고 부드러운 말을 쓰세요. 솔로라면 하루를 조용히 보내는 것이 좋습니다.',
    wealth: '금전적 결정을 미루는 것이 유리합니다. 오늘은 관찰만 하고 행동은 내일로.',
    health: '수면이 부족할 수 있습니다. 일찍 자고 충분히 쉬세요. 물을 자주 드세요.',
  },
  {
    overall: 78, luck: '균형의 기운이 흐릅니다. 일과 휴식의 균형을 잡으면 하루가 안정적으로 흘러갑니다.',
    caution: '한 가지에 너무 몰두하면 다른 것을 놓칠 수 있습니다. 균형이 오늘의 핵심입니다.',
    bestTime: '오후 2시 ~ 4시', worstTime: '새벽 1시 ~ 3시',
    color: '베이지', number: 5, direction: '중앙',
    advice: '오늘은 규칙을 지키세요. 식사 시간 수면 시간 약속 시간을 정해두면 하루가 안정됩니다.',
    love: '안정적인 관계가 더 깊어지는 날입니다. 기혼이라면 배우자와 따뜻한 대화를 나누세요.',
    wealth: '안정적인 자산 관리가 유리한 날입니다. 장기 투자를 점검해보세요.',
    health: '위장이 안정되는 날입니다. 규칙적 식사가 가장 중요합니다.',
  },
]

export default function DailyFortunePage() {
  const [fortune, setFortune] = useState<DailyFortune | null>(null)
  const [birthYear, setBirthYear] = useState('')
  const [birthMonth, setBirthMonth] = useState('')
  const [birthDay, setBirthDay] = useState('')
  const [date] = useState(() => {
    const d = new Date()
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`
  })

  useEffect(() => {
    const saved = localStorage.getItem('daily-fortune-birth')
    if (saved) {
      try {
        const { y, m, d } = JSON.parse(saved)
        setBirthYear(String(y))
        setBirthMonth(String(m))
        setBirthDay(String(d))
      } catch { /* ignore */ }
    }
  }, [])

  const drawFortune = () => {
    if (birthYear && birthMonth && birthDay) {
      localStorage.setItem('daily-fortune-birth', JSON.stringify({ y: birthYear, m: birthMonth, d: birthDay }))
    }
    const idx = Math.floor(Math.random() * FORTUNE_POOL.length)
    setFortune(FORTUNE_POOL[idx])
  }

  const scoreColor = (s: number) => s >= 85 ? 'text-emerald-400' : s >= 70 ? 'text-amber-400' : 'text-rose-400'
  const scoreBg = (s: number) => s >= 85 ? 'from-emerald-500 to-green-500' : s >= 70 ? 'from-amber-500 to-yellow-500' : 'from-rose-500 to-red-500'

  return (
    <main className="relative min-h-screen">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 opacity-40 [background:radial-gradient(ellipse_at_top_left,var(--primary)_0%,transparent_45%),radial-gradient(ellipse_at_bottom_right,var(--accent)_0%,transparent_50%)]" />

      <section className="mx-auto max-w-2xl scroll-mt-20 px-6 py-20 pt-4">
        <div className="mb-8 text-center">
          <Sun className="mx-auto size-10 text-primary" />
          <p className="mt-2 font-display text-xs font-semibold tracking-[0.35em] text-primary uppercase">Daily Fortune</p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">오늘의 운세 & 일상 개운법</h2>
          <p className="mt-3 break-keep text-sm text-muted-foreground">오늘 하루 나를 둘러싼 오행의 흐름과 일일 운세를 확인해 보세요.</p>
        </div>

        {!fortune ? (
          <div className="glass rounded-3xl p-6 sm:p-8 text-center">
            <div className="mb-6 text-6xl">☀️</div>
            <p className="mb-6 break-keep text-sm text-muted-foreground">오늘의 기운을 받아보세요. 자정을 넘기면 새로운 운세로 갱신됩니다.</p>
            <div className="mb-6 space-y-3 text-left">
              <label className="block text-sm font-medium text-muted-foreground">생년월일</label>
              <div className="grid grid-cols-3 gap-3">
                <select value={birthYear} onChange={(e) => setBirthYear(e.target.value)} className="rounded-xl border border-border bg-[#1e293b] px-4 py-3.5 text-base text-white outline-none transition-colors focus:border-primary/60 focus:ring-2 focus:ring-ring/40">
                  <option value="">연도</option>
                  {YEARS.map((y) => (<option key={y} value={y}>{y}년</option>))}
                </select>
                <select value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)} className="rounded-xl border border-border bg-[#1e293b] px-4 py-3.5 text-base text-white outline-none transition-colors focus:border-primary/60 focus:ring-2 focus:ring-ring/40">
                  <option value="">월</option>
                  {MONTHS.map((m) => (<option key={m} value={m}>{m}월</option>))}
                </select>
                <select value={birthDay} onChange={(e) => setBirthDay(e.target.value)} className="rounded-xl border border-border bg-[#1e293b] px-4 py-3.5 text-base text-white outline-none transition-colors focus:border-primary/60 focus:ring-2 focus:ring-ring/40">
                  <option value="">일</option>
                  {DAYS.map((d) => (<option key={d} value={d}>{d}일</option>))}
                </select>
              </div>
              <p className="text-xs text-muted-foreground/60">입력한 생년월일은 다음 방문 시 자동으로 불러옵니다.</p>
            </div>
            <button
              type="button"
              onClick={drawFortune}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground transition-all hover:bg-primary/80 hover:shadow-lg"
            >
              <Sparkles className="size-5" /> 오늘의 운세 확인하기
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Overall score */}
            <div className="glass rounded-3xl p-6 sm:p-8 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">오늘의 종합 운세 점수</p>
              <p className={`mt-2 text-5xl font-bold ${scoreColor(fortune.overall)}`}>{fortune.overall}<span className="text-2xl">점</span></p>
              <p className="break-keep mt-4 text-sm leading-relaxed text-foreground/90">{fortune.luck}</p>
            </div>

            {/* Score bar */}
            <div className="glass rounded-2xl p-5">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-sm font-medium text-foreground/90">오늘의 운세 지수</span>
                <span className={`text-sm font-bold ${scoreColor(fortune.overall)}`}>{fortune.overall}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-secondary/40">
                <div className={`h-full rounded-full bg-gradient-to-r ${scoreBg(fortune.overall)} transition-all duration-700`} style={{ width: `${fortune.overall}%` }} />
              </div>
            </div>

            {/* Luck & caution */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="glass rounded-2xl p-5">
                <p className="mb-2 flex items-center gap-2 text-sm font-bold text-emerald-400"><TrendingUp className="size-4" /> 좋은 시간대</p>
                <p className="break-keep text-sm text-foreground/85">{fortune.bestTime}</p>
              </div>
              <div className="glass rounded-2xl p-5">
                <p className="mb-2 flex items-center gap-2 text-sm font-bold text-rose-400"><Shield className="size-4" /> 주의 시간대</p>
                <p className="break-keep text-sm text-foreground/85">{fortune.worstTime}</p>
              </div>
            </div>

            {/* Lucky items */}
            <div className="glass rounded-2xl p-5">
              <p className="mb-3 flex items-center gap-2 text-sm font-bold text-primary"><Star className="size-4" /> 오늘의 행운 아이템</p>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl border border-border bg-secondary/20 p-3">
                  <p className="text-xs text-muted-foreground">행운의 색</p>
                  <p className="mt-1 text-sm font-bold text-foreground">{fortune.color}</p>
                </div>
                <div className="rounded-xl border border-border bg-secondary/20 p-3">
                  <p className="text-xs text-muted-foreground">행운의 숫자</p>
                  <p className="mt-1 text-sm font-bold text-foreground">{fortune.number}</p>
                </div>
                <div className="rounded-xl border border-border bg-secondary/20 p-3">
                  <p className="text-xs text-muted-foreground">행운의 방향</p>
                  <p className="mt-1 text-sm font-bold text-foreground">{fortune.direction}</p>
                </div>
              </div>
            </div>

            {/* Category fortunes */}
            <div className="space-y-4">
              <div className="glass rounded-2xl p-5">
                <p className="mb-2 flex items-center gap-2 text-sm font-bold text-rose-400"><Heart className="size-4" /> 연애운</p>
                <p className="break-keep text-sm leading-relaxed text-foreground/85">{fortune.love}</p>
              </div>
              <div className="glass rounded-2xl p-5">
                <p className="mb-2 flex items-center gap-2 text-sm font-bold text-amber-400"><Coins className="size-4" /> 재물운</p>
                <p className="break-keep text-sm leading-relaxed text-foreground/85">{fortune.wealth}</p>
              </div>
              <div className="glass rounded-2xl p-5">
                <p className="mb-2 flex items-center gap-2 text-sm font-bold text-emerald-400"><Shield className="size-4" /> 건강운</p>
                <p className="break-keep text-sm leading-relaxed text-foreground/85">{fortune.health}</p>
              </div>
            </div>

            {/* Advice */}
            <div className="rounded-2xl border-2 border-primary/40 bg-gradient-to-br from-primary/10 to-accent/5 p-6 text-center">
              <p className="mb-2 flex items-center justify-center gap-2 text-sm font-bold text-primary"><Sparkles className="size-4" /> 오늘의 개운 조언</p>
              <p className="break-keep text-sm leading-relaxed text-foreground/90">{fortune.advice}</p>
            </div>

            {/* Caution */}
            <div className="rounded-2xl border border-rose-500/30 bg-rose-500/5 p-5">
              <p className="mb-2 text-sm font-bold text-rose-400">⚠ 주의사항</p>
              <p className="break-keep text-sm leading-relaxed text-muted-foreground">{fortune.caution}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button type="button" onClick={drawFortune} className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/50 bg-primary/10 px-6 py-3 text-sm font-semibold transition-colors hover:bg-primary/20">
                <RotateCcw className="size-4" /> 다시 확인하기
              </button>
              <a href="/#saju-form" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/80">
                정밀 사주 분석하기 <ArrowRight className="size-4" />
              </a>
            </div>

            <p className="break-keep text-center text-xs text-muted-foreground/60">※ 오늘의 운세는 참고용입니다. 더 깊은 분석은 정밀 사주 분석에서 확인하세요.</p>
          </div>
        )}
      </section>
    </main>
  )
}
