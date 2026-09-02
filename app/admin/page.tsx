'use client'

import { useState, useEffect, useCallback } from 'react'
import { Users, DollarSign, CreditCard, TrendingUp, ArrowLeft } from 'lucide-react'
import { getMockStats, getMockPayments } from '@/lib/mock-data'

export default function AdminPage() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ totalUsers: 0, totalRevenue: 0, completedPayments: 0, pendingPayments: 0 })
  const [payments, setPayments] = useState<ReturnType<typeof getMockPayments>>([])

  const fetchData = useCallback(() => {
    setLoading(true)
    setStats(getMockStats())
    setPayments(getMockPayments())
    setLoading(false)
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  return (
    <main className="relative min-h-screen">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 opacity-40 [background:radial-gradient(ellipse_at_top_left,var(--primary)_0%,transparent_45%),radial-gradient(ellipse_at_bottom_right,var(--accent)_0%,transparent_50%)]" />

      <div className="mx-auto max-w-5xl px-6 py-12">
        <a href="/" className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> 메인으로
        </a>

        <h1 className="mb-2 text-2xl font-bold sm:text-3xl">관리자 대시보드</h1>
        <p className="mb-8 text-sm text-muted-foreground">코스믹 만세력 서비스 현황</p>

        {/* stats cards */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="glass rounded-2xl p-5">
            <div className="mb-2 flex items-center gap-2 text-muted-foreground">
              <Users className="size-4" /><span className="text-xs font-medium">총 유저 수</span>
            </div>
            <p className="text-2xl font-bold">{loading ? '—' : stats.totalUsers.toLocaleString()}</p>
          </div>
          <div className="glass rounded-2xl p-5">
            <div className="mb-2 flex items-center gap-2 text-muted-foreground">
              <DollarSign className="size-4" /><span className="text-xs font-medium">총 매출</span>
            </div>
            <p className="text-2xl font-bold text-primary">{loading ? '—' : `${stats.totalRevenue.toLocaleString()}원`}</p>
          </div>
          <div className="glass rounded-2xl p-5">
            <div className="mb-2 flex items-center gap-2 text-muted-foreground">
              <CreditCard className="size-4" /><span className="text-xs font-medium">완료 결제</span>
            </div>
            <p className="text-2xl font-bold text-green-500">{loading ? '—' : stats.completedPayments}</p>
          </div>
          <div className="glass rounded-2xl p-5">
            <div className="mb-2 flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="size-4" /><span className="text-xs font-medium">대기 결제</span>
            </div>
            <p className="text-2xl font-bold text-yellow-500">{loading ? '—' : stats.pendingPayments}</p>
          </div>
        </div>

        {/* payment table */}
        <div className="glass rounded-2xl p-6">
          <h2 className="mb-4 text-lg font-semibold">최근 결제 내역</h2>
          {loading ? (
            <p className="py-8 text-center text-sm text-muted-foreground">불러오는 중...</p>
          ) : payments.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">아직 결제 내역이 없습니다.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs text-muted-foreground">
                    <th className="pb-3 pr-4 font-medium">이름</th>
                    <th className="pb-3 pr-4 font-medium">금액</th>
                    <th className="pb-3 pr-4 font-medium">상태</th>
                    <th className="pb-3 font-medium">일시</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p) => (
                    <tr key={p.id} className="border-b border-border/50">
                      <td className="py-3 pr-4">{p.name}</td>
                      <td className="py-3 pr-4 font-medium">{p.amount.toLocaleString()}원</td>
                      <td className="py-3 pr-4">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${p.status === 'completed' ? 'bg-green-500/15 text-green-400' : p.status === 'pending' ? 'bg-yellow-500/15 text-yellow-400' : 'bg-red-500/15 text-red-400'}`}>
                          {p.status === 'completed' ? '완료' : p.status === 'pending' ? '대기' : p.status === 'failed' ? '실패' : '환불'}
                        </span>
                      </td>
                      <td className="py-3 text-xs text-muted-foreground">{new Date(p.created_at).toLocaleString('ko-KR')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
