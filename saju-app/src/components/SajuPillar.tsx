import { Card, SectionTitle } from './ui'
import type { ReportData } from '../types'

export function SajuPillar({ report }: { report: ReportData }) {
  return (
    <div>
      <SectionTitle
        chapter="CHAPTER 2"
        title="사주 원국 — 태어난 네 개의 기둥"
        desc="연주·월주·일주·시주 네 기둥에 담긴 당신의 태어난 계절과 시간의 기운을 쉬운 말로 풀어냅니다."
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-5">
        {report.pillars.map((p) => (
          <div
            key={p.position}
            className="print-break-avoid rounded-2xl border-2 border-ink-200 bg-white p-4 sm:p-5 text-center shadow-sm hover:border-crimson-300 transition-colors"
          >
            <div className="text-xs font-bold tracking-widest text-crimson-600 mb-3">{p.position}</div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-ink-900 leading-none mb-1">
              {p.heavenlyStem}
            </div>
            <div className="font-serif text-xl sm:text-2xl text-ink-500 leading-none mb-3">{p.earthlyBranch}</div>
            <div className="space-y-2 text-left">
              <p className="text-xs text-ink-600 leading-relaxed">
                <span className="font-semibold text-ink-700">위 글자 뜻 </span>
                {p.stemMeaning}
              </p>
              <p className="text-xs text-ink-600 leading-relaxed">
                <span className="font-semibold text-ink-700">아래 글자 뜻 </span>
                {p.branchMeaning}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Card title="태어난 날의 기운 (일간)" tone="warm">
        <p className="mb-2">
          <span className="font-serif font-bold text-lg text-ink-900">{report.dayMaster}</span>
        </p>
        <p className="text-ink-700">{report.dayMasterExplain}</p>
      </Card>

      <Card title="오행 균형 — 다섯 기운의 흐름" className="mt-4" tone="cool">
        <div className="space-y-3">
          {report.elementBalance.map((e) => (
            <div key={e.element} className="flex items-center gap-3">
              <span className="w-24 text-sm font-semibold text-ink-700 shrink-0">{e.element}</span>
              <div className="flex-1 h-3 rounded-full bg-ink-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-crimson-400 to-crimson-600 transition-all"
                  style={{ width: `${Math.round(e.ratio * 100)}%` }}
                />
              </div>
              <span className="w-12 text-right text-sm font-bold text-ink-700">{e.count}개</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-ink-500 leading-relaxed">
          오행이 모두 0개·0%로 표시되지 않도록, 태어난 시간의 기운을 정밀 계산해 각 요소의 비율을 반영했습니다.
        </p>
      </Card>
    </div>
  )
}
