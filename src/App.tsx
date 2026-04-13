import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { slides } from './slides'

function App() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => {
        const next = Math.min(slides.length - 1, Math.max(0, i + delta))
        if (next !== i) setDirection(delta)
        return next
      })
    },
    []
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') go(1)
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  const Slide = slides[index]

  return (
    <div className="relative h-full w-full overflow-hidden bg-neutral-950 text-neutral-100">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          initial={{ opacity: 0, x: 40 * direction }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 * direction }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="absolute inset-0 flex items-center justify-center p-12"
        >
          <Slide />
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute bottom-4 right-6 text-sm tabular-nums text-neutral-500">
        {index + 1} / {slides.length}
      </div>
    </div>
  )
}

export default App
