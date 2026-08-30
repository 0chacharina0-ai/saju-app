import type { CSSProperties } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  Mountain, Sparkles, Eye, Leaf, Crown, BookOpen, Heart,
  Trophy, Flame, Compass, Circle, Scale, Anchor, Skull,
  Droplets, Lock, Zap, Star, Moon, Sun, Bell, Globe,
} from 'lucide-react'

export type TarotCardData = {
  id: number
  name: string
  nameEn: string
  meaning: string
  romanNumeral: string
  icon: LucideIcon
  accent: string
}

export const TAROT_DECK: TarotCardData[] = [
  { id: 0, name: '바보', nameEn: 'The Fool', meaning: '새로운 시작과 순수한 도약. 두려움 없이 내딛는 첫걸음이 당신을 더 넓은 세계로 이끕니다. 예상치 못한 기회가 찾아오니 마음을 열고 받아들이세요.', romanNumeral: '0', icon: Mountain, accent: 'rgba(56, 189, 248, 0.15)' },
  { id: 1, name: '마법사', nameEn: 'The Magician', meaning: '당신에게는 이미 필요한 모든 도구가 갖춰져 있습니다. 의지와 행동이 하나가 되면 원하는 것을 현실로 만들 수 있는 강력한 시기입니다. 주도권을 쥐세요.', romanNumeral: 'I', icon: Sparkles, accent: 'rgba(45, 212, 191, 0.15)' },
  { id: 2, name: '여사제', nameEn: 'The High Priestess', meaning: '내면의 직관이 당신을 안내합니다. 표면적으로 보이는 것 너머의 진실을 느끼는 시기입니다. 침묵 속에서 답이 들려옵니다.', romanNumeral: 'II', icon: Eye, accent: 'rgba(129, 140, 248, 0.15)' },
  { id: 3, name: '여황', nameEn: 'The Empress', meaning: '풍요와 창조의 기운이 가득합니다. 자신을 가꾸고 주변을 풍요롭게 만드는 시기입니다. 새로운 아이디어나 관계가 열매를 맺습니다.', romanNumeral: 'III', icon: Leaf, accent: 'rgba(244, 114, 182, 0.12)' },
  { id: 4, name: '황제', nameEn: 'The Emperor', meaning: '안정과 구조가 필요한 시기입니다. 규칙을 세우고 책임을 지면 원하는 것을 이룰 수 있습니다. 리더십을 발휘하세요.', romanNumeral: 'IV', icon: Crown, accent: 'rgba(245, 158, 11, 0.15)' },
  { id: 5, name: '교황', nameEn: 'The Hierophant', meaning: '전통과 가르침이 당신을 돕습니다. 멘토나 선배의 조언이 귀중한 열쇠가 됩니다. 배움의 자세를 가지세요.', romanNumeral: 'V', icon: BookOpen, accent: 'rgba(139, 92, 246, 0.12)' },
  { id: 6, name: '연인', nameEn: 'The Lovers', meaning: '선택과 끌림의 카드. 중요한 관계의 갈림길에 서 있습니다. 마음이 가는 쪽으로 진실하게 선택하세요. 진심이 닿는 인연이 가까워집니다.', romanNumeral: 'VI', icon: Heart, accent: 'rgba(244, 114, 182, 0.15)' },
  { id: 7, name: '전차', nameEn: 'The Chariot', meaning: '강한 추진력과 승리의 기운. 장애물을 돌파할 힘이 있습니다. 방향을 정하고 밀고 나가면 반드시 결과가 따라옵니다.', romanNumeral: 'VII', icon: Trophy, accent: 'rgba(234, 179, 8, 0.15)' },
  { id: 8, name: '힘', nameEn: 'Strength', meaning: '부드러운 힘이 강한 힘을 이깁니다. 인내와 자제력이 상황을 유리하게 바꿉니다. 감정을 다스리면 승리합니다.', romanNumeral: 'VIII', icon: Flame, accent: 'rgba(249, 115, 22, 0.15)' },
  { id: 9, name: '은둔자', nameEn: 'The Hermit', meaning: '혼자만의 시간이 답을 가져다줍니다. 외부의 소음에서 벗어나 내면의 등불을 켜는 시기입니다. 깊은 성찰이 깨달음으로 이어집니다.', romanNumeral: 'IX', icon: Compass, accent: 'rgba(59, 130, 246, 0.12)' },
  { id: 10, name: '운명의 수레바퀴', nameEn: 'Wheel of Fortune', meaning: '변화의 바퀴가 돌아갑니다. 기다리던 전환점이 찾아오니 흐름에 몸을 맡기되 준비된 상태로 맞이하세요. 행운이 당신 편입니다.', romanNumeral: 'X', icon: Circle, accent: 'rgba(20, 184, 166, 0.15)' },
  { id: 11, name: '정의', nameEn: 'Justice', meaning: '공정과 균형의 카드. 노력한 만큼 결과가 따라옵니다. 정직한 선택이 장기적으로 가장 유리합니다. 마음의 저울을 신뢰하세요.', romanNumeral: 'XI', icon: Scale, accent: 'rgba(100, 116, 139, 0.15)' },
  { id: 12, name: '매달린 사람', nameEn: 'The Hanged Man', meaning: '잠시 멈춤이 필요한 시기. 관점을 바꾸면 답이 보입니다. 기다림이 허비가 아니라 준비의 시간임을 기억하세요.', romanNumeral: 'XII', icon: Anchor, accent: 'rgba(148, 163, 184, 0.12)' },
  { id: 13, name: '죽음', nameEn: 'Death', meaning: '끝이 아닌 변화의 카드. 낡은 것을 놓아야 새것이 들어옵니다. 두려워 말고 변화를 받아들이면 새로운 문이 열립니다.', romanNumeral: 'XIII', icon: Skull, accent: 'rgba(168, 85, 247, 0.15)' },
  { id: 14, name: '절제', nameEn: 'Temperance', meaning: '조화와 균형의 시기. 극단을 피하고 중도를 지키면 최선의 결과가 나옵니다. 천천히 섞어가며 완성하세요.', romanNumeral: 'XIV', icon: Droplets, accent: 'rgba(34, 211, 238, 0.12)' },
  { id: 15, name: '악마', nameEn: 'The Devil', meaning: '집착이나 유혹에 주의. 무엇에 매여 있는지 돌아보세요. 자유의지를 되찾으면 굴레를 벗어날 수 있습니다. 솔직한 자기 점검이 필요합니다.', romanNumeral: 'XV', icon: Lock, accent: 'rgba(220, 38, 38, 0.15)' },
  { id: 16, name: '탑', nameEn: 'The Tower', meaning: '갑작스러운 변화. 견고하던 것이 흔들릴 수 있지만 이는 더 나은 토대를 세우기 위한 정리입니다. 충격 뒤에 해방이 옵니다.', romanNumeral: 'XVI', icon: Zap, accent: 'rgba(59, 130, 246, 0.18)' },
  { id: 17, name: '별', nameEn: 'The Star', meaning: '희망과 영감의 카드. 어둠 속에서도 빛은 존재합니다. 마음을 열면 치유와 방향이 보입니다. 소망을 잃지 마세요.', romanNumeral: 'XVII', icon: Star, accent: 'rgba(45, 212, 191, 0.20)' },
  { id: 18, name: '달', nameEn: 'The Moon', meaning: '불확실과 환상의 시기. 감정이 출렁이니 충동적 결정을 피하세요. 시간이 지나면 진실이 드러납니다. 직관과 이성의 균형이 필요합니다.', romanNumeral: 'XVIII', icon: Moon, accent: 'rgba(203, 213, 225, 0.12)' },
  { id: 19, name: '태양', nameEn: 'The Sun', meaning: '기쁨과 성공의 카드. 빛이 가득하고 모든 것이 순조롭게 흘러갑니다. 자신감을 가지고 앞으로 나아가세요. 환하게 웃을 수 있는 날입니다.', romanNumeral: 'XIX', icon: Sun, accent: 'rgba(251, 191, 36, 0.18)' },
  { id: 20, name: '심판', nameEn: 'Judgement', meaning: '새로운 각성과 부활의 카드. 과거를 정리하고 새로운 단계로 올라서는 시기입니다. 내면의 부름에 응답하세요.', romanNumeral: 'XX', icon: Bell, accent: 'rgba(217, 119, 6, 0.15)' },
  { id: 21, name: '세계', nameEn: 'The World', meaning: '완성과 성취의 카드. 한 단계의 여정이 원만히 마무리됩니다. 충만한 기쁨과 함께 다음 여정의 문이 열립니다. 축하받을 시기입니다.', romanNumeral: 'XXI', icon: Globe, accent: 'rgba(16, 185, 129, 0.15)' },
]

