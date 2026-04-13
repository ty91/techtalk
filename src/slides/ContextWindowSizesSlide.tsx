import { motion } from 'motion/react'
import { SlideLayout } from './SlideLayout'

const RECT = 10
const GAP = 2
const VISUAL_HEIGHT = 150

type Visual =
  | { kind: 'small' }
  | { kind: 'grid'; cols: number; rows: number }
  | { kind: 'split'; cols: number; topRows: number; bottomRows: number }

type Item = { size: string; label: string; visual: Visual }

const ITEMS: Item[] = [
  {
    size: '0.5k',
    label: 'Attention Is All You Need',
    visual: { kind: 'small' },
  },
  {
    size: '4k',
    label: 'GPT-3',
    visual: { kind: 'grid', cols: 2, rows: 2 },
  },
  {
    size: '16k',
    label: 'ChatGPT 3.5',
    visual: { kind: 'grid', cols: 4, rows: 4 },
  },
  {
    size: '200k',
    label: 'Claude',
    visual: { kind: 'split', cols: 8, topRows: 4, bottomRows: 4 },
  },
  {
    size: '1M',
    label: 'Gemini, Claude',
    visual: { kind: 'split', cols: 12, topRows: 5, bottomRows: 5 },
  },
]

const REVEAL_BASE_S = 0.35
const REVEAL_GAP_S = 0.55

export function ContextWindowSizesSlide() {
  return (
    <SlideLayout
      title="갈수록 점점 커지는 컨텍스트 윈도우"
      subtitle="LLM이 발전함에 따라, 컨텍스트 윈도우의 크기가 굉장히 많이 늘어났어요"
    >
      <div className="flex w-full max-w-6xl items-end justify-center gap-10">
        {ITEMS.map((item, i) => (
          <motion.div
            key={item.size}
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
            <div className="mt-4 text-3xl font-bold text-teal-200">
              {item.size}
            </div>
            <div className="mt-1 h-10 text-center text-sm leading-tight text-neutral-400">
              {item.label}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        className="mt-16 max-w-4xl text-center text-xl leading-relaxed text-neutral-200"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: REVEAL_BASE_S + ITEMS.length * REVEAL_GAP_S + 0.2,
        }}
      >
        그래서 이제는 한 토큰을 생성할 때, 이전의 모든 토큰이 컨텍스트라고
        생각해도 대충 맞습니다
      </motion.p>
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
          <div className="text-lg leading-none text-teal-300/80">⋮</div>
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
      className="rounded-sm bg-teal-400/70"
      style={{ width, height }}
    />
  )
}
