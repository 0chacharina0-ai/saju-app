import { Card, SectionTitle } from './ui'
import { Sparkles } from 'lucide-react'
import type { ReportData } from '../types'

export function Sinsang({ report }: { report: ReportData }) {
  return (
    <div>
      <SectionTitle
        chapter="CHAPTER 3"
        title="신살 — 사주 속 특별한 자리들이 삶에 미치는 영향"
        desc="어려운 전문 용어 대신, 각 신살이 일상과 관계에 어떤 실질적 영향을 주는지 풀어서 설명합니다."
      />
      <div className="grid sm:grid-cols-2 gap-4">
        {report.sinsang.map((s) => (
          <Card key={s.key} tone="warm" icon={<Sparkles size={18} />}>
            <div className="flex items-baseline justify-between mb-2">
              <h4 className="font-serif text-lg font-bold text-ink-800">{s.name}</h4>
              <span className="text-xs font-semibold text-gold-700 bg-gold-100 px-2 py-0.5 rounded-full">
                {s.category}
              </span>
            </div>
            <p className="text-sm text-ink-500 mb-3">{s.plainExplain}</p>
            <div className="border-t border-gold-200 pt-3">
              <p className="text-sm font-semibold text-crimson-700 mb-1">삶에 미치는 영향</p>
              <p className="text-sm text-ink-700 leading-relaxed">{s.lifeEffect}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
