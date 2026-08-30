import { Solar, Lunar, type EightChar, type DaYun as LunarDaYun, type LiuNian as LunarLiuNian, type LiuYue as LunarLiuYue } from 'lunar-javascript'

// ============================================================
// Types
// ============================================================

export type ElementKey = 'wood' | 'fire' | 'earth' | 'metal' | 'water'

export interface ElementInfo {
  hanja: string
  label: string
  kr: string
  color: string
  bg: string
  text: string
  border: string
  bar: string
  glow: string
}

export interface ElementRef {
  key: ElementKey
  hanja: string
  label: string
  kr: string
}

export interface Pillar {
  key: string
  name: string
  stemHanja: string
  stemKr: string
  stemElement: ElementRef
  branchHanja: string
  branchKr: string
  branchElement: ElementRef
  animal: string
  shiShenGan: string
  shiShenZhi: string[]
  hideGan: string[]
  diShi: string
  naYin: string
  xunKong: string
}

export interface DaYunEntry {
  index: number
  ganZhi: string
  gan: string
  zhi: string
  ganElement: ElementRef
  zhiElement: ElementRef
  stemHanja: string
  stemKr: string
  branchHanja: string
  branchKr: string
  startAge: number
  endAge: number
  startYear: number
  endYear: number
  liuNian: LiuNianEntry[]
}

export interface LiuNianEntry {
  year: number
  age: number
  ganZhi: string
}

export interface LiuYueEntry {
  month: number
  ganZhi: string
}

export interface Interaction {
  type: string
  desc: string
  pillars: string[]
}

export interface SajuResult {
  pillars: Pillar[]
  elementCounts: Record<ElementKey, number>
  interactions: Interaction[]
  daYun: DaYunEntry[]
  currentDaYunIndex: number
  currentLiuNianIndex: number
  currentLiuYue: LiuYueEntry[]
  lunarDisplay: string
  solarDisplay: string
  dayMasterStem: string
  dayMasterStemKr: string
  dayMaster: ElementRef
  dominant: ElementRef
  weakest: ElementRef
  taiYuan: string
  taiXi: string
  mingGong: string
  shenGong: string
}

export interface RegionEntry {
  name: string
  offsetMin: number
  longitude: number
}

export interface RegionGroup {
  province: string
  cities: RegionEntry[]
}

export interface BioQuestion {
  question: string
  options: string[]
}

// ============================================================
// Constants
// ============================================================

export const ELEMENTS: Record<ElementKey, ElementInfo> = {
  wood: {
    hanja: '木',
    label: '목',
    kr: '목',
    color: '#4ade80',
    bg: 'bg-wood/10',
    text: 'text-wood',
    border: 'border-wood/40',
    bar: 'bg-wood',
    glow: 'shadow-[0_0_20px_-4px_var(--wood)]',
  },
  fire: {
    hanja: '火',
    label: '화',
    kr: '화',
    color: '#fb7185',
    bg: 'bg-fire/10',
    text: 'text-fire',
    border: 'border-fire/40',
    bar: 'bg-fire',
    glow: 'shadow-[0_0_20px_-4px_var(--fire)]',
  },
  earth: {
    hanja: '土',
    label: '토',
    kr: '토',
    color: '#fbbf24',
    bg: 'bg-earth/10',
    text: 'text-earth',
    border: 'border-earth/40',
    bar: 'bg-earth',
    glow: 'shadow-[0_0_20px_-4px_var(--earth)]',
  },
  metal: {
    hanja: '金',
    label: '금',
    kr: '금',
    color: '#e5e7eb',
    bg: 'bg-metal/10',
    text: 'text-metal',
    border: 'border-metal/40',
    bar: 'bg-metal',
    glow: 'shadow-[0_0_20px_-4px_var(--metal)]',
  },
  water: {
    hanja: '水',
    label: '수',
    kr: '수',
    color: '#60a5fa',
    bg: 'bg-water/10',
    text: 'text-water',
    border: 'border-water/40',
    bar: 'bg-water',
    glow: 'shadow-[0_0_20px_-4px_var(--water)]',
  },
}

// ------------------------------------------------------------
// Korean region data (longitude-based offset from KST at 135°E)
// offsetMin = round((longitude - 135) * 4) minutes
// ------------------------------------------------------------

