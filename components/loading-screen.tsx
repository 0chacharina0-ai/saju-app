'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'

const MESSAGES = [
  '명리 만세력을 정밀 판독하는 중...',
  '10년 대운과 세운의 흐름을 계산하고 있어요...',
  '오행의 균형을 분석하는 중...',
  '용신을 찾아 개운법을 도출하고 있어요...',
  '우주의 궤도를 당신의 사주에 매핑하는 중...',
  '리포트를 마무리하고 있어요. 거의 다 됐어요...',
]

export function LoadingScreen() {
  const [msgIdx, setMsgIdx] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIdx((p) => (p + 1) % MESSAGES.length)
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="loading-screen" className="relative mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-20">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        className="mb-8 flex size-20 items-center justify-center rounded-full border-2 border-primary/30 border-t-primary"
      >
        <Sparkles className="size-8 text-primary" />
      </motion.div>

      <motion.p
        key={msgIdx}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="break-keep text-center text-lg font-medium text-foreground/80"
      >
        {MESSAGES[msgIdx]}
      </motion.p>

      <div className="mt-6 h-1.5 w-48 overflow-hidden rounded-full bg-border">
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="h-full w-1/2 rounded-full bg-primary"
        />
      </div>

      <p className="mt-6 text-sm text-muted-foreground/60">잠시만 기다려주세요. 곧 완성됩니다.</p>
    </section>
  )
}
