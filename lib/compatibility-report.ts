import type { SajuResult, ElementKey } from './saju'

// ============================================================
// Types
// ============================================================

export interface CompatibilitySection {
  chapter: number
  title: string
  keywords: string[]
  score: number
  intro: string
  paragraphs: string[]
  closing: string
}

export interface ElementHarmony {
  text: string
  complementary: string[]
  shared: string[]
}

export interface ChemistryChartItem {
  label: string
  score: number
}

export interface CompatibilityActionGuide {
  recommendedPlaces: string
  avoidPlaces: string
  forbiddenActions: string[]
  forbiddenWords: string[]
  heartMeltActions: string[]
  luckyColors: string[]
  luckyFoods: string[]
}

export interface CompatibilityReport {
  totalScore: number
  closing: string
  elementHarmony: ElementHarmony
  chemistryChart: ChemistryChartItem[]
  sections: CompatibilitySection[]
  actionGuide: CompatibilityActionGuide
}

interface Person {
  name: string
  result: SajuResult
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

// 상생 관계: A가 B를 낳음 (A → B)
const SHENG: Record<ElementKey, ElementKey> = {
  wood: 'fire',
  fire: 'earth',
  earth: 'metal',
  metal: 'water',
  water: 'wood',
}

// 상극 관계: A가 B를 극함
const KE: Record<ElementKey, ElementKey> = {
  wood: 'earth',
  fire: 'metal',
  earth: 'water',
  metal: 'wood',
  water: 'fire',
}

const ELEMENT_COLORS: Record<ElementKey, string[]> = {
  wood: ['연두', '청록'],
  fire: ['주홍', '코랄'],
  earth: ['토프', '노랑'],
  metal: ['실버', '화이트'],
  water: ['네이비', '블루'],
}

const ELEMENT_FOODS: Record<ElementKey, string[]> = {
  wood: ['시금치', '녹차'],
  fire: ['토마토', '딸기'],
  earth: ['고구마', '단호박'],
  metal: ['배', '도라지'],
  water: ['흑임자', '해조류'],
}

const ELEMENT_PLACES: Record<ElementKey, string[]> = {
  wood: ['산', '공원', '숲길'],
  fire: ['양지', '무대', '밝은 카페'],
  earth: ['들', '정원', '텃밭'],
  metal: ['전망 좋은 고지', '바위', '정돈된 공간'],
  water: ['바다', '강변', '호수'],
}

// ============================================================
// Helpers
// ============================================================

function clamp(n: number, min = 40, max = 98): number {
  return Math.max(min, Math.min(max, Math.round(n)))
}

/** 두 오행의 관계: 같음, 상생(서로 보완), 상극, 무관계 */
function elementRelation(a: ElementKey, b: ElementKey): 'same' | 'sheng-a-to-b' | 'sheng-b-to-a' | 'ke-a-to-b' | 'ke-b-to-a' | 'neutral' {
  if (a === b) return 'same'
  if (SHENG[a] === b) return 'sheng-a-to-b'
  if (SHENG[b] === a) return 'sheng-b-to-a'
  if (KE[a] === b) return 'ke-a-to-b'
  if (KE[b] === a) return 'ke-b-to-a'
  return 'neutral'
}

/** 두 사람의 일간 기반 궁합 점수 */
function dayMasterScore(a: SajuResult, b: SajuResult): number {
  const dmA = a.dayMaster.key
  const dmB = b.dayMaster.key
  const rel = elementRelation(dmA, dmB)
  let score = 70
  switch (rel) {
    case 'same': score = 72; break
    case 'sheng-a-to-b': score = 86; break
    case 'sheng-b-to-a': score = 86; break
    case 'ke-a-to-b': score = 58; break
    case 'ke-b-to-a': score = 58; break
    case 'neutral': score = 74; break
  }
  return score
}

/** 오행 분포 보완 점수 */
function balanceScore(a: SajuResult, b: SajuResult): number {
  const countsA = a.elementCounts
  const countsB = b.elementCounts
  const keys = Object.keys(countsA) as ElementKey[]
  // 두 사람을 합쳤을 때 오행 분산이 고를수록 보완
  const combined: Record<ElementKey, number> = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 }
  for (const k of keys) combined[k] = countsA[k] + countsB[k]
  const vals = Object.values(combined)
  const avg = vals.reduce((s, v) => s + v, 0) / vals.length
  const variance = vals.reduce((s, v) => s + (v - avg) ** 2, 0) / vals.length
  // 분산이 작을수록(균형) 고점
  return clamp(90 - variance * 8)
}

