import Link from 'next/link'
import { Rocket, ArrowRight } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 opacity-40 [background:radial-gradient(ellipse_at_top_left,var(--primary)_0%,transparent_45%),radial-gradient(ellipse_at_bottom_right,var(--accent)_0%,transparent_50%)]" />
      <div className="mx-auto max-w-3xl px-6 pt-32 pb-20">
        <div className="glass rounded-3xl p-8 sm:p-12">
          <Rocket className="mx-auto size-10 text-primary" />
          <h1 className="mt-4 text-center text-2xl font-bold sm:text-3xl">개인정보처리방침</h1>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p className="break-keep">천기(Cosmic Saju)는 이용자의 개인정보를 중요시하며, 개인정보보호법에 따라 개인정보를 안전하게 관리합니다.</p>
            <p className="break-keep">수집 항목: 성명, 생년월일시, 출생 지역, 성별. 수집 목적: 맞춤형 사주 리포트 생성.</p>
            <p className="break-keep">보유 기간: 이용자가 삭제를 요청할 때까지. 단, 관련 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관합니다.</p>
            <p className="break-keep">이용자는 언제든지 개인정보 열람·정정·삭제를 요청할 수 있습니다.</p>
          </div>
          <div className="mt-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/80">
              홈으로 <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
