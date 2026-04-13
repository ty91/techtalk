import type { ReactNode } from 'react'
import { motion } from 'motion/react'

export function PromptWindow({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-full w-full max-w-5xl">
      <motion.div
        className="absolute inset-x-0 top-4 h-[120vh] rounded-3xl border border-white/15 bg-neutral-900/95 px-10 pt-10 shadow-2xl shadow-black/70"
        initial={{ y: '92%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
      >
        <pre className="whitespace-pre-wrap break-words font-mono text-base leading-relaxed text-neutral-300">
          {children}
        </pre>
      </motion.div>
    </div>
  )
}
