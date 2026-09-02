'use client'

import { useState, useEffect } from 'react'
import { Sparkles } from 'lucide-react'

const LOADING_MESSAGES = [
  '명리 만세력을 정밀 판독하는 중...',
  '10년 대운과 세운의 흐름을 계산하고 있습니다...',
  '오행(목화토금수)의 균형을 분석하는 중...',
  '용신을 찾아 개운법을 도출하고 있습니다...',
  '우주의 궤도를 당신의 사주에 매핑하는 중...',
  '리포트를 마무리하고 있어요. 거의 다 됐어요...',
]

export function LoadingSpinner({ message }: { message?: string }) {
  const [msgIndex, setMsgIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex(prev => (prev + 1) % LOADING_MESSAGES.length)
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center py-20">
      {/* Animated star/cosmic illustration */}
      <div className="relative mb-8 h-24 w-24">
        {/* Outer rotating ring */}
        <div className="absolute inset-0 animate-spin-slow rounded-full border-2 border-primary/20 border-t-primary/60" style={{ animationDuration: '3s' }} />
        {/* Middle counter-rotating ring */}
        <div className="absolute inset-3 animate-spin-slow rounded-full border-2 border-accent/20 border-b-accent/60" style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
        {/* Center pulsing star */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className="size-8 animate-pulse text-primary" />
        </div>
        {/* Twinkling dots */}
        {[0, 1, 2, 3, 4, 5].map(i => (
          <div key={i} className="absolute h-1 w-1 rounded-full bg-primary"
            style={{
              top: `${50 + 40 * Math.sin((i * Math.PI) / 3)}%`,
              left: `${50 + 40 * Math.cos((i * Math.PI) / 3)}%`,
              animation: `twinkle 1.5s ease-in-out ${i * 0.25}s infinite`,
            }} />
        ))}
      </div>

      {/* Loading message */}
      <p className="break-keep max-w-xs text-center text-sm font-medium text-muted-foreground transition-opacity duration-500">
        {message ?? LOADING_MESSAGES[msgIndex]}
      </p>

      {/* Progress dots */}
      <div className="mt-4 flex gap-1.5">
        {LOADING_MESSAGES.map((_, i) => (
          <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === msgIndex ? 'w-6 bg-primary' : 'w-1.5 bg-muted-foreground/20'}`} />
        ))}
      </div>
    </div>
  )
}
