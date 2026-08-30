'use client'

import { Sparkles, ArrowRight, PartyPopper } from 'lucide-react'
import { motion } from 'framer-motion'

export function PostPayStart({ onStart }: { onStart: () => void }) {
  return (
    <section id="post-pay-start" className="relative mx-auto max-w-2xl scroll-mt-20 px-5 py-20 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass rounded-3xl p-8 text-center sm:p-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-400/10"
        >
          <PartyPopper className="size-8 text-emerald-400" />
        </motion.div>

        <h2 className="mb-3 text-2xl font-bold sm:text-3xl">결제가 완료되었어요!</h2>
        <p className="mx-auto mb-8 max-w-md break-keep text-base leading-relaxed text-muted-foreground">
          이제 본격적인 정밀 분석을 시작할까요?<br />
          7가지 성향 질문과 시차 보정을 거치면<br />
          당신만의 원고지 분량 심층 보고서가 완성됩니다.
        </p>

        <button
          type="button"
          onClick={onStart}
          className="group inline-flex items-center gap-2 rounded-full bg-primary px-10 py-5 text-lg font-bold text-primary-foreground transition-all hover:bg-primary/80 hover:shadow-lg"
        >
          <Sparkles className="size-5" />
          네, 정밀 분석 시작하기
          <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
        </button>

        <p className="mt-4 text-sm text-muted-foreground/60">약 2분 정도 소요됩니다. 편안한 마음으로 답변해주세요.</p>
      </motion.div>
    </section>
  )
}
