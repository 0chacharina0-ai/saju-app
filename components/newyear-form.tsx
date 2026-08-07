'use client'

import { useState, type FormEvent } from 'react'
import { Calendar, Clock, User as User2, Venus, Mars, MapPin, Sparkles, Heart, Baby } from 'lucide-react'
import { REGIONS } from '@/lib/saju'
import { calculateSaju, type SajuResult } from '@/lib/saju'
import { generateNewYearReport, type NewYearReport } from '@/lib/newyear-report'

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

const selectClass = 'w-full appearance-none rounded-xl border border-border bg-[#1e293b] px-4 py-3.5 text-base text-white outline-none transition-colors focus:border-primary/60 focus:ring-2 focus:ring-ring/40'
const labelClass = 'mb-2 flex items-center gap-1.5 text-sm font-medium text-muted-foreground'

const SCORE_COLORS = (s: number) => s >= 80 ? 'text-emerald-400' : s >= 65 ? 'text-amber-400' : 'text-rose-400'
const SCORE_BG = (s: number) => s >= 80 ? 'from-emerald-500 to-green-500' : s >= 65 ? 'from-amber-500 to-yellow-500' : 'from-rose-500 to-red-500'

function NewYearResult({ report, name }: { report: NewYearReport; name: string }) {
  return (
    <div className="space-y-6">
      {/* Keywords + Score */}
      <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-accent/5 p-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">2027 정미년 종합 운세 점수</p>
        <p className={`mt-2 text-5xl font-bold ${SCORE_COLORS(report.totalScore)}`}>{report.totalScore}<span className="text-2xl">점</span></p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {report.keywords.map((kw, i) => (
            <span key={i} className="break-keep rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400">{kw}</span>
          ))}
        </div>
        <p className="break-keep mt-4 text-sm leading-relaxed text-muted-foreground">{report.closing}</p>
      </div>

      {/* Half-year graph */}
      <div className="rounded-2xl border border-border bg-secondary/20 p-6">
        <p className="mb-4 text-sm font-bold text-foreground">2027년 상반기/하반기 운의 궤도</p>
        <div className="space-y-3">
          {report.halfYearGraph.map((item) => (
            <div key={item.label}>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="break-keep text-sm font-medium text-foreground/90">{item.label}</span>
                <span className={`text-sm font-bold ${SCORE_COLORS(item.score)}`}>{item.score}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-secondary/40">
                <div className={`h-full rounded-full bg-gradient-to-r ${SCORE_BG(item.score)} transition-all duration-700`} style={{ width: `${item.score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly calendar */}
      <div className="rounded-2xl border border-border bg-secondary/20 p-6">
        <p className="mb-4 text-sm font-bold text-foreground">1월~12월 월별 운세 타임라인</p>
        <div className="space-y-3">
          {report.monthly.map((m) => (
            <div key={m.month} className="rounded-xl border border-border/50 bg-background/40 p-4">
              <p className="break-keep mb-1 text-sm font-bold text-primary">{m.month}월 — {m.energy}</p>
              <p className="break-keep mb-2 text-sm leading-relaxed text-foreground/80">{m.tip}</p>
              <p className="break-keep text-xs text-rose-400/80">⚠ {m.avoid}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Opportunities */}
      <div className="rounded-2xl border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-transparent p-6">
        <p className="mb-4 text-sm font-bold text-emerald-400">반드시 잡아야 할 3가지 기회</p>
        <div className="space-y-3">
          {report.opportunities.map((opp, i) => (
            <div key={i} className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
              <p className="break-keep mb-1 text-sm font-bold text-emerald-400">{i + 1}. {opp.title}</p>
              <p className="break-keep text-sm leading-relaxed text-foreground/80">{opp.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Risks */}
      <div className="rounded-2xl border-2 border-rose-500/30 bg-gradient-to-br from-rose-500/5 to-transparent p-6">
        <p className="mb-4 text-sm font-bold text-rose-400">피해야 할 3가지 변수</p>
        <div className="space-y-3">
          {report.risks.map((risk, i) => (
            <div key={i} className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4">
              <p className="break-keep mb-1 text-sm font-bold text-rose-400">{i + 1}. {risk.title}</p>
              <p className="break-keep text-sm leading-relaxed text-foreground/80">{risk.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Family section */}
      <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
        <p className="mb-3 flex items-center gap-2 text-sm font-bold text-primary"><Heart className="size-4" /> 가족운 · 맞춤 조건 분석</p>
        <p className="break-keep text-sm leading-relaxed text-foreground/85 whitespace-pre-line">{report.familySection}</p>
      </div>
    </div>
  )
}

export function NewYearForm() {
  const [name, setName] = useState('')
  const [year, setYear] = useState(1995)
  const [month, setMonth] = useState(1)
  const [day, setDay] = useState(1)
  const [hour, setHour] = useState(12)
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [regionIndex, setRegionIndex] = useState(0)
  const [maritalStatus, setMaritalStatus] = useState<'single' | 'married' | 'divorced'>('single')
  const [hasChildren, setHasChildren] = useState(false)
  const [report, setReport] = useState<{ report: NewYearReport; name: string } | null>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const region = REGIONS[regionIndex]
    const result = calculateSaju({
      year, month, day, hour, calendar: 'solar', cityOffsetMin: region.offsetMin, gender,
    })
    const r = generateNewYearReport(name.trim() || '무명', result, { maritalStatus, hasChildren })
    setReport({ report: r, name: name.trim() || '무명' })
  }

  if (report) {
    return (
      <section className="mx-auto max-w-4xl px-6 pb-28 pt-4">
        <div className="glass rounded-[2rem] p-6 sm:p-10">
          <header className="mb-8 border-b border-border pb-6 text-center">
            <p className="font-display text-sm font-semibold tracking-[0.35em] text-gradient uppercase">2027 New Year Fortune</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{report.name}님의 2027 정미년 신년운세</h2>
            <p className="mt-2 text-sm text-muted-foreground">붉은 양의 해 · 정미년</p>
          </header>
          <NewYearResult report={report.report} name={report.name} />
          <div className="no-print mt-8">
            <button onClick={() => setReport(null)} className="flex w-full items-center justify-center gap-2 rounded-full border border-primary/50 bg-primary/10 px-6 py-3 text-sm font-semibold transition-colors hover:bg-primary/20">
              다시 분석하기
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-2xl scroll-mt-20 px-5 py-20 pt-4 sm:px-6">
      <div className="mb-8 text-center">
        <p className="font-display text-xs font-semibold tracking-[0.35em] text-primary uppercase">2027 New Year Fortune</p>
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">2027 정미년 신년운세</h2>
        <p className="mt-3 break-keep text-sm text-muted-foreground">
          2027년 정미년 한 해의 흐름을 태어난 날의 명리 궤도로 풀이합니다.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="glass rounded-3xl p-6 sm:p-8">
        <div className="mb-6">
          <label className={labelClass}><User2 className="size-4" /> 이름</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="이름"
            className="w-full rounded-xl border border-border bg-[#1e1e2e] px-4 py-3.5 text-base text-white outline-none transition-colors placeholder:text-white/40 focus:border-primary/60 focus:ring-2 focus:ring-ring/40" />
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
            <button type="button" onClick={() => setGender('male')} aria-pressed={gender === 'male'} className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${gender === 'male' ? 'border-primary bg-primary/15 text-primary' : 'border-border bg-secondary/40 text-muted-foreground hover:text-foreground'}`}><Mars className="size-4" /> 남성</button>
            <button type="button" onClick={() => setGender('female')} aria-pressed={gender === 'female'} className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${gender === 'female' ? 'border-primary bg-primary/15 text-primary' : 'border-border bg-secondary/40 text-muted-foreground hover:text-foreground'}`}><Venus className="size-4" /> 여성</button>
          </div>
        </div>

        <div className="mb-6">
          <label className={labelClass}><MapPin className="size-4" /> 출생 권역</label>
          <select value={regionIndex} onChange={(e) => setRegionIndex(Number(e.target.value))} className={selectClass}>{REGIONS.map((r, i) => <option key={r.name} value={i}>{r.name}</option>)}</select>
        </div>

        <div className="mb-6">
          <span className={labelClass}><Heart className="size-4" /> 결혼 상태</span>
          <div className="grid grid-cols-3 gap-2">
            {([['single', '미혼'], ['married', '기혼'], ['divorced', '돌싱']] as const).map(([val, label]) => (
              <button key={val} type="button" onClick={() => setMaritalStatus(val)} aria-pressed={maritalStatus === val}
                className={`break-keep rounded-lg border px-2 py-2.5 text-sm font-medium transition-colors ${maritalStatus === val ? 'border-primary bg-primary/15 text-primary' : 'border-border bg-secondary/40 text-muted-foreground hover:text-foreground'}`}>{label}</button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <span className={labelClass}><Baby className="size-4" /> 자녀 유무</span>
          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={() => setHasChildren(true)} aria-pressed={hasChildren}
              className={`break-keep rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${hasChildren ? 'border-primary bg-primary/15 text-primary' : 'border-border bg-secondary/40 text-muted-foreground hover:text-foreground'}`}>자녀 있음</button>
            <button type="button" onClick={() => setHasChildren(false)} aria-pressed={!hasChildren}
              className={`break-keep rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${!hasChildren ? 'border-primary bg-primary/15 text-primary' : 'border-border bg-secondary/40 text-muted-foreground hover:text-foreground'}`}>자녀 없음</button>
          </div>
        </div>

        <button type="submit" className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-primary/60 bg-primary/10 px-6 py-4 text-base font-bold text-foreground transition-all hover:border-primary hover:bg-primary/20 hover:neon-glow focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none">
          <Sparkles className="size-5 text-primary" /> 2027 신년운세 보기
        </button>
      </form>
    </section>
  )
}
