'use client'

import { useState, useMemo, type FormEvent, type KeyboardEvent } from 'react'
import { Calendar, Clock, User as User2, Venus, Mars, Sparkles, MapPin, Settings2, TriangleAlert as AlertTriangle, X, Search } from 'lucide-react'
import { REGIONS, REGION_GROUPS, isNearHourBoundary, type RegionEntry } from '@/lib/saju'

export type SajuFormValues = {
  name: string
  year: number
  month: number
  day: number
  calendar: 'solar' | 'lunar' | 'lunar-leap'
  hour: number
  gender: 'male' | 'female'
  region: string
  cityOffsetMin: number
  currentConcern: string
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

const selectClass =
  'w-full appearance-none rounded-xl border border-border bg-[#1e293b] px-4 py-3.5 text-base text-white outline-none transition-colors focus:border-primary/60 focus:ring-2 focus:ring-ring/40'

const labelClass =
  'mb-2 flex items-center gap-1.5 text-sm font-medium text-muted-foreground'

export function SajuForm({
  onSubmit,
}: {
  onSubmit: (values: SajuFormValues) => void
}) {
  const [name, setName] = useState('')
  const [year, setYear] = useState(1995)
  const [month, setMonth] = useState(1)
  const [day, setDay] = useState(1)
  const [calendar, setCalendar] = useState<'solar' | 'lunar' | 'lunar-leap'>('solar')
  const [hour, setHour] = useState<number>(12)
  const [unknownHour, setUnknownHour] = useState(false)
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [provinceIndex, setProvinceIndex] = useState(0)
  const [cityIndex, setCityIndex] = useState(0)
  const [customOffset, setCustomOffset] = useState<number | null>(null)
  const [showOffsetModal, setShowOffsetModal] = useState(false)
  const [tempOffset, setTempOffset] = useState(0)
  const [currentConcern] = useState('')
  const [regionSearch, setRegionSearch] = useState('')
  const [showRegionDropdown, setShowRegionDropdown] = useState(false)
  const [highlightIdx, setHighlightIdx] = useState(0)

  const selectedProvince = REGION_GROUPS[provinceIndex]
  const selectedCity = selectedProvince.cities[cityIndex]
  const selectedRegion: RegionEntry = selectedCity
  const effectiveOffset = customOffset ?? selectedRegion.offsetMin

  const nearBoundary = !unknownHour && isNearHourBoundary(hour, effectiveOffset)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit({
      name: name.trim() || '무명',
      year,
      month,
      day,
      calendar,
      hour: unknownHour ? -1 : hour,
      gender,
      region: selectedRegion.name,
      cityOffsetMin: effectiveOffset,
      currentConcern,
    })
  }

  const selectProvince = (idx: number) => {
    setProvinceIndex(idx)
    setCityIndex(0)
    setCustomOffset(null)
  }

  const selectCity = (idx: number) => {
    setCityIndex(idx)
    setCustomOffset(null)
    setShowRegionSearch(false)
    setRegionSearch('')
  }

  const searchResults = useMemo(() => {
    if (!regionSearch.trim()) return []
    const q = regionSearch.trim()
    const results: { provinceIdx: number; cityIdx: number; label: string }[] = []
    REGION_GROUPS.forEach((prov, pi) => {
      prov.cities.forEach((city, ci) => {
        if (city.name.includes(q) || prov.province.includes(q)) {
          results.push({ provinceIdx: pi, cityIdx: ci, label: `${prov.province} ${city.name}` })
        }
      })
    })
    return results.slice(0, 10)
  }, [regionSearch])

  const selectFromSearch = (pi: number, ci: number) => {
    setProvinceIndex(pi)
    setCityIndex(ci)
    setCustomOffset(null)
    setShowRegionDropdown(false)
    const prov = REGION_GROUPS[pi]
    const city = prov.cities[ci]
    setRegionSearch(`${prov.province} ${city.name}`)
    setHighlightIdx(0)
  }

  const handleRegionKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (searchResults.length > 0) {
        const r = searchResults[Math.min(highlightIdx, searchResults.length - 1)]
        selectFromSearch(r.provinceIdx, r.cityIdx)
      }
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightIdx((p) => Math.min(p + 1, searchResults.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightIdx((p) => Math.max(p - 1, 0))
    } else if (e.key === 'Escape') {
      setShowRegionDropdown(false)
    }
  }

  const openOffsetModal = () => {
    setTempOffset(effectiveOffset)
    setShowOffsetModal(true)
  }

  const applyCustomOffset = () => {
    setCustomOffset(tempOffset)
    setShowOffsetModal(false)
  }

  const resetCustomOffset = () => {
    setCustomOffset(null)
    setShowOffsetModal(false)
  }

  return (
    <section id="saju-form" className="relative mx-auto max-w-2xl scroll-mt-20 px-6 py-20">
      <div className="mb-8 text-center">
        <p className="font-display text-xs font-semibold tracking-[0.35em] text-primary uppercase">
          Arrival Coordinates
        </p>
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">지구 도착 시각 (탄생 좌표) 입력</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          지구의 인공적인 표준시(GMT+9)로 왜곡되었던 당신의 진짜 우주 궤도를 찾아드립니다.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="glass rounded-3xl p-6 sm:p-8">
        {/* 이름 */}
        <div className="mb-6">
          <label htmlFor="name" className={labelClass}>
            <User2 className="size-4" /> 이름 (탐사대원 명칭)
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요"
            className="w-full rounded-xl border border-border bg-[#1e1e2e] px-4 py-3.5 text-base text-white outline-none transition-colors placeholder:text-white/40 focus:border-primary/60 focus:ring-2 focus:ring-ring/40"
          />
        </div>

        {/* 생년월일 */}
        <div className="mb-6">
          <span className={labelClass}>
            <Calendar className="size-4" /> 생년월일
          </span>
          <div className="grid grid-cols-3 gap-3">
            <select aria-label="출생 연도" value={year} onChange={(e) => setYear(Number(e.target.value))} className={selectClass}>
              {YEARS.map((y) => (<option key={y} value={y}>{y}년</option>))}
            </select>
            <select aria-label="출생 월" value={month} onChange={(e) => setMonth(Number(e.target.value))} className={selectClass}>
              {MONTHS.map((m) => (<option key={m} value={m}>{m}월</option>))}
            </select>
            <select aria-label="출생 일" value={day} onChange={(e) => setDay(Number(e.target.value))} className={selectClass}>
              {DAYS.map((d) => (<option key={d} value={d}>{d}일</option>))}
            </select>
          </div>
        </div>

        {/* 양력 / 음력 / 음력(윤달) */}
        <div className="mb-6">
          <span className={labelClass}>달력 기준</span>
          <div className="grid grid-cols-3 gap-2">
            {(['solar', 'lunar', 'lunar-leap'] as const).map((c) => (
              <button key={c} type="button" onClick={() => setCalendar(c)} aria-pressed={calendar === c}
                className={`rounded-lg border px-2 py-2.5 text-sm font-medium transition-colors ${calendar === c ? 'border-primary bg-primary/15 text-primary' : 'border-border bg-secondary/40 text-muted-foreground hover:text-foreground'}`}>
                {c === 'solar' ? '양력' : c === 'lunar' ? '음력' : '음력(윤달)'}
              </button>
            ))}
          </div>
          {calendar === 'lunar-leap' && (
            <p className="mt-2 break-keep rounded-lg border border-accent/30 bg-accent/10 px-3 py-2 text-xs text-accent/90">
              윤월(윤달) 출생자의 경우, 해당 월의 기운이 평월과 다르게 작용할 수 있어 추가 보정 계산이 적용됩니다.
            </p>
          )}
        </div>

        {/* 출생 시간 */}
        <div className="mb-6">
          <label htmlFor="hour" className={labelClass}>
            <Clock className="size-4" /> 출생 시간
          </label>
          <select id="hour" value={hour} disabled={unknownHour} onChange={(e) => setHour(Number(e.target.value))} className={`${selectClass} disabled:opacity-50`}>
            {HOURS.map((h) => (<option key={h.value} value={h.value}>{h.label}</option>))}
          </select>
          <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
            <input type="checkbox" checked={unknownHour} onChange={(e) => setUnknownHour(e.target.checked)} className="size-4 accent-[var(--primary)]" />
            출생 시간을 모릅니다
          </label>
        </div>

        {/* 출생 지역 (경도 시차 보정) — 단일 검색 입력창 */}
        <div className="mb-6">
          <label className={labelClass}>
            <MapPin className="size-4" /> 출생 지역 (경도 시차 보정)
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={regionSearch}
              onChange={(e) => { setRegionSearch(e.target.value); setShowRegionDropdown(true); setHighlightIdx(0) }}
              onKeyDown={handleRegionKeyDown}
              onFocus={() => setShowRegionDropdown(true)}
              placeholder="출생 도시/지역명 검색 (예: 서울, 영월, 부산, 해남)"
              className="w-full rounded-lg border border-border bg-[#1e293b] py-2.5 pl-10 pr-3 text-sm text-white outline-none transition-colors placeholder:text-white/40 focus:border-primary/60 focus:ring-2 focus:ring-ring/40"
            />
            {showRegionDropdown && searchResults.length > 0 && (
              <div className="absolute z-10 mt-1 max-h-56 w-full overflow-y-auto rounded-lg border border-border bg-[#1e293b] py-1 shadow-xl">
                {searchResults.map((r, i) => (
                  <button key={`${r.provinceIdx}-${r.cityIdx}`} type="button"
                    onMouseDown={(e) => { e.preventDefault(); selectFromSearch(r.provinceIdx, r.cityIdx) }}
                    className={`flex w-full items-center justify-between px-3 py-2 text-sm transition-colors ${i === highlightIdx ? 'bg-primary/15 text-primary' : 'text-muted-foreground hover:bg-secondary/40 hover:text-foreground'}`}>
                    <span>{r.label}</span>
                    <span className="text-xs text-primary/70">{REGION_GROUPS[r.provinceIdx].cities[r.cityIdx].offsetMin > 0 ? '+' : ''}{REGION_GROUPS[r.provinceIdx].cities[r.cityIdx].offsetMin}분</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mt-2 flex items-center justify-between">
            <p className="text-xs text-muted-foreground/70">
              현재 적용 시차: <span className="font-medium text-primary">{effectiveOffset > 0 ? '+' : ''}{effectiveOffset}분</span> ({selectedRegion.name} 기준)
              {customOffset !== null && <span className="ml-1 text-accent">(수동 입력)</span>}
            </p>
            <button type="button" onClick={openOffsetModal}
              className="flex items-center gap-1 rounded-lg border border-border bg-secondary/40 px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground">
              <Settings2 className="size-3" /> 시차 직접 입력
            </button>
          </div>
          {selectedRegion.longitude !== 135 && !unknownHour && (
            <p className="mt-1.5 break-keep rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-xs text-primary/90">
              입력 시간 {String(hour).padStart(2, '0')}:00 기준 [표준시({String(hour).padStart(2, '0')}:00)]와 [{selectedRegion.name} 지방시({String(((hour * 60 + effectiveOffset) % 1440 + 1440) % 1440 / 60 | 0).padStart(2, '0')}:{String(((hour * 60 + effectiveOffset) % 1440 + 1440) % 1440 % 60).padStart(2, '0')})] 두 시주를 모두 정밀 계산하여 나에게 가장 잘 맞는 운명 궤도를 입체적으로 분석합니다.
            </p>
          )}
        </div>

        {/* 시(時) 경계 경고 */}
        {nearBoundary && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-yellow-500/40 bg-yellow-500/10 p-4">
            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-yellow-500" />
            <div>
              <p className="text-sm font-medium text-yellow-100">시(時) 경계 시간대 안내</p>
              <p className="mt-1 text-xs text-yellow-100/80">
                보정 후 출생 시간이 사주의 시(時)가 바뀌는 경계 부근에 있습니다. 다음 단계의 생체 자전 궤도 질문을 통해 지방시/표준시 중 더 정확한 시간을 판별해 드립니다.
              </p>
            </div>
          </div>
        )}

        {/* 성별 */}
        <div className="mb-8">
          <span className={labelClass}>성별 (대운 순역행 및 관성·재성 해석 반영)</span>
          <div className="grid grid-cols-2 gap-3">
            <button type="button" onClick={() => setGender('male')} aria-pressed={gender === 'male'}
              className={`flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-3.5 text-base font-medium transition-colors ${gender === 'male' ? 'border-primary bg-primary/15 text-primary' : 'border-border bg-secondary/40 text-muted-foreground hover:text-foreground'}`}>
              <Mars className="size-4" /> 남성
            </button>
            <button type="button" onClick={() => setGender('female')} aria-pressed={gender === 'female'}
              className={`flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-3.5 text-base font-medium transition-colors ${gender === 'female' ? 'border-primary bg-primary/15 text-primary' : 'border-border bg-secondary/40 text-muted-foreground hover:text-foreground'}`}>
              <Venus className="size-4" /> 여성
            </button>
          </div>
        </div>

        <button type="submit"
          className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-primary/60 bg-primary/10 px-6 py-4 text-base font-bold text-foreground transition-all hover:border-primary hover:bg-primary/20 hover:neon-glow focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none">
          나의 코스믹 스타맵 시작하기
          <Sparkles className="size-5 text-primary" />
        </button>
      </form>

      {/* 시차 직접 입력 모달 */}
      {showOffsetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setShowOffsetModal(false)}>
          <div className="glass w-full max-w-md rounded-2xl p-6" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold">시차 직접 입력</h3>
              <button type="button" onClick={() => setShowOffsetModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="size-5" />
              </button>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              표준시(동경 135도)와의 시차를 1분 단위로 직접 입력하세요. 음수는 서쪽(늦은 시간), 양수는 동쪽(빠른 시간)을 의미합니다.
            </p>
            <div className="mb-6 flex items-center gap-3">
              <button type="button" onClick={() => setTempOffset((p) => p - 1)} className="size-10 rounded-lg border border-border bg-secondary/40 text-lg font-bold text-foreground hover:bg-secondary/60">-</button>
              <input type="number" value={tempOffset} onChange={(e) => setTempOffset(Number(e.target.value))} className="w-20 rounded-lg border border-border bg-[#1e1e2e] px-3 py-2.5 text-center text-lg font-bold text-white outline-none focus:border-primary/60" />
              <button type="button" onClick={() => setTempOffset((p) => p + 1)} className="size-10 rounded-lg border border-border bg-secondary/40 text-lg font-bold text-foreground hover:bg-secondary/60">+</button>
              <span className="text-sm text-muted-foreground">분</span>
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={resetCustomOffset} className="flex-1 rounded-lg border border-border bg-secondary/40 px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground">권역 기본값 사용</button>
              <button type="button" onClick={applyCustomOffset} className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/80">적용하기</button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
