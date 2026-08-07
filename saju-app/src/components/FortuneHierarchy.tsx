import { useState } from 'react'
import { Card, SectionTitle, Tabs, Accordion } from './ui'
import { TrendingUp, Calendar, CalendarDays, Zap, ShieldAlert } from 'lucide-react'
import type { ReportData } from '../types'

export function FortuneHierarchy({ report }: { report: ReportData }) {
  const [level, setLevel] = useState('daewun')

  return (
    <div>
      <SectionTitle
        chapter="CHAPTER 8"
        title="대운 · 연운 · 월운 — 운의 계층 구조"
        desc="10년 대운의 큰 흐름 위에 올해·내년·내후년 연운을 얹고, 그 아래 이달의 월운을 펼쳐 보는 3단계 운세 지도입니다."
      />

      <Tabs
        tabs={[
          { id: 'daewun', label: '1단계 · 10년 대운', sub: '큰 흐름' },
          { id: 'year', label: '2단계 · 연운', sub: '올해·내년·내후년' },
          { id: 'month', label: '3단계 · 월운', sub: '이달의 흐름' },
        ]}
        active={level}
        onChange={setLevel}
      />

      <div className="print:hidden">
        {level === 'daewun' && <DaewunLevel report={report} />}
        {level === 'year' && <YearLevel report={report} />}
        {level === 'month' && <MonthLevel report={report} />}
      </div>

      {/* 인쇄용: 모든 단계를 펼쳐서 출력 */}
      <div className="hidden print:block">
        <DaewunLevel report={report} />
        <div className="print-break-before" />
        <YearLevel report={report} />
        <div className="print-break-before" />
        <MonthLevel report={report} />
      </div>
    </div>
  )
}

function DaewunLevel({ report }: { report: ReportData }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-crimson-700">
        <TrendingUp size={20} />
        <h3 className="font-serif text-xl font-bold">1단계 — 10년 대운의 큰 흐름</h3>
      </div>
      <p className="text-sm text-ink-500">
        10년 단위의 대운은 인생의 큰 운명 궤도를 보여줍니다. 아래 세 시기는 당신의 핵심 흐름입니다.
      </p>
      {report.daewun.map((d) => (
        <Card key={d.ageRange} tone="warm">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
            <h4 className="font-serif text-lg font-bold text-ink-800">{d.title}</h4>
            <span className="text-sm font-semibold text-crimson-600">
              {d.ageRange} · {d.stemBranch}
            </span>
          </div>
          <p className="text-ink-700 leading-relaxed">{d.narrative}</p>
        </Card>
      ))}
    </div>
  )
}

