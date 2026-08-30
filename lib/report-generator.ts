import { ELEMENTS, type ElementKey, type SajuResult } from './saju'
import type { SajuFormValues } from '@/components/saju-form'
import type { AdditionalAnswers } from '@/components/additional-questions'

export type ReportSection = {
  step: number
  title: string
  subtitle: string
  toc: string[]
  keywords: string[]
  score: number
  intro: string
  highlight: string
  episodes: { label: string; text: string }[]
  insights: string[]
  innerVsOuter: { inner: string; outer: string; gap: string }
  microScenario: string
  closing: string
  layer?: 1 | 2 | 3
  isPriorityArea?: boolean
}

export type IntegratedSolution = {
  title: string
  items: { category: string; action: string; reason: string }[]
  closing: string
}

const STEM_TRAITS: Record<string, { nature: string; strength: string; weakness: string; love: string; money: string }> = {
  '甲': { nature: '큰 나무처럼 곧게 뻗어 나가는 기운', strength: '리더십과 추진력, 독립심', weakness: '고집과 융통성 부족', love: '이끌어주고 보호받고 싶은 상대에게 끌려요', money: '큰 그림으로 돈을 벌지만 잔손질이 약해요' },
  '乙': { nature: '담쟁이처럼 유연하게 감겨드는 기운', strength: '적응력과 섬세함, 협상력', weakness: '의존성과 주체성 약함', love: '의지할 수 있는 든든한 사람에게 끌려요', money: '사람을 통해 수익을 만드는 타입이에요' },
  '丙': { nature: '태양처럼 밝고 뜨겁게 비추는 기운', strength: '표현력과 열정, 리더십', weakness: '과소비와 체면 중시', love: '자기가 빛날 수 있는 관계를 원해요', money: '보여주기 위해 돈을 쓰는 타입이에요' },
  '丁': { nature: '촛불처럼 은은하게 타오르는 기운', strength: '직관력과 예술성, 집중력', weakness: '예민함과 번아웃', love: '영혼의 교감을 나누는 사람에게 끌려요', money: '감각과 재능으로 버는 타입이에요' },
  '戊': { nature: '큰 산처럼 묵직하게 버티는 기운', strength: '신뢰와 인내력, 책임감', weakness: '보수성과 변화에 느림', love: '안정감 주는 사람에게 끌려요', money: '부동산과 자산으로 축재하는 타입이에요' },
  '己': { nature: '비옥한 땅처럼 모든 것을 품는 기운', strength: '포용성과 계획력, 내실', weakness: '소심함과 걱정이 많음', love: '자신을 인정해주는 사람에게 끌려요', money: '알뜰히 모아 부자가 되는 타입이에요' },
  '庚': { nature: '큰 칼처럼 단호하게 베어내는 기운', strength: '결단력과 의리, 추진력', weakness: '직설적임과 상처를 줌', love: '강하고 자신감 있는 사람에게 끌려요', money: '한 번 벌면 크게 버는 타입이에요' },
  '辛': { nature: '보석처럼 차갑고 정교하게 빛나는 기운', strength: '섬세함과 미적 감각, 분별력', weakness: '냉정함과 비판적', love: '세련되고 지적인 사람에게 끌려요', money: '기술과 전문성으로 버는 타입이에요' },
  '壬': { nature: '큰 바다처럼 넓고 깊게 흐르는 기운', strength: '지혜와 모험심, 유동성', weakness: '산만함과 정착 어려움', love: '자유를 존중해주는 사람에게 끌려요', money: '유통과 무역, 플랫폼으로 버는 타입이에요' },
  '癸': { nature: '이슬처럼 은은하고 스며드는 기운', strength: '직관과 통찰력, 유연성', weakness: '우울감과 은둔성', love: '마음을 알아주는 사람에게 끌려요', money: '정보와 아이디어로 버는 타입이에요' },
}

const BRANCH_ANIMAL: Record<string, string> = {
  '子': '쥐', '丑': '소', '寅': '호랑이', '卯': '토끼', '辰': '용', '巳': '뱀',
  '午': '말', '未': '양', '申': '원숭이', '酉': '닭', '戌': '개', '亥': '돼지',
}

const BRANCH_TRAIT: Record<string, string> = {
  '子': '기민함과 적응력이 뛰어나고 밤의 에너지를 품어요',
  '丑': '인내와 근면으로 묵묵히 추진하는 힘이 있어요',
  '寅': '용기와 모험심, 개척정신이 강해요',
  '卯': '부드러움과 예술성, 인간관계를 다루는 솜씨가 있어요',
  '辰': '포부가 크고 변화를 주도하는 큰 그림을 그려요',
  '巳': '지혜와 관찰력으로 은밀하게 추진하는 힘이 있어요',
  '午': '열정과 자유를 향한 활동성이 넘쳐요',
  '未': '온화함과 협력, 끈기로 주변을 감싸요',
  '申': '재치와 융통성, 모험심으로 상황을 열어요',
  '酉': '꼼꼼함과 완벽주의, 실천력으로 일을 완성해요',
  '戌': '의리와 충성, 책임감으로 관계를 지켜요',
  '亥': '너그러움과 물질운, 마무리력으로 결실을 맺어요',
}

const HEALTH_PARTS: Record<ElementKey, string> = {
  wood: '간·담과 신경계, 눈, 근육·인대',
  fire: '심장·소장과 혈액순환, 혈압, 시력',
  earth: '비장·위와 소화기, 입, 근육',
  metal: '폐·대장과 호흡기, 피부, 코',
  water: '신장·방광과 비뇨기, 뼈, 귀',
}

const HEALTH_ACTIONS: Record<ElementKey, string> = {
  wood: '매일 30분 가벼운 유산소 운동(걷기, 요가), 충분한 수면(7시간 이상), 녹색 채소 섭취, 주기적인 간 기능 검진, 스트레스 관리',
  fire: '혈압·심박수 정기 측정, 카페인·알코올 제한, 붉은 과일(석류, 딸기) 섭취, 무리한 발표·야근 피하기, 눈 휴식 습관화',
  earth: '규칙적 식사(하루 3끼), 위장 내시경 정기 검진, 단백질·식이섬유 섭취, 과식·야식 금지, 식후 20분 산책',
  metal: '미세먼지 마스크 착용, 금연, 심호흡·호흡 운동, 흰색 채소(배추, 무) 섭취, 피부 보습, 체온 유지',
  water: '하루 1.5L 이상 수분 섭취, 해조류·검은콩 섭취, 신장 기능 정기 검진, 충분한 휴식, 과도한 소금 섭취 제한',
}

const SOLUTION_PLACES: Record<ElementKey, string> = {
  wood: '산책로와 공원, 식물원, 서점',
  fire: '햇빛 드는 카페와 무대·발표 자리, 밝은 색 인테리어 공간',
  earth: '도자기 클래스와 정원, 안정적인 사무실, 흙과 돌이 있는 곳',
  metal: '정돈된 서재와 체육관, 흰색 인테리어 공간',
  water: '강변과 바다, 수영장, 차분한 카페, 어두운 조명의 휴식 공간',
}

const SOLUTION_FOODS: Record<ElementKey, string> = {
  wood: '녹색 채소와 시금치, 쑥, 보리, 견과류',
  fire: '붉은 과일(딸기, 석류)과 고추, 커피, 양갈비',
  earth: '고구마와 감자, 단호박, 황태, 인삼',
  metal: '배와 도라지, 무, 흰 쌀, 양파',
  water: '검은 콩과 해조류, 오징어, 블루베리, 물',
}

const SOLUTION_ACTIONS: Record<ElementKey, string> = {
  wood: '주 3회 30분 산책, 매월 새로운 것 하나 배우기, 실내 식물 가꾸기',
  fire: '매일 햇빛 15분 쐬기, 감정 일기 쓰기, 밝은 색 옷 입기',
  earth: '규칙적 식사 습관, 매일 5분 기록하기, 주 1회 정리정돈',
  metal: '아침 5분 호흡 운동, 매일 정리정돈, 주 1회 통계·데이터 다루기',
  water: '하루 8잔 물 마시기, 주 1회 독서, 매일 10분 명상, 주 1회 강변 산책',
}

const SOLUTION_PEOPLE: Record<ElementKey, string> = {
  wood: '성장과 배움을 즐기고 계획을 세우며 푸른색을 좋아하는',
  fire: '밝고 열정적이며 무대에서 빛나고 붉은색을 좋아하는',
  earth: '신뢰와 안정을 주고 묵묵히 일하며 노란색·갈색을 좋아하는',
  metal: '원칙과 질서를 중시하고 정돈되어 있으며 흰색을 좋아하는',
  water: '유연하고 깊이가 있으며 차분하게 들어주고 검은색·푸른색을 좋아하는',
}

const STEM_KR: Record<string, string> = {
  '甲': '갑', '乙': '을', '丙': '병', '丁': '정', '戊': '무',
  '己': '기', '庚': '경', '辛': '신', '壬': '임', '癸': '계',
}

const STEM_ELEMENT_MAP: Record<string, ElementKey> = {
  '甲': 'wood', '乙': 'wood', '丙': 'fire', '丁': 'fire', '戊': 'earth',
  '己': 'earth', '庚': 'metal', '辛': 'metal', '壬': 'water', '癸': 'water',
}

const BRANCH_ELEMENT_MAP: Record<string, ElementKey> = {
  '子': 'water', '丑': 'earth', '寅': 'wood', '卯': 'wood', '辰': 'earth', '巳': 'fire',
  '午': 'fire', '未': 'earth', '申': 'metal', '酉': 'metal', '戌': 'earth', '亥': 'water',
}

function getStemTrait(stem: string) {
  return STEM_TRAITS[stem] ?? STEM_TRAITS['甲']
}

function judgeStrength(result: SajuResult): { level: string; short: string; desc: string; index: number } {
  const dm = result.dayMaster.key
  const dmCount = result.elementCounts[dm]
  const total = Object.values(result.elementCounts).reduce((a, b) => a + b, 0)
  const ratio = total > 0 ? dmCount / total : 0.25

  if (ratio >= 0.35) return { level: '극왕', short: '매우 강합니다', desc: '일간의 기운이 매우 강해서 자기주도적이고 추진력이 뛰어납니다. 다만 고집이 세고 타인과 타협하기 어려울 수 있어요.', index: 4 }
  if (ratio >= 0.28) return { level: '신강', short: '강합니다', desc: '일간의 기운이 강해서 자기주도적이고 추진력이 뛰어납니다. 다만 고집이 세고 타인과 타협하기 어려울 수 있어요.', index: 3 }
  if (ratio >= 0.20) return { level: '중화', short: '균형이 잡혀 있습니다', desc: '오행의 균형이 비교적 잘 잡혀 있어 유연하게 상황에 대처합니다. 다만 결단이 필요한 순간에 주저할 수 있어요.', index: 2 }
  if (ratio >= 0.14) return { level: '신약', short: '약합니다', desc: '일간의 기운이 약해서 외부의 기운에 영향을 많이 받습니다. 협력과 지원을 통해 역량을 키우는 것이 중요해요.', index: 1 }
  return { level: '극약', short: '매우 약합니다', desc: '일간의 기운이 매우 약해서 외부 환경에 크게 영향을 받습니다. 협력과 보호 그리고 자기 역량 키우기가 평생의 과제입니다.', index: 0 }
}