/** Card back — cosmic mandala design with CSS graphics */
export function TarotCardBack() {
  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-xl"
      style={{
        background: 'linear-gradient(145deg, #080b16 0%, #0c1226 45%, #0a0f20 100%)',
        border: '1px solid rgba(45, 212, 191, 0.12)',
      }}
    >
      {/* Subtle starfield texture */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: 'radial-gradient(rgba(45, 212, 191, 0.05) 0.5px, transparent 0.5px)',
          backgroundSize: '10px 10px',
        }}
      />

      {/* Inner ornamental border */}
      <div className="absolute inset-[4px] rounded-lg" style={{ border: '1px solid rgba(45, 212, 191, 0.07)' }} />
      <div className="absolute inset-[7px] rounded-md" style={{ border: '1px solid rgba(45, 212, 191, 0.03)' }} />

      {/* Central mandala */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Subtle radial glow behind mandala */}
        <div
          className="absolute aspect-square rounded-full"
          style={{
            width: '70%',
            background: 'radial-gradient(circle, rgba(45, 212, 191, 0.06) 0%, transparent 60%)',
          }}
        />

        {/* Outer ring */}
        <div
          className="absolute aspect-square rounded-full"
          style={{ width: '58%', border: '1px solid rgba(45, 212, 191, 0.14)' }}
        />

        {/* Inner ring */}
        <div
          className="absolute aspect-square rounded-full"
          style={{ width: '38%', border: '1px solid rgba(45, 212, 191, 0.09)' }}
        />

        {/* 8-pointed star — two overlapping squares */}
        <div className="absolute size-5 border" style={{ borderColor: 'rgba(45, 212, 191, 0.22)' }} />
        <div className="absolute size-5 rotate-45 border" style={{ borderColor: 'rgba(45, 212, 191, 0.22)' }} />

        {/* Center dot */}
        <div
          className="absolute size-1 rounded-full"
          style={{ background: 'rgba(45, 212, 191, 0.55)' }}
        />

        {/* Cardinal direction dots (N, E, S, W) */}
        <div className="absolute top-[28%] size-0.5 rounded-full" style={{ background: 'rgba(45, 212, 191, 0.3)' }} />
        <div className="absolute bottom-[28%] size-0.5 rounded-full" style={{ background: 'rgba(45, 212, 191, 0.3)' }} />
        <div className="absolute left-[28%] size-0.5 rounded-full" style={{ background: 'rgba(45, 212, 191, 0.3)' }} />
        <div className="absolute right-[28%] size-0.5 rounded-full" style={{ background: 'rgba(45, 212, 191, 0.3)' }} />
      </div>

      {/* Corner ornaments — small diamonds */}
      {([
        { top: '6px', left: '6px' },
        { top: '6px', right: '6px' },
        { bottom: '6px', left: '6px' },
        { bottom: '6px', right: '6px' },
      ] as CSSProperties[]).map((pos, i) => (
        <div
          key={i}
          className="absolute size-1.5 rotate-45"
          style={{ ...pos, border: '1px solid rgba(45, 212, 191, 0.15)' }}
        />
      ))}
    </div>
  )
}

