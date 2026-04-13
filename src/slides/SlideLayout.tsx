import type { ReactNode } from 'react'
import { motion } from 'motion/react'

type Props = {
  title: string
  subtitle?: string
  children: ReactNode
}

export function SlideLayout({ title, subtitle, children }: Props) {
  return (
    <div className="flex h-full w-full flex-col">
      <motion.h2
        className="text-center text-5xl font-semibold"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2, ease: 'easeOut' }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="mx-auto mt-4 max-w-3xl whitespace-pre-line text-center text-lg text-neutral-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.3 }}
        >
          {subtitle}
        </motion.p>
      )}
      <div className="mt-12 flex flex-1 flex-col items-center justify-center">
        {children}
      </div>
    </div>
  )
}
