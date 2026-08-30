// 정통사주 리포트 AI 생성 엣지 함수
// MODE1_FULL: 2026 신년운세 종합 + 1~12월 월별 캘린더 (단품 리포트용)
// MODE2_SUBSCRIPTION: 월 정기 구독 핀포인트 리포트 + 주간/데일리 푸시 (동적 서비스용)

import { createClient } from 'npm:@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
}

// ── 등록된 시스템 프롬프트 (원문 그대로) ──────────────────────────────
const SYSTEM_PROMPT = `당신은 40년 경력의 사주명리학 대가이자 학술적 역술가입니다.
제시된 내담자의 사주 원국, 대운, 세운(2026 병오년) 데이터와 요청 모드(MODE)에 따라 정밀하고 실용적인 운세 리포트를 생성해 주세요.

[공통 톤앤매너 & 답변 지침]
- 근거 없는 긍정적 포장이나 과도한 위로는 절대 배제하고, 냉철하고 직설적인 조언을 제공하세요.
- 불확실하거나 해석이 갈리는 부분(시주 미입력 등)은 명확히 '추정' 또는 '보완 필요'로 명시하세요.
- 모든 월간/일간 분석은 한자 표기를 지양하고, 쉬운 한글 및 직관적인 용어(예: 부모/가족과의 인연, 직장 적성 등)로 정제해 출력하세요.
- 문장이 잘리거나 어색한 종결 어미("있어요는 의미입니다" 등)가 발생하지 않도록 완성도 높은 한국어로 작성하세요.

[MODE 1: 2026 신년운세 종합 & 1~12월 월별 캘린더 (단품 리포트용)]

1. 2026년 병오년 종합 총운 (Overview)
   - 올해를 관통하는 핵심 한 줄 요약 및 종합 키워드
   - 오행/십신 작용 기반 성패의 핵심 분기점
   - [사회적 모습(페르소나) vs 내면의 상태(섀도우)] 심리 프로파일링
   - [조직적성 % vs 독립/창업 적성 %] 커리어 향방 진단

2. 2026년 1월~12월 월별 운세 및 Key Date (12개 월별 데이터 생성)
   ※ 1월부터 12월까지 각 월건(절기 기준) 변화를 반영하여 아래 항목을 생성하세요.
   - [이달의 핵심 요약 & 힐링 가이드]: 이달의 흐름, 행운의 컬러, 피해야 할 행동
   - [영역별 세부 운세]: (1) 직장/업무, (2) 재물/금전, (3) 인간관계/연애, (4) 건강/심리 (각각 핵심, 기회, 리스크, 대응전략 분구)
   - [💡 기회의 날 TOP 3]: 미팅, 계약, 이직 등 중요한 결정을 내리기 가장 좋은 3일 (일자 및 구체적 가이드)
   - [⚠️ 주의의 날 TOP 3]: 손재수, 구설수, 충돌을 피하고 자중해야 할 3일 (일자 및 구체적 가이드)

[MODE 2: 월 정기 구독 전용 실시간 밀착 케어 (동적 서비스용)]

1. [월간 구독] 이달의 핀포인트 리포트 (매월 1일 전송용)
   - 신년운세 기본 월운에 더해, 현재 유저의 상황(이직 고민, 연애 중 등)을 반영한 '이달의 1:1 맞춤 액션 플랜'
   - 이달에 가장주의해야 할 리스크 관리 가이드 및 마인드 컨트롤 처방

2. [주간/데일리 구독] 오늘의 핀포인트 푸시 알림 (매일 아침 전송용)
   - 오늘 날짜가 [기회의 날 / 주의의 날 / 평탄한 날] 중 어디에 해당하는지 판단
   - [기회의 날]: 오늘 즉시 실행해야 할 핀포인트 가이드 (예: "오늘은 계약서 서명하기 좋은 날입니다.")
   - [주의의 날]: 오늘 행동 수칙 및 방어 기제 (예: "오늘은 감정적 지출이나 상사와의 마찰을 조심하세요.")
   - 오늘을 반전시킬 [오늘의 행운 팁] (컬러, 음료, 행동) 1가지 제공`

const ANTHROPIC_KEY = Deno.env.get('ANTHROPIC_API_KEY')

interface SajuPayload {
  name?: string
  gender?: string
  birthDate?: string
  birthTime?: string
  pillars?: unknown
  daewun?: unknown
  situation?: string
  targetMonth?: number
  targetDay?: number
}

function buildUserMessage(mode: 'MODE1_FULL' | 'MODE2_SUBSCRIPTION', payload: SajuPayload): string {
  const base = [
    `내담자 정보:`,
    `- 이름: ${payload.name ?? '미입력'}`,
    `- 성별: ${payload.gender ?? '미입력'}`,
    `- 생년월일: ${payload.birthDate ?? '미입력'}`,
    `- 태어난 시간: ${payload.birthTime ?? '미입력'}`,
    `- 사주 원국(사주팔자): ${JSON.stringify(payload.pillars ?? {})}`,
    `- 대운 흐름: ${JSON.stringify(payload.daewun ?? {})}`,
  ]
  if (mode === 'MODE1_FULL') {
    base.push(`요청: MODE 1 - 2026 병오년 신년운세 종합과 1~12월 월별 캘린더를 생성해 주세요.`)
  } else {
    base.push(`- 현재 상황: ${payload.situation ?? '미입력'}`)
    base.push(`- 타겟 월: ${payload.targetMonth ?? '미입력'}`)
    if (payload.targetDay) base.push(`- 타겟 일: ${payload.targetDay}`)
    base.push(
      `요청: MODE 2 - 이달의 핀포인트 맞춤 액션 플랜과${
        payload.targetDay ? ' 오늘의 데일리 푸시 알림을' : ''
      } 생성해 주세요.`,
    )
  }
  return base.join('\n')
}

async function callAnthropic(mode: 'MODE1_FULL' | 'MODE2_SUBSCRIPTION', payload: SajuPayload) {
  if (!ANTHROPIC_KEY) {
    return {
      mode,
      ...payload,
      fallback: true,
      message:
        'AI 키가 아직 서버에 등록되지 않아 임시 샘플 응답을 반환합니다. 배포 후 ANTHROPIC_API_KEY 시크릿을 설정하면 실제 분석이 연동됩니다.',
      generatedAt: new Date().toISOString(),
    }
  }
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': ANTHROPIC_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: buildUserMessage(mode, payload) }],
    }),
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`AI 호출 실패 (${res.status}): ${text}`)
  }
  const data = await res.json()
  const content = Array.isArray(data.content)
    ? data.content.map((c: { text?: string }) => c.text ?? '').join('\n')
    : ''
  return { mode, ...payload, report: content, generatedAt: new Date().toISOString() }
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders })
  }
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'POST 요청만 지원합니다.' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
  try {
    const body = await req.json()
    const mode: 'MODE1_FULL' | 'MODE2_SUBSCRIPTION' =
      body?.mode === 'MODE2_SUBSCRIPTION' ? 'MODE2_SUBSCRIPTION' : 'MODE1_FULL'
    const payload: SajuPayload = body?.payload ?? {}
    const result = await callAnthropic(mode, payload)

    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    if (supabaseUrl && serviceRoleKey) {
      const admin = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } })
      await admin
        .from('ai_report_logs')
        .insert({ mode, payload, result, created_at: new Date().toISOString() })
        .then(() => {})
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err instanceof Error ? err.message : String(err) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