/** Card front — tarot card frame with CSS illustration */
export function TarotCardFront({ card, position }: { card: TarotCardData; position?: string }) {
  const Icon = card.icon
  const accentSolid = card.accent.replace(/[\d.]+\)$/, '0.9)')
  const iconFilter = 'drop-shadow(0 0 6px ' + card.accent + ') drop-shadow(0 0 12px ' + card.accent + ')'

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-xl"
      style={{
        background: 'linear-gradient(165deg, #0a0e1a 0%, ' + card.accent + ' 50%, #080b16 100%)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* Inner ornamental border */}
      <div className="absolute inset-[3px] rounded-lg" style={{ border: '1px solid rgba(255, 255, 255, 0.04)' }} />

      {/* Position label at top */}
      {position && (
        <div className="absolute left-0 right-0 top-0 z-10 bg-black/30 py-0.5 text-center text-[0.6rem] font-medium tracking-wider text-white/50">
          {position}
        </div>
      )}

      {/* Roman numeral */}
      <div className="absolute left-0 right-0 text-center text-[0.65rem] font-serif tracking-[0.2em] text-white/35" style={{ top: position ? '20px' : '10px' }}>
        {card.romanNumeral}
      </div>

      {/* Central illustration area */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ paddingTop: position ? '24px' : '14px', paddingBottom: '36px' }}>
        {/* Gradient halo behind icon */}
        <div
          className="absolute aspect-square rounded-full"
          style={{
            width: '62%',
            background: 'radial-gradient(circle, ' + card.accent + ' 0%, transparent 70%)',
          }}
        />

        {/* Decorative ring */}
        <div
          className="absolute aspect-square rounded-full"
          style={{ width: '52%', border: '1px solid rgba(255, 255, 255, 0.06)' }}
        />

        {/* Small decorative stars around the icon */}
        <div className="absolute size-0.5 rounded-full bg-white/25" style={{ top: '28%', left: '32%' }} />
        <div className="absolute size-0.5 rounded-full bg-white/20" style={{ bottom: '32%', right: '34%' }} />
        <div className="absolute size-0.5 rounded-full bg-white/15" style={{ top: '38%', right: '28%' }} />
        <div className="absolute size-0.5 rounded-full bg-white/15" style={{ bottom: '38%', left: '30%' }} />

        {/* The card icon — the "illustration" */}
        <Icon
          className="relative z-10 size-7"
          style={{ color: accentSolid, filter: iconFilter }}
          strokeWidth={1.2}
        />
      </div>

      {/* Name plate at bottom */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/8 bg-black/25 px-2 py-1.5 text-center">
        <p className="text-[0.7rem] font-bold leading-tight text-white/90">{card.name}</p>
        <p className="text-[0.55rem] leading-tight tracking-wider text-white/35">{card.nameEn}</p>
      </div>
    </div>
  )
}