/** 합충 기반 관계 점수 */
function interactionScore(a: SajuResult, b: SajuResult): number {
  // A와 B의 지지 간 합/충/형/해 탐지 (단순 일지 vs 일지 + 월지 확장)
  const branchesA = [a.pillars[1].branchHanja, a.pillars[2].branchHanja, a.pillars[3].branchHanja]
  const branchesB = [b.pillars[1].branchHanja, b.pillars[2].branchHanja, b.pillars[3].branchHanja]

  const LIU_HE: Record<string, string> = {
    '子': '丑', '丑': '子', '寅': '亥', '亥': '寅', '卯': '戌', '戌': '卯',
    '辰': '酉', '酉': '辰', '巳': '申', '申': '巳', '午': '未', '未': '午',
  }
  const CHONG: Record<string, string> = {
    '子': '午', '午': '子', '丑': '未', '未': '丑', '寅': '申', '申': '寅',
    '卯': '酉', '酉': '卯', '辰': '戌', '戌': '辰', '巳': '亥', '亥': '巳',
  }
  const HAI: Record<string, string> = {
    '子': '未', '未': '子', '丑': '午', '午': '丑', '寅': '巳', '巳': '寅',
    '卯': '辰', '辰': '卯', '申': '亥', '亥': '申', '酉': '戌', '戌': '酉',
  }

  let he = 0, chong = 0, hai = 0
  for (const ba of branchesA) {
    for (const bb of branchesB) {
      if (LIU_HE[ba] === bb) he++
      if (CHONG[ba] === bb) chong++
      if (HAI[ba] === bb) hai++
    }
  }
  let score = 72 + he * 6 - chong * 7 - hai * 3
  return clamp(score)
}

// ============================================================
// Element harmony analysis
// ============================================================

function buildElementHarmony(a: SajuResult, b: SajuResult): ElementHarmony {
  const dmA = a.dayMaster.key
  const dmB = b.dayMaster.key
  const rel = elementRelation(dmA, dmB)

  const complementary: string[] = []
  const shared: string[] = []

  // 보완 기운: A에게 부족하고 B에게 많은 오행, 그 반대
  const weakA = a.weakest.key
  const weakB = b.weakest.key
  const domA = a.dominant.key
  const domB = b.dominant.key

  if (domB === weakA && domB !== weakB) complementary.push(`${ELEMENT_KR[domB]} (B가 A의 부족 기운 보충)`)
  if (domA === weakB && domA !== weakA) complementary.push(`${ELEMENT_KR[domA]} (A가 B의 부족 기운 보충)`)
  if (SHENG[domA] === domB) complementary.push(`${ELEMENT_KR[domA]}→${ELEMENT_KR[domB]} 상생 흐름`)
  if (SHENG[domB] === domA) complementary.push(`${ELEMENT_KR[domB]}→${ELEMENT_KR[domA]} 상생 흐름`)

  // 공유 기운: 두 사람 모두 강한 오행
  if (domA === domB) shared.push(`${ELEMENT_KR[domA]} (공통 최다 기운)`)
  if (weakA === weakB) shared.push(`${ELEMENT_KR[weakA]} (공통 부족 기운)`)

  let text: string
  switch (rel) {
    case 'same':
      text = `${ELEMENT_KR[dmA]} 일간 × ${ELEMENT_KR[dmB]} 일간 — 같은 기운의 만남으로, 이해는 빠르지만 자극이 부족할 수 있습니다. 서로 다른 분야에서 경험을 나눌 때 관계가 성장합니다.`
      break
    case 'sheng-a-to-b':
      text = `${ELEMENT_KR[dmA]} 일간이 ${ELEMENT_KR[dmB]} 일간을 생(生)해주는 상생의 만남으로, A가 B에게 에너지를 공급하는 구조입니다. 자연스러운 보완이 일어나는 긍정적 궁합입니다.`
      break
    case 'sheng-b-to-a':
      text = `${ELEMENT_KR[dmB]} 일간이 ${ELEMENT_KR[dmA]} 일간을 생(生)해주는 상생의 만남으로, B가 A에게 에너지를 공급하는 구조입니다. 자연스러운 보완이 일어나는 긍정적 궁합입니다.`
      break
    case 'ke-a-to-b':
      text = `${ELEMENT_KR[dmA]} 일간이 ${ELEMENT_KR[dmB]} 일간을 극(剋)하는 상극의 만남으로, 초기 자극은 강하나 마찰 관리가 필요합니다. 제3의 오행으로 중화하면 성장의 기회가 됩니다.`
      break
    case 'ke-b-to-a':
      text = `${ELEMENT_KR[dmB]} 일간이 ${ELEMENT_KR[dmA]} 일간을 극(剋)하는 상극의 만남으로, 초기 자극은 강하나 마찰 관리가 필요합니다. 제3의 오행으로 중화하면 성장의 기회가 됩니다.`
      break
    default:
      text = `${ELEMENT_KR[dmA]} 일간 × ${ELEMENT_KR[dmB]} 일간 — 직접적인 생극 관계가 없는 무관계의 만남입니다. 오행 분포의 보완과 합충에 따라 궁합이 결정되며, 노력으로 키워가는 관계입니다.`
  }

  return { text, complementary, shared }
}

