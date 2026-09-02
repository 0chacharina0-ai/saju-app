'use client'

import { useState, useEffect } from 'react'
import { Sparkles, Star, Quote, Timer, ArrowRight, BookOpen, CircleCheck as CheckCircle2, Eye, X, Award, FileText, ShieldCheck, Users, Compass, Brain, PenLine } from 'lucide-react'
import Link from 'next/link'
import { SajuForm, type SajuFormValues } from '@/components/saju-form'
import { calculateSaju } from '@/lib/saju'

const TOPICS = [
  { title: '만세력 판독 & 원국 구조', desc: '당신의 탄생 좌표, 사주팔자, 오행 분포, 일간 정체성' },
  { title: '재물운 & 평생 금전 흐름', desc: '돈 버는 방식, 손재 위험, 축재 전략, 부의 최대치' },
  { title: '직장·커리어·사업운', desc: '조직 vs 사업 적성, 승진·독립 시기, 평생 업' },
  { title: '연애·결혼운 & 인연 시기', desc: '끌리는 유형, 실패 패턴, 잘 맞는 타입, 인연 시기' },
  { title: '10년 대운 & 연도별 세운', desc: '대운별 키워드, 변곡점, 인생이 열리는 해' },
]

const REVIEWS = [
  { name: '김*희', rating: 5, text: '대운 흐름이 너무 정확해서 깜짝 놀랐어요. 3년 전 이직이 대운 변화와 정확히 맞물렸습니다.' },
  { name: '이*준', rating: 5, text: '리포트 분량이 원고지 수십 장 분량이에요. 다른 사주 앱과 차원이 다른 디테일이에요.' },
  { name: '박*서', rating: 5, text: '재물운에서 "보증 금지"라고 한 게 진짜 도움됐어요. 바로 친구 보증 거절했어요.' },
  { name: '최*원', rating: 4, text: '신년운세 월별 풀이가 매달 달력처럼 나와서 한 해 계획 세우는 데 바로 썼어요.' },
  { name: '정*아', rating: 5, text: '연애운에서 애착 유형을 분석해주는데, "회피형"이라는 걸 처음 인식했어요. 큰 깨달음이었어요.' },
]

const LOADING_MESSAGES = [
  '명리 만세력을 정밀 판독하는 중...',
  '10년 대운과 세운의 흐름을 계산하고 있습니다...',
  '오행(목화토금수)의 균형을 분석하는 중...',
  '용신을 찾아 개운법을 도출하고 있습니다...',
  '우주의 궤도를 당신의 사주에 매핑하는 중...',
  '리포트를 마무리하고 있어요. 거의 다 됐어요...',
]

const USP_CARDS = [
  {
    icon: Compass,
    title: '지방시 보정',
    subtitle: '표준시 오차 60%를 잡다',
    desc: '출생 도시의 경도에 따라 분 단위로 시차를 보정합니다. 같은 시각에 태어나도 서울과 울릉도는 다른 사주입니다. 그동안 사주가 맞지 않았다면, 당신 탓이 아닙니다.',
    color: 'text-teal-400',
    border: 'border-teal-400/30',
    bg: 'bg-teal-400/5',
  },
  {
    icon: PenLine,
    title: '원고지 분량의 심층 서사',
    subtitle: '뻔한 템플릿이 아니다',
    desc: '8개 챕터에 걸쳐 당신의 사주팔자를 입체적으로 풀어냅니다. 단순 키워드 나열이 아니라, 당신의 인생 궤도를 읽어주는 방대한 서사입니다. 한 번 읽으면 평생 참고할 수 있는 깊이.',
    color: 'text-amber-400',
    border: 'border-amber-400/30',
    bg: 'bg-amber-400/5',
  },
  {
    icon: Brain,
    title: '현대 심리 기반 AI 분석',
    subtitle: '마음을 읽어주는 통찰',
    desc: '명리학의 고전적 지혜를 현대 심리학과 융합하여 해석합니다. "편관이 강하다"가 아니라, "책임감이 무거워서 혼자 끌어안는 성향이 있다"로 풀어줍니다.',
    color: 'text-rose-400',
    border: 'border-rose-400/30',
    bg: 'bg-rose-400/5',
  },
]

