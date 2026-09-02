import type { SajuResult, ElementKey } from './saju'
import type { MBTIType } from './mbti-data'

// ============================================================
// Types
// ============================================================

export type ThemeKey = 'wealth' | 'career' | 'love' | 'health'

export interface ThemeReportSection {
  title: string
  keywords: string[]
  paragraphs: string[]
  closing: string
}

export interface ThemeActionGuideItem {
  label: string
  items: string[]
}

export interface ThemeReport {
  themeKey: ThemeKey
  totalScore: number
  mbti?: MBTIType
  dayMasterStemKr: string
  sections: ThemeReportSection[]
  actionGuide: ThemeActionGuideItem[]
  closing: string
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

// 오행별 재물 성향
const WEALTH_PROFILE: Record<ElementKey, { trait: string; source: string; risk: string }> = {
  wood: {
    trait: '목(木) 일간은 성장과 확장을 통해 재물을 축적하는 형태입니다.',
    source: '학문, 기획, 교육, 컨설팅 등 지식을 바탕으로 한 수입이 주 재원입니다.',
    risk: '무리한 확장과 다각화로 인해 자금이 분산될 수 있습니다.',
  },
  fire: {
    trait: '화(火) 일간은 열정과 시선을 끌어 재물을 만드는 형태입니다.',
    source: '엔터테인먼트, 마케팅, 미디어, 뷰티 등 시각적·감각적 분야가 유리합니다.',
    risk: '순간적 충동 소비와 과시욕이 재물을 빠르게 소진시킬 수 있습니다.',
  },
  earth: {
    trait: '토(土) 일간은 안정과 신뢰를 바탕으로 재물을 쌓는 형태입니다.',
    source: '부동산, 농업, 유통, 보관 등 토대를 다루는 분야가 재물운과 연결됩니다.',
    risk: '보수적 태도가 투자 기회를 놓치거나 자산 회전을 늦추는 원인이 됩니다.',
  },
  metal: {
    trait: '금(金) 일간은 규율과 정밀함으로 재물을 관리하는 형태입니다.',
    source: '금융, 기계, 법률, 의료 등 체계적이고 권위 있는 분야가 재물운을 높입니다.',
    risk: '지나친 단절과 인색함이 인맥 기반의 재물 흐름을 막을 수 있습니다.',
  },
  water: {
    trait: '수(水) 일간은 유연함과 이동으로 재물을 흘려보내며 모으는 형태입니다.',
    source: '무역, 운송, IT, 유동성이 중요한 분야가 재물 축적에 유리합니다.',
    risk: '흐름이 너무 빨라 돈이 손가락 사이로 빠져나가기 쉽습니다.',
  },
}

// 오행별 커리어 성향
const CAREER_PROFILE: Record<ElementKey, { trait: string; fit: string; timing: string }> = {
  wood: {
    trait: '목(木) 일간은 기획하고 키워내는 역할에서 빛납니다.',
    fit: '교육, 연구, 기획, 콘텐츠 창작, 스타트업 등 새싹을 키우는 환경이 적합합니다.',
    timing: '봄(목화왕성기)과 목·수 기운이 들어오는 시기가 커리어 상승의 타이밍입니다.',
  },
  fire: {
    trait: '화(火) 일간은 시선을 모으고 에너지를 발산하는 역할에 강합니다.',
    fit: '마케팅, 미디어, 강연, 뷰티, 엔터테인먼트 등 무대에 서는 직업이 잘 맞습니다.',
    timing: '여름(화토왕성기)과 목·화 기운이 강해지는 시기가 승진·인지도 상승기입니다.',
  },
  earth: {
    trait: '토(土) 일간은 토대를 세우고 관리하는 역할에 최적화되어 있습니다.',
    fit: '부동산, 행정, 물류, 인사, 회계 등 기반을 다지는 직무가 안정감을 줍니다.',
    timing: '환절기(토왕성기)와 화·토 기운이 들어올 때 조직 내 입지가 굳어집니다.',
  },
  metal: {
    trait: '금(金) 일간은 규칙을 세우고 결단을 내리는 역할에 강합니다.',
    fit: '법률, 금융, 군경, 의료, 엔지니어링 등 정밀·권위 분야가 적성에 맞습니다.',
    timing: '가을(금수왕성기)과 토·금 기운이 강해지는 시기가 권한 확대의 타이밍입니다.',
  },
  water: {
    trait: '수(水) 일간은 흐름을 읽고 연결하는 역할에 유리합니다.',
    fit: '무역, IT, 물류, 컨설팅, 유동성 기반 비즈니스가 적성에 부합합니다.',
    timing: '겨울(수목왕성기)와 금·수 기운이 강해지는 시기가 이직·확장의 적기입니다.',
  },
}

// 오행별 건강 취약 부위
const HEALTH_PROFILE: Record<ElementKey, { organ: string; risk: string; remedy: string }> = {
  wood: {
    organ: '간(肝)·담(膽)·근골·신경계',
    risk: '스트레스성 두통, 간 기능 저하, 근육 긴장, 안구 피로가 취약합니다.',
    remedy: '푸른 채소, 산책, 명상으로 목 기운을 풀어주는 것이 중요합니다.',
  },
  fire: {
    organ: '심장(心)·소장·혈관·안구',
    risk: '심박 이상, 혈압 변동, 안구 건조, 불면이 취약한 축에 속합니다.',
    remedy: '붉은 식재료, 수면 관리, 과도한 흥분 피하기로 화 기운을 조절합니다.',
  },
  earth: {
    organ: '비장(脾)·위(胃)·소화기·근육',
    risk: '소화불량, 위염, 당뇨, 근육 통증이 자주 나타날 수 있습니다.',
    remedy: '노란 식재료, 규칙적 식사, 가벼운 토양 접촉(맨발 걷기)이 도움이 됩니다.',
  },
  metal: {
    organ: '폐(肺)·대장·호흡기·피부',
    risk: '호흡기 감염, 피부 질환, 알레르기, 대장 기능 저하에 주의해야 합니다.',
    remedy: '흰 식재료, 호흡 운동, 청결 유지로 금 기운을 보강하세요.',
  },
  water: {
    organ: '신장(腎)·방광·비뇨기·골수',
    risk: '신장 기능, 비뇨기 염증, 뼈 관련 문제, 수족 냉증이 취약합니다.',
    remedy: '검은 식재료, 충분한 수분 섭취, 따뜻한 족욕으로 수 기운을 돕습니다.',
  },
}

// 오행별 연애 성향
const LOVE_PROFILE: Record<ElementKey, { trait: string; type: string; pattern: string }> = {
  wood: {
    trait: '목(木) 일간은 정직하고 성장을 함께하는 인연을 끌어당깁니다.',
    type: '지적이고 담백하며, 함께 배우고 키워가는 관계를 선호합니다.',
    pattern: '상대의 성장을 방해하거나 통제하려 들면 급격히 거리를 둡니다.',
  },
  fire: {
    trait: '화(火) 일간은 강렬한 스파크와 시선으로 인연을 만듭니다.',
    type: '밝고 표현이 풍부하며, 순간의 화학반응을 사랑의 시작으로 삼습니다.',
    pattern: '자극이 식거나 무거운 침묵이 길어지면 빠르게 에너지가 빠집니다.',
  },
  earth: {
    trait: '토(土) 일간은 느리지만 한 번 마음을 주면 변치 않는 인연을 맺습니다.',
    type: '안정적이고 헌신적이며, 신뢰가 쌓일수록 깊이 헌신합니다.',
    pattern: '무시나 변덕을 상처로 받아들이고, 말없이 지쳐가는 패턴이 있습니다.',
  },
  metal: {
    trait: '금(金) 일간은 기준이 확실하고 책임감 있는 인연을 끌어당깁니다.',
    type: '단호하고 원칙이 분명하며, 약속과 신뢰로 사랑을 증명합니다.',
    pattern: '망설임과 무책임을 견디기 힘들어, 흐지부지한 감정 극에 인내가 닳습니다.',
  },
  water: {
    trait: '수(水) 일간은 유연하고 깊이 이해해주는 인연을 만듭니다.',
    type: '부드럽고 수용적이며, 감정의 결을 잘 읽는 연인입니다.',
    pattern: '너무 맞춰주다가 자신을 잃거나, 흐름이 바뀌면 회피하는 경향이 있습니다.',
  },
}

// ============================================================
// Helpers
// ============================================================

function clampScore(n: number): number {
  return Math.max(40, Math.min(98, Math.round(n)))
}

function scoreFromElements(result: SajuResult): number {
  const dm = result.dayMaster.key
  const dom = result.dominant.key
  const weak = result.weakest.key
  let base = 68
  if (dm === dom) base += 8
  if (dm !== weak) base += 6
  // 보완 구조(일간과 최다 오행이 상생) 점수 가산
  const sheng: Record<ElementKey, ElementKey> = { wood: 'fire', fire: 'earth', earth: 'metal', metal: 'water', water: 'wood' }
  if (sheng[dm] === dom) base += 6
  if (result.interactions.some(i => i.type === '천간합' || i.type === '지지육합')) base += 5
  if (result.interactions.some(i => i.type === '지지충')) base -= 6
  return clampScore(base)
}

// ============================================================
// Section builders per theme
// ============================================================

function buildWealthSections(result: SajuResult, name: string): ThemeReportSection[] {
  const dm = result.dayMaster.key
  const p = WEALTH_PROFILE[dm]
  const dom = result.dominant.key
  const weak = result.weakest.key

  return [
    {
      title: `${name}님의 타고난 재물 그릇과 평생 소득 궤도`,
      keywords: [ELEMENT_KR[dm], '재물 그릇', '소득 궤도'],
      paragraphs: [
        `${name}님은 ${ELEMENT_KR[dm]} 일간으로 태어나, ${p.trait}`,
        `현재 사주에서 가장 강한 기운은 ${ELEMENT_KR[dom]}이며, 가장 약한 기운은 ${ELEMENT_KR[weak]}입니다. 이 오행의 균형이 평생 소득의 최대치와 흐름을 결정합니다.`,
        `${p.source}`,
      ],
      closing: `${ELEMENT_KR[dm]} 일간의 재물운은 흐름을 읽고 기회를 놓치지 않는 데 달려 있습니다.`,
    },
    {
      title: '손재수(돈이 새어나가는 시기)와 축적 전략',
      keywords: ['손재수', '축적', '위험 시기'],
      paragraphs: [
        `사주 내 지지충이나 천간충이 들어오는 시기에는 현금 흐름이 불안정해지고, ${p.risk}`,
        `특히 ${ELEMENT_KR[weak]} 기운이 과도하게 강해지는 대운·유년에서는 투자 판단이 흐려질 수 있습니다.`,
        `축적 전략으로는 목표 금액을 정해 분할 적립하고, 변동성 큰 자산은 단기 보유를 피하는 것이 안전합니다.`,
      ],
      closing: '재물은 흘러들어올 때 잡고, 흘러나갈 때 막는 것이 핵심입니다.',
    },
    {
      title: '나에게 맞는 부의 창출 방식 — 투자 vs 사업 vs 정직한 노동',
      keywords: ['창출 방식', '투자', '사업', '노동'],
      paragraphs: [
        `${ELEMENT_KR[dm]} 일간에게 가장 잘 맞는 부의 창출 방식은 ${p.source.split('.')[0]}입니다.`,
        `지지육합이나 삼합이 형성된 사주라면 파트너십·공동 투자가 유리하고, 충이 강하면 독립적 자산 운영이 안전합니다.`,
        `정직한 노동으로 기반을 다진 뒤 잉여를 투자로 불리는 2단계 전략이 ${name}님에게 안정적입니다.`,
      ],
      closing: '자신의 오행에 맞는 방식을 택할 때 재물은 배로 돌아옵니다.',
    },
    {
      title: '평생 재물운의 최대치와 부의 변곡점',
      keywords: ['최대치', '변곡점', '대운'],
      paragraphs: [
        `현재 ${result.currentDaYunIndex >= 0 ? `${result.daYun[result.currentDaYunIndex]?.ganZhi ?? ''} 대운` : '대운'}에 진입한 ${name}님은 재물운의 변곡점에 있습니다.`,
        `일간과 상생하는 오행의 대운이 들어올 때 소득이 급등하며, 이 시기가 평생 재물운의 최대치를 형성합니다.`,
        `충·형이 겹치는 유년은 분배와 보존에 집중하고, 합·생이 겹치는 유년은 과감히 확장하세요.`,
      ],
      closing: '부의 최대치는 타이밍을 아는 자에게 찾아옵니다.',
    },
  ]
}

function buildCareerSections(result: SajuResult, name: string): ThemeReportSection[] {
  const dm = result.dayMaster.key
  const p = CAREER_PROFILE[dm]

  return [
    {
      title: `${name}님의 조직 vs 독립/창업 적성 정밀 진단`,
      keywords: [ELEMENT_KR[dm], '조직', '독립', '적성'],
      paragraphs: [
        `${name}님은 ${ELEMENT_KR[dm]} 일간으로, ${p.trait}`,
        `${p.fit}`,
        `지지에 충이 강하면 조직 내 마찰이 커 독립·프리랜서가 성과가 좋고, 합이 많으면 조직 생활에서 인정받기 쉽습니다.`,
      ],
      closing: `${ELEMENT_KR[dm]} 일간은 자신의 기운을 발산할 수 있는 무대를 선택할 때 빛납니다.`,
    },
    {
      title: '이직, 승진, 사업 확장 변동수가 강한 타이밍',
      keywords: ['이직', '승진', '사업 확장', '타이밍'],
      paragraphs: [
        `${p.timing}`,
        `현재 대운의 간지가 일간과 합을 이루면 승진·인정의 시기, 충을 이루면 이직·이동의 시기입니다.`,
        `유년에서 목·화 기운이 강해질 때 변동수가 가장 강하게 들어옵니다.`,
      ],
      closing: '변화는 피하는 것이 아니라 타이밍을 타는 것입니다.',
    },
    {
      title: '내 시너지를 극대화해 줄 귀인(貴人) 성향',
      keywords: ['귀인', '시너지', '동료 케미'],
      paragraphs: [
        `${ELEMENT_KR[dm]} 일간의 귀인은 일간을 생(生)해주는 오행, 즉 ${ELEMENT_KR[({ wood: 'water', fire: 'wood', earth: 'fire', metal: 'earth', water: 'metal' } as Record<ElementKey, ElementKey>)[dm]]} 기운의 사람입니다.`,
        `이 오행이 강한 동료·상사와 함께할 때 일의 추진력과 성과가 배가됩니다.`,
        `반대로 일간과 충을 이루는 오행의 사람과는 역할을 분리하는 것이 효율적입니다.`,
      ],
      closing: '귀인은 운이 아니라 오행의 조화 속에서 만나는 사람입니다.',
    },
    {
      title: '평생 업(業)과 커리어 최종 목표',
      keywords: ['평생 업', '최종 목표'],
      paragraphs: [
        `${name}님의 평생 업은 ${p.fit.split(',')[0]}에 깊이 뿌리내린 형태로 완성됩니다.`,
        `사주의 일간이 가진 본질 기운을 직업으로 구현할 때, 커리어는 단순한 일을 넘어 삶의 의미가 됩니다.`,
        `대운 후반부에 들어서면 축적된 경험이 권위와 영향력으로 전환되는 시기가 옵니다.`,
      ],
      closing: '업(業)은 자신의 기운을 세상에 내어주는 방식입니다.',
    },
  ]
}

function buildLoveSections(result: SajuResult, name: string, mbti: MBTIType | null): ThemeReportSection[] {
  const dm = result.dayMaster.key
  const p = LOVE_PROFILE[dm]
  const mbtiNote = mbti ? `\nMBTI ${mbti} 성향이 사주의 애착 패턴과 결합되어, ${name}님만의 연애 체질이 완성됩니다.` : ''

  return [
    {
      title: `${name}님이 끌리는 인연의 외모·성격 특징`,
      keywords: [ELEMENT_KR[dm], '인연 유형', '끌림'],
      paragraphs: [
        `${name}님은 ${ELEMENT_KR[dm]} 일간으로, ${p.trait}`,
        `${p.type}`,
        `사주 속 일간과 합을 이루는 오행의 특징을 가진 사람에게 강하게 끌립니다.${mbtiNote}`,
      ],
      closing: '끌림은 우연이 아니라 사주가 그리는 인연의 궤적입니다.',
    },
    {
      title: '평생 운의 흐름에서 인연운이 가장 강한 시기',
      keywords: ['인연운', '연애 시기', '결혼 시기'],
      paragraphs: [
        `일간과 합(合)이나 생(生)을 이루는 대운·유년이 들어올 때 인연운이 가장 강하게 들어옵니다.`,
        `특히 지지육합이나 천간합이 형성되는 시기에는 인연이 깊어지고, 충이 풀리는 시기에는 새 인연이 들어옵니다.`,
        `현재 대운의 흐름과 일간의 관계를 보면 인연운의 강도를 가늠할 수 있습니다.`,
      ],
      closing: '인연은 기다림이 아니라 운의 흐름을 타는 것입니다.',
    },
    {
      title: '반복되는 연애 패턴 분석',
      keywords: ['연애 패턴', '반복', '애착'],
      paragraphs: [
        `${p.pattern}`,
        `사주 내 지지충이나 형·해가 있는 위치에 따라 반복되는 갈등 패턴이 다르게 나타납니다.`,
        mbti ? `MBTI ${mbti}의 애착 결이 사주와 겹쳐, 특정 유형에게 반복적으로 끌리거나 상처받는 패턴이 형성됩니다.` : `자신의 일간 기운과 상극인 유형에게 반복적으로 끌리는 패턴을 경계해야 합니다.`,
      ],
      closing: '패턴을 아는 순간, 반복은 선택으로 바뀝니다.',
    },
    {
      title: '나에게 피해야 할 상극 유형과 극복법',
      keywords: ['상극', '피해야 할 유형', '극복'],
      paragraphs: [
        `${ELEMENT_KR[dm]} 일간과 충을 이루는 오행의 사람은 초기에는 강한 자극을 주지만, 장기적으로 마찰이 커집니다.`,
        `이 유형과의 관계는 거리와 역할을 분리하고, 감정적 결합보다는 목적 중심으로 유지하는 것이 안전합니다.`,
        `상극을 피하기보다 상극의 기운을 중화할 수한 제3의 오행(개운법)을 일상에 도입하세요.`,
      ],
      closing: '상극을 아는 것이 관계를 지키는 가장 강력한 무기입니다.',
    },
  ]
}

function buildHealthSections(result: SajuResult, name: string): ThemeReportSection[] {
  const dm = result.dayMaster.key
  const p = HEALTH_PROFILE[dm]
  const weak = result.weakest.key

  return [
    {
      title: `${name}님의 오행 체질 분석`,
      keywords: [ELEMENT_KR[dm], '체질', '오행 불균형'],
      paragraphs: [
        `${name}님은 ${ELEMENT_KR[dm]} 일간으로, ${p.organ}이 취약한 체질입니다.`,
        `사주에서 가장 약한 기운은 ${ELEMENT_KR[weak]}이며, 이 기운의 부족이 건강의 근본 원인이 됩니다.`,
        `오행의 불균형은 곧 장부의 불균형이므로, 부족한 기운을 일상에서 보충하는 것이 건강의 출발점입니다.`,
      ],
      closing: '체질을 아는 것은 병을 치료하는 것이 아니라 병이 오지 않게 하는 것입니다.',
    },
    {
      title: '취약한 신체 부위와 주의해야 할 건강 고비 시기',
      keywords: ['취약 부위', '건강 고비', '시기'],
      paragraphs: [
        `${p.risk}`,
        `일간과 충을 이루는 오행의 대운·유년이 들어올 때 해당 장부의 부담이 커집니다.`,
        `특히 ${ELEMENT_KR[weak]} 기운이 극(剋)을 받는 시기에는 정기 검진과 휴식이 필수입니다.`,
      ],
      closing: '고비는 미리 아는 자에게는 기회가 되고, 모르는 자에게는 위기가 됩니다.',
    },
    {
      title: '스트레스 경로와 해소법',
      keywords: ['스트레스', '경로', '해소'],
      paragraphs: [
        `${ELEMENT_KR[dm]} 일간의 스트레스는 주로 ${p.organ.split('·')[0]} 쪽으로 축적됩니다.`,
        `충·형이 강한 사주일수록 내면 긴장이 높고, 이가 신체 부위로 전이되는 경로를 이해해야 합니다.`,
        `규칙적 휴식과 자신의 오행에 맞는 해소법을 조합하면 스트레스 누적을 크게 줄일 수 있습니다.`,
      ],
      closing: '스트레스는 풀지 않으면 몸으로 말합니다.',
    },
    {
      title: '맞춤 개운법 — 컬러·음식·공간',
      keywords: ['개운법', '컬러', '음식', '공간'],
      paragraphs: [
        `${p.remedy}`,
        `부족한 ${ELEMENT_KR[weak]} 기운을 색상·음식·공간에서 보충하면 체질의 균형이 회복됩니다.`,
        `오행 개운법은 하루아침에 효과를 보기보다 꾸준히 누적할 때 건강의 울타리가 됩니다.`,
      ],
      closing: '개운은 거창한 의식이 아니라 일상의 작은 선택의 모음입니다.',
    },
  ]
}

// ============================================================
// Action guide builders
// ============================================================

function buildWealthActionGuide(result: SajuResult): ThemeActionGuideItem[] {
  const dm = result.dayMaster.key
  const colors: Record<ElementKey, string[]> = {
    wood: ['청록', '연두'], fire: ['주홍', '코랄'], earth: ['토프', '노랑'],
    metal: ['화이트', '실버'], water: ['네이비', '블루'],
  }
  const foods: Record<ElementKey, string[]> = {
    wood: ['시금치', '브로콜리'], fire: ['토마토', '고추'], earth: ['고구마', '생강'],
    metal: ['배', '양파'], water: ['흑임자', '해조류'],
  }
  return [
    { label: '재물 개운 컬러', items: colors[dm] },
    { label: '재물 모으는 음식', items: foods[dm] },
    { label: '재물운 높이는 행동', items: ['월급의 20% 자동 이체', '투자는 분할 매수', '큰 지출은 3일 고민 후 결정'] },
  ]
}

function buildCareerActionGuide(result: SajuResult): ThemeActionGuideItem[] {
  const dm = result.dayMaster.key
  const colors: Record<ElementKey, string[]> = {
    wood: ['올리브', '세이지'], fire: ['버밀리언', '오렌지'], earth: ['베이지', '카키'],
    metal: ['플래티넘', '그레이'], water: ['아쿠아', '슬레이트'],
  }
  return [
    { label: '커리어 개운 컬러', items: colors[dm] },
    { label: '승진·인정을 부르는 행동', items: ['결과를 문서로 남기기', '상사의 목표에 정렬하기', '한 달에 한 번 성과 브리핑'] },
    { label: '이직 적기 신호', items: ['충 유년 진입 시', '대운 교체기 ±2년', '현재 조직에서 합이 풀릴 때'] },
  ]
}

function buildLoveActionGuide(result: SajuResult, mbti: MBTIType | null): ThemeActionGuideItem[] {
  const dm = result.dayMaster.key
  const colors: Record<ElementKey, string[]> = {
    wood: ['민트', '피그'], fire: ['로즈', '핑크'], earth: ['테라코타', '샌드'],
    metal: ['문라이트', '펄'], water: ['시리안', '틸'],
  }
  return [
    { label: '연애 개운 컬러', items: colors[dm] },
    { label: '인연운 높이는 행동', items: ['일간과 합이 든 달에 만남 자리 나가기', '상극 오행 장소 피하기', '자신의 애착 패턴 먼저 점검'] },
    { label: mbti ? `MBTI ${mbti} 맞춤 솔루션` : '관계 유지 솔루션', items: ['감정 표현을 작게 자주', '상대의 오행 취약 시기 챙기기', '충 돌아올 때 거리부터 두기'] },
  ]
}

function buildHealthActionGuide(result: SajuResult): ThemeActionGuideItem[] {
  const weak = result.weakest.key
  const colors: Record<ElementKey, string[]> = {
    wood: ['그린', '라임'], fire: ['레드', '앰버'], earth: ['옐로', '골드'],
    metal: ['화이트', '라이트그레이'], water: ['블랙', '딥블루'],
  }
  const foods: Record<ElementKey, string[]> = {
    wood: ['녹차', '쑥'], fire: ['당근', '딸기'], earth: ['단호박', '율무'],
    metal: ['도라지', '연근'], water: ['블루베리', '미역'],
  }
  const places: Record<ElementKey, string[]> = {
    wood: ['산', '공원'], fire: ['양지', '카페 테라스'], earth: ['들', '정원'],
    metal: ['전망 좋은 고지', '바위'], water: ['바다', '강변'],
  }
  return [
    { label: '부족 기운 보충 컬러', items: colors[weak] },
    { label: '체질 보충 음식', items: foods[weak] },
    { label: '개운 공간', items: places[weak] },
    { label: '일상 건강 루틴', items: ['수면 7시간 확보', '주 3회 30분 걷기', '정기 검진 연 1회'] },
  ]
}

// ============================================================
// Main generator
// ============================================================

export function generateThemeReport(
  themeKey: ThemeKey,
  name: string,
  result: SajuResult,
  mbti: MBTIType | null,
): ThemeReport {
  const baseScore = scoreFromElements(result)
  const dayMasterStemKr = result.dayMasterStemKr

  let sections: ThemeReportSection[]
  let actionGuide: ThemeActionGuideItem[]
  let closing: string
  let totalScore: number

  switch (themeKey) {
    case 'wealth':
      sections = buildWealthSections(result, name)
      actionGuide = buildWealthActionGuide(result)
      totalScore = clampScore(baseScore + 4)
      closing = `${name}님의 재물운은 ${ELEMENT_KR[result.dayMaster.key]} 일간의 흐름을 이해하고, 손재 시기를 피하며 축적 시기를 타는 데 달려 있습니다. 작은 선택이 모여 평생 부의 궤도를 만듭니다.`
      break
    case 'career':
      sections = buildCareerSections(result, name)
      actionGuide = buildCareerActionGuide(result)
      totalScore = clampScore(baseScore + 2)
      closing = `${name}님의 커리어는 자신의 오행 적성에 맞는 무대를 선택하고, 변동수가 강한 타이밍을 탈 때 가장 빛납니다. 평생 업(業)은 일간의 본질 기운을 세상에 내어주는 방식에서 완성됩니다.`
      break
    case 'love':
      sections = buildLoveSections(result, name, mbti)
      actionGuide = buildLoveActionGuide(result, mbti)
      totalScore = clampScore(baseScore + (mbti ? 3 : 0))
      closing = `${name}님의 인연운은 사주의 애착 패턴을 이해하고, 상극을 피하며 합이 드는 시기를 기다릴 때 가장 아름답게 피어납니다.`
      break
    case 'health':
      sections = buildHealthSections(result, name)
      actionGuide = buildHealthActionGuide(result)
      totalScore = clampScore(baseScore - 2)
      closing = `${name}님의 건강은 오행 체질의 불균형을 알고, 부족한 기운을 일상의 작은 선택으로 보충할 때 가장 튼튼해집니다.`
      break
  }

  const report: ThemeReport = {
    themeKey,
    totalScore,
    dayMasterStemKr,
    sections,
    actionGuide,
    closing,
  }

  if (mbti && themeKey === 'love') {
    report.mbti = mbti
  }

  return report
}
