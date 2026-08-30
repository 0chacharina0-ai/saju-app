import type { SajuResult, ElementKey } from './saju'

// ============================================================
// Types
// ============================================================

export interface NewYearMonthlyItem {
  month: number
  energy: string
  tip: string
  avoid: string
}

export interface NewYearHalfYearItem {
  label: string
  score: number
}

export interface NewYearOpportunity {
  title: string
  desc: string
}

export interface NewYearRisk {
  title: string
  desc: string
}

export interface NewYearOptions {
  maritalStatus: 'single' | 'married' | 'divorced'
  hasChildren: boolean
}

export interface NewYearReport {
  totalScore: number
  keywords: string[]
  closing: string
  halfYearGraph: NewYearHalfYearItem[]
  monthly: NewYearMonthlyItem[]
  opportunities: NewYearOpportunity[]
  risks: NewYearRisk[]
  familySection: string
}

// ============================================================
// Internal data
// ============================================================

const ELEMENT_KR: Record<ElementKey, string> = {
  wood: '목(木)',
  fire: '화(火)',
  earth: '토(土)',
  metal: '금(金)',
  water: '수(水)',
}

// 2027 정미년(丁未) — 일간과의 관계에 따른 신년 흐름
// 정(丁)은 화(火) 음간, 미(未)는 토(土) 지지
const YEAR_STEM_ELEMENT: ElementKey = 'fire' // 丁
const YEAR_BRANCH_ELEMENT: ElementKey = 'earth' // 未

// 상생/상극 맵
const SHENG: Record<ElementKey, ElementKey> = {
  wood: 'fire', fire: 'earth', earth: 'metal', metal: 'water', water: 'wood',
}
const KE: Record<ElementKey, ElementKey> = {
  wood: 'earth', fire: 'metal', earth: 'water', metal: 'wood', water: 'fire',
}

// 월별 정미년 유월(流月) 간지 에너지 (단순화된 월별 오행 흐름)
const MONTHLY_ENERGY: { month: number; stem: ElementKey; branch: ElementKey; label: string }[] = [
  { month: 1, stem: 'water', branch: 'water', label: '임인(壬寅)월 — 새 출발과 인연의 물꼬' },
  { month: 2, stem: 'wood', branch: 'wood', label: '계묘(癸卯)월 — 유연한 성장과 인맥 확장' },
  { month: 3, stem: 'wood', branch: 'earth', label: '갑진(甲辰)월 — 기반 정비와 내실 다지기' },
  { month: 4, stem: 'fire', branch: 'fire', label: '을사(乙巳)월 — 열정 확산과 속도 증가' },
  { month: 5, stem: 'fire', branch: 'fire', label: '병오(丙午)월 — 강렬한 에너지와 주의 필요' },
  { month: 6, stem: 'earth', branch: 'earth', label: '정미(丁未)월 — 안정과 축적의 달' },
  { month: 7, stem: 'earth', branch: 'metal', label: '무신(戊申)월 — 추진력과 성과 가시화' },
  { month: 8, stem: 'metal', branch: 'metal', label: '기유(己酉)월 — 정리와 결실의 시기' },
  { month: 9, stem: 'metal', branch: 'earth', label: '경술(庚戌)월 — 권위 확보와 명예 기회' },
  { month: 10, stem: 'water', branch: 'water', label: '신해(辛亥)월 — 유동성과 이동의 달' },
  { month: 11, stem: 'water', branch: 'wood', label: '임자(壬子)월 — 내면 성찰과 휴식 필요' },
  { month: 12, stem: 'wood', branch: 'earth', label: '계축(癸丑)월 — 마무리와 내년 준비' },
]

// ============================================================
// Helpers
// ============================================================

function clamp(n: number, min = 45, max = 96): number {
  return Math.max(min, Math.min(max, Math.round(n)))
}

function elementRelation(a: ElementKey, b: ElementKey): 'same' | 'sheng' | 'sheng-rev' | 'ke' | 'ke-rev' | 'neutral' {
  if (a === b) return 'same'
  if (SHENG[a] === b) return 'sheng'
  if (SHENG[b] === a) return 'sheng-rev'
  if (KE[a] === b) return 'ke'
  if (KE[b] === a) return 'ke-rev'
  return 'neutral'
}

