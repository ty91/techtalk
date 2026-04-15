import { useEffect, useRef, useState, type ComponentType } from 'react'
import { slides } from './slides'
import { useSlideIndex } from './useSlideIndex'

const LOGICAL_W = 1600
const LOGICAL_H = 900

function SlidePreview({
  Slide,
  width,
  label,
  dim,
}: {
  Slide: ComponentType | null
  width: number
  label: string
  dim?: boolean
}) {
  const scale = width / LOGICAL_W
  const height = LOGICAL_H * scale
  return (
    <div className="flex flex-col">
      <div className="mb-2 text-xs uppercase tracking-[0.2em] text-neutral-500">
        {label}
      </div>
      <div
        className="relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950"
        style={{ width, height }}
      >
        {Slide ? (
          <div
            className="absolute left-0 top-0 p-12 text-neutral-100"
            style={{
              width: LOGICAL_W,
              height: LOGICAL_H,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
          >
            <Slide />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-neutral-600">
            — 끝 —
          </div>
        )}
        {dim && <div className="absolute inset-0 bg-neutral-950/20" />}
      </div>
    </div>
  )
}

function formatElapsed(ms: number) {
  const total = Math.floor(ms / 1000)
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  const pad = (n: number) => n.toString().padStart(2, '0')
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`
}

function useClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])
  return now
}

function useStopwatch() {
  const [start, setStart] = useState(() => Date.now())
  const [elapsed, setElapsed] = useState(0)
  const startRef = useRef(start)
  startRef.current = start
  useEffect(() => {
    const id = window.setInterval(() => {
      setElapsed(Date.now() - startRef.current)
    }, 250)
    return () => window.clearInterval(id)
  }, [])
  const reset = () => {
    setStart(Date.now())
    setElapsed(0)
  }
  return { elapsed, reset }
}

export function PresenterView() {
  const { index, go } = useSlideIndex()
  const { elapsed, reset } = useStopwatch()
  const clock = useClock()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') go(1)
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') go(-1)
      if (e.key === 'r' || e.key === 'R') reset()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, reset])

  const Current = slides[index]
  const Next = index + 1 < slides.length ? slides[index + 1] : null

  const timeStr = clock.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="flex h-full w-full flex-col bg-neutral-900 p-8 text-neutral-100">
      <header className="flex items-baseline justify-between">
        <div className="text-xs uppercase tracking-[0.25em] text-neutral-500">
          Presenter
        </div>
        <div className="flex items-baseline gap-8 tabular-nums">
          <div>
            <span className="text-xs uppercase tracking-widest text-neutral-500">
              elapsed
            </span>{' '}
            <span className="ml-2 text-2xl font-semibold">
              {formatElapsed(elapsed)}
            </span>
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-neutral-500">
              clock
            </span>{' '}
            <span className="ml-2 text-2xl font-semibold">{timeStr}</span>
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-neutral-500">
              slide
            </span>{' '}
            <span className="ml-2 text-2xl font-semibold">
              {index + 1} / {slides.length}
            </span>
          </div>
        </div>
      </header>

      <main className="mt-8 flex flex-1 items-start gap-8">
        <SlidePreview
          Slide={Current}
          width={1000}
          label={`current · ${index + 1}`}
        />
        <SlidePreview
          Slide={Next}
          width={480}
          label={Next ? `next · ${index + 2}` : 'next'}
          dim
        />
      </main>

      <footer className="mt-6 flex items-center justify-between text-xs text-neutral-500">
        <div>
          <kbd className="rounded border border-neutral-700 bg-neutral-800 px-1.5 py-0.5">←</kbd>{' '}
          <kbd className="rounded border border-neutral-700 bg-neutral-800 px-1.5 py-0.5">→</kbd>{' '}
          navigate ·{' '}
          <kbd className="rounded border border-neutral-700 bg-neutral-800 px-1.5 py-0.5">R</kbd>{' '}
          reset timer
        </div>
        <div>BroadcastChannel: slides</div>
      </footer>
    </div>
  )
}
