import { useState } from 'react'
import { sampleReport } from './data/sampleReport'
import { PreviewSection } from './components/PreviewSection'
import { SajuPillar } from './components/SajuPillar'
import { Sinsang } from './components/Sinsang'
import { PersonaShadow, Love, Career, Family } from './components/DeepCards'
import { FortuneHierarchy } from './components/FortuneHierarchy'
import { PrintOnly } from './components/ui'
import { Printer, FileText } from 'lucide-react'
import { callAiReport } from './lib/supabase'

export default function App() {
  const [unlocked, setUnlocked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [aiNote, setAiNote] = useState<string | null>(null)
  const report = sampleReport

  async function handlePay() {
    setLoading(true)
    setError(null)
    try {
      // 백엔드 AI(MODE 1) 호출 — 시스템 프롬프트 연동 확인용
      const result = await callAiReport('MODE1_FULL', {
        name: report.name,
        gender: report.gender,
        birthDate: report.birthDate,
        birthTime: report.birthTime,
        pillars: report.pillars,
        daewun: report.daewun,
      })
      if (result?.fallback) {
        setAiNote('AI 시스템 프롬프트가 서버에 등록되어 있으나 API 키 연동 대기 중입니다. 등록된 샘플 리포트로 먼저 확인하세요.')
      }
      setUnlocked(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : '리포트를 불러오는 중 문제가 발생했습니다.')
      setUnlocked(true) // 샘플 리포트라도 열람 가능
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* 상단 헤더 */}
      <header className="no-print sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-ink-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText size={20} className="text-crimson-600" />
            <span className="font-serif font-bold text-ink-900">정통사주 심층 리포트</span>
          </div>
          {unlocked && (
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-full bg-ink-800 text-white text-sm font-semibold px-4 py-2 hover:bg-ink-700 transition-colors"
            >
              <Printer size={16} />
              PDF·인쇄
            </button>
          )}
        </div>
      </header>

      {/* 인쇄용 표지 */}
      <PrintOnly>
        <div className="text-center py-10 border-b-2 border-ink-300 mb-8">
          <h1 className="font-serif text-3xl font-bold mb-2">정통사주 심층 리포트</h1>
          <p className="text-ink-600">
            {report.name} · {report.birthDate} {report.birthTime} · {report.solarTimeAdjust}
          </p>
          <p className="mt-2 text-sm text-ink-500">8챕터 · A4 약 30페이지</p>
        </div>
      </PrintOnly>

      <main className="print-container max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10 sm:space-y-14">
        {/* 미리보기 + 결제 */}
        <PreviewSection report={report} onPay={handlePay} loading={loading} />

        {error && (
          <div className="no-print rounded-xl border border-gold-300 bg-gold-50 p-4 text-sm text-gold-800">
            AI 연동 안내: {error}
          </div>
        )}
        {aiNote && (
          <div className="no-print rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-800">{aiNote}</div>
        )}

        {unlocked && (
          <div className="space-y-12 sm:space-y-16 print:space-y-8 print-full-width">
            <SajuPillar report={report} />
            <Sinsang report={report} />
            <PersonaShadow report={report} />
            <Love report={report} />
            <Career report={report} />
            <Family report={report} />
            <FortuneHierarchy report={report} />

            <footer className="print-break-avoid text-center text-xs text-ink-400 pt-8 border-t border-ink-200">
              <p>본 리포트는 {report.solarTimeAdjust}을 기준으로 작성되었습니다.</p>
              <p className="mt-1">정통사주 심층 리포트 · 8챕터 · A4 약 30페이지</p>
            </footer>
          </div>
        )}
      </main>
    </div>
  )
}