export const REGIONS: RegionEntry[] = [
  // 수도권
  { name: '서울', offsetMin: -32, longitude: 127 },
  { name: '인천', offsetMin: -30, longitude: 126.5 },
  { name: '수원', offsetMin: -31, longitude: 127 },
  { name: '성남', offsetMin: -31, longitude: 127.1 },
  { name: '고양', offsetMin: -32, longitude: 126.8 },
  { name: '용인', offsetMin: -30, longitude: 127.2 },
  // 강원도
  { name: '춘천', offsetMin: -28, longitude: 127.7 },
  { name: '원주', offsetMin: -29, longitude: 127.9 },
  { name: '강릉', offsetMin: -22, longitude: 129 },
  { name: '속초', offsetMin: -22, longitude: 128.6 },
  { name: '영월', offsetMin: -29, longitude: 128.5 },
  { name: '태백', offsetMin: -26, longitude: 128.9 },
  // 충청도
  { name: '청주', offsetMin: -31, longitude: 127.5 },
  { name: '천안', offsetMin: -31, longitude: 127.1 },
  { name: '대전', offsetMin: -33, longitude: 127.4 },
  { name: '충주', offsetMin: -29, longitude: 127.9 },
  { name: '서산', offsetMin: -34, longitude: 126.5 },
  { name: '홍성', offsetMin: -34, longitude: 126.6 },
  // 경상도
  { name: '대구', offsetMin: -27, longitude: 128.6 },
  { name: '부산', offsetMin: -24, longitude: 129 },
  { name: '울산', offsetMin: -24, longitude: 129.3 },
  { name: '창원', offsetMin: -25, longitude: 128.7 },
  { name: '경주', offsetMin: -25, longitude: 129.2 },
  { name: '포항', offsetMin: -22, longitude: 129.4 },
  { name: '안동', offsetMin: -28, longitude: 128.7 },
  { name: '구미', offsetMin: -28, longitude: 128.3 },
  { name: '김천', offsetMin: -29, longitude: 128.1 },
  // 전라도
  { name: '광주', offsetMin: -38, longitude: 126.9 },
  { name: '전주', offsetMin: -35, longitude: 127.1 },
  { name: '여수', offsetMin: -35, longitude: 127.7 },
  { name: '순천', offsetMin: -36, longitude: 127.5 },
  { name: '목포', offsetMin: -42, longitude: 126.4 },
  { name: '광양', offsetMin: -35, longitude: 127.7 },
  { name: '나주', offsetMin: -38, longitude: 126.7 },
  { name: '해남', offsetMin: -40, longitude: 126.6 },
  // 제주
  { name: '제주', offsetMin: -47, longitude: 126.5 },
  { name: '서귀포', offsetMin: -47, longitude: 126.5 },
]

export const REGION_GROUPS: RegionGroup[] = [
  {
    province: '수도권',
    cities: [
      { name: '서울', offsetMin: -32, longitude: 127 },
      { name: '인천', offsetMin: -30, longitude: 126.5 },
      { name: '수원', offsetMin: -31, longitude: 127 },
      { name: '성남', offsetMin: -31, longitude: 127.1 },
      { name: '고양', offsetMin: -32, longitude: 126.8 },
      { name: '용인', offsetMin: -30, longitude: 127.2 },
    ],
  },
  {
    province: '강원도',
    cities: [
      { name: '춘천', offsetMin: -28, longitude: 127.7 },
      { name: '원주', offsetMin: -29, longitude: 127.9 },
      { name: '강릉', offsetMin: -22, longitude: 129 },
      { name: '속초', offsetMin: -22, longitude: 128.6 },
      { name: '영월', offsetMin: -29, longitude: 128.5 },
      { name: '태백', offsetMin: -26, longitude: 128.9 },
    ],
  },
  {
    province: '충청도',
    cities: [
      { name: '청주', offsetMin: -31, longitude: 127.5 },
      { name: '천안', offsetMin: -31, longitude: 127.1 },
      { name: '대전', offsetMin: -33, longitude: 127.4 },
      { name: '충주', offsetMin: -29, longitude: 127.9 },
      { name: '서산', offsetMin: -34, longitude: 126.5 },
      { name: '홍성', offsetMin: -34, longitude: 126.6 },
    ],
  },
  {
    province: '경상도',
    cities: [
      { name: '대구', offsetMin: -27, longitude: 128.6 },
      { name: '부산', offsetMin: -24, longitude: 129 },
      { name: '울산', offsetMin: -24, longitude: 129.3 },
      { name: '창원', offsetMin: -25, longitude: 128.7 },
      { name: '경주', offsetMin: -25, longitude: 129.2 },
      { name: '포항', offsetMin: -22, longitude: 129.4 },
      { name: '안동', offsetMin: -28, longitude: 128.7 },
      { name: '구미', offsetMin: -28, longitude: 128.3 },
      { name: '김천', offsetMin: -29, longitude: 128.1 },
    ],
  },
  {
    province: '전라도',
    cities: [
      { name: '광주', offsetMin: -38, longitude: 126.9 },
      { name: '전주', offsetMin: -35, longitude: 127.1 },
      { name: '여수', offsetMin: -35, longitude: 127.7 },
      { name: '순천', offsetMin: -36, longitude: 127.5 },
      { name: '목포', offsetMin: -42, longitude: 126.4 },
      { name: '광양', offsetMin: -35, longitude: 127.7 },
      { name: '나주', offsetMin: -38, longitude: 126.7 },
      { name: '해남', offsetMin: -40, longitude: 126.6 },
    ],
  },
  {
    province: '제주도',
    cities: [
      { name: '제주', offsetMin: -47, longitude: 126.5 },
      { name: '서귀포', offsetMin: -47, longitude: 126.5 },
    ],
  },
]

