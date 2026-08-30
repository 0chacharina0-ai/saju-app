'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sparkles, Orbit, Telescope, MoonStar, Star, Sun, ScrollText, Compass, Gem, Heart, HeartPulse, Users, FileText, BookOpen, User as User3, Menu, X, ChevronDown } from 'lucide-react'

type NavChild = { label: string; href: string; icon: typeof Star; badge?: string }
type NavCategory = {
  id: string
  label: string
  icon: typeof Star
  children: NavChild[]
}

const NAV_CATEGORIES: NavCategory[] = [
  {
    id: 'free',
    label: '무료 운세 & 타로',
    icon: Sparkles,
    children: [
      { label: '무료 타로 (오늘의 타로 & YES/NO)', href: '/free-tarot', icon: MoonStar, badge: 'FREE' },
      { label: '무료 만세력 (코스믹 스타맵)', href: '/#saju-form', icon: Orbit, badge: 'FREE' },
      { label: '오늘의 운세 & 일상 개운법', href: '/daily-fortune', icon: Sun, badge: 'FREE' },
    ],
  },
  {
    id: 'traditional',
    label: '정밀 사주 분석',
    icon: Compass,
    children: [
      { label: '1:1 맞춤 정밀 사주 메인 종합 보고서 (올인원 패키지)', href: '/checkout', icon: ScrollText, badge: 'BEST' },
      { label: '2027 정미년 신년운세', href: '/newyear-2027', icon: Star, badge: '시즌' },
      { label: '1:1 심층 궁합 보고서', href: '/compatibility', icon: Users, badge: 'HOT' },
    ],
  },
  {
    id: 'theme',
    label: '테마별 심층 리포트',
    icon: Telescope,
    children: [
      { label: '테마: 재물 / 소득 / 자산운', href: '/theme/wealth', icon: Gem, badge: '추천' },
      { label: '테마: 커리어 / 이직 / 성공운', href: '/theme/career', icon: Compass, badge: '추천' },
      { label: '테마: 연애 / 이성 / 인연운', href: '/theme/love', icon: Heart, badge: '추천' },
      { label: '테마: 건강 / 오행 체질 분석', href: '/theme/health', icon: HeartPulse, badge: 'NEW' },
    ],
  },
  {
    id: 'mypage',
    label: '마이페이지',
    icon: User3,
    children: [
      { label: '마이페이지 & 내 리포트 보관함', href: '/mypage', icon: User3 },
      { label: '초보자를 위한 사주/오행 가이드', href: '/guide', icon: BookOpen },
      { label: 'FAQ & 1:1 문의하기', href: '/support', icon: FileText },
    ],
  },
]

const BADGE_STYLES: Record<string, string> = {
  BEST: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  HOT: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  FREE: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  NEW: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
  '시즌': 'bg-violet-500/20 text-violet-400 border-violet-500/30',
  '추천': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
}