// ============================================================
// Chemistry chart
// ============================================================

function buildChemistryChart(a: SajuResult, b: SajuResult, nameA: string, nameB: string): ChemistryChartItem[] {
  return [
    { label: '성격 궁합', score: dayMasterScore(a, b) },
    { label: '오행 보완도', score: balanceScore(a, b) },
    { label: '관계 안정성', score: interactionScore(a, b) },
    { label: '소통 궁합', score: clamp(dayMasterScore(a, b) - 2) },
    { label: '장기 케미', score: clamp(Math.round((dayMasterScore(a, b) + balanceScore(a, b) + interactionScore(a, b)) / 3)) },
  ]
}

// ============================================================
// Section builders (5 chapters)
// ============================================================

function buildChapter1(a: Person, b: Person): CompatibilitySection {
  const dmA = a.result.dayMaster.key
  const dmB = b.result.dayMaster.key
  const rel = elementRelation(dmA, dmB)
  const harmonyText = rel === 'same'
    ? '같은 기운끼리의 만남이라 이해는 빠르지만, 자극이 부족해 변화가 필요합니다.'
    : (rel === 'sheng-a-to-b' || rel === 'sheng-b-to-a')
      ? '상생(相生)의 만남으로, 서로의 기운을 보완하고 키워주는 긍정적 흐름입니다.'
      : (rel === 'ke-a-to-b' || rel === 'ke-b-to-a')
        ? '상극(相剋)의 만남으로, 초기엔 강한 자극이 오지만 마찰 관리가 핵심입니다.'
        : '무관계의 만남으로, 노력으로 케미를 키워가는 관계입니다.'

  return {
    chapter: 1,
    title: '두 사람의 일간(日干) 케미 — 본질 궁합',
    keywords: [ELEMENT_KR[dmA], ELEMENT_KR[dmB], '일간 궁합'],
    score: dayMasterScore(a.result, b.result),
    intro: `${a.name}님(${ELEMENT_KR[dmA]})과 ${b.name}님(${ELEMENT_KR[dmB]})의 만남은 ${harmonyText}`,
    paragraphs: [
      `${a.name}님의 일간 ${ELEMENT_KR[dmA]}와 ${b.name}님의 일간 ${ELEMENT_KR[dmB]}의 관계가 두 사람 본질 궁합의 뼈대입니다.`,
      `일간의 생극 관계는 감정·에너지 흐름의 방향을 결정하며, 합이 형성되면 깊은 이해, 충이 형성되면 역동적 변화가 일어납니다.`,
      `${harmonyText}`,
    ],
    closing: '본질 궁합은 바꿀 수 없지만, 이해하면 방향을 맞출 수 있습니다.',
  }
}

function buildChapter2(a: Person, b: Person): CompatibilitySection {
  return {
    chapter: 2,
    title: '소통과 감정 결 — 대화 궁합',
    keywords: ['소통', '감정', '대화'],
    score: clamp(dayMasterScore(a.result, b.result) - 2),
    intro: `${a.name}님과 ${b.name}님의 대화 결은 일간의 음양과 오행 흐름에서 비롯됩니다.`,
    paragraphs: [
      `일간의 기운이 같으면 말이 빨리 통하지만 갈등 시 회피가 겹치고, 상생이면 서로의 말을 받아주며, 상극이면 대화가 자극적이지만 잦은 충돌이 일어납니다.`,
      `감정 표현의 결을 맞추려면, 상대의 일간이 좋아하는 소통 방식(목=논리, 화=표현, 토=안정, 금=명확, 수=공감)을 이해하는 것이 중요합니다.`,
      `월지의 기운까지 겹치면 감정의 결이 더 깊어지고, 시지가 보완하면 대화의 회복탄력성이 높아집니다.`,
    ],
    closing: '말이 통한다는 것은, 기운의 결이 맞는다는 뜻입니다.',
  }
}