// ============================================================
// Biorhythm Quiz Data
// ============================================================

export const BIORHYTHM_QUESTIONS: BioQuestion[] = [
  {
    question: '새로운 모임에 들어갔을 때 나는 보통 어떤 편인가요?',
    options: [
      '먼저 다가가서 말을 거는 편이다 (외향형)',
      '상황을 지켜보다 자연스럽게 합류한다 (중간형)',
      '내가 먼저 나서는 일은 거의 없다 (내향형)',
      '분위기에 맞춰 유연하게 행동한다 (적응형)',
      '먼저 다가가고 싶지 않지만 끌려오는 사람에게는 친절하다 (선택적 외향)',
    ],
  },
  {
    question: '중요한 결정을 내릴 때 나는 주로 어떤 방식인가요?',
    options: [
      '직관과 감정이 먼저 움직인다 (감정 우선)',
      '장단점을 분석한 뒤 결정한다 (이성 우선)',
      '주변 사람들의 의견을 듣고 참고한다 (관계 우선)',
      '시간을 두고 천천히 결정한다 (신중형)',
      '첫 번째 번뜩임을 신뢰한다 (직관형)',
    ],
  },
  {
    question: '스트레스를 받을 때 나의 회복 방식은?',
    options: [
      '사람을 만나서 에너지를 얻는다 (교류형)',
      '혼자 조용히 쉬면서 회복한다 (휴식형)',
      '운동이나 활동으로 푼다 (활동형)',
      '맛있는 것을 먹거나 쇼핑으로 푼다 (감각형)',
      '생각을 정리하고 기록한다 (내면 정리형)',
    ],
  },
  {
    question: '타인이 나를 어떻게 보는 것 같나요?',
    options: [
      '밝고 활동적이며 리더십이 있다고 본다',
      '차분하고 신뢰감이 있다고 본다',
      '독립적이고 자기주도적이라고 본다',
      '예민하고 섬세하다고 본다',
      '유연하고 적응력이 좋다고 본다',
    ],
  },
  {
    question: '내가 가장 에너지를 느끼는 환경은?',
    options: [
      '사람이 많고 활기찬 곳 (북적한 공간)',
      '조용하고 정돈된 곳 (서재, 카페)',
      '자연과 함께하는 곳 (산, 바다, 공원)',
      '새로운 자극이 많은 곳 (여행, 도시)',
      '익숙하고 안정적인 공간 (내 방, 집)',
    ],
  },
  {
    question: '갈등 상황에서 나의 기본 반응은?',
    options: [
      '직접 부딪히고 풀어야 한다고 본다 (직면형)',
      '시간을 두고 자연스럽게 풀린다 (회피형)',
      '제삼자의 도움을 받는다 (중재형)',
      '내가 양보해서 끝낸다 (양보형)',
      '논리로 풀어간다 (설득형)',
    ],
  },
  {
    question: '내 인생에서 가장 중요한 가치는?',
    options: [
      '자유와 독립 (내 마음대로 사는 것)',
      '안정과 신뢰 (든든한 기반을 갖는 것)',
      '성장과 성취 (더 높이 올라가는 것)',
      '관계와 사랑 (소중한 사람과 함께하는 것)',
      '조화와 균형 (모든 것의 중심을 잡는 것)',
    ],
  },
]

export const BOUNDARY_QUESTIONS: BioQuestion[] = [
  {
    question: '당신의 출생 시간이 두 시(時)의 경계에 있을 때, 어느 쪽 성향이 더 강하게 나타나나요?',
    options: [
      '앞선 시(時)의 기운이 더 강하게 나타난다',
      '뒤따른 시(時)의 기운이 더 강하게 나타난다',
    ],
  },
  {
    question: '어릴 적부터 현재까지, 내 성격의 핵심이 변하지 않았다고 느끼는 기운은?',
    options: [
      '표준시 기준의 사주 기운이 내 본질과 더 맞다',
      '지방시 기준의 사주 기운이 내 본질과 더 맞다',
    ],
  },
]

