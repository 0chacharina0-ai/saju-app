import Link from 'next/link'
import { Rocket, ArrowRight } from 'lucide-react'

export default function MbtiSajuPage() {
  return (
    <main className="relative min-h-screen">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 opacity-40 [background:radial-gradient(ellipse_at_top_left,var(--primary)_0%,transparent_45%),radial-gradient(ellipse_at_bottom_right,var(--accent)_0%,transparent_50%)]" />
      <div className="mx-auto max-w-3xl px-6 pt-32 pb-20">
        <div className="glass rounded-3xl p-8 text-center sm:p-12">
          <Rocket className="mx-auto size-10 text-primary" />
          <h1 className="mt-4 text-2xl font-bold sm:text-3xl">사주로 보는 나의 진짜 MBTI 분석</h1>
          <p className="mt-4 break-keep text-sm leading-relaxed text-muted-foreground">
            태어난 시공간의 오행 구조로 내 성향의 뿌리를 읽고, MBTI와 교차하여 진짜 나를 찾습니다. 검사가 아니라, 명식으로 푸는 성향 분석.
          </p>
          <Link href="/#saju-form" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/80">
            MBTI 사주 분석 <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </main>
  )
}
