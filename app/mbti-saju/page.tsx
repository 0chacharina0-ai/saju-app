import Link from 'next/link'
import { Rocket, ArrowRight } from 'lucide-react'
import { CosmicBackground } from '@/components/cosmic-background'

export default function MbtiSajuPage() {
  return (
    <main className="cosmic-bg">
      <CosmicBackground />
      <section className="cosmic-section mx-auto max-w-3xl">
        <div className="cosmic-card cosmic-card-lg cosmic-anim p-8 text-center sm:p-12">
          <Rocket className="cosmic-icon text-primary" style={{ width: '3rem', height: '3rem' }} />
          <span className="cosmic-eyebrow mt-4">MBTI × Saju</span>
          <h1 className="cosmic-title mt-2">사주로 보는 나의 진짜 MBTI 분석</h1>
          <p className="cosmic-subtitle mt-4">
            태어난 시공간의 오행 구조로 내 성향의 뿌리를 읽고 MBTI와 교차하여 진짜 나를 찾습니다. 검사가 아니라 명식으로 푸는 성향 분석입니다.
          </p>
          <Link href="/#saju-form" className="cosmic-btn mt-8">
            MBTI 사주 분석 <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
