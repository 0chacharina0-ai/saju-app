export interface Pillar {
  position: '연주' | '월주' | '일주' | '시주'
  heavenlyStem: string
  earthlyBranch: string
  stemMeaning: string
  branchMeaning: string
  hiddenStems: string[]
}

export interface SinsangCard {
  key: string
  name: string
  category: string
  plainExplain: string
  lifeEffect: string
}

export interface PersonaShadow {
  persona: string
  shadow: string
  summary: string
}

export interface LoveInsight {
  instinctType: string
  instinctDesc: string
  synergyType: string
  synergyDesc: string
  timingNarrative: string
  marriageWindow: string
}

export interface CareerDiagnosis {
  organization: number
  independent: number
  organizationDesc: string
  independentDesc: string
  recommendation: string
}

export interface FamilyAnalysis {
  parentDistance: string
  emotionalSupport: string
  independenceTiming: string
}

export interface YearFortune {
  year: number
  stemBranch: string
  title: string
  summary: string
  keyword: string
  love: string
  career: string
  wealth: string
  health: string
}

export interface MonthFortune {
  month: number
  title: string
  summary: string
  luckyColor: string
  avoidAction: string
  career: string
  wealth: string
  relationship: string
  health: string
  opportunityDays: { day: number; guide: string }[]
  cautionDays: { day: number; guide: string }[]
}

export interface ReportData {
  id: string
  name: string
  gender: 'male' | 'female'
  birthDate: string
  birthTime: string
  pillars: Pillar[]
  dayMaster: string
  dayMasterExplain: string
  elementBalance: { element: string; count: number; ratio: number }[]
  sinsang: SinsangCard[]
  personaShadow: PersonaShadow
  love: LoveInsight
  career: CareerDiagnosis
  family: FamilyAnalysis
  daewun: { ageRange: string; stemBranch: string; title: string; narrative: string }[]
  yearFortunes: YearFortune[]
  monthFortunes: MonthFortune[]
  topActionMonths: number[]
  topCautionMonths: number[]
  solarTimeAdjust: string
}

export type AiMode = 'MODE1_FULL' | 'MODE2_SUBSCRIPTION'