function buildChapter3(a: Person, b: Person): CompatibilitySection {
  const dmA = a.result.dayMaster.key
  const dmB = b.result.dayMaster.key
  const complementary = [a.result.weakest.key, b.result.weakest.key].filter(k => k !== dmA && k !== dmB)
  const needsKey = complementary[0] ?? a.result.weakest.key
  return {
    chapter: 3,
    title: '재물·가치관 궁합 — 함께 만드는 부의 흐름',
    keywords: ['재물', '가치관', '부의 흐름'],
    score: clamp(balanceScore(a.result, b.result)),
    intro: `${a.name}님과 ${b.name}님이 함께할 때 재물의 흐름은 두 사람의 오행 분포가 얼마나 보완적이냐에 달려 있습니다.`,
    paragraphs: [
      `두 사람의 오행을 합쳤을 때 ${ELEMENT_KR[needsKey]} 기운이 부족하므로, 이 기운을 일상(색상·음식·공간)에서 보충하면 공동 재물운이 안정됩니다.`,
      `한 사람이 축적형(토·금)이고 다른 한 사람이 확장형(목·화)이면 역할 분담이 자연스럽고, 두 사람 모두 같은 유형이면 소비 패턴을 조율해야 합니다.`,
      `지지충이 양쪽에 겹치면 현금 흐름이 불안정해지므로, 공동 계좌와 분할 적립이 안전한 축적 방식입니다.`,
    ],
    closing: '부의 흐름은 두 사람의 오행이 합쳐졌을 때 비로소 보입니다.',
  }
}

function buildChapter4(a: Person, b: Person): CompatibilitySection {
  const chongA = a.result.interactions.some(i => i.type === '지지충')
  const chongB = b.result.interactions.some(i => i.type === '지지충')
  return {
    chapter: 4,
    title: '갈등·위기 관리력 — 마찰을 다루는 방식',
    keywords: ['갈등', '위기', '관리력'],
    score: interactionScore(a.result, b.result),
    intro: `${a.name}님의 사주에 충이 ${chongA ? '있어' : '없어'} 변화 수용력이 ${chongA ? '높고' : '안정적이며'}, ${b.name}님은 충이 ${chongB ? '있어' : '없어'} ${chongB ? '역동적' : '안정적'}입니다.`,
    paragraphs: [
      `충이 강한 사람은 변화에 빠르게 적응하지만 갈등을 겉으로 드러내고, 충이 약한 사람은 갈등을 참다 한 번에 터뜨리는 경향이 있습니다.`,
      `양쪽 모두 충이 있으면 갈등이 겉으로 드러나 빨리 풀리지만 잦을 수 있고, 한쪽만 있으면 안정 쪽이 감정 노동을 더 할 수 있습니다.`,
      `갈등 시 서로의 일간 기운을 중화하는 제3의 오행(개운법)을 일상에 도입하면, 마찰이 성장의 에너지로 전환됩니다.`,
    ],
    closing: '마찰을 피하는 것이 아니라, 마찰을 다루는 법을 아는 것이 관계의 힘입니다.',
  }
}

function buildChapter5(a: Person, b: Person): CompatibilitySection {
  const longScore = clamp(Math.round((dayMasterScore(a.result, b.result) + balanceScore(a.result, b.result) + interactionScore(a.result, b.result)) / 3))
  return {
    chapter: 5,
    title: '장기 동반자 궁합 — 평생을 함께할 흐름',
    keywords: ['장기', '동반자', '평생 흐름'],
    score: longScore,
    intro: `${a.name}님과 ${b.name}님의 장기 궁합은 일간·오행 보완·관계 안정성의 종합 점수로 읽습니다.`,
    paragraphs: [
      `장기 관계에서는 초기의 자극보다 오행의 보완과 합의 지속성이 중요합니다. 두 사람의 대운 흐름이 서로의 일간을 생(生)해주는 시기가 함께 오면 관계가 더욱 깊어집니다.`,
      `한 사람의 대운이 상대 일간과 충을 이루는 시기에는 거리와 배려가 필요하고, 합이 드는 시기에는 함께 새로운 목표를 세우기 좋습니다.`,
      `장기 동반자 궁합은 "완벽한 조화"가 아니라 "불균형을 함께 맞춰가는 능력"에서 완성됩니다.`,
    ],
    closing: '평생의 궁합은 타고남이 아니라, 함께 빚어가는 것입니다.',
  }
}

