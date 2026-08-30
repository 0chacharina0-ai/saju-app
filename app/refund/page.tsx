'use client'

import Link from 'next/link'
import { ArrowRight, RotateCcw } from 'lucide-react'

export default function RefundPage() {
  return (
    <main className="relative min-h-screen">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 opacity-40 [background:radial-gradient(ellipse_at_top_left,var(--primary)_0%,transparent_45%),radial-gradient(ellipse_at_bottom_right,var(--accent)_0%,transparent_50%)]" />
      <section className="mx-auto max-w-2xl scroll-mt-20 px-6 py-20 pt-32">
        <div className="mb-8 text-center">
          <RotateCcw className="mx-auto size-10 text-primary" />
          <p className="mt-2 font-display text-xs font-semibold tracking-[0.35em] text-primary uppercase">Refund Policy</p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">환불 규정</h2>
        </div>

        <div className="glass rounded-3xl p-6 sm:p-8">
          <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
            <div>
              <h3 className="mb-2 text-base font-bold text-foreground">1. 리포트 생성 전 환불</h3>
              <p className="break-keep">결제 후 AI 리포트 생성이 완료되기 전(결제 후 5분 이내)에는 결제 취소 및 전액 환불이 가능합니다. 마이페이지 &gt; 결제 내역에서 직접 취소하거나 고객센터(help@cosmic-saju.kr)로 요청해 주세요.</p>
            </div>
            <div>
              <h3 className="mb-2 text-base font-bold text-foreground">2. 리포트 생성 완료 후 환불</h3>
              <p className="break-keep">리포트 생성이 완료된 후에는 디지털 콘텐츠 특성상 환불이 제한됩니다. 다만 다음의 경우 예외적으로 환불을 진행합니다:</p>
              <ul className="mt-2 space-y-1 pl-4">
                <li>• 리포트에 명백한 오류(생년월일 입력 오류 등 시스템 결함)가 있는 경우</li>
                <li>• 결제 후 리포트를 한 번도 열람하지 않은 경우 (결제일로부터 7일 이내)</li>
                <li>• 중복 결제가 발생한 경우</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-base font-bold text-foreground">3. 환불 절차</h3>
              <p className="break-keep">환불 요청 후 영업일 기준 3~5일 내 결제 수단으로 환불됩니다. 부분 환불은 불가하며, 환불 시 리포트 열람 권한이 회수됩니다.</p>
            </div>
            <div>
              <h3 className="mb-2 text-base font-bold text-foreground">4. 환불 요청 방법</h3>
              <p className="break-keep">고객센터 이메일(help@cosmic-saju.kr)로 주문 번호와 환불 사유를 보내주시면 처리해 드립니다. 운영시간: 평일 10:00~18:00.</p>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <Link href="/support" className="inline-flex items-center gap-2 rounded-full border border-primary/50 bg-primary/10 px-6 py-3 text-sm font-semibold transition-colors hover:bg-primary/20">
              문의하기 <ArrowRight className="size-4" />
            </Link>
            <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-6 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">
              홈으로
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