export function evaluateBoundaryAnswers(answers: number[]): 'local' | 'standard' {
  // answers[0]: 0 = earlier shi, 1 = later shi
  // answers[1]: 0 = standard, 1 = local
  if (answers.length < 2 || answers[0] < 0 || answers[1] < 0) return 'local'
  let localScore = 0
  let standardScore = 0
  // Q1: earlier shi (0) leans toward the boundary being earlier → standard time side
  //     later shi (1) leans toward local time side
  if (answers[0] === 0) standardScore += 1
  else if (answers[0] === 1) localScore += 1
  // Q2: directly asks standard vs local
  if (answers[1] === 0) standardScore += 2
  else if (answers[1] === 1) localScore += 2
  return localScore >= standardScore ? 'local' : 'standard'
}

// ============================================================
// Internal lookup tables
// ============================================================

const STEM_HANJA: string[] = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
const STEM_KR: string[] = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계']
const BRANCH_HANJA: string[] = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
const BRANCH_KR: string[] = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해']
const BRANCH_ANIMAL: string[] = ['쥐', '소', '호랑이', '토끼', '용', '뱀', '말', '양', '원숭이', '닭', '개', '돼지']

// Element mapping: stems → yang/yin pair → element
// 甲乙=wood, 丙丁=fire, 戊己=earth, 庚辛=metal, 壬癸=water
const STEM_ELEMENT: ElementKey[] = ['wood', 'wood', 'fire', 'fire', 'earth', 'earth', 'metal', 'metal', 'water', 'water']
// Branch elements:
// 子亥=water, 丑辰未戌=earth, 寅卯=wood, 巳午=fire, 申酉=metal
const BRANCH_ELEMENT: ElementKey[] = [
  'water', // 子
  'earth', // 丑
  'wood',  // 寅
  'wood',  // 卯
  'earth', // 辰
  'fire',  // 巳
  'fire',  // 午
  'earth', // 未
  'metal', // 申
  'metal', // 酉
  'earth', // 戌
  'water', // 亥
]

function stemIndex(hanja: string): number {
  return STEM_HANJA.indexOf(hanja)
}

function branchIndex(hanja: string): number {
  return BRANCH_HANJA.indexOf(hanja)
}

function elementRefFromStem(hanja: string): ElementRef {
  const idx = stemIndex(hanja)
  const key = STEM_ELEMENT[idx] ?? 'wood'
  return { key, hanja: ELEMENTS[key].hanja, label: ELEMENTS[key].label, kr: ELEMENTS[key].kr }
}

function elementRefFromBranch(hanja: string): ElementRef {
  const idx = branchIndex(hanja)
  const key = BRANCH_ELEMENT[idx] ?? 'wood'
  return { key, hanja: ELEMENTS[key].hanja, label: ELEMENTS[key].label, kr: ELEMENTS[key].kr }
}

// ============================================================
// Interaction (합충) detection
// ============================================================

// 天干合 (Stem combinations): 甲己, 乙庚, 丙辛, 丁壬, 戊癸
const TIAN_GAN_HE: Record<string, string> = {
  '甲': '己', '己': '甲',
  '乙': '庚', '庚': '乙',
  '丙': '辛', '辛': '丙',
  '丁': '壬', '壬': '丁',
  '戊': '癸', '癸': '戊',
}

// 天干冲 (Stem clashes): 甲戊, 乙己, 丙庚, 丁辛, 戊壬, 己癸, 庚甲, 辛乙, 壬丙, 癸丁
// Actually traditional: 甲庚冲, 乙辛冲, 丙壬冲, 丁癸冲, 戊己冲(no - 戊己 is 合)
// Correct: 甲↔庚, 乙↔辛, 丙↔壬, 丁↔癸 (戊己 are central, no clash)
const TIAN_GAN_CHONG: Record<string, string> = {
  '甲': '庚', '庚': '甲',
  '乙': '辛', '辛': '乙',
  '丙': '壬', '壬': '丙',
  '丁': '癸', '癸': '丁',
}

// 地支六合 (Branch six combinations): 子丑, 寅亥, 卯戌, 辰酉, 巳申, 午未
const DI_ZHI_LIU_HE: Record<string, string> = {
  '子': '丑', '丑': '子',
  '寅': '亥', '亥': '寅',
  '卯': '戌', '戌': '卯',
  '辰': '酉', '酉': '辰',
  '巳': '申', '申': '巳',
  '午': '未', '未': '午',
}

// 地支三合 (Branch three harmonies):
// 申子辰 → 水, 寅午戌 → 火, 巳酉丑 → 金, 亥卯未 → 木
const DI_ZHI_SAN_HE: Record<string, string[]> = {
  '申': ['子', '辰'], '子': ['申', '辰'], '辰': ['申', '子'],
  '寅': ['午', '戌'], '午': ['寅', '戌'], '戌': ['寅', '午'],
  '巳': ['酉', '丑'], '酉': ['巳', '丑'], '丑': ['巳', '酉'],
  '亥': ['卯', '未'], '卯': ['亥', '未'], '未': ['亥', '卯'],
}

