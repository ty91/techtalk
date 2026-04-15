import { motion } from 'motion/react'
import { SlideLayout } from './SlideLayout'

const items = [
  'Vite + React + TypeScript',
  'Tailwind CSS v4',
  'Motion for animations',
  'Keyboard-driven navigation',
]

export function BulletsSlide() {
  return (
    <SlideLayout title="Stack">
      <ul className="space-y-4">
        {items.map((item, i) => (
          <motion.li
            key={item}
            className="flex items-center gap-3 text-2xl text-neutral-200"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.2 + i * 0.08, ease: 'easeOut' }}
          >
            <span className="h-2 w-2 rounded-full bg-violet-400" />
            {item}
          </motion.li>
        ))}
      </ul>
    </SlideLayout>
  )
}