/** 2027 정미년과 일간의 관계로 기본 신년 점수 산출 */
function yearBaseScore(result: SajuResult): number {
  const dm = result.dayMaster.key
  const stemRel = elementRelation(dm, YEAR_STEM_ELEMENT)
  const branchRel = elementRelation(dm, YEAR_BRANCH_ELEMENT)
  let score = 68
  switch (stemRel) {
    case 'same': score += 6; break
    case 'sheng': score += 9; break
    case 'sheng-rev': score += 7; break
    case 'ke': score -= 5; break
    case 'ke-rev': score -= 3; break
    default: score += 2
  }
  switch (branchRel) {
    case 'same': score += 4; break
    case 'sheng': score += 7; break
    case 'sheng-rev': score += 5; break
    case 'ke': score -= 6; break
    case 'ke-rev': score -= 4; break
    default: score += 1
  }
  // 대운과의 조화
  if (result.currentDaYunIndex >= 0 && result.daYun[result.currentDaYunIndex]) {
    const dy = result.daYun[result.currentDaYunIndex]
    const dyRel = elementRelation(dm, dy.ganElement.key)
    if (dyRel === 'sheng' || dyRel === 'sheng-rev') score += 5
    if (dyRel === 'ke' || dyRel === 'ke-rev') score -= 4
  }
  return clamp(score)
}

/** 월별 점수 산출 */
function monthlyScore(result: SajuResult, monthEnergy: { stem: ElementKey; branch: ElementKey }): number {
  const dm = result.dayMaster.key
  const stemRel = elementRelation(dm, monthEnergy.stem)
  const branchRel = elementRelation(dm, monthEnergy.branch)
  let score = 65
  if (stemRel === 'sheng' || stemRel === 'sheng-rev' || stemRel === 'same') score += 12
  if (stemRel === 'ke' || stemRel === 'ke-rev') score -= 8
  if (branchRel === 'sheng' || branchRel === 'sheng-rev' || branchRel === 'same') score += 10
  if (branchRel === 'ke' || branchRel === 'ke-rev') score -= 7
  return clamp(score, 40, 95)
}

// ============================================================
// Keyword generation
// ============================================================

function buildKeywords(result: SajuResult): string[] {
  const dm = result.dayMaster.key
  const stemRel = elementRelation(dm, YEAR_STEM_ELEMENT)
  const keywords: string[] = []
  keywords.push(ELEMENT_KR[dm])
  if (stemRel === 'sheng' || stemRel === 'sheng-rev') {
    keywords.push('상생의 해', '성장')
  } else if (stemRel === 'ke' || stemRel === 'ke-rev') {
    keywords.push('변화의 해', '주의')
  } else if (stemRel === 'same') {
    keywords.push('안정의 해', '축적')
  } else {
    keywords.push('유연한 해', '적응')
  }
  // 대운 키워드
  if (result.currentDaYunIndex >= 0 && result.daYun[result.currentDaYunIndex]) {
    const dy = result.daYun[result.currentDaYunIndex]
    keywords.push(`${dy.ganZhi} 대운`)
  }
  return keywords.slice(0, 5)
}

// ============================================================
// Monthly timeline
// ============================================================

function buildMonthly(result: SajuResult): NewYearMonthlyItem[] {
  return MONTHLY_ENERGY.map((me) => {
    const score = monthlyScore(result, me)
    const isGood = score >= 70
    const isRisky = score < 55
    const tip = isGood
      ? `${me.label} — ${ELEMENT_KR[result.dayMaster.key]} 일간에게 유리한 달로, 새 일을 시작하거나 인맥을 넓히기 좋습니다.`
      : isRisky
        ? `${me.label} — ${ELEMENT_KR[result.dayMaster.key]} 일간에게 마찰이 큰 달로, 무리한 확장보다 현상 유지와 휴식이 안전합니다.`
        : `${me.label} — ${ELEMENT_KR[result.dayMaster.key]} 일간에게 보통 흐름으로, 계획을 점검하고 내실을 다지는 것이 유리합니다.`
    const avoid = isRisky
      ? '큰 결정, 이동, 투자 확대를 피하고 감정 소모 줄이기'
      : isGood
        ? '과도한 일정 몰아넣기와 자만 피하기'
        : '급한 판단과 충동적 소비 피하기'
    return { month: me.month, energy: me.label, tip, avoid }
  })
}