// 地支冲 (Branch clashes): 子午, 丑未, 寅申, 卯酉, 辰戌, 巳亥
const DI_ZHI_CHONG: Record<string, string> = {
  '子': '午', '午': '子',
  '丑': '未', '未': '丑',
  '寅': '申', '申': '寅',
  '卯': '酉', '酉': '卯',
  '辰': '戌', '戌': '辰',
  '巳': '亥', '亥': '巳',
}

// 地支刑 (Branch punishments):
// 寅巳申 (无恩之刑), 丑戌未 (恃势之刑), 子卯 (无礼之刑), 辰辰/午午/酉酉/亥亥 (自刑)
const DI_ZHI_XING: Record<string, string[]> = {
  '寅': ['巳', '申'], '巳': ['申', '寅'], '申': ['寅', '巳'],
  '丑': ['戌', '未'], '戌': ['未', '丑'], '未': ['丑', '戌'],
  '子': ['卯'], '卯': ['子'],
  '辰': ['辰'], '午': ['午'], '酉': ['酉'], '亥': ['亥'],
}

// 地支害 (Branch harms): 子未, 丑午, 寅巳, 卯辰, 申亥, 酉戌
const DI_ZHI_HAI: Record<string, string> = {
  '子': '未', '未': '子',
  '丑': '午', '午': '丑',
  '寅': '巳', '巳': '寅',
  '卯': '辰', '辰': '卯',
  '申': '亥', '亥': '申',
  '酉': '戌', '戌': '酉',
}

// 原진 (YuanZhen / deep resentment):
// 子午, 丑未, 寅申, 卯酉, 辰戌, 巳亥 — but with different pairing emphasis
// Traditional 원진 pairs: 寅午戌→巳亥, 申子辰→巳亥, etc. simplified:
// 丑未, 卯辰, 寅巳, 申亥, 子酉, 戌午
const YUAN_ZHEN: Record<string, string> = {
  '丑': '未', '未': '丑',
  '卯': '辰', '辰': '卯',
  '寅': '巳', '巳': '寅',
  '申': '亥', '亥': '申',
  '子': '酉', '酉': '子',
  '戌': '午', '午': '戌',
}

// 귀문관 (GuiMenGuan) branches for each day stem
// 甲戊庚 → 丑未, 乙己 → 子申, 丙丁 → 卯酉, 壬癸 → 辰戌, 辛 → 巳亥
const GUI_MEN_GUAN: Record<string, string[]> = {
  '甲': ['丑', '未'], '戊': ['丑', '未'], '庚': ['丑', '未'],
  '乙': ['子', '申'], '己': ['子', '申'],
  '丙': ['卯', '酉'], '丁': ['卯', '酉'],
  '壬': ['辰', '戌'], '癸': ['辰', '戌'],
  '辛': ['巳', '亥'],
}

const PILLAR_NAMES = ['연주', '월주', '일주', '시주']
const PILLAR_KEYS = ['year', 'month', 'day', 'hour']

