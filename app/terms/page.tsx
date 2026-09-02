import Link from 'next/link'
import { Rocket, ArrowRight } from 'lucide-react'

export default function TermsPage() {
  return (
    <main className="relative min-h-screen">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 opacity-40 [background:radial-gradient(ellipse_at_top_left,var(--primary)_0%,transparent_45%),radial-gradient(ellipse_at_bottom_right,var(--accent)_0%,transparent_50%)]" />
      <div className="mx-auto max-w-3xl px-6 pt-32 pb-20">
        <div className="glass rounded-3xl p-8 sm:p-12">
          <Rocket className="mx-auto size-10 text-primary" />
          <h1 className="mt-4 text-center text-2xl font-bold sm:text-3xl">이용약관</h1>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p className="break-keep">제1조(목적) 본 약관은 천기(Cosmic Saju)가 제공하는 사주·운세 관련 서비스의 이용 조건 및 절차, 당사자 간의 권리·의무 및 책임 사항을 규정합니다.</p>
            <p className="break-keep">제2조(서비스 내용) 본 서비스는 참고용 콘텐츠로서, 의료·법률·투자 등 전문적 판단을 대체하지 않습니다.</p>
            <p className="break-keep">제3조(이용료) 유료 서비스의 경우, 각 서비스 안내 페이지에 표기된 금액이 청구됩니다.</p>
            <p className="break-keep">제4조(환불 규정) 결제 후 리포트가 생성되기 전에는 전액 환불 가능하며, 리포트 생성 후에는 환불이 제한될 수 있습니다.</p>
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
