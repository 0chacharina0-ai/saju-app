'use client'

import { useState } from 'react'
import { Orbit, ArrowRight, ArrowLeft, Check } from 'lucide-react'
import { BIORHYTHM_QUESTIONS, BOUNDARY_QUESTIONS, evaluateBoundaryAnswers } from '@/lib/saju'

export function BiorhythmQuiz({
  onComplete,
  onBack,
  nearBoundary = false,
}: {
  onComplete: (answers: number[], recommendation: 'local' | 'standard') => void
  onBack: () => void
  nearBoundary?: boolean
}) {
  const [answers, setAnswers] = useState<number[]>(Array(7).fill(-1))
  const [currentQ, setCurrentQ] = useState(0)
  const [boundaryAnswers, setBoundaryAnswers] = useState<number[]>(Array(2).fill(-1))
  const [boundaryStep, setBoundaryStep] = useState(0)

  const totalQuestions = nearBoundary ? 7 + 2 : 7
  const allAnswered = answers.every((a) => a >= 0)
  const boundaryAnswered = !nearBoundary || boundaryAnswers.every((a) => a >= 0)

  const selectOption = (qIdx: number, optIdx: number) => {
    const next = [...answers]
    next[qIdx] = optIdx
    setAnswers(next)
  }

  const selectBoundaryOption = (bIdx: number, optIdx: number) => {
    const next = [...boundaryAnswers]
    next[bIdx] = optIdx
    setBoundaryAnswers(next)
  }

  const confirmAndNext = () => {
    if (nearBoundary && currentQ === 6 && boundaryStep < 1) {
      setBoundaryStep(boundaryStep + 1)
      return
    }
    if (currentQ < 6) setCurrentQ(currentQ + 1)
  }

  const evaluate = (): 'local' | 'standard' => {
    let localScore = 0
    let standardScore = 0
    for (const a of answers) {
      if (a === 0) localScore += 2
      else if (a === 1) localScore += 1
      else if (a === 3) standardScore += 1
      else if (a === 4) standardScore += 2
    }
    if (nearBoundary && boundaryAnswered) {
      const boundaryResult = evaluateBoundaryAnswers(boundaryAnswers)
      if (boundaryResult === 'standard') standardScore += 3
      else localScore += 3
    }
    return localScore >= standardScore ? 'local' : 'standard'
  }

  const handleComplete = () => {
    onComplete([...answers, ...boundaryAnswers], evaluate())
  }

  const isBoundaryQuestion = nearBoundary && currentQ >= 6
  const currentBoundaryQ = isBoundaryQuestion ? BOUNDARY_QUESTIONS[boundaryStep] : null
  const q = !isBoundaryQuestion ? BIORHYTHM_QUESTIONS[currentQ] : null

  return (
    <section id="biorhythm-quiz" className="relative mx-auto max-w-2xl scroll-mt-20 px-5 py-20 sm:px-6">
      <div className="mb-8 text-center">
        <p className="font-display text-xs font-semibold tracking-[0.35em] text-primary uppercase">
          Inner Self & Outer Self
        </p>
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">내면의 나와 타인이 보는 나</h2>
        <p className="mt-3 break-keep text-base text-muted-foreground">
          7개의 정밀 질문을 통해 당신의 타고난 성향과 타인이 인지하는 당신의 모습을 입체적으로 분석합니다.
        </p>
      </div>

      <div className="glass rounded-3xl p-6 sm:p-8">
        {/* progress */}
        <div className="mb-6 flex items-center gap-2">
          {Array.from({ length: totalQuestions }, (_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= currentQ + (nearBoundary ? boundaryStep : 0) ? 'bg-primary' : 'bg-border'}`} />
          ))}
        </div>

        {/* boundary question or normal question */}
        {isBoundaryQuestion && currentBoundaryQ ? (
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-full bg-accent/20 text-base font-bold text-accent">
                {boundaryStep + 1}
              </span>
              <span className="text-sm font-semibold tracking-wider text-accent uppercase">시주 경계선 검증</span>
            </div>
            <h3 className="break-keep text-xl font-bold leading-snug sm:text-2xl">{currentBoundaryQ.question}</h3>
            <div className="mt-5 space-y-3">
              {currentBoundaryQ.options.map((opt, i) => (
                <button key={i} type="button" onClick={() => selectBoundaryOption(boundaryStep, i)}
                  aria-pressed={boundaryAnswers[boundaryStep] === i}
                  className={`w-full break-keep rounded-2xl border-2 px-5 py-4 text-left text-base font-medium transition-all ${boundaryAnswers[boundaryStep] === i ? 'border-accent bg-accent/15 text-accent' : 'border-border bg-secondary/30 text-muted-foreground hover:border-accent/40 hover:text-foreground'}`}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ) : q ? (
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-full bg-primary/15 text-base font-bold text-primary">
                {currentQ + 1}
              </span>
              <Orbit className="size-5 text-primary" />
            </div>
            <h3 className="break-keep text-xl font-bold leading-snug sm:text-2xl">{q.question}</h3>
          </div>
        ) : null}

        {/* options */}
        {!isBoundaryQuestion && q && (
          <div className="space-y-3">
            {q.options.map((opt, i) => (
              <button key={i} type="button" onClick={() => selectOption(currentQ, i)}
                aria-pressed={answers[currentQ] === i}
                className={`w-full break-keep rounded-2xl border-2 px-5 py-4 text-left text-base font-medium transition-all ${answers[currentQ] === i ? 'border-primary bg-primary/15 text-primary' : 'border-border bg-secondary/30 text-muted-foreground hover:border-primary/40 hover:text-foreground'}`}>
                {opt}
              </button>
            ))}
          </div>
        )}

        {/* nav */}
        <div className="mt-8 flex items-center justify-between">
          <button type="button" onClick={() => setCurrentQ((p) => Math.max(0, p - 1))} disabled={currentQ === 0}
            className="flex items-center gap-1.5 rounded-xl border border-border bg-secondary/40 px-5 py-3 text-base font-medium text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40">
            <ArrowLeft className="size-5" /> 이전
          </button>
          {currentQ < 6 || (nearBoundary && boundaryStep < 1) ? (
            <button type="button" onClick={confirmAndNext} disabled={isBoundaryQuestion ? boundaryAnswers[boundaryStep] < 0 : answers[currentQ] < 0}
              className="flex items-center gap-1.5 rounded-xl bg-primary px-5 py-3 text-base font-bold text-primary-foreground transition-colors hover:bg-primary/80 disabled:opacity-40">
              <Check className="size-5" /> 확인 <ArrowRight className="size-5" />
            </button>
          ) : (
            <button type="button" onClick={handleComplete} disabled={!allAnswered || !boundaryAnswered}
              className="flex items-center gap-1.5 rounded-xl bg-primary px-6 py-3 text-base font-bold text-primary-foreground transition-colors hover:bg-primary/80 disabled:opacity-40">
              <Check className="size-5" /> 분석 결과 보기 <ArrowRight className="size-5" />
            </button>
          )}
        </div>

        {/* back to form */}
        <button type="button" onClick={onBack} className="mt-5 text-sm text-muted-foreground/60 hover:text-muted-foreground">
          ← 이전으로
        </button>
      </div>
    </section>
  )
}