function detectInteractions(pillars: Pillar[]): Interaction[] {
  const interactions: Interaction[] = []
  const positions = pillars.map((p, i) => ({
    name: PILLAR_NAMES[i],
    stem: p.stemHanja,
    branch: p.branchHanja,
  }))

  // Helper to create a pair label
  const pairLabel = (a: number, b: number) => `${positions[a].name}-${positions[b].name}`

  // 天干합 — check all stem pairs
  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      const s1 = positions[i].stem
      const s2 = positions[j].stem
      if (TIAN_GAN_HE[s1] === s2) {
        interactions.push({
          type: '천간합',
          desc: `${positions[i].name}(${s1})와 ${positions[j].name}(${s2})이 천간합을 이루어 ${s1}${s2} 합으로 새로운 기운이 형성됩니다.`,
          pillars: [positions[i].name, positions[j].name],
        })
      }
      if (TIAN_GAN_CHONG[s1] === s2) {
        interactions.push({
          type: '천간충',
          desc: `${positions[i].name}(${s1})와 ${positions[j].name}(${s2})이 천간충을 이루어 기운이 충돌하고 변화가 일어납니다.`,
          pillars: [positions[i].name, positions[j].name],
        })
      }
    }
  }

  // 지지 interactions — check all branch pairs
  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      const b1 = positions[i].branch
      const b2 = positions[j].branch

      // 지지육합
      if (DI_ZHI_LIU_HE[b1] === b2) {
        interactions.push({
          type: '지지육합',
          desc: `${positions[i].name}(${b1})와 ${positions[j].name}(${b2})가 지지육합으로 결합하여 깊은 인연과 융합의 기운을 만듭니다.`,
          pillars: [positions[i].name, positions[j].name],
        })
      }

      // 지지충
      if (DI_ZHI_CHONG[b1] === b2) {
        interactions.push({
          type: '지지충',
          desc: `${positions[i].name}(${b1})와 ${positions[j].name}(${b2})가 지지충으로 정면 충돌하여 역동적 변화와 이동의 기운을 만듭니다.`,
          pillars: [positions[i].name, positions[j].name],
        })
      }

      // 지지형
      const xingList = DI_ZHI_XING[b1]
      if (xingList && xingList.includes(b2) && i < j) {
        interactions.push({
          type: '지지형',
          desc: `${positions[i].name}(${b1})와 ${positions[j].name}(${b2})가 지지형으로 내적 갈등과 꼬임의 기운을 만듭니다.`,
          pillars: [positions[i].name, positions[j].name],
        })
      }

      // 지지해
      if (DI_ZHI_HAI[b1] === b2) {
        interactions.push({
          type: '지지해',
          desc: `${positions[i].name}(${b1})와 ${positions[j].name}(${b2})가 지지해로 보이지 않는 방해와 마찰의 기운을 만듭니다.`,
          pillars: [positions[i].name, positions[j].name],
        })
      }

      // 원진
      if (YUAN_ZHEN[b1] === b2) {
        interactions.push({
          type: '원진',
          desc: `${positions[i].name}(${b1})와 ${positions[j].name}(${b2})가 원진으로 깊은 원한과 반복적 갈등의 기운을 만듭니다.`,
          pillars: [positions[i].name, positions[j].name],
        })
      }
    }
  }

  // 지지삼합 — need three branches forming a complete set
  const branchPositions = positions.map((p, i) => ({ branch: p.branch, name: p.name, idx: i }))
  const sanHeGroups: string[][] = [
    ['申', '子', '辰'],
    ['寅', '午', '戌'],
    ['巳', '酉', '丑'],
    ['亥', '卯', '未'],
  ]
  for (const group of sanHeGroups) {
    const found = branchPositions.filter(bp => group.includes(bp.branch))
    if (found.length >= 2) {
      // Check if they form a partial or full 삼합
      const uniqueBranches = new Set(found.map(f => f.branch))
      if (uniqueBranches.size >= 2) {
        const isFull = uniqueBranches.size === 3
        interactions.push({
          type: '지지삼합',
          desc: isFull
            ? `사주 내 지지가 ${group.join('')} 삼합을 이루어 강력한 국을 형성합니다.`
            : `사주 내 지지가 ${group.join('')} 삼합의 일부를 이루어 부분적 합국의 기운이 있습니다.`,
          pillars: found.map(f => f.name),
        })
      }
    }
  }

  // 귀문관 — check if any branch matches the day stem's 귀문관 branches
  const dayStem = positions[2].stem
  const guiMenBranches = GUI_MEN_GUAN[dayStem]
  if (guiMenBranches) {
    for (const pos of positions) {
      if (guiMenBranches.includes(pos.branch) && pos.name !== '일주') {
        interactions.push({
          type: '귀문관',
          desc: `${pos.name}(${pos.branch})에 귀문관이 있어 예민한 직관과 신비로운 기운이 작용합니다.`,
          pillars: [pos.name],
        })
      }
    }
  }

  return interactions
}

// ============================================================
// Hour boundary detection
// ============================================================

export function isNearHourBoundary(hour: number, offsetMin: number): boolean {
  // The 12 branches each cover 2 hours: 子(23-1), 丑(1-3), 寅(3-5), 卯(5-7), 辰(7-9), 巳(9-11),
  // 午(11-13), 未(13-15), 申(15-17), 酉(17-19), 戌(19-21), 亥(21-23)
  // Apply offset and check if we're within ±15 minutes of a boundary
  const adjustedMinutes = ((hour * 60 + offsetMin) % 1440 + 1440) % 1440
  // Boundaries at odd hours: 1:00, 3:00, 5:00, 7:00, 9:00, 11:00, 13:00, 15:00, 17:00, 19:00, 21:00, 23:00
  // Also 子 boundary at 23:00 and 1:00
  const boundaries = [0, 60, 180, 300, 420, 540, 660, 780, 900, 1020, 1140, 1380, 1440] // 23:00 = 1380, 0:00 = 0/1440
  const threshold = 20 // 20 minutes
  for (const b of boundaries) {
    const diff = Math.abs(adjustedMinutes - b)
    if (diff <= threshold || diff >= 1440 - threshold) {
      return true
    }
  }
  return false
}

// ============================================================
// Main calculation
// ============================================================

