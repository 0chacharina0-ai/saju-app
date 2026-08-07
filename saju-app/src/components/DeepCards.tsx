import { Card, SectionTitle } from './ui'
import { Users, Heart, Briefcase, Hop as Home } from 'lucide-react'
import type { ReportData } from '../types'

export function PersonaShadow({ report }: { report: ReportData }) {
  const { personaShadow: ps } = report
  return (
    <div>
      <SectionTitle
        chapter="CHAPTER 4"
        title="성격 심층 — 겉으로 보이는 나와 진짜 내면"
        desc="사회적 페르소나(겉모습)와 섀도우(혼자일 때의 내면)를 대조해 성격의 양면을 분석합니다."
      />
      <Card icon={<Users size={18} />} tone="cool">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="rounded-xl bg-white border border-sky-200 p-5 print-break-avoid">
            <h4 className="font-serif font-bold text-sky-700 mb-2">사회적 모습 (페르소나)</h4>
            <p className="text-sm text-ink-700 leading-relaxed">{ps.persona}</p>
          </div>
          <div className="rounded-xl bg-white border border-ink-300 p-5 print-break-avoid">
            <h4 className="font-serif font-bold text-ink-700 mb-2">혼자일 때의 내면 (섀도우)</h4>
            <p className="text-sm text-ink-700 leading-relaxed">{ps.shadow}</p>
          </div>
        </div>
        <div className="mt-5 rounded-xl bg-sky-100/70 border border-sky-200 p-4">
          <p className="text-sm text-ink-700 leading-relaxed">
            <span className="font-semibold text-sky-700">핵심 요약 </span>
            {ps.summary}
          </p>
        </div>
      </Card>
    </div>
  )
}

export function Love({ report }: { report: ReportData }) {
  const { love: l } = report
  return (
    <div>
      <SectionTitle
        chapter="CHAPTER 5"
        title="연애·인연 심층 — 본능과 시너지의 차이"
        desc="본능적으로 끌리는 사람과 실제로 함께할 때 시너지가 나는 사람이 어떻게 다른지 대조합니다."
      />
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <Card title="본능적으로 끌리는 이성 스타일" tone="accent" icon={<Heart size={18} />}>
          <p className="font-serif font-bold text-crimson-700 mb-2">{l.instinctType}</p>
          <p className="text-sm text-ink-700 leading-relaxed">{l.instinctDesc}</p>
        </Card>
        <Card title="실제로 만났을 때 시너지가 나는 유형" tone="warm" icon={<Heart size={18} />}>
          <p className="font-serif font-bold text-gold-700 mb-2">{l.synergyType}</p>
          <p className="text-sm text-ink-700 leading-relaxed">{l.synergyDesc}</p>
        </Card>
      </div>
      <Card title="인연 진입 시기" className="mb-4">
        <p className="text-ink-700 leading-relaxed">{l.timingNarrative}</p>
      </Card>
      <Card title="결혼 적령기" tone="cool">
        <p className="text-ink-700 leading-relaxed">{l.marriageWindow}</p>
      </Card>
    </div>
  )
}

export function Career({ report }: { report: ReportData }) {
  const { career: c } = report
  return (
    <div>
      <SectionTitle
        chapter="CHAPTER 6"
        title="커리어·성패 — 조직 적성 vs 독립 적성"
        desc="월급쟁이·조직 생활 적성과 독립·창업·프리랜서 적성의 비율을 판별하고 진로를 진단합니다."
      />
      <Card icon={<Briefcase size={18} />}>
        <div className="grid md:grid-cols-2 gap-5 mb-5">
          <div className="print-break-avoid">
            <div className="flex items-baseline justify-between mb-2">
              <span className="font-semibold text-sky-700">조직 생활 적성</span>
              <span className="font-serif text-2xl font-bold text-sky-700">{c.organization}%</span>
            </div>
            <div className="h-3 rounded-full bg-ink-100 overflow-hidden mb-3">
              <div className="h-full bg-sky-500" style={{ width: `${c.organization}%` }} />
            </div>
            <p className="text-sm text-ink-600 leading-relaxed">{c.organizationDesc}</p>
          </div>
          <div className="print-break-avoid">
            <div className="flex items-baseline justify-between mb-2">
              <span className="font-semibold text-crimson-700">독립·창업 적성</span>
              <span className="font-serif text-2xl font-bold text-crimson-700">{c.independent}%</span>
            </div>
            <div className="h-3 rounded-full bg-ink-100 overflow-hidden mb-3">
              <div className="h-full bg-crimson-500" style={{ width: `${c.independent}%` }} />
            </div>
            <p className="text-sm text-ink-600 leading-relaxed">{c.independentDesc}</p>
          </div>
        </div>
        <div className="rounded-xl bg-gold-50 border border-gold-200 p-4">
          <p className="text-sm font-semibold text-gold-800 mb-1">진단과 권고</p>
          <p className="text-sm text-ink-700 leading-relaxed">{c.recommendation}</p>
        </div>
      </Card>
    </div>
  )
}

export function Family({ report }: { report: ReportData }) {
  const { family: f } = report
  return (
    <div>
      <SectionTitle
        chapter="CHAPTER 7"
        title="가족 관계 분석 — 부모·가족과의 심리적 거리감"
        desc="연주(부모·조상 자리)와 일주(나 자신)의 오행 관계를 통해 본 부모와의 심리적 거리감, 정서적 지원 유무, 그리고 건강한 독립 타이밍을 분석합니다."
      />
      <Card icon={<Home size={18} />} tone="warm">
        <p className="mb-4 text-sm text-ink-600 leading-relaxed">{f.parentDistance}</p>
        <div className="space-y-4">
          <div className="rounded-xl bg-white border border-gold-200 p-4 print-break-avoid">
            <h4 className="font-serif font-bold text-gold-800 mb-1">정서적 지원 유무</h4>
            <p className="text-sm text-ink-700 leading-relaxed">{f.emotionalSupport}</p>
          </div>
          <div className="rounded-xl bg-white border border-gold-200 p-4 print-break-avoid">
            <h4 className="font-serif font-bold text-gold-800 mb-1">건강한 독립 타이밍</h4>
            <p className="text-sm text-ink-700 leading-relaxed">{f.independenceTiming}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