export function CheckoutLanding() {
  const [currentReview, setCurrentReview] = useState(0)
  const [loadingMsg, setLoadingMsg] = useState(0)
  const [submitted, setSubmitted] = useState<SajuFormValues | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview(prev => (prev + 1) % REVIEWS.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingMsg(prev => (prev + 1) % LOADING_MESSAGES.length)
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  const handleSajuSubmit = (values: SajuFormValues) => {
    setSubmitted(values)
    const teaser = document.getElementById('saju-teaser')
    if (teaser) teaser.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="relative min-h-screen w-full max-w-[100vw] overflow-x-hidden pb-24">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 opacity-40 [background:radial-gradient(ellipse_at_top_left,var(--primary)_0%,transparent_45%),radial-gradient(ellipse_at_bottom_right,var(--accent)_0%,transparent_50%)]" />

      <section className="mx-auto max-w-3xl scroll-mt-20 px-5 py-20 pt-4 sm:px-6">
        {/* Hero */}
        <div className="mb-10 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-5 py-2 text-sm font-bold text-rose-400">
            <Timer className="size-4" /> 런칭 특가 50% OFF
          </div>
          <h1 className="text-3xl font-bold sm:text-5xl">1:1 맞춤 정통사주</h1>
          <p className="mt-4 break-keep text-base text-muted-foreground sm:text-lg">원고지 분량의 심층 보고서 &middot; 평생 대운 &middot; 우주 궤도 매핑</p>
        </div>

        {/* 사주 입력 폼 */}
        <div id="saju-form" className="mb-12">
          <SajuForm onSubmit={handleSajuSubmit} />
        </div>

        {/* 3대 차별점 USP 카드 */}
        <div className="mb-12">
          <h2 className="mb-6 text-center text-xl font-bold sm:text-2xl">왜 이 리포트는 다른가?</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {USP_CARDS.map((card) => {
              const Icon = card.icon
              return (
                <div key={card.title} className={`rounded-2xl border-2 ${card.border} ${card.bg} p-5`}>
                  <Icon className={`size-8 ${card.color}`} />
                  <p className="mt-3 text-lg font-bold text-foreground">{card.title}</p>
                  <p className={`mt-1 text-sm font-semibold ${card.color}`}>{card.subtitle}</p>
                  <p className="mt-3 break-keep text-sm leading-relaxed text-muted-foreground">{card.desc}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* 5 core topics */}
        <div className="mb-12">
          <h2 className="mb-5 flex items-center gap-2 text-lg font-bold sm:text-xl"><BookOpen className="size-5 text-primary" /> 이 리포트 하나로 알 수 있는 5가지 핵심 주제</h2>
          <div className="space-y-3">
            {TOPICS.map((t, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-border bg-secondary/20 p-4">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-base font-bold text-primary">{i + 1}</div>
                <div>
                  <p className="break-keep text-base font-bold text-foreground">{t.title}</p>
                  <p className="break-keep mt-0.5 text-sm text-muted-foreground">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Review slider */}
        <div className="mb-12">
          <div className="mb-5 flex items-center gap-2">
            <h2 className="text-lg font-bold sm:text-xl">실사용자 만족도</h2>
            <div className="flex items-center gap-1">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-bold text-amber-400">4.9</span>
              <span className="text-xs text-muted-foreground">/ 5.0</span>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-border bg-secondary/20 p-6">
            <Quote className="mb-3 size-6 text-primary/40" />
            <p className="break-keep min-h-[3rem] text-base leading-relaxed text-foreground/85">{REVIEWS[currentReview].text}</p>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-muted-foreground">{REVIEWS[currentReview].name}</p>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`size-3.5 ${i < REVIEWS[currentReview].rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'}`} />
                ))}
              </div>
            </div>
            <div className="mt-4 flex justify-center gap-1.5">
              {REVIEWS.map((_, i) => (
                <button key={i} onClick={() => setCurrentReview(i)} aria-label={`후기 ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${i === currentReview ? 'w-6 bg-primary' : 'w-1.5 bg-muted-foreground/30'}`} />
              ))}
            </div>
          </div>
        </div>

        {/* 비교표 */}
        <div className="mb-12">
          <h2 className="mb-2 flex items-center gap-2 text-lg font-bold sm:text-xl"><Award className="size-5 text-primary" /> 일반 운세 앱과의 비교</h2>
          <p className="mb-5 break-keep text-sm text-muted-foreground">무엇이 다른지 한눈에 비교해보세요.</p>

          <div className="overflow-x-hidden rounded-2xl border border-border">
            <div className="grid grid-cols-3 border-b border-border bg-secondary/30 text-center text-sm font-bold">
              <div className="py-3 pl-4 text-left text-muted-foreground">비교 항목</div>
              <div className="py-3 text-muted-foreground">시중 운세 앱</div>
              <div className="py-3 pr-4 text-primary">본 리포트</div>
            </div>
            {[
              { label: '지방시 시차 보정', normal: 'X (표준시 135도 고정)', ours: 'O (출생 도시 경도별 분 단위 보정)' },
              { label: '판독 로직', normal: '단순 별자리/일간 키워드', ours: '40년 명리학 대가 정통 만세력 로직' },
              { label: '대운/연운 분석', normal: '연도 운세만 제공', ours: '10년 대운 + 연도별 세운 + 월운' },
              { label: '합/충/형/해 신살', normal: '미지원 또는 단순 표시', ours: '8자 전체 상호작용 입체 분석' },
              { label: '리포트 분량', normal: '1~3장 요약', ours: '원고지 분량의 심층 분석' },
              { label: '개운법(행동 가이드)', normal: 'X', ours: 'O (컬러/음식/장소/방향)' },
            ].map((row, i) => (
              <div key={i} className={`grid grid-cols-3 border-b border-border/50 text-center text-sm last:border-b-0 ${i % 2 === 0 ? 'bg-background/40' : ''}`}>
                <div className="py-3 pl-4 text-left font-medium text-foreground/90">{row.label}</div>
                <div className="flex items-center justify-center py-3 text-muted-foreground">
                  <X className="size-4 text-rose-400" /> <span className="ml-1.5 text-xs">{row.normal}</span>
                </div>
                <div className="flex items-center justify-center py-3 pr-4 text-foreground">
                  <CheckCircle2 className="size-4 shrink-0 text-emerald-400" /> <span className="ml-1.5 text-xs font-medium">{row.ours}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 압도적 분량 강조 박스 */}
        <div className="mb-12 rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-accent/5 p-6 text-center sm:p-8">
          <FileText className="mx-auto size-10 text-primary" />
          <p className="mt-4 text-xl font-bold text-foreground sm:text-2xl">원고지 분량의 압도적 입체 분석</p>
          <p className="mx-auto mt-3 max-w-md break-keep text-base leading-relaxed text-muted-foreground">8개 챕터에 걸쳐 원국 구조, 재물, 커리어, 연애, 대운, 합충, 3D 자아 프레임워크, 종합 개운 솔루션까지. 한 번 읽으면 평생 참고할 수 있는 깊이입니다.</p>
        </div>

        {/* 구매자 신뢰 지표 */}
        <div className="mb-12 flex flex-col gap-4 sm:flex-row">
          <div className="flex-1 rounded-2xl border border-border bg-secondary/20 p-5 text-center">
            <ShieldCheck className="mx-auto size-8 text-emerald-400" />
            <p className="mt-2 text-base font-bold text-foreground">100% 만족도 보장</p>
            <p className="mt-1 break-keep text-sm text-muted-foreground">리포트 내용에 만족하지 않으시면 7일 내 환불해드립니다.</p>
          </div>
          <div className="flex-1 rounded-2xl border border-border bg-secondary/20 p-5 text-center">
            <Users className="mx-auto size-8 text-primary" />
            <p className="mt-2 text-base font-bold text-foreground">12,000+ 구매자 선택</p>
            <p className="mt-1 break-keep text-sm text-muted-foreground">평균 평점 4.9/5.0, 재구매율 38%의 신뢰.</p>
          </div>
        </div>

        {/* Sample preview */}
        <div className="mb-12">
          <h2 className="mb-5 flex items-center gap-2 text-lg font-bold sm:text-xl"><Eye className="size-5 text-primary" /> 샘플 리포트 3초 미리보기</h2>
          <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-primary/70">Chapter 1</span>
            </div>
            <h3 className="mb-2 text-base font-bold">만세력 판독 &amp; 원국 핵심 구조 분석</h3>
            <p className="break-keep text-sm leading-relaxed text-muted-foreground">당신이 이 세상에 도착한 좌표는 다음과 같아요. 양력 1995년 3월 15일 12:00 전후, 서울에서 태어나셨어요. 출생 지역의 시차(-32분)를 보정하여 표준시가 가린 당신의 진짜 시간을 찾아냈어요. 당신의 일간, 즉 "나 자신"을 상징하는 기운은...</p>
            <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-3 text-center text-xs font-semibold text-primary/70">이후 8챕터 &middot; 원고지 분량의 심층 보고서가 이어집니다</div>
          </div>
        </div>

        {/* 결제 후 받는 것 */}
        <div className="mb-12 rounded-2xl border border-border bg-secondary/20 p-6">
          <h2 className="mb-4 text-lg font-bold sm:text-xl">결제 후 받는 것</h2>
          <div className="space-y-3">
            {['8챕터 심층 사주 리포트 (원고지 분량)', '10년 대운 & 연도별 세운 분석', '핵심 키워드 & 궁합 지수 시각화', '실전 행동 가이드 (개운 컬러/음식/장소)', '마이페이지 영구 보관 & PDF 다운로드'].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-base text-foreground/85">
                <CheckCircle2 className="size-5 shrink-0 text-emerald-400" /> {item}
              </div>
            ))}
          </div>
        </div>

        {/* 상세 리포트 구성 안내 */}
        <div className="mb-12">
          <h2 className="mb-5 flex items-center gap-2 text-lg font-bold sm:text-xl"><BookOpen className="size-5 text-primary" /> 상세 리포트 구성 안내</h2>
          <div className="mb-6 space-y-3">
            {['만세력 원국 판독 (사주팔자 8자 + 오행 분포)', '10년 대운 + 연도별 세운 + 월운 흐름', '재물/커리어/연애/건강 4대 주제 심층 분석', '합/충/형/해 신살 영향 풀이', '3D 자아 프레임워크 (내면/외면/갭 해법)', '종합 맞춤 개운 솔루션 + 실천 가이드'].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-base text-foreground/85">
                <CheckCircle2 className="size-5 shrink-0 text-emerald-400" /> {item}
              </div>
            ))}
          </div>
        </div>

        {/* 단일 결제 박스 — 유일한 CTA */}
        <div className="rounded-3xl border-2 border-primary/40 bg-gradient-to-br from-primary/10 to-accent/5 p-8 text-center sm:p-10">
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="text-xl text-muted-foreground/50 line-through sm:text-2xl">49,000원</span>
            <span className="rounded-full bg-rose-500/20 px-3 py-1 text-sm font-bold text-rose-400">50% 할인</span>
          </div>
          <p className="mb-2 text-4xl font-bold text-primary sm:text-5xl">24,900원</p>
          <p className="mb-1 text-base text-muted-foreground">원고지 분량의 심층 사주 보고서 전체</p>
          <p className="mb-2 text-sm text-muted-foreground">결제 후 3~5초 내 리포트 생성 완료</p>

          <div className="mb-6 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground/70">
            <span className="flex items-center gap-1"><CheckCircle2 className="size-3 text-green-500" /> 테스트 결제</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="size-3 text-green-500" /> 즉시 열람</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="size-3 text-green-500" /> 환불 가능</span>
          </div>

          <Link href="/#saju-form" className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-5 text-base font-bold text-primary-foreground transition-all hover:bg-primary/80 hover:shadow-lg sm:w-auto sm:px-12 sm:text-lg">
            <Sparkles className="size-5" /> 24,900원에 원고지 분량 심층 사주 전체 보기 <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </main>
  )
}