export interface SajuInput {
  year: number
  month: number
  day: number
  hour: number // -1 if unknown
  calendar: 'solar' | 'lunar' | 'lunar-leap'
  cityOffsetMin: number
  gender: 'male' | 'female'
}

function getSolarFromInput(input: SajuInput): Solar {
  const { year, month, day, hour, calendar, cityOffsetMin } = input
  const effectiveHour = hour < 0 ? 12 : hour

  if (calendar === 'solar') {
    return Solar.fromYmdHms(year, month, day, effectiveHour, 0, 0)
  }

  // Lunar conversion: lunar month can be negative for leap months
  // For 'lunar', month is positive; for 'lunar-leap', use negative month
  const lunarMonth = calendar === 'lunar-leap' ? -month : month
  const lunar = Lunar.fromYmdHms(year, lunarMonth, day, effectiveHour, 0, 0)
  return lunar.getSolar()
}

function buildPillar(
  ec: EightChar,
  position: 'Year' | 'Month' | 'Day' | 'Time',
  key: string,
  name: string,
): Pillar {
  const stemHanja = ec[`get${position}Gan`]() as string
  const branchHanja = ec[`get${position}Zhi`]() as string
  const stemKr = STEM_KR[stemIndex(stemHanja)] ?? ''
  const branchKr = BRANCH_KR[branchIndex(branchHanja)] ?? ''
  const animal = BRANCH_ANIMAL[branchIndex(branchHanja)] ?? ''
  const stemElement = elementRefFromStem(stemHanja)
  const branchElement = elementRefFromBranch(branchHanja)
  const shiShenGan = ec[`get${position}ShiShenGan`]() as string
  const shiShenZhi = ec[`get${position}ShiShenZhi`]() as string[]
  const hideGan = ec[`get${position}HideGan`]() as string[]
  const diShi = ec[`get${position}DiShi`]() as string
  const naYin = ec[`get${position}NaYin`]() as string
  const xunKong = ec[`get${position}XunKong`]() as string

  return {
    key,
    name,
    stemHanja,
    stemKr,
    stemElement,
    branchHanja,
    branchKr,
    branchElement,
    animal,
    shiShenGan,
    shiShenZhi,
    hideGan,
    diShi,
    naYin,
    xunKong,
  }
}

function buildDaYunList(
  yunDaYun: LunarDaYun[],
  birthYear: number,
): DaYunEntry[] {
  const result: DaYunEntry[] = []
  for (let i = 0; i < yunDaYun.length; i++) {
    const dy = yunDaYun[i]
    const gz = dy.getGanZhi()
    if (!gz || gz.length < 2) continue
    const gan = gz[0]
    const zhi = gz[1]
    const startAge = dy.getStartAge()
    const endAge = dy.getEndAge()
    const startYear = dy.getStartYear()
    const endYear = dy.getEndYear()

    const liuNian: LiuNianEntry[] = []
    const lnList = dy.getLiuNian()
    for (const ln of lnList) {
      liuNian.push({
        year: ln.getYear(),
        age: ln.getAge(),
        ganZhi: ln.getGanZhi(),
      })
    }

    result.push({
      index: i,
      ganZhi: gz,
      gan,
      zhi,
      ganElement: elementRefFromStem(gan),
      zhiElement: elementRefFromBranch(zhi),
      stemHanja: gan,
      stemKr: STEM_KR[stemIndex(gan)] ?? '',
      branchHanja: zhi,
      branchKr: BRANCH_KR[branchIndex(zhi)] ?? '',
      startAge,
      endAge,
      startYear,
      endYear,
      liuNian,
    })
  }
  return result
}

function buildLiuYueList(liuYueList: LunarLiuYue[]): LiuYueEntry[] {
  return liuYueList.map((ly, i) => ({
    month: ly.getIndex() + 1,
    ganZhi: ly.getGanZhi(),
  }))
}

function countElements(pillars: Pillar[]): Record<ElementKey, number> {
  const counts: Record<ElementKey, number> = {
    wood: 0,
    fire: 0,
    earth: 0,
    metal: 0,
    water: 0,
  }
  for (const p of pillars) {
    counts[p.stemElement.key]++
    counts[p.branchElement.key]++
  }
  return counts
}

function findDominant(counts: Record<ElementKey, number>): ElementRef {
  let maxKey: ElementKey = 'wood'
  let maxCount = -1
  ;(Object.keys(counts) as ElementKey[]).forEach(key => {
    if (counts[key] > maxCount) {
      maxCount = counts[key]
      maxKey = key
    }
  })
  return {
    key: maxKey,
    hanja: ELEMENTS[maxKey].hanja,
    label: ELEMENTS[maxKey].label,
    kr: ELEMENTS[maxKey].kr,
  }
}

