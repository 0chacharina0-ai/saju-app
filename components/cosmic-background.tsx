'use client'

import { motion } from 'framer-motion'

/**
 * CosmicBackground — shared animated deep-space backdrop for all detail pages.
 * Layered radial nebula glows that drift very slowly, plus the existing
 * StarField canvas for twinkling stars and drifting particles.
 * pointer-events-none, sits behind all content (z -10).
 */
export function CosmicBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#030307]">
      {/* Base deep-space gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05060d] via-[#030307] to-[#06080f]" />

      {/* Slowly drifting cyan nebula — top-left */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 22% 18%, rgba(45,212,191,0.10) 0%, transparent 70%)',
        }}
        animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.06, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Slowly drifting violet nebula — bottom-right */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 78% 82%, rgba(139,92,246,0.08) 0%, transparent 70%)',
        }}
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1.04, 1, 1.04] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Subtle teal glow — center, very faint */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 40% 30% at 50% 50%, rgba(56,189,248,0.04) 0%, transparent 80%)',
        }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Top/bottom vignette for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030307]/40 via-transparent to-[#030307]" />
    </div>
  )
}
