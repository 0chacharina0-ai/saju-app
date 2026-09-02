import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
})

export async function callAiReport(mode: 'MODE1_FULL' | 'MODE2_SUBSCRIPTION', payload: Record<string, unknown>) {
  const apiUrl = `${supabaseUrl}/functions/v1/saju-ai`
  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${supabaseAnonKey}`,
      apikey: supabaseAnonKey,
    },
    body: JSON.stringify({ mode, payload }),
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`AI 리포트 생성 요청이 실패했습니다 (${res.status}). ${text}`)
  }
  const data = await res.json()
  if (!data || data.error) {
    throw new Error(data?.error || 'AI 리포트 응답 형식이 올바르지 않습니다.')
  }
  return data
}
