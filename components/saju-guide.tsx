'use client'

import { useState, useMemo } from 'react'
import { Search, BookOpen, Palette, Circle as HelpCircle, ChevronDown, ArrowRight, Sparkles } from 'lucide-react'
import { GUIDE_TERMS, OHAENG_TIPS, QA_ITEMS } from '@/lib/saju-guide'
import Link from 'next/link'

const ELEMENT_COLORS: Record<string, string> = {
  wood: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400',
  fire: 'border-rose-500/30 bg-rose-500/5 text-rose-400',
  earth: 'border-amber-500/30 bg-amber-500/5 text-amber-400',
  metal: 'border-slate-400/30 bg-slate-400/5 text-slate-300',
  water: 'border-sky-500/30 bg-sky-500/5 text-sky-400',
}

function Accordion({ title, icon: Icon, children, defaultOpen = false }: {
  title: string
  icon: typeof BookOpen
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="rounded-2xl border border-border bg-secondary/20 overflow-hidden">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center gap-3 p-5 text-left transition-colors hover:bg-secondary/40">
        <Icon className="size-5 shrink-0 text-primary" />
        <span className="break-keep flex-1 text-base font-bold text-foreground">{title}</span>
        <ChevronDown className={`size-5 shrink-0 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="border-t border-border p-5">{children}</div>}
    </div>
  )
}

export function SajuGuide() {
  const [query, setQuery] = useState('')

  const filteredTerms = useMemo(() => {
    if (!query.trim()) return GUIDE_TERMS
    const q = query.toLowerCase()
    return GUIDE_TERMS.filter(t => t.term.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q) || t.short.toLowerCase().includes(q))
  }, [query])

  const filteredQA = useMemo(() => {
    if (!query.trim()) return QA_ITEMS
    const q = query.toLowerCase()
    return QA_ITEMS.filter(item => item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q))
  }, [query])

  const filteredTips = useMemo(() => {
    if (!query.trim()) return OHAENG_TIPS
    const q = query.toLowerCase()
    return OHAENG_TIPS.filter(t => t.label.toLowerCase().includes(q) || t.color.toLowerCase().includes(q) || t.food.toLowerCase().includes(q) || t.action.toLowerCase().includes(q))
  }, [query])

  return (
    <section className="mx-auto max-w-3xl scroll-mt-20 px-6 py-20 pt-4">
      <div className="mb-8 text-center">
        <p className="font-display text-xs font-semibold tracking-[0.35em] text-primary uppercase">Saju Guide</p>
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">초보자를 위한 사주/오행 가이드</h2>
        <p className="mt-3 break-keep text-sm text-muted-foreground">
          사주의 기본 개념부터 오행별 개운법까지, 일상 언어로 쉽게 풀어낸 사주 백과사전
        </p>
      </div>

      {/* Search bar */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="궁금한 사주 용어나 개운법을 검색해 보세요"
            className="w-full rounded-full border border-border bg-[#1e1e2e] py-3.5 pl-12 pr-4 text-sm text-white outline-none transition-colors placeholder:text-white/40 focus:border-primary/60 focus:ring-2 focus:ring-ring/40"
          />
        </div>
      </div>

      {/* Accordions */}
      <div className="space-y-4">
        {/* 1. Terms dictionary */}
        <Accordion title="1분 사주 용어 사전" icon={BookOpen} defaultOpen>
          <div className="space-y-3">
            {filteredTerms.length === 0 && <p className="text-sm text-muted-foreground">검색 결과가 없어요.</p>}
            {filteredTerms.map((term, i) => (
              <div key={i} className="rounded-xl border border-border/50 bg-background/40 p-4">
                <div className="mb-1 flex items-center gap-2">
                  <span className="break-keep text-sm font-bold text-primary">{term.term}</span>
                  <span className="rounded-full border border-primary/20 bg-primary/5 px-2 py-0.5 text-xs text-primary/70">{term.category}</span>
                </div>
                <p className="break-keep mb-1 text-xs text-muted-foreground/70">{term.short}</p>
                <p className="break-keep text-sm leading-relaxed text-foreground/80">{term.desc}</p>
              </div>
            ))}
          </div>
        </Accordion>

        {/* 2. Ohaeng tips */}
        <Accordion title="오행별 일상 개운 팁" icon={Palette}>
          <div className="space-y-4">
            {filteredTips.length === 0 && <p className="text-sm text-muted-foreground">검색 결과가 없어요.</p>}
            {filteredTips.map((tip, i) => (
              <div key={i} className={`rounded-xl border p-4 ${ELEMENT_COLORS[tip.element]}`}>
                <p className="break-keep mb-3 text-sm font-bold">{tip.label}</p>
                <div className="space-y-2 text-sm text-foreground/80">
                  <p className="break-keep"><span className="font-bold text-foreground/90">색상:</span> {tip.color}</p>
                  <p className="break-keep"><span className="font-bold text-foreground/90">음식:</span> {tip.food}</p>
                  <p className="break-keep"><span className="font-bold text-foreground/90">장소:</span> {tip.place}</p>
                  <p className="break-keep"><span className="font-bold text-foreground/90">행운의 숫자:</span> {tip.number}</p>
                  <p className="break-keep"><span className="font-bold text-foreground/90">개운 행동:</span> {tip.action}</p>
                </div>
              </div>
            ))}
          </div>
        </Accordion>

        {/* 3. Q&A */}
        <Accordion title="사주 Q&A / 오해와 진실" icon={HelpCircle}>
          <div className="space-y-3">
            {filteredQA.length === 0 && <p className="text-sm text-muted-foreground">검색 결과가 없어요.</p>}
            {filteredQA.map((item, i) => (
              <div key={i} className="rounded-xl border border-border/50 bg-background/40 p-4">
                <p className="break-keep mb-2 text-sm font-bold text-primary">Q. {item.question}</p>
                <p className="break-keep mb-2 text-sm leading-relaxed text-foreground/80">A. {item.answer}</p>
                <div className="mt-3 space-y-1 rounded-lg bg-secondary/20 p-3">
                  <p className="break-keep text-xs text-rose-400/80">오해: {item.myth}</p>
                  <p className="break-keep text-xs text-emerald-400/80">진실: {item.truth}</p>
                </div>
              </div>
            ))}
          </div>
        </Accordion>
      </div>

      {/* CTA */}
      <div className="mt-10 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-accent/5 p-6 text-center">
        <Sparkles className="mx-auto size-6 text-primary" />
        <p className="break-keep mt-3 text-sm font-bold text-foreground">내 사주의 부족한 오행 기운을 심층 리포트로 확인하기</p>
        <p className="break-keep mt-1 text-xs text-muted-foreground">위 가이드는 기본 개념입니다. 사주 입력 후 맞춤 심층 리포트로 정확한 용신과 개운법을 받아보세요.</p>
        <Link href="/#saju-form" className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/80">
          심층 리포트 받기 <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  )
}
