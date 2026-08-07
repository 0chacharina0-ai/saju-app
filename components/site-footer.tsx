export function SiteFooter() {
  return (
    <footer className="no-print border-t border-border bg-slate-950/50 py-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 text-lg font-bold">
            <span className="text-gradient">운시엘</span>
            <span className="text-sm font-normal text-muted-foreground">Cosmic Saju</span>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
            <a href="/support" className="transition-colors hover:text-foreground">FAQ & 1:1 문의</a>
            <span className="text-border">|</span>
            <a href="/terms" className="transition-colors hover:text-foreground">이용약관</a>
            <span className="text-border">|</span>
            <a href="/privacy" className="transition-colors hover:text-foreground">개인정보처리방침</a>
            <span className="text-border">|</span>
            <a href="/refund" className="transition-colors hover:text-foreground">환불규정</a>
          </nav>
        </div>

        <div className="border-t border-border pt-6 text-center text-xs leading-relaxed text-slate-500">
          <p>상호: 운시엘 (Cosmic Saju) | 대표자: 김천기 | 사업자등록번호: 000-00-00000</p>
          <p>통신판매업신고번호: 제2026-서울강남-0000호 | 주소: 서울특별시 강남구 테헤란로 123</p>
          <p>고객센터 이메일: help@cosmic-saju.kr | 전화: 02-0000-0000 (평일 10:00~18:00)</p>
          <p className="mt-2">© 2026 운시엘. All rights reserved. 본 서비스는 참고용 콘텐츠이며, 의료·법률·투자 등 전문적 판단을 대체하지 않습니다.</p>
        </div>
      </div>
    </footer>
  )
}
