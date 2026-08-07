'use client'

import { useState } from 'react'
import { User as User2, FileText, Receipt, Download, Share2, Clock, Calendar, Venus, Mars, ChevronRight, BookOpen } from 'lucide-react'
import Link from 'next/link'

type ReportCard = {
  id: string
  title: string
  type: '정통사주' | '궁합' | '신년운세' | '테마'
  date: string
  price: number
}

type PaymentRecord = {
  orderId: string
  title: string
  amount: number
  date: string
}

const MOCK_REPORTS: ReportCard[] = [
  { id: 'RPT-001', title: '1:1 맞춤 정통사주 (평생 대운 & 우주 궤도)', type: '정통사주', date: '2026-07-28', price: 24900 },
  { id: 'RPT-002', title: '1:1 심층 궁합 보고서', type: '궁합', date: '2026-07-15', price: 24900 },
  { id: 'RPT-003', title: '2027 정미년 신년운세', type: '신년운세', date: '2026-07-10', price: 19900 },
  { id: 'RPT-004', title: '테마: 재물 / 소득 / 자산운', type: '테마', date: '2026-07-05', price: 9900 },
]

const MOCK_PAYMENTS: PaymentRecord[] = [
  { orderId: 'ORD-20260728-001', title: '1:1 맞춤 정통사주', amount: 24900, date: '2026-07-28' },
  { orderId: 'ORD-20260715-002', title: '1:1 심층 궁합 보고서', amount: 24900, date: '2026-07-15' },
  { orderId: 'ORD-20260710-003', title: '2027 정미년 신년운세', amount: 19900, date: '2026-07-10' },
  { orderId: 'ORD-20260705-004', title: '테마: 재물 / 소득 / 자산운', amount: 9900, date: '2026-07-05' },
]

const TYPE_BADGE: Record<ReportCard['type'], string> = {
  '정통사주': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  '궁합': 'bg-rose-500/15 text-rose-400 border-rose-500/30',
  '신년운세': 'bg-sky-500/15 text-sky-400 border-sky-500/30',
  '테마': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
}

function formatPrice(p: number) {
  return p.toLocaleString('ko-KR') + '원'
}

