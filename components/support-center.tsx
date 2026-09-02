'use client'

import { useState, useMemo, type FormEvent } from 'react'
import { Search, ChevronDown, Mail, Paperclip, Clock, Send, Circle as HelpCircle, MessageSquare } from 'lucide-react'
import { FAQ_ITEMS, type FAQItem } from '@/lib/faq-data'
import Link from 'next/link'

const CATEGORIES = ['전체', '사주/풀이', '결제/리포트', '무료 운세/타로', '보안'] as const

function FAQAccordion({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl border border-border bg-secondary/20 overflow-hidden">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-secondary/40">
        <span className="shrink-0 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">{item.category}</span>
        <span className="break-keep flex-1 text-sm font-medium text-foreground">{item.question}</span>
        <ChevronDown className={`size-5 shrink-0 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="border-t border-border p-4">
          <p className="break-keep text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
        </div>
      )}
    </div>
  )
}

export function SupportCenter() {
  const [category, setCategory] = useState<typeof CATEGORIES[number]>('전체')
  const [query, setQuery] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ type: '사주/풀이 문의', email: '', content: '', fileName: '' })

  const filteredFAQ = useMemo(() => {
    let items = FAQ_ITEMS
    if (category !== '전체') items = items.filter(i => i.category === category)
    if (query.trim()) {
      const q = query.toLowerCase()
      items = items.filter(i => i.question.toLowerCase().includes(q) || i.answer.toLowerCase().includes(q))
    }
    return items
  }, [category, query])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="relative min-h-screen">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 opacity-40 [background:radial-gradient(ellipse_at_top_left,var(--primary)_0%,transparent_45%),radial-gradient(ellipse_at_bottom_right,var(--accent)_0%,transparent_50%)]" />

      <section className="mx-auto max-w-3xl scroll-mt-20 px-6 py-20 pt-4">
        <div className="mb-8 text-center">
          <HelpCircle className="mx-auto size-10 text-primary" />
          <p className="mt-2 font-display text-xs font-semibold tracking-[0.35em] text-primary uppercase">Support Center</p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">FAQ & 1:1 문의하기</h2>
          <p className="mt-3 break-keep text-sm text-muted-foreground">자주 묻는 질문을 먼저 확인해 보세요. 해결되지 않으면 1:1 문의를 남겨주세요.</p>
        </div>

        {/* Search */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="궁금한 키워드를 검색해 보세요"
              className="w-full rounded-full border border-border bg-[#1e1e2e] py-3.5 pl-12 pr-4 text-sm text-white outline-none transition-colors placeholder:text-white/40 focus:border-primary/60 focus:ring-2 focus:ring-ring/40" />
          </div>
        </div>

        {/* Category filter */}
        <div className="mb-6 flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button key={cat} type="button" onClick={() => setCategory(cat)} aria-pressed={category === cat}
              className={`break-keep rounded-full border px-4 py-2 text-sm font-medium transition-colors ${category === cat ? 'border-primary bg-primary/15 text-primary' : 'border-border bg-secondary/40 text-muted-foreground hover:text-foreground'}`}>{cat}</button>
          ))}
        </div>

        {/* FAQ list */}
        <div className="mb-12 space-y-3">
          {filteredFAQ.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">검색 결과가 없어요. 1:1 문의로 남겨주세요.</p>}
          {filteredFAQ.map((item, i) => <FAQAccordion key={i} item={item} />)}
        </div>

        {/* 1:1 Inquiry form */}
        <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5 p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-2">
            <MessageSquare className="size-5 text-primary" />
            <h3 className="text-lg font-bold">1:1 문의하기</h3>
          </div>

          {submitted ? (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 text-center">
              <p className="text-sm font-bold text-emerald-400">문의가 접수되었습니다.</p>
              <p className="mt-2 text-sm text-muted-foreground">영업시간 내 순차적으로 회신드리겠습니다. (help@cosmic-saju.kr)</p>
              <button onClick={() => { setSubmitted(false); setForm({ type: '사주/풀이 문의', email: '', content: '', fileName: '' }) }} className="mt-4 rounded-full border border-primary/50 bg-primary/10 px-6 py-2.5 text-sm font-semibold transition-colors hover:bg-primary/20">새 문의 작성</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-muted-foreground">문의 유형</label>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full appearance-none rounded-lg border border-border bg-[#1e293b] px-3 py-2.5 text-sm text-white outline-none transition-colors focus:border-primary/60 focus:ring-2 focus:ring-ring/40">
                  <option>사주/풀이 문의</option>
                  <option>결제/리포트 문의</option>
                  <option>무료 운세/타로 문의</option>
                  <option>보안/개인정보 문의</option>
                  <option>기타</option>
                </select>
              </div>
              <div>
                <label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-muted-foreground"><Mail className="size-4" /> 이메일</label>
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="reply@your-email.com"
                  className="w-full rounded-lg border border-border bg-[#1e1e2e] px-3 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/40 focus:border-primary/60 focus:ring-2 focus:ring-ring/40" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-muted-foreground">문의 내용</label>
                <textarea required value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={5} placeholder="문의 내용을 상세히 작성해 주세요"
                  className="w-full resize-none rounded-lg border border-border bg-[#1e1e2e] px-3 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/40 focus:border-primary/60 focus:ring-2 focus:ring-ring/40" />
              </div>
              <div>
                <label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-muted-foreground"><Paperclip className="size-4" /> 파일 첨부 (선택)</label>
                <input type="file" onChange={(e) => setForm({ ...form, fileName: e.target.files?.[0]?.name ?? '' })}
                  className="w-full text-sm text-muted-foreground file:mr-3 file:rounded-lg file:border-0 file:bg-primary/15 file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary hover:file:bg-primary/25" />
                {form.fileName && <p className="mt-1.5 text-xs text-primary/70">첨부: {form.fileName}</p>}
              </div>

              {/* Business hours card */}
              <div className="rounded-xl border border-border bg-secondary/20 p-4">
                <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                  <Clock className="size-4 text-primary" /> 운영시간 안내
                </div>
                <p className="mt-2 text-sm text-muted-foreground">평일 10:00 ~ 18:00 (주말·공휴일 휴무)</p>
                <p className="text-sm text-muted-foreground">접수 후 영업일 기준 1~2일 내 회신드립니다.</p>
              </div>

              <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary/60 bg-primary/10 px-6 py-3.5 text-base font-bold text-foreground transition-all hover:border-primary hover:bg-primary/20 hover:neon-glow">
                <Send className="size-5 text-primary" /> 문의 접수하기
              </button>
            </form>
          )}
        </div>

        {/* Quick links */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
          <Link href="/terms" className="transition-colors hover:text-foreground">이용약관</Link>
          <span className="text-border">|</span>
          <Link href="/privacy" className="transition-colors hover:text-foreground">개인정보처리방침</Link>
          <span className="text-border">|</span>
          <Link href="/refund" className="transition-colors hover:text-foreground">환불규정</Link>
        </div>
      </section>
    </main>
  )
}
