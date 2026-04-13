import { motion } from 'motion/react'
import { SlideLayout } from './SlideLayout'

const RECT = 10
const GAP = 2
const VISUAL_HEIGHT = 200

type Visual =
  | { kind: 'small' }
  | { kind: 'grid'; cols: number; rows: number }
  | { kind: 'split'; cols: number; topRows: number; bottomRows: number }

type Item = { size: string; label: string; visual: Visual }

const ITEMS: Item[] = [
  {
    size: '117M',
    label: 'GPT-1',
    visual: { kind: 'small' },
  },
  {
    size: '1.5B',
    label: 'GPT-2',
    visual: { kind: 'grid', cols: 2, rows: 2 },
  },
  {
    size: '175B',
    label: 'GPT-3',
    visual: { kind: 'grid', cols: 6, rows: 6 },
  },
  {
    size: '1T',
    label: 'GPT-4, Claude Opus',
    visual: { kind: 'split', cols: 10, topRows: 5, bottomRows: 5 },
  },
  {
    size: '10T',
    label: 'Claude Mythos',
    visual: { kind: 'split', cols: 10, topRows: 12, bottomRows: 12 },
  },
]

const REVEAL_BASE_S = 0.35
const REVEAL_GAP_S = 0.55

export function GrowingLLMSlide() {
  return (
    <SlideLayout
      title="점점 똑똑해지는 LLM"
      subtitle="모델 세대가 넘어갈수록 파라미터 규모가 지수적으로 커졌어요"
    >
      <div className="flex w-full max-w-6xl items-end justify-center gap-10">
        {ITEMS.map((item, i) => (
          <motion.div
            key={item.label}
            className="flex w-40 flex-col items-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: REVEAL_BASE_S + i * REVEAL_GAP_S,
            }}
          >
            <div
              className="flex items-end justify-center"
              style={{ height: VISUAL_HEIGHT }}
            >
              <Visualization visual={item.visual} />
            </div>
            <div className="mt-4 text-3xl font-bold text-amber-200">
              {item.size}
            </div>
            <div className="mt-1 h-10 text-center text-sm leading-tight text-neutral-400">
              {item.label}
            </div>
          </motion.div>
        ))}
      </div>
    </SlideLayout>
  )
}

function Visualization({ visual }: { visual: Visual }) {
  switch (visual.kind) {
    case 'small':
      return <Rect width={RECT / 2} height={RECT / 2} />
    case 'grid':
      return <Grid cols={visual.cols} rows={visual.rows} />
    case 'split':
      return (
        <div className="flex flex-col items-center gap-1.5">
          <Grid cols={visual.cols} rows={visual.topRows} />
          <div className="text-lg leading-none text-amber-300/80">⋮</div>
          <Grid cols={visual.cols} rows={visual.bottomRows} />
        </div>
      )
  }
}

function Grid({ cols, rows }: { cols: number; rows: number }) {
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${cols}, ${RECT}px)`,
        gap: GAP,
      }}
    >
      {Array.from({ length: cols * rows }, (_, i) => (
        <Rect key={i} width={RECT} height={RECT} />
      ))}
    </div>
  )
}

function Rect({ width, height }: { width: number; height: number }) {
  return (
    <div
      className="rounded-sm bg-amber-400/70"
      style={{ width, height }}
    />
  )
}
