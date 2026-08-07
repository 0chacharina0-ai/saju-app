'use client'

import { useState, useCallback } from 'react'
import { SajuHero } from '@/components/saju-hero'
import { CosmicLanding } from '@/components/cosmic-landing'
import { PostPayStart } from '@/components/post-pay-start'
import { LoadingScreen } from '@/components/loading-screen'
import { SajuForm, type SajuFormValues } from '@/components/saju-form'
import { SajuResultView } from '@/components/saju-result'
import { BiorhythmQuiz } from '@/components/biorhythm-quiz'
import { AdditionalQuestions, type AdditionalAnswers } from '@/components/additional-questions'
import { SajuTeaser } from '@/components/saju-teaser'
import { StarField } from '@/components/star-field'
import { calculateSaju, type SajuResult } from '@/lib/saju'
import { saveSajuRecord, savePayment } from '@/lib/mock-data'

type Step = 'form' | 'teaser' | 'post-pay' | 'biorhythm' | 'additional' | 'loading' | 'result'

export default function Page() {
  const [step, setStep] = useState<Step>('form')
  const [values, setValues] = useState<SajuFormValues | null>(null)
  const [result, setResult] = useState<SajuResult | null>(null)
  const [biorhythmAnswers, setBiorhythmAnswers] = useState<number[]>([])
  const [timeCorrection, setTimeCorrection] = useState<'local' | 'standard'>('standard')
  const [nearBoundary, setNearBoundary] = useState(false)
  const [additional, setAdditional] = useState<AdditionalAnswers | null>(null)
  const [fromFreePreview, setFromFreePreview] = useState(false)

  const scrollToForm = useCallback(() => {
    document.getElementById('saju-form')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const handleSubmit = useCallback((v: SajuFormValues) => {
    setValues(v)
    // 시주 경계선 검증: 출생 시간이 시지 경계 전후 15~20분에 해당하는지 확인
    // 시지는 2시간 단위로 나뉘며, 각 시지의 경계는 홀수 시(1,3,5,...시) 기준
    // 출생 '시'가 정각(0분)이거나 45~59분 사이면 경계선 근처로 판정
    if (v.hour >= 0) {
      const minutes = v.hour % 2 // 시지는 2시간 간격 (예: 자시 23-1시, 축시 1-3시)
      // 각 시지의 경계에서 ±15~20분 이내면 nearBoundary
      // 단순화: hour가 홀수(시지 경계)이거나, 분 정보가 없으므로 정각 근처면 경계로 간주
      // 실제로는 hour만 입력받으므로, hour가 시지 경계 시간대이면 경계선 질문 추가
      // 시지 경계: 1시, 3시, 5시, 7시, 9시, 11시, 13시, 15시, 17시, 19시, 21시, 23시
      const boundaryHours = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23]
      setNearBoundary(boundaryHours.includes(v.hour))
    } else {
      setNearBoundary(false)
    }

    // 무료 만세력: 시차 보정 없이 표준시로 즉시 결과 계산하여 바로 미리보기 표시
    const res = calculateSaju({
      year: v.year,
      month: v.month,
      day: v.day,
      hour: v.hour,
      calendar: v.calendar,
      cityOffsetMin: 0,
      gender: v.gender,
    })
    setResult(res)
    setFromFreePreview(true)
    setStep('teaser')
    requestAnimationFrame(() => {
      document.getElementById('saju-teaser')?.scrollIntoView({ behavior: 'smooth' })
    })
  }, [])

  const handleBiorhythmComplete = useCallback((answers: number[], recommendation: 'local' | 'standard') => {
    setBiorhythmAnswers(answers)
    setTimeCorrection(recommendation)

    if (values) {
      const adjustedOffset = recommendation === 'local' ? values.cityOffsetMin : 0
      const res = calculateSaju({
        year: values.year,
        month: values.month,
        day: values.day,
        hour: values.hour,
        calendar: values.calendar,
        cityOffsetMin: adjustedOffset,
        gender: values.gender,
      })
      setResult(res)
    }

    setStep('additional')
    requestAnimationFrame(() => {
      document.getElementById('additional-questions')?.scrollIntoView({ behavior: 'smooth' })
    })
  }, [values])

  // 정밀 분석 시작: 결제 완료 후 '시작하기' 버튼 클릭 시 biorhythm 단계로 진입
  // (handleStartPrecision는 handleStartPostPay로 대체됨)

  const handleAdditionalComplete = useCallback((answers: AdditionalAnswers) => {
    setAdditional({ ...answers, currentConcern: values?.currentConcern ?? '' })
    setStep('loading')
    requestAnimationFrame(() => {
      document.getElementById('loading-screen')?.scrollIntoView({ behavior: 'smooth' })
    })
    // 로딩 4초 후 리포트 오픈
    setTimeout(() => {
      setStep('result')
      requestAnimationFrame(() => {
        document.getElementById('saju-result')?.scrollIntoView({ behavior: 'smooth' })
      })
    }, 4000)
  }, [values])

  const handlePay = useCallback(() => {
    if (!values || !result) return

    // Mock: save record and payment (no real DB)
    const recordId = saveSajuRecord({
      name: values.name,
      birth: `${values.year}-${values.month}-${values.day}`,
      concern: '',
    })
    savePayment(recordId)

    // 결제 완료 후 '시작하기' 화면으로 이동
    setStep('post-pay')
    requestAnimationFrame(() => {
      document.getElementById('post-pay-start')?.scrollIntoView({ behavior: 'smooth' })
    })
  }, [values, result])

  const handleStartPostPay = useCallback(() => {
    setStep('biorhythm')
    requestAnimationFrame(() => {
      document.getElementById('biorhythm-quiz')?.scrollIntoView({ behavior: 'smooth' })
    })
  }, [])

  const handleReset = useCallback(() => {
    setStep('form')
    setValues(null)
    setResult(null)
    setBiorhythmAnswers([])
    setAdditional(null)
    setFromFreePreview(false)
    scrollToForm()
  }, [scrollToForm])

  return (
    <main className="relative min-h-screen">
      {/* ambient neon glow */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 opacity-40 [background:radial-gradient(ellipse_at_top_left,var(--primary)_0%,transparent_45%),radial-gradient(ellipse_at_bottom_right,var(--accent)_0%,transparent_50%)]" />
      {/* cosmic starfield + galaxy particles — all steps */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <StarField />
      </div>

      {step === 'form' && (
        <>
          <SajuHero onStart={scrollToForm} />
          <CosmicLanding />
        </>
      )}
      {step === 'form' && <SajuForm onSubmit={handleSubmit} />}

      {step === 'biorhythm' && (
        <BiorhythmQuiz
          onComplete={handleBiorhythmComplete}
          onBack={() => { setStep('post-pay'); requestAnimationFrame(() => document.getElementById('post-pay-start')?.scrollIntoView({ behavior: 'smooth' })) }}
          nearBoundary={nearBoundary}
        />
      )}

      {step === 'additional' && (
        <AdditionalQuestions
          onComplete={handleAdditionalComplete}
          onBack={() => { setStep('biorhythm'); requestAnimationFrame(() => document.getElementById('biorhythm-quiz')?.scrollIntoView({ behavior: 'smooth' })) }}
        />
      )}

      {step === 'teaser' && values && result && (
        <SajuTeaser
          values={values}
          result={result}
          additional={additional ?? { concernAreas: [], loveStatus: '', freeQuestion: '', currentConcern: '' }}
          onPay={handlePay}
          onBack={() => { setStep('form'); scrollToForm() }}
          isFreePreview={fromFreePreview}
        />
      )}

      {step === 'post-pay' && (
        <PostPayStart onStart={handleStartPostPay} />
      )}

      {step === 'loading' && (
        <LoadingScreen />
      )}

      {step === 'result' && values && result && additional && (
        <SajuResultView
          values={values}
          result={result}
          additional={additional}
          onReset={handleReset}
        />
      )}
    </main>
  )
}