export function MyPage() {
  const [tab, setTab] = useState<'profile' | 'reports' | 'payments'>('reports')
  const [profile, setProfile] = useState({ name: '김천기', year: 1995, month: 3, day: 15, hour: 12, gender: 'male' as 'male' | 'female', calendar: 'solar' as 'solar' | 'lunar' })
  const [editing, setEditing] = useState(false)

  return (
    <main className="relative min-h-screen">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 opacity-40 [background:radial-gradient(ellipse_at_top_left,var(--primary)_0%,transparent_45%),radial-gradient(ellipse_at_bottom_right,var(--accent)_0%,transparent_50%)]" />

      <section className="mx-auto max-w-4xl scroll-mt-20 px-6 py-20 pt-4">
        <div className="mb-8 text-center">
          <User2 className="mx-auto size-10 text-primary" />
          <p className="mt-2 font-display text-xs font-semibold tracking-[0.35em] text-primary uppercase">My Page</p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">마이페이지</h2>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {([
            ['reports', '내 리포트 보관함', FileText],
            ['profile', '내 프로필 / 사주 정보', User2],
            ['payments', '결제 내역', Receipt],
          ] as const).map(([key, label, Icon]) => (
            <button key={key} type="button" onClick={() => setTab(key)} aria-pressed={tab === key}
              className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors ${tab === key ? 'border-primary bg-primary/15 text-primary' : 'border-border bg-secondary/40 text-muted-foreground hover:text-foreground'}`}>
              <Icon className="size-4" /> {label}
            </button>
          ))}
        </div>

        {/* Reports tab */}
        {tab === 'reports' && (
          <div className="space-y-4">
            {MOCK_REPORTS.map(r => (
              <div key={r.id} className="rounded-2xl border border-border bg-secondary/20 p-5 transition-colors hover:border-primary/30">
                <div className="flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10">
                    <BookOpen className="size-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-bold ${TYPE_BADGE[r.type]}`}>{r.type}</span>
                      <span className="text-xs text-muted-foreground">{r.date}</span>
                    </div>
                    <h3 className="break-keep text-sm font-bold text-foreground">{r.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{formatPrice(r.price)} 결제</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button className="flex items-center gap-1.5 rounded-full border border-primary/50 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20">
                        <ChevronRight className="size-3.5" /> 재열람
                      </button>
                      <button className="flex items-center gap-1.5 rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground">
                        <Download className="size-3.5" /> PDF 다운로드
                      </button>
                      <button className="flex items-center gap-1.5 rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground">
                        <Share2 className="size-3.5" /> 카카오톡 공유
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Profile tab */}
        {tab === 'profile' && (
          <div className="rounded-2xl border border-border bg-secondary/20 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-base font-bold"><User2 className="size-5 text-primary" /> 내 사주 정보</h3>
              <button onClick={() => setEditing(!editing)} className="rounded-full border border-primary/50 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20">
                {editing ? '저장' : '수정'}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-xs text-muted-foreground">이름</label>
                <input disabled={!editing} value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full rounded-lg border border-border bg-[#1e1e2e] px-3 py-2 text-sm text-white outline-none focus:border-primary/60 focus:ring-2 focus:ring-ring/40 disabled:opacity-60" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-muted-foreground">연도</label>
                <input type="number" disabled={!editing} value={profile.year} onChange={(e) => setProfile({ ...profile, year: Number(e.target.value) })}
                  className="w-full rounded-lg border border-border bg-[#1e1e2e] px-3 py-2 text-sm text-white outline-none focus:border-primary/60 focus:ring-2 focus:ring-ring/40 disabled:opacity-60" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-muted-foreground">월</label>
                <input type="number" disabled={!editing} value={profile.month} onChange={(e) => setProfile({ ...profile, month: Number(e.target.value) })}
                  className="w-full rounded-lg border border-border bg-[#1e1e2e] px-3 py-2 text-sm text-white outline-none focus:border-primary/60 focus:ring-2 focus:ring-ring/40 disabled:opacity-60" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-muted-foreground">일</label>
                <input type="number" disabled={!editing} value={profile.day} onChange={(e) => setProfile({ ...profile, day: Number(e.target.value) })}
                  className="w-full rounded-lg border border-border bg-[#1e1e2e] px-3 py-2 text-sm text-white outline-none focus:border-primary/60 focus:ring-2 focus:ring-ring/40 disabled:opacity-60" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-muted-foreground">시간(시)</label>
                <input type="number" disabled={!editing} value={profile.hour} onChange={(e) => setProfile({ ...profile, hour: Number(e.target.value) })}
                  className="w-full rounded-lg border border-border bg-[#1e1e2e] px-3 py-2 text-sm text-white outline-none focus:border-primary/60 focus:ring-2 focus:ring-ring/40 disabled:opacity-60" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-muted-foreground">성별</label>
                <div className="flex gap-2">
                  <button disabled={!editing} onClick={() => setProfile({ ...profile, gender: 'male' })} aria-pressed={profile.gender === 'male'}
                    className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-2 py-2 text-sm transition-colors ${profile.gender === 'male' ? 'border-primary bg-primary/15 text-primary' : 'border-border text-muted-foreground'} disabled:opacity-60`}><Mars className="size-4" /> 남</button>
                  <button disabled={!editing} onClick={() => setProfile({ ...profile, gender: 'female' })} aria-pressed={profile.gender === 'female'}
                    className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-2 py-2 text-sm transition-colors ${profile.gender === 'female' ? 'border-primary bg-primary/15 text-primary' : 'border-border text-muted-foreground'} disabled:opacity-60`}><Venus className="size-4" /> 여</button>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-muted-foreground">달력</label>
                <div className="flex gap-2">
                  <button disabled={!editing} onClick={() => setProfile({ ...profile, calendar: 'solar' })} aria-pressed={profile.calendar === 'solar'}
                    className={`flex-1 rounded-lg border px-2 py-2 text-sm transition-colors ${profile.calendar === 'solar' ? 'border-primary bg-primary/15 text-primary' : 'border-border text-muted-foreground'} disabled:opacity-60`}>양력</button>
                  <button disabled={!editing} onClick={() => setProfile({ ...profile, calendar: 'lunar' })} aria-pressed={profile.calendar === 'lunar'}
                    className={`flex-1 rounded-lg border px-2 py-2 text-sm transition-colors ${profile.calendar === 'lunar' ? 'border-primary bg-primary/15 text-primary' : 'border-border text-muted-foreground'} disabled:opacity-60`}>음력</button>
                </div>
              </div>
            </div>
            {editing && (
              <button onClick={() => setEditing(false)} className="mt-4 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/80">저장하기</button>
            )}
          </div>
        )}

        {/* Payments tab */}
        {tab === 'payments' && (
          <div className="space-y-3">
            {MOCK_PAYMENTS.map(p => (
              <div key={p.orderId} className="flex items-center gap-4 rounded-2xl border border-border bg-secondary/20 p-5">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10">
                  <Receipt className="size-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="break-keep text-sm font-bold text-foreground">{p.title}</p>
                  <p className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{p.orderId}</span>
                    <span className="flex items-center gap-1"><Calendar className="size-3" /> {p.date}</span>
                  </p>
                </div>
                <p className="shrink-0 text-sm font-bold text-primary">{formatPrice(p.amount)}</p>
              </div>
            ))}
            <div className="mt-6 flex justify-center gap-4 text-sm text-muted-foreground">
              <Link href="/terms" className="transition-colors hover:text-foreground">이용약관</Link>
              <span className="text-border">|</span>
              <Link href="/privacy" className="transition-colors hover:text-foreground">개인정보처리방침</Link>
              <span className="text-border">|</span>
              <Link href="/refund" className="transition-colors hover:text-foreground">환불규정</Link>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