function YearLevel({ report }: { report: ReportData }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sky-700">
        <Calendar size={20} />
        <h3 className="font-serif text-xl font-bold">2단계 — 올해·내년·내후년 연운</h3>
      </div>
      <p className="text-sm text-ink-500">
        매해 바뀌는 연운은 대운의 큰 흐름 안에서 그 해만의 기운을 만들어냅니다. 연도별로 기운이 다르게 작용합니다.
      </p>
      <div className="grid gap-4">
        {report.yearFortunes.map((y) => (
          <Card key={y.year} tone="cool">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
              <h4 className="font-serif text-xl font-bold text-ink-900">
                {y.year}년 <span className="text-sky-700">{y.stemBranch}</span>
              </h4>
              <span className="text-xs font-semibold bg-sky-100 text-sky-700 px-3 py-1 rounded-full">
                {y.keyword}
              </span>
            </div>
            <p className="font-serif font-bold text-ink-800 mb-1">{y.title}</p>
            <p className="text-sm text-ink-600 leading-relaxed mb-4">{y.summary}</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: '연애·인연', text: y.love },
                { label: '직장·커리어', text: y.career },
                { label: '재물·금전', text: y.wealth },
                { label: '건강·심리', text: y.health },
              ].map((item) => (
                <div key={item.label} className="rounded-lg bg-white border border-sky-200 p-3 print-break-avoid">
                  <p className="text-xs font-bold text-sky-700 mb-1">{item.label}</p>
                  <p className="text-sm text-ink-700 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function MonthLevel({ report }: { report: ReportData }) {
  const topAction = report.topActionMonths
  const topCaution = report.topCautionMonths

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 text-gold-700">
        <CalendarDays size={20} />
        <h3 className="font-serif text-xl font-bold">3단계 — 이달의 월운</h3>
      </div>

      {/* 월운 TOP3 요약 카드 */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Card tone="accent" icon={<Zap size={18} />}>
          <h4 className="font-serif font-bold text-crimson-700 mb-2">운이 정점에 달해 적극적으로 움직여야 하는 달 TOP 3</h4>
          <div className="flex flex-wrap gap-2">
            {topAction.map((m) => (
              <span
                key={m}
                className="inline-flex h-9 px-3 items-center rounded-full bg-crimson-600 text-white font-bold text-sm"
              >
                {m}월
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs text-ink-500 leading-relaxed">
            이 달들은 기운이 강하게 밀려와 도전·계약·발표·이직 등 적극적 행동이 성과로 이어집니다.
          </p>
        </Card>
        <Card tone="cool" icon={<ShieldAlert size={18} />}>
          <h4 className="font-serif font-bold text-sky-700 mb-2">조심하고 납작 엎드려야 하는 달 TOP 3</h4>
          <div className="flex flex-wrap gap-2">
            {topCaution.map((m) => (
              <span
                key={m}
                className="inline-flex h-9 px-3 items-center rounded-full bg-sky-700 text-white font-bold text-sm"
              >
                {m}월
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs text-ink-500 leading-relaxed">
            이 달들은 마찰·손재·구설수가 활동량에 비례해 커집니다. 정적 유지와 방어가 최선입니다.
          </p>
        </Card>
      </div>

      <p className="text-sm text-ink-500">월별 카드를 펼쳐 이달의 흐름과 기회·주의 날짜를 확인하세요.</p>
      <div className="space-y-3">
        {report.monthFortunes.map((m, i) => (
          <Accordion key={m.month} title={`${m.month}월 — ${m.title}`} defaultOpen={i === 0} badge={`${m.month}월`}>
            <MonthDetail month={m} isAction={topAction.includes(m.month)} isCaution={topCaution.includes(m.month)} />
          </Accordion>
        ))}
      </div>
    </div>
  )
}

function MonthDetail({
  month,
  isAction,
  isCaution,
}: {
  month: ReportData['monthFortunes'][number]
  isAction: boolean
  isCaution: boolean
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <span className="text-xs px-2 py-0.5 rounded-full bg-gold-100 text-gold-700 font-semibold">
          행운의 컬러: {month.luckyColor}
        </span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-ink-100 text-ink-600 font-semibold">
          피해야 할 행동: {month.avoidAction}
        </span>
        {isAction && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-crimson-600 text-white font-semibold">적극 행동 달</span>
        )}
        {isCaution && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-sky-700 text-white font-semibold">방어 달</span>
        )}
      </div>
      <p className="text-sm text-ink-700 leading-relaxed">{month.summary}</p>
      <div className="grid sm:grid-cols-2 gap-3">
        {[
          { label: '직장/업무', text: month.career },
          { label: '재물/금전', text: month.wealth },
          { label: '인간관계/연애', text: month.relationship },
          { label: '건강/심리', text: month.health },
        ].map((item) => (
          <div key={item.label} className="rounded-lg bg-ink-50 border border-ink-200 p-3 print-break-avoid">
            <p className="text-xs font-bold text-crimson-600 mb-1">{item.label}</p>
            <p className="text-sm text-ink-700 leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="rounded-lg bg-crimson-50 border border-crimson-200 p-3 print-break-avoid">
          <p className="text-xs font-bold text-crimson-700 mb-2">기회의 날 TOP 3</p>
          <ul className="space-y-1.5">
            {month.opportunityDays.map((d) => (
              <li key={d.day} className="text-sm text-ink-700">
                <span className="font-bold text-crimson-700">{d.day}일</span> — {d.guide}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg bg-sky-50 border border-sky-200 p-3 print-break-avoid">
          <p className="text-xs font-bold text-sky-700 mb-2">주의의 날 TOP 3</p>
          <ul className="space-y-1.5">
            {month.cautionDays.map((d) => (
              <li key={d.day} className="text-sm text-ink-700">
                <span className="font-bold text-sky-700">{d.day}일</span> — {d.guide}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