function findYongSin(result: SajuResult): { yong: ElementKey; hi: ElementKey } {
  const dm = result.dayMaster.key
  const dmCount = result.elementCounts[dm]
  const total = Object.values(result.elementCounts).reduce((a, b) => a + b, 0)
  const ratio = total > 0 ? dmCount / total : 0.25

  if (ratio >= 0.25) {
    const weak = result.weakest.key
    return { yong: weak, hi: weak }
  }
  const generateMap: Record<ElementKey, ElementKey> = { wood: 'water', fire: 'wood', earth: 'fire', metal: 'earth', water: 'metal' }
  const yong = generateMap[dm]
  return { yong, hi: yong }
}

function ageGroupLabel(startAge: number, endAge: number): string {
  if (endAge <= 9) return '유아·아동기'
  if (startAge <= 12) return '사춘기 전'
  if (startAge <= 18) return '청소년기'
  if (startAge <= 29) return '20대'
  if (startAge <= 39) return '30대'
  if (startAge <= 49) return '40대'
  if (startAge <= 59) return '50대'
  return '60대 이후'
}

function isMinorStage(startAge: number): boolean {
  return startAge < 19
}

function ganZhiKr(p: { stemHanja: string; stemKr: string; branchHanja: string; branchKr: string }): string {
  return `${p.stemKr}${p.branchKr}`
}

function animalOf(branchHanja: string): string {
  return BRANCH_ANIMAL[branchHanja] ?? ''
}

function elementMeaning(key: ElementKey, count: number, total: number): string {
  const ratio = total > 0 ? count / total : 0
  const strong = ratio >= 0.28
  const label = ELEMENTS[key].label
  const kr = ELEMENTS[key].kr
  const meaning: Record<ElementKey, { strong: string; weak: string }> = {
    wood: { strong: '추진력과 성장욕구, 시작하는 힘이 넘칩니다. 다만 성급하게 서두르거나 고집이 설 수 있어요', weak: '시작하는 힘이나 지속성, 유연성이 약할 수 있어요' },
    fire: { strong: '추진력과 열정, 표현력이 넘칩니다. 다만 감정 기복이 크거나 과소비할 수 있어요', weak: '열정과 표현력, 행동력이 부족해 소극적으로 보일 수 있어요' },
    earth: { strong: '신뢰와 인내, 안정감이 깊습니다. 다만 변화를 꺼리고 보수적으로 흐를 수 있어요', weak: '안정감과 신뢰, 인내심이 부족해 쉽게 흔들릴 수 있어요' },
    metal: { strong: '결단력과 의리, 원칙이 분명합니다. 다만 차갑고 융통성이 부족할 수 있어요', weak: '결단력과 원칙, 끈기가 약해 관계에서 흔들릴 수 있어요' },
    water: { strong: '지혜와 유동성, 통찰력이 깊습니다. 다만 산만하거나 정착이 어려울 수 있어요', weak: '유연성과 통찰, 소통력이 약해 고집스러워질 수 있어요' },
  }
  const m = strong ? meaning[key].strong : meaning[key].weak
  return strong
    ? `${label}(${kr})이 강하다는 것은 ${m}는 뜻입니다`
    : `${label}(${kr})이 부족하다는 것은 ${m}는 의미입니다`
}

function moneyField(key: ElementKey): string {
  const map: Record<ElementKey, string> = {
    water: '유통·정보·네트워크 기반 비즈니스',
    wood: '교육·콘텐츠·기획 분야',
    fire: '미디어·브랜딩·서비스업',
    earth: '부동산·자산 관리·신뢰 기반 거래',
    metal: '기술·금융·전문 서비스',
  }
  return map[key]
}

function careerField(key: ElementKey): string {
  const map: Record<ElementKey, string> = {
    water: '정보·유통·연결',
    wood: '교육·성장·기획',
    fire: '빛·표현·서비스',
    earth: '신뢰·관리·토대',
    metal: '기술·정밀·구조',
  }
  return map[key]
}

function idealPartner(key: ElementKey): string {
  const map: Record<ElementKey, string> = {
    water: '차분하고 지혜로우며 유연한 사람',
    wood: '성장하고 배우며 기획력 있는 사람',
    fire: '밝고 표현 많고 따뜻한 사람',
    earth: '안정적이고 신뢰 주는 사람',
    metal: '결단 있고 깔끔하고 전문적인 사람',
  }
  return map[key]
}

function spouseNature(key: ElementKey): string {
  const map: Record<ElementKey, string> = {
    wood: '성장형, 교육형, 기획력 있는 사람',
    fire: '밝고 표현 많고 활동적인 사람',
    earth: '안정적이고 신뢰 주는 사람',
    metal: '결단 있고 깔끔하고 원칙 있는 사람',
    water: '유연하고 지혜로우며 소통 잘 하는 사람',
  }
  return map[key]
}

function healthWarning(key: ElementKey): string {
  const map: Record<ElementKey, string> = {
    wood: '눈의 피로와 근육 경직, 짜증 증가',
    fire: '심계항진과 불면, 입술 건조',
    earth: '소화불량과 식욕 변화, 만성 피로',
    metal: '피부 건조와 기침, 호흡 곤란',
    water: '요통과 부종, 이명',
  }
  return map[key]
}

function weaknessManifest(key: ElementKey): string {
  const map: Record<ElementKey, string> = {
    wood: '성장 정체',
    fire: '열정 부족',
    earth: '신뢰 부족',
    metal: '결단 지연',
    water: '유연성 결여',
  }
  return map[key]
}

function emotionalHook(stem: string, elementKey: ElementKey): string {
  const hooks: Record<ElementKey, string[]> = {
    wood: ['당신은 세찬 바람 속에서도 뿌리를 깊게 내리는 단단한 나무 같은 존재입니다.', '당신은 어떤 흙에 심겨도 자라나는 생명력이 넘치는 새싹 같은 사람입니다.'],
    fire: ['당신은 어둠을 밝히는 한 줄기 태양처럼 주변을 따뜻하게 비추는 존재입니다.', '당신은 꺼지지 않는 촛불처럼 가장 깊은 곳에서도 은은하게 빛나는 사람입니다.'],
    earth: ['당신은 모든 것을 품어내는 비옥한 대지처럼 누구에게도 안정감을 주는 존재입니다.', '당신은 묵직한 산처럼 어떤 풍파에도 흔들리지 않는 중심이 있는 사람입니다.'],
    metal: ['당신은 어떤 시련에도 날카롭게 빛나는 보석처럼 정제될수록 빛나는 존재입니다.', '당신은 단호하게 불필요한 것을 베어내는 칼날처럼 결단과 기준이 분명한 사람입니다.'],
    water: ['당신은 넓고 깊은 바다처럼 모든 것을 받아들이면서도 본질을 잃지 않는 존재입니다.', '당신은 이슬처럼 세상에 조용히 스며들어 닿는 곳마다 생명을 싹틔우는 사람입니다.'],
  }
  const list = hooks[elementKey]
  const idx = stem.charCodeAt(0) % list.length
  return list[idx]
}

