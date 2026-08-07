'use client'

import { ThemeForm } from '@/components/theme-form'

export default function ThemeCareerPage() {
  return (
    <main className="relative min-h-screen">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 opacity-40 [background:radial-gradient(ellipse_at_top_left,var(--primary)_0%,transparent_45%),radial-gradient(ellipse_at_bottom_right,var(--accent)_0%,transparent_50%)]" />
      <ThemeForm themeKey="career" />
    </main>
  )
}
