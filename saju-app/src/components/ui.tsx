import { useState, type ReactNode } from 'react'

interface CardProps {
  title?: string
  subtitle?: string
  children: ReactNode
  className?: string
  icon?: ReactNode
  tone?: 'default' | 'warm' | 'cool' | 'accent'
}

const toneMap: Record<NonNullable<CardProps['tone']>, string> = {
  default: 'bg-white border-ink-200',
  warm: 'bg-gold-50 border-gold-200',
  cool: 'bg-sky-50 border-sky-200',
  accent: 'bg-crimson-50 border-crimson-200',
}

export function Card({ title, subtitle, children, className = '', icon, tone = 'default' }: CardProps) {
  return (
    <section
      className={`print-card rounded-2xl border ${toneMap[tone]} shadow-sm p-6 sm:p-7 animate-fadeInUp ${className}`}
    >
      {(title || icon) && (
        <header className="mb-4 print-section-title">
          <div className="flex items-center gap-2.5">
            {icon && <span className="text-crimson-600">{icon}</span>}
            {title && (
              <h3 className="font-serif text-lg sm:text-xl font-bold text-ink-800 leading-tight">{title}</h3>
            )}
          </div>
          {subtitle && <p className="mt-1 text-sm text-ink-500 leading-relaxed">{subtitle}</p>}
        </header>
      )}
      <div className="text-ink-700 leading-relaxed">{children}</div>
    </section>
  )
}

interface SectionTitleProps {
  chapter: string
  title: string
  desc?: string
}

export function SectionTitle({ chapter, title, desc }: SectionTitleProps) {
  return (
    <div className="print-section-title mb-5 sm:mb-7">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-7 px-3 items-center rounded-full bg-crimson-600 text-white text-xs font-bold tracking-wider">
          {chapter}
        </span>
        <span className="h-px flex-1 bg-ink-200" />
      </div>
      <h2 className="mt-3 font-serif text-2xl sm:text-3xl font-bold text-ink-900 leading-tight">{title}</h2>
      {desc && <p className="mt-2 text-ink-500 leading-relaxed">{desc}</p>}
    </div>
  )
}

interface AccordionProps {
  title: string
  children: ReactNode
  defaultOpen?: boolean
  badge?: string
}

export function Accordion({ title, children, defaultOpen = false, badge }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="print-force-open rounded-xl border border-ink-200 bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="no-print w-full flex items-center justify-between px-5 py-4 text-left hover:bg-ink-50 transition-colors"
      >
        <span className="flex items-center gap-2 font-serif font-bold text-ink-800">
          {title}
          {badge && (
            <span className="inline-flex h-5 px-2 items-center rounded-full bg-gold-100 text-gold-700 text-[11px] font-semibold">
              {badge}
            </span>
          )}
        </span>
        <span className={`text-ink-400 transition-transform ${open ? 'rotate-90' : ''}`}>▸</span>
      </button>
      <div className={`px-5 pb-5 ${open ? 'block' : 'hidden no-print:hidden'} print-force-open`}>{children}</div>
    </div>
  )
}

interface TabsProps {
  tabs: { id: string; label: string; sub?: string }[]
  active: string
  onChange: (id: string) => void
}

export function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <div className="no-print flex flex-wrap gap-2 mb-5">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => onChange(t.id)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
            active === t.id
              ? 'bg-crimson-600 text-white shadow-md'
              : 'bg-white border border-ink-200 text-ink-600 hover:border-crimson-300'
          }`}
        >
          {t.label}
          {t.sub && <span className="block text-[10px] font-normal opacity-80">{t.sub}</span>}
        </button>
      ))}
    </div>
  )
}

interface PrintOnlyProps {
  children: ReactNode
}

export function PrintOnly({ children }: PrintOnlyProps) {
  return <div className="print-only hidden">{children}</div>
}
