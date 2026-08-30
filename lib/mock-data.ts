export type PaymentRecord = {
  id: string
  name: string
  amount: number
  status: 'completed' | 'pending' | 'failed' | 'refunded'
  created_at: string
}

export type AdminStats = {
  totalUsers: number
  totalRevenue: number
  completedPayments: number
  pendingPayments: number
}

const MOCK_PAYMENTS: PaymentRecord[] = [
  { id: '1', name: '김**연', amount: 24900, status: 'completed', created_at: '2026-07-30T09:15:00Z' },
  { id: '2', name: '이**호', amount: 24900, status: 'completed', created_at: '2026-07-30T08:42:00Z' },
  { id: '3', name: '박**아', amount: 24900, status: 'completed', created_at: '2026-07-29T22:10:00Z' },
  { id: '4', name: '최**준', amount: 24900, status: 'completed', created_at: '2026-07-29T18:33:00Z' },
  { id: '5', name: '정**미', amount: 24900, status: 'pending', created_at: '2026-07-29T14:20:00Z' },
  { id: '6', name: '강**성', amount: 24900, status: 'completed', created_at: '2026-07-28T21:05:00Z' },
  { id: '7', name: '윤**희', amount: 24900, status: 'completed', created_at: '2026-07-28T16:48:00Z' },
  { id: '8', name: '임**철', amount: 24900, status: 'failed', created_at: '2026-07-28T11:30:00Z' },
  { id: '9', name: '조**현', amount: 24900, status: 'completed', created_at: '2026-07-27T19:12:00Z' },
  { id: '10', name: '한**수', amount: 24900, status: 'completed', created_at: '2026-07-27T10:25:00Z' },
]

const MOCK_STATS: AdminStats = {
  totalUsers: 1248,
  totalRevenue: 31075200,
  completedPayments: 1248,
  pendingPayments: 3,
}

export function getMockStats(): AdminStats {
  return MOCK_STATS
}

export function getMockPayments(): PaymentRecord[] {
  return MOCK_PAYMENTS
}

export function saveSajuRecord(_record: unknown): string {
  return `mock_${Date.now()}`
}

export function savePayment(_recordId: string): void {
  // no-op in mock mode
}
