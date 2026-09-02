import { Card } from './ui'
import { BookOpen, Check, Printer, Sparkles } from 'lucide-react'
import type { ReportData } from '../types'

interface PreviewProps {
  report: ReportData
  onPay: () => void
  loading: boolean
}

export function PreviewSection({ report, onPay, loading }: PreviewProps) {
  return (
    <div className="space-y-8">
      {/* 미리보기 박스 - CHAPTER 1 */}
      <Card tone="warm" className="border-2 border-gold-300">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen size={18} className="text-gold-700" />
          <span className="text-xs font-bold tracking-widest text-gold-700">CHAPTER 1 · 미리보기</span>
        </div>
        <p className="font-serif text-lg sm:text-xl font-bold text-ink-900 leading-relaxed mb-3">
          {report.solarTimeAdjust} 결과, 당신의 사주는 타고난 큰 나무의 강한 추진력을 지녔으나, 시주의 칼날 기운과
          만나는 직업적 변곡점을 품고 있습니다. 30대 중반부터 시작되는 대운의 핵심 운명 궤도는 지금까지의 준비를
          결실로 바꾸는 결정적 시기로 작동합니다.
        </p>
        <p className="text-sm text-ink-600 leading-relaxed">
          한자와 전문 용어를 빼고, 당신의 언어로 풀어 쓴 정통 사주 심층 리포트의 첫 장입니다.
        </p>
        <div className="mt-5 pt-4 border-t border-gold-200 text-sm text-ink-600">
          이후 8챕터 · A4 약 30페이지 분량이 이어집니다
        </div>
      </Card>

      {/* 결제 후 받는 것 */}
      <Card title="결제 후 받는 것" icon={<Sparkles size={18} />}>
        <ul className="space-y-3">
          {[
            { main: '8챕터 심층 사주 리포트', sub: 'A4 약 30페이지 분량의 정통 사주 명리 분석' },
            { main: '2026 병오년 신년운세 + 1~12월 월별 캘린더', sub: '매달 기회의 날·주의의 날 핀포인트 가이드' },
            { main: '대운·연운·월운 3단계 운세 지도', sub: '10년 흐름 위에 올해·내년·이달을 겹쳐 본 입체 분석' },
            { main: 'PDF 다운로드·인쇄 지원', sub: 'A4 규격에 최적화된 깔끔한 출력물' },
          ].map((item) => (
            <li key={item.main} className="flex gap-3">
              <Check size={18} className="shrink-0 text-jade-500 mt-0.5" />
              <div>
                <p className="font-semibold text-ink-800">{item.main}</p>
                <p className="text-sm text-ink-500">{item.sub}</p>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      {/* 결제 CTA */}
      <div className="rounded-2xl bg-gradient-to-br from-crimson-600 to-crimson-700 p-6 sm:p-8 text-center text-white shadow-lg">
        <p className="font-serif text-2xl font-bold mb-2">정통 사주 심층 리포트</p>
        <p className="text-crimson-100 text-sm mb-5">8챕터 · A4 약 30페이지 · PDF 제공</p>
        <button
          type="button"
          onClick={onPay}
          disabled={loading}
          className="no-print w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white text-crimson-700 font-bold px-8 py-3.5 hover:bg-gold-50 transition-colors disabled:opacity-60"
        >
          <Printer size={18} />
          {loading ? '생성 중...' : '리포트 전체 보기 · PDF 받기'}
        </button>
        <p className="mt-3 text-xs text-crimson-100/80">결제 후 전체 8챕터가 즉시 표시됩니다</p>
      </div>
    </div>
  )
}
