'use client'

import { useState, type FormEvent } from 'react'
import { User as User2, Calendar, Clock, Venus, Mars, MapPin, Heart, Sparkles } from 'lucide-react'
import { REGIONS } from '@/lib/saju'
import { calculateSaju, type SajuResult } from '@/lib/saju'
import { CosmicBackground } from './cosmic-background'

type PersonForm = {
  name: string
  year: number
  month: number
  day: number
  hour: number
  gender: 'male' | 'female'
  regionIndex: number
}

const CURRENT_YEAR = new Date().getFullYear()
const YEARS = Array.from({ length: 100 }, (_, i) => CURRENT_YEAR - i)
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1)
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1)

const HOURS: { label: string; value: number }[] = [
  { label: '자시 (23:00~00:59)', value: 0 },
  { label: '축시 (01:00~02:59)', value: 2 },
  { label: '인시 (03:00~04:59)', value: 4 },
  { label: '묘시 (05:00~06:59)', value: 6 },
  { label: '진시 (07:00~08:59)', value: 8 },
  { label: '사시 (09:00~10:59)', value: 10 },
  { label: '오시 (11:00~12:59)', value: 12 },
  { label: '미시 (13:00~14:59)', value: 14 },
  { label: '신시 (15:00~16:59)', value: 16 },
  { label: '유시 (17:00~18:59)', value: 18 },
  { label: '술시 (19:00~20:59)', value: 20 },
  { label: '해시 (21:00~22:59)', value: 22 },
]

const selectClass = 'cosmic-select'
const labelClass = 'cosmic-label'

function PersonInput({ label, person, onChange }: {
  label: string
  person: PersonForm
  onChange: (p: PersonForm) => void
}) {
  const region = REGIONS[person.regionIndex]

  return (
    <div className="cosmic-card p-5">
      <p className="mb-4 flex items-center gap-2 text-sm font-bold text-primary">
        <Heart className="size-4" /> {label}
      </p>

      <div className="mb-4">
        <label className={labelClass}><User2 className="size-4" /> 이름</label>
        <input
          type="text"
          value={person.name}
          onChange={(e) => onChange({ ...person, name: e.target.value })}
          placeholder="이름"
          className="cosmic-input"
        />
      </div>

      <div className="mb-4">
        <span className={labelClass}><Calendar className="size-4" /> 생년월일 (양력)</span>
        <div className="grid grid-cols-3 gap-2">
          <select aria-label="연도" value={person.year} onChange={(e) => onChange({ ...person, year: Number(e.target.value) })} className={selectClass}>
            {YEARS.map((y) => <option key={y} value={y}>{y}년</option>)}
          </select>
          <select aria-label="월" value={person.month} onChange={(e) => onChange({ ...person, month: Number(e.target.value) })} className={selectClass}>
            {MONTHS.map((m) => <option key={m} value={m}>{m}월</option>)}
          </select>
          <select aria-label="일" value={person.day} onChange={(e) => onChange({ ...person, day: Number(e.target.value) })} className={selectClass}>
            {DAYS.map((d) => <option key={d} value={d}>{d}일</option>)}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className={labelClass}><Clock className="size-4" /> 출생 시간</label>
        <select value={person.hour} onChange={(e) => onChange({ ...person, hour: Number(e.target.value) })} className={selectClass}>
          {HOURS.map((h) => <option key={h.value} value={h.value}>{h.label}</option>)}
        </select>
      </div>

      <div className="mb-4">
        <span className={labelClass}>성별</span>
        <div className="grid grid-cols-2 gap-2">
          <button type="button" onClick={() => onChange({ ...person, gender: 'male' })} aria-pressed={person.gender === 'male'} data-active={person.gender === 'male'}
            className="cosmic-toggle">
            <Mars className="size-4" /> 남성
          </button>
          <button type="button" onClick={() => onChange({ ...person, gender: 'female' })} aria-pressed={person.gender === 'female'} data-active={person.gender === 'female'}
            className="cosmic-toggle">
            <Venus className="size-4" /> 여성
          </button>
        </div>
      </div>

      <div>
        <label className={labelClass}><MapPin className="size-4" /> 출생 권역</label>
        <select value={person.regionIndex} onChange={(e) => onChange({ ...person, regionIndex: Number(e.target.value) })} className={selectClass}>
          {REGIONS.map((r, i) => <option key={r.name} value={i}>{r.name}</option>)}
        </select>
        <p className="mt-1 text-xs text-muted-foreground/70">시차: {region.offsetMin > 0 ? '+' : ''}{region.offsetMin}분</p>
      </div>
    </div>
  )
}

export function CompatibilityForm({
  onSubmit,
}: {
  onSubmit: (a: { name: string; result: SajuResult }, b: { name: string; result: SajuResult }) => void
}) {
  const [personA, setPersonA] = useState<PersonForm>({
    name: '', year: 1995, month: 1, day: 1, hour: 12, gender: 'male', regionIndex: 0,
  })
  const [personB, setPersonB] = useState<PersonForm>({
    name: '', year: 1995, month: 6, day: 15, hour: 14, gender: 'female', regionIndex: 0,
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const regionA = REGIONS[personA.regionIndex]
    const regionB = REGIONS[personB.regionIndex]
    const resultA = calculateSaju({
      year: personA.year, month: personA.month, day: personA.day, hour: personA.hour,
      calendar: 'solar', cityOffsetMin: regionA.offsetMin, gender: personA.gender,
    })
    const resultB = calculateSaju({
      year: personB.year, month: personB.month, day: personB.day, hour: personB.hour,
      calendar: 'solar', cityOffsetMin: regionB.offsetMin, gender: personB.gender,
    })
    onSubmit(
      { name: personA.name.trim() || 'A', result: resultA },
      { name: personB.name.trim() || 'B', result: resultB },
    )
  }

  return (
    <main className="cosmic-bg">
      <CosmicBackground />
      <section className="cosmic-section mx-auto max-w-3xl scroll-mt-20">
        <div className="cosmic-header cosmic-anim mb-12">
          <span className="cosmic-eyebrow">Compatibility Analysis</span>
          <h2 className="cosmic-title">1:1 심층 궁합 보고서</h2>
          <p className="cosmic-subtitle">두 사람의 태어난 시공간을 교차하여 오행의 조화와 충·합의 흐름으로 궁합의 깊이를 풀이합니다.</p>
        </div>

        <form onSubmit={handleSubmit} className="cosmic-card cosmic-anim cosmic-anim-1 p-6 sm:p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <PersonInput label="첫 번째 사람" person={personA} onChange={setPersonA} />
            <PersonInput label="두 번째 사람" person={personB} onChange={setPersonB} />
          </div>

          <button type="submit" className="cosmic-btn w-full">
            <Sparkles className="size-5 text-primary" />
            궁합 분석하기
          </button>
        </form>
      </section>
    </main>
  )
}
