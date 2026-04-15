import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { slides } from './slides'
import { useSlideIndex } from './useSlideIndex'
import { PresenterView } from './PresenterView'

function AudienceView() {
  const { index, direction, go } = useSlideIndex()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') go(1)
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') go(-1)
      if (e.key === 'p' || e.key === 'P') {
        window.open(
          `${window.location.pathname}?mode=presenter`,
          'slides-presenter',
          'popup,width=1600,height=1000',
        )
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  const Slide = slides[index]

  return (
    <div className="relative h-full w-full overflow-hidden bg-neutral-950 text-neutral-100">
      <AnimatePresence mode="popLayout" custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          initial={{ opacity: 0, x: 40 * direction }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 * direction }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="absolute inset-0 p-12"
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

function App() {
  const isPresenter =
    new URLSearchParams(window.location.search).get('mode') === 'presenter'
  return isPresenter ? <PresenterView /> : <AudienceView />
}

export default App
