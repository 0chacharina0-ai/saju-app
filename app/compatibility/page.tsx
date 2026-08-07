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
      <main className="relative min-h-screen">
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 opacity-40 [background:radial-gradient(ellipse_at_top_left,var(--primary)_0%,transparent_45%),radial-gradient(ellipse_at_bottom_right,var(--accent)_0%,transparent_50%)]" />
        <CompatibilityResultView
          personA={result.a}
          personB={result.b}
          onReset={() => setResult(null)}
        />
      </main>
    )
  }

  return (
    <main className="relative min-h-screen">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 opacity-40 [background:radial-gradient(ellipse_at_top_left,var(--primary)_0%,transparent_45%),radial-gradient(ellipse_at_bottom_right,var(--accent)_0%,transparent_50%)]" />
      <CompatibilityForm onSubmit={(a, b) => setResult({ a, b })} />
    </main>
  )
}
