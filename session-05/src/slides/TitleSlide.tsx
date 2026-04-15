import { motion } from 'motion/react'

export function TitleSlide() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 text-center">
      <motion.h1
        className="text-7xl font-semibold tracking-tight"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        Session 05
      </motion.h1>
      <motion.p
        className="text-xl text-neutral-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        techtalk
      </motion.p>
    </div>
  )
}
