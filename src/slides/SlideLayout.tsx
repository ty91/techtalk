import type { ReactNode } from 'react'
import { motion } from 'motion/react'

type Props = {
  title: string
  children: ReactNode
}

export function SlideLayout({ title, children }: Props) {
  return (
    <div className="flex h-full w-full flex-col">
      <motion.h2
        className="text-center text-5xl font-semibold"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        {title}
      </motion.h2>
      <div className="mt-12 flex flex-1 flex-col items-center justify-center">
        {children}
      </div>
    </div>
  )
}