export function generateDeepReport(
  values: SajuFormValues,
  result: SajuResult,
  additional: AdditionalAnswers
): { emotionalHook: string; sections: ReportSection[] } {
  const sections: ReportSection[] = []
  const trait = getStemTrait(result.dayMasterStem)
  const strength = judgeStrength(result)
  const yongSin = findYongSin(result)
  const currentDaYun = result.daYun[result.currentDaYunIndex]
  const currentLiuNian = currentDaYun?.liuNian[result.currentLiuNianIndex]
  const dayPillar = result.pillars[2]
  const yearPillar = result.pillars[0]
  const dayAnimal = animalOf(dayPillar.branchHanja)
  const yearAnimal = animalOf(yearPillar.branchHanja)
  const total = Object.values(result.elementCounts).reduce((a, b) => a + b, 0)

  // 1단계: 만세력 판독 & 기본 원국
  sections.push({
    step: 1,
    layer: 1,
    title: '만세력 판독 & 기본 원국',
    subtitle: '당신의 탄생 좌표와 명식의 뼈대',
    toc: ['탄생 좌표', '사주 원국 구성', '음양오행 분포', '일간 정체성'],
    keywords: [trait.nature.split(' ')[0], result.dominant.label + ' 주기운', '일간 ' + result.dayMasterStemKr],
    score: Math.min(95, 60 + strength.index * 8),
    intro: `${values.name}님, 당신이 이 세상에 도착한 좌표는 다음과 같아요. ${values.calendar === 'solar' ? '양력' : '음력'} ${values.year}년 ${values.month}월 ${values.day}일${values.hour >= 0 ? ` ${values.hour}:00 전후` : ''}, ${values.region}에서 ${values.gender === 'male' ? '남성' : '여성'}으로 태어나셨어요. 출생 지역의 시차(${values.cityOffsetMin > 0 ? '+' : ''}${values.cityOffsetMin}분)를 보정하여 표준시가 가린 당신의 진짜 시간을 찾아냈어요. 이 작은 차이가 사주의 중심을 바꿉니다.`,
    highlight: `당신의 본질, 즉 "나 자신"을 상징하는 기운은 ${result.dayMasterStemKr}예요. ${trait.nature}을 마음속 바탕으로 삼고 살아갑니다. ${dayAnimal}의 기운을 품고 있어서, 그 동물이 가진 상징이 당신의 성향에 깊이 스며 있어요. ${BRANCH_TRAIT[dayPillar.branchHanja]}.`,
    episodes: [
      { label: '사주 원국', text: `연주 ${ganZhiKr(result.pillars[0])} · 월주 ${ganZhiKr(result.pillars[1])} · 일주 ${ganZhiKr(result.pillars[2])} · 시주 ${ganZhiKr(result.pillars[3])}로 명식의 뼈대를 이룹니다. 태원 ${result.taiYuan}, 태식 ${result.taiXi}, 명궁 ${result.mingGong}, 신궁 ${result.shenGong}이 추가 좌표입니다.` },
      { label: '띠 기운과 일주의 차이', text: `당신은 ${yearAnimal}띠 해에 태어났지만 사주의 중심인 일주에는 ${dayAnimal}의 기운을 품고 있습니다. 연지의 띠는 겉으로 드러나는 한 해의 기운이고, 일지의 동물은 당신의 본질적 성향을 더 깊이 반영합니다. 즉 겉으로는 ${yearAnimal}띠의 기운을 띠지만 내면의 중심은 ${dayAnimal}의 기운으로 움직이는 셈입니다. 이 둘이 같으면 안정감이 크고, 다르면 겉과 속이 달라 다층적인 성격이 됩니다.` },
      { label: '음양오행 분포', text: `목(${result.elementCounts.wood}) · 화(${result.elementCounts.fire}) · 토(${result.elementCounts.earth}) · 금(${result.elementCounts.metal}) · 수(${result.elementCounts.water}). 가장 강한 기운은 ${result.dominant.label}이고, 가장 부족한 기운은 ${result.weakest.label}입니다. ${elementMeaning(result.dominant.key, result.elementCounts[result.dominant.key], total)}. 또한 ${elementMeaning(result.weakest.key, result.elementCounts[result.weakest.key], total)}. 이 분포가 당신의 타고난 기질과 운의 경사를 결정합니다.` },
      { label: '일간 정체성', text: `${result.dayMasterStemKr}의 기운을 가진 분은 "${trait.strength}"을 강점으로 삼습니다. 반면 "${trait.weakness}"이 약점이 될 수 있으니 이를 자각하고 보완하는 것이 명리적 과제입니다.` },
    ],
    insights: [
      `타고난 일간 ${result.dayMasterStemKr}의 강점인 "${trait.strength.split('과')[0]}"은 주도적으로 이끄는 상황에서 가장 빛납니다. 이 강점을 의식적으로 발휘할수록 용신인 ${ELEMENTS[yongSin.yong].kr} 기운과 만나 운이 열립니다.`,
      `반대로 "${trait.weakness.split('과')[0]}"이라는 약점은 관계와 일에서 반복되는 실패 패턴의 근원입니다. 부족한 ${result.weakest.label} 기운을 의식적으로 채우는 작은 행동부터 시작하면 흐름이 바뀝니다.`,
      `겉으로 드러나는 ${yearAnimal}띠의 기운과 내면의 ${dayAnimal} 기운이 만들어내는 다층적 성격이 당신만의 매력입니다. 이 겉과 속의 차이를 이해하는 것이 대인관계의 열쇠입니다.`,
    ],
    innerVsOuter: {
      inner: `내면에는 "${trait.nature}"의 기운이 깊게 자리 잡고 있어 자연스럽게 이 기운으로 살아갑니다.`,
      outer: `외부에서는 "${trait.strength.split('과')[0]} 있는 사람"으로 인식되어 주변에서 그런 역할을 기대하는 경향이 있습니다.`,
      gap: `내면의 ${trait.nature} 기운과 겉으로 드러나는 ${trait.strength.split('과')[0]} 있는 모습 사이의 온도 차이가 스트레스로 이어질 수 있습니다. 이 갭을 줄이려면 '내면이 원하는 것'과 '외부가 기대하는 것'을 분리해 적어보고, 매주 한 번은 내면의 기운에 맞는 행동을 의도적으로 선택하세요.`,
    },
    microScenario: `새로운 모임에 들어갔을 때 당신은 ${trait.strength.split('과')[0]}의 기운으로 자연스럽게 대화를 이끄는 편입니다. 일간 ${result.dayMasterStemKr}의 기운은 이런 사소한 순간에도 묻어납니다.`,
    closing: '이것이 당신이 태어날 때 우주가 그린 좌표예요. 이제 이 좌표가 평생에 걸쳐 어떤 궤도를 그리는지, 조금씩 깊이 들어가 볼게요.',
  })

  // 2단계: 성격 & 내면 분석
  sections.push({
    step: 2,
    layer: 1,
    title: '성격 & 내면 분석',
    subtitle: '겉으로 드러나는 나 · 내면의 진짜 나 · 강점과 약점의 균형',
    toc: ['일간 본질', '겉과 속의 차이', '강점 발현', '약점 보완'],
    keywords: [trait.nature.split(' ')[0], strength.short, result.dominant.label + ' 주기운'],
    score: Math.min(92, 58 + strength.index * 8),
    intro: `${values.name}님의 성격은 타고난 기운의 조합으로 만들어져요. 겉으로 드러나는 모습과 내면의 진짜 모습이 꽤 다를 수 있어요. 이 차이를 아는 순간, "아, 내가 왜 이렇게 행동하지?" 하는 퍼즐이 맞춰지기 시작해요.`,
    highlight: `타고난 기운이 ${strength.level} 명식이에요. ${strength.desc} 자신을 상징하는 기운이 전체의 ${(dmRatio(result) * 100).toFixed(0)}%를 차지해요.`,
    episodes: [
      { label: '나의 본질', text: `${result.dayMasterStemKr} 기운의 본질은 "${trait.nature}"이에요. 이 기운이 당신의 기본 성격을 만들고, 모든 판단과 행동의 밑바탕이 돼요.` },
      { label: '겉과 속의 차이', text: `연주의 ${yearAnimal}띠 기운이 겉으로 드러나는 첫인상을 만들고, 일주의 ${dayAnimal} 기운이 내면의 진짜 성향을 만듭니다. ${yearAnimal === dayAnimal ? '겉과 속이 같아 일관성 있고 안정적인 인상을 줍니다.' : '겉과 속이 달라 처음엔 다른 사람처럼 보이다 깊어질수록 다른 매력이 드러납니다.'}` },
      { label: '강점 발현', text: `"${trait.strength}"이 당신의 핵심 강점이에요. 주도적으로 이끄는 상황, 리더십이 필요한 자리, 새로운 것을 시작해야 할 때 이 강점이 가장 빛나요. 당신에게 필요한 기운인 ${ELEMENTS[yongSin.yong].kr} 방향으로 이 강점을 쓰면 시너지가 나기 시작해요.` },
      { label: '약점 보완', text: `"${trait.weakness}"이 반복되는 약점이에요. 스트레스가 클수록 더 강하게 드러나요. 부족한 ${result.weakest.label} 기운을 일상에서 채우는 작은 습관(예: ${SOLUTION_ACTIONS[result.weakest.key].split(',')[0]})부터 시작하면, 이 약점이 서서히 균형을 되찾아요.` },
    ],
    insights: [
      `타고난 사주 원국상 ${strength.level} 명식으로 ${strength.desc.split('.')[0]}.`,
      `일간의 강점인 "${trait.strength.split('과')[0]}"은 주도적으로 이끄는 상황에서 극대화되며, 이 방향으로 일하면 용신 기운과 만나 운이 열립니다.`,
      `약점인 "${trait.weakness.split('과')[0]}"은 부족한 ${result.weakest.label} 기운을 의식적으로 채우는 일상 습관으로 보완할 수 있습니다.`,
    ],
    innerVsOuter: {
      inner: `내면에는 ${trait.nature}의 기운이 중심을 잡고 있어 혼자 있을 때 이 기운이 진짜 모습으로 드러납니다.`,
      outer: `외부에서는 ${trait.strength.split('과')[0]} 있는 사람으로 인식되어 주변에서 그런 역할을 기대합니다.`,
      gap: `혼자 있을 때의 ${trait.nature} 기운과 밖에서 보여주는 ${trait.strength.split('과')[0]} 있는 모습 사이의 괴리가 피로감을 만듭니다. 스트레스를 완화하려면 외부 역할을 '연기'로 인식하고, 하루 30분 이상 내면의 기운에 맞는 활동(산책, 명상, 독서 등)으로 에너지를 충전하세요.`,
    },
    microScenario: `갑자기 의견을 물어보는 자리에서 당신은 ${strength.index >= 3 ? '즉시 자기 주장을 내놓는 편입니다. 이것이 일간 기운이 강한 명식의 패턴입니다.' : strength.index <= 1 ? '잠시 생각한 뒤 조심스럽게 의견을 내는 편입니다. 신약 명식의 신중함이 발현되는 순간입니다.' : '상황을 읽고 유연하게 의견을 맞추는 편입니다. 중화 명식의 균형감이 나타납니다.'}`,
    closing: '성격은 고정된 게 아니라 기운의 흐름에 따라 변주해요. 자기 기운의 강약을 알면, 상황에 맞게 강점을 쓰고 약점을 보완할 수 있어요. 그게 진짜 자기 이해예요.',
  })

  // 3단계: 재물운 & 평생 금전 흐름 분석
  const wealthElementKey: ElementKey =
    result.dayMaster.key === 'wood' ? 'metal'
    : result.dayMaster.key === 'fire' ? 'water'
    : result.dayMaster.key === 'earth' ? 'wood'
    : result.dayMaster.key === 'metal' ? 'fire'
    : 'earth'
  sections.push({
    step: 3,
    layer: (additional.concernAreas?.includes('재물/자산') || additional.currentConcern === '재테크') ? 2 : 3,
    isPriorityArea: additional.concernAreas?.includes('재물/자산') || additional.currentConcern === '재테크',
    title: '재물운 & 평생 금전 흐름 분석',
    subtitle: '돈 버는 방식 · 손재 위험 · 축재 전략 · 부의 최대치',
    toc: ['재성 구조', '돈 버는 방식', '손재 위험 시기', '축재 전략', '부의 최대치'],
    keywords: [ELEMENTS[wealthElementKey].kr + ' 재성', strength.index <= 1 ? '안정 축재' : '공격 투자', '손재 주의'],
    score: Math.min(92, 55 + result.elementCounts[wealthElementKey] * 10 + strength.index * 5),
    intro: `명식에서 재물은 재성(일간을 극하는 오행, 즉 '내가 감당해야 할 재물의 기운')으로 봅니다. ${result.dayMasterStemKr} 일간에게 재성은 ${ELEMENTS[wealthElementKey].label} 기운에 해당합니다. 사주 내 이 기운의 강약이 재물운의 기본 틀을 정합니다.`,
    highlight: strength.index <= 1
      ? '신약한 명식(자신의 주관과 에너지가 약한 사주 구조)은 재성이 강해도 "감당하기 어려운 재물"이 될 수 있습니다. 돈이 들어와도 건강이나 관계로 빠져나가는 패턴이 있어요. 먼저 일간(자기 역량)을 킨 뒤 재물을 쫓아야 합니다.'
      : '신강한 명식(자신의 주관과 에너지가 강한 사주 구조)은 재성을 감당할 힘이 있습니다. 재성이 운에서 들어오면 큰 돈을 움켜쥐는 시기가 됩니다. 다만 재성이 과하면 재물 때문에 몸이 상하는 과재의 우려가 있어요.',
    episodes: [
      { label: '돈 버는 방식', text: `${trait.money}. 구체적으로는 ${moneyField(yongSin.yong)}에서 재물이 열리는 흐름이 강합니다.` },
      { label: '손재 위험', text: `타고난 신체 기운끼리 부딪혀 불균형이 생기는 시기(충)나 장기나 체질상 과부하가 걸리기 쉬운 기운의 압박 시기(형)가 들어오는 대운·연운에서 손재수(재물의 손실이나 예상치 못한 지출이 발생하는 운)가 있습니다. 갑작스러운 투자와 보증, 계약은 해당 연운 구간에 피해야 합니다.` },
      { label: '축재 전략', text: strength.index <= 1
        ? '현금 중심의 안전 자산(예금, 국채) 비중을 높이고 레버리지는 피하세요. 재물이 들어오면 즉시 안전 자산으로 전환하는 습관이 파산을 막습니다.'
        : '부동산과 지분 등 실물 자산에 비중을 두세요. 신강한 명식은 리스크를 감당할 수 있으나 한 번에 몰빵하지 말고 분산하세요.' },
      { label: '부의 최대치', text: `현재 대운 ${currentDaYun?.ganZhi ?? ''}(${currentDaYun?.startYear ?? ''}~${currentDaYun?.endYear ?? ''}년) 이후 ${result.daYun[Math.min(result.currentDaYunIndex + 1, result.daYun.length - 1)]?.ganZhi ?? '말운'} 대운(${result.daYun[Math.min(result.currentDaYunIndex + 1, result.daYun.length - 1)]?.startYear ?? ''}~${result.daYun[Math.min(result.currentDaYunIndex + 1, result.daYun.length - 1)]?.endYear ?? ''}년)에서 재성 기운이 강해지면 재물의 최대치에 근접할 수 있습니다. 이 시기를 놓치지 않으려면 지금 용신(사주에서 가장 필요한 기운)을 축적해 두어야 합니다.` },
    ],
    insights: [
      `신약 명식은 재물이 들어와도 건강이나 관계로 빠져나갈 수 있으므로 자기 역량을 먼저 키운 뒤 재물을 쫓는 것이 정석입니다.`,
      `손재 시기에는 투자·이동·계약을 멈추고 지키는 것이 복구의 시작입니다. 충·형이 들어오는 연운을 사전에 확인하면 큰 손실을 피할 수 있습니다.`,
      `용신인 ${ELEMENTS[yongSin.yong].kr} 기운 방향으로 일할 때 재물의 흐름이 가장 활성화됩니다.`,
    ],
    innerVsOuter: {
      inner: '돈을 "에너지의 흐름"으로 다루며 흐르게 하거나 막는 감각이 내면에 자리 잡고 있습니다.',
      outer: '외부에서는 "돈을 잘 번다" 혹은 "돈을 잘 쓴다"는 평가를 받는 경향이 있습니다.',
      gap: '내면에서는 돈을 에너지로 느끼지만 외부에서는 결과로 평가받는 괴리가 있습니다. 이 갭에서 오는 스트레스를 줄이려면 수입과 지출을 에너지 흐름 관점에서 기록하고, 매월 자신에게 의미 있는 곳에 한 번은 자유롭게 지출하는 시간을 확보하세요.',
    },
    microScenario: `월급이 들어오자마자 카드 결제, 친구 생일, 부모님 용돈이 빠져나가는 날 — 이때 "이번 달도 또 0"이라고 한숨 쉬느냐, "다음 달엔 10% 모아야지"라고 다짐하느냐가 10년 뒤 자산을 결정합니다.`,
    closing: '돈은 기운의 흐름을 타는 사람에게 옵니다. 용신 방향으로 일하고 손재 시기에는 지키는 것 — 이것이 재물운의 공식입니다.',
  })

  // 4단계: 직장·커리어·사업운 적성 풀이
  const isCareerPriority = additional.concernAreas?.includes('이직/커리어') || additional.currentConcern === '이직/커리어'
  sections.push({
    step: 4,
    layer: isCareerPriority ? 2 : 3,
    isPriorityArea: isCareerPriority,
    title: '직장·커리어·사업운 적성 풀이',
    subtitle: '조직·사업·프리랜서 적성 / 승진·독립 시기 / 평생 업',
    toc: ['관성과 식상 구조', '조직 vs 사업 적성', '승진·독립 시기', '평생 업'],
    keywords: [strength.index >= 3 ? '조직·독립 겸용' : '조직 우선', result.interactions.some(it => it.type.includes('합')) ? '네트워크형' : '전문직형', '평생 업 탐색'],
    score: Math.min(90, 58 + strength.index * 7),
    intro: `명식에서 직업은 관성(일간을 극하는 기운, 즉 직장·책임·규율의 에너지)과 식상(일간이 설하는 기운, 즉 표현·창작·기술의 에너지)의 조화로 봅니다. 관성이 강하면 조직과 체계에 적합하고, 식상이 강하면 표현과 창작, 자율성에 적합합니다.`,
    highlight: strength.index >= 3
      ? '관성과 식상을 모두 감당할 수 있어 조직과 독립을 넘나들 수 있습니다. 다만 한 우물만 파면 깊이가, 여러 우물을 파면 넓이가 생깁니다. 선택이 관건입니다.'
      : '관성이나 식상이 강해지면 압박감이 큽니다. 조직 내에서 안정감을 먼저 확보한 뒤 서서히 자율성을 넓혀가는 전략이 유리합니다.',
    episodes: [
      { label: '조직 적성', text: (result.pillars[0].shiShenGan.includes('정관') || result.pillars[0].shiShenGan.includes('편관'))
        ? '연주에 관성이 있어 조직 생활에 적응력이 있습니다. 공직, 대기업, 공공기관에서 안정적인 커리어를 쌓기 좋습니다.'
        : '연주에 관성이 약해 조직의 틀에 갇히면 답답해합니다. 자율성이 보장되는 환경이나 독립적 업무가 체질에 맞습니다.' },
      { label: '사업·프리랜서 적성', text: result.interactions.some(it => it.type.includes('합'))
        ? '지지합이 있어 사람을 모으고 네트워크를 만드는 데 능합니다. 사업, 에이전시, 플랫폼형 일에서 강점이 발현됩니다.'
        : '합이 약해 혼자 일하는 데 강합니다. 전문직, 연구, 기술직 등 1인 기업형 일이 체질에 맞습니다.' },
      { label: '승진·독립 시기', text: `현재 대운 ${currentDaYun?.ganZhi ?? ''}에서 ${currentDaYun?.ganElement.key === result.dayMaster.key ? '비견·겁재 운으로 경쟁과 독립의 기운입니다. 협력보다 자기 주도가 유리합니다.' : '용신 기운이 흐르는 시기로 승진이나 인정을 받기 좋은 흐름입니다.'} 독립을 고민 중이라면 ${currentLiuNian?.year ?? '올해'}년 전후가 변곡점입니다.` },
      { label: '평생 업', text: `${trait.strength.split('과')[0]}을 핵심으로 하는 일이 평생 업의 방향입니다. ${careerField(yongSin.yong)} 분야에서 깊이를 쌓으면 60대 이후에도 쓸 수 있는 자산이 됩니다.` },
    ],
    insights: [
      `타고난 사주 원국상 조직의 규율보다는 ${result.pillars[0].shiShenGan.includes('정관') || result.pillars[0].shiShenGan.includes('편관') ? '조직 내에서 안정감을 먼저 확보하는' : '자율성과 독자적인 권한이 보장될 때 성과가 극대화되는'} 성향입니다.`,
      `${result.interactions.some(it => it.type.includes('합')) ? '지지합이 있어 사람을 모으고 네트워크를 만드는 사업형 적성입니다.' : '합이 약해 혼자 일하는 전문직형 적성입니다.'} 이 적성에 맞는 일을 선택하면 에너지가 됩니다.`,
      `평생 업은 "${trait.strength.split('과')[0]}"을 핵심으로 ${careerField(yongSin.yong)} 분야에서 깊이를 쌓는 방향입니다.`,
    ],
    innerVsOuter: {
      inner: '일에서 자율성과 안정 사이의 균형을 내면에서 끊임없이 조율하고 있습니다.',
      outer: '외부에서는 "조직 사람" 또는 "프리랜서 기질" 중 하나로 분류하는 경향이 있습니다.',
      gap: '내면의 자율성 욕구와 외부의 안정 기대 사이에서 느끼는 피로감이 커리어 스트레스의 핵심입니다. 갭을 줄이려면 현재 직무에서 자율성을 10% 더 확보하는 구체적 목표를 세우고, 안정과 자율을 동시에 충족하는 사이드 프로젝트를 시작하세요.',
    },
    microScenario: `상사가 "이번 프로젝트, 네가 리드해"라고 했을 때 — ${strength.index >= 3 ? '자신감이 차오르지만 팀원들의 속도를 읽지 못하면 혼자 앞서갑니다. 리더는 "기다릴 줄 아는 사람"입니다.' : strength.index <= 1 ? '부담이 크지만 이것은 성장의 기회입니다. "해볼게요"라고 대답하는 연습이 커리어를 만듭니다.' : '상황을 읽고 유연하게 움직입니다. 다만 때로는 "내가 하겠다"는 한 줄의 선언이 필요합니다.'}`,
    closing: '직업은 "무엇을 하느냐"보다 "어떤 기운으로 하느냐"가 중요합니다. 용신 방향의 일은 에너지가 되고, 그렇지 않은 일은 에너지를 빼앗습니다.',
  })

  // 5단계: 연애·결혼운 & 인연 진입 시기
  const isLovePriority = additional.concernAreas?.includes('연애/운명의 짝') || additional.currentConcern === '연애/결혼'
  sections.push({
    step: 5,
    layer: isLovePriority ? 2 : 3,
    isPriorityArea: isLovePriority,
    title: '연애·결혼운 & 인연 진입 시기',
    subtitle: '끌리는 유형 · 실패 패턴 · 상처받는 포인트 · 진짜 잘 맞는 타입 · 결혼 적령기',
    toc: ['도화와 인성', '끌리는 유형', '실패 패턴', '상처받는 포인트', '진짜 잘 맞는 타입', '인연 진입 시기', '결혼 적령기 & 결실의 시기'],
    keywords: [result.interactions.some(it => it.type === '지지육합' || it.type === '지지삼합') ? '깊은 정' : '유연한 관계', ELEMENTS[yongSin.yong].kr + ' 용신 인연', additional.loveStatus || '인연 시기'],
    score: Math.min(88, 55 + (result.interactions.some(it => it.type.includes('합')) ? 15 : 5) + strength.index * 4),
    intro: `연애는 명식의 일주와 도화(인연을 끌어당기는 신살) 그리고 인성(보호와 수용의 기운)의 조화로 읽습니다.${additional.loveStatus ? ` 현재 ${additional.loveStatus} 상태이신 점을 반영하여 풀이합니다.` : ''}`,
    highlight: `${trait.love}. ${result.interactions.some(it => it.type === '지지육합' || it.type === '지지삼합') ? '지지합이 있어 한 사람에게 깊이 정을 주는 타입입니다. 연애가 시작되면 오래 지속되는 경향이 있어요.' : '합이 약해 연애가 길어지면 권태나 거리감이 생길 수 있어요. 의식적으로 관계를 가꾸는 노력이 필요합니다.'}`,
    episodes: [
      { label: '끌리는 유형', text: strength.index <= 1
        ? '의지할 수 있는 든든하고 보호적인 상대에게 강하게 끌립니다. "나를 책임져 줄 사람"이라는 무의식이 작동합니다.'
        : '자기처럼 강하고 자신감 있는 사람에게 끌립니다. "나와 동등하거나 더 큰 사람"이 매력적으로 느껴집니다.' },
      { label: '실패 패턴', text: result.interactions.find(it => it.type === '지지충')
        ? '타고난 기운끼리 부딪혀 관계가 깊어질수록 마찰이 커지는 패턴이 있습니다. 초기엔 끌리지만 가까워질수록 충돌이 생깁니다. 이것이 반복되는 실패 패턴입니다.'
        : '특이한 충이 없어 관계 자체는 안정적이나 권태나 외부 유혹에 약할 수 있습니다.' },
      { label: '상처받는 포인트', text: `${trait.weakness.split('과')[0]}이 연애에서 상처로 발현합니다. 예를 들어 고집이 세면 상대가 "대화가 안 된다"고 떠나고, 의존적이면 상대가 지쳐 떠납니다. 자기 약점을 연애에서 반복 점검하게 됩니다.` },
      { label: '진짜 잘 맞는 타입', text: `용신인 ${ELEMENTS[yongSin.yong].kr} 기운을 많이 가진 사람이 진짜 잘 맞는 타입입니다. ${idealPartner(yongSin.yong)}이 당신의 기운을 보완해 줍니다.` },
      { label: '인연 진입 시기', text: (() => {
        const yongIdx = result.daYun.findIndex(dy => dy.zhiElement.key === yongSin.yong || dy.ganElement.key === yongSin.yong)
        if (yongIdx >= 0) {
          const yongDaYun = result.daYun[yongIdx]
          const isPast = yongIdx < result.currentDaYunIndex
          if (isPast) {
            const nextYongIdx = result.daYun.findIndex((dy, i) => i > result.currentDaYunIndex && (dy.zhiElement.key === yongSin.yong || dy.ganElement.key === yongSin.yong))
            if (nextYongIdx >= 0) {
              const next = result.daYun[nextYongIdx]
              return `과거 ${yongDaYun.startAge}~${yongDaYun.endAge}세(${yongDaYun.startYear}~${yongDaYun.endYear}년)에도 강한 인연의 기운이 지나갔지만, 앞으로 ${next.startAge}~${next.endAge}세(${next.startYear}~${next.endYear}년) 대운에서 다시 한 번 강력한 인연의 창이 열립니다. 이 시기에 인연이 들어오거나 혼인이 성사될 확률이 높습니다.`
            }
            return `과거 ${yongDaYun.startAge}~${yongDaYun.endAge}세(${yongDaYun.startYear}~${yongDaYun.endYear}년)에 강한 인연의 기운이 있었습니다. 현재 대운 이후로도 인연의 기운이 순환하니, 현재 대운(${currentDaYun?.startYear ?? ''}~${currentDaYun?.endYear ?? ''}년)에서 ${currentLiuNian?.year ?? '올해'}년 전후의 연운을 주목하세요.`
          }
          return `${yongDaYun.startAge}~${yongDaYun.endAge}세(${yongDaYun.startYear}~${yongDaYun.endYear}년) 구간${yongIdx === result.currentDaYunIndex ? ' [현재 대운]' : ''}에 결혼운이 강해집니다. 이 시기에 인연이 들어오거나 혼인이 성사될 확률이 높습니다.`
        }
        return '현재 대운 이후 첫 번째 용신(사주에서 가장 필요한 기운) 대운에서 인연이 들어올 확률이 높습니다.'
      })() },
      { label: '운명적 결혼 적령기 & 결실의 시기', text: (() => {
        const marriageYears: string[] = []
        for (const dy of result.daYun) {
          for (const ln of dy.liuNian) {
            const lnGan = ln.ganZhi[0]
            const lnZhi = ln.ganZhi[1]
            const hasHe = result.pillars.some(p => {
              const branchHeMap: Record<string, string[]> = { '子': ['丑'], '丑': ['子'], '寅': ['亥'], '卯': ['戌'], '辰': ['酉'], '巳': ['申'], '午': ['未'], '未': ['午'], '申': ['巳'], '酉': ['辰'], '戌': ['卯'], '亥': ['寅'] }
              return branchHeMap[p.branchHanja]?.includes(lnZhi)
            })
            const hasSanHe = result.pillars.some(p => {
              const sanHeMap: Record<string, string[]> = { '寅': ['午', '戌'], '午': ['寅', '戌'], '戌': ['寅', '午'], '申': ['子', '辰'], '子': ['申', '辰'], '辰': ['申', '子'], '巳': ['酉', '丑'], '酉': ['巳', '丑'], '丑': ['巳', '酉'], '亥': ['卯', '未'], '卯': ['亥', '未'], '未': ['亥', '卯'] }
              return sanHeMap[p.branchHanja]?.includes(lnZhi)
            })
            const isAdult = ln.age >= 22 && ln.age <= 55
            if (isAdult && (hasHe || hasSanHe)) {
              marriageYears.push(`${ln.year}년(${ln.age}세, ${ln.ganZhi})`)
            }
          }
        }
        if (marriageYears.length === 0) {
          return `청년기~중년기 사이 세운(해마다 들어오는 운)에서 결혼 합(合)이 강하게 작용하는 연도를 풀이합니다. 현재 대운(${currentDaYun?.startYear ?? ''}~${currentDaYun?.endYear ?? ''}년) 내에서 용신 기운이 들어오는 연운을 주목하세요. 대운뿐만 아니라 매년 들어오는 세운에서도 인연의 기운은 순환하므로, 청·중년기에 인연이 없는 것이 아닙니다.`
        }
        const topYears = marriageYears.slice(0, 5)
        return `10년 단위 대운뿐 아니라 매년 들어오는 세운에서도 결혼 합(合)이 강하게 작용하는 연도가 있습니다. ${values.name}님의 사주 원국과 결합하는 세운을 교차 판독한 결과, 다음 연도에서 결혼 합이 강하게 작용합니다: ${topYears.join(', ')}${marriageYears.length > 5 ? ' 등' : ''}. 이 연도들에서 인연의 결실(혼인, 약혼, 깊은 관계로의 발전)이 성사될 확률이 높습니다. 청년기부터 중년기까지 인연의 기운이 끊기지 않고 순환하므로, 특정 대운에만 의존하지 않고 세운의 흐름을 함께 읽는 것이 중요합니다.`
      })() },
    ],
    insights: [
      `용신인 ${ELEMENTS[yongSin.yong].kr} 기운을 가진 사람이 진짜 잘 맞는 타입이며, ${idealPartner(yongSin.yong)}이 당신의 기운을 보완해 줍니다.`,
      `실패 패턴은 "${trait.weakness.split('과')[0]}"에서 비롯되며, 이 약점을 자각하고 관계에서 의식적으로 보완하면 반복을 끊을 수 있습니다.`,
      `결혼 적령기는 대운뿐 아니라 매년 들어오는 세운에서도 결혼 합이 강하게 작용하는 연도로 판독하며, 청년기부터 중년기까지 인연의 기운이 순환합니다.`,
    ],
    innerVsOuter: {
      inner: '연애에서 받고 싶은 것과 주고 싶은 것 사이의 간극이 내면의 관계 패턴을 만듭니다.',
      outer: '외부에서는 관계에서 "주는 사람" 또는 "받는 사람" 중 하나로 인식되는 경향이 있습니다.',
      gap: '내면의 욕구와 외부에서의 역할이 달라 관계에서 충족감이 떨어질 수 있습니다. 스트레스를 줄이려면 파트너에게 내면에서 진짜 원하는 것을 한 가지씩 구체적으로 표현하는 연습을 하고, 매주 1시간은 관계 대화 시간을 확보하세요.',
    },
    microScenario: additional.loveStatus === '썸·애매한 관계'
      ? '매일 연락은 오는데 관계가 정리되지 않은 썸 — 이때 명식의 도화와 합이 들어오는 시기를 알면 "이 사람과 결판낼 시기"를 알 수 있습니다.'
      : additional.loveStatus === '재회 고민'
      ? '헤어진 사람과 다시 만날까 고민 중 — 사주에 합이 다시 들어오는 시기가 있으면 재회의 기운이 열립니다. 그러나 충이 오는 시기에 재회를 시도하면 같은 패턴이 반복됩니다.'
      : additional.loveStatus === '이혼·사별'
      ? '관계의 상실 후 — 사주에서 다시 인성이나 합이 들어오는 시기가 "다시 마음을 여는" 시기입니다. 그 전까지는 스스로의 기운을 회복하는 것이 우선입니다.'
      : additional.loveStatus === '복잡한 애증 관계'
      ? '끊어지지도 깊어지지도 않는 관계 — 사주에 충이 일주에 있으면 이 애매함이 반복됩니다. 이때는 "관계를 정리하는 시기"를 기다리는 것이 억지로 결론을 내리는 것보다 낫습니다.'
      : '첫 데이트에서 상대가 말할 때 — 듣고 있는지 "내가 뭘 말할지" 생각하고 있는지가 연애의 성패를 결정하는 첫 10분입니다.',
    closing: '연애는 "누구를 만나느냐"보다 "내가 어떤 기운으로 만나느냐"가 결과를 정합니다. 용신 기운을 스스로 키우면 그 기운을 가진 사람이 자연히 다가옵니다.',
  })

  // 6단계: 인간관계 & 가족운
  const isRelationPriority = additional.concernAreas?.includes('인간관계') || additional.currentConcern === '가족관계'
  sections.push({
    step: 6,
    layer: isRelationPriority ? 2 : 3,
    isPriorityArea: isRelationPriority,
    title: '부모 및 가족과의 인연 (가족 관계 분석)',
    subtitle: '가족과의 거리 · 귀인 패턴 · 관계의 결',
    toc: ['연주와 부모궁', '월주와 형제궁', '가족과의 거리', '귀인 패턴', '손해 패턴'],
    keywords: [result.pillars[0].shiShenGan.includes('겁재') ? '가족과의 거리 주의' : '가족 관계 안정', result.interactions.some(it => it.type.includes('합')) ? '귀인형' : '자력형', '관계의 결'],
    score: Math.min(85, 58 + (result.interactions.some(it => it.type.includes('합')) ? 12 : 0) + strength.index * 4),
    intro: `가족과의 관계는 연주(부모궁)와 월주(형제궁)의 기운으로 읽습니다. ${values.name}님의 명식에서 연주의 기운이 일주와 어떤 관계를 맺고 있는지가 부모와의 관계를, 월주의 기운이 형제·친구와의 관계를 결정합니다.`,
    highlight: result.pillars[0].shiShenGan.includes('겁재')
      ? '연주에 겁재가 있어 가족의 경제적 부담을 떠안을 가능성이 있습니다. 가족의 돈 문제에 관여하는 선을 명확히 하는 것이 관계를 지키는 열쇠입니다.'
      : '연주의 기운이 일주와 조화를 이루어 가족 관계가 비교적 안정적입니다. 다만 성장 과정에서의 거리감은 연주와 일주의 오행 관계에 따라 달라집니다.',
    episodes: [
      { label: '부모궁(연주)', text: `연주 ${ganZhiKr(result.pillars[0])}의 기운이 부모와의 관계를 만듭니다. ${result.pillars[0].shiShenGan.includes('겁재') ? '겁재가 있어 가족의 경제적 부담을 떠안을 수 있으니 관여하는 선을 명확히 해야 합니다.' : result.pillars[0].shiShenGan.includes('정인') || result.pillars[0].shiShenGan.includes('편인') ? '인성이 있어 부모의 지원과 보호를 받는 편입니다.' : '연주의 기운이 일주를 생하면 부모의 지원이, 극하면 부모와의 갈등이 있을 수 있습니다.'}` },
      { label: '형제궁(월주)', text: `월주 ${ganZhiKr(result.pillars[1])}의 기운이 형제·친구 관계를 만듭니다. ${result.pillars[1].shiShenGan.includes('비견') ? '비견이 있어 형제나 친구와 경쟁하거나 협력하는 관계가 됩니다.' : result.pillars[1].shiShenGan.includes('겁재') ? '겁재가 있어 친구나 형제를 통해 손재를 볼 수 있으니 금전 관계는 피하는 것이 좋습니다.' : '월주의 기운이 안정적이어서 형제·친구 관계가 비교적 원만합니다.'}` },
      { label: '가족 짐', text: result.pillars[0].shiShenGan.includes('겁재')
        ? '연주에 겁재가 있어 가족의 경제적 부담을 떠안을 가능성이 있습니다. 가족의 돈 문제에 관여하는 선을 명확히 하세요.'
        : '가족 짐의 무게는 연주와 일주의 거리에 따라 달라집니다. 연주의 기운이 일주를 극하면 부모와의 갈등이, 일주를 생하면 부모의 지원이 — 이 거리를 아는 것이 관계의 열쇠입니다.' },
      { label: '귀인 패턴', text: result.interactions.some(it => it.type === '지지육합' || it.type === '지지삼합')
        ? '지지합이 있어 사람을 끌어당기는 기운이 있습니다. 귀인은 합이 들어오는 대운·연운에서 자연스럽게 나타납니다. 합이 된 오행이 귀인의 직종을 암시합니다.'
        : '합이 약해 귀인은 스스로 만나러 가야 합니다. 용신 방향의 모임, 커뮤니티, 멘토 관계를 의식적으로 만드세요.' },
      { label: '손해 패턴', text: result.interactions.find(it => it.type === '지지충')
        ? '타고난 기운끼리 부딪혀 관계에서 반복적으로 마찰이 생기는 패턴이 있습니다. 충이 들어오는 연운에는 갈등이 격화되므로, 해당 시기에는 관계에 거리를 두는 것이 보호법입니다.'
        : '특이한 충이 없어 관계 자체는 안정적이나, 겁재가 들어오는 연운에서는 금전 관계로 손해를 볼 수 있으니 주의하세요.' },
    ],
    insights: [
      `연주의 기운이 ${result.pillars[0].shiShenGan.includes('겁재') ? '겁재를 품고 있어 가족의 경제적 부담을 떠안을 수 있으므로 관여하는 선을 명확히 하는 것이 관계 보호의 핵심입니다.' : '일주와 조화를 이루어 가족 관계가 안정적입니다.'}`,
      `귀인은 ${result.interactions.some(it => it.type.includes('합')) ? '합이 들어오는 시기에 자연스럽게 나타나며, 합이 된 오행의 방향에서 인연이 열립니다.' : '스스로 만나러 가야 하며, 용신 방향의 모임과 커뮤니티를 의식적으로 만드는 것이 필요합니다.'}`,
      `손해 패턴은 ${result.interactions.find(it => it.type === '지지충') ? '기운끼리 부딪히는 충에서 비롯되며, 충이 들어오는 연운에 관계에 거리를 두는 것이 보호법입니다.' : '겁재가 들어오는 연운에서 금전 관계로 발생할 수 있으니 주의가 필요합니다.'}`,
    ],
    innerVsOuter: {
      inner: '가족과의 관계에서 책임감과 놓아버리고 싶은 마음 사이에서 내면의 갈등이 있어요. 따뜻하게 품되, 나 자신을 잃지 않는 선을 찾는 것이 중요합니다.',
      outer: '외부에서는 가족에게 헌신하는 사람으로 보이지만, 내면에서는 경계 설정의 필요성을 느끼고 있습니다.',
      gap: '겉으로는 헌신하지만 속으로는 경계가 필요한 상태가 지속되면 번아웃이 옵니다. 갭을 줄이려면 가족에게 "할 수 있는 것"과 "할 수 없는 것"을 명확히 구분해 전달하고, 매월 하루는 온전히 자신만의 시간을 확보하세요.',
    },
    microScenario: `가족이 "돈 좀 빌려줘"라고 할 때 — ${result.pillars[0].shiShenGan.includes('겁재') ? '당신은 거절하지 못하고 또 빌려주게 됩니다. 이 패턴이 반복되면 당신의 운이 약해집니다. "이번 한 번만"이란 말은 없습니다.' : '당신은 신중하게 검토한 뒤 결정합니다. 이것이 건강한 경계입니다.'}`,
    closing: '인간관계는 기운의 조화로 열리고 닫힙니다. 용신 기운을 가진 사람을 가까이 하고, 충이 오는 시기에는 거리를 두는 것이 관계를 지키는 지혜입니다.',
  })

  // 7단계: 건강 & 체질운
  const isHealthPriority = additional.concernAreas?.includes('건강') || additional.currentConcern === '휴식/방향성'
  sections.push({
    step: 7,
    layer: isHealthPriority ? 2 : 3,
    isPriorityArea: isHealthPriority,
    title: '건강 & 체질운',
    subtitle: '취약 신체 부위 · 사고/수술수 시기 · 전조 패턴 · 예방 가이드',
    toc: ['취약 오행과 신체 부위', '사고·수술수 시기', '전조 패턴', '예방 가이드'],
    keywords: [result.weakest.label + ' 취약 부위', HEALTH_PARTS[result.weakest.key].split('과')[0], '정기 검진'],
    score: Math.max(45, 80 - (result.elementCounts[result.weakest.key] === 0 ? 25 : 10)),
    intro: `명리학에서 오행은 신체 부위와 대응합니다. ${values.name}님의 명식에서 가장 부족한 ${result.weakest.label} 기운에 해당하는 부위가 가장 취약합니다. 이 부위의 건강 관리를 평생의 과제로 삼아야 합니다.`,
    highlight: `취약 부위: ${HEALTH_PARTS[result.weakest.key]}. 이 부위의 건강 관리를 평생의 과제로 삼아야 합니다.`,
    episodes: [
      { label: '취약 신체 부위', text: `${result.weakest.label} 기운이 약해 ${HEALTH_PARTS[result.weakest.key]} 관련 질환에 유의해야 합니다. 정기 검진을 놓치지 마시고 해당 부위의 불편감을 가볍게 넘기지 마세요.\n\n구체적 액션: ${HEALTH_ACTIONS[result.weakest.key]}` },
      { label: '사고·수술수 시기', text: `타고난 신체 기운끼리 부딪혀 불균형이 생기는 시기(충)나 장기나 체질상 과부하가 걸리기 쉬운 기운의 압박 시기(형)가 들어오는 대운·연운에서 사고나 수술수가 있습니다. ${result.interactions.find(it => it.type === '지지형') ? '이 명식에는 기운 간 압박이 있어 평소에도 안전에 각별한 주의가 필요합니다.' : '기운 간 압박은 없으나 연운에서 해당 기운이 들어올 때 주의하세요.'} 운전, 등산, 공사 현장 접근을 해당 연운 구간에 피하세요.` },
      { label: '전조 패턴', text: `건강 악화의 전조는 ${healthWarning(result.weakest.key)}로 나타납니다. 이 징후가 반복되면 즉시 휴식과 검진을 권합니다.\n\n예방 가이드: ${HEALTH_ACTIONS[result.weakest.key]}` },
    ],
    insights: [
      `취약 부위인 ${HEALTH_PARTS[result.weakest.key].split('과')[0]}는 부족한 ${result.weakest.label} 기운과 대응하므로 평생 관리가 필요합니다.`,
      `사고·수술수는 기운끼리 부딪히는 시기(충)나 과부하가 걸리는 시기(형)에 집중되므로, 해당 연운에서는 안전 관리를 강화해야 합니다.`,
      `건강 악화의 전조인 ${healthWarning(result.weakest.key)}가 반복되면 즉시 휴식과 검진을 받아야 합니다.`,
    ],
    innerVsOuter: {
      inner: '몸의 신호를 믿고 쉬는 감각이 내면에 자리 잡고 있으나, 바쁠면 무시하는 경향도 있습니다.',
      outer: '외부에서는 "건강한 사람"으로 보이지만, 내면에서는 "버티는 중"임을 스스로 알고 있습니다.',
      gap: '겉으로는 건강해 보이지만 속으로는 버티는 상태가 지속되면 에너지 고갈이 옵니다. 스트레스를 줄이려면 매일 10분간 몸의 신호를 점검하는 시간을 갖고, "버티는 중"임을 인정하는 순간 즉시 하루 일정에서 한 가지를 줄이세요.',
    },
    microScenario: `새벽 2시까지 일하고 아침 7시에 일어나 커피 두 잔으로 버티는 하루 — 이것이 일주일 계속되면 취약 부위(${HEALTH_PARTS[result.weakest.key].split('과')[0]})에서 먼저 신호가 옵니다. 그 신호를 무시하면 6개월 뒤 "갑자기 쓰러졌다"는 말이 됩니다.`,
    closing: '건강은 운의 그릇입니다. 그릇이 깨지면 아무리 좋은 운도 담기지 않습니다. 취약 부위 관리는 곧 운을 지키는 일입니다.',
  })

  // 8단계: 대운 & 종합 맞춤 개운 솔루션
  const daYunDetails = result.daYun.slice(result.currentDaYunIndex, result.currentDaYunIndex + 3).map((dy) => ({
    ganZhi: dy.ganZhi,
    startAge: dy.startAge,
    endAge: dy.endAge,
    startYear: dy.startYear,
    endYear: dy.endYear,
    keyword: `${ELEMENTS[dy.ganElement.key].kr}·${ELEMENTS[dy.zhiElement.key].kr} 기운`,
    isCurrent: dy.index === result.currentDaYunIndex,
    isMinor: isMinorStage(dy.startAge),
  }))
  const importantYears = currentDaYun?.liuNian.slice(0, 5).map((ln, i) => ({
    year: ln.year,
    ganZhi: ln.ganZhi,
    age: ln.age,
    isCurrent: i === result.currentLiuNianIndex,
  })) ?? []
  sections.push({
    step: 8,
    layer: 1,
    title: '대운 & 종합 맞춤 개운 솔루션',
    subtitle: '대운별 키워드 · 변곡점 · 인생이 열리는 해 · 실천형 액션 플랜',
    toc: [
      ...daYunDetails.map(d => `${d.ganZhi} (${d.startAge}~${d.endAge}세)`),
      ...importantYears.map(y => `${y.year}년 (${y.ganZhi})`),
      '실천형 액션 플랜',
    ],
    keywords: ['현재 대운 ' + (currentDaYun?.ganZhi ?? ''), '10년 운로', '개운 솔루션'],
    score: Math.min(90, 60 + (currentDaYun ? 5 : 0) + strength.index * 5),
    intro: `현재 진행 중인 대운부터 앞으로 다가올 대운 위주로 집중 분석합니다. 대운은 10년 단위의 큰 운로로, 이 기운이 삶의 무대를 바꿉니다. 이미 지난 과거 대운은 참고로만 활용하세요.`,
    highlight: `현재 대운 ${currentDaYun?.ganZhi ?? ''}(${currentDaYun?.startAge ?? ''}~${currentDaYun?.endAge ?? ''}세)의 핵심은 "${ELEMENTS[currentDaYun?.ganElement.key ?? 'earth'].kr}·${ELEMENTS[currentDaYun?.zhiElement.key ?? 'earth'].kr} 기운의 전개"입니다.`,
    episodes: [
      ...daYunDetails.map((d) => ({
        label: `${d.ganZhi} 대운 — ${d.startAge}~${d.endAge}세 (${d.startYear}~${d.endYear}년)${d.isCurrent ? ' [현재]' : ''}`,
        text: `${d.keyword}이 흐르는 시기입니다. ${d.isCurrent ? '지금 이 흐름 속에 계십니다. ' : ''}${d.isMinor ? '이 시기는 미성년자 대운으로 학업·정서·건강이 핵심이며 성인의 운세(결혼·직업·재물)는 해당하지 않습니다.' : `돈: ${d.ganZhi[0] === result.dayMasterStem ? '비견 운으로 경쟁과 자기 주도 — 공동 투자나 공동 사업은 지분 갈등의 위험이 있습니다.' : '용신과의 관계에 따라 재물 문이 열리거나 닫힙니다.'} 직업: ${d.isCurrent ? '현재 직업의 방향을 점검할 시기 — 용신 방향이면 유지, 그렇지 않으면 전환을 고민합니다.' : '이 대운에서 직업의 방향이 정해지거나 바뀝니다.'} 연애·결혼: ${d.isMinor ? '미성년자 시기로 연애·결혼 운은 본격적으로 해당하지 않습니다.' : d.isCurrent ? '인연의 변곡점 — 솔로라면 인연이 들어오는 시기, 기혼이면 관계의 재정비 시기입니다.' : '이 대운에서 인연의 출입이 있습니다.'} 건강: ${d.ganZhi[1] === dayPillar.branchHanja ? '일지와 같은 지지가 오면 해당 오행 부위 강화가 필요합니다.' : '대운 기운에 맞춰 취약 부위를 관리하세요.'} 변곡점: ${d.startYear}년 진입 시점과 ${d.endYear}년 이탈 시점이 이 대운의 양 끝 변곡점입니다.`}`,
      })),
      ...importantYears.map((y, i) => {
        const lnGanElement = STEM_ELEMENT_MAP[y.ganZhi[0]] ?? 'earth'
        const lnZhiElement = BRANCH_ELEMENT_MAP[y.ganZhi[1]] ?? 'earth'
        const ganKr = STEM_KR[y.ganZhi[0]] ?? y.ganZhi[0]
        const zhiAnimal = BRANCH_ANIMAL[y.ganZhi[1]] ?? ''
        const isGanYong = lnGanElement === yongSin.yong
        const isZhiYong = lnZhiElement === yongSin.yong
        const isGanSame = y.ganZhi[0] === result.dayMasterStem
        const isZhiSame = y.ganZhi[1] === dayPillar.branchHanja
        const ganMeaning = isGanSame
          ? '비견·겁재 운으로 자기 주도와 경쟁의 기운 — 공동 사업은 갈등 위험, 단독 추진이 유리합니다'
          : isGanYong
            ? `${ELEMENTS[yongSin.yong].kr} 용신 천간이 들어와 운이 열리는 해 — 새 기회와 인연이 들어오는 긍정적 시기입니다`
            : `${ganKr} 천간의 ${ELEMENTS[lnGanElement as ElementKey].kr} 기운이 흐르는 해 — ${lnGanElement === result.dayMaster.key ? '나와 같은 기운이 강해져 자신감은 커지나 고집도 세질 수 있습니다' : lnGanElement === result.weakest.key ? '취약한 기운이 천간으로 들어와 건강과 멘탈 관리가 필요한 해입니다' : `${ELEMENTS[lnGanElement as ElementKey].kr} 기운의 흐름으로 일상의 패턴이 서서히 바뀌는 시기입니다`}`
        const zhiMeaning = isZhiSame
          ? '일지와 같은 지지가 들어와 자기 일주의 기운이 강해지는 해 — 변화나 이동의 가능성이 있습니다'
          : isZhiYong
            ? `${ELEMENTS[yongSin.yong].kr} 용신 지지가 들어와 환경이 내게 유리하게 바뀌는 해 — 투자나 이동에 유리한 시기입니다`
            : `${zhiAnimal}띠 해로 ${ELEMENTS[lnZhiElement as ElementKey].kr} 지지의 기운 — ${lnZhiElement === result.weakest.key ? '취약 부위 관리와 안전에 주의가 필요한 환경입니다' : '환경의 무대가 바뀌며 새로운 관계나 일거리가 들어올 수 있습니다'}`
        const positionNote = i === 0 ? ' 이 해는 이 대운의 시작점으로, 이 시기의 선택이 향후 10년의 방향에 영향을 줍니다.' : i === 4 ? ' 이 해는 대운 후반부의 변곡점으로, 새 대운으로 넘어갈 준비가 필요합니다.' : i === importantYears.length - 1 ? ' 이 해는 이 대운의 마지막 연운으로, 다음 대운의 기운이 서서히 겹쳐오기 시작합니다.' : ''
        return {
          label: `${y.year}년 — ${y.ganZhi}${y.isCurrent ? ' (현재)' : ''}`,
          text: `${y.age}세. ${y.isCurrent ? '올해의 기운으로 ' : ''}천간 ${ganMeaning}. 지지 ${zhiMeaning}.${positionNote}`,
        }
      }),
      { label: '실천형 액션 플랜', text: `1) ${SOLUTION_ACTIONS[yongSin.yong]}\n2) ${HEALTH_ACTIONS[result.weakest.key].split(',')[0]} — 취약 부위(${HEALTH_PARTS[result.weakest.key].split('과')[0]}) 정기 검진 연 1회\n3) ${SOLUTION_PLACES[yongSin.yong].split('과')[0]}에서 주 1회 시간 보내기\n4) 네이비 톤(용신 ${ELEMENTS[yongSin.yong].kr} 기운 색상)을 일상에 활용 — 의상, 인테리어 소품, 카드 지갑 등\n5) 밤 11시 이전 수면 — 일간 기운 회복의 기본\n6) ${SOLUTION_PEOPLE[yongSin.yong]} 사람과 네트워킹 — 월 1회 이상 관계형성 자리 참석` },
    ],
    insights: [
      `현재 대운 ${currentDaYun?.ganZhi ?? ''}의 기운을 의식적으로 활용하면 10년의 결실이 커지며, 흐름을 모르면 그냥 보내게 됩니다.`,
      `다음 대운이 오기 전에 지금의 습관을 교정하면 새 대운의 기운을 온전히 받을 수 있습니다.`,
      `개운 솔루션은 한 번의 큰 행동이 아니라 매일의 작은 선택입니다 — 주 3회 산책, 하루 8잔 물, 밤 11시 수면 등 실천형 액션 아이템으로 일상에 스며들게 하면 운이 자연히 열립니다.`,
    ],
    innerVsOuter: {
      inner: '10년의 흐름을 의식하며 살고 있어 자연스럽게 시대의 흐름을 읽는 감각이 내면에 있습니다.',
      outer: '외부에서는 "운을 타는 사람" 또는 "운을 만드는 사람"으로 인식됩니다.',
      gap: '내면에서는 흐름을 읽고 있지만 외부에서는 결과로 평가받아 기다림의 스트레스가 생깁니다. 갭을 줄이려면 10년 흐름을 1년 단위 목표로 쪼개고, 매 분기마다 흐름과 자신의 행동을 점검하는 시간을 확보하세요.',
    },
    microScenario: `대운이 바뀌는 해 — 갑자기 사람이 바뀌듯 성향이나 관심사가 바뀐 적이 있다면, 그것은 당신의 변화가 아니라 대운의 기운이 바뀐 것입니다. 이때 무리하게 이전 방식을 고집하면 새 흐름을 타지 못합니다.`,
    closing: `${values.name}님, 사주는 "이렇게 살아라"가 아니라 "이런 기운으로 살면 열린다"는 지도입니다. 이 지도를 손에 쥐고 남은 항해를 스스로 조종하세요. 운은 찾는 자에게 열리고, 아는 자에게 빛납니다.`,
  })

  // 9단계: 합·충·형·해 신살 사주 영향 상세 풀이 (별도 탭)
  const interactions = result.interactions
  sections.push({
    step: 9,
    layer: 1,
    title: '합·충·형·해 신살 사주 영향 상세 풀이',
    subtitle: '원국 내 신살이 삶에 미치는 구체적 영향과 대응',
    toc: interactions.length > 0 ? interactions.map(it => it.type) : ['해당 신살 없음'],
    keywords: interactions.length > 0 ? interactions.slice(0, 3).map(it => it.type) : ['신살 없음', '안정 명식'],
    score: interactions.length > 0 ? Math.min(85, 60 + interactions.length * 5) : 70,
    intro: `신살은 사주 원국 내의 지지 간 관계로, 합·충·형·해 등의 기운이 당신의 삶에 구체적으로 어떻게 작용하는지 풀이합니다.`,
    highlight: interactions.length > 0
      ? `이 명식에는 ${interactions.map(it => it.type).join(', ')}이(가) 있습니다. 이 신살들이 삶의 흐름에 미치는 영향을 하나씩 짚습니다.`
      : '이 명식은 특이한 신살(합·충·형·해)이 없어 비교적 안정적인 흐름입니다. 다만 연운에서 들어오는 신살에는 주의가 필요합니다.',
    episodes: interactions.length > 0
      ? interactions.map(it => ({
          label: it.type,
          text: `${it.desc} 해당 주: ${it.pillars.join('-')}. 이 신살이 당신의 관계, 건강, 재물 흐름에 미치는 영향을 대운·연운에서 이 신살이 반복될 때 더욱 강화됩니다.`,
        }))
      : [{ label: '해당 신살 없음', text: '원국에 합·충·형·해가 없어 내면의 중심이 흔들리지 않는 안정적 명식입니다. 다만 연운에서 충이나 형이 들어올 때에는 해당 부위(건강·관계·재물)에 주의하세요.' }],
    insights: [
      `신살의 패턴을 자각하면 대운·연운에서 같은 흐름이 반복될 때 미리 대응할 수 있습니다.`,
      `충이 오는 시기에는 투자·이동을 멈추고 합이 오는 시기에는 관계를 가꾸는 것이 신살 활용의 기본입니다.`,
    ],
    innerVsOuter: {
      inner: '삶의 반복 패턴을 "운"의 흐름으로 읽는 감각이 내면에 자리 잡고 있습니다.',
      outer: '외부에서는 "반복하는 사람" 또는 "배우는 사람" 중 하나로 인식됩니다.',
      gap: '내면에서는 패턴을 읽고 있지만 외부에서는 변화가 없다고 평가받아 답답함을 느낄 수 있습니다. 스트레스를 줄이려면 읽어낸 패턴을 행동으로 바꾸는 작은 실험을 매주 하나씩 시도하고, 그 결과를 기록하세요.',
    },
    microScenario: `충이 일주에 있는 분은 관계가 깊어질수록 마찰이 커집니다. 이것은 당신의 잘못이 아니라 기운끼리 부딪히는 충의 기운입니다. 이 패턴을 알면 "이 시기에는 관계에 거리를 두는 것"이 대응법이 됩니다.`,
    closing: '신살은 고정된 운명이 아니라 "주의 신호"입니다. 신살이 오는 시기를 알면 대응이 달라지고 운이 바뀝니다.',
  })

  return {
    emotionalHook: emotionalHook(result.dayMasterStem, result.dayMaster.key),
    sections,
  }
}

