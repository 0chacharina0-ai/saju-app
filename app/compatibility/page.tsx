'use client'

import { useState } from 'react'
import type { SajuResult } from '@/lib/saju'
import { CompatibilityForm } from '@/components/compatibility-form'
import { CompatibilityResultView } from '@/components/compatibility-result'

type PersonData = { name: string; result: SajuResult }

export default function CompatibilityPage() {
  const [result, setResult] = useState<{ a: PersonData; b: PersonData } | null>(null)

  if (result) {
    return (
      <CompatibilityResultView
        personA={result.a}
        personB={result.b}
        onReset={() => setResult(null)}
      />
    )
  }

  return (
    <CompatibilityForm onSubmit={(a, b) => setResult({ a, b })} />
  )
}
