import { motion } from 'motion/react'

export function OutdatedQuestionSlide() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative">
        <motion.span
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-36 select-none font-serif text-[18rem] leading-none text-neutral-700"
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          &ldquo;
        </motion.span>
        <motion.p
          className="relative text-6xl font-medium leading-tight tracking-tight text-neutral-100"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        >
          그런데 프롬프트 엔지니어링은
          <br />
          옛날 거 아닌가요?
        </motion.p>
        <motion.span
          aria-hidden
          className="pointer-events-none absolute -right-24 -bottom-48 select-none font-serif text-[18rem] leading-none text-neutral-700"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
        >
          &rdquo;
        </motion.span>
      </div>
    </div>
  )
}