function dmRatio(result: SajuResult): number {
  const dmCount = result.elementCounts[result.dayMaster.key]
  const totalCount = Object.values(result.elementCounts).reduce((a, b) => a + b, 0)
  return totalCount > 0 ? dmCount / totalCount : 0.25
}

export function generateIntegratedSolution(
  values: SajuFormValues,
  result: SajuResult
): IntegratedSolution {
  const yongSin = findYongSin(result)
  const yongKey = yongSin.yong
  const weakKey = result.weakest.key

  return {
    title: '종합 맞춤 개운 솔루션',
    items: [
      {
        category: '필요 오행',
        action: `${ELEMENTS[yongKey].label}(${ELEMENTS[yongKey].kr}) 기운을 일상에서 채우세요`,
        reason: `사주에서 가장 필요한 용신이 ${ELEMENTS[yongKey].label}(${ELEMENTS[yongKey].kr})이며, 이 기운이 강해질 때 운이 열립니다. 현재 ${ELEMENTS[weakKey].label}(${ELEMENTS[weakKey].kr})이 편중되어 있어 균형을 맞추기 위함입니다.`,
      },
      {
        category: '귀인·끌리는 사람',
        action: `${ELEMENTS[yongKey].kr} 기운을 가진 사람과 가까이하세요`,
        reason: `용신과 같은 오행을 가진 사람이 귀인입니다. ${ELEMENTS[yongKey].kr} 기운의 사람은 ${SOLUTION_PEOPLE[yongKey]} 특징이 있으며, 이런 사람과 관계를 맺으면 자연스럽게 용신 기운을 받아 운이 틀어집니다.`,
      },
      {
        category: '공간·환경',
        action: `${SOLUTION_PLACES[yongKey]}에서 주 1회 시간을 보내세요`,
        reason: `해당 공간은 ${ELEMENTS[yongKey].label}(${ELEMENTS[yongKey].kr}) 기운을 머금고 있어 부족한 용신 기운을 환경으로 보완할 수 있습니다.`,
      },
      {
        category: '실생활 개운 행동',
        action: `${SOLUTION_ACTIONS[yongKey]}을 일상에 도입하세요`,
        reason: `용신인 ${ELEMENTS[yongKey].kr} 기운을 행동으로 직접 발현하여 운의 방향을 용신 쪽으로 기울이는 가장 효과적인 개운법입니다.`,
      },
    ],
    closing: `${values.name}님, 개운 솔루션은 한 번의 큰 행동이 아니라 매일의 작은 선택입니다. 필요 오행을 채우는 사람, 공간, 행동을 일상에 스며들게 하면 운이 자연히 열립니다.`,
  }
}