// ============================================================
// Action guide
// ============================================================

function buildActionGuide(a: Person, b: Person): CompatibilityActionGuide {
  const weakA = a.result.weakest.key
  const weakB = b.result.weakest.key
  // 두 사람에게 공통으로 도움되는 오행 (부족 기운 중 하나 선택, 우선 순위)
  const needKey: ElementKey = weakA === weakB ? weakA : (weakA === a.result.dayMaster.key ? weakB : weakA)

  return {
    recommendedPlaces: ELEMENT_PLACES[needKey].slice(0, 3).join(', '),
    avoidPlaces: ELEMENT_PLACES[KE[a.result.dayMaster.key]].join(', '),
    forbiddenActions: [
      '공개된 자리에서 상대의 일간 기운(성향)을 부정하는 말 하기',
      '갈등 시 침묵으로 회피하며 감정을 쌓아두기',
      '상대의 오행 취약 시기에 중대한 결정이나 이별 통보하기',
    ],
    forbiddenWords: ['너는 원래 그래', '됐어', '알아서 해', '항상/절대', '네가 변해야 해'],
    heartMeltActions: [
      '상대의 일간 기운에 맞는 소통 방식 선택 (목=논리·화=표현·토=안정·금=명확·수=공감)',
      '갈등 후 24시간 내 작은 행동으로 먼저 다가가기',
      '상대의 취약 오행을 보충하는 음식이나 공간 함께 선택하기',
    ],
    luckyColors: ELEMENT_COLORS[needKey],
    luckyFoods: ELEMENT_FOODS[needKey],
  }
}

// ============================================================
// Main generator
// ============================================================

export function generateCompatibilityReport(personA: Person, personB: Person): CompatibilityReport {
  const a = personA
  const b = personB

  const elementHarmony = buildElementHarmony(a.result, b.result)
  const chemistryChart = buildChemistryChart(a.result, b.result, a.name, b.name)

  const sections: CompatibilitySection[] = [
    buildChapter1(a, b),
    buildChapter2(a, b),
    buildChapter3(a, b),
    buildChapter4(a, b),
    buildChapter5(a, b),
  ]

  const totalScore = clamp(
    Math.round(
      sections.reduce((s, sec) => s + sec.score, 0) / sections.length,
    ),
  )

  const dmA = a.result.dayMaster.key
  const dmB = b.result.dayMaster.key
  const rel = elementRelation(dmA, dmB)
  const closingParts: string[] = []
  if (rel === 'sheng-a-to-b' || rel === 'sheng-b-to-a') {
    closingParts.push(`${a.name}님과 ${b.name}님은 상생의 만남으로, 서로의 기운을 보완하며 함께 성장하기 좋은 궁합입니다.`)
  } else if (rel === 'ke-a-to-b' || rel === 'ke-b-to-a') {
    closingParts.push(`${a.name}님과 ${b.name}님은 상극의 자극이 있는 만남으로, 마찰을 다루는 지혜가 관계의 열쇠입니다.`)
  } else if (rel === 'same') {
    closingParts.push(`${a.name}님과 ${b.name}님은 같은 기운의 만남으로, 이해는 빠르지만 새로운 자극을 함께 만들어가야 합니다.`)
  } else {
    closingParts.push(`${a.name}님과 ${b.name}님은 노력으로 케미를 키워가는 관계로, 오행 보완과 소통이 관계의 힘입니다.`)
  }
  closingParts.push('궁합 점수는 운의 경향이지 결정이 아니며, 두 사람의 선택이 관계를 완성합니다.')
  const closing = closingParts.join(' ')

  const actionGuide = buildActionGuide(a, b)

  return {
    totalScore,
    closing,
    elementHarmony,
    chemistryChart,
    sections,
    actionGuide,
  }
}