function findWeakest(counts: Record<ElementKey, number>): ElementRef {
  let minKey: ElementKey = 'wood'
  let minCount = Infinity
  ;(Object.keys(counts) as ElementKey[]).forEach(key => {
    if (counts[key] < minCount) {
      minCount = counts[key]
      minKey = key
    }
  })
  return {
    key: minKey,
    hanja: ELEMENTS[minKey].hanja,
    label: ELEMENTS[minKey].label,
    kr: ELEMENTS[minKey].kr,
  }
}

export function calculateSaju(input: SajuInput): SajuResult {
  const solar = getSolarFromInput(input)
  const lunar = solar.getLunar()
  const ec = lunar.getEightChar()

  // Build the 4 pillars
  const pillars: Pillar[] = [
    buildPillar(ec, 'Year', 'year', '연주'),
    buildPillar(ec, 'Month', 'month', '월주'),
    buildPillar(ec, 'Day', 'day', '일주'),
    buildPillar(ec, 'Time', 'hour', '시주'),
  ]

  // Element counts
  const elementCounts = countElements(pillars)

  // Day master
  const dayPillar = pillars[2]
  const dayMasterStem = dayPillar.stemHanja
  const dayMasterStemKr = dayPillar.stemKr
  const dayMaster = dayPillar.stemElement

  // Dominant and weakest elements
  const dominant = findDominant(elementCounts)
  const weakest = findWeakest(elementCounts)

  // Interactions (합충)
  const interactions = detectInteractions(pillars)

  // DaYun (10-year luck periods)
  const genderNum = input.gender === 'male' ? 1 : 0
  const yun = ec.getYun(genderNum)
  const rawDaYun = yun.getDaYun()
  const daYun = buildDaYunList(rawDaYun, solar.getYear())

  // Find current DaYun index based on current year
  const now = new Date()
  const currentYear = now.getFullYear()
  let currentDaYunIndex = -1
  for (let i = 0; i < daYun.length; i++) {
    if (currentYear >= daYun[i].startYear && currentYear <= daYun[i].endYear) {
      currentDaYunIndex = i
      break
    }
  }
  // Fallback: if no match, use the closest one
  if (currentDaYunIndex < 0) {
    if (daYun.length > 0) {
      // Find the one with startYear closest to but not after currentYear
      let bestIdx = 0
      let bestDiff = Infinity
      for (let i = 0; i < daYun.length; i++) {
        const diff = Math.abs(daYun[i].startYear - currentYear)
        if (diff < bestDiff) {
          bestDiff = diff
          bestIdx = i
        }
      }
      currentDaYunIndex = bestIdx
    } else {
      currentDaYunIndex = 0
    }
  }

  // Find current LiuNian index within the current DaYun
  let currentLiuNianIndex = -1
  if (currentDaYunIndex >= 0 && daYun[currentDaYunIndex]) {
    const currentDaYun = daYun[currentDaYunIndex]
    for (let i = 0; i < currentDaYun.liuNian.length; i++) {
      if (currentDaYun.liuNian[i].year === currentYear) {
        currentLiuNianIndex = i
        break
      }
    }
    if (currentLiuNianIndex < 0) {
      currentLiuNianIndex = 0
    }
  }

  // Current LiuYue (monthly fortune for current year)
  let currentLiuYue: LiuYueEntry[] = []
  if (currentDaYunIndex >= 0 && currentLiuNianIndex >= 0) {
    const currentDaYun = daYun[currentDaYunIndex]
    const currentLiuNian = currentDaYun.liuNian[currentLiuNianIndex]
    if (currentLiuNian && rawDaYun[currentDaYunIndex]) {
      const lnList = rawDaYun[currentDaYunIndex].getLiuNian()
      if (lnList[currentLiuNianIndex]) {
        currentLiuYue = buildLiuYueList(lnList[currentLiuNianIndex].getLiuYue())
      }
    }
  }

  // Lunar and solar display strings
  const lunarDisplay = `${lunar.getYear()}년 ${lunar.getMonthInChinese()}월 ${lunar.getDayInChinese()}일 (음력)`
  const solarDisplay = `${solar.getYear()}년 ${solar.getMonth()}월 ${solar.getDay()}일 (양력)`

  // Special pillars
  const taiYuan = ec.getTaiYuan()
  const taiXi = ec.getTaiXi()
  const mingGong = ec.getMingGong()
  const shenGong = ec.getShenGong()

  return {
    pillars,
    elementCounts,
    interactions,
    daYun,
    currentDaYunIndex,
    currentLiuNianIndex,
    currentLiuYue,
    lunarDisplay,
    solarDisplay,
    dayMasterStem,
    dayMasterStemKr,
    dayMaster,
    dominant,
    weakest,
    taiYuan,
    taiXi,
    mingGong,
    shenGong,
  }
}