// ============================================================
// Half-year graph
// ============================================================

function buildHalfYearGraph(result: SajuResult, monthly: NewYearMonthlyItem[]): NewYearHalfYearItem[] {
  const firstHalf = monthly.slice(0, 6).map(m => monthlyScore(result, MONTHLY_ENERGY[m.month - 1]))
  const secondHalf = monthly.slice(6).map(m => monthlyScore(result, MONTHLY_ENERGY[m.month - 1]))
  const avgFirst = Math.round(firstHalf.reduce((s, v) => s + v, 0) / firstHalf.length)
  const avgSecond = Math.round(secondHalf.reduce((s, v) => s + v, 0) / secondHalf.length)
  return [
    { label: '2027년 상반기 (1~6월)', score: clamp(avgFirst) },
    { label: '2027년 하반기 (7~12월)', score: clamp(avgSecond) },
  ]
}

// ============================================================
// Opportunities & risks
// ============================================================

function buildOpportunities(result: SajuResult, monthly: NewYearMonthlyItem[]): NewYearOpportunity[] {
  const dm = result.dayMaster.key
  const bestMonths = [...monthly]
    .map((m, i) => ({ m, score: monthlyScore(result, MONTHLY_ENERGY[i]) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)

  return [
    {
      title: `${bestMonths[0]?.m.month ?? 1}월 — 가장 유리한 타이밍`,
      desc: `${bestMonths[0]?.m.energy ?? ''} 흐름으로, ${ELEMENT_KR[dm]} 일간에게 에너지가 가장 잘 받는 달입니다. 새 프로젝트 시작, 인맥 확장, 중요한 제안을 이 시기에 배치하세요.`,
    },
    {
      title: '정미(丁未)년의 토(土) 기운을 활용한 안정 축적',
      desc: `올해 지지 미(未)는 토(土) 기운으로, 기반을 다지고 자산·관계를 축적하기 좋은 해입니다. ${ELEMENT_KR[dm]} 일간은 토 기운과의 관계를 이해해 안정을 설계하세요.`,
    },
    {
      title: `${bestMonths[1]?.m.month ?? 7}월 — 두 번째 기회의 달`,
      desc: `${bestMonths[1]?.m.energy ?? ''} 흐름으로, 상반기의 성과를 확장하거나 하반기 준비를 시작하기 좋은 시기입니다. 이때 만난 인연과 정보는 연말까지 영향을 줍니다.`,
    },
  ]
}

function buildRisks(result: SajuResult, monthly: NewYearMonthlyItem[]): NewYearRisk[] {
  const dm = result.dayMaster.key
  const worstMonths = [...monthly]
    .map((m, i) => ({ m, score: monthlyScore(result, MONTHLY_ENERGY[i]) }))
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)

  return [
    {
      title: `${worstMonths[0]?.m.month ?? 11}월 — 마찰이 가장 큰 달`,
      desc: `${worstMonths[0]?.m.energy ?? ''} 흐름으로, ${ELEMENT_KR[dm]} 일간에게 기운 충돌이 큰 시기입니다. 큰 결정·이동·갈등을 피하고, 정기 검진과 휴식을 우선하세요.`,
    },
    {
      title: '과도한 확장 욕심과 속도 조절 실패',
      desc: `정미년 상반기 화(火) 기운이 강해지면 추진력이 높아지지만, ${ELEMENT_KR[dm]} 일간이 화와 상극이면 과도한 속도가 화를 부릅니다. 한 번에 하나씩, 검증 후 확장하세요.`,
    },
    {
      title: `${worstMonths[1]?.m.month ?? 5}월 — 두 번째 주의 시기`,
      desc: `${worstMonths[1]?.m.energy ?? ''} 흐름으로, 감정 소모와 커뮤니케이션 마찰이 생기기 쉽습니다. 중요한 대화는 시기를 미루고, 건강 관리에 신경 쓰세요.`,
    },
  ]
}

// ============================================================
// Family section
// ============================================================

function buildFamilySection(result: SajuResult, name: string, options: NewYearOptions): string {
  const dm = result.dayMaster.key
  const branchRel = elementRelation(dm, YEAR_BRANCH_ELEMENT) // 토(土)와의 관계
  const lines: string[] = []

  lines.push(`${name}님의 ${ELEMENT_KR[dm]} 일간은 2027 정미년 미(未)토 기운과 ${branchRel === 'sheng' || branchRel === 'sheng-rev' ? '상생하여 가족·가정의 안정이 강화되는 해' : branchRel === 'ke' || branchRel === 'ke-rev' ? '상극하여 가정 내 변화와 조율이 필요한 해' : '무관계로 노력으로 가족관계를 다져야 하는 해'}입니다.`)

  switch (options.maritalStatus) {
    case 'single':
      lines.push('미혼 상태이시므로, 인연운이 강한 달(상생 유월)에 만남 자리에 나가고 상극 유월에는 섣부른 결정을 피하세요. 올해는 관계의 깊이보다 인연의 질을 따지는 것이 유리합니다.')
      break
    case 'married':
      lines.push('기혼이시므로, 부부 갈등이 생기기 쉬운 달에는 거리를 두고 대화 시기를 조절하세요. 미(未)토 기운이 가정의 기반을 다지는 데 도움이 되므로, 공동 목표(자산·주거·자녀)를 재정립하기 좋은 해입니다.')
      break
    case 'divorced':
      lines.push('돌싱이시므로, 새 인연을 찾기보다 자신의 오행 균형을 먼저 회복하는 데 집중하세요. 올해 상생 유월에 만나는 인연은 진지한 관계로 발전할 가능성이 높습니다.')
      break
  }

  if (options.hasChildren) {
    lines.push('자녀가 있으시므로, 자녀의 건강과 학업이 변동하는 시기(상극 유월)에는 세심한 관심이 필요합니다. 부모의 오행 안정이 자녀의 안정으로 이어지는 해입니다.')
  } else {
    lines.push('자녀가 없으시므로, 올해는 자신의 성장과 내면 안정에 에너지를 집중하기 좋은 시기입니다. 향후 가계(家計) 확장을 고민한다면 상생 유월이 유리합니다.')
  }

  return lines.join('\n')
}

// ============================================================
// Main generator
// ============================================================

export function generateNewYearReport(
  name: string,
  result: SajuResult,
  options: NewYearOptions,
): NewYearReport {
  const totalScore = yearBaseScore(result)
  const keywords = buildKeywords(result)
  const monthly = buildMonthly(result)
  const halfYearGraph = buildHalfYearGraph(result, monthly)
  const opportunities = buildOpportunities(result, monthly)
  const risks = buildRisks(result, monthly)
  const familySection = buildFamilySection(result, name, options)

  const dm = result.dayMaster.key
  const stemRel = elementRelation(dm, YEAR_STEM_ELEMENT)
  const closingParts: string[] = []
  if (stemRel === 'sheng' || stemRel === 'sheng-rev') {
    closingParts.push(`2027 정미년은 ${name}님에게 상생의 해로, 흐름을 타면 성장이 가속되는 한 해입니다.`)
  } else if (stemRel === 'ke' || stemRel === 'ke-rev') {
    closingParts.push(`2027 정미년은 ${name}님에게 변화의 해로, 마찰을 다루는 지혜가 결과를 가릅니다.`)
  } else if (stemRel === 'same') {
    closingParts.push(`2027 정미년은 ${name}님에게 안정의 해로, 기반을 다지고 축적하는 것이 유리한 한 해입니다.`)
  } else {
    closingParts.push(`2027 정미년은 ${name}님에게 유연함이 필요한 해로, 적응력이 흐름을 결정하는 한 해입니다.`)
  }
  closingParts.push('신년운세는 경향의 지도이며, 어떻게 살아갈지는 선택의 몫입니다.')
  const closing = closingParts.join(' ')

  return {
    totalScore,
    keywords,
    closing,
    halfYearGraph,
    monthly,
    opportunities,
    risks,
    familySection,
  }
}