/** Interactive flippable tarot card */
export function TarotCardFlip({
  card,
  position,
  selected,
  disabled,
  onClick,
}: {
  card: TarotCardData
  position?: string
  selected: boolean
  disabled: boolean
  onClick: () => void
}) {
  const btnClass = [
    'group relative aspect-[2/3] transition-all duration-300',
    disabled && !selected ? 'opacity-35' : 'opacity-100',
    selected ? 'scale-[1.03]' : 'hover:scale-[1.02]',
    selected ? 'drop-shadow-[0_0_12px_rgba(45,212,191,0.3)]' : '',
  ].join(' ')

  const flipStyle: CSSProperties = {
    transformStyle: 'preserve-3d',
    transition: 'transform 0.7s ease-out',
    transform: selected ? 'rotateY(180deg)' : undefined,
  }

  const ariaLabel = selected ? card.name + ' 카드 - 선택됨' : '뒷면 카드'

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled && !selected}
      className={btnClass}
      style={{ perspective: '1200px' }}
      aria-label={ariaLabel}
    >
      <div className="relative h-full w-full" style={flipStyle}>
        {/* Back face */}
        <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden' }}>
          <TarotCardBack />
        </div>
        {/* Front face */}
        <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
          <TarotCardFront card={card} position={position} />
        </div>
      </div>
    </button>
  )
}