function isActive(pathname: string, href: string): boolean {
  if (href.startsWith('/#')) return pathname === '/'
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(href + '/')
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>('free')
  const pathname = usePathname()

  const toggleCategory = (id: string) => {
    setExpanded(expanded === id ? null : id)
  }

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header className="no-print sticky top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-md transition-shadow duration-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold">
            <Orbit className="size-5 text-teal-300" />
            <span className="text-gradient">운시엘</span>
            <span className="hidden text-sm font-normal text-muted-foreground sm:inline">Cosmic Saju</span>
          </Link>

          {/* Desktop nav — accordion dropdowns */}
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_CATEGORIES.map((cat) => {
              const CatIcon = cat.icon
              return (
                <div key={cat.id} className="group relative">
                  <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <CatIcon className="size-4" />
                    {cat.label}
                    <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" />
                  </button>
                  <div className="invisible absolute left-0 top-full pt-1 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                    <div className="w-80 rounded-xl border border-white/10 bg-black/60 p-2 shadow-xl backdrop-blur-md">
                      {cat.children.map((child) => {
                        const ChildIcon = child.icon
                        return (
                          <Link
                            key={child.label}
                            href={child.href}
                            className={`flex min-h-[44px] items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-white/10 ${isActive(pathname, child.href) ? 'bg-amber-500/10 text-amber-500' : 'text-muted-foreground hover:text-foreground'}`}
                          >
                            <ChildIcon className="size-4 shrink-0 text-teal-300/80" />
                            <span className="flex-1 break-keep">{child.label}</span>
                            {child.badge && (
                              <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[0.65rem] font-bold ${BADGE_STYLES[child.badge] ?? 'bg-primary/15 text-primary'}`}>
                                {child.badge}
                              </span>
                            )}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            })}
          </nav>

          <button type="button" onClick={() => setOpen(true)} className="flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground lg:hidden" aria-label="메뉴 열기">
            <Menu className="size-5" />
          </button>
        </div>
      </header>

      {/* Mobile navigation drawer */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!open}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setOpen(false)}
        />

        {/* Drawer panel */}
        <div
          className={`absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col border-l border-white/10 bg-black/80 shadow-2xl backdrop-blur-md transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
        >
          {/* Header: brand + close */}
          <div className="flex items-center justify-between border-b border-white/10 p-5">
            <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2 text-lg font-bold">
              <Orbit className="size-5 text-teal-300" />
              <span className="text-gradient">운시엘</span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
              aria-label="메뉴 닫기"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Menu body — scrollable */}
          <nav className="flex-1 overflow-y-auto px-2 py-2">
            {NAV_CATEGORIES.map((cat) => {
              const CatIcon = cat.icon
              const isExpanded = expanded === cat.id
              return (
                <div key={cat.id} className="border-b border-white/5">
                  <button
                    type="button"
                    onClick={() => toggleCategory(cat.id)}
                    className="flex min-h-[52px] w-full items-center gap-3 px-3 py-3 text-base font-semibold text-foreground"
                  >
                    <CatIcon className="size-5 text-teal-300" />
                    <span className="flex-1 break-keep text-left">{cat.label}</span>
                    <ChevronDown className={`size-5 text-muted-foreground transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                  {isExpanded && (
                    <div className="pb-1">
                      {cat.children.map((child) => {
                        const ChildIcon = child.icon
                        const active = isActive(pathname, child.href)
                        return (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className={`flex min-h-[52px] items-center gap-3 rounded-lg px-3 py-3 pl-12 text-base font-medium transition-colors ${active ? 'bg-amber-500/10 text-amber-500' : 'text-muted-foreground hover:bg-white/10 hover:text-foreground'}`}
                          >
                            <ChildIcon className={`size-4 shrink-0 ${active ? 'text-amber-500' : 'text-teal-300/80'}`} />
                            <span className="flex-1 break-keep">{child.label}</span>
                            {child.badge && (
                              <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[0.65rem] font-bold ${BADGE_STYLES[child.badge] ?? 'bg-primary/15 text-primary'}`}>
                                {child.badge}
                              </span>
                            )}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          {/* Footer — sub-menu + version */}
          <div className="border-t border-white/10 px-5 py-4">
            <nav className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground/70">
              <Link href="/support" onClick={() => setOpen(false)} className="transition-colors hover:text-foreground">FAQ & 문의</Link>
              <span className="text-border/50">|</span>
              <Link href="/mypage" onClick={() => setOpen(false)} className="transition-colors hover:text-foreground">마이페이지</Link>
              <span className="text-border/50">|</span>
              <Link href="/terms" onClick={() => setOpen(false)} className="transition-colors hover:text-foreground">이용약관</Link>
              <span className="text-border/50">|</span>
              <Link href="/privacy" onClick={() => setOpen(false)} className="transition-colors hover:text-foreground">개인정보처리방침</Link>
              <span className="text-border/50">|</span>
              <Link href="/refund" onClick={() => setOpen(false)} className="transition-colors hover:text-foreground">환불규정</Link>
            </nav>
            <p className="mt-2 text-xs text-muted-foreground/50">운시엘 Cosmic Saju v1.0.0 © 2026</p>
          </div>
        </div>
      </div>
    </>
  )
}