// 1:1 Q&A 독립 섹션 생성
export function generateQASection(
  values: SajuFormValues,
  result: SajuResult,
  additional: AdditionalAnswers
): { concernArea: string; loveStatus: string; question: string; answer: string } | null {
  if (!additional.concernAreas?.length && !additional.loveStatus && !additional.question) return null

  const strength = judgeStrength(result)
  const yongSin = findYongSin(result)
  const currentDaYun = result.daYun[result.currentDaYunIndex]
  const currentLiuNian = currentDaYun?.liuNian[result.currentLiuNianIndex]

  const concernText = additional.concernAreas?.length ? `선택하신 관심 영역은 "${additional.concernAreas.join(', ')}"입니다. ${additional.currentConcern ? `현재 고민 중인 결정은 "${additional.currentConcern}"입니다. ` : ''}` : ''
  const loveText = additional.loveStatus ? `현재 관계 상태는 "${additional.loveStatus}"로 파악했습니다. ` : ''
  const questionText = additional.question ? `남겨주신 질문: "${additional.question}"에 대해 풀이드립니다. ` : ''

  let answer = `${concernText}${loveText}${questionText}\n\n`

  if (additional.concernAreas?.includes('연애/운명의 짝') || additional.loveStatus || additional.currentConcern === '연애/결혼') {
    answer += `연애·결혼 측면에서 보면, 현재 ${currentDaYun?.ganZhi ?? ''} 대운(${currentDaYun?.startYear ?? ''}~${currentDaYun?.endYear ?? ''}년)과 ${currentLiuNian?.year ?? '올해'}년 ${currentLiuNian?.ganZhi ?? ''} 연운의 조화가 관계의 흐름을 결정합니다.\n\n`
    if (additional.loveStatus === '솔로') {
      answer += `${values.name}님, 솔로이신 점을 고려하여 단정적으로 풀이하면, 용신(사주에서 가장 필요한 기운)인 ${ELEMENTS[yongSin.yong].kr} 기운이 강해지는 시기에 인연이 들어올 확률이 높습니다.\n\n2026년(병오년)에는 자기 역량(일간, 나 자신을 상징하는 기운)을 키우는 데 집중하면, 하반기 이후 인연의 기운이 강해지는 시기가 다가옵니다. 그 시기까지 자기를 가꾸는 것이 인연을 "기다리는" 것보다 훨씬 효과적입니다.`
    } else if (additional.loveStatus === '연애 중') {
      answer += `연애 중이시므로, 현재 연운이 일지에 충(충돌)이나 형(형극)을 만드는지 확인이 필요합니다.\n\n충이 오는 해에는 관계의 변동이, 합이 오는 해에는 관계의 진전이 예상됩니다. 2026년(병오년) 연운의 기운을 확인하여 관계의 방향을 가늠해 보세요.`
    } else if (additional.loveStatus === '썸·애매한 관계') {
      answer += `썸·애매한 관계이시므로, 이 관계가 "합"(조화)의 시기에 들어왔는지 "충"(충돌)의 시기에 들어왔는지가 관건입니다.\n\n합의 시기라면 자연스럽게 깊어지고, 충의 시기라면 억지로 결론짓기보다 시간을 두는 것이 좋습니다.`
    } else if (additional.loveStatus === '재회 고민') {
      answer += `재회를 고민 중이시므로, 사주에 다시 합이 들어오는 시기를 기다리는 것이 억지로 재회를 시도하는 것보다 낫습니다.\n\n충이 오는 시기에 재회를 시도하면 같은 패턴이 반복됩니다. 현재 대운(${currentDaYun?.startYear ?? ''}~${currentDaYun?.endYear ?? ''}년) 내에서 합이 들어오는 연운을 주목하세요.`
    } else if (additional.loveStatus === '이혼·사별') {
      answer += `이혼·사별 후이시므로, 다시 인성(보호와 수용의 기운)이나 합이 들어오는 시기가 "마음을 다시 여는" 시기입니다.\n\n그 전까지는 스스로의 기운을 회복하는 것이 우선이며, 새 인연은 그 이후에 자연스럽게 들어옵니다.`
    } else if (additional.loveStatus === '복잡한 애증 관계') {
      answer += `복잡한 애증 관계이시므로, 사주에 충이 일주에 있어 이 애매함이 반복될 수 있습니다.\n\n이때는 "관계를 정리하는 시기"를 기다리는 것이 억지로 결론을 내리는 것보다 낫습니다.`
    }
  } else if (additional.concernAreas?.includes('이직/커리어')) {
    answer += `직업·사업 측면에서, 현재 ${strength.level} 명식${strength.index >= 3 ? '(자신의 주관과 에너지가 강한 사주 구조)' : '(자신의 주관과 에너지가 약한 사주 구조)'}에 ${currentDaYun?.ganZhi ?? ''} 대운(${currentDaYun?.startYear ?? ''}~${currentDaYun?.endYear ?? ''}년)이 흐르고 있습니다.\n\n`
    answer += strength.index >= 3 ? '신강한 명식은 현재 대운 구간에서 자기 주도적 사업이나 리더십이 유리합니다. 다만 비견(경쟁) 운이면 경쟁이, 관성(책임·규율) 운이면 조직 내 인정이 — 방향을 점검하세요.' : '신약한 명식은 현재 대운 구간에서 조직의 틀 안에서 안정을 먼저 확보하고 서서히 자율성을 넓히는 전략이 유리합니다.'
  } else if (additional.concernAreas?.includes('재물/자산')) {
    answer += `금전운이 궁금하신 ${values.name}님, 재물 측면에서 용신(사주에서 가장 필요한 기운)인 ${ELEMENTS[yongSin.yong].kr} 기운과 관련된 활동에서 재물이 열립니다.\n\n`
    answer += strength.index <= 1 ? '신약한 명식(자신의 에너지가 약한 사주)은 재물이 들어와도 건강이나 관계로 빠져나갈 수 있으니 안전 자산 비중을 높이고 레버리지를 피하세요.' : '신강한 명식(자신의 에너지가 강한 사주)은 현재 대운 구간에서 재성(재물의 기운)이 강해지면 큰 돈을 움켜쥘 수 있으나 과재(재물이 너무 많아 오히려 타격이 되는 운)는 건강을 해칠 수 있습니다.'
    answer += '\n\n2026년(병오년)에는 특히 투자 시 불필요한 리스크를 줄이고 주도적으로 자산을 관리하는 데 신경 써보세요.'
  } else if (additional.concernAreas?.includes('종합 운세')) {
    answer += `종합 운세 측면에서, ${values.name}님의 명식은 ${strength.level} 명식${strength.index >= 3 ? '(자신의 주관과 에너지가 강한 사주 구조)' : '(자신의 주관과 에너지가 약한 사주 구조)'}으로 용신(사주에서 가장 필요한 기운)은 ${ELEMENTS[yongSin.yong].kr} 기운입니다.\n\n현재 ${currentDaYun?.ganZhi ?? ''} 대운(${currentDaYun?.startYear ?? ''}~${currentDaYun?.endYear ?? ''}년)의 흐름과 ${currentLiuNian?.year ?? '올해'}년 ${currentLiuNian?.ganZhi ?? ''} 연운의 조화가 전반적인 운세의 방향을 결정합니다.\n\n`
    answer += strength.index >= 3 ? '신강한 명식은 자기 주도적으로 운을 열어가는 시기입니다. 다만 분배와 양보의 지혜가 필요합니다.' : '신약한 명식은 외부의 지원과 협력을 통해 역량을 키우는 시기입니다. 조급하게 결과를 쫓기보다 기운을 축적하는 것이 유리합니다.'
  } else if (additional.concernAreas?.includes('건강')) {
    answer += `건강 측면에서, ${result.weakest.label} 기운에 해당하는 부위(${HEALTH_PARTS[result.weakest.key].split('과')[0]})가 가장 취약합니다.\n\n`
    answer += `${HEALTH_ACTIONS[result.weakest.key]}을 일상에 도입하시고 정기 검진을 통해 해당 부위를 관리하세요.`
  }

  if (additional.question) {
    answer += `\n\n남겨주신 질문에 대한 직접적 답변: 현재 대운·연운의 기운을 고려할 때 ${currentLiuNian?.year ?? '올해'}년 하반기는 ${yongSin.yong === result.dayMaster.key ? '자기 역량(일간)을 키우는' : '용신(사주에서 가장 필요한 기운) 기운을 채우는'} 방향으로 움직이시는 것이 유리합니다.`
  }

  return {
    concernArea: additional.concernAreas?.join(', ') || '전반',
    loveStatus: additional.loveStatus || '해당 없음',
    question: additional.question || '',
    answer,
  }
}
