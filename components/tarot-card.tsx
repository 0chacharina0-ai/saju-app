'use client'

import React from 'react'
import { Sparkles } from 'lucide-react'

export interface TarotCardData {
  id: string
  name: string
  nameEn: string
  meaning: string
  image?: string
}

export const TAROT_DECK: TarotCardData[] = [
  {
    id: 'fool',
    name: '0. 바보',
    nameEn: 'The Fool',
    meaning: '새로운 시작, 순수한 마음, 자유로운 모험, 무한한 가능성을 의미합니다. 두려움 없이 새로운 발걸음을 내딛으세요.',
  },
  {
    id: 'magician',
    name: 'I. 마법사',
    nameEn: 'The Magician',
    meaning: '창조력, 자기신뢰, 준비된 능력, 강한 의지를 나타냅니다. 이미 당신 안에 필요한 모든 도구가 준비되어 있습니다.',
  },
  {
    id: 'priestess',
    name: 'II. 여사제',
    nameEn: 'The High Priestess',
    meaning: '직관, 내면의 지혜, 비밀, 통찰력을 의미합니다. 외부의 소음보다 내면의 조용한 목소리에 귀를 기울여보세요.',
  },
  {
    id: 'empress',
    name: 'III. 여황제',
    nameEn: 'The Empress',
    meaning: '풍요, 창조성, 모성애, 감성적 만족을 나타냅니다. 긍정적인 결실과 편안한 안식을 기대해도 좋습니다.',
  },
  {
    id: 'emperor',
    name: 'IV. 황제',
    nameEn: 'The Emperor',
    meaning: '리더십, 질서, 안정성, 책임감을 상징합니다. 확고한 목표 의식과 규칙으로 상황을 주도할 필요가 있습니다.',
  },
  {
    id: 'hierophant',
    name: 'V. 교황',
    nameEn: 'The Hierophant',
    meaning: '조언, 전통, 신념, 귀인의 도움을 의미합니다. 경험자의 지혜나 원칙을 따르는 것이 이로운 선택이 됩니다.',
  },
  {
    id: 'lovers',
    name: 'VI. 연인',
    nameEn: 'The Lovers',
    meaning: '사랑, 조화, 중요한 선택, 결합을 상징합니다. 진정으로 마음이 이끄는 가치와 인연에 솔직해지세요.',
  },
  {
    id: 'chariot',
    name: 'VII. 전차',
    nameEn: 'The Chariot',
    meaning: '전진, 돌파력, 승리, 강한 승부욕을 의미합니다. 정면으로 장애물을 뚫고 나아갈 시기입니다.',
  },
  {
    id: 'strength',
    name: 'VIII. 힘',
    nameEn: 'Strength',
    meaning: '내면의 인내, 부드러운 통제력, 용기, 유연함을 뜻합니다. 강압적인 방식보다 따뜻한 설득과 조율이 힘을 발휘합니다.',
  },
]

export function TarotCardBack() {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-xl border border-primary/30 bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 shadow-lg">
      <div className="flex flex-col items-center justify-center text-primary/70">
        <Sparkles className="size-6 animate-pulse" />
      </div>
    </div>
  )
}

export interface TarotCardFrontProps {
  card: TarotCardData
  position?: string
}

export function TarotCardFront({ card, position }: TarotCardFrontProps) {
  return (
    <div className="flex h-full w-full flex-col justify-between rounded-xl border border-primary/40 bg-gradient-to-b from-purple-950/40 via-slate-900 to-slate-950 p-4 shadow-xl">
      <div>
        {position && <p className="mb-1 text-[10px] text-primary/80 font-semibold">{position}</p>}
        <p className="text-sm font-bold text-foreground">{card.name}</p>
        <p className="text-[11px] text-muted-foreground">{card.nameEn}</p>
      </div>
      <div className="my-auto flex justify-center py-4 text-primary">
        <Sparkles className="size-8" />
      </div>
    </div>
  )
}

export interface TarotCardFlipProps {
  card: TarotCardData
  selected?: boolean
  disabled?: boolean
  onClick?: () => void
}

export function TarotCardFlip({ card, selected, disabled, onClick }: TarotCardFlipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`relative aspect-[2/3] w-full rounded-xl transition-all duration-300 ${
        selected ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-105' : 'hover:scale-102'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <TarotCardBack />
    </button>
  )
}